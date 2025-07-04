// --- CLIENT.JS (revised for gameplay-only lobby/chat and correct deck sync) ---

const socket = io();
let currentRoomId = null;

// UI elements
const lobbyUI = document.getElementById('lobby-ui');
const chatUI = document.getElementById('chat-ui');
const createBtn = document.getElementById('create-btn');
const joinBtn = document.getElementById('join-btn');
const roomInput = document.getElementById('room-code-input');
const status = document.getElementById('status');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const chatLog = document.getElementById('chat-log');

let myDeckObj = null;
let opponentDeckReceived = false;

// Utility to generate random room code
function generateRoomId() {
  return Math.random().toString(36).substr(2, 6);
}

// --- Create/Join Room Handlers ---
createBtn.onclick = () => {
  const roomId = generateRoomId();
  currentRoomId = roomId;
  socket.emit('join room', roomId);
  status.textContent = `Room created! Share this code: ${roomId}`;
  submitDeckToServer();
};

joinBtn.onclick = () => {
  const roomId = roomInput.value.trim();
  if (!roomId) return alert('Enter a room code!');
  currentRoomId = roomId;
  socket.emit('join room', roomId);
  status.textContent = `Joined room: ${roomId}. Waiting for opponent...`;
  submitDeckToServer();
};
socket.on('opponent joined', (opponentId) => {
  status.textContent = "Opponent joined! You can start chatting.";
});
// --- Submit deck to server for multiplayer sync ---
function submitDeckToServer() {
  if (typeof loadDeckState === "function") loadDeckState();
  if (typeof getCurrentDeck === "function") {
    myDeckObj = getCurrentDeck();
    socket.emit('submit deck', currentRoomId, myDeckObj);
  } else {
    console.warn("getCurrentDeck() not found!");
  }
}

// --- Receive opponent's deck and start game ---
socket.on('opponent deck', (deckObj) => {
  // Set up gameplay state with correct decks:
  if (typeof buildDeck === "function" && typeof shuffle === "function") {
    // Your deck: already set in your game state by your own game start logic
    // Opponent's deck:
    if (window.gameState) {
      gameState.opponentDeck = shuffle(buildDeck(deckObj));
      opponentDeckReceived = true;
      // (Optional) Start the game UI if both decks are ready
      startMultiplayerGameIfReady();
    }
  }
});

// (Optional) helper to handle both players being ready:
function startMultiplayerGameIfReady() {
  // Only show gameplay/chat when both players have decks
  if (opponentDeckReceived) {
  }
}

// --- Chat Logic ---
chatInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    sendChatBtn.click();
    e.preventDefault();
  }
});
sendChatBtn.onclick = () => {
  const msg = chatInput.value.trim();
  if (msg && currentRoomId) {
    socket.emit('game message', currentRoomId, msg);
    appendChatMessage(`You: ${msg}`);
    chatInput.value = '';
  }
};

socket.on('game message', (data) => {
  if (data.sender === socket.id) {
    // This is your own message echoed back from the server, ignore.
    return;
  }
  appendChatMessage(`Opponent: ${data.msg}`);
});

function appendChatMessage(msg) {
  const div = document.createElement('div');
  div.textContent = msg;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// After both players have chosen/joined a room and decks are exchanged:
socket.on('sync deck', (deckObj) => {
  // For your own player:
  startGameWithSyncedDeck(deckObj);
});

// --- Game Actions Sync ---
socket.on('game action', (action) => {
  if (typeof handleOpponentAction === "function") {
    handleOpponentAction(action); // Defined in gameplay.js
  }
});

// --- Multiplayer Deck Sync (receive your deck too for confirmation, optional) ---
socket.on('your deck', (deckObj) => {
  myDeckObj = deckObj;
});

// --- Hide lobby/chat when leaving/ending gameplay (optional helper) ---
function endGameCleanup() {
  chatLog.innerHTML = "";
  opponentDeckReceived = false;
  // Any other cleanup...
}

function playCard(instanceId, fromZone, toZone) {
  // 1. Locally update state
  moveCard(instanceId, fromZone, toZone);
  renderGameState();
  setupDropZones();
  // 2. Sync with opponent
  socket.emit('play card', { roomId: currentRoomId, instanceId, fromZone, toZone });
}

// Listen for opponent actions
socket.on('opponent play card', (data) => {
  // Update opponent's state accordingly
  moveCard(data.instanceId, data.fromZone, data.toZone, /*isOpponent=*/true);
  renderGameState();
  setupDropZones();
});

socket.on('opponent game action', action => {
  handleOpponentAction(action); // already present in your gameplay.js
});

// PROFILE DETAILS IN GAME
function showMyProfile() {
  renderProfile('my-profile', getMyProfileInfo());
  document.getElementById('my-profile').style.display = '';
}
function getMyProfileInfo() {
  return {
    username: document.getElementById('profile-username-display').textContent,
    avatar: document.getElementById('profile-pic').src,
    banner: document.getElementById('profile-banner').src
  };
}
socket.emit('profile', getMyProfileInfo());
socket.on('opponent profile', profileObj => {
  renderProfile('opponent-profile', profileObj);
  document.getElementById('opponent-profile').style.display = '';
});
// --- Export for use in other scripts, if needed ---
window.endGameCleanup = endGameCleanup;

// --- Optionally: listen for room events, errors, etc. ---
socket.on('room error', (msg) => {
  alert(msg);
  endGameCleanup();
});
