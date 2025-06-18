const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');
const errorDiv = document.getElementById('auth-error');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authStatus = document.getElementById('auth-status');

signupBtn.onclick = function(e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      errorDiv.textContent = "";
      authStatus.textContent = "Signed up as " + userCredential.user.email;
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
      authStatus.textContent = "Logged in as " + userCredential.user.email;
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
    authStatus.textContent = "Logged in as " + user.email;
    authForm.style.display = 'none';
  } else {
    logoutBtn.style.display = 'none';
    authStatus.textContent = '';
    authForm.style.display = '';
  }
});
