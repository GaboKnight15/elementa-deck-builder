// ========================== 
// === GAMEPLAY LOGIC ===
// ==========================
// -------------- //
// --- PHASES --- //
// -------------- //
const PHASE_META = [
  { key: "start",  display: "Start Phase",  class: "phase-start"  },
  { key: "action", display: "Action Phase", class: "phase-action" },
  { key: "end",    display: "End Phase",    class: "phase-end"    }
];
const PHASE_HANDLERS = { start: handleStartPhase, action: handleActionPhase, end: handleEndPhase };
// Generate phase display and class maps from PHASE_META
const PHASE_DISPLAY_NAMES = Object.fromEntries(PHASE_META.map(p => [p.key, p.display]));
const PHASE_CLASS = Object.fromEntries(PHASE_META.map(p => [p.key, p.class]));

// Generate all phase steps in order
const PHASES = [];
const TURNS = ["player", "enemy"];
TURNS.forEach(turn =>
  PHASE_META.forEach(phase =>
    PHASES.push({ turn, phase: phase.key })
  )
);

// ------------- //
// --- ZONES --- //
// ------------- //
let gameState = {
  playerDeck: [], playerHand: [], playerFallen: [], playerVoid: [],
  enemyDeck: [], enemyHand: [], enemyFallen: [], enemyVoid: [],

  // New slot layout (5 creature + 5 support per side)
  playerCreatureSlots: Array(5).fill(null),
  playerSupportSlots: Array(5).fill(null),
  enemyCreatureSlots: Array(5).fill(null),
  enemySupportSlots: Array(5).fill(null),

  playerDomain: null, enemyDomain: null,
  turn: "player",
  phase: "start",
  essencePools: {
    enemy: { green:0, red:0, blue:0, yellow:0, gray:0, purple:0, white:0, black:0, multicolor:0 },
    player: { green:0, red:0, blue:0, yellow:0, gray:0, purple:0, white:0, black:0, multicolor:0 }
  },
  gameLog: [],
  chatLog: []
};

const ZONE_MAP = {
  // --- Core player zones ---
  playerDeck:   { id: "player-deck-zone",   arr: () => gameState.playerDeck },
  playerHand:   { id: "player-hand",        arr: () => gameState.playerHand },
  playerFallen: { id: "player-fallen-zone", arr: () => gameState.playerFallen },
  playerVoid:   { id: "player-void-zone", arr: () => gameState.playerVoid },

  // --- Core enemy zones ---
  enemyDeck:   { id: "enemy-deck-zone",   arr: () => gameState.enemyDeck },
  enemyHand:   { id: "enemy-hand",        arr: () => gameState.enemyHand },
  enemyFallen: { id: "enemy-fallen-zone", arr: () => gameState.enemyFallen },
  enemyVoid:   { id: "enemy-void-zone", arr: () => gameState.enemyVoid },

  // --- Canonical battlefield storage (ONLY these for board state) ---
  playerCreatureSlots: { id: "player-creature-zone", arr: () => gameState.playerCreatureSlots },
  playerSupportSlots:  { id: "player-support-zone",  arr: () => gameState.playerSupportSlots },
  enemyCreatureSlots:  { id: "enemy-creature-zone",  arr: () => gameState.enemyCreatureSlots },
  enemySupportSlots:   { id: "enemy-support-zone",   arr: () => gameState.enemySupportSlots },

  // --- Derived views (computed, not stored) ---
  playerCreatures: { id: null, arr: () => gameState.playerCreatureSlots.filter(Boolean) },
  enemyCreatures:  { id: null, arr: () => gameState.enemyCreatureSlots.filter(Boolean) },

  playerSupports:  { id: null, arr: () => gameState.playerSupportSlots.filter(Boolean) },
  enemySupports:   { id: null, arr: () => gameState.enemySupportSlots.filter(Boolean) },

  allCreatures: { id: null, arr: () => [
    ...gameState.playerCreatureSlots.filter(Boolean),
    ...gameState.enemyCreatureSlots.filter(Boolean)
  ]},

  allSupports: { id: null, arr: () => [
    ...gameState.playerSupportSlots.filter(Boolean),
    ...gameState.enemySupportSlots.filter(Boolean)
  ]},

  playerField: { id: null, arr: () => [
    ...gameState.playerCreatureSlots.filter(Boolean),
    ...gameState.playerSupportSlots.filter(Boolean)
  ]},

  enemyField: { id: null, arr: () => [
    ...gameState.enemyCreatureSlots.filter(Boolean),
    ...gameState.enemySupportSlots.filter(Boolean)
  ]},

  allField: { id: null, arr: () => [
    ...gameState.playerCreatureSlots.filter(Boolean),
    ...gameState.playerSupportSlots.filter(Boolean),
    ...gameState.enemyCreatureSlots.filter(Boolean),
    ...gameState.enemySupportSlots.filter(Boolean)
  ]},

  allHands:   { id: null, arr: () => [...gameState.playerHand, ...gameState.enemyHand] },
  allDecks:   { id: null, arr: () => [...gameState.playerDeck, ...gameState.enemyDeck] },
  allFallens: { id: null, arr: () => [...gameState.playerFallen, ...gameState.enemyFallen] },
  allVoids:   { id: null, arr: () => [...gameState.playerVoid, ...gameState.enemyVoid] },
  
  allCards: { id: null, arr: () => [
    ...gameState.playerDeck, ...gameState.playerHand, ...gameState.playerFallen, ...gameState.playerVoid,
    ...gameState.enemyDeck, ...gameState.enemyHand, ...gameState.enemyFallen, ...gameState.enemyVoid,
    ...gameState.playerCreatureSlots.filter(Boolean), ...gameState.playerSupportSlots.filter(Boolean),
    ...gameState.enemyCreatureSlots.filter(Boolean), ...gameState.enemySupportSlots.filter(Boolean)
  ]}
};

// --- EVENT QUEUE --- //
let eventQueue = [];
let isProcessingEvents = false;

let attackMode = {attackerId: null, attackerZone: null, cancelHandler: null};

const INITIAL_HAND_SIZE = 4;
// STATUS EFFECTS
const STATUS = {
  burned: { name: 'Burned', icon: 'Icons/Status/Burned.png', duration: 2, tick: "enemyEnd",
    description: 'Receives 1 more damage.',
    apply: function(cardObj) {
      // Lower DEF by 1 if not already applied
      if (!cardObj.burned) {
        cardObj.def = (cardObj.def || 0) - 1;
        cardObj.burned = true;
      }
    },
    remove: function(cardObj) {
      // Restore DEF when Burn is removed
      if (cardObj.burned) {
        cardObj.def = (cardObj.def || 0) + 1;
        cardObj.burned = false;
      }
    },
    onEndPhase: function(cardObj) {
      cardObj.currentHP = Math.max(0, (cardObj.currentHP || getBaseHp(cardObj.cardId)) - 1);
    }
  },
  frozen: {
    icon: 'Icons/Status/Frozen.png',
    name: 'Frozen',
    description: 'Disabled and sealed.',
    duration: 1,
    tick: "allEnd", // Decrement on every End Phase
    apply: (cardObj) => {
      cardObj.frozen = true;
      cardObj.canAttack = false;
    },
    remove: (cardObj) => {
      cardObj.frozen = false;
      cardObj.canAttack = true;
    },
  },
poisoned: { name: 'Poisoned', duration: 3, tick: "allEnd", icon: 'Icons/Status/Poisoned.png',
  description: 'Takes 1 damage during each End Phase.',
  apply: function(cardObj) {
    try {
      // mark instance as poisoned for quick checks / UI
      cardObj.poisoned = true;
      // store original max HP if needed by other effects (no maxHP change at apply)
      if (typeof cardObj.originalMaxHP === 'undefined') {
        cardObj.originalMaxHP = (typeof cardObj.maxHP === 'number' ? cardObj.maxHP : getBaseHp(cardObj.cardId));
      }
    } catch (err) { console.warn('Poisoned.apply failed', err); }
  },
  remove: function(cardObj) {
    try {
      cardObj.poisoned = false;
      delete cardObj.poisoned;
      // Do not restore HP here; Poison deals damage each End Phase while present.
    } catch (err) { console.warn('Poisoned.remove failed', err); }
  },
  onEndPhase: function(cardObj) {
    try {
      if (typeof cardObj.currentHP !== 'number') {
        cardObj.currentHP = getBaseHp(cardObj.cardId);
      }
      cardObj.currentHP = Math.max(0, cardObj.currentHP - 1);
    } catch (err) {
      console.warn('Poisoned.onEndPhase error', err);
    }
  }
},
  paralized: {
    icon: 'Icons/Status/Paralized.png', name: 'Paralized', 
    description: 'Disabled.',
    apply: function(cardObj) {
      cardObj.paralyzed = true;
      cardObj.disabled = true;
    },
    remove: function(cardObj) {
      cardObj.paralyzed = false;
      cardObj.disabled = false;
      delete cardObj.paralyzed;
    },
  },
  drenched: { name: 'Drenched', duration: 1, icon: 'Icons/Status/Drenched.png',
    description: 'Reduces ATK by {1}.',
    apply: function(cardObj) {
      cardObj.drenched = true;
    },
    remove: function(cardObj) {
      cardObj.drenched = false;
      delete cardObj.drenched;
    }
  },
bound: { name: 'Bound', icon: 'Icons/Status/Bound.png', duration: 1,
  description: 'Disabled and cannot activate skills.',
  apply: function(cardObj) {
    cardObj.bound = true;
    cardObj.disabled = true;
    cardObj.canActivateSkill = false;
  },
  remove: function(cardObj) {
    cardObj.bound = false;
    cardObj.disabled = false;
    cardObj.canActivateSkill = true;
    delete cardObj.bound;
  }
},
sealed: { name: "Sealed", duration: 1, icon: "Icons/Status/Sealed.png",
  description: "Skills cannot be activated.",
  // apply/remove set an instance-level flag so checks are cheap and reliable
  apply: function(cardObj) {
    cardObj.sealed = true;
    cardObj.canActivateSkill = false;
  },
  remove: function(cardObj) {
    cardObj.sealed = false;
    delete cardObj.canActivateSkill;
  }
},
cursed: { name: 'Cursed', duration: 3, icon: 'Icons/Status/Cursed.png',
  description: 'Reduces max HP by 1 during each End Phase.',
  apply: function(cardObj) {
      cardObj.cursed = true;
      if (typeof cardObj.originalMaxHP === 'undefined') {
        cardObj.originalMaxHP = (typeof cardObj.maxHP === 'number' ? cardObj.maxHP : getBaseHp(cardObj.cardId));
      }
  },
  remove: function(cardObj) {
      cardObj.cursed = false;
      delete cardObj.cursed;
  },
  onEndPhase: function(cardObj) {
      // Ensure maxHP exists
      const base = (typeof cardObj.maxHP === 'number') ? cardObj.maxHP : (cardObj._originalMaxHP || getBaseHp(cardObj.cardId));
      // Lower maxHP by 1 (but never below 1)
      cardObj.maxHP = Math.max(1, (typeof cardObj.maxHP === 'number' ? cardObj.maxHP - 1 : base - 1));
      // Clamp currentHP to new max
      if (typeof cardObj.currentHP === 'number' && cardObj.currentHP > cardObj.maxHP) {
        cardObj.currentHP = cardObj.maxHP;
      }
  }
},
quickstrike: {
  icon: 'Icons/Status/Quickstrike.png', name: 'Quickstrike',
  description: 'Deals damage before the enemy.',
  apply: function(cardObj) {
    cardObj.quickstrike = true;
  },
  remove: function(cardObj) {
    cardObj.quickstrike = false;
  }
},
invulnerableAtk: {
  icon: 'Icons/Status/Invulnerable.png',
  name: 'Invulnerable (attacking)',
  description: "Receives no damage from battles.",
  apply: function(cardObj) {
    cardObj.invulnerableWhileAttacking = true;
  },
  remove: function(cardObj) {
    cardObj.invulnerableWhileAttacking = false;
  }
},
  // ... add more statuses
};

/*------------------------------
// ATTACK TARGETING ABILITIES //
------------------------------*/
const TARGET_ABILITY = {
  ambush: { name: 'Ambush', icon: 'Icons/Ability/Ambush.png',
    description: 'Cannot be targeted. Removed if this creature attacks or uses a skill.',
    filter: (attacker, targets) => {
      // Remove all targets with Ambush ability
      return targets.filter(target => !defenderHasAbility(target, 'Ambush'));
    }
  },
  flying: { name: 'Flying', icon: 'Icons/Ability/Flying.png',
    description: 'Target priority -1.',
    filter: (attacker, targets) => {
      // Flying ignores color protection (handled outside), so here: allow all
      return targets;
    }
  },
  protect: { name: 'Protect', icon: 'Icons/Ability/Protect.png',
    description: 'Target priority +1.',
    filter: (attacker, targets) => {
      const protectTargets = targets.filter(target => defenderHasAbility(target, 'Protect'));
      if (protectTargets.length > 0 && !attackerHasAbility(attacker, 'Flying')) {
        return protectTargets;
      }
      return targets;
    }
  },
conceal: { name: 'Conceal', icon: 'Icons/Ability/Conceal.png',
  description: 'Target priority -1.',
  filter: (attacker, targets) => {
      const normal = [];
      const concealed = [];
      targets.forEach(t => {
        const has = (typeof defenderHasAbility === 'function') ? defenderHasAbility(t, 'Conceal') : (
          Array.isArray(getCardAbilities(t)) && getCardAbilities(t).some(a => (typeof a === 'string' ? a === 'Conceal' : false))
        );
        if (has) concealed.push(t);
        else normal.push(t);
      });
      return [...normal, ...concealed];
      return targets;
  }
},
  veil: { name: 'Veil', icon: 'Icons/Ability/Veil.png',
    description: 'Cannot be targeted by spells and skills.',
    handler: function(sourceCardObj, skillObj) {
      startSkillTarget(
        [...gameState.allyCreatures, ...gameState.allyTerrains],
        selectedTarget => {
          grantVeil(selectedTarget, skillObj.duration);
          renderGameState();
        }
      );
    }
  },
  // ...add more targeting abilities here!
};

// --- SKILL TRIGGER MAP ---
// Maps skill activation triggers to their event handlers
const TRIGGER_MAP = {
  summon: { name: "Summon", icon: 'Icons/Trigger/Summon.png',
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card is drawn
  draw: { name: "Draw", icon: 'Icons/Trigger/Draw.png',
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card enters the fallen
  echo: { name: "Echo", icon: 'Icons/Trigger/Echo.png',
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card deals damage
  frenzy: {
    name: "Frenzy", icon: 'Icons/Trigger/Frenzy.png',
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card receives damage
  brace: {
    name: "brace", icon: 'Icons/Trigger/Brace.png',
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card attacks
  attack: {
    name: "attack", icon: 'Icons/Trigger/Attack.png',
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card is attacked
  defend: {
    name: "Defend", icon: 'Icons/Trigger/Defend.png',
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  }
  // Add more triggers as needed!
};

const REQ_MAP = {
tap: { name: 'Tap', icon: 'Icons/Skill/Tap.png',
  zones: ['playerCreatures', 'playerTerrains', 'enemyCreatures', 'enemyTerrains'],
  description: 'Changes itself to horizontal.',
  canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
    const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
    if (!validZones.includes(currentZone)) return false;
    return sourceCardObj && sourceCardObj.orientation !== 'horizontal';
  },
  handler: function(sourceCardObj, skillObj, next) {
    const currentZone = getZoneNameForCard(sourceCardObj);
    const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];

    if (!validZones.includes(currentZone)) {
      showToast("Tap can only be activated from the field.");
      next && next();
      return;
    }

    if (sourceCardObj.orientation === 'horizontal') {
      next && next();
      return;
    }

    changeCardPosition(sourceCardObj, 'horizontal', () => {
      renderGameState && renderGameState();
      next && next();
    });
  }
},

untap: { name: 'Untap', icon: 'Icons/Skill/Untap.png',
  zones: ['playerCreatures', 'playerTerrains', 'enemyCreatures', 'enemyTerrains'],
  description: 'Changes itself to vertical.',
  canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
    const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
    if (!validZones.includes(currentZone)) return false;
    return sourceCardObj && sourceCardObj.orientation !== 'vertical';
  },
  handler: function(sourceCardObj, skillObj, next) {
    const currentZone = getZoneNameForCard(sourceCardObj);
    const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];

    if (!validZones.includes(currentZone)) {
      showToast("Untap can only be activated from the field.");
      next && next();
      return;
    }

    if (sourceCardObj.orientation === 'vertical') {
      next && next();
      return;
    }

    changeCardPosition(sourceCardObj, 'vertical', () => {
      renderGameState && renderGameState();
      next && next();
    });
  }
},
  stash: { name: 'Stash', icon: 'Icons/Skill/Stash.png',
    zones: ['playerHand', 'enemyHand'],
    description: 'Returns itself from the hand to the deck.',
    canActivate(sourceCardObj, skillObj, currentZone, gameState) {
      return this.zones.includes(currentZone);
    },
    handler(sourceCardObj, skillObj, next) {
      const owner = getCardOwner(sourceCardObj) === 'enemy' ? 'enemy' : 'player';
      const handArr = owner === 'enemy' ? gameState.enemyHand : gameState.playerHand;
      const deckArr = owner === 'enemy' ? gameState.enemyDeck : gameState.playerDeck;

      if (!handArr.includes(sourceCardObj)) {
        showToast("Stash can only be activated from hand.");
        next && next();
        return;
      }

      moveCard(sourceCardObj.instanceId, handArr, deckArr);
      if (owner === 'enemy') gameState.enemyDeck = shuffle(gameState.enemyDeck);
      else gameState.playerDeck = shuffle(gameState.playerDeck);

      renderGameState();
      next && next();
    }
  },

  discard: {
    name: 'Discard',
    icon: 'Icons/Skill/Discard.png',
    zones: ['playerHand', 'enemyHand'],
    description: 'Sends itself from the hand to the void.',
    canActivate(sourceCardObj, skillObj, currentZone, gameState) {
      return this.zones.includes(currentZone);
    },
    handler(sourceCardObj, skillObj, next) {
      const owner = getCardOwner(sourceCardObj) === 'enemy' ? 'enemy' : 'player';
      const handArr = owner === 'enemy' ? gameState.enemyHand : gameState.playerHand;
      const voidArr = owner === 'enemy' ? gameState.enemyFallen : gameState.playerFallen;

      if (!handArr.includes(sourceCardObj)) {
        showToast("Discard can only be activated from hand.");
        next && next();
        return;
      }

      moveCard(sourceCardObj.instanceId, handArr, voidArr);
      renderGameState();
      next && next();
    }
  },

  return: {
    name: 'Return',
    icon: 'Icons/Skill/Return.png',
    zones: ['playerCreatures', 'playerTerrains', 'enemyCreatures', 'enemyTerrains'],
    description: 'Returns itself from the field to the hand.',
    canActivate(sourceCardObj, skillObj, currentZone, gameState) {
      return this.zones.includes(currentZone);
    },
    handler(sourceCardObj, skillObj, next) {
      const owner = getCardOwner(sourceCardObj) === 'enemy' ? 'enemy' : 'player';
      const fromArr = getZoneArrayForCard(sourceCardObj);
      const handArr = owner === 'enemy' ? gameState.enemyHand : gameState.playerHand;

      if (!fromArr || !this.zones.includes(getZoneNameForCard(sourceCardObj))) {
        showToast("Return can only be activated from the field.");
        next && next();
        return;
      }

      moveCard(sourceCardObj.instanceId, fromArr, handArr);
      renderGameState();
      next && next();
    }
  },

  retreat: {
    name: 'Retreat',
    icon: 'Icons/Skill/Retreat.png',
    zones: ['playerCreatures', 'playerTerrains', 'enemyCreatures', 'enemyTerrains'],
    description: 'Returns itself from the field to the deck.',
    canActivate(sourceCardObj, skillObj, currentZone, gameState) {
      return this.zones.includes(currentZone);
    },
    handler(sourceCardObj, skillObj, next) {
      const owner = getCardOwner(sourceCardObj) === 'enemy' ? 'enemy' : 'player';
      const fromArr = getZoneArrayForCard(sourceCardObj);
      const deckArr = owner === 'enemy' ? gameState.enemyDeck : gameState.playerDeck;

      if (!fromArr || !this.zones.includes(getZoneNameForCard(sourceCardObj))) {
        showToast("Retreat can only be activated from the field.");
        next && next();
        return;
      }

      moveCard(sourceCardObj.instanceId, fromArr, deckArr);
      if (owner === 'enemy') gameState.enemyDeck = shuffle(gameState.enemyDeck);
      else gameState.playerDeck = shuffle(gameState.playerDeck);

      renderGameState();
      next && next();
    }
  },
  
void: {
  name: 'Void',
  icon: 'Icons/Skill/Void.png',
  zones: ['playerFallen', 'enemyFallen'],
  description: 'Moves itself from the fallen to the void.',
  canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
    const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
    return validZones.includes(currentZone);
  },
  handler: function(sourceCardObj, skillObj, next) {
    const owner = getCardOwner(sourceCardObj) === 'enemy' ? 'enemy' : 'player';

    const fromArr =
      gameState.playerFallen.includes(sourceCardObj) ? gameState.playerFallen :
      gameState.enemyFallen.includes(sourceCardObj) ? gameState.enemyFallen :
      null;

    const voidArr = owner === 'enemy' ? gameState.enemyFallen : gameState.playerFallen;

    if (!fromArr) {
      showToast("Void can only be activated from fallen.");
      next && next();
      return;
    }

    moveCard(sourceCardObj.instanceId, fromArr, voidArr);
    renderGameState();
    next && next();
  }
},
};

const EFF_MAP = {
summon: { name: 'Summon', zone: 'playerHand', icon: 'Icons/Skill/Summon.png',
  description: 'Move this card from hand to the field.',
  canActivate(cardObj, skillObj, currentZone, gameState) {
    // Accept common zone spellings; normalize if you can
    return currentZone === 'playerHand' || currentZone === 'playerHand';
  },
  handler(sourceCardObj, skillObj, step = {}, nextEffect) {
    const owner = getCardOwner(sourceCardObj) === 'enemy' ? 'enemy' : 'player';
    const handArr = owner === 'player' ? gameState.playerHand : gameState.enemyHand;

    if (!handArr.includes(sourceCardObj)) {
      showToast && showToast('Summon can only be used from hand.', { type: 'error' });
      nextEffect && nextEffect();
      return;
    }

    const def = dummyCards.find(c => c.id === sourceCardObj.cardId);
    const cat = String(def?.category || '').toLowerCase();

    let toArr = null;
    if (cat === 'creature') toArr = owner === 'player' ? gameState.playerCreatures : gameState.enemyCreatures;
    else if (cat === 'terrain') toArr = owner === 'player' ? gameState.playerTerrains : gameState.enemyTerrains;
    else {
      showToast && showToast('This card cannot be summoned.', { type: 'error' });
      nextEffect && nextEffect();
      return;
    }

    // New rule:
    // - creatures enter disabled/horizontal
    // - terrains enter enabled/vertical
    const orientation = cat === 'creature' ? 'horizontal' : 'vertical';

    moveCard(sourceCardObj.instanceId, handArr, toArr, { orientation }, () => {
      renderGameState && renderGameState();
      nextEffect && nextEffect();
    });
  }
},
  
draw: { name: 'Draw',
  description: 'Draw from the your deck.', icon: 'Icons/Skill/Draw.png',
  canActivate(sourceCardObj, skillObj, currentZone, gameState, step = {}) {
    const owner = (typeof getCardOwner === 'function' && getCardOwner(sourceCardObj) === 'enemy')
      ? 'enemy'
      : 'player';

    const deckArr = owner === 'enemy' ? gameState.enemyDeck : gameState.playerDeck;

    const amount = Math.max(1, Number(step.amount || 1));
    return Array.isArray(deckArr) && deckArr.length >= 1 && deckArr.length >= Math.min(amount, deckArr.length);
  },
  handler(sourceCardObj, skillObj, step = {}, nextEffect) {
    const owner = (typeof getCardOwner === 'function' && getCardOwner(sourceCardObj) === 'enemy')
      ? 'enemy'
      : 'player';

    const deckArr = owner === 'enemy' ? gameState.enemyDeck : gameState.playerDeck;
    const handArr = owner === 'enemy' ? gameState.enemyHand : gameState.playerHand;

    if (!Array.isArray(deckArr) || !Array.isArray(handArr)) {
      nextEffect && nextEffect();
      return;
    }

    let amount = Number(step.amount || 1);
    if (!Number.isFinite(amount) || amount < 1) amount = 1;

    // Draw up to amount, but not more than deck size
    const n = Math.min(amount, deckArr.length);

    if (n <= 0) {
      showToast && showToast('No cards left in deck.', { type: 'info' });
      nextEffect && nextEffect();
      return;
    }

    // Move cards one-by-one so moveCard animation/callback chain stays correct
    let i = 0;
    const drawOne = () => {
      if (i >= n) {
        // Update UI + sync once at end
        if (typeof renderGameState === 'function') renderGameState();
        if (typeof setupDropZones === 'function') setupDropZones();
        if (typeof emitPublicState === 'function') emitPublicState();
        nextEffect && nextEffect();
        return;
      }
      const topCardObj = deckArr[0];
      if (!topCardObj) {
        // defensive
        i = n;
        drawOne();
        return;
      }
      // top of deck is index 0 in your UI logic; change to pop() if you treat end as top
      moveCard(topCardObj.instanceId, deckArr, handArr, {}, () => {
        i++;
        drawOne();
      });
    };
    drawOne();
  }
},
  
cast: { name: 'Cast', zone: 'playerHand', icon: 'Icons/Skill/Cast.png',
  description: 'Cast a spell from hand: resolve, then send to void.',
  canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
    // Accept common spellings used across your code
    return currentZone === 'playerHand' || currentZone === 'playerHand' || currentZone === 'player-hand';
  },
  handler: function(sourceCardObj, skillObj, step = {}, nextEffect) {
      const owner = (getCardOwner(sourceCardObj) === 'enemy') ? 'enemy' : 'player';
      const handArr = owner === 'player' ? gameState.playerHand : gameState.enemyHand;
      const voidArr = owner === 'player' ? gameState.playerFallen : gameState.enemyFallen;
      // Must be in hand
      if (!handArr.includes(sourceCardObj)) {
        showToast && showToast('Cast can only be used from hand.', { type: 'error' });
        nextEffect && nextEffect();
        return;
      }
      // Must be a Spell by definition
      const def = dummyCards.find(c => c.id === sourceCardObj.cardId);
      const isSpell = String(def?.category || '').toLowerCase() === 'spell';
      if (!isSpell) {
        showToast && showToast('Only spell cards can be Cast.', { type: 'error' });
        nextEffect && nextEffect();
        return;
      }
      runHandSkillWithAnimation(sourceCardObj, skillObj, voidArr, () => {
        nextEffect && nextEffect();
      });
  }
},

terraform: { name: 'Terraform', zone: 'playerHand', icon: 'Icons/Skill/Terraform.png',
  description: 'Play a terrain from hand to terrain zone.',
  canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
    // Must be in hand (tolerant naming), and terraform not used this turn by current player
    const inHand = (currentZone === 'playerHand' || currentZone === 'playerHand' || currentZone === 'player-hand');
    const activePlayer = gameState.turn;
  },
  handler: function(sourceCardObj, skillObj, step = {}, nextEffect) {
      const activePlayer = gameState.turn;

      const owner = (getCardOwner(sourceCardObj) === 'enemy') ? 'enemy' : 'player';
      const handArr = owner === 'player' ? gameState.playerHand : gameState.enemyHand;
      const terrainsArr = owner === 'player' ? gameState.playerTerrains : gameState.enemyTerrains;

      // Must be in hand
      if (!handArr.includes(sourceCardObj)) {
        showToast && showToast("You can only Terraform terrains from your hand.", { type: "error" });
        nextEffect && nextEffect();
        return;
      }

      // Must be a Terrain by definition
      const def = dummyCards.find(c => c.id === sourceCardObj.cardId);
      const isTerrain = String(def?.category || '').toLowerCase() === 'terrain';
      if (!isTerrain) {
        showToast && showToast("Only terrain cards can be Terraform'ed.", { type: "error" });
        nextEffect && nextEffect();
        return;
      }

      moveCard(sourceCardObj.instanceId, handArr, terrainsArr, { orientation: "vertical" }, () => {
        renderGameState && renderGameState();
        nextEffect && nextEffect();
      });
  }
},

