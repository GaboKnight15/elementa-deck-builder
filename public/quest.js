let playerLevel = 1;
let playerExp = 0;
let playerQuests = {};
let playerAchievements = {};

async function setAchievementData(data) { 
  playerAchievements = data;
  if (!isLoggingOut) await saveProgress(); 
}
async function setQuestData(data) {
  playerQuests = data;
  if (!isLoggingOut) await saveProgress();
}
function getQuestData() {
  return playerQuests;
}

async function getQuestResets() {
  const user = firebase.auth().currentUser;
  if (!user) return {};
  const doc = await firebase.firestore().collection('users').doc(user.uid).get();
  return (doc.exists && doc.data().questResets) ? doc.data().questResets : {};
}
async function setQuestResets(obj) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  await firebase.firestore().collection('users').doc(user.uid).set(
    { questResets: obj }, { merge: true }
  );
}
async function resetQuestsIfNeeded() {
  const now = new Date();
  const resets = await getQuestResets();
  let changed = false;
  //  reset at 00:00 UTC
  const last = resets.lastReset ? new Date(resets.lastReset) : null;
  const nowUtc = new Date(now.toISOString().split('T')[0] + "T00:00:00.000Z");
  if (!last || nowUtc > last) {
    await resetQuestProgress('');
    resets.lastReset = nowUtc.toISOString();
    changed = true;
  }
  if (changed) await setQuestResets(resets);
}
// 3. Reset Quest progress for a type
async function resetQuestProgress(type) {
  let quests = getQuestData();
  // Use only active Quests for the given type
  const activeQuests = await getActiveQuests();
  for (const quest of activeQuests) {
    quests[quest.id] = { progress: 0, completed: false, claimed: false };
  }
  setQuestData(quests);
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
async function incrementQuestProgress(questId) {
  let data = getQuestData();
  const  = await getActiveQuests();
  const quest = .find(m => m.id === questId);
  if (!quest) return;
  if (!data[questId]) data[questId] = { progress: 0, completed: false, claimed: false };
  if (data[questId].completed) return; // Already complete, no more progress

  data[questId].progress = Math.min(quest.goal, (data[questId].progress || 0) + 1);
  if (data[questId].progress >= quest.goal) data[questId].completed = true;
  await setQuestData(data);
  await renderQuests();
  await updateQuestsNotificationDot();
}

async function claimQuestReward(quest) {
  let data = getQuestData();
  if (!data[quest.id] || !data[quest.id].completed || data[quest.id].claimed) return false;
  setCurrency(getCurrency() + quest.reward.amount);
  data[quest.id].claimed = true;
  setQuestData(data);
  updateQuestsNotificationDot();
  await grantExp(10);
  return true;
}

// 7. Renderers
async function renderQuests() {
  const list = document.getElementById('quests-list');
  if (!list) return;
  list.innerHTML = '';
  const quests = await getActiveQuests();
  for (const quest of quests) {
    const progress = getQuestProgress(quest);
    if (progress.claimed) continue;
    const percent = Math.min(100, Math.round((progress.progress / quest.goal) * 100));
    const entry = document.createElement('div');
    entry.className = 'quest-entry';

    entry.innerHTML = `
      <div class="quest-desc">${quest.description}</div>
      <div class="quest-progress-bar-wrap">
        <div class="quest-progress-bar" style="width:${percent}%;"></div>
      </div>
      <div style="font-size:0.96em;color:#fff;text-align:right;">${progress.progress} / ${quest.goal}</div>
      <div class="quest-reward">
        <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins" style="width:18px;">
        +${quest.reward.amount}
      </div>
    `;
    if (progress.completed && !progress.claimed) {
      const btn = document.createElement('button');
      btn.className = 'btn-primary quest-claim-btn';
      btn.textContent = 'Claim';
      btn.onclick = async () => {
        await claimQuestReward(quest);
        entry.classList.add('achievement-fade-out');
        setTimeout(() => {
          entry.remove();
        }, 800);
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
}
function getAchievementData()    { return playerAchievements; }

// 3. Get progress for an achievement
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
async function claimAchievementReward(ach) {
  let data = getAchievementData();
  if (!data[ach.id] || !data[ach.id].completed || data[ach.id].claimed) return false;
  setCurrency(getCurrency() + ach.reward.amount);
  data[ach.id].claimed = true;
  setAchievementData(data);
  updateAchievementsNotificationDot();
  await grantExp(10);
  return true;
}

// 7. Render Achievements Modal
function renderAchievements() {
  const list = document.getElementById('achievements-list');
  if (!list) return;
  list.innerHTML = '';
  ACHIEVEMENTS.forEach(ach => {
    const progress = getAchievementProgress(ach);
    if (progress.claimed) return;
    const percent = Math.min(100, Math.round((progress.progress / ach.goal) * 100));
    const entry = document.createElement('div');
    entry.className = 'quest-entry';

    entry.innerHTML = `
      <div class="quest-desc">${ach.description}</div>
      <div class="quest-progress-bar-wrap">
        <div class="quest-progress-bar" style="width:${percent}%;"></div>
      </div>
      <div style="font-size:0.96em;color:#fff;text-align:right;">${progress.progress} / ${ach.goal}</div>
      <div class="quest-reward">
        <img class="currency-icon" src="OtherImages/Currency/Coins.png" alt="Coins" style="width:18px;">
        +${ach.reward.amount}
      </div>
    `;
    if (progress.completed && !progress.claimed) {
      const btn = document.createElement('button');
      btn.className = 'btn-primary quest-claim-btn';
      btn.textContent = 'Claim';
      btn.onclick = async () => {
        await claimAchievementReward(ach);
        entry.classList.add('achievement-fade-out');
        setTimeout(() => {
          entry.remove();
        }, 800);
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
  const now = new Date();
  // Next 00:00 UTC
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return next.getTime();
}

function formatTimer(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}
let TimerInterval = null;

function startQuestTimer() {
  clearInterval(TimerInterval);
  function update() {
    const now = Date.now();
    const remain = getNextResetTime() - now;
    const el = document.getElementById('quests-timer');
    if (el) el.textContent = 'Refreshes in: ' + formatTimer(remain);
    if (remain <= 0) {
      refreshQuests();
      renderQuests();
      startQuestTimer();
    }
  }
  update();
  TimerInterval = setInterval(update, 1000);
}
function getRandomQuests(pool, count) {
  // Simple random unique selection
  const copy = [...pool];
  const selected = [];
  while (selected.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    selected.push(copy.splice(idx, 1)[0]);
  }
  return selected;
}

// --- FIREBASE-BASED Quest STATE ---
async function getActiveQuests() {
  const user = firebase.auth().currentUser;
  if (!user) return [];
  const doc = await firebase.firestore().collection('users').doc(user.uid).get();
  return (doc.exists && doc.data().activeQuests) ? doc.data().activeQuests : [];
}

async function setActiveQuests(quests) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  await firebase.firestore().collection('users').doc(user.uid).set(
    { activeQuests: quests }, { merge: true }
  );
}

async function refreshQuests() {
  const newQuests = getRandomQuests(QUEST_POOL, 3);
  await setActiveQuests(newQuests);
  await resetQuestProgress('');
  await renderQuests();
}
updateColorAchievements();

async function updateQuestsNotificationDot() {
  const  = await getActiveQuests();
  const questData = getQuestData();
  const hasClaimable = .some(m => {
    const p = questData[m.id];
    return p && p.completed && !p.claimed;
  });
  const dot = document.getElementById('quests-notification-dot');
  if (dot) dot.style.display = hasClaimable ? 'block' : 'none';
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

function getPlayerLevel() { return playerLevel; }
function getPlayerExp() { return playerExp; }

async function grantExp(amount) {
  if (!amount) return;
  playerExp += amount;
  let leveledUp = false;
  while (playerExp >= expToNextLevel(playerLevel)) {
    playerExp -= expToNextLevel(playerLevel);
    playerLevel += 1;
    leveledUp = true;
    showToast(`Level Up! You reached Lv ${playerLevel}!`);
  }
  await saveProgress();
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
window.startQuestTimer = startQuestTimer;

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
  window.renderQuests();
  window.updateQuestsNotificationDot();
  window.startQuestTimer();
  window.updateAchievementsNotificationDot();
  window.renderPlayerLevel();
});
