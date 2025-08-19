// ========================== 
// === SHOP LOGIC ===
// ========================== 
window.playerUnlockedAvatars = window.playerUnlockedAvatars || [];
window.unlockedAvatars = window.unlockedAvatars || [];
window.playerUnlockedBanners = window.playerUnlockedBanners || [];
window.unlockedBanners = window.unlockedBanners || [];
window.playerUnlockedCardbacks = window.playerUnlockedCardbacks || [];
window.unlockedCardbacks = window.unlockedCardbacks || [];
window.playerUnlockedCosmetics = window.playerUnlockedCosmetics || [];
window.unlockedCosmetics = window.unlockedCosmetics || [];
// DOM references 
const shopSection = document.getElementById('shop-section');
const shopContainer = document.getElementById('shop-container');
const packOpeningModal = document.getElementById('pack-opening-modal');
const packOpeningModalContent = document.getElementById('pack-opening-modal-content');
const openedPackRowModal = document.getElementById('opened-pack-row-modal');
const closePackOpeningModalBtn = document.getElementById('close-pack-opening-modal');
const allAvatarOptions = [
      { src: "CardImages/Avatars/Fairy.png", price: 10 },
      { src: "CardImages/Avatars/Emberling.png", price: 10 },
      { src: "CardImages/Avatars/WaterElemental.png", price: 10 },
      { src: "CardImages/Avatars/Thunderspawn.png", price: 10 },
      { src: "CardImages/Avatars/Goblin.png", price: 10 },
      { src: "CardImages/Avatars/RockLizard.png", price: 10 },
      { src: "CardImages/Avatars/Wolf.png", price: 10 },
      { src: "CardImages/Avatars/AngelicWarrior.png", price: 10 },
  { src: "CardImages/Avatars/Faelyra.png", price: 100 },
  { src: "CardImages/Avatars/Kaelyn.png", price: 100 },
  { src: "CardImages/Avatars/Zaryon.png", price: 100 },
  { src: "CardImages/Avatars/Zyra.png", price: 100 },
  { src: "CardImages/Avatars/Veniryss.png", price: 100 },
  { src: "CardImages/Avatars/Gravok.png", price: 100 },
  { src: "CardImages/Avatars/Nyzariel.png", price: 100 },
  { src: "CardImages/Avatars/Elyndra.png", price: 100 },
  { src: "CardImages/Avatars/Aureavian.png", price: 100 },
  { src: "CardImages/Avatars/Maldryss.png", price: 100 },
  { src: "CardImages/Avatars/Tydros.png", price: 100 },
  { src: "CardImages/Avatars/Ephoros.png", price: 100 },
  { src: "CardImages/Avatars/Mordrath.png", price: 100 },
  { src: "CardImages/Avatars/Raukhar.png", price: 100 },
  { src: "CardImages/Avatars/Velmira.png", price: 100 },
  { src: "CardImages/Avatars/Verdarok.png", price: 100 },
  { src: "CardImages/Avatars/Pyronyx.png", price: 100 },
  { src: "CardImages/Avatars/Abyndra.png", price: 100 },
  { src: "CardImages/Avatars/Voltrazek.png", price: 100 },
  { src: "CardImages/Avatars/Toxigon.png", price: 100 },
  { src: "CardImages/Avatars/Ferronyx.png", price: 100 },
  { src: "CardImages/Avatars/Nochtyros.png", price: 100 },
  { src: "CardImages/Avatars/Solaryth.png", price: 100 }
];

const allBannerOptions = [
  { src: "CardImages/Banners/Verdara.png", price: 100 },
  { src: "CardImages/Banners/Ashkar.png", price: 100 },
  { src: "CardImages/Banners/Pearlhaven.png", price: 100 },
  { src: "CardImages/Banners/Aetherion.png", price: 100 },
  { src: "CardImages/Banners/Drakzul.png", price: 100 },
  { src: "CardImages/Banners/GlimbarkFrontier.png", price: 100 },
  { src: "CardImages/Banners/SkywardArchipelago.png", price: 100 },
  { src: "CardImages/Banners/Duskhaven.png", price: 100 },
  { src: "CardImages/Banners/Nochtyra.png", price: 100 },
  { src: "CardImages/Banners/Solmara.png", price: 100 }
];

