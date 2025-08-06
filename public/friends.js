let currentSearchQuery = "";
let currentUserPage = 0;
let lastVisibleUser = null;
let userSearchPages = [];
const USERS_PER_PAGE = 10;

// SEARCH LOGIC
function triggerPlayerSearch(page = 0) {
  const query = document.getElementById('player-search-input').value.trim();
  const resultsDiv = document.getElementById('player-search-results');
  resultsDiv.innerHTML = '<div style="color:#ffe066;">Searching...</div>';
  if (!query) {
    resultsDiv.innerHTML = '<div style="color:#e25555;">Please enter a username or ID.</div>';
    return;
  }
  currentSearchQuery = query;
  currentUserPage = page;

  // Page logic
  let userQuery = firebase.firestore().collection('users')
    .where('username', '>=', query)
    .where('username', '<=', query + '\uf8ff')
    .orderBy('username')
    .limit(USERS_PER_PAGE);

  // If not first page, use startAfter
  if (userSearchPages[page - 1]) {
    userQuery = userQuery.startAfter(userSearchPages[page - 1]);
  }

  userQuery.get().then(function(snap) {
    if (snap.empty) {
      resultsDiv.innerHTML = '<div style="color:#e25555;">No players found.</div>';
      return;
    }
    // Save the last doc for next page
    if (snap.docs.length > 0) {
      lastVisibleUser = snap.docs[snap.docs.length - 1];
      userSearchPages[page] = lastVisibleUser;
    }
    const players = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
    displayPlayerSearchResults(players, page, snap.size < USERS_PER_PAGE);
  });
}
// Utility: get current user info
function getCurrentUserId() {
  return firebase.auth().currentUser?.uid;
}
function getCurrentUsername() {
  return firebase.auth().currentUser?.displayName;
}
// Show the player search modal
function showPlayerSearchModal() {
  document.getElementById('player-search-modal').style.display = 'flex';
  document.getElementById('player-search-input').value = '';
  document.getElementById('player-search-results').innerHTML = '';
}

// Close modal
document.getElementById('close-player-search-modal').onclick = function() {
  document.getElementById('player-search-modal').style.display = 'none';
};

// For example, add this to your Requests tab logic:
document.getElementById('player-search-trigger').onclick = function() {
  userSearchPages = [];
  triggerPlayerSearch(0);
};
// Also search on enter in the input box
document.getElementById('player-search-input').addEventListener('keydown', function(e) {
  if (e.key === "Enter") {
    userSearchPages = [];
    triggerPlayerSearch(0);
  }
});

