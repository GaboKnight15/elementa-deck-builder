window.playerQuests = window.playerQuests || {};
window.playerAchievements = window.playerAchievements || {};

const COLOR_QUESTS = ['green', 'red', 'blue', 'yellow', 'purple', 'gray', 'black', 'white'];
// Quest LIST
const QUEST_SLOTS = 5;
const QUEST_POOL = [
  { id: 'purchase_pack', type: 'quest', description: 'Purchase a Booster Pack', goal: 1, reward: { type: 'currency', amount: 100 }, image: 'CardImages/Blank/Pack.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_green_card', type: 'quest', description: 'Collect a Green Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'CardImages/Blank/GreenCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_red_card', type: 'quest', description: 'Collect a Red Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'CardImages/Blank/RedCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_blue_card', type: 'quest', description: 'Collect a Blue Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'CardImages/Blank/BlueCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_yellow_card', type: 'quest', description: 'Collect a Yellow Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'CardImages/Blank/YellowCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_purple_card', type: 'quest', description: 'Collect a Purple Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'CardImages/Blank/PurpleCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_gray_card', type: 'quest', description: 'Collect a Gray Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'CardImages/Blank/GrayCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_black_card', type: 'quest', description: 'Collect a Black Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'CardImages/Blank/BlackCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_white_card', type: 'quest', description: 'Collect a White Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'CardImages/Blank/WhiteCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { questId: null, refillAt: 1720000000000 },
];
const ACHIEVEMENT_COLOR_TIERS = [
  { tier: 1, goal: 10,  description: "Collect 10 {color} cards", reward: 100 },
  { tier: 2, goal: 100, description: "Collect 100 {color} cards", reward: 300 },
  { tier: 3, goal: 500, description: "Collect 500 {color} cards", reward: 1000 }
];
const ACHIEVEMENT_COLORS = [
  { color: 'green',  image: 'CardImages/Blank/GreenCard.png' },
  { color: 'red',    image: 'CardImages/Blank/RedCard.png' },
  { color: 'blue',   image: 'CardImages/Blank/BlueCard.png' },
  { color: 'yellow', image: 'CardImages/Blank/YellowCard.png' },
  { color: 'purple', image: 'CardImages/Blank/PurpleCard.png' },
  { color: 'gray',   image: 'CardImages/Blank/GrayCard.png' },
  { color: 'black',  image: 'CardImages/Blank/BlackCard.png' },
  { color: 'white',  image: 'CardImages/Blank/WhiteCard.png' },
];
const ACHIEVEMENTS = [
  ...generateColorAchievements(),
  // ...add more colors as needed
  {
  id: 'collect_20_unique_cards',
  description: 'Collect 20 different cards',
  goal: 20,
  reward: { type: 'currency', amount: 500 },
  image: 'OtherImages/Icons/Rewards.png'
  }
];

function getPlayerLevel() {
  return playerLevel;
}
function setQuestData(data, shouldSave = false) {
  playerQuests = data;
  if (shouldSave) saveProgress();
}

function getQuestData() {
  return playerQuests;
}
function setAchievementData(data, shouldSave = false) {
  playerAchievements = data;
  if (shouldSave) saveProgress();
}
function getAchievementData() {
  return playerAchievements;
}
function getQuestResets(cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    if (typeof cb === "function") cb({});
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(function(doc) {
      const resets = (doc.exists && doc.data().questResets) ? doc.data().questResets : {};
      if (typeof cb === "function") cb(resets);
    })
    .catch(function() {
      if (typeof cb === "function") cb({});
    });
}
function setQuestResets(obj, cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    if (typeof cb === "function") cb();
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).set(
    { questResets: obj }, { merge: true }
  ).then(function() {
    if (typeof cb === "function") cb();
  });
}
function resetQuestsIfNeeded() {
  const now = new Date();
  getQuestResets(function(resets) {
    let changed = false;
    //  reset at 00:00 UTC
    const last = resets.lastReset ? new Date(resets.lastReset) : null;
    const nowUtc = new Date(now.toISOString().split('T')[0] + "T00:00:00.000Z");
    if (!last || nowUtc > last) {
      resetQuestProgress('');
      resets.lastReset = nowUtc.toISOString();
      changed = true;
    }
    if (changed) setQuestResets(resets);
  });
}
// 3. Reset Quest progress for a type
function resetQuestProgress(type) {
  let quests = getQuestData();
  getActiveQuests(function(activeQuests) {
    for (const quest of activeQuests) {
      quests[quest.id] = { progress: 0, completed: false, claimed: false };
    }
    setQuestData(quests);
  });
}

