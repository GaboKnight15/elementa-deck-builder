window.playerQuests = window.playerQuests || {};
window.playerAchievements = window.playerAchievements || {};

const COLOR_QUESTS = ['green', 'red', 'blue', 'yellow', 'purple', 'gray', 'black', 'white'];
// Quest LIST
const QUEST_SLOTS = 5;
const QUEST_POOL = [
  { id: 'purchase_pack', type: 'quest', description: 'Purchase a Booster Pack', goal: 1, reward: { type: 'currency', amount: 100 }, image: 'Images/Blank/Pack.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_green_card', type: 'quest', description: 'Collect a Green Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/GreenCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_red_card', type: 'quest', description: 'Collect a Red Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/RedCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_blue_card', type: 'quest', description: 'Collect a Blue Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/BlueCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_yellow_card', type: 'quest', description: 'Collect a Yellow Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/YellowCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_purple_card', type: 'quest', description: 'Collect a Purple Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/PurpleCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_gray_card', type: 'quest', description: 'Collect a Gray Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/GrayCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_black_card', type: 'quest', description: 'Collect a Black Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/BlackCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_white_card', type: 'quest', description: 'Collect a White Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/WhiteCard.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { questId: null, refillAt: 1720000000000 },
];

// -------------------------- //
// --- COLOR ACHIEVEMENTS --- //
// -------------------------- //
const COLOR_ACHIEVEMENT_TIERS = [
  { tier: 1, goal: 100,  description: "Collect 100 {color} cards", reward: 100 },
  { tier: 2, goal: 300, description: "Collect 300 {color} cards", reward: 200 },
  { tier: 3, goal: 800, description: "Collect 800 {color} cards", reward: 300 },
  { tier: 4, goal: 1500,  description: "Collect 1500 {color} cards", reward: 400 },
  { tier: 5, goal: 5000, description: "Collect 5000 {color} cards", reward: 500 },
];
const COLOR_ACHIEVEMENTS = [
  { color: 'green',  image: 'Images/Blank/Green.png' },
  { color: 'red',    image: 'Images/Blank/Red.png' },
  { color: 'blue',   image: 'Images/Blank/Blue.png' },
  { color: 'yellow', image: 'Images/Blank/Yellow.png' },
  { color: 'purple', image: 'Images/Blank/Purple.png' },
  { color: 'gray',   image: 'Images/Blank/Gray.png' },
  { color: 'black',  image: 'Images/Blank/Black.png' },
  { color: 'white',  image: 'Images/Blank/White.png' },
];
const colorAchievements = generateAchievements(COLOR_ACHIEVEMENTS, COLOR_ACHIEVEMENT_TIERS, 'color');

// ------------------------- //
// --- TYPE ACHIEVEMENTS --- //
// ------------------------- //
const TYPE_ACHIEVEMENT_TIERS = [
  { tier: 1, goal: 30,   reward: { type: 'currency', amount: 50 }, description: "Collect 30 {type} cards" },
  { tier: 2, goal: 100,  reward: { type: 'currency', amount: 120 }, description: "Collect 100 {type} cards" },
  { tier: 3, goal: 250,  reward: { type: 'currency', amount: 350 }, description: "Collect 250 {type} cards" },
  { tier: 4, goal: 800,  reward: { type: 'currency', amount: 1200 }, description: "Collect 800 {type} cards" },
  { tier: 5, goal: 2000, reward: { type: 'currency', amount: 3500 }, description: "Collect 2000 {type} cards" }
];
const TYPE_ACHIEVEMENTS = [
  { type: 'Avian', label: 'Avian', icon: 'Icons/Type/Avian.png', colorHex: '#a47c3b' },
  { type: 'Beast', label: 'Beast', icon: 'Icons/Type/BeastCard.png', colorHex: '#a47c3b' },
  { type: 'Brute', label: 'Brute', icon: 'Icons/Type/Brute.png', colorHex: '#a47c3b' },
  { type: 'Construct', label: 'Construct', icon: 'Icons/Type/Construct.png', colorHex: '#a47c3b' },
  { type: 'Demon', label: 'Demon', icon: 'Icons/Type/Demon.png', colorHex: '#e0801c' },
  { type: 'Dragon', label: 'Dragon', icon: 'Icons/Type/Dragon.png', colorHex: '#e0801c' },
  { type: 'Elemental', label: 'Elemental', icon: 'Icons/Type/Elemental.png', colorHex: '#e0801c' },
  { type: 'Faefolk', label: 'Faefolk', icon: 'Icons/Type/Faefolk.png', colorHex: '#e0801c' },
  { type: 'Undead', label: 'Undead', icon: 'Icons/Type/Undead.png', colorHex: '#a47c3b' },
  { type: 'Warrior', label: 'Warrior', icon: 'Icons/Type/Warrior.png', colorHex: '#e0801c' },
  // ... add more types as needed ...
];
const typeAchievements = generateAchievements(TYPE_ACHIEVEMENTS, TYPE_ACHIEVEMENT_TIERS, 'type');

// ------------------------------ //
// --- ARCHETYPE ACHIEVEMENTS --- //
// ------------------------------ //
const ARCHETYPE_ACHIEVEMENT_TIERS = [
  { tier: 1, goal: 15,   reward: { type: 'currency', amount: 40 }, description: "Collect 2000 {type} cards" },
  { tier: 2, goal: 50,   reward: { type: 'currency', amount: 100 }, description: "Collect 2000 {type} cards" },
  { tier: 3, goal: 150,  reward: { type: 'currency', amount: 300 }, description: "Collect 2000 {type} cards" },
  { tier: 4, goal: 400,  reward: { type: 'currency', amount: 900 }, description: "Collect 2000 {type} cards" },
  { tier: 5, goal: 1000, reward: { type: 'currency', amount: 2500 }, description: "Collect 2000 {type} cards" }
];
const ARCHETYPE_ACHIEVEMENTS = [
  { value: 'Satyr', label: 'Satyr', icon: 'Icons/Archetype/Satyr.png', colorHex: '#888888' },
  { value: 'Goblin', label: 'Goblin', icon: 'Icons/Archetype/Goblin.png', colorHex: '#888888' },
  { value: 'Duskwing', label: 'Duskwing', icon: 'Icons/Archetype/Duskwing.png', colorHex: '#888888' },
  { value: 'Fireland', label: 'Fireland', icon: 'Icons/Archetype/Fireland.png', colorHex: '#888888' },
  { value: 'Frostland', label: 'Frostland', icon: 'Icons/Archetype/Frostland.png', colorHex: '#888888' },
  { value: 'Golemheart', label: 'Golemheart', icon: 'Icons/Archetype/Golem.png', colorHex: '#888888' },

  // --- Dragons --- //
  { value: 'Thornwing', label: 'Thornwing', icon: 'Icons/Archetype/Thornwing.png', colorHex: '#888888' },
  { value: 'Blazingscale', label: 'Blazingscale', icon: 'Icons/Archetype/Blazingscale.png', colorHex: '#888888' },
  { value: 'Abyssdrake', label: 'Abyssdrake', icon: 'Icons/Archetype/Abyssdrake.png', colorHex: '#888888' },
  { value: 'Stormrazor', label: 'Stormrazor', icon: 'Icons/Archetype/Stormrazor.png', colorHex: '#888888' },
  { value: 'Ironclaw', label: 'Ironclaw', icon: 'Icons/Archetype/TerraIronclaw.png', colorHex: '#888888' },
  { value: 'Dreadspine', label: 'Dreadspine', icon: 'Icons/Archetype/Dreadspine.png', colorHex: '#888888' },
  { value: 'Solarwyrm', label: 'Solarwyrm', icon: 'Icons/Archetype/Solarwyrm.png', colorHex: '#888888' },
  { value: 'Nightshroud', label: 'Nightshroud', icon: 'Icons/Archetype/Nightshroud.png', colorHex: '#888888' },

  // --- Constructs --- //
  { value: 'Grovehusk', label: 'Grovehusk', icon: 'Icons/Archetype/Grovehusk.png', colorHex: '#888888' },
  { value: 'Cindercore', label: 'Cindercore', icon: 'Icons/Archetype/Cindercore.png', colorHex: '#888888' },
  { value: 'Coralbound', label: 'Coralbound', icon: 'Icons/Archetype/Coralbound.png', colorHex: '#888888' },
  { value: 'Stormdrive', label: 'Stormdrive', icon: 'Icons/Archetype/Stormdrive.png', colorHex: '#888888' },
  { value: 'Ironwrought', label: 'Ironwrought', icon: 'Icons/Archetype/Ironwrought.png', colorHex: '#888888' },
  { value: 'Plagueaxis', label: 'Plagueaxis', icon: 'Icons/Archetype/Plagueaxis.png', colorHex: '#888888' },
  { value: 'Solarforge', label: 'Solarforge', icon: 'Icons/Archetype/Solarforge.png', colorHex: '#888888' },
  { value: 'Shadowgear', label: 'Shadowgear', icon: 'Icons/Archetype/Shadowgear.png', colorHex: '#888888' },

  { value: 'Hybrid', label: 'Hybrid', icon: 'Icons/Archetype/Hybrid.png', colorHex: '#888888' },
  { value: 'Webcursed', label: 'Webcursed', icon: 'Icons/Archetype/Webcursed.png', colorHex: '#888888' },
  { value: 'Seraph', label: 'Seraph', icon: 'Icons/Archetype/Seraph.png', colorHex: '#888888' },
  { value: 'Zephyra', label: 'Zephyra', icon: 'Icons/Archetype/Zephyra.png', colorHex: '#888888' },
  // ...add more archetypes as needed
];
const archetypeAchievements = generateAchievements(ARCHETYPE_ACHIEVEMENTS, ARCHETYPE_ACHIEVEMENT_TIERS, 'archetype');

// ------------------------- //
// --- TYPE ACHIEVEMENTS --- //
// ------------------------- //
const TRAIT_ACHIEVEMENT_TIERS = [
  { tier: 1, goal: 30,   reward: { type: 'currency', amount: 50 }, description: "Collect 30 {trait} cards" },
  { tier: 2, goal: 100,  reward: { type: 'currency', amount: 120 }, description: "Collect 100 {trait} cards" },
  { tier: 3, goal: 250,  reward: { type: 'currency', amount: 350 }, description: "Collect 250 {trait} cards" },
  { tier: 4, goal: 800,  reward: { type: 'currency', amount: 1200 }, description: "Collect 800 {trait} cards" },
  { tier: 5, goal: 2000, reward: { type: 'currency', amount: 3500 }, description: "Collect 2000 {trait} cards" }
];
const TRAIT_ACHIEVEMENTS = [
  { trait: 'Evolution', label: 'Evolution', icon: 'Icons/Trait/Evolution.png', colorHex: '#a47c3b' },
  { trait: 'Assembly', label: 'Assembly', icon: 'Icons/Trait/Assembly.png', colorHex: '#a47c3b' },
  { trait: 'Fusion', label: 'Fusion', icon: 'Icons/Trait/Fusion.png', colorHex: '#a47c3b' },
  { trait: 'Relic', label: 'Relic', icon: 'Icons/Trait/Relic.png', colorHex: '#e0801c' },
  { trait: 'Equipment', label: 'Equipment', icon: 'Icons/Trait/Equipment.png', colorHex: '#e0801c' },
  { trait: 'Enchantment', label: 'Enchantment', icon: 'Icons/Trait/Enchantment.png', colorHex: '#a47c3b' },
  { trait: 'Mage', label: 'Mage', icon: 'Icons/Trait/Mage.png', colorHex: '#a47c3b' },
  { trait: 'Ranger', label: 'Ranger', icon: 'Icons/Trait/Ranger.png', colorHex: '#a47c3b' },
  { trait: 'Warrior', label: 'Warrior', icon: 'Icons/Trait/Warrior.png', colorHex: '#e0801c' },
];
const traitAchievements = generateAchievements(TRAIT_ACHIEVEMENTS, TRAIT_ACHIEVEMENT_TIERS, 'trait');

// ------------------------------ //
// --- COSMETICS ACHIEVEMENTS --- //
// ------------------------------ //
const AVATAR_ACHIEVEMENT_TIERS = [
  { tier: 1, goal: 5,   reward: { type: 'currency', amount: 100 } },
  { tier: 2, goal: 12,  reward: { type: 'currency', amount: 200 } },
  { tier: 3, goal: 25,  reward: { type: 'currency', amount: 300 } },
  { tier: 4, goal: 50,  reward: { type: 'currency', amount: 400 } }
];

const BANNER_ACHIEVEMENT_TIERS = [
  { tier: 1, goal: 3,   reward: { type: 'currency', amount: 100 } },
  { tier: 2, goal: 8,   reward: { type: 'currency', amount: 200 } },
  { tier: 3, goal: 15,  reward: { type: 'currency', amount: 300 } }
];

const CARDBACK_ACHIEVEMENT_TIERS = [
  { tier: 1, goal: 2,   reward: { type: 'currency', amount: 100 } },
  { tier: 2, goal: 5,   reward: { type: 'currency', amount: 200 } },
  { tier: 3, goal: 10,  reward: { type: 'currency', amount: 300 } }
];

// -------------------- //
// --- ACHIEVEMENTS --- //
// -------------------- //
const ACHIEVEMENTS = [
...generateAchievements(COLOR_ACHIEVEMENTS, COLOR_ACHIEVEMENT_TIERS, 'color'),
  // ...add more colors as needed
  {
  id: 'collect_20_unique_cards',
  description: 'Collect 20 different cards',
  goal: 20,
  reward: { type: 'currency', amount: 500 },
  image: 'Icons/Icons/Rewards.png'
  },
  {
    id: 'collect_avatars',
    label: 'Unlock Avatars',
    category: 'cosmetic',
    target: { property: 'cosmetic', value: 'avatar' }, // for logic use
    icon: 'Icons/Icons/Avatar.png', // use your own icon
    color: '#70b0fd',
    tiers: AVATAR_ACHIEVEMENT_TIERS.map(tier => ({
      ...tier,
      description: `Unlock ${tier.goal} Avatars`
    })),
    hidden: false,
    sortOrder: 201,
  },
  {
    id: 'collect_banners',
    label: 'Unlock Banners',
    category: 'cosmetic',
    target: { property: 'cosmetic', value: 'banner' },
    icon: 'Icons/Icons/Banner.png',
    color: '#ffe066',
    tiers: BANNER_ACHIEVEMENT_TIERS.map(tier => ({
      ...tier,
      description: `Unlock ${tier.goal} Banners`
    })),
    hidden: false,
    sortOrder: 202,
  },
  {
    id: 'collect_cardbacks',
    label: 'Unlock Cardbacks',
    category: 'cosmetic',
    target: { property: 'cosmetic', value: 'cardback' },
    icon: 'Icons/Icons/Cardback.png',
    color: '#bdbdbd',
    tiers: CARDBACK_ACHIEVEMENT_TIERS.map(tier => ({
      ...tier,
      description: `Unlock ${tier.goal} Cardbacks`
    })),
    hidden: false,
    sortOrder: 203,
  },
];


// ----------------- //
// --- FUNCTIONS --- //
// ----------------- //
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
  let timerDiv = document.getElementById('quest-reset-timer');
  if (!timerDiv) {
    timerDiv = document.createElement('div');
    timerDiv.id = 'quest-reset-timer';
    list.parentElement.insertBefore(timerDiv, list);
  }
  updateQuestResetTimer();
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
        <img src="${questDef.image || 'Images/Domains/placeholder.png'}" alt="Quest" class="quest-image">
        <div class="quest-main">
          <div class="quest-desc">${questDef.description}</div>
          ${timerHtml}
          <div class="quest-progress-row">
            <div class="quest-progress-bar-wrap">
              <div class="quest-progress-bar" style="width:${percent}%;"></div>
            </div>
            <div class="quest-progress-numbers">${progress.progress} / ${questDef.goal}</div>
            <div class="quest-reward">
              <img class="currency-icon" src="Icons/Other/Coins.png" alt="Coins">
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
function getNextUtcMidnightMs() {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  return next - now;
}
/**
 * Generic achievement generator for any property (color, type, archetype, etc)
 * @param {Object[]} items - Array of { value, label, icon, colorHex }
 * @param {Object[]} tiers - Array of { tier, goal, reward }
 * @param {string} property - The property to match on a card (e.g. 'color', 'type', 'archetype')
 * @param {string} [category='collection'] - Achievement category
 * @returns {Object[]} Array of achievement objects (one per item)
 */
// ACHIVEMENTS LOGIC
function generateAchievements(items, tiers, property, category = 'collection') {
  return items.map(item => ({
    id: `collect_${item.value}_cards`,
    label: `Collect ${item.label} Cards`,
    category,
    target: { property, value: item.value },
    icon: item.icon,
    color: item.colorHex,
    tiers: tiers.map(tierObj => ({
      ...tierObj,
      description: `Collect ${tierObj.goal} ${item.label} cards`
    })),
    hidden: false,
    sortOrder: 10, // or dynamic if you want
  }));
}
function getCosmeticAchievementProgress(achievement) {
  if (achievement.target.value === "avatar") {
    return (window.playerUnlockedAvatars || []).length;
  }
  if (achievement.target.value === "banner") {
    return (window.playerUnlockedBanners || []).length;
  }
  if (achievement.target.value === "cardback") {
    return (window.playerUnlockedCardbacks || []).length;
  }
  return 0;
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

// --- QUEST RESET TIMER ---
let questResetTimerInterval = null;
function updateQuestResetTimer() {
  const timerDiv = document.getElementById('quest-reset-timer');
  if (!timerDiv) return;
  const ms = getNextUtcMidnightMs();
  timerDiv.textContent = `Next quests reset in ${formatTimerMs(ms)}`;
  // When timer reaches zero, reset quests and update UI
  if (ms <= 0) {
    resetQuestsIfNeeded();
    renderQuests();
  }
}
function startQuestResetTimer() {
  clearInterval(questResetTimerInterval);
  updateQuestResetTimer();
  questResetTimerInterval = setInterval(updateQuestResetTimer, 1000);
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

function getVisibleColorAchievements() {
  // Group all color achievements by color, sorted by tier
  const achievementsByColor = {};
  ACHIEVEMENTS.filter(a => a.color).forEach(a => {
    if (!achievementsByColor[a.color]) achievementsByColor[a.color] = [];
    achievementsByColor[a.color].push(a);
  });
  // Sort by tier for each color
  Object.values(achievementsByColor).forEach(arr => arr.sort((a, b) => a.tier - b.tier));

  const achievementData = getAchievementData();
  const visible = [];
  for (const color in achievementsByColor) {
    const tiers = achievementsByColor[color];
    // Find first incomplete or unclaimed tier
    let found = false;
    for (let i = 0; i < tiers.length; i++) {
      const ach = tiers[i];
      const prog = achievementData[ach.id] || { progress: 0, completed: false, claimed: false };
      if (!prog.claimed) {
        visible.push(ach);
        found = true;
        break;
      }
    }
    // If all tiers claimed, show the highest (completed)
    if (!found && tiers.length > 0) {
      visible.push(tiers[tiers.length - 1]);
    }
  }
  return visible;
}
// Render achievements for category
function renderAchievementsCategory(category) {
  const list = document.getElementById('achievements-list');
  if (!list) return;
  list.innerHTML = '';

  let achievementsToShow = [];
  if (category === 'general') {
    achievementsToShow = ACHIEVEMENTS.filter(a =>
      (!a.color && a.category !== 'color' && a.category !== 'type' && a.category !== 'archetype' && a.category !== 'cosmetic')
    );
  } else if (category === 'color') {
    achievementsToShow = getVisibleColorAchievements();
  } else if (category === 'type') {
    achievementsToShow = ACHIEVEMENTS.filter(a => a.category === 'type');
  } else if (category === 'archetype') {
    achievementsToShow = ACHIEVEMENTS.filter(a => a.category === 'archetype');
  } else if (category === 'cosmetic') {
    achievementsToShow = ACHIEVEMENTS.filter(a => a.category === 'cosmetic');
  } else if (category === 'progression') {
    achievementsToShow = ACHIEVEMENTS.filter(a => a.id && a.id.indexOf('progress') !== -1 );
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

// --- ENSURE QUESTS RESET AT 00:00 UTC ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', function() {
  resetQuestsIfNeeded(); // Ensure daily reset logic runs
});
// OPEN/CLOSE LOGIC
document.getElementById('quests-icon').onclick = function() {
  document.getElementById('quests-modal').style.display = 'flex';
  startQuestResetTimer();
};
document.getElementById('close-quests-modal').onclick = function() {
  document.getElementById('quests-modal').style.display = 'none';
  clearInterval(questResetTimerInterval);
};
document.getElementById('quests-modal').onclick = function(e) {
  if (e.target === this) {
    this.style.display = 'none';
    clearInterval(questResetTimerInterval);
  }
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