strike: { name: 'Strike', icon: 'Icons/Skill/Strike.png', description: 'Deals damage.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    // For your rule: any card on the field can be a target (player+enemy, creatures+terrains)
    const enemyField = [...gameState.enemyCreatures, ...gameState.enemyTerrains];
    startSkillTarget(
      enemyField,
      selectedTarget => {
        const damage = (typeof step.amount === "number") ? step.amount : 0;
        if (damage > 0) dealDamage(sourceCardObj, selectedTarget, damage);
        if (typeof nextEffect === "function") nextEffect();
      }
    );
  }
},
burn: { name: 'Burn', icon: 'Icons/Skill/Burn.png',
  description: 'Deals damage and burns.',
  handler: effectStatusHandler('Burn')
},
poison: { name: 'Poison', icon: 'Icons/Skill/Poison.png',
  description: 'Deals damage and poisons.',
  handler: effectStatusHandler('Poison')
},
freeze: { name: 'Freeze', icon: 'Icons/Skill/Freeze.png',
  description: 'Deals damage and freezes.',
  handler: effectStatusHandler('Freeze')
},
static: { name: 'Paralysis', icon: 'Icons/Skill/Paralysis.png',
  description: 'Deals damage and paralyzes.',
  handler: effectStatusHandler('Paralysis')
},
bind: { name: 'Bind', icon: 'Icons/Skill/Bind.png',
  description: 'Deals damage and binds.',
  handler: effectStatusHandler('Bind')
},
curse: { name: 'Curse', icon: 'Icons/Skill/Curse.png',
  description: 'Deals damage and curses.',
  handler: effectStatusHandler('Curse')
}, 
enable: { name: 'Enable', icon: 'Icons/Skill/Untap.png',
  description: 'Rotate a card vertically.',
  handler: function(sourceCardObj, skillObj, step = {}, nextEffect) {
      const targets = step.target ? getTargets(step.target, sourceCardObj) : [sourceCardObj];
      const arrTargets = Array.isArray(targets) ? targets : [targets];

      arrTargets.filter(Boolean).forEach(t => {
        // Only rotate if currently horizontal
        if (t.orientation === "horizontal") {
          t.orientation = "vertical";
        } else if (!t.orientation) {
          // If orientation missing (safety), set it
          t.orientation = "vertical";
        }
      });

      renderGameState && renderGameState();
      setupDropZones && setupDropZones();
      if (typeof nextEffect === "function") nextEffect();
  },
  canActivate: function(sourceCardObj, skillObj, currentZone, gameState, step = {}) {
    // Allow from field by default (match your other rotation logic)
    // If you want hand/void use too, expand this list.
    const fieldZones = ['playerCreatures','playerTerrains','enemyCreatures','enemyTerrains'];
    if (!fieldZones.includes(currentZone)) return false;
    if (step && step.target) {
      const targets = getTargets(step.target, sourceCardObj);
      return Array.isArray(targets) && targets.some(t => t && t.orientation !== "vertical");
    }

    // Self default
    return sourceCardObj && sourceCardObj.orientation !== "vertical";
  }
},
bolster: { icon: 'Icons/Skill/Bolster.png',
  handler(sourceCardObj, skillObj, step, nextEffect, context = {}) {
    let targets = [];

    if (step.target === 'self') {
      targets = [sourceCardObj];
    } else if (step.target === 'triggerCard' && context.triggerCard) {
      targets = [context.triggerCard];
    }

    targets.forEach(t => {
      if (typeof step.hp === 'number') {
        t.currentHP = (t.currentHP || getBaseHp(t.cardId)) + step.hp;
      }
    });
    if (typeof nextEffect === 'function') nextEffect();
  }
},
disable: { name: 'Disable', icon: 'Icons/Skill/Tap.png',
  description: 'Rotate a card to horizontal (disabled).',
  handler: function(sourceCardObj, skillObj, step = {}, nextEffect) {
      const targets = step.target ? getTargets(step.target, sourceCardObj) : [sourceCardObj];
      const arrTargets = Array.isArray(targets) ? targets : [targets];

      arrTargets.filter(Boolean).forEach(t => {
        // Only rotate if currently vertical
        if (t.orientation === "vertical") {
          t.orientation = "horizontal";
        } else if (!t.orientation) {
          // If orientation missing (safety), assume vertical->horizontal is intended for disable
          t.orientation = "horizontal";
        }
      });

      renderGameState && renderGameState();
      setupDropZones && setupDropZones();
      if (typeof nextEffect === "function") nextEffect();
  },
  canActivate: function(sourceCardObj, skillObj, currentZone, gameState, step = {}) {
    const fieldZones = ['playerCreatures','playerTerrains','enemyCreatures','enemyTerrains'];
    if (!fieldZones.includes(currentZone)) return false;
    if (step && step.target) {
      const targets = getTargets(step.target, sourceCardObj);
      return Array.isArray(targets) && targets.some(t => t && t.orientation !== "horizontal");
    }
    return sourceCardObj && sourceCardObj.orientation !== "horizontal";
  }
},
// --- SELF SUMMONING SKILLS --- //
dash: { name: 'Dash', zone: 'playerHand', icon: 'Icons/Skill/Dash.png',
  description: 'Summon this card from your hand with half HP (rounded up).',
  // Updated signature: accepts (sourceCardObj, skillObj, step, nextEffect)
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    // Only activate if in hand
    const isHand = gameState.playerHand.includes(sourceCardObj);
    if (!isHand) {
      showToast("Dash can only be activated from your hand.");
      if (nextEffect) nextEffect();
      return;
    }
    const cardData = dummyCards.find(c => c.id === sourceCardObj.cardId);
    // Determine correct field zone
    const category = Array.isArray(cardData.category)
      ? cardData.category.map(c => c.toLowerCase())
      : [String(cardData.category).toLowerCase()];
    let targetArr;
    if (category.includes("creature")) {
      targetArr = gameState.playerCreatures;
    } else if (category.includes("terrain")) {
      targetArr = gameState.playerTerrains;
    } else {
      showToast("Dash can only be used for creatures or terrains.");
      if (nextEffect) nextEffect();
      return;
    }
    runHandSkillWithAnimation(sourceCardObj, skillObj, targetArr, () => {
    });
  },
  canActivate: function(cardObj, skillObj, currentZone, gameState) {
    // Only allow activation if the card is in the hand zone
    return currentZone === "hand" && gameState.playerHand.includes(cardObj);
  }
},
reanimate: { name: 'Reanimate', zone: 'fallen', icon: 'Icons/Skill/Reanimate.png',
  description: 'Summon this card from the fallen zone.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    // Only resolve if card is in void
    const isVoid = gameState.playerFallen.includes(sourceCardObj);
    if (!isVoid) {
      showToast("Reanimate can only be activated from the fallen zone.");
      if (nextEffect) nextEffect();
      return;
    }
    // Determine target zone: creatures/terrains by card type
    const cardData = dummyCards.find(c => c.id === sourceCardObj.cardId);
    let targetArr;
    const category = Array.isArray(cardData.category)
      ? cardData.category.map(c => c.toLowerCase())
      : [String(cardData.category).toLowerCase()];
    if (category.includes("creature")) {
      targetArr = gameState.playerCreatures;
    } else if (category.includes("terrain")) {
      targetArr = gameState.playerTerrains;
    } else {
      showToast("Reanimate can only be used for creatures or terrains.");
      if (nextEffect) nextEffect();
      return;
    }
  },
  canActivate: function(cardObj, skillObj, currentZone, gameState) {
    // Only allow activation if the card is in the void zone
    return currentZone === "void" && gameState.playerFallen.includes(cardObj);
  }
},

heal: { name: 'Heal', icon: 'Icons/Skill/Heal.png',
  description: 'Heals an ally.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    const playerField = [...gameState.playerCreatures, ...gameState.playerTerrains];
    startSkillTarget(
      playerField,
      selectedTargets => {
        const targets = Array.isArray(selectedTargets) ? selectedTargets : [selectedTargets];
        const healAmount = (typeof step.amount === "number") ? step.amount : 0;
        targets.forEach(target => {
          if (healAmount > 0) healTarget(target, healAmount);
        });
        if (typeof nextEffect === "function") nextEffect();
        renderGameState();
      },
      step.target
    );
  }
},
  cleanse: {
    icon: 'Icons/Skill/Cleanse.png',
    name: 'Cleanse',
    description: 'Removes debuffs/status effects from an allied target.',
    handler: function(sourceCardObj, skillObj) {
      startSkillTarget(
        [...gameState.allyCreatures, ...gameState.allyTerrains],
        selectedTarget => {
          cleanseTarget(selectedTarget);
          renderGameState();
        }
      );
    }
  },
armor: { name: 'Armor', icon: 'Icons/Skill/Armor.png',
  description: 'Grants armor to an ally.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    const playerField = [...gameState.playerCreatures, ...gameState.playerTerrains];
    startSkillTarget(
      playerField,
      selectedTargets => {
        const targets = Array.isArray(selectedTargets) ? selectedTargets : [selectedTargets];
        const armorAmount = (typeof step.amount === "number") ? step.amount : 0;
        targets.forEach(target => {
          if (armorAmount > 0) grantArmor(target, armorAmount);
        });
        if (typeof nextEffect === "function") nextEffect();
        renderGameState();
      },
      step.target
    );
  }
},
  aegis: { icon: 'Icons/Skill/Aegis.png', name: 'Aegis',
    description: 'Grants a badge that blocks the next incoming damage.',
    handler: function(sourceCardObj, skillObj) {
      startSkillTarget(
        [...gameState.allyCreatures, ...gameState.allyTerrains],
        selectedTarget => {
          grantAegis(selectedTarget);
          renderGameState();
        }
      );
    }
  },
  recall: { name: 'Recall', icon: 'Icons/Skill/Recall.png',
    description: 'Return an ally from the fallen zone to your hand.',
    handler: function(sourceCardObj, skillObj) {
      const isVoid = gameState.playerFallen.includes(sourceCardObj);
      if (!isVoid) {
        showToast("Recall can only be activated from the void.");
        return;
      }
      moveCard(sourceCardObj.instanceId, gameState.playerFallen, gameState.playerHand);
      renderGameState();
    }
  },
destroy: { icon: 'Icons/Skill/Destroy.png', name: 'Destroy',
  description: 'Send a card from the field to the fallen zone.',
  handler: function(sourceCardObj, skillObj, step = {}) {
    // Collect all field zones (both sides)
    const fieldArrays = [
      gameState.playerCreatures,
      gameState.enemyCreatures,
      gameState.playerTerrains,
      gameState.enemyTerrains
    ];
    const allTargets = fieldArrays.flat();
    let validTargets = getValidTargetsByCondition(allTargets, skillObj.condition || []);

    const filterStep = (step && Object.keys(step).length) ? step : skillObj;
    validTargets = filterCardInstancesByTarget(validTargets, filterStep);

    if (validTargets.length === 0) {
      showToast("No valid targets to destroy");
      return;
    }

    startSkillTarget(validTargets, selectedTarget => {
      // Determine correct void array based on owner
      const isPlayerCard =
        gameState.playerCreatures.includes(selectedTarget) ||
        gameState.playerTerrains.includes(selectedTarget);
      const voidArr = isPlayerCard ? gameState.playerFallen : gameState.enemyFallen;

      // Move from its current zone to the appropriate void
      moveCard(selectedTarget.instanceId, getZoneArrayForCard(selectedTarget), voidArr);
      renderGameState();
    });
  }
},
add: { icon: 'Icons/Skill/Add.png', name: 'Search',
  description: 'Add a designated ally from your deck.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    const deckArr = gameState.playerDeck || [];
    const matches = filterCardInstancesByTarget(deckArr, step);

    if (matches.length === 0) {
      showToast("No matching cards found in your deck.");
      if (nextEffect) nextEffect();
      return;
    }

    showFilteredCardSelectionModal(matches, selectedCardObj => {
      moveCard(selectedCardObj.instanceId, gameState.playerDeck, gameState.playerHand);
      gameState.playerDeck = shuffle(gameState.playerDeck);
      closeAllModals();
      renderGameState();
      showToast(`${dummyCards.find(c => c.id === selectedCardObj.cardId)?.name || "Card"} added to your hand!`);
      if (nextEffect) nextEffect();
    }, { title: "Search Deck - Choose a card" });
  }
},
  // --- Moves another player card from void to field ---
  revive: {
    icon: 'Icons/Skill/Revive.png',
    name: 'Revive',
    description: 'Revive an ally from your fallen zone.',
    handler: function(sourceCardObj, skillObj) {
      const res = skillObj.resolution || {};
      const filterKeys = Object.keys(res).filter(k => !['zone', 'type', 'effect'].includes(k));
      const matches = gameState.playerFallen.filter(cardObj => {
        const cardData = dummyCards.find(c => c.id === cardObj.cardId);
        if (!cardData) return false;
        return filterKeys.every(key => {
          if (typeof cardData[key] === 'string')
            return cardData[key].toLowerCase() === res[key].toLowerCase();
          if (Array.isArray(cardData[key]))
            return cardData[key].map(v => v.toLowerCase()).includes(res[key].toLowerCase());
          return cardData[key] === res[key];
        });
      });
      if (matches.length === 0) {
        showToast("No valid targets found in your void.");
        return;
      }
      showFilteredCardSelectionModal(matches, selectedCardObj => {
        // Determine target zone (creature or terrain)
        const cardData = dummyCards.find(c => c.id === selectedCardObj.cardId);
        let targetArr;
        const category = Array.isArray(cardData.category)
          ? cardData.category.map(c => c.toLowerCase())
          : [String(cardData.category).toLowerCase()];
        if (category.includes("creature")) {
          targetArr = gameState.playerCreatures;
        } else if (category.includes("terrain")) {
          targetArr = gameState.playerTerrains;
        } else {
          showToast("Revive can only be used for creatures or terrains.");
          return;
        }
      }, { title: "Revive from Void - Choose a card" });
    }
  },
bounce: { icon: 'Icons/Skill/Bounce.png', name: 'Bounce',
  description: 'Return any card from the field to the hand.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    // All creatures/terrains on both sides
    const fieldArrs = [
      gameState.playerCreatures, gameState.playerTerrains,
      gameState.enemyCreatures, gameState.enemyTerrains
    ];
    const allField = fieldArrs.flat();

    // Filtering logic (optional, supports extra step fields like archetype/type/color)
    const filterKeys = Object.keys(step).filter(k => !['zone', 'type', 'effect'].includes(k));
    const matches = allField.filter(cardObj => {
      const cardData = dummyCards.find(c => c.id === cardObj.cardId);
      if (!cardData) return false;
      return filterKeys.every(key => {
        if (typeof cardData[key] === 'string')
          return cardData[key].toLowerCase() === String(step[key]).toLowerCase();
        if (Array.isArray(cardData[key]))
          return cardData[key].map(v => v.toLowerCase()).includes(String(step[key]).toLowerCase());
        return cardData[key] === step[key];
      });
    });

    if (matches.length === 0) {
      showToast("No matching cards found on the field.");
      if (nextEffect) nextEffect();
      return;
    }

    // Let the player pick a card directly on the field (no modal)
    startSkillTarget(matches, selectedCards => {
      const selectedCardObj = selectedCards[0];
      // Find the array this card is currently in
      const fromArr = fieldArrs.find(arr => arr.includes(selectedCardObj));
      // Determine owner for correct hand
      const owner = selectedCardObj.owner || getCardOwner(selectedCardObj);
      const handArr = owner === "enemy" ? gameState.enemyHand : gameState.playerHand;
      moveCard(selectedCardObj.instanceId, fromArr, handArr);
      renderGameState();
      if (nextEffect) nextEffect();
    }, { title: "Bounce - Choose a card", count: 1 });
  }
},

  // --- Moves another enemy card from field to deck ---
banish: { icon: 'Icons/Skill/Banish.png', name: 'Banish',
  description: 'Send an enemy from the field to the void.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    // All creatures/terrains on both sides
    const fieldArrs = [
      gameState.playerCreatures, gameState.playerTerrains,
      gameState.enemyCreatures, gameState.enemyTerrains
    ];
    const allField = fieldArrs.flat();

    // Filtering logic (supports extra step fields)
    const filterKeys = Object.keys(step).filter(k => !['zone', 'type', 'effect'].includes(k));
    const matches = allField.filter(cardObj => {
      const cardData = dummyCards.find(c => c.id === cardObj.cardId);
      if (!cardData) return false;
      return filterKeys.every(key => {
        if (typeof cardData[key] === 'string')
          return cardData[key].toLowerCase() === String(step[key]).toLowerCase();
        if (Array.isArray(cardData[key]))
          return cardData[key].map(v => v.toLowerCase()).includes(String(step[key]).toLowerCase());
        return cardData[key] === step[key];
      });
    });

    if (matches.length === 0) {
      showToast("No matching cards found on the field.");
      if (nextEffect) nextEffect();
      return;
    }

    // Let the player pick a card directly on the field
    startSkillTarget(matches, selectedCards => {
      const selectedCardObj = selectedCards[0];
      // Find which array this card is in
      const fromArr = fieldArrs.find(arr => arr.includes(selectedCardObj));
      // Determine owner for correct deck
      const owner = selectedCardObj.owner || getCardOwner(selectedCardObj);
      const deckArr = owner === "enemy" ? gameState.enemyDeck : gameState.playerDeck;
      moveCard(selectedCardObj.instanceId, fromArr, deckArr);
      // Shuffle that owner's deck
      if (owner === "enemy") {
        gameState.enemyDeck = shuffle(gameState.enemyDeck);
      } else {
        gameState.playerDeck = shuffle(gameState.playerDeck);
      }
      renderGameState();
      if (nextEffect) nextEffect();
    }, { title: "Banish - Choose a card", count: 1 });
  }
},
  intimidate: {
    icon: 'Icons/Ability/Intimidate.png', name: 'Intimidate', zone: 'playerField',  description: 'When attacking an enemy creature, disable it.',
    handler: function(attacker, defender, next) {
      // Only trigger Intimidate if defender is in ATK (vertical)
      if (defender.orientation === "vertical") {
        const skillObj = {
          name: "Intimidate",
          activation: {},
          resolution: {
            effect: "Intimidate"
          }
        };
        activateSkill(attacker, skillObj, {
          target: defender,
          onComplete: () => changeCardPosition(defender, "horizontal", next)
        });
      } else {
        // Already in DEF, skip effect
        next && next();
      }
    }
  },
seal: { icon: "Icons/Skill/Seal.png", name: "Seal", description: "Cannot activate skills.",
  handler: function(sourceCardObj, skillObj, effectStep, nextEffect) {
    // Assume effectStep.target is the target cardObj or its instanceId
    let target = effectStep.target;
    if (typeof target === "string") {
      target = findCardByInstanceId(target);
    }
    if (!target) {
      showToast && showToast("No valid target for Seal effect.");
      nextEffect && nextEffect();
      return;
    }
    applyStatus(target, "Seal");
    renderGameState();
    nextEffect && nextEffect();
  }
},
inspire: { name: 'Inspire',
  description: 'Apply modifier or grant an ability to a target.',
  handler: function(sourceCardObj, skillObj, step = {}, nextEffect) {
      let target = null;
      if (sourceCardObj && sourceCardObj._lastEquippedTarget) {
        target = sourceCardObj._lastEquippedTarget;
      }
      if (!target && step.target) {
        const targets = getTargets(step.target, sourceCardObj);
        target = Array.isArray(targets) && targets.length ? targets[0] : null;
      }
      if (!target) target = sourceCardObj;

      target.modifiers = target.modifiers || [];
      if (typeof step.atk === 'number' && step.atk !== 0) {
        target.modifiers.push({ effect: 'Inspire', stat: 'atk', value: Number(step.atk), source: sourceCardObj.instanceId });
      }

      // Grant ability strings into grantedAbilities
      if (step.ability) {
        target.grantedAbilities = target.grantedAbilities || [];
        const abilities = Array.isArray(step.ability) ? step.ability : [step.ability];
        abilities.forEach(ab => {
          if (!target.grantedAbilities.some(x => JSON.stringify(x) === JSON.stringify(ab))) {
            target.grantedAbilities.push(ab);
          }
        });
      }
      // Clean the temporary marker so later unrelated effects don't reuse it
      if (sourceCardObj && sourceCardObj._lastEquippedTarget) delete sourceCardObj._lastEquippedTarget;
      renderGameState && renderGameState();
      if (typeof nextEffect === 'function') nextEffect();
  }
},
essence: { icon: 'Icons/Skill/Essence.png', name: 'Essence', description: 'Gain essence of the designated color.',
  // step should have: { color: "{g}{g}{r}" } or similar
  handler: function(cardObj, skillObj, effectStep, nextEffect) {
    let colorStr = effectStep.color || effectStep.colors || effectStep.essence || "";
    if (!colorStr) {
      showToast && showToast("No Essence string provided.");
      nextEffect && nextEffect();
      return;
    }
    // Match all {x} or {X}
    const matches = colorStr.match(/\{([^}]+)\}/g);
    if (!matches) {
      showToast && showToast("No valid Essence found in string.");
      nextEffect && nextEffect();
      return;
    }

    matches.forEach(m => {
      const token = m.replace(/[{}]/g, '').trim().toLowerCase();

      const colored = token.match(/^([gruypcbw])(\d+)?$/i);
      if (colored) {
        const typeMap = {
          g: "G", r: "R", u: "U", y: "Y",
          p: "P", c: "C", b: "B", w: "W"
        };
        const code = typeMap[colored[1].toLowerCase()];
        const amount = colored[2] ? Number(colored[2]) : 1;
        addEssence(cardObj, code, amount);
        return;
      }

      const generic = token.match(/^x(\d+)$/i);
      if (generic) {
        addEssence(cardObj, "colorless", Number(generic[1]));
        return;
      }

      if (/^\d+$/.test(token)) {
        addEssence(cardObj, "colorless", Number(token));
      }
    });
    renderGameState && renderGameState();
    nextEffect && nextEffect();
  }
},

};
// ==========================
// === DOM REFERENCES ===
// ==========================
const phasePlayerSpan    = document.getElementById('phase-player');
const phaseNameSpan      = document.getElementById('phase-name');
const nextPhaseBtn       = document.getElementById('next-phase-btn');
const battlefield        = document.getElementById('battlefield');
const phaseBadge         = document.getElementById('phase-badge');

// ==========================
// === RENDERING / UI ===
// ==========================
// BATTLEFIELD BACKGROUNDS
function setBattlefieldBackgrounds(playerBannerUrl, enemyBannerUrl) {
  const playerBg = document.getElementById('battlefield-player-bg');
  const enemyBg = document.getElementById('battlefield-enemy-bg');
  if (playerBg && playerBannerUrl) {
    playerBg.style.backgroundImage = `url('${playerBannerUrl}')`;
    playerBg.style.backgroundSize = "cover";
    playerBg.style.backgroundPosition = "center";
    playerBg.style.backgroundRepeat = "no-repeat";
  }
  if (enemyBg && enemyBannerUrl) {
    enemyBg.style.backgroundImage = `url('${enemyBannerUrl}')`;
    enemyBg.style.backgroundSize = "cover";
    enemyBg.style.backgroundPosition = "center";
    enemyBg.style.backgroundRepeat = "no-repeat";
  }
}

function createDeck(deckInput) {
  const normalizedDeck =
    deckInput?.deckObj && typeof deckInput.deckObj === "object"
      ? deckInput.deckObj
      : (deckInput && typeof deckInput === "object" ? deckInput : {});

  const arr = buildDeck(normalizedDeck);
  shuffleInPlace(arr);
  return arr;
}

// Unified game start function for all modes (solo/cpu, casual, private, etc)
function startGame({
  mode = "solo",              // "solo", "casual", "private", etc
  playerDeck,                 // deckObj for player
  enemyDeck,               // deckObj for enemy/CPU
  playerProfile,              // {username, avatar, banner}
  enemyProfile,            // {username, avatar, banner}
  isCpuGame = false,          // true for CPU
  matchData = null            // full matchData for casual/private modes
}) {

gameState.playerDeck = createDeck(playerDeck);
if (Array.isArray(enemyDeck) && enemyDeck.length && enemyDeck[0].cardId) {
  gameState.enemyDeck = shuffleInPlace([...enemyDeck]);
} else {
  gameState.enemyDeck = createDeck(enemyDeck);
}
  gameState.playerHand = [];
  gameState.playerCreatures = [];
  gameState.playerTerrains = [];
  gameState.playerFallen = [];
  gameState.playerArtifacts = [];
  gameState.playerSpells = [];
  gameState.playerFallen = [];
  
  gameState.enemyHand = [];
  gameState.enemyCreatures = [];
  gameState.enemyTerrains = [];
  gameState.enemyFallen = [];
  gameState.enemyArtifacts = [];
  gameState.enemySpells = [];
  gameState.enemyFallen = [];
  
  gameState.phase = "start";
  
  gameState.playerDomain = null;
  gameState.enemyDomain = null;
  // --- Battlefield backgrounds ---
  setBattlefieldBackgrounds(
    playerDeck?.bannerArt || "Images/Banner/Default.png",
    enemyDeck?.bannerArt || "Images/Banner/Default.png"
  );

  // --- UI ---
  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');
  document.getElementById('my-profile').style.display = '';
  document.getElementById('enemy-profile').style.display = '';
  
  // --- Profile panels ---
  // Player profile
  const myProfileDiv = document.getElementById('my-profile');
  myProfileDiv.innerHTML = "";
  const realProfile = {
    username: window.playerUsername || "You",
    avatar: window.playerProfilePic || "Images/Avatar/Default.png",
    banner: window.playerProfileBanner || "Images/Banner/Default.png",
    power: typeof calculatePlayerPower === "function" ? calculatePlayerPower() : 0
  };
  // Use real profile in solo/CPU mode, but not for casual/private modes (where playerProfile is correct)
  if (isCpuGame || mode === "solo") {
    playerProfile = realProfile;
  }
  myProfileDiv.appendChild(renderProfilePanel(playerProfile));

  // enemy profile
  const enemyProfileDiv = document.getElementById('enemy-profile');
  enemyProfileDiv.innerHTML = "";
  enemyProfileDiv.appendChild(renderProfilePanel(enemyProfile));

  // --- Battlefield zones ---
  renderGameState();
  setupDropZones();
  updatePhase();

  // --- Game Start Animation, Coin Flip, Terrain selection ---
  showGameStartAnimation(() => {
    showCoinFlipModal(function(whoStarts) {
      gameState.turn = whoStarts;
      gameState.phase = "start";
      initiateDomainSelection(gameState.playerDeck, () => {
        drawOpeningHands();
        renderGameState();
        setupDropZones();
      });
    });
  });

  // --- Multiplayer mode hooks (add if needed) ---
  if (mode === "casual" && matchData) {
    // e.g. assign gameState.playerProfile/enemyProfile for sync
    gameState.playerProfile = playerProfile;
    gameState.enemyProfile = enemyProfile;
  }

  // Additional mode logic can go here (private, ranked, etc)
}

// ===================================
// === GAME SETUP HELPER FUNCTIONS ===
// ===================================
function drawOpeningHands() {
  drawCards("player", INITIAL_HAND_SIZE);
  drawCards("enemy", INITIAL_HAND_SIZE);
}
function getZoneArray(zoneId) {
  for (const zoneName in ZONE_MAP) {
    if (ZONE_MAP[zoneName].id === zoneId) return ZONE_MAP[zoneName].arr();
  }
  return null;
}

function getFieldSlots(owner, lane) {
  if (owner === "player" && lane === "creature") return gameState.playerCreatureSlots;
  if (owner === "player" && lane === "support") return gameState.playerSupportSlots;
  if (owner === "enemy" && lane === "creature") return gameState.enemyCreatureSlots;
  if (owner === "enemy" && lane === "support") return gameState.enemySupportSlots;
  return [];
}

function getAllFieldCards(owner = null) {
  const p = [...gameState.playerCreatureSlots, ...gameState.playerSupportSlots].filter(Boolean);
  const e = [...gameState.enemyCreatureSlots, ...gameState.enemySupportSlots].filter(Boolean);
  if (owner === "player") return p;
  if (owner === "enemy") return e;
  return [...p, ...e];
}
function getCardLane(cardObj) {
  const def = dummyCards.find(c => c.id === cardObj.cardId);
  if (!def) return null;
  const cat = (def.category || "").toLowerCase();
  return cat === "creature" ? "creature" : "support"; // terrain/artifact/spell -> support
}

function findCardSlot(cardObj) {
  const lanes = [
    ["player", "creature"], ["player", "support"],
    ["enemy", "creature"], ["enemy", "support"]
  ];
  for (const [owner, lane] of lanes) {
    const arr = getFieldSlots(owner, lane);
    const idx = arr.findIndex(c => c && c.instanceId === cardObj.instanceId);
    if (idx !== -1) return { owner, lane, index: idx };
  }
  return null;
}

