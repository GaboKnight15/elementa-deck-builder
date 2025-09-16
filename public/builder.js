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
const deckMenu = document.getElementById('deck-menu');
const deckMenuTitle = document.getElementById('deck-menu-title');


const closeDeckMenuBtn = document.getElementById('close-deck-menu-btn');
const deckViewModal = document.getElementById('deck-view-modal');
const deckViewModalTitle = document.getElementById('deck-view-modal-title');
const deckViewModalList = document.getElementById('deck-view-modal-list');
const closeDeckViewModalBtn = document.getElementById('close-deck-view-modal-btn');
const backBuilderBtn = document.getElementById('back-builder-btn');
// HIGHLIGHTED CARD
const highlightArtModal = document.getElementById('highlight-art-modal');
const highlightArtList = document.getElementById('highlight-art-list');
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

let showFavoritesOnlyBuilder = false;

// Cardback options (expand as needed)
const cardbackOptions = [
  "OtherImages/Cardbacks/CBDefault.png",
  "OtherImages/Cardbacks/Cardback1.png",
  "OtherImages/Cardbacks/CBFairy.png",
  "OtherImages/Cardbacks/CBCindercore.png",
  "OtherImages/Cardbacks/CBConstructs.png",
  "OtherImages/Cardbacks/CBCoralbound.png",
  "OtherImages/Cardbacks/CBFirelands.png",
  "OtherImages/Cardbacks/CBGoblins.png",
  "OtherImages/Cardbacks/CBGolemheart.png",
  "OtherImages/Cardbacks/CBMerfolk.png",
  "OtherImages/Cardbacks/CBMoonfang.png",
  "OtherImages/Cardbacks/CBSatyr.png",
  "OtherImages/Cardbacks/CBShadowbound.png",
  "OtherImages/Cardbacks/CBStonebound.png",
  "OtherImages/Cardbacks/CBStormcore.png",
  "OtherImages/Cardbacks/CBVenomcore.png",
  "OtherImages/Cardbacks/CBWoodframe.png"
];

document.getElementById('builder-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('open-filters-menu-gallery').onclick = function(e) {
  openFiltersMasterMenu('gallery', e.target);
  // For builder, use 'builder'
};
builderBackBtn.onclick = function() {
  // Check for unsaved changes before returning to deck selection
  if (typeof deckBuilderHasUnsavedChanges === "function" && deckBuilderHasUnsavedChanges()) {
    showToast("Any unsaved changes will be lost");
    if (confirm("Any unsaved changes will be lost. Are you sure you want to leave?")) {
      // Clear unsaved draft from localStorage
      const deckId = currentDeckSlot || selectedDeckId;
      if (deckId) {
        localStorage.removeItem(`deckbuilder_draft_${deckId}`);
      }
      // Optionally clear draft in memory
      deckBuilderDraft = null;
      showDeckSelection();
    }
  } else {
    showDeckSelection();
  }
};

// SAVING DECK
const saveDeckBtn = document.getElementById('save-deck-btn');
if (saveDeckBtn) {
  saveDeckBtn.onclick = function() {
    const deck = getCurrentDeck();
    // Count dominion cards in deck
    let dominionCount = Object.entries(deck).reduce((sum, [cardId, count]) => {
      const card = dummyCards.find(c => c.id === cardId);
      return sum + ((card && card.trait && card.trait.toLowerCase() === 'dominion') ? count : 0);
    }, 0);
    if (dominionCount !== 1) {
      showToast("Deck must have exactly one Dominion card.", { type: "error" });
      return;
    }
    saveProgress();
    showToast("Deck saved!", { type: "success" });
  };
}
const deckSelectionSettingsBtn = document.getElementById('deck-selection-settings-btn');
if (deckSelectionSettingsBtn) {
  deckSelectionSettingsBtn.onclick = function() {
    document.getElementById('settings-modal').style.display = 'flex';
  };
}

const deckSelectionBackBtn = document.getElementById('deck-selection-back-btn');
if (deckSelectionBackBtn) {
  deckSelectionBackBtn.onclick = function() {
    document.getElementById('builder-section').classList.remove('active');
    document.getElementById('home-section').classList.add('active');
  };
}

window.currentDeckSlot = window.currentDeckSlot || "";
window.getActiveDeckId = function() {
  return window.currentDeckSlot;
};

