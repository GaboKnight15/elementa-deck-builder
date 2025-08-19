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
    const currentUid = getCurrentUserId();
    const players = snap.docs
      .map(doc => ({ uid: doc.id, ...doc.data() }))
      .filter(player => player.uid !== currentUid);
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
    tile.style.cursor = 'pointer';
    tile.dataset.uid = player.uid;
    tile.dataset.username = player.username || player.uid;

tile.innerHTML = renderProfileInfoSection({
  profileBanner: player.banner,
  profilePic: player.avatar || 'CardImages/Avatars/Default.png',
  username: player.username || player.uid,
  power: player.power || 0
});
tile.style.borderRadius = "18px"; // Match your modal
tile.style.overflow = "hidden";
tile.style.boxShadow = "0 1px 10px #0005";
tile.style.marginBottom = "18px";
tile.style.cursor = "pointer";
tile.style.background = "#212a3b";  // so it blends if banner is missing

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
// New code for sending a friend request
firebase.firestore()
  .collection('users')
  .doc(user.uid) // recipient's userId
  .collection('requests')
  .add({
    fromUid: currentUid,
    fromUsername: currentUsername,
    timestamp: Date.now()
  })
  .then(() => {
    showToast("Friend request sent!");
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
firebase.firestore().collection('users').doc(fid).get().then(function(friendDoc) {
  const friendData = friendDoc.data() || {};
  entry.innerHTML = `
    ${renderProfileInfoSection({
      profileBanner: friendData.banner,
      profilePic: friendData.avatar || 'CardImages/Avatars/Default.png',
      username: friendData.username || fid,
      power: friendData.power || 0
    })}
    <div style="margin-top:8px;">
      <button onclick="viewFriendProfile('${fid}')">View</button>
      <button onclick="removeFriend('${fid}')">Remove</button>
    </div>
  `;
});
      list.appendChild(entry);
    });
  });
}
function viewFriendProfile(fid) {
  firebase.firestore().collection('users').doc(fid).get().then(function(doc) {
    const friendData = doc.data() || {};
    // Compose the modal data just like for the current user
    const playerData = {
      username: friendData.username || fid,
      profilePic: friendData.avatar || 'CardImages/Avatars/Default.png',
      profileBanner: friendData.banner || 'CardImages/Banners/DefaultBanner.png',
      power: friendData.power || 0,
      // These arrays should be present in your Firestore user doc structure
      achievements: Array.isArray(friendData.achievements) ? friendData.achievements : [],
      badges: Array.isArray(friendData.badges) ? friendData.badges : []
    };
    showProfileModal(playerData); // This is imported from shared.js
  });
}
function renderDiscoverPanel() {
  // Don't overwrite the search input/button! Only update the user list div.
  const usersDiv = document.getElementById('discover-users-list');
  usersDiv.innerHTML = '<div style="color:#ffe066;">Loading random users...</div>';

  const currentUid = getCurrentUserId();
  if (!currentUid) {
    usersDiv.innerHTML = '<div style="color:#e25555;">Please log in.</div>';
    return;
  }

  // Get your current friends, blocked, requests
  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const userData = doc.data() || {};
    const friends = userData.friends || [];
    const blocked = userData.blocked || [];
    const receivedReqs = (userData.friendRequests || []).map(r => r.fromUid);

    // Get sent requests (users to whom you have sent a request)
    firebase.firestore().collection('users').get().then(function(snapshot) {
      let sentRequests = [];
      snapshot.forEach(userDoc => {
        const reqs = userDoc.data()?.friendRequests || [];
        reqs.forEach(r => {
          if (r.fromUid === currentUid) {
            sentRequests.push(userDoc.id);
          }
        });
      });

      // Get random users to display
      firebase.firestore().collection('users').limit(50).get().then(function(snap) {
        let users = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
        users = users.filter(u =>
          u.uid !== currentUid &&                     // not yourself
          !friends.includes(u.uid) &&                 // not your friend
          !blocked.includes(u.uid) &&                 // not blocked
          !receivedReqs.includes(u.uid) &&            // haven't sent you a request
          !sentRequests.includes(u.uid)               // you haven't sent them a request
        );

        usersDiv.innerHTML = '';
        usersDiv.style.display = 'flex';
        usersDiv.style.flexWrap = 'wrap';
        usersDiv.style.gap = '24px'; // spacing between tiles
        usersDiv.style.justifyContent = 'flex-start';
        
        if (!users.length) {
          usersDiv.innerHTML = '<div style="color:#888;">No users to discover!</div>';
        }
        users.forEach(user => {
          const tile = renderProfileTile(user, 'discover');
          tile.style.flex = "0 0 30%";
          tile.style.maxWidth = "32%";
          tile.style.marginBottom = "24px";
          tile.style.boxSizing = "border-box";
          usersDiv.appendChild(tile);
        });
      });
    });
  });

  // Make sure the search logic stays!
  document.getElementById('discover-search-btn').onclick = function() {
    discoverSearch();
  };
  document.getElementById('discover-search-input').onkeydown = function(e) {
    if (e.key === "Enter") discoverSearch();
  };
}

