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
const ACHIEVEMENTS = [
  {
    id: 'collect_3_green_cards',
    description: 'Collect 3 green cards',
    goal: 3,
    color: 'green',
    reward: { type: 'currency', amount: 200 },
    image: 'images/achievements/green_cards.png'
  },
  {
    id: 'collect_3_red_cards',
    description: 'Collect 3 red cards',
    goal: 3,
    color: 'red',
    reward: { type: 'currency', amount: 200 },
    image: 'images/achievements/green_cards.png'
  },
  // ...add more colors as needed
  {
  id: 'collect_20_unique_cards',
  description: 'Collect 20 different cards',
  goal: 20,
  reward: { type: 'currency', amount: 500 },
  image: 'images/achievements/green_cards.png'
  }
];

function getPlayerLevel() {
  return playerLevel;
}
function getPlayerExp() {
  return playerExp;
}
function setQuestData(data) {
  playerQuests = data;
  saveProgress();
}
function getQuestData() {
  return playerQuests;
}
function setAchievementData(data) { 
  playerAchievements = data;
  saveProgress(); 
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
    setQuestData(data);
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
  grantExp(10);
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
    for (let i = 0; i < QUEST_SLOTS; i++) {
      const quest = quests[i];
      if (!quest) {
        const entry = document.createElement('div');
        entry.className = 'quest-entry empty-quest-slot';
        entry.innerHTML = `<div class="quest-desc">Empty Quest Slot</div>`;
        list.appendChild(entry);
        continue;
      }
      const questDef = QUEST_POOL.find(q => q.id === (quest.id || quest));
      if (!questDef) continue;
      const progress = getQuestProgress(questDef);
      // Show timer if claimed
      let timerHtml = '';
      if (progress.claimed && progress.resetAt) {
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
      if (progress.completed && !progress.claimed) {
        const btn = document.createElement('button');
        btn.className = 'btn-primary quest-claim-btn';
        btn.textContent = 'Claim';
        btn.onclick = function() {
          claimQuestReward(questDef, function() {
            entry.classList.add('achievement-fade-out');
            setTimeout(() => {
              entry.remove();
            }, 800);
          });
        };
        entry.appendChild(btn);
      } else if (progress.claimed) {
        const badge = document.createElement('div');
        badge.className = 'quest-claimed-badge';
        badge.textContent = 'Claimed!';
        entry.appendChild(badge);
      }
      list.appendChild(entry);
    }
    // Start all quest timers after rendering
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
    // Only keep valid quests
    activeQuests = activeQuests.filter(q => !!q && QUEST_POOL.some(poolQuest => poolQuest.id === (q.id || q)));

    if (needsUpdate) {
      // Fill empty slots with unique quests not already in activeQuests
      const existingIds = activeQuests.map(q => q.id || q);
      let pool = QUEST_POOL.filter(q => !existingIds.includes(q.id));
      while (activeQuests.length < QUEST_SLOTS && pool.length > 0) {
        const idx = Math.floor(Math.random() * pool.length);
        activeQuests.push(pool.splice(idx, 1)[0]);
      }
      // If pool too small, allow duplicates very rarely
      while (activeQuests.length < QUEST_SLOTS) {
        const idx = Math.floor(Math.random() * QUEST_POOL.length);
        activeQuests.push(QUEST_POOL[idx]);
      }
      userDoc.set({
        activeQuests,
        lastQuestDate: today
      }, { merge: true }).then(() => {
        if (typeof cb === "function") cb(activeQuests);
        renderQuests();
      });
    } else {
      // No reset needed
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
  setAchievementData(data);
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
  setAchievementData(data);
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
  grantExp(10);
  if (typeof cb === "function") cb(true);
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
  entry.className = 'quest-entry';

  entry.innerHTML = `
    <div style="display:flex;align-items:center;">
      <img src="${ach.image || 'images/achievements/placeholder.png'}" alt="Achievement" class="achievement-image" style="width:40px;height:40px;object-fit:contain;margin-right:12px;">
      <div style="flex:1;">
        <div class="quest-desc">${ach.description}</div>
        <div class="quest-progress-bar-wrap">
          <div class="quest-progress-bar" style="width:${percent}%;"></div>
        </div>
        <div style="font-size:0.96em;color:#fff;text-align:right;">${progress.progress} / ${ach.goal}</div>
        <div class="quest-reward">
          <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins" style="width:18px;">
          +${ach.reward.amount}
        </div>
      </div>
    </div>
  `;
  if (progress.completed && !progress.claimed) {
    const btn = document.createElement('button');
    btn.className = 'btn-primary quest-claim-btn';
    btn.textContent = 'Claim';
    btn.onclick = function() {
      claimAchievementReward(ach, function() {
        entry.classList.add('achievement-fade-out');
        setTimeout(() => {
          entry.remove();
        }, 800);
      });
    };
    entry.appendChild(btn);
  } else if (progress.claimed) {
    const badge = document.createElement('div');
    badge.className = 'quest-claimed-badge';
    badge.textContent = 'Claimed!';
    entry.appendChild(badge);
  }
  list.appendChild(entry);
});
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
document.getElementById('achievements-icon').onclick = function() {
  document.getElementById('achievements-modal').style.display = 'flex';
};
document.getElementById('close-achievements-modal').onclick = function() {
  document.getElementById('achievements-modal').style.display = 'none';
};
document.getElementById('achievements-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
document.getElementById('close-achievements-modal').onclick = function() {
  document.getElementById('achievements-modal').style.display = 'none';
};
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
