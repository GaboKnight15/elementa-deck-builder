// ==========================
// === GALLERY LOGIC ===
// ==========================
const gallery = document.getElementById('gallery-cards');
const filterSelectLabels = {
  'filter-color-gallery': 'Color',
  'filter-category-gallery': 'Category',
  'filter-type-gallery': 'Type',
  'filter-rarity-gallery': 'Rarity',
  'filter-archetype-gallery': 'Archetype',
  'filter-ability-gallery': 'Ability',
  // Builder filters if needed...
  'filter-color-builder': 'Color',
  'filter-category-builder': 'Category',
  'filter-type-builder': 'Type',
  'filter-rarity-builder': 'Rarity',
  'filter-archetype-builder': 'Archetype',
  'filter-ability-builder': 'Ability'
};
const CREATE_ESSENCE_COST = {common: 5, rare: 25, epic: 100, legendary: 500};
const VOID_ESSENCE_REFUND = {common: 1, rare: 5, epic: 20, legendary: 100};
const isFoil = window.playerFoilCards && window.playerFoilCards[card.id];
if (isFoil) {
  div.classList.add('card-foil');
  img.classList.add('card-foil');
}

let showFavoritesOnly = false;

// ==========================
// === RENDERING CARDS ===
// ==========================
// Favorite filter icon logic
document.addEventListener('DOMContentLoaded', function() {
  const favIcon = document.getElementById('filter-favorites-gallery');
  if (favIcon) {
    favIcon.onclick = function() {
      showFavoritesOnly = !showFavoritesOnly;
      updateFavoriteFilterIcon();
      renderGallery();
    };
    updateFavoriteFilterIcon();
  }
});
// Add to DOMContentLoaded or after filter setup
document.addEventListener('DOMContentLoaded', function() {
  const resetBtn = document.getElementById('reset-gallery-filters-btn');
  if (resetBtn) {
resetBtn.onclick = function() {
  // Reset text input and ownership (if present)
  const nameInput = document.getElementById('filter-name-gallery');
  if (nameInput) nameInput.value = "";

  const ownershipInput = document.getElementById('filter-ownership-gallery');
  if (ownershipInput) ownershipInput.value = "Owned";

  // Reset all custom dropdown filters: check "All", uncheck others, update label
  document.querySelectorAll('#filters-gallery .filter-dropdown').forEach(dd => {
    const allCb = dd.querySelector('input[type="checkbox"][value=""]');
    if (allCb) allCb.checked = true;
    dd.querySelectorAll('input[type="checkbox"]:not([value=""])').forEach(cb => cb.checked = false);
    updateFilterLabel(dd, []);
  });

  // Reset favorites
  showFavoritesOnly = false;
  updateFavoriteFilterIcon();

  renderGallery();
};
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Extend gallery essence display to include Bulk Void button
  const galleryEl = document.getElementById('gallery-essence-amount');
  if (galleryEl) {
    let bulkVoidBtn = document.getElementById('bulk-void-btn');
    if (!bulkVoidBtn) {
      bulkVoidBtn = document.createElement('img');
      bulkVoidBtn.id = 'bulk-void-btn';
      bulkVoidBtn.src = 'OtherImages/Icons/Void.png';
      bulkVoidBtn.alt = 'Bulk Void';
      bulkVoidBtn.title = 'Bulk Void duplicates for essence';
      bulkVoidBtn.style.width = '28px';
      bulkVoidBtn.style.height = '28px';
      bulkVoidBtn.style.cursor = 'pointer';
      bulkVoidBtn.style.verticalAlign = 'middle';
      bulkVoidBtn.style.marginLeft = '8px';
      bulkVoidBtn.onclick = showBulkVoidModal;
      galleryEl.parentNode.insertBefore(bulkVoidBtn, galleryEl.nextSibling);
    }
  }
});
// Update the icon appearance
function updateFavoriteFilterIcon() {
  const favIcon = document.getElementById('filter-favorites-gallery');
  if (!favIcon) return;
  if (showFavoritesOnly) {
    favIcon.style.filter = 'none';
    favIcon.style.opacity = '1';
    favIcon.title = 'Showing favorites';
  } else {
    favIcon.style.filter = 'grayscale(1)';
    favIcon.style.opacity = '0.6';
    favIcon.title = 'Show only favorites';
  }
}

function getMinimumKeptForRarity(card) {
  if (!card.rarity) return 1; // Default fallback
  switch (card.rarity.toLowerCase()) {
    case 'legendary': return 1;
    case 'epic':      return 2;
    case 'rare':      return 3;
    case 'common':    return 4;
    default:          return 1;
  }
}
function getFoilConsumeAmount(card) {
  if (!card.rarity) return 1;
  switch (card.rarity.toLowerCase()) {
    case 'legendary': return 1;
    case 'epic':      return 2;
    case 'rare':      return 3;
    case 'common':    return 4;
    default:          return 1;
  }
}
function getRarityKey(card) {
  // Defensive: default to 'common' if missing/unknown
  return (card.rarity || 'common').toLowerCase();
}
document.getElementById('gallery-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('gallery-back-btn').onclick = function() {
  // For example, return to home or previous section
  document.getElementById('gallery-section').classList.remove('active');
  document.getElementById('home-section').classList.add('active');
};
function getRarityBgClass(card) {
  // Returns a CSS class for the rarity wrapper color
  switch ((card.rarity || '').toLowerCase()) {
    case 'common':    return 'card-rarity-common';
    case 'rare':      return 'card-rarity-rare';
    case 'epic':      return 'card-rarity-epic';
    case 'legendary': return 'card-rarity-legendary';
    default:          return 'card-rarity-common';
  }
}
function createCardGallery(card) {
    const collection = getCollection();
    const owned = collection[card.id] || 0;

    const div = document.createElement('div');
    div.className = 'card-gallery';
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
    img.classList.add('card-art-image');
    img.title = card.name;

    // GRAY OUT if not owned
    if (owned === 0) {
      img.classList.add('card-image-locked');
      div.classList.add('card-locked');
    }

    div.appendChild(img);

    // "New!" badge
    const newCards = getNewlyUnlockedCards();
    if (newCards.includes(card.id)) {
      const newBadge = document.createElement('div');
      newBadge.className = 'new-card-badge';
      newBadge.textContent = 'New!';
      div.appendChild(newBadge);
    }

    // Show count badge
    const countBadge = document.createElement('div');
    countBadge.className = 'card-count-badge';
    countBadge.textContent = owned;
    div.appendChild(countBadge);

    // Add star for favorite
    if (isFavorite(card.id)) {
      const star = document.createElement('img');
      star.src = 'OtherImages/Icons/Star.png';
      star.alt = 'Favorite';
      star.className = 'gallery-favorite-star';
      star.style.position = 'absolute';
      star.style.top = '6px';
      star.style.right = '6px';
      star.style.width = '28px';
      star.style.height = '28px';
      star.style.zIndex = '5';
      div.appendChild(star);
    }
  
    div.onclick = function(e) {
      e.stopPropagation();
      showGalleryCardMenu(card, div);
    };
  return div;
}
// Helper: Read selected values for each filter dropdown (returns array or empty for "All")
function getFilterDropdownValues(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return [];
  const checked = Array.from(dropdown.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value).filter(v => v);
  return checked;
}

// Setup dropdown open/close
document.querySelectorAll('.filter-dropdown .filter-label').forEach(label => {
  label.onclick = function(e) {
    e.stopPropagation();
    // Close all others
    document.querySelectorAll('.filter-dropdown').forEach(dd => dd.classList.remove('open'));
    label.parentElement.classList.toggle('open');
  };
});

// Option click handler (checkboxes, including "All" logic)
document.querySelectorAll('.filter-dropdown .filter-option input[type="checkbox"]').forEach(cb => {
  cb.onchange = function(e) {
    const dropdown = cb.closest('.filter-dropdown');
    const filterKey = dropdown.id.replace('filter-', '').replace('-dropdown', '');
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

    // Optionally update label to show selection
    updateFilterLabel(dropdown, vals);
    renderGallery();
  };
});

// Update label to show selected options or just filter name
function updateFilterLabel(dropdown, vals) {
  const label = dropdown.querySelector('.filter-label');
  const base = label.getAttribute('data-default') || label.textContent.split(':')[0];
  label.textContent = base;
  if (vals.length === 0) {
    label.classList.remove('active');
  } else {
    label.classList.add('active');
  }
}

// Close dropdowns on click outside
document.addEventListener('mousedown', function(e) {
  // If the click is outside any .filter-dropdown, close all
  if (![...document.querySelectorAll('.filter-dropdown')].some(dd => dd.contains(e.target))) {
    document.querySelectorAll('.filter-dropdown.open').forEach(dd => dd.classList.remove('open'));
  }
});
function renderGallery() {
  gallery.innerHTML = '';
  const nameFilter = document.getElementById('filter-name-gallery').value.toLowerCase();
  const selectedOwnerships = getFilterDropdownValues('filter-ownership-dropdown').map(x => x); // No need to lowercase unless you want
  const selectedColors = getFilterDropdownValues('filter-color-dropdown').map(x => x.toLowerCase());
  const selectedTypes = getFilterDropdownValues('filter-type-dropdown').map(x => x.toLowerCase());
  const selectedRarities = getFilterDropdownValues('filter-rarity-dropdown').map(x => x.toLowerCase());
  const selectedArchetypes = getFilterDropdownValues('filter-archetype-dropdown').map(x => x.toLowerCase());
  const selectedTraits = getFilterDropdownValues('filter-trait-dropdown').map(x => x.toLowerCase());
  const selectedAbilities = getFilterDropdownValues('filter-ability-dropdown').map(x => x.toLowerCase());
  const selectedCategories = getFilterDropdownValues('filter-category-dropdown').map(x => x.toLowerCase());
  const collection = getCollection();
  const favoriteIds = getFavoriteCards();

  let filteredCards = filterCards({
    collection,
    favoriteIds,
    showFavoritesOnly,
    selectedOwnerships,
    nameFilter,
    selectedColors,
    selectedCategories,
    selectedTypes,
    selectedRarities,
    selectedTraits,
    selectedArchetypes,
    selectedAbilities
  });
  updateGalleryCollectionProgress(filteredCards);
  if (filteredCards.length === 0) return;
  filteredCards.forEach(card => {
    const cardDiv = createCardGallery(card);
    gallery.appendChild(cardDiv);
  });
  updateEssenceDisplay();
}

// FAVORITE CARDS
function getFavoriteCards() {
  return Array.isArray(window.favoriteCards) ? window.favoriteCards : [];
}
function isFavorite(cardId) {
  return getFavoriteCards().includes(cardId);
}
function toggleFavorite(cardId) {
  if (!window.favoriteCards) window.favoriteCards = [];
  const idx = window.favoriteCards.indexOf(cardId);
  if (idx >= 0) {
    window.favoriteCards.splice(idx, 1);
  } else {
    window.favoriteCards.push(cardId);
  }
  saveProgress();
}
function updateFilterPlaceholder(select) {
  const id = select.id;
  const label = filterSelectLabels[id];
  if (!label) return;
  const firstOption = select.options[0];
  if (select.value === "") {
    firstOption.textContent = label;
  } else {
    firstOption.textContent = "All";
  }
}

// Apply to all filter selects
function setupFilterSelectPlaceholders() {
  Object.keys(filterSelectLabels).forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;
    // Initial update
    updateFilterPlaceholder(select);
    // On change
    select.addEventListener('change', () => updateFilterPlaceholder(select));
    // On focus, show "All" for first option (for dropdown clarity)
    select.addEventListener('focus', function() {
      if (select.options[0].textContent !== "All") {
        select.options[0].textContent = "All";
      }
    });
    // On blur, restore placeholder if needed
    select.addEventListener('blur', () => updateFilterPlaceholder(select));
  });
}
function showGalleryCardMenu(card, anchorDiv) {
  // Get the menu DOM element
  const menu = document.getElementById('gallery-card-menu');
  if (!menu) return;

  // Remove modal-specific classes/styles
  menu.className = "menu";
  menu.style.display = "block";
  menu.style.position = "absolute";
  menu.style.zIndex = "1000";
  menu.style.minWidth = "180px";
  menu.style.boxShadow = "0 6px 32px #000b";
  menu.style.borderRadius = "14px";
  menu.style.background = "#253047";
  menu.style.padding = "0";
  menu.style.transition = "opacity 0.2s";
  menu._activeCard = card;

  // Remove any previous outside click handler
  if (window._galleryMenuOutsideHandler) {
    document.body.removeEventListener('mousedown', window._galleryMenuOutsideHandler);
    window._galleryMenuOutsideHandler = null;
  }
  // Add new outside click handler
  window._galleryMenuOutsideHandler = function(e) {
    if (!menu.contains(e.target)) {
      menu.style.display = "none";
      menu._activeCard = null;
      document.body.removeEventListener('mousedown', window._galleryMenuOutsideHandler);
      window._galleryMenuOutsideHandler = null;
    }
  };
  setTimeout(() => {
    document.body.addEventListener('mousedown', window._galleryMenuOutsideHandler);
  }, 10);

  // Position the menu near the card
  const rect = anchorDiv.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  // By default, show to the right and slightly below the card
  let top = rect.top + scrollY + 10;
  let left = rect.right + scrollX + 12;

  // If not enough space to the right, show to the left
  if (left + menu.offsetWidth > window.innerWidth) {
    left = rect.left + scrollX - menu.offsetWidth - 12;
    if (left < 0) left = 10;
  }
  // If not enough space below, show above
  if (top + menu.offsetHeight > window.innerHeight) {
    top = rect.bottom + scrollY - menu.offsetHeight - 10;
    if (top < 0) top = 10;
  }

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;

  // Set up handlers for actions
  document.getElementById('gallery-card-view-btn').onclick = function() {
    showFullCardModal(card);
    menu.style.display = "none";
    const newCards = getNewlyUnlockedCards().filter(id => id !== card.id);
    setNewlyUnlockedCards(newCards);
    renderGallery();
  };
  document.getElementById('gallery-card-create-btn').onclick = function() {
    createCreateCardButton(card, renderGallery).onclick(new MouseEvent('click'));
    menu.style.display = "none";
  };
  document.getElementById('gallery-card-void-btn').onclick = function() {
    createVoidCardButton(card, renderGallery).onclick(new MouseEvent('click'));
    menu.style.display = "none";
  };
  // === FOIL BUTTON ===
  const modalContent = menu.querySelector('.modal-content');
  let foilBtn = modalContent.querySelector('#gallery-card-foil-btn');
  if (foilBtn) foilBtn.remove();

  foilBtn = document.createElement('button');
  foilBtn.id = "gallery-card-foil-btn";
  foilBtn.className = "settings-item";
  foilBtn.style.width = "100%";
  foilBtn.style.textAlign = "left";
  foilBtn.innerHTML =
    `<img src="OtherImages/Icons/Foil.png" alt="Foil" style="width:20px;vertical-align:middle;margin-right:10px;"> Foil`;

  const owned = getCollection()[card.id] || 0;
  const consumeAmt = getFoilConsumeAmount(card);
  const alreadyFoil = window.playerFoilCards && window.playerFoilCards[card.id];

  // Disable button if already foil or not enough copies
  if (alreadyFoil) {
    foilBtn.disabled = true;
    foilBtn.title = "Already foil!";
    foilBtn.style.opacity = "0.4";
  } else if (owned < consumeAmt * 2) {
    foilBtn.disabled = true;
    foilBtn.title = `You need at least ${consumeAmt * 2} copies to foil this card.`;
    foilBtn.style.opacity = "0.4";
  }

  foilBtn.onclick = function(e) {
    e.stopPropagation();
    consumeCardsForFoil(card, renderGallery);
    menu.style.display = "none";
  };

  // Insert Foil button below Void button
  const voidBtn = modalContent.querySelector('#gallery-card-void-btn');
  if (voidBtn && voidBtn.nextSibling) {
    modalContent.insertBefore(foilBtn, voidBtn.nextSibling);
  } else {
    modalContent.appendChild(foilBtn);
  }
  // === FAVORITE BUTTON ===
  let favoriteBtn = modalContent.querySelector('#gallery-card-favorite-btn');
  if (favoriteBtn) favoriteBtn.remove();

  favoriteBtn = document.createElement('button');
  favoriteBtn.id = "gallery-card-favorite-btn";
  favoriteBtn.className = "settings-item";
  favoriteBtn.style.width = "100%";
  favoriteBtn.style.textAlign = "left";
  const isFav = isFavorite(card.id);
  favoriteBtn.innerHTML = `<img src="OtherImages/Icons/Star.png" alt="Favorite" style="width:20px;vertical-align:middle;margin-right:10px;"> ${isFav ? 'Unfavorite' : 'Favorite'}`;
  favoriteBtn.onclick = function(e) {
    e.stopPropagation();
    toggleFavorite(card.id);
    menu.style.display = "none";
    renderGallery();
  };
  // Insert Favorite button below Void button and Foil button
  if (foilBtn && foilBtn.nextSibling) {
    modalContent.insertBefore(favoriteBtn, foilBtn.nextSibling);
  } else {
    modalContent.appendChild(favoriteBtn);
  }
}



