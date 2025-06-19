// --- Profile / Auth DOM Elements ---
const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');
const usernameInput = document.getElementById('usernameInput');
const errorDiv = document.getElementById('auth-error');
const authStatus = document.getElementById('auth-status');

const profileArea = document.getElementById('profile-area');
const profileMenu = document.getElementById('profile-menu');
const profilePic = document.getElementById('profile-pic');
const profilePicLarge = document.getElementById('profile-pic-large');
const profileUsername = document.getElementById('profile-username');
const profileEditForm = document.getElementById('profile-edit-form');
const newUsernameInput = document.getElementById('new-username');
const saveUsernameBtn = document.getElementById('save-username-btn');
const profileIcons = document.getElementById('profile-icons');

const profileEditUsernameBtn = document.getElementById('edit-username-btn');
const profileChangePicBtn = document.getElementById('change-profile-btn');
const profileLogoutBtn = document.getElementById('profile-logout-btn');
const profileLoginBtn = document.getElementById('profile-login-btn');
const profileSignupBtn = document.getElementById('profile-signup-btn');

const authSignupBtn = document.getElementById('auth-signup-btn');
const authLoginBtn = document.getElementById('auth-login-btn');
const authLogoutBtn = document.getElementById('auth-logout-btn');

const authContainer = document.getElementById('auth-container');

// --- Profile Icon Choices ---
const iconOptions = [
  "CardImages/Avatars/Avatar1.png",
  "CardImages/Avatars/Avatar2.png",
  "CardImages/Avatars/Avatar3.png",
  "CardImages/Avatars/Avatar4.png",
  "CardImages/Avatars/Avatar5.png"
];

// --- Menu Show/Hide Logic ---
profileArea.onclick = () => {
  e.stopPropagation();
  profileMenu.classList.toggle('hidden');
};
// Hide menu when clicking outside
document.addEventListener('click', (e) => {
  if (!profileMenu.classList.contains('hidden') &&
      !profileMenu.contains(e.target) &&
      !profileArea.contains(e.target)) {
    profileMenu.classList.add('hidden');
  }
});

// --- Render Icon Choices ---
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

// --- Auth form logic (for modal style, keep for fallback) ---
authForm.onsubmit = function(e) {
  e.preventDefault();
  // Default to signup if user clicks enter (can adjust if desired)
  signup();
};
authLoginBtn.onclick = function(e) {
  e.preventDefault();
  login();
};
authSignupBtn.onclick = function(e) {
  e.preventDefault();
  signup();
};
if(authLogoutBtn) {
  authLogoutBtn.onclick = function() {
    auth.signOut();
  };
}

function signup() {
  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value;
  if (!username) {
    errorDiv.textContent = "Please enter a username.";
    return;
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      return userCredential.user.updateProfile({
        displayName: username
      }).then(() => {
        // Optionally: save username and default icon to Firestore
        return firebase.firestore().collection('users').doc(userCredential.user.uid)
          .set({
            username: username,
            profilePic: iconOptions[0]
          }, {merge: true});
      });
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    });
}

function login() {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(err => {
      errorDiv.textContent = err.message;
    });
}

// --- Profile menu button logic ---
profileLogoutBtn.onclick = () => auth.signOut();

profileLoginBtn.onclick = () => {
  // Show login/signup UI (you may want to use a modal instead)
  authContainer.style.display = '';
  profileMenu.classList.add('hidden');
};
profileSignupBtn.onclick = () => {
  // Show login/signup UI (you may want to use a modal instead)
  authContainer.style.display = '';
  profileMenu.classList.add('hidden');
};

// --- Username edit ---
profileEditUsernameBtn.onclick = () => {
  profileEditForm.classList.remove('hidden');
  newUsernameInput.value = profileUsername.textContent;
};
saveUsernameBtn.onclick = () => {
  const user = auth.currentUser;
  const newUsername = newUsernameInput.value.trim();
  if (!user || !newUsername) return;
  user.updateProfile({ displayName: newUsername }).then(() => {
    return firebase.firestore().collection('users').doc(user.uid)
      .set({ username: newUsername }, {merge: true});
  }).then(() => {
    profileEditForm.classList.add('hidden');
    loadProfile(user); // Update UI
  });
};

// --- Profile icon select ---
function selectProfileIcon(iconUrl) {
  const user = auth.currentUser;
  if (!user) return;
  firebase.firestore().collection('users').doc(user.uid)
    .set({ profilePic: iconUrl }, {merge: true})
    .then(() => {
      profilePic.src = iconUrl;
      profilePicLarge.src = iconUrl;
      renderProfileIcons(iconUrl);
    });
}
profileChangePicBtn.onclick = () => {
  // Reveal icons if hidden (toggle or always show as preferred)
  renderProfileIcons(profilePicLarge.src);
};

// --- Load profile info (username, icon) on login ---
function loadProfile(user) {
  if (!user) return;
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(doc => {
      let icon = iconOptions[0];
      let name = user.displayName || user.email;
      if (doc.exists) {
        const data = doc.data();
        if (data.profilePic) icon = data.profilePic;
        if (data.username) name = data.username;
      }
      profilePic.src = icon;
      profilePicLarge.src = icon;
      profileUsername.textContent = name;
      renderProfileIcons(icon);
    });
}

// --- Auth state change: show/hide UI properly ---
auth.onAuthStateChanged(user => {
  if (user) {
    // Hide old auth UI, show profile menu buttons
    authContainer.style.display = 'none';
    profileLogoutBtn.style.display = '';
    profileEditUsernameBtn.style.display = '';
    profileChangePicBtn.style.display = '';
    profileUsername.style.display = '';
    profilePic.style.display = '';
    profilePicLarge.style.display = '';
    profileLoginBtn.style.display = 'none';
    profileSignupBtn.style.display = 'none';

    loadProfile(user);
  } else {
    // Show login/signup, hide logout/profile options
    authContainer.style.display = '';
    profileLogoutBtn.style.display = 'none';
    profileEditUsernameBtn.style.display = 'none';
    profileChangePicBtn.style.display = 'none';
    profileUsername.textContent = '';
    profilePic.src = iconOptions[0];
    profilePicLarge.src = iconOptions[0];
    profileLoginBtn.style.display = '';
    profileSignupBtn.style.display = '';
    profileEditForm.classList.add('hidden');
    profileIcons.innerHTML = "";
  }
  // Always hide menu on auth change for clarity
  profileMenu.classList.add('hidden');
});