// 4. Get progress for a Quest
function getQuestProgress(quest) {
  let data = getQuestData();
  if (!data[quest.id]) {
    data[quest.id] = { progress: 0, completed: false, claimed: false };
    setQuestData(data);
  }
  return data[quest.id];
}

// 5. Increment Quest progress by 1 (call from shop.js or elsewhere)
function incrementQuestProgress(questId) {
  let data = getQuestData();
  getActiveQuests(function(questsList) {
    const quest = questsList.find(m => m.id === questId);
    if (!quest) return;
    if (!data[questId]) data[questId] = { progress: 0, completed: false, claimed: false };
    if (data[questId].completed) return;

    data[questId].progress = Math.min(quest.goal, (data[questId].progress || 0) + 1);
    if (data[questId].progress >= quest.goal) data[questId].completed = true;
    setQuestData(data, false);
    renderQuests();
    updateQuestsNotificationDot();
  });
}

function claimQuestReward(quest, cb) {
  let data = getQuestData();
  if (!data[quest.id] || !data[quest.id].completed || data[quest.id].claimed) {
    if (typeof cb === "function") cb(false);
    return false;
  }
  setCurrency(getCurrency() + quest.reward.amount);
  data[quest.id].claimed = true;
  // Set per-quest resetAt (24 hours from now)
  data[quest.id].resetAt = Date.now() + 24 * 60 * 60 * 1000;
  setQuestData(data);
  updateQuestsNotificationDot();
  saveProgress();
  renderQuests();
  startQuestTimers();
  if (typeof cb === "function") cb(true);
  return true;
}

