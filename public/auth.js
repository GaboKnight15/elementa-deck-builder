const profileArea            = document.getElementById('profile-area'); 
const profileMenu            = document.getElementById('profile-menu');
const profilePic             = document.getElementById('profile-pic');
let profilePicMenuBtn        = document.getElementById('profile-pic-btn');
const profilePicMenu         = document.getElementById('profile-pic-menu');
const profileUsernameDisplay = document.getElementById('profile-username-display');

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

const defaultIcon = "CardImages/Avatars/Default.png";
const defaultBanner = "CardImages/Banners/DefaultBanner.png";
// --- Profile Icon Choices ---
const iconOptions = [
    "CardImages/Avatars/Default.png",
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
  
const bannerOptions = [
  "CardImages/Banners/DefaultBanner.png",
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
      if (profilePicMenu) profilePicMenu.src = icon;
      profileUsernameDisplay.textContent = name;
      profileBanner.src = banner;
    })
    .catch(err => {
      profilePic.src = defaultIcon;
      profileBanner.src = defaultBanner;
      profileUsernameDisplay.textContent = user.displayName || user.email || "";
    });
}
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
    
if (!profilePicMenuBtn) {
  // Create the button if it doesn't exist
  profilePicMenuBtn = document.createElement('button');
  profilePicMenuBtn.id = 'profile-pic-btn';
  profilePicMenuBtn.style.display = 'none';
  document.body.appendChild(profilePicMenuBtn);
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
profilePicMenuBtn.onclick = function() {
  const currentIcon = profilePicMenu && profilePicMenu.src ? profilePicMenu.src.split('?')[0] : "";
  getUnlockedAvatars(function(unlocked) {
    renderProfileIcons(currentIcon, unlocked);
    if (profileIconModal) profileIconModal.style.display = 'flex';
  });
};
closeProfileIconModalBtn.onclick = function() {
  if (profileIconModal) profileIconModal.style.display = 'none';
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
    window.playerProfilePic = iconUrl;
    firebase.firestore().collection('users').doc(user.uid)
      .set({ profilePic: iconUrl }, {merge: true})
      .then(function() {
          if (profilePic) profilePic.src = iconUrl;
          if (profilePicMenu) profilePicMenu.src = iconUrl;          
          getUnlockedAvatars(function(unlocked) {
              renderProfileIcons(iconUrl, unlocked);
          });
          if (profileIconModal) profileIconModal.style.display = 'none';
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
    window.playerProfileBanner = bannerUrl;
    firebase.firestore().collection('users').doc(user.uid)
      .set({ profileBanner: bannerUrl }, { merge: true })
      .then(function() {
        getUnlockedBanners(function(unlocked) {
          renderProfileBanners(bannerUrl, unlocked);
        });
        if (profileBannerModal) profileBannerModal.style.display = 'none';
      })
      .catch(function(err) {
        console.error('[auth] Failed to update profile banner:', err);
      });
  }

// --- Profile menu open logic ---
profileArea.onclick = function(e) {
  e.stopPropagation();
  // Menu rules: close all other open menus
  document.querySelectorAll('.menu').forEach(m => {
    if (m !== profileMenu) m.style.display = 'none';
  });

  // Show menu
  profileMenu.style.display = 'block';
  profileMenu.style.position = 'absolute';
  profileMenu.style.zIndex = 2000;

  // Use placeMenuWithinViewport from shared.js to position near profile image
  // Anchor is profilePic if available, else profileArea
  const anchorEl = profilePic || profileArea;
  const rect = anchorEl.getBoundingClientRect();
  if (typeof placeMenuWithinViewport === 'function') {
    placeMenuWithinViewport(profileMenu, rect, 'below');
  } else {
    // fallback: position below anchor
    const top = rect.bottom + window.scrollY + 8;
    const left = rect.left + window.scrollX;
    profileMenu.style.top = `${top}px`;
    profileMenu.style.left = `${left}px`;
  }
};

// Hide menu on outside click (like other menus)
document.body.addEventListener('click', function(e) {
  if (
    profileMenu.style.display === 'block' &&
    !profileMenu.contains(e.target) &&
    !profileArea.contains(e.target)
  ) {
    profileMenu.style.display = 'none';
  }
});

// Prevent menu from closing if clicking inside
profileMenu.onclick = function(e) {
  e.stopPropagation();
};
});
