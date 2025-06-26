// ==========================
// === SHOP LOGIC ===
// ==========================

// DOM references
const shopSection = document.getElementById('shop-section');
const shopContainer = document.getElementById('shop-container');
const packOptions = document.getElementById('pack-options');
const packOpeningArea = document.getElementById('pack-opening-area');
const closeShopBtn = document.getElementById('close-shop-btn');
 
// Helper: get N random cards from dummyCards
function getRandomCards(n, setName) {
  // Only cards whose set matches setName
  const available = dummyCards.filter(card => Array.isArray(card.set) ? card.set.includes(setName) : card.set === setName);
  const result = [];
  for (let i = 0; i < n; i++) {
    if (available.length === 0) break;
    const idx = Math.floor(Math.random() * available.length);
    result.push(available[idx]);
    available.splice(idx, 1); // Prevent duplicates in one pack
  }
  return result;
}

// Helper: Track which cards are "new" when opening a pack
function getNewlyUnlockedCards() {
  return JSON.parse(localStorage.getItem("newlyUnlockedCards")) || [];
}
function setNewlyUnlockedCards(arr) {
  localStorage.setItem("newlyUnlockedCards", JSON.stringify(arr));
}

let lastPackCards = [];
let lastPackNewIds = [];
// Open pack logic
function openPack(type) {
  const collection = getCollection(); 
  const cards = getRandomCards(10, type);

  // Determine which cards are "new" in this pack (not owned before this pack)
  lastPackNewIds = [];
  cards.forEach(card => {
    if (!collection[card.id]) lastPackNewIds.push(card.id);
  }); 
 
  lastPackCards = cards;
  packOpeningArea.innerHTML = `
    <div class="opened-pack-row" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
      ${cards.map((card, i) => `
        <div class="opened-card opened-card-flip" data-card-idx="${i}">
          <div class="opened-card-inner">
            <div class="opened-card-back">
              <img src="CardImages/Domains/placeholder.png" alt="Card Back" style="width:100px;height:auto;display:block;margin:auto;">
            </div>
            <div class="opened-card-front" style="position:relative;">
              <img src="${card.image}" alt="${card.name}" style="width:100px;height:auto;display:block;margin:auto;">
              <!-- New badge will be injected here after flip if needed -->
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Animate cards in sequence: flip from back to front
  const cardDivs = packOpeningArea.querySelectorAll('.opened-card');
  cardDivs.forEach((div, i) => {
    setTimeout(() => {
      div.classList.add('flipped');
      setTimeout(() => {
        // After flip animation, attach onclick to card front
        const idx = parseInt(div.getAttribute('data-card-idx'), 10);
        const front = div.querySelector('.opened-card-front');

        // Add "New!" badge if the card is new in this pack
        const card = lastPackCards[idx];
        if (lastPackNewIds.includes(card.id)) {
          // Add badge if not already present
          if (!front.querySelector('.new-card-badge')) {
            const badge = document.createElement('div');
            badge.className = 'new-card-badge';
            badge.textContent = 'New!';
            front.appendChild(badge);
          }
        }
       
        if (front && typeof window.showFullCardModal === 'function') {
          front.onclick = () => {
            const card = lastPackCards[idx];
            window.showFullCardModal(card);
          };
        }
      }, 600); // after flip
    }, 250 * i);
  });

  // Update collection and "new" list
  cards.forEach(card => addToCollection(card.id, 1));
  // Update the global "new" list for gallery etc.
  if (lastPackNewIds.length > 0) {
    let newCards = getNewlyUnlockedCards();
    lastPackNewIds.forEach(id => {
      if (!newCards.includes(id)) newCards.push(id);
    });
    setNewlyUnlockedCards(newCards);
  }
  if (window.renderGallery) renderGallery();
}

// Handle pack button click
packOptions.addEventListener('click', (e) => {
  if (e.target.matches('button[data-pack]')) {
    const packType = e.target.getAttribute('data-pack');
    openPack(packType);
  }
});

shopContainer.addEventListener('click', (e) => {
  if (!e.target.closest('.opened-card') && !e.target.matches('button[data-pack]')) {
    packOpeningArea.innerHTML = '';
  }
});

// Close shop button
closeShopBtn.addEventListener('click', () => {
  packOpeningArea.innerHTML = '';
});

function renderShop() {
  packOpeningArea.innerHTML = '';
}
window.renderShop = renderShop;
