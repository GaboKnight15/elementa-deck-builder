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

let deckBuilderDraft = null;   // null = not currently editing; object = current draft mapping cardId->count
let deckBuilderDirty = false;  // true when draft differs from saved deck
let showFavoritesOnlyBuilder = false;

// Cardback options (expand as needed)
const cardbackOptions = [
  'Images/Cardback/Default.png',
  'Images/Cardback/Cardback1.png',
  'Images/Cardback/Fairy.png',
  'Images/Cardback/Cindercore.png',
  'Images/Cardback/Construct.png',
  'Images/Cardback/Coralbound.png',
  'Images/Cardback/Fireland.png',
  'Images/Cardback/Goblin.png',
  'Images/Cardback/Golemheart.png',
  'Images/Cardback/Merfolk.png',
  'Images/Cardback/Moonfang.png',
  'Images/Cardback/Satyr.png',
  'Images/Cardback/Obscurid.png',
  'Images/Cardback/Stonebound.png',
  'Images/Cardback/Stormcore.png',
  'Images/Cardback/Plagueaxis.png',
  'Images/Cardback/Woodframe.png'
];
const AUTOFILL_COLORS = [
  { name: "Green", icon: 'Icons/Essence/Green.png' },
  { name: "Red", icon: 'Icons/Essence/Red.png' },
  { name: "Blue", icon: 'Icons/Essence/Blue.png' },
  { name: "White", icon: 'Icons/Essence/White.png' },
  { name: "Black", icon: 'Icons/Essence/Black.png' },
  { name: "Yellow", icon: 'Icons/Essence/Yellow.png' },
  { name: "Gray", icon: 'Icons/Essence/Gray.png' },
  { name: "Purple", icon: 'Icons/Essence/Purple.png' },
];
const AUTOFILL_TYPES = [
  "Beast", "Brute", "Construct", "Demon", "Dragon", "Elemental", "Faefolk", "Undead"
];
const AUTOFILL_ARCHETYPES = [
  "Abyssdrake","Blazefeather","Blazingscale","Cindercore","Coralbound","Corruptor","Duskwing","Dwarf","Elf","Fireland",
  "Frostland","Goblin","Hydral","Golemheart","Moonfang","Orc","Plagueaxis","Pyroclast","Satyr","Skullframe","Stormrazor",
  "Thornwing","Voltwing","Zephyra"
];

// Show modal when autofill icon clicked