function discoverSearch() {
  const query = document.getElementById('discover-search-input').value.trim();
  const usersDiv = document.getElementById('discover-users-list');
  if (!query) return renderDiscoverPanel();
  usersDiv.innerHTML = '<div style="color:#ffe066;">Searching...</div>';
  firebase.firestore().collection('users')
    .where('username', '>=', query)
    .where('username', '<=', query + '\uf8ff')
    .orderBy('username')
    .limit(10)
    .get().then(snap => {
      let users = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      const currentUid = getCurrentUserId();
      users = users.filter(u => u.uid !== currentUid);

      // --- Layout: 3 per row, flex ---
      usersDiv.innerHTML = '';
      usersDiv.style.display = 'flex';
      usersDiv.style.flexWrap = 'wrap';
      usersDiv.style.gap = '24px';
      usersDiv.style.justifyContent = 'flex-start';

      users.forEach(user => {
        const tile = renderProfileTile(user, 'discover');
        tile.style.flex = "0 0 30%";
        tile.style.maxWidth = "32%";
        tile.style.marginBottom = "24px";
        tile.style.boxSizing = "border-box";
        usersDiv.appendChild(tile);
      });
    });
}
function blockUser(uid) {
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(doc => {
    let blocked = doc.data()?.blocked || [];
    if (!blocked.includes(uid)) blocked.push(uid);
    // Remove from friends/requests too
    let friends = doc.data()?.friends || [];
    friends = friends.filter(id => id !== uid);
    let friendRequests = doc.data()?.friendRequests || [];
    friendRequests = friendRequests.filter(r => r.fromUid !== uid);
    userRef.set({ blocked, friends, friendRequests }, { merge: true }).then(() => {
      showToast('Blocked user.');
      renderBlockedPanel();
      renderFriendsList();
    });
  });
}
function unblockUser(uid) {
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(doc => {
    let blocked = doc.data()?.blocked || [];
    blocked = blocked.filter(id => id !== uid);
    userRef.set({ blocked }, { merge: true }).then(() => {
      showToast('Unblocked user.');
      renderBlockedPanel();
    });
  });
}
document.getElementById('tab-friends').onclick = function() {
  selectFriendsTab();
};
document.getElementById('tab-discover').onclick = function() {
  selectDiscoverTab();
};
document.getElementById('tab-requests').onclick = function() {
  selectRequestsTab();
};
document.getElementById('tab-blocked').onclick = function() {
  selectBlockedTab();
};

function selectFriendsTab() {
  setTab('friends');
  renderFriendsList();
}
function selectDiscoverTab() {
  setTab('discover');
  renderDiscoverPanel();
}
function selectRequestsTab() {
  setTab('requests');
  renderRequestsPanel();
}
function selectBlockedTab() {
  setTab('blocked');
  renderBlockedPanel();
}

function setTab(tab) {
  ['friends', 'discover', 'requests', 'blocked'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.remove('selected');
    document.getElementById(`panel-${t}`).style.display = 'none';
  });
  document.getElementById(`tab-${tab}`).classList.add('selected');
  document.getElementById(`panel-${tab}`).style.display = '';
}
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

