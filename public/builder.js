// ==========================
// === CONSTANTS & STATE ===
// ==========================
// --- MULTI-DECK MANAGEMENT --- //
const DECK_SLOTS_KEY = "deckSlots";
const DECKS_KEY = "decks";
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
const deckPanel         = document.getElementById('deck-panel');

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
const backBuilderBtn = document.getElementById('back-builder-btn');
// HIGHLIGHTED CARD
const highlightArtModal = document.getElementById('highlight-art-modal');
const highlightArtList = document.getElementById('highlight-art-list');
const setHighlightArtBtn = document.getElementById('set-highlight-art-btn');
const closeHighlightArtBtn = document.getElementById('close-highlight-art-btn');
// DECK BANNER
const deckBannerImg = document.getElementById('deck-banner-img');
const deckBannerModal = document.getElementById('deck-banner-modal');
const deckBannerArtList = document.getElementById('deck-banner-art-list');
const closeDeckBannerModalBtn = document.getElementById('close-deck-banner-modal');
const deckCardCount = document.getElementById('deck-card-count');
// CARDBACK
const deckCardbackImg = document.getElementById('deck-cardback-img');
const deckCardbackModal = document.getElementById('deck-cardback-modal');
const deckCardbackArtList = document.getElementById('deck-cardback-art-list');
const closeDeckCardbackModalBtn = document.getElementById('close-deck-cardback-modal');
// Cardback options (expand as needed)
const cardbackOptions = [
  "OtherImages/Cardbacks/Cardback1.png",
  "OtherImages/Cardbacks/Cardback2.png",
  "OtherImages/Cardbacks/DefaultCardback.png"
];

document.getElementById('builder-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('builder-back-btn').onclick = function() {
  document.getElementById('builder-section').classList.remove('active');
  document.getElementById('home-section').classList.add('active');
};
function showDeckSelection() {
  deckSelectionGrid.style.display = '';
  deckBuilderUI.style.display = 'none';
  builderContainer.style.display = '';
  builderContainer.classList.add('flex-layout');
  deckPanel.style.display = 'none';
  renderDeckSelection();
}
function showDeckBuilder() {
  deckSelectionGrid.style.display = 'none';
  deckBuilderUI.style.display = '';
  builderContainer.style.display = '';
  builderContainer.classList.remove('flex-layout');
  deckPanel.style.display = '';
  updateDeckDisplay();
  renderBuilder();
}

function renderDeckSelection() {
  const grid = document.getElementById('deck-selection-grid');
  grid.innerHTML = '';

  // Always 9 slots (fill with deck names, then "Empty Slot")
  for (let i = 0; i < 12; i++) {
    const slotName = deckSlots[i];
    const tile = document.createElement('div');
    tile.className = 'deck-slot-tile';
    tile.style.position = "relative"; // Ensure positioning for the star/button
    if (slotName) {
      const deck = decks[slotName] || {};

      if (deck.highlightArt) {
        const validLegendary = Object.keys(deck)
          .map(cardId => dummyCards.find(card => card.id === cardId && card.rarity === 'Legendary'))
          .filter(Boolean)
          .some(card => (card.artwork || card.image) === deck.highlightArt);
        if (!validLegendary) {
          delete deck.highlightArt;
          saveProgress();
        }
      }
if (deck.highlightArt) {
  tile.innerHTML = `
    <img class="deck-slot-highlight-img" src="${deck.highlightArt}" alt="highlight" />
    <div class="deck-slot-title-overlay">${slotName}</div>
  `;
} else {
  tile.textContent = slotName;
}

      // --- ACTIVE DECK BUTTON/STAR ---
      const isActive = slotName === currentDeckSlot;
     const activeBtn = document.createElement('button');
activeBtn.innerHTML = isActive ? '⭐ Active' : '☆ Set Active';
activeBtn.className = 'deck-active-btn';
activeBtn.disabled = isActive;
activeBtn.onclick = (e) => {
  e.stopPropagation();
  currentDeckSlot = slotName;
  saveProgress();
  renderDeckSelection();
};
tile.appendChild(activeBtn);

      tile.onclick = (e) => {
        showDeckTileMenu(slotName);
      };
    } else {
      tile.classList.add('empty');
      tile.textContent = '+ New Deck';
      tile.onclick = () => {
        let newName = prompt("Deck name?");
        if (!newName) return;
        if (deckSlots.includes(newName)) {
          showToast("Deck name already exists!", {type:"error"});
          return;
        }
        deckSlots[i] = newName;
        decks[newName] = {};
        currentDeckSlot = newName;
        saveProgress();
        showDeckBuilder();
      };
    }
    grid.appendChild(tile);
  }
}
  
