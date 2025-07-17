// ==========================
// === GAMEPLAY LOGIC ===
// ==========================

// ==========================
// === CONSTANTS & STATE ===
// ==========================
// Map phase keys to your custom names
const PHASE_DISPLAY_NAMES = {
  draw: "Draw Phase",
  essence: "Essence Phase",
  action: "Action Phase",
  end: "End Phase"
};
const PHASE_CLASS = {
  draw: 'phase-draw',
  essence: 'phase-essence',
  action: 'phase-action',
  end: 'phase-end'
};
const PHASES = [
  { turn: 'player', phase: 'draw' },
  { turn: 'player', phase: 'essence' },
  { turn: 'player', phase: 'action' },
  { turn: 'player', phase: 'end' },
  { turn: 'opponent', phase: 'draw' },
  { turn: 'opponent', phase: 'essence' },
  { turn: 'opponent', phase: 'action' },
  { turn: 'opponent', phase: 'end' }
];
 let gameState = {
  playerDeck: [],
  playerHand: [],
  playerCreatures: [],
  playerDomains: [],
  playerVoid: [],
  opponentDeck: [],
  opponentHand: [],
  opponentCreatures: [],
  opponentDomains: [],
  opponentVoid: [],
  playerMainDomain: null,
  opponentMainDomain: null,

  turn: "player",
  phase: "draw"
};
let attackMode = {
  attackerId: null,
  attackerZone: null,
  cancelHandler: null
};
// ==========================
// === DOM REFERENCES ===
// ==========================
const phasePlayerSpan    = document.getElementById('phase-player');
const phaseNameSpan      = document.getElementById('phase-name');
const nextPhaseBtn       = document.getElementById('next-phase-btn');
const battlefield        = document.getElementById('battlefield');
const phaseBadge = document.getElementById('phase-badge');

// ==========================
// === RENDERING / UI ===
// ==========================
// Handle mode selection
function showCpuDeckModal() {
  const modal = document.getElementById('cpu-deck-modal');
  const list = document.getElementById('cpu-deck-list');
  list.innerHTML = '';
  DEFAULT_CPU_DECKS.forEach(deck => {
    const div = document.createElement('div');
    div.className = 'cpu-deck-option';
    div.style.cursor = 'pointer';
    div.style.border = '2px solid ' + deck.color;
    div.style.borderRadius = '12px';
    div.style.padding = '12px';
    div.style.background = '#232a3c';
    div.style.width = '120px';
    div.innerHTML = `
      <img src="${deck.image}" alt="${deck.name}" style="width:64px;height:90px;object-fit:cover;border-radius:8px;display:block;margin:0 auto;">
      <div style="font-weight:bold;color:${deck.color};margin:7px 0 3px 0;">${deck.name}</div>
      <div style="font-size:0.93em;color:#bbb;">${deck.difficulty}</div>
    `;
    div.onclick = () => {
      modal.style.display = 'none';
      // Store selected CPU deck (in window or gameState)
      window.selectedCpuDeck = deck;
      window.selectedCpuDeck.cardbackArt = "OtherImages/Cardbacks/DefaultCardback.png";
      showPlayerDeckModal();
    };
    list.appendChild(div);
  });
  document.getElementById('close-cpu-deck-modal').onclick = () => { modal.style.display = 'none'; };
  modal.style.display = 'flex';
}
function showPlayerDeckModal() {
  const modal = document.getElementById('player-deck-modal');
  const list = document.getElementById('player-deck-list');
  list.innerHTML = '';

  // Use globally-exposed builder functions!
  const playerDecks = window.getPlayerDecks ? window.getPlayerDecks() : [];
  const activeId = window.getActiveDeckId ? window.getActiveDeckId() : null;

  if (!playerDecks.length) {
    list.innerHTML = '<div style="color:#ffe066;">No decks found! Please build a deck first.</div>';
    modal.style.display = 'flex';
    return;
  }

  playerDecks.forEach(deck => {
    const div = document.createElement('div');
    div.className = 'player-deck-option';
    div.style.cursor = 'pointer';
    div.style.border = deck.id === activeId ? '3px solid #ffe066' : '2px solid #333';
    div.style.borderRadius = '12px';
    div.style.padding = '12px';
    div.style.background = '#232a3c';
    div.style.width = '120px';
    div.innerHTML = `
      <img src="${deck.image}" alt="${deck.name}" style="width:100%;height:80px;object-fit:cover;border-radius:8px;">
      <div style="font-weight:bold;color:#ffe066;margin:7px 0 3px 0;">${deck.name}</div>
    `;
    div.onclick = () => {
      modal.style.display = 'none';
      window.selectedPlayerDeck = deck;
      startSoloGame();
    };
    list.appendChild(div);
  });
  document.getElementById('close-player-deck-modal').onclick = () => { modal.style.display = 'none'; };
  modal.style.display = 'flex';
}
function buildCpuDeck(deckDef) {
  const deck = [];
  deckDef.cards.forEach(cardEntry => {
    for (let i = 0; i < cardEntry.amount; i++) {
      deck.push({ cardId: cardEntry.id, instanceId: generateUniqueId() });
    }
  });
  return deck;
}

