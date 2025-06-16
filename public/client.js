const socket = io();
let currentRoomId = null;

// UI elements
const createBtn = document.getElementById('create-btn');
const joinBtn = document.getElementById('join-btn');
const roomInput = document.getElementById('room-code-input');
const status = document.getElementById('status');

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
socket.on('opponent joined', (opponentSocketId) => {
  status.textContent = "Opponent joined! Syncing deck...";
  // Choose one player to send deck (e.g., first to join)
  // For demo, always send deck when opponent joins:
  socket.emit('sync deck', currentRoomId, getCurrentDeck()); // getCurrentDeck() must return your deck object
});
socket.on('sync deck', (deckObj) => {
  // Use deckObj to initialize your game state
  status.textContent = "Deck received! Starting game...";
  startGameWithSyncedDeck(deckObj);
});

// Example function
function startGameWithSyncedDeck(deckObj) {
  // Initialize your game state and UI here using deckObj
  console.log("Synced deck:", deckObj);
  // ...initialize gameplay as before, but using deckObj
}
