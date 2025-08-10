// ========================== 
// === GAMEPLAY LOGIC ===
// ==========================

// ==========================
// === CONSTANTS & STATE ===
// ==========================
// Map phase keys to your custom names
const PHASE_DISPLAY_NAMES = {draw: "Draw Phase", essence: "Essence Phase", action: "Action Phase", end: "End Phase"};
const PHASE_CLASS = {draw: 'phase-draw', essence: 'phase-essence', action: 'phase-action', end: 'phase-end'};
const PHASES = [{ turn: 'player', phase: 'draw' },{ turn: 'player', phase: 'essence' },{ turn: 'player', phase: 'action' },{ turn: 'player', phase: 'end' },
  { turn: 'opponent', phase: 'draw' },{ turn: 'opponent', phase: 'essence' },{ turn: 'opponent', phase: 'action' },{ turn: 'opponent', phase: 'end' }];
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

let attackMode = {attackerId: null, attackerZone: null, cancelHandler: null};

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
function setupBattlefieldUI({ isCpuGame = false, myDeckObj, opponentDeckObj, myProfile, opponentProfile }) {
  // Section activation
  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');

  // Battlefield backgrounds
  const myBanner = myDeckObj?.bannerArt || "CardImages/Banners/DefaultBanner.png";
  const oppBanner = opponentDeckObj?.bannerArt || "CardImages/Banners/DefaultBanner.png";
  setBattlefieldBackgrounds(myBanner, oppBanner);

  // Profiles
  document.getElementById('my-profile').style.display = '';
  renderProfile('my-profile', myProfile);
  document.getElementById('opponent-profile').style.display = '';
  renderProfile('opponent-profile', opponentProfile);

  // Chat input
  const chatUI = document.getElementById('chat-ui');
  if (chatUI) chatUI.style.display = '';
  const chatInputRow = document.getElementById('chat-input-row');
  if (chatInputRow) {
    chatInputRow.style.display = isCpuGame ? 'none' : '';
  }
  // Always show log
  const chatLog = document.getElementById('chat-log');
  if (chatLog) chatLog.style.display = '';

  // Battlefield and zones
  renderGameState();
  setupDropZones();
  updatePhase();
}

