// CARD LIST //   
const dummyCards = [
{ id: 'basicfairy', name: 'Fairy', rarity: 'Basic', image: 'CardImages/BasicCreatures/Fairy.png', category: 'creature', color: 'green', type: 'fairy', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Fairy', ability: 'flying', set: 'StandardPack'},
{ id: 'basicgoblin', name: 'Goblin', rarity: 'Basic', image: 'CardImages/BasicCreatures/Goblin.png', category: 'creature', color: 'green', type: 'goblin', hp: 3, atk: 1, def: 0, cost: 0, archetype: 'Goblin', set: 'StandardPack'},
{ id: 'basicemberling', name: 'Emberling', rarity: 'Basic', image: 'CardImages/BasicCreatures/Emberling.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: 'burn', set: 'StandardPack'},
{ id: 'basicfirepixie', name: 'Fire Pixie', rarity: 'Basic', image: 'CardImages/BasicCreatures/Fire Pixie.png', category: 'creature', color: 'red', type: 'fairy', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: ['burn','flying'], set: 'StandardPack'},
{ id: 'basichellcharger', name: 'Hellcharger', rarity: 'Basic', image: 'CardImages/BasicCreatures/Hellcharger.png', category: 'creature', color: 'red', type: 'warrior', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: 'burn', set: 'StandardPack'},
{ id: 'basicelementalblue', name: 'Water Elemental', rarity: 'Basic', image: 'CardImages/BasicCreatures/Water Elemental.png', category: 'creature', color: 'blue', type: 'elemental', hp: 5, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: ['dive','elusive','soak'], set: 'StandardPack'},
{ id: 'basicwolfgray', name: 'Desert Wolf', rarity: 'Basic', image: 'CardImages/BasicCreatures/Desert Wolf.png', category: 'creature', color: 'gray', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Scorchlands', ability: 'burn', set: 'StandardPack'},
{ id: 'basicgolemites', name: 'Golemites', rarity: 'Basic', image: 'CardImages/BasicCreatures/Golemites.png', category: 'creature', color: 'gray', type: 'elemental', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Golemheart', ability: 'burn', set: 'StandardPack'},
{ id: 'basicwolfblack', name: 'Wolf', rarity: 'Basic', image: 'CardImages/BasicCreatures/Wolf.png', category: 'creature', color: 'black', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Moonfang', ability: 'ambush', set: 'StandardPack'},
{ id: 'basicskeleton', name: 'Skeleton', rarity: 'Basic', image: 'CardImages/BasicCreatures/Skeleton.png', category: 'creature', color: 'black', type: 'undead', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe', set: 'StandardPack'},
{ id: 'basicbat', name: 'Bat', rarity: 'Basic', image: 'CardImages/BasicCreatures/Bat.png', category: 'creature', color: 'black', type: 'vampire', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Vampiric', ability: ['drain','flying'], set: 'StandardPack'},
{ id: 'basicimp', name: 'Imp', rarity: 'Basic', image: 'CardImages/BasicCreatures/Imp.png', category: 'creature', color: 'black', type: 'demon', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe', ability: ['ambush','flying'], set: 'StandardPack'},
{ id: 'basicvampire', name: 'Vampire', rarity: 'Basic', image: 'CardImages/BasicCreatures/Vampire.png', category: 'creature', color: 'black', type: 'demon', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Vampiric', ability: ['drain','flying'], set: 'StandardPack'},
{ id: 'basicforest', name: 'Forest', rarity: 'Basic', image: 'CardImages/Domains/Green Basic Location.png', category: 'domain', color: 'green', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicvolcano', name: 'Volcano', rarity: 'Legendary', image: 'CardImages/Domains/Red Basic Location.png', category: 'domain', color: 'red', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicocean', name: 'Ocean', rarity: 'Basic', image: 'CardImages/Domains/Blue Basic Location.png', category: 'domain', color: 'blue', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicmountain', name: 'Mountain', rarity: 'Legendary', image: 'CardImages/Domains/Gray Basic Location.png', category: 'domain', color: 'gray', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2', artwork: "CardImages/Artworks/Mountain.png"},
{ id: 'basicswamp', name: 'Swamp', rarity: 'Basic', image: 'CardImages/Domains/Purple Basic Location.png', category: 'domain', color: 'purple', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicpeaks', name: 'Peaks', rarity: 'Basic', image: 'CardImages/Domains/Yellow Basic Location.png', category: 'domain', color: 'yellow', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicplains', name: 'Plains', rarity: 'Basic', image: 'CardImages/Domains/White Basic Location.png', category: 'domain', color: 'white', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicshadowforest', name: 'Shadow Forest', rarity: 'Basic', image: 'CardImages/Domains/Black Basic Location.png', category: 'domain', color: 'black', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
];

const COLOR_QUESTS = ['green', 'red', 'blue', 'yellow', 'purple', 'gray', 'black', 'white'];
// Quest LIST
const QUEST_POOL = [
  { id: 'purchase_pack_daily', type: 'daily', description: 'Purchase a Booster Pack', goal: 1, reward: { type: 'currency', amount: 100 } },
  { id: 'collect_green_card_daily', type: 'daily', description: 'Collect a Green Card', goal: 1, reward: { type: 'currency', amount: 80 } },
  { id: 'collect_red_card_daily', type: 'daily', description: 'Collect a Red Card', goal: 1, reward: { type: 'currency', amount: 80 } },
  { id: 'collect_blue_card_daily', type: 'daily', description: 'Collect a Blue Card', goal: 1, reward: { type: 'currency', amount: 80 } },
  { id: 'collect_yellow_card_daily', type: 'daily', description: 'Collect a Yellow Card', goal: 1, reward: { type: 'currency', amount: 80 } },
  { id: 'collect_purple_card_daily', type: 'daily', description: 'Collect a Purple Card', goal: 1, reward: { type: 'currency', amount: 80 } },
  { id: 'collect_gray_card_daily', type: 'daily', description: 'Collect a Gray Card', goal: 1, reward: { type: 'currency', amount: 80 } },
  { id: 'collect_black_card_daily', type: 'daily', description: 'Collect a Black Card', goal: 1, reward: { type: 'currency', amount: 80 } },
  { id: 'collect_white_card_daily', type: 'daily', description: 'Collect a White Card', goal: 1, reward: { type: 'currency', amount: 80 } },

];
const ACHIEVEMENTS = [
  {
    id: 'collect_3_green_cards',
    description: 'Collect 3 green cards',
    goal: 3,
    color: 'green',
    reward: { type: 'currency', amount: 200 }
  },
  {
    id: 'collect_3_red_cards',
    description: 'Collect 3 red cards',
    goal: 3,
    color: 'red',
    reward: { type: 'currency', amount: 200 }
  },
  // ...add more colors as needed
  {
  id: 'collect_20_unique_cards',
  description: 'Collect 20 different cards',
  goal: 20,
  reward: { type: 'currency', amount: 500 }
  }
];


let isLoggingOut = false;
let appLoaded = false;
let playerCurrency = 0;
let playerEssence = 0;
let playerCollection = {};
let playerUnlockedAvatars = [];
let playerUnlockedBanners = [];
let playerUnlockedCardbacks = [];
let deckSlots = ["Deck 1"];
let decks = { "Deck 1": {} };
let currentDeckSlot = "Deck 1";
const addCoinsBtn = document.getElementById('add-coins-btn');

// --- CURRENCY DISPLAY ---
function updateCurrencyDisplay() {
  const el = document.getElementById('currency-amount');
  if (el) el.textContent = playerCurrency;
}
// ==========================
// === SECTION NAVIGATION ===
// ==========================
document.querySelectorAll('#main-nav button[data-section]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Hide all sections
    document.querySelectorAll('section[id$="-section"]').forEach(section => {
      section.classList.remove('active');
    });
    // Show the target section
    const target = btn.getAttribute('data-section');
    const targetSection = document.getElementById(target);
    if (targetSection) targetSection.classList.add('active');
    // Special section actions
    const specialActions = {
      'gallery-section' : window.renderGallery,
      'builder-section' : window.showDeckSelection,
      'gameplay-section': window.setupBattlefieldGame,
      'shop-section'    : window.renderShop
    };
    if (typeof specialActions[target] === 'function') {
      specialActions[target]();
    }
  });
});
document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
document.getElementById('gallery-section').classList.add('active');
if (typeof window.renderGallery === 'function') {
  window.renderGallery();
}

// ==========================
// === RENDERING / UI ===
// ==========================
function getCardBgClass(card) { /* unchanged */ }
// LOADING SCREEN
function showLoadingOverlay() { /* unchanged */ }
function hideLoadingOverlay() { /* unchanged */ }
// VIEW CARDS
function showFullCardModal(cardObj) { /* unchanged */ }
// IMAGE MODAL CLOSE
document.getElementById('image-modal').onclick = (e) => {
  if (e.target.id === 'image-modal') {
    document.getElementById('image-modal').style.display = "none";
  }
};
const COLLECTION_KEY = "cardCollection";
const NEW_CARD_KEY = "newlyUnlockedCards";

function getNewlyUnlockedCards() {
  return JSON.parse(localStorage.getItem(NEW_CARD_KEY)) || [];
}

function setNewlyUnlockedCards(arr) {
  localStorage.setItem(NEW_CARD_KEY, JSON.stringify(arr));
}

// FIREBASE GALLERY
function setCollection(collection) {
  playerCollection = collection;
  saveProgress();
}
function getCollection() {
  return playerCollection || {};
}
function updateCollectionDependentUI() {
  if (typeof renderGallery === "function") renderGallery();
  // Add other UI updates that depend on collection here if needed
}

// ADD CARDS TO COLLECTION 
function addToCollection(cardId, amount = 1) {
  const collection = getCollection();
  const wasOwned = collection[cardId] > 0;
  collection[cardId] = (collection[cardId] || 0) + amount;
  saveProgress();

  // If just unlocked, mark as new
  if (!wasOwned && collection[cardId] > 0) {
    const newCards = getNewlyUnlockedCards();
    if (!newCards.includes(cardId)) {
      newCards.push(cardId);
      setNewlyUnlockedCards(newCards);
    }
  }

  // --- Green Card Quest ---
  const newlyAddedCard = dummyCards.find(c => c.id === cardId);
  if (newlyAddedCard) {
    const cardColors = Array.isArray(newlyAddedCard.color) ? newlyAddedCard.color : [newlyAddedCard.color];
    getActiveQuests(function(quests) {
      for (const quest of quests) {
        for (const color of COLOR_QUESTS) {
          if (
            quest.id && quest.id.includes(`${color}_card`) &&
            cardColors.includes(color)
          ) {
            incrementQuestProgress(quest.id);
          }
        }
      }
    });
  }

  // --- Unique Card Quest ---
  if (!wasOwned && collection[cardId] > 0) {
    getActiveQuests(function(quests) {
      for (const quest of quests) {
        if (quest.id && quest.id.includes('unique_card')) {
          incrementQuestProgress(quest.id);
        }
      }
    });
  }
  // Update color achievements (generalized)
  if (typeof updateColorAchievements === 'function') {updateColorAchievements();}
  // Update unique cards achievement
  if (typeof updateUniqueCardsAchievement === 'function') {updateUniqueCardsAchievement();}
}

function getCurrencyHtml(amount) { /* unchanged */ }
function addCoins(amount) {
  playerCurrency += amount;
  saveProgress();
  updateCurrencyDisplay();
}
if (addCoinsBtn) {
  addCoinsBtn.onclick = function() {
    addCoins(100);
  };
}
// ESSENCE CURRENCY
function getEssence() { return playerEssence; }
function setEssence(amount) {
  playerEssence = amount;
  updateEssenceDisplay();
  saveProgress();
}
function updateEssenceDisplay() {
  const el = document.getElementById('essence-amount');
  if (el) el.textContent = playerEssence;
}
function getEssenceHtml(amount) { /* unchanged */ }
function setCurrency(amount) {
  playerCurrency = amount;
  updateCurrencyDisplay();
  saveProgress();
}
function getCurrency() {
  return playerCurrency;
}

// NOTIFICATIONS
function showToast(message) { /* unchanged */ }

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

// MENU INSIDE VIEWPORT (unchanged)
function placeMenuWithinViewport(menu, triggerRect, preferred = "bottom") { /* unchanged */ }

// Expose to global
window.sendFriendRequest = sendFriendRequest;
window.acceptFriendRequest = acceptFriendRequest;
window.declineFriendRequest = declineFriendRequest;
window.renderFriendsList = renderFriendsList; 

// Hook up modals and icon
document.getElementById('friends-icon').onclick = function() {
  renderFriendsList();
  document.getElementById('friends-modal').style.display = 'flex';
};
document.getElementById('close-friends-modal').onclick = function() {
  document.getElementById('friends-modal').style.display = 'none';
};
document.getElementById('friends-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
// INITIALIZACION 
window.addEventListener('DOMContentLoaded', function() {
  updateCurrencyDisplay();
  updateEssenceDisplay();
});
