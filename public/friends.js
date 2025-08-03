// --- FRIEND INVITE SYSTEM WITH FIRESTORE ---

// Utility: get current user info
function getCurrentUserId() {
  return firebase.auth().currentUser?.uid;
}
function getCurrentUsername() {
  return firebase.auth().currentUser?.displayName; // or store in Firestore
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
