const firebaseConfig = {
  apiKey: "AIzaSyAyrTkqm_ksTU4dC3ul_cXQc596VptdhXY",
  authDomain: "elementa-31166.firebaseapp.com",
  projectId: "elementa-31166",
  storageBucket: "elementa-31166.appspot.com",
  messagingSenderId: "486533994899",
  appId: "1:486533994899:web:88b25a66cbab1731ab7066"
};
firebase.initializeApp(firebaseConfig);
window.auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "");
    firebase.firestore().collection('users').doc(user.uid).set(
      {
        displayName: username,
        email: user.email || "",
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  }
}); 

const auth = firebase.auth();
 
function saveProgress() {
  const user = firebase.auth().currentUser;
  if (!user) {
    console.warn("[saveProgress] No authenticated user. Progress not saved.");
    return;
  }
  const data = {
    collection: window.playerCollection || {},
    deckSlots: window.deckSlots || ["Deck 1"],
    decks: window.decks || { "Deck 1": {} },
    currentDeckSlot: window.currentDeckSlot || "Deck 1",
    currency: typeof window.playerCurrency === 'number' ? window.playerCurrency : 0,
    essence: typeof window.playerEssence === 'number' ? window.playerEssence : 0,
    quests: window.playerQuests || {},
    achievements: window.playerAchievements || {},
    level: typeof window.playerLevel === 'number' ? window.playerLevel : 1,
    exp: typeof window.playerExp === 'number' ? window.playerExp : 0,
    unlockedAvatars: window.playerUnlockedAvatars || [],
    unlockedBanners: window.playerUnlockedBanners || [],
    unlockedCardbacks: window.playerUnlockedCardbacks || []
  };
  firebase.firestore().collection('users').doc(user.uid).set(data, { merge: true })
    .then(function() {
      // Update UI everywhere after save
      if (typeof updateCurrencyDisplay === "function") updateCurrencyDisplay();
      if (typeof updateEssenceDisplay === "function") updateEssenceDisplay();
      if (typeof updateCollectionDependentUI === "function") updateCollectionDependentUI();
      if (typeof renderGallery === "function") renderGallery();
      if (typeof renderDeckSelection === "function") renderDeckSelection();
      if (typeof renderDeckBuilder === "function") renderDeckBuilder();
      if (typeof renderDeckList === "function") renderDeckList();
      if (typeof renderCurrentDeck === "function") renderCurrentDeck();
      if (typeof renderPlayerLevel === "function") renderPlayerLevel();
      if (typeof renderPlayerProfile === "function") renderPlayerProfile();
      if (typeof renderQuests === "function") renderQuests();
      if (typeof renderAchievements === "function") renderAchievements();
      if (typeof renderFriendNotifications === "function") renderFriendNotifications();
      if (typeof renderShop === "function") renderShop();
      if (typeof renderShopAvatars === "function") renderShopAvatars();
      if (typeof renderShopBanners === "function") renderShopBanners();
      if (typeof renderShopCardbacks === "function") renderShopCardbacks();
      if (typeof renderProfileAvatars === "function") renderProfileAvatars();
      if (typeof renderProfileBanners === "function") renderProfileBanners();
      if (typeof renderProfileCardbacks === "function") renderProfileCardbacks();
    })
    .catch(function(error) {
      console.error("Error saving progress:", error);
    });
}

function loadProgress(cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    console.warn("[loadProgress] No authenticated user. Progress not loaded.");
    if (typeof cb === "function") cb();
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(function(doc) {
      const data = doc.exists ? doc.data() : {};
      window.playerCollection = data.collection || {};
      window.deckSlots = data.deckSlots || ["Deck 1"];
      window.decks = data.decks || { "Deck 1": {} };
      window.currentDeckSlot = data.currentDeckSlot || "Deck 1";
      window.playerCurrency = data.currency || 0;
      window.playerEssence = data.essence || 0;
      window.playerQuests = data.quests || {};
      window.playerAchievements = data.achievements || {};
      window.playerLevel = data.level || 1;
      window.playerExp = data.exp || 0;
      window.playerUnlockedAvatars = data.unlockedAvatars || [];
      window.playerUnlockedBanners = data.unlockedBanners || [];
      window.playerUnlockedCardbacks = data.unlockedCardbacks || [];
      if (typeof cb === "function") cb();
    })
    .catch(function(error) {
      console.error("Error loading progress:", error);
      if (typeof cb === "function") cb(error);
    });
}

window.saveProgress = saveProgress;
window.loadProgress = loadProgress;