function showDeckSelection() {
  document.getElementById('deck-selection-header').style.display = 'flex';
  document.getElementById('builder-header').style.display = 'none';
  deckSelectionGrid.style.display = '';
  deckBuilderUI.style.display = 'none';
  builderContainer.style.display = '';
  builderContainer.classList.add('flex-layout');
  deckPanel.style.display = 'none';
  renderDeckSelection();
}
function showDeckBuilder() {
  document.getElementById('deck-selection-header').style.display = 'none';
  document.getElementById('builder-header').style.display = 'flex';
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
      const count = Object.values(deck)
        .filter(v => typeof v === 'number')
        .reduce((a, b) => a + b, 0);

if (deck.highlightArt) {
  tile.innerHTML = `
    <img class="deck-slot-highlight-img" src="${deck.highlightArt}" alt="highlight" />
    <div class="deck-slot-title-overlay">${slotName}</div>
    <img class="deck-slot-cardback-img"
         src="${deck.cardbackArt || "OtherImages/Cardbacks/CBDefault.png"}"
         alt="Cardback"
         style="position:absolute;right:8px;bottom:8px;width:32px;height:44px;z-index:10;">
  `;
} else {
  tile.textContent = slotName;
}
      // --- CARD COUNT WARNING MESSAGE --- //
let warningDiv = null;
if (count < 50) {
  warningDiv = document.createElement('div');
  warningDiv.className = 'deck-slot-warning';
  warningDiv.textContent = "Deck cannot be used, less than 50 cards";
}
      // --- ACTIVE DECK BUTTON/STAR ---
const isActive = slotName === currentDeckSlot;
const activeBtn = document.createElement('button');
activeBtn.innerHTML = isActive ? '⭐ Active' : '☆ Inactive';
activeBtn.className = 'deck-active-btn';
activeBtn.disabled = isActive;
activeBtn.onclick = (e) => {
  e.stopPropagation();
  currentDeckSlot = slotName;
  saveProgress();
  renderDeckSelection();
};
      
if (warningDiv) tile.appendChild(warningDiv);
tile.appendChild(activeBtn);

      tile.onclick = (e) => {
        showDeckTileMenu(slotName, tile);
      };
    } else {
      tile.classList.add('empty');
      tile.textContent = '+ New Deck';
tile.onclick = () => {
  showInputModal({
    title: "Create New Deck",
    label: "Deck name",
    defaultValue: "",
    maxLength: 18,
    placeholder: "Enter deck name",
    confirmText: "Create",
    validate: (val) => {
      if (!val) return "Deck name required.";
      if (deckSlots.includes(val)) return "Deck name already exists!";
      return null;
    },
    onConfirm: function(newName) {
      deckSlots[i] = newName;
      decks[newName] = {};
      currentDeckSlot = newName;
      saveProgress();
      showDeckBuilder();
    }
  });
};
    }
    grid.appendChild(tile);
  }
}
  
