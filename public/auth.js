const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');
const usernameInput = document.getElementById('auth-username');
const errorDiv = document.getElementById('auth-error');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authStatus = document.getElementById('auth-status');

signupBtn.onclick = function(e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value; // NEW
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Set the displayName!
      return userCredential.user.updateProfile({
        displayName: username
      }).then(() => {
        // Optionally: save username to Firestore for profile features later
        return firebase.firestore().collection('users').doc(userCredential.user.uid).set({
          username: username
        }, {merge: true});
      }).then(() => {
        errorDiv.textContent = "";
        authStatus.textContent = "Signed up as " + username;
      });
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    });
};

loginBtn.onclick = function(e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      errorDiv.textContent = "";
      // Prefer displayName, fallback to email
      const username = userCredential.user.displayName || userCredential.user.email;
      authStatus.textContent = "Logged in as " + username;
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    });
};

logoutBtn.onclick = function() {
  auth.signOut();
};

// Show/hide logout button and status
auth.onAuthStateChanged(user => {
  if (user) {
    logoutBtn.style.display = '';
    // Prefer displayName, fallback to email
    const username = user.displayName || user.email;
    authStatus.textContent = "Logged in as " + username;
    authForm.style.display = 'none';
  } else {
    logoutBtn.style.display = 'none';
    authStatus.textContent = '';
    authForm.style.display = '';
  }
});
