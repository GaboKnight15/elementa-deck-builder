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
function getRandomCards(n) {
  // Use a shallow copy so we don't mutate original
  const available = [...dummyCards];
  const result = [];
  for (let i = 0; i < n; i++) {
    if (available.length === 0) break;
    // Pick a random index
    const idx = Math.floor(Math.random() * available.length);
    result.push(available[idx]);
    // Optionally, remove card for unique pulls:
    // available.splice(idx, 1);
    // But for now, allow duplicates (like a real pack)
  }
  return result;
}

let lastPackCards = [];
// Open pack logic
function openPack(type) {
  const cards = getRandomCards(10);
  lastPackCards = cards;
  packOpeningArea.innerHTML = `
    <div class="opened-pack-row" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
      ${cards.map(card => `
        <div class="opened-card opened-card-flip">
          <div class="opened-card-inner">
            <div class="opened-card-back">
              <img src="CardImages/Domains/placeholder.png" alt="Card Back" style="width:100px;height:auto;display:block;margin:auto;">
            </div>
            <div class="opened-card-front">
              <img src="${card.image}" alt="${card.name}" style="width:100px;height:auto;display:block;margin:auto;">
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
        if (front && typeof window.showFullCardModal === 'function') {
          front.onclick = () => {
            const card = lastPackCards[idx];
            window.showFullCardModal(card);
          };
        }
      }, 600); // after flip
    }, 250 * i);
  });
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
  shopSection.classList.remove('active');
  packOpeningArea.innerHTML = '';
  // Optionally, switch to gallery or another main section:
  document.getElementById('gallery-section').classList.add('active');
});
// Optionally, expose functions for navigation
window.showShop = function () {
  // Use only .active class for section visibility!
  document.querySelectorAll('section[id$="-section"]').forEach(section => {
    section.classList.remove('active');
  });
  shopSection.classList.add('active');
};
window.hideShop = function () {
  shopSection.classList.remove('active');
  packOpeningArea.innerHTML = '';
};
