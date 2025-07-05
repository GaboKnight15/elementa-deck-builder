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

const auth = firebase.auth();

function saveProgress(progressData) {
  const user = firebase.auth().currentUser;
  if (user) {
    let username = user.displayName 
      || (user.email ? user.email.split('@')[0] : "")
      || "";
    firebase.firestore().collection('users').doc(user.uid).set(
      { ...progressData, displayName: username, email: user.email || "" },
      { merge: true }
    )
    .then(() => { console.log("Progress saved!"); })
    .catch((error) => { console.error("Error saving progress: ", error); });
  } else {
    console.warn("No user logged in, cannot save progress.");
  }
}

function loadProgress(callback) {
  const user = firebase.auth().currentUser;
  if (user) {
    firebase.firestore().collection('users').doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) callback(doc.data());
        else { console.log("No saved progress yet."); callback({}); }
      })
      .catch((error) => { console.error("Error loading progress: ", error); callback(null); });
  } else {
    console.warn("No user logged in, cannot load progress.");
    callback(null);
  }
}

window.saveProgress = saveProgress;
window.loadProgress = loadProgress;
