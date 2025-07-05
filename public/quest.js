let playerLevel = 1;
let playerExp = 0;
let playerQuests = {};
let activeQuests = [];
let questResetTimestamp = 0;
let playerAchievements = {};

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
  setQuestData(data);
  updateQuestsNotificationDot();
  grantExp(10);
  // --- Set/reset the timer for next quest refresh ---
  window.questResetTimestamp = Date.now();
  saveProgress();
  startQuestTimer();
  if (typeof cb === "function") cb(true);
  return true;
}

// 7. Renderers
function renderQuests() {
  const list = document.getElementById('quests-list');
  if (!list) return;
  list.innerHTML = '';
  getActiveQuests(function(quests) {
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
        btn.onclick = function() {
          claimQuestReward(quest, function() {
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
  });
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

function startQuestTimer() {
  clearInterval(TimerInterval);
  function update() {
    const now = Date.now();
    const nextReset = getNextResetTime();
    const remain = nextReset - now;
    const el = document.getElementById('quests-timer');
    if (el) {
      if (remain > 0) {
        el.textContent = 'Refreshes in: ' + formatTimer(remain);
      } else {
        el.textContent = 'New quests available!';
      }
    }
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
  startQuestTimer();
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
window.startQuestTimer = startQuestTimer;