const allCardbackOptions = [
  { src: "OtherImages/Cardbacks/Cardback1.png", price: 10 },
  { src: "OtherImages/Cardbacks/CBFairy.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBCindercore.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBConstructs.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBCoralbound.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBFirelands.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBGoblins.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBGolemheart.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBMerfolk.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBMoonfang.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBSatyr.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBShadowbound.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBStonebound.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBStormcore.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBVenomcore.png", price: 100 },
  { src: "OtherImages/Cardbacks/CBWoodframe.png", price: 100 }
];
const packPrices = {
  "StandardPack": 100,
  "StandardPack2": 100,
  // "ScalesofRuin": 100,"WyrmheartAwakening": 100,"MischiefUnbound": 100,"PrimordialAscension": 100,"IronbornProtocol": 100,"SavageTerritory": 100,"FeatheredOmen": 100,
};
// --- Shop Key Bases for localStorage ---
const INDIVIDUAL_CARDS_SHOP_KEY_BASE = "shopIndividualCards";
const INDIVIDUAL_CARDS_RESET_KEY_BASE = "shopIndividualCardsReset";
const INDIVIDUAL_CARDS_PURCHASED_KEY_BASE = "shopIndividualCardsPurchased";

const INDIVIDUAL_CARDS_SHOP_KEY = getUserShopKey(INDIVIDUAL_CARDS_SHOP_KEY_BASE);
const INDIVIDUAL_CARDS_RESET_KEY = getUserShopKey(INDIVIDUAL_CARDS_RESET_KEY_BASE);
const INDIVIDUAL_CARDS_PURCHASED_KEY = getUserShopKey(INDIVIDUAL_CARDS_PURCHASED_KEY_BASE);
const INDIVIDUAL_CARD_SLOTS = [
  { rarity: "Legendary", count: 1 },
  { rarity: "Epic", count: 2 },
  { rarity: "Rare", count: 3 },
  { rarity: "Common", count: 4 }
];
const individualCardPrices = {
  "Legendary": 1000,
  "Epic": 400,
  "Rare": 120,
  "Common": 30
};
const INDIVIDUAL_CARDS_REFRESH_COST = 250;

let individualCardsTimerInterval = null;
let cosmeticConfirmModal = null;

document.getElementById('shop-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('shop-back-btn').onclick = function() {
  document.getElementById('shop-section').classList.remove('active');
  document.getElementById('home-section').classList.add('active');
};