function showDeckTileMenu(deckName) {
  deckMenuTitle.textContent = deckName;
  updateDeckBanner(deckName);
  updateDeckCardback(deckName);
  // Card count
  const deck = decks[deckName] || {};
  const count = Object.values(deck)
    .filter(v => typeof v === 'number') // Only card counts
    .reduce((a, b) => a + b, 0);
  deckCardCount.textContent = `${count} cards`;

  deckMenuModal.style.display = 'flex';
  deckMenuModal.dataset.deckName = deckName;
}
setHighlightArtBtn.onclick = function() {
  highlightArtModal.style.display = "flex";
  highlightArtList.innerHTML = "";

  // Only Legendary cards currently in this deck
  const deckName = deckMenuModal.dataset.deckName;
  const deck = decks[deckName] && decks[deckName].cards ? decks[deckName].cards : decks[deckName] || {};
  const legendaryCards = Object.keys(deck)
    .map(cardId => dummyCards.find(card => card.id === cardId && card.rarity === 'Legendary'))
    .filter(Boolean);

  if (legendaryCards.length === 0) {
    highlightArtList.innerHTML = "<div style='color:#eee'>No Legendary cards in this deck.</div>";
    return;
  }
  legendaryCards.forEach(card => {
    const img = document.createElement('img');
    // Use card.artwork if you have a separate artwork property, else use .image
    img.src = card.artwork || card.image;
    img.alt = card.name;
    img.className = "highlight-art-choice";
    img.title = card.name;
    img.onclick = () => {
      decks[deckName].highlightArt = card.artwork || card.image;
      saveProgress();
      renderDeckSelection();
      highlightArtModal.style.display = "none";
      closeDeckTileMenu();
    };
    highlightArtList.appendChild(img);
  });
};
closeHighlightArtBtn.onclick = () => highlightArtModal.style.display = "none";

function updateDeckBanner(deckName) {
  const deck = decks[deckName] || {};
  deckBannerImg.src = deck.bannerArt || "CardImages/Banners/DefaultBanner.png";
}

// Make the banner image clickable to open the modal
deckBannerImg.onclick = function() {
  deckBannerModal.style.display = "flex";
  deckBannerArtList.innerHTML = "";

  // Use only cards in the selected deck
  const deckName = deckMenuModal.dataset.deckName;
  const deck = decks[deckName] && decks[deckName].cards ? decks[deckName].cards : decks[deckName] || {};
  const artworkSet = new Set();

  Object.keys(deck).forEach(cardId => {
    const card = dummyCards.find(c => c.id === cardId);
    if (!card || !card.artwork) return;
    const art = card.artwork;
   if (!artworkSet.has(art)) {
      artworkSet.add(art);
      const img = document.createElement('img');
      img.src = art;
      img.alt = card.name;
      img.className = "deck-banner-choice";
      img.title = card.name;
      img.onclick = () => {
        decks[deckName].bannerArt = art;
        saveProgress();
        updateDeckBanner(deckName);
        deckBannerModal.style.display = "none";
      };
      deckBannerArtList.appendChild(img);
    }
  });

  // Fallback if no artwork in deck
  if (artworkSet.size === 0) {
    deckBannerArtList.innerHTML = "<div style='color:#eee'>No cards with artwork in this deck.</div>";
  }
};

closeDeckBannerModalBtn.onclick = () => (deckBannerModal.style.display = "none");
// Update displayed cardback in deck menu
function updateDeckCardback(deckName) {
  const deck = decks[deckName] || {};
  deckCardbackImg.src = deck.cardbackArt || "OtherImages/Cardbacks/DefaultCardback.png";
}