function renderQuests() {
  const list = document.getElementById('quests-list');
  if (!list) return;
  list.innerHTML = '';
  getActiveQuests(function(quests) {
    // Always slice to maximum QUEST_SLOTS
    const displayedQuests = (quests || []).filter(q => !!q && !!q.id).slice(0, QUEST_SLOTS);

    let renderedCount = 0;
    for (let i = 0; i < QUEST_SLOTS; i++) {
      const quest = displayedQuests[i];
      if (!quest) {
        const entry = document.createElement('div');
        entry.className = 'quest-entry empty-quest-slot';
        entry.innerHTML = `<div class="quest-desc">Empty Quest Slot</div>`;
        list.appendChild(entry);
        renderedCount++;
        continue;
      }
      const questDef = QUEST_POOL.find(q => q.id === (quest.id || quest));
      if (!questDef) continue;
      const progress = getQuestProgress(questDef);

      // If claimed, skip rendering (quests disappear once claimed)
      if (progress.claimed) continue;

      // Timer HTML if needed
      let timerHtml = '';
      if (progress.resetAt) {
        timerHtml = `<div class="quest-timer" id="quest-timer-${questDef.id}" style="font-size:0.93em;color:#ffe066;margin-bottom:2px;"></div>`;
      }
      const percent = Math.min(100, Math.round((progress.progress / questDef.goal) * 100));
      const entry = document.createElement('div');
      entry.className = 'quest-entry';
      entry.innerHTML = `
        <img src="${questDef.image || 'CardImages/Domains/placeholder.png'}" alt="Quest" class="quest-image">
        <div class="quest-main">
          <div class="quest-desc">${questDef.description}</div>
          ${timerHtml}
          <div class="quest-progress-row">
            <div class="quest-progress-bar-wrap">
              <div class="quest-progress-bar" style="width:${percent}%;"></div>
            </div>
            <div class="quest-progress-numbers">${progress.progress} / ${questDef.goal}</div>
            <div class="quest-reward">
              <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins">
              +${questDef.reward.amount}
            </div>
          </div>
        </div>
      `;
      // Claimable: entire entry clickable and greenish
      if (progress.completed && !progress.claimed) {
        entry.classList.add('quest-claimable');
        entry.style.cursor = 'pointer';
        entry.onclick = function() {
          claimQuestReward(questDef, function() {
            renderQuests(); // Re-render to remove claimed quest
          });
        };
      } else {
        entry.onclick = null;
      }
      list.appendChild(entry);
      renderedCount++;
    }

    // Fill empty slots if claimed quests were present
    while (renderedCount < QUEST_SLOTS) {
      const entry = document.createElement('div');
      entry.className = 'quest-entry empty-quest-slot';
      entry.innerHTML = `<div class="quest-desc">Empty Quest Slot</div>`;
      list.appendChild(entry);
      renderedCount++;
    }

    startQuestTimers();
  });
}
function ensureQuestSlots(cb) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  const userDoc = firebase.firestore().collection('users').doc(user.uid);

  userDoc.get().then(doc => {
    const data = doc.exists ? doc.data() : {};
    const lastQuestDate = data.lastQuestDate || null;
    const today = getTodayUtcDateString();

    let needsUpdate = (lastQuestDate !== today);
    let activeQuests = Array.isArray(data.activeQuests) ? data.activeQuests.slice(0, QUEST_SLOTS) : [];

    // Only keep valid quests and ensure unique IDs
    let uniqueQuestIds = new Set();
    activeQuests = activeQuests.filter(q => {
      const id = q.id || q;
      if (uniqueQuestIds.has(id)) return false;
      uniqueQuestIds.add(id);
      return QUEST_POOL.some(poolQuest => poolQuest.id === id);
    });

    if (needsUpdate || activeQuests.length < QUEST_SLOTS) {
      // Fill empty slots with unique quests not already in activeQuests
      const existingIds = new Set(activeQuests.map(q => q.id || q));
      // Deep copy QUEST_POOL and shuffle
      let pool = QUEST_POOL.filter(q => !existingIds.has(q.id));
      pool = pool.filter(q => q.id); // skip pool entries without id

      // Shuffle pool
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      while (activeQuests.length < QUEST_SLOTS && pool.length > 0) {
        activeQuests.push(pool.pop());
      }

      // Final safety: slice in case of accidental overflow
      activeQuests = activeQuests.slice(0, QUEST_SLOTS);

      userDoc.set({
        activeQuests,
        lastQuestDate: today
      }, { merge: true }).then(() => {
        if (typeof cb === "function") cb(activeQuests);
        renderQuests();
      });
    } else {
      // No reset needed, just ensure exactly 5 unique quests
      let uniqueQuestIds = new Set();
      activeQuests = activeQuests.filter(q => {
        const id = q.id || q;
        if (uniqueQuestIds.has(id)) return false;
        uniqueQuestIds.add(id);
        return true;
      });
      activeQuests = activeQuests.slice(0, QUEST_SLOTS);

      if (typeof cb === "function") cb(activeQuests);
      renderQuests();
    }
  });
}
function getTodayUtcDateString() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    .toISOString().split("T")[0];
}
// ACHIVEMENTS LOGIC
function generateColorAchievements() {
  const achievements = [];
  for (const colorObj of ACHIEVEMENT_COLORS) {
    for (const tier of ACHIEVEMENT_COLOR_TIERS) {
      achievements.push({
        id: `collect_${tier.goal}_${colorObj.color}_cards`,
        description: tier.description.replace('{color}', colorObj.color.charAt(0).toUpperCase() + colorObj.color.slice(1)),
        goal: tier.goal,
        color: colorObj.color,
        reward: { type: 'currency', amount: tier.reward },
        image: colorObj.image,
        tier: tier.tier
      });
    }
  }
  return achievements;
}
function getAchievementProgress(ach) {
  let data = getAchievementData();
  if (!data[ach.id]) {
    data[ach.id] = { progress: 0, completed: false, claimed: false };
    setAchievementData(data);
  }
  return data[ach.id];
}
function incrementAchievementProgress(achievementId, amount = 1) {
  let data = getAchievementData();
  const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!ach) return;
  if (!data[achievementId]) data[achievementId] = { progress: 0, completed: false, claimed: false };
  if (data[achievementId].completed) return;

  data[achievementId].progress = Math.min(ach.goal, (data[achievementId].progress || 0) + amount);
  if (data[achievementId].progress >= ach.goal) data[achievementId].completed = true;
  setAchievementData(data, false);
  renderAchievements();
  updateAchievementsNotificationDot();
}

// 5. Set achievement progress directly (for things like "collect X cards")
function setAchievementProgress(achievementId, value) {
  let data = getAchievementData();
  const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!ach) return;
  data[achievementId] = data[achievementId] || { progress: 0, completed: false, claimed: false };
  data[achievementId].progress = Math.min(ach.goal, value);
  data[achievementId].completed = data[achievementId].progress >= ach.goal;
  setAchievementData(data, false);
  renderAchievements();
}

// 6. Claim achievement reward
function claimAchievementReward(ach, cb) {
  let data = getAchievementData();
  if (!data[ach.id] || !data[ach.id].completed || data[ach.id].claimed) {
    if (typeof cb === "function") cb(false);
    return false;
  }
  setCurrency(getCurrency() + ach.reward.amount);
  data[ach.id].claimed = true;
  setAchievementData(data);
  updateAchievementsNotificationDot();
  renderPlayerPower();
  if (typeof cb === "function") cb(true);
  return true;
}