function showCosmeticConfirmModal({imgSrc, type, price, onConfirm}) {
  if (cosmeticConfirmModal) 
  cosmeticConfirmModal.remove();
  cosmeticConfirmModal = null;
  cosmeticConfirmModal = document.createElement('div');
  cosmeticConfirmModal.className = 'modal';
  cosmeticConfirmModal.style.display = 'flex';
  cosmeticConfirmModal.style.alignItems = 'center';
  cosmeticConfirmModal.style.justifyContent = 'center';
  cosmeticConfirmModal.innerHTML = `
    <div class="modal-content">
      <img src="${imgSrc}" alt="Cosmetic Preview" style="max-width:120px;max-height:120px;border-radius:12px;box-shadow:0 2px 10px #0005;">
      <div class="currency-display" style="margin:10px 0;">
        <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins">
        <span>${price}</span>
      </div>
      <div style="display:flex;gap:18px;justify-content:center;margin-top:8px;">
        <button id="cosmetic-get-btn" class="btn-secondary">Get</button>
        <button id="cosmetic-cancel-btn" class="btn-negative-secondary">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(cosmeticConfirmModal);

  // Confirm
  cosmeticConfirmModal.querySelector('#cosmetic-get-btn').onclick = function() {
    this.disabled = true;
    onConfirm(function(purchaseSucceeded) {
      if (purchaseSucceeded === false) {
        cosmeticConfirmModal.querySelector('#cosmetic-get-btn').disabled = false; // re-enable so user can try again
        return;
      }
      cosmeticConfirmModal.remove();
      cosmeticConfirmModal = null;
    });
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
function purchaseCosmetic(cost, purchaseCallback, done) {
  let balance = getCurrency();
  if (typeof balance !== "number" || balance < cost) {
    showToast("Not enough coins!", { type: "error" });
    if (typeof done === "function") done(false);
    return false;
  }
  playerCurrency = balance - cost;
  saveProgress();
  updateCurrencyDisplay();
  showToast("Purchase successful!", { type: "success" });
// EXP FROM COSMETICS   
  if (typeof grantExp === "function") {
    const exp = Math.max(1, Math.floor(cost / 10)); // tweak divisor for balance
    grantExp(exp);
    showToast(`You gained ${exp} EXP!`, { type: "success", duration: 1800 });
  }
  if (typeof purchaseCallback === "function") purchaseCallback(function() {
    saveProgress();
    updateCurrencyDisplay();
    if (typeof done === "function") done(true);
  });
  else if (typeof done === "function") done(true);
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

  let addCardsCount = 0;
  function addNextCard() {
    if (addCardsCount < cards.length) {
      addToCollection(cards[addCardsCount].id, 1);
      addCardsCount++;
      setTimeout(addNextCard, 0);
    } else {
      // Update the global "new" list for gallery etc.
      if (lastPackNewIds.length > 0) {
        let newCards = getNewlyUnlockedCards();
        lastPackNewIds.forEach(id => {
          if (!newCards.includes(id)) newCards.push(id);
        });
        setNewlyUnlockedCards(newCards);
      }
      if (window.renderGallery) window.renderGallery();
      if (typeof done === "function") done();
    }
  }
  addNextCard();
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
  packOptionsDiv.innerHTML = ''; // Clear all
  for (const [packName, price] of Object.entries(packPrices)) {
    const wrapper = document.createElement('div');
    wrapper.className = 'shop-pack-option';

    const img = document.createElement('img');
    img.className = 'pack-image';
    img.src = `CardImages/Packs/${packName}.png`;
    img.alt = packName;
    img.dataset.pack = packName;
    img.style.cursor = 'pointer';
    img.onclick = function(e) {
      e.stopPropagation();
      showCosmeticConfirmModal({
        imgSrc: img.src,
        type: 'pack',
        price,
        onConfirm: function(cb) {
          purchaseCosmetic(price, function(done) {
            openPack(packName, function() {
              if (typeof incrementQuestProgress === 'function') {
                incrementQuestProgress('purchase_pack_daily');
                incrementQuestProgress('purchase_pack_weekly');
              }
              if (typeof done === "function") done();
            });
          }, cb);
        }
      });
    };
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
    wrapper.appendChild(img);
    wrapper.appendChild(priceTag);
    packOptionsDiv.appendChild(wrapper);
  }
}

function getUnlockedAvatars() {
  return (window.playerUnlockedAvatars || window.unlockedAvatars || []);
}
function setUnlockedAvatars(arr) {
  playerUnlockedAvatars = arr; 
  saveProgress();
}
function getUnlockedBanners() {
  return (window.playerUnlockedBanners || window.unlockedBanners || []);
}
function setUnlockedBanners(arr) {
  playerUnlockedBanners = arr; 
  saveProgress();
}
function getUnlockedCardbacks() {
  return (window.playerUnlockedCardbacks || window.unlockedCardbacks || []);
}
function setUnlockedCardbacks(arr) {
  playerUnlockedCardbacks = arr;
  saveProgress();
}
function renderShopCosmetics({
  gridId,
  options,
  getUnlocked,
  setUnlocked,
  unlockMsg,
  wrapperClass,
  imgClass
}) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  let unlocked = (typeof getUnlocked === "function" ? getUnlocked() : []);
  if (!Array.isArray(unlocked)) unlocked = [];     
  grid.innerHTML = '';

  options.forEach(opt => {
    const src = opt.src;
    const price = opt.price;
    if (unlocked.includes(src)) return;
	  
    const wrapper = document.createElement('div');
    wrapper.className = wrapperClass;
	  
    const img = document.createElement('img');
    img.src = src;
    img.className = imgClass;
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
    img.onclick = function() {
      showCosmeticConfirmModal({
        imgSrc: src,
        type: wrapperClass.replace('shop-','').replace('-option',''), // e.g. 'avatar'
        price,
        onConfirm: function(cb) {
          purchaseCosmetic(price, function(done) {
            if (!unlocked.includes(src)) {
              unlocked.push(src);
              setUnlocked(unlocked);
            }
            renderShopCosmetics({
              gridId, options, prices, getUnlocked, setUnlocked, unlockMsg, wrapperClass, imgClass
            });
            showToast(unlockMsg);
            if (typeof window.renderPlayerPower === "function") window.renderPlayerPower();
            if (typeof done === "function") done();
          }, cb);
        }
      });
    };
    wrapper.appendChild(img);
    wrapper.appendChild(priceTag);
    grid.appendChild(wrapper);
  });
}

// --- USE THE GENERIC FUNCTION FOR EACH COSMETIC TYPE ---
function renderShopAvatars() {
  renderShopCosmetics({
    gridId: 'shop-avatars-grid',
    options: allAvatarOptions,
    getUnlocked: getUnlockedAvatars,
    setUnlocked: setUnlockedAvatars,
    unlockMsg: 'Avatar unlocked! Now available in your profile.',
    wrapperClass: 'shop-avatar-option',
    imgClass: 'shop-avatar-img'
  });
}
function renderShopBanners() {
  renderShopCosmetics({
    gridId: 'shop-banners-grid',
    options: allBannerOptions,
    getUnlocked: getUnlockedBanners,
    setUnlocked: setUnlockedBanners,
    unlockMsg: 'Banner unlocked! Now available in your profile.',
    wrapperClass: 'shop-banner-option',
    imgClass: 'shop-banner-img'
  });
}
function renderShopCardbacks() {
  renderShopCosmetics({
    gridId: 'shop-cardbacks-grid',
    options: allCardbackOptions,
    getUnlocked: getUnlockedCardbacks,
    setUnlocked: setUnlockedCardbacks,
    unlockMsg: 'Cardback unlocked! Now available in your deck options.',
    wrapperClass: 'shop-cardback-option',
    imgClass: 'shop-cardback-img'
  });
}
function getRandomCardsByRarity(rarity, count, excludeIds=[]) {
  const pool = dummyCards.filter(card => card.rarity === rarity && !excludeIds.includes(card.id));
  const selected = [];
  while (selected.length < count && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }
  return selected;
}


function getOrGenerateDailyShopCards() {
  const SHOP_KEY = getUserShopKey("shopIndividualCards");
  const RESET_KEY = getUserShopKey("shopIndividualCardsReset");
  const PURCHASED_KEY = getUserShopKey("shopIndividualCardsPurchased");
  
  const today = getTodayUtcDateString();
  const lastReset = localStorage.getItem(RESET_KEY);
  let shopCards = [];
  if (lastReset === today) {
    shopCards = JSON.parse(localStorage.getItem(SHOP_KEY)) || [];
  } else {
    shopCards = [];
    let excludeIds = [];
    INDIVIDUAL_CARD_SLOTS.forEach(slot => {
      const cards = getRandomCardsByRarity(slot.rarity, slot.count, excludeIds);
      excludeIds.push(...cards.map(c => c.id));
      shopCards.push(...cards);
    });
    localStorage.setItem(SHOP_KEY, JSON.stringify(shopCards));
    localStorage.setItem(RESET_KEY, today);
    localStorage.setItem(PURCHASED_KEY, JSON.stringify([]));
  }
  return shopCards;
}
function getPurchasedShopCards() {
  const PURCHASED_KEY = getUserShopKey("shopIndividualCardsPurchased");
  return JSON.parse(localStorage.getItem(PURCHASED_KEY)) || [];
}
function markShopCardPurchased(cardId) {
  const PURCHASED_KEY = getUserShopKey("shopIndividualCardsPurchased");
  let purchased = getPurchasedShopCards();
  if (!purchased.includes(cardId)) {
    purchased.push(cardId);
    localStorage.setItem(PURCHASED_KEY, JSON.stringify(purchased));
  }
}
function resetPurchasedShopCards() {
  const PURCHASED_KEY = getUserShopKey("shopIndividualCardsPurchased");
  localStorage.setItem(PURCHASED_KEY, JSON.stringify([]));
}

function renderIndividualCardsShop(shouldAnimateFlip = false) {
  const shopSingleCardsDiv = document.getElementById('shop-single-cards');
  if (!shopSingleCardsDiv) return;

  // --- TIMER + REFRESH BUTTON ---
  let header = shopSingleCardsDiv.querySelector('.individual-cards-shop-header');
  if (!header) {
    header = document.createElement('div');
    header.className = 'individual-cards-shop-header';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.marginBottom = '7px';

    // TIMER
    const timerDiv = document.createElement('div');
    timerDiv.className = 'individual-cards-timer';
    timerDiv.style.fontWeight = 'bold';
    timerDiv.style.fontSize = '1.1em';
    timerDiv.style.color = '#ffe066';
    header.appendChild(timerDiv);

    // REFRESH BUTTON
    const refreshBtn = document.createElement('button');
    refreshBtn.type = 'button';
    refreshBtn.className = 'btn-secondary individual-cards-refresh-btn';
    refreshBtn.innerHTML = `Refresh <span style="color:#ffe066;"><img src="OtherImages/Currency/Coins.png" style="width:18px;vertical-align:middle;"> ${INDIVIDUAL_CARDS_REFRESH_COST}</span>`;
    refreshBtn.style.margin = "5px";
    refreshBtn.onclick = function() {
      if (getCurrency() < INDIVIDUAL_CARDS_REFRESH_COST) {
        showToast("Not enough coins to refresh!", {type:"error"});
        return;
      }
      // Deduct coins
      playerCurrency -= INDIVIDUAL_CARDS_REFRESH_COST;
      saveProgress();
      updateCurrencyDisplay();
      forceRefreshIndividualShopCards();
      showToast("Cards refreshed!", {type:"success"});
      renderIndividualCardsShop(true);
    };
    header.appendChild(refreshBtn);

    shopSingleCardsDiv.insertBefore(header, shopSingleCardsDiv.firstChild);
  }
      
// Update timer every second
const timerDiv = header.querySelector('.individual-cards-timer');
      
function updateIndividualCardsTimer() {
  const ms = getNextUtcMidnightMs();
  timerDiv.textContent = `New cards available in ${formatTimerMs(ms)}`;
  // Disable refresh if not enough coins
  const refreshBtn = header.querySelector('.individual-cards-refresh-btn');
  if (refreshBtn) {
    refreshBtn.disabled = getCurrency() < INDIVIDUAL_CARDS_REFRESH_COST;
  }
  // Auto-refresh at midnight
  if (ms <= 0) {
    forceRefreshIndividualShopCards();
    renderIndividualCardsShop(true);
  }
}
  clearInterval(individualCardsTimerInterval);
  updateIndividualCardsTimer();
  individualCardsTimerInterval = setInterval(updateIndividualCardsTimer, 1000);

  // ...rest of your card rendering below...
  let container = shopSingleCardsDiv.querySelector('.individual-cards-shop-grid');
  if (container) container.remove();
  container = document.createElement('div');
  container.className = 'individual-cards-shop-grid';
  shopSingleCardsDiv.appendChild(container);

  // ... (leave the rest unchanged)
  // Reset cards if it's a new day
  const today = getTodayUtcDateString();
  if (localStorage.getItem(INDIVIDUAL_CARDS_RESET_KEY) !== today) {
    getOrGenerateDailyShopCards();
    resetPurchasedShopCards();
  }

  const shopCards = getOrGenerateDailyShopCards();
  const purchased = getPurchasedShopCards();

let flipDivs = [];
      
INDIVIDUAL_CARD_SLOTS.forEach(slot => {
  shopCards.filter(card => card.rarity === slot.rarity).forEach(card => {
    const isPurchased = purchased.includes(card.id);

    // ---- FLIP STRUCTURE ----
    const cardOuterDiv = document.createElement('div');
    cardOuterDiv.className = 'shop-individual-card';

    // Flippable card
    const cardFlipDiv = document.createElement('div');
    cardFlipDiv.className = 'opened-card opened-card-flip';
    cardFlipDiv.style.margin = "0 auto";
    cardFlipDiv.style.width = "90px";
    cardFlipDiv.style.height = "128px";

    // inner
    const inner = document.createElement('div');
    inner.className = 'opened-card-inner';

    // back
    const back = document.createElement('div');
    back.className = 'opened-card-back';
    const backImg = document.createElement('img');
    backImg.src = "CardImages/Domains/placeholder.png";
    backImg.alt = "Card Back";
    backImg.style.width = "90px";
    backImg.style.height = "128px";
    back.appendChild(backImg);

    // front
    const front = document.createElement('div');
    front.className = 'opened-card-front';
    const frontImg = document.createElement('img');
    frontImg.src = card.image;
    frontImg.alt = card.name;
    frontImg.style.width = "90px";
    frontImg.style.height = "128px";
    // Only gray out if purchased during this shop cycle
    if (isPurchased) frontImg.style.filter = 'grayscale(1) brightness(0.7)';
    front.appendChild(frontImg);

    // Modal on click
    front.onclick = function() {
      showIndividualCardModal(card, isPurchased);
    };

    inner.appendChild(back);
    inner.appendChild(front);
    cardFlipDiv.appendChild(inner);
    cardOuterDiv.appendChild(cardFlipDiv);

    // Card details below
    const priceDiv = document.createElement('div');
    priceDiv.className = 'currency-display';
    priceDiv.innerHTML = `<img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins"><span>${individualCardPrices[card.rarity]}</span>`;
    cardOuterDiv.appendChild(priceDiv);

    const rarityBadge = document.createElement('div');
    rarityBadge.className = 'shop-individual-card-rarity';
    rarityBadge.textContent = card.rarity;
    cardOuterDiv.appendChild(rarityBadge);

    if (isPurchased) cardOuterDiv.classList.add('card-locked');

    container.appendChild(cardOuterDiv);
    flipDivs.push(cardFlipDiv);
  });
});

  // --- ANIMATE FLIP IF REQUESTED ---
  if (shouldAnimateFlip) {
    // Remove .flipped class in advance (if present)
    flipDivs.forEach(div => div.classList.remove('flipped'));
    setTimeout(() => {
      animateCardFlipSequence(flipDivs);
    }, 60);
  } else {
    // Show cards already flipped (front visible)
    flipDivs.forEach(div => div.classList.add('flipped'));
  }
}