function generateUniqueId() {
  return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

function startSoloGame() {
  setBattlefieldLeftbarVisibility(false);
  // Build decks
  const playerBanner = window.selectedPlayerDeck?.bannerArt || "CardImages/Banners/DefaultBanner.png";
  const cpuBanner = window.selectedCpuDeck?.bannerArt || "CardImages/Banners/DefaultBanner.png";
  setBattlefieldBannerBackground("player", playerBanner);
  setBattlefieldBannerBackground("opponent", cpuBanner);
  const cpuDeckArray = buildCpuDeck(window.selectedCpuDeck);
  const playerDeckArray = window.buildDeck(window.selectedPlayerDeck.deckObj);
  
  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');
  enterBattlefield();
  // Set up gameState
  gameState.playerDeck = shuffle(playerDeckArray);
  gameState.playerHand = [];
  gameState.playerCreatures = [];
  gameState.playerDomains = [];
  gameState.playerVoid = [];

  gameState.opponentDeck = shuffle(cpuDeckArray);
  gameState.opponentHand = [];
  gameState.opponentCreatures = [];
  gameState.opponentDomains = [];
  gameState.opponentVoid = [];

  gameState.turn = "player";
  gameState.phase = "draw";

  // Render and set up the game as normal
  renderGameState();
  setupDropZones();
  updatePhase();
  // Setup drag and drop handlers
  ['player-creatures-zone', 'player-domains-zone'].forEach(zoneId => {
    const zone = document.getElementById(zoneId);
    if (!zone) return;
    zone.ondragover = (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    };
    zone.ondragleave = () => zone.classList.remove('drag-over');
zone.ondrop = (e) => {
  e.preventDefault();
  zone.classList.remove('drag-over');
  const instanceId = e.dataTransfer.getData('text/plain');
  const cardObj = gameState.playerHand.find(c => c.instanceId === instanceId);
  if (!cardObj) return;

  // Find card definition
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef) return;

  // Determine allowed category for this zone
  const allowedCategory =
    zoneId === "player-creatures-zone" ? "creature" :
    zoneId === "player-domains-zone" ? "domain" : null;

  if (cardDef.category !== allowedCategory) {
    alert("You can only play " + allowedCategory + " cards here!");
    return;
  }

  let targetArr = zoneId === "player-creatures-zone" ? gameState.playerCreatures : gameState.playerDomains;
  moveCard(instanceId, gameState.playerHand, targetArr, {orientation: "vertical"});
  renderGameState();
  setupDropZones();
  };
});
 // Show the "Game Start" animation, then main domain & champion selection, then draw opening hand
  showGameStartAnimation(() => {
    initiateMainDomainAndChampionSelection(gameState.playerDeck, () => {
      // After selection, draw opening hand
      const INITIAL_HAND_SIZE = 5;
      for (let i = 0; i < INITIAL_HAND_SIZE; i++) {
        if (gameState.playerDeck.length > 0) {
          gameState.playerHand.push(gameState.playerDeck.shift());
        }
      }
      document.getElementById('my-profile').style.display = '';
      renderProfile('my-profile', getMyProfileInfo());
      renderGameState();
      setupDropZones();
    });
  });
}