function getZoneArrayForCard(cardObj) {
  if (!cardObj || !cardObj.instanceId) return null;
  const id = cardObj.instanceId;

  // --- Hands / Decks / Fallen ---
  if (Array.isArray(gameState.playerHand) && gameState.playerHand.some(c => c?.instanceId === id)) return gameState.playerHand;
  if (Array.isArray(gameState.enemyHand) && gameState.enemyHand.some(c => c?.instanceId === id)) return gameState.enemyHand;

  if (Array.isArray(gameState.playerDeck) && gameState.playerDeck.some(c => c?.instanceId === id)) return gameState.playerDeck;
  if (Array.isArray(gameState.enemyDeck) && gameState.enemyDeck.some(c => c?.instanceId === id)) return gameState.enemyDeck;

  if (Array.isArray(gameState.playerFallen) && gameState.playerFallen.some(c => c?.instanceId === id)) return gameState.playerFallen;
  if (Array.isArray(gameState.enemyFallen) && gameState.enemyFallen.some(c => c?.instanceId === id)) return gameState.enemyFallen;

  // --- Slot-based battlefield (NEW canonical field storage) ---
  if (Array.isArray(gameState.playerCreatureSlots) && gameState.playerCreatureSlots.some(c => c && c.instanceId === id)) return gameState.playerCreatureSlots;
  if (Array.isArray(gameState.playerSupportSlots) && gameState.playerSupportSlots.some(c => c && c.instanceId === id)) return gameState.playerSupportSlots;

  if (Array.isArray(gameState.enemyCreatureSlots) && gameState.enemyCreatureSlots.some(c => c && c.instanceId === id)) return gameState.enemyCreatureSlots;
  if (Array.isArray(gameState.enemySupportSlots) && gameState.enemySupportSlots.some(c => c && c.instanceId === id)) return gameState.enemySupportSlots;

  // --- Legacy fallback (optional while migrating old code) ---
  if (Array.isArray(gameState.playerCreatures) && gameState.playerCreatures.some(c => c?.instanceId === id)) return gameState.playerCreatures;
  if (Array.isArray(gameState.playerTerrains) && gameState.playerTerrains.some(c => c?.instanceId === id)) return gameState.playerTerrains;
  if (Array.isArray(gameState.playerArtifacts) && gameState.playerArtifacts.some(c => c?.instanceId === id)) return gameState.playerArtifacts;
  if (Array.isArray(gameState.playerSpells) && gameState.playerSpells.some(c => c?.instanceId === id)) return gameState.playerSpells;

  if (Array.isArray(gameState.enemyCreatures) && gameState.enemyCreatures.some(c => c?.instanceId === id)) return gameState.enemyCreatures;
  if (Array.isArray(gameState.enemyTerrains) && gameState.enemyTerrains.some(c => c?.instanceId === id)) return gameState.enemyTerrains;
  if (Array.isArray(gameState.enemyArtifacts) && gameState.enemyArtifacts.some(c => c?.instanceId === id)) return gameState.enemyArtifacts;
  if (Array.isArray(gameState.enemySpells) && gameState.enemySpells.some(c => c?.instanceId === id)) return gameState.enemySpells;

  return null;
}
// Helper to get zone name for an array reference
function getZoneNameForArray(arr) {
  for (const zoneName in ZONE_MAP) {
    if (ZONE_MAP[zoneName].arr() === arr) return zoneName;
  }
  return '';
}
// Helper: find zoneId for a cardObj
function findZoneIdForCard(cardObj) {
  if (!cardObj) return null;
  const id = cardObj.instanceId;

  // Hand / deck / void / fallen first
  if (gameState.playerHand.some(c => c.instanceId === id)) return "player-hand";
  if (gameState.enemyHand.some(c => c.instanceId === id)) return "enemy-hand";
  if (gameState.playerDeck.some(c => c.instanceId === id)) return "player-deck-zone";
  if (gameState.enemyDeck.some(c => c.instanceId === id)) return "enemy-deck-zone";
  if (gameState.playerFallen.some(c => c.instanceId === id)) return "player-void-zone";
  if (gameState.enemyFallen.some(c => c.instanceId === id)) return "enemy-void-zone";
  if (gameState.playerFallen.some(c => c.instanceId === id)) return "player-fallen";
  if (gameState.enemyFallen.some(c => c.instanceId === id)) return "enemy-fallen";

  // Slot-based battlefield
  const pC = gameState.playerCreatureSlots.findIndex(c => c && c.instanceId === id);
  if (pC !== -1) return `player-creature-slot-${pC}`;

  const pS = gameState.playerSupportSlots.findIndex(c => c && c.instanceId === id);
  if (pS !== -1) return `player-support-slot-${pS}`;

  const eC = gameState.enemyCreatureSlots.findIndex(c => c && c.instanceId === id);
  if (eC !== -1) return `enemy-creature-slot-${eC}`;

  const eS = gameState.enemySupportSlots.findIndex(c => c && c.instanceId === id);
  if (eS !== -1) return `enemy-support-slot-${eS}`;

  return null;
}
function findCardFieldArray(cardObj) {
  for (const zoneName in ZONE_MAP) {
    if (
      zoneName.endsWith("Creatures") ||
      zoneName.endsWith("Terrains")
    ) {
      if (ZONE_MAP[zoneName].arr().includes(cardObj)) return ZONE_MAP[zoneName].arr();
    }
  }
  return null;
}
function getZoneInfoForCard(cardObj) {
  for (const zoneName in ZONE_MAP) {
    const arr = ZONE_MAP[zoneName].arr();
    if (arr.includes(cardObj)) {
      return {
        zoneName,
        zoneArr: arr,
        zoneId: ZONE_MAP[zoneName].id
      };
    }
  }
  return null;
}
// Helper to get zone name for cardObj
function getZoneNameForCard(cardObj) {
  for (const zoneName in ZONE_MAP) {
    if (ZONE_MAP[zoneName].arr().includes(cardObj)) return zoneName;
  }
  return '';
}
// Helper to extract filter object from requirement
function getRequirementFilter(requirement) {
  const filter = {};
  if (!requirement) return filter;
  for (const key of ['type', 'archetype', 'color', 'category']) {
    if (requirement[key]) filter[key] = requirement[key];
  }
  return filter;
}
// --- Utility: Determine card owner as "player" or "enemy" ---
function getCardOwner(cardObj) {
  if (!cardObj || !cardObj.instanceId) return null;
  const id = cardObj.instanceId;

  // Explicit owner wins
  if (cardObj.owner === "player" || cardObj.owner === "enemy") return cardObj.owner;

  // Player zones
  if (gameState.playerHand.some(c => c.instanceId === id)) return "player";
  if (gameState.playerDeck.some(c => c.instanceId === id)) return "player";
  if (gameState.playerFallen.some(c => c.instanceId === id)) return "player";
  if (gameState.playerFallen.some(c => c.instanceId === id)) return "player";
  if (gameState.playerCreatureSlots.some(c => c && c.instanceId === id)) return "player";
  if (gameState.playerSupportSlots.some(c => c && c.instanceId === id)) return "player";

  // Enemy zones
  if (gameState.enemyHand.some(c => c.instanceId === id)) return "enemy";
  if (gameState.enemyDeck.some(c => c.instanceId === id)) return "enemy";
  if (gameState.enemyFallen.some(c => c.instanceId === id)) return "enemy";
  if (gameState.enemyFallen.some(c => c.instanceId === id)) return "enemy";
  if (gameState.enemyCreatureSlots.some(c => c && c.instanceId === id)) return "enemy";
  if (gameState.enemySupportSlots.some(c => c && c.instanceId === id)) return "enemy";

  return null;
}
function isTargetStillPresent(targetObj) {
  if (!targetObj || !targetObj.instanceId) return false;
  const id = targetObj.instanceId;

  return (
    gameState.playerHand.some(c => c.instanceId === id) ||
    gameState.enemyHand.some(c => c.instanceId === id) ||
    gameState.playerDeck.some(c => c.instanceId === id) ||
    gameState.enemyDeck.some(c => c.instanceId === id) ||
    gameState.playerFallen.some(c => c.instanceId === id) ||
    gameState.enemyFallen.some(c => c.instanceId === id) ||
    gameState.playerFallen.some(c => c.instanceId === id) ||
    gameState.enemyFallen.some(c => c.instanceId === id) ||
    gameState.playerCreatureSlots.some(c => c && c.instanceId === id) ||
    gameState.playerSupportSlots.some(c => c && c.instanceId === id) ||
    gameState.enemyCreatureSlots.some(c => c && c.instanceId === id) ||
    gameState.enemySupportSlots.some(c => c && c.instanceId === id)
  );
}
// --- TURN FLAGS --- //
function resetTurnFlags(turn) {
  if (turn === "player") {
    const arrs = [...gameState.playerCreatures, ...gameState.playerTerrains];
    arrs.forEach(card => {
      // Clear previous per-turn flags
      card.hasChangedPositionThisTurn = false;
      card.hasSummonedThisTurn = false;
    });
  } else if (turn === "enemy") {
    const arrs = [...gameState.enemyCreatures, ...gameState.enemyTerrains];
    arrs.forEach(card => {
      card.hasChangedPositionThisTurn = false;
      card.hasSummonedThisTurn = false;
    });
  }
}
function resetTurnResources(turn) {
  const terrains = turn === "player" ? gameState.playerTerrains : gameState.enemyTerrains;
  terrains.forEach(terrain => generateEssence(terrain));
}
function matchesFilter(cardObj, filter) {
  for (let key in filter) {
    if (!fieldIncludes(cardObj, key, filter[key])) return false;
  }
  return true;
}

// small helper used above
function capitalize(s) {
  return String(s || '').charAt(0).toUpperCase() + String(s || '').slice(1);
}

// ===================================
// ========== ACTIONS LOGIC ==========
// ===================================
// --- MOVE OBJECT --- //
function getTargets(target, sourceCardObj, context = {}) {
  if (!target) return [];

  // Frequently used slot collections
  const playerCreatures = gameState.playerCreatureSlots.filter(Boolean);
  const enemyCreatures = gameState.enemyCreatureSlots.filter(Boolean);
  const playerSupports  = gameState.playerSupportSlots.filter(Boolean);
  const enemySupports   = gameState.enemySupportSlots.filter(Boolean);

  const allCreature = [...playerCreatures, ...enemyCreatures];
  const allSupports  = [...playerSupports, ...enemySupports];
  const playerField  = [...playerCreatures, ...playerSupports];
  const enemyField   = [...enemyCreatures, ...enemySupports];
  const allField     = [...playerField, ...enemyField];

  const map = {
    // battlefield by lane
    playerCreatures,
    enemyCreatures,
    allCreature,

    playerSupports,
    enemySupports,
    allSupports,

    playerField,
    enemyField,
    allField,

    // non-field zones
    playerHand: gameState.playerHand,
    enemyHand: gameState.enemyHand,
    allHand: [...gameState.playerHand, ...gameState.enemyHand],

    playerDeck: gameState.playerDeck,
    enemyDeck: gameState.enemyDeck,
    allDecks: [...gameState.playerDeck, ...gameState.enemyDeck],

    playerFallen: gameState.playerFallen,
    enemyFallen: gameState.enemyFallen,
    allVoids: [...gameState.playerFallen, ...gameState.enemyFallen],

    playerFallen: gameState.playerFallen,
    enemyFallen: gameState.enemyFallen,
    allFallens: [...gameState.playerFallen, ...gameState.enemyFallen],

    allCards: [
      ...allField,
      ...gameState.playerHand, ...gameState.enemyHand,
      ...gameState.playerDeck, ...gameState.enemyDeck,
      ...gameState.playerFallen, ...gameState.enemyFallen,
      ...gameState.playerFallen, ...gameState.enemyFallen
    ],

    self: sourceCardObj ? [sourceCardObj] : [],
    source: sourceCardObj ? [sourceCardObj] : [],
    attacker: context.attacker ? [context.attacker] : [],
    defender: context.defender ? [context.defender] : [],
  };

  // string target key
  if (typeof target === "string") {
    return map[target] ? [...map[target]] : [];
  }

  // array of target keys => merge unique
  if (Array.isArray(target)) {
    const merged = target.flatMap(t => (typeof t === "string" && map[t]) ? map[t] : []);
    const seen = new Set();
    return merged.filter(c => {
      if (!c || !c.instanceId || seen.has(c.instanceId)) return false;
      seen.add(c.instanceId);
      return true;
    });
  }

  // object target style (if your effects pass { zone: "...", owner: "...", lane: "..." })
  if (typeof target === "object") {
    const zone = target.zone || target.key || "";
    if (zone && map[zone]) return [...map[zone]];

    // owner/lane fallback
    if (target.owner && target.lane) {
      if (target.owner === "player" && target.lane === "creature") return [...playerCreatures];
      if (target.owner === "enemy" && target.lane === "creature") return [...enemyCreatures];
      if (target.owner === "player" && target.lane === "support") return [...playerSupports];
      if (target.owner === "enemy" && target.lane === "support") return [...enemySupports];
    }
  }

  return [];
}
function moveCard(instanceId, fromArr, toArr, extra = {}, callback) {
  const fromIdx = fromArr.findIndex(c => c.instanceId === instanceId);
  if (fromIdx === -1) return callback && callback();

  const cardObj = fromArr[fromIdx];

  // detect if destination is player/enemy field by explicit extra
  const owner = extra.owner || "player";
  const toField = extra.toField === true; // pass this when playing/summoning to board

  const finalize = () => {
    renderGameState();
    if (callback) callback();
  };

  if (toField) {
    const lane = getLaneForCard(cardObj); // creature or support
    const slots = getFieldSlots(owner, lane);
    const hasFree = slots.some(s => !s);

    if (!hasFree) {
      logSystem(`No free ${lane} slots.`);
      return finalize();
    }

    showSlotPickerModal({
      owner,
      lane,
      onSelect: (slotIndex) => {
        // validate still free
        if (slots[slotIndex]) {
          logSystem("That slot is occupied.");
          return finalize();
        }

        // remove from source
        fromArr.splice(fromIdx, 1);

        // ensure card not duplicated
        removeCardFromAllFieldSlots(cardObj.instanceId);

        // place
        slots[slotIndex] = { ...cardObj, slotOwner: owner, slotLane: lane, slotIndex, ...extra };

        finalize();
      },
      onCancel: finalize
    });

    return;
  }

  // non-field move (default old behavior)
  fromArr.splice(fromIdx, 1);
  toArr.push({ ...cardObj, ...extra });
  finalize();
}

// CREATE CARD MENUS
function createCardMenu(buttons = []) {
  const menu = document.createElement('div');
  menu.className = 'card-menu';
  buttons.forEach(btnConf => {
    const btn = document.createElement('button');
    btn.type = "button";
    btn.className = 'btn-secondary';
    if (btnConf.html) btn.innerHTML = btnConf.text;
    else btn.innerText = btnConf.text;
    if (btnConf.title) btn.title = btnConf.title;
    if (btnConf.disabled) {
      btn.disabled = true;
      btn.classList.add("btn-disabled");
      btn.style.filter = "grayscale(1)";
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }
    btn.onclick = function(e) {
      if (btnConf.disabled) return;
      e.stopPropagation();
      btnConf.onClick.call(this, e);
      closeAllMenus(); // Always close after any button
    };
    menu.appendChild(btn);
  });
  menu.onclick = function(e) { e.stopPropagation(); };
  return menu;
}

function renderGameState() {
  // RENDER PLAYER HAND
  const playerHandDiv = document.getElementById('player-hand');
  playerHandDiv.innerHTML = '';

  for (const cardObj of gameState.playerHand) {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    if (!card) continue;

    const div = document.createElement('div');
    div.className = 'card-battlefield';
    div.draggable = true;

    div.ondragstart = (e) => {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", cardObj.instanceId); // drop reads this
      e.dataTransfer.setData("source", "playerHand");
      div.classList.add('dragging');
      if (typeof e.dataTransfer.setDragImage === "function") {
        e.dataTransfer.setDragImage(div, div.offsetWidth / 2, div.offsetHeight / 2);
      }
    };

    div.ondragend = () => {
      div.classList.remove('dragging');
    };

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.style.width = "80px";
    div.appendChild(img);

    if (typeof renderHandCostBadge === 'function') renderHandCostBadge(div, card);

    holdClickToView(div, cardObj, (e) => {
      e.stopPropagation();
      closeAllMenus();
      showHandCardMenu(cardObj.instanceId, div);
    });

    setCardAnimatableClass(div, cardObj, card, gameState, 'playerHand');
    playerHandDiv.appendChild(div);
  }

  // RENDER ENEMY HAND FACEDOWN
  const enemyHandDiv = document.getElementById('enemy-hand');
  enemyHandDiv.innerHTML = '';

  const enemyCardback = (window.selectedCpuDeck && window.selectedCpuDeck.cardbackArt)
    ? window.selectedCpuDeck.cardbackArt
    : "Images/Cardback/Default.png";

  for (let i = 0; i < gameState.enemyHand.length; i++) {
    const div = document.createElement('div');
    div.className = 'card-battlefield';
    const img = document.createElement('img');
    img.src = enemyCardback;
    img.alt = "enemy card";
    img.style.width = "80px";
    div.appendChild(img);
    enemyHandDiv.appendChild(div);
  }

  // RENDER FIELD SLOT ROWS
  renderSlotRow("enemy", "support");
  renderSlotRow("enemy", "creature");
  renderSlotRow("player", "creature");
  renderSlotRow("player", "support");

  renderRightbarZones();
  renderGameLog();
  setupDropZones();
}
function renderSlotRow(owner, lane) {
  const zoneId = `${owner}-${lane}-zone`;
  const zone = document.getElementById(zoneId);
  if (!zone) return;

  const slots = getFieldSlots(owner, lane);
  if (!Array.isArray(slots)) return;

  for (let i = 0; i < 5; i++) {
    const slotId = `${owner}-${lane}-slot-${i}`;
    const slotDiv = document.getElementById(slotId);
    if (!slotDiv) continue;

    // reset slot visual state
    slotDiv.innerHTML = "";
    slotDiv.classList.remove("occupied");
    slotDiv.dataset.owner = owner;
    slotDiv.dataset.lane = lane;
    slotDiv.dataset.slotIndex = String(i);

    const cardObj = slots[i];
    if (!cardObj) {
      // Optional test label
      // slotDiv.textContent = `${i + 1}`;
      continue;
    }

    slotDiv.classList.add("occupied");

    // Keep card metadata in sync
    cardObj.owner = owner;
    cardObj.slotLane = lane;
    cardObj.slotIndex = i;

    // IMPORTANT: use slotId (not row zoneId), so find/animate/menus can target exact slot
    const cardDiv = renderCardOnField(cardObj, slotId);
    if (cardDiv) slotDiv.appendChild(cardDiv);
  }
}
// --- RENDER CARD COST IN HAND --- //
function renderHandCostBadge(cardDiv, cardData) {
  try {
    if (!cardData || !cardData.cost) return;
    // parseCost already exists in this file
    const parsed = typeof parseCost === 'function' ? parseCost(cardData.cost) : null;
    if (!parsed || (Object.keys(parsed).length === 0 && !parsed.colorless)) {
      // handle single-symbol cost like "{g}" may still produce parsed object; bail if empty
      return;
    }

    // Ensure the cardDiv is positioned so absolute children are placed correctly
    const prevPos = cardDiv.style.position;
    if (!prevPos || prevPos === '') cardDiv.style.position = 'relative';

    const badge = document.createElement('div');
    badge.className = 'hand-cost-badge';
    // Inline styles to avoid requiring CSS edits; you can move to stylesheet later
    badge.style.position = 'absolute';
    badge.style.left = '0';
    badge.style.top = '0';
    badge.style.zIndex = 60;

    // but shrink icon sizes for the compact badge
    let html = '';
    if (typeof getEssenceCostDisplay === 'function') {
      html = getEssenceCostDisplay(parsed);
    } else {
      if (parsed.colorless) html = `<span>${parsed.colorless}</span>`;
    }
    badge.innerHTML = html;

    // Shrink any images produced by getEssenceCostDisplay to fit badge
    Array.from(badge.querySelectorAll('img')).forEach(img => {
      img.style.width = '14px';
      img.style.height = '14px';
      img.style.verticalAlign = 'middle';
    });

    cardDiv.appendChild(badge);
  } catch (err) {
    console.warn('renderHandCostBadge failed', err);
  }
}
function setCardAnimatableClass(div, cardObj, cardData, gameState, zone) {
  try {
    const isPlayerActionPhase =
      !!gameState &&
      gameState.turn === 'player' &&
      gameState.phase === 'action';

    let actionable = false;

    if (isPlayerActionPhase) {
      if (zone === 'playerHand') {
        // Hand: only animate if at least one hand-usable skill is actually activatable now (cost included)
        const def = cardData || dummyCards.find(c => c.id === cardObj.cardId);
        const skills = Array.isArray(def?.skill) ? def.skill : [];

        actionable = skills.some(skillObj => {
          // Only consider skills that are meant to be used from hand (Summon/Cast/Terraform/etc.)
          // We can just ask the engine; canActivateSkill will return false if zone not allowed or cost not payable.
          return canActivateSkill(cardObj, skillObj, 'playerHand', gameState);
        });
      } else {
        // Non-hand zones: keep existing logic
        actionable =
          (typeof isCardActionable === 'function') &&
          isCardActionable(cardObj, cardData, gameState, zone);
      }
    }

    if (actionable) div.classList.add('card-animatable');
    else div.classList.remove('card-animatable');
  } catch (err) {
    div.classList.remove('card-animatable');
    console.warn('setCardAnimatableClass failed:', err);
  }
}

// Fisher-Yates in-place shuffle for any array
function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleDeck(deckArr) {
  if (!Array.isArray(deckArr) || deckArr.length <= 1) return deckArr;
  shuffleInPlace(deckArr);
  return deckArr;
}

function drawCards(who, n) {
  let deck = who === "player" ? gameState.playerDeck : gameState.enemyDeck;
  let hand = who === "player" ? gameState.playerHand : gameState.enemyHand;
  for (let i = 0; i < n && deck.length > 0; i++) {
    const drawnCard = deck.shift();
    hand.push(drawnCard);
    triggerSelfSkill(drawnCard, "draw", { triggerCard: drawnCard });
  }
  renderGameState();
  setupDropZones();
  emitPublicState();
}

// HAND OPTIONS MENU
function showHandCardMenu(instanceId, cardDiv) {
  const cardObj = gameState.playerHand.find(c => c.instanceId === instanceId);
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  const parsed = parseCost(cardData.cost || "{0}");
  const pool = getEssencePool('player') || {};
  
  let playLabel = "Play";
  let costHtml = getEssenceCostDisplay(cardData.cost);

  if (cardData) {
    const category = cardData.category ? cardData.category.toLowerCase() : '';
    switch (category) {
      case 'creature': playLabel = "Summon"; break;
      case 'spell': playLabel = "Cast"; break;
      case 'terrain': playLabel = "Geomancy"; break;
      case 'artifact': playLabel = "Equip"; break;
      default: playLabel = "Play";
    }
  }
  // Define actions
  const buttons = [
    {
      text: "Send to Void",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerFallen);
        renderGameState();
        setupDropZones();
        closeAllMenus();
      }
    },
    {
      text: "Return to Deck",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerDeck);
        renderGameState();
        setupDropZones();
        closeAllMenus();
      }
    },
  ];
  // Skill buttons
  if (cardData.skill && Array.isArray(cardData.skill)) {
    cardData.skill
    .filter(skillObj => !skillObj.activation) // Only show skills without activation
    .forEach(skillObj => {
        // Compute sealed/enabled/title the same way showCardActionMenu does to avoid undefined vars
        const sealed = typeof isSealed === 'function' ? isSealed(cardObj) : (cardObj._sealed === true);
        const canAct = canActivateSkill(cardObj, skillObj, 'playerHand', gameState);
        const isEnabled = canAct && !sealed;
      
        let disabledReason = "";
        if (!isEnabled) {
          if (sealed) disabledReason = "Sealed: Cannot activate skills.";
          else disabledReason = "Cannot activate skill in current state.";
        }
      
      const activation = skillObj.activation || {};
      let requirements = Array.isArray(activation.requirement)
        ? activation.requirement
        : (activation.requirement ? [activation.requirement] : []);
      const reqIcons = getRequirementIcons(requirements);
      
      const titleText = escapeHtmlInline((disabledReason || skillTitle(skillObj) || skillObj.name || '').trim());

      buttons.push({
        text: `${skillObj.name} ${parseEffectText(skillObj.cost)}${reqIcons}`,
        html: true,
        title: titleText, 
        disabled: !isEnabled,
        onClick: function(e) {
          e.stopPropagation();
          if (!canActivateSkill(cardObj, skillObj, 'playerHand', gameState)) return;
          activateSkill(cardObj, skillObj, { currentZone: 'playerHand' });
          closeAllMenus();
        }
      });
    });
  }
  const menu = createCardMenu(buttons);

  // Position relative to cardDiv
  const rect = cardDiv.getBoundingClientRect();
  placeMenuWithinShell(menu, rect);

  // Prevent menu click from closing (in case outside handler runs)
  menu.onclick = function(e) { e.stopPropagation(); };

  // Hide menu when clicking elsewhere
  setTimeout(() => {
    document.body.addEventListener('click', function handler() {
      closeAllMenus();
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 10);
}
// DROP ZONES
function setupDropZones() {
  document.querySelectorAll(".field-slot").forEach(slot => {
    slot.ondragover = (e) => {
      e.preventDefault();
      slot.classList.add("drag-over");
    };
    slot.ondragleave = () => slot.classList.remove("drag-over");

    slot.ondrop = (e) => {
      e.preventDefault();
      slot.classList.remove("drag-over");

      const instanceId = e.dataTransfer.getData("text/plain");
      if (!instanceId) return;

      const handIdx = gameState.playerHand.findIndex(c => c.instanceId === instanceId);
      if (handIdx === -1) return; // testing: only from player hand

      const owner = slot.dataset.owner;
      const lane = slot.dataset.lane;
      const idx = Number(slot.dataset.slotIndex);

      if (owner !== "player") return; // testing guard

const cardObj = gameState.playerHand[handIdx];
const requiredLane = getCardLane(cardObj); // creature | support
if (lane !== requiredLane) {
  showToast && showToast(`This card must be played to a ${requiredLane} slot.`);
  return;
}

      const slots = lane === "creature" ? gameState.playerCreatureSlots : gameState.playerSupportSlots;
      if (slots[idx]) return; // occupied

      const [moved] = gameState.playerHand.splice(handIdx, 1);
      moved.owner = "player";
      moved.slotLane = lane;
      moved.slotIndex = idx;
      moved.orientation = moved.orientation || "vertical";
      slots[idx] = moved;

      renderGameState();
      setupDropZones(); // rebind after rerender
    };
  });
}
// RENDER ROW ZONES
function renderRowZone(zoneId, cardArray, category) {
  const zoneDiv = document.getElementById(zoneId);
  zoneDiv.innerHTML = '';
  // RENDER CARDS IN ZONES
  for (const cardObj of cardArray) {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    const cardEl = renderCardOnField(cardObj, zoneId);

    // Optionally set animatable class here if needed
    const cardDiv = cardEl.querySelector('.card-battlefield');
    if (cardDiv) {
      // Example: add animatable class if actionable
      setCardAnimatableClass(cardDiv, cardObj, cardData, gameState, zoneId);
      cardDiv.ondragover = (e) => {
        e.preventDefault();
        cardDiv.classList.add('drag-over-attach');
      };
      cardDiv.ondragleave = () => cardDiv.classList.remove('drag-over-attach');
      cardDiv.ondrop = (e) => {
        e.preventDefault();
        cardDiv.classList.remove('drag-over-attach');
        const instanceId = e.dataTransfer.getData('text/plain');
      };
    }
    zoneDiv.appendChild(cardEl);
  }
}
function renderRightbarZones() {
  const rightbar = document.getElementById('battlefield-rightbar');
  // Get all zone containers
  const enemyDeckDiv = document.getElementById('enemy-deck-zone');
  const enemyFallenDiv = document.getElementById('enemy-fallen-zone');
  const playerFallenDiv = document.getElementById('player-fallen-zone');
  const playerDeckDiv = document.getElementById('player-deck-zone');

  // Fill the zones with current cards
  enemyDeckDiv.innerHTML = '';
  appendDeckZone(enemyDeckDiv, gameState.enemyDeck, "enemy");

  enemyFallenDiv.innerHTML = '';
  appendFallenZone(enemyFallenDiv, gameState.enemyFallen, "enemy");

  playerFallenDiv.innerHTML = '';
  appendFallenZone(playerFallenDiv, gameState.playerFallen, "player");

  playerDeckDiv.innerHTML = '';
  appendDeckZone(playerDeckDiv, gameState.playerDeck, "player");

  // NEW: set hover title snippets (instead of row images/counters)
  countDeckFallen('enemy', gameState.enemyDeck.length, gameState.enemyFallen.length);
  countDeckFallen('player', gameState.playerDeck.length, gameState.playerFallen.length);

  // Append in desired order (without count rows)
  rightbar.appendChild(enemyDeckDiv);
  rightbar.appendChild(enemyFallenDiv);
  rightbar.appendChild(phaseBadge);
  rightbar.appendChild(playerFallenDiv);
  rightbar.appendChild(playerDeckDiv);
}
// Helper to create and append the deck zone card at the end
function appendDeckZone(parentDiv, deckArray, who) {
  const deckZone = document.createElement('div');
  deckZone.className = 'deck-zone';

  const deckCard = document.createElement('div');
  deckCard.className = 'card-deck';

  let deckCardback = "Images/Cardback/Default.png";
  if (who === "player" && window.selectedPlayerDeck && window.selectedPlayerDeck.deckObj && window.selectedPlayerDeck.deckObj.cardbackArt
  ) {
    deckCardback = window.selectedPlayerDeck.deckObj.cardbackArt;
  } else if (who === "enemy") {
    // Multiplayer/casual
    if (window.selectedenemyDeck && window.selectedenemyDeck.cardbackArt) {
      deckCardback = window.selectedenemyDeck.cardbackArt;
    }
    else if (gameState.enemyProfile && gameState.enemyProfile.cardbackArt) {
      deckCardback = gameState.enemyProfile.cardbackArt;
    }
    else if (gameState.enemyDeck && gameState.enemyDeck.cardbackArt) {
      deckCardback = gameState.enemyDeck.cardbackArt;
    }
    // Solo CPU
    else if (window.selectedCpuDeck && window.selectedCpuDeck.cardbackArt) {
      deckCardback = window.selectedCpuDeck.cardbackArt;
    }
  }
  const img = document.createElement('img');
  img.src = deckCardback;
  img.alt = (who === "player" ? "Your Deck" : "enemy's Deck");
  img.style.width = "100%";
  deckCard.appendChild(img);

  deckZone.appendChild(deckCard);

  if (who === "player") {
    deckCard.onclick = (e) => {
      e.stopPropagation();
      closeAllMenus();

      const buttons = [
        {
          text: "Draw",
          onClick: function(ev) {
            ev.stopPropagation();
            if (gameState.playerDeck.length > 0) {
              moveCard(gameState.playerDeck[0].instanceId, gameState.playerDeck, gameState.playerHand);
              renderGameState();
              setupDropZones();
            }
            closeAllMenus();
          }
        },
        {
          text: "Shuffle",
          onClick: function(ev) {
            ev.stopPropagation();
            gameState.playerDeck = shuffle(gameState.playerDeck);
            renderGameState();
            setupDropZones();
            closeAllMenus();
          }
        },
        {
          text: "Search",
          onClick: function(ev) {
            ev.stopPropagation();
            if (gameState.playerDeck.length > 0) {
              openDeckModal();
            }
            closeAllMenus();
          }
        }
      ];
      const menu = createCardMenu(buttons);
      const rect = deckCard.getBoundingClientRect();
      placeMenuWithinShell(menu, rect);

      menu.onclick = function(e) { e.stopPropagation(); };

      setTimeout(() => {
        document.body.addEventListener('click', function handler() {
          closeAllMenus();
          document.body.removeEventListener('click', handler);
        }, { once: true });
      }, 10);
    };
  }
  parentDiv.appendChild(deckZone);
}
// VOID ZONE
function appendFallenZone(parentDiv, voidArray, who) {
  const voidZone = document.createElement('div');
  voidZone.className = 'void-zone';

  // === Add pulse if at least one card in void is actionable ===
  const actionable = voidArray.some(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    // Use your generic actionable helper with "void" as the zone
    return isCardActionable(cardObj, cardData, gameState, 'void');
  });
  if (actionable) {
    voidZone.classList.add('zone-animatable');
  }
  
  const voidCard = document.createElement('div');
  voidCard.className = 'card-void';
  // LAST CARD VOID
  if (voidArray.length > 0) {
    const lastCardObj = voidArray[voidArray.length - 1];
    const card = dummyCards.find(c => c.id === lastCardObj.cardId);
     if (card && card.image) {
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.style.width = "80px";
      voidCard.appendChild(img);
    }
  }

  voidZone.appendChild(voidCard);

  voidCard.onclick = (e) => {
    e.stopPropagation();
    closeAllMenus();
    openFallenModal(who === 'enemy');
  };

  parentDiv.appendChild(voidZone);
}
function countDeckFallen(who, deckCount, fallenCount) {
  const prefix = who === 'enemy' ? 'Enemy' : 'Your';

  const deckZone = document.getElementById(`${who}-deck-zone`);
  const fallenZone = document.getElementById(`${who}-fallen-zone`);

  if (deckZone) {
    deckZone.title = `${prefix} Deck: ${deckCount}`;
    deckZone.setAttribute('aria-label', `${prefix} Deck: ${deckCount}`);
  }

  if (fallenZone) {
    fallenZone.title = `${prefix} Fallen: ${fallenCount}`;
    fallenZone.setAttribute('aria-label', `${prefix} Fallen: ${fallenCount}`);
  }
}
// REMOVE STAT CHANGES
function cleanCard(cardObj) {
  const cleaned = { ...cardObj };
  delete cleaned.currentHP;
  delete cleaned.orientation;
  return cleaned;
}

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

// OPEN DECK MODAL
function openDeckModal(filteredCards) {
  const modal = document.getElementById('deck-modal');
  modal.onclick = function(e) {if (e.target === modal) modal.style.display = 'none';};
  // Prevent modal-content clicks from closing the modal
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.onclick = e => e.stopPropagation();
  }

  let list = modal.querySelector('.modal-card-list');
  if (!list) {
    list = document.createElement('div');
    list.className = 'modal-card-list';
    modal.querySelector('.modal-content').appendChild(list);
  }
  list.innerHTML = "<h3>Deck</h3>";
  
  const deckCards = filteredCards || gameState.playerDeck;
  
gameState.playerDeck.forEach((cardObj, idx) => {
  const card = dummyCards.find(c => c.id === cardObj.cardId);
  if (!card) return;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'modal-card-wrapper';
  
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';

  const img = document.createElement('img');
  img.src = card.image;
  img.alt = card.name;
  img.className = "modal-card-img";
  cardDiv.appendChild(img);

  // Make the image itself clickable for the menu
  img.style.cursor = "pointer";
    holdClickToView(img, cardObj, (e) => {
      e.stopPropagation();
      closeAllMenus();
      
      const buttons = [
        {
          text: "Add to Hand",
          onClick: function(ev) {
            ev.stopPropagation();
            moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerHand);
            renderGameState();
            closeAllMenus();
            openDeckModal();
          }
        },
        {
          text: "Send to Void",
          onClick: function(ev) {
            ev.stopPropagation();
            moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerFallen);
            renderGameState();
            closeAllMenus();
            openDeckModal();
          }
        },
    ];
      const menu = createCardMenu(buttons);
      const shell = document.getElementById('game-shell') || document.getElementById('gameplay-section');
      shell.appendChild(menu);

      const rect = img.getBoundingClientRect();
      placeMenuWithinShell(menu, rect);

      menu.onclick = function(e) { e.stopPropagation(); };
      modal.onclick = function(e) {
        if (!e.target.closest('.card-menu')) {
          closeAllMenus();
          if (e.target === modal) modal.style.display = 'none';
        }
      };
    }, {
      enableDragDetection: false
    });

    wrapper.appendChild(cardDiv);
    list.appendChild(wrapper);
  });

  modal.style.display = "block";
}