function createCreateCardButton(card, onActionDone) {
  const owned = getCollection()[card.id] || 0;
  const btn = document.createElement('img');
  btn.src = 'OtherImages/Icons/Essence.png';
  btn.alt = 'Create';
  const rarityKey = getRarityKey(card);
  const cost = CREATE_ESSENCE_COST[rarityKey] || 5;
  btn.title = `Create (costs ${cost} Essence)`;
  btn.className = "gallery-action-btn";
  btn.style.background = "none";
  btn.style.cursor = "pointer";
  btn.style.width = "38px";
  btn.style.height = "38px";
  btn.style.maxWidth = "38px";
  btn.style.maxHeight = "38px";
  btn.style.objectFit = "contain";
  btn.style.transition = "transform 0.15s, box-shadow 0.15s";
  btn.onclick = function(e) {
    e.stopPropagation();
    showEssenceConfirmModal({
      action: "create",
      card,
      amount: cost,
      onConfirm: function() {
        if (playerEssence < cost) {
          showToast("Not enough Essence", {type:"error"});
          return;
        }
        const collection = getCollection();
        const wasOwned = collection[card.id] > 0;
        collection[card.id] = (collection[card.id] || 0) + 1;
        playerCollection = collection;
        playerEssence -= cost;
        updateEssenceDisplay();
        saveProgress();
        if (!wasOwned && collection[card.id] > 0) {
          const newCards = getNewlyUnlockedCards();
          if (!newCards.includes(card.id)) {
            newCards.push(card.id);
            setNewlyUnlockedCards(newCards);
          }
        }
        if (onActionDone) onActionDone();
      }
    });
  };
  return btn;
}

