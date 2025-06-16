// ==========================
// === GAMEPLAY LOGIC ===
// ==========================

// ==========================
// === CONSTANTS & STATE ===
// ==========================
const PHASES = [
  { turn: 'player', phase: 'draw' },
  { turn: 'player', phase: 'main' },
  { turn: 'player', phase: 'end' },
  { turn: 'opponent', phase: 'draw' },
  { turn: 'opponent', phase: 'main' },
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
const backToBuilderBtn   = document.getElementById('back-to-builder-btn');
const battlefield        = document.getElementById('battlefield');

// ==========================
// === RENDERING / UI ===
// ==========================
function showBattlefield() {
  document.getElementById('battlefield-container').style.display = 'flex';
  document.getElementById('battlefield').style.display = 'block';
  // Hide builder-only elements, etc.
}
function showBuilder() {
  document.getElementById('battlefield-container').style.display = 'none';
  document.getElementById('battlefield').style.display = 'none';
  // Show builder-only elements, etc.
}

backToBuilderBtn.onclick = () => {
  showBuilder();
  elementsToHide.forEach(el => el.style.display = '');
  battlefield.style.display = 'none';
};
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
// DECK SELECTION FOR GAMEPLAY //
function showDeckSelectionMenu() {
  // Create/select modal
  const modal = document.getElementById('deck-selection-modal');
  modal.innerHTML = `
    <h3>Select a Deck</h3>
    <ul id="deck-list-modal">
      ${deckSlots.map(ds => `<li class="deck-slot-item" data-deck="${ds}">${ds}</li>`).join('')}
    </ul>
    <button id="cancel-deck-select">Cancel</button>
  `;
  modal.style.display = 'block';
  document.querySelectorAll('.deck-slot-item').forEach(el => {
    el.onclick = () => {
      currentDeckSlot = el.dataset.deck;
      saveDeckState();
      modal.style.display = 'none';
      // Now start the game with selected deck
      actuallyStartGame();
    };
  });
  document.getElementById('cancel-deck-select').onclick = () => {
    modal.style.display = 'none';
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
  menu.style.position = 'absolute';
  menu.style.display = 'none';
  menu.style.top = '100%';
  menu.style.left = '0';
  menu.style.marginTop = '6px';
  // Don't set background, border, padding here—let CSS handle it

  buttons.forEach(btnConf => {
    const btn = document.createElement('button');
    btn.type = "button";
    btn.innerText = btnConf.text;
    if (btnConf.className) btn.className = btnConf.className;
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
      div.className = 'card';
      div.draggable = true;
      div.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", cardObj.instanceId);
        e.dataTransfer.setData("source", "hand");
      };
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
    div.className = 'card';
    const img = document.createElement('img');
    img.src = "CardImages/Domains/placeholder.png"; // Use your card back image
    img.alt = "Opponent's card";
    img.style.width = "80px";
    div.appendChild(img);
    opponentHandDiv.appendChild(div);
  }
    // Player Zones
  renderRowZone('player-creatures-zone', gameState.playerCreatures, "creature");
  renderRowZone('player-domains-zone', gameState.playerDomains, "domain");

  // Opponent Zones
  renderRowZone('opponent-creatures-zone', gameState.opponentCreatures, "creature");
  renderRowZone('opponent-domains-zone', gameState.opponentDomains, "domain"); 
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
  cardDiv.style.position = 'relative';
  menu.style.display = 'block';
  cardDiv.appendChild(menu);

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
  // Only for player's zones: add deck/void at right
  if (zoneId === "player-domains-zone") {
    appendDeckZone(zoneDiv, gameState.playerDeck, "player");
  }
  if (zoneId === "player-creatures-zone") {
    appendVoidZone(zoneDiv, gameState.playerVoid, "player");
  }
  // Do the same for opponent if you want
  if (zoneId === "opponent-domains-zone") {
    appendDeckZone(zoneDiv, gameState.opponentDeck, "opponent");
  }
  if (zoneId === "opponent-creatures-zone") {
    appendVoidZone(zoneDiv, gameState.opponentVoid, "opponent");
  }
}

// Helper to create and append the deck zone card at the end
function appendDeckZone(parentDiv, deckArray, who) {
  const deckZone = document.createElement('div');
  deckZone.className = 'deck-zone';
  const deckCard = document.createElement('div');
  deckCard.className = 'card';
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

  // Deck menu for player
  if (who === "player") {
    deckCard.onclick = (e) => {
      e.stopPropagation();
      const rect = deckCard.getBoundingClientRect();
      deckActionsMenu.style.top = `${rect.bottom + window.scrollY + 8}px`;
      deckActionsMenu.style.left = `${rect.left + window.scrollX}px`;
      deckActionsMenu.style.display = "block";
    };
  }

  parentDiv.appendChild(deckZone);
}

function appendVoidZone(parentDiv, voidArray, who) {
  const voidZone = document.createElement('div');
  voidZone.className = 'void-zone';
  const voidCard = document.createElement('div');
  voidCard.className = 'card';
  // Show last card image if void is not empty
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
    showVoidModal();
  };

  parentDiv.appendChild(voidZone);
}
// RENDER DECK AND VOID
function renderDeckZone(zoneId, deckArray, who) {
  const zoneDiv = document.getElementById(zoneId);
  zoneDiv.innerHTML = '';
  const deckCard = document.createElement('div');
  deckCard.className = 'card';
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
  zoneDiv.appendChild(deckCard);

  // CLICK HANDLER FOR VOID ZONE
  if (zoneId.endsWith('void-zone')) {
    deckCard.onclick = (e) => {
      e.stopPropagation();
      showVoidModal();
      };
    }
}
// PLACECARDINZONE
function placeCardInZone(instanceId, zoneId, orientation = "vertical") {
  // Find and remove from all zones
  let cardObj;
  const allRows = [
    gameState.playerHand, gameState.playerCreatures, gameState.playerDomains, gameState.playerVoid,
    gameState.opponentHand, gameState.opponentCreatures, gameState.opponentDomains, gameState.opponentVoid
  ];
  for (const arr of allRows) {
    let idx = arr.findIndex(c => c.instanceId === instanceId);
    if (idx !== -1) {
      [cardObj] = arr.splice(idx, 1);
      break;
    }
  }
  if (!cardObj) return;
  // Add to correct zone
  if (zoneId === 'player-creatures-zone') {
  gameState.playerCreatures.push({ ...cardObj, orientation });
} else if (zoneId === 'player-domains-zone') {
  gameState.playerDomains.push({ ...cardObj, orientation });
} else if (zoneId === 'player-void-zone') {
  gameState.playerVoid.push(cleanCard(cardObj));
}
  renderGameState();
  setupDropZones();
}
// REMOVE STAT CHANGES
function cleanCard(cardObj) {
  const cleaned = { ...cardObj };
  delete cleaned.currentHP;
  delete cleaned.orientation;
  return cleaned;
}
  // Modal logic
  closeBtn.onclick = () => { modal.style.display = "none"; };
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// DECK SEARCH MODAL with Popup Menu on Card Click
function openDeckSearchModal() {
  const modal = document.getElementById('deck-search-modal');
  const content = document.getElementById('deck-search-content');
  content.innerHTML = "<h3>Select a card and choose an action</h3>";

  gameState.playerDeck.forEach((cardObj, idx) => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    if (!card) return;

    // 1. Create a wrapper for each card
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';

    // 2. Create card button
    const btn = document.createElement('button');
    btn.style.display = 'flex';
    btn.style.flexDirection = 'column';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.width = "110px";
    btn.style.height = "170px";
    btn.style.padding = "6px";
    btn.style.background = "#444";
    btn.style.color = "#fff";
    btn.style.borderRadius = "10px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.transition = "background 0.2s";
    btn.classList.add('card', 'card-modal-dark');
    btn.onmouseover = () => btn.style.background = "#222";
    btn.onmouseout = () => btn.style.background = "#444";

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.style.maxWidth = "80px";
    img.style.maxHeight = "110px";
    img.style.display = "block";
    img.style.marginBottom = "6px";

    const name = document.createElement('div');
    name.textContent = card.name;
    name.className = "card-name";

    btn.appendChild(img);
    btn.appendChild(name);

    // 3. Attach menu on click, add menu to wrapper
    btn.onclick = (e) => {
      e.stopPropagation();
      // Remove any existing menu in this wrapper
      wrapper.querySelectorAll('.card-menu').forEach(m => m.remove());

      const buttons = [
        {
          text: "Add to Hand",
          onClick: function(ev) {
            ev.stopPropagation();
            moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerHand);
            openDeckSearchModal();
            this.closest('.card-menu').remove();
          }
        },
        {
          text: "Send to Void",
          onClick: function(ev) {
            ev.stopPropagation();
            moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerVoid);
            openDeckSearchModal();
            this.closest('.card-menu').remove();
          }
        },
        {
          text: "View",
          onClick: function(ev) {
            ev.stopPropagation();
            showFullCardModal(cardObj);
            this.closest('.card-menu').remove();
          }
        }
      ];
      const menu = createCardMenu(buttons);
      menu.style.display = 'flex';
      wrapper.appendChild(menu);

      // Hide menu when clicking elsewhere
      setTimeout(() => {
        document.body.addEventListener('click', function handler() {
          menu.remove();
          document.body.removeEventListener('click', handler);
        }, { once: true });
      }, 10);
    };

    wrapper.appendChild(btn);
    content.appendChild(wrapper);
  });

  modal.style.display = "block";
}

