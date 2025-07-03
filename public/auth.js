// --- Profile / Auth DOM Elements ---
document.addEventListener('DOMContentLoaded', function () {
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
  const profilePic              = document.getElementById('profile-pic');
  const profileUsernameDisplay  = document.getElementById('profile-username-display');
  const profileChangePicBtn     = document.getElementById('change-profile-btn');
  const profileLogoutBtn        = document.getElementById('profile-logout-btn');

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

  // --- ICON CHOICES ---
  async function getUnlockedAvatars() {
    const user = auth.currentUser;
    if (!user) return [defaultIcon];
    const doc = await firebase.firestore().collection('users').doc(user.uid).get();
    if (doc.exists && doc.data().unlockedAvatars) {
      return doc.data().unlockedAvatars;
    }
    return [defaultIcon];
  } 
  // --- Render Profile Avatars ---
  async function renderProfileIcons(selectedIcon) {
    profileIcons.innerHTML = "";
    const unlocked = await getUnlockedAvatars();
    iconOptions.forEach(iconUrl => {
      if (!unlocked.includes(iconUrl)) return; // Only show unlocked
      const img = document.createElement('img');
      img.src = iconUrl;
      img.className = (iconUrl === selectedIcon) ? "selected" : "";
      img.onclick = () => selectProfileIcon(iconUrl);
      profileIcons.appendChild(img);
    });
  }
  async function getUnlockedBanners() {
    const user = auth.currentUser;
    if (!user) return [defaultBanner];
    const doc = await firebase.firestore().collection('users').doc(user.uid).get();
    if (doc.exists && doc.data().unlockedBanners) {
      return doc.data().unlockedBanners;
    }
    return [defaultBanner];
  }

  // --- Render Banners ---
  async function renderProfileBanners(selectedBanner) {
    profileBanners.innerHTML = "";
    const unlocked = await getUnlockedBanners();
    bannerOptions.forEach(bannerUrl => {
      if (!unlocked.includes(bannerUrl)) return;
      const img = document.createElement('img');
      img.src = bannerUrl;
      img.className = (bannerUrl === selectedBanner) ? "selected" : "";
      img.onclick = () => selectProfileBanner(bannerUrl);
      profileBanners.appendChild(img);
    });
  }
    
  // --- Open/Close Avatar Modal ---
  profileChangePicBtn.onclick = function() {
    const currentIcon = profilePic.src.split('?')[0];
    renderProfileIcons(currentIcon);
    profileIconModal.style.display = 'flex';
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
      .then(() => {
        profilePic.src = iconUrl + '?v=' + Date.now();
        renderProfileIcons(iconUrl);
        profileIconModal.style.display = 'none';
        setTimeout(() => loadProfile(user), 500);  
      })
      .catch(err => {
        console.error('[auth] Failed to update profile icon:', err);
      });
  }
    
  // --- Banner Modal ---
  profileBanner.onclick = function() {
    const currentBanner = profileBanner.src.split('?')[0];
    renderProfileBanners(currentBanner);
    profileBannerModal.style.display = 'flex';
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
      .then(() => {
        profileBanner.src = bannerUrl + '?v=' + Date.now();
        renderProfileBanners(bannerUrl);
        profileBannerModal.style.display = 'none';
      })
      .catch(err => {
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
      .then(userCredential => {
        return userCredential.user.updateProfile({
          displayName: username
        }).then(() => {
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
      .catch(err => {
        loginError.textContent = err.message;
      });
  }
  function login() {
    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value;
    loginError.textContent = "";
    auth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        loginError.textContent = err.message;
      });
  }

  profileLogoutBtn.onclick = () => auth.signOut();
    
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
  auth.onAuthStateChanged(async user => {
    if (user) {
    isLoggingOut = false;  
    profileArea.style.display = '';
    profileMenu.classList.remove('active');
    loginMenu.classList.remove('active');
    appMain.classList.add('active');
    mainNav.classList.add('active');
    loadProfile(user);

      // Load ALL progress before updating UI
     playerCollection = await loadCollection();
     let { currency, essence } = await loadCurrencyEssence();
     playerCurrency = (await loadCurrencyEssence()).currency;
     playerEssence = (await loadCurrencyEssence()).essence;
     playerMissions = await loadMissions();
     playerAchievements = await loadAchievements();     
        
    renderGallery();
    refreshDeckSlotSelect();
    updateDeckDisplay();
    renderBuilder();
    loadPlayerCurrencyEssence();
    renderShop();
    await loadDeckState();
    loadPlayerMissionsAchievements(); 
    } else {
      isLoggingOut = true;  
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
      playerMissions = {};
      playerAchievements = {};
      renderGallery();
      refreshDeckSlotSelect();
      updateDeckDisplay();
      renderBuilder();
      setTimeout(() => { isLoggingOut = false; }, 1000);  
     }
  });
});