function showDeckTileMenu(deckName, anchorElem) {
  // Set content as before
  deckMenuTitle.textContent = deckName;
  updateDeckBanner(deckName);
  updateDeckHighlightArt(deckName);
  updateDeckCardback(deckName);
  const deck = decks[deckName] || {};
  const count = Object.values(deck)
    .filter(v => typeof v === 'number')
    .reduce((a, b) => a + b, 0);
  deckCardCount.textContent = `${count} / 50`;

  // Show as menu
  const menu = document.getElementById('deck-menu');
  menu.style.display = 'block';
  menu.dataset.deckName = deckName;

  // Position near anchorElem
  if (anchorElem) {
    const rect = anchorElem.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let left = rect.right + 12 + scrollX; // 12px to the right
    let top = rect.top + scrollY;

    // If menu would overflow right, show to left of tile
    if (left + menu.offsetWidth > window.innerWidth) {
      left = rect.left - menu.offsetWidth - 12 + scrollX;
      if (left < 0) left = 10;
    }
    // If menu would overflow bottom, adjust up
    if (top + menu.offsetHeight > window.innerHeight) {
      top = window.innerHeight - menu.offsetHeight - 10 + scrollY;
      if (top < 0) top = 10;
    }

    menu.style.left = left + 'px';
    menu.style.top = top + 'px';
    menu.style.transform = ""; // Don't center
  } else {
    // fallback: center
    menu.style.left = "50vw";
    menu.style.top = "50vh";
    menu.style.transform = "translate(-50%, -50%)";
  }
}
document.addEventListener('mousedown', function(e) {
  const menu = document.getElementById('deck-menu');
  if (menu.style.display === 'block' && !menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// RENAME DECK
deckMenuTitle.style.cursor = "pointer";
deckMenuTitle.title = "Rename deck";
deckMenuTitle.onclick = function() {
  const deckName = deckMenu.dataset.deckName;
  showInputModal({
    title: "Rename Deck",
    label: "Deck name",
    defaultValue: deckName,
    maxLength: 18,
    placeholder: "Enter deck name",
    confirmText: "Rename",
    validate: (val) => {
      if (!val) return "Deck name required.";
      if (deckSlots.includes(val) && val !== deckName) return "Deck name already exists!";
      return null;
    },
    onConfirm: function(newName) {
      if (newName === deckName) return;
      let idx = deckSlots.indexOf(deckName);
      let deckData = decks[deckName];
      deckSlots[idx] = newName;
      decks[newName] = deckData;
      delete decks[deckName];
      currentDeckSlot = newName;
      saveProgress();
      renderDeckSelection();
      deckMenuTitle.textContent = newName;
    }
  });
};

// --- HIGHLIGHT CARD ---
const deckHighlightArtImg = document.getElementById('deck-highlight-art-img');
function updateDeckHighlightArt(deckName) {
  const deck = decks[deckName] || {};
  deckHighlightArtImg.onerror = function() {
    this.onerror = null;
    this.src = "CardImages/Domains/placeholder.png";
  };
  deckHighlightArtImg.src = deck.highlightArt || "CardImages/Domains/placeholder.png";
}
deckHighlightArtImg.onclick = function() {
  closeDeckTileMenu();
  highlightArtModal.style.display = "flex";
  highlightArtList.innerHTML = "";

  // Use unlocked avatars if available, fallback to iconOptions if not
  const avatarOptions = Array.isArray(window.playerUnlockedAvatars) && window.playerUnlockedAvatars.length > 0
    ? window.playerUnlockedAvatars
    : (typeof iconOptions !== "undefined" ? iconOptions : []);

  if (avatarOptions.length === 0) {
    highlightArtList.innerHTML = "<div style='color:#eee'>No avatar artwork available.</div>";
    return;
  }

  avatarOptions.forEach(avatarPath => {
    const img = document.createElement('img');
    img.src = avatarPath;
    img.alt = avatarPath.split('/').pop().replace('.png', '');
    img.className = "highlight-art-choice";
    img.title = img.alt;
    img.onclick = () => {
      const deckName = deckMenu.dataset.deckName;
      decks[deckName].highlightArt = avatarPath;
      renderDeckSelection();
      highlightArtModal.style.display = "none";
      closeDeckTileMenu();
      updateDeckHighlightArt(deckName);
      saveProgress();
    };
    highlightArtList.appendChild(img);
  });
};
closeHighlightArtBtn.onclick = () => highlightArtModal.style.display = "none";

// --- BANNER ---
function updateDeckBanner(deckName) {
  const deck = decks[deckName] || {};
  deckBannerImg.onerror = function() {
    this.onerror = null;
    this.src = "CardImages/Banners/DefaultBanner.png";
  };
  deckBannerImg.src = deck.bannerArt || "CardImages/Banners/DefaultBanner.png";
}

// --- NEW: BANNER LOGIC (update to match avatars/cardbacks) ---
deckBannerImg.onclick = function() {
  closeDeckTileMenu();
  deckBannerModal.style.display = "flex";
  deckBannerArtList.innerHTML = "";
  const deckName = deckMenu.dataset.deckName;
  const unlocked = getUnlockedBanners ? getUnlockedBanners() :
    (window.getUnlockedBanners ? window.getUnlockedBanners() : ["CardImages/Banners/DefaultBanner.png"]); 
  if (!unlocked || unlocked.length === 0) {
    deckBannerArtList.innerHTML = "<div style='color:#eee'>No unlocked banners available.</div>";
    return;
  }

  unlocked.forEach(bannerUrl => {
    const img = document.createElement('img');
    img.src = bannerUrl;
    img.alt = bannerUrl.split('/').pop().replace('.png', '');
    img.className = "deck-banner-choice";
    img.title = img.alt;
    img.onclick = () => {
      decks[deckName].bannerArt = bannerUrl;
      saveProgress();
      updateDeckBanner(deckName);
      deckBannerModal.style.display = "none";
      closeDeckTileMenu();
    };
    deckBannerArtList.appendChild(img);
  });
};
closeDeckBannerModalBtn.onclick = () => (deckBannerModal.style.display = "none");
// Update displayed cardback in deck menu
function updateDeckCardback(deckName) {
  const deck = decks[deckName] || {};
  deckCardbackImg.src = deck.cardbackArt || "OtherImages/Cardbacks/CBDefault.png";
}

// --- CARDBACK ---
deckCardbackImg.onclick = function() {
  closeDeckTileMenu();
  deckCardbackModal.style.display = "flex";
  deckCardbackArtList.innerHTML = "";
  const deckName = deckMenu.dataset.deckName;
  const deck = decks[deckName] || {};
  const unlocked = getUnlockedCardbacks ? getUnlockedCardbacks() : 
    (window.getUnlockedCardbacks ? window.getUnlockedCardbacks() : 
      ["OtherImages/Cardbacks/CBDefault.png"]);
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
  deckMenu.style.display = 'none';
}
closeDeckMenuBtn.onclick = closeDeckTileMenu;

deckMenu.addEventListener('click', function(e) {
  if (e.target === deckMenu) closeDeckTileMenu();
});
deckViewModal.addEventListener('click', function(e) {
  if (e.target === deckViewModal) deckViewModal.style.display = 'none';
});

// VIEW DECK BUTTON
const viewDeckImgBtn = document.getElementById('view-deck-img-btn');
if (viewDeckImgBtn) {
  viewDeckImgBtn.onclick = function() {
    const deckName = deckMenu.dataset.deckName;
    showDeckViewModal(deckName);
    closeDeckTileMenu();
  };
}

// EDIT DECK BUTTON
const editDeckImgBtn = document.getElementById('edit-deck-img-btn');
if (editDeckImgBtn) {
  editDeckImgBtn.onclick = function() {
    const deckName = deckMenu.dataset.deckName;
    currentDeckSlot = deckName;
    closeDeckTileMenu();
    showDeckBuilder();
  };
}

// DELETE DECK BUTTON
const deleteDeckImgBtn = document.getElementById('delete-deck-img-btn'); 
if (deleteDeckImgBtn) {
  deleteDeckImgBtn.onclick = function() {
    const deckName = deckMenu.dataset.deckName;
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
}

// VIEW DECK MODAL
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
  
  deckViewModalTitle.innerHTML = `
    <span>${deckName}</span>
    <span style="font-size:0.9em; font-weight:normal; color:#ffe066; margin-left:18px;">
      ${total} / 50 cards
    </span>
  `;  
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
    if (window.renderModePlayerDeckTile) window.renderModePlayerDeckTile();
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
      e.dataTransfer.setData('from', 'gallery');
      e.dataTransfer.setDragImage(div, div.offsetWidth / 2, div.offsetHeight / 2);
      div.classList.add('dragging');
  });
  div.addEventListener('dragend', function(e) {
    div.classList.remove('dragging');
  });
  if (card.rarity) {
    div.setAttribute('data-rarity', card.rarity);
  }
  div.classList.add(getRarityBgClass(card));

    const img = document.createElement('img');
    img.src = card.image;
    img.onerror = function() {
      this.onerror = null;
      this.src = "CardImages/Domains/placeholder.png";
    };
    img.alt = card.name;
  
  // --- Use hold helper for card gallery ---
  const { startHold, clearHold, mouseUp } = makeHoldHandlers(
    () => showFullCardModal(card),
    () => {
      if (canAddCard(card, currentInDeck, ownedCount)) {
        deck[card.id] = (deck[card.id] || 0) + 1;
        setCurrentDeck(deck);
        updateDeckDisplay();
        renderBuilder();
      }
    }
  );
  img.addEventListener('mousedown', startHold);
  img.addEventListener('touchstart', startHold);
  img.addEventListener('mouseup', mouseUp);
  img.addEventListener('touchend', mouseUp);
  img.addEventListener('mouseleave', clearHold);
  img.addEventListener('touchcancel', clearHold);

  div.appendChild(img);

    // OWNED BADGE
    const ownedBadge = document.createElement('div');
    ownedBadge.className = 'card-count-badge';
    ownedBadge.textContent = available;
    div.appendChild(ownedBadge);
      // GRAY OUT IF unavailable
    if (available <= 0 || !canAddCard(card, currentInDeck, ownedCount)) {
        div.classList.add('card-unavailable');
        img.style.pointerEvents = 'none';
    }
      // ==== HOVER ICONS ====
    const hoverIcons = document.createElement('div');
    hoverIcons.className = 'card-hover-icons';

    // Minus icon (lower left)
    const minusBtn = document.createElement('button');
    minusBtn.className = 'card-hover-icon-btn card-hover-minus';
    minusBtn.style.justifyContent = 'flex-start';
    minusBtn.title = 'Remove a copy of this card from deck';
    const minusImg = document.createElement('img');
    minusImg.src = 'OtherImages/Icons/Minus.png';
    minusImg.alt = 'Minus';
    minusBtn.appendChild(minusImg);
    minusBtn.onclick = function(e) {
      e.stopPropagation();
      if (deck[card.id] > 0) {
        deck[card.id]--;
        if (deck[card.id] <= 0) delete deck[card.id];
        setCurrentDeck(deck);
        updateDeckDisplay();
        renderBuilder();
      }
    };
    hoverIcons.appendChild(minusBtn);

  // View icon (center)
  const viewBtn = document.createElement('button');
  viewBtn.className = 'card-hover-icon-btn card-hover-view';
  viewBtn.style.justifyContent = 'center';
  viewBtn.title = 'View card details';
  const viewImg = document.createElement('img');
  viewImg.src = 'OtherImages/Icons/View.png';
  viewImg.alt = 'View';
  viewBtn.appendChild(viewImg);
  viewBtn.onclick = function(e) {
    e.stopPropagation();
    showFullCardModal(card);
  };
  hoverIcons.appendChild(viewBtn);

  // Plus icon (lower right)
  const plusBtn = document.createElement('button');
  plusBtn.className = 'card-hover-icon-btn card-hover-plus';
  plusBtn.style.justifyContent = 'flex-end';
  plusBtn.title = 'Add a copy of this card to deck';
  const plusImg = document.createElement('img');
  plusImg.src = 'OtherImages/Icons/Plus.png';
  plusImg.alt = 'Plus';
  plusBtn.appendChild(plusImg);
  plusBtn.onclick = function(e) {
    e.stopPropagation();
    if (canAddCard(card, currentInDeck, ownedCount)) {
      deck[card.id] = (deck[card.id] || 0) + 1;
      setCurrentDeck(deck);
      updateDeckDisplay();
      renderBuilder();
    }
  };
  hoverIcons.appendChild(plusBtn);
  div.appendChild(hoverIcons);
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
  const from = e.dataTransfer.getData('from');
  if(cardId) {
    if (from === 'gallery') {
      addCardToDeck(cardId);
      updateDeckDisplay();
      renderBuilder();
    }
  }
});
// --- DRAG OUT TO REMOVE FROM DECK PANEL --- //
deckList.addEventListener('dragstart', function(e) {
  // Find the card element being dragged from deckList
  const li = e.target.closest('li.deck-draggable');
  if (!li) return;
  const cardId = li.getAttribute('data-card-id');
  if (cardId) {
    e.dataTransfer.setData('card-id', cardId);
    e.dataTransfer.setData('from', 'deck');
    // Optional: set drag image to card image
    const img = li.querySelector('img');
    if (img) e.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
    li.classList.add('dragging');
  }
});
deckList.addEventListener('dragend', function(e) {
  // If not dropped on deckList, remove card
  const li = e.target.closest('li.deck-draggable');
  if (!li) return;
  li.classList.remove('dragging');
  // Check if drop was outside deckList
  if (e.dataTransfer.dropEffect === 'none') {
    const cardId = li.getAttribute('data-card-id');
    if (cardId) {
      removeCardFromDeck(cardId);
      updateDeckDisplay();
      renderBuilder();
    }
  }
});

