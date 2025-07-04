// New login/signup menu elements
const loginMenu          = document.getElementById('login-menu'); 
const loginForm          = document.getElementById('login-form');
const loginBtn           = document.getElementById('login-btn');
const signupBtn          = document.getElementById('signup-btn');
const loginUsernameInput = document.getElementById('login-username-input');
const loginEmailInput    = document.getElementById('login-email-input');
const loginPasswordInput = document.getElementById('login-password-input');
const loginError         = document.getElementById('login-error');

const profileArea            = document.getElementById('profile-area');
const profileMenu            = document.getElementById('profile-menu');
const profilePic             = document.getElementById('profile-pic');
const profileUsernameDisplay = document.getElementById('profile-username-display');
const profileChangePicBtn    = document.getElementById('change-profile-btn');
const profileLogoutBtn       = document.getElementById('profile-logout-btn');

const profileIconModal          = document.getElementById('profile-icon-modal');
const profileIcons              = document.getElementById('profile-icons');
const closeProfileIconModalBtn  = document.getElementById('close-profile-icon-modal');

const appMain = document.getElementById('app-main');
const mainNav = document.getElementById('main-nav');
// Banner selection logic
const profileBannerContainer = document.getElementById('profile-banner-container');
const profileBanner = document.getElementById('profile-banner');
const profileBannerModal = document.getElementById('profile-banner-modal');
const profileBanners = document.getElementById('profile-banners');
const closeProfileBannerModalBtn = document.getElementById('close-profile-banner-modal');

// --- Profile Icon Choices ---
const iconOptions = [ 
    "CardImages/Avatars/Faelyra.png",
    "CardImages/Avatars/Kaelyn.png",
    "CardImages/Avatars/Zaryon.png",
    "CardImages/Avatars/Zyra.png",
    "CardImages/Avatars/Veniryss.png",
    "CardImages/Avatars/Gravok.png",
    "CardImages/Avatars/Nyzariel.png",
    "CardImages/Avatars/Elyndra.png",
    "CardImages/Avatars/Aureavian.png",
    "CardImages/Avatars/Maldryss.png",
    "CardImages/Avatars/Tydros.png",
    "CardImages/Avatars/Ephoros.png",
    "CardImages/Avatars/Mordrath.png",
    "CardImages/Avatars/Raukhar.png",
    "CardImages/Avatars/Velmira.png",
    "CardImages/Avatars/Verdarok.png",
    "CardImages/Avatars/Pyronyx.png",
    "CardImages/Avatars/Abyndra.png",
    "CardImages/Avatars/Voltrazek.png",
    "CardImages/Avatars/Toxigon.png",
    "CardImages/Avatars/Ferronyx.png",
    "CardImages/Avatars/Nochtyros.png",
    "CardImages/Avatars/Solaryth.png"
];
const defaultIcon = "CardImages/Avatars/Default.png";
  
const bannerOptions = [
  "CardImages/Banners/Verdara.png",
  "CardImages/Banners/Ashkar.png",
  "CardImages/Banners/Pearlhaven.png",
  "CardImages/Banners/Aetherion.png",
  "CardImages/Banners/Drakzul.png",
  "CardImages/Banners/GlimbarkFrontier.png",
  "CardImages/Banners/SkywardArchipelago.png",
  "CardImages/Banners/Duskhaven.png",
  "CardImages/Banners/Nochtyra.png",
  "CardImages/Banners/Solmara.png",   
  "CardImages/Banners/DefaultBanner.png"
];
const defaultBanner = "CardImages/Banners/DefaultBanner.png";

