// CARD LIST //  
const dummyCards = [
{ id: 'basicfairy', name: 'Fairy', rarity: 'Basic', image: 'CardImages/BasicCreatures/Fairy.png', category: 'creature', color: 'green', type: 'fairy', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Fairy', ability: 'flying', set: 'StandardPack'},
{ id: 'basicgoblin', name: 'Goblin', rarity: 'Basic', image: 'CardImages/BasicCreatures/Goblin.png', category: 'creature', color: 'green', type: 'goblin', hp: 3, atk: 1, def: 0, cost: 0, archetype: 'Goblin', set: 'StandardPack'},
{ id: 'basicemberling', name: 'Emberling', rarity: 'Basic', image: 'CardImages/BasicCreatures/Emberling.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: 'burn', set: 'StandardPack'},
{ id: 'basicfirepixie', name: 'Fire Pixie', rarity: 'Basic', image: 'CardImages/BasicCreatures/Fire Pixie.png', category: 'creature', color: 'red', type: 'fairy', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: ['burn','flying'], set: 'StandardPack'},
{ id: 'basichellcharger', name: 'Hellcharger', rarity: 'Basic', image: 'CardImages/BasicCreatures/Hellcharger.png', category: 'creature', color: 'red', type: 'warrior', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: 'burn', set: 'StandardPack'},
{ id: 'basicelementalblue', name: 'Water Elemental', rarity: 'Basic', image: 'CardImages/BasicCreatures/Water Elemental.png', category: 'creature', color: 'blue', type: 'elemental', hp: 5, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: ['dive','elusive','soak'], set: 'StandardPack'},
{ id: 'basicwolfgray', name: 'Desert Wolf', rarity: 'Basic', image: 'CardImages/BasicCreatures/Desert Wolf.png', category: 'creature', color: 'gray', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Scorchlands', ability: 'burn', set: 'StandardPack'},
{ id: 'basicgolemites', name: 'Golemites', rarity: 'Basic', image: 'CardImages/BasicCreatures/Golemites.png', category: 'creature', color: 'gray', type: 'elemental', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Golemheart', ability: 'burn', set: 'StandardPack'},
{ id: 'basicwolfblack', name: 'Wolf', rarity: 'Basic', image: 'CardImages/BasicCreatures/Wolf.png', category: 'creature', color: 'black', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Moonfang', ability: 'ambush', set: 'StandardPack'},
{ id: 'basicskeleton', name: 'Skeleton', rarity: 'Basic', image: 'CardImages/BasicCreatures/Skeleton.png', category: 'creature', color: 'black', type: 'undead', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe', set: 'StandardPack'},
{ id: 'basicbat', name: 'Bat', rarity: 'Basic', image: 'CardImages/BasicCreatures/Bat.png', category: 'creature', color: 'black', type: 'vampire', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Vampiric', ability: ['drain','flying'], set: 'StandardPack'},
{ id: 'basicimp', name: 'Imp', rarity: 'Basic', image: 'CardImages/BasicCreatures/Imp.png', category: 'creature', color: 'black', type: 'demon', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe', ability: ['ambush','flying'], set: 'StandardPack'},
{ id: 'basicvampire', name: 'Vampire', rarity: 'Basic', image: 'CardImages/BasicCreatures/Vampire.png', category: 'creature', color: 'black', type: 'demon', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Vampiric', ability: ['drain','flying'], set: 'StandardPack'},
{ id: 'basicforest', name: 'Forest', rarity: 'Basic', image: 'CardImages/Domains/Green Basic Location.png', category: 'domain', color: 'green', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicvolcano', name: 'Volcano', rarity: 'Legendary', image: 'CardImages/Domains/Red Basic Location.png', category: 'domain', color: 'red', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicocean', name: 'Ocean', rarity: 'Basic', image: 'CardImages/Domains/Blue Basic Location.png', category: 'domain', color: 'blue', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicmountain', name: 'Mountain', rarity: 'Legendary', image: 'CardImages/Domains/Gray Basic Location.png', category: 'domain', color: 'gray', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2', artwork: "CardImages/Artworks/Mountain.png"},
{ id: 'basicswamp', name: 'Swamp', rarity: 'Basic', image: 'CardImages/Domains/Purple Basic Location.png', category: 'domain', color: 'purple', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicpeaks', name: 'Peaks', rarity: 'Basic', image: 'CardImages/Domains/Yellow Basic Location.png', category: 'domain', color: 'yellow', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicplains', name: 'Plains', rarity: 'Basic', image: 'CardImages/Domains/White Basic Location.png', category: 'domain', color: 'white', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
{ id: 'basicshadowforest', name: 'Shadow Forest', rarity: 'Basic', image: 'CardImages/Domains/Black Basic Location.png', category: 'domain', color: 'black', type: 'domain', hp: 5, cost: 1, set: 'StandardPack2'},
];
// 1. Mission Definitions (update/add new missions here)
const DAILY_MISSIONS = [
  {
    id: 'purchase_pack_daily',
    type: 'daily',
    description: 'Purchase a Booster Pack',
    goal: 1,
    reward: { type: 'currency', amount: 100 }
  }
];
const WEEKLY_MISSIONS = [
  {
    id: 'purchase_pack_weekly',
    type: 'weekly',
    description: 'Purchase 2 Booster Packs',
    goal: 2,
    reward: { type: 'currency', amount: 500 }
  }
];
const ACHIEVEMENTS = [
  {
    id: 'collect_3_green_cards',
    description: 'Collect 3 green cards',
    goal: 3,
    color: 'green',
    reward: { type: 'currency', amount: 200 }
  },
  {
    id: 'collect_3_red_cards',
    description: 'Collect 3 red cards',
    goal: 3,
    color: 'red',
    reward: { type: 'currency', amount: 200 }
  },
  // ...add more colors as needed
  {
  id: 'collect_20_unique_cards',
  description: 'Collect 20 different cards',
  goal: 20,
  reward: { type: 'currency', amount: 500 }
  }
];
// ==========================
// === SECTION NAVIGATION ===
// ==========================
// Add nav button listeners
// Enhanced nav button listeners for smooth transitions
document.querySelectorAll('#main-nav button[data-section]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Hide all sections
    document.querySelectorAll('section[id$="-section"]').forEach(section => {
      section.classList.remove('active');
    });
    // Show the target section
    const target = btn.getAttribute('data-section');
    const targetSection = document.getElementById(target);
    if (targetSection) targetSection.classList.add('active');
    // Special section actions
    const specialActions = {
      'gallery-section' : window.renderGallery,
      'builder-section' : window.showDeckSelection,
      'gameplay-section': window.setupBattlefieldGame,
      'shop-section'    : window.renderShop
    };
    if (typeof specialActions[target] === 'function') {
      specialActions[target]();
    }
  });
});
// Show gallery-section by default
document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
document.getElementById('gallery-section').classList.add('active');
if (typeof window.renderGallery === 'function') {
  window.renderGallery();
}

// ==========================
// === RENDERING / UI ===
// ==========================
function getCardBgClass(card) {
  let colors = Array.isArray(card.color) ? card.color : [card.color];
  colors = colors.filter(Boolean).map(c => c.toLowerCase());
  if (colors.length === 1) return `card-bg-${colors[0]}`;
  if (colors.length === 2) return `card-bg-${colors[0]}-${colors[1]}`;
  return `card-bg-gold`;
}

// VIEW CARDS
function showFullCardModal(cardObj) {
  const card = dummyCards.find(c => c.id === (cardObj.cardId || cardObj.id));
  if (!card) return;
  const collection = getCollection();
  const owned = collection[card.id] || 0;

  const modal = document.getElementById('image-modal');
  const modalContent = document.getElementById('modal-img-content');
  const modalImg = document.getElementById('modal-img');
  if (modalContent) {
    modalContent.innerHTML = `
      <img src="${card.image}" alt="${card.name}" ${owned === 0 ? 'class="card-image-locked"' : ''}>
      <div style="text-align:center;">
        ${card.hp !== undefined ? `HP: ${card.hp}` : ''}
        ${card.atk !== undefined ? ` | ATK: ${card.atk}` : ''}
        ${card.def !== undefined ? ` | DEF: ${card.def}` : ''}
        ${card.cost !== undefined ? ` | Cost: ${card.cost}` : ''}
      </div>
      <div style="text-align:center;margin:8px 0;">
        ${card.rarity || ''} ${Array.isArray(card.type) ? card.type.join(', ') : card.type || ''}
      </div>
      <div style="text-align:center;font-size:0.98em;color:#555;">
        ${card.text || ''}
      </div>
    `;
    modal.style.display = 'flex';
    if (modalImg) modalImg.style.display = "none";
  } else {
    modalImg.src = card.image;
    if (owned === 0) modalImg.classList.add('card-image-locked');
    else modalImg.classList.remove('card-image-locked');
    modalImg.style.display = "block";
    modal.style.display = "flex";
  }
}
// IMAGE MODAL CLOSE
document.getElementById('image-modal').onclick = (e) => {
  if (e.target.id === 'image-modal') {
    document.getElementById('image-modal').style.display = "none";
  }
};
const COLLECTION_KEY = "cardCollection";
const NEW_CARD_KEY = "newlyUnlockedCards";

function getNewlyUnlockedCards() {
  return JSON.parse(localStorage.getItem(NEW_CARD_KEY)) || [];
}

function setNewlyUnlockedCards(arr) {
  localStorage.setItem(NEW_CARD_KEY, JSON.stringify(arr));
}
function getCollection() {
  return JSON.parse(localStorage.getItem(COLLECTION_KEY)) || {};
}

function setCollection(collection) {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

// ADD CARDS TO COLLECTION 
function addToCollection(cardId, amount = 1) {
  const collection = getCollection();
  const wasOwned = collection[cardId] > 0;
  collection[cardId] = (collection[cardId] || 0) + amount;
  setCollection(collection);
  // If just unlocked, mark as new
  if (!wasOwned && collection[cardId] > 0) {
    const newCards = getNewlyUnlockedCards();
    if (!newCards.includes(cardId)) {
      newCards.push(cardId);
      setNewlyUnlockedCards(newCards);
    }
  }
  // Update color achievements (generalized)
  if (typeof updateColorAchievements === 'function') {
    updateColorAchievements();
  }
  // Update unique cards achievement
  if (typeof updateUniqueCardsAchievement === 'function') {
    updateUniqueCardsAchievement();
  }
}

function getCurrency() {
  return parseInt(localStorage.getItem('currency') || '0', 10);
}
function setCurrency(amount) {
  localStorage.setItem('currency', amount);
  const el = document.getElementById('currency-amount');
  if (el) el.textContent = amount;
}
function getCurrencyHtml(amount) {
  return `<span class="currency-display">
    <img class="currency-icon" src="images/coin.png" alt="Coins">
    <span>${amount}</span>
  </span>`;
}
document.getElementById('add-coins-btn').onclick = function() {
  let current = parseInt(localStorage.getItem('currency') || '0', 10);
  current += 100;
  localStorage.setItem('currency', current);
  const el = document.getElementById('currency-amount');
  if (el) el.textContent = current;
};

// 2. Persistence and Reset Helpers
function getMissionData() {
  return JSON.parse(localStorage.getItem('missions') || '{}');
}
function setMissionData(data) {
  localStorage.setItem('missions', JSON.stringify(data));
}
function getMissionResets() {
  return JSON.parse(localStorage.getItem('missionResets') || '{}');
}
function setMissionResets(obj) {
  localStorage.setItem('missionResets', JSON.stringify(obj));
}
function resetMissionsIfNeeded() {
  const now = new Date();
  const resets = getMissionResets();
  let changed = false;

  // Daily reset at 00:00 UTC
  const lastDaily = resets.lastDailyReset ? new Date(resets.lastDailyReset) : null;
  const nowUtc = new Date(now.toISOString().split('T')[0] + "T00:00:00.000Z");
  if (!lastDaily || nowUtc > lastDaily) {
    resetMissionProgress('daily');
    resets.lastDailyReset = nowUtc.toISOString();
    changed = true;
  }

  // Weekly reset: Monday 00:00 UTC
  const lastWeekly = resets.lastWeeklyReset ? new Date(resets.lastWeeklyReset) : null;
  // Find most recent Monday 00:00 UTC
  let monday = new Date(nowUtc);
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
  if (!lastWeekly || monday > lastWeekly) {
    resetMissionProgress('weekly');
    resets.lastWeeklyReset = monday.toISOString();
    changed = true;
  }
  if (changed) setMissionResets(resets);
}
// 3. Reset mission progress for a type
function resetMissionProgress(type) {
  let missions = getMissionData();
  for (const mission of [...DAILY_MISSIONS, ...WEEKLY_MISSIONS]) {
    if (mission.type === type) {
      missions[mission.id] = { progress: 0, completed: false, claimed: false };
    }
  }
  setMissionData(missions);
}

// 4. Get progress for a mission
function getMissionProgress(mission) {
  let data = getMissionData();
  if (!data[mission.id]) {
    data[mission.id] = { progress: 0, completed: false, claimed: false };
    setMissionData(data);
  }
  return data[mission.id];
}

// 5. Increment mission progress by 1 (call from shop.js or elsewhere)
function incrementMissionProgress(missionId) {
  let data = getMissionData();
  // Find mission in lists
  const mission =
    DAILY_MISSIONS.find(m => m.id === missionId) ||
    WEEKLY_MISSIONS.find(m => m.id === missionId);
  if (!mission) return;
  if (!data[missionId]) data[missionId] = { progress: 0, completed: false, claimed: false };
  if (data[missionId].completed) return; // Already complete, no more progress

  data[missionId].progress = Math.min(mission.goal, (data[missionId].progress || 0) + 1);
  if (data[missionId].progress >= mission.goal) data[missionId].completed = true;
  setMissionData(data);
  renderDailyMissions();
  renderWeeklyMissions();
}

// 6. Claim mission reward
function claimMissionReward(mission) {
  let data = getMissionData();
  if (!data[mission.id] || !data[mission.id].completed || data[mission.id].claimed) return false;
  setCurrency(getCurrency() + mission.reward.amount);
  data[mission.id].claimed = true;
  setMissionData(data);
  renderDailyMissions();
  renderWeeklyMissions();
  return true;
}

// 7. Renderers
function renderDailyMissions() {
  const list = document.getElementById('daily-missions-list');
  if (!list) return;
  list.innerHTML = '';
  DAILY_MISSIONS.forEach(mission => {
    const progress = getMissionProgress(mission);
    const percent = Math.min(100, Math.round((progress.progress / mission.goal) * 100));
    const entry = document.createElement('div');
    entry.className = 'mission-entry';

    entry.innerHTML = `
      <div class="mission-desc">${mission.description}</div>
      <div class="mission-progress-bar-wrap">
        <div class="mission-progress-bar" style="width:${percent}%;"></div>
      </div>
      <div style="font-size:0.96em;color:#fff;text-align:right;">${progress.progress} / ${mission.goal}</div>
      <div class="mission-reward">
        <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins" style="width:18px;">
        +${mission.reward.amount}
      </div>
    `;
    if (progress.completed && !progress.claimed) {
      const btn = document.createElement('button');
      btn.className = 'btn-primary mission-claim-btn';
      btn.textContent = 'Claim';
      btn.onclick = () => claimMissionReward(mission);
      entry.appendChild(btn);
    } else if (progress.claimed) {
      const badge = document.createElement('div');
      badge.className = 'mission-claimed-badge';
      badge.textContent = 'Claimed!';
      entry.appendChild(badge);
    }
    list.appendChild(entry);
  });
}
function renderWeeklyMissions() {
  const list = document.getElementById('weekly-missions-list');
  if (!list) return;
  list.innerHTML = '';
  WEEKLY_MISSIONS.forEach(mission => {
    const progress = getMissionProgress(mission);
    const percent = Math.min(100, Math.round((progress.progress / mission.goal) * 100));
    const entry = document.createElement('div');
    entry.className = 'mission-entry';

    entry.innerHTML = `
      <div class="mission-desc">${mission.description}</div>
      <div class="mission-progress-bar-wrap">
        <div class="mission-progress-bar" style="width:${percent}%;"></div>
      </div>
      <div style="font-size:0.96em;color:#fff;text-align:right;">${progress.progress} / ${mission.goal}</div>
      <div class="mission-reward">
        <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins" style="width:18px;">
        +${mission.reward.amount}
      </div>
    `;
    if (progress.completed && !progress.claimed) {
      const btn = document.createElement('button');
      btn.className = 'btn-primary mission-claim-btn';
      btn.textContent = 'Claim';
      btn.onclick = () => claimMissionReward(mission);
      entry.appendChild(btn);
    } else if (progress.claimed) {
      const badge = document.createElement('div');
      badge.className = 'mission-claimed-badge';
      badge.textContent = 'Claimed!';
      entry.appendChild(badge);
    }
    list.appendChild(entry);
  });
}

// 8. Modal open/close and init
// Main Missions Modal open/close logic
document.getElementById('missions-icon').onclick = function() {
  document.getElementById('missions-modal').style.display = 'flex';
};
document.getElementById('close-missions-modal').onclick = function() {
  document.getElementById('missions-modal').style.display = 'none';
};
document.getElementById('missions-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
document.getElementById('achievements-icon').onclick = function() {
  document.getElementById('achievements-modal').style.display = 'flex';
};
document.getElementById('close-achievements-modal').onclick = function() {
  document.getElementById('achievements-modal').style.display = 'none';
};
document.getElementById('achievements-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
// Main Missions Modal open/close logic
document.getElementById('show-daily-missions').onclick = function() {
  renderDailyMissions();
  document.getElementById('daily-missions-modal').style.display = 'flex';
};
document.getElementById('show-weekly-missions').onclick = function() {
  renderWeeklyMissions();
  document.getElementById('weekly-missions-modal').style.display = 'flex';
};
document.getElementById('close-daily-missions-modal').onclick = function() {
  document.getElementById('daily-missions-modal').style.display = 'none';
};
document.getElementById('close-weekly-missions-modal').onclick = function() {
  document.getElementById('weekly-missions-modal').style.display = 'none';
};
document.getElementById('daily-missions-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
document.getElementById('weekly-missions-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
// 2. Persistence Helpers
function getAchievementData() {
  return JSON.parse(localStorage.getItem('achievements') || '{}');
}
function setAchievementData(data) {
  localStorage.setItem('achievements', JSON.stringify(data));
}

// 3. Get progress for an achievement
function getAchievementProgress(ach) {
  let data = getAchievementData();
  if (!data[ach.id]) {
    data[ach.id] = { progress: 0, completed: false, claimed: false };
    setAchievementData(data);
  }
  return data[ach.id];
}

// 4. Increment achievement progress by value (default 1)
function incrementAchievementProgress(achievementId, amount = 1) {
  let data = getAchievementData();
  const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!ach) return;
  if (!data[achievementId]) data[achievementId] = { progress: 0, completed: false, claimed: false };
  if (data[achievementId].completed) return; // Already complete

  data[achievementId].progress = Math.min(ach.goal, (data[achievementId].progress || 0) + amount);
  if (data[achievementId].progress >= ach.goal) data[achievementId].completed = true;
  setAchievementData(data);
  renderAchievements();
}

// 5. Set achievement progress directly (for things like "collect X cards")
function setAchievementProgress(achievementId, value) {
  let data = getAchievementData();
  const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!ach) return;
  data[achievementId] = data[achievementId] || { progress: 0, completed: false, claimed: false };
  data[achievementId].progress = Math.min(ach.goal, value);
  data[achievementId].completed = data[achievementId].progress >= ach.goal;
  setAchievementData(data);
  renderAchievements();
}

// 6. Claim achievement reward
function claimAchievementReward(ach) {
  let data = getAchievementData();
  if (!data[ach.id] || !data[ach.id].completed || data[ach.id].claimed) return false;
  setCurrency(getCurrency() + ach.reward.amount);
  data[ach.id].claimed = true;
  setAchievementData(data);
  renderAchievements();
  return true;
}

// 7. Render Achievements Modal
function renderAchievements() {
  const list = document.getElementById('achievements-list');
  if (!list) return;
  list.innerHTML = '';
  ACHIEVEMENTS.forEach(ach => {
    const progress = getAchievementProgress(ach);
    const percent = Math.min(100, Math.round((progress.progress / ach.goal) * 100));
    const entry = document.createElement('div');
    entry.className = 'mission-entry';

    entry.innerHTML = `
      <div class="mission-desc">${ach.description}</div>
      <div class="mission-progress-bar-wrap">
        <div class="mission-progress-bar" style="width:${percent}%;"></div>
      </div>
      <div style="font-size:0.96em;color:#fff;text-align:right;">${progress.progress} / ${ach.goal}</div>
      <div class="mission-reward">
        <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins" style="width:18px;">
        +${ach.reward.amount}
      </div>
    `;
    if (progress.completed && !progress.claimed) {
      const btn = document.createElement('button');
      btn.className = 'btn-primary mission-claim-btn';
      btn.textContent = 'Claim';
      btn.onclick = () => {
      claimAchievementReward(ach);
      entry.classList.add('achievement-fade-out');
      setTimeout(() => {
        entry.remove();
      }, 800);
    };
      entry.appendChild(btn);
    } else if (progress.claimed) {
      const badge = document.createElement('div');
      badge.className = 'mission-claimed-badge';
      badge.textContent = 'Claimed!';
      entry.appendChild(badge);
    }
    list.appendChild(entry);
  });
}
// 8. Modal open/close and init for Achievements
document.getElementById('achievements-icon').onclick = function() {
  renderAchievements();
  document.getElementById('achievements-modal').style.display = 'flex';
};
document.getElementById('close-achievements-modal').onclick = function() {
  document.getElementById('achievements-modal').style.display = 'none';
};
document.getElementById('achievements-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
function updateUniqueCardsAchievement() {
  const collection = getCollection();
  // Count unique card IDs with at least 1 copy
  const uniqueCount = Object.keys(collection).filter(id => collection[id] > 0).length;
  if (typeof setAchievementProgress === 'function') {
    setAchievementProgress('collect_20_unique_cards', uniqueCount);
  }
}
function updateColorAchievements() {
  const collection = getCollection();
  ACHIEVEMENTS.forEach(ach => {
    if (ach.color) {
      // Get all card ids for this color
      const colorCardIds = dummyCards
        .filter(card => card.color && (
          (Array.isArray(card.color) && card.color.includes(ach.color)) ||
          card.color === ach.color
        ))
        .map(card => card.id);
      // Count in collection
      const count = colorCardIds.reduce((sum, id) => sum + (collection[id] || 0), 0);
      if (typeof setAchievementProgress === 'function') {
        setAchievementProgress(ach.id, count);
      }
    }
  });
}

// In addToCollection, after updating collection:
updateColorAchievements();
// MENU INSIDE VIEWPORT
function placeMenuWithinViewport(menu, triggerRect, preferred = "bottom") {
  // Default position: below the triggering element
  let top = triggerRect.bottom + window.scrollY + 8;
  let left = triggerRect.left + window.scrollX;

  // Temporarily set position to get true size
  menu.style.position = 'absolute';
  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
  menu.style.zIndex = 9999;
  menu.style.display = 'block';

  document.body.appendChild(menu);

  // Now check for overflow
  const menuRect = menu.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Horizontal: If overflowing right, pull it left to fit
  if (menuRect.right > vw) {
    left = Math.max(vw - menuRect.width - 8, 8);
    menu.style.left = `${left}px`;
  }
  // Vertical: If overflowing bottom, show above trigger if fits, otherwise clamp to top
  if (menuRect.bottom > vh) {
    // Try above the trigger
    if (triggerRect.top - menuRect.height - 8 > 0) {
      top = triggerRect.top + window.scrollY - menuRect.height - 8;
    } else {
      top = Math.max(vh - menuRect.height - 8, 8);
    }
    menu.style.top = `${top}px`;
  }
  // If overflowing left, clamp to left edge
  if (menuRect.left < 0) {
    menu.style.left = `8px`;
  }
  // If overflowing top, clamp to top edge
  if (menuRect.top < 0) {
    menu.style.top = `8px`;
  }
}
// Call setCurrency(getCurrency()) on page load to update display
window.addEventListener('DOMContentLoaded', () => setCurrency(getCurrency()));
// 9. On load, check for resets
window.addEventListener('DOMContentLoaded', () => {
  resetMissionsIfNeeded();
});
