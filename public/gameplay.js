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
const DEFAULT_CPU_DECKS = [
  {
    id: 'green',
    name: 'Verdant Might',
    color: 'green',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Fairy.png',
    bannerArt: 'CardImages/Banners/GreenBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/GreenCardback.png',
    cards: [
      { id: 'Verdara', amount: 1 },
      { id: 'ForestFairy', amount: 4 },
      { id: 'ForestGoblin', amount: 4 },
      { id: 'HeartwoodEmeralds', amount: 4 },
      { id: 'LifeGrowth', amount: 4 },
      { id: 'EssenceSurge', amount: 4 },
      { id: 'basicforest', amount: 4 },
      
      // ... etc
    ]
  },
  {
    id: 'red',
    name: 'Ember Tyranny',
    color: 'red',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Emberling.png',
    bannerArt: 'CardImages/Banners/RedBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/RedCardback.png',
    cards: [
      { id: 'Ashkar', amount: 1 },
      { id: 'Emberling', amount: 4 },
      { id: 'FirePixie', amount: 4 },
      { id: 'Hellcharger', amount: 2 },
      { id: 'CindercoreEmber', amount: 4 },
      { id: 'EssenceAssault', amount: 4 },
      { id: 'basicvolcano', amount: 4 },
      // ... etc
    ]
  },
    {
    id: 'blue',
    name: 'Tidebound Will',
    color: 'blue',
    difficulty: '⭐',
    image: 'CardImages/Avatars/WaterElemental.png',
    bannerArt: 'CardImages/Banners/BlueBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/BlueCardback.png',
    cards: [
      { id: 'Marinthae', amount: 1 },
      { id: 'WaterElemental', amount: 4 },
      { id: 'TidecallersPearl', amount: 4 },
      { id: 'EssenceRift', amount: 4 },
      { id: 'basicocean', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'yellow',
    name: 'Surgecallers Rite',
    color: 'yellow',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Thunderspawn.png',
    bannerArt: 'CardImages/Banners/YellowBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/YellowCardback.png',
    cards: [
      { id: 'Aetherion', amount: 1 },
      { id: 'StormcoreDynamo', amount: 4 },
      { id: 'EssenceBolt', amount: 4 },
      { id: 'basicpeaks', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'purple',
    name: 'Venom Bloom',
    color: 'purple',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Goblin.png',
    bannerArt: 'CardImages/Banners/PurpleBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/PurpleCardback.png',
    cards: [
      { id: 'Virkul', amount: 1 },
      { id: 'Goblin', amount: 4 },
      { id: 'PlagueThornTalisman', amount: 4 },
      { id: 'EssenceBreak', amount: 4 },
      { id: 'basicswamp', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'gray',
    name: 'Ironroot Vow',
    color: 'gray',
    difficulty: '⭐',
    image: 'CardImages/Avatars/RockLizard.png',
    bannerArt: 'CardImages/Banners/GrayBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/GrayCardback.png',
    cards: [
      { id: 'Drakzul', amount: 1 },
      { id: 'Golemites', amount: 4 },
      { id: 'DesertWolf', amount: 4 },
      { id: 'TitansAnvil', amount: 4 },
      { id: 'EssenceBarrier', amount: 4 },
      { id: 'basicmountain', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'black',
    name: 'Shadowy Descent',
    color: 'black',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Wolf.png',
    bannerArt: 'CardImages/Banners/BlackBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/BlackCardback.png',
    cards: [
      { id: 'Nocthyra', amount: 1 },
      { id: 'Imp', amount: 4 },
      { id: 'Skeleton', amount: 4 },
      { id: 'Bat', amount: 4 },
      { id: 'Vampire', amount: 4 },
      { id: 'basicvampire', amount: 4 },
      { id: 'VeiloftheForgotten', amount: 4 },
      { id: 'EssencePurge', amount: 4 },
      { id: 'basicshadowforest', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'white',
    name: 'Radiant Oath',
    color: 'white',
    difficulty: '⭐',
    image: 'CardImages/Avatars/AngelicWarrior.png',
    bannerArt: 'CardImages/Banners/WhiteBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/WhiteCardback.png',
    cards: [
      { id: 'Solmara', amount: 1 },
      { id: 'AngelicWarrior', amount: 4 },
      { id: 'basicfirepixie', amount: 4 },
      { id: 'LumenSpire', amount: 4 },
      { id: 'EssenceBlessing', amount: 4 },
      { id: 'basicplains', amount: 4 },
      // ... etc
    ]
  },  
  // ...repeat for other colors
];
const ESSENCE_IMAGE_MAP = {
  red: "OtherImages/Essence/EssenceRed.png",
  green: "OtherImages/Essence/EssenceGreen.png",
  blue: "OtherImages/Essence/EssenceBlue.png",
  white: "OtherImages/Essence/EssenceWhite.png",
  black: "OtherImages/Essence/EssenceBlack.png",
  yellow: "OtherImages/Essence/EssenceYellow.png",
  purple: "OtherImages/Essence/EssencePurple.png",
  gray: "OtherImages/Essence/EssenceGray.png",
  colorless: "OtherImages/Essence/EssenceOne.png"
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
    div.style.background = '#232a3c';
    div.innerHTML = `
      <div style="position:relative; width:100%; height:140px; display: flex; align-items: center; justify-content: center;">
        <img src="${deck.image}" alt="${deck.name}" class="deck-art-img">
      </div>
      <div class="deck-name" style="--deck-color:${deck.color}; text-align:center;">${deck.name}</div>
      <div class="deck-difficulty" style="text-align:center;">${deck.difficulty}</div>
    `;
    div.onclick = () => {
      modal.style.display = 'none';
      window.selectedCpuDeck = deck;
      window.currentDeckSlot = deck.id;
      if (window.renderModePlayerDeckTile) window.renderModePlayerDeckTile();
    };
    list.appendChild(div);
  });
  document.getElementById('close-cpu-deck-modal').onclick = () => { modal.style.display = 'none'; };
  modal.style.display = 'flex';
}

function showPlayerDeckModal() {
  const modal = document.getElementById('player-deck-modal');
  const playerList = document.getElementById('player-deck-list');
  const defaultList = document.getElementById('default-player-deck-list');
  playerList.innerHTML = '';
  defaultList.innerHTML = '';

  const playerDecks = window.getPlayerDecks ? window.getPlayerDecks() : [];
  const activeId = window.getActiveDeckId ? window.getActiveDeckId() : null;

  // Render player's own decks (above)
  if (!playerDecks.length) {
    playerList.innerHTML = '<div style="color:#ffe066;">No decks found! Please build a deck or select a starter deck below.</div>';
  } else {
    playerDecks.forEach(deck => {
      const div = document.createElement('div');
      div.className = 'player-deck-option';
      div.style.cursor = 'pointer';
      div.style.border = deck.id === activeId ? '3px solid #ffe066' : '2px solid #333';
      div.style.padding = '12px';
      div.style.background = '#232a3c';
      div.innerHTML = `
        <div style="position:relative; width:100%; height:140px; display: flex; align-items: center; justify-content: center;">
          <img src="${deck.image}" alt="${deck.name}" class="deck-art-img">
        </div>
        <div class="deck-name" style="text-align:center;">${deck.name}</div>
      `;
      div.onclick = () => {
        modal.style.display = 'none';
        window.selectedPlayerDeck = deck;
        startSoloGame();
      };
      playerList.appendChild(div);
    });
  }

  // --- DEFAULT DECKS SECTION (below player's decks) ---
  // The "Default Decks" title is already in your HTML, so just fill the list
  const defaultDecks = DEFAULT_CPU_DECKS;

if (Array.isArray(defaultDecks) && defaultDecks.length > 0) {
  // Create the row container
  const row = document.createElement('div');
  row.style.display = "flex";
  row.style.flexWrap = "wrap";
  row.style.gap = "16px";
  row.style.justifyContent = "center";

  defaultDecks.forEach(deck => {
    const div = document.createElement('div');
    div.className = 'default-player-deck-option';
    div.style.cursor = 'pointer';
    div.style.border = '2px solid ' + deck.color;
    div.style.borderRadius = '12px';
    div.style.background = '#232a3c';
    div.innerHTML = `
      <div style="position:relative; width:100%; height:140px; display: flex; align-items: center; justify-content: center;">
        <img src="${deck.image}" alt="${deck.name}" class="deck-art-img">
      </div>
      <div class="deck-name" style="--deck-color:${deck.color}; text-align:center;">${deck.name}</div>
    `;
    div.onclick = () => {
      modal.style.display = 'none';
      window.selectedPlayerDeck = {
        ...deck,
        deckObj: deck
      };
      startSoloGame();
    };
    row.appendChild(div);
  });
  defaultList.appendChild(row);
}

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

// Example usage:
const greenCpuDeck = buildCpuDeck(DEFAULT_CPU_DECKS.find(d => d.id === 'green'));

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
// Only run this from client.js after both players are ready!
// Called when entering gameplay for solo playtest (not from sync)
function setupBattlefieldGame() {
  const deckObj = getCurrentDeck();
  if (!gameState.playerDeck || !gameState.playerDeck.length) {
    const deckObj = getCurrentDeck();
    gameState.playerDeck = shuffle(buildDeck(deckObj));
  }
  // Do NOT overwrite opponentDeck if already set (multiplayer)
  if (!gameState.opponentDeck || !gameState.opponentDeck.length) {
    // For solo, use your own deck or a dummy/cpu deck
    gameState.opponentDeck = shuffle(buildDeck(deckObj)); // or a CPU deck
  }

  gameState.playerHand = [];
  gameState.playerCreatures = [];
  gameState.playerDomains = [];
  gameState.playerVoid = [];

  gameState.opponentHand = [];
  gameState.opponentCreatures = [];
  gameState.opponentDomains = [];
  gameState.opponentVoid = [];

  gameState.turn = "player";
  gameState.phase = "draw";
  
  // Show gameplay UI    
  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');
  
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
      let targetArr = zoneId === "player-creatures-zone" ? gameState.playerCreatures : gameState.playerDomains;
      moveCard(instanceId, gameState.playerHand, targetArr, {orientation: "vertical"});
      renderGameState();
      setupDropZones();
    };
  });

  document.getElementById('my-profile').style.display = '';
  renderProfile('my-profile', getMyProfileInfo());
  // Show "Game Start" animation, then domain/champion selection, then draw hand
  showGameStartAnimation(() => {
    initiateMainDomainAndChampionSelection(gameState.playerDeck, () => {
      // After selection, draw opening hand
      const INITIAL_HAND_SIZE = 5;
      for (let i = 0; i < INITIAL_HAND_SIZE; i++) {
        if (gameState.playerDeck.length > 0) {
          gameState.playerHand.push(gameState.playerDeck.shift());
        }
      }
      renderGameState();
      setupDropZones();
    });
  });
}
function getZoneArray(zoneId) {
  switch (zoneId) {
    case "player-creatures-zone": return gameState.playerCreatures;
    case "player-domains-zone": return gameState.playerDomains;
    case "player-void-zone": return gameState.playerVoid;
    case "opponent-creatures-zone": return gameState.opponentCreatures;
    case "opponent-domains-zone": return gameState.opponentDomains;
    case "opponent-void-zone": return gameState.opponentVoid;
    // Add more if you have more zones
    default: return null;
  }
}
// MOVE OBJECT
function moveCard(instanceId, fromArr, toArr, extra = {}) {
  const idx = fromArr.findIndex(card => card.instanceId === instanceId);
  if (idx !== -1) {
    let cardObj = { ...fromArr[idx], ...extra };

    // If card has attachments and is leaving the field, detach them
    if (cardObj.attachedCards && cardObj.attachedCards.length > 0) {
      // Decide where to put them: to hand, toArr, or to void?
      let zoneName = getZoneNameForArray(toArr);
      let destinationArr = null;
      if (zoneName === 'playerHand') {
        destinationArr = gameState.playerHand;
      } else if (zoneName === 'playerVoid') {
        destinationArr = gameState.playerVoid;
      } else {
        // Default: send to void
        destinationArr = gameState.playerVoid;
      }
      cardObj.attachedCards.forEach(att => {
        destinationArr.push(att);
      });
      cardObj.attachedCards = []; // clear attachments
    }

    // Define which arrays are the field zones (battlefield)
    const fieldArrays = [
      gameState.playerCreatures,
      gameState.playerDomains,
      gameState.opponentCreatures,
      gameState.opponentDomains
    ];
    const toField = fieldArrays.includes(toArr);

    // If moving OUT of field, remove currentHP & orientation so it resets next time
    if (!toField) {
      delete cardObj.currentHP;
      delete cardObj.orientation;
    }
    fromArr.splice(idx, 1);
    toArr.push(cardObj);
  }
  setupDropZones();
}
// Helper to get zone name for an array reference
function getZoneNameForArray(arr) {
  if (arr === gameState.playerCreatures) return 'playerCreatures';
  if (arr === gameState.playerDomains) return 'playerDomains';
  if (arr === gameState.opponentCreatures) return 'opponentCreatures';
  if (arr === gameState.opponentDomains) return 'opponentDomains';
  if (arr === gameState.playerHand) return 'playerHand';
  if (arr === gameState.opponentHand) return 'opponentHand';
  if (arr === gameState.playerDeck) return 'playerDeck';
  if (arr === gameState.opponentDeck) return 'opponentDeck';
  if (arr === gameState.playerVoid) return 'playerVoid';
  if (arr === gameState.opponentVoid) return 'opponentVoid';
  return '';
}
// BATTLEFIELD BACKGROUNDS
function setBattlefieldBannerBackground(player, bannerUrl) {
  const el = document.getElementById(
    player === "player" ? "battlefield-player-bg" : "battlefield-opponent-bg"
  );
  if (el && bannerUrl) {
    if (player === "opponent") {
      el.style.setProperty('--opponent-bg', `url('${bannerUrl}')`);
      el.style.backgroundImage = 'none'; // Remove old background
    } else {
      el.style.backgroundImage = `url('${bannerUrl}')`;
    }
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";
  }
}

// Call this after both decks are chosen:
function setupBattlefieldBanners() {
  // Player's deck
  const playerDeck = window.selectedPlayerDeck?.deckObj || getCurrentDeck();
  if (playerDeck.bannerArt) {
    setBattlefieldBannerBackground("player", playerDeck.bannerArt);
  }

  // Opponent's deck (multiplayer: use their deck, solo: use default or CPU deck banner)
  const opponentDeck = window.selectedOpponentDeck?.deckObj || window.selectedCpuDeck || {};
  if (opponentDeck.bannerArt) {
    setBattlefieldBannerBackground("opponent", opponentDeck.bannerArt);
  }
}
// CREATE CARD MENUS
function createCardMenu(buttons = []) {
  const menu = document.createElement('div');
  menu.className = 'card-menu';
  buttons.forEach(btnConf => {
    const btn = document.createElement('button');
    btn.type = "button";
    btn.className = 'btn-secondary';
    btn.innerText = btnConf.text;
    btn.onclick = function(e) {
      e.stopPropagation();
      btnConf.onClick.call(this, e);
      closeAllMenus(); // Always close after any button
    };
    menu.appendChild(btn);
  });
  menu.onclick = function(e) { e.stopPropagation(); };
  return menu;
}

function renderGameState() {
  // RENDER PLAYER HAND
  const playerHandDiv = document.getElementById('player-hand');
    playerHandDiv.innerHTML = '';
    for (let cardObj of gameState.playerHand) {
      const card = dummyCards.find(c => c.id === cardObj.cardId);
      if (!card) continue;
      const div = document.createElement('div');
      div.className = 'card-battlefield';
      div.draggable = true;
      div.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", cardObj.instanceId);
        e.dataTransfer.setData("source", "hand");
        div.classList.add('dragging');
        e.dataTransfer.setDragImage(div, div.offsetWidth / 2, div.offsetHeight / 2);
      };
      div.ondragend = () => div.classList.remove('dragging');
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.style.width = "80px";
      div.appendChild(img);
      div.onclick = (e) => {
        e.stopPropagation();
        showHandCardMenu(cardObj.instanceId, div);
    };
    playerHandDiv.appendChild(div);
  }
// RENDER OPPONENT HAND FACEDOWN
const opponentHandDiv = document.getElementById('opponent-hand');
opponentHandDiv.innerHTML = '';
let opponentCardback = (window.selectedCpuDeck && window.selectedCpuDeck.cardbackArt)
  ? window.selectedCpuDeck.cardbackArt
  : "OtherImages/Cardbacks/DefaultCardback.png"; // fallback

for (let i = 0; i < gameState.opponentHand.length; i++) {
  const div = document.createElement('div');
  div.className = 'card-battlefield';
  const img = document.createElement('img');
  img.src = opponentCardback;
  img.alt = "Opponent's card";
  img.style.width = "80px";
  div.appendChild(img);
  opponentHandDiv.appendChild(div);
}
  renderRowZone('opponent-creatures-zone', gameState.opponentCreatures, "creature");
  renderRowZone('opponent-domains-zone', gameState.opponentDomains, "domain");
  renderRowZone('player-creatures-zone', gameState.playerCreatures, "creature");
  renderRowZone('player-domains-zone', gameState.playerDomains, "domain");
  renderRightbarZones();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function drawCards(who, n) {
  let deck = who === "player" ? gameState.playerDeck : gameState.opponentDeck;
  let hand = who === "player" ? gameState.playerHand : gameState.opponentHand;
  for (let i = 0; i < n && deck.length > 0; i++) {
    hand.push(deck.shift());
  }
  renderGameState();
  setupDropZones();
}


// HAND OPTIONS MENU
function showHandCardMenu(instanceId, cardDiv) {
  closeAllMenus();

  const cardObj = gameState.playerHand.find(c => c.instanceId === instanceId);

  // Define actions
  const buttons = [
    {
  text: "Play",
  onClick: async function(e) {
    e.stopPropagation();
    closeAllMenus();
    const cardObj = gameState.playerHand.find(c => c.instanceId === instanceId);
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);

    // Determine allowed target zone
let targetArr, toZoneId;
if (cardData.category === "creature") {
  targetArr = gameState.playerCreatures;
  toZoneId = "player-creatures-zone";
} else if (cardData.category === "domain") {
  targetArr = gameState.playerDomains;
  toZoneId = "player-domains-zone";
} else {
  alert("You can only play creature or domain cards here!");
  return;
}

if (
  !cardData.cost ||
  (typeof cardData.cost === "number" && cardData.cost === 0) ||
  (typeof cardData.cost === "object" && Object.values(cardData.cost).reduce((a, b) => a + b, 0) === 0)
) {
  // No cost, play immediately
  await moveCardUniversal({
    instanceId,
    fromArr: gameState.playerHand,
    toArr: targetArr,
    extra: { orientation: "vertical" },
    fromZoneId: "player-hand",
    toZoneId
  });
  return;
}

    showEssencePaymentModal({
      card: cardData,
      cost: cardData.cost,
      eligibleCards: getAllEssenceSources(),
      onPaid: async function() {
        await moveCardUniversal({
          instanceId,
          fromArr: gameState.playerHand,
          toArr: targetArr,
          extra: { orientation: "vertical" },
          fromZoneId: "player-hand",
          toZoneId
        });
      }
    });
  }
},
    {
      text: "Send to Void",
      onClick: async function(e) {
        e.stopPropagation();
        await moveCardUniversal({
          instanceId,
          fromArr: gameState.playerHand,
          toArr: gameState.playerVoid,
          fromZoneId: "player-hand",
          toZoneId: "player-void-zone"
        });
        closeAllMenus();
      }
    },
    {
      text: "Return to Deck",
      onClick: async function(e) {
        e.stopPropagation();
        await moveCardUniversal({
          instanceId,
          fromArr: gameState.playerHand,
          toArr: gameState.playerDeck,
          fromZoneId: "player-hand",
          toZoneId: "player-deck-zone"
        });
        closeAllMenus();
      }
    },
    {
      text: "View",
      onClick: function(e) {
        e.stopPropagation();
        showFullCardModal(cardObj);
        closeAllMenus();
      }
    }
  ];
  const menu = createCardMenu(buttons);

  // Position relative to cardDiv
  const rect = cardDiv.getBoundingClientRect();
  placeMenuWithinViewport(menu, rect);

  // Prevent menu click from closing (in case outside handler runs)
  menu.onclick = function(e) { e.stopPropagation(); };

  // Hide menu when clicking elsewhere
  setTimeout(() => {
    document.body.addEventListener('click', function handler() {
      closeAllMenus();
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 10);
}
// DROP ZONES
function setupDropZones() {
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
      const cardIdx = gameState.playerHand.findIndex(c => c.instanceId === instanceId);
      if (cardIdx === -1) return;
      // Choose the correct target array based on zoneId
      let targetArr = zoneId === "player-creatures-zone" ? gameState.playerCreatures : gameState.playerDomains;
      moveCard(instanceId, gameState.playerHand, targetArr, {orientation: "vertical"});
      renderGameState();
      setupDropZones();
    };
  });
}
// RENDER ROW ZONES
function renderRowZone(zoneId, cardArray, category) {
  const zoneDiv = document.getElementById(zoneId);
  zoneDiv.innerHTML = '';

  // RENDER CARDS IN ZONES
  for (const cardObj of cardArray) {
  zoneDiv.appendChild(renderCardOnField(cardObj, zoneId));
  }
}
function renderRightbarZones() {
  const rightbar = document.getElementById('battlefield-rightbar');
  // Get all zone containers
  const oppDeckDiv = document.getElementById('opponent-deck-zone');
  const oppVoidDiv = document.getElementById('opponent-void-zone');
  const phaseBadge = document.getElementById('phase-badge');
  const playerVoidDiv = document.getElementById('player-void-zone');
  const playerDeckDiv = document.getElementById('player-deck-zone');

  // Fill the zones with current cards
  oppDeckDiv.innerHTML = '';
  appendDeckZone(oppDeckDiv, gameState.opponentDeck, "opponent");

  oppVoidDiv.innerHTML = '';
  appendVoidZone(oppVoidDiv, gameState.opponentVoid, "opponent");

  playerVoidDiv.innerHTML = '';
  appendVoidZone(playerVoidDiv, gameState.playerVoid, "player");

  playerDeckDiv.innerHTML = '';
  appendDeckZone(playerDeckDiv, gameState.playerDeck, "player");

  // Append in desired order
  rightbar.appendChild(oppDeckDiv);
  rightbar.appendChild(oppVoidDiv);
  rightbar.appendChild(phaseBadge);
  rightbar.appendChild(playerVoidDiv);
  rightbar.appendChild(playerDeckDiv);
}
// Helper to create and append the deck zone card at the end
function appendDeckZone(parentDiv, deckArray, who) {
  const deckZone = document.createElement('div');
  deckZone.className = 'deck-zone';
  const deckCard = document.createElement('div');
  deckCard.className = 'card-deck';
  let deckCardback = "CardImages/Domains/placeholder.png";
  if (who === "opponent" && window.selectedCpuDeck && window.selectedCpuDeck.cardbackArt) {
  deckCardback = window.selectedCpuDeck.cardbackArt;
  }
  const img = document.createElement('img');
  img.src = deckCardback;
  img.alt = (who === "player" ? "Your Deck" : "Opponent's Deck");
  img.style.width = "56px";
  img.style.display = "block";
  img.style.margin = "0 auto";
  deckCard.appendChild(img);

  const countDiv = document.createElement('div');
  countDiv.style.textAlign = 'center';
  countDiv.style.fontWeight = 'bold';
  countDiv.textContent = deckArray.length;
  deckCard.appendChild(countDiv);
  deckZone.appendChild(deckCard);

  if (who === "player") {
    deckCard.onclick = (e) => {
      e.stopPropagation();
      closeAllMenus();

      const buttons = [
        {
          text: "Draw",
          onClick: function(ev) {
            ev.stopPropagation();
            if (gameState.turn === "player" && gameState.playerDeck.length > 0) {
              moveCard(gameState.playerDeck[0].instanceId, gameState.playerDeck, gameState.playerHand);
              renderGameState();
              setupDropZones();
            }
            closeAllMenus();
          }
        },
        {
          text: "Shuffle",
          onClick: function(ev) {
            ev.stopPropagation();
            gameState.playerDeck = shuffle(gameState.playerDeck);
            renderGameState();
            setupDropZones();
            closeAllMenus();
          }
        },
        {
          text: "Search",
          onClick: function(ev) {
            ev.stopPropagation();
            if (gameState.playerDeck.length > 0) {
              openDeckModal();
            }
            closeAllMenus();
          }
        }
      ];
      const menu = createCardMenu(buttons);
      const rect = deckCard.getBoundingClientRect();
      placeMenuWithinViewport(menu, rect);

      menu.onclick = function(e) { e.stopPropagation(); };

      setTimeout(() => {
        document.body.addEventListener('click', function handler() {
          closeAllMenus();
          document.body.removeEventListener('click', handler);
        }, { once: true });
      }, 10);
    };
  }
  parentDiv.appendChild(deckZone);
}
// VOID ZONE
function appendVoidZone(parentDiv, voidArray, who) {
  const voidZone = document.createElement('div');
  voidZone.className = 'void-zone';
  const voidCard = document.createElement('div');
  voidCard.className = 'card-void';
  // LAST CARD VOID
  if (voidArray.length > 0) {
    const lastCardObj = voidArray[voidArray.length - 1];
    const card = dummyCards.find(c => c.id === lastCardObj.cardId);
     if (card && card.image) {
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.style.width = "60px";
      img.style.opacity = "0.85";
      voidCard.appendChild(img);
    }
  }
  const countDiv = document.createElement('div');
  countDiv.style.textAlign = 'center';
  countDiv.style.fontWeight = 'bold';
  countDiv.textContent = voidArray.length;
  voidCard.appendChild(countDiv);
  voidZone.appendChild(voidCard);

  voidCard.onclick = (e) => {
    e.stopPropagation();
    closeAllMenus();
    openVoidModal();
  };

  parentDiv.appendChild(voidZone);
}
// REMOVE STAT CHANGES
function cleanCard(cardObj) {
  const cleaned = { ...cardObj };
  delete cleaned.currentHP;
  delete cleaned.orientation;
  return cleaned;
}
// CLOSE MODAL BEFORE OPENING A NEW ONE
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });
}
function closeAllMenus() {
  document.querySelectorAll('.card-menu').forEach(m => m.remove());
}
// OPEN DECK MODAL
function openDeckModal() {
  const modal = document.getElementById('deck-modal');
  // Always attach the close-on-backdrop handler
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };
  // Prevent modal-content clicks from closing the modal
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.onclick = e => e.stopPropagation();
  }

  let list = modal.querySelector('.modal-card-list');
  if (!list) {
    list = document.createElement('div');
    list.className = 'modal-card-list';
    modal.querySelector('.modal-content').appendChild(list);
  }
  list.innerHTML = "<h3>Deck</h3>";

gameState.playerDeck.forEach((cardObj, idx) => {
  const card = dummyCards.find(c => c.id === cardObj.cardId);
  if (!card) return;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'modal-card-wrapper';
  
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';

  const img = document.createElement('img');
  img.src = card.image;
  img.alt = card.name;
  img.className = "modal-card-img";
  cardDiv.appendChild(img);

  // Make the image itself clickable for the menu
  img.style.cursor = "pointer";
  img.onclick = (e) => {
    e.stopPropagation();
    modal.querySelectorAll('.card-menu').forEach(m => m.remove());
    const buttons = [
      {
        text: "Add to Hand",
        onClick: function(ev) {
          ev.stopPropagation();
          moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerHand);
          renderGameState();
          closeAllMenus();
          openDeckModal();
        }
      },
      {
        text: "Send to Void",
        onClick: function(ev) {
          ev.stopPropagation();
          moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerVoid);
          renderGameState();
          closeAllMenus();
          openDeckModal();
        }
      },
      {
        text: "View",
        onClick: function(ev) {
          ev.stopPropagation();
          showFullCardModal(cardObj);
          closeAllMenus();
        }
      }
    ];
    const menu = createCardMenu(buttons);
    wrapper.appendChild(menu);
    setTimeout(() => {
      document.body.addEventListener('click', function handler() {
        modal.querySelectorAll('.card-menu').forEach(m => m.remove());
        document.body.removeEventListener('click', handler);
      }, { once: true });
    }, 10);
  };
  wrapper.appendChild(cardDiv);
  list.appendChild(wrapper);
  cardDiv.appendChild(img);
});

  modal.style.display = "block";
}

