// firebase-init.js
const firebaseConfig = {
  apiKey: "AIzaSyAyrTkqm_ksTU4dC3ul_cXQc596VptdhXY",
  authDomain: "elementa-31166.firebaseapp.com",
  projectId: "elementa-31166",
  storageBucket: "elementa-31166.appspot.com", // fix typo: should be .appspot.com
  messagingSenderId: "486533994899",
  appId: "1:486533994899:web:88b25a66cbab1731ab7066"
};

firebase.initializeApp(firebaseConfig);
// Make auth global so auth.js can use it
window.auth = firebase.auth();