// CARD STATS DETECTION
function getBaseHp(cardId) {
  const card = dummyCards.find(c => c.id === cardId);
  return card ? card.hp : 1;
}

function computeCardStat(cardObj, statName) {
  // Get base stat from dummyCards
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId) || {};
  const instanceStat = cardObj?.[statName];
  const definedStat = cardDef[statName];
  
  const base = typeof instanceStat === "number" ? instanceStat : (definedStat ?? 0);
  let mods = 0;
  // Modifiers array (for skills, effects, etc)
  if (Array.isArray(cardObj.modifiers)) {
    mods += cardObj.modifiers
      .filter(mod => mod.stat === statName)
      .reduce((sum, mod) => sum + mod.value, 0);
  }
  // Statuses (e.g. Poison, Burn), if you want to support stat impacts here
  if (Array.isArray(cardObj.statuses)) {
    for (const status of cardObj.statuses) {
      // If status has a stat impact, e.g. {def: -1}
      if (typeof status[statName] === "number") mods += status[statName];
    }
  }

  // Get all field cards using ZONE_MAP
  const fieldZoneNames = Object.keys(ZONE_MAP).filter(name =>
    name.endsWith("Creatures") || name.endsWith("Terrains") || name.endsWith("Artifacts")
  );
  const allFieldCards = fieldZoneNames
    .flatMap(name => ZONE_MAP[name]?.arr() || [])
    .filter(sourceCard => sourceCard?.cardId);

  // Apply Inspire and similar abilities dynamically
  allFieldCards.forEach(sourceCard => {
    const sourceDef = dummyCards.find(c => c.id === sourceCard.cardId);
    if (!sourceDef?.ability) return;

    const abilityArr = Array.isArray(sourceDef.ability) ? sourceDef.ability : (sourceDef.ability ? [sourceDef.ability] : []);
    abilityArr.forEach(ab => {
      if (typeof ab === "object" && ab.effect === "Inspire") {
        if (matchesFilter(cardObj, ab)) {
          if (statName === "atk" && ab.atk) mods += ab.atk;
        }
      }
    });
  });
  return Math.max(0, base + mods);
}

function renderCardOnField(cardObj, zoneId) {
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  const wrapper = document.createElement('div');
  wrapper.className = 'card-battlefield-wrapper';

  // Main card div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';
  cardDiv.dataset.instanceId = cardObj.instanceId;
  cardDiv.classList.add(cardObj.orientation === "horizontal" ? "horizontal" : "vertical");

  const isActionable = isCardActionable(cardObj, cardData, gameState, getZoneNameForCard(cardObj));
  if (isActionable) {
    if (cardObj.orientation === "horizontal") {
      cardDiv.classList.add('card-animatable-horizontal');
    } else {
      cardDiv.classList.add('card-animatable');
    }
  }

  const img = document.createElement('img');
  img.src = cardData.image;
  img.alt = cardData.name || "Card";
  img.style.width = "100%";
  img.style.height = "100%";
  cardDiv.appendChild(img);

  // --- Overlay for icons and stats ---
  const statsAndIconsOverlay = document.createElement('div');
  statsAndIconsOverlay.className = 'card-stats-icons-overlay';
  statsAndIconsOverlay.style.position = 'absolute';
  statsAndIconsOverlay.style.left = '0';
  statsAndIconsOverlay.style.top = '0';
  statsAndIconsOverlay.style.width = '100%';
  statsAndIconsOverlay.style.height = '100%';
  statsAndIconsOverlay.style.pointerEvents = 'none';

// --- Top Stats Row: ATK / DEF / SPD (single row) ---
const topStatsRow = document.createElement('div');
topStatsRow.className = 'card-top-stats-row';
topStatsRow.style.position = 'absolute';
topStatsRow.style.left = '0';
topStatsRow.style.top = '-10%';
topStatsRow.style.width = '100%';
topStatsRow.style.display = 'flex';
topStatsRow.style.justifyContent = 'center';
topStatsRow.style.alignItems = 'center';
topStatsRow.style.zIndex = 45;
topStatsRow.style.pointerEvents = 'none';

// ATK
if (typeof cardData.atk === "number") {
  const currentATK = computeCardStat(cardObj, "atk");
  const atkColor = getStatColor(cardObj, "atk");
  topStatsRow.appendChild(makeStatBadge("Icons/Stat/ATK.png", currentATK, atkColor, "ATK"));
}

// DEF (only if > 0)
if (typeof cardData.def === "number") {
  const currentDEF = computeCardStat(cardObj, "def");
  if (currentDEF > 0) {
    const defColor = getStatColor(cardObj, "def");
    topStatsRow.appendChild(makeStatBadge("Icons/Stat/DEF.png", currentDEF, defColor, "DEF"));
  }
}

statsAndIconsOverlay.appendChild(topStatsRow);
  // --- Icons Row: Centered at Top ---
  const iconRow = document.createElement('div');
  iconRow.className = 'card-icon-row-centered';
  iconRow.style.marginTop = '22px';
  // Status Icons
  (cardObj.statuses || []).forEach(status => {
    const statusDef = STATUS[status.name];
    if (!statusDef) return;
    const icon = document.createElement('img');
    icon.src = statusDef.icon;
    icon.alt = statusDef.name;
    icon.title = statusDef.description;
    icon.className = 'card-status-icon';
    iconRow.appendChild(icon);
  });

  // Ability Icons
  const abilityArr = Array.isArray(cardData.ability) ? cardData.ability : (cardData.ability ? [cardData.ability] : []);
  abilityArr.forEach(abilityName => {
    const abilityDef = TARGET_ABILITY[abilityName];
    if (!abilityDef) return;
    const icon = document.createElement('img');
    icon.src = abilityDef.icon;
    icon.alt = abilityDef.name;
    icon.title = abilityDef.name;
    icon.className = 'card-ability-icon';
    iconRow.appendChild(icon);
  });

  // Skill Icons
  if (Array.isArray(cardData.skills)) {
    cardData.skills.forEach(skill => {
      if (!skill.icon) return;
      const icon = document.createElement('img');
      icon.src = skill.icon;
      icon.alt = skill.name || "Skill";
      icon.title = escapeHtmlInline(skill.title || skillTitle(skill) || skill.name || "Skill");
      icon.className = 'card-skill-icon';
      iconRow.appendChild(icon);
    });
  }

  statsAndIconsOverlay.appendChild(iconRow);

// --- Bottom HP UI Row (HP badge left, bar between, armor badge right) ---
const hpUiRow = document.createElement('div');
hpUiRow.className = 'card-hp-ui-row';
hpUiRow.style.position = 'absolute';
hpUiRow.style.left = '0';
hpUiRow.style.bottom = '-10%';
hpUiRow.style.width = '100%';
hpUiRow.style.display = 'flex';
hpUiRow.style.alignItems = 'center';
hpUiRow.style.boxSizing = 'border-box';
hpUiRow.style.zIndex = 50;
hpUiRow.style.pointerEvents = 'none';

let currentHP;

// --- HP badge (left) ---
if (typeof cardData.hp === "number") {
  currentHP = typeof cardObj.currentHP === "number" ? cardObj.currentHP : (cardData.hp ?? 0);
  const hpBadge = makeStatBadge("Icons/Stat/HP.png", currentHP, "#fff", "HP");
  hpBadge.classList.add("hp-badge-left");
  hpUiRow.appendChild(hpBadge);
}

// --- HP bar (middle, fills remaining space) ---
let barWrap = null;
if (typeof cardData.hp === "number" && typeof currentHP === "number" && cardData.hp > 0) {
  const baseHP = cardData.hp;
  const hpPercent = Math.max(0, Math.min(1, currentHP / baseHP));

  let barColor = "#4caf50";
  if (hpPercent <= 0.25) barColor = "#e53935";
  else if (hpPercent <= 0.5) barColor = "#ff9800";

  barWrap = document.createElement('div');
  barWrap.className = 'hp-bar-wrap';
  barWrap.style.flex = '1';                 // this guarantees it ends at Armor
  barWrap.style.height = '10px';
  barWrap.style.background = '#222c';
  barWrap.style.borderRadius = '7px';
  barWrap.style.overflow = 'hidden';
  barWrap.style.position = 'relative';
  barWrap.style.marginLeft = '-10px';
  
  const bar = document.createElement('div');
  bar.className = 'hp-bar';
  bar.style.height = '100%';
  bar.style.width = `${Math.round(hpPercent * 100)}%`;
  bar.style.backgroundColor = barColor;
  bar.style.borderRadius = '7px';

  barWrap.appendChild(bar);

  // HP change animation (reuse your existing logic)
  if (typeof cardObj.prevHP === "number" && cardObj.prevHP !== currentHP) {
    if (currentHP < cardObj.prevHP) {
      bar.classList.add("hp-bar-damage");
      setTimeout(() => bar.classList.remove("hp-bar-damage"), 300);
    } else {
      bar.classList.add("hp-bar-heal");
      setTimeout(() => bar.classList.remove("hp-bar-heal"), 300);
    }
  }
  cardObj.prevHP = currentHP;
  hpUiRow.appendChild(barWrap);
}

// --- Armor badge (right) ---
if (typeof cardData.armor === "number" && cardData.armor > 0) {
  const currentArmor = typeof cardObj.armor === "number" ? cardObj.armor : cardData.armor;
  if (currentArmor > 0) {
    const armorBadge = makeStatBadge("Icons/Stat/Armor.png", currentArmor, "#fff", "Armor");
    armorBadge.classList.add("armor-badge-right");
    hpUiRow.appendChild(armorBadge);
  }
}

// Put HP UI row into the overlay (recommended for consistent layering)
statsAndIconsOverlay.appendChild(hpUiRow);

//  Badges Row //
const badgesRow = document.createElement('div');
badgesRow.className = 'card-badges-row';
badgesRow.style.position = 'absolute';
badgesRow.style.right = '6px';
badgesRow.style.top = '6px';
badgesRow.style.zIndex = 40;
badgesRow.style.display = 'flex';
badgesRow.style.flexDirection = 'column';
badgesRow.style.gap = '6px';

// Seal badge
if (hasStatus(cardObj, 'Seal')) {
  const sealBadge = document.createElement('div');
  sealBadge.className = 'card-seal-badge';
  sealBadge.title = STATUS['Seal']?.description || 'Sealed';
  sealBadge.style.display = 'flex';
  sealBadge.style.alignItems = 'center';
  sealBadge.style.justifyContent = 'center';
  sealBadge.style.cursor = 'default';
  sealBadge.innerHTML = `<img src="${STATUS['Seal']?.icon || 'Icons/Status/seal.png'}" alt="Sealed" style="width:18px;height:18px;filter:drop-shadow(0 2px 6px #0007);opacity:0.95">`;
  badgesRow.appendChild(sealBadge);
}

statsAndIconsOverlay.appendChild(badgesRow);

cardDiv.appendChild(statsAndIconsOverlay);

  // Add cardDiv to wrapper
  wrapper.appendChild(cardDiv);

  // MANUAL HP UPDATE
  holdClickToView(cardDiv, cardObj, (e) => {
    e.stopPropagation();
    closeAllMenus();
    const orientation = cardObj.orientation || 'vertical';
    showCardActionMenu(cardObj.instanceId, zoneId, orientation, cardDiv);
  }, {
    enableDragDetection: true,
    dragThreshold: 5
  });
  return wrapper;

  // --- Helper to make a stat badge (icon with number on top) ---
  function makeStatBadge(iconSrc, value, color, alt = "") {
    const badge = document.createElement('div');
    badge.className = 'stat-badge-centered';
    badge.innerHTML = `
      <img src="${iconSrc}" alt="${alt}" class="stat-badge-img">
      <span class="stat-badge-value" style="color:${color};">${value}</span>
    `;
    return badge;
  }
}

// COST DISPLAY IN HAND
function getEssenceCostDisplay(cost) {
  if (typeof cost === "string") {
    return cost.replace(/\{([^}]+)\}/g, (match, token) => {
      const key = String(token).trim().toLowerCase();

      // {2} -> x2 icon key
      const normalizedKey = /^\d+$/.test(key) ? `x${key}` : key;

      const imgSrc = ESSENCE_IMAGE_MAP[normalizedKey];
      if (imgSrc) {
        return `<img src="${imgSrc}" style="width:22px;height:22px;vertical-align:middle;margin:0 2px;" alt="${key}">`;
      }

      return match;
    });
  }

  if (!cost || typeof cost !== 'object') {
    return `<img src="${ESSENCE_IMAGE_MAP['x0']}" style="width:22px;height:22px;vertical-align:middle;" alt="Colorless: 0">`;
  }

  const iconOrder = [
    ['green', 'g'],
    ['red', 'r'],
    ['blue', 'u'],
    ['yellow', 'y'],
    ['purple', 'p'],
    ['gray', 'c'],
    ['black', 'b'],
    ['white', 'w'],
    ['colorless', 'x']
  ];

  let html = '';
  let total = 0;

  iconOrder.forEach(([prop, key]) => {
    const amt = Number(cost[prop] || 0);
    if (amt <= 0) return;
    total += amt;

    const iconKey = key === 'x' ? `x${amt}` : (amt === 1 ? key : `${key}${amt}`);
    const imgSrc = ESSENCE_IMAGE_MAP[iconKey];

    if (imgSrc) {
      html += `<img src="${imgSrc}" style="width:22px;height:22px;vertical-align:middle;margin:0 2px;" alt="${prop}:${amt}">`;
    } else if (key === 'x') {
      html += `<img src="${ESSENCE_IMAGE_MAP[`x${amt}`] || ESSENCE_IMAGE_MAP.x1}" style="width:22px;height:22px;vertical-align:middle;margin:0 2px;" alt="${prop}:${amt}">`;
    } else {
      html += `<img src="${ESSENCE_IMAGE_MAP[key]}" style="width:22px;height:22px;vertical-align:middle;margin:0 2px;" alt="${prop}">`.repeat(amt);
    }
  });

  if (total === 0) {
    html = `<img src="${ESSENCE_IMAGE_MAP['x0']}" style="width:22px;height:22px;vertical-align:middle;" alt="Colorless: 0">`;
  }

  return html;
}
/* ---------------
// ESSENCE POOL //
----------------*/
function renderEssencePool(cardObj) {
  if (!cardObj.essence) return null;
  if (!cardObj.prevEssence) cardObj.prevEssence = {};

  const poolDiv = document.createElement('div');
  poolDiv.className = 'essence-pool';

  // Map from code to color name
  const colorCodes = {G: "green", R: "red", U: "blue", Y: "yellow", C: "gray", P: "purple", W: "white", B: "black"};

  // Render colored essence
  for (const code in colorCodes) {
    const color = colorCodes[code];
    const amount = countEssenceType(cardObj.essence, code);
    const prevAmount = cardObj.prevEssence[color] || 0;
    if (amount > 0) {
      const icon = document.createElement('div');
      icon.className = `essence-icon essence-${color}`;
      icon.title = `${color.charAt(0).toUpperCase() + color.slice(1)} Essence: ${amount}`;
      icon.innerHTML = `<img src="${ESSENCE_IMAGE_MAP[color]}" class="essence-img"><span class="essence-amount">${amount}</span>`;
      if (amount > prevAmount) {
        setTimeout(() => animateEssencePop(icon), 20);
      }
      poolDiv.appendChild(icon);
    }
    cardObj.prevEssence[color] = amount;
  }
  return poolDiv;
}

function renderEssenceSummaryInto(container, pool = {}, opts = {}) {
  if (!container) return;
  container.innerHTML = '';

  const size = Number(opts.size || 16);
  const imageMap = typeof ESSENCE_IMAGE_MAP !== 'undefined' ? ESSENCE_IMAGE_MAP : {};
  // Color order to show
  const colors = ['g','r','u','y','p','c','b','w'];

  // For each color, show icon + count (compact)
  colors.forEach(color => {
    const amt = Number(pool?.[color] || 0);
    if (amt <= 0) return;

    const wrap = document.createElement('div');
    wrap.style.display = 'inline-flex';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '6px';
    wrap.style.margin = '0 6px 0 0';

    const img = document.createElement('img');
    img.src = imageMap[color] || '';
    img.alt = color + " essence";
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
    img.style.verticalAlign = 'middle';
    wrap.appendChild(img);

    if (amt !== 1) {
      const span = document.createElement('span');
      span.textContent = String(amt);
      span.style.color = '#ffe066';
      span.style.fontWeight = '700';
      span.style.fontSize = `${Math.max(10, Math.floor(size * 0.8))}px`;
      wrap.appendChild(span);
    }
    container.appendChild(wrap);
  });
}
function addEssence(cardObj, type, amount) {
  let addStr = "";
  for (let i = 0; i < amount; i++) addStr += `{${type}}`;
  cardObj.essence = (cardObj.essence || "") + addStr;
  renderGameState();
}

function consumeEssence(cardObj, type, amount) {
  let essenceStr = cardObj.essence || "";
  for (let i = 0; i < amount; i++) {
    essenceStr = essenceStr.replace(new RegExp(`\\{${type}\\}`, "i"), "");
  }
  cardObj.essence = essenceStr;
  renderGameState();
  return true;
}
// --- Essence pool helpers ---
function getEssencePool(owner = 'player') {
  if (!gameState.essencePools) {
    gameState.essencePools = {
      player: { green:0, red:0, blue:0, yellow:0, purple:0, gray:0, black:0, white:0, colorless:0 },
      enemy: { green:0, red:0, blue:0, yellow:0, purple:0, gray:0, black:0, white:0, colorless:0 }
    };
  }
  return gameState.essencePools[owner === 'enemy' ? 'enemy' : 'player'];
}

function addEssenceToPool(owner = 'player', type, amount = 1) {
  const pool = getEssencePool(owner);
  if (!pool) return;
  if (typeof type === 'string') {
    if (type === 'colorless') pool.colorless += Number(amount || 0);
    else pool[type] = (pool[type] || 0) + Number(amount || 0);
  }
  renderGameState && renderGameState();
}

function consumeEssenceFromPool(owner = 'player', type, amount = 1) {
  const pool = getEssencePool(owner);
  if (!pool) return false;
  if (type === 'colorless') {
    if (pool.colorless < amount) return false;
    pool.colorless -= amount;
    renderGameState && renderGameState();
    return true;
  } else {
    if ((pool[type] || 0) < amount) return false;
    pool[type] -= amount;
    renderGameState && renderGameState();
    return true;
  }
}

// Utility: get total units in pool (colored + colorless)
function getTotalPoolEssence(owner = 'player') {
  const p = getEssencePool(owner);
  return Object.values(p).reduce((s,n) => s + (Number(n) || 0), 0);
}

// Actions in zones
var currentCardMenuState = null;

