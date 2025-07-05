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

const auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (user) {
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "")
      || "";
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

function saveProgress() {
  const user = firebase.auth().currentUser;
  if (!user) {
    console.warn("No user logged in, cannot save progress.");
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
    .then(() => { console.log("Progress saved!"); })
    .catch((error) => { console.error("Error saving progress: ", error); });
}
window.saveProgress = saveProgress;

function loadProgress(cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    console.warn("No user logged in, cannot load progress.");
    if (typeof cb === "function") cb();
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then((doc) => {
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
    .catch((error) => {
      console.error("Error loading progress: ", error);
      if (typeof cb === "function") cb(error);
    });
}
window.loadProgress = loadProgress;