// CARD STATS DETECTION
function getBaseHp(cardId) {
  const card = dummyCards.find(c => c.id === cardId);
  return card ? card.hp : 1; // fallback to 1 if not found
}
function renderCardOnField(cardObj, zoneId) {
  // CURRENT HP
  if (typeof cardObj.currentHP !== "number") {
    cardObj.currentHP = getBaseHp(cardObj.cardId);
  }
  const baseHP = getBaseHp(cardObj.cardId);
  const currentHP = cardObj.currentHP;
  const hpPercent = Math.max(0, Math.min(1, currentHP / baseHP));

  // Create the wrapper FIRST so it can be used below
  const wrapper = document.createElement('div');
  wrapper.className = 'card-battlefield-wrapper';
  wrapper.style.display = 'flex';
  wrapper.style.flexDirection = 'column';
  wrapper.style.alignItems = 'center';

  // HP bar color logic
  let barColor = "#4caf50"; // green
  if (hpPercent <= 0.25) {
    barColor = "#e53935"; // red
  } else if (hpPercent <= 0.5) {
    barColor = "#ff9800"; // orange
  }
  // HP Bar just below the card
  const barWrap = document.createElement('div');
  barWrap.className = 'hp-bar-wrap';
  const bar = document.createElement('div');
  bar.className = 'hp-bar';
  bar.style.width = `${Math.round(hpPercent * 100)}%`;
  bar.style.backgroundColor = barColor;
  barWrap.appendChild(bar);
  wrapper.appendChild(barWrap);

  // HP change animation
  if (typeof cardObj._prevHP === "number" && cardObj._prevHP !== currentHP) {
    if (currentHP < cardObj._prevHP) {
      bar.classList.add("hp-bar-damage");
      setTimeout(() => bar.classList.remove("hp-bar-damage"), 300);
    } else {
      bar.classList.add("hp-bar-heal");
      setTimeout(() => bar.classList.remove("hp-bar-heal"), 300);
    }
  }
  cardObj._prevHP = currentHP; // Store for next render

  // Create the main card div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';
  cardDiv.dataset.instanceId = cardObj.instanceId;
  cardDiv.style.position = 'relative';
  // --- FIRE PARTICLES FOR RED CARDS ---
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  const particlesConfig = getParticlePresetForCard(cardData);
  if (particlesConfig) {
    applyCardParticles({
      cardDiv,
      effectKey: `${cardObj.instanceId}_${Array.isArray(cardData.color) ? cardData.color.join('_') : cardData.color}`,
      particlesConfig
    });
  }

  // Add card image
  if (cardData && cardData.image) {
    const img = document.createElement('img');
    img.src = cardData.image;
    img.alt = cardData.name || "Card";
    if (cardObj.orientation === "horizontal") {
      img.style.transform = "rotate(90deg)";
    }
    cardDiv.appendChild(img);
  } else {
    cardDiv.textContent = cardData ? cardData.name : "Unknown";
  }

  // Allow any card to receive attachments
  cardDiv.ondragover = (e) => {
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedCard = gameState.playerHand.find(c => c.instanceId === draggedId);
    if (draggedCard) {
      e.preventDefault();
      cardDiv.classList.add('drag-over');
    }
  };
  cardDiv.ondragleave = () => cardDiv.classList.remove('drag-over');
  cardDiv.ondrop = (e) => {
    e.preventDefault();
    cardDiv.classList.remove('drag-over');
    const instanceId = e.dataTransfer.getData("text/plain");
    const idx = gameState.playerHand.findIndex(c => c.instanceId === instanceId);
    if (idx !== -1) {
      const attachObj = gameState.playerHand.splice(idx, 1)[0];
      if (!cardObj.attachedCards) cardObj.attachedCards = [];
      cardObj.attachedCards.push({ ...attachObj });
      renderGameState();
      setupDropZones();
    }
  };

  // ATTACHED CARDS ON TOP
  if (cardObj.attachedCards && cardObj.attachedCards.length > 0) {
    const stackDiv = document.createElement('div');
    stackDiv.className = 'attached-cards-stack';
    stackDiv.style.position = 'absolute';
    stackDiv.style.left = '50%';
    stackDiv.style.top = '12px';
    stackDiv.style.transform = 'translateX(-50%)';
    stackDiv.style.pointerEvents = 'none';
    stackDiv.style.zIndex = '5';

    cardObj.attachedCards.forEach((attachObj, i) => {
      const attachData = dummyCards.find(c => c.id === attachObj.cardId);
      if (!attachData) return;
      const attDiv = document.createElement('div');
      attDiv.className = 'card attached-on-top';
      attDiv.style.width = '60px';
      attDiv.style.height = '85px';
      attDiv.style.position = 'absolute';
      attDiv.style.left = '0';
      attDiv.style.top = `${i * 16}px`;
      attDiv.style.pointerEvents = 'auto';
      attDiv.title = attachData.name;

      // ATTACHMENT MENU
      attDiv.onclick = (e) => {
        e.stopPropagation();
        // Remove any open menus first
        attDiv.querySelectorAll('.card-menu').forEach(m => m.remove());
        // Create menu
        const buttons = [
          {
            text: "View",
            onClick: function(ev) {
              ev.stopPropagation();
              showFullCardModal(attachObj);
              this.closest('.card-menu').remove();
            }
          },
          {
            text: "Detach",
            onClick: function(ev) {
              ev.stopPropagation();
              cardObj.attachedCards.splice(i, 1);
              gameState.playerVoid.push(attachObj);
              renderGameState();
              setupDropZones();
              this.closest('.card-menu').remove();
            }
          }
        ];
        const menu = createCardMenu(buttons);
        menu.style.left = '70px'; // optional: offset menu to the right of attachment
        attDiv.appendChild(menu);
        menu.style.display = 'block';

        // Hide menu if click elsewhere
        setTimeout(() => {
          document.body.addEventListener('click', function handler() {
            menu.remove();
            document.body.removeEventListener('click', handler);
          }, { once: true });
        }, 10);
      };

      const img = document.createElement('img');
      img.src = attachData.image;
      img.alt = attachData.name;
      img.style.width = '100%';
      img.style.borderRadius = '8px';
      attDiv.appendChild(img);

      stackDiv.appendChild(attDiv);
    });
    cardDiv.style.position = 'relative';
    cardDiv.appendChild(stackDiv);
  }

  // Essence pool rendering
  const essenceDiv = renderEssencePool(cardObj);
  if (essenceDiv) cardDiv.appendChild(essenceDiv);

  // HP BADGE
  const hpBadge = document.createElement('span');
  hpBadge.className = 'hp-badge-heart';
  hpBadge.innerHTML = `
    <svg viewBox="0 0 32 32" class="hp-heart-svg" width="28" height="28">
      <path d="M16 29s-11-7-11-15C5 5.8 13 5.8 16 12.5 19 5.8 27 5.8 27 14c0 8-11 15-11 15z"
          fill="#e25555" stroke="#be2626" stroke-width="1"/>
      <text x="16" y="20" text-anchor="middle" font-size="14" fill="#fff" font-family="Verdana" font-weight="bold">${cardObj.currentHP}</text>
    </svg>
  `;
  cardDiv.appendChild(hpBadge);

  // Add cardDiv to wrapper
  wrapper.appendChild(cardDiv);

  // MANUAL HP UPDATE
  cardDiv.onclick = function(e) {
    e.stopPropagation();
    showCardActionMenu(cardObj.instanceId, zoneId, cardObj.orientation || "vertical", cardDiv);
  };

  return wrapper;
}

