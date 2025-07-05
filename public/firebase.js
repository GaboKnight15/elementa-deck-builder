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
    console.warn("No user logged in, cannot save progress. Call stack:", new Error().stack);
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
    if (typeof cb === "function") cb({});
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then((doc) => {
      const data = doc.exists ? doc.data() : {};
      console.log("RAW LOADED DATA FROM FIRESTORE:", data);
      // Fallback for old users: initialize missing progress fields if not present
      let needsInit = false;
      if (typeof data.currency !== 'number') needsInit = true;
      if (typeof data.essence !== 'number') needsInit = true;
      if (!data.collection) needsInit = true;
      if (!data.deckSlots) needsInit = true;
      if (!data.decks) needsInit = true;
      if (!data.currentDeckSlot) needsInit = true;
      if (!data.quests) needsInit = true;
      if (!data.achievements) needsInit = true;
      if (typeof data.level !== 'number') needsInit = true;
      if (typeof data.exp !== 'number') needsInit = true;
      if (!data.unlockedAvatars) needsInit = true;
      if (!data.unlockedBanners) needsInit = true;
      if (!data.unlockedCardbacks) needsInit = true;

      // If progress fields missing, set defaults and merge into doc
      if (needsInit) {
        const defaultFields = {
          collection: data.collection || {},
          deckSlots: data.deckSlots || ["Deck 1"],
          decks: data.decks || { "Deck 1": {} },
          currentDeckSlot: data.currentDeckSlot || "Deck 1",
          currency: typeof data.currency === 'number' ? data.currency : 0,
          essence: typeof data.essence === 'number' ? data.essence : 0,
          quests: data.quests || {},
          achievements: data.achievements || {},
          level: typeof data.level === 'number' ? data.level : 1,
          exp: typeof data.exp === 'number' ? data.exp : 0,
          unlockedAvatars: data.unlockedAvatars || [],
          unlockedBanners: data.unlockedBanners || [],
          unlockedCardbacks: data.unlockedCardbacks || []
        };
        firebase.firestore().collection('users').doc(user.uid).set(defaultFields, { merge: true });
        // Use these defaults for now
        Object.assign(data, defaultFields);
      }

      window.playerCollection = data.collection || {};
      window.deckSlots = data.deckSlots || ["Deck 1"];
      window.decks = data.decks || { "Deck 1": {} };
      window.currentDeckSlot = data.currentDeckSlot || "Deck 1";
      window.playerCurrency = (typeof data.currency === 'number') ? data.currency : 0;
      console.log("Loaded currency from Firestore:", window.playerCurrency);
      window.playerEssence = (typeof data.essence === 'number') ? data.essence : 0;
      window.playerQuests = data.quests || {};
      window.playerAchievements = data.achievements || {};
      window.playerLevel = (typeof data.level === 'number') ? data.level : 1;
      window.playerExp = (typeof data.exp === 'number') ? data.exp : 0;
      window.playerUnlockedAvatars = data.unlockedAvatars || [];
      window.playerUnlockedBanners = data.unlockedBanners || [];
      window.playerUnlockedCardbacks = data.unlockedCardbacks || [];
      if (typeof cb === "function") cb(data);
    })
    .catch((error) => {
      console.error("Error loading progress:", error);
      if (typeof cb === "function") cb({});
    });
}
window.loadProgress = loadProgress;
