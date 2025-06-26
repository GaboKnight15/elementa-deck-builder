// ==========================
// === GALLERY LOGIC ===
// ==========================
// ==========================
// === CONSTANTS & STATE ===
// ==========================
// --- MULTI-DECK MANAGEMENT --- //
  const DECK_SLOTS_KEY = "deckSlots";
  const DECKS_KEY = "decks";
  let deckSlots = JSON.parse(localStorage.getItem(DECK_SLOTS_KEY)) || ["Deck 1"];
  let decks = JSON.parse(localStorage.getItem(DECKS_KEY)) || { "Deck 1": {} };
  let currentDeckSlot = localStorage.getItem("currentDeckSlot") || deckSlots[0];

// ==========================
// === DOM REFERENCES ===
// ==========================
// SELECTION MODE
const builderContainer  = document.getElementById('builder-container');
const deckSelectionGrid = document.getElementById('deck-selection-grid');
const deckBuilderUI     = document.getElementById('deck-builder-ui');
const builderBackBtn    = document.getElementById('builder-back-btn');
const builderGallery    = document.getElementById('gallery-builder-cards');
const deckTitle         = document.getElementById('deck-title');
const deckList          = document.getElementById('deck-list');
const cardCount         = document.getElementById('card-count');
const deckPanel         = document.querySelector('.deck');
const deckRenameBtn     = document.getElementById('deck-rename-btn');
const deckSlotSelect = document.getElementById('deckSlotSelect');
const addDeckSlotBtn = document.getElementById('addDeckSlotBtn');
const deleteDeckSlotBtn = document.getElementById('deleteDeckSlotBtn');

// NEW DECK HANDLER OPTIONS
const deckMenuModal = document.getElementById('deck-menu-modal');
const deckMenuTitle = document.getElementById('deck-menu-title');
const viewDeckBtn = document.getElementById('view-deck-btn');
const editDeckBtn = document.getElementById('edit-deck-btn');
const renameDeckBtn = document.getElementById('rename-deck-btn');
const deleteDeckBtn = document.getElementById('delete-deck-btn');
const closeDeckMenuBtn = document.getElementById('close-deck-menu-btn');
const deckViewModal = document.getElementById('deck-view-modal');
const deckViewModalTitle = document.getElementById('deck-view-modal-title');
const deckViewModalList = document.getElementById('deck-view-modal-list');
const closeDeckViewModalBtn = document.getElementById('close-deck-view-modal-btn');

// Get collection from localStorage using shared.js util
function showDeckSelection() {
  deckSelectionGrid.style.display = '';
  deckBuilderUI.style.display = 'none';
  builderContainer.style.display = '';
  deckPanel.style.display = 'none';
  renderDeckSelection();
}
function showDeckBuilder() {
  deckSelectionGrid.style.display = 'none';
  deckBuilderUI.style.display = '';
  builderContainer.style.display = '';
  deckPanel.style.display = '';
  refreshDeckSlotSelect();
  updateDeckDisplay();
  renderBuilder();
}

function renderDeckSelection() {
  const grid = document.getElementById('deck-selection-grid');
  grid.innerHTML = '';

  // Always 9 slots (fill with deck names, then "Empty Slot")
  for (let i = 0; i < 9; i++) {
    const slotName = deckSlots[i];
    const tile = document.createElement('div');
    tile.className = 'deck-slot-tile';

    if (slotName) {
      tile.textContent = slotName;
      tile.onclick = (e) => {
        showDeckTileMenu(slotName);
      };
    } 
    else {
      tile.classList.add('empty');
      tile.textContent = '+ New Deck';
      tile.onclick = () => {
        let newName = prompt("Deck name?");
        if (!newName) return;
        if (deckSlots.includes(newName)) {
          alert("Deck name already exists!");
          return;
        }
        deckSlots[i] = newName;
        decks[newName] = {};
        currentDeckSlot = newName;
        saveDeckState();
        showDeckBuilder();
      };
    }
    grid.appendChild(tile);
  }
}