function showIndividualCardModal(card, isPurchased) {
  // Remove existing modal
  let modal = document.getElementById('individual-card-modal');
  if (modal) modal.remove();
  // Get the amount owned from the collection
  const collection = getCollection();
  const ownedCount = collection[card.id] || 0;

  modal = document.createElement('div');
  modal.id = 'individual-card-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-content" style="max-width:380px;align-items:center;">
      <h3>${card.name}</h3>
      <div style="margin-top:2px;font-size:1.05em;color:#ffe066;margin-bottom:4px;">
        Owned: <b>${ownedCount}</b>
      </div>
      <img src="${card.image}" alt="${card.name}" style="width:180px;margin:12px auto;display:block;">
      <div style="margin:10px 0;">
        <span class="shop-individual-card-rarity">${card.rarity}</span>
        <span class="currency-display" style="text-align:center;margin-top:10px;">
          <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins">
          <span>${individualCardPrices[card.rarity]}</span>
        </span>
      </div>
      <div style="display:flex;gap:18px;justify-content:center;margin-top:10px;">
        <button id="individual-card-get-btn" class="btn-secondary"${isPurchased ? " disabled" : ""}>Get</button>
        <button id="individual-card-cancel-btn" class="btn-negative-secondary">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // "Get" button logic
 modal.querySelector('#individual-card-get-btn').onclick = function() {
    if (isPurchased) return;
    // Currency check
    const price = individualCardPrices[card.rarity];
    if (getCurrency() < price) {
      showToast("Not enough coins!", { type: "error" });
      return;
    }
    // Add to collection
    const collection = getCollection();
    const wasOwned = collection[card.id] > 0;
    collection[card.id] = (collection[card.id] || 0) + 1;
    playerCollection = collection;
    playerCurrency -= price;
    saveProgress();
    updateCurrencyDisplay();
    // Mark as purchased
    markShopCardPurchased(card.id);
    // Optionally: mark as "new"
    if (!wasOwned && collection[card.id] > 0) {
      const newCards = getNewlyUnlockedCards();
      if (!newCards.includes(card.id)) {
        newCards.push(card.id);
        setNewlyUnlockedCards(newCards);
      }
    }
    showToast(`${card.name} added to your collection!`, { type: "success" });
    renderIndividualCardsShop();
    if (window.renderGallery) window.renderGallery();
    modal.remove();
  };
  // Cancel button
  modal.querySelector('#individual-card-cancel-btn').onclick = () => {
    modal.remove();
  };
  // Click outside closes
  modal.onclick = function(e) {
    if (e.target === modal) modal.remove();
  };
}
// TIMER FOR SINGLE CARDS //
function getTodayUtcDateString() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    .toISOString().split("T")[0];
}
function getNextUtcMidnightMs() {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  return next - now;
}

