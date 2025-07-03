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
async function saveProgress(progressObj) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  // Optionally, attach displayName/email for admin/debugging
  let username = user.displayName || (user.email ? user.email.split('@')[0] : "");
  await firebase.firestore().collection('users').doc(user.uid).set(
    { ...progressObj, displayName: username, email: user.email || "" },
    { merge: true }
  );
}

/**
 * Load all player progress (currency, collection, decks, cosmetics, etc)
 * @param {Function} callback - function(data) called with the loaded user data
 */
function loadProgress(callback) {
  const user = firebase.auth().currentUser;
  if (!user) { callback({}); return; }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(doc => {
      if (doc.exists) callback(doc.data());
      else callback({});
    })
    .catch(() => callback({}));
}

// --- OPTIONAL: Single-field helpers if you want them --- //

async function saveSingleField(field, value) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  let obj = {};
  obj[field] = value;
  await firebase.firestore().collection('users').doc(user.uid).set(obj, { merge: true });
}

function loadSingleField(field, callback) {
  const user = firebase.auth().currentUser;
  if (!user) { callback(null); return; }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(doc => callback(doc.exists ? doc.data()[field] : null))
    .catch(() => callback(null));
}

async function saveAllProgress() {
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
 * Example usage for cosmetics, currency, decks, etc.
 * saveSingleField('currency', 100)
 * loadSingleField('currency', value => { ... })
 * saveSingleField('unlockedAvatars', ["img1.png", "img2.png"])
 * loadSingleField('unlockedAvatars', arr => { ... })
 */

// --- Make functions available globally --- //
window.saveProgress = saveProgress;
window.loadProgress = loadProgress;
window.saveSingleField = saveSingleField;
window.loadSingleField = loadSingleField;
window.saveAllProgress = saveAllProgress;