function renderEssencePool(cardObj) {
  if (!cardObj.essence) return null;
  // Track previous essence for animation (per card)
  if (!cardObj._prevEssence) cardObj._prevEssence = {};

  const poolDiv = document.createElement('div');
  poolDiv.className = 'essence-pool';
  // Loop through all essence types
  const ESSENCE_TYPES = ['green','red','blue','yellow','purple','gray','black','white'];
  ESSENCE_TYPES.forEach(type => {
    const amount = cardObj.essence[type] || 0;
    const prevAmount = cardObj._prevEssence[type] || 0;
    if (amount > 0) {
      const icon = document.createElement('div');
      icon.className = `essence-icon essence-${type}`;
      icon.title = `${type} Essence: ${amount}`;
      icon.innerHTML = `<img src="${ESSENCE_IMAGE_MAP[type]}" class="essence-img"><span class="essence-amount">${amount}</span>`;
      // Animate pop if new essence appears or increases
      if (amount > prevAmount) {
        setTimeout(() => animateEssencePop(icon), 20); // Allow DOM insert first
      }
      poolDiv.appendChild(icon);
    }
    // Update tracker for next render
    cardObj._prevEssence[type] = amount;
  });
  return poolDiv;
}
function addEssence(cardObj, type, amount) {
  if (!cardObj.essence) cardObj.essence = {};
  cardObj.essence[type] = (cardObj.essence[type] || 0) + amount;
  renderGameState();
}
function consumeEssence(cardObj, type, amount) {
  if (cardObj.essence && cardObj.essence[type] >= amount) {
    cardObj.essence[type] -= amount;
    renderGameState();
    return true;
  }
  return false;
}
// Actions in zones
var currentCardMenuState = null;

