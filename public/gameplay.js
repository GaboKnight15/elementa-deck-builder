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
  turn: "player",
  phase: "draw"
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
  renderGameState();
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
    btn.onclick = btnConf.onClick;
    menu.appendChild(btn);
  });
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
  // Remove any existing menu
  document.querySelectorAll('.card-menu').forEach(m => m.remove());

  const cardObj = gameState.playerHand.find(c => c.instanceId === instanceId);

  // Define actions
  const buttons = [
    {
      text: "Play",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerCreatures, { orientation: "vertical" });
        emitGameAction({
          type: 'play_card',
          cardId: instanceId,
          from: 'hand',
          to: 'creatures',
          extra: { orientation: "vertical" }
        });
        this.closest('.card-menu').remove();
      }
    },
    {
      text: "Send to Void",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerVoid);
        this.closest('.card-menu').remove();
      }
    },
    {
      text: "Return to Deck",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerDeck);
        this.closest('.card-menu').remove();
      }
    },
    {
      text: "View",
      onClick: function(e) {
        e.stopPropagation();
        showFullCardModal(cardObj);
        this.closest('.card-menu').remove();
      }
    }
  ];
  const menu = createCardMenu(buttons);

  // Position relative to cardDiv
const rect = cardDiv.getBoundingClientRect();
placeMenuWithinViewport(menu, rect);

  // Hide menu when clicking elsewhere
  setTimeout(() => {
    document.body.addEventListener('click', function handler() {
      menu.remove();
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
// DECK MENU
  if (who === "player") {
  deckCard.onclick = (e) => {
    e.stopPropagation();
    // Remove any other open card-menu
    document.querySelectorAll('.card-menu').forEach(m => m.remove());
    
    // Define deck actions as menu buttons
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
          this.closest('.card-menu').remove();
        }
      },
      {
        text: "Shuffle",
        onClick: function(ev) {
          ev.stopPropagation();
          gameState.playerDeck = shuffle(gameState.playerDeck);
          renderGameState();
          setupDropZones();
          this.closest('.card-menu').remove();
        }
      },
      {
        text: "Search",
        onClick: function(ev) {
          ev.stopPropagation();
          if (gameState.playerDeck.length > 0) {
            openDeckModal();
          }
          this.closest('.card-menu').remove();
        }
      }
    ];
    // CREATE MENU
    const menu = createCardMenu(buttons);
    const rect = deckCard.getBoundingClientRect();
    placeMenuWithinViewport(menu, rect);

    // Hide menu when clicking elsewhere
    setTimeout(() => {
      document.body.addEventListener('click', function handler() {
        menu.remove();
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
    
    const btn = document.createElement('button');
    btn.classList.add('deckvoid-card-btn');

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.className = "modal-card-img";
    
    cardDiv.appendChild(img);
    btn.appendChild(img);
    // ATTACH MENU ON CLICK
    btn.onclick = (e) => {
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

    wrapper.appendChild(btn);
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

// Actions in zones
var currentCardMenuState = null;

function showCardActionMenu(instanceId, zoneId, orientation, cardDiv) {
  // Remove any existing card menus
  document.querySelectorAll('.card-menu').forEach(m => m.remove());

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
        this.closest('.card-menu').remove();
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
        this.closest('.card-menu').remove();
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
        this.closest('.card-menu').remove();
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
        this.closest('.card-menu').remove();
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
        this.closest('.card-menu').remove();
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
        this.closest('.card-menu').remove();
      }
    }
  ];

  // Create and show the menu
  const menu = createCardMenu(buttons);

  // Position menu absolutely near cardDiv
const rect = cardDiv.getBoundingClientRect();
placeMenuWithinViewport(menu, rect);

  // Hide menu when clicking elsewhere
  setTimeout(() => {
    document.body.addEventListener('click', function handler() {
      menu.remove();
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 10);

  menu.onclick = function(e) { e.stopPropagation(); };
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
      
      const btn = document.createElement('button');
      btn.classList.add('deckvoid-card-btn');

      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.className = "modal-card-img";
      cardDiv.appendChild(img);
      btn.appendChild(img);

      btn.onclick = (e) => {
        e.stopPropagation();
        // Remove all card menus in this modal
        modal.querySelectorAll('.card-menu').forEach(m => m.remove());
        const buttons = [
          {
            text: "Return to Hand",
            onClick: function(e) {
              e.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerHand);
              openVoidModal();
              modal.querySelectorAll('.card-menu').forEach(m => m.remove());
            }
          },
          {
            text: "Return to Deck",
            onClick: function(e) {
              e.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerDeck);
              openVoidModal();
              modal.querySelectorAll('.card-menu').forEach(m => m.remove());
            }
          },
          {
            text: "View",
            onClick: function(e) {
              e.stopPropagation();
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
      wrapper.appendChild(btn);
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

  // Set background class for player/opponent
  phaseBadge.classList.remove('opponent-turn', 'player-turn');
  phaseBadge.classList.add(gameState.turn === 'opponent' ? 'opponent-turn' : 'player-turn');

  // Set phase name and color class
  phaseNameSpan.textContent = PHASE_DISPLAY_NAMES[gameState.phase] || gameState.phase;
  phaseNameSpan.className = PHASE_CLASS[gameState.phase];
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
// Make available globally if called from client.js:
window.setupBattlefieldGame = setupBattlefieldGame;
window.handleOpponentAction = handleOpponentAction;
updatePhase();
