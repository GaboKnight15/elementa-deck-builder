// SETTINGS MENU LOGIC (Popover version, works across all sections)
document.addEventListener("DOMContentLoaded", function() {
  // Support all settings icons in all sections
  const burgerIds = [
    'settings-burger',
    'gallery-settings-btn',
    'builder-settings-btn',
    'gameplay-settings-btn',
    'shop-settings-btn'
  ];

  const burgers = burgerIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const menu = document.getElementById('settings-menu-pop');
  const toggleNotices = document.getElementById('toggle-notices');
  const toggleMusic = document.getElementById('toggle-music');

  // Open menu for any settings icon
  burgers.forEach(burger => {
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
  });

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
