// --- CLIENT.JS (revised for gameplay-only lobby/chat and correct deck sync, DRYed up) ---

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
// Modal lobby elements
const createLobbyBtn = document.getElementById('create-lobby-btn');
const joinLobbyBtn = document.getElementById('join-lobby-btn');
const joinLobbyCodeInput = document.getElementById('join-lobby-code-input');
const lobbyModalStatus = document.getElementById('lobby-join-status');
const lobbyCodeDisplay = document.getElementById('lobby-code-display');
const spectateBtn = document.getElementById('spectate-btn');
const spectateRoomInput = document.getElementById('spectate-room-input');

let isSpectator = false;
let myDeckObj = null;
let opponentDeckReceived = false;

// --- Utility to generate random room code ---
function generateRoomId() {
  // 5 uppercase letters/numbers (e.g. "A1B2C")
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}

// --- DRY: Unified room join/create logic for classic and modal UI ---
function joinOrCreateRoom(roomId, asCreator = false) {
  currentRoomId = roomId;
  socket.emit('join room', roomId);
  if (status) {
    status.textContent = asCreator
      ? `Room created! Share this code: ${roomId}`
      : `Joined room: ${roomId}. Waiting for opponent...`;
  }
  if (lobbyCodeDisplay && asCreator) {
    lobbyCodeDisplay.textContent = roomId;
  }
  submitDeckToServer();
}

// --- Classic UI: Create/Join room ---
if (createBtn) {
  createBtn.onclick = () => joinOrCreateRoom(generateRoomId(), true);
}
if (joinBtn) {
  joinBtn.onclick = () => {
    const roomId = (roomInput?.value || "").trim().toUpperCase();
    if (!roomId) return alert('Enter a room code!');
    joinOrCreateRoom(roomId, false);
  };
}

// --- Modal UI: Create/Join room ---
if (createLobbyBtn) {
  createLobbyBtn.onclick = () => {
    const code = generateRoomId();
    joinOrCreateRoom(code, true);
  };
}
if (joinLobbyBtn) {
  joinLobbyBtn.onclick = () => {
    const code = (joinLobbyCodeInput?.value || "").trim().toUpperCase();
    if (!code) return alert('Enter a lobby code!');
    joinOrCreateRoom(code, false);
  };
}

socket.on('opponent joined', (opponentId) => {
  // Hide the lobby modal if visible
  const lobbyModal = document.getElementById('private-lobby-modal');
  if (lobbyModal) lobbyModal.style.display = 'none';

  // Show deck selection for both players
  if (typeof showPlayerDeckModal === "function") {
    showPlayerDeckModal();
  }
  // Optionally update status somewhere else
  if (status) status.textContent = "Both players joined! Choose your deck.";
});

function startMultiplayerGameIfReady() {
  if (opponentDeckReceived) {
    // Ensure your own deck is in gameState.playerDeck
    if (!gameState.playerDeck.length && myDeckObj) {
      gameState.playerDeck = shuffle(buildDeck(myDeckObj));
    }
    // Start up the battlefield
    if (typeof setupBattlefieldGame === "function") {
      setupBattlefieldGame();
    }
  }
}
// --- Submit deck to server for multiplayer sync ---
function submitDeckToServer() {
  if (isSpectator) return;
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
  if (typeof buildDeck === "function" && typeof shuffle === "function") {
    if (window.gameState) {
      gameState.opponentDeck = shuffle(buildDeck(deckObj));
      opponentDeckReceived = true;
      startMultiplayerGameIfReady();
    }
  }
});

// --- Helper to handle both players being ready ---
function startMultiplayerGameIfReady() {
  // Only show gameplay/chat when both players have decks
  if (opponentDeckReceived) {
    // Optionally: Start the game here if needed
    // e.g. window.setupBattlefieldGame && window.setupBattlefieldGame();
  }
}

