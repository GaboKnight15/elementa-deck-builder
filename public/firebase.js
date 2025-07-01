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

// SAVE PROGRESS
function saveProgress(progressData) {
  const user = firebase.auth().currentUser;
  if (user) {
    const db = firebase.firestore();
    db.collection('users').doc(user.uid).set(progressData, { merge: true })
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
// LOAD PROGRESS
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
    db.collection('users').doc(user.uid).set({ collection }, { merge: true })
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
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ deckSlots, decks, currentDeckSlot }, { merge: true });
  }
  return Promise.resolve();
}
// Load decks and slots
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
    firebase.firestore().collection('users').doc(user.uid)
      .set({ currency, essence }, { merge: true });
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
function saveMissions(missions) {
  const user = firebase.auth().currentUser;
  if (user) {
    firebase.firestore().collection('users').doc(user.uid)
      .set({ missions }, { merge: true });
  }
}
function loadMissions() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).get()
        .then(doc => {
          if (doc.exists && doc.data().missions) {
            resolve(doc.data().missions);
          } else {
            resolve({});
          }
        })
        .catch(reject);
    } else {
      resolve({});
    }
  });
}

function saveAchievements(achievements) {
  const user = firebase.auth().currentUser;
  if (user) {
    firebase.firestore().collection('users').doc(user.uid)
      .set({ achievements }, { merge: true });
  }
}
function loadAchievements() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).get()
        .then(doc => {
          if (doc.exists && doc.data().achievements) {
            resolve(doc.data().achievements);
          } else {
            resolve({});
          }
        })
        .catch(reject);
    } else {
      resolve({});
    }
  });
}
// --- FIRESTORE UNLOCKS HELPERS ---

function saveUnlockedAvatars(arr) {
  const user = firebase.auth().currentUser;
  if (user) {
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ unlockedAvatars: arr }, { merge: true });
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
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ unlockedBanners: arr }, { merge: true });
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
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ unlockedCardbacks: arr }, { merge: true });
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
