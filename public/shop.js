// ==========================
// === SHOP LOGIC ===
// ==========================

// DOM references
const shopSection = document.getElementById('shop-section');
const shopContainer = document.getElementById('shop-container');
const packOpeningModal = document.getElementById('pack-opening-modal');
const packOpeningModalContent = document.getElementById('pack-opening-modal-content');
const openedPackRowModal = document.getElementById('opened-pack-row-modal');
const closePackOpeningModalBtn = document.getElementById('close-pack-opening-modal');
// These should match your iconOptions in auth.js!
// Arrays of image paths
const allAvatarOptions = [
      "CardImages/Avatars/Faelyra.png",
      "CardImages/Avatars/Kaelyn.png",
      "CardImages/Avatars/Zaryon.png",
      "CardImages/Avatars/Zyra.png",
      "CardImages/Avatars/Veniryss.png",
      "CardImages/Avatars/Gravok.png",
      "CardImages/Avatars/Nyzariel.png",
      "CardImages/Avatars/Elyndra.png",
      "CardImages/Avatars/Aureavian.png",
      "CardImages/Avatars/Maldryss.png",
      "CardImages/Avatars/Tydros.png",
      "CardImages/Avatars/Ephoros.png",
      "CardImages/Avatars/Mordrath.png",
      "CardImages/Avatars/Raukhar.png",
      "CardImages/Avatars/Velmira.png",
      "CardImages/Avatars/Verdarok.png",
      "CardImages/Avatars/Pyronyx.png",
      "CardImages/Avatars/Abyndra.png",
      "CardImages/Avatars/Voltrazek.png",
      "CardImages/Avatars/Toxigon.png",
      "CardImages/Avatars/Ferronyx.png",
      "CardImages/Avatars/Nochtyros.png",
      "CardImages/Avatars/Solaryth.png"
];
const allBannerOptions = [
    "CardImages/Banners/Verdara.png",
    "CardImages/Banners/Ashkar.png",
    "CardImages/Banners/Pearlhaven.png",
    "CardImages/Banners/Aetherion.png",
    "CardImages/Banners/Drakzul.png",
    "CardImages/Banners/GlimbarkFrontier.png",
    "CardImages/Banners/SkywardArchipelago.png",
    "CardImages/Banners/Duskhaven.png",
    "CardImages/Banners/Nochtyra.png",
    "CardImages/Banners/Solmara.png", 
];
const allCardbackOptions = [
  "CardImages/Cardbacks/Cardback1.png",
  "CardImages/Cardbacks/Cardback2.png",
  "CardImages/Cardbacks/DefaultCardback.png"
];
const packPrices = {
  "StandardPack": 100,
  "StandardPack2": 100,
  // Add more if you have more packs, e.g. "RiseOfDragons": 200,
};
// Price maps
const avatarPrices = {
      "CardImages/Avatars/Faelyra.png": 100,
      "CardImages/Avatars/Kaelyn.png": 100,
      "CardImages/Avatars/Zaryon.png": 100,
      "CardImages/Avatars/Zyra.png": 100,
      "CardImages/Avatars/Veniryss.png": 100,
      "CardImages/Avatars/Gravok.png": 100,
      "CardImages/Avatars/Nyzariel.png": 100,
      "CardImages/Avatars/Elyndra.png": 100,
      "CardImages/Avatars/Aureavian.png": 100,
      "CardImages/Avatars/Maldryss.png": 100,
      "CardImages/Avatars/Tydros.png": 100,
      "CardImages/Avatars/Ephoros.png": 100,
      "CardImages/Avatars/Mordrath.png": 100,
      "CardImages/Avatars/Raukhar.png": 100,
      "CardImages/Avatars/Velmira.png": 100,
      "CardImages/Avatars/Verdarok.png": 100,
      "CardImages/Avatars/Pyronyx.png": 100,
      "CardImages/Avatars/Abyndra.png": 100,
      "CardImages/Avatars/Voltrazek.png": 100,
      "CardImages/Avatars/Toxigon.png": 100,
      "CardImages/Avatars/Ferronyx.png": 100,
      "CardImages/Avatars/Nochtyros.png": 100,
      "CardImages/Avatars/Solaryth.png": 100
};
const bannerPrices = {
    "CardImages/Banners/Verdara.png": 100,
    "CardImages/Banners/Ashkar.png": 100,
    "CardImages/Banners/Pearlhaven.png": 100,
    "CardImages/Banners/Aetherion.png": 100,
    "CardImages/Banners/Drakzul.png": 100,
    "CardImages/Banners/GlimbarkFrontier.png": 100,
    "CardImages/Banners/SkywardArchipelago.png": 100,
    "CardImages/Banners/Duskhaven.png": 100,
    "CardImages/Banners/Nochtyra.png": 100,
    "CardImages/Banners/Solmara.png": 100 
};
const cardbackPrices = {
  "CardImages/Cardbacks/Cardback1.png": 100,
  "CardImages/Cardbacks/Cardback2.png": 100,
  "CardImages/Cardbacks/DefaultCardback.png": 100
};
// Modal for confirmation
let cosmeticConfirmModal = null;