function showSetHpModal(cardObj, onSet) {
  // Remove any existing HP modal
  let modal = document.getElementById('set-hp-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'set-hp-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

  const content = document.createElement('div');
  content.className = 'modal-content';
  content.onclick = e => e.stopPropagation();

  content.innerHTML = `
    <h3>Set HP</h3>
    <div style="margin-bottom:10px;">
      <input id="set-hp-input" type="number" min="0" max="99" value="${cardObj.currentHP || 0}" style="width:60px;padding:6px 10px;font-size:1.15em;border-radius:7px;">
    </div>
    <button id="set-hp-confirm" class="btn-secondary" style="margin-right:8px;">Set</button>
    <button id="set-hp-cancel" class="btn-negative-secondary">Cancel</button>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  document.getElementById('set-hp-confirm').onclick = function() {
    const val = parseInt(document.getElementById('set-hp-input').value, 10);
    if (!isNaN(val) && val >= 0 && val <= 99) {
      modal.remove();
      onSet(val);
    } else {
      document.getElementById('set-hp-input').style.border = "2px solid #e25555";
    }
  };
  document.getElementById('set-hp-cancel').onclick = () => modal.remove();

  document.getElementById('set-hp-input').focus();
}

function showCardActionMenu(instanceId, zoneId, orientation, cardDiv) {
  closeAllMenus();
  currentCardMenuState = { instanceId, zoneId, orientation };
  // Define menu options
  const buttons = [
{
  text: "Set HP",
  onClick: function(e) {
    e.stopPropagation();
    let arr = getZoneArray(zoneId);
    if (arr) {
      let cardObj = arr.find(card => card.instanceId === instanceId);
      if (!cardObj) return;
      showSetHpModal(cardObj, function(newHp) {
        cardObj.currentHP = newHp;
        renderGameState();
        closeAllMenus();
      });
    } else {
      closeAllMenus();
    }
  }
},
    {
      text: "Attack",
      onClick: function(e) {
        e.stopPropagation();
        startAttackTargeting(instanceId, zoneId, cardDiv);
        closeAllMenus();
      }
    },
    {
      text: "Return to Hand",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          const idx = arr.findIndex(card => card.instanceId === instanceId);
          if (idx !== -1) {
            const [cardObj] = arr.splice(idx, 1);
            gameState.playerHand.push(cleanCard(cardObj));
          }
        }
        renderGameState();
        setupDropZones();
        closeAllMenus();
      }
    },
    {
      text: "Change Position",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          for (let c of arr) {
            if (c.instanceId === instanceId) {
              c.orientation = (c.orientation === "horizontal") ? "vertical" : "horizontal";
            }
          }
        }
        renderGameState();
        setupDropZones();
        closeAllMenus();
      }
    },
    {
      text: "Send to Void",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          const idx = arr.findIndex(card => card.instanceId === instanceId);
          if (idx !== -1) {
            const [cardObj] = arr.splice(idx, 1);
            gameState.playerVoid.push(cleanCard(cardObj));
          }
        }
        renderGameState();
        setupDropZones();
        closeAllMenus();
      }
    },
    {
      text: "Return to Deck",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          const idx = arr.findIndex(card => card.instanceId === instanceId);
          if (idx !== -1) {
            const [cardObj] = arr.splice(idx, 1);
            gameState.playerDeck.push(cleanCard(cardObj));
          }
        }
        renderGameState();
        setupDropZones();
        closeAllMenus();
      }
    },
    {
      text: "View",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          const cardObj = arr.find(card => card.instanceId === instanceId);
          if (cardObj) {
            showFullCardModal(cardObj);
          }
        }
        closeAllMenus();
      }
    }
  ];

// Create and show the menu
  const menu = createCardMenu(buttons);
// Position menu absolutely near cardDiv
  const rect = cardDiv.getBoundingClientRect();
  placeMenuWithinViewport(menu, rect);
  
  menu.onclick = function(e) { e.stopPropagation(); };
  // Hide menu when clicking elsewhere
  setTimeout(() => {
    document.body.addEventListener('click', function handler() {
      closeAllMenus();
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 10);
}

// ==== VOID MODAL ====
function openVoidModal() {
  let modal = document.getElementById('void-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'void-modal';
    modal.className = 'modal';
    const content = document.createElement('div');
    content.className = 'modal-content';
    modal.appendChild(content);
    document.body.appendChild(modal);
  }
  // Always attach (overwrite) close-on-backdrop handler
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };
  // Always prevent modal-content clicks from closing the modal
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.onclick = e => e.stopPropagation();
  }

  let list = modal.querySelector('.modal-card-list');
  if (!list) {
    list = document.createElement('div');
    list.className = 'modal-card-list';
    modal.querySelector('.modal-content').appendChild(list);
  }
  list.innerHTML = '';
  const voidCards = gameState.playerVoid;
  if (voidCards.length === 0) {
    list.innerHTML = '<div style="color:#999;">Void is empty.</div>';
  } else {
  voidCards.forEach((cardObj, idx) => {
  const card = dummyCards.find(c => c.id === cardObj.cardId);
  if (!card) return;
    
  const wrapper = document.createElement('div');
  wrapper.className = 'modal-card-wrapper';
    
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';

  const img = document.createElement('img');
  img.src = card.image;
  img.alt = card.name;
  img.className = "modal-card-img";
  cardDiv.appendChild(img);

  // Make image clickable for menu
  img.style.cursor = "pointer";
  img.onclick = (e) => {
    e.stopPropagation();
    // Remove all card menus in this modal
    closeAllMenus();
    const buttons = [
      {
        text: "Return to Hand",
        onClick: function(e) {
          e.stopPropagation();
          moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerHand);
          renderGameState();
          closeAllMenus();
          openVoidModal();
        }
      },
      {
        text: "Return to Deck",
        onClick: function(e) {
          e.stopPropagation();
          moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerDeck);
          renderGameState();
          closeAllMenus();
          openVoidModal();
        }
      },
      {
        text: "View",
        onClick: function(e) {
          e.stopPropagation();
          showFullCardModal(cardObj);
          closeAllMenus();
        }
      }
    ];
        const menu = createCardMenu(buttons);
        wrapper.appendChild(menu);
        menu.onclick = function(e) { e.stopPropagation(); };
        setTimeout(() => {
          document.body.addEventListener('click', function handler() {
            closeAllMenus();
            document.body.removeEventListener('click', handler);
          }, { once: true });
        }, 10);
      };
      wrapper.appendChild(cardDiv);
      list.appendChild(wrapper);
      cardDiv.appendChild(img);
    });
  }
  modal.style.display = 'block';
}

// CURRENT PHASE
function getCurrentPhaseIndex() {
  return PHASES.findIndex(
    p => p.turn === gameState.turn && p.phase === gameState.phase
  );
}
function updatePhase() {
  const phaseBadge = document.getElementById('phase-badge');
  const phaseNameSpan = document.getElementById('phase-name');
  const nextPhaseBtn = document.getElementById('next-phase-btn');
  phaseBadge.classList.remove('opponent-turn', 'player-turn');
  phaseBadge.classList.add(gameState.turn === 'opponent' ? 'opponent-turn' : 'player-turn');
  // Display the current phase on the button
  if (nextPhaseBtn) {
    nextPhaseBtn.textContent = PHASE_DISPLAY_NAMES[gameState.phase] || gameState.phase;
  }  
  if (phaseNameSpan) {
    phaseNameSpan.className = PHASE_CLASS[gameState.phase];
    phaseNameSpan.textContent = PHASE_DISPLAY_NAMES[gameState.phase] || gameState.phase;
  }
  if (gameState.phase === "essence") {
    doEssencePhase(gameState.turn);
  }
  if (gameState.turn === "opponent") {
    setTimeout(runCpuTurn, 500);
  }  
  if (gameState.phase === "action") {
    resetAttackFlags(gameState.turn);
  }    
}
// Phase control events
nextPhaseBtn.onclick = () => {
  let idx = getCurrentPhaseIndex();
  idx = (idx + 1) % PHASES.length;
  gameState.turn = PHASES[idx].turn;
  gameState.phase = PHASES[idx].phase;
  updatePhase();
  renderGameState && renderGameState();
  setupDropZones();
};

// MULTIPLAYER START
function emitGameAction(action) {
  if (window.socket && window.currentRoomId) {
    socket.emit('game action', { ...action, roomId: currentRoomId });
  }
}
function showLobbyUI() {
  document.getElementById('lobby-ui').style.display = '';
  document.getElementById('chat-ui').style.display = 'none';
  document.getElementById('lobby-topbar').style.display = 'none';
  document.getElementById('opponent-profile').style.display = 'none';
  document.getElementById('my-profile').style.display = 'none';
}
function showGameUI(myProfile, opponentProfile) {
  document.getElementById('lobby-ui').style.display = 'none';
  document.getElementById('chat-ui').style.display = '';
  document.getElementById('lobby-topbar').style.display = '';
  document.getElementById('opponent-profile').style.display = '';
  document.getElementById('my-profile').style.display = '';
  renderProfile('my-profile', myProfile);
  renderProfile('opponent-profile', opponentProfile);
}
function renderProfile(elId, profile) {
  const el = document.getElementById(elId);
  if (!el || !profile) return;
  el.innerHTML = `
    <img src="${profile.avatar}" alt="Profile">
    <div>
      <div class="profile-username">${profile.username}</div>
      <img class="profile-banner" src="${profile.banner}" alt="Banner">
    </div>
  `;
}
function getMyProfileInfo() {
  return {
    username: document.getElementById('profile-username-display').textContent,
    avatar: document.getElementById('profile-pic').src,
    banner: document.getElementById('profile-banner').src
  };
}
function showChat() {
  document.getElementById('lobby-ui').style.display = 'none';
  document.getElementById('chat-ui').style.display = 'block';
}
function handleOpponentAction(action) {
  switch (action.type) {
    case "play_card":
    // Find the card in opponentHand, move to opponentCreatures
    moveCard(action.cardId, gameState.opponentHand, gameState.opponentCreatures, action.extra);
    renderGameState();
    break;

    case "end_turn":
      // Opponent ended their turn
      gameState.isPlayerTurn = true;
      renderGameState();
      showStatusMessage("Your turn!");
      break;

    case "draw_card":
      // Opponent drew a card
      if (gameState.opponentDeck.length > 0) {
        const card = gameState.opponentDeck.pop();
        gameState.opponentHand.push(card);
        renderGameState();
      }
      break;

    case "chat":
      // If you want to display chat messages inside gameplay
      appendChatMessage(`Opponent: ${action.message}`);
      break;

    case "custom_action":
      // Custom logic for any other action type
      // Implement your specific logic here
      break;

    default:
      console.warn("Unknown opponent action:", action);
  }
}
// --- Helper: find card DOM element by instanceId in a given zone ---
function findCardDivInZone(zoneId, instanceId) {
  const zone = document.getElementById(zoneId);
  if (!zone) return null;
  // Your render uses .card-battlefield on the div holding the card
  return Array.from(zone.querySelectorAll('.card-battlefield')).find(div => {
    return div.dataset.instanceId === instanceId;
  });
}
// ==== CPU Automation ====
function runCpuTurn() {
  if (gameState.turn !== "opponent") return;
  switch (gameState.phase) {
    case "draw":
      drawCards("opponent", 1);
      setTimeout(nextPhaseBtn.click, 800);
      break;
    case "essence":
      // Add CPU logic for playing Essence cards here
      setTimeout(nextPhaseBtn.click, 800);
      break;
    case "action":
      // Add CPU logic for playing creatures, attacking, etc here
      setTimeout(nextPhaseBtn.click, 1200);
      break;
    case "end":
      setTimeout(nextPhaseBtn.click, 800);
      break;
  }
}
// --- Universal move function with optional animation ---
async function moveCardUniversal({
  instanceId,
  fromArr,
  toArr,
  extra = {},
  fromZoneId = null,
  toZoneId = null,
  sourceDiv = null,
  destinationDiv = null,
  animationType = "move"
}) {
  if (animationType !== "none" && fromZoneId && toZoneId) {
    // Fade out, move, then fade in
    animateCardFade(instanceId, fromZoneId, toZoneId, () => {
      moveCard(instanceId, fromArr, toArr, extra);
      renderGameState();
      setupDropZones();
    });
  } else {
    moveCard(instanceId, fromArr, toArr, extra);
    renderGameState();
    setupDropZones();
  }
}
  // CARD ANIMATIONS
function animateCardFade(instanceId, fromZoneId, toZoneId, callback) {
  // Find the card div in the fromZone
  const fromZone = document.getElementById(fromZoneId);
  if (!fromZone) { callback && callback(); return; }
  const cardDiv = Array.from(fromZone.querySelectorAll('.card-battlefield')).find(div => {
    return div.dataset.instanceId === instanceId;
  });
  if (!cardDiv) { callback && callback(); return; }

  // Fade out
  cardDiv.classList.add('card-fade-out');
  setTimeout(() => {
    // After fade out, run the callback (move card in state), then fade in at destination
    callback && callback();

    // Allow fade-in at destination (after next render)
    setTimeout(() => {
      const toZone = document.getElementById(toZoneId);
      if (!toZone) return;
      const newCardDiv = Array.from(toZone.querySelectorAll('.card-battlefield')).find(div => {
        return div.dataset.instanceId === instanceId;
      });
      if (newCardDiv) {
        newCardDiv.classList.add('card-fade-in');
        setTimeout(() => newCardDiv.classList.remove('card-fade-in'), 200);
      }
    }, 30);
  }, 180);
}

// START GAME
function showGameStartAnimation(callback) {
  // Create overlay
  let overlay = document.createElement('div');
  overlay.id = 'game-start-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(10,20,40,0.90)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 99999;
  overlay.style.transition = 'opacity 0.7s';

  let text = document.createElement('div');
  text.innerText = 'Game Start!';
  text.style.color = '#ffe066';
  text.style.fontSize = '3.2em';
  text.style.letterSpacing = '0.1em';
  text.style.textShadow = '0 4px 16px #000a, 0 1px 0 #fff9';
  text.style.fontWeight = 'bold';
  text.style.opacity = '0.97';

  overlay.appendChild(text);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 700); // match transition
  }, 1200); // show for 1.2 seconds
}

// END GAME ANIMATION
function showEndGameAnimation(message, color = '#ffe066', callback = null) {
  let overlay = document.createElement('div');
  overlay.id = 'game-end-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(10,20,40,0.92)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 99999;
  overlay.style.transition = 'opacity 0.7s';

  let text = document.createElement('div');
  text.innerText = message;
  text.style.color = color;
  text.style.fontSize = '3.2em';
  text.style.letterSpacing = '0.1em';
  text.style.textShadow = '0 4px 16px #000a, 0 1px 0 #fff9';
  text.style.fontWeight = 'bold';
  text.style.opacity = '0.97';

  overlay.appendChild(text);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 1100); // slightly longer so player can see it
  }, 1700); // show for 1.7 seconds
}
function checkEndGame() {
  if (gameState.playerMainDomain && gameState.playerMainDomain.currentHP <= 0) {
    showEndGameAnimation("Defeat", "#e25555");
    // disable actions, offer rematch, etc.
    return true;
  }
  if (gameState.opponentMainDomain && gameState.opponentMainDomain.currentHP <= 0) {
    showEndGameAnimation("Victory", "#ffe066");
    // disable actions, offer rematch, etc.
    return true;
  }
  return false;
}

// MAIN DOMAIN SETUP LOGIC
function extractMainDomainFromDeck(deckArr) {
  const idx = deckArr.findIndex(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.category === "domain" && card.type === "maindomain";
  });
  if (idx !== -1) {
    return deckArr.splice(idx, 1)[0];
  }
  return null;
}

if (gameState.playerMainDomain && gameState.playerMainDomain.currentHP <= 0) {
  showEndGameAnimation("Defeat", "#e25555");
  // Optionally: disable further actions, or trigger a reset
}
if (gameState.opponentMainDomain && gameState.opponentMainDomain.currentHP <= 0) {
  showEndGameAnimation("Victory", "#ffe066");
  // Optionally: disable further actions, or trigger a reset
}
function showMainDomainSelectionModal(deckArr, onSelected) {
  closeAllModals();
  let modal = document.getElementById('maindomain-select-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'maindomain-select-modal';
    modal.className = 'modal';
    const content = document.createElement('div');
    content.className = 'modal-content';
    modal.appendChild(content);
    document.body.appendChild(modal);
  }
    modal.style.background = "rgba(20,30,40,0.92)";
  const content = modal.querySelector('.modal-content');
  content.innerHTML = "<h3>Select Your Main Domain</h3>";

  // Filter main domains
  const mainDomains = deckArr.filter(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.category === "domain" && card.type === "maindomain";
  });
  if (!mainDomains.length) {
    content.innerHTML += "<div style='color:#e25555;'>No Main Domains found!</div>";
    return;
  }
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '20px';

  mainDomains.forEach(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    const cardDiv = document.createElement('div');
    cardDiv.style.cursor = 'pointer';
    cardDiv.style.border = '3px solid #ffe066';
    cardDiv.style.borderRadius = '10px';
    cardDiv.style.background = '#232a3c';
    cardDiv.style.padding = '10px';
    cardDiv.style.textAlign = 'center';
    cardDiv.innerHTML = `
      <img src="${cardData.image}" alt="${cardData.name}" style="width:90px;display:block;margin-bottom:6px;">
    `;
    cardDiv.onclick = () => {
      modal.style.display = 'none';
      onSelected(cardObj);
    };
    row.appendChild(cardDiv);
  });

  content.appendChild(row);

  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };
  modal.style.display = 'flex';
}
                                                // CHAMPION SELECTION //
function showChampionSelectionModal(deckArr, onSelected) {
  closeAllModals();
  let modal = document.getElementById('champion-select-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'champion-select-modal';
    modal.className = 'modal';
    const content = document.createElement('div');
    content.className = 'modal-content';
    modal.appendChild(content);
    document.body.appendChild(modal);
  }
    modal.style.background = "rgba(20,30,40,0.92)";
  const content = modal.querySelector('.modal-content');
  content.innerHTML = "<h3>Select Your Champion</h3>";
  const champions = getChampionsFromDeck(deckArr);
  if (!champions.length) {
    content.innerHTML += "<div style='color:#e25555;'>No champions found!</div>";
    return;
  }
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '20px';

  champions.forEach(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    const cardDiv = document.createElement('div');
    cardDiv.style.cursor = 'pointer';
    cardDiv.style.border = '3px solid #ffe066';
    cardDiv.style.borderRadius = '10px';
    cardDiv.style.background = '#232a3c';
    cardDiv.style.padding = '10px';
    cardDiv.style.textAlign = 'center';
    cardDiv.innerHTML = `
      <img src="${cardData.image}" alt="${cardData.name}" style="width:90px;display:block;margin-bottom:6px;">
    `;
    cardDiv.onclick = () => {
      modal.style.display = 'none';
      onSelected(cardObj);
    };
    row.appendChild(cardDiv);
  });

  content.appendChild(row);

  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };
  modal.style.display = 'flex';
}
function selectChampionFromDeck(deckArr, onSelected) {
  const champions = deckArr.filter(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.trait === "champion";
  });
  if (champions.length === 1) {
    onSelected(champions[0]);
    return;
  }
  // Show modal: display champions, let player click one to select
  // On click: onSelected(selectedChampion)
}
function getChampionsFromDeck(deckArr) {
  return deckArr.filter(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.trait === "champion";
  });
}

function placeChampionOnField(championCardObj) {
  // Remove from deck
  const idx = gameState.playerDeck.findIndex(c => c.instanceId === championCardObj.instanceId);
  if (idx !== -1) gameState.playerDeck.splice(idx, 1);
  // Place on field (creatures array)
  gameState.playerCreatures.unshift(championCardObj);
}
function initiateMainDomainAndChampionSelection(deckArr, afterSelection) {
  // Main Domain
  const mainDomains = deckArr.filter(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.category === "domain" && card.type === "maindomain";
  });
  function afterMainDomain(mainDomain) {
    if (mainDomain) {
      mainDomain.currentHP = getBaseHp(mainDomain.cardId);
      gameState.playerMainDomain = mainDomain;
      // Remove from deck if you want to, or keep as-is (unshift if not present)
      gameState.playerDomains.unshift(mainDomain);
      // Remove from deckArr so it's not drawn again
      const idx = deckArr.findIndex(c => c.instanceId === mainDomain.instanceId);
      if (idx !== -1) deckArr.splice(idx, 1);
    }

    // Champion selection
    const champions = getChampionsFromDeck(deckArr);
    if (champions.length >= 1) {
      showChampionSelectionModal(deckArr, chosenChampion => {
        placeChampionOnField(chosenChampion);
        if (afterSelection) afterSelection();
      });
    } else {
      if (afterSelection) afterSelection();
    }
  }

  if (mainDomains.length >= 1) {
    showMainDomainSelectionModal(deckArr, afterMainDomain);
  } else {
    afterMainDomain(null);
  }
}

// ESSENCE GENERATION
function generateEssenceForCard(cardObj) {
  // Find the card definition in dummyCards
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef) return;
  if (cardDef.essence) {
    for (const type in cardDef.essence) {
      addEssence(cardObj, type, cardDef.essence[type]);
    }
  }
}
function doEssencePhase(playerOrOpponent) {
  // Get the correct arrays
  const domains = playerOrOpponent === "player" ? gameState.playerDomains : gameState.opponentDomains;
  const creatures = playerOrOpponent === "player" ? gameState.playerCreatures : gameState.opponentCreatures;
  // Optionally filter for Champions only
  const champions = creatures.filter(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.trait === "champion";
  });

  // Domains
  domains.forEach(generateEssenceForCard);
  // Champions
  champions.forEach(generateEssenceForCard);

  // Optionally: show animation/notification
  renderGameState();
}
function animateEssencePop(icon) {
  icon.classList.add('essence-pop');
  icon.addEventListener('animationend', () => {
    icon.classList.remove('essence-pop');
  }, { once: true });
}
// ESSENCE CONSUPTION LOGIC
function showEssencePaymentModal(opts) {
  closeAllModals();
  // Setup modal base
  let modal = document.getElementById('essence-payment-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'essence-payment-modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }
  modal.innerHTML = '';
  modal.style.display = 'flex';
  modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };

  // Modal content
  const content = document.createElement('div');
  content.className = 'modal-content';
  content.onclick = e => e.stopPropagation();
  modal.appendChild(content);

  // Header: Show card/ability being played/activated
  const card = opts.card;
  const cardData = card || {};
  const img = document.createElement('img');
  img.src = cardData.image || '';
  img.alt = cardData.name || '';
  img.style.width = '100px';
  img.style.borderRadius = '8px';
  img.style.marginRight = '12px';

  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.marginBottom = '10px';
  header.innerHTML = `<div style="font-size:1.2em;font-weight:bold;">Essence Cost</div>`;
  if (cardData.image) header.prepend(img);
  content.appendChild(header);

  // Requirement display
  const reqDiv = document.createElement('div');
  reqDiv.className = 'essence-requirements';
  reqDiv.style.marginBottom = '8px';

  // Convert opts.cost to array of {color, needed, paid}
  let requirements = [];
  if (typeof opts.cost === "number" && opts.cost === 0) {
    // No requirement
    requirements = [];
  } else if (typeof opts.cost === "object" && opts.cost !== null) {
    for (const color in opts.cost) {
      requirements.push({color, needed: opts.cost[color], paid: 0});
    }
  }

  // Payment state trackers
  let reqPaid = {};
  requirements.forEach(r => { reqPaid[r.color] = 0; });

  // Initial requirements display
  updateReqDiv(requirements, reqPaid, reqDiv);
  content.appendChild(reqDiv);

  // Payment assignment state (array of {cardObj, color, essenceIdx})
  let paymentPlan = [];

  // Helper to check if requirement is full
  function isPaidFull() {
    for (const r of requirements) {
      if ((reqPaid[r.color] || 0) < r.needed) return false;
    }
    return true;
  }

  // Show eligible sources and their Essence
  const sourcesDiv = document.createElement('div');
  sourcesDiv.className = 'essence-source-list';
  sourcesDiv.style.display = 'flex';
  sourcesDiv.style.flexWrap = 'wrap';
  sourcesDiv.style.gap = '18px';
  sourcesDiv.style.margin = '10px 0 18px 0';

  // List of {cardObj, color, idx (the nth essence of that color on this card)}
  let selectableEssenceUnits = [];
  opts.eligibleCards.forEach(sourceCard => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'essence-source-card';
    cardDiv.style.minWidth = '90px';
    cardDiv.style.background = '#20283e';
    cardDiv.style.border = '2px solid #333';
    cardDiv.style.padding = '7px';
    cardDiv.style.borderRadius = '9px';
    cardDiv.style.position = 'relative';

    // Card name/img
    const smallImg = document.createElement('img');
    smallImg.src = (dummyCards.find(c=>c.id===sourceCard.cardId)||{}).image || '';
    smallImg.style.width = '34px';
    smallImg.style.borderRadius = '4px';
    smallImg.style.marginBottom = '6px';
    cardDiv.appendChild(smallImg);

    const nameDiv = document.createElement('div');
    nameDiv.textContent = (dummyCards.find(c=>c.id===sourceCard.cardId)||{}).name || '';
    nameDiv.style.fontSize = '0.95em';
    nameDiv.style.marginBottom = '4px';
    cardDiv.appendChild(nameDiv);

    // Essence icons
    const essenceWrap = document.createElement('div');
    essenceWrap.style.display = 'flex';
    essenceWrap.style.flexWrap = 'wrap';
    essenceWrap.style.gap = '5px';
    for (const type in ESSENCE_IMAGE_MAP) {
      let amt = (sourceCard.essence && sourceCard.essence[type]) || 0;
      for (let i = 0; i < amt; i++) {
        const icon = document.createElement('img');
        icon.src = ESSENCE_IMAGE_MAP[type];
        icon.className = 'essence-img';
        icon.style.width = '22px';
        icon.style.borderRadius = '50%';
        icon.style.cursor = "pointer";
        icon.style.border = '2px solid #aaa';
        icon.style.background = '#222';
        icon.style.margin = '1px';
        icon.title = type.charAt(0).toUpperCase()+type.slice(1) + " Essence (click to select)";

        let assigned = false;
        icon.onclick = function() {
          // Only assign if there is a remaining unpaid requirement of this type or colorless
          // Priority: assign to color-specific if needed, else colorless
          let assignColor = null;
          if ((reqPaid[type] || 0) < (opts.cost[type] || 0)) {
            assignColor = type;
          } else if (type !== "colorless" && (opts.cost.colorless && (reqPaid.colorless || 0) < opts.cost.colorless)) {
            assignColor = "colorless";
          }
          if (!assignColor || assigned) return;

          reqPaid[assignColor]++;
          paymentPlan.push({cardObj: sourceCard, color: type, essenceIdx: i});
          assigned = true;
          icon.style.opacity = '0.4';
          icon.style.border = '2.5px solid #ffe066';

          updateReqDiv(requirements, reqPaid, reqDiv);
          updateConfirmBtn();
        };
        selectableEssenceUnits.push({icon, cardObj: sourceCard, color: type, idx: i, assigned: ()=>assigned});
        essenceWrap.appendChild(icon);
      }
    }
    cardDiv.appendChild(essenceWrap);
    sourcesDiv.appendChild(cardDiv);
  });
  content.appendChild(sourcesDiv);

  // Confirm button
  const confirmBtn = document.createElement('button');
  confirmBtn.type = 'button';
  confirmBtn.className = 'btn-primary';
  confirmBtn.textContent = 'Confirm';
  confirmBtn.disabled = true;
  confirmBtn.style.marginTop = '12px';
  confirmBtn.onclick = function() {
    // Actually deduct the paid Essence
    for (const pay of paymentPlan) {
      if (!pay.cardObj.essence) continue;
      if (!pay.cardObj.essence[pay.color] || pay.cardObj.essence[pay.color] <= 0) continue;
      pay.cardObj.essence[pay.color]--;
    }
    modal.style.display = 'none';
    if (opts.onPaid) opts.onPaid(paymentPlan);
  };
  content.appendChild(confirmBtn);

  function updateConfirmBtn() {
    confirmBtn.disabled = !isPaidFull();
  }

  // Cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'btn-negative-secondary';
  cancelBtn.style.marginLeft = '8px';
  cancelBtn.onclick = function() {
    modal.style.display = 'none';
  };
  content.appendChild(cancelBtn);
}
  // Requirement "progress" update
function updateReqDiv(requirements, reqPaid, reqDiv) {
  // requirements: array of {color, needed, paid}
  // reqPaid: {color: number}
  reqDiv.innerHTML = `<b>Essence Required:</b> ${
    requirements.map(r => {
      const imgSrc = ESSENCE_IMAGE_MAP[r.color] || ESSENCE_IMAGE_MAP.colorless;
      // For each required essence, display one icon per required unit
      let icons = "";
      for (let i = 0; i < r.needed; i++) {
        // If this unit is paid, show full color, else gray
        const isPaid = i < (reqPaid[r.color] || 0);
        icons += `<img src="${imgSrc}" 
          style="width:24px;height:24px;vertical-align:middle;margin-right:2px;
          filter:${isPaid ? "none" : "grayscale(0.7) brightness(1.1)"};
          opacity:${isPaid ? "1" : "0.7"};
          transition:filter 0.2s,opacity 0.2s;">`;
      }
      return `<span style="margin-right:12px;display:inline-flex;align-items:center;">${icons}</span>`;
    }).join('')
  }`;
}
  
function getAllEssenceSources() {
  return [...gameState.playerDomains, ...gameState.playerCreatures /* add more if needed */];
}

// ATTACK LOGIC
function startAttackTargeting(attackerId, attackerZone, cardDiv) {
  attackMode.attackerId = attackerId;
  attackMode.attackerZone = attackerZone;

  // 1. Highlight all valid targets (e.g., opponent creatures)
  const targets = gameState.opponentCreatures;
  targets.forEach(cardObj => {
    const targetDiv = findCardDivInZone('opponent-creatures-zone', cardObj.instanceId);
    if (targetDiv) {
      targetDiv.classList.add('attack-target-highlight');
      targetDiv.onclick = function(e) {
        e.stopPropagation();
        resolveAttack(attackerId, cardObj.instanceId);
        endAttackTargeting();
      };
    }
  });

  // 2. Add a cancel handler (clicking elsewhere cancels)
  attackMode.cancelHandler = function(e) {
    endAttackTargeting();
  };
  setTimeout(() => document.body.addEventListener('click', attackMode.cancelHandler, { once: true }), 10);
}
function endAttackTargeting() {
  // Remove highlights and listeners
  gameState.opponentCreatures.forEach(cardObj => {
    const targetDiv = findCardDivInZone('opponent-creatures-zone', cardObj.instanceId);
    if (targetDiv) {
      targetDiv.classList.remove('attack-target-highlight');
      targetDiv.onclick = null; // Remove attack targeting handler
    }
  });
  if (attackMode.cancelHandler) {
    document.body.removeEventListener('click', attackMode.cancelHandler);
    attackMode.cancelHandler = null;
  }
  attackMode.attackerId = null;
  attackMode.attackerZone = null;
}
function resolveAttack(attackerId, defenderId) {
  // Find attacker and defender card objects and their arrays
  let attacker, defender, attackerArr, defenderArr, attackerVoid, defenderVoid;
  // Figure out who is the attacker (player or opponent)
  attacker = gameState.playerCreatures.find(c => c.instanceId === attackerId);
  defender = gameState.opponentCreatures.find(c => c.instanceId === defenderId);
  attackerArr = gameState.playerCreatures;
  defenderArr = gameState.opponentCreatures;
  attackerVoid = gameState.playerVoid;
  defenderVoid = gameState.opponentVoid;

  // If not found, try the reverse (opponent attacks player)
  if (!attacker || !defender) {
    attacker = gameState.opponentCreatures.find(c => c.instanceId === attackerId);
    defender = gameState.playerCreatures.find(c => c.instanceId === defenderId);
    attackerArr = gameState.opponentCreatures;
    defenderArr = gameState.playerCreatures;
    attackerVoid = gameState.opponentVoid;
    defenderVoid = gameState.playerVoid;
  }
  if (!attacker || !defender) return;

  // Only allow if not already attacked this turn and during Action Phase
  if (attacker.hasAttacked || gameState.phase !== "action" || gameState.turn !== getCardOwner(attacker)) return;

  // Attack logic
  if (defender.orientation === "horizontal") {
    // Both deal ATK to each other (Armor first, then HP)
    dealCombatDamage(attacker, defender, attacker.atk);
    dealCombatDamage(defender, attacker, defender.atk);
  } else if (defender.orientation === "vertical") {
    // Attacker's ATK - defender's DEF (if >0, deal this much to defender)
    let damage = Math.max(0, attacker.atk - defender.def);
    dealCombatDamage(attacker, defender, damage);
    // Defender does not deal damage back
  }

  attacker.hasAttacked = true;

  // Check for deaths (destroyed = HP <= 0)
  if (attacker.currentHP <= 0) moveCard(attacker.instanceId, attackerArr, attackerVoid);
  if (defender.currentHP <= 0) moveCard(defender.instanceId, defenderArr, defenderVoid);

  renderGameState();
  setupDropZones();
}
// --- Damage Helper: Deals armor/HP damage ---
function dealCombatDamage(source, target, amount) {
  if (!target) return;
  if (target.armor && target.armor > 0) {
    let armorAbsorb = Math.min(target.armor, amount);
    target.armor -= armorAbsorb;
    amount -= armorAbsorb;
  }
  if (amount > 0) {
    target.currentHP = (typeof target.currentHP === "number" ? target.currentHP : getBaseHp(target.cardId)) - amount;
  }
}
// --- Utility: Determine card owner as "player" or "opponent" ---
function getCardOwner(cardObj) {
  if (gameState.playerCreatures.includes(cardObj) || gameState.playerDomains.includes(cardObj)) return "player";
  if (gameState.opponentCreatures.includes(cardObj) || gameState.opponentDomains.includes(cardObj)) return "opponent";
  return null;
}

// --- Reset hasAttacked for all creatures at start of player's/opponent's action phase ---
function resetAttackFlags(turn) {
  const arr = turn === "player" ? gameState.playerCreatures : gameState.opponentCreatures;
  arr.forEach(creature => { creature.hasAttacked = false; });
}


// --- Attacking UI: Highlight available targets ---
// In startAttackTargeting, you should already have logic similar to:
function startAttackTargeting(attackerId, attackerZone, cardDiv) {
  attackMode.attackerId = attackerId;
  attackMode.attackerZone = attackerZone;

  // 1. Highlight all valid targets (e.g., opponent creatures)
  const targets = gameState.opponentCreatures;
  targets.forEach(cardObj => {
    const targetDiv = findCardDivInZone('opponent-creatures-zone', cardObj.instanceId);
    if (targetDiv) {
      targetDiv.classList.add('attack-target-highlight'); // Add CSS for highlight
      // Optional: darken background for all but highlighted cards
      document.getElementById('battlefield').classList.add('attack-mode-backdrop'); // Add CSS overlay for modal/dark effect
      targetDiv.onclick = function(e) {
        e.stopPropagation();
        resolveAttack(attackerId, cardObj.instanceId);
        endAttackTargeting();
        document.getElementById('battlefield').classList.remove('attack-mode-backdrop');
      };
    }
  });

  // 2. Add a cancel handler (clicking elsewhere cancels)
  attackMode.cancelHandler = function(e) {
    endAttackTargeting();
    document.getElementById('battlefield').classList.remove('attack-mode-backdrop');
  };
  setTimeout(() => document.body.addEventListener('click', attackMode.cancelHandler, { once: true }), 10);
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
    deck: window.getCurrentDeck(),
    deckName: window.getActiveDeckId(),
    bannerArt: window.getCurrentDeck().bannerArt,
    highlightArt: window.getCurrentDeck().highlightArt,
    cardbackArt: window.getCurrentDeck().cardbackArt
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
  showCasualSearchingModal();
  startCasualMatchmaking();
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
// Helper to render the deck tile in the mode select screen
function renderModePlayerDeckTile() {
  const slotDiv = document.getElementById('mode-player-deck-tile');
  if (!slotDiv) return;
  slotDiv.innerHTML = '';
  let deckName = window.getActiveDeckId ? window.getActiveDeckId() : '';
  let deck = window.decks && deckName ? window.decks[deckName] : null;
  if (!deck) {
    slotDiv.textContent = 'No Deck Selected';
    slotDiv.classList.add('empty');
    return;
  }
  slotDiv.classList.remove('empty');
  // Show banner/highlight/cardback
  let image = deck.highlightArt || deck.bannerArt || "CardImages/Banners/DefaultBanner.png";
  slotDiv.innerHTML = `
    <img class="deck-slot-highlight-img" src="${image}" alt="highlight" />
    <div class="deck-slot-title-overlay">${deckName}</div>
    <img class="deck-slot-cardback-img" src="${deck.cardbackArt || "OtherImages/Cardbacks/DefaultCardback.png"}" alt="Cardback" style="position:absolute;top:8px;right:8px;width:32px;height:44px;border-radius:6px;box-shadow:0 1px 5px #0005;">
  `;
}

// Always show deck management menu on click (reuse builder.js logic)
document.getElementById('mode-player-deck-tile').onclick = function () {
  let deckName = window.getActiveDeckId ? window.getActiveDeckId() : '';
  if (window.showDeckTileMenu && deckName) window.showDeckTileMenu(deckName);
};
// Button: open deck selection modal
document.getElementById('mode-player-deck-btn').onclick = function () {
  if (window.showPlayerDeckModal)
    window.showPlayerDeckModal();
};
// Re-render when needed (after deck changes)
if (window.renderDeckSelection) {
  const origRender = window.renderDeckSelection;
  window.renderDeckSelection = function() {
    origRender.apply(this, arguments);
    renderModePlayerDeckTile();
  };
}
document.addEventListener('DOMContentLoaded', renderModePlayerDeckTile);


function enterBattlefield() {
  // Hide the menu header, show the in-game header
  document.getElementById('gameplay-header').style.display = 'none';
  document.getElementById('battlefield-header').style.display = 'flex';
  // ...rest of your enter logic...
}

function exitBattlefieldToMenu() {
  // Show the menu header, hide the in-game header
  document.getElementById('battlefield-header').style.display = 'none';
  document.getElementById('gameplay-header').style.display = 'flex';
  // ...rest of your exit logic...
  // e.g., show mode select or gameplay lobby
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('battlefield-header').style.display = 'none';
  document.getElementById('gameplay-header').style.display = 'flex';
});
// Gameplay (menu) header
document.getElementById('gameplay-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('gameplay-back-btn').onclick = function() {
  document.getElementById('gameplay-section').classList.remove('active');
  document.getElementById('home-section').classList.add('active');
};

// Battlefield (in-game) header
document.getElementById('battlefield-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('battlefield-back-btn').onclick = function() {
  if (confirm("Leave the game and return to menu?")) {
    // Hide the gameplay/battlefield section
    document.getElementById('gameplay-section').classList.remove('active');
    document.getElementById('battlefield-header').style.display = 'none';

    // Show the mode select screen
    document.getElementById('mode-select-section').classList.add('active');
    document.getElementById('gameplay-header').style.display = 'flex';

    // Optionally reset any battlefield/game state here
    // Optionally call exitBattlefieldToMenu() if you have extra logic there
    if (typeof exitBattlefieldToMenu === "function") exitBattlefieldToMenu();
  }
};
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
// Make available globally if called from client.js:
window.setupBattlefieldGame = setupBattlefieldGame;
window.handleOpponentAction = handleOpponentAction;
if (window.socket) {
  window.socket.on('casual-match-found', function(matchData) {
    document.getElementById('casual-searching-modal').style.display = 'none';
    if (typeof startCasualGame === "function") startCasualGame(matchData);
  });
} else {
  console.error("Socket.io not initialized!");
}