function closeDeckSearchModal() {
  document.getElementById('deck-search-modal').style.display = "none";
}
document.getElementById('close-deck-search').onclick = closeDeckSearchModal;
document.getElementById('deck-search-modal').onclick = (e) => {
  if (e.target.id === 'deck-search-modal') closeDeckSearchModal();
};

// Void close logic
document.getElementById('close-void-modal').onclick = function() {
  document.getElementById('void-modal').style.display = "none";
};
document.getElementById('void-modal').addEventListener('click', function(event) {
  if (event.target === this) this.style.display = 'none';
});
// Unified function for all "View" actions:
function showFullCardModal(cardObj) {
  const card = dummyCards.find(c => c.id === (cardObj.cardId || cardObj.id));
  if (!card) return;
  const modal = document.getElementById('image-modal');
  const modalContent = document.getElementById('modal-img-content');
  const modalImg = document.getElementById('modal-img');
  if (modalContent) {
    modalContent.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <h2 style="text-align:center; color:white; margin-top:12px;">${card.name}</h2>
      <div style="text-align:center;">
        ${card.hp !== undefined ? `HP: ${card.hp}` : ''}
        ${card.atk !== undefined ? ` | ATK: ${card.atk}` : ''}
        ${card.def !== undefined ? ` | DEF: ${card.def}` : ''}
        ${card.cost !== undefined ? ` | Cost: ${card.cost}` : ''}
      </div>
      <div style="text-align:center;margin:8px 0;">
        ${card.rarity || ''} ${Array.isArray(card.type) ? card.type.join(', ') : card.type || ''}
      </div>
      <div style="text-align:center;font-size:0.98em;color:#555;">
        ${card.text || ''}
      </div>
    `;
    modal.style.display = 'flex';
    if (modalImg) modalImg.style.display = "none";
  } else {
    modalImg.src = card.image;
    modalImg.style.display = "block";
    modal.style.display = "flex";
  }
}
// IMAGE MODAL CLOSE LOGIC
document.querySelector('.close').onclick = () => {
  document.getElementById('image-modal').style.display = "none";
};
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
  cardDiv.className = 'card on-field';
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
    // fallback if no image
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

  // Render attached cards ON TOP, stacked with a small vertical offset
  if (cardObj.attachedCards && cardObj.attachedCards.length > 0) {
    const stackDiv = document.createElement('div');
    stackDiv.className = 'attached-cards-stack';
    stackDiv.style.position = 'absolute';
    stackDiv.style.left = '50%';
    stackDiv.style.top = '12px'; // adjust as needed
    stackDiv.style.transform = 'translateX(-50%)';
    stackDiv.style.pointerEvents = 'none'; // so they don't block the parent card
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
      attDiv.style.top = `${i * 16}px`; // stagger each attachment down a bit
      attDiv.style.pointerEvents = 'auto'; // allow tooltip/interaction if desired
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
  wrapper.className = 'card-on-field-wrapper';
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
// Create the deck actions menu ONCE
let deckActionsMenu = document.createElement('div');
deckActionsMenu.id = 'player-deck-actions';
deckActionsMenu.style.display = 'none';
deckActionsMenu.style.position = 'absolute';
deckActionsMenu.style.background = 'white';
deckActionsMenu.style.border = '1px solid #aaa';
deckActionsMenu.style.borderRadius = '7px';
deckActionsMenu.style.zIndex = '999';
deckActionsMenu.style.padding = '8px';
deckActionsMenu.innerHTML = `
  <button id="deck-draw-btn">Draw</button>
  <button id="deck-shuffle-btn">Shuffle</button>
  <button id="deck-search-btn">Search</button>
`;
document.body.appendChild(deckActionsMenu);
// Attach event listeners ONCE
deckActionsMenu.querySelector('#deck-draw-btn').onclick = function() {
  if (gameState.turn === "player" && gameState.playerDeck.length > 0) {
    drawCards("player", 1);
  }
};
deckActionsMenu.querySelector('#deck-shuffle-btn').onclick = function() {
  gameState.playerDeck = shuffle(gameState.playerDeck);
  renderGameState();
  setupDropZones();
};
deckActionsMenu.querySelector('#deck-search-btn').onclick = function() {
  if (gameState.playerDeck.length > 0) {
    openDeckSearchModal();
  }
};

document.body.addEventListener('click', function() {
  let menu = document.getElementById('player-deck-actions');
  if (menu) menu.style.display = "none";
});

// Actions in zones
var currentCardMenuState = null;

function showCardActionMenu(instanceId, zoneId, orientation, cardDiv) {
  const menu = document.getElementById('card-action-menu');
  currentCardMenuState = { instanceId, zoneId, orientation };
  // POSITION MENU NEAR CARD
  const rect = cardDiv.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY + 4}px`;
  menu.style.left = `${rect.left + window.scrollX}px`;
  menu.style.display = 'block';
}

// HIDE ALL MENUS
document.body.addEventListener('click', function(e) {
  const menu = document.getElementById('card-action-menu');
  if (menu && menu.style.display === "block") {
    menu.style.display = "none";
  }
});

// PREVENT MENUS FROM CLOSING WHEN CLICK INSIDE
document.getElementById('card-action-menu').onclick = function(e) {
  e.stopPropagation();
};
document.getElementById('card-action-set-hp').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
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
  document.getElementById('card-action-menu').style.display = 'none';
};
document.getElementById('card-action-return-hand').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
  let arr = getZoneArray(zoneId);
  if (arr) {
    // Remove from the current zone and get the card object
    const idx = arr.findIndex(card => card.instanceId === instanceId);
    if (idx !== -1) {
      const [cardObj] = arr.splice(idx, 1);
      // Always clean stats before pushing into hand
      gameState.playerHand.push(cleanCard(cardObj));
    }
  }
  renderGameState();
  setupDropZones();
  document.getElementById('card-action-menu').style.display = 'none';
};