builderBackBtn.onclick = showDeckSelection;
function showDeckTileMenu(deckName) {
  deckMenuTitle.textContent = deckName;
  deckMenuModal.style.display = 'flex';
  // Store the deckName for handlers
  deckMenuModal.dataset.deckName = deckName;
}
function closeDeckTileMenu() {
  deckMenuModal.style.display = 'none';
}
closeDeckMenuBtn.onclick = closeDeckTileMenu;
deckMenuModal.addEventListener('click', function(e) {
  if (e.target === deckMenuModal) closeDeckTileMenu();
});
deckViewModal.addEventListener('click', function(e) {
  if (e.target === deckViewModal) deckViewModal.style.display = 'none';
});
// View Deck
viewDeckBtn.onclick = function() {
  const deckName = deckMenuModal.dataset.deckName;
  showDeckViewModal(deckName);
  closeDeckTileMenu();
};
// Edit Deck
editDeckBtn.onclick = function() {
  const deckName = deckMenuModal.dataset.deckName;
  currentDeckSlot = deckName;
  saveDeckState();
  closeDeckTileMenu();
  showDeckBuilder();
};
// Rename
renameDeckBtn.onclick = function() {
  const deckName = deckMenuModal.dataset.deckName;
  closeDeckTileMenu();
  let newName = prompt("Rename deck to:", deckName);
  if (!newName || newName === deckName) return;
  if (deckSlots.includes(newName)) {
    alert("Deck name already exists!");
    return;
  }
  let idx = deckSlots.indexOf(deckName);
  let deckData = decks[deckName];
  deckSlots[idx] = newName;
  decks[newName] = deckData;
  delete decks[deckName];
  currentDeckSlot = newName;
  saveDeckState();
  renderDeckSelection();
};
// Delete
deleteDeckBtn.onclick = function() {
  const deckName = deckMenuModal.dataset.deckName;
  if (deckSlots.length === 1) {
    alert("You must have at least one deck.");
    return;
  }
  if (!confirm(`Delete "${deckName}"? This cannot be undone.`)) return;
  let idx = deckSlots.indexOf(deckName);
  deckSlots.splice(idx, 1);
  delete decks[deckName];
  currentDeckSlot = deckSlots[Math.max(idx - 1, 0)];
  saveDeckState();
  closeDeckTileMenu();
  renderDeckSelection();
};
function showDeckViewModal(deckName) {
  deckViewModalTitle.textContent = "Viewing: " + deckName;
  deckViewModalList.innerHTML = "";
  const deck = decks[deckName] || {};
  let total = 0;
  for (const [id, count] of Object.entries(deck)) {
    const card = dummyCards.find(c => c.id === id);
    if (!card) continue;
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-card-wrapper';
    const img = document.createElement('img');
    img.className = 'modal-card-img';
    img.src = card.image;
    img.alt = card.name;
    wrapper.appendChild(img);
    const name = document.createElement('div');
    name.textContent = card.name;
    wrapper.appendChild(name);
    const badge = document.createElement('div');
    badge.textContent = `x${count}`;
    badge.className = 'deck-count-badge';
    wrapper.appendChild(badge);
    deckViewModalList.appendChild(wrapper);
    total += count;
  }
  deckViewModal.style.display = 'flex';
}
closeDeckViewModalBtn.onclick = function() {
  deckViewModal.style.display = 'none';
};
function saveDeckState() {
    localStorage.setItem(DECK_SLOTS_KEY, JSON.stringify(deckSlots));
    localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
    localStorage.setItem("currentDeckSlot", currentDeckSlot);
  }
function loadDeckState() {
    deckSlots = JSON.parse(localStorage.getItem(DECK_SLOTS_KEY)) || ["Deck 1"];
    decks = JSON.parse(localStorage.getItem(DECKS_KEY)) || { "Deck 1": {} };
    currentDeckSlot = localStorage.getItem("currentDeckSlot") || deckSlots[0];
  }
function getCurrentDeck() {
    return decks[currentDeckSlot] || {};
  }
function setCurrentDeck(deckObj) {
    decks[currentDeckSlot] = deckObj;
    saveDeckState();
  }
