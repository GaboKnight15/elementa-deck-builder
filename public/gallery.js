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
const CREATE_ESSENCE_COST = {
  common: 5,
  rare: 25,
  epic: 100,
  legendary: 500
};

const VOID_ESSENCE_REFUND = {
  common: 1,
  rare: 5,
  epic: 20,
  legendary: 100
};
// ==========================
// === RENDERING CARDS ===
// ==========================
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
function createCardGallery(card) {
    const collection = getCollection();
    const owned = collection[card.id] || 0;

    const div = document.createElement('div');
    div.className = 'card-gallery';
    if (card.rarity) {
      div.setAttribute('data-rarity', card.rarity);
    }
    div.classList.add(getCardBgClass(card));

    // === Add element classes for color(s) ===
    let colors = card.color;
    if (!Array.isArray(colors)) {
        if (colors) colors = [colors];
        else colors = [];
    }
    colors.forEach(color => {
        switch (color.toLowerCase()) {
            case 'green':   div.classList.add('card-element-leaves'); break;
            case 'red':     div.classList.add('card-element-fire'); break;
            case 'blue':    div.classList.add('card-element-water'); break;
            case 'yellow':  div.classList.add('card-element-thunder'); break;
            case 'gray':
            case 'brown':   div.classList.add('card-element-ground'); break;
            case 'purple':  div.classList.add('card-element-poison'); break;
            case 'black':   div.classList.add('card-element-dark'); break;
            case 'white':   div.classList.add('card-element-light'); break;
        }
    });

    const img = document.createElement('img');
    img.src = card.image;
    img.onerror = function() {
      this.onerror = null;
      this.src = "CardImages/Domains/placeholder.png";
    };
    img.alt = card.name;
    img.classList.add('card-art-image');

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
  
    div.onclick = function(e) {
      e.stopPropagation();
      showGalleryCardMenu(card, div);
    };
  return div;
}

function renderGallery() {
  gallery.innerHTML = '';
  const ownershipFilter = document.getElementById('filter-ownership-gallery')?.value || "Owned";
  const selectedColor = document.getElementById('filter-color-gallery').value.toLowerCase();
  const selectedType = document.getElementById('filter-type-gallery').value.toLowerCase();
  const selectedRarity = document.getElementById('filter-rarity-gallery').value.toLowerCase();
  const nameFilter = document.getElementById('filter-name-gallery').value.toLowerCase();
  const selectedArchetype = document.getElementById('filter-archetype-gallery').value.toLowerCase();
  const selectedAbility = document.getElementById('filter-ability-gallery').value.toLowerCase();
  const selectedCategory = document.getElementById('filter-category-gallery').value.toLowerCase();

  const collection = getCollection();

  const filteredCards = dummyCards.filter(card => {
    const ownedCount = collection[card.id] || 0;

    // Ownership filter logic
    if (ownershipFilter === "owned" && ownedCount <= 0) return false;
    if (ownershipFilter === "Undiscovered" && ownedCount > 0) return false;
    if (ownershipFilter === "Locked" && !card.locked) return false;
    // "all" shows everything

    if (nameFilter && !card.name.toLowerCase().includes(nameFilter)) return false;
    if (selectedColor) {
      const colors = Array.isArray(card.color) ? card.color.map(c => c.toLowerCase()) : [card.color.toLowerCase()];
      if (!colors.includes(selectedColor)) return false;
    }
    if (selectedCategory) {
      if (!card.category || card.category.toLowerCase() !== selectedCategory) return false;
    }
    if (selectedType) {
      const types = Array.isArray(card.type) ? card.type.map(t => t.toLowerCase()) : [card.type.toLowerCase()];
      if (!types.includes(selectedType)) return false;
    }
    if (selectedRarity) {
      if (card.rarity.toLowerCase() !== selectedRarity) return false;
    }
    if (selectedArchetype) {
      const archetypes = Array.isArray(card.archetype)
        ? card.archetype.map(a => a.toLowerCase())
        : [card.archetype?.toLowerCase()];
      if (!archetypes.includes(selectedArchetype)) return false;
    }
    if (selectedAbility) {
      const abilities = Array.isArray(card.ability)
        ? card.ability.map(a => a.toLowerCase())
        : [card.ability?.toLowerCase()];
      if (!abilities.includes(selectedAbility)) return false;
    }
    return true;
  });
  
  // Call progress updater here!
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
function showEssenceConfirmModal({
  action, // "create" or "void"
  card, 
  amount, 
  onConfirm 
}) {
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

  let filterInfo = '';
  const selectedRarity = document.getElementById('filter-rarity-gallery').value;
  const selectedColor = document.getElementById('filter-color-gallery').value;
  const selectedCategory = document.getElementById('filter-category-gallery').value;
  const selectedType = document.getElementById('filter-type-gallery').value;
  const selectedArchetype = document.getElementById('filter-archetype-gallery').value;
  const selectedAbility = document.getElementById('filter-ability-gallery').value;
  const nameFilter = document.getElementById('filter-name-gallery').value;
  if (selectedRarity) filterInfo += `Rarity: <b>${selectedRarity}</b> `;
  if (selectedColor) filterInfo += `Color: <b>${selectedColor}</b> `;
  if (selectedCategory) filterInfo += `Category: <b>${selectedCategory}</b> `;
  if (selectedType) filterInfo += `Type: <b>${selectedType}</b> `;
  if (selectedArchetype) filterInfo += `Archetype: <b>${selectedArchetype}</b> `;
  if (selectedAbility) filterInfo += `Ability: <b>${selectedAbility}</b> `;
  if (nameFilter) filterInfo += `Name: <b>${nameFilter}</b> `;

  let str = '';
  const ownershipFilter = document.getElementById('filter-ownership-gallery').value;
  if (total === 0) {
    str = 'No cards match the selected filters.';
  } else if (ownershipFilter === "owned") {
    str = `Owned <b>${owned}</b>`;
    if (filterInfo) str += ` (${filterInfo.trim()})`;
  } else {
    str = `Collected <b>${owned}</b> / <b>${total}</b>`;
    if (filterInfo) str += ` (${filterInfo.trim()})`;
  }

  const progDiv = document.getElementById('gallery-collection-progress');
  if (progDiv) progDiv.innerHTML = str;
}
// On DOM ready
document.addEventListener('DOMContentLoaded', setupFilterSelectPlaceholders);
// ==========================
// === EVENT LISTENERS ===
// ==========================
// GALLERY EVENT FILTERS
  document.getElementById('filter-ownership-gallery').addEventListener('change', renderGallery);
  document.getElementById('filter-ownership-gallery').value = "all";
  document.getElementById('filter-name-gallery').addEventListener('input', renderGallery);
  document.getElementById('filter-color-gallery').addEventListener('change', renderGallery);
  document.getElementById('filter-category-gallery').addEventListener('change', renderGallery);
  document.getElementById('filter-type-gallery').addEventListener('change', renderGallery);
  document.getElementById('filter-rarity-gallery').addEventListener('change', renderGallery);
  document.getElementById('filter-archetype-gallery').addEventListener('change', renderGallery);
  document.getElementById('filter-ability-gallery').addEventListener('change', renderGallery);
// ==========================
// === INITIALIZATION ===
// ==========================
window.renderGallery = renderGallery;