// Renders results in modal, now with pagination controls
function displayPlayerSearchResults(players, page = 0, isLastPage = false) {
  const resultsDiv = document.getElementById('player-search-results');
  if (!players.length) {
    resultsDiv.innerHTML = '<div style="color:#e25555;">No players found.</div>';
    return;
  }
  resultsDiv.innerHTML = '';
  players.forEach(player => {
    const tile = document.createElement('div');
    tile.className = 'friend-profile-tile';
    tile.style.marginBottom = '18px';
    tile.style.cursor = 'pointer';
    tile.dataset.uid = player.uid;
    tile.dataset.username = player.username || player.uid;

    tile.innerHTML = `
      <div style="position:relative;width:100%;height:100px;display:flex;align-items:center;">
        ${player.banner ? `<img class="friend-banner" src="${player.banner}" style="left:0;top:0;width:100%;height:100%;object-fit:cover;opacity:0.55;position:absolute;border-radius:16px;">` : ''}
        <img class="friend-avatar" src="${player.avatar || 'CardImages/Avatars/Default.png'}" alt="avatar" style="width:54px;height:54px;border-radius:50%;border:2px solid #ffe066;margin-left:16px;z-index:2;background:#232a3c;">
        <span class="friend-username" style="margin-left:18px;z-index:2;font-weight:bold;color:#ffe066;font-size:1.13em;">${player.username || player.uid}</span>
      </div>
    `;

    // Attach click handler for menu
    tile.onclick = function(e) {
      e.stopPropagation();
      showPlayerSearchMenu(tile, player);
    };

    resultsDiv.appendChild(tile);
  });

  // --- Pagination controls ---
  const nav = document.createElement('div');
  nav.style.display = 'flex';
  nav.style.justifyContent = 'center';
  nav.style.marginTop = '18px';
  nav.style.gap = '16px';

  if (typeof page !== 'undefined' && page > 0) {
    const prevBtn = document.createElement('button');
    prevBtn.textContent = "Previous";
    prevBtn.onclick = () => triggerPlayerSearch(page - 1);
    nav.appendChild(prevBtn);
  }
  if (!isLastPage) {
    const nextBtn = document.createElement('button');
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => triggerPlayerSearch(page + 1);
    nav.appendChild(nextBtn);
  }
  resultsDiv.appendChild(nav);
}
function showPlayerSearchMenu(tile, player) {
  // Remove any existing menus
  let menu = document.getElementById('player-search-menu');
  if (menu) menu.remove();

  menu = document.createElement('div');
  menu.id = 'player-search-menu';
  menu.className = 'menu';
  menu.style.position = 'absolute';
  menu.style.zIndex = 9999;
  menu.style.minWidth = '160px';
  menu.innerHTML = `
    <button class="settings-item" style="width:100%;text-align:left;">
      <img src="OtherImages/Icons/View.png" alt="View" style="width:20px;vertical-align:middle;margin-right:10px;"> View
    </button>
    <button class="settings-item" style="width:100%;text-align:left;">
      <img src="OtherImages/Icons/Friends.png" alt="Add" style="width:20px;vertical-align:middle;margin-right:10px;"> Send Friend Request
    </button>
  `;

  // "View" action
  menu.children[0].onclick = function(e) {
    e.stopPropagation();
    showFullCardModal({ avatar: player.avatar, banner: player.banner, username: player.username, uid: player.uid });
    menu.remove();
  };
  // "Send Friend Request" action
  menu.children[1].onclick = function(e) {
    e.stopPropagation();
    sendFriendRequest(player.username || player.uid);
    menu.remove();
  };

  // Position menu near tile
  const rect = tile.getBoundingClientRect();
  placeMenuWithinViewport(menu, rect);

  // Remove menu if clicking outside
  setTimeout(() => {
    document.body.addEventListener('click', function handler(e) {
      if (!menu.contains(e.target)) menu.remove();
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 20);

  // Prevent menu from closing if clicked inside
  menu.onclick = (e) => e.stopPropagation();
}
// Look up a user by username (returns {uid, username} or null)
function findUserByUsername(username, cb) {
  if (!username) {
    if (typeof cb === "function") cb(null);
    return;
  }
  firebase.firestore().collection('users')
    .where('username', '==', username).limit(1).get()
    .then(function(snap) {
      if (snap.empty) {
        if (typeof cb === "function") cb(null);
        return;
      }
      const doc = snap.docs[0];
      if (typeof cb === "function") cb({ uid: doc.id, ...doc.data() });
    });
}

// Send a friend request by username
function sendFriendRequest(username) {
  if (!username) return;
  const currentUid = getCurrentUserId();
  const currentUsername = getCurrentUsername();
  if (!currentUid || !currentUsername) {
    showToast("You must be logged in!");
    return;
  }
  findUserByUsername(username, function(user) {
    if (!user) {
      showToast("No user found with that username.");
      return;
    }
    if (user.uid === currentUid) {
      showToast("You can't add yourself!");
      return;
    }
    // Fetch their existing requests
    const ref = firebase.firestore().collection('users').doc(user.uid);
    ref.get().then(function(doc) {
      const requests = doc.data()?.friendRequests || [];
      // Prevent duplicate requests
      if (requests.some(r => r.fromUid === currentUid)) {
        showToast("Request already sent!");
        return;
      }
      // Add request
      requests.push({ fromUid: currentUid, fromUsername: currentUsername });
      ref.set({ friendRequests: requests }, { merge: true }).then(function() {
        showToast("Friend request sent!");
      });
    });
  });
}

// Accept a friend request
function acceptFriendRequest(fromUid, fromUsername) {
  const currentUid = getCurrentUserId();
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(function(doc) {
    let requests = doc.data()?.friendRequests || [];
    // Remove from requests
    requests = requests.filter(r => r.fromUid !== fromUid);
    // Add to friends
    let friends = doc.data()?.friends || [];
    if (!friends.includes(fromUid)) friends.push(fromUid);
    userRef.set({ friends, friendRequests: requests }, { merge: true }).then(function() {
      // Also add you to their friends
      const theirRef = firebase.firestore().collection('users').doc(fromUid);
      theirRef.get().then(function(theirDoc) {
        let theirFriends = theirDoc.data()?.friends || [];
        if (!theirFriends.includes(currentUid)) theirFriends.push(currentUid);
        theirRef.set({ friends: theirFriends }, { merge: true }).then(function() {
          showToast(`You and ${fromUsername} are now friends!`);
          renderFriendNotifications();
          renderFriendsList();
        });
      });
    });
  });
}

// Decline a friend request
function declineFriendRequest(fromUid) {
  const currentUid = getCurrentUserId();
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(function(doc) {
    let requests = doc.data()?.friendRequests || [];
    requests = requests.filter(r => r.fromUid !== fromUid);
    userRef.set({ friendRequests: requests }, { merge: true }).then(function() {
      renderFriendNotifications();
      renderFriendsList();
    });
  });
}

// Show a red dot if there are pending requests
function renderFriendNotifications() {
  const currentUid = getCurrentUserId();
  if (!currentUid) return;
  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const requests = doc.data()?.friendRequests || [];
    const dot = document.getElementById('friends-notification-dot');
    if (dot) dot.style.display = requests.length > 0 ? 'block' : 'none';
  });
}

// Render pending requests in friend modal
function renderFriendsList() {
  const modal = document.getElementById('friends-modal');
  const list = document.getElementById('friends-list');
  list.innerHTML = '<div>Loading...</div>';
  const currentUid = getCurrentUserId();
  if (!currentUid) {
    list.innerHTML = "<div>Please log in.</div>";
    return;
  }
  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const ids = doc.data()?.friends || [];
    const requests = doc.data()?.friendRequests || [];
    // Pending requests section
    if (requests.length) {
      const pendingDiv = document.createElement('div');
      pendingDiv.innerHTML = `<b>Friend Requests:</b>`;
      requests.forEach(r => {
        const entry = document.createElement('div');
        entry.className = 'friend-request-entry';
        entry.innerHTML = `
          <span>${r.fromUsername}</span>
          <button onclick="acceptFriendRequest('${r.fromUid}', '${r.fromUsername}')">Accept</button>
          <button onclick="declineFriendRequest('${r.fromUid}')">Decline</button>
        `;
        pendingDiv.appendChild(entry);
      });
      list.appendChild(pendingDiv);
    }
    // Friends section
    if (!ids.length) {
      list.innerHTML += '<div>No friends yet. Add someone by username!</div>';
      return;
    }
    ids.forEach(fid => {
      const entry = document.createElement('div');
      entry.className = 'friend-entry';
      entry.innerHTML = `
        <span>${fid}</span>
        <button onclick="viewFriendProfile('${fid}')">View</button>
        <button onclick="removeFriend('${fid}')">Remove</button>
      `;
      list.appendChild(entry);
    });
  });
}