function refreshDeckSlotSelect() {
    deckSlotSelect.innerHTML = "";
    deckSlots.forEach(slot => {
      const opt = document.createElement('option');
      opt.value = slot;
      opt.textContent = slot;
      deckSlotSelect.appendChild(opt);
    });
    deckSlotSelect.value = currentDeckSlot;
    deckTitle.textContent = currentDeckSlot;
  }
// ==========================
// === RENDERING CARDS ===
// ==========================
function getCollection() {
  return JSON.parse(localStorage.getItem("cardCollection")) || {};
}
function createCardBuilder(card, ownedCount) {
    const deck = getCurrentDeck();
    const currentInDeck = deck[card.id] || 0;
    const div = document.createElement('div');
    div.className = 'card-builder';

  // DRAG AND DROP SUPPORT
    div.setAttribute('draggable', 'true');
    div.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('card-id', card.id);
      e.dataTransfer.setDragImage(div, div.offsetWidth / 2, div.offsetHeight / 2);
      div.classList.add('dragging');
  });
  div.addEventListener('dragend', function(e) {
        div.classList.remove('dragging');
    });
    if (card.rarity) {
    div.setAttribute('data-rarity', card.rarity);
  }
    div.classList.add(getCardBgClass(card));

    const img = document.createElement('img');
    img.src = card.image;
    img.onerror = function() {
      this.onerror = null;
      this.src = "CardImages/Domains/placeholder.png";
    };
    img.alt = card.name;
    img.onclick = (e) => {
      e.stopPropagation();
      showFullCardModal(card);
    };
    div.appendChild(img);

    // OWNED BADGE
    const ownedBadge = document.createElement('div');
    ownedBadge.className = 'card-count-badge';
    ownedBadge.textContent = ownedCount;
    div.appendChild(ownedBadge);
  
    const btn = document.createElement('button');
    btn.textContent = "Add";
    btn.classList.add('btn-secondary', 'btn-add');
    btn.disabled = !canAddCard(card, currentInDeck, ownedCount);
    btn.onclick = (e) => {
      e.stopPropagation();
      if (!canAddCard(card, currentInDeck, ownedCount)) return;
      deck[card.id] = (deck[card.id] || 0) + 1;
      setCurrentDeck(deck);
      updateDeckDisplay();
      renderBuilder();
      if (!deckPanel.classList.contains('show')) {
        deckPanel.classList.add('show');
      }
    };
    div.appendChild(btn);
    return div;
}
// --- DRAG AND DROP FOR DECK BUILDER --- //
deckList.addEventListener('dragover', function(e) {
  e.preventDefault();
  deckList.classList.add('drag-over');
});
deckList.addEventListener('dragleave', function(e) {
  deckList.classList.remove('drag-over');
});
deckList.addEventListener('drop', function(e) {
  e.preventDefault();
  deckList.classList.remove('drag-over');
  const cardId = e.dataTransfer.getData('card-id');
  if(cardId) {
    addCardToDeck(cardId);
    updateDeckDisplay();
    renderBuilder();
    if (!deckPanel.classList.contains('show')) {
      deckPanel.classList.add('show');
    }
  }
});
// DECK CREATION LOGIC
function updateDeckDisplay() {
  const deck = getCurrentDeck();
  deckList.innerHTML = '';
  let total = 0;

  // Group cards by category
  const sections = {
    creature: [],
    artifact: [],
    spell: [],
    domain: []
  };

  for (const [id, count] of Object.entries(deck)) {
    const card = dummyCards.find(c => c.id === id);
    if (!card) continue;
    const cat = getCardCategory(card);
    if (sections.hasOwnProperty(cat)) {
      sections[cat].push({ card, count });
    }
    total += count;
  }
  // Section display order
  const sectionNames = [
    { key: "creature", label: "Creatures" },
    { key: "artifact", label: "Artifacts" },
    { key: "spell", label: "Spells" },
    { key: "domain", label: "Domains" }
  ];

  for (const {key, label} of sectionNames) {
    if (sections[key].length === 0) continue;
    // Add section heading
    const heading = document.createElement('li');
    heading.textContent = label;
    heading.style.fontWeight = "bold";
    heading.style.marginTop = "12px";
    heading.style.marginBottom = "2px";
    deckList.appendChild(heading);

  for (const { card, count } of sections[key]) {
  const li = document.createElement('li');
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.gap = '8px';

  const img = document.createElement('img');
  img.src = card.image;
  img.alt = card.name;
  img.style.width = '56px';
  img.style.height = 'auto';
  img.style.borderRadius = '6px';
  img.style.display = 'block';

  // COUNTER BADGE
  const badge = document.createElement('span');
  badge.textContent = `×${count}`;
  badge.className = 'deck-count-badge';
  badge.style.background = '#22304a';
  badge.style.color = '#ffdb64';
  badge.style.fontWeight = 'bold';
  badge.style.fontSize = '1em';
  badge.style.padding = '3px 12px';
  badge.style.borderRadius = '10px';
  badge.style.marginLeft = '5px';

  const removeBtn = document.createElement('button');
  removeBtn.className = 'icon-btn-negative';
  removeBtn.textContent = '−';
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    deck[card.id]--;
    if (deck[card.id] <= 0) {
      delete deck[card.id];
    }
    setCurrentDeck(deck);
    updateDeckDisplay();
    renderBuilder();
  };
  li.appendChild(img);
  li.appendChild(badge);
  li.appendChild(removeBtn);
  deckList.appendChild(li);
  }
}
  cardCount.textContent = total;
  setCurrentDeck(deck);
  saveDeckState();
}
function getCardCategory(card) {
  return card.category ? card.category.toLowerCase() : '';
}
function buildDeck(deckObj) {
  let deck = [];
  let uid = 1;
  for (let [cardId, count] of Object.entries(deckObj)) {
    for (let i = 0; i < count; i++) {
      deck.push({
        cardId: cardId,
        instanceId: cardId + "#" + (uid++)
      });
    }
  }
  return deck;
}
function canAddCard(card, currentInDeck, ownedCount) {
    const deck = getCurrentDeck();
    const count = currentInDeck || 0;
    const total = Object.values(deck).reduce((a, b) => a + b, 0);
    if (total >= 50) return false;
    if (count >= ownedCount) return false; // <-- Don't exceed owned
    // Rarity limits
    if (card.rarity && card.rarity.toLowerCase() === 'legendary' && count >= 1) return false;
    if (card.rarity && card.rarity.toLowerCase() === 'rare' && count >= 2) return false;
    if (card.rarity && card.rarity.toLowerCase() === 'common' && count >= 3) return false;
    return true;
}