function renderAchievements() {
  // Find the currently active tab/category
  const activeTab = document.querySelector('.achievements-tab.active');
  const category = activeTab ? activeTab.getAttribute('data-category') : 'general';
  renderAchievementsCategory(category);
}

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
function getNextResetTime() {
  if (!window.questResetTimestamp) {
    // Set it to now so that the next reset is 24 hours ahead
    window.questResetTimestamp = Date.now();
  }
  return window.questResetTimestamp + 24 * 60 * 60 * 1000;
}

function formatTimer(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}
let TimerInterval = null;

function startQuestTimers() {
  clearInterval(window._allQuestTimers);
  function update() {
    let data = getQuestData();
    let updated = false;
    for (const questId in data) {
      const quest = data[questId];
      if (quest.claimed && quest.resetAt) {
        const el = document.getElementById('quest-timer-' + questId);
        const remain = quest.resetAt - Date.now();
        if (el) {
          if (remain > 0) {
            el.textContent = 'New quest in: ' + formatTimer(remain);
          } else {
            el.textContent = 'New quest available!';
          }
        }
        // When timer ends, reset this quest
        if (remain <= 0 && quest.claimed) {
          // Remove/reset this quest slot (you could replace with a new random quest)
          data[questId] = { progress: 0, completed: false, claimed: false };
          updated = true;
        }
      }
    }
    if (updated) {
      setQuestData(data);
      renderQuests();
    }
  }
  update();
  window._allQuestTimers = setInterval(update, 1000);
}
function getRandomQuests(pool, count) {
  const copy = [...pool];
  const selected = [];
  while (selected.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    selected.push(copy.splice(idx, 1)[0]);
  }
  return selected;
}

// --- FIREBASE-BASED Quest STATE ---
function getActiveQuests(cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    if (typeof cb === "function") cb([]);
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(function(doc) {
      const quests = (doc.exists && doc.data().activeQuests) ? doc.data().activeQuests : [];
      if (typeof cb === "function") cb(quests);
    })
    .catch(function() {
      if (typeof cb === "function") cb([]);
    });
}

function setActiveQuests(quests, cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    if (typeof cb === "function") cb();
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).set(
    { activeQuests: quests }, { merge: true }
  ).then(function() {
    if (typeof cb === "function") cb();
  });
}

function refreshQuests() {
  playerQuests = {};
  window.questResetTimestamp = Date.now();
  saveProgress();
  renderQuests();
  startQuestTimers();
}

function updateQuestsNotificationDot() {
  getActiveQuests(function(questsList) {
    const questData = getQuestData();
    const hasClaimable = questsList.some(m => {
      const p = questData[m.id];
      return p && p.completed && !p.claimed;
    });
    const dot = document.getElementById('quests-notification-dot');
    if (dot) dot.style.display = hasClaimable ? 'block' : 'none';
  });
}

function updateAchievementsNotificationDot() {
  const achievementData = getAchievementData();
  const hasClaimable = ACHIEVEMENTS.some(a => {
    const p = achievementData[a.id];
    return p && p.completed && !p.claimed;
  });
  const dot = document.getElementById('achievements-notification-dot');
  if (dot) dot.style.display = hasClaimable ? 'block' : 'none';
}

// PLAYER LEVEL
function expToNextLevel(level) {
  return 100 + (level - 1) * 100; // Example: 100, 200, 300, ...
}

function grantExp(amount) {
  if (!amount) return;
  playerExp += amount;
  let leveledUp = false;
  while (playerExp >= expToNextLevel(playerLevel)) {
    playerExp -= expToNextLevel(playerLevel);
    playerLevel += 1;
    leveledUp = true;
    showToast(`Level Up! You reached Lv ${playerLevel}!`);
  }
  saveProgress();
  renderPlayerLevel();
  return leveledUp;
}

