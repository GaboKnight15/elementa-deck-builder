// --- Profile / Auth DOM Elements ---
document.addEventListener('DOMContentLoaded', function () {
  const profileArea            = document.getElementById('profile-area');
  const profileMenu            = document.getElementById('profile-menu');
  const profileAuthSection     = document.getElementById('profile-auth-section');
  const profileAccountSection  = document.getElementById('profile-account-section');

  const profilePic              = document.getElementById('profile-pic');
  const profileUsernameDisplay  = document.getElementById('profile-username-display');

  const profileChangePicBtn     = document.getElementById('change-profile-btn');
  const profileLogoutBtn        = document.getElementById('profile-logout-btn');
  const profileLoginBtn         = document.getElementById('profile-login-btn');
  const profileSignupBtn        = document.getElementById('profile-signup-btn');

  const profileUsernameInput = document.getElementById('profile-username-input');
  const profileEmailInput = document.getElementById('profile-email-input');
  const profilePasswordInput = document.getElementById('profile-password-input');
  const profileAuthError = document.getElementById('profile-auth-error');
  const profileAuthForm = document.getElementById('profile-auth-form');

  const profileIconModal = document.getElementById('profile-icon-modal');
  const profileIconModalContent = document.getElementById('profile-icon-modal-content');
  const profileIcons = document.getElementById('profile-icons');
  const closeProfileIconModalBtn = document.getElementById('close-profile-icon-modal');

  const appMain = document.getElementById('app-main');
  const mainNav = document.getElementById('main-nav');

  // --- Profile Icon Choices ---
  const iconOptions = [
    "CardImages/Avatars/Avatar1.png",
    "CardImages/Avatars/Avatar2.png",
    "CardImages/Avatars/Avatar3.png",
    "CardImages/Avatars/Avatar4.png",
    "CardImages/Avatars/Avatar5.png"
  ];
  const defaultIcon = "CardImages/Avatars/Default.png";

  // --- Menu Show/Hide Logic ---
  profileArea.onclick = function(e) {
    e.stopPropagation();
    profileMenu.classList.toggle('hidden');
  };
  // Hide menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!profileMenu.classList.contains('hidden') &&
        !profileMenu.contains(e.target) &&
        !profileArea.contains(e.target)) {
      profileMenu.classList.add('hidden');
      // Optionally clear sensitive fields
      if (profilePasswordInput) profilePasswordInput.value = "";
    }
  });

  // Prevent menu clicks from closing menu
  profileMenu.onclick = function(e) {
    e.stopPropagation();
  };

  // --- ICON CHOICES ---
  function renderProfileIcons(selectedIcon) {
    profileIcons.innerHTML = "";
    iconOptions.forEach(iconUrl => {
      const img = document.createElement('img');
      img.src = iconUrl;
      img.className = (iconUrl === selectedIcon) ? "selected" : "";
      img.onclick = () => selectProfileIcon(iconUrl);
      profileIcons.appendChild(img);
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
  profileAuthForm.onsubmit = function(e) {
    e.preventDefault();
    login();
  };
  profileLoginBtn.onclick = function(e) {
    e.preventDefault();
    login();
  };
  profileSignupBtn.onclick = function(e) {
    e.preventDefault();
    signup();
  };

  function signup() {
    const email = profileEmailInput.value.trim();
    const password = profilePasswordInput.value;
    const username = profileUsernameInput.value.trim();
    profileAuthError.textContent = "";
    if (!username) {
      profileAuthError.textContent = "Enter a username.";
      return;
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user.updateProfile({
          displayName: username
        }).then(() => {
          // Save username and default icon to Firestore
          return firebase.firestore().collection('users').doc(userCredential.user.uid)
            .set({
              username: username,
              profilePic: iconOptions[0]
            }, {merge: true});
        });
      })
      .catch(err => {
        profileAuthError.textContent = err.message;
        console.error('[auth] Signup error:', err);
      });
  }

  function login() {
    const email = profileEmailInput.value.trim();
    const password = profilePasswordInput.value;
    profileAuthError.textContent = "";
    auth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        profileAuthError.textContent = err.message;
        console.error('[auth] Login error:', err);
      });
  }

  // --- Profile menu button logic ---
  profileLogoutBtn.onclick = () => auth.signOut();

  // --- Load profile info (username, icon) on login ---
  function loadProfile(user) {
    if (!user) return;
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => {
        let icon = iconOptions[0];
        let name = user.displayName || user.email;
        if (doc.exists) {
          const data = doc.data();
          if (data && data.profilePic) icon = data.profilePic;
          if (data && data.username) name = data.username;
        }
        profilePic.src = icon;
        profileUsernameDisplay.textContent = name;
        renderProfileIcons(icon);
      })
      .catch(err => {
        // Fallback to defaults if Firestore fails
        console.error('[auth] Failed to load profile:', err);
        profilePic.src = defaultIcon;
        profileUsernameDisplay.textContent = user.displayName || user.email || "";
        renderProfileIcons(defaultIcon);
      });
  }

  auth.onAuthStateChanged(user => {
    console.log('[auth] Auth state changed:', user);
    console.log('[auth] appMain:', appMain, 'mainNav:', mainNav);

    // Profile/account section UI
    if (user) {
      profileAuthSection.classList.add('hidden');
      profileAccountSection.classList.remove('hidden');
      profileUsernameDisplay.textContent = user.displayName || user.email || "";
      if (appMain) appMain.style.display = 'block';
      if (mainNav) mainNav.style.display = 'flex';
      loadProfile(user);
      console.log('[auth] Showing #app-main');
    } else {
      profileAuthSection.classList.remove('hidden');
      profileAccountSection.classList.add('hidden');
      profileUsernameInput.value = "";
      profileEmailInput.value = "";
      profilePasswordInput.value = "";
      profileAuthError.textContent = "";
      profilePic.src = defaultIcon;
      if (profileUsernameDisplay) profileUsernameDisplay.textContent = "";
      profileIcons.innerHTML = "";
      if (appMain) appMain.style.display = 'none';
      if (mainNav) mainNav.style.display = 'none';
      console.log('[auth] Hiding #app-main');
    }
    profileMenu.classList.add('hidden');
  });
}); // <-- closes DOMContentLoaded
