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

// Open pack logic
function openPack(type) {
  // For now, no type-based odds
  const cards = getRandomCards(10);
  // Show cards in packOpeningArea
  packOpeningArea.innerHTML = `
    <div class="opened-pack-row" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
      ${cards.map(card => `
        <div class="opened-card" style="text-align:center;">
          <img src="${card.image}" alt="${card.name}" style="width:110px;height:auto;display:block;margin:auto;">
          <div style="font-weight:bold;font-size:1em;margin-top:2px;">${card.name}</div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:10px;font-size:0.95em;color:#888;">(Cards will disappear when you leave or do another action)</div>
  `;
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

// Close shop button
closeShopBtn.addEventListener('click', () => {
  shopSection.style.display = 'none';
  shopContainer.style.display = 'none';
  packOpeningArea.innerHTML = '';
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
