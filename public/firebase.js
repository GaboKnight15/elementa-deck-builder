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
function saveProgress(progressObj) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  // Optionally, attach displayName/email for admin/debugging
  let username = user.displayName || (user.email ? user.email.split('@')[0] : "");
  firebase.firestore().collection('users').doc(user.uid).set(
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

function saveSingleField(field, value) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  let obj = {};
  obj[field] = value;
  firebase.firestore().collection('users').doc(user.uid).set(obj, { merge: true });
}

function loadSingleField(field, callback) {
  const user = firebase.auth().currentUser;
  if (!user) { callback(null); return; }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(doc => callback(doc.exists ? doc.data()[field] : null))
    .catch(() => callback(null));
}

/**
 * Example usage for cosmetics, currency, decks, etc.
 * saveSingleField('currency', 100)
 * loadSingleField('currency', value => { ... })
 * saveSingleField('unlockedAvatars', ["img1.png", "img2.png"])
 * loadSingleField('unlockedAvatars', arr => { ... })
 */

// --- Make functions available globally --- //
window.savePlayerProgress = savePlayerProgress;
window.loadPlayerProgress = loadPlayerProgress;
window.saveSingleField = saveSingleField;
window.loadSingleField = loadSingleField;

// SAVE PROGRESS
function saveProgress(progressData) {
  const user = firebase.auth().currentUser;
  if (user) {
    const db = firebase.firestore();
    // Always attach display name/email for admin view
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "")
      || "";
    db.collection('users').doc(user.uid).set(
      { ...progressData, displayName: username, email: user.email || "" },
      { merge: true }
    )
      .then(() => {
        console.log("Progress saved!");
      })
      .catch((error) => {
        console.error("Error saving progress: ", error);
      });
  } else {
    console.warn("No user logged in, cannot save progress.");
  }
}
// LOAD PROGRESS (unchanged)
function loadProgress(callback) {
  const user = firebase.auth().currentUser;
  if (user) {
    const db = firebase.firestore();
    db.collection('users').doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          callback(data); // Pass the progress data to your app
        } else {
          console.log("No saved progress yet.");
          callback({}); // Or handle as you wish
        }
      })
      .catch((error) => {
        console.error("Error loading progress: ", error);
        callback(null); // Or handle error in your app
      });
  } else {
    console.warn("No user logged in, cannot load progress.");
    callback(null);
  }
}

// Save just the collection
function saveCollection(collection) {
  const user = firebase.auth().currentUser;
  if (user) {
    const db = firebase.firestore();
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "")
      || "";
    db.collection('users').doc(user.uid).set(
      { collection, displayName: username, email: user.email || "" },
      { merge: true }
    )
      .then(() => console.log("Collection saved!"))
      .catch((error) => console.error("Error saving collection: ", error));
  }
}

// Load just the collection (returns a promise)
function loadCollection() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const db = firebase.firestore();
      db.collection('users').doc(user.uid).get()
        .then((doc) => {
          if (doc.exists && doc.data().collection) {
            resolve(doc.data().collection);
          } else {
            resolve({}); // No collection yet
          }
        })
        .catch((error) => {
          console.error("Error loading collection: ", error);
          reject(error);
        });
    } else {
      resolve({}); // Not logged in
    }
  });
}
// Save decks and slots
function saveUserDecks(deckSlots, decks, currentDeckSlot) {
  const user = firebase.auth().currentUser;
  if (user) {
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "")
      || "";
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ deckSlots, decks, currentDeckSlot, displayName: username, email: user.email || "" }, { merge: true });
  }
  return Promise.resolve();
}
// Load decks and slots (unchanged)
function loadUserDecks() {
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          return {
            deckSlots: data.deckSlots || ["Deck 1"],
            decks: data.decks || { "Deck 1": {} },
            currentDeckSlot: data.currentDeckSlot || (data.deckSlots && data.deckSlots[0]) || "Deck 1"
          };
        }
        return {
          deckSlots: ["Deck 1"],
          decks: { "Deck 1": {} },
          currentDeckSlot: "Deck 1"
        };
      });
  }
  return Promise.resolve({
    deckSlots: ["Deck 1"],
    decks: { "Deck 1": {} },
    currentDeckSlot: "Deck 1"
  });
}
function saveCurrencyEssence(currency, essence) {
  const user = firebase.auth().currentUser;
  if (user) {
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "")
      || "";
    firebase.firestore().collection('users').doc(user.uid)
      .set({ currency, essence, displayName: username, email: user.email || "" }, { merge: true });
  }
}
function loadCurrencyEssence() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            resolve({
              currency: data.currency ?? 0,
              essence: data.essence ?? 0
            });
          } else {
            resolve({ currency: 0, essence: 0 });
          }
        })
        .catch(reject);
    } else {
      resolve({ currency: 0, essence: 0 });
    }
  });
}
// Missions
function saveMissions(missions) {
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ missions }, { merge: true });
  }
  return Promise.resolve();
}
function loadMissions() {
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => (doc.exists && doc.data().missions) ? doc.data().missions : {});
  }
  return Promise.resolve({});
}

function saveAchievements(achievements) {
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ achievements }, { merge: true });
  }
  return Promise.resolve();
}
function loadAchievements() {
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => (doc.exists && doc.data().achievements) ? doc.data().achievements : {});
  }
  return Promise.resolve({});
}
// --- FIRESTORE UNLOCKS HELPERS ---

function saveUnlockedAvatars(arr) {
  const user = firebase.auth().currentUser;
  if (user) {
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "")
      || "";
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ unlockedAvatars: arr, displayName: username, email: user.email || "" }, { merge: true });
  }
  return Promise.resolve();
}
function loadUnlockedAvatars() {
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => (doc.exists && doc.data().unlockedAvatars) ? doc.data().unlockedAvatars : []);
  }
  return Promise.resolve([]);
}

function saveUnlockedBanners(arr) {
  const user = firebase.auth().currentUser;
  if (user) {
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "")
      || "";
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ unlockedBanners: arr, displayName: username, email: user.email || "" }, { merge: true });
  }
  return Promise.resolve();
}
function loadUnlockedBanners() {
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => (doc.exists && doc.data().unlockedBanners) ? doc.data().unlockedBanners : []);
  }
  return Promise.resolve([]);
}

function saveUnlockedCardbacks(arr) {
  const user = firebase.auth().currentUser;
  if (user) {
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "")
      || "";
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ unlockedCardbacks: arr, displayName: username, email: user.email || "" }, { merge: true });
  }
  return Promise.resolve();
}
function loadUnlockedCardbacks() {
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => (doc.exists && doc.data().unlockedCardbacks) ? doc.data().unlockedCardbacks : []);
  }
  return Promise.resolve([]);
}