function createVoidCardButton(card, onActionDone) {
  const owned = getCollection()[card.id] || 0;
  const btn = document.createElement('img');
  btn.src = 'OtherImages/Icons/Void.png';
  btn.alt = 'Void';
  const rarityKey = getRarityKey(card);
  const refund = VOID_ESSENCE_REFUND[rarityKey] || 1;
  btn.title = `Void (refunds ${refund} Essence)`;
  btn.className = "gallery-action-btn";
  btn.style.background = "none";
  btn.style.cursor = "pointer";
  btn.style.width = "38px";
  btn.style.height = "38px";
  btn.style.maxWidth = "38px";
  btn.style.maxHeight = "38px";
  btn.style.objectFit = "contain";
  btn.style.transition = "transform 0.15s, box-shadow 0.15s";
  const minKept = getMinimumKeptForRarity(card);
  if (owned <= minKept) {
    btn.style.opacity = "0.5";
    btn.style.pointerEvents = "none";
    btn.title = `You must keep at least ${minKept} copies of this card (${card.rarity || "Unknown rarity"}).`;
  }
  btn.onclick = function(e) {
    e.stopPropagation();
    showEssenceConfirmModal({
      action: "void",
      card,
      amount: refund,
      onConfirm: function() {
        const collection = getCollection();
        const ownedCount = collection[card.id] || 0;
        if (ownedCount <= minKept) {
          showToast(`You must keep at least ${minKept} of this card (${card.rarity || "Unknown rarity"}).`);
          return;
        }
        collection[card.id] -= 1;
        playerCollection = collection;
        playerEssence += refund;
        updateEssenceDisplay();
        saveProgress();
        if (onActionDone) onActionDone();
      }
    });
  };
  return btn;
}
// CREATE/VOID CONFIRM MODAL
function showEssenceConfirmModal({action, card, amount, onConfirm }) {
  const modal = document.getElementById('essence-confirm-modal');
  const msgDiv = document.getElementById('essence-confirm-msg');
  const cardImg = document.getElementById('essence-confirm-card-img');
  const amtDiv = document.getElementById('essence-confirm-amount');
  const confirmBtn = document.getElementById('essence-confirm-btn');
  const cancelBtn = document.getElementById('essence-cancel-btn');
  // Set message
  msgDiv.textContent = 
    action === "create"
      ? `Create '${card.name}' ? `
      : `Void '${card.name}' ? `;
  // Card image
  cardImg.src = card.image;
  cardImg.alt = card.name;
  // Amount with icon
  amtDiv.innerHTML = `${amount} <img src="OtherImages/Icons/Essence.png" alt="Essence" style="width:24px;height:24px;vertical-align:middle;">`;
  // Show modal
  modal.style.display = "flex";
  // Confirm handler
  confirmBtn.onclick = function() {
    modal.style.display = "none";
    if (typeof onConfirm === "function") onConfirm();
  };
  // Cancel handler
  cancelBtn.onclick = function() {
    modal.style.display = "none";
  };
  // Close on outside click
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  };
}
function updateGalleryCollectionProgress(filteredCards) {
  const collection = getCollection();
  const owned = filteredCards.filter(card => (collection[card.id] || 0) > 0).length;
  const total = filteredCards.length;

  // Ownership filter
  const selectedOwnerships = getFilterDropdownValues('filter-ownership-dropdown');
  const ownershipAll = selectedOwnerships.length === 0 || selectedOwnerships.includes("");
  const ownershipSingle = selectedOwnerships.length === 1 ? selectedOwnerships[0] : null;

  // Gather all other filter values
  const filterDropdownIds = [
    'filter-rarity-dropdown',
    'filter-color-dropdown',
    'filter-type-dropdown',
    'filter-trait-dropdown',
    'filter-archetype-dropdown',
    'filter-ability-dropdown',
    'filter-category-dropdown'
  ];
  let filterInfoArray = [];
  filterDropdownIds.forEach(id => {
    const vals = getFilterDropdownValues(id);
    if (vals.length > 0) filterInfoArray.push(...vals);
  });

  // Name filter
  const nameInput = document.getElementById('filter-name-gallery');
  const nameFilter = nameInput ? nameInput.value : "";
  if (nameFilter) filterInfoArray.push(nameFilter);

  // Join filter info with space (NO commas), no labels
  const filterInfo = filterInfoArray.length ? filterInfoArray.join(' ') : '';

  // Determine collection progress string
  let str = '';
  if (total === 0) {
    if (filterInfo) {
      str = `No cards match the selected filters: <b>${filterInfo}</b>`;
    } else {
      str = 'No cards match the selected filters.';
    }
  } else if (ownershipAll) {
    // Show "Collected X/Y"
    str = `Collected <b>${owned}</b> / <b>${total}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  } else if (ownershipSingle === 'Undiscovered') {
    // Show "Undiscovered X"
    str = `Undiscovered <b>${total}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  } else if (ownershipSingle === 'Locked') {
    // Show "Locked X"
    str = `Locked <b>${total}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  } else if (ownershipSingle === 'Owned') {
    // Show "Owned X"
    str = `Owned <b>${owned}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  } else {
    // Multiple ownerships selected, fallback to Collected X/Y
    str = `Collected <b>${owned}</b> / <b>${total}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  }

  const progDiv = document.getElementById('gallery-collection-progress');
  if (progDiv) progDiv.innerHTML = str;
}
// Bulk Void modal logic
// Bulk Void modal logic
function showBulkVoidModal() {
  const collection = getCollection();
  const cardsToVoid = [];
  let totalEssence = 0;

  dummyCards.forEach(card => {
    const owned = collection[card.id] || 0;
    const minKept = getMinimumKeptForRarity(card);
    const voidable = owned - minKept;
    if (voidable > 0) {
      const refund = VOID_ESSENCE_REFUND[getRarityKey(card)] || 1;
      cardsToVoid.push({
        card,
        count: voidable,
        refund,
        subtotal: voidable * refund
      });
      totalEssence += voidable * refund;
    }
  });

  const modal = document.getElementById('bulk-void-modal');
  const content = document.getElementById('bulk-void-modal-content');

  if (cardsToVoid.length === 0) {
    content.innerHTML = `
      <h3 style="color:#ffe066;margin-bottom:12px;">Bulk Void</h3>
      <div style="margin-bottom:20px;color:#fff;">
        You have no voidable duplicates at this time.<br>
        You must keep at least the minimum for each card's rarity.
      </div>
      <div style="display:flex;justify-content:center;gap:12px;">
        <button class="btn-negative-secondary" id="bulk-void-cancel-btn">Close</button>
      </div>
    `;
    modal.style.display = 'flex';
    document.getElementById('bulk-void-cancel-btn').onclick = () => { modal.style.display = 'none'; };
    return;
  }

  // Essence image HTML
  const essenceImg = `<img src="OtherImages/Icons/Essence.png" alt="Essence" style="width:18px;height:18px;vertical-align:middle;">`;

  // Improved cardRows: clickable image, essence image, and showFullCardModal
  let cardRows = cardsToVoid.map(({card, count, refund, subtotal}) => {
    // Color for name (orange if > 0 refund, else default)
    const nameColor = subtotal > 0 ? "#ffe066" : "#fff";
    return `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:7px;">
        <img src="${card.image}" alt="${card.name}" class="bulk-void-card-img" style="width:38px;height:54px;border-radius:5px;border:2px solid #444;cursor:pointer;"
          onclick="showFullCardModal(dummyCards.find(c => c.id === '${card.id}'));">
        <span style="font-weight:bold;color:${nameColor};">${card.name}</span>
        <span style="color:#eee;">
          (${refund} ${essenceImg}) 
          <span style="color:#fff;">×${count}</span>
        </span>
        <span style="color:#6f6;">+${subtotal}</span>
      </div>
    `;
  }).join('');

  content.innerHTML = `
    <h3 style="color:#ffe066;margin-bottom:12px;">Bulk Void</h3>
    <div style="margin-bottom:18px;color:#fff;">
      Are you sure you want to void the following cards for <span style="color:#6f6;font-weight:bold;">${totalEssence} ${essenceImg}</span>?
    </div>
    <div style="max-height:270px;overflow-y:auto;margin-bottom:18px;">
      ${cardRows}
    </div>
    <div style="display:flex;justify-content:center;gap:12px;">
      <button class="btn-secondary" id="bulk-void-confirm-btn">Void All</button>
      <button class="btn-negative-secondary" id="bulk-void-cancel-btn">Cancel</button>
    </div>
  `;

  modal.style.display = 'flex';

  document.getElementById('bulk-void-cancel-btn').onclick = () => { modal.style.display = 'none'; };
  document.getElementById('bulk-void-confirm-btn').onclick = function() {
    cardsToVoid.forEach(({card, count}) => {
      collection[card.id] -= count;
    });
    playerEssence += totalEssence;
    saveProgress();
    updateEssenceDisplay();
    renderGallery();
    modal.style.display = 'none';
    showToast(`Bulk voided ${cardsToVoid.length} cards for ${totalEssence} Essence!`, {type: "success"});
  };
}
// FOIL LOGIC
function upgradeCardToFoil(cardId) {
  const userId = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection('users').doc(userId);
  userRef.get().then(doc => {
    const foilCards = doc.data()?.foilCards || {};
    foilCards[cardId] = true;
    userRef.set({ foilCards }, { merge: true }).then(() => {
      window.playerFoilCards = foilCards;
      showToast("Card upgraded to foil!", {type:"success"});
      if (typeof updateCollectionDependentUI === "function") updateCollectionDependentUI();
    });
  });
}
function consumeCardsForFoil(card, onDone) {
  const owned = getCollection()[card.id] || 0;
  const consumeAmt = getFoilConsumeAmount(card);
  const minKept = getMinimumKeptForRarity(card);
  if (owned < consumeAmt * 2) {
    showToast(`You need at least ${consumeAmt * 2} copies to foil this card! (You own ${owned})`, {type:"error"});
    return;
  }

  // Confirmation modal (reuse your modal pattern!)
  showEssenceConfirmModal({
    action: "foil",
    card,
    amount: consumeAmt,
    onConfirm: function() {
      // Remove cards from collection
      const collection = getCollection();
      collection[card.id] = (collection[card.id] || 0) - consumeAmt;
      if (collection[card.id] < minKept) collection[card.id] = minKept; // Safety
      window.playerCollection = collection;
      // Mark foil in Firebase
      const userId = firebase.auth().currentUser.uid;
      const userRef = firebase.firestore().collection('users').doc(userId);
      // Merge foilCards with new value
      const foilCards = window.playerFoilCards || {};
      foilCards[card.id] = true;
      userRef.set({ collection, foilCards }, { merge: true }).then(() => {
        window.playerFoilCards = foilCards;
        showToast("Card upgraded to foil!", {type:"success"});
        if (onDone) onDone();
        if (typeof updateCollectionDependentUI === "function") updateCollectionDependentUI();
      });
    }
  });
}
// On DOM ready
document.addEventListener('DOMContentLoaded', setupFilterSelectPlaceholders);
// ==========================
// === EVENT LISTENERS ===
// ==========================
// GALLERY EVENT FILTERS
document.getElementById('filter-name-gallery').addEventListener('input', renderGallery);
// ==========================
// === INITIALIZATION ===
// ==========================
window.renderGallery = renderGallery;
