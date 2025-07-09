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
    image: 'CardImages/BasicCreatures/Goblin.png',
    cards: [
      { id: 'basicfairy', amount: 4 },
      { id: 'basicgoblin', amount: 3 },
      { id: 'basicforest', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'red',
    name: 'Cinder Storm',
    color: 'red',
    image: 'CardImages/BasicCreatures/Emberling.png',
    cards: [
      { id: 'basicemberling', amount: 4 },
      { id: 'basicfirepixie', amount: 3 },
      { id: 'basichellcharger', amount: 2 },
      { id: 'basicvolcano', amount: 4 },
      // ... etc
    ]
  },
  // ...repeat for other colors
];
const ESSENCE_IMAGE_MAP = {
  red: "OtherImages/Essence/red.png",
  green: "OtherImages/Essence/green.png",
  blue: "OtherImages/Essence/blue.png",
  white: "OtherImages/Essence/white.png",
  black: "OtherImages/Essence/black.png",
  yellow: "OtherImages/Essence/yellow.png",
  purple: "OtherImages/Essence/purple.png",
  orange: "OtherImages/Essence/orange.png",
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
document.querySelector('.mode-btn[data-mode="solo"]').addEventListener('click', function() {
  showCpuDeckModal();
});
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
      <img src="${deck.image}" alt="${deck.name}" style="width:100%;height:80px;object-fit:cover;border-radius:8px;">
      <div style="font-weight:bold;color:${deck.color};margin:7px 0 3px 0;">${deck.name}</div>
      <div style="font-size:0.93em;color:#bbb;">${deck.description}</div>
    `;
    div.onclick = () => {
      modal.style.display = 'none';
      // Store selected CPU deck (in window or gameState)
      window.selectedCpuDeck = deck;
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

// Example usage:
const greenCpuDeck = buildCpuDeck(DEFAULT_CPU_DECKS.find(d => d.id === 'green'));

function generateUniqueId() {
  return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}
function startSoloGame() {
  // Build decks
  const cpuDeckArray = buildCpuDeck(window.selectedCpuDeck);
  const playerDeckArray = window.buildDeck(window.selectedPlayerDeck.deckObj);
  
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

  gameState.playerDeck = shuffle(buildDeck(deckObj));
  gameState.playerHand = [];
  gameState.playerCreatures = [];
  gameState.playerDomains = [];
  gameState.playerVoid = [];

  gameState.opponentDeck = shuffle(buildDeck(deckObj));
  gameState.opponentHand = [];
  gameState.opponentCreatures = [];
  gameState.opponentDomains = [];
  gameState.opponentVoid = [];
  renderGameState();
  setupDropZones();

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
  for (let i = 0; i < gameState.opponentHand.length; i++) {
    const div = document.createElement('div');
    div.className = 'card-battlefield';
    const img = document.createElement('img');
    img.src = "CardImages/Domains/placeholder.png"; // Use your card back image
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
  renderMainDomain()
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
        showEssencePaymentModal({
          card: cardData,
          cost: cardData.cost,
          eligibleCards: getAllEssenceSources(),
          onPaid: async function() {
            await moveCardUniversal({
              instanceId,
              fromArr: gameState.playerHand,
              toArr: gameState.playerCreatures,
              extra: { orientation: "vertical" },
              fromZoneId: "player-hand",
              toZoneId: "player-creatures-zone"
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
  // OPPONENT DECK
  const oppDeckDiv = document.getElementById('opponent-deck-zone');
  oppDeckDiv.innerHTML = '';
  appendDeckZone(oppDeckDiv, gameState.opponentDeck, "opponent");
  // OPPONENT VOID
  const oppVoidDiv = document.getElementById('opponent-void-zone');
  oppVoidDiv.innerHTML = '';
  appendVoidZone(oppVoidDiv, gameState.opponentVoid, "opponent");

  // PLAYER VOID
  const playerVoidDiv = document.getElementById('player-void-zone');
  playerVoidDiv.innerHTML = '';
  appendVoidZone(playerVoidDiv, gameState.playerVoid, "player");
  // PLAYER DECK
  const playerDeckDiv = document.getElementById('player-deck-zone');
  playerDeckDiv.innerHTML = '';
  appendDeckZone(playerDeckDiv, gameState.playerDeck, "player");
}
// Helper to create and append the deck zone card at the end
function appendDeckZone(parentDiv, deckArray, who) {
  const deckZone = document.createElement('div');
  deckZone.className = 'deck-zone';
  const deckCard = document.createElement('div');
  deckCard.className = 'card-deck';
  const img = document.createElement('img');
  img.src = "CardImages/Domains/placeholder.png";
  img.alt = who + "'s Deck";
  img.style.width = "60px";
  img.style.opacity = "0.85";
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
  closeAllModals();
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
  list.innerHTML = "<h3>Select a card and choose an action</h3>";

gameState.playerDeck.forEach((cardObj, idx) => {
  const card = dummyCards.find(c => c.id === cardObj.cardId);
  if (!card) return;

  const wrapper = document.createElement('div');
  wrapper.className = "modal-card-wrapper";

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
          openDeckModal();
          modal.querySelectorAll('.card-menu').forEach(m => m.remove());
        }
      },
      {
        text: "Send to Void",
        onClick: function(ev) {
          ev.stopPropagation();
          moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerVoid);
          openDeckModal();
          modal.querySelectorAll('.card-menu').forEach(m => m.remove());
        }
      },
      {
        text: "View",
        onClick: function(ev) {
          ev.stopPropagation();
          showFullCardModal(cardObj);
          modal.querySelectorAll('.card-menu').forEach(m => m.remove());
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

  cardDiv.appendChild(img);
  wrapper.appendChild(cardDiv);
  list.appendChild(wrapper);
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

  // Color logic
  let barColor = "#4caf50"; // green
  if (hpPercent <= 0.25) {
    barColor = "#e53935"; // red
  } else if (hpPercent <= 0.5) {
    barColor = "#ff9800"; // orange
  }
  
  // Create the main card div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';
  cardDiv.dataset.instanceId = cardObj.instanceId;
  cardDiv.style.position = 'relative';

  // Add card image
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
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

  // Return a wrapper with cardDiv + hp bar below
  const wrapper = document.createElement('div');
  wrapper.className = 'card-battlefield-wrapper';
  wrapper.style.display = 'flex';
  wrapper.style.flexDirection = 'column';
  wrapper.style.alignItems = 'center';

  wrapper.appendChild(cardDiv);

  // HP Bar just below the card
  const barWrap = document.createElement('div');
  barWrap.className = 'hp-bar-wrap';
  const bar = document.createElement('div');
  bar.className = 'hp-bar';
  bar.style.width = `${Math.round(hpPercent * 100)}%`;
  bar.style.backgroundColor = barColor;
  barWrap.appendChild(bar);
  wrapper.appendChild(barWrap);;
  
  // MANUAL HP UPDATE
  cardDiv.onclick = function(e) {
    e.stopPropagation();
    showCardActionMenu(cardObj.instanceId, zoneId, cardObj.orientation || "vertical", cardDiv);
  };
  return wrapper;
}

function renderEssencePool(cardObj) {
  if (!cardObj.essence) return null;
  const poolDiv = document.createElement('div');
  poolDiv.className = 'essence-pool';
  // Loop through all essence types
  const ESSENCE_TYPES = ['green','red','blue','white','black','yellow','purple','orange'];
  ESSENCE_TYPES.forEach(type => {
    const amount = cardObj.essence[type] || 0;
    if (amount > 0) {
      const icon = document.createElement('div');
      icon.className = `essence-icon essence-${type}`;
      icon.title = `${type} Essence: ${amount}`;
      icon.innerHTML = `<img src="OtherImages/Essence/${type}.png" class="essence-img"><span class="essence-amount">${amount}</span>`;
      poolDiv.appendChild(icon);
    }
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
          let newHp = prompt("Set HP (1-99):", cardObj.currentHP);
          let num = parseInt(newHp, 10);
          if (!isNaN(num) && num > 0 && num <= 99) {
            cardObj.currentHP = num;
            renderGameState();
          }
        }
        closeAllMenus();
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
  closeAllModals();
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
  wrapper.className = "modal-card-wrapper";

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
          openVoidModal();
          closeAllMenus();
        }
      },
      {
        text: "Return to Deck",
        onClick: function(e) {
          e.stopPropagation();
          moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerDeck);
          openVoidModal();
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
        wrapper.appendChild(menu);
        menu.onclick = function(e) { e.stopPropagation(); };
        setTimeout(() => {
          document.body.addEventListener('click', function handler() {
            closeAllMenus();
            document.body.removeEventListener('click', handler);
          }, { once: true });
        }, 10);
      };

      cardDiv.appendChild(img);
      wrapper.appendChild(cardDiv);
      list.appendChild(wrapper);
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
  phaseBadge.classList.remove('opponent-turn', 'player-turn');
  phaseBadge.classList.add(gameState.turn === 'opponent' ? 'opponent-turn' : 'player-turn');
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
  if (gameState.phase === 'draw') drawCards(gameState.turn, 1);
  updatePhase();
  renderGameState && renderGameState();
  setupDropZones();
};
phaseBadge.onclick = function() { nextPhaseBtn.click(); };

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
  // Try to infer DOM nodes if not supplied
  if (!sourceDiv && fromZoneId) {
    sourceDiv = findCardDivInZone(fromZoneId, instanceId);
  }
  if (!destinationDiv && toZoneId) {
    // For animation, we often animate to the zone, not to a particular card
    destinationDiv = document.getElementById(toZoneId);
  }
  // Animate if possible and requested
  if (animationType !== "none" && sourceDiv && destinationDiv) {
    await new Promise(resolve => animateCardMove(sourceDiv, destinationDiv, resolve));
  }
  // Move in state
  moveCard(instanceId, fromArr, toArr, extra);
  // Rerender
  renderGameState();
  setupDropZones();
}
  // CARD ANIMATIONS
function animateCardMove(cardDiv, destinationDiv, callback) {
  // Get starting and ending positions
  const startRect = cardDiv.getBoundingClientRect();
  const endRect = destinationDiv.getBoundingClientRect();

  // Clone the cardDiv for animation
  const animCard = cardDiv.cloneNode(true);
  animCard.style.position = 'fixed';
  animCard.style.left = startRect.left + 'px';
  animCard.style.top = startRect.top + 'px';
  animCard.style.width = startRect.width + 'px';
  animCard.style.height = startRect.height + 'px';
  animCard.style.pointerEvents = 'none';
  animCard.style.zIndex = 10000;
  animCard.classList.add('card-move-animate');

  document.body.appendChild(animCard);

  // Force reflow for transition
  void animCard.offsetWidth;

  // Animate to destination
  animCard.style.transition = 'all 0.5s cubic-bezier(.33,1.62,.46,.98)';
  animCard.style.left = endRect.left + 'px';
  animCard.style.top = endRect.top + 'px';
  animCard.style.transform = 'scale(1.15) rotate(-5deg)';
  animCard.style.opacity = '0.92';

  // After transition, remove it and call callback
  animCard.addEventListener('transitionend', () => {
    animCard.remove();
    if (callback) callback();
  });
}

// AUTOMATIZATION
// INITIAL CARD SELECTION
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

function renderMainDomain() {
  const playerDiv = document.getElementById('player-main-domain-zone');
  const oppDiv = document.getElementById('opponent-main-domain-zone');
  playerDiv.innerHTML = '';
  oppDiv.innerHTML = '';
  if (gameState.playerMainDomain) {
    playerDiv.appendChild(renderCardOnField(gameState.playerMainDomain, "player-main-domain-zone"));
  }
  if (gameState.opponentMainDomain) {
    oppDiv.appendChild(renderCardOnField(gameState.opponentMainDomain, "opponent-main-domain-zone"));
  }
}
if (gameState.playerMainDomain && gameState.playerMainDomain.currentHP <= 0) {
  alert("You lose! Your Main Domain was destroyed.");
  // End game or restart logic here
}
if (gameState.opponentMainDomain && gameState.opponentMainDomain.currentHP <= 0) {
  alert("You win! Opponent's Main Domain was destroyed.");
  // End game or restart logic here
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
      <div style="font-weight:bold;color:#ffe066">${cardData.name}</div>
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
      <div style="font-weight:bold;color:#ffe066">${cardData.name}</div>
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
// Then, in your game start:
showChampionSelectionModal(gameState.playerDeck, function(chosenChampion) {
  // Remove from deck, place on field
  removeChampionFromDeck(gameState.playerDeck, chosenChampion.instanceId);
  gameState.playerChampion = chosenChampion;
  // Proceed to initial hand draw...
});
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
    if (champions.length === 1) {
      placeChampionOnField(champions[0]);
      if (afterSelection) afterSelection();
    } else if (champions.length > 1) {
      showChampionSelectionModal(deckArr, chosenChampion => {
        placeChampionOnField(chosenChampion);
        if (afterSelection) afterSelection();
      });
    } else {
      if (afterSelection) afterSelection();
    }
  }

  if (mainDomains.length === 1) {
    afterMainDomain(mainDomains[0]);
  } else if (mainDomains.length > 1) {
    showMainDomainSelectionModal(deckArr, afterMainDomain);
  } else {
    afterMainDomain(null); // none found
  }
}

// ESSENCE GENERATION
function generateEssenceForCard(cardObj) {
  // Support both string and array for color
  const colors = Array.isArray(cardObj.color) ? cardObj.color : [cardObj.color];
  colors.forEach(type => {
    addEssence(cardObj, type, 1); // or use cardObj.essenceGeneration[type] if you want variable output
  });
}
function doEssencePhase(playerOrOpponent) {
  // Get the correct arrays
  const domains = playerOrOpponent === "player" ? gameState.playerDomains : gameState.opponentDomains;
  const creatures = playerOrOpponent === "player" ? gameState.playerCreatures : gameState.opponentCreatures;
  // Optionally filter for Champions only
  const champions = creatures.filter(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.category === "champion";
  });

  // Domains
  domains.forEach(generateEssenceForCard);
  // Champions
  champions.forEach(generateEssenceForCard);

  // Optionally: show animation/notification
  renderGameState();
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
  header.innerHTML = `<div style="font-size:1.2em;font-weight:bold;">Pay Essence Cost</div>`;
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
  confirmBtn.textContent = 'Confirm Payment';
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
// Make available globally if called from client.js:
window.setupBattlefieldGame = setupBattlefieldGame;
window.handleOpponentAction = handleOpponentAction;
