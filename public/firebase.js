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

      // Assign loaded data, defaulting ONLY if undefined (not using ||)
      window.playerCollection = typeof data.collection !== "undefined" ? data.collection : {};
      window.deckSlots = typeof data.deckSlots !== "undefined" ? data.deckSlots : ["Deck 1"];
      window.decks = typeof data.decks !== "undefined" ? data.decks : { "Deck 1": {} };
      window.currentDeckSlot = typeof data.currentDeckSlot !== "undefined" ? data.currentDeckSlot : "Deck 1";
      window.playerCurrency = typeof data.currency === "number" ? data.currency : 0;
      window.playerEssence = typeof data.essence === "number" ? data.essence : 0;
      window.playerQuests = typeof data.quests !== "undefined" ? data.quests : {};
      window.playerAchievements = typeof data.achievements !== "undefined" ? data.achievements : {};
      window.playerLevel = typeof data.level === "number" ? data.level : 1;
      window.playerExp = typeof data.exp === "number" ? data.exp : 0;
      window.playerUnlockedAvatars = typeof data.unlockedAvatars !== "undefined" ? data.unlockedAvatars : [];
      window.playerUnlockedBanners = typeof data.unlockedBanners !== "undefined" ? data.unlockedBanners : [];
      window.playerUnlockedCardbacks = typeof data.unlockedCardbacks !== "undefined" ? data.unlockedCardbacks : [];

      if (typeof cb === "function") cb({
        collection: window.playerCollection,
        deckSlots: window.deckSlots,
        decks: window.decks,
        currentDeckSlot: window.currentDeckSlot,
        currency: window.playerCurrency,
        essence: window.playerEssence,
        quests: window.playerQuests,
        achievements: window.playerAchievements,
        level: window.playerLevel,
        exp: window.playerExp,
        unlockedAvatars: window.playerUnlockedAvatars,
        unlockedBanners: window.playerUnlockedBanners,
        unlockedCardbacks: window.playerUnlockedCardbacks
      });
    })
    .catch((error) => {
      console.error("Error loading progress:", error);
      if (typeof cb === "function") cb({});
    });
}
window.loadProgress = loadProgress;