function showProfileMenu(tile, user, context) {
  // Remove any open menus
  let menu = document.getElementById('friends-profile-menu');
  if (menu) menu.remove();

  menu = document.createElement('div');
  menu.id = 'friends-profile-menu';
  menu.className = 'menu';
  menu.style.position = 'absolute';
  menu.style.minWidth = '160px';

  // Add context-appropriate actions
  if (context === 'friends') {
    menu.innerHTML += `<button class="settings-item" onclick="viewFriendProfile('${user.uid}')">View</button>`;
    menu.innerHTML += `<button class="settings-item" onclick="removeFriend('${user.uid}')">Unfriend</button>`;
    menu.innerHTML += `<button class="settings-item" onclick="blockUser('${user.uid}')">Block</button>`;
  } else if (context === 'discover') {
    menu.innerHTML += `<button class="settings-item" onclick="viewFriendProfile('${user.uid}')">View</button>`;
    menu.innerHTML += `<button class="settings-item" onclick="sendFriendRequest('${user.username}')">Send Friend Request</button>`;
    menu.innerHTML += `<button class="settings-item" onclick="blockUser('${user.uid}')">Block</button>`;
  } else if (context === 'pending-received') {
    menu.innerHTML += `<button class="settings-item" onclick="viewFriendProfile('${user.uid}')">View</button>`;
    menu.innerHTML += `<button class="settings-item" onclick="acceptFriendRequest('${user.uid}', '${user.username}')">Accept</button>`;
    menu.innerHTML += `<button class="settings-item" onclick="declineFriendRequest('${user.uid}')">Decline</button>`;
    menu.innerHTML += `<button class="settings-item" onclick="blockUser('${user.uid}')">Block</button>`;
  } else if (context === 'pending-sent') {
    menu.innerHTML += `<button class="settings-item" onclick="viewFriendProfile('${user.uid}')">View</button>`;
    menu.innerHTML += `<button class="settings-item" onclick="cancelSentRequest('${user.uid}')">Cancel Request</button>`;
  } else if (context === 'blocked') {
    menu.innerHTML += `<button class="settings-item" onclick="viewFriendProfile('${user.uid}')">View</button>`;
    menu.innerHTML += `<button class="settings-item" onclick="unblockUser('${user.uid}')">Unblock</button>`;
  } else {
    // Fallback: just view
    menu.innerHTML += `<button class="settings-item" onclick="viewFriendProfile('${user.uid}')">View</button>`;
  }

  // Place menu using shared.js util
  const rect = tile.getBoundingClientRect();
  placeMenuWithinViewport(menu, rect);

  document.body.appendChild(menu);

  // Remove on click outside
  setTimeout(() => {
    document.body.addEventListener('mousedown', function handler(e) {
      if (!menu.contains(e.target)) menu.remove();
      document.body.removeEventListener('mousedown', handler);
    }, { once: true });
  }, 20);

  // Prevent menu from closing if clicked inside
  menu.onclick = (e) => e.stopPropagation();
}
function renderRequestsPanel() {
  // This should render both received and sent requests if you have both sections.
  // Example placeholder:
  const panel = document.getElementById('panel-requests');
  if (!panel) return;
  panel.innerHTML = `
    <div id="panel-requests-received"></div>
    <div id="panel-requests-sent"></div>
  `;
  // You can call your existing logic to populate these:
  renderReceivedRequests();
  renderSentRequests();
}

function renderBlockedPanel() {
  // This should render the blocked users list.
  const panel = document.getElementById('panel-blocked');
  if (!panel) return;
  panel.innerHTML = `<div id="blocked-users-list"></div>`;
  renderBlockedUsersList();
}