// --- Load Profile From Firestore ---
function loadProfile(user) {
  if (!user) return;
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(doc => {
      let icon = defaultIcon;
      let name = user.displayName || user.email;
      let banner = defaultBanner;
      if (doc.exists) {
        const data = doc.data();
        if (data && data.profilePic) icon = data.profilePic;
        if (data && data.username) name = data.username;
        if (data && data.profileBanner) banner = data.profileBanner;
      }
      profilePic.src = icon;
      profileUsernameDisplay.textContent = name;
      profileBanner.src = banner;
    })
    .catch(err => {
      profilePic.src = defaultIcon;
      profileBanner.src = defaultBanner;
      profileUsernameDisplay.textContent = user.displayName || user.email || "";
    });
}

// --- Auth state changes ---
auth.onAuthStateChanged(function(user) {
  console.log("[auth] onAuthStateChanged", user);  
  if (user) {
    // Load all player progress and update variables
    window.loadProgress(function() {
      // Now update UI
      renderPlayerLevel();
      renderGallery();
      refreshDeckSlotSelect();
      updateDeckDisplay();
      renderBuilder();
      updateCurrencyDisplay();
      updateEssenceDisplay();
      updateCollectionDependentUI();
      renderShop();

      profileArea.style.display = '';
      profileMenu.classList.remove('active');
      loginMenu.classList.remove('active');
      appMain.classList.add('active');
      mainNav.classList.add('active');
      loadProfile(user);  
    });
  } else {
    profileArea.style.display = 'none';
    profileMenu.classList.remove('active');
    loginMenu.classList.add('active');
    appMain.classList.remove('active');
    mainNav.classList.remove('active');
    loginUsernameInput.value = "";
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
    loginError.textContent = "";

    playerCollection = {};
    deckSlots = ["Deck 1"];
    decks = { "Deck 1": {} };
    currentDeckSlot = "Deck 1";
    playerCurrency = 0;
    playerEssence = 0;
    playerQuests = {};
    playerAchievements = {};
    playerLevel = 1;
    playerExp = 0;
    playerUnlockedAvatars = [defaultIcon];
    playerUnlockedBanners = [defaultBanner];
    playerUnlockedCardbacks = [];
    renderPlayerLevel();
    renderGallery();
    refreshDeckSlotSelect();
    updateDeckDisplay();
    renderBuilder();
    updateCurrencyDisplay();
    updateEssenceDisplay();
    updateCollectionDependentUI();
  }
});