// --- Allow dropping cards anywhere in document (to trigger removal if dropped outside deckList) --- //
document.addEventListener('drop', function(e) {
  const cardId = e.dataTransfer.getData('card-id');
  const from = e.dataTransfer.getData('from');
  // If dropped outside of deckList and from deck, remove
  if (from === 'deck' && !e.target.closest('#deck-list')) {
    removeCardFromDeck(cardId);
    updateDeckDisplay();
    renderBuilder();
  }
});
// --- Utility for removing a card from deck (removes one copy) --- //
function removeCardFromDeck(cardId) {
  const deck = getCurrentDeck();
  if (!deck[cardId]) return;
  deck[cardId]--;
  if (deck[cardId] <= 0) delete deck[cardId];
  setCurrentDeck(deck);
}

// DECK CREATION LOGIC
function updateDeckDisplay() {
  const deck = getCurrentDeck();
  deckList.innerHTML = '';
  let total = 0;

  // Group cards by category
  const sections = {
    dominion: [],
    champion: [],
    creature: [],
    artifact: [],
    spell: [],
    domain: []
  };

  for (const [id, count] of Object.entries(deck)) {
    const card = dummyCards.find(c => c.id === id);
    if (!card) continue;
  const trait = card.trait ? card.trait.toLowerCase() : '';
  if (trait === "dominion") {
    sections.dominion.push({ card, count });
  } else if (trait === "champion") {
    sections.champion.push({ card, count });
  } else {
    const cat = getCardCategory(card);
    if (sections.hasOwnProperty(cat)) {
      sections[cat].push({ card, count });
    }
  }
    total += count;
  }
  // Section display order
  const sectionNames = [
    { key: "dominion", label: "Dominion" },
    { key: "champion", label: "Champion" },
    { key: "creature", label: "Creatures" },
    { key: "artifact", label: "Artifacts" },
    { key: "spell", label: "Spells" },
    { key: "domain", label: "Domains" }
  ];
  // Define rarity order
  const rarityOrder = {
    legendary: 0,
    epic: 1,
    rare: 2,
    common: 3
  };
  
  for (const {key, label} of sectionNames) {
    if (sections[key].length === 0) continue;
    // Sort by rarity first (legendary -> epic -> rare -> common), then by card name
    sections[key].sort((a, b) => {
      const ra = (a.card.rarity || '').toLowerCase();
      const rb = (b.card.rarity || '').toLowerCase();
      const orderA = rarityOrder.hasOwnProperty(ra) ? rarityOrder[ra] : 99;
      const orderB = rarityOrder.hasOwnProperty(rb) ? rarityOrder[rb] : 99;
      if (orderA !== orderB) return orderA - orderB;
      // Secondary: sort by name if same rarity
      return a.card.name.localeCompare(b.card.name);
    });
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
      li.classList.add('deck-draggable');
      li.setAttribute('data-card-id', card.id);
      li.setAttribute('draggable', 'true');
      // --- Use hold helper for deck list ---
      const { startHold, clearHold, mouseUp } = makeHoldHandlers(
        () => showFullCardModal(card),
        () => {
          removeCardFromDeck(card.id);
          updateDeckDisplay();
          renderBuilder();
        }
      );
      li.addEventListener('mousedown', startHold);
      li.addEventListener('touchstart', startHold);
      li.addEventListener('mouseup', mouseUp);
      li.addEventListener('touchend', mouseUp);
      li.addEventListener('mouseleave', clearHold);
      li.addEventListener('touchcancel', clearHold);
      // Drag support for removing
      li.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('card-id', card.id);
        e.dataTransfer.setData('from', 'deck');
        if (li.querySelector('img')) {
          const img = li.querySelector('img');
          e.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
        }
        li.classList.add('dragging');
      });
      li.addEventListener('dragend', function(e) {
        li.classList.remove('dragging');
        // If not dropped on deckList, remove card
        // (Handed by global drop listener)
      });
    
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.style.width = '56px';
      img.style.height = 'auto';
      img.style.display = 'block';

      // COUNTER BADGE
      const badge = document.createElement('span');
      badge.textContent = `×${count}`;
      badge.className = 'deck-count-badge';

      li.appendChild(img);
      li.appendChild(badge);
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
  if (count >= ownedCount) return false;
  // Rarity limits
  if (card.rarity && card.rarity.toLowerCase() === 'legendary' && count >= 1) return false;
  if (card.rarity && card.rarity.toLowerCase() === 'epic' && count >= 2) return false;
  if (card.rarity && card.rarity.toLowerCase() === 'rare' && count >= 3) return false;
  if (card.rarity && card.rarity.toLowerCase() === 'common' && count >= 4) return false;
  if (card.trait && card.trait.toLowerCase() === 'dominion') {
    for (const cardId in deck) {
      const c = dummyCards.find(dc => dc.id === cardId);
      if (c && c.trait && c.trait.toLowerCase() === 'dominion') return false;
    }
    if (count >= 1) return false;
  }
  return true;
}
function addCardToDeck(cardId) {
  const deck = getCurrentDeck();
  const card = dummyCards.find(c => c.id === cardId);
  if (!card) return;
  const ownedCount = getCollection()[cardId] || 0;
  const currentInDeck = deck[cardId] || 0;
  if (!canAddCard(card, currentInDeck, ownedCount)) return;
  deck[cardId] = (deck[cardId] || 0) + 1;
  setCurrentDeck(deck);
}