// =========== PRIVATE LOBBY UI ===========

function showPrivateLobbyModal() {
  closeAllModals();
  const modal = document.getElementById('private-lobby-modal');
  document.getElementById('private-lobby-options').style.display = '';
  document.getElementById('lobby-created-view').style.display = 'none';
  document.getElementById('lobby-join-status').style.display = 'none';
  modal.style.display = 'flex';

  document.getElementById('create-lobby-btn').onclick = () => {
    // Generate lobby code, show code, hide options
    const lobbyCode = generateLobbyCode();
    document.getElementById('private-lobby-options').style.display = 'none';
    document.getElementById('lobby-created-view').style.display = '';
    document.getElementById('lobby-code-display').textContent = lobbyCode;
    // TODO: Call backend or socket to create the lobby
    window.currentLobbyCode = lobbyCode;
    createPrivateLobby(lobbyCode);
  };

  document.getElementById('join-lobby-btn').onclick = () => {
    const code = document.getElementById('join-lobby-code-input').value.trim().toUpperCase();
    if (!code) return;
    // TODO: Call backend or socket to join the lobby
    document.getElementById('lobby-join-status').style.display = '';
    document.getElementById('lobby-join-status').textContent = 'Joining lobby...';
    joinPrivateLobby(code);
  };

  document.getElementById('cancel-lobby-btn').onclick = () => {
    modal.style.display = 'none';
    // TODO: Cancel lobby on backend/socket if needed
    cancelPrivateLobby();
  };
  // Clicking outside modal closes it
  modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };
}

// Generates a simple 5-character code
function generateLobbyCode() {
  return Math.random().toString(36).substring(2,7).toUpperCase();
}

// Placeholder: fill these in with your socket logic
function createPrivateLobby(code) {
  // Example: socket.emit('create-lobby', { code });
  // Wait for opponent, then call onPrivateLobbyReady()
}
function joinPrivateLobby(code) {
  // Example: socket.emit('join-lobby', { code });
  // On success: onPrivateLobbyReady();
}
function cancelPrivateLobby() {
  // Example: socket.emit('cancel-lobby', { code: window.currentLobbyCode });
}

// Called when both players are in the lobby and ready to select decks
function onPrivateLobbyReady() {
  document.getElementById('private-lobby-modal').style.display = 'none';
  showPlayerDeckModal('private'); // or showOpponentDeckModal for the other player
  // After deck chosen, sync and then call startPrivateGame()
}

// After both decks selected, call this:
function startPrivateGame() {
  setBattlefieldLeftbarVisibility(true);
  // Set up gameState, profiles, etc.
  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');
  enterBattlefield();
  // Render chat, profiles, battlefield as in solo
  // Show Game Start animation, Main Domain & Champion selection
  showGameStartAnimation(() => {
    initiateMainDomainAndChampionSelection(gameState.playerDeck, () => {
      // Draw hand, set up game, etc
      // ...
    });
  });
}