function renderBuilder() {
    builderGallery.innerHTML = '';
    const collection = getCollection(); // Fetch up-to-date collection here
    const selectedColor = document.getElementById('filter-color-builder').value.toLowerCase();
    const selectedType = document.getElementById('filter-type-builder').value.toLowerCase();
    const selectedRarity = document.getElementById('filter-rarity-builder').value.toLowerCase();
    const nameFilter = document.getElementById('filter-name-builder').value.toLowerCase();
    const selectedArchetype = document.getElementById('filter-archetype-builder').value.toLowerCase();
    const selectedAbility = document.getElementById('filter-ability-builder').value.toLowerCase();
    const selectedCategory = document.getElementById('filter-category-builder').value.toLowerCase();
    dummyCards.forEach(card => {
      if (nameFilter && !card.name.toLowerCase().includes(nameFilter)) return;
      if (selectedColor) {
        const colors = Array.isArray(card.color) ? card.color.map(c => c.toLowerCase()) : [card.color.toLowerCase()];
        if (!colors.includes(selectedColor)) return;
      }
      // Filter by category:
      if (selectedCategory) {
      if (!card.category || card.category.toLowerCase() !== selectedCategory) return;
      }
      if (selectedType) {
        const types = Array.isArray(card.type) ? card.type.map(t => t.toLowerCase()) : [card.type.toLowerCase()];
        if (!types.includes(selectedType)) return;
      }
      if (selectedRarity) {
        if (card.rarity.toLowerCase() !== selectedRarity) return;
      }
      if (selectedArchetype) {
        const archetypes = Array.isArray(card.archetype)
          ? card.archetype.map(a => a.toLowerCase())
          : [card.archetype?.toLowerCase()];
        if (!archetypes.includes(selectedArchetype)) return;
      }
      if (selectedAbility) {
        const abilities = Array.isArray(card.ability)
          ? card.ability.map(a => a.toLowerCase())
          : [card.ability?.toLowerCase()];
        if (!abilities.includes(selectedAbility)) return;
      }
      if (!collection[card.id]) return;
      builderGallery.appendChild(createCardBuilder(card, collection[card.id]));
    });
  }
