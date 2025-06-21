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
const deckSlotSelect     = document.getElementById('deck-slot-select');
const addDeckSlotBtn     = document.getElementById('add-deck-slot-btn');
const deleteDeckSlotBtn  = document.getElementById('delete-deck-slot-btn');
const deckTitle          = document.getElementById('deck-title');
const gallery            = document.getElementById('card-gallery');
const deckList           = document.getElementById('deck-list');
const cardCount          = document.getElementById('card-count');
const modal              = document.getElementById('image-modal');
const modalImg           = document.getElementById('modal-img');
const closeBtn           = document.querySelector('.close');
const toggleBtn          = document.getElementById('toggle-deck-btn');
const deckPanel          = document.querySelector('.deck');
const deckRenameBtn      = document.getElementById('deck-rename-btn');

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
function createCardDiv(card) {
    const deck = getCurrentDeck();
    const div = document.createElement('div');
    div.className = 'card';
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

    const name = document.createElement('h4');
    name.textContent = card.name;
    div.appendChild(name);

    const stats = document.createElement('div');
    stats.style.fontSize = '0.9em';
    stats.innerHTML = [
      card.hp !== undefined ? `HP: ${card.hp}` : '',
      card.atk !== undefined ? `ATK: ${card.atk}` : '',
      card.def !== undefined ? `DEF: ${card.def}` : '',
      card.cost !== undefined ? `Cost: ${card.cost}` : ''
    ].filter(Boolean).join(' | ');
    if (stats.innerHTML.trim() !== '') div.appendChild(stats);

    const details = document.createElement('div');
    details.style.fontSize = '0.8em';
    details.textContent = [
      card.rarity,
      Array.isArray(card.type) ? card.type.join(', ') : card.type
    ].filter(Boolean).join(' | ');
    if (details.textContent.trim() !== '') div.appendChild(details);

    const btn = document.createElement('button');
    btn.textContent = "Add";
    btn.classList.add('btn-secondary');
    btn.disabled = !canAddCard(card);
    btn.onclick = () => {
    if (!canAddCard(card)) return;
    deck[card.id] = (deck[card.id] || 0) + 1;
    setCurrentDeck(deck);
    updateDeckDisplay();
    renderGallery();
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
    renderGallery();
    setTimeout(() => deckPanel.classList.add('show'), 0);
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
    renderGallery();
    deckPanel.classList.add('show');
  };
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
function canAddCard(card) {
    const deck = getCurrentDeck();
    const count = deck[card.id] || 0;
    const total = Object.values(deck).reduce((a, b) => a + b, 0);
    if (total >= 50) return false;
    if (card.rarity && card.rarity.toLowerCase() === 'legendary' && count >= 1) return false;
    if (card.rarity && card.rarity.toLowerCase() === 'rare' && count >= 2) return false;
    if (card.rarity && card.rarity.toLowerCase() === 'common' && count >= 3) return false;
    return true;
}
function renderDeckList(deck, deckContainer) {
  deckContainer.innerHTML = '';
  // Group cards by type or whatever logic you have
  for (const [type, cards] of Object.entries(deck.categories)) {
    const section = document.createElement('div');
    section.innerHTML = `<strong>${type}</strong>`;
    deckContainer.appendChild(section);
    for (const cardObj of cards) {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'deck-list-card-row';

      // Card image
      const img = document.createElement('img');
      img.src = cardObj.image;
      img.className = 'deck-list-thumb';
      cardDiv.appendChild(img);

      // Name and count
      const nameSpan = document.createElement('span');
      nameSpan.textContent = `${cardObj.name} ×${cardObj.count}`;
      cardDiv.appendChild(nameSpan);

      // Add "+" button
      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';
      plusBtn.className = 'deck-add-btn';
      plusBtn.onclick = (e) => {
        e.stopPropagation();
        addCardToDeck(cardObj.id); // Your add logic
        renderDeckList(deck, deckContainer);
      };
      cardDiv.appendChild(plusBtn);

      // Remove "-" button
      const minusBtn = document.createElement('button');
      minusBtn.textContent = '–';
      minusBtn.className = 'deck-remove-btn';
      minusBtn.onclick = (e) => {
        e.stopPropagation();
        removeCardFromDeck(cardObj.id); // Your remove logic
        renderDeckList(deck, deckContainer);
      };
      cardDiv.appendChild(minusBtn);

      // Directly open modal on card click (no menu)
      cardDiv.onclick = (e) => {
        e.stopPropagation();
        // Use full card data if available (from dummyCards)
        const fullCard = dummyCards.find(c => c.id === cardObj.id) || cardObj;
        showFullCardModal(fullCard);
      };

      deckContainer.appendChild(cardDiv);
    }
  }
}
function renderGallery() {
    gallery.innerHTML = '';
    const selectedColor = document.getElementById('filter-color').value.toLowerCase();
    const selectedType = document.getElementById('filter-type').value.toLowerCase();
    const selectedRarity = document.getElementById('filter-rarity').value.toLowerCase();
    const nameFilter = document.getElementById('filter-name').value.toLowerCase();
    const selectedArchetype = document.getElementById('filter-archetype').value.toLowerCase();
    const selectedAbility = document.getElementById('filter-ability').value.toLowerCase();
    const selectedCategory = document.getElementById('filter-category').value.toLowerCase();
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
      gallery.appendChild(createCardDiv(card));
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
    renderGallery();
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
    renderGallery();
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
  renderGallery();
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
    renderGallery();
  });
// FILTER COLOR EVENTS
  document.getElementById('filter-color').addEventListener('change', (e) => {
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
  document.getElementById('filter-name').addEventListener('input', renderGallery);
  document.getElementById('filter-color').addEventListener('change', renderGallery);
  document.getElementById('filter-category').addEventListener('change', renderGallery);
  document.getElementById('filter-type').addEventListener('change', renderGallery);
  document.getElementById('filter-rarity').addEventListener('change', renderGallery);
  document.getElementById('filter-archetype').addEventListener('change', renderGallery);
  document.getElementById('filter-ability').addEventListener('change', renderGallery);
  document.getElementById('reset-deck-btn').onclick = () => {
    const deck = getCurrentDeck();
    for (const key in deck) {
      delete deck[key];
    }
    setCurrentDeck(deck);
    updateDeckDisplay();
    renderGallery();
  };
  // Deck toggle logic
  toggleBtn.onclick = () => {
    deckPanel.classList.toggle('show');
    document.body.classList.toggle('deck-open', deckPanel.classList.contains('show'));
  };
  window.addEventListener('click', (e) => {
    if (!deckPanel.contains(e.target) && e.target !== toggleBtn && deckPanel.classList.contains('show')) {
      deckPanel.classList.remove('show');
    }
  });

// ==========================
// === INITIALIZATION ===
// ==========================
loadDeckState();
refreshDeckSlotSelect();
updateDeckDisplay();
renderGallery();
showBuilder();