// --- Profile / Auth DOM Elements ---
document.addEventListener('DOMContentLoaded', function () {
  // --- ICON CHOICES ---
  function getUnlockedAvatars(cb) {
    const user = auth.currentUser;
    if (!user) {
      if (typeof cb === "function") cb([defaultIcon]);
      return;
    }
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(function(doc) {
        if (doc.exists && doc.data().unlockedAvatars) {
          playerUnlockedAvatars = doc.data().unlockedAvatars;  
          if (typeof cb === "function") cb(doc.data().unlockedAvatars);
          return;
        }
        if (typeof cb === "function") cb([defaultIcon]);
      });
  } 

  // --- Render Profile Avatars ---
  function renderProfileIcons(selectedIcon, unlocked) {
    profileIcons.innerHTML = "";
    iconOptions.forEach(iconUrl => {
      if (!unlocked.includes(iconUrl)) return;
      const img = document.createElement('img');
      img.src = iconUrl;
      img.className = (iconUrl === selectedIcon) ? "selected" : "";
      img.onclick = function() { selectProfileIcon(iconUrl); };
      profileIcons.appendChild(img);
    });
  }
  function getUnlockedBanners(cb) {
    const user = auth.currentUser;
    if (!user) {
      if (typeof cb === "function") cb([defaultBanner]);
      return;
    }
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(function(doc) {
        if (doc.exists && doc.data().unlockedBanners) {
          playerUnlockedBanners = doc.data().unlockedBanners;   
          if (typeof cb === "function") cb(doc.data().unlockedBanners);
          return;
        }
        if (typeof cb === "function") cb([defaultBanner]);
      });
  }
  // --- Render Banners ---
  function renderProfileBanners(selectedBanner, unlocked) {
    profileBanners.innerHTML = "";
    bannerOptions.forEach(bannerUrl => {
      if (!unlocked.includes(bannerUrl)) return;
      const img = document.createElement('img');
      img.src = bannerUrl;
      img.className = (bannerUrl === selectedBanner) ? "selected" : "";
      img.onclick = function() { selectProfileBanner(bannerUrl); };
      profileBanners.appendChild(img);
    });
  }
    
  // --- Open/Close Avatar Modal ---
  profileChangePicBtn.onclick = function() {
    const currentIcon = profilePic.src.split('?')[0];
    getUnlockedAvatars(function(unlocked) {
      renderProfileIcons(currentIcon, unlocked);
      profileIconModal.style.display = 'flex';
    });
  };
  closeProfileIconModalBtn.onclick = function() {
    profileIconModal.style.display = 'none';
  };
  profileIconModal.onclick = function(e) {
    if (e.target === profileIconModal) {
      profileIconModal.style.display = 'none';
    }
  };
    
  // --- Avatar Selection ---
  function selectProfileIcon(iconUrl) {
    const user = auth.currentUser;
    if (!user) return;
    firebase.firestore().collection('users').doc(user.uid)
      .set({ profilePic: iconUrl }, {merge: true})
      .then(function() {
        getUnlockedAvatars(function(unlocked) {
          renderProfileIcons(iconUrl, unlocked);
        });
      })
      .catch(function(err) {
        console.error('[auth] Failed to update profile icon:', err);
      });
  }

  // --- Banner Modal ---
  profileBanner.onclick = function() {
    const currentBanner = profileBanner.src.split('?')[0];
    getUnlockedBanners(function(unlocked) {
      renderProfileBanners(currentBanner, unlocked);
      profileBannerModal.style.display = 'flex';
    });
  };
  closeProfileBannerModalBtn.onclick = function() {
    profileBannerModal.style.display = 'none';
  };
  profileBannerModal.onclick = function(e) {
    if (e.target === profileBannerModal) {
      profileBannerModal.style.display = 'none';
    }
  };
  // --- Banner Selection ---
  function selectProfileBanner(bannerUrl) {
    const user = auth.currentUser;
    if (!user) return;
    firebase.firestore().collection('users').doc(user.uid)
      .set({ profileBanner: bannerUrl }, { merge: true })
      .then(function() {
        getUnlockedBanners(function(unlocked) {
          renderProfileBanners(bannerUrl, unlocked);
        });
      })
      .catch(function(err) {
        console.error('[auth] Failed to update profile banner:', err);
      });
  }

  // --- Signup/Login logic for modal/profile menu ---
  profileArea.onclick = function(e) {
    e.stopPropagation();
    profileMenu.classList.toggle('active');
  };
  document.addEventListener('click', (e) => {
    if (
      profileMenu.classList.contains('active') &&
      !profileMenu.contains(e.target) &&
      !profileArea.contains(e.target)
    ) {
      profileMenu.classList.remove('active');
    }
  });
  profileMenu.onclick = function(e) { 
    e.stopPropagation(); 
  };

  // --- Auth logic for login/signup ---
  loginForm.onsubmit = function(e) {
    e.preventDefault();
    login();
  };
  loginBtn.onclick = function(e) {
    e.preventDefault();
    login();
  };
  signupBtn.onclick = function(e) {
    e.preventDefault();
    signup();
  };

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
      return userCredential.user.updateProfile({
        displayName: username
      }).then(function() {
        // Set initial profile in Firestore
        return firebase.firestore().collection('users').doc(userCredential.user.uid)
          .set({
            username: username,
            profilePic: defaultIcon,
            profileBanner: defaultBanner,
            unlockedAvatars: [defaultIcon],
            unlockedBanners: [defaultBanner]
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

  profileLogoutBtn.onclick = function() { auth.signOut(); };
});
