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

  // --- Profile Icon Choices ---
  const iconOptions = [
    "CardImages/Avatars/Avatar1.png",
    "CardImages/Avatars/Avatar2.png",
    "CardImages/Avatars/Avatar3.png",
    "CardImages/Avatars/Avatar4.png",
    "CardImages/Avatars/Avatar5.png"
  ];
  const defaultIcon = "CardImages/Avatars/Default.png";

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

  function loadProfile(user) {
    if (!user) return;
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => {
        let icon = "CardImages/Avatars/Avatar1.png";
        let name = user.displayName || user.email;
        if (doc.exists) {
          const data = doc.data();
          if (data && data.profilePic) icon = data.profilePic;
          if (data && data.username) name = data.username;
        }
        document.getElementById('profile-pic').src = icon;
        profileUsernameDisplay.textContent = name;
      })
      .catch(err => {
        document.getElementById('profile-pic').src = "CardImages/Avatars/Default.png";
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
