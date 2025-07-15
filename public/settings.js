// SETTINGS MENU LOGIC (Popover version)
document.addEventListener("DOMContentLoaded", function() {
  const burger = document.getElementById('settings-burger');
  const menu = document.getElementById('settings-menu-pop');
  const toggleNotices = document.getElementById('toggle-notices');
  const toggleMusic = document.getElementById('toggle-music');

  // Open menu
  burger.onclick = function(e) {
    e.stopPropagation();
    // Position menu below the icon (optional: adjust top/right for your layout)
    menu.classList.toggle('active');
    // Load saved settings (example)
    toggleNotices.checked = localStorage.getItem('settings-notices') === 'on';
    toggleMusic.checked = localStorage.getItem('settings-music') === 'on';

    // Hide on outside click
    setTimeout(() => {
      document.body.addEventListener('click', hideSettingsMenu, { once: true });
    }, 10);
  };

  function hideSettingsMenu(e) {
    menu.classList.remove('active');
  }

  // Prevent menu click from closing it
  menu.onclick = function(e) { e.stopPropagation(); };

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