// Dropdown open/close logic
document.querySelectorAll('#filters-builder .filter-dropdown .filter-label').forEach(label => {
  label.onclick = function(e) {
    e.stopPropagation();
    document.querySelectorAll('#filters-builder .filter-dropdown').forEach(dd => dd.classList.remove('open'));
    label.parentElement.classList.toggle('open');
  };
});

// Checkbox logic for builder filters
document.querySelectorAll('#filters-builder .filter-dropdown .filter-option input[type="checkbox"]').forEach(cb => {
  cb.onchange = function(e) {
    const dropdown = cb.closest('.filter-dropdown');
    let vals = Array.from(dropdown.querySelectorAll('input[type="checkbox"]:checked')).map(inp => inp.value).filter(Boolean);

    if (cb.value === "") {
      // "All" was toggled
      if (cb.checked) {
        dropdown.querySelectorAll('input[type="checkbox"]').forEach(inp => { if (inp.value !== "") inp.checked = false; });
        vals = [];
      }
    } else {
      // If any specific option checked, uncheck "All"
      dropdown.querySelector('input[type="checkbox"][value=""]').checked = false;
    }
    updateFilterLabel(dropdown, vals);
    renderBuilder();
  };
});

// Close dropdowns on click elsewhere
document.body.onclick = function() {
  document.querySelectorAll('#filters-builder .filter-dropdown').forEach(dd => dd.classList.remove('open'));
};
function updateBuilderFilterSummary() {
  // Filter dropdowns to include in summary
  const filterDropdownIds = [
    'filter-rarity-builder-dropdown',
    'filter-color-builder-dropdown',
    'filter-type-builder-dropdown',
    'filter-trait-builder-dropdown',
    'filter-archetype-builder-dropdown',
    'filter-ability-builder-dropdown',
    'filter-category-builder-dropdown'
  ];
  let filterInfoArray = [];
  filterDropdownIds.forEach(id => {
    const vals = getFilterDropdownValues(id);
    if (vals.length > 0) filterInfoArray.push(...vals);
  });

  // Name filter
  const nameInput = document.getElementById('filter-name-builder');
  const nameFilter = nameInput ? nameInput.value.trim() : "";
  if (nameFilter) filterInfoArray.push(nameFilter);

  // Compose summary text
  const summaryDiv = document.getElementById('builder-filter-summary');
  if (!summaryDiv) return;
  if (filterInfoArray.length) {
    summaryDiv.innerHTML = `<b>${filterInfoArray.join(' ')}</b>`;
  } else {
    summaryDiv.innerHTML = "";
  }
}
function renderBuilder() {
    builderGallery.innerHTML = '';
    const collection = getCollection();
    const nameFilter = document.getElementById('filter-name-builder').value.toLowerCase();
    const favoriteIds = getFavoriteCards ? getFavoriteCards() : [];
    const selectedColors = getFilterDropdownValues('filter-color-builder-dropdown').map(x => x.toLowerCase());
    const selectedTypes = getFilterDropdownValues('filter-type-builder-dropdown').map(x => x.toLowerCase());
    const selectedRarities = getFilterDropdownValues('filter-rarity-builder-dropdown').map(x => x.toLowerCase());
    const selectedArchetypes = getFilterDropdownValues('filter-archetype-builder-dropdown').map(x => x.toLowerCase());
    const selectedTraits = getFilterDropdownValues('filter-trait-builder-dropdown').map(x => x.toLowerCase());
    const selectedAbilities = getFilterDropdownValues('filter-ability-builder-dropdown').map(x => x.toLowerCase());
    const selectedCategories = getFilterDropdownValues('filter-category-builder-dropdown').map(x => x.toLowerCase());

let filteredCards = filterCards({
  collection,
  favoriteIds,
  showFavoritesOnly: showFavoritesOnlyBuilder,
  nameFilter,
  selectedColors,
  selectedCategories,
  selectedTypes,
  selectedRarities,
  selectedTraits,
  selectedArchetypes,
  selectedAbilities,
  selectedPacks: filterState.builder.pack || [], 
  selectedOwnerships: ['Owned'] 
});
  updateBuilderFilterSummary();
  filteredCards
  .filter(card => collection[card.id] && collection[card.id] > 0)
  .forEach(card => {
    builderGallery.appendChild(createCardBuilder(card, collection[card.id]));
  });
}
function makeHoldHandlers(onHold, onClick, holdTime = 400) {
  let holdTimer = null;
  let longHoldTriggered = false;

  function startHold(e) {
    longHoldTriggered = false;
    holdTimer = setTimeout(() => {
      longHoldTriggered = true;
      onHold(e);
    }, holdTime);
  }
  function clearHold(e) {
    if (holdTimer) clearTimeout(holdTimer);
  }
  function mouseUp(e) {
    clearHold();
    if (!longHoldTriggered) {
      onClick(e);
    }
  }
  return { startHold, clearHold, mouseUp };
}
function updateFavoriteFilterIconBuilder() {
  const favIcon = document.getElementById('filter-favorites-builder');
  if (!favIcon) return;
  if (showFavoritesOnlyBuilder) {
    favIcon.style.filter = 'none';
    favIcon.style.opacity = '1';
    favIcon.title = 'Showing favorites';
  } else {
    favIcon.style.filter = 'grayscale(1)';
    favIcon.style.opacity = '0.6';
    favIcon.title = 'Show only favorites';
  }
}
// Add this helper if not present, or ensure your change tracking function is correct:
function deckBuilderHasUnsavedChanges() {
  const deckId = currentDeckSlot || selectedDeckId;
  if (!deckId) return false;
  // There is a draft in localStorage, assume unsaved changes exist
  return !!localStorage.getItem(`deckbuilder_draft_${deckId}`);
}
// Setup event listener for builder favorite icon (on DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
  const favIcon = document.getElementById('filter-favorites-builder');
  if (favIcon) {
    favIcon.onclick = function() {
      showFavoritesOnlyBuilder = !showFavoritesOnlyBuilder;
      updateFavoriteFilterIconBuilder();
      renderBuilder();
    };
    updateFavoriteFilterIconBuilder();
  }
});
// ==========================
// === EVENT LISTENERS ===
// ==========================
document.addEventListener("DOMContentLoaded", function() {
  const deckSelectionBackBtn = document.getElementById('deck-selection-back-btn');
  if (deckSelectionBackBtn) {
    deckSelectionBackBtn.onclick = function() {
      document.getElementById('builder-section').classList.remove('active');
      document.getElementById('home-section').classList.add('active');
    };
  }
});
// Banner modal: close when clicking outside modal content
deckBannerModal.addEventListener('mousedown', function(e) {
  // Only close if clicking the overlay, not a child
  if (e.target === deckBannerModal) {
    deckBannerModal.style.display = "none";
  }
});