function renderReceivedRequests() {
  // Fetch and display all friend requests you have received
  const currentUid = getCurrentUserId();
  const receivedDiv = document.getElementById('panel-requests-received');
  if (!currentUid || !receivedDiv) return;
  receivedDiv.innerHTML = '<div style="color:#ffe066;">Loading...</div>';

  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const requests = doc.data()?.friendRequests || [];
    if (!requests.length) {
      receivedDiv.innerHTML = '<div style="color:#888;">No incoming requests.</div>';
      return;
    }
    receivedDiv.innerHTML = '<b>Incoming Requests:</b>';
    requests.forEach(r => {
      // Fetch sender's profile
      firebase.firestore().collection('users').doc(r.fromUid).get().then(function(senderDoc) {
        const user = {
          uid: r.fromUid,
          username: r.fromUsername || r.fromUid,
          avatar: senderDoc.data()?.avatar || 'CardImages/Avatars/Default.png',
          banner: senderDoc.data()?.banner,
          power: senderDoc.data()?.power || 0
        };
        const tile = renderProfileTile(user, 'pending-received');
        receivedDiv.appendChild(tile);
      });
    });
  });
}
function renderSentRequests() {
  // Fetch and display all friend requests you have sent (pending)
  const currentUid = getCurrentUserId();
  const sentDiv = document.getElementById('panel-requests-sent');
  if (!currentUid || !sentDiv) return;
  sentDiv.innerHTML = '<div style="color:#ffe066;">Loading...</div>';

  // To get sent requests, scan all users for requests from you
  firebase.firestore().collection('users').get().then(function(snapshot) {
    const sent = [];
    snapshot.forEach(doc => {
      const reqs = doc.data()?.friendRequests || [];
      reqs.forEach(r => {
        if (r.fromUid === currentUid) {
          sent.push({
            uid: doc.id,
            username: doc.data()?.username || doc.id,
            avatar: doc.data()?.avatar || 'CardImages/Avatars/Default.png',
            banner: doc.data()?.banner,
            power: doc.data()?.power || 0
          });
        }
      });
    });
    if (!sent.length) {
      sentDiv.innerHTML = '<div style="color:#888;">No sent requests.</div>';
      return;
    }
    sentDiv.innerHTML = '<b>Sent Requests:</b>';
    sent.forEach(user => {
      const tile = renderProfileTile(user, 'pending-sent');
      sentDiv.appendChild(tile);
    });
  });
}
function renderBlockedUsersList() {
  // Fetch and display all users you have blocked
  const currentUid = getCurrentUserId();
  const blockedDiv = document.getElementById('blocked-users-list');
  if (!currentUid || !blockedDiv) return;
  blockedDiv.innerHTML = '<div style="color:#ffe066;">Loading...</div>';

  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const blocked = doc.data()?.blocked || [];
    if (!blocked.length) {
      blockedDiv.innerHTML = '<div style="color:#888;">No blocked users.</div>';
      return;
    }
    blockedDiv.innerHTML = '<b>Blocked Users:</b>';
    blocked.forEach(uid => {
      firebase.firestore().collection('users').doc(uid).get().then(function(userDoc) {
        const user = {
          uid: uid,
          username: userDoc.data()?.username || uid,
          avatar: userDoc.data()?.avatar || 'CardImages/Avatars/Default.png',
          banner: userDoc.data()?.banner,
          power: userDoc.data()?.power || 0
        };
        const tile = renderProfileTile(user, 'blocked');
        blockedDiv.appendChild(tile);
      });
    });
  });
}
function cancelSentRequest(uid) {
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;
  // Remove our request from their friendRequests list
  const targetRef = firebase.firestore().collection('users').doc(uid);
  targetRef.get().then(function(doc) {
    let requests = doc.data()?.friendRequests || [];
    requests = requests.filter(r => r.fromUid !== currentUid);
    targetRef.set({ friendRequests: requests }, { merge: true }).then(function() {
      showToast("Cancelled friend request.");
      renderSentRequests();
    });
  });
}
// -- Helper for removing a friend --
function removeFriend(uid) {
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;
  // Remove from our friends
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(function(doc) {
    let friends = doc.data()?.friends || [];
    friends = friends.filter(fid => fid !== uid);
    userRef.set({ friends }, { merge: true }).then(function() {
      // Remove us from their friends too
      const theirRef = firebase.firestore().collection('users').doc(uid);
      theirRef.get().then(function(theirDoc) {
        let theirFriends = theirDoc.data()?.friends || [];
        theirFriends = theirFriends.filter(fid => fid !== currentUid);
        theirRef.set({ friends: theirFriends }, { merge: true }).then(function() {
          showToast("Friend removed.");
          renderFriendsList();
        });
      });
    });
  });
}
window.sendFriendRequest = sendFriendRequest;
window.acceptFriendRequest = acceptFriendRequest;
window.declineFriendRequest = declineFriendRequest;
window.renderFriendsList = renderFriendsList;
window.blockUser = blockUser;
window.unblockUser = unblockUser;
window.viewFriendProfile = viewFriendProfile;
window.removeFriend = removeFriend;
window.cancelSentRequest = cancelSentRequest;