// Make cardback image clickable to open the modal
deckCardbackImg.onclick = function() {
  deckCardbackModal.style.display = "flex";
  deckCardbackArtList.innerHTML = "";
  const deckName = deckMenuModal.dataset.deckName;
  const deck = decks[deckName] || {};
  const unlocked = getUnlockedCardbacks ? getUnlockedCardbacks() : 
    (window.getUnlockedCardbacks ? window.getUnlockedCardbacks() : 
      ["OtherImages/Cardbacks/DefaultCardback.png"]);
  unlocked.forEach(cb => {
    const img = document.createElement('img');
    img.src = cb;
    img.alt = "Cardback";
    img.className = "deck-cardback-choice";
    img.onclick = () => {
      decks[deckName].cardbackArt = cb;
      saveProgress();
      updateDeckCardback(deckName);
      deckCardbackModal.style.display = "none";
      closeDeckTileMenu();
    };
    deckCardbackArtList.appendChild(img);
  });
};
window.renderDeckCardbackChoices = function() {
  // If modal is open, re-render its contents after unlock
  if (deckCardbackModal.style.display === "flex") {
    deckCardbackImg.onclick();
  }
}

closeDeckCardbackModalBtn.onclick = () => (deckCardbackModal.style.display = "none");

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
  saveProgress();
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
    showToast("Deck name already exists!", {type:"error"});
    return;
  }
  let idx = deckSlots.indexOf(deckName);
  let deckData = decks[deckName];
  deckSlots[idx] = newName;
  decks[newName] = deckData;
  delete decks[deckName];
  currentDeckSlot = newName;
  saveProgress();
  renderDeckSelection();
};
// Delete
deleteDeckBtn.onclick = function() {
  const deckName = deckMenuModal.dataset.deckName;
  if (deckSlots.length === 1) {
    showToast("You must have at least 1 deck", {type:"error"});
    return;
  }
  if (!confirm(`Delete "${deckName}"? This cannot be undone.`)) return;
  let idx = deckSlots.indexOf(deckName);
  deckSlots.splice(idx, 1);
  delete decks[deckName];
  currentDeckSlot = deckSlots[Math.max(idx - 1, 0)];
  saveProgress();
  closeDeckTileMenu();
  renderDeckSelection();
};
function showDeckViewModal(deckName) {
  deckViewModalTitle.textContent = deckName;
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

    // Add click handler to show modal
    img.onclick = (e) => {
      e.stopPropagation();
      showFullCardModal(card);
    };

    wrapper.appendChild(img);

    // This badge is already being created per card
    const badge = document.createElement('div');
    badge.textContent = `x${count}`;
    badge.className = 'deck-card-count-badge';
    wrapper.appendChild(badge);

    deckViewModalList.appendChild(wrapper);
    total += count;
  }
  deckViewModal.style.display = 'flex';
}
closeDeckViewModalBtn.classList.add('btn-negative-secondary');
closeDeckViewModalBtn.onclick = function() {
  deckViewModal.style.display = 'none';
};

function getCurrentDeck() {
    return decks[currentDeckSlot] || {};
  }
function setCurrentDeck(deckObj) {
    decks[currentDeckSlot] = deckObj;
    saveProgress();
  }
// ==========================
// === RENDERING CARDS ===
// ==========================
function createCardBuilder(card, ownedCount) {
    const deck = getCurrentDeck();
    const currentInDeck = deck[card.id] || 0;
    const available = ownedCount - currentInDeck;
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
    ownedBadge.textContent = available;
    div.appendChild(ownedBadge);
      // GRAY OUT IF unavailable
    if (available <= 0) {
        div.classList.add('card-unavailable'); // You can style this class in CSS
    }
  
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
// ==========================
// === INITIALIZATION ===
// ==========================
window.updateDeckDisplay = updateDeckDisplay;
window.renderBuilder = renderBuilder;
window.buildDeck = buildDeck;
window.getCurrentDeck = getCurrentDeck;
window.showDeckSelection = showDeckSelection;

  // GLOBAL DECK SELECTION
window.getPlayerDecks = function() {
  // Returns array of all player decks for selection modal
  // Each deck: { id, name, image, deckObj }
  return deckSlots.map(deckName => {
    const deckObj = decks[deckName] || {};
    // Use highlightArt, bannerArt, or a default image for the deck image:
    let image = deckObj.highlightArt || deckObj.bannerArt || "CardImages/Banners/DefaultBanner.png";
    return {
      id: deckName,
      name: deckName,
      image,
      deckObj
    };
  });
};

window.getActiveDeckId = function() {
  return currentDeckSlot;
};