document.getElementById('card-action-orient').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
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
  document.getElementById('card-action-menu').style.display = 'none';
};

document.getElementById('card-action-send-void').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
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
  document.getElementById('card-action-menu').style.display = 'none';
};

document.getElementById('card-action-send-deck').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
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
  document.getElementById('card-action-menu').style.display = 'none';
};

document.getElementById('card-action-view').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
  let arr = getZoneArray(zoneId);
  if (arr) {
    const cardObj = arr.find(card => card.instanceId === instanceId);
    if (cardObj) {
      showFullCardModal(cardObj);
    }
  }
  document.getElementById('card-action-menu').style.display = 'none';
};
// ==== VOID MODAL CARD MENU ====
function showVoidModal() {
  const modal = document.getElementById('void-modal');
  const list = document.getElementById('void-card-list');
  list.innerHTML = '';

  const voidCards = gameState.playerVoid;
  if (voidCards.length === 0) {
    list.innerHTML = '<div style="color:#999;">Void is empty.</div>';
  } else {
    list.style.display = 'grid';
    list.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
    list.style.gap = '1em';
    voidCards.forEach((cardObj, idx) => {
      const card = dummyCards.find(c => c.id === cardObj.cardId);
      if (!card) return;

      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.alignItems = 'center';

      const btn = document.createElement('button');
      btn.style.display = 'flex';
      btn.style.flexDirection = 'column';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'center';
      btn.style.width = "110px";
      btn.style.height = "170px";
      btn.style.padding = "6px";
      btn.style.background = "#444";
      btn.style.color = "#fff";
      btn.style.borderRadius = "10px";
      btn.style.border = "none";
      btn.style.cursor = "pointer";
      btn.style.transition = "background 0.2s";
      btn.classList.add('card', 'card-modal-dark');
      btn.onmouseover = () => btn.style.background = "#222";
      btn.onmouseout = () => btn.style.background = "#444";

      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.style.maxWidth = "80px";
      img.style.maxHeight = "110px";
      img.style.display = "block";
      img.style.marginBottom = "6px";

      const name = document.createElement('div');
      name.textContent = card.name;
      name.className = "card-name";

      btn.appendChild(img);
      btn.appendChild(name);

      btn.onclick = (e) => {
        e.stopPropagation();
        wrapper.querySelectorAll('.card-menu').forEach(m => m.remove());
        const buttons = [
          {
            text: "Return to Hand",
            onClick: function(e) {
              e.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerHand);
              showVoidModal();
              this.closest('.card-menu').remove();
            }
          },
          {
            text: "Return to Deck",
            onClick: function(e) {
              e.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerDeck);
              showVoidModal();
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
        menu.style.display = 'flex';

        wrapper.appendChild(menu);

        setTimeout(() => {
          document.body.addEventListener('click', function handler() {
            menu.remove();
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
// Void Modal
const voidModal = document.getElementById('void-modal');
const voidModalContent = document.getElementById('void-modal-content');
voidModal.addEventListener('click', function(event) {
  // Only close if clicking directly on the overlay (not inside modal content)
  if (event.target === voidModal) {
    voidModal.style.display = 'none';
  }
});
// CLOSES VOID SEARCH
function closeVoidModal() {
  document.getElementById('void-modal').style.display = "none";
}
// Find the current phase index
function getCurrentPhaseIndex() {
  return PHASES.findIndex(
    p => p.turn === gameState.turn && p.phase === gameState.phase
  );
}
function updatePhaseBar() {
  document.getElementById('phase-player').textContent = gameState.turn;
  document.getElementById('phase-name').textContent = gameState.phase;
}
// Phase control events
nextPhaseBtn.onclick = () => {
  let idx = getCurrentPhaseIndex();
  idx = (idx + 1) % PHASES.length;
  gameState.turn = PHASES[idx].turn;
  gameState.phase = PHASES[idx].phase;
  if (gameState.phase === 'draw') drawCards(gameState.turn, 1);
  updatePhaseBar();
  renderGameState && renderGameState();
  setupDropZones();
};
phaseNameSpan.onclick = function() { nextPhaseBtn.click(); };

// ==========================
// === INITIALIZATION ===
// ==========================
updatePhaseBar();

// Call this after any phase or turn change
updatePhaseBar();
