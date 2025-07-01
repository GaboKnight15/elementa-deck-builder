// ==========================
// === GALLERY LOGIC ===
// ==========================
const gallery = document.getElementById('gallery-cards');
// ==========================
// === RENDERING CARDS ===
// ==========================
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
    // Accepts single string or array of colors
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
            // add more mappings as needed
        }
    });
    
    const img = document.createElement('img');
    img.src = card.image;
    img.onerror = function() {
      this.onerror = null;
      this.src = "CardImages/Domains/placeholder.png";
    };
    img.alt = card.name;

    // GRAY OUT if not owned
    if (owned === 0) {
      img.classList.add('card-image-locked');
      div.classList.add('card-locked');
    }

    img.onclick = (e) => {
      e.stopPropagation();
      showFullCardModal(card);
        
      const newCards = getNewlyUnlockedCards().filter(id => id !== card.id);
      setNewlyUnlockedCards(newCards);
      renderGallery();
    };
    div.appendChild(img);

    const name = document.createElement('h4');
    name.textContent = card.name;
    const actionRow = document.createElement('div');
    actionRow.className = "action-row";
    // Create button
    // Essence ("Create") button
const createBtnImg = document.createElement('img');
createBtnImg.src = 'OtherImages/Icons/Essence.png';
createBtnImg.alt = 'Create';
createBtnImg.title = 'Create (spend Essence to make 1 copy)';
createBtnImg.className = "gallery-action-btn";
createBtnImg.onclick = function(e) {
      e.stopPropagation();
      const cost = 50;
      if (getEssence() < cost) {
        alert('Not enough Essence!');
        return;
      }
  const collection = getCollection();
  const wasOwned = collection[card.id] > 0;
  collection[card.id] = (collection[card.id] || 0) + 1;
  setCollection(collection);
  setEssence(getEssence() - cost);

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
voidBtnImg.onclick = function(e) {
  e.stopPropagation();
  const collection = getCollection();
  if ((collection[card.id] || 0) <= 1) {
    alert('You must keep at least one copy!');
    return;
  }
  const refund = 10; // adjust as needed
  collection[card.id] -= 1;
  setCollection(collection);
  setEssence(getEssence() + refund);
  renderGallery();
};
actionRow.appendChild(voidBtnImg);
    
div.appendChild(actionRow);
div.appendChild(name);

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
    countBadge.className = 'card-count-badge'; // style in CSS
    countBadge.textContent = owned;
    div.appendChild(countBadge);

    return div;
}
function loadPlayerCollection() {
  loadCollection().then(collection => {
    playerCollection = collection || {};
    renderGallery();
  });
}
function renderGallery() {
    gallery.innerHTML = '';
    const selectedColor = document.getElementById('filter-color-gallery').value.toLowerCase();
    const selectedType = document.getElementById('filter-type-gallery').value.toLowerCase();
    const selectedRarity = document.getElementById('filter-rarity-gallery').value.toLowerCase();
    const nameFilter = document.getElementById('filter-name-gallery').value.toLowerCase();
    const selectedArchetype = document.getElementById('filter-archetype-gallery').value.toLowerCase();
    const selectedAbility = document.getElementById('filter-ability-gallery').value.toLowerCase();
    const selectedCategory = document.getElementById('filter-category-gallery').value.toLowerCase();
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
      gallery.appendChild(createCardGallery(card));
    });
  }
// ==========================
// === EVENT LISTENERS ===
// ==========================
// GALLERY EVENT FILTERS
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
renderGallery();