function showSetHpModal(cardObj, onSet) {
  // Remove any existing HP modal
  let modal = document.getElementById('set-hp-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'set-hp-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

  const content = document.createElement('div');
  content.className = 'modal-content';
  content.onclick = e => e.stopPropagation();

  content.innerHTML = `
    <h3>Set HP</h3>
    <div style="margin-bottom:10px;">
      <input id="set-hp-input" type="number" min="0" max="99" value="${cardObj.currentHP || 0}" style="width:60px;padding:6px 10px;font-size:1.15em;border-radius:7px;">
    </div>
    <button id="set-hp-confirm" class="btn-secondary" style="margin-right:8px;">Set</button>
    <button id="set-hp-cancel" class="btn-negative-secondary">Cancel</button>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  document.getElementById('set-hp-confirm').onclick = function() {
    const val = parseInt(document.getElementById('set-hp-input').value, 10);
    if (!isNaN(val) && val >= 0 && val <= 99) {
      modal.remove();
      onSet(val);
    } else {
      document.getElementById('set-hp-input').style.border = "2px solid #e25555";
    }
  };
  document.getElementById('set-hp-cancel').onclick = () => modal.remove();

  document.getElementById('set-hp-input').focus();
}

function showCardActionMenu(instanceId, zoneId, orientation, cardDiv) {
  if (attackMode && attackMode.attackerId) return;
  currentCardMenuState = { instanceId, zoneId, orientation };

  const cardObj = findCardByInstanceId(instanceId);
  if (!cardObj) return;

  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardData) return;

  const zone = getZoneNameForCard(cardObj) || zoneId || "";

  // Define menu options
  const buttons = [
    {
      text: "Set HP",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          const cardObj = findCardByInstanceId(instanceId);
          if (!cardObj) return;
          showSetHpModal(cardObj, function(newHp) {
            cardObj.currentHP = newHp;
            renderGameState();
            emitPublicState();
            closeAllMenus();
          });
        } else {
          closeAllMenus();
        }
      }
    },
  {
  text: "Change Orientation",
  onClick: function(e) {
    e.stopPropagation();

    const arr = getZoneArray(zoneId);
    if (!arr) return;

    const cardObj = findCardByInstanceId(instanceId)
    if (!cardObj) return;

    const nextOrientation =
      cardObj.orientation === "horizontal" ? "vertical" : "horizontal";

    // use existing helper so animation/render stays consistent
    changeCardPosition(cardObj, nextOrientation, () => {
      renderGameState();
      setupDropZones && setupDropZones();
      emitPublicState && emitPublicState();
      closeAllMenus();
    });
  }
},
    {
      text: "Return to Hand",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          const idx = arr.findIndex(card => card.instanceId === instanceId);
          if (idx !== -1) {
            const removed = removeCardByInstanceId(instanceId);
            if (removed) gameState.playerHand.push(cleanCard(removed));
          }
        }
        renderGameState();
        setupDropZones();
        emitPublicState();
        closeAllMenus();
      }
    },
    {
      text: "Send to Void",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          const idx = arr.findIndex(card => card.instanceId === instanceId);
          if (idx !== -1) {
            const removed = removeCardByInstanceId(instanceId);
            if (removed) gameState.playerFallen.push(cleanCard(removed));
          }
        }
        renderGameState();
        setupDropZones();
        closeAllMenus();
      }
    },
    {
      text: "Return to Deck",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          const idx = arr.findIndex(card => card.instanceId === instanceId);
          if (idx !== -1) {
            const removed = removeCardByInstanceId(instanceId);
            if (removed) gameState.playerDeck.push(cleanCard(removed));
          }
        }
        renderGameState();
        setupDropZones();
        emitPublicState();
        closeAllMenus();
      }
    },
  ];
// Always show Attack in the field menu if this card's category is Creature
const isCreatureCategory = String(cardData?.category || '').toLowerCase() === 'creature';
if (cardObj && isCreatureCategory) {
  const attackOk = canAttack(cardObj, gameState);
  buttons.splice(1, 0, {
    text: "Attack",
    disabled: !attackOk,
    title: !attackOk
      ? (cardObj.orientation !== "vertical"
          ? "Card is not enabled."
          : "No valid targets to attack.")
      : "",
    onClick: function(e) {
      e.stopPropagation();
      if (!canAttack(cardObj, gameState)) return;
      startAttackTargeting(instanceId, zoneId, cardDiv);
      emitPublicState && emitPublicState();
      closeAllMenus();
    }
  });
}
if (cardData.skill && Array.isArray(cardData.skill)) {
    const currentZone = zone;
// In showCardActionMenu: replace the skill push with this
cardData.skill
  .filter(skillObj => !skillObj.activation) // Only show skills without activation
  .forEach(skillObj => {
    const sealed = typeof isSealed === 'function' ? isSealed(cardObj) : (cardObj._sealed === true);
    const canAct = canActivateSkill(cardObj, skillObj, currentZone, gameState);
    const isEnabled = canAct && !sealed;

    // explanatory title when disabled
    let disabledReason = "";
    if (!isEnabled) {
      if (sealed) disabledReason = "Sealed: Cannot activate skills.";
      else disabledReason = "Cannot activate skills while disabled.";
    }

    const activation = skillObj.activation || {};
    let requirements = Array.isArray(activation.requirement)
      ? activation.requirement
      : (activation.requirement ? [activation.requirement] : []);
    const reqIcons = getRequirementIcons(requirements);

    const titleText = escapeHtmlInline((disabledReason || skillTitle(skillObj) || skillObj.name || '').trim());

    buttons.push({
      text: `${skillObj.name} ${parseEffectText(skillObj.cost)}${reqIcons}`,
      html: true,
      title: titleText,
      disabled: !isEnabled,
      onClick: function(e) {
        e.stopPropagation();
        if (!canActivateSkill(cardObj, skillObj, currentZone, gameState)) return;
        if (sealed) return;
        activateSkill(cardObj, skillObj, { currentZone });
        closeAllMenus();
      }
    });
  });
  }
  // Create and show the menu
  const menu = createCardMenu(buttons);
  // Position menu absolutely near cardDiv
  const rect = cardDiv.getBoundingClientRect();
  placeMenuWithinShell(menu, rect);

  menu.onclick = function(e) { e.stopPropagation(); };
  // Hide menu when clicking elsewhere
  setTimeout(() => {
    document.body.addEventListener('click', function handler() {
      closeAllMenus();
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 10);
}

function openFallenModal(isenemy = false) {
  let modal = document.getElementById('fallen-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'fallen-modal';
    modal.className = 'modal';
    const content = document.createElement('div');
    content.className = 'modal-content';
    modal.appendChild(content);
    document.body.appendChild(modal);
  }

  modal.onclick = function (e) {
    if (e.target === modal) modal.style.display = 'none';
  };

  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.onclick = e => e.stopPropagation();
  }

  let list = modal.querySelector('.modal-card-list');
  if (!list) {
    list = document.createElement('div');
    list.className = 'modal-card-list';
    modal.querySelector('.modal-content').appendChild(list);
  }
  list.innerHTML = '';

  // Use Fallen as your "void" source (you don't have stable playerVoid/enemyVoid arrays)
  const voidCards = isenemy ? (gameState.enemyFallen || []) : (gameState.playerFallen || []);
  const fallenCards = isenemy ? (gameState.enemyFallen || []) : (gameState.playerFallen || []);

  // VOID SECTION
  voidCards.forEach((cardObj) => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    if (!card) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'modal-card-wrapper';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-battlefield';

    setCardAnimatableClass(cardDiv, cardObj, card, gameState, 'void');

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.className = "modal-card-img";
    img.style.cursor = "pointer";
    cardDiv.appendChild(img);

    if (isenemy) {
      holdClickToView(img, cardObj, (e) => {
        e.stopPropagation();
        closeAllMenus();
        showFullCardModal(cardObj);
      }, { enableDragDetection: false });
    } else {
      holdClickToView(img, cardObj, (e) => {
        e.stopPropagation();
        closeAllMenus();

        const buttons = [
          {
            text: "Return to Hand",
            onClick: function (ev) {
              ev.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerFallen, gameState.playerHand);
              renderGameState();
              closeAllMenus();
              openFallenModal(false);
            }
          },
          {
            text: "Return to Deck",
            onClick: function (ev) {
              ev.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerFallen, gameState.playerDeck);
              renderGameState();
              closeAllMenus();
              openFallenModal(false);
            }
          },
          {
            text: "View",
            onClick: function (ev) {
              ev.stopPropagation();
              showFullCardModal(cardObj);
              closeAllMenus();
            }
          }
        ];

        const cardData = dummyCards.find(c => c.id === cardObj.cardId);
        if (cardData && Array.isArray(cardData.skill)) {
          cardData.skill
            .filter(skillObj => !skillObj.activation)
            .forEach(skillObj => {
              const activation = skillObj.activation || {};
              const requirements = Array.isArray(activation.requirement)
                ? activation.requirement
                : (activation.requirement ? [activation.requirement] : []);
              const reqIcons = getRequirementIcons(requirements);
              const isEnabled = canActivateSkill(cardObj, skillObj, 'void', gameState);

              buttons.push({
                text: `${skillObj.name} ${parseEffectText(skillObj.cost)}${reqIcons}`,
                html: true,
                title: skillTitle(skillObj),
                disabled: !isEnabled,
                onClick: function (ev) {
                  ev.stopPropagation();
                  if (!canActivateSkill(cardObj, skillObj, 'void', gameState)) return;
                  activateSkill(cardObj, skillObj);
                  closeAllMenus();
                  openFallenModal(false);
                }
              });
            });
        }

        const menu = createCardMenu(buttons);
        const shell = document.getElementById('game-shell') || document.getElementById('gameplay-section');
        shell.appendChild(menu);

        const rect = img.getBoundingClientRect();
        placeMenuWithinShell(menu, rect);

        menu.onclick = function (ev) { ev.stopPropagation(); };
      }, { enableDragDetection: false });
    }

    wrapper.appendChild(cardDiv);
    list.appendChild(wrapper);
  });

  // FALLEN SECTION
  const depHeader = document.createElement('div');
  depHeader.style.marginTop = '16px';
  depHeader.style.paddingTop = '10px';
  depHeader.style.borderTop = '1px solid rgba(255,255,255,0.12)';
  depHeader.style.color = '#ffe066';
  depHeader.style.fontWeight = '800';
  depHeader.style.letterSpacing = '0.04em';
  depHeader.textContent = 'Fallen';
  list.appendChild(depHeader);

  fallenCards.forEach((cardObj) => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    if (!card) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'modal-card-wrapper';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-battlefield';

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.className = "modal-card-img";
    cardDiv.appendChild(img);

    holdClickToView(img, cardObj, (e) => {
      e.stopPropagation();
      closeAllMenus();
      showFullCardModal(cardObj);
    }, { enableDragDetection: false });

    wrapper.appendChild(cardDiv);
    list.appendChild(wrapper);
  });

  modal.style.display = 'block';
}

// -------------------- //
// --- PHASES LOGIC --- //
// -------------------- //
function getCurrentPhaseObj() {return { turn: gameState.turn, phase: gameState.phase };}
function getPhaseIndex(phaseObj) {return PHASES.findIndex(p => p.turn === phaseObj.turn && p.phase === phaseObj.phase);}

// Navigation
function getCurrentPhaseIndex() {return getPhaseIndex(getCurrentPhaseObj());}
function getNextPhase(phaseObj) {
  const idx = getPhaseIndex(phaseObj);
  return PHASES[(idx + 1) % PHASES.length];
}
function getPrevPhase(phaseObj) {
  const idx = getPhaseIndex(phaseObj);
  return PHASES[(idx - 1 + PHASES.length) % PHASES.length];
}

// Turn/Phase checks
function isPlayerTurn(phaseObj)           { return phaseObj.turn === 'player'; }
function isenemyTurn(phaseObj)         { return phaseObj.turn === 'enemy'; }
function isPhase(phaseObj, phase)         { return phaseObj.phase === phase; }
function isPlayerPhase(phaseObj, phase)   { return isPlayerTurn(phaseObj) && isPhase(phaseObj, phase); }
function isenemyPhase(phaseObj, phase) { return isenemyTurn(phaseObj) && isPhase(phaseObj, phase); }
function isStartPhase(phaseObj)           { return isPhase(phaseObj, 'start'); }
function isActionPhase(phaseObj)          { return isPhase(phaseObj, 'action'); }
function isEndPhase(phaseObj)             { return isPhase(phaseObj, 'end'); }
function isPlayerEndPhase(phaseObj)       { return isPlayerTurn(phaseObj) && isEndPhase(phaseObj); }
function isenemyEndPhase(phaseObj)     { return isenemyTurn(phaseObj) && isEndPhase(phaseObj); }
function isPlayerActionPhase(phaseObj)    { return isPlayerTurn(phaseObj) && isActionPhase(phaseObj); }
function isenemyActionPhase(phaseObj)  { return isenemyTurn(phaseObj) && isActionPhase(phaseObj); }
function isStartOfTurn(phaseObj)          { return isStartPhase(phaseObj); } // both player and enemy

// Display/class helpers
function getPhaseDisplayName(phaseKey) { return PHASE_DISPLAY_NAMES[phaseKey] || phaseKey; }
function getPhaseClass(phaseKey)       { return PHASE_CLASS[phaseKey] || ""; }

function handleStartPhase(turn) {
  // Increment turn counter
  if (turn === 'player') {
    gameState.turnNumber = (gameState.turnNumber || 0) + 1;
  }
  // Reset mana/essence or resource for this turn
  resetTurnFlags(turn);
  resetTurnResources(turn);
  const creatures = turn === 'player' ? gameState.playerCreatures : gameState.enemyCreatures;
  const terrains = turn === 'player' ? gameState.playerTerrains : gameState.enemyTerrains;
  
  [...creatures, ...terrains].forEach(cardObj => {
    cardObj.orientation = 'vertical';
  });
  
  drawCards(turn, 1);
  // Log action
  appendVisualLog({
    action: "startPhase",
    who: turn
  }, false, turn === "player");
  renderGameState();
}

function handleActionPhase(turn) {
  // Optionally log phase start
  appendVisualLog({
    action: "actionPhase",
    who: turn
  }, false, turn === "player");
}

function handleEndPhase(turn) {
  // Trigger end-of-turn effects (statuses, abilities, etc.)
 // triggerEndPhaseEffects(turn);
  // Tick all statuses generically based on phase
  tickStatusDurations({ turn, phase: "end" });
  // Optionally log phase end
  appendVisualLog({
    action: "endPhase",
    who: turn
  }, false, turn === "player");
}

function updatePhase() {
  // Update badge for turn
  if (phaseBadge) {
    phaseBadge.classList.remove('enemy-turn', 'player-turn');
    phaseBadge.classList.add(gameState.turn === 'enemy' ? 'enemy-turn' : 'player-turn');
  }
  // Update player/turn label
  if (phasePlayerSpan) phasePlayerSpan.textContent = (gameState.turn === "player" ? "Your turn" : "enemy's turn");
  // Update phase button and label
  if (nextPhaseBtn) nextPhaseBtn.textContent = getPhaseDisplayName(gameState.phase);
  if (phaseNameSpan) {
    phaseNameSpan.className = getPhaseClass(gameState.phase);
    phaseNameSpan.textContent = getPhaseDisplayName(gameState.phase);
  }

  // --- Call appropriate handler for the phase ---
  if (gameState.phase === "start")     handleStartPhase(gameState.turn);
  else if (gameState.phase === "action") handleActionPhase(gameState.turn);
  else if (gameState.phase === "end")    handleEndPhase(gameState.turn);
}
// Phase control events
function goToNextPhase() {
  let idx = getCurrentPhaseIndex();
  idx = (idx + 1) % PHASES.length;
  gameState.turn = PHASES[idx].turn;
  gameState.phase = PHASES[idx].phase;
  updatePhase();
  renderGameState && renderGameState();
  setupDropZones && setupDropZones();
}

if(nextPhaseBtn) nextPhaseBtn.onclick = goToNextPhase;

// ----------- //
// --- LOG --- //
// ----------- //
function renderChatLog() {
  const el = document.getElementById('chat-log'); // use your actual element id
  if (!el) return;

  el.innerHTML = '';
  (gameState.chatLog || []).forEach(entry => {
    const row = document.createElement('div');
    row.className = `chat-line chat-${entry.type}`;
    row.textContent = entry.text;
    el.appendChild(row);
  });
}
// --- Append action log ---
function renderGameLog() {
  const container = document.getElementById('battlefield-log-container');
  if (!container) return;

  container.innerHTML = '';
  const entries = gameState.gameLog || [];

  if (!entries.length) {
    container.innerHTML = '<div style="color:#ffe06699;font-size:.9em;">No actions yet.</div>';
    return;
  }

  // newest first
  entries.slice().reverse().forEach(entry => {
    const row = document.createElement('div');
    row.className = 'game-log-entry';
    row.style.marginBottom = '8px';
    row.style.padding = '6px';
    row.style.borderRadius = '6px';
    row.style.background = 'rgba(255,224,102,0.08)';
    row.style.fontSize = '0.88em';

    if (entry.html) row.innerHTML = entry.html;
    else if (entry.text) row.textContent = entry.text;
    else row.textContent = String(entry.type || 'action');

    container.appendChild(row);
  });
}
function appendChatLog(type, text) {
  
  if (!gameState.chatLog) gameState.chatLog = [];
  gameState.chatLog.push({ type, text, ts: Date.now() });
  
  if (!gameState.gameLog) {
    gameState.gameLog = [];
  }
  
  gameState.gameLog.push({
    type: type,
    text: text,
    html: text, // Store HTML for rich formatting
    timestamp: Date.now()
  });
  
  // Limit log size to prevent memory issues (keep last 100 entries)
  if (gameState.gameLog.length > 100) {
    gameState.gameLog = gameState.gameLog.slice(-100);
  }
  
  renderGameLog();
  renderChatLog();
}

function logAction(text) {
  appendChatLog('action', text);
}

function logSystem(text) {
  appendChatLog('system', text);
}

function getCpuProfile(deck) {
  return {
    username: deck.name,
    avatar: deck.image,
    banner: deck.bannerArt,
  };
}

// --- Helper: find card DOM element by instanceId in a given zone ---
function findCardDivInZone(zoneId, instanceId) {
  const zone = document.getElementById(zoneId);
  if (!zone) return null;
  // Your render uses .card-battlefield on the div holding the card
  return Array.from(zone.querySelectorAll('.card-battlefield')).find(div => {
    return div.dataset.instanceId === instanceId;
  });
}
// ==== CPU Automation ====
function runCpuTurn() {
  if (gameState.turn !== "enemy") return;
  switch (gameState.phase) {
    case "draw":
      setTimeout(nextPhaseBtn.click, 800);
      break;
    case "essence":
      // Add CPU logic for playing Essence cards here
      setTimeout(nextPhaseBtn.click, 800);
      break;
    case "action":
      // Add CPU logic for playing creatures, attacking, etc here
      setTimeout(nextPhaseBtn.click, 1200);
      break;
    case "end":
      setTimeout(nextPhaseBtn.click, 800);
      break;
  }
}

// START GAME
function showGameStartAnimation(callback) {
  if (window.gameStartAnimationShown) return; // prevent repeats
  window.gameStartAnimationShown = true;

  // Remove any previous overlays
  let oldOverlay = document.getElementById('game-start-overlay');
  if (oldOverlay) oldOverlay.remove();
  // Create overlay
  let overlay = document.createElement('div');
  overlay.id = 'game-start-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(10,20,40,0.90)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 99999;
  overlay.style.transition = 'opacity 0.7s';

  let text = document.createElement('div');
  text.innerText = 'Game Start!';
  text.style.color = '#ffe066';
  text.style.fontSize = '3.2em';
  text.style.letterSpacing = '0.1em';
  text.style.textShadow = '0 4px 16px #000a, 0 1px 0 #fff9';
  text.style.fontWeight = 'bold';
  text.style.opacity = '0.97';

  overlay.appendChild(text);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 700); // match transition
  }, 1200); // show for 1.2 seconds
}

// END GAME LOGIC
function endGame({concede = false} = {}) {
  // If multiplayer, notify server
  if (window.socket && window.currentRoomId) {
    if (concede) {
      window.socket.emit('concede game', window.currentRoomId);
    } else {
      window.socket.emit('leave game', window.currentRoomId);
    }
  }

  // Reset all game state and UI
  resetGameState();

  // Additional cleanup (close modals, overlays, etc)
  closeAllModals && closeAllModals();
  window.gameStartAnimationShown = false;
  window.coinFlipShown = false;

  // Optionally: Show a toast or redirect UI
  showToast && showToast("Game ended.");
}
function showEndGameAnimation(message, color = '#ffe066', callback = null) {
  let overlay = document.createElement('div');
  overlay.id = 'game-end-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(10,20,40,0.92)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 99999;
  overlay.style.transition = 'opacity 0.7s';

  let text = document.createElement('div');
  text.innerText = message;
  text.style.color = color;
  text.style.fontSize = '3.2em';
  text.style.letterSpacing = '0.1em';
  text.style.textShadow = '0 4px 16px #000a, 0 1px 0 #fff9';
  text.style.fontWeight = 'bold';
  text.style.opacity = '0.97';

  overlay.appendChild(text);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 1100); // slightly longer so player can see it
  }, 1700); // show for 1.7 seconds
}
function checkEndGame() {
  if (gameState.playerDomain && gameState.playerDomain.currentHP <= 0) {
    showEndGameAnimation("Defeat", "#e25555");
    // disable actions, offer rematch, etc.
    return true;
  }
  if (gameState.enemyDomain && gameState.enemyDomain.currentHP <= 0) {
    showEndGameAnimation("Victory", "#ffe066");
    // disable actions, offer rematch, etc.
    return true;
  }
  return false;
}
function extractDomainFromDeck(deckArr) {
  const idx = deckArr.findIndex(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    if (!card) return false;
    // Prefer the shared helper if present
    if (typeof isDomain === 'function') return isDomain(card);
    const t = card.type;
    if (Array.isArray(t)) return t.map(x => String(x).toLowerCase()).includes('Domain');
    return String(t || '').toLowerCase() === 'Domain';
  });
  if (idx !== -1) {
    return deckArr.splice(idx, 1)[0];
  }
  return null;
}

if (gameState.playerDomain && gameState.playerDomain.currentHP <= 0) {
  showEndGameAnimation("Defeat", "#e25555");
  // Optionally: disable further actions, or trigger a reset
}
if (gameState.enemyDomain && gameState.enemyDomain.currentHP <= 0) {
  showEndGameAnimation("Victory", "#ffe066");
  // Optionally: disable further actions, or trigger a reset
}

function initiateDomainSelection(deckArr, afterSelection) {
  // Domain SETUP
  const DomainObj = extractDomainFromDeck(deckArr);
  if (DomainObj) {
    DomainObj.currentHP = getBaseHp(DomainObj.cardId);
    gameState.playerDomain = DomainObj;
    gameState.playerTerrains.unshift(DomainObj);
    const idx = deckArr.findIndex(c => c.instanceId === DomainObj.instanceId);
    if (idx !== -1) deckArr.splice(idx, 1);
    renderGameState();
  }
}

// ESSENCE GENERATION //
function generateEssence(cardObj) {
  // Add the card's defined essence into the owner's pooled essence
  if (!cardObj) return;
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef || !cardDef.essence) return;

  // Determine owner by membership in gameState arrays
  const owner = (gameState.playerTerrains.includes(cardObj) || gameState.playerCreatures.includes(cardObj)) ? 'player'
    : (gameState.enemyTerrains.includes(cardObj) || gameState.enemyCreatures.includes(cardObj)) ? 'enemy'
    : (cardObj.owner ? (cardObj.owner === 'player' ? 'player' : 'enemy') : 'player');

  // Parse the essence string like "{g}{g}{r}{2}" and add to pool counts
  const essStr = cardDef.essence || '';
  const matches = essStr.match(/\{([^}]+)\}/g) || [];

  matches.forEach(m => {
    const inner = m.replace(/[{}]/g, '').trim().toLowerCase();

    const colored = inner.match(/^([gruypcbw])(\d+)?$/i);
    if (colored) {
      const keyMap = {
        g: 'green', r: 'red', u: 'blue', y: 'yellow',
        p: 'purple', c: 'gray', b: 'black', w: 'white'
      };
      const color = keyMap[colored[1].toLowerCase()];
      const amount = colored[2] ? Number(colored[2]) : 1;
      gameState.essencePools[owner][color] += amount;
      return;
    }

    const generic = inner.match(/^x(\d+)$/i);
    if (generic) {
      gameState.essencePools[owner].colorless += Number(generic[1]);
      return;
    }

    if (/^\d+$/.test(inner)) {
      gameState.essencePools[owner].colorless += Number(inner);
    }
  });

  // trigger UI update
  renderGameState && renderGameState();
}


// ESSENCE CONSUPTION LOGIC
function showEssencePaymentModal(opts = {}) {
  // opts expected:
  // { card: cardDataOrObj, cost: parsedCostObject, owner: 'player'|'enemy', onPaid: fn }
  closeAllModals();

  // Setup modal base
  let modal = document.getElementById('essence-payment-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'essence-payment-modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }
  modal.innerHTML = '';
  modal.style.display = 'flex';
  // backdrop click -> close and clear casting preview
  modal.onclick = function(e) { 
    if (e.target === modal) {
      window.currentCasting = null;
      if (typeof updateGameStatusRow === 'function') updateGameStatusRow();
      modal.style.display = 'none'; 
    }
  };

  // Modal content
  const content = document.createElement('div');
  content.className = 'modal-content';
  content.onclick = e => e.stopPropagation();
  content.style.maxWidth = '680px';
  content.style.padding = '16px';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';
  modal.appendChild(content);

  // Track current casting so HUD shows the card + cost
  const owner = opts.owner === 'enemy' ? 'enemy' : 'player';
  try {
    window.currentCasting = { card: opts.card || null, cost: opts.cost || null, owner };
    if (typeof updateGameStatusRow === 'function') updateGameStatusRow();
  } catch (e) {
    console.warn("Could not set currentCasting:", e);
  }

  // Header: card image + (optional) cost
  const card = opts.card || {};
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.gap = '12px';
  header.style.marginBottom = '10px';
  header.style.width = '100%';
  header.style.justifyContent = 'center';

  const img = document.createElement('img');
  img.src = card.image || '';
  img.alt = card.name || '';
  img.style.width = '120px';
  img.style.height = 'auto';
  img.style.cursor = 'pointer';
  img.onclick = (e) => { e.stopPropagation(); showFullCardModal(card); };
  header.appendChild(img);

  // Cost display (if parsed)
  const parsedCost = opts.cost || (card && card.cost ? parseCost(card.cost) : null);
  if (parsedCost) {
    const costDiv = document.createElement('div');
    costDiv.innerHTML = getEssenceCostDisplay(parsedCost);
    costDiv.style.display = 'flex';
    costDiv.style.alignItems = 'center';
    costDiv.style.gap = '6px';
    header.appendChild(costDiv);
  }
  content.appendChild(header);

  // Requirements container (keeps same look/behaviour as before)
  const reqDiv = document.createElement('div');
  reqDiv.className = 'essence-requirements';
  reqDiv.style.display = 'flex';
  reqDiv.style.alignItems = 'center';
  reqDiv.style.marginBottom = '12px';
  content.appendChild(reqDiv);

  // Build requirements array and local trackers
  let requirements = [];
  if (parsedCost && typeof parsedCost === 'object') {
    for (const color in parsedCost) {
      requirements.push({ color, needed: parsedCost[color], paid: 0 });
    }
  }
  let reqPaid = {};
  requirements.forEach(r => { reqPaid[r.color] = 0; });

  // render requirements using existing helper if present
  if (typeof updateReqDiv === 'function') updateReqDiv(requirements, reqPaid, reqDiv);
  else reqDiv.textContent = JSON.stringify(requirements);

  // Payment plan array: entries are { poolOwner, color, amount }
  let paymentPlan = [];

  // Helper to check completeness
  function isPaid() {
    if (!requirements || requirements.length === 0) return true;
    for (const r of requirements) {
      if ((reqPaid[r.color] || 0) < r.needed) return false;
    }
    return true;
  }

  const poolOwner = owner;
  const pool = (typeof getEssencePool === 'function') ? getEssencePool(poolOwner) : { green:0, red:0, blue:0, yellow:0, purple:0, gray:0, black:0, white:0, colorless:0 };
  const poolTokensDiv = document.createElement('div');
  poolTokensDiv.style.display = 'flex';
  poolTokensDiv.style.flexWrap = 'wrap';
  poolTokensDiv.style.gap = '12px';
  poolTokensDiv.style.justifyContent = 'center';
  poolTokensDiv.style.width = '100%';
  poolTokensDiv.style.margin = '8px 0 14px 0';

  const colorOrder = ['green','red','blue','yellow','purple','gray','black','white'];
  const imageMap = typeof ESSENCE_IMAGE_MAP !== 'undefined' ? ESSENCE_IMAGE_MAP : {};

  // local transient map to track how many from pool we've tentatively assigned in this modal
  const assignedFromPool = { colorless: 0, green:0, red:0, blue:0, yellow:0, purple:0, gray:0, black:0, white:0 };

  function renderPoolTokens() {
    poolTokensDiv.innerHTML = '';
    const curPool = (typeof getEssencePool === 'function') ? getEssencePool(poolOwner) : pool;
    colorOrder.forEach(color => {
      const amt = (curPool && curPool[color]) ? curPool[color] : 0;
      const assigned = assignedFromPool[color] || 0;
      const available = Math.max(0, amt - assigned);
      if (amt <= 0 && available <= 0) return;

      const tokenWrap = document.createElement('div');
      tokenWrap.style.display = 'flex';
      tokenWrap.style.flexDirection = 'column';
      tokenWrap.style.alignItems = 'center';
      tokenWrap.style.gap = '6px';
      tokenWrap.style.minWidth = '56px';

      const tokenImg = document.createElement('img');
      tokenImg.src = imageMap[color] || '';
      tokenImg.style.width = '28px';
      tokenImg.style.height = '28px';
      tokenImg.title = `${color} (${amt})`;
      tokenImg.style.cursor = available > 0 ? 'pointer' : 'default';
      tokenWrap.appendChild(tokenImg);

      const count = document.createElement('div');
      count.textContent = `${available}`;
      count.style.color = '#ffe066';
      count.style.fontWeight = '700';
      tokenWrap.appendChild(count);

      tokenImg.onclick = function(e) {
        e.stopPropagation();
        if (available <= 0) {
          showToast && showToast('No available tokens of that color.', { type: 'info' });
          return;
        }
        // Prefer filling exact color need first, else colorless
        const needExact = parsedCost && parsedCost[color] ? (parsedCost[color] - (reqPaid[color] || 0)) : 0;
        if (needExact > 0) {
          reqPaid[color] = (reqPaid[color] || 0) + 1;
          paymentPlan.push({ poolOwner, color, amount: 1 });
          assignedFromPool[color] = (assignedFromPool[color] || 0) + 1;
          count.textContent = `${Math.max(0, (curPool[color] - assignedFromPool[color]))}`;
} else if (parsedCost && parsedCost.colorless && (reqPaid.colorless || 0) < parsedCost.colorless) {
  // In this game, "colorless" = generic, payable by ANY colored essence.
  reqPaid.colorless = (reqPaid.colorless || 0) + 1;

  // Record the ACTUAL color used, so confirm consumes that color from the pool.
  paymentPlan.push({ poolOwner, color: color, amount: 1 });

  assignedFromPool[color] = (assignedFromPool[color] || 0) + 1;
  count.textContent = `${Math.max(0, (curPool[color] - assignedFromPool[color]))}`;
} else {
          showToast && showToast('No matching requirement for this token.', { type: 'info' });
          return;
        }
        if (typeof updateReqDiv === 'function') updateReqDiv(requirements, reqPaid, reqDiv);
        else reqDiv.textContent = JSON.stringify(reqPaid);
        updateConfirmBtn();
      };
      poolTokensDiv.appendChild(tokenWrap);
    });

    // Colorless tokens
    const clAmt = (curPool && curPool.colorless) ? curPool.colorless : 0;
    const clAssigned = assignedFromPool.colorless || 0;
    const clAvailable = Math.max(0, clAmt - clAssigned);
    if (clAmt > 0) {
      const clWrap = document.createElement('div');
      clWrap.style.display = 'flex';
      clWrap.style.flexDirection = 'column';
      clWrap.style.alignItems = 'center';
      clWrap.style.gap = '6px';
      clWrap.style.minWidth = '56px';

      const clImg = document.createElement('img');
      clImg.src = imageMap['X1'] || imageMap['X0'] || '';
      clImg.style.width = '28px';
      clImg.style.height = '28px';
      clImg.title = `Colorless (${clAmt})`;
      clImg.style.cursor = clAvailable > 0 ? 'pointer' : 'default';
      clWrap.appendChild(clImg);

      const clCnt = document.createElement('div');
      clCnt.textContent = `${clAvailable}`;
      clCnt.style.color = '#ffe066';
      clCnt.style.fontWeight = '700';
      clWrap.appendChild(clCnt);

      clImg.onclick = function(e) {
        e.stopPropagation();
        if (clAvailable <= 0) {
          showToast && showToast('No colorless essence available.', { type: 'info' });
          return;
        }
        if (parsedCost && parsedCost.colorless && (reqPaid.colorless || 0) < parsedCost.colorless) {
          reqPaid.colorless = (reqPaid.colorless || 0) + 1;
          paymentPlan.push({ poolOwner, color: 'colorless', amount: 1 });
          assignedFromPool.colorless = (assignedFromPool.colorless || 0) + 1;
          clCnt.textContent = `${Math.max(0, clAmt - assignedFromPool.colorless)}`;
        } else {
          showToast && showToast('No colorless requirement to fill.', { type: 'info' });
        }
        if (typeof updateReqDiv === 'function') updateReqDiv(requirements, reqPaid, reqDiv);
        else reqDiv.textContent = JSON.stringify(reqPaid);
        updateConfirmBtn();
      };

      poolTokensDiv.appendChild(clWrap);
    }
  } // end renderPoolTokens

  renderPoolTokens();
  content.appendChild(poolTokensDiv);

  // Confirm / Cancel row
  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '12px';
  actions.style.marginTop = '8px';
  content.appendChild(actions);

  const confirmBtn = document.createElement('button');
  confirmBtn.type = 'button';
  confirmBtn.className = 'btn-primary';
  confirmBtn.textContent = 'Confirm';
  confirmBtn.disabled = true;
  actions.appendChild(confirmBtn);

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'btn-negative-secondary';
  cancelBtn.textContent = 'Cancel';
  actions.appendChild(cancelBtn);

  function updateConfirmBtn() {
    confirmBtn.disabled = !isPaid();
  }

  cancelBtn.onclick = function(e) {
    e.stopPropagation();
    // rollback local tentative assignments (no pool consumption happened yet, so just clear)
    paymentPlan = [];
    for (const k in assignedFromPool) assignedFromPool[k] = 0;
    reqPaid = {};
    requirements.forEach(r => { reqPaid[r.color] = 0; });
    window.currentCasting = null;
    if (typeof updateGameStatusRow === 'function') updateGameStatusRow();
    modal.style.display = 'none';
  };

  confirmBtn.onclick = function(e) {
    e.stopPropagation();
    if (!isPaid()) {
      showToast && showToast('Payment incomplete', { type: 'warning' });
      return;
    }

    // Consume pooled essence for each paymentPlan entry. If any consumption fails, roll back what's consumed.
    const consumed = [];
    let failed = false;
    for (const pay of paymentPlan) {
      const poolOwnerLocal = pay.poolOwner || poolOwner;
      const colorKey = pay.color === 'colorless' ? 'colorless' : pay.color;
      const amt = Number(pay.amount || 1);
      const ok = (typeof consumeEssenceFromPool === 'function')
        ? consumeEssenceFromPool(poolOwnerLocal, colorKey, amt)
        : false;
      if (ok) {
        consumed.push({ poolOwnerLocal, colorKey, amt });
      } else {
        failed = true;
        break;
      }
    }

    if (failed) {
      // rollback
      consumed.forEach(c => {
        if (typeof addEssenceToPool === 'function') addEssenceToPool(c.poolOwnerLocal, c.colorKey, c.amt);
      });
      showToast && showToast('Payment failed (insufficient pooled essence).', { type: 'error' });
      renderPoolTokens();
      return;
    }

    // Success: clear modal transient state and casting preview
    paymentPlan = [];
    for (const k in assignedFromPool) assignedFromPool[k] = 0;
    reqPaid = {};
    requirements.forEach(r => { reqPaid[r.color] = 0; });

    window.currentCasting = null;
    if (typeof updateGameStatusRow === 'function') updateGameStatusRow();

    // Call callback
    if (typeof opts.onPaid === 'function') {
      try { opts.onPaid(); } catch (err) { console.warn('onPaid threw', err); }
    }

    modal.style.display = 'none';
    renderGameState && renderGameState();
  };

  // Keep pool rendering updated in case pool changes externally while modal open
  const refreshInterval = setInterval(() => {
    if (!modal || modal.style.display === 'none') {
      clearInterval(refreshInterval);
      return;
    }
    renderPoolTokens();
    updateConfirmBtn();
  }, 700);

  // initial confirm button state
  updateConfirmBtn();
}

// Requirement "progress" update
function updateReqDiv(requirements, reqPaid, reqDiv) {
  // requirements: array of {color, needed, paid}
  // reqPaid: {color: number}
  reqDiv.innerHTML = `<b>Essence Required</b> ${
    requirements.map(r => {
      let icons = "";
      // Colorless: use the X1 image for each unit
      if (r.color === "colorless") {
        for (let i = 0; i < r.needed; i++) {
          const imgSrc = ESSENCE_IMAGE_MAP['x1'];
          const isPaid = i < (reqPaid[r.color] || 0);
          icons += `<img src="${imgSrc}" 
            style="width:24px;height:24px;vertical-align:middle;margin: 0 3px;
            filter:${isPaid ? "none" : "grayscale(0.5) brightness(0.5)"};
            opacity:${isPaid ? "1" : "0.7"};
            transition:filter 0.2s,opacity 0.2s;">`;
        }
      } else {
        const imgSrc = ESSENCE_IMAGE_MAP[r.color];
        for (let i = 0; i < r.needed; i++) {
          const isPaid = i < (reqPaid[r.color] || 0);
          icons += `<img src="${imgSrc}" 
            style="width:24px;height:24px;vertical-align:middle;margin: 0 3px;
            filter:${isPaid ? "none" : "grayscale(0.7) brightness(1.1)"};
            opacity:${isPaid ? "1" : "0.7"};
            transition:filter 0.2s,opacity 0.2s;">`;
        }
      }
      return `<span style="display:inline-flex;align-items:center;">${icons}</span>`;
    }).join('')
  }`;
}
  
function getAllEssenceSources() {
  return [...gameState.playerTerrains, ...gameState.playerCreatures /* add more if needed */];
}

// ATTACK LOGIC
function startAttackTargeting(attackerId, attackerZone, cardDiv) {
  // Find attacker object
  let attacker =
    gameState.playerCreatures.find(c => c.instanceId === attackerId) ||
    gameState.enemyCreatures.find(c => c.instanceId === attackerId);
  
  if (!canAttack(attacker, gameState)) {
    showToast("This creature is disabled.");
    return;
  }
  attackMode.attackerId = attackerId;
  attackMode.attackerZone = attackerZone;
  battlefield.classList.add('attack-mode-backdrop');
  const targets = getAttackTargets(attacker);

  targets.forEach(cardObj => {
    // Try both rows for finding the DOM element
    let targetDiv = findCardDivInZone('enemy-creature-zone', cardObj.instanceId)
    || findCardDivInZone('enemy-support-zone', cardObj.instanceId) || findCardDivInZone('enemy-artifacts-zone', cardObj.instanceId);
    if (targetDiv) {
      targetDiv.classList.add('attack-target-highlight');
      targetDiv.onclick = function(e) {
        e.stopPropagation();
        endAttackTarget();
        resolveAttack(attackerId, cardObj.instanceId);
        return false;
      };
    }
  });

  // Cancel handler
  attackMode.cancelHandler = function(e) {
    endAttackTarget();
  };
  setTimeout(() => document.body.addEventListener('click', attackMode.cancelHandler, { once: true }), 10);
}

function canAttack(cardObj, gameState) {
  if (!cardObj) return false;
  if (gameState.turn !== 'player') return false;
  if (gameState.phase !== 'action') return false;

  // Only cards with category "Creature" can attack (definition-based)
  const def = dummyCards.find(c => c.id === cardObj.cardId);
  const isCreatureCategory = String(def?.category || '').toLowerCase() === 'creature';
  if (!isCreatureCategory) return false;  
  if (cardObj.orientation !== "vertical") return false;

  // Add any other restrictions (e.g. tapped, stunned)
  // Check if there are any valid targets
  const targets = getAttackTargets(cardObj);
  if (!targets || targets.length === 0) return false;
  return true;
}
function getAttackTargets(attackerObj = null) {
  // If no attacker, default to enemy creatures as "possible generic attack targets"
  if (!attackerObj) return gameState.enemyCreatureSlots.filter(Boolean);

  const attackerOwner = getCardOwner(attackerObj); // should return "player" or "enemy"
  const defenders =
    attackerOwner === "player"
      ? gameState.enemyCreatureSlots.filter(Boolean)
      : gameState.playerCreatureSlots.filter(Boolean);

  // Keep your existing ability filters if present
  if (typeof applyAttackTargetFilters === "function") {
    return applyAttackTargetFilters(attackerObj, defenders);
  }

  return defenders;
}
function endAttackTarget() {
  // Remove highlights and listeners
    [...gameState.enemyCreatures, ...gameState.enemyTerrains, ...(gameState.enemyArtifacts || [])].forEach(cardObj => {
    const targetDiv = findCardDivInZone('enemy-creature-zone', cardObj.instanceId);
    const targetTerrainDiv = findCardDivInZone('enemy-support-zone', cardObj.instanceId);
    const targetArtifactDiv = findCardDivInZone('enemy-artifacts-zone', cardObj.instanceId);
    [targetDiv, targetTerrainDiv, targetArtifactDiv].forEach(div => {
      if (div) {
        div.classList.remove('attack-target-highlight');
        div.onclick = null; // Remove attack targeting handler
      }
    });
  });
  battlefield.classList.remove('attack-mode-backdrop');
  if (attackMode.cancelHandler) {
    document.body.removeEventListener('click', attackMode.cancelHandler);
    attackMode.cancelHandler = null;
  }
  attackMode.attackerId = null;
  attackMode.attackerZone = null;
}

// --- ATTACK RESOLUTION ANIMATION ---
function resolveAttack(attackerId, defenderId) {
  // Find attacker/defender objects
  const attackerObj = [...gameState.playerCreatures, ...gameState.playerTerrains]
    .find(c => c.instanceId === attackerId);
    
  const defenderObj = [...gameState.enemyCreatures, ...gameState.enemyTerrains, ...(gameState.enemyArtifacts || []), ...(gameState.enemyDomain ? [gameState.enemyDomain] : [])]
    .find(c => c.instanceId === defenderId);

  if (!attackerObj || !defenderObj) return;

  const attackerZone = findZoneIdForCard(attackerObj);
  const defenderZone = findZoneIdForCard(defenderObj);

  // Attacker is always disabled first when attack is declared.
  disableAfterCombat(attackerObj, () => {
    // Step 1: Animate attacker attacking
    animateAttack(attackerObj, attackerZone, () => {
      // Step 2: Trigger OnAttack skills
      triggerOnAttackSkills(attackerObj, defenderObj, () => {
        // Step 3: Trigger OnDefense skills
        triggerOnDefenseSkills(defenderObj, attackerObj, () => {
          // Step 4: Animate defender getting hit
          animateDefenderHit(defenderObj, defenderZone, () => {
            
            // Step 5: Calculate and apply damage
            const result = damageCalculation(attackerObj, defenderObj) || { attackerDamage: 0, defenderDamage: 0 };
            const { attackerDamage, defenderDamage } = result;

            // Apply damage here (ONLY here)
            if (attackerDamage > 0) dealDamage(attackerObj, defenderObj, attackerDamage);
            if (defenderDamage > 0) dealDamage(defenderObj, attackerObj, defenderDamage);
            
            // Defender is disabled at the end of battle regardless of category, if still on field.
            disableAfterCombat(defenderObj, () => {
              appendAttackLog({
                attacker: attackerObj,
                defender: defenderObj,
                defenderOrientation: defenderObj.orientation || 'vertical',
                who: 'player'
              });
              renderGameState();
              checkEndGame();
            }, { allowAnyCategory: true }); // Properly paired with defender disable

          }); // Closes animateDefenderHit
        }); // Closes triggerOnDefenseSkills
      }); // Closes triggerOnAttackSkills
    }); // Closes animateAttack
  }); // Closes attacker disableAfterCombat
}
// Disable a combatant after battle (tap to horizontal)
// Use the canonical orientation pipeline used elsewhere.
function disableAfterCombat(cardObj, done, options = {}) {
  const { allowAnyCategory = false } = options;
  if (!cardObj) return done && done();
  // Only creatures should be disabled by combat
  // Default combat behavior: only creatures are disabled unless explicitly overridden.
  if (!allowAnyCategory) {
    const def = dummyCards.find(c => c.id === cardObj.cardId);
    const isCreature = String(def?.category || '').toLowerCase() === 'creature';
    if (!isCreature) return done && done();
  }
  // If card left the field (e.g., destroyed), skip disabling.
  const fieldCards = [
    ...gameState.playerCreatures,
    ...gameState.playerTerrains,
    ...(gameState.playerArtifacts || []),
    ...gameState.enemyCreatures,
    ...gameState.enemyTerrains,
    ...(gameState.enemyArtifacts || [])
  ];
  if (!fieldCards.includes(cardObj)) return done && done();
  if (cardObj.orientation === 'horizontal') return done && done();
  changeCardPosition(cardObj, 'horizontal', done);
}

function damageCalculation(attacker, defender) {
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  const defenderDef = dummyCards.find(c => c.id === defender.cardId);

  // normalize category once (your current code computes these but doesn't use them)
  const attackerCategory = String(attackerDef?.category || '').toLowerCase();
  const defenderCategory = String(defenderDef?.category || '').toLowerCase();

  // Zone info is OK to keep for convenience, but DON'T use defenderInfo.arr for KO removal
  // because it can be stale/wrong for enemy cards.
  const attackerInfo = getZoneInfoForCard(attacker);
  const defenderInfo = getZoneInfoForCard(defender);

  const attackerQuickstrike = hasStatus(attacker, 'Quickstrike');
  const attackerInvulnerable = hasStatus(attacker, 'InvulnerableAtk');
  const defenderQuickstrike = hasStatus(defender, 'Quickstrike');
  const defenderInvulnerable = hasStatus(defender, 'InvulnerableAtk');

  // helper: send a dead card to the correct void, removing it from the actual zone array
  function sendToFallenIfDead(cardObj) {
    if (!cardObj || (cardObj.currentHP || 0) > 0) return;

    // Determine the actual array containing this instance right now
    const fromArr = getZoneArrayForCard(cardObj);

    // Determine owner by membership (robust and cheap)
    const isPlayerCard =
      gameState.playerCreatures.includes(cardObj) ||
      gameState.playerTerrains.includes(cardObj) ||
      gameState.playerHand.includes(cardObj) ||
      gameState.playerDeck.includes(cardObj);

    const voidArr = isPlayerCard ? gameState.playerFallen : gameState.enemyFallen;
    moveCard(cardObj.instanceId, fromArr, voidArr);
  }

  // === ATK VS ATK (enabled creature battles) ===
  if (defenderCategory === "creature" && defender.orientation === "vertical") {
    const attackerDmg = computeCardStat(attacker, "atk");
    const defenderDmg = computeCardStat(defender, "atk");

    if ((attackerQuickstrike && !defenderQuickstrike) || (!attackerQuickstrike && defenderQuickstrike)) {
      if (attackerQuickstrike && !defenderQuickstrike) {
        defender.currentHP = Math.max(0, (defender.currentHP || getBaseHp(defender.cardId)) - attackerDmg);
        if (defender.currentHP > 0) {
          const retaliate = attackerInvulnerable ? 0 : defenderDmg;
          attacker.currentHP = Math.max(0, (attacker.currentHP || getBaseHp(attacker.cardId)) - retaliate);
        }
      } else {
        attacker.currentHP = Math.max(0, (attacker.currentHP || getBaseHp(attacker.cardId)) - defenderDmg);
        if (attacker.currentHP > 0) {
          const retaliate = defenderInvulnerable ? 0 : attackerDmg;
          defender.currentHP = Math.max(0, (defender.currentHP || getBaseHp(defender.cardId)) - retaliate);
        }
      }
    } else {
      let defenderIncoming = attackerDmg;
      let attackerIncoming = defenderDmg;

      if (attackerInvulnerable) attackerIncoming = 0;
      if (defenderInvulnerable) defenderIncoming = 0;

      defender.currentHP = Math.max(0, (defender.currentHP || getBaseHp(defender.cardId)) - defenderIncoming);
      attacker.currentHP = Math.max(0, (attacker.currentHP || getBaseHp(attacker.cardId)) - attackerIncoming);
    }

    // KO handling (correct owner + correct from array)
    sendToFallenIfDead(defender);
    sendToFallenIfDead(attacker);

    // Apply status only if defender is still alive on field
    if (defenderCategory === "creature" && defenderInfo.arr?.includes(defender) && (defender.currentHP || 0) > 0) {
      const attackerAbilities = attackerDef?.ability || [];
      attackerAbilities.forEach(abilityName => {
        if (STATUS[abilityName]) applyStatus(defender, abilityName);
      });
    }
    renderGameState();
    setupDropZones();
    return;
  }

  // === ATK VS DEF (defender disabled creature does not deal battle damage) ===
  if (defenderCategory === "creature" && defender.orientation === "horizontal") {
    const damage = Math.max(0, computeCardStat(attacker, "atk") - computeCardStat(defender, "def"));
    dealDamage(attacker, defender, damage);

    // If dealDamage doesn't already move to fallen, ensure KO cleanup here too:
    sendToFallenIfDead(defender);

    renderGameState();
    setupDropZones();
    return;
  }

  // === ATK VS DOMAIN OR ARTIFACT (or non-creature targets) ===
  dealDamage(attacker, defender, computeCardStat(attacker, "atk"));

  // If dealDamage doesn't already move to fallen, ensure KO cleanup here too:
  sendToFallenIfDead(defender);

  // Apply status only if defender is still alive on field and is a creature
  if (defenderCategory === "creature" && defenderInfo.arr?.includes(defender) && (defender.currentHP || 0) > 0) {
    const attackerAbilities = attackerDef?.ability || [];
    attackerAbilities.forEach(abilityName => {
      if (STATUS[abilityName]) applyStatus(defender, abilityName);
    });
  }
  renderGameState();
  setupDropZones();
}

function dealDamage(cardObj, targetObj, damage) {
  const cardDef = dummyCards.find(c => c.id === targetObj.cardId);

  // Initialize currentHP if undefined or NaN
  if (typeof targetObj.currentHP !== "number" || isNaN(targetObj.currentHP)) {
    targetObj.currentHP = typeof cardDef?.hp === "number" ? cardDef.hp : 1;
  }

  damage = Number(damage);
  if (isNaN(damage) || damage < 0) damage = 0;
  targetObj.currentHP = Math.max(0, targetObj.currentHP - damage);

  targetObj.atk = typeof targetObj.atk === "number" ? targetObj.atk : cardDef?.atk ?? 0;
  targetObj.def = typeof targetObj.def === "number" ? targetObj.def : cardDef?.def ?? 0;
  
  if (damage > 0) {
    triggerSelfSkill(cardObj, "frenzy", { trigger: "frenzy", target: targetObj, amount: damage });
    triggerSelfSkill(targetObj, "brace", { trigger: "brace", source: cardObj, amount: damage });
  }

  if (targetObj.currentHP <= 0) {
    const fromArr = findCardFieldArray(targetObj);
    if (fromArr) {
      moveCard(targetObj.instanceId, fromArr, gameState.playerFallen);
    }
    return;
  }

  // === Apply status effects from cardObj abilities (if any, and only if survived) ===
  if (
    cardObj &&
    cardObj !== targetObj // Don't apply status to self
  ) {
    const sourceDef = dummyCards.find(c => c.id === cardObj.cardId);
    if (sourceDef && sourceDef.ability) {
      const abilities = Array.isArray(sourceDef.ability) ? sourceDef.ability : [sourceDef.ability];
      abilities.forEach(abilityName => {
        if (STATUS[abilityName]) {
          applyStatus(targetObj, abilityName);
        }
      });
    }
  }
}
function triggerOnAttackSkills(attacker, defender, onComplete) {
  triggerSelfSkill(attacker, "attack", { trigger: "attack", defender }, onComplete);
}

function triggerOnDefenseSkills(defender, attacker, onComplete) {
  triggerSelfSkill(defender, "defend", { trigger: "defend", attacker }, onComplete);
}

// ------------------------ //
// --- GAME START LOGIC --- //
// ------------------------ //

function showCoinFlipModal(onResult) {
  if (window.coinFlipShown) return; // prevent repeats
  window.coinFlipShown = true;
  // Remove any previous overlays
  let oldModal = document.getElementById('coin-flip-modal');
  if (oldModal) oldModal.remove();
  // Use forcedResult if provided, else pick randomly (for solo/casual play)
  let isHeads;
  if (typeof forcedResult !== "undefined") {
    // Accept strings or booleans
    if (forcedResult === "player" || forcedResult === "heads" || forcedResult === true) isHeads = true;
    else isHeads = false;
  } else {
    isHeads = Math.random() < 0.5;
  }
  // Flip logic
  const headsImg = "Icons/Other/Heads.png";
  const tailsImg = "Icons/Other/Tails.png";
  const chosenImg = isHeads ? headsImg : tailsImg;
  const chosenText = isHeads ? "Heads" : "Tails";
  // Create overlay/modal
  let modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.position = 'fixed';
  modal.style.background = 'rgba(16,20,24,0.92)';
  modal.onclick = e => { if (e.target === modal) modal.remove(); };

  // Coin image and message
  let coin = document.createElement('img');
  coin.src = headsImg;
  coin.style.width = "120px";
  coin.style.transition = "transform 1.2s cubic-bezier(.22,1.14,.32,1)";
  coin.style.transform = "rotateY(0deg)";
  coin.style.display = "block";
  coin.style.margin = "0 auto";

  const msg = document.createElement('div');
  msg.style.color = "#ffe066";
  msg.style.fontSize = "2em";
  msg.style.textAlign = "center";
  msg.style.marginTop = "24px";
  msg.innerText = "Flipping the coin...";

  // Compose modal
  let content = document.createElement('div');
  content.appendChild(coin);
  content.appendChild(msg);
  modal.appendChild(content);
  document.body.appendChild(modal);

  setTimeout(() => {
    coin.style.transform = "rotateY(270deg)";
    setTimeout(() => {
      coin.src = tailsImg;
      coin.style.transform = "rotateY(540deg)";
      setTimeout(() => {
        coin.src = chosenImg;
        msg.innerText = chosenText + "!\n" + (isHeads ? "You go first" : "You go second");
        setTimeout(() => {
          modal.remove();
          if (onResult) onResult(isHeads ? "player" : "enemy");
        }, 1300);
      }, 450); // second half of the spin
    }, 550); // half-spin duration
  }, 400);
}


// SERVER SYNCHING //
function emitPublicState() {
  if (!window.socket || !window.currentRoomId) return;
  const publicState = {
    deckCount: gameState.playerDeck.length,
    handCount: gameState.playerHand.length,
    creatures: gameState.playerCreatures.map(stripCardForSync),
    terrains: gameState.playerTerrains.map(stripCardForSync),
    fallenCards: gameState.playerFallen.map(stripCardForSync),
    phase: gameState.phase,
    turn: gameState.turn
  };
  window.socket.emit('player state', window.currentRoomId, publicState);
}

// Helper: Only send public info!
function stripCardForSync(card) {
  return {
    cardId: card.cardId,
    instanceId: card.instanceId,
    currentHP: card.currentHP,
    orientation: card.orientation,
    essence: card.essence,
    // Add more as needed for your UI, but don't include full hand if not public!
  };
}
// Always open deck selection modal on slot click in Modes
document.getElementById('mode-player-deck-tile').onclick = function (e) {
  if (window.showPlayerDeckModal)
    window.showPlayerDeckModal();
};

// --- Game state factory: canonical initial state for a fresh match ---
// Use this wherever you need a clean/new game state (startGame, resetGameState, tests, etc.)
function getInitialGameState() {
  return {
    // Zones
    playerDeck: [],
    playerHand: [],
    playerCreatures: [],
    playerTerrains: [],
    playerFallen: [],
    enemyDeck: [],
    enemyHand: [],
    enemyCreatures: [],
    enemyTerrains: [],
    enemyFallen: [],
    playerFallen: [],
    enemyFallen: [],
  
    // Domain / meta
    playerDomain: null,
    enemyDomain: null,

    // Essence pools (keep as map of colors)
    essencePools: {
      player: { green:0, red:0, blue:0, yellow:0, purple:0, gray:0, black:0, white:0 },
      enemy: { green:0, red:0, blue:0, yellow:0, purple:0, gray:0, black:0, white:0 }
    },

    gameLog: [],
    turnNumber: 0,
    turn: "player",
    phase: "start",
  };
}

// --- Reset the whole match state to a clean initial state ---
// Replaces the previous, partial reset function.
function resetGameState() {
  // Replace the global gameState object with a fresh initial state
  gameState = getInitialGameState();

  // Clear or reset any auxiliary runtime structures your engine uses:
  // - status/event queues, animation queues, attack mode, global timers, UI selections, etc.
  // Only clear those that are present in your codebase; the examples below are common ones.
  try { 
    if (typeof eventQueue !== 'undefined' && Array.isArray(eventQueue)) eventQueue.length = 0;
  } catch (e) {}
  try {
    if (typeof queuedTriggers !== 'undefined' && Array.isArray(queuedTriggers)) queuedTriggers.length = 0;
  } catch (e) {}

  // Close or clear modals / menus that could remain open
  try { closeAllMenus(); } catch (e) {}
  try { closeAllModals(); } catch (e) {}

  // Reset UI to mode-select
  try {
    renderGameState && renderGameState();
    setupDropZones && setupDropZones();
  } catch (err) {
    console.warn('resetGameState: render/setup error', err);
  }

  // Optionally hide gameplay UI and show mode select (your existing behavior)
  const gameplaySection = document.getElementById('gameplay-section');
  const modeSelectSection = document.getElementById('mode-select-section');
  if (gameplaySection) gameplaySection.classList.remove('active');
  if (modeSelectSection) modeSelectSection.classList.add('active');

  // Hide profiles if required
  const myProfile = document.getElementById('my-profile');
  const enemyProfile = document.getElementById('enemy-profile');
  if (myProfile) myProfile.style.display = 'none';
  if (enemyProfile) enemyProfile.style.display = 'none';
}
// Re-render when needed (after deck changes)
if (window.renderDeckSelection) {
  const origRender = window.renderDeckSelection;
  window.renderDeckSelection = function() {
    origRender.apply(this, arguments);
    renderModePlayerDeckTile();
  };
}
// CARD IMAGE FOR LOG
function cardImgLog(card, {
  extraClass = "",
  border = "",
  width = 38,
  rotate = 0,
  borderRadius = "",
  marginRight = "",
  cursor = "pointer",
  style = "",
  who = "player",
  action = "",
  isDraw = false,
  showCardback = false
} = {}) {
  const cardId = card?.cardId || "";
  const instanceId = card?.instanceId || "";
  // If drawing to hand AND it's the enemy's log, show cardback
  if (showCardback) {
    let cardback = window.selectedenemyDeck?.cardbackArt
      || gameState.enemyProfile?.cardbackArt
      || "Images/Cardback/Default.png";
    return `<img class="log-card-img ${extraClass}" src="${cardback}" data-cardid="${card.cardId}" title="Cardback" style="border:2px solid #e25555;width:${width}px;vertical-align:middle;">`;
  }
  // Otherwise show actual card
  if (!card || !card.image) return "";
  const borderStyle = border || `2px solid ${who === 'player' ? '#6f6' : '#e25555'}`;
  // Compose style string
  let styleStr = `border: ${borderStyle}; width:${width}px; vertical-align:middle; cursor:${cursor};`;
  if (borderRadius) styleStr += ` border-radius:${borderRadius};`;
  if (rotate) styleStr += ` transform:rotate(${rotate}deg);`;
  if (marginRight) styleStr += ` margin-right:${marginRight};`;
  if (style) styleStr += ` ${style}`;
  return `<img class="log-card-img ${extraClass}" src="${card.image}" 
    data-cardid="${cardId}" data-instanceid="${instanceId}" title="${card.name}" 
    style="${styleStr}">`;
}
function zoneImgLog(zone) {
  const zoneIcons = {
    Fallen: "Icons/Other/Fallen.png",
    Deck: "Icons/Other/BlueDeckBox.png",
    Hand: "Icons/Other/Hand.png",
    Terrains: "Icons/Other/Terrains.png",
    Creatures: "Icons/Other/Creatures.png",    
      // Add more as needed
  };  
  return `<img class="log-zone-img" src="${zoneIcons[zone] || ''}" title="${zone}" style="width:32px;vertical-align:middle;">`;
}
// LOG LOGIC
function renderLogAction({
  sourceCard,        // { image, name, cardId }
  action,            // "move", "attack", "target", etc.
  dest,              // { image, name, cardId } OR "Fallen"/"Deck"/"Hand"/etc
  who = "player"     // "player" or "enemy"
}, isMe = true) {
const actionIcons = {
  move: "Icons/Other/Move.png",
  attack: "Icons/Other/Attack.png",
  effect: "Icons/Other/Effect.png",
  draw: "Icons/Other/Move.png",
    // Add more as needed
};
let showCardback = action === "draw" && !isMe;
let destHtml = typeof dest === "string"
  ? zoneImgLog(dest)
  : cardImgLog(dest, { who, action, isDraw: dest?.isDraw, showCardback });
let entryHtml = `
  <div class="log-action ${who}" style="background:${who === 'player' ? '#232' : '#322'}11;border-radius:7px;display:inline-flex;align-items:center;">
    ${cardImgLog(sourceCard, { who, action, isDraw: sourceCard?.isDraw, showCardback })}
    <span class="log-arrow" style="margin:0 7px 0 7px;">
      <img src="${actionIcons[action] || actionIcons.move}" alt="${action}" style="width:32px;height:32px;vertical-align:middle;">
    </span>
    ${destHtml}
  </div>
`;
  return entryHtml;
}

// ATTACK LOG
function appendAttackLog({ attacker, defender, defenderOrientation, who = "player" }, fromSocket = false, isMe = true) {
  // Get card data
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  const defenderDef = dummyCards.find(c => c.id === defender.cardId);

  // Compose the log HTML (same as before)
  let logHtml = `<div class="log-action attack ${who}" style="background:${who === 'player' ? '#232' : '#322'}11;border-radius:7px;display:inline-flex;align-items:center;">`;
  logHtml += cardImgLog(attackerDef, { width: 38, who });
  logHtml += `<img src="Icons/Other/Attack.png" alt="Attack" style="width:32px;height:32px;vertical-align:middle;margin:0 9px;">`;
  logHtml += cardImgLog(defenderDef, { width: 38, marginLeft: "8px", who, rotate: defenderOrientation === "horizontal" ? 90 : 0 });
  logHtml += `</div>`;

  // NEW: write to state
  addGameLogEntry({
    type: "attack",
    who,
    html: logHtml,
    attacker,
    defender,
    defenderOrientation
  });

  // Only emit if not from socket
  if (!fromSocket && window.socket && window.currentRoomId) {
    const obj = {
      attacker,
      defender,
      defenderOrientation,
      who,
      sender: gameState.playerProfile?.username || "me",
      type: "attack"
    };
    window.socket.emit('game action log', window.currentRoomId, obj);
  }
}

window.socket.on('game action log', (obj) => {
  const myName = gameState.playerProfile?.username || "me";
  const isMe = obj.sender && obj.sender === myName;
  if (isMe) return;
  if (obj.type === "attack") {
    appendAttackLog(obj, true, false);
  } else {
    appendVisualLog(obj, true, false);
  }
});

// CONDITIONAL TARGETS FOR SKILL ACTIVATION //
function getValidTargetsByCondition(cardArr, conditionArr) {
  return cardArr.filter(cardObj => {
    return conditionArr.every(cond => {
      // Status check
      if (cond.status) {
        if (!cardObj.statuses || !cardObj.statuses.some(s => s.name === cond.status)) return false;
      }
      // Owner check
      if (cond.owner) {
        if (cond.owner === "player" && !(gameState.playerCreatures.includes(cardObj) || gameState.playerTerrains.includes(cardObj))) return false;
        if (cond.owner === "enemy" && !(gameState.enemyCreatures.includes(cardObj) || gameState.enemyTerrains.includes(cardObj))) return false;
      }
      // Category/type check (from dummyCards)
      const cardData = dummyCards.find(c => c.id === cardObj.cardId);
      if (!cardData) return false;
      if (cond.category) {
        if (typeof cardData.category === "string" && cardData.category.toLowerCase() !== cond.category.toLowerCase()) return false;
        if (Array.isArray(cardData.category) && !cardData.category.map(c => c.toLowerCase()).includes(cond.category.toLowerCase())) return false;
      }
      if (cond.type) {
        if (typeof cardData.type === "string" && cardData.type.toLowerCase() !== cond.type.toLowerCase()) return false;
        if (Array.isArray(cardData.type) && !cardData.type.map(t => t.toLowerCase()).includes(cond.type.toLowerCase())) return false;
      }
      // More checks can be added here
      return true;
    });
  });
}
// SEARCH CRITERIA FILTER
function filterCardsByCriteria(cardArr, criteria) {
  return cardArr.filter(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    if (!cardData) return false;
    for (let key in criteria) {
      if (typeof cardData[key] === 'string') {
        if (cardData[key].toLowerCase() !== criteria[key].toLowerCase()) return false;
      } else if (Array.isArray(cardData[key])) {
        if (!cardData[key].map(v => v.toLowerCase()).includes(criteria[key].toLowerCase())) return false;
      } else {
        if (cardData[key] !== criteria[key]) return false;
      }
    }
    return true;
  });
}

// APPEND TO LOG (state-driven; modal renders from gameState.gameLog)
function appendVisualLog(obj, fromSocket = false, isMe = true) {
  if (!obj) return;

  // If attack events have a dedicated renderer, use it and exit.
  // This prevents inconsistent formatting / duplicate entries.
  if (obj.type === "attack" && typeof appendAttackLog === "function") {
    appendAttackLog(obj, fromSocket, isMe);
    return;
  }

  const type = obj.type || "action";
  const who = obj.who || (isMe ? "player" : "enemy");

  let logHtml = "";

  if (type === "move") {
    const cardDef = dummyCards.find(c => c.id === obj.card?.cardId) || null;
    const cardName = cardDef?.name || "Card";

    logHtml = `
      <div class="log-action move ${who}" style="display:flex;align-items:center;gap:8px;">
        ${cardImgLog(cardDef, { size: 32, who })}
        <span>${cardName} moved from ${zoneImgLog(obj.from)} to ${zoneImgLog(obj.to)}</span>
      </div>
    `;
  } else if (type === "damage") {
    const cardDef = dummyCards.find(c => c.id === obj.card?.cardId) || null;
    const amt = Number(obj.amount || 0);

    logHtml = `
      <div class="log-action damage ${who}" style="display:flex;align-items:center;gap:8px;">
        ${cardImgLog(cardDef, { size: 32, who })}
        <span>took ${amt} damage</span>
      </div>
    `;
  } else if (type === "skill") {
    const cardDef = dummyCards.find(c => c.id === obj.card?.cardId) || null;
    const skillName = obj.skillName || "skill";

    logHtml = `
      <div class="log-action skill ${who}" style="display:flex;align-items:center;gap:8px;">
        ${cardImgLog(cardDef, { size: 32, who })}
        <span>activated ${skillName}</span>
      </div>
    `;
  } else {
    logHtml = `
      <div class="log-action ${type} ${who}" style="display:flex;align-items:center;gap:8px;">
        <span>${type}</span>
      </div>
    `;
  }

  // Store in game state (source of truth)
  if (!Array.isArray(gameState.gameLog)) gameState.gameLog = [];

  gameState.gameLog.push({
    type,
    who,
    html: logHtml,
    timestamp: Date.now(),
    data: obj
  });

  // Limit log size
  const MAX_LOG = 100;
  if (gameState.gameLog.length > MAX_LOG) {
    gameState.gameLog = gameState.gameLog.slice(-MAX_LOG);
  }
}

function normalizeTargetFilter(step = {}) {
  // Accept both new (targetX) and legacy (x) keys
  const get = (tKey, legacyKey) =>
    step[tKey] !== undefined ? step[tKey] : step[legacyKey];

  const filter = {
    category: get('targetCategory', 'category'),
    color: get('targetColor', 'color'),
    type: get('targetType', 'type'),
    archetype: get('targetArchetype', 'archetype'),
    ability: get('targetAbility', 'ability'),
    // you can extend: rarity, set, hpMin, atkMin, etc.
  };

  // Remove undefined/empty
  Object.keys(filter).forEach(k => {
    if (filter[k] === undefined || filter[k] === null || filter[k] === '') delete filter[k];
  });

  return filter;
}
function cardMatchesTargetFilter(cardObj, filter = {}) {
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardData) return false;

  const matchesField = (fieldVal, wanted) => {
    if (wanted === undefined) return true;

    // wanted can be string or array
    const wantedArr = Array.isArray(wanted) ? wanted : [wanted];

    if (Array.isArray(fieldVal)) {
      const hay = fieldVal.map(v => String(v).toLowerCase());
      return wantedArr.every(w => hay.includes(String(w).toLowerCase()));
    }

    const hay = String(fieldVal || '').toLowerCase();
    return wantedArr.every(w => hay === String(w).toLowerCase());
  };

  // ability special-case: abilities are usually arrays
  if (filter.ability !== undefined) {
    const abilities = Array.isArray(cardData.ability) ? cardData.ability : (cardData.ability ? [cardData.ability] : []);
    const wanted = Array.isArray(filter.ability) ? filter.ability : [filter.ability];
    const hay = abilities.map(a => String(a).toLowerCase());
    if (!wanted.every(w => hay.includes(String(w).toLowerCase()))) return false;
  }
  if (!matchesField(cardData.category, filter.category)) return false;
  if (!matchesField(cardData.color, filter.color)) return false;
  if (!matchesField(cardData.type, filter.type)) return false;
  if (!matchesField(cardData.archetype, filter.archetype)) return false;
  return true;
}

function filterCardInstancesByTarget(instances = [], step = {}) {
  const filter = normalizeTargetFilter(step);
  return instances.filter(cardObj => cardMatchesTargetFilter(cardObj, filter));
}
function normalizeEssence(str) {
  return String(str || '').replace(/\{([^}]+)\}/g, (_, rawTok) => {
    const tok = String(rawTok).trim();

    // {g2} => {G}{G}
    const colored = tok.match(/^([gruypcbw])(\d+)$/i);
    if (colored) {
      const code = colored[1].toUpperCase();
      const amount = Number(colored[2]);
      return Array.from({ length: amount }, () => `{${code}}`).join('');
    }

    // {x2} => {2}
    const generic = tok.match(/^x(\d+)$/i);
    if (generic) {
      return `{${Number(generic[1])}}`;
    }

    // plain single essence like {g}
    if (/^[gruypcbw]$/i.test(tok)) {
      return `{${tok.toUpperCase()}}`;
    }

    // leave plain numbers as-is
    if (/^\d+$/.test(tok)) {
      return `{${tok}}`;
    }

    return `{${tok.toUpperCase()}}`;
  });
}
function canPayEssence(cardObj, costStr) {
  if (!costStr) return true;

  const colorCodes = "GRUYCPBW";

  // Normalize both sides so lower/upper case costs work
  const normalizedCostStr = normalizeEssence(costStr);
  let availableEssenceStr = normalizeEssence(cardObj.essence || "");

  const costRequirements = {};
  let colorlessNeeded = 0;

  for (let code of colorCodes) {
    const need = countEssenceType(normalizedCostStr, code);
    if (need > 0) costRequirements[code] = need;
  }

  const colorlessMatches = normalizedCostStr.match(/\{([1-9]|1[0-9]|20)\}/g) || [];
  if (colorlessMatches.length) {
    colorlessNeeded = colorlessMatches
      .map(m => Number(m.replace(/[{}]/g, "")))
      .reduce((a, b) => a + b, 0);
  }

  for (let code of colorCodes) {
    const need = costRequirements[code] || 0;
    const have = countEssenceType(availableEssenceStr, code);
    if (have < need) return false;

    for (let i = 0; i < need; i++) {
      availableEssenceStr = availableEssenceStr.replace(new RegExp(`\\{${code}\\}`, 'i'), "");
    }
  }

  if (colorlessNeeded > 0) {
    const available = getTotalEssence(availableEssenceStr);
    if (available < colorlessNeeded) return false;
  }

  return true;
}

function getTotalEssence(essenceStr) {
  // Counts all essence units, colored and colorless
  if (typeof essenceStr !== "string") return 0;
  const matches = essenceStr.match(/\{([GRUYCPBW]|[1-9]|1[0-9]|20)\}/g);
  return matches ? matches.length : 0;
}

// --------------- //
// ANIMATION LOGIC //
// --------------- //

// --- DEFEAT (KO) ANIMATION --- //
// Fades a card out in-place (from its current zone) then calls afterAnim.
// No destination zone required.
// --- FIELD LANDING ANIMATION (hand -> field) --- //
function animateFieldLanding(cardObj, zoneId, callback) {
  const cardDiv = findCardDivInZone(zoneId, cardObj.instanceId);
  if (!cardDiv) { callback && callback(); return; }

  cardDiv.classList.remove('field-land');
  void cardDiv.offsetWidth;

  cardDiv.classList.add('field-land');

  // Match CSS duration
  setTimeout(() => {
    cardDiv.classList.remove('field-land');
    callback && callback();
  }, 320);
}
function animateDefeat(instanceId, fromZoneId, afterAnim) {
  if (!fromZoneId) { afterAnim && afterAnim(); return; }

  const fromZone = document.getElementById(fromZoneId);
  if (!fromZone) { afterAnim && afterAnim(); return; }

  const cardDiv = Array.from(fromZone.querySelectorAll('.card-battlefield')).find(div =>
    div.dataset.instanceId === instanceId
  );
  if (!cardDiv) { afterAnim && afterAnim(); return; }

  // Restart animation reliably
  cardDiv.classList.remove('card-fade-out');
  void cardDiv.offsetWidth;

  cardDiv.classList.add('card-fade-out');

  // Match your CSS animation/transition duration for fade-out
  setTimeout(() => afterAnim && afterAnim(), 220);
}
// --- ATTACK ANIMATION LOGIC ---
function animateAttack(cardObj, zoneId, callback) {
  const cardDiv = findCardDivInZone(zoneId, cardObj.instanceId);
  if (!cardDiv) { callback && callback(); return; }

  // Remove previous animation classes
  cardDiv.classList.remove('attack-lunge', 'flipping', 'show-back', 'shake-hit');
  void cardDiv.offsetWidth; // force reflow

  // Attacker lunges forward
  cardDiv.classList.add('attack-lunge');
  setTimeout(() => {
    cardDiv.classList.remove('attack-lunge');
    // Optional: add a slight flash or color change (can add a class here)
    if (callback) callback();
  }, 300); // match attack-lunge animation duration
}
function animateDefenderHit(cardObj, zoneId, callback) {
  const cardDiv = findCardDivInZone(zoneId, cardObj.instanceId);
  if (!cardDiv) { callback && callback(); return; }

  cardDiv.classList.remove('shake-hit');
  void cardDiv.offsetWidth; // force reflow
  cardDiv.classList.add('shake-hit');
  setTimeout(() => {
    cardDiv.classList.remove('shake-hit');
    if (callback) callback();
  }, 220); // match shake-hit animation duration
}
function animateCardRotation(cardObj, zoneId, prevOrientation, newOrientation, callback) {
  const cardDiv = findCardDivInZone(zoneId, cardObj.instanceId);
  if (!cardDiv) { if (callback) callback(); return; }

  cardDiv.classList.remove("vertical", "horizontal");
  cardDiv.classList.add(prevOrientation);
  void cardDiv.offsetWidth;

  setTimeout(() => {
    cardDiv.classList.remove(prevOrientation);
    cardDiv.classList.add(newOrientation);
  }, 10);

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    cardDiv.removeEventListener("transitionend", handler);
    callback && callback();
  };

  function handler(e) {
    if (e.propertyName === "transform") finish();
  }

  cardDiv.addEventListener("transitionend", handler);
  setTimeout(finish, 450);
}
function animateSkillActivation(cardObj, zoneId, callback) {
  const cardDiv = findCardDivInZone(zoneId, cardObj.instanceId);
  if (!cardDiv) { callback && callback(); return; }

  // Remove previous effect if present
  cardDiv.classList.remove('skill-activation-anim');
  void cardDiv.offsetWidth; // force reflow

  // Add animation effect
  cardDiv.classList.add('skill-activation-anim');

  // Remove effect after animation (match CSS duration)
  setTimeout(() => {
    cardDiv.classList.remove('skill-activation-anim');
    if (callback) callback();
  }, 400); // 0.4s duration, adjust if needed
}

// Add this helper if not already present
function animateHandCardAction(cardObj, handZoneId = 'player-hand', callback) {
  const handDiv = document.getElementById(handZoneId);
  if (!handDiv) { callback && callback(); return; }

  const cardDiv = Array.from(handDiv.querySelectorAll('.card-battlefield')).find(div =>
    div.dataset.instanceId === cardObj.instanceId
  );
  if (!cardDiv) { callback && callback(); return; }

  cardDiv.classList.add('card-fade-out');
  setTimeout(() => {
    cardDiv.classList.remove('card-fade-out');
    callback && callback();
  }, 220); // match CSS
}

// HAND SKILLS //
function runHandSkillWithAnimation(cardObj, skillObj, destinationArray, callback) {
  // 1. Activation animation (use your existing logic)
  animateSkillActivation(cardObj, 'player-hand', () => {
    // 2. Resolution animation (fade out)
    animateHandCardAction(cardObj, () => {
      moveCard(cardObj.instanceId, gameState.playerHand, destinationArray);
      renderGameState();
      setupDropZones();
      if (callback) callback();
    });
  });
}
function animateCardFade(instanceId, fromZoneId, toZoneId, callback) {
  // Find the card div in the fromZone
  const fromZone = document.getElementById(fromZoneId);
  if (!fromZone) { callback && callback(); return; }
  const cardDiv = Array.from(fromZone.querySelectorAll('.card-battlefield')).find(div => {
    return div.dataset.instanceId === instanceId;
  });
  if (!cardDiv) { callback && callback(); return; }

  // Fade out
  cardDiv.classList.add('card-fade-out');
  setTimeout(() => {
    // After fade out, run the callback (move card in state), then fade in at destination
    callback && callback();

    // Allow fade-in at destination (after next render)
    setTimeout(() => {
      const toZone = document.getElementById(toZoneId);
      if (!toZone) return;
      const newCardDiv = Array.from(toZone.querySelectorAll('.card-battlefield')).find(div => {
        return div.dataset.instanceId === instanceId;
      });
      if (newCardDiv) {
        newCardDiv.classList.add('card-fade-in');
        setTimeout(() => newCardDiv.classList.remove('card-fade-in'), 200);
      }
    }, 30);
  }, 180);
}
function animateEssencePop(icon) {
  icon.classList.add('essence-pop');
  icon.addEventListener('animationend', () => {
    icon.classList.remove('essence-pop');
  }, { once: true });
}

/*------------------------------------
// SKILL RESOLUTION LOGIC //
------------------------------------*/
function triggerSelfSkill(cardObj, eventType, context = {}, onComplete) {
  if (!cardObj || !cardObj.skill) {
    onComplete && onComplete();
    return;
  }

  const skills = Array.isArray(cardObj.skill) ? cardObj.skill : [cardObj.skill];
  const matchingSkills = skills.filter(skill => skill && skill.trig === eventType);

  if (matchingSkills.length === 0) {
    onComplete && onComplete();
    return;
  }

  let i = 0;
  function next() {
    if (i >= matchingSkills.length) {
      onComplete && onComplete();
      return;
    }

    const skillObj = matchingSkills[i++];
    resolveSkill(cardObj, skillObj, context, next);
  }

  next();
}

function canActivateSkill(cardObj, skillObj, currentZone, gameState, targetObj = null) {
  // 1. REQUIREMENTS: All must pass their handler's canActivate
  let requirements = [];
  if (skillObj.req) {
    requirements = Array.isArray(skillObj.req)
      ? skillObj.req
      : [skillObj.req];
  } else if (skillObj.requirement) {
    requirements = Array.isArray(skillObj.requirement)
      ? skillObj.requirement
      : [skillObj.requirement];
  } else if (skillObj.activation && skillObj.activation.requirement) {
    requirements = Array.isArray(skillObj.activation.requirement)
      ? skillObj.activation.requirement
      : [skillObj.activation.requirement];
  }

  for (const req of requirements) {
    const reqKey = typeof req === 'object' && req.class ? req.class : req;
    const reqDef = REQ_MAP[reqKey];
    if (reqDef && typeof reqDef.canActivate === 'function') {
      if (!reqDef.canActivate.call(reqDef, cardObj, skillObj, currentZone, gameState, req)) return false;
    }
  }

  // 2. EFFECTS: All effect handlers' canActivate must pass (if defined)
  let effectObjs = [];
  if (skillObj.effect) {
    effectObjs = Array.isArray(skillObj.effect) ? skillObj.effect : [skillObj.effect];
  } else if (skillObj.resolution && skillObj.resolution.effect) {
    effectObjs = Array.isArray(skillObj.resolution.effect)
      ? skillObj.resolution.effect
      : [skillObj.resolution.effect];
  }
  for (const effect of effectObjs) {
    const effectKey = typeof effect === 'object' && effect.class ? effect.class : effect;
    const effectDef = EFF_MAP[effectKey];
    if (effectDef && typeof effectDef.canActivate === 'function') {
      if (!effectDef.canActivate(cardObj, skillObj, currentZone, gameState, effect)) return false;
    }
  }

  // 3. Status Effects
  if (cardObj._paralyzed || cardObj._frozen) return false;
  if (cardObj.canActivateSkill === false) return false;

// 4. Cost - CHECK THE PLAYER'S ESSENCE POOL
if (skillObj.cost && skillObj.cost !== '{0}') {
  // Determine whose pool should be used.
  // For hand activations, infer owner from which hand contains the card.
  const inPlayerHand = gameState.playerHand && gameState.playerHand.includes(cardObj);
  const inenemyHand = gameState.enemyHand && gameState.enemyHand.includes(cardObj);

  let poolOwner = 'player';
  if (inenemyHand) poolOwner = 'enemy';
  else if (inPlayerHand) poolOwner = 'player';
  else {
    // Field/other zones: fall back to owner resolver
    const owner = getCardOwner(cardObj);
    if (owner === 'enemy') poolOwner = 'enemy';
  }

  const pool = getEssencePool(poolOwner) || {};

  // Convert pool -> essence string for canPayEssence (colored only)
  let poolEssenceStr = '';
  const map = {
    green: 'G', red: 'R', blue: 'U', yellow: 'Y',
    purple: 'P', gray: 'C', black: 'B', white: 'W'
  };

  for (const [type, amount] of Object.entries(pool)) {
    const n = Number(amount || 0);
    if (n <= 0) continue;
    const code = map[type];
    if (!code) continue;
    for (let i = 0; i < n; i++) poolEssenceStr += `{${code}}`;
  }

  if (!canPayEssence({ essence: poolEssenceStr }, skillObj.cost)) {
    return false;
  }
}

  // 5. Target validation (OPTIONAL: handled in effect handler or here)
  if (skillObj.target) {
    const targets = getTargets(skillObj.target, cardObj);
    if (!targets || targets.length === 0) return false;
  }
  
  return true;
}
function isZeroParsedCost(parsedCost) {
  if (!parsedCost) return true;
  // parsedCost is an object like { green: 1 } or { colorless: 2 }
  const vals = Object.values(parsedCost).map(v => Number(v || 0));
  return vals.length === 0 || vals.reduce((a, b) => a + b, 0) === 0;
}
// Update activateSkill to use the animation before requirements/effects
function activateSkill(cardObj, skillObj, options = {}) {
  const zoneId = findZoneIdForCard(cardObj);
  const owner = getCardOwner(cardObj); // 'player' | 'enemy'
  const cardData = dummyCards.find(c => c.id === cardObj.cardId) || {};

  // Always use the SKILL cost (not cardData.cost)
  const rawCost = skillObj.cost || '{0}';
  const parsedCost = rawCost ? parseCost(rawCost) : null;

  const runAfterPayment = () => {
    // Payment already satisfied (or cost was free) -> resolve
    proceedSkillActivation(cardObj, skillObj, options);
  };

  // Free / zero-cost: skip payment modal entirely
  if (!skillObj.cost || rawCost === '{0}' || isZeroParsedCost(parsedCost)) {
    // keep animation behavior consistent
    if (skillObj.activation && skillObj.activation.handler) {
      skillObj.activation.handler(cardObj, skillObj, runAfterPayment);
    } else {
      animateSkillActivation(cardObj, zoneId, runAfterPayment);
    }
    return;
  }

  // Paid skill: open essence modal
  const openPaymentModal = () => {
    showEssencePaymentModal({
      card: cardData,
      cost: parsedCost,
      owner,
      onPaid: runAfterPayment,
      onCancel: () => {} // optional
    });
  };

  if (skillObj.activation && skillObj.activation.handler) {
    skillObj.activation.handler(cardObj, skillObj, openPaymentModal);
  } else {
    animateSkillActivation(cardObj, zoneId, openPaymentModal);
  }
}

function getSkillActivation(skillObj = {}) {
  const a = skillObj.activation || {};
  return {
    zone: Array.isArray(a.zone) ? a.zone : (a.zone ? [a.zone] : []),
    summon: !!a.summon,
    attack: !!a.attack,
    echo: !!a.echo,
    void: !!a.void,
    tap: !!a.tap,
    discard: Number(a.discard || 0),
    sacrifice: Number(a.sacrifice || 0),
    stash: !!a.stash,
    channel: !!a.channel,
    filter: a.filter || {}
  };
}
// Helper to get requirement(s) for a skill
function getSkillRequirements(skillObj = {}) {
  let reqs = [];

  if (skillObj.requirement) {
    reqs = Array.isArray(skillObj.requirement)
      ? skillObj.requirement
      : [skillObj.requirement];
  } else if (skillObj.activation && skillObj.activation.requirement) {
    reqs = Array.isArray(skillObj.activation.requirement)
      ? skillObj.activation.requirement
      : [skillObj.activation.requirement];
  }

  return reqs.map(req =>
    typeof req === 'string' ? { class: req.toLowerCase() } : { ...req, class: String(req.class || '').toLowerCase() }
  );
}

function proceedSkillActivation(cardObj, skillObj, options = {}) {
  let requirements = [];

  if (skillObj.req) {
    requirements = Array.isArray(skillObj.req)
      ? skillObj.req
      : [skillObj.req];
  } else if (skillObj.requirement) {
    requirements = Array.isArray(skillObj.requirement)
      ? skillObj.requirement
      : [skillObj.requirement];
  } else if (skillObj.activation && skillObj.activation.requirement) {
    requirements = Array.isArray(skillObj.activation.requirement)
      ? skillObj.activation.requirement
      : [skillObj.activation.requirement];
  }

  function runRequirements(i) {
    if (i >= requirements.length) {
      resolveSkill(cardObj, skillObj, options.context || {}, options.onComplete);
      renderGameState();
      return;
    }

    const req = requirements[i];
    const reqKey = typeof req === 'object' && req.class ? req.class : req;
    const reqDef = REQ_MAP[reqKey];

    if (!reqDef || typeof reqDef.handler !== 'function') {
      runRequirements(i + 1);
      return;
    }

    reqDef.handler.call(reqDef, cardObj, skillObj, () => runRequirements(i + 1));
  }

  runRequirements(0);
}

// EFFECT RESOLUTION LOGIC //
function resolveSkill(cardObj, skillObj, context = {}, onComplete) {
  // Support both legacy and new skill schemas
  const effect =
    skillObj.effect ??
    skillObj.resolution?.effect ??
    skillObj.effects ??
    null;

  // Normalize effect into an array of effect objects
  let effectSteps = [];
  if (Array.isArray(effect)) {
    effectSteps = effect;
  } else if (effect && typeof effect === "object" && effect.class) {
    effectSteps = [effect];
  } else if (typeof effect === "string") {
    effectSteps = [{ class: effect }];
  } else {
    if (onComplete) onComplete();
    return;
  }

  let i = 0;
  function nextEffect() {
    if (i >= effectSteps.length) {
      if (onComplete) onComplete();
      return;
    }
    const step = effectSteps[i++];
    try {
      step.availableTargets = getTargetsFromEffect(step, cardObj, context);
    } catch (e) {
      step.availableTargets = [];
    }

    const className = step.class;
    const handler = EFF_MAP[className?.toLowerCase?.() || className] || EFF_MAP[className];
    if (!handler || !handler.handler) {
      nextEffect();
      return;
    }

    if (handler.handler.length >= 4) {
      handler.handler(cardObj, skillObj, step, nextEffect);
    } else if (handler.handler.length === 3) {
      handler.handler(cardObj, skillObj, nextEffect);
    } else {
      handler.handler(cardObj, skillObj);
      nextEffect();
    }
  }
  nextEffect();
}
function startSkillTarget(validTargets, onSelect, opts = {}) {
  // Remove any previous highlights and handlers
  document.querySelectorAll('.target-highlight, .selected').forEach(el => {
    el.classList.remove('target-highlight', 'selected');
    el.onclick = null;
  });

  battlefield.classList.add('skill-mode-backdrop');
  let selected = [];

  validTargets.forEach(cardObj => {
    // Find card DOM in all field zones
    const zoneIds = [
      'player-creature-zone', 'player-support-zone',
      'enemy-creature-zone', 'enemy-support-zone'
    ];
    let cardDiv = null;
    for (const zoneId of zoneIds) {
      cardDiv = findCardDivInZone(zoneId, cardObj.instanceId);
      if (cardDiv) break;
    }
    if (cardDiv) {
      cardDiv.classList.add('target-highlight');
      cardDiv.onclick = function(e) {
        e.stopPropagation();
        if (selected.includes(cardObj)) {
          // Deselect
          selected = selected.filter(c => c !== cardObj);
          cardDiv.classList.remove('selected');
        } else {
          // Enforce count limit if set
          if (opts.count && selected.length >= opts.count) return;
          selected.push(cardObj);
          cardDiv.classList.add('selected');
        }
        // Confirm if count is met
        if (opts.count && selected.length === opts.count) {
          cleanup();
          onSelect([...selected]);
        }
      };
    }
  });

  // Confirm button for any selection if no count set (optional)
  if (!opts.count) {
    showConfirmBtn();
  }

  function showConfirmBtn() {
    if (document.getElementById('skill-confirm-btn')) return;
    const btn = document.createElement('button');
    btn.textContent = opts.title || `Confirm Selection (${selected.length})`;
    btn.id = 'skill-confirm-btn';
    btn.style.position = 'fixed';
    btn.style.bottom = '40px';
    btn.style.right = '50vw';
    btn.style.zIndex = 1000;
    btn.onclick = () => {
      cleanup();
      onSelect([...selected]);
    };
    document.body.appendChild(btn);
  }

  function cleanup() {
    document.querySelectorAll('.target-highlight, .selected').forEach(el => {
      el.classList.remove('target-highlight', 'selected');
      el.onclick = null;
    });
    battlefield.classList.remove('skill-mode-backdrop');
    document.getElementById('skill-confirm-btn')?.remove();
    document.body.removeEventListener('click', cancelHandler);
  }

  // Cancel logic: clicking elsewhere
  function cancelHandler(e) {
    cleanup();
  }
  setTimeout(() => document.body.addEventListener('click', cancelHandler, { once: true }), 10);
}

// Build a normalized filter object for effect targeting.
// Supports shorthand fields like targetType/targetColor/etc, merged with step.filter.
function effectTargetFilter(step = {}) {
  const f = Object.assign({}, step.filter || {});

  // Shorthand -> canonical keys used by matchesFilter/fieldIncludes
  if (step.targetType != null)      f.type = step.targetType;
  if (step.targetColor != null)     f.color = step.targetColor;
  if (step.targetArchetype != null) f.archetype = step.targetArchetype;
  if (step.targetAbility != null)   f.ability = step.targetAbility;
  if (step.targetCategory != null)  f.category = step.targetCategory;
  return f;
}

// Small helper: apply the merged filter if it actually has keys
function applyEffectTargetFilter(arr, step) {
  const f = effectTargetFilter(step);
  if (!f || Object.keys(f).length === 0) return arr;
  return (arr || []).filter(c => matchesFilter(c, f));
}

function getTargetsFromEffect(step = {}, sourceCardObj = null, context = {}) {
  // Return a plain array of candidate card instances (no UI).
  try {
    // If the step explicitly prefilled availableTargets, return that (defensive)
    if (Array.isArray(step.availableTargets) && step.availableTargets.length) return step.availableTargets.slice();

    // If step.target is a number -> any card in the field is valid
    if (typeof step.target === 'number') {
      return [...gameState.playerCreatures, ...gameState.playerTerrains, ...gameState.enemyCreatures, ...gameState.enemyTerrains];
    }

    // If target is missing -> default to whole field (single target expected elsewhere)
    if (!step.target) {
      return [...gameState.playerCreatures, ...gameState.playerTerrains, ...gameState.enemyCreatures, ...gameState.enemyTerrains];
    }

    // If step.target is an object describing zone/filter, try using getTargets (existing helper)
    if (typeof step.target === 'object' && step.target && step.target.zone) {
      const arr = getTargets(step.target, sourceCardObj, context);
      if (Array.isArray(arr)) {
        return applyEffectTargetFilter(arr, step);
      }
    }

    // If step.zone provided (string like 'enemyCreatures')
    if (step.zone && typeof step.zone === 'string') {
      if (ZONE_MAP[step.zone]) {
        let arr = ZONE_MAP[step.zone].arr() || [];
        arr = applyEffectTargetFilter(arr, step);
        return arr.slice();
      }
      try {
        let arr = getTargets(step.zone, sourceCardObj, context);
        return applyEffectTargetFilter(arr, step);
      } catch (e) { /* continue to string cases below */ }
    }

    // If step.target is a string shorthand
    if (typeof step.target === 'string') {
      const key = step.target.trim();
      switch (key) {
        case 'targetEnemy':
        case 'enemy':
          return [...gameState.enemyCreatures, ...gameState.enemyTerrains];
        case 'targetPlayer':
        case 'player':
          return [...gameState.playerCreatures, ...gameState.playerTerrains];
        case 'targetHandEnemy':
          return Array.isArray(gameState.enemyHand) ? gameState.enemyHand.slice() : [];
        case 'targetHandPlayer':
          return Array.isArray(gameState.playerHand) ? gameState.playerHand.slice() : [];
        case 'targetFallenEnemy':
          return Array.isArray(gameState.enemyFallen) ? gameState.enemyFallen.slice() : [];
        case 'targetFallenPlayer':
          return Array.isArray(gameState.playerFallen) ? gameState.playerFallen.slice() : [];
        case 'targetFallen':
          // merged: player's void first, then enemy's
          return [
            ...(Array.isArray(gameState.playerFallen) ? gameState.playerFallen.slice() : []),
            ...(Array.isArray(gameState.enemyFallen) ? gameState.enemyFallen.slice() : [])
          ];
        case 'allCreature':
          return [...gameState.playerCreatures, ...gameState.enemyCreatures];
        case 'allTerrain':
          return [...gameState.playerTerrains, ...gameState.enemyTerrains];
        case 'any':
          return Object.values(gameState).flat().filter(card => card && card.cardId);
        default:
          // last resort: attempt to resolve via getTargets; some skill definitions may use the same names
          try {
            const arr = getTargets(key, sourceCardObj, context);
            if (Array.isArray(arr)) return arr;
          } catch (e) { /* ignore */ }
      }
    }
  } catch (err) {
    console.warn('getTargetsFromEffect error', err);
  }
  return [];
}
// Canonical orientation helper used by Disable/Enable, combat tap, and rotation effects.
// newOrientation: "vertical" (enabled/ATK) | "horizontal" (disabled/DEF)
function changeCardPosition(cardObj, newOrientation, onComplete) {
  try {
    if (!cardObj) return onComplete && onComplete();

    const prev = cardObj.orientation || 'vertical';
    const next = (newOrientation === 'horizontal') ? 'horizontal' : 'vertical';
    if (prev === next) return onComplete && onComplete();

    // Update state first (source of truth)
    cardObj.orientation = next;

    const zoneId = findZoneIdForCard(cardObj);

    // Animate if possible; otherwise just rerender.
    if (typeof animateCardRotation === 'function' && zoneId) {
      animateCardRotation(cardObj, zoneId, prev, next, () => {
        renderGameState && renderGameState();
        onComplete && onComplete();
      });
    } else {
      renderGameState && renderGameState();
      onComplete && onComplete();
    }
  } catch (err) {
    console.warn('changeCardPosition failed:', err);
    // Ensure the game doesn't get stuck in an async chain
    renderGameState && renderGameState();
    onComplete && onComplete();
  }
}
// Choose targets and display appropriate UI when needed.
// - step: the effect step (may contain .target or .zone or numeric .target)
// - onSelect(selectedArray) will be called with the chosen card instance(s)
// - opts: optional { title, multi(boolean), count(number), confirm(boolean) }
function chooseTargetsForEffect(step = {}, sourceCardObj = null, onSelect = () => {}, opts = {}) {
  // Normalize step.target count
  const count = (typeof step.target === 'number') ? Number(step.target) : (opts.count || (step.count || null));
  // If no explicit target and no number, default count=1 (single selection)
  const expectedCount = (count && Number(count) > 0) ? Number(count) : (opts.count || 1);

  // Determine the target kind/string to decide which UI to show
  const targetSpec = step.target || step.zone || null;

  // Field-based selections -> use existing startSkillTarget which highlights cards on battlefield
  if (!targetSpec || typeof targetSpec === 'number' || (typeof targetSpec === 'string' && ['targetenemy','targetPlayer','allCreature','allTerrain','any','enemy','player'].includes(String(targetSpec)))) {
    // Use getTargetsFromEffect to produce candidate array
    const candidates = getTargetsFromEffect(step, sourceCardObj);
    // startSkillTarget expects the list of card objects and will handle selection highlighting
    startSkillTarget(candidates, selected => {
      onSelect(Array.isArray(selected) ? selected : [selected]);
    }, { title: opts.title || step.title || null, count: expectedCount });
    return;
  }

  // Hand selections -> show modal listing those hand cards
  if (String(targetSpec) === 'targetHandenemy' || String(targetSpec) === 'targetHandPlayer') {
    const arr = getTargetsFromEffect(step, sourceCardObj);
    // For enemy hand: card objects may be concealed; we still present them in modal.
    showFilteredCardSelectionModal(arr, selected => {
      // selected may be a single card instance or an object depending on modal usage - normalize to array
      onSelect(Array.isArray(selected) ? selected : [selected]);
    }, {
      title: opts.title || step.title || 'Select from Hand',
      count: expectedCount
    });
    return;
  }

  // Fallen selections
  if (['targetFallenEnemy','targetFallenPlayer'].includes(String(targetSpec))) {
    const arr = getTargetsFromEffect(step, sourceCardObj);
    showFilteredCardSelectionModal(arr, selected => {
      onSelect(Array.isArray(selected) ? selected : [selected]);
    }, {
      title: opts.title || step.title || 'Select from fallen',
      count: expectedCount
    });
    return;
  }

  // Combined fallen modal: player's fallen first, enemy's below
  if (String(targetSpec) === 'targetFallen') {
    const playerFallen = Array.isArray(gameState.playerFallen) ? gameState.playerFallen.slice() : [];
    const enemyFallen = Array.isArray(gameState.enemyFallen) ? gameState.enemyFallen.slice() : [];

    // showBothFallenModal provides grouped UI (player first, then enemy)
    showBothFallenModal(playerFallen, enemyFallen, selected => {
      onSelect(Array.isArray(selected) ? selected : [selected]);
    }, { title: opts.title || 'Select from fallen', count: expectedCount });
    return;
  }

  const fallback = getTargetsFromEffect(step, sourceCardObj);
  startSkillTarget(fallback, selected => {
    onSelect(Array.isArray(selected) ? selected : [selected]);
  }, { title: opts.title || step.title || null, count: expectedCount });
}

// Small grouped modal for combined Fallens (player then enemy).
// Uses a lightweight modal to present player's void cards first, then enemy's below.
// onSelect receives the chosen card instance(s).
function showBothFallenModal(playerFallenArr = [], enemyFallenArr = [], onSelect = () => {}, opts = {}) {
  // Build a simple modal with two sections
  let modal = document.getElementById('both-fallen-modal');
  if (modal) modal.remove();
  modal = document.createElement('div');
  modal.id = 'both-fallen-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 99999;

  const content = document.createElement('div');
  content.className = 'modal-content';
  content.style.maxWidth = '90vw';
  content.style.maxHeight = '80vh';
  content.style.overflow = 'auto';
  content.onclick = e => e.stopPropagation();

  const title = document.createElement('h3');
  title.innerText = opts.title || 'Select from fallen';
  content.appendChild(title);

  const playerSection = document.createElement('div');
  playerSection.innerHTML = `<h4>Your Fallen</h4>`;
  playerSection.style.display = 'flex';
  playerSection.style.flexWrap = 'wrap';
  playerSection.style.gap = '12px';
  playerFallenArr.forEach(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId) || {};
    const div = document.createElement('div');
    div.className = 'card-battlefield';
    div.style.cursor = 'pointer';
    div.style.width = '100px';
    div.style.textAlign = 'center';
    const img = document.createElement('img');
    img.src = cardData.image || '';
    img.alt = cardData.name || '';
    img.style.width = '100%';
    div.appendChild(img);
    const lbl = document.createElement('div');
    lbl.style.fontSize = '0.85em';
    lbl.style.color = '#ffe066';
    lbl.textContent = cardData.name || cardObj.cardId;
    div.appendChild(lbl);
    div.onclick = () => {
      modal.remove();
      onSelect([cardObj]);
    };
    playerSection.appendChild(div);
  });
  content.appendChild(playerSection);

  const oppSection = document.createElement('div');
  oppSection.innerHTML = `<h4>Enemy Fallen</h4>`;
  oppSection.style.display = 'flex';
  oppSection.style.flexWrap = 'wrap';
  oppSection.style.gap = '12px';
  enemyFallenArr.forEach(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId) || {};
    const div = document.createElement('div');
    div.className = 'card-battlefield';
    div.style.cursor = 'pointer';
    div.style.width = '100px';
    div.style.textAlign = 'center';
    const img = document.createElement('img');
    img.src = cardData.image || '';
    img.alt = cardData.name || '';
    img.style.width = '100%';
    div.appendChild(img);
    const lbl = document.createElement('div');
    lbl.style.fontSize = '0.85em';
    lbl.style.color = '#fff';
    lbl.textContent = cardData.name || cardObj.cardId;
    div.appendChild(lbl);
    div.onclick = () => {
      modal.remove();
      onSelect([cardObj]);
    };
    oppSection.appendChild(div);
  });
  content.appendChild(oppSection);

  // Cancel button
  const cancel = document.createElement('button');
  cancel.className = 'btn-negative-secondary';
  cancel.textContent = 'Cancel';
  cancel.style.marginTop = '10px';
  cancel.onclick = () => modal.remove();
  content.appendChild(cancel);

  modal.appendChild(content);
  document.body.appendChild(modal);
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}
function showSlotPickerModal({ owner = "player", lane = "creature", onSelect, onCancel }) {
  const slots = getFieldSlots(owner, lane);
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.style.display = "flex";
  modal.innerHTML = `
    <div class="modal-content" style="min-width:420px;max-width:520px;">
      <h3>Select ${owner} ${lane} slot</h3>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:14px 0;">
        ${slots.map((card, i) => `
          <button class="btn-secondary slot-pick-btn" data-i="${i}" ${card ? "disabled" : ""}>
            ${card ? `Occupied ${i+1}` : `Slot ${i+1}`}
          </button>
        `).join("")}
      </div>
      <button id="slot-picker-cancel" class="btn-negative-secondary">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelectorAll(".slot-pick-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const i = Number(btn.dataset.i);
      modal.remove();
      onSelect && onSelect(i);
    };
  });

  const cancel = () => { modal.remove(); onCancel && onCancel(); };
  modal.querySelector("#slot-picker-cancel").onclick = cancel;
  modal.onclick = (e) => { if (e.target === modal) cancel(); };
}
function showFilteredCardSelectionModal(cards, onSelect, opts = {}) {
  // Remove any previous modal
  let modal = document.getElementById('filtered-selection-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'filtered-selection-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 99999;
  modal.onclick = e => e.stopPropagation();

  const content = document.createElement('div');
  content.className = 'modal-content';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';
  content.style.padding = '24px 36px';
  content.style.margin = '0';
  content.style.maxWidth = 'calc(100vw - 64px)';
  content.style.maxHeight = 'calc(100vh - 64px)';
  content.style.overflow = 'auto';
  content.onclick = e => e.stopPropagation();

  content.innerHTML = `<h3 style="margin-bottom: 20px;">${opts.title || "Select a card"}</h3>`;
  const row = document.createElement('div');
  row.className = 'modal-card-row';
  row.style.display = 'flex';
  row.style.flexWrap = 'wrap';
  row.style.gap = '22px';
  row.style.justifyContent = 'center';
  row.style.alignItems = 'center';
  row.style.width = '100%';
  row.style.margin = '0';

  cards.forEach(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    if (!cardData) return;
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-battlefield';
    cardDiv.style.cursor = 'pointer';
    cardDiv.style.position = 'relative';
    cardDiv.style.marginBottom = '12px';

    const img = document.createElement('img');
    img.src = cardData.image;
    img.alt = cardData.name;
    img.style.width = '100px';
    img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
    img.style.background = '#222';
    cardDiv.appendChild(img);
    cardDiv.title = cardData.name;
    // Hold to preview logic
    let holdTimer = null;
    let held = false;

    // For mouse
    cardDiv.onmousedown = (e) => {
      e.stopPropagation();
      held = false;
      holdTimer = setTimeout(() => {
        held = true;
        showFullCardModal(cardObj);
      }, 500);
    };
    cardDiv.onmouseup = cardDiv.onmouseleave = (e) => {
      clearTimeout(holdTimer);
      if (!held) {
        modal.remove();
        onSelect(cardObj);
      }
    };

    // For touch
    cardDiv.ontouchstart = (e) => {
      held = false;
      holdTimer = setTimeout(() => {
        held = true;
        showFullCardModal(cardObj);
      }, 500);
    };
    cardDiv.ontouchend = cardDiv.ontouchcancel = (e) => {
      clearTimeout(holdTimer);
      if (!held) {
        modal.remove();
        onSelect(cardObj);
      }
    };

    row.appendChild(cardDiv);
  });

  content.appendChild(row);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

function runSkillEffect(sourceCardObj, skillObj) {
  // --- TYPES ---
  let types = Array.isArray(skillObj.type) ? skillObj.type : (skillObj.type ? [skillObj.type] : []);
  for (let type of types) {
    const skillType = EFF_MAP[type];
    if (skillType && skillType.handler) {
      // Optionally, validate card location or status if needed
      // For example, skip effect if sourceCardObj was moved to deck/fallen by a requirement
      if (type === "Strike" || type === "Search" || type === "Burst") {
        // Example: do not strike if source card is no longer in hand/field (after Stash, etc)
        if (!isValidForSkillType(sourceCardObj, skillObj, type)) continue;
      }
      skillType.handler(sourceCardObj, skillObj);
    }
  }
}

function effectStatusHandler(statusName) {
  return function(sourceCardObj, skillObj, step, nextEffect) {
    const enemyField = [...gameState.enemyCreatures, ...gameState.enemyTerrains];
    startSkillTarget(
      enemyField,
      selectedTargets => {
        const targets = Array.isArray(selectedTargets) ? selectedTargets : [selectedTargets];
        const damage = (typeof step.amount === "number") ? step.amount : 0;
        targets.forEach(target => {
          if (damage > 0) dealDamage(sourceCardObj, target, damage);
          applyStatus(target, statusName);
        });
        if (typeof nextEffect === "function") nextEffect();
      },
      step.target
    );
  }
}
// Helper to validate if sourceCardObj is still valid for the effect (customize as needed)
function isValidForSkillType(sourceCardObj, skillObj, type) {
  // Example logic: if Stash moved to deck, don't let Strike happen
  if (type === "Strike") {
    // Only allow if sourceCardObj is still in hand or field
    return gameState.playerHand.includes(sourceCardObj) ||
           gameState.playerCreatures.includes(sourceCardObj) ||
           gameState.playerTerrains.includes(sourceCardObj);
  }
  // For other types, add custom logic as needed
  return true;
}
function isSkillEffectValid(sourceCardObj, skillObj) {
  // For single-target skills:
  if (skillObj.target) {
    // If the target is no longer in the zone (e.g. not in field, not in terrains array, etc)
    if (!isTargetStillPresent(skillObj.target)) return false;
  }
  // For multi-target skills:
  if (skillObj.targets && Array.isArray(skillObj.targets)) {
    return skillObj.targets.some(isTargetStillPresent); // at least one valid
  }
  // For self-targeted skills:
  // If the source itself is gone, skip
  if (!isCardStillPresent(sourceCardObj)) return false;

  // Default (no explicit target): assume valid
  return true;
}
function isTargetStillPresent(targetObj) {
  // Check all possible arrays/zones
  return (
    gameState.playerCreatures.includes(targetObj) ||
    gameState.playerTerrains.includes(targetObj) ||
    gameState.enemyCreatures.includes(targetObj) ||
    gameState.enemyTerrains.includes(targetObj)
    // ...add other zones as needed
  );
}

function isCardStillPresent(cardObj) {
  return isTargetStillPresent(cardObj);
}

function parseCost(costStr) {
  const out = {
    green: 0, red: 0, blue: 0, yellow: 0,
    purple: 0, gray: 0, black: 0, white: 0,
    colorless: 0
  };

  const s = String(costStr || '');
  const matches = s.match(/\{([^}]+)\}/g) || [];

  const colorMap = {
    g: 'green',
    r: 'red',
    u: 'blue',
    y: 'yellow',
    p: 'purple',
    c: 'gray',
    b: 'black',
    w: 'white'
  };

  for (const m of matches) {
    const tok = m.replace(/[{}]/g, '').trim().toLowerCase();

    // {x2} => 2 colorless
    const genericMatch = tok.match(/^x(\d+)$/i);
    if (genericMatch) {
      out.colorless += Number(genericMatch[1]);
      continue;
    }

    // {2} => 2 colorless
    if (/^\d+$/.test(tok)) {
      out.colorless += Number(tok);
      continue;
    }

    // {g2}, {u3}, etc.
    const coloredMatch = tok.match(/^([gruypcbw])(\d+)?$/i);
    if (coloredMatch) {
      const colorKey = colorMap[coloredMatch[1].toLowerCase()];
      const amount = coloredMatch[2] ? Number(coloredMatch[2]) : 1;
      out[colorKey] += amount;
    }
  }

  Object.keys(out).forEach(k => {
    if (!out[k]) delete out[k];
  });

  return out;
}

