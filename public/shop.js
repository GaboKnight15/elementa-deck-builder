// ==========================
// === SHOP LOGIC ===
// ==========================

// DOM references
const shopSection = document.getElementById('shop-section');
const shopContainer = document.getElementById('shop-container');
const packOptions = document.getElementById('pack-options');
const packOpeningArea = document.getElementById('pack-opening-area');
 
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

// Open pack logic
function openPack(type) {
  const cards = getRandomCards(10);
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
              <div style="font-weight:bold;font-size:1em;margin-top:2px;">${card.name}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:10px;font-size:0.95em;color:#888;">(Cards will disappear when you leave or do another action)</div>
  `;

  // Animate cards in sequence: flip from back to front
  const cardDivs = packOpeningArea.querySelectorAll('.opened-card');
  cardDivs.forEach((div, i) => {
    setTimeout(() => {
      div.classList.add('flipped');
      setTimeout(() => {
        const btn = div.querySelector('.view-card-btn');
        if (btn) btn.style.display = '';
      }, 600);
    }, 250 * i);
  });
 // Add View button functionality
  packOpeningArea.addEventListener('click', function onClick(e) {
    if (e.target.classList.contains('view-card-btn')) {
      const idx = parseInt(e.target.dataset.cardIdx, 10);
      const card = cards[idx];
      if (card && typeof window.viewCard === 'function') {
        window.viewCard(card); // or pass card.id if your viewer expects id
      }
    }
  }, { once: true }); 
}

// Handle pack button click
packOptions.addEventListener('click', (e) => {
  if (e.target.matches('button[data-pack]')) {
    const packType = e.target.getAttribute('data-pack');
    openPack(packType);
  }
});

// Dismiss opened pack when clicking outside or doing another shop action
shopContainer.addEventListener('click', (e) => {
  // Only clear if not clicking a pack button
  if (!e.target.closest('.opened-card') && !e.target.matches('button[data-pack]')) {
    packOpeningArea.innerHTML = '';
  }
});

// Optionally, expose functions for navigation
window.showShop = function () {
  shopSection.style.display = '';
  shopContainer.style.display = '';
};
window.hideShop = function () {
  shopSection.style.display = 'none';
  shopContainer.style.display = 'none';
  packOpeningArea.innerHTML = '';
};
