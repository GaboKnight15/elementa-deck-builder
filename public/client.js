// --- CLIENT.JS (revised for gameplay-only lobby/chat and correct deck sync) ---

const socket = io();
let currentRoomId = null;

// UI elements
const startGameBtn = document.getElementById('start-game-btn');
const lobbyUI = document.getElementById('lobby-ui');
const chatUI = document.getElementById('chat-ui');
const createBtn = document.getElementById('create-btn');
const joinBtn = document.getElementById('join-btn');
const roomInput = document.getElementById('room-code-input');
const status = document.getElementById('status');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const chatLog = document.getElementById('chat-log');

let myDeckObj = null; // Will hold your current deck object
let opponentDeckReceived = false;

// --- UI: Only show lobby/chat in gameplay, not in gallery/builder ---
function showLobbyUI() {
  lobbyUI.style.display = 'block';
  chatUI.style.display = 'none';
}
function showChatUI() {
  lobbyUI.style.display = 'none';
  chatUI.style.display = 'block';
}
function hideLobbyAndChat() {
  lobbyUI.style.display = 'none';
  chatUI.style.display = 'none';
}

// Initially hide lobby/chat (only appear in gameplay)
hideLobbyAndChat();

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

startGameBtn.onclick = () => {
  if (typeof showBattlefield === "function") showBattlefield();
  // If not in multiplayer lobby, start solo playtest
  if (!currentRoomId && typeof startSoloGameWithCurrentDeck === "function") {
    startSoloGameWithCurrentDeck();
  }
  showLobbyUI();
};

joinBtn.onclick = () => {
  const roomId = roomInput.value.trim();
  if (!roomId) return alert('Enter a room code!');
  currentRoomId = roomId;
  socket.emit('join room', roomId);
  status.textContent = `Joined room: ${roomId}. Waiting for opponent...`;
  submitDeckToServer();
};

// --- Submit deck to server for multiplayer sync ---
function submitDeckToServer() {
  // Assumes getCurrentDeck() is globally available (from app.js)
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
    showChatUI();
    // Any other gameplay UI setup can go here
    // E.g. renderGameState(), setupDropZones(), etc.
  }
}

// --- Chat Logic ---

sendChatBtn.onclick = () => {
  const msg = chatInput.value.trim();
  if (msg && currentRoomId) {
    socket.emit('game message', currentRoomId, msg);
    appendChatMessage(`You: ${msg}`);
    chatInput.value = '';
  }
};

socket.on('game message', (msg) => {
  appendChatMessage(`Opponent: ${msg}`);
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
  hideLobbyAndChat();
  chatLog.innerHTML = "";
  opponentDeckReceived = false;
  // Any other cleanup...
}

// --- Export for use in other scripts, if needed ---
window.hideLobbyAndChat = hideLobbyAndChat;
window.showLobbyUI = showLobbyUI;
window.showChatUI = showChatUI;
window.endGameCleanup = endGameCleanup;

// --- Optionally: listen for room events, errors, etc. ---
socket.on('room error', (msg) => {
  alert(msg);
  endGameCleanup();
});
