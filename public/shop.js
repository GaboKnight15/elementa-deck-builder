// ==========================
// === SHOP LOGIC ===
// ==========================

// DOM references
const shopSection = document.getElementById('shop-section');
const shopContainer = document.getElementById('shop-container');
// At the top, get modal DOM:
const packOpeningModal = document.getElementById('pack-opening-modal');
const packOpeningModalContent = document.getElementById('pack-opening-modal-content');
const openedPackRowModal = document.getElementById('opened-pack-row-modal');
const closePackOpeningModalBtn = document.getElementById('close-pack-opening-modal');
// These should match your iconOptions in auth.js!
const allAvatarOptions = [
  "CardImages/Avatars/Avatar1.png",
  "CardImages/Avatars/Avatar2.png",
  "CardImages/Avatars/Avatar3.png",
  "CardImages/Avatars/Avatar4.png",
  "CardImages/Avatars/Avatar5.png"
];
const allBannerOptions = [
  "CardImages/Banners/Banner1.jpg",
  "CardImages/Banners/Banner2.jpg",
  "CardImages/Banners/Banner3.jpg"
  // Add your "DefaultBanner.jpg" path when ready
];
const allCardbackOptions = [
  "CardImages/Cardbacks/Cardback1.png",
  "CardImages/Cardbacks/Cardback2.png",
  "CardImages/Cardbacks/DefaultCardback.png"
];
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
    const wrapper = document.createElement('div');
    wrapper.className = 'shop-avatar-option';
    const img = document.createElement('img');
    img.src = src;
    img.className = 'shop-avatar-img';
    if (unlocked.includes(src)) {
      img.classList.add('unlocked');
    }
    wrapper.appendChild(img);

    const btn = document.createElement('button');
    btn.className = 'btn-secondary';
    if (unlocked.includes(src)) {
      btn.textContent = 'Unlocked';
      btn.disabled = true;
    } else {
      btn.textContent = 'Get';
      btn.onclick = () => {
        const updated = getUnlockedAvatars();
        if (!updated.includes(src)) {
          updated.push(src);
          setUnlockedAvatars(updated);
          renderShopAvatars();
          alert('Avatar unlocked! Now available in your profile.');
        }
      };
    }
    wrapper.appendChild(btn);
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
    const wrapper = document.createElement('div');
    wrapper.className = 'shop-banner-option';
    const img = document.createElement('img');
    img.src = src;
    img.className = 'shop-banner-img';
    if (unlocked.includes(src)) {
      img.classList.add('unlocked');
    }
    wrapper.appendChild(img);

    const btn = document.createElement('button');
    btn.className = 'btn-secondary';
    if (unlocked.includes(src)) {
      btn.textContent = 'Unlocked';
      btn.disabled = true;
    } else {
      btn.textContent = 'Get';
      btn.onclick = () => {
        const updated = getUnlockedBanners();
        if (!updated.includes(src)) {
          updated.push(src);
          setUnlockedBanners(updated);
          renderShopBanners();
          alert('Banner unlocked! Now available in your profile.');
        }
      };
    }
    wrapper.appendChild(btn);
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
    const wrapper = document.createElement('div');
    wrapper.className = 'shop-cardback-option';
    const img = document.createElement('img');
    img.src = src;
    img.className = 'shop-cardback-img';
    if (unlocked.includes(src)) {
      img.classList.add('unlocked');
    }
    wrapper.appendChild(img);

    const btn = document.createElement('button');
    btn.className = 'btn-secondary';
    if (unlocked.includes(src)) {
      btn.textContent = 'Unlocked';
      btn.disabled = true;
    } else {
      btn.textContent = 'Get';
      btn.onclick = () => {
        const updated = getUnlockedCardbacks();
        if (!updated.includes(src)) {
          updated.push(src);
          setUnlockedCardbacks(updated);
          renderShopCardbacks();
          if (window.renderDeckCardbackChoices) window.renderDeckCardbackChoices();
          alert('Cardback unlocked! Now available in your deck options.');
        }
      };
    }
    wrapper.appendChild(btn);
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

function renderShop() {
}
window.renderShop = renderShop;