/*------------------
// STATUS EFFECTS //
------------------*/
function applyStatus(cardObj, statusName, duration = (STATUS[statusName] && STATUS[statusName].duration)) {
  if (!cardObj || !statusName) return;
  cardObj.statuses = cardObj.statuses || [];
  if (!cardObj.statuses.some(s => s.name === statusName)) {
    // push status instance
    cardObj.statuses.push({ name: statusName, duration: typeof duration === 'number' ? duration : null });

    // call the status-specific apply callback if present (preserve existing behavior)
    try {
      if (STATUS[statusName] && typeof STATUS[statusName].apply === 'function') {
        STATUS[statusName].apply(cardObj);
      }
    } catch (err) {
      console.warn(`STATUS.${statusName}.apply failed`, err);
    }

    // Notify any JS listeners registered via onSoaked/onBurned/...
    // Use case-insensitive matching against STATUS keys (single source of truth)
    try {
      const normalized = String(statusName).trim().toLowerCase();
      let canonical = null;

      if (typeof STATUS === 'object' && STATUS !== null) {
        canonical = Object.keys(STATUS).find(k => String(k).toLowerCase() === normalized);
      }

      if (canonical) {
        // notify listeners (synchronous)
        try {
          notifyBlight && notifyBlight(canonical, cardObj);
        } catch (e) {
          console.warn('notifyBlight failed for', canonical, e);
        }

        // also queue the event into the existing engine queue for skills that use activation.trigger
        try {
          if (typeof queueEvent === 'function') {
            // keep context shape compatible with collectTriggersForEvent (it expects context.summonedCard for many handlers)
            queueEvent(canonical, { summonedCard: cardObj });
          }
        } catch (e) {
          // non-fatal: queueEvent may not be available in some contexts
          console.warn('queueEvent failed for', canonical, e);
        }
      }
    } catch (e) {
      console.warn('Blight notification failed for', statusName, e);
    }
  }
}