function renderPlayerLevel() {
  const levelEl = document.getElementById('player-level-label');
  if (levelEl) levelEl.textContent = "Lv " + playerLevel;
  const expBar = document.getElementById('player-exp-bar-fill');
  const expNum = document.getElementById('player-exp-numbers');
  const needed = expToNextLevel(playerLevel);
  const exp = typeof playerExp === "number" ? playerExp : 0;
  if (expBar) {
    // Clamp percentage between 0 and 100
    const percent = Math.max(0, Math.min(100, (exp / needed) * 100));
    expBar.style.width = percent + "%";
  }
  if (expNum) expNum.textContent = exp + " / " + needed;
}
// Render achievements for category
function renderAchievementsCategory(category) {
  const list = document.getElementById('achievements-list');
  if (!list) return;
  list.innerHTML = '';

  let achievementsToShow = [];
  if (category === 'general') {
    achievementsToShow = ACHIEVEMENTS.filter(a => !a.color && a.id.indexOf('progress') === -1);
  } else if (category === 'color') {
    achievementsToShow = ACHIEVEMENTS.filter(a => !!a.color);
  } else if (category === 'progression') {
    achievementsToShow = ACHIEVEMENTS.filter(a => a.id && a.id.indexOf('progress') !== -1 );
    // Or however you define progression achievements
  }

  // Sort: unclaimed first, claimed at bottom
  const unclaimed = [];
  const claimed = [];
  achievementsToShow.forEach(ach => {
    if (!ach || !ach.id || !ach.description) return;
    const progress = getAchievementProgress(ach);
    if (progress.claimed) {
      claimed.push({ ach, progress });
    } else {
      unclaimed.push({ ach, progress });
    }
  });

  function createEntry(ach, progress, category) {
    const percent = Math.min(100, Math.round((progress.progress / ach.goal) * 100));
    const entry = document.createElement('div');
    entry.className = 'quest-entry';

    entry.innerHTML = `
      <div style="display:flex;align-items:center;">
        <img src="${ach.image || 'images/achievements/placeholder.png'}" alt="Achievement" class="achievement-image" style="width:40px;height:40px;object-fit:contain;margin-right:12px;">
        <div style="flex:1;">
          <div class="quest-desc" style="font-weight:bold;color:#ffe066;">${ach.description}</div>
          <div style="display:flex;align-items:center;">
            <div style="flex:1;">
              <div class="quest-progress-bar-wrap" style="margin-bottom:2px;">
                <div class="quest-progress-bar" style="width:${percent}%;"></div>
              </div>
              <div style="font-size:0.96em;color:#fff;text-align:left;">${progress.progress} / ${ach.goal}</div>
            </div>
            <div class="quest-reward" style="display:flex;align-items:center;gap:4px;min-width:70px;justify-content:flex-end;">
              <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins">
              <span style="font-weight:bold;font-size:1.1em;color:#ffe066;">+${ach.reward.amount}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    if (progress.completed && !progress.claimed) {
      entry.classList.add('quest-claimable');
      entry.style.cursor = 'pointer';
      entry.onclick = function() {
        claimAchievementReward(ach, function() {
          renderAchievementsCategory(category);
        });
      };
    } else if (progress.claimed) {
      entry.classList.add('achievement-claimed');
      entry.style.opacity = '0.7';
      entry.onclick = null;
    } else {
      entry.onclick = null;
    }
    return entry;
  }

  // Unclaimed achievements first (including claimable), then claimed at the bottom
  unclaimed.forEach(({ ach, progress }) => {
    list.appendChild(createEntry(ach, progress, category));
  });
  claimed.forEach(({ ach, progress }) => {
    list.appendChild(createEntry(ach, progress, category));
  });
}
function openAchievementsModalDefault() {
  document.getElementById('achievements-modal').style.display = 'flex';
  document.querySelectorAll('.achievements-tab').forEach(t => t.classList.remove('active'));
  const generalTab = document.querySelector('.achievements-tab[data-category="general"]');
  if (generalTab) generalTab.classList.add('active');
  renderAchievementsCategory('general');
}

// OPEN/CLOSE LOGIC
document.getElementById('quests-icon').onclick = function() {
  document.getElementById('quests-modal').style.display = 'flex';
};
document.getElementById('close-quests-modal').onclick = function() {
  document.getElementById('quests-modal').style.display = 'none';
};
document.getElementById('quests-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};

document.getElementById('achievements-icon').onclick = openAchievementsModalDefault;

document.getElementById('achievements-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
document.getElementById('achievements-back-btn').onclick = function() {
  document.getElementById('achievements-modal').style.display = 'none';
  document.getElementById('home-section').classList.add('active');
};
// Tab switching logic
document.querySelectorAll('.achievements-tab').forEach(tab => {
  tab.onclick = function() {
    document.querySelectorAll('.achievements-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.getAttribute('data-category');
    renderAchievementsCategory(category);
  };
});
document.getElementById('achievements-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
document.getElementById('close-quests-modal').onclick = function() {
  document.getElementById('quests-modal').style.display = 'none';
};
document.getElementById('quests-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};

// Expose quest/achievement/level functions globally for use in other scripts or inline HTML
window.renderQuests = renderQuests;
window.renderAchievements = renderAchievements;
window.renderPlayerLevel = renderPlayerLevel;
window.updateQuestsNotificationDot = updateQuestsNotificationDot;
window.updateAchievementsNotificationDot = updateAchievementsNotificationDot;
window.startQuestTimers = startQuestTimers;
window.ACHIEVEMENTS = ACHIEVEMENTS;
