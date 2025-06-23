// ==========================
// === GALLERY LOGIC ===
// ==========================
const gallery = document.getElementById('card-gallery');
// ==========================
// === RENDERING CARDS ===
// ==========================
function createCardGallery(card) {
    const div = document.createElement('div');
    div.className = 'card';
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

    const name = document.createElement('h4');
    name.textContent = card.name;
    div.appendChild(name);

    const stats = document.createElement('div');
    stats.className = 'card-gallery-stats';
    const hp = card.hp !== undefined ? `<span class="stat hp">${card.hp}</span>` : '';
    const atk = card.atk !== undefined ? `<span class="stat atk">${card.atk}</span>` : '';
    const def = card.def !== undefined ? `<span class="stat def">${card.def}</span>` : '';
    const cost = card.cost !== undefined ? `<span class="stat cost">${card.cost}</span>` : '';
    stats.innerHTML = [hp, atk, def, cost].filter(Boolean).join(' ');
    if (stats.innerHTML.trim() !== '') div.appendChild(stats);

    const details = document.createElement('div');
    details.className = 'card-gallery-details';
    details.textContent = [
      card.rarity,
      Array.isArray(card.type) ? card.type.join(', ') : card.type
    ].filter(Boolean).join(' | ');
    if (details.textContent.trim() !== '') div.appendChild(details);
    return div;
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
// FILTER COLOR EVENTS
  document.getElementById('filter-color-gallery').addEventListener('change', (e) => {
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
// ==========================
// === INITIALIZATION ===
// ==========================
window.renderGallery = renderGallery;
renderGallery();