// Cardback modal: close when clicking outside modal content
deckCardbackModal.addEventListener('mousedown', function(e) {
  if (e.target === deckCardbackModal) {
    deckCardbackModal.style.display = "none";
  }
});

// Highlight card modal: close when clicking outside modal content
highlightArtModal.addEventListener('mousedown', function(e) {
  if (e.target === highlightArtModal) {
    highlightArtModal.style.display = "none";
  }
});
// GALLERY EVENT FILTERS
document.getElementById('filter-name-builder').addEventListener('input', renderBuilder);
  
const resetBtn = document.getElementById('reset-builder-filters-btn');
if (resetBtn) {
  resetBtn.onclick = function() {
    // Clear the text filter
    document.getElementById('filter-name-builder').value = "";
    // Reset all dropdowns to "All"
    document.querySelectorAll('#filters-builder .filter-dropdown').forEach(dd => {
      // check "All"
      dd.querySelector('input[type="checkbox"][value=""]').checked = true;
      // uncheck others
      dd.querySelectorAll('input[type="checkbox"]:not([value=""])').forEach(cb => cb.checked = false);
      updateFilterLabel(dd, []);
    });
    // Reset favorites filter
    showFavoritesOnlyBuilder = false;
    updateFavoriteFilterIconBuilder();
    renderBuilder();
  };
}
// ==========================
// === INITIALIZATION ===
// ==========================
window.updateDeckDisplay = updateDeckDisplay;
window.renderBuilder = renderBuilder;
window.buildDeck = buildDeck;
window.getCurrentDeck = getCurrentDeck;
window.showDeckSelection = showDeckSelection;
window.showDeckTileMenu = showDeckTileMenu;

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
