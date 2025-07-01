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
