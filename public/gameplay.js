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
  playerDominion: null,
  opponentDominion: null,

  turn: "player",
  phase: "draw"
};

let attackMode = {attackerId: null, attackerZone: null, cancelHandler: null};
const INITIAL_HAND_SIZE = 5;
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
      initiateDominionAndChampionSelection(gameState.playerDeck, () => {
        // After selection, draw opening hand
        drawOpeningHands();
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
      initiateDominionAndChampionSelection(gameState.playerDeck, () => {
        drawOpeningHands();
        renderGameState();
        setupDropZones();
      });
    });
  });
}
// ===================================
// === GAME SETUP HELPER FUNCTIONS ===
// ===================================
function drawOpeningHands() {
  for (let i = 0; i < INITIAL_HAND_SIZE; i++) {
    if (gameState.playerDeck.length > 0) {
      gameState.playerHand.push(gameState.playerDeck.shift());
    }
    if (gameState.opponentDeck.length > 0) {
      gameState.opponentHand.push(gameState.opponentDeck.shift());
    }
  }
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
// ===================================
// ========== ACTIONS LOGIC ==========
// ===================================
// MOVE OBJECT
function moveCard(instanceId, fromArr, toArr, extra = {}) {
  const idx = fromArr.findIndex(card => card.instanceId === instanceId);
  if (idx !== -1) {
    let cardObj = { ...fromArr[idx], ...extra };
    let cardDef = dummyCards.find(c => c.id === cardObj.cardId);

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
    const fromField = fieldArrays.includes(fromArr);
    const toField = fieldArrays.includes(toArr);

    // If moving OUT of field, remove currentHP & orientation so it resets next time
    if (!toField) {
      delete cardObj.currentHP;
      delete cardObj.orientation;
    }
    const isDrawToHand =
      (fromArr === gameState.playerDeck && toArr === gameState.playerHand) ||
      (fromArr === gameState.opponentDeck && toArr === gameState.opponentHand);
    let logObj;
    if (isDrawToHand) {
      logObj = {
        sourceCard: {
          image: cardDef?.image,
          name: cardDef?.name,
          cardId: cardDef?.id,
          isDraw: true // flag for rendering cardback for opponent
        },
        action: "draw",
        dest: "Hand",
        who: (fromArr === gameState.playerDeck) ? "player" : "opponent",
        sender: gameState.playerProfile?.username || "me"
      };
    } else {
      // Standard move log
      const destZone = getZoneNameForArray(toArr);
      const sourceZone = getZoneNameForArray(fromArr);
      logObj = {
        sourceCard: { image: cardDef?.image, name: cardDef?.name, cardId: cardDef?.id },
        action: "move",
        dest: destZone === 'playerVoid' ? "Void"
          : destZone === 'playerHand' ? "Hand"
          : destZone === 'playerDeck' ? "Deck"
          : destZone === 'playerDomains' ? "Domains"
          : destZone === 'playerCreatures' ? "Creatures"
          : destZone === 'opponentVoid' ? "Void"
          : destZone === 'opponentHand' ? "Hand"
          : destZone === 'opponentDeck' ? "Deck"
          : destZone === 'opponentDomains' ? "Domains"
          : destZone === 'opponentCreatures' ? "Creatures"
          : destZone,
        from: sourceZone,
        who: (fromArr === gameState.playerHand || fromArr === gameState.playerDeck ||
              fromArr === gameState.playerDomains || fromArr === gameState.playerCreatures) ? "player" : "opponent",
        sender: gameState.playerProfile?.username || "me"
      };
    }

    // Always append log locally (solo or multiplayer!)
    appendVisualLog(logObj, false, logObj.who === "player");
    // Only emit to socket if in multiplayer mode
    if (window.socket && window.currentRoomId) {
      window.socket.emit('game action log', window.currentRoomId, logObj);
    }
    fromArr.splice(idx, 1);
    toArr.push(cardObj);
  }
  setupDropZones();
  emitPublicState();
}

// CREATE CARD MENUS
function createCardMenu(buttons = []) {
  const menu = document.createElement('div');
  menu.className = 'card-menu';
  buttons.forEach(btnConf => {
    const btn = document.createElement('button');
    btn.type = "button";
    btn.className = 'btn-secondary';
    if (btnConf.html) btn.innerHTML = btnConf.text;
    else btn.innerText = btnConf.text;
    if (btnConf.disabled) {
      btn.disabled = true;
      btn.classList.add("btn-disabled");
      btn.style.filter = "grayscale(1)";
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }
    btn.onclick = function(e) {
      if (btnConf.disabled) return;
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
  : "OtherImages/Cardbacks/CBDefault.png"; // fallback

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
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  // --- Get category and cost display ---
  let playLabel = "Play";
  let costHtml = "";

  if (cardData) {
    const category = cardData.category ? cardData.category.toLowerCase() : '';
    let cost = cardData.cost || {};
    if (typeof cost === "number") {
      // treat as colorless
      cost = { colorless: cost };
    }
    costHtml = getEssenceCostDisplay(cost);

    switch (category) {
      case 'creature': playLabel = "Summon"; break;
      case 'spell': playLabel = "Cast"; break;
      case 'domain': playLabel = "Geomancy"; break;
      case 'artifact': playLabel = "Equip"; break;
      default: playLabel = "Play";
    }
  }
  // Define actions
  const buttons = [
    {
      text: `<span>${playLabel}</span> <span style="float:right;">${costHtml}</span>`,
      html: true, // custom flag for HTML content
      onClick: function(e) {
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

        // No cost, play immediately
        if (
          !cardData.cost ||
          (typeof cardData.cost === "number" && cardData.cost === 0) ||
          (typeof cardData.cost === "object" && Object.values(cardData.cost).reduce((a, b) => a + b, 0) === 0)
        ) {
          moveCard(instanceId, gameState.playerHand, targetArr, { orientation: "vertical" });
          renderGameState();
          setupDropZones();
          return;
        }

        // Otherwise, show payment modal and move after payment
        showEssencePaymentModal({
          card: cardData,
          cost: cardData.cost,
          eligibleCards: getAllEssenceSources(),
          onPaid: function() {
            moveCard(instanceId, gameState.playerHand, targetArr, { orientation: "vertical" });
            renderGameState();
            setupDropZones();
          }
        });
      }
    },
    {
      text: "Send to Void",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerVoid);
        renderGameState();
        setupDropZones();
        closeAllMenus();
      }
    },
    {
      text: "Return to Deck",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerDeck);
        renderGameState();
        setupDropZones();
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
  if (cardData.skill && Array.isArray(cardData.skill) && cardData.skill.length > 0) {
    cardData.skill.forEach(skillName => {
      buttons.push({
        text: skillName,
        onClick: function(e) {
          e.stopPropagation();
          // Future: run skill logic here for this card
          alert(`Activated skill: ${skillName}`);
          closeAllMenus();
        }
      });
    });
  }  
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
    const cardEl = renderCardOnField(cardObj, zoneId);

    // Enable dragging onto a battlefield card for attachments
    const cardDiv = cardEl.querySelector('.card-battlefield');
    if (cardDiv) {
      cardDiv.ondragover = (e) => {
        e.preventDefault();
        cardDiv.classList.add('drag-over-attach');
      };
      cardDiv.ondragleave = () => cardDiv.classList.remove('drag-over-attach');
      cardDiv.ondrop = (e) => {
        e.preventDefault();
        cardDiv.classList.remove('drag-over-attach');
        const instanceId = e.dataTransfer.getData('text/plain');
        const attachmentIdx = gameState.playerHand.findIndex(c => c.instanceId === instanceId);
        if (attachmentIdx === -1) return;
        const attachmentCardObj = gameState.playerHand[attachmentIdx];

        // Only allow if attachmentCardObj is valid (equipment/aura/etc.)
        // For now, allow any card for testing.
        if (attachCard(cardObj, attachmentCardObj)) {
          gameState.playerHand.splice(attachmentIdx, 1);
          renderGameState();
          setupDropZones();
        }
      };
    }

    zoneDiv.appendChild(cardEl);
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

  let deckCardback = "OtherImages/Cardbacks/CBDefault.png";
  if (who === "player" && window.selectedPlayerDeck && window.selectedPlayerDeck.deckObj && window.selectedPlayerDeck.deckObj.cardbackArt
  ) {
    deckCardback = window.selectedPlayerDeck.deckObj.cardbackArt;
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
            if (gameState.playerDeck.length > 0) {
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
    document.body.appendChild(menu); // Append to body, not wrapper

    // Position menu absolutely using the image rect
    const rect = img.getBoundingClientRect();
    placeMenuWithinViewport(menu, rect);

    menu.onclick = function(e) { e.stopPropagation(); };

    // Hide menu when clicking elsewhere
    setTimeout(() => {
  document.body.addEventListener('click', function handler() {
    menu.remove();
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
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  const category = cardData?.category?.toLowerCase();
  // Create wrapper FIRST!
  const wrapper = document.createElement('div');
  wrapper.className = 'card-battlefield-wrapper';

  // Main card div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';
  cardDiv.dataset.instanceId = cardObj.instanceId;

  // Card image
  if (cardData && cardData.image) {
    const img = document.createElement('img');
    img.src = cardData.image;
    img.alt = cardData.name || "Card";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.borderRadius = "8px";
    if (cardObj.orientation === "horizontal") img.style.transform = "rotate(90deg)";
    cardDiv.appendChild(img);
  }

  // --- Stat Overlays ---
  const baseHP = typeof cardData.hp === "number" ? cardData.hp : undefined;
  const currentHP = typeof cardObj.currentHP === "number" ? cardObj.currentHP : baseHP;
  const baseATK = typeof cardObj.atk === "number" ? cardObj.atk : cardData.atk;
  const baseDEF = typeof cardObj.def === "number" ? cardObj.def : cardData.def;
  const currentArmor = typeof cardObj.armor === "number" ? cardObj.armor : cardData.armor;
  const showStats = category !== "spell";

  // HP Badge (bottom left)
  if (showStats && typeof currentHP === "number") {
    const hpBadge = document.createElement('div');
    hpBadge.className = 'stat-badge stat-hp';
    hpBadge.style.position = 'absolute';
    hpBadge.style.left = '0';
    hpBadge.style.bottom = '0';
    hpBadge.style.width = 'auto';
    hpBadge.style.height = '25px';
    hpBadge.style.zIndex = 20;
    hpBadge.innerHTML = `
      <img src="OtherImages/FieldIcons/HP.png" style="width:100%;height:100%;">
      <span style="
        position:absolute;
        left:0;top:0;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;color:#fff;
        text-shadow:0 1px 4px #232;z-index:22;
      ">${currentHP}</span>
    `;
    cardDiv.appendChild(hpBadge);
  }

  // ATK Badge (center bottom)
  if (showStats && typeof baseATK === "number") {
    const atkBadge = document.createElement('div');
    atkBadge.className = 'stat-badge stat-atk';
    atkBadge.style.position = 'absolute';
    atkBadge.style.left = '30%';
    atkBadge.style.bottom = '0';
    atkBadge.style.width = 'auto';
    atkBadge.style.height = '25%';
    atkBadge.style.zIndex = 20;
    atkBadge.innerHTML = `
      <img src="OtherImages/FieldIcons/ATK.png" style="width:100%;height:100%;">
      <span style="
        position:absolute;
        left:0;top:0;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;color:#fff;
        text-shadow:0 1px 4px #232;z-index:22;
      ">${baseATK}</span>
    `;
    cardDiv.appendChild(atkBadge);
  }

  // DEF Badge (right bottom)
  if (showStats && typeof baseDEF === "number") {
    const defBadge = document.createElement('div');
    defBadge.className = 'stat-badge stat-def';
    defBadge.style.position = 'absolute';
    defBadge.style.right = '0';
    defBadge.style.bottom = '0';
    defBadge.style.width = 'auto';
    defBadge.style.height = '25%';
    defBadge.style.zIndex = 20;
    defBadge.innerHTML = `
      <img src="OtherImages/FieldIcons/DEF.png" style="width:100%;height:100%;">
      <span style="
        position:absolute;
        left:0;top:0;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;color:#fff;
        text-shadow:0 1px 4px #232;z-index:22;
      ">${baseDEF}</span>
    `;
    cardDiv.appendChild(defBadge);
  }

  // ARMOR Badge (center-left, vertical middle)
  if (showStats && typeof currentArmor === "number" && currentArmor > 0) {
    const armorBadge = document.createElement('div');
    armorBadge.className = 'stat-badge stat-armor';
    armorBadge.style.position = 'absolute';
    armorBadge.style.left = '1px';
    armorBadge.style.top = '50%';
    armorBadge.style.transform = 'translateY(-50%)';
    armorBadge.style.width = 'auto';
    armorBadge.style.height = '25%';
    armorBadge.style.zIndex = 20;
    armorBadge.innerHTML = `
      <img src="OtherImages/FieldIcons/Armor.png" style="width:100%;height:100%;">
      <span style="
        position:absolute;
        left:0;top:0;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;;color:#ffe066;
        text-shadow:0 1px 4px #232;z-index:22;
      ">${currentArmor}</span>
    `;
    cardDiv.appendChild(armorBadge);
  }

  // --- HP Bar (move to bottom) ---
  if (showStats && typeof currentHP === "number" && typeof baseHP === "number" && baseHP > 0) {
    const hpPercent = Math.max(0, Math.min(1, currentHP / baseHP));
    let barColor = "#4caf50"; // green
    if (hpPercent <= 0.25) barColor = "#e53935";
    else if (hpPercent <= 0.5) barColor = "#ff9800";
    
    const barWrap = document.createElement('div');
    barWrap.className = 'hp-bar-wrap';
    barWrap.style.position = 'absolute';
    barWrap.style.left = '0';
    barWrap.style.bottom = '0';
    barWrap.style.width = '100%';
    barWrap.style.height = '8%';
    barWrap.style.background = '#222c';
    barWrap.style.zIndex = 19;
    
    const bar = document.createElement('div');
    bar.className = 'hp-bar';
    bar.style.height = '100%';
    bar.style.width = `${Math.round(hpPercent * 100)}%`;
    bar.style.backgroundColor = barColor;
    bar.style.borderRadius = '7px';
    barWrap.appendChild(bar);

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

    cardDiv.appendChild(barWrap);
  }

  // --- Attached Cards (right side, absolute) ---
  if (cardObj.attachedCards && cardObj.attachedCards.length > 0) {
    const stackDiv = document.createElement('div');
    stackDiv.className = 'attached-cards-stack';
    stackDiv.style.position = 'absolute';
    stackDiv.style.right = '0px'; // Hug the right side, inside the card
    stackDiv.style.top = '0px';
    stackDiv.style.zIndex = '30';
    cardObj.attachedCards.forEach((attachObj, i) => {
      const attachData = dummyCards.find(c => c.id === attachObj.cardId);
      if (!attachData) return;
      const attDiv = document.createElement('div');
      attDiv.className = 'card attached-on-top';
      attDiv.style.width = '60px';
      attDiv.style.height = '85px';
      attDiv.style.position = 'absolute';
      attDiv.style.right = '0px';
      attDiv.style.top = `${i * 18}px`;
      attDiv.style.right = '0px';
      attDiv.style.pointerEvents = 'auto';
      attDiv.title = attachData.name;

      // ATTACHMENT MENU
      attDiv.onclick = (e) => {
        e.stopPropagation();
        attDiv.querySelectorAll('.card-menu').forEach(m => m.remove());
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
      img.style.height = '100%';
      img.style.borderRadius = '8px';
      attDiv.appendChild(img);

      stackDiv.appendChild(attDiv);
    });
    cardDiv.appendChild(stackDiv);
  }

  // Essence pool rendering (unchanged)
  const essenceDiv = renderEssencePool(cardObj);
  if (essenceDiv) cardDiv.appendChild(essenceDiv);

  // Add cardDiv to wrapper
  wrapper.appendChild(cardDiv);

  // MANUAL HP UPDATE
  cardDiv.onclick = function(e) {
    e.stopPropagation();
    showCardActionMenu(cardObj.instanceId, zoneId, cardObj.orientation || "vertical", cardDiv);
  };

  return wrapper;
}
  // COST DISPLAY IN HAND
function getEssenceCostDisplay(cost) {
  // cost: {colorless: n, green: n, red: n, ...}
  if (!cost || typeof cost !== 'object') return '';
  const colorOrder = ['colorless', 'green', 'red', 'blue', 'white', 'black', 'yellow', 'purple', 'gray'];
  const essenceMap = {
    colorless: { img: 'OtherImages/Essence/EssenceOne.png', emoji: '2️⃣' }, // fallback emoji
    green: { img: 'OtherImages/Essence/EssenceGreen.png', emoji: '🍃' },
    red: { img: 'OtherImages/Essence/EssenceRed.png', emoji: '🔥' },
    blue: { img: 'OtherImages/Essence/EssenceBlue.png', emoji: '💧' },
    white: { img: 'OtherImages/Essence/EssenceWhite.png', emoji: '⚪' },
    black: { img: 'OtherImages/Essence/EssenceBlack.png', emoji: '⚫' },
    yellow: { img: 'OtherImages/Essence/EssenceYellow.png', emoji: '🟡' },
    purple: { img: 'OtherImages/Essence/EssencePurple.png', emoji: '🟣' },
    gray: { img: 'OtherImages/Essence/EssenceGray.png', emoji: '⬜' },
  };
  let html = '';
  colorOrder.forEach(color => {
    const amt = cost[color];
    if (amt && amt > 0) {
      if (color === 'colorless') {
        html += `<span style="font-size:1.25em;margin:0 2px;">${'2️⃣'.repeat(amt)}</span>`;
      } else {
        html += `<img src="${essenceMap[color].img}" style="width:18px;height:18px;vertical-align:middle;margin:0 2px;" alt="${color}">`.repeat(amt);
      }
    }
  });
  return html;
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
  const arr = getZoneArray(zoneId);
  const cardObj = arr ? arr.find(card => card.instanceId === instanceId) : null;
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
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
            emitPublicState();
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
        emitPublicState();
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
        emitPublicState();
        closeAllMenus();
      }
    },
    {
      text: "Change Position",
      disabled: !cardObj || cardObj.hasChangedPositionThisTurn,
      onClick: function(e) {
        e.stopPropagation();
        if (!cardObj || cardObj.hasChangedPositionThisTurn) return;
        let arr = getZoneArray(zoneId);
        if (arr) {
          let card = arr.find(c => c.instanceId === instanceId);
          if (card) {
            let prevOrientation = card.orientation;
            const newOrientation = card.orientation === "horizontal" ? "vertical" : "horizontal";
            changeCardPosition(card, newOrientation);
          }
        }
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
        emitPublicState();
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
  if (cardData.skill && Array.isArray(cardData.skill)) {
    cardData.skill.forEach(skillName => {
      buttons.push({
        text: skillName,
        onClick: function(e) {
          e.stopPropagation();
          // Future: run skill logic here for this card
          alert(`Activated skill: ${skillName}`);
          closeAllMenus();
        }
      });
    });
  }
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
    document.body.appendChild(menu); // Append to body, not wrapper

    // Position menu absolutely using the image rect
    const rect = img.getBoundingClientRect();
    placeMenuWithinViewport(menu, rect);

    menu.onclick = function(e) { e.stopPropagation(); };

    // Hide menu when clicking elsewhere
    setTimeout(() => {
      document.body.addEventListener('click', function handler() {
        menu.remove();
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
    if (gameState.turn === "player") {
      gameState.playerCreatures.forEach(card => card.hasChangedPositionThisTurn = false);
      gameState.playerDomains.forEach(card => card.hasChangedPositionThisTurn = false);
    }
    if (gameState.turn === "opponent") {
      gameState.opponentCreatures.forEach(card => card.hasChangedPositionThisTurn = false);
      gameState.opponentDomains.forEach(card => card.hasChangedPositionThisTurn = false);
    }
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
      appendVisualLog({
        sourceCard: {/* info about drawn card or just {name:"Draw"} */},
        action: "draw",
        dest: "Hand",
        who: "opponent"
      }, false, false);
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
  if (window.gameStartAnimationShown) return; // prevent repeats
  window.gameStartAnimationShown = true;

  // Remove any previous overlays
  let oldOverlay = document.getElementById('game-start-overlay');
  if (oldOverlay) oldOverlay.remove();
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
  if (gameState.playerDominion && gameState.playerDominion.currentHP <= 0) {
    showEndGameAnimation("Defeat", "#e25555");
    // disable actions, offer rematch, etc.
    return true;
  }
  if (gameState.opponentDominion && gameState.opponentDominion.currentHP <= 0) {
    showEndGameAnimation("Victory", "#ffe066");
    // disable actions, offer rematch, etc.
    return true;
  }
  return false;
}
function extractDominionFromDeck(deckArr) {
  const idx = deckArr.findIndex(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.trait && card.trait.toLowerCase() === "dominion";
  });
  if (idx !== -1) {
    return deckArr.splice(idx, 1)[0];
  }
  return null;
}

if (gameState.playerDominion && gameState.playerDominion.currentHP <= 0) {
  showEndGameAnimation("Defeat", "#e25555");
  // Optionally: disable further actions, or trigger a reset
}
if (gameState.opponentDominion && gameState.opponentDominion.currentHP <= 0) {
  showEndGameAnimation("Victory", "#ffe066");
  // Optionally: disable further actions, or trigger a reset
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
    return card && typeof card.trait === "string" && card.trait.toLowerCase() === "champion";
  });
}

function placeChampionOnField(championCardObj) {
  // Remove from deck
  const idx = gameState.playerDeck.findIndex(c => c.instanceId === championCardObj.instanceId);
  if (idx !== -1) gameState.playerDeck.splice(idx, 1);
  // Place on field (creatures array)
  gameState.playerCreatures.unshift(championCardObj);
}
function initiateDominionAndChampionSelection(deckArr, afterSelection) {
  // DOMINION SETUP
  const dominionObj = extractDominionFromDeck(deckArr);
  if (dominionObj) {
    dominionObj.currentHP = getBaseHp(dominionObj.cardId);
    gameState.playerDominion = dominionObj;
    gameState.playerDomains.unshift(dominionObj);
    const idx = deckArr.findIndex(c => c.instanceId === dominionObj.instanceId);
    if (idx !== -1) deckArr.splice(idx, 1);
    renderGameState();
  }
  // CHAMPION SELECTION
  const champions = getChampionsFromDeck(deckArr);
  showChampionSelectionModal(deckArr, chosenChampion => {
    placeChampionOnField(chosenChampion);
    renderGameState();
    if (window.socket && window.currentRoomId) {
      window.socket.emit('champion-selected', window.currentRoomId, chosenChampion);
    }
    if (afterSelection) afterSelection();
  });
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
// ATTACHMENTS LOGIC
function attachCard(targetCardObj, attachmentCardObj) {
  if (!targetCardObj || !attachmentCardObj) return false;
  targetCardObj.attachedCards = targetCardObj.attachedCards || [];
  targetCardObj.attachedCards.push(attachmentCardObj);
  return true;
}
// ATTACK LOGIC
function startAttackTargeting(attackerId, attackerZone, cardDiv) {
  attackMode.attackerId = attackerId;
  attackMode.attackerZone = attackerZone;
  battlefield.classList.add('attack-mode-backdrop');

  // Find attacker object
  let attacker =
    gameState.playerCreatures.find(c => c.instanceId === attackerId) ||
    gameState.opponentCreatures.find(c => c.instanceId === attackerId);

  const targets = getOpponentAttackableTargets(attacker);

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

function getOpponentAttackableTargets(attackerObj = null) {
  // Gather all opponent cards
  const creatures = gameState.opponentCreatures;
  const domains = gameState.opponentDomains;
  const artifacts = gameState.opponentArtifacts || [];
  const allOpponentField = [...creatures, ...domains, ...artifacts];

  // Build map of colors to opponent creatures
  const colorToCreatures = {};
  creatures.forEach(creature => {
    getCardColors(creature).forEach(color => {
      if (!colorToCreatures[color]) colorToCreatures[color] = [];
      colorToCreatures[color].push(creature);
    });
  });

  // Domains and artifacts to filter
  const domainsAndArtifacts = [...domains, ...artifacts];

  // Filter out protected domains/artifacts
  const protectedDomainsArtifacts = domainsAndArtifacts.filter(cardObj => {
    const cardColors = getCardColors(cardObj);
    // If ANY color of the domain/artifact has a protecting creature, it's protected
    return cardColors.some(color => colorToCreatures[color] && colorToCreatures[color].length > 0);
  });

  // Only allow attack on protected domains/artifacts if no creature of that color exists
  const attackableDomainsArtifacts = domainsAndArtifacts.filter(cardObj => !protectedDomainsArtifacts.includes(cardObj));

  // Build initial target list applying color protection rule
  let targets = [
    ...creatures,
    ...attackableDomainsArtifacts
  ];

  // If no attackerObj provided, just return targets after color protection
  if (!attackerObj) return targets;

  // Now apply ability-based restrictions to this filtered list

  // If attacker has Flying, ignore Protect (but NOT color protection)
  if (attackerHasAbility(attackerObj, 'Flying')) {
    return targets;
  }

  // If opponent has Protect, and attacker is NOT Flying, only Protect cards are valid (creatures with Protect)
  const protectCards = targets.filter(cardObj => defenderHasAbility(cardObj, "Protect"));
  if (protectCards.length > 0) {
    return protectCards;
  }

  // Otherwise, return color-protected targets
  return targets;
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

  attacker =
    gameState.playerCreatures.find(c => c.instanceId === attackerId) ||
    gameState.opponentCreatures.find(c => c.instanceId === attackerId);

  defender =
    gameState.opponentCreatures.find(c => c.instanceId === defenderId) ||
    gameState.opponentDomains.find(c => c.instanceId === defenderId) ||
    gameState.playerCreatures.find(c => c.instanceId === defenderId) ||
    gameState.playerDomains.find(c => c.instanceId === defenderId);

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

  // --- ABILITY LOGIC ---
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  const defenderDef = dummyCards.find(c => c.id === defender.cardId);

  // Defender has Flying: can only be attacked by Flying or Ranged
  if (defenderHasAbility(defender, 'Flying')) {
    if (!(attackerHasAbility(attacker, 'Flying') || attackerHasAbility(attacker, 'Ranged'))) {
      showToast("You can only attack Flying creatures with Flying or Ranged cards!");
      return;
    }
  }

  // Ranged: does not receive retaliation when attacking
  let attackerGetsRetaliation = true;
  if (attackerHasAbility(attacker, 'Ranged') && defenderDef.category === "creature") {
    attackerGetsRetaliation = false;
  }

  // --- LOG THE ATTACK ---
  appendAttackLog({
    attacker: attacker,
    defender: defender,
    defenderOrientation: defender.orientation,
    who: getCardOwner(attacker)
  });  

  // === Attack Logic ===

  if (defenderDef.category === "creature") {
    if (defender.orientation === "horizontal") {
      dealCombatDamage(attacker, defender, attacker.atk);
      if (attackerGetsRetaliation) {
        dealCombatDamage(defender, attacker, defender.atk);
      }
    } else if (defender.orientation === "vertical") {
      let damage = Math.max(0, attacker.atk - defender.def);
      dealCombatDamage(attacker, defender, damage);
      // Defender does not deal damage back
    }
  } else {
    dealCombatDamage(attacker, defender, attacker.atk);
  }

  attacker.hasAttacked = true;

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
      initiateDominionAndChampionSelection(gameState.playerDeck, () => {
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
      initiateDominionAndChampionSelection(gameState.playerDeck, () => {
        // Draw hand, set up initial turn, etc.
        renderGameState();
        setupDropZones();
      });
    });
  });
  if (typeof resetChatLog === "function") resetChatLog();
}




function showCoinFlipModal(onResult) {
  if (window.coinFlipShown) return; // prevent repeats
  window.coinFlipShown = true;
  // Remove any previous overlays
  let oldModal = document.getElementById('coin-flip-modal');
  if (oldModal) oldModal.remove();
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
  let coin = document.createElement('img');
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
    playerDominion: null,
    opponentDominion: null,
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
// CARD IMAGE FOR LOG
function cardImgLog(card, {
  extraClass = "",
  border = "",
  width = 38,
  rotate = 0,
  borderRadius = "",
  marginRight = "",
  cursor = "pointer",
  style = "",
  who = "player",
  action = "",
  isDraw = false,
  showCardback = false
} = {}) {
  const cardId = card?.cardId || "";
  const instanceId = card?.instanceId || "";
  // If drawing to hand AND it's the opponent's log, show cardback
  if (showCardback) {
    let cardback = window.selectedOpponentDeck?.cardbackArt
      || gameState.opponentProfile?.cardbackArt
      || "OtherImages/Cardbacks/CBDefault.png";
    return `<img class="log-card-img ${extraClass}" src="${cardback}" data-cardid="${card.cardId}" title="Cardback" style="border:2px solid #e25555;width:${width}px;vertical-align:middle;">`;
  }
  // Otherwise show actual card
  if (!card || !card.image) return "";
  const borderStyle = border || `2px solid ${who === 'player' ? '#6f6' : '#e25555'}`;
  // Compose style string
  let styleStr = `border: ${borderStyle}; width:${width}px; vertical-align:middle; cursor:${cursor};`;
  if (borderRadius) styleStr += ` border-radius:${borderRadius};`;
  if (rotate) styleStr += ` transform:rotate(${rotate}deg);`;
  if (marginRight) styleStr += ` margin-right:${marginRight};`;
  if (style) styleStr += ` ${style}`;
  return `<img class="log-card-img ${extraClass}" src="${card.image}" 
    data-cardid="${cardId}" data-instanceid="${instanceId}" title="${card.name}" 
    style="${styleStr}">`;
}
function zoneImgLog(zone) {
  const zoneIcons = {
    Void: "OtherImages/Icons/Void.png",
    Deck: "OtherImages/Icons/DefaultDeckBox.png",
    Hand: "OtherImages/Icons/Hand.png",
      // Add more as needed
  };  
  return `<img class="log-zone-img" src="${zoneIcons[zone] || ''}" title="${zone}" style="width:32px;vertical-align:middle;">`;
}
// LOG LOGIC
function renderLogAction({
  sourceCard,        // { image, name, cardId }
  action,            // "move", "attack", "target", etc.
  dest,              // { image, name, cardId } OR "Void"/"Deck"/"Hand"/etc
  who = "player"     // "player" or "opponent"
}, isMe = true) {
const actionIcons = {
  move: "→",
  attack: "⚔️",
  effect: "★",
  draw: "⤵️",
    // Add more as needed
};
let showCardback = action === "draw" && !isMe;
let destHtml = typeof dest === "string"
  ? zoneImgLog(dest)
  : cardImgLog(dest, { who, action, isDraw: dest?.isDraw, showCardback });
let entryHtml = `
  <div class="log-action ${who}" style="background:${who === 'player' ? '#232' : '#322'}11;border-radius:7px;display:inline-flex;align-items:center;">
    ${cardImgLog(sourceCard, { who, action, isDraw: sourceCard?.isDraw, showCardback })}
    <span class="log-arrow" style="margin:0 7px 0 7px;">${actionIcons[action] || "→"}</span>
    ${destHtml}
  </div>
`;
  return entryHtml;
}

// ATTACK LOG
function appendAttackLog({ attacker, defender, defenderOrientation, who = "player" }, fromSocket = false, isMe = true) {
  const logDiv = document.getElementById('chat-log');
  if (!logDiv) return;
  // Get card data
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  const defenderDef = dummyCards.find(c => c.id === defender.cardId);

  // Compose the log HTML
  let logHtml = `<div class="log-action attack ${who}" style="background:${who === 'player' ? '#232' : '#322'}11;border-radius:7px;display:inline-flex;align-items:center;">`;

  // Attacker image
  logHtml += cardImgLog(attackerDef, { width: 38, borderRadius: "6px", marginRight: "8px", who });

  // Attack icon
  logHtml += `<img src="OtherImages/Icons/Attack.png" alt="Attack" style="width:32px;height:32px;vertical-align:middle;margin:0 9px;">`;

  // Defender image
  logHtml += cardImgLog(defenderDef, { 
    width: 38, 
    borderRadius: "6px", 
    marginRight: "8px", 
    who, 
    rotate: defenderOrientation === "horizontal" ? 90 : 0 
  });

  logHtml += `</div>`;
  logDiv.insertAdjacentHTML('beforeend', logHtml);
  logDiv.scrollTop = logDiv.scrollHeight;

  // Only emit if not from socket
  if (!fromSocket && window.socket && window.currentRoomId) {
    // Add sender
    const obj = {
      attacker,
      defender,
      defenderOrientation,
      who,
      sender: gameState.playerProfile?.username || "me",
      type: "attack"
    };
    window.socket.emit('game action log', window.currentRoomId, obj);
  }
}

window.socket.on('game action log', (obj) => {
  const myName = gameState.playerProfile?.username || "me";
  const isMe = obj.sender && obj.sender === myName;
  if (isMe) return;
  if (obj.type === "attack") {
    appendAttackLog(obj, true, false);
  } else if (obj.type === "changePosition") {
    // Find the card object using instanceId and cardId if needed
    const cardObj = { cardId: obj.cardId, instanceId: obj.instanceId };
    appendPositionChangeLog(cardObj, obj.newOrientation, obj.prevOrientation, true);
  } else {
    appendVisualLog(obj, true, false);
  }
});
// CHANGE POSITION LOG
function appendPositionChangeLog(cardObj, newOrientation, prevOrientation, fromSocket = false) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef) return;
  const logDiv = document.getElementById('chat-log');
  let logHtml = `<div class="log-action" style="padding:5px 0;display:flex;align-items:center;">`;

  if (prevOrientation === "vertical" && newOrientation === "horizontal") {
    // ATK to DEF
    logHtml += cardImgLog(cardDef, { border: "2px solid #ffe066", width: 36, borderRadius: "6px", marginRight: "7px", rotate: 0 });
    logHtml += `<img src="OtherImages/Icons/Tapped.png" alt="Tapped" style="width:28px;vertical-align:middle;margin:0 7px;">`;
    logHtml += cardImgLog(cardDef, { border: "2px solid #ffe066", width: 36, borderRadius: "6px", marginRight: "7px", rotate: 90 });
  } else if (prevOrientation === "horizontal" && newOrientation === "vertical") {
    // DEF to ATK
    logHtml += cardImgLog(cardDef, { border: "2px solid #ffe066", width: 36, borderRadius: "6px", marginRight: "7px", rotate: 90 });
    logHtml += `<img src="OtherImages/Icons/Untapped.png" alt="Untapped" style="width:28px;vertical-align:middle;margin:0 7px;">`;
    logHtml += cardImgLog(cardDef, { border: "2px solid #ffe066", width: 36, borderRadius: "6px", marginRight: "7px", rotate: 0 });
  }
  logHtml += `</div>`;
  logDiv.insertAdjacentHTML('beforeend', logHtml);
  logDiv.scrollTop = logDiv.scrollHeight;
  // Only emit if not from socket
  if (!fromSocket && window.socket && window.currentRoomId) {
    const obj = {
      cardId: cardObj.cardId,
      instanceId: cardObj.instanceId,
      newOrientation,
      prevOrientation,
      sender: gameState.playerProfile?.username || "me",
      type: "changePosition"
    };
    window.socket.emit('game action log', window.currentRoomId, obj);
  }
}
// CHANGE POSITION HELPER
function changeCardPosition(cardObj, newOrientation) {
  if (!cardObj) return;
  const prevOrientation = cardObj.orientation;
  if (prevOrientation === newOrientation) return; // No change
  cardObj.orientation = newOrientation;
  cardObj.hasChangedPositionThisTurn = true;
  appendPositionChangeLog(cardObj, newOrientation, prevOrientation);
  renderGameState();
  setupDropZones();
  emitPublicState();
}
// APPEND TO LOG
function appendVisualLog(obj, fromSocket = false, isMe = true) {
  const logDiv = document.getElementById('chat-log');
  logDiv.insertAdjacentHTML('beforeend', renderLogAction(obj));
  logDiv.scrollTop = logDiv.scrollHeight;
  // Only emit if not from socket
  if (!fromSocket && window.socket && window.currentRoomId) {
    obj.sender = gameState.playerProfile?.username || "me";
    window.socket.emit('game action log', window.currentRoomId, obj);
  }
}
function showWaitingForOpponentModal() {
  // Show loading spinner/modal
  let modal = document.createElement('div');
  modal.id = 'waiting-modal';
  modal.className = 'modal';
  modal.innerHTML = `<div class="modal-content" style="text-align:center;"><h3>Waiting for opponent...</h3><div class="spinner"></div></div>`;
  document.body.appendChild(modal);
}
function closeWaitingForOpponentModal() {
  let modal = document.getElementById('waiting-modal');
  if (modal) modal.remove();
}
function startGameFieldAnimation(champions) {
  // Show "Both champions revealed!" animation
  showChampionsRevealModal(champions, () => {
    // After animation (e.g., with setTimeout), proceed to render field, draw hand, etc.
    setTimeout(() => {
      renderGameField(); // Your function to render battlefield
      drawOpeningHands();
      // Any other startup logic
    }, 1000); // 1 second animation
  });
}
// Helper functions for abilities and skills
function attackerHasAbility(cardObj, abilityName) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  return cardDef && Array.isArray(cardDef.ability) && cardDef.ability.includes(abilityName);
}
function defenderHasAbility(cardObj, abilityName) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  return cardDef && Array.isArray(cardDef.ability) && cardDef.ability.includes(abilityName);
}
function getCardColors(cardObj) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef) return [];
  if (Array.isArray(cardDef.color)) return cardDef.color;
  if (typeof cardDef.color === "string") return [cardDef.color];
  return [];
}
// ACTIVATING EFFECTS AND ABILITIES
function activateCardEffect(cardObj, targetObj) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef || !cardDef.effect) return;
  switch (cardDef.effect.type) {
    case 'strike':
      dealCombatDamage(cardObj, targetObj, cardDef.effect.amount);
      break;
    case 'heal':
      targetObj.currentHP = Math.min(getBaseHp(targetObj.cardId), (targetObj.currentHP || 0) + cardDef.effect.amount);
      break;
    case 'search':
      handleSearchEffect(cardDef.effect.criteria);
      break;
    case 'draw':
      drawCards('player', cardDef.effect.amount);
      break;
    // ...add more cases as needed
    default:
      console.warn("Unknown effect type:", cardDef.effect.type);
  }
}
// Helper function for search
function handleSearchEffect(criteria) {
  // Find matching cards in deck
  const matches = gameState.playerDeck.filter(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    if (!cardData) return false;
    // Example: trait match
    if (criteria.trait && cardData.trait && cardData.trait.toLowerCase() === criteria.trait.toLowerCase()) return true;
    // Example: subtype match
    if (criteria.type && cardData.type && cardData.subtype.toLowerCase() === criteria.subtype.toLowerCase()) return true;
    // Example: category match
    if (criteria.category && cardData.category && cardData.category.toLowerCase() === criteria.category.toLowerCase()) return true;
    return false;
  });

  // Show a modal to let user select one of the matches
  if (matches.length > 0) {
    showDeckSearchModal(matches, selectedCardObj => {
      // Move selected card to hand
      moveCard(selectedCardObj.instanceId, gameState.playerDeck, gameState.playerHand);
      renderGameState();
      setupDropZones();
    });
  } else {
    showToast("No matching cards found in deck.");
  }
}

document.getElementById('chat-log').addEventListener('click', function(e) {
  if (e.target.classList.contains('log-card-img')) {
    const instanceId = e.target.getAttribute('data-instanceid');
    const cardId = e.target.getAttribute('data-cardid');
    let cardObj = null;
    // Try to find by instanceId first
    if (instanceId) {
      cardObj = dummyCards.find(c => c.instanceId === instanceId);
    }
    // If not found, fallback to cardId
    if (!cardObj && cardId) {
      cardObj = dummyCards.find(c => c.id === cardId);
    }
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

// After local selection:
showWaitingForOpponentModal();
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
      initiateDominionAndChampionSelection(gameState.playerDeck, () => {
        // Draw opening hand, setup, etc.
      });
    }, result);
  });
}
window.gameState = window.gameState || {};
window.gameStartAnimationShown = false;
window.coinFlipShown = false;