function formatTimerMs(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  // Only HH:MM
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
function forceRefreshIndividualShopCards() {
  const SHOP_KEY = getUserShopKey("shopIndividualCards");
  const RESET_KEY = getUserShopKey("shopIndividualCardsReset");
  const PURCHASED_KEY = getUserShopKey("shopIndividualCardsPurchased");
  const today = getTodayUtcDateString();
  let shopCards = [];
  let excludeIds = [];
  INDIVIDUAL_CARD_SLOTS.forEach(slot => {
    const cards = getRandomCardsByRarity(slot.rarity, slot.count, excludeIds);
    excludeIds.push(...cards.map(c => c.id));
    shopCards.push(...cards);
  });
  localStorage.setItem(SHOP_KEY, JSON.stringify(shopCards));
  localStorage.setItem(RESET_KEY, today);
  localStorage.setItem(PURCHASED_KEY, JSON.stringify([]));
}
  // FLIP ANIMATION //
function animateCardFlipSequence(cardDivs, onAfterFlip) {
  cardDivs.forEach((div, i) => {
    setTimeout(() => {
      const flipSnd = document.getElementById('card-flip-sound');
      if (flipSnd) {
        flipSnd.currentTime = 0;
        flipSnd.play();
      }
      div.classList.add('flipped');
      setTimeout(() => {
        if (typeof onAfterFlip === "function") onAfterFlip(div, i);
      }, 600); // after flip
    }, 180 * i);
  });
}
function getUserShopKey(base) {
  const uid = getCurrentUserId() || "default";
  return `${base}_${uid}`;
}
// INITIALIZATION //
function renderShop() {
      renderShopCardbacks(),
      renderShopBanners(),
      renderShopAvatars()
      renderShopPacks();
      renderIndividualCardsShop(false);
      updateCurrencyDisplay();
}
window.renderShop = renderShop;