function startSoloGame() {
  if (!window.selectedPlayerDeck) {
    showToast("No deck has been chosen");
    return;
  }
  // Make sure selectedPlayerDeck and selectedCpuDeck are set
  const playerDeckObj = window.selectedPlayerDeck?.deckObj || window.selectedPlayerDeck;
  const cpuDeckObj = window.selectedCpuDeck;

  // Fallback for player deck: use currentDeckSlot if nothing is selected
  let playerDeckArray;
  if (playerDeckObj) {
    playerDeckArray = window.buildDeck(playerDeckObj);
  } else if (window.getCurrentDeck) {
    playerDeckArray = window.buildDeck(window.getCurrentDeck());
  } else {
    playerDeckArray = [];
  }

  // Fallback for CPU deck
  let cpuDeckArray = cpuDeckObj ? buildCpuDeck(cpuDeckObj) : [];

  // Banners
  const playerBanner = playerDeckObj?.bannerArt || "CardImages/Banners/DefaultBanner.png";
  const cpuBanner = cpuDeckObj?.bannerArt || "CardImages/Banners/DefaultBanner.png";
  setBattlefieldBackgrounds(playerBanner, cpuBanner);

  // UI transition
  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');

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

  // --- RENDER PROFILES ---
  document.getElementById('my-profile').style.display = '';
  renderProfile('my-profile', getMyProfileInfo());

  // CPU profile rendering (add these lines)
  document.getElementById('opponent-profile').style.display = '';
  renderProfile('opponent-profile', getCpuProfile(selectedCpuDeck));

  // Render and set up the game as normal
  renderGameState();
  setupDropZones();
  updatePhase();
  setupBattlefieldUI({
    isCpuGame: true,
    myDeckObj: playerDeckObj,
    opponentDeckObj: cpuDeckObj,
    myProfile: getMyProfileInfo(),
    opponentProfile: getCpuProfile(cpuDeckObj)
  });
  showGameStartAnimation(() => {
    showCoinFlipModal(function(whoStarts) {
      gameState.turn = whoStarts;
      gameState.phase = "draw";
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
  
  if (gameState.playerHand.length === 0) {
    for (let i = 0; i < 5; i++) {
      if (gameState.playerDeck.length > 0)
        gameState.playerHand.push(gameState.playerDeck.shift());
    }
  }
  if (gameState.opponentHand.length === 0) {
    for (let i = 0; i < 5; i++) {
      if (gameState.opponentDeck.length > 0)
        gameState.opponentHand.push(gameState.opponentDeck.shift());
    }
  }
  document.getElementById('my-profile').style.display = '';
  renderProfile('my-profile', getMyProfileInfo());
  // Show "Game Start" animation, then domain/champion selection, then draw hand
  showGameStartAnimation(() => {
    showCoinFlipModal(function(whoStarts) {
      gameState.turn = whoStarts;
      gameState.phase = "draw";
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
// Always log movement, regardless of zone:
const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
appendVisualLog({
  sourceCard: { image: cardDef?.image, name: cardDef?.name, cardId: cardDef?.id },
  action: "move",
  dest: getZoneNameForArray(toArr) === 'playerVoid' ? "Void"
       : getZoneNameForArray(toArr) === 'playerHand' ? "Hand"
       : getZoneNameForArray(toArr) === 'playerDeck' ? "Deck"
       : getZoneNameForArray(toArr) === 'playerDomains' ? "Domains"
       : getZoneNameForArray(toArr) === 'playerCreatures' ? "Creatures"
       : getZoneNameForArray(toArr) === 'opponentVoid' ? "Void"
       : getZoneNameForArray(toArr) === 'opponentHand' ? "Hand"
       : getZoneNameForArray(toArr) === 'opponentDeck' ? "Deck"
       : getZoneNameForArray(toArr) === 'opponentDomains' ? "Domains"
       : getZoneNameForArray(toArr) === 'opponentCreatures' ? "Creatures"
       : getZoneNameForArray(toArr),
  who: (fromArr === gameState.playerHand || fromArr === gameState.playerDeck ||
        fromArr === gameState.playerDomains || fromArr === gameState.playerCreatures) ? "player" : "opponent"
});
    fromArr.splice(idx, 1);
    toArr.push(cardObj);
  }
  setupDropZones();
  if (fromArr === gameState.playerHand || fromArr === gameState.playerDeck ||
      toArr === gameState.playerCreatures || toArr === gameState.playerDomains ||
      toArr === gameState.playerVoid) {
  }
  emitPublicState();
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
function setBattlefieldBackgrounds(playerBannerUrl, opponentBannerUrl) {
  const playerBg = document.getElementById('battlefield-player-bg');
  const opponentBg = document.getElementById('battlefield-opponent-bg');
  if (playerBg && playerBannerUrl) {
    playerBg.style.backgroundImage = `url('${playerBannerUrl}')`;
    playerBg.style.backgroundSize = "cover";
    playerBg.style.backgroundPosition = "center";
    playerBg.style.backgroundRepeat = "no-repeat";
  }
  if (opponentBg && opponentBannerUrl) {
    opponentBg.style.backgroundImage = `url('${opponentBannerUrl}')`;
    opponentBg.style.backgroundSize = "cover";
    opponentBg.style.backgroundPosition = "center";
    opponentBg.style.backgroundRepeat = "no-repeat";
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
  emitPublicState();
}

function drawCards(who, n) {
  let deck = who === "player" ? gameState.playerDeck : gameState.opponentDeck;
  let hand = who === "player" ? gameState.playerHand : gameState.opponentHand;
  for (let i = 0; i < n && deck.length > 0; i++) {
    hand.push(deck.shift());
  }
  renderGameState();
  setupDropZones();
  emitPublicState();
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

  // Update deck/void counters
  renderDeckVoidCountRow('opponent-count-row', gameState.opponentDeck.length, gameState.opponentVoid.length);
  renderDeckVoidCountRow('player-count-row', gameState.playerDeck.length, gameState.playerVoid.length);

  // Append in desired order
  rightbar.appendChild(document.getElementById('opponent-count-row'));
  rightbar.appendChild(oppDeckDiv);
  rightbar.appendChild(oppVoidDiv);
  rightbar.appendChild(phaseBadge);
  rightbar.appendChild(playerVoidDiv);
  rightbar.appendChild(playerDeckDiv);
  rightbar.appendChild(document.getElementById('player-count-row'));
}
// Helper to create and append the deck zone card at the end
function appendDeckZone(parentDiv, deckArray, who) {
  const deckZone = document.createElement('div');
  deckZone.className = 'deck-zone';

  const deckCard = document.createElement('div');
  deckCard.className = 'card-deck';

  let deckCardback = "OtherImages/Cardbacks/DefaultCardback.png";
  if (who === "player") {
    if (window.selectedPlayerDeck && window.selectedPlayerDeck.cardbackArt) {
      deckCardback = window.selectedPlayerDeck.cardbackArt;
    }
    // Fallback: Try gameState.playerProfile.cardbackArt if available
    else if (gameState.playerProfile && gameState.playerProfile.cardbackArt) {
      deckCardback = gameState.playerProfile.cardbackArt;
    }
    // Fallback: Try gameState.playerDeck.cardbackArt if available
    else if (gameState.playerDeck && gameState.playerDeck.cardbackArt) {
      deckCardback = gameState.playerDeck.cardbackArt;
    }
  } else if (who === "opponent") {
    // Multiplayer/casual
    if (window.selectedOpponentDeck && window.selectedOpponentDeck.cardbackArt) {
      deckCardback = window.selectedOpponentDeck.cardbackArt;
    }
    // Fallback: Opponent profile
    else if (gameState.opponentProfile && gameState.opponentProfile.cardbackArt) {
      deckCardback = gameState.opponentProfile.cardbackArt;
    }
    // Fallback: Opponent deck object
    else if (gameState.opponentDeck && gameState.opponentDeck.cardbackArt) {
      deckCardback = gameState.opponentDeck.cardbackArt;
    }
    // Solo CPU
    else if (window.selectedCpuDeck && window.selectedCpuDeck.cardbackArt) {
      deckCardback = window.selectedCpuDeck.cardbackArt;
    }
  }
  const img = document.createElement('img');
  img.src = deckCardback;
  img.alt = (who === "player" ? "Your Deck" : "Opponent's Deck");
  img.style.width = "100%";
  deckCard.appendChild(img);

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
      img.style.width = "80px";
      voidCard.appendChild(img);
    }
  }

  voidZone.appendChild(voidCard);

  voidCard.onclick = (e) => {
    e.stopPropagation();
    closeAllMenus();
    openVoidModal();
  };

  parentDiv.appendChild(voidZone);
}
function renderDeckVoidCountRow(rowId, deckCount, voidCount) {
  const row = document.getElementById(rowId);
  if (!row) return;
  row.innerHTML = `
    <span style="display:inline-flex;align-items:center;gap:4px;">
      <img src="OtherImages/Icons/DefaultDeckBox.png" alt="Deck" style="width:30px;height:30px;">
      <span class="deck-count-number">${deckCount}</span>
      <img src="OtherImages/Icons/Void.png" alt="Void" style="width:30px;height:30px;margin-left:10px;">
      <span class="deck-count-number">${voidCount}</span>
    </span>
  `;
}
// REMOVE STAT CHANGES
function cleanCard(cardObj) {
  const cleaned = { ...cardObj };
  delete cleaned.currentHP;
  delete cleaned.orientation;
  return cleaned;
}

// OPEN DECK MODAL
function openDeckModal() {
  const modal = document.getElementById('deck-modal');
  // Always attach the close-on-backdrop handler
  modal.onclick = function(e) {if (e.target === modal) modal.style.display = 'none';};
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
  // Create the main card div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';
  cardDiv.dataset.instanceId = cardObj.instanceId;
  cardDiv.style.position = 'relative';
  // CURRENT HP
  if (typeof cardObj.currentHP !== "number") {
    cardObj.currentHP = getBaseHp(cardObj.cardId);
  }
  const baseHP = getBaseHp(cardObj.cardId);
  const currentHP = cardObj.currentHP;
  const hpPercent = Math.max(0, Math.min(1, currentHP / baseHP));
  const baseATK = typeof cardObj.atk === "number" ? cardObj.atk : (dummyCards.find(c => c.id === cardObj.cardId)?.atk || 0);
  const baseDEF = typeof cardObj.def === "number" ? cardObj.def : (dummyCards.find(c => c.id === cardObj.cardId)?.def || 0);

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
  
  // ATK & DEF BADGES
// --- COMBINED ATK/DEF BADGE ---
const statBadgeRow = document.createElement('div');
statBadgeRow.className = 'stat-badge-row';
statBadgeRow.style.position = 'absolute';
statBadgeRow.style.bottom = '8px';
statBadgeRow.style.display = 'flex';
statBadgeRow.style.zIndex = 9;

// ATK
const atkBadge = document.createElement('span');
atkBadge.className = 'atk-badge';
atkBadge.style.display = 'inline-flex';
atkBadge.style.alignItems = 'center';
atkBadge.style.background = "rgba(34,18,18,0.82)";
atkBadge.style.padding = "2px 8px";
atkBadge.style.borderRadius = "9px";
atkBadge.innerHTML = `
  <img src="OtherImages/Icons/ATK.png" alt="ATK">
  <span style="font-weight:bold;color:#e25555;">${baseATK}</span>
`;

// DEF
const defBadge = document.createElement('span');
defBadge.className = 'def-badge';
defBadge.style.display = 'inline-flex';
defBadge.style.alignItems = 'center';
defBadge.style.background = "rgba(18,26,34,0.82)";
defBadge.style.padding = "2px 8px";
defBadge.style.borderRadius = "9px";
defBadge.innerHTML = `
  <img src="OtherImages/Icons/DEF.png" alt="DEF">
  <span style="font-weight:bold;color:#3af0ff;">${baseDEF}</span>
`;

statBadgeRow.appendChild(atkBadge);
statBadgeRow.appendChild(defBadge);

cardDiv.appendChild(statBadgeRow);
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
        attDiv.appendChild(menu);

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
              appendPositionChangeLog(c, c.orientation);
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
function getCurrentViewTurn() {
  // If multiplayer, compare gameState.turn and your player identity
  // For this example, assume you are always "player" and opponent is "opponent"
  // If it's "player", show "Your turn". If "opponent", show "Opponent's turn"
  return gameState.turn === "player" ? "Your turn" : "Opponent's turn";
}
function updatePhase() {
  const phaseBadge = document.getElementById('phase-badge');
  const phaseNameSpan = document.getElementById('phase-name');
  const nextPhaseBtn = document.getElementById('next-phase-btn');
  phaseBadge.classList.remove('opponent-turn', 'player-turn');
  phaseBadge.classList.add(gameState.turn === 'opponent' ? 'opponent-turn' : 'player-turn');
  if (phasePlayerSpan) phasePlayerSpan.textContent = getCurrentViewTurn();
  // Display the current phase on the button
  if (nextPhaseBtn) {
    nextPhaseBtn.textContent = PHASE_DISPLAY_NAMES[gameState.phase] || gameState.phase;
  }  
  if (phaseNameSpan) {
    phaseNameSpan.className = PHASE_CLASS[gameState.phase];
    phaseNameSpan.textContent = PHASE_DISPLAY_NAMES[gameState.phase] || gameState.phase;
  }
  if (gameState.phase === "essence") {
    essencePhase(gameState.turn);
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

// --- Render both profiles after game start ---
function showGameUI(myProfile, opponentProfile) {
  document.getElementById('chat-ui').style.display = '';
  document.getElementById('opponent-profile').style.display = '';
  document.getElementById('my-profile').style.display = '';
  renderProfile('my-profile', myProfile);
  renderProfile('opponent-profile', opponentProfile);
}
// PROFILE RENDERING (already present)
function renderProfile(panelId, profileObj) {
  const panel = document.getElementById(panelId);
  if (!panel || !profileObj) return;
  // Banner
  const bannerEl = panel.querySelector('.profile-banner');
  if (bannerEl && profileObj.banner) bannerEl.src = profileObj.banner;
  // Avatar
  const avatarEl = panel.querySelector('.profile-avatar');
  if (avatarEl && profileObj.avatar) avatarEl.src = profileObj.avatar;
  // Username
  const usernameEl = panel.querySelector('.profile-username');
  if (usernameEl && profileObj.username) usernameEl.textContent = profileObj.username;
}

// Get profile info from DOM or gameState (already in your gameplay.js)
function getMyProfileInfo() {
  return {
    username: document.getElementById('profile-username-display')?.textContent || '',
    avatar: document.getElementById('profile-pic')?.src || '',
    banner: document.getElementById('profile-banner')?.src || ''
  };
}
// --- Log system: append to chat-log ---
function appendChatLog(type, sender, text, isMe = false) {
  const logDiv = document.getElementById('chat-log');
  const entry = document.createElement('div');
  entry.className = `log-${type}`;
  entry.innerHTML = `<span class="chat-sender${isMe ? ' chat-sender-me' : ''}">${sender}:</span> <span>${text}</span>`;
  logDiv.appendChild(entry);
  logDiv.scrollTop = logDiv.scrollHeight;
}

// --- Chat send logic ---
document.getElementById('send-chat-btn').onclick = function() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (msg.length && window.socket && window.currentRoomId) {
    window.socket.emit('game message', window.currentRoomId, msg);
    input.value = '';
  }
};

window.socket.on('game message', (data) => {
  // Highlight your own message
  const isMe = (data.sender === gameState.playerProfile?.username);
  appendChatLog('message', data.sender, data.msg, isMe);
});

// --- Example: Append action log ---
function logAction(text) {
  appendChatLog('action', text);
}

// --- Example: Append system log ---
function logSystem(text) {
  appendChatLog('system', text);
}
function getCpuProfile(deck) {
  return {
    username: deck.name, // e.g. "Verdant Might"
    avatar: deck.image,  // e.g. 'CardImages/Avatars/Fairy.png'
    banner: deck.bannerArt, // e.g. 'CardImages/Banners/GreenBanner.png'
  };
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
function essencePhase(playerOrOpponent) {
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
  battlefield.classList.add('attack-mode-backdrop');

  const targets = getOpponentAttackableTargets();

  targets.forEach(cardObj => {
    // Try both rows for finding the DOM element
    let targetDiv = findCardDivInZone('opponent-creatures-zone', cardObj.instanceId)
      || findCardDivInZone('opponent-domains-zone', cardObj.instanceId);
    if (targetDiv) {
      targetDiv.classList.add('attack-target-highlight');
      targetDiv.onclick = function(e) {
        e.stopPropagation();
        resolveAttack(attackerId, cardObj.instanceId);
        endAttackTargeting();
        battlefield.classList.remove('attack-mode-backdrop');
      };
    }
  });

  // Cancel handler
  attackMode.cancelHandler = function(e) {
    endAttackTargeting();
    battlefield.classList.remove('attack-mode-backdrop');
  };
  setTimeout(() => document.body.addEventListener('click', attackMode.cancelHandler, { once: true }), 10);
}
function getOpponentAttackableTargets() {
  // Combine both battlefield zones
  const allOpponentField = [
    ...gameState.opponentCreatures,
    ...gameState.opponentDomains
  ];
  // Only cards with allowed categories ("creature", "domain", "artifact")
  return allOpponentField.filter(cardObj => {
    const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
    return cardDef && ["creature", "domain", "artifact"].includes(cardDef.category);
  });
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
  battlefield.classList.remove('attack-mode-backdrop');
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

  // Try both sides for attacker (player or opponent)
  attacker =
    gameState.playerCreatures.find(c => c.instanceId === attackerId) ||
    gameState.opponentCreatures.find(c => c.instanceId === attackerId);

  // Try both sides for defender (creatures/domains)
  defender =
    gameState.opponentCreatures.find(c => c.instanceId === defenderId) ||
    gameState.opponentDomains.find(c => c.instanceId === defenderId) ||
    gameState.playerCreatures.find(c => c.instanceId === defenderId) ||
    gameState.playerDomains.find(c => c.instanceId === defenderId);

  // Find which arrays they belong to
  if (gameState.playerCreatures.includes(attacker)) {
    attackerArr = gameState.playerCreatures;
    attackerVoid = gameState.playerVoid;
  } else if (gameState.opponentCreatures.includes(attacker)) {
    attackerArr = gameState.opponentCreatures;
    attackerVoid = gameState.opponentVoid;
  }
  if (gameState.playerCreatures.includes(defender)) {
    defenderArr = gameState.playerCreatures;
    defenderVoid = gameState.playerVoid;
  } else if (gameState.opponentCreatures.includes(defender)) {
    defenderArr = gameState.opponentCreatures;
    defenderVoid = gameState.opponentVoid;
  } else if (gameState.playerDomains.includes(defender)) {
    defenderArr = gameState.playerDomains;
    defenderVoid = gameState.playerVoid;
  } else if (gameState.opponentDomains.includes(defender)) {
    defenderArr = gameState.opponentDomains;
    defenderVoid = gameState.opponentVoid;
  }

  if (!attacker || !defender) return;

  const defenderDef = dummyCards.find(c => c.id === defender.cardId);
  if (!defenderDef || !["creature", "domain", "artifact"].includes(defenderDef.category)) return;

  // === Attack Logic ===

  // If defender is a creature, use facing/orientation logic
  if (defenderDef.category === "creature") {
    if (defender.orientation === "horizontal") {
      dealCombatDamage(attacker, defender, attacker.atk);
      dealCombatDamage(defender, attacker, defender.atk);
    } else if (defender.orientation === "vertical") {
      let damage = Math.max(0, attacker.atk - defender.def);
      dealCombatDamage(attacker, defender, damage);
      // Defender does not deal damage back
    }
  } else {
    // Domains and artifacts: just take attacker's ATK as damage (no retaliation, ignore orientation)
    dealCombatDamage(attacker, defender, attacker.atk);
  }

  attacker.hasAttacked = true;

  // Death checks: move to void if HP is 0 or less
  if (attacker.currentHP <= 0 && attackerArr && attackerVoid) moveCard(attacker.instanceId, attackerArr, attackerVoid);
  if (defender.currentHP <= 0 && defenderArr && defenderVoid) moveCard(defender.instanceId, defenderArr, defenderVoid);

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


// After both decks selected, call this:
function startPrivateGame() {
  if (!window.selectedPlayerDeck) {
    showToast("No deck has been chosen");
    return;
  }
  // Set up gameState, profiles, etc.
  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');
  // Render chat, profiles, battlefield as in solo
  // Show Game Start animation, Main Domain & Champion selection
  showGameStartAnimation(() => {
    showCoinFlipModal(function(whoStarts) {
    gameState.turn = whoStarts;
    gameState.phase = "draw";
      initiateMainDomainAndChampionSelection(gameState.playerDeck, () => {
        // Draw hand, set up game, etc
        // ...
      });
    });
  });
  document.getElementById('my-profile').style.display = '';
  renderProfile('my-profile', getMyProfileInfo());

  document.getElementById('opponent-profile').style.display = '';
  renderProfile('opponent-profile', opponentProfileObj);
}



function startCasualGame(matchData) {

  gameState = gameState || {};
  
  let myDeckObj = window.selectedPlayerDeck?.deckObj || window.selectedPlayerDeck;
  let opponentDeckObj = matchData.opponentDeck?.deckObj || matchData.opponentDeck;
  
  gameState.playerDeck = shuffle(buildDeck(myDeckObj));
  gameState.opponentDeck = shuffle(buildDeck(opponentDeckObj));
  
  const myBanner = myDeckObj?.bannerArt || "CardImages/Banners/DefaultBanner.png";
  const opponentBanner = opponentDeckObj?.bannerArt || "CardImages/Banners/DefaultBanner.png";
  setBattlefieldBackgrounds(myBanner, opponentBanner);
  
  gameState.playerProfile = getMyProfileInfo && getMyProfileInfo();
  if (matchData.opponentProfile) {
    gameState.opponentProfile = matchData.opponentProfile;
    if (typeof renderProfile === "function") {
      renderProfile('opponent-profile', matchData.opponentProfile);
      document.getElementById('opponent-profile').style.display = '';
    }
  }

  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');
  
  document.getElementById('my-profile').style.display = '';
  renderProfile('my-profile', getMyProfileInfo());

  document.getElementById('opponent-profile').style.display = '';
  renderProfile('opponent-profile', matchData.opponentProfile);
  renderGameState();
  setupDropZones();
  updatePhase();
  setupBattlefieldUI({
    isCpuGame: false,
    myDeckObj,
    opponentDeckObj,
    myProfile: getMyProfileInfo(),
    opponentProfile: matchData.opponentProfile
  });
  showGameStartAnimation(() => {
    showCoinFlipModal(function(whoStarts) {
      gameState.turn = whoStarts;
      gameState.phase = "draw"; 
      initiateMainDomainAndChampionSelection(gameState.playerDeck, () => {
        // Draw hand, set up initial turn, etc.
        renderGameState();
        setupDropZones();
      });
    });
  });
  if (typeof resetChatLog === "function") resetChatLog();
}




function showCoinFlipModal(onResult) {
  // Use forcedResult if provided, else pick randomly (for solo/casual play)
  let isHeads;
  if (typeof forcedResult !== "undefined") {
    // Accept strings or booleans
    if (forcedResult === "player" || forcedResult === "heads" || forcedResult === true) isHeads = true;
    else isHeads = false;
  } else {
    isHeads = Math.random() < 0.5;
  }
  // Flip logic
  const headsImg = "OtherImages/Icons/Heads.png";
  const tailsImg = "OtherImages/Icons/Tails.png";
  const chosenImg = isHeads ? headsImg : tailsImg;
  const chosenText = isHeads ? "Heads" : "Tails";
  // Create overlay/modal
  let modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.position = 'fixed';
  modal.style.background = 'rgba(16,20,24,0.92)';
  modal.onclick = e => { if (e.target === modal) modal.remove(); };

  // Coin image and message
  const coin = document.createElement('img');
  coin.src = headsImg;
  coin.style.width = "120px";
  coin.style.transition = "transform 1.2s cubic-bezier(.22,1.14,.32,1)";
  coin.style.transform = "rotateY(0deg)";
  coin.style.display = "block";
  coin.style.margin = "0 auto";

  const msg = document.createElement('div');
  msg.style.color = "#ffe066";
  msg.style.fontSize = "2em";
  msg.style.textAlign = "center";
  msg.style.marginTop = "24px";
  msg.innerText = "Flipping the coin...";

  // Compose modal
  let content = document.createElement('div');
  content.appendChild(coin);
  content.appendChild(msg);
  modal.appendChild(content);
  document.body.appendChild(modal);

  setTimeout(() => {
    coin.style.transform = "rotateY(270deg)";
    setTimeout(() => {
      coin.src = tailsImg;
      coin.style.transform = "rotateY(540deg)";
      setTimeout(() => {
        coin.src = chosenImg;
        msg.innerText = chosenText + "!\n" + (isHeads ? "You go first" : "You go second");
        setTimeout(() => {
          modal.remove();
          if (onResult) onResult(isHeads ? "player" : "opponent");
        }, 1300);
      }, 450); // second half of the spin
    }, 550); // half-spin duration
  }, 400);
}


// SERVER SYNCHING //
function emitPublicState() {
  if (!window.socket || !window.currentRoomId) return;
  const publicState = {
    deckCount: gameState.playerDeck.length,
    handCount: gameState.playerHand.length,
    creatures: gameState.playerCreatures.map(stripCardForSync),
    domains: gameState.playerDomains.map(stripCardForSync),
    voidCards: gameState.playerVoid.map(stripCardForSync),
    phase: gameState.phase,
    turn: gameState.turn
  };
  window.socket.emit('player state', window.currentRoomId, publicState);
}

// Helper: Only send public info!
function stripCardForSync(card) {
  return {
    cardId: card.cardId,
    instanceId: card.instanceId,
    currentHP: card.currentHP,
    orientation: card.orientation,
    essence: card.essence,
    // Add more as needed for your UI, but don't include full hand if not public!
  };
}
// Always open deck selection modal on slot click in Modes
document.getElementById('mode-player-deck-tile').onclick = function (e) {
  if (window.showPlayerDeckModal)
    window.showPlayerDeckModal();
};

// RESET GAMESTATE WHEN A PLAYER LEAVES/CONCEDES
function resetGameState() {
  gameState = {
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
  renderGameState();
  setupDropZones();
  // Optionally hide gameplay UI
  document.getElementById('gameplay-section').classList.remove('active');
  document.getElementById('mode-select-section').classList.add('active');
  // Hide profiles
  document.getElementById('my-profile').style.display = 'none';
  document.getElementById('opponent-profile').style.display = 'none';
  // Clear chat
  const logDiv = document.getElementById('chat-log');
  if (logDiv) logDiv.innerHTML = '';
}
// Re-render when needed (after deck changes)
if (window.renderDeckSelection) {
  const origRender = window.renderDeckSelection;
  window.renderDeckSelection = function() {
    origRender.apply(this, arguments);
    renderModePlayerDeckTile();
  };
}

// LOG LOGIC
function renderLogAction({
  sourceCard,        // { image, name, cardId }
  action,            // "move", "attack", "target", etc.
  dest,              // { image, name, cardId } OR "Void"/"Deck"/"Hand"/etc
  who = "player"     // "player" or "opponent"
}) {
  const actionIcons = {
    move: "→",
    attack: "⚔️",
    effect: "★",
    draw: "⤵️",
    // Add more as needed
  };
  const zoneIcons = {
    Void: "OtherImages/Icons/Void.png",
    Deck: "OtherImages/Icons/DefaultDeckBox.png",
    Hand: "OtherImages/Icons/Hand.png",
    // Add more as needed
  };

  function cardImg(card, extraClass = "") {
    if (!card || !card.image) return "";
    return `<img class="log-card-img ${extraClass}" src="${card.image}" 
      data-cardid="${card.cardId}" title="${card.name}" 
      style="border: 2px solid ${who === 'player' ? '#6f6' : '#e25555'}; border-radius:8px; width:38px; vertical-align:middle; cursor:pointer;">`;
  }
  function zoneImg(zone) {
    return `<img class="log-zone-img" src="${zoneIcons[zone] || ''}" title="${zone}" style="width:32px;vertical-align:middle;">`;
  }
  let destHtml = typeof dest === "string" ? zoneImg(dest) : cardImg(dest, "log-dest-card");
  let entryHtml = `
    <div class="log-action ${who}" style="background:${who === 'player' ? '#232' : '#322'}11;border-radius:7px;display:inline-flex;align-items:center;">
      ${cardImg(sourceCard)}
      <span class="log-arrow" style="margin:0 7px 0 7px;">${actionIcons[action] || "→"}</span>
      ${destHtml}
    </div>
  `;
  return entryHtml;
}
function appendPositionChangeLog(cardObj, newOrientation) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef) return;
  const orientationIcon = newOrientation === "horizontal"
    ? '<img src="OtherImages/Icons/Horizontal.png" alt="Horizontal" style="width:22px;vertical-align:middle;">'
    : '<img src="OtherImages/Icons/Vertical.png" alt="Vertical" style="width:22px;vertical-align:middle;">';

  const logDiv = document.getElementById('chat-log');
  logDiv.insertAdjacentHTML('beforeend', `
    <div class="log-action" style="padding:5px 0;">
      <img src="${cardDef.image}" style="width:36px;vertical-align:middle;border-radius:6px;margin-right:7px;">
      changed position to&nbsp;${orientationIcon}
    </div>
  `);
  logDiv.scrollTop = logDiv.scrollHeight;
}
function appendVisualLog(obj) {
  const logDiv = document.getElementById('chat-log');
  logDiv.insertAdjacentHTML('beforeend', renderLogAction(obj));
  logDiv.scrollTop = logDiv.scrollHeight;
}
document.getElementById('chat-log').addEventListener('click', function(e) {
  if (e.target.classList.contains('log-card-img')) {
    const cardId = e.target.getAttribute('data-cardid');
    const cardObj = dummyCards.find(c => c.id === cardId);
    if (cardObj) showFullCardModal(cardObj);
  }
});


// Gameplay (menu) header
document.getElementById('gameplay-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('gameplay-back-btn').onclick = function() {
  document.getElementById('gameplay-section').classList.remove('active');
  document.getElementById('home-section').classList.add('active');
};

// ASSIGNMENTS
document.addEventListener('DOMContentLoaded', function() {
  // Settings button (top right of battlefield)
  var settingsBtn = document.getElementById('battlefield-settings-btn');
  if (settingsBtn) {
    settingsBtn.onclick = function() {
      var modal = document.getElementById('settings-menu-pop');
      if (modal) modal.style.display = 'flex';
      else console.warn("Settings modal not found!");
    };
  }
  // Back button (top left of battlefield)
  var backBtn = document.getElementById('battlefield-back-btn');
  if (backBtn) {
    backBtn.onclick = function() {
      if (confirm("Leave the game and return to menu?")) {
        if (window.socket && window.currentRoomId) {
          window.socket.emit('leave game', window.currentRoomId);
        }
        resetGameState();
      }
    };
  }
});

if (window.socket) {
  window.socket.on('opponent_left', () => {
    // Show toast/message
    showToast("Opponent has left the match.");
    resetGameState();
  });
}


if (window.socket) {
  window.socket.on('opponent state update', (state) => {
    gameState.opponentDeck = Array.from({ length: state.deckCount }, () => ({}));
    gameState.opponentHand = Array.from({ length: state.handCount }, () => ({}));
    // Battlefield zones: use the real card objects sent from server
    gameState.opponentCreatures = state.creatures || [];
    gameState.opponentDomains = state.domains || [];
    gameState.opponentVoid = state.voidCards || [];
    gameState.opponentPhase = state.phase;
    gameState.opponentTurn = state.turn;
    renderGameState();
  });
}

// When joining a multiplayer match
socket.on('casual-match-found', function(matchData) {
  // join the room
  socket.emit('join room', matchData.roomId);

  // emit your profile AFTER joining
  socket.emit('profile', getMyProfileInfo());
});
socket.on('opponent profile', function(profileObj) {
  renderProfile('opponent-profile', profileObj);
  document.getElementById('opponent-profile').style.display = '';
});

// Make available globally if called from client.js:
window.setupBattlefieldGame = setupBattlefieldGame;
if (window.socket) {
  window.socket.on('casual-match-found', function(matchData) {
    document.getElementById('casual-searching-modal').style.display = 'none';
    if (typeof startCasualGame === "function") startCasualGame(matchData);
  });
} else {
  console.error("Socket.io not initialized!");
}
if (window.socket) {
  window.socket.on('coin-flip-result', function(result) {
    // result should be "player" or "opponent" (or "heads"/"tails")
    showCoinFlipModal(function(whoStarts) {
      gameState.turn = whoStarts;
      gameState.phase = "draw";
      // ...continue with setup...
      initiateMainDomainAndChampionSelection(gameState.playerDeck, () => {
        // draw opening hand, etc.
      });
    }, result);
  });
}
