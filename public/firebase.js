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

// --- NEW: Set username/displayName in Firestore after login/signup ---
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
/**
 * Save all player progress (currency, collection, decks, cosmetics, etc)
 * @param {Object} progressObj - An object with all fields to save (example: {currency: 100, collection: {...}, ...})
 */ 
async function saveAllProgress() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  await saveProgress({
    collection: playerCollection,
    deckSlots: deckSlots,
    decks: decks,
    currentDeckSlot: currentDeckSlot,
    currency: playerCurrency,
    essence: playerEssence,
    quests: playerQuests,
    achievements: playerAchievements,
    level: playerLevel,
    exp: playerExp,
    unlockedAvatars: playerUnlockedAvatars,
    unlockedBanners: playerUnlockedBanners,
    unlockedCardbacks: playerUnlockedCardbacks
  });
}

/**
 * Load ALL player progress (await this after login, before using player data)
 * Returns: Object with all player data or sensible defaults if not found.
 */
async function loadAllProgress() {
  const user = firebase.auth().currentUser;
  if (!user) return {};
  const doc = await firebase.firestore().collection('users').doc(user.uid).get();
  if (!doc.exists) return {};
  return doc.data();
}

/**
 * Save a single field. Use only for user profile or settings, NOT for game progress.
 * Example: saveSingleField('profilePic', newUrl)
 */
async function saveSingleField(field, value) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  let obj = {};
  obj[field] = value;
  await firebase.firestore().collection('users').doc(user.uid).set(obj, { merge: true });
}

/**
 * Load a single field. Use only for user profile or settings, NOT for game progress.
 * Example: loadSingleField('profilePic', val => { ... })
 */
function loadSingleField(field, callback) {
  const user = firebase.auth().currentUser;
  if (!user) { callback(null); return; }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(doc => callback(doc.exists ? doc.data()[field] : null))
    .catch(() => callback(null));
}

// --- Make functions available globally --- //
window.saveAllProgress = saveAllProgress;
window.loadAllProgress = loadAllProgress;
window.saveSingleField = saveSingleField;
window.loadSingleField = loadSingleField;
