// --- Profile / Auth DOM Elements ---
const profileArea = document.getElementById('profile-area');
const profileMenu = document.getElementById('profile-menu');
const profileAuthSection = document.getElementById('profile-auth-section');
const profileAccountSection = document.getElementById('profile-account-section');

const profilePicLarge = document.getElementById('profile-pic-large');
const profilePicLargeAuth = document.getElementById('profile-pic-large-auth');
const profileUsernameDisplay = document.getElementById('profile-username-display');
const profileEditForm = document.getElementById('profile-edit-form');
const newUsernameInput = document.getElementById('new-username');
const saveUsernameBtn = document.getElementById('save-username-btn');
const profileIcons = document.getElementById('profile-icons');

const profileEditUsernameBtn = document.getElementById('edit-username-btn');
const profileChangePicBtn = document.getElementById('change-profile-btn');
const profileLogoutBtn = document.getElementById('profile-logout-btn');
const profileLoginBtn = document.getElementById('profile-login-btn');
const profileSignupBtn = document.getElementById('profile-signup-btn');

const profileUsernameInput = document.getElementById('profile-username-input');
const profileEmailInput = document.getElementById('profile-email-input');
const profilePasswordInput = document.getElementById('profile-password-input');
const profileAuthError = document.getElementById('profile-auth-error');

// --- Profile Icon Choices ---
const iconOptions = [
  "CardImages/Avatars/Avatar1.png",
  "CardImages/Avatars/Avatar2.png",
  "CardImages/Avatars/Avatar3.png",
  "CardImages/Avatars/Avatar4.png",
  "CardImages/Avatars/Avatar5.png"
];

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
    profilePasswordInput.value = "";
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

// --- Signup/Login logic for modal/profile menu ---
profileLoginBtn.onclick = function(e) {
  e.preventDefault();
  login();
};
profileSignupBtn.onclick = function(e) {
  e.preventDefault();
  signup();
};

function signup() {
  const email = profileEmailInput.value;
  const password = profilePasswordInput.value;
  const username = profileUsernameInput.value;
  profileAuthError.textContent = "";
  if (!username) {
    profileAuthError.textContent = "Please enter a username.";
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
    });
}

function login() {
  const email = profileEmailInput.value;
  const password = profilePasswordInput.value;
  profileAuthError.textContent = "";
  auth.signInWithEmailAndPassword(email, password)
    .catch(err => {
      profileAuthError.textContent = err.message;
    });
}

// --- Profile menu button logic ---
profileLogoutBtn.onclick = () => auth.signOut();

// --- Username edit ---
profileEditUsernameBtn.onclick = () => {
  profileEditForm.classList.remove('hidden');
  newUsernameInput.value = profileUsernameDisplay.textContent;
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
      profilePicLarge.src = iconUrl;
      profilePicLargeAuth.src = iconUrl;
      renderProfileIcons(iconUrl);
    });
}
profileChangePicBtn.onclick = () => {
  // Reveal icons (always show after click, or toggle to your preference)
  renderProfileIcons(profilePicLargeAuth.src);
  profileIcons.style.display = '';
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
      profilePicLarge.src = icon;
      profilePicLargeAuth.src = icon;
      profileUsernameDisplay.textContent = name;
      renderProfileIcons(icon);
    });
}

// --- Auth state change: show/hide UI properly ---
auth.onAuthStateChanged(user => {
  if (user) {
    // Show profile account section, hide auth section
    profileAuthSection.classList.add('hidden');
    profileAccountSection.classList.remove('hidden');
    profileEditForm.classList.add('hidden');
    loadProfile(user);
  } else {
    // Show login/signup, hide profile account section
    profileAuthSection.classList.remove('hidden');
    profileAccountSection.classList.add('hidden');
    profileEditForm.classList.add('hidden');
    profileUsernameInput.value = "";
    profileEmailInput.value = "";
    profilePasswordInput.value = "";
    profileAuthError.textContent = "";
    if (profilePicLarge) profilePicLarge.src = iconOptions[0];
    if (profilePicLargeAuth) profilePicLargeAuth.src = iconOptions[0];
    if (profileUsernameDisplay) profileUsernameDisplay.textContent = "";
    profileIcons.innerHTML = "";
  }
  // Always hide menu on auth change for clarity
  profileMenu.classList.add('hidden');
});
