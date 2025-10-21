// --- CLIENT.JS (revised for gameplay-only lobby/chat and correct deck sync, DRYed up) ---

const socket = io();
window.socket = socket;
// UI elements
const lobbyUI = document.getElementById('lobby-ui');
const createBtn = document.getElementById('create-btn');
const joinBtn = document.getElementById('join-btn');
const roomInput = document.getElementById('room-code-input');
const status = document.getElementById('status');
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
let currentRoomId = null;

// --- Utility to generate random room code ---
function generateRoomId() {
  // 5 uppercase letters/numbers (e.g. "A1B2C")
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}

// When you join/create, emit nothing yet:
function joinOrCreateRoom(roomId, asCreator = false) {
  currentRoomId = roomId;
  socket.emit('join room', roomId);
  // Do NOT submit deck/profile here!
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
  // Now emit deck and profile, room is ready
  submitDeckToServer();
  socket.emit('profile', getMyProfileInfo());
});

function startMultiplayerGameIfReady() {
  if (opponentDeckReceived) {
    startGame({
      mode: "casual", // or "multiplayer", as appropriate
      playerDeck,                 // your deck object
      opponentDeck,               // received deck object
      playerProfile,              // your profile object
      opponentProfile,            // received opponent profile
      isCpuGame: false,           // multiplayer, not CPU
      matchData                   // if you have matchData for this match
    });
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

socket.on('opponent game action', action => {
  if (typeof handleOpponentAction === "function") handleOpponentAction(action);
});
socket.on('coin-flip-result', (whoStarts) => {
  // Call the gameplay modal and logic, passing whoStarts as the result
  if (typeof showCoinFlipModal === "function") {
    showCoinFlipModal(function(turn) {
      if (!window.gameState) window.gameState = {};
      window.gameState.turn = turn; // or use your setup function
      window.gameState.phase = "draw";
      // Continue with your main domain/champion selection and hand draw logic here
      if (typeof initiateMainDomainAndChampionSelection === "function") {
        initiateMainDomainAndChampionSelection(window.gameState.playerDeck, () => {
          // Draw hand, etc.
        });
      }
    }, whoStarts); // pass forced result
  }
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

// Add this socket event listener (only once, after socket connection):
if (window.socket) {
  window.socket.on('casual-match-found', function(matchData) {
    document.getElementById('casual-searching-modal').style.display = 'none';
    // Set the room ID for future chat/game messages
    if (matchData.roomId) {
      currentRoomId = matchData.roomId;
      // Join the room explicitly if necessary
      socket.emit('join room', currentRoomId);
    }
    if (typeof startCasualGame === "function") startCasualGame(matchData);
  });
} else {
  console.error("Socket.io not initialized!");
}
