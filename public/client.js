const socket = io();
let currentRoomId = null;

// UI elements
const createBtn = document.getElementById('create-btn');
const joinBtn = document.getElementById('join-btn');
const roomInput = document.getElementById('room-code-input');
const status = document.getElementById('status');
const startGameBtn = document.getElementById('start-game-btn');
const lobbyUI = document.getElementById('lobby-ui');
const chatUI = document.getElementById('chat-ui');

// Only show lobby UI after Start Game is clicked
startGameBtn.onclick = () => {
  lobbyUI.style.display = 'block';
  // Optionally hide the gallery or keep it visible as needed
};

// After both players are synced (e.g., in socket.on('sync deck')):
chatUI.style.display = 'block';
lobbyUI.style.display = 'none';
// Optionally hide the gallery or show gameplay UI
// Utility to generate random room code
function generateRoomId() {
  return Math.random().toString(36).substr(2, 6);
}

// Create game handler
createBtn.onclick = () => {
  const roomId = generateRoomId();
  currentRoomId = roomId;
  socket.emit('join room', roomId);
  status.textContent = `Room created! Share this code: ${roomId}`;
};

// Join game handler
joinBtn.onclick = () => {
  const roomId = roomInput.value.trim();
  if (!roomId) return alert('Enter a room code!');
  currentRoomId = roomId;
  socket.emit('join room', roomId);
  status.textContent = `Joined room: ${roomId}. Waiting for opponent...`;
};

// Listen for opponent join
socket.on('opponent joined', (opponentSocketId) => {
  status.textContent = "Opponent joined! Game is starting...";
  // Here you can start the game logic
});

// Listen for game actions
socket.on('game action', (action) => {
  console.log('Opponent did:', action);
  // Apply action to game state
});

// Function to send actions to opponent
function sendActionToOpponent(action) {
  if (!currentRoomId) return;
  socket.emit('game action', currentRoomId, action);
}

// CHAT LOGIC
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const chatLog = document.getElementById('chat-log');

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

socket.on('sync deck', (deckObj) => {
  // Use deckObj to initialize your game state
  status.textContent = "Deck received! Starting game...";
  startGameWithSyncedDeck(deckObj);
});
socket.on('game action', (action) => {
  handleOpponentAction(action); // This is defined in gameplay.js
});
// Example function
function startGameWithSyncedDeck(deckObj) {
  // Initialize your game state and UI here using deckObj
  console.log("Synced deck:", deckObj);
  // ...initialize gameplay as before, but using deckObj
}