// ==========================
// === EVENT LISTENERS ===
// ==========================

// Deck slot events
  deckSlotSelect.addEventListener('change', () => {
    currentDeckSlot = deckSlotSelect.value;
    saveDeckState();
    updateDeckDisplay();
    renderBuilder();
  });
// ADD DECK SLOT 
  addDeckSlotBtn.addEventListener('click', () => {
    let newName = prompt("Deck name?", `Deck ${deckSlots.length + 1}`);
    if (!newName) return;
    if (deckSlots.includes(newName)) {
      alert("Deck name already exists!");
      return;
    }
    deckSlots.push(newName);
    decks[newName] = {};
    currentDeckSlot = newName;
    saveDeckState();
    refreshDeckSlotSelect();
    updateDeckDisplay();
    renderBuilder();
  });
// RENAME DECK SLOT
  deckRenameBtn.addEventListener('click', () => {
  let newName = prompt("Rename deck to:", currentDeckSlot);
  if (!newName || newName === currentDeckSlot) return;
  if (deckSlots.includes(newName)) {
    alert("Deck name already exists!");
    return;
  }
  let idx = deckSlots.indexOf(currentDeckSlot);
  let deckData = decks[currentDeckSlot];
  deckSlots[idx] = newName;
  decks[newName] = deckData;
  delete decks[currentDeckSlot];
  currentDeckSlot = newName;
  saveDeckState();
  refreshDeckSlotSelect();
  updateDeckDisplay();
  renderBuilder();
});
// DELETE DECK SLOT
  deleteDeckSlotBtn.addEventListener('click', () => {
    if (deckSlots.length === 1) {
      alert("You must have at least one deck.");
      return;
    }
    if (!confirm(`Delete "${currentDeckSlot}"? This cannot be undone.`)) return;
    let idx = deckSlots.indexOf(currentDeckSlot);
    deckSlots.splice(idx, 1);
    delete decks[currentDeckSlot];
    currentDeckSlot = deckSlots[Math.max(idx - 1, 0)];
    saveDeckState();
    refreshDeckSlotSelect();
    updateDeckDisplay();
    renderBuilder();
  });
// FILTER COLOR EVENTS
  document.getElementById('filter-color-builder').addEventListener('change', (e) => {
    const color = e.target.value.toLowerCase();
    document.body.className = document.body.className
      .split(' ')
      .filter(cls => !cls.startsWith('theme-'))
      .join(' ')
      .trim();
    if (color) {
      document.body.classList.add(`theme-${color}`);
    }
  });
// GALLERY EVENT FILTERS
  document.getElementById('filter-name-builder').addEventListener('input', renderBuilder);
  document.getElementById('filter-color-builder').addEventListener('change', renderBuilder);
  document.getElementById('filter-category-builder').addEventListener('change', renderBuilder);
  document.getElementById('filter-type-builder').addEventListener('change', renderBuilder);
  document.getElementById('filter-rarity-builder').addEventListener('change', renderBuilder);
  document.getElementById('filter-archetype-builder').addEventListener('change', renderBuilder);
  document.getElementById('filter-ability-builder').addEventListener('change', renderBuilder);
  document.getElementById('reset-deck-btn').onclick = () => {
    const deck = getCurrentDeck();
    for (const key in deck) {
      delete deck[key];
    }
    setCurrentDeck(deck);
    updateDeckDisplay();
    renderBuilder();
  };

// ==========================
// === INITIALIZATION ===
// ==========================
loadDeckState();
refreshDeckSlotSelect();
updateDeckDisplay();
window.renderBuilder = renderBuilder;
showDeckSelection();