document.getElementById('tab-friends').onclick = function() {
  this.classList.add('selected');
  document.getElementById('tab-requests').classList.remove('selected');
  document.getElementById('tab-blocked').classList.remove('selected');
  document.getElementById('panel-friends').style.display = '';
  document.getElementById('panel-requests').style.display = 'none';
  document.getElementById('panel-blocked').style.display = 'none';
};
document.getElementById('tab-requests').onclick = function() {
  this.classList.add('selected');
  document.getElementById('tab-friends').classList.remove('selected');
  document.getElementById('tab-blocked').classList.remove('selected');
  document.getElementById('panel-friends').style.display = 'none';
  document.getElementById('panel-requests').style.display = '';
  document.getElementById('panel-blocked').style.display = 'none';
};
document.getElementById('tab-blocked').onclick = function() {
  this.classList.add('selected');
  document.getElementById('tab-friends').classList.remove('selected');
  document.getElementById('tab-requests').classList.remove('selected');
  document.getElementById('panel-friends').style.display = 'none';
  document.getElementById('panel-requests').style.display = 'none';
  document.getElementById('panel-blocked').style.display = '';
};
document.getElementById('close-friends-modal').onclick = function() {
  document.getElementById('friends-modal').style.display = 'none';
};
document.getElementById('requests-search-trigger').onclick = function() {
  const value = document.getElementById('search-friends').value;
  document.getElementById('player-search-input').value = value;
  showPlayerSearchModal();
  if (value) {
    userSearchPages = [];
    triggerPlayerSearch(0);
  }
};

window.sendFriendRequest = sendFriendRequest;
window.acceptFriendRequest = acceptFriendRequest;
window.declineFriendRequest = declineFriendRequest;
window.renderFriendsList = renderFriendsList;