function removeStatus(cardObj, statusName) {
  if (!cardObj.statuses) return;
  cardObj.statuses = cardObj.statuses.filter(s => s.name !== statusName);
  if (STATUS[statusName]) STATUS[statusName].remove(cardObj);
}

function handleStatusEffects(cardObj) {
  if (!cardObj.statuses) return;
  cardObj.statuses.forEach(status => {
    if (STATUS[status.name].onTurnStart) {
      STATUS[status.name].onTurnStart(cardObj);
    }
    status.duration -= 1;
  });
  // Remove expired statuses
  cardObj.statuses = cardObj.statuses.filter(s => s.duration > 0);
}
function hasStatus(cardObj, statusName) {
  return Array.isArray(cardObj.statuses) && cardObj.statuses.some(s => s.name === statusName);
}
function handleEndPhaseStatuses() {
  [...gameState.playerCreatures, ...gameState.enemyCreatures].forEach(cardObj => {
    if (cardObj.statuses) {
      cardObj.statuses.forEach(status => {
        if (STATUS[status.name]?.onEndPhase) {
          STATUS[status.name].onEndPhase(cardObj);
        }
        // Reduce duration for statuses that only tick on End Phase
        status.duration -= 1;
        if (status.duration <= 0) {
          removeStatus(cardObj, status.name);
        }
      });
    }
  });
  renderGameState();
}
function tickStatusDurations(phaseObj) {
  // Get all relevant cards (creatures, terrains, etc)
  const allCards = [
    ...gameState.playerCreatures, ...gameState.playerTerrains,
    ...gameState.enemyCreatures, ...gameState.enemyTerrains
  ];
  allCards.forEach(cardObj => {
    if (!cardObj.statuses) return;
    cardObj.statuses.forEach(status => {
      const statusDef = STATUS[status.name];
      if (!statusDef) return;
      // Determine if this status should tick in this phase
      if (
        (statusDef.tick === "allEnd" && isEndPhase(phaseObj)) ||
        (statusDef.tick === "playerEnd" && isPlayerEndPhase(phaseObj)) ||
        (statusDef.tick === "enemyEnd" && isenemyEndPhase(phaseObj))
      ) {
        // Call onEndPhase if present
        if (statusDef.onEndPhase) statusDef.onEndPhase(cardObj);
        status.duration -= 1;
        if (status.duration <= 0) {
          removeStatus(cardObj, status.name);
        }
      }
    });
  });
}
// --- Skill title helper (add near other shared helpers) ---
function skillTitleFromEffect(effect) {
  if (!effect) return '';
  const effects = Array.isArray(effect) ? effect : [effect];
  const parts = effects.map(e => {
    if (!e) return '';
    const cls = e.class || e.type || e.effect;
    const amount = (typeof e.amount === 'number') ? e.amount : (typeof e.value === 'number' ? e.value : null);
    if (cls && amount !== null) {
      // e.g. "Burn {3}"
      return `${String(cls).charAt(0).toUpperCase() + String(cls).slice(1)} {${amount}}`;
    }
    if (cls === 'Buff' && (e.atk || e.def || e.hp)) {
      const buffs = [];
      if (e.atk) buffs.push(`+${e.atk} ATK`);
      if (e.def) buffs.push(`+${e.def} DEF`);
      if (e.hp)  buffs.push(`+${e.hp} HP`);
      return `Buff (${buffs.join(', ')})`;
    }
    if (cls) return String(cls).charAt(0).toUpperCase() + String(cls).slice(1);
    if (typeof e === 'string') return e;
    return '';
  }).filter(Boolean);
  return parts.join(' / ');
}

