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
    "CardImages/Banners/Verdara.jpg",
    "CardImages/Banners/Ashkar.jpg",
    "CardImages/Banners/Pearlhaven.jpg",
    "CardImages/Banners/Aetherion.jpg",
    "CardImages/Banners/Drakzul.jpg",
    "CardImages/Banners/GlimbarkFrontier.jpg",
    "CardImages/Banners/SkywardArchipelago.jpg",
    "CardImages/Banners/Duskhaven.jpg",
    "CardImages/Banners/Nochtyra.jpg",
    "CardImages/Banners/Solmara.jpg",   
    "CardImages/Banners/DefaultBanner.jpg"
  ];
const defaultBanner = "CardImages/Banners/DefaultBanner.jpg";

  // --- ICON CHOICES ---
  function getUnlockedAvatars() {
      try {
        return JSON.parse(localStorage.getItem('unlockedAvatars') || '["CardImages/Avatars/Avatar1.png"]');
      } catch (e) {
        return ["CardImages/Avatars/Avatar1.png"];
      }
    }  
function renderProfileIcons(selectedIcon) {
  profileIcons.innerHTML = "";
  const unlocked = getUnlockedAvatars();
  iconOptions.forEach(iconUrl => {
    if (!unlocked.includes(iconUrl)) return; // Only show unlocked now
    const img = document.createElement('img');
    img.src = iconUrl;
    img.className = (iconUrl === selectedIcon) ? "selected" : "";
    img.onclick = () => selectProfileIcon(iconUrl);
    profileIcons.appendChild(img);
  });
}
function getUnlockedBanners() {
  try {
    return JSON.parse(localStorage.getItem('unlockedBanners') || '[]');
  } catch (e) {
    return ["CardImages/Avatars/Avatar1.png"];
  }
}

function renderProfileBanners(selectedBanner) {
  profileBanners.innerHTML = "";
  const unlocked = getUnlockedBanners();
  bannerOptions.forEach(bannerUrl => {
    if (!unlocked.includes(bannerUrl)) return;
    const img = document.createElement('img');
    img.src = bannerUrl;
    img.className = (bannerUrl === selectedBanner) ? "selected" : "";
    img.onclick = () => selectProfileBanner(bannerUrl);
    profileBanners.appendChild(img);
  });
}
  // Open the avatar selection modal
  profileChangePicBtn.onclick = function() {
    const currentIcon = profilePic.src;
    renderProfileIcons(currentIcon);
    profileIconModal.style.display = 'flex';
  };
  // Handle avatar selection
  function selectProfileIcon(iconUrl) {
    const user = auth.currentUser;
    if (!user) return;
    firebase.firestore().collection('users').doc(user.uid)
      .set({ profilePic: iconUrl }, {merge: true})
      .then(() => {
        profilePic.src = iconUrl + '?v=' + Date.now();
        renderProfileIcons(iconUrl);
        profileIconModal.style.display = 'none';
      })
      .catch(err => {
        console.error('[auth] Failed to update profile icon:', err);
      });
  }

  // Close modal with button
  closeProfileIconModalBtn.onclick = function() {
    profileIconModal.style.display = 'none';
  };
  // Close modal when clicking outside the content
  profileIconModal.onclick = function(e) {
    if (e.target === profileIconModal) {
      profileIconModal.style.display = 'none';
    }
  };

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
          return firebase.firestore().collection('users').doc(userCredential.user.uid)
            .set({
              username: username,
              profilePic: "CardImages/Avatars/Avatar1.png"
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

    // Render banner choices
function renderProfileBanners(selectedBanner) {
  profileBanners.innerHTML = "";
  bannerOptions.forEach(bannerUrl => {
    const img = document.createElement('img');
    img.src = bannerUrl;
    img.className = (bannerUrl === selectedBanner) ? "selected" : "";
    img.onclick = () => selectProfileBanner(bannerUrl);
    profileBanners.appendChild(img);
  });
}

// Open banner modal
profileBanner.onclick = function() {
  const currentBanner = profileBanner.src;
  renderProfileBanners(currentBanner);
  profileBannerModal.style.display = 'flex';
};

// Handle banner selection
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

// Close banner modal
closeProfileBannerModalBtn.onclick = function() {
  profileBannerModal.style.display = 'none';
};
profileBannerModal.onclick = function(e) {
  if (e.target === profileBannerModal) {
    profileBannerModal.style.display = 'none';
  }
};
    
  function loadProfile(user) {
    if (!user) return;
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => {
        let icon = "CardImages/Avatars/Avatar1.png";
        let name = user.displayName || user.email;
        let banner = defaultBanner;
        if (doc.exists) {
          const data = doc.data();
          if (data && data.profilePic) icon = data.profilePic;
          if (data && data.username) name = data.username;
          if (data && data.profileBanner) banner = data.profileBanner;
        }
        document.getElementById('profile-pic').src = icon;
        profileUsernameDisplay.textContent = name;
        profileBanner.src = banner;
      })
      .catch(err => {
        document.getElementById('profile-pic').src = "CardImages/Avatars/Default.png";
        profileBanner.src = defaultBanner;
        profileUsernameDisplay.textContent = user.displayName || user.email || "";
      });
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      profileArea.style.display = '';
      profileMenu.classList.remove('active');
      loginMenu.classList.remove('active');
      appMain.classList.add('active');
      mainNav.classList.add('active');
      loadProfile(user);
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
    }
  });
});
