// SETTINGS MENU LOGIC
document.addEventListener("DOMContentLoaded", function() {
  const burger = document.getElementById('settings-burger');
  const modal = document.getElementById('settings-modal');
  const closeBtn = document.getElementById('close-settings-modal');
  const toggleNotices = document.getElementById('toggle-notices');
  const toggleMusic = document.getElementById('toggle-music');

  // Open menu
  burger.onclick = function() {
    modal.style.display = 'flex';
    // Load saved settings (example)
    toggleNotices.checked = localStorage.getItem('settings-notices') === 'on';
    toggleMusic.checked = localStorage.getItem('settings-music') === 'on';
  };

  // Close menu
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Toggle handlers
  toggleNotices.onchange = function() {
    localStorage.setItem('settings-notices', this.checked ? 'on' : 'off');
    // Add logic for enabling/disabling notices if needed
  };
  toggleMusic.onchange = function() {
    localStorage.setItem('settings-music', this.checked ? 'on' : 'off');
    // Add logic for enabling/disabling music if needed
  };
    // Logout button logic
  const settingsLogoutBtn = document.getElementById('settings-logout-btn');
  if (settingsLogoutBtn) {
    settingsLogoutBtn.onclick = function() {
      // If you have a function like logout() defined in auth.js:
      if (typeof logout === "function") {
        logout();
      } else if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut().then(function() {
          location.reload();
        });
      }
    };
  }
});