function skillTitle(skill) {
  if (!skill) return '';
  if (skill.title && String(skill.title).trim()) return String(skill.title).trim();
  const costPart = skill.cost ? `${String(skill.cost)} ` : '';
  const effectText = skillTitleFromEffect(skill.effect || skill.effects || skill.resolution || skill.effectText);
  if (effectText) return (costPart + effectText).trim();
  if (skill.name) return skill.name;
  return '';
}
window.skillTitle = skillTitle; // optional global for console/tests
// ----------------------------------- //
// --- Card Field Helper Functions --- //
// ----------------------------------- //
function getCardDef(cardObj) {
  return dummyCards.find(c => c.id === cardObj.cardId) || null;
}
function getAllCardCollections() {
  return [
    gameState.playerHand, gameState.enemyHand,
    gameState.playerDeck, gameState.enemyDeck,
    gameState.playerFallen, gameState.enemyFallen,
    gameState.playerFallen, gameState.enemyFallen,
    gameState.playerCreatureSlots, gameState.playerSupportSlots,
    gameState.enemyCreatureSlots, gameState.enemySupportSlots
  ];
}
function getCardByInstanceId(instanceId) {
  const pools = [
    gameState.playerHand,
    gameState.enemyHand,
    gameState.playerDeck,
    gameState.enemyDeck,
    gameState.playerFallen,
    gameState.enemyFallen,
    gameState.playerFallen,
    gameState.enemyFallen,
    gameState.playerCreatureSlots.filter(Boolean),
    gameState.playerSupportSlots.filter(Boolean),
    gameState.enemyCreatureSlots.filter(Boolean),
    gameState.enemySupportSlots.filter(Boolean),
  ];
  for (const arr of pools) {
    const found = arr.find(c => c && c.instanceId === instanceId);
    if (found) return found;
  }
  return null;
}
function findCardByInstanceId(instanceId) {
  for (const arr of getAllCardCollections()) {
    const found = arr.find(c => c && c.instanceId === instanceId);
    if (found) return found;
  }
  return null;
}
function removeCardByInstanceId(instanceId) {
  // remove from normal arrays + slot arrays
  for (const arr of getAllCardCollections()) {
    const idx = arr.findIndex(c => c && c.instanceId === instanceId);
    if (idx !== -1) {
      const removed = arr[idx];
      // slot arrays store null when empty
      if (
        arr === gameState.playerCreatureSlots || arr === gameState.playerSupportSlots ||
        arr === gameState.enemyCreatureSlots || arr === gameState.enemySupportSlots
      ) {
        arr[idx] = null;
      } else {
        arr.splice(idx, 1);
      }
      return removed;
    }
  }
  return null;
}
function getLaneForCard(cardObj) {
  const def = getCardDef(cardObj);
  const t = String(def?.type || def?.category || "").toLowerCase();
  return t === "creature" ? "creature" : "support"; // terrain/artifact/spell -> support
}

function removeCardFromAllFieldSlots(instanceId) {
  ["player","enemy"].forEach(owner => {
    ["creature","support"].forEach(lane => {
      const arr = getFieldSlots(owner, lane);
      const idx = arr.findIndex(c => c && c.instanceId === instanceId);
      if (idx !== -1) arr[idx] = null;
    });
  });
}
function findCardAnywhere(instanceId) {
  const all = [
    ...gameState.playerHand, ...gameState.enemyHand,
    ...gameState.playerDeck, ...gameState.enemyDeck,
    ...gameState.playerFallen, ...gameState.enemyFallen,
    ...gameState.playerFallen, ...gameState.enemyFallen,
    ...gameState.playerCreatureSlots.filter(Boolean),
    ...gameState.playerSupportSlots.filter(Boolean),
    ...gameState.enemyCreatureSlots.filter(Boolean),
    ...gameState.enemySupportSlots.filter(Boolean),
  ];
  return all.find(c => c.instanceId === instanceId) || null;
}
function placeInstanceOnField(instance) {
  if (!instance) return false;
  const def = getCardDef(instance.cardId);
  const cat = String(def?.category || '').toLowerCase();
  const owner = instance.owner === 'enemy' ? 'enemy' : 'player';

  if (cat === 'creature') {
    (owner === 'player' ? gameState.playerCreatures : gameState.enemyCreatures).push(instance);
    return true;
  }
  if (cat === 'terrain') {
    (owner === 'player' ? gameState.playerTerrains : gameState.enemyTerrains).push(instance);
    return true;
  }

  // If later you add artifacts, etc.
  // if (cat === 'artifact') ...

  return false;
}

// Insert this right after the end of computeCardStat(...) and before functions that render stats/icons
function getStatColor(cardObj, statName) {
  // Prefer instance-original base if present (keeps comparisons accurate if base was permanently changed)
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId) || {};
  // If the instance stored an original base (e.g. _originalAtk/_originalDef), prefer it:
  const instanceOriginalKey = statName === 'atk' ? '_originalAtk' : (statName === 'def' ? '_originalDef' : null);
  const baseFromInstance = instanceOriginalKey && typeof cardObj[instanceOriginalKey] === 'number' ? cardObj[instanceOriginalKey] : undefined;
  const base = (typeof baseFromInstance === 'number') ? baseFromInstance : (cardDef[statName] ?? 0);

  const current = computeCardStat(cardObj, statName);
  if (current > base) return "#44e055";   // green
  if (current < base) return "#e53935";   // red
  return "#fff";                          // default/neutral
}

// GAME STATUS UI
// updateGameStatusRow - ensures pooled essence and casting preview are shown
function updateGameStatusRow() {
  const container = document.getElementById('game-status-inline');
  if (!container) return;
  container.innerHTML = '';

  // enemy essence block
  const oWrap = document.createElement('div');
  oWrap.style.display = 'flex';
  oWrap.style.flexDirection = 'column';
  oWrap.style.alignItems = 'center';
  oWrap.style.gap = '4px';

  const oIcons = document.createElement('div');
  oIcons.style.display = 'flex';
  oIcons.style.flexWrap = 'wrap';
  oIcons.style.justifyContent = 'center';
  oIcons.style.gap = '4px';
  renderEssenceSummaryInto(oIcons, getEssencePool('enemy'), { size: 16 });
  oWrap.appendChild(oIcons);
  
  // Player essence block
  const pWrap = document.createElement('div');
  pWrap.style.display = 'flex';
  pWrap.style.flexDirection = 'column';
  pWrap.style.alignItems = 'center';
  pWrap.style.gap = '4px';

  const pIcons = document.createElement('div');
  pIcons.style.display = 'flex';
  pIcons.style.flexWrap = 'wrap';
  pIcons.style.justifyContent = 'center';
  pIcons.style.gap = '4px';
  renderEssenceSummaryInto(pIcons, getEssencePool('player'), { size: 16 });
  pWrap.appendChild(pIcons);

  container.appendChild(pWrap);
  container.appendChild(oWrap);
}

// Hook into renderGameState so updates happen automatically
if (typeof renderGameState === 'function') {
  const origRenderGameState = renderGameState;
  renderGameState = function() {
    origRenderGameState.apply(this, arguments);
    try {
      updateGameStatusRow();
    } catch (err) {
      console.warn("updateGameStatusRow error:", err);
    }
  };
} else {
  // If renderGameState is not defined yet, ensure we call update on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => updateGameStatusRow());
}

// --- Utility: get all colors/types/archetypes/abilities (for filters, etc.) ---
function getCardColors(cardObj) {
  const card = getCardDef(cardObj);
  if (!card) return [];
  if (Array.isArray(card.color)) return card.color;
  if (typeof card.color === "string") return [card.color];
  return [];
}
function getCardTypes(cardObj) {
  const card = getCardDef(cardObj);
  if (!card) return [];
  if (Array.isArray(card.type)) return card.type;
  if (typeof card.type === "string") return [card.type];
  return [];
}
function getCardArchetypes(cardObj) {
  const card = getCardDef(cardObj);
  if (!card) return [];
  if (Array.isArray(card.archetype)) return card.archetype;
  if (typeof card.archetype === "string") return [card.archetype];
  return [];
}
function getCardAbilities(cardObj) {
  // Prefer a helper that reads the card definition, then include any instance-granted abilities.
  const card = getCardDef(cardObj);
  let abilities = [];
  if (card) {
    if (Array.isArray(card.ability)) abilities = abilities.concat(card.ability);
    else if (typeof card.ability === "string" && card.ability) abilities.push(card.ability);
  }
  if (cardObj && Array.isArray(cardObj.grantedAbilities)) {
    // Merge unique entries; grantedAbilities elements may be strings or objects
    cardObj.grantedAbilities.forEach(ab => {
      // Avoid duplicates (string compare for primitives, JSON compare for objects)
      const exists = abilities.some(existing => {
        if (typeof existing === 'string' && typeof ab === 'string') return existing === ab;
        try { return JSON.stringify(existing) === JSON.stringify(ab); } catch (e) { return false; }
      });
      if (!exists) abilities.push(ab);
    });
  }
  return abilities;
}

// ------------------------------------- //
// --- HELPERS FOR SPRITE ANIMATIONS --- //
// ------------------------------------- //
function isCardActionable(cardObj, cardData, gameState, zone) {
  // 1. Playable from hand
  if (zone === 'playerHand') {
    if (canPayEssence(cardData.cost, getAllEssenceSources())) return true;
  }

  // 2. Can attack (for creatures on field)
  if (zone === 'player-creature-zone' && typeof canAttack === "function") {
    if (canAttack(cardObj, gameState)) return true;
  }

  // 4. Can activate any skill in this zone
  if (cardData.skill && Array.isArray(cardData.skill)) {
    if (cardData.skill.some(skillObj =>
      !skillObj.activation && (
        // Only allow skill activation if the card is not sealed and canActivateSkill passes.
        (!isSealed(cardObj) && canActivateSkill(cardObj, skillObj, zone, gameState))
      )
    )) return true;
  }

  // Extend with more checks as needed (e.g. equip, cast, etc.)
  return false;
}
function isAnyFallenCardActionable(gameState, dummyCards) {
  return gameState.playerFallen.some(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    return isCardActionable(cardObj, cardData, gameState, "fallen");
  });
}

// --- Game Log modal + clickable icon ---

(function() {
  // State for moving the log node back when the modal closes
  let gameLogstate = {
    originalParent: null,
    nextSibling: null
  };

function addGameLogEntry(entry) {
  if (!Array.isArray(gameState.gameLog)) gameState.gameLog = [];
  gameState.gameLog.push({
    timestamp: Date.now(),
    ...entry
  });
  }
})();
const gameLogContainer = document.getElementById('game-log-container');
if (gameLogContainer) {
  gameLogContainer.addEventListener('click', function(e) {
    const img = e.target.closest('.log-card-img');
    if (!img) return;

    const instanceId = img.getAttribute('data-instanceid');
    const cardId = img.getAttribute('data-cardid');

    let cardObj = null;
    const allArrays = [
      gameState.playerHand,
      gameState.playerCreatures,
      gameState.playerTerrains,
      gameState.playerFallen,
      gameState.enemyHand,
      gameState.enemyCreatures,
      gameState.enemyTerrains,
      gameState.enemyFallen,
      gameState.playerDeck,
      gameState.enemyDeck,
    ];

    if (instanceId) {
      for (const arr of allArrays) {
        cardObj = arr.find(c => c.instanceId === instanceId);
        if (cardObj) break;
      }
    }
    if (!cardObj && cardId) {
      cardObj = dummyCards.find(c => c.id === cardId);
    }
    if (cardObj) showFullCardModal(cardObj);
  });
}

// Gameplay (menu) header
document.getElementById('gameplay-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('gameplay-back-btn').onclick = function() {
  document.getElementById('gameplay-section').classList.remove('active');
  document.getElementById('home-section').classList.add('active');
};

// ASSIGNMENTS
document.addEventListener('DOMContentLoaded', function() {
  // Settings button (top right of battlefield)
  document.getElementById('battlefield-settings-btn').onclick = function() {
    document.getElementById('settings-modal').style.display = 'flex';
  };
  // Back button (top left of battlefield)
  var backBtn = document.getElementById('battlefield-back-btn');
  if (backBtn) {
    backBtn.onclick = function() {
      if (confirm("Leave the game and return to menu?")) {
        endGame();
      }
    };
  }
});

if (window.socket) {
  window.socket.on('enemy_left', () => {
    // Show toast/message
    showToast("enemy has left the match.");
    resetGameState();
  });
}


if (window.socket) {
  window.socket.on('enemy state update', (state) => {
    gameState.enemyDeck = Array.from({ length: state.deckCount }, () => ({}));
    gameState.enemyHand = Array.from({ length: state.handCount }, () => ({}));
    // Battlefield zones: use the real card objects sent from server
    gameState.enemyCreatures = state.creatures || [];
    gameState.enemyTerrains = state.terrains || [];
    gameState.enemyFallen = state.fallenCards || [];
    gameState.enemyPhase = state.phase;
    gameState.enemyTurn = state.turn;
    renderGameState();
  });
}

// When joining a multiplayer match
socket.on('casual-match-found', function(matchData) {
  socket.emit('join room', matchData.roomId);

  // build playerProfile before emitting!
  const playerDeckObj = window.selectedPlayerDeck?.deckObj || window.selectedPlayerDeck;
  const playerProfile = {
    username: window.playerUsername || "You",
    avatar: window.playerProfilePic || "Images/Avatar/Default.png",
    banner: window.playerProfileBanner || "Images/Banner/Default.png",
    power: typeof calculatePlayerPower === "function" ? calculatePlayerPower() : 0
  };
  socket.emit('profile', playerProfile);
});

socket.on('enemy profile', function(profileObj) {
  const enemyProfileDiv = document.getElementById('enemy-profile');
  enemyProfileDiv.innerHTML = "";
  enemyProfileDiv.appendChild(renderProfilePanel(profileObj));
  enemyProfileDiv.style.display = '';
});

// Make available globally if called from client.js:
if (window.socket) {
  window.socket.on('casual-match-found', function(matchData) {
    document.getElementById('casual-searching-modal').style.display = 'none';

    // Build playerProfile using selected deck
    const playerDeckObj = window.selectedPlayerDeck?.deckObj || window.selectedPlayerDeck;
    const playerProfile = {
      username: window.playerUsername || "You",
      avatar: window.playerProfilePic || "Images/Avatar/Default.png",
      banner: window.playerProfileBanner || "Images/Banner/Default.png",
      power: typeof calculatePlayerPower === "function" ? calculatePlayerPower() : 0
    };

    // Send player profile to server after joining room
    window.socket.emit('join room', matchData.roomId);
    window.socket.emit('profile', playerProfile);

    // Start game with correct profile objects
    startGame({
      mode: "casual",
      playerDeck: playerDeckObj,
      enemyDeck: matchData.enemyDeck?.deckObj || matchData.enemyDeck,
      playerProfile: playerProfile,
      enemyProfile: matchData.enemyProfile,
      isCpuGame: false,
      matchData
    });
  });
} else {
  console.error("Socket.io not initialized!");
}

if (window.socket) {
  window.socket.on('coin-flip-result', function(result) {
    // result should be "player" or "enemy" (or "heads"/"tails")
    showCoinFlipModal(function(whoStarts) {
      gameState.turn = whoStarts;
      gameState.phase = "draw";
      // ...continue with setup...
      initiateDomainSelection(gameState.playerDeck, () => {
        // Draw opening hand, setup, etc.
      });
    }, result);
  });
}
window.startGame = startGame;
window.gameState = window.gameState || {};
window.gameStartAnimationShown = false;
window.coinFlipShown = false;

// --- PHASES GLOBAL USE --- //
window.PHASE_META = PHASE_META;
window.PHASE_DISPLAY_NAMES = PHASE_DISPLAY_NAMES;
window.PHASE_CLASS = PHASE_CLASS;
window.PHASES = PHASES;

window.getPhaseIndex = getPhaseIndex;
window.getNextPhase = getNextPhase;
window.getPrevPhase = getPrevPhase;

window.isPlayerTurn = isPlayerTurn;
window.isenemyTurn = isenemyTurn;
window.isPhase = isPhase;
window.isPlayerPhase = isPlayerPhase;
window.isenemyPhase = isenemyPhase;
window.isStartPhase = isStartPhase;
window.isActionPhase = isActionPhase;
window.isEndPhase = isEndPhase;
window.isPlayerEndPhase = isPlayerEndPhase;
window.isenemyEndPhase = isenemyEndPhase;
window.isPlayerActionPhase = isPlayerActionPhase;
window.isenemyActionPhase = isenemyActionPhase;
window.isStartOfTurn = isStartOfTurn;

window.getPhaseDisplayName = getPhaseDisplayName;
window.getPhaseClass = getPhaseClass;