// Modal Creation Utility
function showCosmeticConfirmModal({imgSrc, type, price, onConfirm}) {
  if (cosmeticConfirmModal) cosmeticConfirmModal.remove();
  cosmeticConfirmModal = document.createElement('div');
  cosmeticConfirmModal.className = 'modal';
  cosmeticConfirmModal.style.display = 'flex';
  cosmeticConfirmModal.style.alignItems = 'center';
  cosmeticConfirmModal.style.justifyContent = 'center';
  cosmeticConfirmModal.innerHTML = `
    <div class="modal-content" style="align-items:center;max-width:320px;">
      <h3>Are you sure you want to purchase?</h3>
      <img src="${imgSrc}" alt="Cosmetic Preview" style="max-width:120px;max-height:120px;border-radius:12px;box-shadow:0 2px 10px #0005;margin:10px 0;">
      <div class="currency-display" style="margin:10px 0;">
        <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins">
        <span>${price}</span>
      </div>
      <div style="display:flex;gap:18px;justify-content:center;margin-top:8px;">
        <button id="cosmetic-get-btn" class="btn-primary">Get</button>
        <button id="cosmetic-cancel-btn" class="btn-secondary">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(cosmeticConfirmModal);

  // Confirm
  cosmeticConfirmModal.querySelector('#cosmetic-get-btn').onclick = function() {
  this.disabled = true;
  const purchaseSucceeded = onConfirm();
  if (purchaseSucceeded === false) {
    this.disabled = false; // re-enable so user can try again
    return;
  }
  cosmeticConfirmModal.remove();
  cosmeticConfirmModal = null;
};
  // Cancel
  cosmeticConfirmModal.querySelector('#cosmetic-cancel-btn').onclick = function() {
    cosmeticConfirmModal.remove();
    cosmeticConfirmModal = null;
  };
  // Clicking outside closes
  cosmeticConfirmModal.onclick = function(e) {
    if (e.target === cosmeticConfirmModal) {
      cosmeticConfirmModal.remove();
      cosmeticConfirmModal = null;
    }
  };
}
// RNG
function getRandomCards(n, setName) {
  // Only cards whose set matches setName
  const available = dummyCards.filter(card => Array.isArray(card.set) ? card.set.includes(setName) : card.set === setName);
  const result = [];
  for (let i = 0; i < n; i++) {
    if (available.length === 0) break;
    const idx = Math.floor(Math.random() * available.length);
    result.push(available[idx]);
  }
  return result;
}
// CURRENCY DEDUCTION
function purchaseCosmetic(cost, purchaseCallback) {
  let balance = getCurrency();
  if (balance < cost) {
    alert("Not enough coins!");
    return false;
  }
  setCurrency(balance - cost);
  purchaseCallback();
  return true;
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

  // OPENED PACK MODAL
  openedPackRowModal.innerHTML = cards.map((card, i) => `
    <div class="opened-card opened-card-flip" data-card-idx="${i}">
      <div class="opened-card-inner">
        <div class="opened-card-back">
          <img src="CardImages/Domains/placeholder.png" alt="Card Back" style="width:100px;height:auto;display:block;margin:auto;">
        </div>
        <div class="opened-card-front">
          <img src="${card.image}" alt="${card.name}" style="width:100px;height:auto;display:block;margin:auto;">
        </div>
      </div>
    </div>
  `).join('');
  packOpeningModal.style.display = "flex";

  // Animate cards in sequence: flip from back to front
  const cardDivs = openedPackRowModal.querySelectorAll('.opened-card');
  cardDivs.forEach((div, i) => {
    setTimeout(() => {
          // Play the flip sound
      const flipSnd = document.getElementById('card-flip-sound');
      if (flipSnd) {
        flipSnd.currentTime = 0;
        flipSnd.play();
      }
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

// Handle closing the modal
closePackOpeningModalBtn.onclick = () => {
  packOpeningModal.style.display = "none";
  openedPackRowModal.innerHTML = '';
};

// Clicking outside modal-content closes modal
packOpeningModal.onclick = function(e) {
  if (e.target === packOpeningModal) {
    packOpeningModal.style.display = "none";
    openedPackRowModal.innerHTML = '';
  }
};

// Handle pack image click
const packImages = document.querySelectorAll('.pack-image');
packImages.forEach(img => {
  img.onclick = function(e) {
    e.stopPropagation();
    openPack(img.dataset.pack);
    img.blur();
  };
  img.tabIndex = 0;
  img.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
      openPack(img.dataset.pack);
      img.blur();
    }
  });
});

shopContainer.addEventListener('click', (e) => {
  if (
    !e.target.closest('.opened-card') &&
    !e.target.closest('.pack-image') &&
    !e.target.matches('button[data-pack]')
  ) {
  }
});
function renderShopPacks() {
  const packOptionsDiv = document.getElementById('pack-options');
  if (!packOptionsDiv) return;
  // Clear and re-render to avoid double-wrapping
  const existing = Array.from(packOptionsDiv.querySelectorAll('.shop-pack-option'));
  existing.forEach(e => e.remove());

  const packImages = Array.from(packOptionsDiv.querySelectorAll('.pack-image'));
  packImages.forEach(img => {
    // Only process images not already inside a .shop-pack-option
    if (img.parentElement.classList.contains('shop-pack-option')) return;

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'shop-pack-option';

    // Move the image into the wrapper
    wrapper.appendChild(img);

    // Get price
    const price = packPrices[img.dataset.pack] || 100;

    // Create price tag
    const priceTag = document.createElement('span');
    priceTag.className = 'currency-display';
    priceTag.style.display = 'flex';
    priceTag.style.alignItems = 'center';
    priceTag.style.justifyContent = 'center';
    priceTag.style.marginTop = '8px';
    priceTag.innerHTML = `
      <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins">
      <span>${price}</span>
    `;

    wrapper.appendChild(priceTag);
    packOptionsDiv.appendChild(wrapper);

    // Style and setup click handler
    img.style.cursor = 'pointer';
    img.onclick = function(e) {
      e.stopPropagation();
      showCosmeticConfirmModal({
        imgSrc: img.src,
        type: 'pack',
        price,
        onConfirm: () => {
          const purchased = purchaseCosmetic(price, () => {
            openPack(img.dataset.pack);
          });
          // After successful purchase of a booster pack:
          if (purchased && typeof incrementMissionProgress === 'function') {
            incrementMissionProgress('purchase_pack_daily');
            incrementMissionProgress('purchase_pack_weekly');
          }
          return purchased;
        }
      });
    };
  });
}
function getUnlockedAvatars() {
  // You could use Firebase/cloud instead
  return JSON.parse(localStorage.getItem('unlockedAvatars') || '["CardImages/Avatars/Avatar1.png"]');
}
function setUnlockedAvatars(arr) {
  localStorage.setItem('unlockedAvatars', JSON.stringify(arr));
}

// Render avatars shop
function renderShopAvatars() {
  const grid = document.getElementById('shop-avatars-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const unlocked = getUnlockedAvatars();
  allAvatarOptions.forEach(src => {
    if (unlocked.includes(src)) return; // Hide unlocked
    const price = typeof avatarPrices[src] !== "undefined" ? avatarPrices[src] : 100;
    const wrapper = document.createElement('div');
    wrapper.className = 'shop-avatar-option';
    const img = document.createElement('img');
    img.src = src;
    img.className = 'shop-avatar-img';
    img.style.cursor = 'pointer';
    
    const priceTag = document.createElement('span');
    priceTag.className = 'currency-display';
    priceTag.style.display = 'flex';
    priceTag.style.alignItems = 'center';
    priceTag.style.justifyContent = 'center';
    priceTag.style.marginTop = '8px';
    priceTag.innerHTML = `
      <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins">
      <span>${price}</span>
    `;
    
    img.onclick = () => {
  showCosmeticConfirmModal({
    imgSrc: src,
    type: 'avatar',
    price,
    onConfirm: () => {
      purchaseCosmetic(price, () => {
        const updated = getUnlockedAvatars();
        if (!updated.includes(src)) {
          updated.push(src);
          setUnlockedAvatars(updated);
          renderShopAvatars();
          alert('Avatar unlocked! Now available in your profile.');
        }
      });
    }
  });
};
wrapper.appendChild(img);
wrapper.appendChild(priceTag);
grid.appendChild(wrapper);
});
}  
function getUnlockedBanners() {
  // Default to an empty array or include your default banner if you want
  return JSON.parse(localStorage.getItem('unlockedBanners') || '[]');
}
function setUnlockedBanners(arr) {
  localStorage.setItem('unlockedBanners', JSON.stringify(arr));
}
function renderShopBanners() {
  const grid = document.getElementById('shop-banners-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const unlocked = getUnlockedBanners();
  allBannerOptions.forEach(src => {
    if (unlocked.includes(src)) return; // Hide unlocked
    const price = typeof bannerPrices[src] !== "undefined" ? bannerPrices[src] : 100;
    const wrapper = document.createElement('div');
    wrapper.className = 'shop-banner-option';
    const img = document.createElement('img');
    img.src = src;
    img.className = 'shop-banner-img';
    img.style.cursor = 'pointer';

    const priceTag = document.createElement('span');
    priceTag.className = 'currency-display';
    priceTag.style.display = 'flex';
    priceTag.style.alignItems = 'center';
    priceTag.style.justifyContent = 'center';
    priceTag.style.marginTop = '8px';
    priceTag.innerHTML = `
      <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins">
      <span>${price}</span>
    `;
    
    img.onclick = () => {
      showCosmeticConfirmModal({
        imgSrc: src,
        type: 'banner',
        price,
        onConfirm: () => {
          purchaseCosmetic(price, () => {
          const updated = getUnlockedBanners();
          if (!updated.includes(src)) {
            updated.push(src);
            setUnlockedBanners(updated);
            renderShopBanners();
            alert('Banner unlocked! Now available in your profile.');
          }
         });   
        }
      });
    };
    wrapper.appendChild(img);
    wrapper.appendChild(priceTag);    
    grid.appendChild(wrapper);
  });
}
function getUnlockedCardbacks() {
  // Always default to at least the default cardback unlocked
  return JSON.parse(localStorage.getItem('unlockedCardbacks') || '["CardImages/Cardbacks/DefaultCardback.png"]');
}
function setUnlockedCardbacks(arr) {
  localStorage.setItem('unlockedCardbacks', JSON.stringify(arr));
}

// Render cardbacks shop
function renderShopCardbacks() {
  const grid = document.getElementById('shop-cardbacks-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const unlocked = getUnlockedCardbacks();
  allCardbackOptions.forEach(src => {
    if (unlocked.includes(src)) return; // Hide unlocked
    const price = typeof cardbackPrices[src] !== "undefined" ? cardbackPrices[src] : 100;
    const wrapper = document.createElement('div');
    wrapper.className = 'shop-cardback-option';
    const img = document.createElement('img');
    img.src = src;
    img.className = 'shop-cardback-img';
    img.style.cursor = 'pointer';
    
    const priceTag = document.createElement('span');
    priceTag.className = 'currency-display';
    priceTag.style.display = 'flex';
    priceTag.style.alignItems = 'center';
    priceTag.style.justifyContent = 'center';
    priceTag.style.marginTop = '8px';
    priceTag.innerHTML = `
      <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins">
      <span>${price}</span>
    `;
    
    img.onclick = () => {
      showCosmeticConfirmModal({
        imgSrc: src,
        type: 'cardback',
        price,
        onConfirm: () => {
          purchaseCosmetic(price, () => {
            const updated = getUnlockedCardbacks();
            if (!updated.includes(src)) {
              updated.push(src);
              setUnlockedCardbacks(updated);
              renderShopCardbacks();
              if (window.renderDeckCardbackChoices) window.renderDeckCardbackChoices();
              alert('Cardback unlocked! Now available in your deck options.');
              }
            });
          }
      });
    };
    wrapper.appendChild(img);
    wrapper.appendChild(priceTag);    
    grid.appendChild(wrapper);
  });
}

// INITIALIZATION //
renderShopCardbacks();
window.renderShopCardbacks = renderShopCardbacks;
renderShopBanners();
window.renderShopBanners = renderShopBanners;
renderShopAvatars();
window.renderShopAvatars = renderShopAvatars;

// Cosmetic shop free unlock handlers
document.querySelectorAll('.shop-free-btn').forEach(btn => {
  btn.onclick = function() {
    const type = btn.dataset.type;
    // For now, just show a popup/alert for demo
    switch(type) {
      case 'profile-pic':
        alert("You unlocked a new avatar! (Feature coming soon)");
        break;
      case 'banner':
        alert("You unlocked a new banner! (Feature coming soon)");
        break;
      case 'cardback':
        alert("You unlocked a new sleeve! (Feature coming soon)");
        break;
      case 'single-card':
        alert("You unlocked a new card! (Feature coming soon)");
        break;
    }
  };
});

function renderShop() {}
window.renderShop = renderShop;
renderShopPacks();