// --- Chat Logic ---
if (chatInput) {
  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      sendChatBtn?.click();
      e.preventDefault();
    }
  });
}
if (sendChatBtn) {
  sendChatBtn.onclick = () => {
    const msg = (chatInput?.value || "").trim();
    if (msg && currentRoomId) {
      socket.emit('game message', currentRoomId, msg);
      appendChatMessage(`You: ${msg}`);
      chatInput.value = '';
    }
  };
}

socket.on('game message', (data) => {
  if (data.sender === socket.id) {
    return; // This is your own message echoed back from the server, ignore.
  }
  appendChatMessage(`Opponent: ${data.msg}`);
});

// CASUAL MATCHMAKING
function startCasualMatchmaking() {
  // Example: using Socket.IO
  window.socket.emit('casual-join', {
    deck: window.selectedPlayerDeck // send minimal deck data if needed
  });
}
function cancelCasualMatchmaking() {
  window.socket.emit('casual-cancel');
}

function appendChatMessage(msg) {
  const div = document.createElement('div');
  div.textContent = msg;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

if (spectateBtn) {
  spectateBtn.onclick = () => {
    const roomId = (spectateRoomInput?.value || "").trim().toUpperCase();
    if (!roomId) return alert('Enter a room code!');
    isSpectator = true;
    socket.emit('spectate room', roomId);
    // Hide lobby, show gameplay UI, but as spectator
    // Optionally, update the UI to indicate spectator mode
    status.textContent = `Spectating room: ${roomId}`;
    // Disable all gameplay controls (hand, buttons, etc)
    setSpectatorUI();
  };
}

function setSpectatorUI() {
  // Example: just hide controls, or set a flag for the rest of your code
  document.getElementById('player-hand').style.display = 'none';
  document.getElementById('next-phase-btn').style.display = 'none';
  // ... disable any actions
}
// --- Deck Sync (optional, for advanced server flows) ---
socket.on('sync deck', (deckObj) => {
  if (typeof startGameWithSyncedDeck === "function") {
    startGameWithSyncedDeck(deckObj);
  }
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
  if (chatLog) chatLog.innerHTML = "";
  opponentDeckReceived = false;
  // Any other cleanup...
}

function playCard(instanceId, fromZone, toZone) {
  if (isSpectator) return;
  // 1. Locally update state
  if (typeof moveCard === "function") moveCard(instanceId, fromZone, toZone);
  if (typeof renderGameState === "function") renderGameState();
  if (typeof setupDropZones === "function") setupDropZones();
  // 2. Sync with opponent
  socket.emit('play card', { roomId: currentRoomId, instanceId, fromZone, toZone });
}

// Listen for opponent actions
socket.on('opponent play card', (data) => {
  if (typeof moveCard === "function") moveCard(data.instanceId, data.fromZone, data.toZone, /*isOpponent=*/true);
  if (typeof renderGameState === "function") renderGameState();
  if (typeof setupDropZones === "function") setupDropZones();
});

socket.on('opponent game action', action => {
  if (typeof handleOpponentAction === "function") handleOpponentAction(action);
});

// --- Profile details in game ---
function showMyProfile() {
  if (typeof renderProfile === "function") {
    renderProfile('my-profile', getMyProfileInfo());
    document.getElementById('my-profile').style.display = '';
  }
}
function getMyProfileInfo() {
  return {
    username: document.getElementById('profile-username-display')?.textContent || '',
    avatar: document.getElementById('profile-pic')?.src || '',
    banner: document.getElementById('profile-banner')?.src || ''
  };
}
socket.emit('profile', getMyProfileInfo());
socket.on('opponent profile', profileObj => {
  if (typeof renderProfile === "function") {
    renderProfile('opponent-profile', profileObj);
    document.getElementById('opponent-profile').style.display = '';
  }
});

// --- Export for use in other scripts, if needed ---
window.endGameCleanup = endGameCleanup;

// --- Optionally: listen for room events, errors, etc. ---
socket.on('room error', (msg) => {
  alert(msg);
  endGameCleanup();
});