document.getElementById('filter-name-builder').addEventListener('input', renderBuilder);
document.getElementById('builder-filter-btn').onclick = function(e) {
  openFiltersMasterMenu('builder', e.target);
};
document.getElementById('builder-autofill-btn').onclick = function() {
  showAutofillModal();
};
document.getElementById('builder-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
// Add this at the top or with your other DOMContentLoaded inits
document.addEventListener('DOMContentLoaded', function() {
  const builderFilterBtn = document.getElementById('open-filters-menu-builder');
  if (builderFilterBtn) {
    builderFilterBtn.onclick = function(e) {
      openFiltersMasterMenu('builder', e.target);
    };
  }
});
window.addEventListener('beforeunload', function(e) {
  if (deckBuilderDirty) {
    const confirmationMessage = 'You have unsaved changes. Changes made will NOT be saved. Proceed anyway?';
    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
    return confirmationMessage; // Webkit, etc.
  }
});
if (builderBackBtn) {
  builderBackBtn.addEventListener('click', function (ev) {
    // If there are unsaved changes, confirm before leaving
    if (typeof deckBuilderDirty !== 'undefined' && deckBuilderDirty) {
      const ok = confirm("Changes made will not be saved. Proceed anyway?");
      if (!ok) {
        return; // user cancelled, stay in builder
      }
      // user confirmed — discard draft so UI reflects saved deck
      if (typeof discardDeckDraft === 'function') discardDeckDraft();
    }
    // Navigate back to deck selection (explicit, reliable)
    if (typeof showDeckSelection === 'function') {
      showDeckSelection();
    } else {
      // Fallback: hide builder UI and show deck-selection elements manually
      const dsHeader = document.getElementById('deck-selection-header');
      const builderHeader = document.getElementById('builder-header');
      if (dsHeader) dsHeader.style.display = 'flex';
      if (builderHeader) builderHeader.style.display = 'none';
      if (deckSelectionGrid) deckSelectionGrid.style.display = '';
      if (deckBuilderUI) deckBuilderUI.style.display = 'none';
      if (builderContainer) builderContainer.classList.add('flex-layout');
    }
  });
}
function deckBuilderHasUnsavedChanges() {
  return !!deckBuilderDirty;
}
// SAVING DECK
// Update save handler to commit a draft if present
const saveDeckImg = document.getElementById('save-deck-img') || document.getElementById('save-deck-btn');
if (saveDeckImg) {
  saveDeckImg.onclick = function() {
    // Validate dominion count on the draft (if editing) or the saved deck if not
    const deckToCheck = deckBuilderDraft !== null ? deckBuilderDraft : (getCurrentDeck() || {});
    const dominionCount = Object.entries(deckToCheck).reduce((sum, [cardId, count]) => {
      const card = dummyCards.find(c => c.id === cardId);
      return sum + ((card && card.trait && String(card.trait).toLowerCase() === 'dominion') ? Number(count) : 0);
    }, 0);
    if (dominionCount !== 1) {
      showToast("Deck must have exactly one Dominion card.", { type: "error" });
      return;
    }

    // If a draft exists, commit it; otherwise fall back to saving as before
    if (deckBuilderDraft !== null) {
      commitDeckDraft();
      showToast("Deck saved!", { type: "success" });
    } else {
      // original save behavior (in case other code calls save when not editing)
      saveProgress();
      showToast("Deck saved!", { type: "success" });
    }
  };
}
const deckSelectionSettingsBtn = document.getElementById('deck-selection-settings-btn');
if (deckSelectionSettingsBtn) {
  deckSelectionSettingsBtn.onclick = function() {
    const settingsMenu = document.getElementById('settings-menu-pop');
    if (settingsMenu) {
      settingsMenu.style.display = 'block';
      settingsMenu.classList.add('active');
      // Optionally, position it next to the button if needed
    }
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
  if (currentDeckSlot) startDeckEditing(currentDeckSlot);
  updateDeckDisplay();
  renderBuilder();
}

function renderDeckSelection() {
  const grid = document.getElementById('deck-selection-grid');
  grid.innerHTML = '';

  // 12 slots //
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
         src="${deck.cardbackArt || 'Images/Cardback/Default.png'}"
         alt="Cardback"
         style="position:absolute;right:8px;bottom:8px;width:32px;height:44px;z-index:10;">
  `;
} else {
  tile.textContent = slotName;
}
      // --- CARD COUNT WARNING MESSAGE --- //
// Card count warning message
let warningDiv = null;

if (count < 30) {
  warningDiv = document.createElement('div');
  warningDiv.className = 'deck-slot-warning';
  warningDiv.textContent = "Less than 30 cards"; // Existing message
} else if (count > 30) {
  warningDiv = document.createElement('div');
  warningDiv.className = 'deck-slot-warning deck-slot-error'; // Add a new CSS class if needed
  warningDiv.textContent = "More than 30 cards";
}
      
if (warningDiv) tile.appendChild(warningDiv);
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
  deckCardCount.textContent = `${count} / 30`;

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
    this.src = 'Images/Other/Placeholder.png';
  };
  deckHighlightArtImg.src = deck.highlightArt || 'Images/Domain/Default.png';
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
    this.src = 'Images/Banner/Default.png';
  };
  deckBannerImg.src = deck.bannerArt || 'Images/Banner/Default.png';
}

// --- NEW: BANNER LOGIC (update to match avatars/Cardback) ---
deckBannerImg.onclick = function() {
  closeDeckTileMenu();
  deckBannerModal.style.display = "flex";
  deckBannerArtList.innerHTML = "";
  const deckName = deckMenu.dataset.deckName;
  const unlocked = getUnlockedBanners ? getUnlockedBanners() :
    (window.getUnlockedBanners ? window.getUnlockedBanners() : ['Images/Banner/Default.png']); 
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
      renderDeckSelection();
    };
    deckBannerArtList.appendChild(img);
  });
};
closeDeckBannerModalBtn.onclick = () => (deckBannerModal.style.display = "none");
// Update displayed cardback in deck menu
function updateDeckCardback(deckName) {
  const deck = decks[deckName] || {};
  deckCardbackImg.src = deck.cardbackArt || 'Images/Cardback/Default.png';
}

// --- CARDBACK --- //
deckCardbackImg.onclick = function() {
  closeDeckTileMenu();
  deckCardbackModal.style.display = "flex";
  deckCardbackArtList.innerHTML = "";
  const deckName = deckMenu.dataset.deckName;
  const deck = decks[deckName] || {};
  const unlocked = getUnlockedCardbacks ? getUnlockedCardbacks() : 
    (window.getUnlockedCardbacks ? window.getUnlockedCardbacks() : 
      ['Images/Cardback/Default.png']);
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
      renderDeckSelection();
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
// Adds a fallback to read DEFAULT_CPU_DECKS (or window.DEFAULT_CPU_DECKS
// or window.selectedPlayerDeck) when no card entries are found in the saved deck.
function showDeckViewModal(deckName) {
  // Keep original behavior: prefer saved decks mapping
  deckViewModalTitle.textContent = deckName;
  deckViewModalList.innerHTML = "";
  const savedDeck = (typeof decks !== 'undefined' && decks[deckName]) ? decks[deckName] : {};
  let total = 0;
  let rendered = 0;

  // Render mapping-style deck entries (cardId -> count) — unchanged logic
  for (const [id, count] of Object.entries(savedDeck)) {
    const card = dummyCards.find(c => c.id === id);
    if (!card) continue;

    const wrapper = document.createElement('div');
    wrapper.className = 'modal-card-wrapper';

    const img = document.createElement('img');
    img.className = 'modal-card-img';
    img.src = card.image;
    img.alt = card.name || '';
    (function(cardCopy){ img.onclick = function(e){ e.stopPropagation(); showFullCardModal(cardCopy); }; })(card);

    wrapper.appendChild(img);

    const badge = document.createElement('div');
    badge.textContent = `x${count}`;
    badge.className = 'deck-card-count-badge';
    wrapper.appendChild(badge);

    deckViewModalList.appendChild(wrapper);
    total += Number(count) || 0;
    rendered++;
  }

  // If nothing rendered from savedDeck, try to locate a DEFAULT_CPU_DECKS entry
  // or the window.selectedPlayerDeck (which may contain the default deck object).
  if (rendered === 0) {
    var fallbackDeckObj = null;

    // 1) Check window.selectedPlayerDeck if it matches the name/id
    if (window && window.selectedPlayerDeck) {
      var sp = window.selectedPlayerDeck;
      if (sp.id === deckName || sp.name === deckName) {
        fallbackDeckObj = sp.deckObj || sp;
      }
    }

    // 2) Check global DEFAULT_CPU_DECKS (module-level) if present
    if (!fallbackDeckObj) {
      var cpuList = null;
      if (window && window.DEFAULT_CPU_DECKS) cpuList = window.DEFAULT_CPU_DECKS;
      else if (typeof DEFAULT_CPU_DECKS !== 'undefined') cpuList = DEFAULT_CPU_DECKS;
      if (Array.isArray(cpuList)) {
        for (var i = 0; i < cpuList.length; i++) {
          var candidate = cpuList[i];
          if (!candidate) continue;
          if (candidate.id === deckName || candidate.name === deckName) {
            fallbackDeckObj = candidate;
            break;
          }
        }
      }
    }

    // If we found a fallback and it has a .cards array (DEFAULT_CPU_DECKS style), render it
    if (fallbackDeckObj && Array.isArray(fallbackDeckObj.cards) && fallbackDeckObj.cards.length > 0) {
      for (var j = 0; j < fallbackDeckObj.cards.length; j++) {
        var entry = fallbackDeckObj.cards[j];
        if (!entry || !entry.id) continue;
        var cardEntry = dummyCards.find(function(c) { return c.id === entry.id; });
        if (!cardEntry) continue;

        var wrap = document.createElement('div');
        wrap.className = 'modal-card-wrapper';

        var im = document.createElement('img');
        im.className = 'modal-card-img';
        im.src = cardEntry.image;
        im.alt = cardEntry.name || '';
        (function(cardCopy){ im.onclick = function(e){ e.stopPropagation(); showFullCardModal(cardCopy); }; })(cardEntry);
        wrap.appendChild(im);

        var b = document.createElement('div');
        var amt = Number(entry.amount) || 0;
        b.textContent = 'x' + amt;
        b.className = 'deck-card-count-badge';
        wrap.appendChild(b);

        deckViewModalList.appendChild(wrap);
        total += amt;
        rendered++;
      }
    }
  }

  // If still nothing rendered, show an informative message (helps debugging)
  if (rendered === 0) {
    var emptyMsg = document.createElement('div');
    emptyMsg.style.color = '#ffe066';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.padding = '18px';
    emptyMsg.textContent = 'No cards found for this deck.';
    deckViewModalList.appendChild(emptyMsg);
  }

  // Show modal and update title (total)
  deckViewModal.style.display = 'flex';
  deckViewModalTitle.innerHTML = `
    <span>${deckName || 'Deck'}</span>
    <span style="font-size:0.9em; font-weight:normal; color:#ffe066; margin-left:18px;">
      ${total} / 30 cards
    </span>
  `;
}
closeDeckViewModalBtn.classList.add('btn-negative-secondary');
closeDeckViewModalBtn.onclick = function() {
  deckViewModal.style.display = 'none';
};

function getCurrentDeck() {
  // Return the draft while editing, otherwise the saved deck
  if (deckBuilderDraft !== null) return deckBuilderDraft;
  return decks[currentDeckSlot] || {};
}

function setCurrentDeck(deckObj) {
  // If editing, update the draft and mark dirty; otherwise update the saved deck as before
  if (deckBuilderDraft !== null) {
    deckBuilderDraft = deckObj || {};
    deckBuilderDirty = true;
    // update UI to reflect changes
    updateDeckDisplay();
    renderBuilder();
  } else {
    decks[currentDeckSlot] = deckObj;
    if (window.renderModePlayerDeckTile) window.renderModePlayerDeckTile();
  }
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
      this.src = 'Images/Domain/Default.png';
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
    minusImg.src = 'Icons/Other/Minus.png';
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
  viewImg.src = 'Icons/Other/View.png';
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
  plusImg.src = 'Icons/Other/Plus.png';
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
function startDeckEditing(slotName) {
  // Start editing the given deck slot by cloning the saved deck into the draft.
  deckBuilderDraft = JSON.parse(JSON.stringify(decks[slotName] || {}));
  deckBuilderDirty = false;
  currentDeckSlot = slotName;
}

function discardDeckDraft() {
  // Cancel editing and discard the draft.
  deckBuilderDraft = null;
  deckBuilderDirty = false;
  // Re-render UI from the saved deck
  updateDeckDisplay();
  renderBuilder();
}

function commitDeckDraft() {
  // Commit draft into the authoritative decks object and persist
  if (!currentDeckSlot) return;
  decks[currentDeckSlot] = JSON.parse(JSON.stringify(deckBuilderDraft || {}));
  deckBuilderDirty = false;
  deckBuilderDraft = null;
  saveProgress(); // existing persistence method in your codebase
  // Refresh UIs
  renderDeckSelection();
  updateDeckDisplay();
  renderBuilder();
}
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
  // Use the UL deck-list as before
  if (!deckList) return;
  deckList.innerHTML = '';
  let total = 0;

  // Group cards by category
  const sections = {
    dominion: [],
    creature: [],
    artifact: [],
    spell: [],
    domain: []
  };

  for (const [id, count] of Object.entries(deck)) {
    const card = dummyCards.find(c => c.id === id);
    if (!card) continue;
    const trait = card.trait ? String(card.trait).toLowerCase() : '';
    if (trait === "dominion") {
      sections.dominion.push({ card, count });
    } else {
      const cat = getCardCategory(card);
      if (sections.hasOwnProperty(cat)) {
        sections[cat].push({ card, count });
      } else {
        // fallback to creature if unknown
        sections.creature.push({ card, count });
      }
    }
    total += count;
  }

  // Section display order
  const sectionNames = [
    { key: "dominion", label: "Dominion" },
    { key: "creature", label: "Creatures" },
    { key: "artifact", label: "Artifacts" },
    { key: "spell", label: "Spells" },
    { key: "domain", label: "Domains" }
  ];

  // Define rarity order
  const rarityOrder = {
    legendary: 0,
    rare: 1,
    common: 2
  };

  // Helper to create list item (image + badge) — same behavior as before but condensed
  function makeTileLI(card, count) {
    const li = document.createElement('li');
    li.classList.add('deck-draggable');
    li.setAttribute('data-card-id', card.id);
    li.setAttribute('draggable', 'true');
    li.style.position = li.style.position || 'relative';

    // Hold handlers (preview/remove on hold/click)
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

    // Drag handlers
    li.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('card-id', card.id);
      e.dataTransfer.setData('from', 'deck');
      const img = li.querySelector('img');
      if (img) e.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
      li.classList.add('dragging');
    });
    li.addEventListener('dragend', function(e) {
      li.classList.remove('dragging');
    });

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name || '';
    img.className = 'deck-list-thumb';
    img.style.width = '64px';
    img.style.height = 'auto';
    img.style.display = 'block';
    li.appendChild(img);

    // Counter badge
    const badge = document.createElement('span');
    badge.className = 'deck-count-badge';
    badge.textContent = `×${count}`;
    badge.setAttribute('role', 'status');
    badge.setAttribute('aria-label', `${count} copies in deck`);
    badge.title = `${count} in deck`;
    li.appendChild(badge);

    return li;
  }

  // Iterate sections and append items; insert divider LI between non-empty sections
  for (let sIndex = 0; sIndex < sectionNames.length; sIndex++) {
    const { key } = sectionNames[sIndex];
    const items = sections[key] || [];
    if (items.length === 0) continue;

    // sort items by rarity then name
    items.sort((a, b) => {
      const ra = (a.card.rarity || '').toLowerCase();
      const rb = (b.card.rarity || '').toLowerCase();
      const orderA = rarityOrder.hasOwnProperty(ra) ? rarityOrder[ra] : 99;
      const orderB = rarityOrder.hasOwnProperty(rb) ? rarityOrder[rb] : 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.card.name.localeCompare(b.card.name);
    });

    // Append tile items for this section
    for (const { card, count } of items) {
      const li = makeTileLI(card, count);
      deckList.appendChild(li);
    }

    // Add a divider between groups if there is a later non-empty section
    let hasLater = false;
    for (let j = sIndex + 1; j < sectionNames.length; j++) {
      if ((sections[sectionNames[j].key] || []).length > 0) {
        hasLater = true;
        break;
      }
    }
    if (hasLater) {
      const divLi = document.createElement('li');
      divLi.className = 'deck-list-divider';
      divLi.setAttribute('aria-hidden', 'true');
      deckList.appendChild(divLi);
    }
  }

  // Update total in both possible UI elements (compat)
  const cardCountEl = document.getElementById('card-count');
  if (cardCountEl) cardCountEl.textContent = total;
  const deckCardCountEl = document.getElementById('deck-card-count');
  if (deckCardCountEl) deckCardCountEl.textContent = `${total} / 30`;
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

  if (total >= 30) return false;
  if (count >= ownedCount) return false;
  // Rarity limits
  if (card.rarity && card.rarity.toLowerCase() === 'legendary' && count >= 1) return false;
  if (card.rarity && card.rarity.toLowerCase() === 'rare' && count >= 2) return false;
  if (card.rarity && card.rarity.toLowerCase() === 'common' && count >= 3) return false;
  if (typeof isDominion === 'function' && isDominion(card)) {
    for (const cardId in deck) {
      const c = dummyCards.find(dc => dc.id === cardId);
      if (c && typeof isDominion === 'function' && isDominion(c)) return false;
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
// --- AUTOFILL FUNCTION ---
function showAutofillModal() {
  const modal = document.getElementById('autofill-modal');
  // Clear old
  modal.querySelector('.autofill-color-row').innerHTML = '';
  modal.querySelector('.autofill-type-row').innerHTML = '';
  modal.querySelector('.autofill-archetype-row').innerHTML = '';

  // Color icons
  AUTOFILL_COLORS.forEach(color => {
    const icon = document.createElement('img');
    icon.src = color.icon;
    icon.alt = color.name;
    icon.title = color.name;
    icon.className = 'autofill-color-icon';
    icon.dataset.color = color.name;
    icon.onclick = function() {
      icon.classList.toggle('selected');
    };
    modal.querySelector('.autofill-color-row').appendChild(icon);
  });

  // Type buttons
  AUTOFILL_TYPES.forEach(type => {
    const btn = document.createElement('button');
    btn.textContent = type;
    btn.className = 'autofill-type-btn';
    btn.dataset.type = type;
    btn.onclick = function() {
      btn.classList.toggle('selected');
    };
    modal.querySelector('.autofill-type-row').appendChild(btn);
  });

  // Archetype buttons
  AUTOFILL_ARCHETYPES.forEach(arch => {
    const btn = document.createElement('button');
    btn.textContent = arch;
    btn.className = 'autofill-archetype-btn';
    btn.dataset.archetype = arch;
    btn.onclick = function() {
      btn.classList.toggle('selected');
    };
    modal.querySelector('.autofill-archetype-row').appendChild(btn);
  });

  // Confirm
  document.getElementById('autofill-confirm-btn').onclick = function() {
    // Gather selected
    const selectedColors = Array.from(modal.querySelectorAll('.autofill-color-icon.selected')).map(img => img.dataset.color);
    const selectedTypes = Array.from(modal.querySelectorAll('.autofill-type-btn.selected')).map(btn => btn.dataset.type);
    const selectedArchetypes = Array.from(modal.querySelectorAll('.autofill-archetype-btn.selected')).map(btn => btn.dataset.archetype);

    modal.style.display = 'none';
    autofillDeck({colors: selectedColors, types: selectedTypes, archetypes: selectedArchetypes});
    updateDeckDisplay();
    renderBuilder();
  };
  document.getElementById('autofill-cancel-btn').onclick = function() {
    modal.style.display = 'none';
  };

  modal.style.display = 'flex';
}

// Themed autofill logic
function autofillDeck({colors, types, archetypes}) {
  const MAX_DECK_SIZE = 30;
  const MAX_COPIES = 3;
  setCurrentDeck({});
  let deck = {};
  let total = 0;

  // Filtering helpers
  function cardMatchesTheme(card) {
    // Color match (if any selected)
    if (colors.length) {
      const cardColors = getCardColors(card).map(c => c.toLowerCase());
      if (!colors.some(sel => cardColors.includes(sel.toLowerCase()))) return false;
    }
    // Type match (if any selected)
    if (types.length) {
      const cardTypes = getCardTypes(card).map(c => c.toLowerCase());
      if (!types.some(sel => cardTypes.includes(sel.toLowerCase()))) return false;
    }
    // Archetype match (if any selected)
    if (archetypes.length) {
      const cardArchetypes = getCardArchetypes(card).map(c => c.toLowerCase());
      if (!archetypes.some(sel => cardArchetypes.includes(sel.toLowerCase()))) return false;
    }
    return true;
  }

  // Get all cards from collection (or dummyCards for demo)
  const dominions = dummyCards.filter(
    c => c.trait && c.trait.toLowerCase() === 'dominion' && cardMatchesTheme(c)
  );
  const creatures = dummyCards.filter(
    c => getCardCategory(c) === 'creature' && cardMatchesTheme(c)
  );
  const spells = dummyCards.filter(
    c => getCardCategory(c) === 'spell' && cardMatchesTheme(c)
  );
  const artifacts = dummyCards.filter(
    c => getCardCategory(c) === 'artifact' && cardMatchesTheme(c)
  );
  const domains = dummyCards.filter(
    c => getCardCategory(c) === 'domain' && !(c.trait && c.trait.toLowerCase() === 'dominion') && cardMatchesTheme(c)
  );

  // Shuffle helper
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 1 Dominion
  if (dominions.length > 0) {
    const dom = shuffle([...dominions])[0];
    deck[dom.id] = 1;
    total++;
  }

  // Fill order and counts
  const fillOrder = [
    { arr: creatures, max: 27 },
    { arr: spells, max: 10 },
    { arr: artifacts, max: 5 },
    { arr: domains, max: 5 }
  ];

  for (const { arr, max } of fillOrder) {
    shuffle(arr).forEach(card => {
      if (total >= MAX_DECK_SIZE) return;
      if (deck[card.id] && deck[card.id] >= MAX_COPIES) return;
      let count = Math.min(MAX_COPIES, max, MAX_DECK_SIZE - total);
      if (deck[card.id]) count = Math.min(count, MAX_COPIES - deck[card.id]);
      if (count > 0) {
        deck[card.id] = (deck[card.id] || 0) + count;
        total += count;
      }
    });
  }

  // If not full, fill with more creatures
  let i = 0;
  while (total < MAX_DECK_SIZE && i < creatures.length) {
    const card = creatures[i++];
    const already = deck[card.id] || 0;
    if (already < MAX_COPIES) {
      deck[card.id] = already + 1;
      total++;
    }
  }

  setCurrentDeck(deck);
}

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
    let image = deckObj.highlightArt || deckObj.bannerArt || 'Images/Banner/DefaultBanner.png';
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
