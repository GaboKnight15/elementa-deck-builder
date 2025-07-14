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

    img.onclick = (e) => {
      e.stopPropagation();
      showFullCardModal(card);
      // Remove "new" badge after viewing
      const newCards = getNewlyUnlockedCards().filter(id => id !== card.id);
      setNewlyUnlockedCards(newCards);
      renderGallery();
    };
    div.appendChild(img);
  
    const actionRow = document.createElement('div');
    actionRow.className = "action-row";

    // Essence ("Create") button
    const createBtnImg = document.createElement('img');
    createBtnImg.src = 'OtherImages/Icons/Essence.png';
    createBtnImg.alt = 'Create';
    createBtnImg.title = 'Create (spend Essence to make 1 copy)';
    createBtnImg.className = "gallery-action-btn";
    // Set styles dynamically
    createBtnImg.style.background = "none";
    createBtnImg.style.cursor = "pointer";
    createBtnImg.style.width = "38px";
    createBtnImg.style.height = "38px";
    createBtnImg.style.maxWidth = "38px";
    createBtnImg.style.maxHeight = "38px";
    createBtnImg.style.objectFit = "contain";
    createBtnImg.style.transition = "transform 0.15s, box-shadow 0.15s";
    createBtnImg.onclick = function(e) {
      e.stopPropagation();
      const cost = 50;
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

      // Mark as new if previously not owned
      if (!wasOwned && collection[card.id] > 0) {
        const newCards = getNewlyUnlockedCards();
        if (!newCards.includes(card.id)) {
          newCards.push(card.id);
          setNewlyUnlockedCards(newCards);
        }
      }
      renderGallery();
    };
    actionRow.appendChild(createBtnImg);

    // Void button
    const voidBtnImg = document.createElement('img');
    voidBtnImg.src = 'OtherImages/Icons/Void.png';
    voidBtnImg.alt = 'Void';
    voidBtnImg.title = 'Void (destroy 1 copy for Essence)';
    voidBtnImg.className = "gallery-action-btn";
    // Set styles dynamically
    voidBtnImg.style.background = "none";
    voidBtnImg.style.cursor = "pointer";
    voidBtnImg.style.width = "38px";
    voidBtnImg.style.height = "38px";
    voidBtnImg.style.maxWidth = "38px";
    voidBtnImg.style.maxHeight = "38px";
    voidBtnImg.style.objectFit = "contain";
    voidBtnImg.style.transition = "transform 0.15s, box-shadow 0.15s";
    const minKept = getMinimumKeptForRarity(card);
    if (owned <= minKept) {
      voidBtnImg.style.opacity = "0.5";
      voidBtnImg.style.pointerEvents = "none";
      voidBtnImg.title = `You must keep at least ${minKept} copies of this card (${card.rarity || "Unknown rarity"}).`;
    }
    voidBtnImg.onclick = function(e) {
      e.stopPropagation();
      const collection = getCollection();
      const ownedCount = collection[card.id] || 0;
      if (ownedCount <= minKept) {
        showToast(`You must keep at least ${minKept} of this card (${card.rarity || "Unknown rarity"}).`);
        return;
      }
      const refund = 10;
      collection[card.id] -= 1;
      playerCollection = collection;
      playerEssence += refund;
      updateEssenceDisplay();
      saveProgress();
      renderGallery();
    };
    actionRow.appendChild(voidBtnImg);
    
    div.appendChild(actionRow);

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

    return div;
}

function renderGallery() {
  gallery.innerHTML = '';
  const ownershipFilter = document.getElementById('filter-ownership-gallery')?.value || "owned";
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
    if (ownershipFilter === "undiscovered" && ownedCount > 0) return false;
    if (ownershipFilter === "locked" && !card.locked) return false;
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

  if (filteredCards.length === 0) return;

  filteredCards.forEach(card => {
    const cardDiv = createCardGallery(card);
    gallery.appendChild(cardDiv);
  });
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

// On DOM ready
document.addEventListener('DOMContentLoaded', setupFilterSelectPlaceholders);
// ==========================
// === EVENT LISTENERS ===
// ==========================
// GALLERY EVENT FILTERS
  document.getElementById('filter-ownership-gallery').addEventListener('change', renderGallery);
  document.getElementById('filter-ownership-gallery').value = "owned";
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