// CASUAL MODE
function onCasualDeckSelected(deck) {
  window.selectedPlayerDeck = deck;
  showCasualSearchingModal();
  startCasualMatchmaking();
}
function showCasualSearchingModal() {
  document.getElementById('casual-searching-modal').style.display = 'flex';
  document.getElementById('cancel-casual-search-btn').onclick = function() {
    cancelCasualMatchmaking();
    document.getElementById('casual-searching-modal').style.display = 'none';
  };
}
// Start matchmaking (emit socket event)
function startCasualMatchmaking() {
  window.socket.emit('casual-join', {
    deck: window.selectedPlayerDeck
  });
}
// Cancel matchmaking
function cancelCasualMatchmaking() {
  window.socket.emit('casual-cancel');
}

function startCasualGame(matchData) {
  // 1. Decks
  gameState = gameState || {};
  gameState.playerDeck = shuffle(buildDeck(window.selectedPlayerDeck.deckObj || window.selectedPlayerDeck));
  gameState.opponentDeck = shuffle(buildDeck(matchData.opponentDeck));

  // 2. Profiles
  gameState.playerProfile = getMyProfileInfo && getMyProfileInfo();
  if (matchData.opponentProfile) {
    gameState.opponentProfile = matchData.opponentProfile;
    if (typeof renderProfile === "function") {
      renderProfile('opponent-profile', matchData.opponentProfile);
      document.getElementById('opponent-profile').style.display = '';
    }
  }

  // 3. Reset multiplayer state if needed
  opponentDeckReceived = true; // If you use this flag to gate start, set it here.

  // 4. UI Transition
  setBattlefieldLeftbarVisibility(true);
  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');
  enterBattlefield();

  // 5. Animations and selection
  showGameStartAnimation(() => {
    initiateMainDomainAndChampionSelection(gameState.playerDeck, () => {
      // Draw hand, set up initial turn, etc.
    });
  });

  // 6. Chat, etc. (if needed)
  if (typeof resetChatLog === "function") resetChatLog();
}
function setBattlefieldLeftbarVisibility(visible) {
  const leftbar = document.getElementById('battlefield-leftbar');
  if (!leftbar) return;
  leftbar.style.display = visible ? '' : 'none';
}
document.querySelector('.mode-option[data-mode="solo"]').addEventListener('click', function() {
  showCpuDeckModal();
});
document.querySelector('.mode-option[data-mode="private"]').addEventListener('click', function() {
  showPrivateLobbyModal();
});
document.querySelector('.mode-option[data-mode="casual"]').addEventListener('click', function() {
  showPlayerDeckModal('casual');
});
document.querySelector('.mode-option[data-mode="ranked"]').addEventListener('click', function() {
  if (typeof showRankedLobbyModal === "function") showRankedLobbyModal();
});
document.addEventListener('DOMContentLoaded', function() {
  ['solo','private','casual','ranked'].forEach(mode => {
    const el = document.querySelector(`.mode-option[data-mode="${mode}"]`);
    if (!el) return;
    el.addEventListener('click', function() {
      if (mode === "solo") showCpuDeckModal();
      else if (mode === "private") showPrivateLobbyModal();
      else if (mode === "casual" && typeof showPublicLobbyModal === "function") showPublicLobbyModal();
      else if (mode === "ranked" && typeof showRankedLobbyModal === "function") showRankedLobbyModal();
    });
  });
});

// BACK IMAGES
// CPU Deck Modal: Back to Mode Selection
document.getElementById('cpu-back-btn').addEventListener('click', function() {
  document.getElementById('cpu-deck-modal').style.display = 'none';
  document.getElementById('mode-select-section').style.display = '';
});

// Player Deck Modal: Back to CPU Deck Selection
document.getElementById('player-back-btn').addEventListener('click', function() {
  document.getElementById('player-deck-modal').style.display = 'none';
  document.getElementById('cpu-deck-modal').style.display = '';
});  

if (window.socket) {
  window.socket.on('casual-match-found', function(matchData) {
    document.getElementById('casual-searching-modal').style.display = 'none';
    if (typeof startCasualGame === "function") startCasualGame(matchData);
  });
} else {
  console.error("Socket.io not initialized!");
}
