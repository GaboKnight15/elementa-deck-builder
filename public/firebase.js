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
const db = firebase.firestore();
// New login/signup menu elements
const loginMenu          = document.getElementById('login-menu'); 
const loginForm          = document.getElementById('login-form');
const loginBtn           = document.getElementById('login-btn');
const signupBtn          = document.getElementById('signup-btn');
const loginUsernameInput = document.getElementById('login-username-input');
const loginEmailInput    = document.getElementById('login-email-input');
const loginPasswordInput = document.getElementById('login-password-input');
const loginError         = document.getElementById('login-error');
const mainHeader         = document.getElementById('main-header');

function saveProgress() {
  const user = auth.currentUser;
  if (!user) {
    console.warn("No user logged in, cannot save progress.");
    return;
  }
  const data = {
    collection: window.playerCollection || {},
    favoriteCards: window.favoriteCards || [],
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
  db.collection('users').doc(user.uid).set(data, { merge: true })
    .then(() => { console.log("Progress saved!"); })
    .catch((error) => { console.error("Error saving progress: ", error); });
}
window.saveProgress = saveProgress;

function loadProgress(user, cb) {
  if (!user) {
    console.warn("No user logged in, cannot load progress.");
    if (typeof cb === "function") cb({});
    return;
  }
 const docRef = db.collection('users').doc(user.uid);
  console.log("Attempting to load progress for user:", user.uid);
  docRef.get()
    .then((doc) => {
      if (!doc.exists) {
        console.warn("No progress doc found for user:", user.uid);
      }
      const data = doc.exists ? doc.data() : {};
      console.log("Loaded data from Firestore:", data);

      // Defensive assignments for all fields!
window.playerCurrency        = Number(data.currency) || 0;
window.playerEssence         = Number(data.essence) || 0;
window.playerLevel           = Number(data.level) || 1;
window.playerExp             = Number(data.exp) || 0;
window.deckSlots             = Array.isArray(data.deckSlots) ? data.deckSlots : ["Deck 1"];
window.decks                 = typeof data.decks !== "undefined" ? data.decks : { "Deck 1": {} };
window.currentDeckSlot       = typeof data.currentDeckSlot !== "undefined" ? data.currentDeckSlot : "Deck 1";
window.playerCollection      = typeof data.collection !== "undefined" ? data.collection : {};
window.favoriteCards         = Array.isArray(data.favoriteCards) ? data.favoriteCards : [];
window.playerQuests          = typeof data.quests !== "undefined" ? data.quests : {};
window.playerAchievements    = typeof data.achievements !== "undefined" ? data.achievements : {};
window.playerUnlockedAvatars = Array.isArray(data.unlockedAvatars) ? data.unlockedAvatars : [];
window.playerUnlockedBanners = Array.isArray(data.unlockedBanners) ? data.unlockedBanners : [];
window.playerUnlockedCardbacks = Array.isArray(data.unlockedCardbacks) ? data.unlockedCardbacks : [];
      if (typeof cb === "function") cb();
    })
    .catch((error) => {
      console.error("Error loading progress:", error);
      if (typeof cb === "function") cb({});
    });
}
window.loadProgress = loadProgress;

// --- Auth state changes ---
auth.onAuthStateChanged(function(user) {
  console.log("AUTH STATE CHANGED, user:", user ? user.uid : user);
  if (user) {
    window.loadProgress(user, function() {
      console.log("After load, window.playerCurrency =", window.playerCurrency);
      // Only now, render UI
      renderPlayerLevel();
      renderGallery();
      refreshDeckSlotSelect();
      updateDeckDisplay();
      renderBuilder();
      updateCurrencyDisplay();
      updateEssenceDisplay();
      updateCollectionDependentUI();
      renderShop();
      ensureQuestSlots();
      renderQuests();
      updateQuestsNotificationDot();  
      startQuestTimers();
      updateAchievementsNotificationDot();
      mainHeader.style.display = '';
      profileArea.style.display = '';
      profileMenu.classList.remove('active');
      loginMenu.classList.remove('active');
      appMain.classList.add('active');
      mainNav.classList.add('active');
      loadProfile(user);  
    });
  } else {
    console.log("User logged out, setting defaults");
    // Reset UI and data to logged-out state
    mainHeader.style.display = 'none';
    profileArea.style.display = 'none';
    profileMenu.classList.remove('active');
    loginMenu.classList.add('active');
    appMain.classList.remove('active');
    mainNav.classList.remove('active');
    loginUsernameInput.value = "";
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
    loginError.textContent = "";
    window.playerCollection = {};
    window.deckSlots = ["Deck 1"];
    window.decks = { "Deck 1": {} };
    window.currentDeckSlot = "Deck 1";
    window.playerCurrency = 0;
    window.playerEssence = 0;
    window.playerQuests = {};
    window.playerAchievements = {};
    window.playerLevel = 1;
    window.playerExp = 0;
    window.playerUnlockedAvatars = [typeof defaultIcon !== "undefined" ? defaultIcon : ""];
    window.playerUnlockedBanners = [typeof defaultBanner !== "undefined" ? defaultBanner : ""];
    window.playerUnlockedCardbacks = [];
    renderPlayerLevel();
    renderGallery();
    refreshDeckSlotSelect();
    updateDeckDisplay();
    renderBuilder();
    updateCurrencyDisplay();
    updateEssenceDisplay();
    renderShop();
    updateCollectionDependentUI();
  }
});

function signup() {
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value;
  const username = loginUsernameInput.value.trim();
  loginError.textContent = "";
  if (!username) {
    loginError.textContent = "Enter a username.";
    return;
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      console.log("[auth] Signup successful", userCredential.user);
      // Set initial profile and progress fields in Firestore for new user
      const userDoc = firebase.firestore().collection('users').doc(userCredential.user.uid);
      return userCredential.user.updateProfile({
        displayName: username
      }).then(function() {
        // Set profile fields and initialize all progress fields
        return userDoc.set({
          username: username,
          profilePic: defaultIcon,
          profileBanner: defaultBanner,
          unlockedAvatars: [defaultIcon],
          unlockedBanners: [defaultBanner],
          // --- Progress fields ---
          collection: {},
          deckSlots: ["Deck 1"],
          decks: { "Deck 1": {} },
          currentDeckSlot: "Deck 1",
          currency: 0,
          essence: 0,
          quests: {},
          achievements: {},
          level: 1,
          exp: 0,
          unlockedCardbacks: []
        }, {merge: true});
      });
    })
    .catch(function(err) {
      loginError.textContent = err.message;
      console.error("[auth] Signup failed", err);
    });
}
function login() {
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value;
  loginError.textContent = "";
  auth.signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      console.log("[auth] Login successful", userCredential.user);
    })
    .catch(function(err) {
      loginError.textContent = err.message;
      console.error("[auth] Login failed", err);
    });
}
window.login = login;
window.signup = signup;
// --- Attach event handlers ---
if (loginForm) loginForm.onsubmit = function(e) {
  e.preventDefault();
  login();
};
if (loginBtn) loginBtn.onclick = function(e) {
  e.preventDefault();
  login();
};
if (signupBtn) signupBtn.onclick = function(e) {
  e.preventDefault();
  signup();
};
