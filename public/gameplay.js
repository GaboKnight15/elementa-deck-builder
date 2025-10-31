// ========================== 
// === GAMEPLAY LOGIC ===
// ==========================
// ==========================
// === CONSTANTS & STATE ===
// ==========================

// -------------- //
// --- PHASES --- //
// -------------- //
const PHASE_META = [
  { key: "start",  display: "Start Phase",  class: "phase-start"  },
  { key: "action", display: "Action Phase", class: "phase-action" },
  { key: "end",    display: "End Phase",    class: "phase-end"    }
];
const PHASE_HANDLERS = {
  start: handleStartPhase,
  action: handleActionPhase,
  end: handleEndPhase
};
// Generate phase display and class maps from PHASE_META
const PHASE_DISPLAY_NAMES = Object.fromEntries(PHASE_META.map(p => [p.key, p.display]));
const PHASE_CLASS = Object.fromEntries(PHASE_META.map(p => [p.key, p.class]));

// Generate all phase steps in order
const PHASES = [];
const TURNS = ["player", "opponent"];
TURNS.forEach(turn =>
  PHASE_META.forEach(phase =>
    PHASES.push({ turn, phase: phase.key })
  )
);

// ------------- //
// --- ZONES --- //
// ------------- //
let gameState = {
  playerDeck: [],
  playerHand: [],
  playerCreatures: [],
  playerDomains: [],
  playerVoid: [],
  opponentDeck: [],
  opponentHand: [],
  opponentCreatures: [],
  opponentDomains: [],
  opponentVoid: [],
  playerDominion: null,
  opponentDominion: null,
  playerNullCounters: 0,    // number of Null Counters the player currently has
  opponentNullCounters: 0,  // number of Null Counters the opponent currently has
  turn: "player",
  phase: "draw",
  timeOfDay: "day", // Initial state
  dayNightCycleCounter: 0, // Counts end phases
  pendingDayNightTransition: null,
  weatherEffects: [],
  essencePools: {
    player: { green:0, red:0, blue:0, yellow:0, purple:0, gray:0, black:0, white:0, colorless:0 },
    opponent: { green:0, red:0, blue:0, yellow:0, purple:0, gray:0, black:0, white:0, colorless:0 }
  },
};
const ZONE_MAP = {
  // Player zones
  playerCreatures:   { id: "player-creatures-zone",   arr: () => gameState.playerCreatures },
  playerDomains:     { id: "player-domains-zone",     arr: () => gameState.playerDomains },
  playerVoid:        { id: "player-void-zone",        arr: () => gameState.playerVoid },
  playerDeck:        { id: "player-deck-zone",        arr: () => gameState.playerDeck },
  playerHand:        { id: "player-hand",             arr: () => gameState.playerHand },

  // Opponent zones
  opponentCreatures: { id: "opponent-creatures-zone", arr: () => gameState.opponentCreatures },
  opponentDomains:   { id: "opponent-domains-zone",   arr: () => gameState.opponentDomains },
  opponentVoid:      { id: "opponent-void-zone",      arr: () => gameState.opponentVoid },
  opponentDeck:      { id: "opponent-deck-zone",      arr: () => gameState.opponentDeck },
  opponentHand:      { id: "opponent-hand",           arr: () => gameState.opponentHand },

  // Combined/mass zones for flexible targeting
  allCreatures:      { id: null, arr: () => [...gameState.playerCreatures, ...gameState.opponentCreatures] },
  allDomains:        { id: null, arr: () => [...gameState.playerDomains, ...gameState.opponentDomains] },
  allVoids:          { id: null, arr: () => [...gameState.playerVoid, ...gameState.opponentVoid] },
  allDecks:          { id: null, arr: () => [...gameState.playerDeck, ...gameState.opponentDeck] },
  allHands:          { id: null, arr: () => [...gameState.playerHand, ...gameState.opponentHand] },

  // NEW: All player-side field (creatures + domains)
  allPlayerField:    { id: null, arr: () => [
    ...gameState.playerCreatures,
    ...gameState.playerDomains
  ] },

  // NEW: All opponent-side field (creatures + domains)
  allOpponentField:  { id: null, arr: () => [
    ...gameState.opponentCreatures,
    ...gameState.opponentDomains
  ] },
  
  // Whole field (creatures + domains both sides)
  allField:          { id: null, arr: () => [
    ...gameState.playerCreatures, ...gameState.playerDomains,
    ...gameState.opponentCreatures, ...gameState.opponentDomains
  ] },

  // All cards everywhere (for global effects, etc.)
  allCards:          { id: null, arr: () => [
    ...gameState.playerCreatures, ...gameState.playerDomains, ...gameState.playerVoid, ...gameState.playerDeck, ...gameState.playerHand,
    ...gameState.opponentCreatures, ...gameState.opponentDomains, ...gameState.opponentVoid, ...gameState.opponentDeck, ...gameState.opponentHand
  ] }
};

// --- EVENT QUEUE --- //
let eventQueue = [];
let isProcessingEvents = false;

let attackMode = {attackerId: null, attackerZone: null, cancelHandler: null};

const INITIAL_HAND_SIZE = 5;

const ESSENCE_IMAGE_MAP = {
  red: "OtherImages/Essence/Red.png",
  blue: "OtherImages/Essence/Blue.png",
  green: "OtherImages/Essence/Green.png",
  yellow: "OtherImages/Essence/Yellow.png",
  purple: "OtherImages/Essence/Purple.png",
  gray: "OtherImages/Essence/Gray.png",
  black: "OtherImages/Essence/Black.png",
  white: "OtherImages/Essence/White.png",
  X0: "OtherImages/Essence/Zero.png",
  X1: "OtherImages/Essence/One.png",
  X2: "OtherImages/Essence/Two.png",
  X3: "OtherImages/Essence/Three.png",
  X4: "OtherImages/Essence/Four.png",
  X5: "OtherImages/Essence/Five.png",
  X6: "OtherImages/Essence/Six.png",
  X7: "OtherImages/Essence/Seven.png",
  X8: "OtherImages/Essence/Eight.png",
  X9: "OtherImages/Essence/Nine.png",
  X10: "OtherImages/Essence/Ten.png",
  X11: "OtherImages/Essence/Eleven.png",
  X12: "OtherImages/Essence/Twelve.png",
  X13: "OtherImages/Essence/Thirteen.png",
  X14: "OtherImages/Essence/Fourteen.png",
  X15: "OtherImages/Essence/Fifteen.png",
  X16: "OtherImages/Essence/Sixteen.png",
  X17: "OtherImages/Essence/Seventeen.png",
  X18: "OtherImages/Essence/Eighteen.png",
  X19: "OtherImages/Essence/Nineteen.png",
  X20: "OtherImages/Essence/Twenty.png"
};
// STATUS EFFECTS
const STATUS_EFFECTS = {
  Burn: {
    icon: 'OtherImages/Icons/Burn.png',
    name: 'Burn',
    description: 'Deals 1 damage at End Phase and lowers DEF by 1.',
    duration: 2,
    tick: "opponentEnd", // Only decrement at opponent's End Phase!
    apply: function(cardObj) {
      // Lower DEF by 1 if not already applied
      if (!cardObj._burnedDEF) {
        cardObj.def = (cardObj.def || 0) - 1;
        cardObj._burnedDEF = true;
      }
    },
    remove: function(cardObj) {
      // Restore DEF when Burn is removed
      if (cardObj._burnedDEF) {
        cardObj.def = (cardObj.def || 0) + 1;
        cardObj._burnedDEF = false;
      }
    },
    onEndPhase: function(cardObj) {
      cardObj.currentHP = Math.max(0, (cardObj.currentHP || getBaseHp(cardObj.cardId)) - 1);
    }
  },
  Freeze: {
    icon: 'OtherImages/Icons/Freeze.png',
    name: 'Freeze',
    description: 'Cannot attack, use skills and receive damage.',
    duration: 1,
    tick: "allEnd", // Decrement on every End Phase
    apply: (cardObj) => {
      cardObj._frozen = true;
      cardObj.canAttack = false;
    },
    remove: (cardObj) => {
      cardObj._frozen = false;
      cardObj.canAttack = true;
    },
  },
  Poison: {
    icon: 'OtherImages/Icons/Poison.png',
    name: 'Poison',
    description: 'Deals 1 damage at the beginning of each turn. Reduces max HP by 1 while poisoned.',
    duration: 3,
    apply: function(cardObj) {
      if (!cardObj._poisonedMaxHP) {
        cardObj._originalMaxHP = cardObj._originalMaxHP || getBaseHp(cardObj.cardId);
        cardObj._poisonedMaxHP = true;
        cardObj.maxHP = (cardObj.maxHP || getBaseHp(cardObj.cardId)) - 1;
        // If currentHP is above new max, lower it
        if (cardObj.currentHP > cardObj.maxHP) {
          cardObj.currentHP = cardObj.maxHP;
        }
      }
    },
    remove: function(cardObj) {
      if (cardObj._poisonedMaxHP) {
        cardObj.maxHP = cardObj._originalMaxHP || getBaseHp(cardObj.cardId);
        cardObj._poisonedMaxHP = false;
      }
    },
    onTurnStart: function(cardObj) {
      cardObj.currentHP = Math.max(0, (cardObj.currentHP || getBaseHp(cardObj.cardId)) - 1);
    }
  },
  Paralysis: {
    icon: 'OtherImages/Icons/Paralysis.png',
    name: 'Paralysis',
    description: 'Cannot attack or activate skills for 2 turns.',
    duration: 2,
    apply: function(cardObj) {
      cardObj._paralyzed = true;
      cardObj.canAttack = false;
      cardObj.canActivateSkill = false;
    },
    remove: function(cardObj) {
      cardObj._paralyzed = false;
      cardObj.canAttack = true;
      cardObj.canActivateSkill = true;
    },
    // Optionally, you can add a visual tick at each turn start or end
    // For now, logic is purely duration-based
  },
  Soak: {
    icon: 'OtherImages/Icons/Soak.png',
    name: 'Soak',
    description: 'Takes 2 extra damage from all sources until end of next turn.',
    duration: 1,
    apply: function(cardObj) {
      cardObj._soak = true;
      cardObj.soakAmount = 2; // for example, if you want to track the value
    },
    remove: function(cardObj) {
      cardObj._soak = false;
      delete cardObj.soakAmount;
    }
    // Optionally add logic for duration ticks
  },
Bind: {
  icon: 'OtherImages/Icons/Bind.png',
  name: 'Bind',
  description: 'Cannot attack or activate skills (removed at next opponent End Phase).',
  // Don't set duration here, handle it in your end phase check!
  apply: function(cardObj) {
    cardObj._bound = true;
    cardObj.canAttack = false;
    cardObj.canActivateSkill = false;
    cardObj._bindPendingRemoval = true; // Flag that Bind is active and waiting for Opponent End Phase
  },
  remove: function(cardObj) {
    cardObj._bound = false;
    cardObj.canAttack = true;
    cardObj.canActivateSkill = true;
    delete cardObj._bindPendingRemoval;
  }
},
Seal: {
  name: "Seal",
  icon: "OtherImages/status/seal.png",
  description: "This card's skills cannot be activated."
},
Quickstrike: {
  icon: 'OtherImages/Icons/Quickstrike.png',
  name: 'Quickstrike',
  description: 'This creature deals damage before an enemy it attacks.',
  // short duration used only for a single attack resolution; apply/remove toggle the flag
  apply: function(cardObj) {
    cardObj._quickstrike = true;
  },
  remove: function(cardObj) {
    cardObj._quickstrike = false;
  }
},
InvulnerableAtk: {
  icon: 'OtherImages/Icons/Invulnerable.png',
  name: 'Invulnerable (attacking)',
  description: "This creature takes no retaliation damage when it attacks.",
  apply: function(cardObj) {
    cardObj._invulnerableWhileAttacking = true;
  },
  remove: function(cardObj) {
    cardObj._invulnerableWhileAttacking = false;
  }
},
  // ... add more statuses
};

/*------------------------------
// ATTACK TARGETING ABILITIES //
------------------------------*/
const TARGET_FILTER_ABILITY = {
  Ambush: {
    icon: 'OtherImages/Icons/Ambush.png',
    name: 'Ambush',
    description: 'Cannot be targeted for attacks, skills, or effects. Removed if this creature attacks or uses a skill.',
    filter: (attacker, targets) => {
      // Remove all targets with Ambush ability
      return targets.filter(target => !defenderHasAbility(target, 'Ambush'));
    }
  },
  Flying: {
    icon: 'OtherImages/Icons/Flying.png',
    name: 'Flying',
    description: 'Ignores color protection, but only Flying or Ranged can block/attack Flying. Speed {1}',
    filter: (attacker, targets) => {
      // Flying ignores color protection (handled outside), so here: allow all
      return targets;
    }
  },
  Ranged: {
    icon: 'OtherImages/Icons/Ranged.png',
    name: 'Ranged',
    description: 'Can attack Flying; Speed {1}.',
    filter: (attacker, targets) => {
      // Ranged can attack Flying, and vice versa; don't restrict targets
      return targets;
    }
  },
  Protect: {
    icon: 'OtherImages/Icons/Protect.png',
    name: 'Protect',
    description: 'If any opponent creature has Protect, only those can be attacked (unless attacker is Flying).',
    filter: (attacker, targets) => {
      const protectTargets = targets.filter(target => defenderHasAbility(target, 'Protect'));
      if (protectTargets.length > 0 && !attackerHasAbility(attacker, 'Flying')) {
        return protectTargets;
      }
      return targets;
    }
  },
  Veil: {
    icon: 'OtherImages/skillEffect/Veil.png',
    name: 'Veil',
    description: 'Grants protection from debuffs for a duration.',
    handler: function(sourceCardObj, skillObj) {
      startSkillTarget(
        [...gameState.allyCreatures, ...gameState.allyDomains],
        selectedTarget => {
          grantVeil(selectedTarget, skillObj.duration);
          renderGameState();
        }
      );
    }
  },
  // ...add more targeting abilities here!
};
const ABILITY_EFFECTS = {
  Inspire: {
    apply: function(cardObj, gameState, abilityObj) {
      // Use fields from abilityObj
      const filter = { archetype: abilityObj.archetype }; // or use all fields you want
      const atkBoost = abilityObj.atk ?? 0;
      const defBoost = abilityObj.def ?? 0;

      // Apply boosts to matching cards
      const allCreatures = [...gameState.playerCreatures, ...gameState.opponentCreatures];
      allCreatures.forEach(target => {
        if (matchesFilter(target, filter)) {
          target.modifiers = target.modifiers || [];
          target.modifiers = target.modifiers.filter(
            mod => !(mod.source === cardObj.instanceId && mod.effect === "Inspire")
          );
          if (atkBoost) target.modifiers.push({effect: "Inspire", source: cardObj.instanceId, stat: "atk", value: atkBoost});
          if (defBoost) target.modifiers.push({effect: "Inspire", source: cardObj.instanceId, stat: "def", value: defBoost});
        }
      });
    },
    remove: function(cardObj, gameState) {
      const allCreatures = [...gameState.playerCreatures, ...gameState.opponentCreatures];
      allCreatures.forEach(target => {
        if (target.modifiers) {
          target.modifiers = target.modifiers.filter(
            mod => !(mod.source === cardObj.instanceId && mod.effect === "Inspire")
          );
        }
      });
    }
  }
};

// --- SKILL TRIGGER MAP ---
// Maps skill activation triggers to their event handlers
const SKILL_ACTIVATION_MAP = {
  // When this card enters the field (a.k.a. onSummon, "Arrival" in card text)
  Arrival: {
    name: "onSummon", // (Arrival)
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card is drawn (a.k.a. onDraw, "Insight" in card text)
  Draw: {
    name: "onDraw", // (Insight)
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card enters the void //
  Echo: {
    name: "onVoid",
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card deals damage //
  Frenzy: {
    name: "onDealDamage",
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card receives damage //
  Brace: {
    name: "onReceiveDamage",
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card attacks //
  Assault: {
    name: "onAttack",
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  },
  // When this card is attacked //
  Defender: {
    name: "onDefense",
    handler: function(cardObj, skillObj, context = {}, onComplete) {
      resolveSkillEffect(cardObj, skillObj, context, onComplete);
    }
  }
  // Add more triggers as needed!
};
// ATTACK RESOLUTION ABILITIES
const ATTACK_DECLARATION_ABILITY = {
  Intimidate: {
    icon: 'OtherImages/Icons/Intimidate.png',
    name: 'Intimidate',
    description: 'When attacking, changes defending creature to DEF.',
    handler: function(attacker, defender, next) {
      // Only trigger Intimidate if defender is in ATK (vertical)
      if (defender.orientation === "vertical") {
        // Optionally, use activateSkill for animation and effect logic:
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
  Provoke: {
    icon: 'OtherImages/Icons/Provoke.png',
    name: 'Provoke',
    description: 'When attacking, changes defending creature to ATK.',
    handler: function(attacker, defender, next) {
      // Only trigger Provoke if defender is in DEF (horizontal)
      if (defender.orientation === "horizontal") {
        const skillObj = {
          name: "Provoke",
          activation: {},
          resolution: {
            effect: "Provoke"
          }
        };
        activateSkill(attacker, skillObj, {
          target: defender,
          onComplete: () => changeCardPosition(defender, "vertical", next)
        });
      } else {
        // Already in ATK, skip effect
        next && next();
      }
    }
  }
  // ...add more declaration abilities here!
};

/*------------------------------
//---- SKILL TARGET TYPE ---- //
------------------------------*/
// Helper for requirements //
const REQUIREMENT_MAP = {
  Special: {
    zones: ['playerCreatures', 'playerDomains'], // field
    canActivate: (cardObj, skillObj, currentZone) =>
      ['playerCreatures', 'playerDomains'].includes(currentZone),
    handler: (cardObj, skillObj, next) => next && next()
  },
  Ultimate: {
    zones: ['playerCreatures', 'playerDomains'], // field
    canActivate: (cardObj, skillObj, currentZone) =>
      ['playerCreatures', 'playerDomains'].includes(currentZone),
    handler: (cardObj, skillObj, next) => next && next()
    // Later you could add more restrictions for "Ultimate" here
  },
  CW: {
    zones: ['playerCreatures', 'playerDomains'],
    handler: function(sourceCardObj, skillObj, next) {
      // If already in DEF (horizontal), just proceed with skill activation
      if (sourceCardObj.orientation === "horizontal") {
        return;
      }
      // If in ATK (vertical), rotate to DEF before proceeding
      if (sourceCardObj.orientation === "vertical") {
        changeCardPosition(sourceCardObj, "horizontal", next);
        return;
      }
      showToast("Card must be in ATK or DEF position to activate this skill.");
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      return validZones.includes(currentZone) &&
        (sourceCardObj.orientation === "vertical" || sourceCardObj.orientation === "horizontal");
    }
  },
  CCW: {
    zones: ['playerCreatures', 'playerDomains'],
    handler: function(sourceCardObj, skillObj, next) {
      // If already in ATK (vertical), just proceed with skill activation
      if (sourceCardObj.orientation === "vertical") {
        return;
      }
      // If in DEF (horizontal), rotate to ATK before proceeding
      if (sourceCardObj.orientation === "horizontal") {
        changeCardPosition(sourceCardObj, "vertical", next);
        return;
      }
      showToast("Card must be in ATK or DEF position to activate this skill.");
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      return validZones.includes(currentZone) &&
        (sourceCardObj.orientation === "vertical" || sourceCardObj.orientation === "horizontal");
    }
  },
  Stash: {
    zones: ['hand'],
    handler: function(sourceCardObj, skillObj) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      if (!validZones.some(zone => zone === 'hand')) {
        showToast("Stash can only be activated from your hand.");
        return;
      }
      moveCard(sourceCardObj.instanceId, gameState.playerHand, gameState.playerDeck);
      gameState.playerDeck = shuffle(gameState.playerDeck);
      renderGameState();
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      return validZones.includes(currentZone);
    }
  },
  Discard: {
    zones: ['hand'],
    handler: function(sourceCardObj, skillObj) {
      runHandSkillWithAnimation(sourceCardObj, skillObj, gameState.playerVoid);
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      if (!validZones.some(zone => zone === 'hand')) {
        showToast("Discard can only be activated from your hand.");
        return;
      }
      moveCard(sourceCardObj.instanceId, gameState.playerHand, gameState.playerVoid);
      renderGameState();
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      return validZones.includes(currentZone);
    }
  },
Sacrifice: {
  zones: ['playerCreatures', 'playerDomains'],
  handler: function(sourceCardObj, skillObj, next, requirement) {
    const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
    const isField = validZones.some(zone =>
      (zone === 'playerCreatures' && gameState.playerCreatures.includes(sourceCardObj)) ||
      (zone === 'playerDomains' && gameState.playerDomains.includes(sourceCardObj))
    );
    if (!isField) {
      showToast("Sacrifice can only be activated from the field.");
      if (next) next();
      return;
    }

    const amount = requirement?.amount || 1;
    const filter = getRequirementFilter(requirement);

    // Exclude self from pool
    let pool = [...gameState.playerCreatures, ...gameState.playerDomains].filter(card => card !== sourceCardObj);
    if (Object.keys(filter).length) pool = pool.filter(card => matchesFilter(card, filter));

    if (pool.length < amount) {
      showToast(`You need ${amount} other matching card(s) to sacrifice.`);
      if (next) next();
      return;
    }

    startSkillTarget(pool, selectedCards => {
      selectedCards.forEach(card => {
        const arr = gameState.playerCreatures.includes(card) ? gameState.playerCreatures : gameState.playerDomains;
        moveCard(card.instanceId, arr, gameState.playerVoid);
      });
      // Sacrifice self, too
      const fromArr = gameState.playerCreatures.includes(sourceCardObj)
        ? gameState.playerCreatures
        : gameState.playerDomains;
      moveCard(sourceCardObj.instanceId, fromArr, gameState.playerVoid);
      renderGameState();
      if (next) next();
    }, { title: `Choose ${amount} card(s) to sacrifice`, count: amount });
  },

  canActivate: function(sourceCardObj, skillObj, currentZone, gameState, requirement) {
    const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
    if (!validZones.includes(currentZone)) return false;

    const amount = requirement?.amount || 1;
    const filter = getRequirementFilter(requirement);

    let pool = [...gameState.playerCreatures, ...gameState.playerDomains].filter(card => card !== sourceCardObj);
    if (Object.keys(filter).length) pool = pool.filter(card => matchesFilter(card, filter));
    return pool.length >= amount;
  }
},
  Return: {
    zones: ['playerCreatures', 'playerDomains'],
    handler: function(sourceCardObj, skillObj) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      const isField = validZones.some(zone =>
        (zone === 'playerCreatures' && gameState.playerCreatures.includes(sourceCardObj)) ||
        (zone === 'playerDomains' && gameState.playerDomains.includes(sourceCardObj))
      );
      if (!isField) {
        showToast("Return can only be activated from the field.");
        return;
      }
      const fromArr = gameState.playerCreatures.includes(sourceCardObj)
        ? gameState.playerCreatures
        : gameState.playerDomains;
      moveCard(sourceCardObj.instanceId, fromArr, gameState.playerHand);
      renderGameState();
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      return validZones.includes(currentZone);
    }
  },
  Retreat: {
    zones: ['playerCreatures', 'playerDomains'],
    handler: function(sourceCardObj, skillObj) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      const isField = validZones.some(zone =>
        (zone === 'playerCreatures' && gameState.playerCreatures.includes(sourceCardObj)) ||
        (zone === 'playerDomains' && gameState.playerDomains.includes(sourceCardObj))
      );
      if (!isField) {
        showToast("Retreat can only be activated from the field.");
        return;
      }
      const fromArr = gameState.playerCreatures.includes(sourceCardObj)
        ? gameState.playerCreatures
        : gameState.playerDomains;
      moveCard(sourceCardObj.instanceId, fromArr, gameState.playerDeck);
      gameState.playerDeck = shuffle(gameState.playerDeck);
      renderGameState();
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      return validZones.includes(currentZone);
    }
  },
  Reforge: {
    zones: ["playerVoid"],
    handler: function(sourceCardObj, skillObj) {
      const isVoid = gameState.playerVoid.includes(sourceCardObj);
      if (!isVoid) {
        showToast("Reforge can only be activated from the void.");
        return;
      }
      moveCard(sourceCardObj.instanceId, gameState.playerVoid, gameState.playerDeck);
      gameState.playerDeck = shuffle(gameState.playerDeck);
      renderGameState();
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      return currentZone === "playerVoid";
    }
  },
  "": { handler: function() {} }
};

const SKILL_EFFECT_MAP = {
Champion: {
  icon: "Icons/Status/Champion.png",
  name: "Champion",
  description: "Grants Champion bonuses (stats, abilities) to this card.",
  // handler signature matches other effect handlers: (sourceCardObj, skillObj, step, nextEffect)
  handler: function(sourceCardObj, skillObj, step = {}, nextEffect) {
    if (!sourceCardObj) {
      if (nextEffect) nextEffect();
      return;
    }
    // Ensure instance structures exist
    sourceCardObj.modifiers = sourceCardObj.modifiers || [];
    sourceCardObj._grantedAbilities = sourceCardObj._grantedAbilities || [];

    // Apply stat increases as permanent modifiers (tagged by effect "Champion" for easy removal if needed)
    const champSourceTag = 'Champion';
    if (typeof step.atk === 'number' && step.atk !== 0) {
      sourceCardObj.modifiers.push({ effect: champSourceTag, stat: 'atk', value: Number(step.atk), source: champSourceTag });
    }
    if (typeof step.def === 'number' && step.def !== 0) {
      sourceCardObj.modifiers.push({ effect: champSourceTag, stat: 'def', value: Number(step.def), source: champSourceTag });
    }
    if (typeof step.speed === 'number' && step.speed !== 0) {
      sourceCardObj.modifiers.push({ effect: champSourceTag, stat: 'speed', value: Number(step.speed), source: champSourceTag });
    }
    // Armor isn't part of computeCardStat directly; store on instance
    if (typeof step.armor === 'number' && step.armor !== 0) {
      sourceCardObj.armor = (sourceCardObj.armor || 0) + Number(step.armor);
    }

    // Grant abilities (strings or objects). If an object, store it as-is; if string, store string.
    if (step.abilities) {
      const abilities = Array.isArray(step.abilities) ? step.abilities : [step.abilities];
      abilities.forEach(ab => {
        // Avoid duplicates
        if (!sourceCardObj._grantedAbilities.some(x => JSON.stringify(x) === JSON.stringify(ab))) {
          sourceCardObj._grantedAbilities.push(ab);
        }
      });
    }

    // Mark instance as Champion (so UI and requirement checks can use _isChampion/_championActive)
    sourceCardObj._isChampion = true;
    // If the effect is meant to "activate" Champion immediately, set _championActive; default true for this effect
    sourceCardObj._championActive = true;

    // Optionally add a persistent status entry so hasStatus(...,'Champion') works
    sourceCardObj.statuses = sourceCardObj.statuses || [];
    if (!sourceCardObj.statuses.some(s => s.name === 'Champion')) {
      sourceCardObj.statuses.push({ name: 'Champion', duration: null });
    }

    // Visual / feedback
    try { showToast && showToast(`${sourceCardObj.name || sourceCardObj.cardId} is now a Champion!`, { type: 'info' }); } catch (e) { /* no-op */ }

    // Re-render so badge and stat changes are visible
    renderGameState && renderGameState();

    if (typeof nextEffect === 'function') nextEffect();
  },
  // Champion application has no special canActivate guard here; activation should be handled by the skill's canActivate / requirement.
},
Strike: {
  icon: 'OtherImages/skillEffect/Strike.png',
  name: 'Strike',
  description: 'Deals damage.',
  // Now using (sourceCardObj, skillObj, step, nextEffect)
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    // For your rule: any card on the field can be a target (player+opponent, creatures+domains)
    const allOpponentField = [...gameState.opponentCreatures, ...gameState.opponentDomains];
    startSkillTarget(
      allOpponentField,
      selectedTarget => {
        const damage = (typeof step.amount === "number") ? step.amount : 0;
        if (damage > 0) dealDamage(sourceCardObj, selectedTarget, damage);
        if (typeof nextEffect === "function") nextEffect();
      }
    );
  }
},
Burn: {
  icon: 'OtherImages/skillEffect/Burn.png',
  name: 'Burn',
  description: 'Deals damage and burns.',
  handler: effectStatusHandler('Burn')
},
Poison: {
  icon: 'OtherImages/skillEffect/Poison.png',
  name: 'Poison',
  description: 'Deals damage and poisons.',
  handler: effectStatusHandler('Poison')
},
Freeze: {
  icon: 'OtherImages/skillEffect/Freeze.png',
  name: 'Freeze',
  description: 'Deals damage and freezes.',
  handler: effectStatusHandler('Freeze')
},
Paralysis: {
  icon: 'OtherImages/skillEffect/Paralysis.png',
  name: 'Paralysis',
  description: 'Deals damage and paralyzes.',
  handler: effectStatusHandler('Paralysis')
},
Bind: {
  icon: 'OtherImages/skillEffect/Bind.png',
  name: 'Bind',
  description: 'Deals damage and binds.',
  handler: effectStatusHandler('Bind')
},
  /*
Burst: {
  icon: 'OtherImages/skillEffect/Burst.png',
  name: 'Burst',
  description: 'Deals damage to all enemy targets.',
  // Updated signature for effect chaining
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    const targets = [...gameState.opponentCreatures, ...gameState.opponentDomains];
    targets.forEach(target => {
      const damage = step.amount != null ? step.amount : 0;
      if (damage > 0) dealDamage(sourceCardObj, target, damage);
      // General status effect logic: apply any status flagged in step
      let statuses = Array.isArray(step.status) ? step.status : (step.status ? [step.status] : []);
      statuses.forEach(statusName => {
        if (STATUS_EFFECTS[statusName]) {
          applyStatus(target, statusName);
        }
      });
    });
    if (nextEffect) nextEffect();
  }
}, */

// --- SELF SUMMONING SKILLS --- //
Dash: {
  icon: 'OtherImages/skillEffect/Dash.png',
  name: 'Dash',
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
    } else if (category.includes("domain")) {
      targetArr = gameState.playerDomains;
    } else {
      showToast("Dash can only be used for creatures or domains.");
      if (nextEffect) nextEffect();
      return;
    }
    runHandSkillWithAnimation(sourceCardObj, skillObj, targetArr, () => {
      showSummonPositionModal(sourceCardObj, function(chosenOrientation) {
        // Calculate half base HP (rounded up), fallback to 1 if not defined
        const baseHp = getBaseHp(sourceCardObj.cardId) || 1;
        const halfHp = Math.ceil(baseHp / 2);

        // If step overrides HP, use that (future-proofing)
        const summonHp = typeof step.hp === "number" ? step.hp : halfHp;

        moveCard(
          sourceCardObj.instanceId,
          gameState.playerHand,
          targetArr,
          { orientation: chosenOrientation, currentHP: summonHp }
        );
        renderGameState();
        setupDropZones && setupDropZones();
        if (nextEffect) nextEffect();
      });
    });
  },
  canActivate: function(cardObj, skillObj, currentZone, gameState) {
    // Only allow activation if the card is in the hand zone
    return currentZone === "hand" && gameState.playerHand.includes(cardObj);
  }
},
Reanimate: {
  icon: 'OtherImages/skillEffect/Reanimate.png',
  name: 'Reanimate',
  description: 'Summon this card from the void.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    // Only resolve if card is in void
    const isVoid = gameState.playerVoid.includes(sourceCardObj);
    if (!isVoid) {
      showToast("Reanimate can only be activated from the void.");
      if (nextEffect) nextEffect();
      return;
    }
    // Determine target zone: creatures/domains by card type
    const cardData = dummyCards.find(c => c.id === sourceCardObj.cardId);
    let targetArr;
    const category = Array.isArray(cardData.category)
      ? cardData.category.map(c => c.toLowerCase())
      : [String(cardData.category).toLowerCase()];
    if (category.includes("creature")) {
      targetArr = gameState.playerCreatures;
    } else if (category.includes("domain")) {
      targetArr = gameState.playerDomains;
    } else {
      showToast("Reanimate can only be used for creatures or domains.");
      if (nextEffect) nextEffect();
      return;
    }
    // Prompt orientation (if needed)
    showSummonPositionModal(sourceCardObj, function(chosenOrientation) {
      moveCard(
        sourceCardObj.instanceId,
        gameState.playerVoid,
        targetArr,
        { orientation: chosenOrientation, currentHP: getBaseHp(sourceCardObj.cardId) }
      );
      closeAllModals();
      renderGameState();
      if (nextEffect) nextEffect();
    });
  },
  canActivate: function(cardObj, skillObj, currentZone, gameState) {
    // Only allow activation if the card is in the void zone
    return currentZone === "void" && gameState.playerVoid.includes(cardObj);
  }
},
Awaken: {
  icon: 'OtherImages/skillEffect/Awaken.png',
  name: 'Awaken',
  description: 'Summon this card from your deck.',
  handler: function(sourceCardObj, skillObj) {
    // Only activate if in deck
    const isDeck = gameState.playerDeck.includes(sourceCardObj);
    if (!isDeck) {
      showToast("Awaken can only be activated from your deck.");
      return;
    }
    const cardData = dummyCards.find(c => c.id === sourceCardObj.cardId);
    const category = Array.isArray(cardData.category)
      ? cardData.category.map(c => c.toLowerCase())
      : [String(cardData.category).toLowerCase()];
    let targetArr;
    if (category.includes("creature")) {
      targetArr = gameState.playerCreatures;
    } else if (category.includes("domain")) {
      targetArr = gameState.playerDomains;
    } else {
      showToast("Awaken can only be used for creatures or domains.");
      return;
    }
    // Animation (optional)
    runDeckSkillWithAnimation && runDeckSkillWithAnimation(sourceCardObj, skillObj, targetArr, () => {
      showSummonPositionModal(sourceCardObj, function(chosenOrientation) {
        moveCard(
          sourceCardObj.instanceId,
          gameState.playerDeck,
          targetArr,
          { orientation: chosenOrientation, currentHP: getBaseHp(sourceCardObj.cardId) }
        );
        closeAllModals();
        renderGameState();
      });
    });
  },
  canActivate: function(cardObj, skillObj, currentZone, gameState) {
    return currentZone === "deck" && gameState.playerDeck.includes(cardObj);
  }
},
Heal: {
  icon: 'OtherImages/skillEffect/Heal.png',
  name: 'Heal',
  description: 'Heals an ally.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    const allPlayerField = [...gameState.playerCreatures, ...gameState.playerDomains];
    startSkillTarget(
      allPlayerField,
      selectedTargets => {
        const targets = Array.isArray(selectedTargets) ? selectedTargets : [selectedTargets];
        const healAmount = (typeof step.amount === "number") ? step.amount : 0;
        targets.forEach(target => {
          if (healAmount > 0) healTarget(target, healAmount);
        });
        if (typeof nextEffect === "function") nextEffect();
        renderGameState();
      },
      step.target // how many targets to select
    );
  }
},
  Cleanse: {
    icon: 'OtherImages/skillEffect/Cleanse.png',
    name: 'Cleanse',
    description: 'Removes debuffs/status effects from an allied target.',
    handler: function(sourceCardObj, skillObj) {
      startSkillTarget(
        [...gameState.allyCreatures, ...gameState.allyDomains],
        selectedTarget => {
          cleanseTarget(selectedTarget);
          renderGameState();
        }
      );
    }
  },
Armor: {
  icon: 'OtherImages/skillEffect/Armor.png',
  name: 'Armor',
  description: 'Grants armor to an ally.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    const allPlayerField = [...gameState.playerCreatures, ...gameState.playerDomains];
    startSkillTarget(
      allPlayerField,
      selectedTargets => {
        const targets = Array.isArray(selectedTargets) ? selectedTargets : [selectedTargets];
        const armorAmount = (typeof step.amount === "number") ? step.amount : 0;
        targets.forEach(target => {
          if (armorAmount > 0) grantArmor(target, armorAmount);
        });
        if (typeof nextEffect === "function") nextEffect();
        renderGameState();
      },
      step.target // how many targets to select
    );
  }
},
  Aegis: {
    icon: 'OtherImages/skillEffect/Aegis.png',
    name: 'Aegis',
    description: 'Grants a shield that blocks the next incoming damage.',
    handler: function(sourceCardObj, skillObj) {
      startSkillTarget(
        [...gameState.allyCreatures, ...gameState.allyDomains],
        selectedTarget => {
          grantAegis(selectedTarget);
          renderGameState();
        }
      );
    }
  },
  Recall: {
    icon: 'OtherImages/skillEffect/Recall.png',
    name: 'Recall',
    description: 'Return this card from the void to your hand.',
    handler: function(sourceCardObj, skillObj) {
      const isVoid = gameState.playerVoid.includes(sourceCardObj);
      if (!isVoid) {
        showToast("Recall can only be activated from the void.");
        return;
      }
      moveCard(sourceCardObj.instanceId, gameState.playerVoid, gameState.playerHand);
      renderGameState();
    }
  },
Destroy: {
  icon: 'OtherImages/skillEffect/Destroy.png',
  name: 'Destroy',
  description: 'Destroy a valid target according to skill condition.',
  handler: function(sourceCardObj, skillObj) {
    // Collect all field zones: creatures and domains (both sides)
    const fieldArrays = [
      gameState.playerCreatures,
      gameState.opponentCreatures,
      gameState.playerDomains,
      gameState.opponentDomains
    ];
    const allTargets = fieldArrays.flat();

    // Use skillObj.condition
    const validTargets = getValidTargetsByCondition(allTargets, skillObj.condition || []);
    if (validTargets.length === 0) {
      showToast("No valid targets to destroy");
      return;
    }
    startSkillTarget(validTargets, selectedTarget => {
      // Determine correct void array based on owner
      const isPlayerCard =
        gameState.playerCreatures.includes(selectedTarget) ||
        gameState.playerDomains.includes(selectedTarget);
      const voidArr = isPlayerCard ? gameState.playerVoid : gameState.opponentVoid;

      moveCard(selectedTarget.instanceId, getZoneArrayForCard(selectedTarget), voidArr);
      renderGameState();
    });
  }
},
  Search: {
    icon: 'OtherImages/skillEffect/Search.png',
    name: 'Search',
    description: 'Search your deck for a card matching criteria and add it to your hand.',
    // Now using (sourceCardObj, skillObj, step, nextEffect)
    handler: function(sourceCardObj, skillObj, step, nextEffect) {
      // Always use deck as source, hand as destination
      const deckArr = gameState.playerDeck;
      // Filtering logic (archetype, type, color, etc) from this step only
      const filterKeys = Object.keys(step).filter(k => !['zone', 'type', 'effect'].includes(k));
      const matches = deckArr.filter(cardObj => { 
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
        showToast("No matching cards found in your deck.");
        if (nextEffect) nextEffect();
        return;
      }
      showFilteredCardSelectionModal(matches, selectedCardObj => {
        moveCard(selectedCardObj.instanceId, gameState.playerDeck, gameState.playerHand);
        gameState.playerDeck = shuffle(gameState.playerDeck);
        closeAllModals();
        renderGameState();
        showToast(`${dummyCards.find(c=>c.id===selectedCardObj.cardId)?.name || "Card"} added to your hand!`);
        if (nextEffect) nextEffect();
      }, { title: "Search Deck - Choose a card" });
    }
  },
  // --- Moves another player card from void to field ---
  Revive: {
    icon: 'OtherImages/skillEffect/Revive.png',
    name: 'Revive',
    description: 'Revive a card from your void.',
    handler: function(sourceCardObj, skillObj) {
      const res = skillObj.resolution || {};
      const filterKeys = Object.keys(res).filter(k => !['zone', 'type', 'effect'].includes(k));
      const matches = gameState.playerVoid.filter(cardObj => {
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
        showToast("No matching cards found in your void.");
        return;
      }
      showFilteredCardSelectionModal(matches, selectedCardObj => {
        // Determine target zone (creature or domain)
        const cardData = dummyCards.find(c => c.id === selectedCardObj.cardId);
        let targetArr;
        const category = Array.isArray(cardData.category)
          ? cardData.category.map(c => c.toLowerCase())
          : [String(cardData.category).toLowerCase()];
        if (category.includes("creature")) {
          targetArr = gameState.playerCreatures;
        } else if (category.includes("domain")) {
          targetArr = gameState.playerDomains;
        } else {
          showToast("Revive can only be used for creatures or domains.");
          return;
        }
        showSummonPositionModal(selectedCardObj, function(chosenOrientation) {
          moveCard(selectedCardObj.instanceId, gameState.playerVoid, targetArr, { orientation: chosenOrientation, currentHP: getBaseHp(selectedCardObj.cardId) });
          renderGameState();
        });
      }, { title: "Revive from Void - Choose a card" });
    }
  },
  // --- Moves another opponent card from field to hand ---
Bounce: {
  icon: 'OtherImages/skillEffect/Bounce.png',
  name: 'Bounce',
  description: 'Return any card from the field to the hand.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    // All creatures/domains on both sides
    const fieldArrs = [
      gameState.playerCreatures, gameState.playerDomains,
      gameState.opponentCreatures, gameState.opponentDomains
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
      const handArr = owner === "opponent" ? gameState.opponentHand : gameState.playerHand;
      moveCard(selectedCardObj.instanceId, fromArr, handArr);
      renderGameState();
      if (nextEffect) nextEffect();
    }, { title: "Bounce - Choose a card", count: 1 });
  }
},

  // --- Moves another opponent card from field to deck ---
Banish: {
  icon: 'OtherImages/skillEffect/Banish.png',
  name: 'Banish',
  description: 'Return any card from the field to the deck.',
  handler: function(sourceCardObj, skillObj, step, nextEffect) {
    // All creatures/domains on both sides
    const fieldArrs = [
      gameState.playerCreatures, gameState.playerDomains,
      gameState.opponentCreatures, gameState.opponentDomains
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
      const deckArr = owner === "opponent" ? gameState.opponentDeck : gameState.playerDeck;
      moveCard(selectedCardObj.instanceId, fromArr, deckArr);
      // Shuffle that owner's deck
      if (owner === "opponent") {
        gameState.opponentDeck = shuffle(gameState.opponentDeck);
      } else {
        gameState.playerDeck = shuffle(gameState.playerDeck);
      }
      renderGameState();
      if (nextEffect) nextEffect();
    }, { title: "Banish - Choose a card", count: 1 });
  }
},
Seal: {
  icon: "OtherImages/skillEffect/Seal.png",
  name: "Seal",
  description: "Disables all skills on the target until Seal is removed.",
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
Unseal: {
  name: "Unseal",
  description: "Remove Seal from this card.",
  handler: function(cardObj, skillObj, effectStep, nextEffect) {
    removeStatus(cardObj, "Seal");
    renderGameState();
    nextEffect && nextEffect();
  }
},
Essence: {
  icon: 'OtherImages/skillEffect/Essence.png',
  name: 'Essence',
  description: 'Gain Essence.',
  // step should have: { color: "{g}{g}{r}" } or similar
  handler: function(cardObj, skillObj, effectStep, nextEffect) {
    let colorStr = effectStep.color || effectStep.colors || effectStep.essence || "";
    if (!colorStr) {
      showToast && showToast("No Essence string provided.");
      nextEffect && nextEffect();
      return;
    }
    // Match all {x} or {X}
    const matches = colorStr.match(/\{([gruypbwc0-9]+)\}/gi);
    if (!matches) {
      showToast && showToast("No valid Essence found in string.");
      nextEffect && nextEffect();
      return;
    }
    // Add each essence symbol to the cardObj
    matches.forEach(m => {
      const type = m.replace(/[{}]/g, '').toUpperCase();
      if ("GRUYCPBW".includes(type)) {
        addEssence(cardObj, type, 1);
      } else if (!isNaN(type)) {
        addEssence(cardObj, "colorless", Number(type));
      }
    });
    renderGameState && renderGameState();
    nextEffect && nextEffect();
  }
},
// --- FUSION --- //
  Fuse: {
    icon: 'OtherImages/skillEffect/Fuse.png',
    name: 'Fuse',
    description: 'This card becomes Fused, enabling fusion combos.',
    zones: ['playerCreatures', 'playerDomains'], // Only from field
    canActivate(cardObj, skillObj, currentZone, gameState) {
      // Only on the field, and not already fused.
      return ['playerCreatures', 'playerDomains'].includes(currentZone) && !cardObj._fused;
    },
    handler(cardObj, skillObj, effectStep, nextEffect) {
      cardObj._fused = true;
      cardObj.statuses = cardObj.statuses || [];
      if (!cardObj.statuses.some(s => s.name === 'Fused')) {
        cardObj.statuses.push({ name: 'Fused', duration: null });
      }
      renderGameState && renderGameState();
      nextEffect && nextEffect();
    }
  },
  Fusion: {
    icon: 'OtherImages/skillEffect/Fusion.png',
    name: 'Fusion',
    description: 'Attach two Fused cards of the same type/archetype from your field to this card when summoning it from your hand.',
    zones: ['hand'],
    canActivate(cardObj, skillObj, currentZone, gameState) {
      if (currentZone !== 'hand') return false;
      const fieldCards = [...gameState.playerCreatures, ...gameState.playerDomains];
      const fusedCards = fieldCards.filter(c => c._fused);
      for (let i = 0; i < fusedCards.length; i++) {
        for (let j = i + 1; j < fusedCards.length; j++) {
          if (haveSharedTypeOrArchetype(fusedCards[i], fusedCards[j])) {
            return true;
          }
        }
      }
      return false;
    },
    handler(cardObj, skillObj, effectStep, nextEffect) {
      const fieldCards = [...gameState.playerCreatures, ...gameState.playerDomains];
      const fusedCards = fieldCards.filter(c => c._fused);

      // Find valid pairs
      let validPairs = [];
      for (let i = 0; i < fusedCards.length; i++) {
        for (let j = i + 1; j < fusedCards.length; j++) {
          if (haveSharedTypeOrArchetype(fusedCards[i], fusedCards[j])) {
            validPairs.push([fusedCards[i], fusedCards[j]]);
          }
        }
      }
      if (validPairs.length === 0) {
        showToast && showToast("No valid Fusion pair found.");
        nextEffect && nextEffect();
        return;
      }

      // Pick first valid pair for simplicity (expand to UI selection if needed)
      const pairToUse = validPairs[0];

      // Summon this card to the field
      const cardData = dummyCards.find(c => c.id === cardObj.cardId);
      let targetArr;
      const category = Array.isArray(cardData.category)
        ? cardData.category.map(c => c.toLowerCase())
        : [String(cardData.category).toLowerCase()];
      if (category.includes("creature")) {
        targetArr = gameState.playerCreatures;
      } else if (category.includes("domain")) {
        targetArr = gameState.playerDomains;
      } else {
        showToast && showToast("Fusion can only be used for creatures or domains.");
        nextEffect && nextEffect();
        return;
      }

      // Remove from hand, add to field
      moveCard(cardObj.instanceId, gameState.playerHand, targetArr);

      // Attach the fused cards to the new card
      for (const fusedCard of pairToUse) {
        // Remove from their zone
        let fromArr = gameState.playerCreatures.includes(fusedCard)
          ? gameState.playerCreatures
          : gameState.playerDomains;
        const idx = fromArr.indexOf(fusedCard);
        if (idx !== -1) fromArr.splice(idx, 1);

        // Remove "Fused" status and flag (optional, or keep as history)
        fusedCard._fused = false;
        if (fusedCard.statuses) fusedCard.statuses = fusedCard.statuses.filter(s => s.name !== 'Fused');

        // Attach to the newly summoned card
        attachCard(cardObj, fusedCard);
      }
      renderGameState && renderGameState();
      setupDropZones && setupDropZones();
      nextEffect && nextEffect();
    }
  },
// --- EVOLUTION --- //
  Evolve: {
    icon: 'OtherImages/skillEffect/Evolve.png',
    name: 'Evolve',
    description: 'Gains an Evolution Sigil.',
    zones: ['playerCreatures', 'playerDomains'], // Only from field
    canActivate(cardObj, skillObj, currentZone, gameState) {
      return (
        ['playerCreatures', 'playerDomains'].includes(currentZone) &&
        !cardObj._evolved
      );
    },
    handler(cardObj, skillObj, effectStep, nextEffect) {
      cardObj._evolved = true;
      cardObj.statuses = cardObj.statuses || [];
      if (!cardObj.statuses.some(s => s.name === 'Evolved')) {
        cardObj.statuses.push({ name: 'Evolved', duration: null });
      }
      if (typeof renderGameState === "function") renderGameState();
      if (typeof nextEffect === "function") nextEffect();
    }
  },

Evolution: {
  // ...same canActivate as before...
  handler(cardObj, skillObj, effectStep, nextEffect) {
    // Find all evolved cards on field
    const evolvedCards = [
      ...gameState.playerCreatures,
      ...gameState.playerDomains
    ].filter(c => c._evolved);

    if (evolvedCards.length === 0) {
      showToast && showToast("No evolved card available for Evolution.");
      nextEffect && nextEffect();
      return;
    }

    const target = evolvedCards[0]; // Or let player pick

    // Summon this card from hand to field
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    let targetArr;
    const category = Array.isArray(cardData.category)
      ? cardData.category.map(c => c.toLowerCase())
      : [String(cardData.category).toLowerCase()];
    if (category.includes("creature")) targetArr = gameState.playerCreatures;
    else if (category.includes("domain")) targetArr = gameState.playerDomains;
    else {
      showToast && showToast("Evolution can only be used for creatures or domains.");
      nextEffect && nextEffect();
      return;
    }

    moveCard(cardObj.instanceId, gameState.playerHand, targetArr);

    // Remove from field and attach to the new card
    let fromArr = gameState.playerCreatures.includes(target)
      ? gameState.playerCreatures
      : gameState.playerDomains;
    const idx = fromArr.indexOf(target);
    if (idx !== -1) fromArr.splice(idx, 1);

    target._evolved = false;
    if (target.statuses) target.statuses = target.statuses.filter(s => s.name !== 'Evolved');

    attachCard(cardObj, target);

    renderGameState && renderGameState();
    setupDropZones && setupDropZones();
    nextEffect && nextEffect();
  }
},
NullCounter: {
  icon: 'OtherImages/skillEffect/NullCounter.png',
  name: 'Null Counter',
  description: 'Grants Null Counters to a player. Step fields: amount (number), owner ("source" | "player" | "opponent" | "opponentOfSource").',
  handler: function(sourceCardObj, skillObj, step = {}, nextEffect) {
    const amount = Math.max(0, Number(step.amount) || 1);

    // Determine who receives the counters (default = source owner)
    const sourceOwner = getCardOwner(sourceCardObj) || 'player';
    const opponent = sourceOwner === 'player' ? 'opponent' : 'player';
    let grantTo = sourceOwner;

    if (step.owner === 'player') grantTo = 'player';
    else if (step.owner === 'opponent') grantTo = 'opponent';
    else if (step.owner === 'opponentOfSource' || step.owner === 'opponent_of_source') grantTo = opponent;
    else if (step.owner === 'source') grantTo = sourceOwner;

    addNullCounters(grantTo, amount);

    appendVisualLog && appendVisualLog({
      action: 'nullCounter',
      text: `${grantTo === 'player' ? 'You' : 'Opponent'} gained ${amount} Null Counter${amount === 1 ? '' : 's'}.`
    });

    if (typeof nextEffect === "function") nextEffect();
  }
},
Token: {
  icon: "OtherImages/skillEffect/Token.png",
  name: "Token",
  description: "Summon tokens to the battlefield.",
  handler: function(sourceCardObj, skillObj, effectStep, nextEffect) {
    let choices = effectStep.tokenChoices || effectStep.tokens || effectStep.choices;
    let amount = Number(effectStep.amount) || 1;
    if (!choices) choices = [effectStep.tokenId || effectStep.token];
    if (!Array.isArray(choices)) choices = [choices];
    const tokenDefs = choices
      .map(tokenId => dummyCards.find(c => c.id === tokenId && c.isToken))
      .filter(Boolean);

    // Auto-summon if only one choice and amount > 1
    if (tokenDefs.length === 1) {
      for (let i = 0; i < amount; i++) {
        summonTokenInstance(tokenDefs[0], sourceCardObj);
      }
      nextEffect && nextEffect();
      return;
    }

    // Modal for multiple token choices or for amount > 1 with multiple options
    showTokenSelectionModal(tokenDefs, amount, selectedDefs => {
      selectedDefs.forEach(tokenDef => summonTokenInstance(tokenDef, sourceCardObj));
      nextEffect && nextEffect();
    });
  }
},
  Drought:      { handler: weatherSetter("Drought") },
  Rain:         { handler: weatherSetter("Rain") },
  Thunderstorm: { handler: weatherSetter("Thunderstorm") },
  Snowfall:     { handler: weatherSetter("Snowfall") },
  GaleWinds:    { handler: weatherSetter("GaleWinds") },
  BloodMoon:    { handler: weatherSetter("BloodMoon") },
  Ashfall:      { handler: weatherSetter("Ashfall") },
  ToxicMiasma:  { handler: weatherSetter("ToxicMiasma") },
  Mystveil:     { handler: weatherSetter("Mystveil") },
  // Add more effects as needed (Strike, Heal, Destroy, etc.)
};
const WEATHER_EFFECTS = {
  Sunlight: {
    icon: 'Icons/Status/Sunlight.png',
    color: "Red",
    description: "Red{r} creatures gain {1}/{0}.",
    passive: (cardObj) => isRed(cardObj) ? { atk: 1 } : null
  },
  Sunburst: {
    icon: 'Icons/Status/Sunburst.png',
    name: 'Sunburst',
    description: '{r} & {w} creatures gain {2}/{1}.',
    passive: (cardObj) => (isWhite(cardObj) || isRed(cardObj) ? { atk: 1 } : null)
  },
  Rain: {
    icon: 'Icons/Status/Rain.png',
    color: "Blue",
    description: "{u} creatures gain {0}/{1}.",
    passive: (cardObj) => isBlue(cardObj) ? { def: 1 } : null
  },
  Downpour: {
    icon: 'Icons/Status/Downpour.png',
    name: 'Downpour',
    description: '{u} creatures gain {1}/{2}.',
    passive: (cardObj) => (isBlue(cardObj) ? { def: 2 } : null)
  },
  Storm: {
    icon: 'Icons/Status/Storm.png',
    name: 'Storm',
    description: '{u} & {y} creatures gain {1}/{0}.',
    passive: (cardObj) => (isBlue(cardObj) || isYellow(cardObj) ? { atk: 1 } : null)
  },
  Thunderstorm: {
    icon: 'Icons/Status/Thunderstorm.png',
    colors: ["Blue", "Yellow"], archetype: "Stormcore",
    description: "{u} & {y} creatures gain {1}/{0}.",
    passive: (cardObj) =>
      (isBlue(cardObj) || isYellow(cardObj) || isArchetype(cardObj, "Stormcore")) ? { atk: 1 } : null
  },
  Snowfall: {
    icon: 'Icons/Status/Snowfall.png',
    archetype: "Frostland",
    description: "Frostland {frostland} creatures gain {0}/{1}.",
    passive: (cardObj) => isArchetype(cardObj, "Frostlands") ? { def: 1 } : null
  },
  GaleWinds: {
    ability: "Flying",
    description: "Flying {flying} creatures gain {0}/{1} and {1} Spd.",
    passive: (cardObj) => (isArchetype(cardObj, "Zephyra") || hasFlying(cardObj)) ? { def: 1 } : null
  },
BloodMoon: {
  archetype: "Moonfang",
  type: "Beast",
  description: "Moonfang {moonfang} and Beast {beast} creatures gain {1}/{0}.",
  passive: (cardObj) => {
    if (!cardObj) return null;
    const mods = {};
    // grant +1 ATK for being Moonfang
    if (isArchetype(cardObj, "Moonfang")) {mods.atk = (mods.atk || 0) + 1;}
    // grant +1 ATK for being a Beast type
    if (isBeast(cardObj)) {mods.atk = (mods.atk || 0) + 1;}
    return Object.keys(mods).length ? mods : null;
  }
},
  Ashfall: {
    icon: 'Icons/Status/Ashfall.png',
    colors: ["Red", "Gray"], archetype: "Golem",
    description: "Red{r}/Gray{c} and Golem {golem} creatures gain {0}/{1}.",
    passive: (cardObj) =>
      (isRed(cardObj) || isGray(cardObj) || isArchetype(cardObj, "Golemheart")) ? { def: 1 } : null
  },
  Decay: {
    icon: 'Icons/Status/Decay.png',
    color: "Purple",
    description: "{p} creatures gain {1}/{0}.",
    passive: (cardObj) => isPurple(cardObj) ? { atk: 1 } : null
  },
  Myst: {
    icon: 'Icons/Status/Myst.png',
    color: "Green", type: "Faefolk",
    description: "Green {g} and Fairy {fairy} creatures gain +1 DEF {0}/{1}.",
    passive: (cardObj) => (isGreen(cardObj) || isFairy(cardObj)) ? { def: 1 } : null
  }
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
function setBattlefieldBackgrounds(playerBannerUrl, opponentBannerUrl) {
  const playerBg = document.getElementById('battlefield-player-bg');
  const opponentBg = document.getElementById('battlefield-opponent-bg');
  if (playerBg && playerBannerUrl) {
    playerBg.style.backgroundImage = `url('${playerBannerUrl}')`;
    playerBg.style.backgroundSize = "cover";
    playerBg.style.backgroundPosition = "center";
    playerBg.style.backgroundRepeat = "no-repeat";
  }
  if (opponentBg && opponentBannerUrl) {
    opponentBg.style.backgroundImage = `url('${opponentBannerUrl}')`;
    opponentBg.style.backgroundSize = "cover";
    opponentBg.style.backgroundPosition = "center";
    opponentBg.style.backgroundRepeat = "no-repeat";
  }
}
// Unified game start function for all modes (solo/cpu, casual, private, etc)
function startGame({
  mode = "solo",              // "solo", "casual", "private", etc
  playerDeck,                 // deckObj for player
  opponentDeck,               // deckObj for opponent/CPU
  playerProfile,              // {username, avatar, banner}
  opponentProfile,            // {username, avatar, banner}
  isCpuGame = false,          // true for CPU
  matchData = null            // full matchData for casual/private modes
}) {
  // --- Deck/State setup ---
  gameState.playerDeck = shuffle(buildDeck(playerDeck));
  // For opponent: if it's an array of cards, use directly; otherwise, build it
  if (Array.isArray(opponentDeck) && opponentDeck.length && opponentDeck[0].cardId) {
    // Solo/CPU - deck is already built
    gameState.opponentDeck = shuffle([...opponentDeck]);
  } else {
    // Multiplayer - build deck from definition
    gameState.opponentDeck = shuffle(buildDeck(opponentDeck));
  }
  gameState.playerHand = [];
  gameState.playerCreatures = [];
  gameState.playerDomains = [];
  gameState.playerVoid = [];
  gameState.opponentHand = [];
  gameState.opponentCreatures = [];
  gameState.opponentDomains = [];
  gameState.opponentVoid = [];
  
  gameState.turn = "player";
  gameState.phase = "draw";
  
  gameState.timeOfDay = "dawn";
  gameState.pendingDayNightTransition = "day";
  
  gameState.playerDominion = null;
  gameState.opponentDominion = null;
  putRandomChampionOnTop(gameState.playerDeck);
  // --- Battlefield backgrounds ---
  setBattlefieldBackgrounds(
    playerDeck?.bannerArt || "CardImages/Banners/DefaultBanner.png",
    opponentDeck?.bannerArt || "CardImages/Banners/DefaultBanner.png"
  );

  // --- UI activation ---
  document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
  document.getElementById('gameplay-section').classList.add('active');
  document.getElementById('my-profile').style.display = '';
  document.getElementById('opponent-profile').style.display = '';
  
  // --- Profile panels ---
  // Player profile
  const myProfileDiv = document.getElementById('my-profile');
  myProfileDiv.innerHTML = "";
  const realProfile = {
    username: window.playerUsername || "You",
    avatar: window.playerProfilePic || "CardImages/Avatars/Default.png",
    banner: window.playerProfileBanner || "CardImages/Banners/DefaultBanner.png",
    power: typeof calculatePlayerPower === "function" ? calculatePlayerPower() : 0
  };
  // Use real profile in solo/CPU mode, but not for casual/private modes (where playerProfile is correct)
  if (isCpuGame || mode === "solo") {
    playerProfile = realProfile;
  }
  myProfileDiv.appendChild(renderProfilePanel(playerProfile));

  // Opponent profile
  const oppProfileDiv = document.getElementById('opponent-profile');
  oppProfileDiv.innerHTML = "";
  oppProfileDiv.appendChild(renderProfilePanel(opponentProfile));

  // --- Battlefield zones ---
  renderGameState();
  setupDropZones();
  updatePhase();

  // --- Game Start Animation, Coin Flip, Champion/Domain selection ---
  showGameStartAnimation(() => {
    showCoinFlipModal(function(whoStarts) {
      gameState.turn = whoStarts;
      gameState.phase = "draw";
      initiateDominionSelection(gameState.playerDeck, () => {
        drawOpeningHands();
        renderGameState();
        setupDropZones();
      });
    });
  });

  // --- Multiplayer mode hooks (add if needed) ---
  if (mode === "casual" && matchData) {
    // e.g. assign gameState.playerProfile/opponentProfile for sync
    gameState.playerProfile = playerProfile;
    gameState.opponentProfile = opponentProfile;
  }

  // Additional mode logic can go here (private, ranked, etc)
}

// ===================================
// === GAME SETUP HELPER FUNCTIONS ===
// ===================================
function drawOpeningHands() {
  drawCards("player", INITIAL_HAND_SIZE);
  drawCards("opponent", INITIAL_HAND_SIZE);
}
function getZoneArray(zoneId) {
  for (const zoneName in ZONE_MAP) {
    if (ZONE_MAP[zoneName].id === zoneId) return ZONE_MAP[zoneName].arr();
  }
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
  for (const zoneName in ZONE_MAP) {
    if (ZONE_MAP[zoneName].arr().includes(cardObj)) return ZONE_MAP[zoneName].id;
  }
  return '';
}
function findCardFieldArray(cardObj) {
  for (const zoneName in ZONE_MAP) {
    if (
      zoneName.endsWith("Creatures") ||
      zoneName.endsWith("Domains")
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
  for (const key of ['type', 'archetype', 'color', 'trait', 'category']) {
    if (requirement[key]) filter[key] = requirement[key];
  }
  return filter;
}
// --- Utility: Determine card owner as "player" or "opponent" ---
function getCardOwner(cardObj) {
  if (gameState.playerCreatures.includes(cardObj) || gameState.playerDomains.includes(cardObj)) return "player";
  if (gameState.opponentCreatures.includes(cardObj) || gameState.opponentDomains.includes(cardObj)) return "opponent";
  return null;
}
// --- Robust Activation Trigger Handler ---
function handleActivationTriggers(eventType, contextCard, extraContext = {}) {
  // eventType: e.g. "Echo", "Draw", "Arrival"
  // contextCard: the card that triggered the event (e.g. the card that entered the void)
  // extraContext: any other info to pass to the effect

  // Get all cards in all relevant zones
  const allCards = [
    ...gameState.playerCreatures, ...gameState.playerDomains,
    ...gameState.playerVoid, ...gameState.playerHand, ...gameState.playerDeck,
    ...gameState.opponentCreatures, ...gameState.opponentDomains,
    ...gameState.opponentVoid, ...gameState.opponentHand, ...gameState.opponentDeck
  ];

  allCards.forEach(cardObj => {
    if (!cardObj.skill) return;
    const skills = Array.isArray(cardObj.skill) ? cardObj.skill : [cardObj.skill];
    skills.forEach(skill => {
      if (skill.activation && skill.activation.class === eventType) {
        // Build filterFields from skill.activation
        const filterFields = {};
        for (const key of ["type", "archetype", "color", "category", "trait"]) {
          if (skill.activation[key]) filterFields[key] = skill.activation[key];
        }
        // If no filters, apply to self (e.g. Echo), only if cardObj === contextCard
        // If filters, match contextCard against them (e.g. Red Echo, Fairy Echo, etc)
        const appliesToSelf = Object.keys(filterFields).length === 0 && cardObj === contextCard;
        const appliesByFilter = Object.keys(filterFields).length > 0 && matchesFilter(contextCard, filterFields);

        if (appliesToSelf || appliesByFilter) {
          showActivationConfirmModal(cardObj, skill, () => {
            resolveSkill(cardObj, skill, { triggerCard: contextCard, ...extraContext });
          });
        }
      }
    });
  });
}
// --- Helper: Show modal to confirm skill activation ---
function showActivationConfirmModal(cardObj, skillObj, onConfirm) {
  // Remove any existing modal
  let modal = document.getElementById('activation-confirm-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'activation-confirm-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 99999;
  modal.onclick = function(e) {
    if (e.target === modal) modal.remove();
  };

  const content = document.createElement('div');
  content.className = 'modal-content';
  content.onclick = e => e.stopPropagation();

  // You can customize this as needed for better skill info
  content.innerHTML = `
    <h3>Activate Skill?</h3>
    <div style="margin-bottom:12px;">
      <b>${skillObj.name || "Skill"}</b>
      <div style="font-size:0.95em;color:#aaa;margin:8px 0;">
        Are you sure you want to activate this skill${cardObj.name ? ` on <b>${cardObj.name}</b>` : ""}?
      </div>
    </div>
    <button id="activation-confirm-btn" class="btn-primary" style="margin-right:14px;">Activate</button>
    <button id="activation-cancel-btn" class="btn-negative-secondary">Cancel</button>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  document.getElementById('activation-confirm-btn').onclick = function() {
    modal.remove();
    if (typeof onConfirm === "function") onConfirm();
  };
  document.getElementById('activation-cancel-btn').onclick = function() {
    modal.remove();
  };
}

// --- TURN FLAGS --- //
function resetTurnFlags(turn) {
  if (turn === "player") {
    const arrs = [...gameState.playerCreatures, ...gameState.playerDomains];
    arrs.forEach(card => {
      // Clear previous per-turn flags
      card.hasChangedPositionThisTurn = false;
      card.hasSummonedThisTurn = false;

      // Compute allowed attacks based on Speed tier:
      const tier = getSpeedTier(card);
      // default allowed attacks = 1
      let allowed = 1;
      if (tier >= 4) allowed = 2;
      if (tier >= 5) allowed = 3;
      // Save remaining attacks for the new turn
      card.attacksRemaining = allowed;
      // Keep legacy flag for compatibility
      card.hasAttacked = card.attacksRemaining <= 0;

      // Grant tier-based evasion counters at start of turn:
      // Speed 2, 3,4,5 grant +1 Evasion (passive)
      if (tier >= 2) {
        // Use addEvasion so render/state updates and any other logic are consistent
        addEvasion(card, 1);
      }
    });
  } else if (turn === "opponent") {
    const arrs = [...gameState.opponentCreatures, ...gameState.opponentDomains];
    arrs.forEach(card => {
      card.hasChangedPositionThisTurn = false;
      card.hasSummonedThisTurn = false;

      const tier = getSpeedTier(card);
      let allowed = 1;
      if (tier >= 4) allowed = 2;
      if (tier >= 5) allowed = 3;
      card.attacksRemaining = allowed;
      card.hasAttacked = card.attacksRemaining <= 0;

      if (tier >= 2) {
        addEvasion(card, 1);
      }
    });
  }
}
function resetTurnResources(turn) {
  const domains = turn === "player" ? gameState.playerDomains : gameState.opponentDomains;
  domains.forEach(domain => generateEssence(domain));
}
function matchesFilter(cardObj, filter) {
  for (let key in filter) {
    if (!fieldIncludes(cardObj, key, filter[key])) return false;
  }
  return true;
}
// Advance / manage the Day-Night cycle including Dusk/Dawn intermediate states.
//
// Behavior:
//  - gameState.timeOfDay ∈ {"day","dusk","night","dawn"}
//  - dayNightCycleCounter counts End Phases (resets on major transitions)
//  - When counter reaches CYCLE_LENGTH we enter the intermediate state:
//      if current === "day"  => set "dusk" for 1 End Phase, pending => "night"
//      if current === "night"=> set "dawn" for 1 End Phase, pending => "day"
//  - The intermediate state ("dusk" or "dawn") lasts exactly one End Phase; at the next End Phase
//    we advance to the pendingDayNightTransition and clear the pending flag.
function handleDayNightCycle() {
  // number of end-phases per main Day/Night period (keeps previous behavior)
  const CYCLE_LENGTH = 4;

  // Ensure fields exist
  gameState.dayNightCycleCounter = Number(gameState.dayNightCycleCounter || 0);
  gameState.pendingDayNightTransition = gameState.pendingDayNightTransition || null;
  gameState.timeOfDay = gameState.timeOfDay || 'day';

  // If we're currently in an intermediate period (dusk/dawn), it only lasts one End Phase.
  if (gameState.timeOfDay === 'dusk' || gameState.timeOfDay === 'dawn') {
    // Move to the pending main state (if set). If not set, fallback to 'night' for dusk and 'day' for dawn.
    const next = gameState.pendingDayNightTransition
      || (gameState.timeOfDay === 'dusk' ? 'night' : 'day');
    gameState.timeOfDay = next;
    gameState.pendingDayNightTransition = null;
    gameState.dayNightCycleCounter = 0;
    renderGameState && renderGameState();
    showToast && showToast(`${capitalize(next)} begins!`, { type: 'info' });
    return;
  }

  // If we're in a main period (day or night), increment the counter and check for scheduled major transition.
  gameState.dayNightCycleCounter++;

  if (gameState.dayNightCycleCounter >= CYCLE_LENGTH) {
    // schedule a short intermediate state before the major switch
    if (gameState.timeOfDay === 'day') {
      gameState.timeOfDay = 'dusk';
      gameState.pendingDayNightTransition = 'night';
      showToast && showToast('Dusk falls...', { type: 'info' });
    } else if (gameState.timeOfDay === 'night') {
      gameState.timeOfDay = 'dawn';
      gameState.pendingDayNightTransition = 'day';
      showToast && showToast('Dawn breaks...', { type: 'info' });
    } else {
      // fallback safety
      gameState.timeOfDay = 'day';
      gameState.pendingDayNightTransition = null;
    }
    gameState.dayNightCycleCounter = 0;
    renderGameState && renderGameState();
  }
}
// small helper used above
function capitalize(s) {
  return String(s || '').charAt(0).toUpperCase() + String(s || '').slice(1);
}
// --- WEATHER --- //
function handleWeatherEffectsEndPhase() {
  if (!Array.isArray(gameState.weatherEffects)) return;
  gameState.weatherEffects.forEach(e => e.duration--);
  gameState.weatherEffects = gameState.weatherEffects.filter(e => e.duration > 0);
  renderGameState(); // show update if needed
}

function renderWeatherEffects() {
  const div = document.getElementById('weather-effects-row');
  if (!div) return;
  div.innerHTML = gameState.weatherEffects.map(e => {
    const w = WEATHER_EFFECTS[e.name];
    return `<span style="margin-right:10px;">
      <img src="OtherImages/Icons/${e.name.replace(/\s+/g, '')}.png" style="height:26px;vertical-align:middle;">
      <span style="color:#ffe066;font-weight:bold">${e.name}</span>
      <span style="color:#fff">(${e.duration})</span>
    </span>`;
  }).join('');
}
// ===================================
// ========== ACTIONS LOGIC ==========
// ===================================
// --- MOVE OBJECT --- //
function getTargets(target, sourceCardObj, context = {}) {
  // Accepts string, array, or object for advanced targeting/filtering
  let arr = [];
  if (Array.isArray(target)) {
    // Array of instanceIds or card objects
    arr = target.map(t =>
      typeof t === "object" ? t :
      Object.values(gameState).flat().find(card => card.instanceId === t)
    ).filter(Boolean);
  } else if (typeof target === "object" && target.zone) {
    // Advanced: zone + filter
    arr = gameState[target.zone] || [];
    if (target.filter) {
      // filter by card property from dummyCards
      arr = arr.filter(cardObj => {
        const cardData = dummyCards.find(c => c.id === cardObj.cardId);
        if (!cardData) return false;
        return Object.entries(target.filter).every(([key, val]) => {
          if (typeof cardData[key] === "string")
            return cardData[key].toLowerCase() === String(val).toLowerCase();
          if (Array.isArray(cardData[key]))
            return cardData[key].map(v => v.toLowerCase()).includes(String(val).toLowerCase());
          return cardData[key] === val;
        });
      });
    }
  } else if (typeof target === "string") {
    switch (target) {
      case "self": arr = [sourceCardObj]; break;
      case "player": arr = [gameState.player]; break;
      case "playerCreatures": arr = gameState.playerCreatures; break;
      case "playerDomains": arr = gameState.playerDomains; break;
      case "playerHand": arr = gameState.playerHand; break;
      case "playerVoid": arr = gameState.playerVoid; break;
      case "opponentCreatures": arr = gameState.opponentCreatures; break;
      case "opponentDomains": arr = gameState.opponentDomains; break;
      case "opponentHand": arr = gameState.opponentHand; break;
      case "opponentVoid": arr = gameState.opponentVoid; break;
      case "playerDominion": arr = gameState.playerDominion ? [gameState.playerDominion] : []; break;
      case "opponentDominion": arr = gameState.opponentDominion ? [gameState.opponentDominion] : []; break;
      case "allCreatures": arr = [...gameState.playerCreatures, ...gameState.opponentCreatures]; break;
      case "allDomains": arr = [...gameState.playerDomains, ...gameState.opponentDomains]; break;
      case "any": arr = Object.values(gameState).flat().filter(card => card && card.cardId); break;
      default: arr = [];
    }
  }
  return arr.filter(Boolean);
}
function moveCard(instanceId, fromArr, toArr, extra = {}, callback) {
  const fromZoneName = getZoneNameForArray(fromArr);
  const toZoneName = getZoneNameForArray(toArr);
  const fromZoneId = ZONE_MAP[fromZoneName]?.id;
  const toZoneId = ZONE_MAP[toZoneName]?.id;

  // Animate move (fade out/in)
  animateCardMove(instanceId, fromZoneId, toZoneId, () => {
    const idx = fromArr.findIndex(card => card.instanceId === instanceId);
    if (idx !== -1) {
      let cardObj = { ...fromArr[idx], ...extra };
      let cardDef = dummyCards.find(c => c.id === cardObj.cardId);

      // Handle attachments (detach if leaving battlefield)
      if (cardObj.attachedCards && cardObj.attachedCards.length > 0) {
        let destinationArr = ZONE_MAP[toZoneName]?.arr();
        if (!destinationArr || toZoneName === "playerVoid" || toZoneName === "opponentVoid") {
          destinationArr = cardObj.owner === "player" ? gameState.playerVoid : gameState.opponentVoid;
        }
        cardObj.attachedCards.forEach(att => destinationArr.push(att));
        cardObj.attachedCards = [];
      }

      // If moving OUT of field, remove combat props
      const fieldZones = ["playerCreatures", "playerDomains", "opponentCreatures", "opponentDomains"];
      const fromField = fieldZones.includes(fromZoneName);
      const toField = fieldZones.includes(toZoneName);
      if (fromField && !toField) {
        delete cardObj.currentHP;
        delete cardObj.orientation;
      }

      // If moving into Void, ensure correct owner
      if (toZoneName === 'playerVoid') {
        toArr = gameState.playerVoid;
      }
      else if (toZoneName === 'opponentVoid') {
        toArr = gameState.opponentVoid;
      }

      // Logging
      let logObj;
      const isDrawToHand = (
        fromZoneName === "playerDeck" && toZoneName === "playerHand"
      ) || (
        fromZoneName === "opponentDeck" && toZoneName === "opponentHand"
      );
      if (isDrawToHand) {
        logObj = {
          sourceCard: {
            image: cardDef?.image,
            name: cardDef?.name,
            cardId: cardDef?.id,
            isDraw: true
          },
          action: "draw",
          dest: "Hand",
          who: fromZoneName === "playerDeck" ? "player" : "opponent",
          sender: gameState.playerProfile?.username || "me"
        };
      } else {
        logObj = {
          sourceCard: { image: cardDef?.image, name: cardDef?.name, cardId: cardDef?.id },
          action: "move",
          dest: toZoneName.replace(/([A-Z])/g, ' $1').trim(),
          from: fromZoneName,
          who: ["playerHand","playerDeck","playerDomains","playerCreatures"].includes(fromZoneName) ? "player" : "opponent",
          sender: gameState.playerProfile?.username || "me"
        };
      }
      appendVisualLog(logObj, false, logObj.who === "player");
      if (window.socket && window.currentRoomId) {
        window.socket.emit('game action log', window.currentRoomId, logObj);
      }

      // Final move
      fromArr.splice(idx, 1);
      toArr.push(cardObj);
    }
    // === Trigger onSummon event if moving to a field zone ===
    if (["playerCreatures", "playerDomains", "opponentCreatures", "opponentDomains"].includes(getZoneNameForArray(toArr))) {
      const cardObj = toArr[toArr.length - 1];
      queueEvent("onSummon", { summonedCard: cardObj });
    }    
    setupDropZones();
    emitPublicState();
    if (callback) callback();
  });
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
  for (let cardObj of gameState.playerHand) {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    if (!card) continue;
    const div = document.createElement('div');
    div.className = 'card-battlefield';
    div.draggable = true;
    div.ondragstart = (e) => {
      e.dataTransfer.setData("text/plain", cardObj.instanceId);
      e.dataTransfer.setData("source", "hand");
      div.classList.add('dragging');
      e.dataTransfer.setDragImage(div, div.offsetWidth / 2, div.offsetHeight / 2);
    };
    div.ondragend = () => div.classList.remove('dragging');
    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.style.width = "80px";
    div.appendChild(img);
    div.onclick = (e) => {
      e.stopPropagation();
      showHandCardMenu(cardObj.instanceId, div);
    };
    setCardAnimatableClass(div, cardObj, card, gameState, 'hand');
    playerHandDiv.appendChild(div);
  }

  // RENDER OPPONENT HAND FACEDOWN
  const opponentHandDiv = document.getElementById('opponent-hand');
  opponentHandDiv.innerHTML = '';
  let opponentCardback = (window.selectedCpuDeck && window.selectedCpuDeck.cardbackArt)
    ? window.selectedCpuDeck.cardbackArt
    : "OtherImages/Cardbacks/CBDefault.png"; // fallback

  for (let i = 0; i < gameState.opponentHand.length; i++) {
    const div = document.createElement('div');
    div.className = 'card-battlefield';
    const img = document.createElement('img');
    img.src = opponentCardback;
    img.alt = "Opponent's card";
    img.style.width = "80px";
    div.appendChild(img);
    opponentHandDiv.appendChild(div);
  }

  // The following block is invalid and should be removed:
  // const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  // if (isCardActionable(cardObj, cardData, gameState, 'hand')) {
  //   div.classList.add('card-animatable');
  // } else {
  //   div.classList.remove('card-animatable');
  // }

  // RENDER FIELD ZONES
  renderRowZone('opponent-creatures-zone', gameState.opponentCreatures, "creature");
  renderRowZone('opponent-domains-zone', gameState.opponentDomains, "domain");
  renderRowZone('player-creatures-zone', gameState.playerCreatures, "creature");
  renderRowZone('player-domains-zone', gameState.playerDomains, "domain");
  renderRightbarZones();
}

function setCardAnimatableClass(div, cardObj, cardData, gameState, zone) {
  if (isCardActionable(cardObj, cardData, gameState, zone)) {
    div.classList.add('card-animatable');
  } else {
    div.classList.remove('card-animatable');
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
  emitPublicState();
}

function drawCards(who, n) {
  let deck = who === "player" ? gameState.playerDeck : gameState.opponentDeck;
  let hand = who === "player" ? gameState.playerHand : gameState.opponentHand;
  for (let i = 0; i < n && deck.length > 0; i++) {
    hand.push(deck.shift());
  }
  renderGameState();
  setupDropZones();
  emitPublicState();
}


// HAND OPTIONS MENU
function showHandCardMenu(instanceId, cardDiv) {
  closeAllMenus();
  const cardObj = gameState.playerHand.find(c => c.instanceId === instanceId);
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);

  // Always treat cost as string, parse it once for logic
  const canPay = canPayEssence(cardData.cost, getAllEssenceSources());
  let playLabel = "Play";
  let costHtml = getEssenceCostDisplay(cardData.cost);

  if (cardData) {
    const category = cardData.category ? cardData.category.toLowerCase() : '';
    switch (category) {
      case 'creature': playLabel = "Summon"; break;
      case 'spell': playLabel = "Cast"; break;
      case 'domain': playLabel = "Geomancy"; break;
      case 'artifact': playLabel = "Equip"; break;
      default: playLabel = "Play";
    }
  }
if (isCardActionable(cardObj, cardData, gameState, 'hand')) {
  cardDiv.classList.add('card-animatable');
} else {
  cardDiv.classList.remove('card-animatable');
}
  // Define actions
  const buttons = [
    {
      text: `<span>${playLabel}</span> <span >${costHtml}</span>`,
      html: true,
      disabled: !canPay,
      onClick: function(e) {
        e.stopPropagation();
        if (!canPay) return;
        closeAllMenus();
        const cardObj = gameState.playerHand.find(c => c.instanceId === instanceId);
        const cardData = dummyCards.find(c => c.id === cardObj.cardId);

        // Determine allowed target zone
        let targetArr, toZoneId;
        const category = Array.isArray(cardData.category)
          ? cardData.category.map(c => c.toLowerCase())
          : [String(cardData.category).toLowerCase()];

        if (category.includes("creature")) {
          targetArr = gameState.playerCreatures;
          toZoneId = "player-creatures-zone";
        } else if (category.includes("domain")) {
          targetArr = gameState.playerDomains;
          toZoneId = "player-domains-zone";
        } else {
          alert("Card cannot be played.");
          return;
        }
        const parsedCost = parseCost(cardData.cost);
        
        // No cost, play immediately
        if (
          !cardData.cost ||
          Object.values(parsedCost).reduce((a, b) => a + b, 0) === 0 ||
          (typeof cardData.cost === "string" && cardData.cost === "{0}")
        ) {
          showSummonPositionModal(cardObj, function(chosenOrientation) {
            moveCard(instanceId, gameState.playerHand, targetArr, { orientation: chosenOrientation });
            renderGameState();
            setupDropZones();
          });
          return;
        }

        // Otherwise, show payment modal and move after payment
        showEssencePaymentModal({
          card: cardData,
          cost: parsedCost,
          eligibleCards: getAllEssenceSources(),
          onPaid: function() {
            showSummonPositionModal(cardObj, function(chosenOrientation) {
              moveCard(instanceId, gameState.playerHand, targetArr, { orientation: chosenOrientation });
              renderGameState();
              setupDropZones();
            });
          }
        });
      }
    },
    {
      text: "Send to Void",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerVoid);
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
    {
      text: "View",
      onClick: function(e) {
        e.stopPropagation();
        showFullCardModal(cardObj);
        closeAllMenus();
      }
    }
  ];
  // Skill buttons
  if (cardData.skill && Array.isArray(cardData.skill)) {
    cardData.skill
    .filter(skillObj => !skillObj.activation) // Only show skills without activation
    .forEach(skillObj => {
      const isEnabled = canActivateSkill(cardObj, skillObj, 'hand', gameState);
      // PATCH: show CW/CCW icons
      const activation = skillObj.activation || {};
      let requirements = Array.isArray(activation.requirement)
        ? activation.requirement
        : (activation.requirement ? [activation.requirement] : []);
      const reqIcons = getRequirementIcons(requirements);

      buttons.push({
        text: `${skillObj.name} ${parseEffectText(skillObj.cost)}${reqIcons}`,
        html: true,
        disabled: !isEnabled,
        onClick: function(e) {
          e.stopPropagation();
          if (!canActivateSkill(cardObj, skillObj, 'hand', gameState)) return;
          activateSkill(cardObj, skillObj, { currentZone: 'hand' });
          closeAllMenus();
        }
      });
    });
  }
  const menu = createCardMenu(buttons);

  // Position relative to cardDiv
  const rect = cardDiv.getBoundingClientRect();
  placeMenuWithinViewport(menu, rect);

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
  [
    'player-creatures-zone', 
    'player-domains-zone', 
    'opponent-creatures-zone', 
    'opponent-domains-zone'
  ].forEach(zoneId => {
    const zone = document.getElementById(zoneId);
    if (!zone) return;
    zone.ondragover = (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    };
    zone.ondragleave = () => zone.classList.remove('drag-over');
    zone.ondrop = (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const instanceId = e.dataTransfer.getData('text/plain');
      const cardIdx = gameState.playerHand.findIndex(c => c.instanceId === instanceId);
      if (cardIdx === -1) return;

      let targetArr;
      let orientation = "vertical"; // Default orientation

      // Decide target array based on zoneId
      if (zoneId === "player-creatures-zone") {
        targetArr = gameState.playerCreatures;
      } else if (zoneId === "player-domains-zone") {
        targetArr = gameState.playerDomains;
      } else if (zoneId === "opponent-creatures-zone") {
        targetArr = gameState.opponentCreatures;
      } else if (zoneId === "opponent-domains-zone") {
        targetArr = gameState.opponentDomains;
      } else {
        return;
      }

      moveCard(instanceId, gameState.playerHand, targetArr, {orientation});
      renderGameState();
      setupDropZones();
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
        const attachmentIdx = gameState.playerHand.findIndex(c => c.instanceId === instanceId);
        if (attachmentIdx === -1) return;
        const attachmentCardObj = gameState.playerHand[attachmentIdx];

        // Only allow if attachmentCardObj is valid (equipment/aura/etc.)
        // For now, allow any card for testing.
        if (attachCard(cardObj, attachmentCardObj)) {
          gameState.playerHand.splice(attachmentIdx, 1);
          renderGameState();
          setupDropZones();
        }
      };
    }
    zoneDiv.appendChild(cardEl);
  }
}
function renderRightbarZones() {
  const rightbar = document.getElementById('battlefield-rightbar');
  // Get all zone containers
  const oppDeckDiv = document.getElementById('opponent-deck-zone');
  const oppVoidDiv = document.getElementById('opponent-void-zone');
  const playerVoidDiv = document.getElementById('player-void-zone');
  const playerDeckDiv = document.getElementById('player-deck-zone');

  // Fill the zones with current cards
  oppDeckDiv.innerHTML = '';
  appendDeckZone(oppDeckDiv, gameState.opponentDeck, "opponent");

  oppVoidDiv.innerHTML = '';
  appendVoidZone(oppVoidDiv, gameState.opponentVoid, "opponent");

  playerVoidDiv.innerHTML = '';
  appendVoidZone(playerVoidDiv, gameState.playerVoid, "player");

  playerDeckDiv.innerHTML = '';
  appendDeckZone(playerDeckDiv, gameState.playerDeck, "player");

  // Update deck/void counters
  renderDeckVoidCountRow('opponent-count-row', gameState.opponentDeck.length, gameState.opponentVoid.length);
  renderDeckVoidCountRow('player-count-row', gameState.playerDeck.length, gameState.playerVoid.length);

  // Append in desired order
  rightbar.appendChild(document.getElementById('opponent-count-row'));
  rightbar.appendChild(oppDeckDiv);
  rightbar.appendChild(oppVoidDiv);
  rightbar.appendChild(phaseBadge);
  rightbar.appendChild(playerVoidDiv);
  rightbar.appendChild(playerDeckDiv);
  rightbar.appendChild(document.getElementById('player-count-row'));
}
// Helper to create and append the deck zone card at the end
function appendDeckZone(parentDiv, deckArray, who) {
  const deckZone = document.createElement('div');
  deckZone.className = 'deck-zone';

  const deckCard = document.createElement('div');
  deckCard.className = 'card-deck';

  let deckCardback = "OtherImages/Cardbacks/CBDefault.png";
  if (who === "player" && window.selectedPlayerDeck && window.selectedPlayerDeck.deckObj && window.selectedPlayerDeck.deckObj.cardbackArt
  ) {
    deckCardback = window.selectedPlayerDeck.deckObj.cardbackArt;
  } else if (who === "opponent") {
    // Multiplayer/casual
    if (window.selectedOpponentDeck && window.selectedOpponentDeck.cardbackArt) {
      deckCardback = window.selectedOpponentDeck.cardbackArt;
    }
    // Fallback: Opponent profile
    else if (gameState.opponentProfile && gameState.opponentProfile.cardbackArt) {
      deckCardback = gameState.opponentProfile.cardbackArt;
    }
    // Fallback: Opponent deck object
    else if (gameState.opponentDeck && gameState.opponentDeck.cardbackArt) {
      deckCardback = gameState.opponentDeck.cardbackArt;
    }
    // Solo CPU
    else if (window.selectedCpuDeck && window.selectedCpuDeck.cardbackArt) {
      deckCardback = window.selectedCpuDeck.cardbackArt;
    }
  }
  const img = document.createElement('img');
  img.src = deckCardback;
  img.alt = (who === "player" ? "Your Deck" : "Opponent's Deck");
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
      placeMenuWithinViewport(menu, rect);

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
function appendVoidZone(parentDiv, voidArray, who) {
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
    openVoidModal(who === 'opponent');
  };

  parentDiv.appendChild(voidZone);
}
function renderDeckVoidCountRow(rowId, deckCount, voidCount) {
  const row = document.getElementById(rowId);
  if (!row) return;
  row.innerHTML = `
    <span style="display:inline-flex;align-items:center;gap:4px;">
      <img src="OtherImages/Icons/DefaultDeckBox.png" alt="Deck" style="width:30px;height:30px;">
      <span class="deck-count-number">${deckCount}</span>
      <img src="OtherImages/Icons/Void.png" alt="Void" style="width:30px;height:30px;margin-left:10px;">
      <span class="deck-count-number">${voidCount}</span>
    </span>
  `;
}
// REMOVE STAT CHANGES
function cleanCard(cardObj) {
  const cleaned = { ...cardObj };
  delete cleaned.currentHP;
  delete cleaned.orientation;
  return cleaned;
}

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

// CARD POSITION SELECTION MODAL
function showSummonPositionModal(cardObj, onSelected) {
  // Remove any existing modal
  let modal = document.getElementById('summon-position-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'summon-position-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 99999;

  const content = document.createElement('div');
  content.className = 'modal-content';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';
  content.style.gap = '18px';
  content.onclick = e => e.stopPropagation();

  content.innerHTML = `<h3>Select Summon Position</h3>
    <div style="display:flex;gap:30px;justify-content:center;">
      <div id="summon-atk-choice" style="cursor:pointer;text-align:center;">
        <div style="margin-bottom:6px;font-weight:bold;">ATK</div>
        <img src="${dummyCards.find(c => c.id === cardObj.cardId).image}" 
             alt="ATK Position" 
             style="width:90px;transform:rotate(0deg);border:3px solid #ffe066;border-radius:10px;box-shadow:0 0 12px #ffe06677;">
      </div>
      <div id="summon-def-choice" style="cursor:pointer;text-align:center;">
        <div style="margin-bottom:6px;font-weight:bold;">DEF</div>
        <img src="${dummyCards.find(c => c.id === cardObj.cardId).image}" 
             alt="DEF Position" 
             style="width:90px;transform:rotate(90deg);border:3px solid #66aaff;border-radius:10px;box-shadow:0 0 12px #66aaff77;">
      </div>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Click handlers
  content.querySelector('#summon-atk-choice').onclick = function() {
    modal.remove();
    onSelected("vertical"); // ATK
  };
  content.querySelector('#summon-def-choice').onclick = function() {
    modal.remove();
    onSelected("horizontal"); // DEF
  };
}
// OPEN DECK MODAL
function openDeckModal(filteredCards) {
  const modal = document.getElementById('deck-modal');
  // Always attach the close-on-backdrop handler
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
  img.onclick = (e) => {
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
          moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerVoid);
          renderGameState();
          closeAllMenus();
          openDeckModal();
        }
      },
      {
        text: "View",
        onClick: function(ev) {
          ev.stopPropagation();
          showFullCardModal(cardObj);
          closeAllMenus();
        }
      }
    ];
    const menu = createCardMenu(buttons);
    document.body.appendChild(menu); // Append to body, not wrapper

    // Position menu absolutely using the image rect
    const rect = img.getBoundingClientRect();
    placeMenuWithinViewport(menu, rect);

    menu.onclick = function(e) { e.stopPropagation(); };

    // Hide menu when clicking elsewhere
    // Robust: Hide menu when clicking anywhere except the menu itself
    modal.onclick = function(e) {
      if (!e.target.closest('.card-menu')) {
        closeAllMenus();
        if (e.target === modal) modal.style.display = 'none';
      }
    };
  };
  wrapper.appendChild(cardDiv);
  list.appendChild(wrapper);
  cardDiv.appendChild(img);
});

  modal.style.display = "block";
}

// CARD STATS DETECTION
function getBaseHp(cardId) {
  const card = dummyCards.find(c => c.id === cardId);
  return card ? card.hp : 1; // fallback to 1 if not found
}

function computeCardStat(cardObj, statName) {
  // Get base stat from dummyCards
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  
  let base;
  if (statName === "speed") {
    if (cardDef && typeof cardDef.speed === "number") {
      base = cardDef.speed;
    } else {
      // If card has category creature (or category includes "creature"), default to 1
      const category = cardDef?.category;
      const isCreature = (typeof category === "string" && category.toLowerCase() === "creature")
        || (Array.isArray(category) && category.map(c => String(c).toLowerCase()).includes("creature"));
      base = isCreature ? 1 : 0;
    }
  } else {
    base = cardDef?.[statName] ?? 0;
  }
  
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

  // Attachments (if attachments affect stats)
  if (Array.isArray(cardObj.attachedCards)) {
    for (const attachObj of cardObj.attachedCards) {
      // If attachment directly gives stat
      if (typeof attachObj[statName] === "number") mods += attachObj[statName];
      // Or via modifiers array
      if (Array.isArray(attachObj.modifiers)) {
        mods += attachObj.modifiers
          .filter(mod => mod.stat === statName)
          .reduce((sum, mod) => sum + mod.value, 0);
      }
    }
  }
  // Get all field cards using ZONE_MAP
  const fieldZoneNames = Object.keys(ZONE_MAP).filter(name =>
    name.endsWith("Creatures") || name.endsWith("Domains") || name.endsWith("Artifacts")
  );
  const allFieldCards = fieldZoneNames
    .map(name => ZONE_MAP[name].arr())
    .flat();

  // Apply Inspire and similar abilities dynamically
  allFieldCards.forEach(sourceCard => {
    const sourceDef = dummyCards.find(c => c.id === sourceCard.cardId);
    if (!sourceDef?.ability) return;

    const abilityArr = Array.isArray(sourceDef.ability) ? sourceDef.ability : (sourceDef.ability ? [sourceDef.ability] : []);
    abilityArr.forEach(ab => {
      if (typeof ab === "object" && ab.effect === "Inspire") {
        if (matchesFilter(cardObj, ab)) {
          if (statName === "atk" && ab.atk) mods += ab.atk;
          if (statName === "def" && ab.def) mods += ab.def;
          if (statName === "speed" && ab.speed) mods += ab.speed; // allow Inspire to modify speed if defined
        }
      }
    });
  });

  // === NEW: Ability-based passive Speed bonuses ===
  // Abilities that grant +1 Speed: Dash, Dive, Flying, Leap, Ranged/Range, Rush
  if (statName === "speed") {
    // getCardAbilities helper exists elsewhere in file; use it to read ability list
    const abilityList = getCardAbilities(cardObj) || [];
    const speedGranting = new Set(["Dash", "Dive", "Flying", "Leap", "Rush"]);
    abilityList.forEach(a => {
      if (typeof a === "string" && speedGranting.has(a)) {
        mods += 1;
      }
    });
    
  if (typeof isMage === "function" && isMage(cardObj)) {
    mods += 1;
  }
  if (typeof isRanger === "function" && isRanger(cardObj)) {
    mods += 2;
  }

    // === Armor penalty: any Armor on the instance lowers Speed by 1 ===
    // Determine current armor (consider instance value, definition, attachments, and modifiers)
    let currentArmor = 0;
    if (typeof cardObj.armor === "number") currentArmor += cardObj.armor;
    else if (typeof cardDef?.armor === "number") currentArmor += cardDef.armor;

    // Add attachment-provided armor
    if (Array.isArray(cardObj.attachedCards)) {
      for (const att of cardObj.attachedCards) {
        if (typeof att.armor === "number") currentArmor += att.armor;
        if (Array.isArray(att.modifiers)) {
          currentArmor += att.modifiers
            .filter(m => m.stat === "armor")
            .reduce((s,m) => s + (m.value || 0), 0);
        }
      }
    }
    // Count armor modifiers on the cardObj
    if (Array.isArray(cardObj.modifiers)) {
      currentArmor += cardObj.modifiers
        .filter(m => m.stat === "armor")
        .reduce((s, m) => s + (m.value || 0), 0);
    }

    // If any armor is present, apply -1 speed penalty (single step, not per-armor point)
    if (currentArmor > 0) mods -= 1;
  }
  if ((statName === "atk" || statName === "def") && typeof isWarriorTrait === "function" && isWarriorTrait(cardObj)) {
  try {
    // Only apply for creatures (optional - remove isCreature check if you want trait to apply to domains too)
    if (isCreature(cardObj)) {
      const baseHp = getBaseHp(cardObj.cardId) || 1;
      // Only apply when we have currentHP information and it's below 1/3 of base HP
      if (typeof cardObj.currentHP === "number" && cardObj.currentHP < (baseHp / 3)) {
        mods += 1;
      }
    }
  } catch (e) {
    console.warn("Warrior low-HP buff check failed for", cardObj, e);
  }
}
  // === Per-tier passive effects (Speed tiers 0..5) ===
  // Compute effective speed now so we can apply tier-dependent stat buffs.
  // Note: we only apply these passive stat bonuses here (so other code reading atk/def uses them).
  if (statName === "atk" || statName === "def") {
    // We need an approximate speedTier: compute current provisional speed = base + modsBeforeTier
    // To avoid recursive computeCardStat calls, compute provisional speed: base + mods_so_far (only statName 'speed' affects final speed via other modifiers)
    // But here we can call computeCardStat(cardObj, "speed") safely because computeCardStat for 'speed' will not look at atk/def.
    const tier = Math.max(0, Math.round(computeCardStat(cardObj, "speed")));

    // Speed 0 => DEF +1
    if (tier === 0 && statName === "def") {
      mods += 1;
    }
    // Speed >= 3 => ATK +1 (applies for tiers 3,4,5)
    if (tier >= 3 && statName === "atk") {
      mods += 1;
    }
  }
  
  // === Passive Day/Night Buffs ===
  if (gameState.timeOfDay === "day" && statName === "def" && isWhite(cardObj)) {
    mods += 1;
  }
  if (gameState.timeOfDay === "night" && statName === "atk" && isBlack(cardObj)) {
    mods += 1;
  }
  // Apply all active weather effects
  if (Array.isArray(gameState.weatherEffects)) {
    gameState.weatherEffects.forEach(effectObj => {
      const effect = WEATHER_EFFECTS[effectObj.name];
      if (effect && effect.passive) {
        const buff = effect.passive(cardObj);
        if (buff && typeof buff[statName] === "number") {
          mods += buff[statName];
        }
      }
    });
  }  
  // Final rounding/clamping
  if (statName === "speed") {
    // speed should be integer and at least 0
    return Math.max(0, Math.round(base + mods));
  }
  // Clamp to minimum 0
  return Math.max(0, base + mods);
}
// Speed specific helpers
function getSpeedValue(cardObj) {
  // return current effective speed (computed)
  return computeCardStat(cardObj, "speed");
}
function getSpeedTier(cardObj) {
  const val = getSpeedValue(cardObj) || 0;
  return Math.max(0, Math.round(val));
}
function getSpeedDifference(a, b) {
  // positive means a is faster than b
  const aSpeed = getSpeedValue(a) || 0;
  const bSpeed = getSpeedValue(b) || 0;
  return aSpeed - bSpeed;
}
function addSpeed(cardObj, amount) {
  amount = Number(amount) || 0;
  cardObj.modifiers = cardObj.modifiers || [];
  // push a speed modifier entry (sourceless)
  cardObj.modifiers.push({ effect: "TempSpeed", stat: "speed", value: amount, source: "effect" });
  renderGameState && renderGameState();
}
function setSpeed(cardObj, value) {
  // Sets a persistent speed value on the instance overriding computed base
  cardObj._overrideSpeed = Number(value) || 0;
  // We cheat by pushing a permanent modifier (or you can add custom property handling)
  cardObj.modifiers = cardObj.modifiers || [];
  // remove existing override modifier
  cardObj.modifiers = cardObj.modifiers.filter(m => !(m.source === "speed-override"));
  cardObj.modifiers.push({ effect: "SpeedOverride", stat: "speed", value: cardObj._overrideSpeed, source: "speed-override" });
  renderGameState && renderGameState();
}

// EVASION helpers
function getEvasionCount(cardObj) {
  // store counters on cardObj.evasion or cardObj.evasionCounters
  if (typeof cardObj.evasion === "number") return cardObj.evasion;
  if (typeof cardObj.evasionCounters === "number") return cardObj.evasionCounters;
  return 0;
}
function addEvasion(cardObj, amount = 1) {
  cardObj.evasion = (cardObj.evasion || 0) + Number(amount || 1);
  renderGameState && renderGameState();
}
function consumeEvasion(cardObj, amount = 1) {
  const before = getEvasionCount(cardObj);
  const toConsume = Math.min(before, Number(amount || 1));
  if (toConsume <= 0) return 0;
  // Prefer cardObj.evasion if present
  if (typeof cardObj.evasion === "number") cardObj.evasion = Math.max(0, cardObj.evasion - toConsume);
  else cardObj.evasionCounters = Math.max(0, (cardObj.evasionCounters || 0) - toConsume);
  renderGameState && renderGameState();
  return toConsume;
}
function handleEvasionOnTarget(targetCardObj, sourceCardObj) {
  // Only consume if the source and target are opposing owners
  const sourceOwner = getCardOwner(sourceCardObj);
  const targetOwner = getCardOwner(targetCardObj);
  if (!sourceOwner || !targetOwner) {
    // If owner unknown, still consume as fallback
    const consumed = consumeEvasion(targetCardObj, 1);
    if (consumed > 0) showToast(`${targetCardObj.name || "Target"}'s Evasion -1`, { type: "info" });
    return consumed;
  }
  if (sourceOwner !== targetOwner) {
    const consumed = consumeEvasion(targetCardObj, 1);
    if (consumed > 0) showToast(`${targetCardObj.name || "Target"}'s Evasion -1`, { type: "info" });
    return consumed;
  }
  return 0;
}

function renderCardOnField(cardObj, zoneId) {
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  const wrapper = document.createElement('div');
  wrapper.className = 'card-battlefield-wrapper';

  // Main card div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';
  cardDiv.dataset.instanceId = cardObj.instanceId;

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
  if (cardObj.orientation === "horizontal") img.style.transform = "rotate(90deg)";
  cardDiv.appendChild(img);

  // Cardback (player or opponent)
  let cardbackUrl = window.selectedPlayerDeck?.deckObj?.cardbackArt || "OtherImages/Cardbacks/CBDefault.png";
  if (zoneId && zoneId.startsWith("opponent")) {
    cardbackUrl =
      window.selectedOpponentDeck?.cardbackArt ||
      gameState.opponentProfile?.cardbackArt ||
      "OtherImages/Cardbacks/CBDefault.png";
  }
  const backDiv = document.createElement('div');
  backDiv.className = 'card-back';
  backDiv.innerHTML = `<img src="${cardbackUrl}" alt="Card Back" style="width:100%;height:100%;">`;
  cardDiv.appendChild(backDiv);

  // --- Overlay for icons and stats ---
  const statsAndIconsOverlay = document.createElement('div');
  statsAndIconsOverlay.className = 'card-stats-icons-overlay';
  statsAndIconsOverlay.style.position = 'absolute';
  statsAndIconsOverlay.style.left = '0';
  statsAndIconsOverlay.style.top = '0';
  statsAndIconsOverlay.style.width = '100%';
  statsAndIconsOverlay.style.height = '100%';
  statsAndIconsOverlay.style.pointerEvents = 'none';

  // --- Icons Row: Centered at Top ---
  const iconRow = document.createElement('div');
  iconRow.className = 'card-icon-row-centered';

  // Status Icons
  (cardObj.statuses || []).forEach(status => {
    const statusDef = STATUS_EFFECTS[status.name];
    if (!statusDef) return;
    const icon = document.createElement('img');
    icon.src = statusDef.icon;
    icon.alt = statusDef.name;
    icon.title = statusDef.description;
    icon.className = 'card-status-icon';
    iconRow.appendChild(icon);
  });

  // Ability Icons
  const abilityArr = Array.isArray(cardData.ability) ? cardData.ability : [cardData.ability];
  abilityArr.forEach(abilityName => {
    const abilityDef = TARGET_FILTER_ABILITY[abilityName];
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
      icon.title = skill.name || "Skill";
      icon.className = 'card-skill-icon';
      iconRow.appendChild(icon);
    });
  }

  // Armor Icon
  if (typeof cardData.armor === "number" && cardData.armor > 0) {
    const currentArmor = typeof cardObj.armor === "number" ? cardObj.armor : cardData.armor;
    const armorDiv = document.createElement('div');
    armorDiv.className = 'card-armor-icon-badge';
    armorDiv.innerHTML = `
      <img src="OtherImages/FieldIcons/Armor.png" alt="Armor" class="card-armor-icon">
      <span class="card-armor-value">${currentArmor}</span>
    `;
    iconRow.appendChild(armorDiv);
  }

  // Attach icon row to overlay
  statsAndIconsOverlay.appendChild(iconRow);

  // --- Stat Row: Bottom, centered ---
  const statRow = document.createElement('div');
  statRow.className = 'card-stat-row-centered';

  // HP (left)
  let currentHP = undefined;
  if (typeof cardData.hp === "number") {
    currentHP = typeof cardObj.currentHP === "number" ? cardObj.currentHP : cardData?.hp ?? 0;
    statRow.appendChild(makeStatBadge("OtherImages/FieldIcons/HP.png", currentHP, "#fff", "HP"));
  }

// ATK (center)
if (typeof cardData.atk === "number") {
  const currentATK = computeCardStat(cardObj, "atk");
  const atkColor = getStatColor(cardObj, "atk");
  statRow.appendChild(makeStatBadge("OtherImages/FieldIcons/ATK.png", currentATK, atkColor, "ATK"));
}

// DEF (right)
if (typeof cardData.def === "number") {
  const currentDEF = computeCardStat(cardObj, "def");
  const defColor = getStatColor(cardObj, "def");
  statRow.appendChild(makeStatBadge("OtherImages/FieldIcons/DEF.png", currentDEF, defColor, "DEF"));
}

  // Attach stat row to overlay
  statsAndIconsOverlay.appendChild(statRow);

  // Attach overlay to cardDiv
  cardDiv.appendChild(statsAndIconsOverlay);

const badgesRow = document.createElement('div');
badgesRow.className = 'card-badges-row';
badgesRow.style.position = 'absolute';
badgesRow.style.right = '6px';
badgesRow.style.top = '6px';
badgesRow.style.zIndex = 40;
badgesRow.style.display = 'flex';
badgesRow.style.flexDirection = 'column';
badgesRow.style.gap = '6px';
// --- Champion badge (show if instance has Champion status/flag) ---
try {
  const isChampionInstance = !!(cardObj._isChampion || (Array.isArray(cardObj.statuses) && cardObj.statuses.some(s => s.name === 'Champion')));
  if (isChampionInstance) {
    const champBadge = document.createElement('div');
    champBadge.className = 'card-champion-badge';
    const active = !!cardObj._championActive;
    champBadge.title = active ? 'Champion (Active)' : 'Champion';
    champBadge.style.display = 'flex';
    champBadge.style.alignItems = 'center';
    champBadge.style.justifyContent = 'center';
    champBadge.style.cursor = 'default';
    champBadge.innerHTML = `<img src="Icons/Status/Champion.png" alt="Champion" style="width:18px;height:18px;vertical-align:middle;filter: drop-shadow(0 2px 6px #0007);opacity:${active ? 1 : 0.85}">`;
    // If you want to allow clicking to toggle Champion active/inactive, you can add an onclick here.
    badgesRow.appendChild(champBadge);
  }
} catch (err) {
  console.warn('Failed to render Champion badge', err);
}
// Speed badge
try {
  const speedVal = getSpeedValue(cardObj);
  const speedBadge = document.createElement('div');
  speedBadge.className = 'card-speed-badge';
  speedBadge.title = `Speed: ${speedVal} (Tier ${getSpeedTier(cardObj)})`;
  speedBadge.innerHTML = `
    <img src="OtherImages/FieldIcons/Speed.png" style="width:18px;height:18px;vertical-align:middle;margin-right:6px;">
    <span style="font-weight:bold;color:#fff;">${speedVal}</span>
  `;
  badgesRow.appendChild(speedBadge);
} catch (err) {
  console.warn('Failed to render speed badge', err);
}

// Evasion badge (only if > 0)
try {
  const evCount = getEvasionCount(cardObj);
  if (evCount > 0) {
    const evBadge = document.createElement('div');
    evBadge.className = 'card-evasion-badge';
    evBadge.title = `Evasion: ${evCount} (consumed when targeted by opponent)`;
    evBadge.innerHTML = `
      <img src="OtherImages/FieldIcons/Evasion.png" style="width:18px;height:18px;vertical-align:middle;margin-right:6px;">
      <span style="font-weight:bold;color:#ffd700;">${evCount}</span>
    `;
    badgesRow.appendChild(evBadge);
  }
} catch (err) {
  console.warn('Failed to render evasion badge', err);
}

// Append badges row to overlay
statsAndIconsOverlay.appendChild(badgesRow);

  // --- HP Bar (move to bottom, behind statRow) ---
  if (typeof cardData.hp === "number" && typeof currentHP === "number" && cardData.hp > 0) {
    const baseHP = cardData.hp;
    const hpPercent = Math.max(0, Math.min(1, currentHP / baseHP));
    let barColor = "#4caf50"; // green
    if (hpPercent <= 0.25) barColor = "#e53935";
    else if (hpPercent <= 0.5) barColor = "#ff9800";

    const barWrap = document.createElement('div');
    barWrap.className = 'hp-bar-wrap';
    barWrap.style.position = 'absolute';
    barWrap.style.left = '0';
    barWrap.style.bottom = '0';
    barWrap.style.width = '100%';
    barWrap.style.height = '8%';
    barWrap.style.background = '#222c';
    barWrap.style.zIndex = 19;

    const bar = document.createElement('div');
    bar.className = 'hp-bar';
    bar.style.height = '100%';
    bar.style.width = `${Math.round(hpPercent * 100)}%`;
    bar.style.backgroundColor = barColor;
    bar.style.borderRadius = '7px';
    barWrap.appendChild(bar);

    // HP change animation
    if (typeof cardObj._prevHP === "number" && cardObj._prevHP !== currentHP) {
      if (currentHP < cardObj._prevHP) {
        bar.classList.add("hp-bar-damage");
        setTimeout(() => bar.classList.remove("hp-bar-damage"), 300);
      } else {
        bar.classList.add("hp-bar-heal");
        setTimeout(() => bar.classList.remove("hp-bar-heal"), 300);
      }
    }
    cardObj._prevHP = currentHP; // Store for next render

    cardDiv.appendChild(barWrap);
  }

  // --- Attached Cards (right side, absolute) ---
  if (cardObj.attachedCards && cardObj.attachedCards.length > 0) {
    const stackDiv = document.createElement('div');
    stackDiv.className = 'attached-cards-stack';
    stackDiv.style.position = 'absolute';
    stackDiv.style.right = '0px'; // Hug the right side, inside the card
    stackDiv.style.top = '0px';
    stackDiv.style.zIndex = '30';
    cardObj.attachedCards.forEach((attachObj, i) => {
      const attachData = dummyCards.find(c => c.id === attachObj.cardId);
      if (!attachData) return;
      const attDiv = document.createElement('div');
      attDiv.className = 'card attached-on-top';
      attDiv.style.width = '60px';
      attDiv.style.height = '85px';
      attDiv.style.position = 'absolute';
      attDiv.style.right = '0px';
      attDiv.style.top = `${i * 18}px`;
      attDiv.style.pointerEvents = 'auto';
      attDiv.title = attachData.name;

      // ATTACHMENT MENU
      attDiv.onclick = (e) => {
        e.stopPropagation();
        closeAllMenus();
        attDiv.querySelectorAll('.card-menu').forEach(m => m.remove());
        const buttons = [
          {
            text: "View",
            onClick: function(ev) {
              ev.stopPropagation();
              showFullCardModal(attachObj);
              closeAllMenus();
              this.closest('.card-menu').remove();
            }
          },
          {
            text: "Detach",
            onClick: function(ev) {
              ev.stopPropagation();
              cardObj.attachedCards.splice(i, 1);
              gameState.playerVoid.push(attachObj);
              renderGameState();
              closeAllMenus();
              setupDropZones();
              this.closest('.card-menu').remove();
            }
          }
        ];
        const menu = createCardMenu(buttons);
        attDiv.appendChild(menu);

        setTimeout(() => {
          document.body.addEventListener('click', function handler() {
            menu.remove();
            document.body.removeEventListener('click', handler);
          }, { once: true });
        }, 10);
      };

      const img = document.createElement('img');
      img.src = attachData.image;
      img.alt = attachData.name;
      img.style.width = '100%';
      img.style.height = '100%';
      attDiv.appendChild(img);

      stackDiv.appendChild(attDiv);
    });
    cardDiv.appendChild(stackDiv);
  }

  // Add cardDiv to wrapper
  wrapper.appendChild(cardDiv);

  // MANUAL HP UPDATE
  cardDiv.onclick = function(e) {
    e.stopPropagation();
    showCardActionMenu(cardObj.instanceId, zoneId, cardObj.orientation || "vertical", cardDiv);
  };
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
  // PATCH: parse string cost if needed
  if (typeof cost === "string") {
    cost = parseCost(cost);
  }
  if (!cost || typeof cost !== 'object') {
    if (cost === 0) {
      return `<img src="${ESSENCE_IMAGE_MAP['X0']}" style="width:22px;height:22px;vertical-align:middle;" alt="Colorless: 0">`;
    }
    return '';
  }
  const colorOrder = ['colorless', 'green', 'red', 'blue', 'white', 'black', 'yellow', 'purple', 'gray'];
  let html = '';
  let total = 0;

  colorOrder.forEach(color => {
    const amt = cost[color];
    if (amt && amt > 0) {
      total += amt;
      if (color === 'colorless') {
        // Show the exact number as Xn image
        html += `<img src="${ESSENCE_IMAGE_MAP['X'+amt]}" style="width:22px;height:22px;vertical-align:middle;" alt="Colorless: ${amt}">`;
      } else {
        html += `<img src="${ESSENCE_IMAGE_MAP[color]}" style="width:22px;height:22px;vertical-align:middle;margin:0 2px;" alt="${color} Essence">`.repeat(amt);
      }
    }
  });
  // If total cost is zero, show the zero image
  if (total === 0) {
    html = `<img src="${ESSENCE_IMAGE_MAP['X0']}" style="width:22px;height:22px;vertical-align:middle;" alt="Colorless: 0">`;
  }
  return html;
}
/* ---------------
// ESSENCE POOL //
----------------*/
function renderEssencePool(cardObj) {
  if (!cardObj.essence) return null;
  if (!cardObj._prevEssence) cardObj._prevEssence = {};

  const poolDiv = document.createElement('div');
  poolDiv.className = 'essence-pool';

  // Color codes and their image sources
  const ESSENCE_IMAGE_MAP = {
    green: "OtherImages/Essence/Green.png",
    red: "OtherImages/Essence/Red.png",
    blue: "OtherImages/Essence/Blue.png",
    yellow: "OtherImages/Essence/Yellow.png",
    gray: "OtherImages/Essence/Gray.png",
    purple: "OtherImages/Essence/Purple.png",
    black: "OtherImages/Essence/Black.png",
    white: "OtherImages/Essence/White.png"
  };
  // Map from code to color name
  const colorCodes = {
    G: "green", R: "red", U: "blue", Y: "yellow", C: "gray",
    P: "purple", B: "black", W: "white"
  };

  // Render colored essence
  for (const code in colorCodes) {
    const color = colorCodes[code];
    const amount = countEssenceType(cardObj.essence, code);
    const prevAmount = cardObj._prevEssence[color] || 0;
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
    cardObj._prevEssence[color] = amount;
  }

  // Render colorless essence (e.g. {1}, {2}, ...)
  const colorlessAmount = countColorlessEssence(cardObj.essence);
  const prevColorless = cardObj._prevEssence.colorless || 0;
  if (colorlessAmount > 0) {
    const icon = document.createElement('div');
    icon.className = 'essence-icon essence-colorless';
    icon.title = `Colorless Essence: ${colorlessAmount}`;
    icon.innerHTML = `<img src="${COST_IMAGE_MAP.X0}" class="essence-img"><span class="essence-amount">${colorlessAmount}</span>`;
    if (colorlessAmount > prevColorless) {
      setTimeout(() => animateEssencePop(icon), 20);
    }
    poolDiv.appendChild(icon);
  }
  cardObj._prevEssence.colorless = colorlessAmount;

  return poolDiv;
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
      opponent: { green:0, red:0, blue:0, yellow:0, purple:0, gray:0, black:0, white:0, colorless:0 }
    };
  }
  return gameState.essencePools[owner === 'opponent' ? 'opponent' : 'player'];
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
  closeAllMenus();
  currentCardMenuState = { instanceId, zoneId, orientation };
  const arr = getZoneArray(zoneId);
  const cardObj = arr ? arr.find(card => card.instanceId === instanceId) : null;
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  // Determine zone for actionable logic
  const zone = getZoneNameForArray(arr);

  // Define menu options
  const buttons = [
    {
      text: "Set HP",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          let cardObj = arr.find(card => card.instanceId === instanceId);
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
      text: "Attack",
      disabled: !canAttack(cardObj, gameState),
      title: !canAttack(cardObj, gameState) ? 
        (cardObj.orientation !== "vertical"
          ? "Card is not in ATK position."
          : "No valid targets to attack.") : "",
      onClick: function(e) {
        e.stopPropagation();
        startAttackTargeting(instanceId, zoneId, cardDiv);
        emitPublicState();
        closeAllMenus();
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
            const [cardObj] = arr.splice(idx, 1);
            gameState.playerHand.push(cleanCard(cardObj));
          }
        }
        renderGameState();
        setupDropZones();
        emitPublicState();
        closeAllMenus();
      }
    },
    {
      text: "Change Position",
      disabled: !cardObj || cardObj.hasChangedPositionThisTurn,
      onClick: function(e) {
        e.stopPropagation();
        if (!cardObj || cardObj.hasChangedPositionThisTurn) return;
        let arr = getZoneArray(zoneId);
        if (arr) {
          let card = arr.find(c => c.instanceId === instanceId);
          if (card) {
            let prevOrientation = card.orientation;
            const newOrientation = card.orientation === "horizontal" ? "vertical" : "horizontal";
            changeCardPosition(card, newOrientation);
          }
        }
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
            const [cardObj] = arr.splice(idx, 1);
            gameState.playerVoid.push(cleanCard(cardObj));
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
            const [cardObj] = arr.splice(idx, 1);
            gameState.playerDeck.push(cleanCard(cardObj));
          }
        }
        renderGameState();
        setupDropZones();
        emitPublicState();
        closeAllMenus();
      }
    },
    {
      text: "View",
      onClick: function(e) {
        e.stopPropagation();
        let arr = getZoneArray(zoneId);
        if (arr) {
          const cardObj = arr.find(card => card.instanceId === instanceId);
          if (cardObj) {
            showFullCardModal(cardObj);
          }
        }
        closeAllMenus();
      }
    }
  ];
  if (cardData.skill && Array.isArray(cardData.skill)) {
    const currentZone = getZoneNameForArray(arr);
    cardData.skill
    .filter(skillObj => !skillObj.activation) // Only show skills without activation
    .forEach(skillObj => {
      const sealed = typeof isSealed === 'function' ? isSealed(cardObj) : (typeof isSkillSealed === 'function' ? isSkillSealed(cardObj) : false);
      const canAct = canActivateSkill(cardObj, skillObj, currentZone, gameState);

      const isEnabled = canAct && !sealed;

      // explanatory title when disabled
      let title = "";
      if (!isEnabled) {
        if (sealed) title = "Sealed: Cannot activate skills.";
        else title = "Cannot activate skill in current state.";
      }

      const activation = skillObj.activation || {};
      let requirements = Array.isArray(activation.requirement)
        ? activation.requirement
        : (activation.requirement ? [activation.requirement] : []);
      const reqIcons = getRequirementIcons(requirements);

      buttons.push({
        text: `${skillObj.name} ${parseEffectText(skillObj.cost)}${reqIcons}`,
        html: true,
        disabled: !isEnabled,
        title: title,
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
  placeMenuWithinViewport(menu, rect);

  menu.onclick = function(e) { e.stopPropagation(); };
  // Hide menu when clicking elsewhere
  setTimeout(() => {
    document.body.addEventListener('click', function handler() {
      closeAllMenus();
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 10);
}

// ==== VOID MODAL ====
function openVoidModal(isOpponent = false) {
  let modal = document.getElementById('void-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'void-modal';
    modal.className = 'modal';
    const content = document.createElement('div');
    content.className = 'modal-content';
    modal.appendChild(content);
    document.body.appendChild(modal);
  }
  // Always attach (overwrite) close-on-backdrop handler
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };
  // Always prevent modal-content clicks from closing the modal
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
  // === FIX: Show correct void cards ===
  const voidCards = isOpponent ? gameState.opponentVoid : gameState.playerVoid;
  if (voidCards.length === 0) {
    list.innerHTML = '<div style="color:#999;">Void is empty.</div>';
  } else {
    voidCards.forEach((cardObj, idx) => {
      const card = dummyCards.find(c => c.id === cardObj.cardId);
      if (!card) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'modal-card-wrapper';

      const cardDiv = document.createElement('div');
      cardDiv.className = 'card-battlefield';

      // === PULSE EFFECT: Add animation if this card is actionable in the void ===
      setCardAnimatableClass(cardDiv, cardObj, card, gameState, 'void');
      
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.className = "modal-card-img";
      cardDiv.appendChild(img);

      // Make image clickable for menu
      img.style.cursor = "pointer";
      img.onclick = (e) => {
        e.stopPropagation();
        closeAllMenus();
        
        if (isOpponent) {
          showFullCardModal(cardObj);
          return;
        }
        // If opponent's void, only allow "View"
        const buttons = [
          {
            text: "Return to Hand",
            onClick: function(e) {
              e.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerHand);
              renderGameState();
              closeAllMenus();
              openVoidModal();
            }
          },
          {
            text: "Return to Deck",
            onClick: function(e) {
              e.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerDeck);
              renderGameState();
              closeAllMenus();
              openVoidModal();
            }
          },
          {
            text: "View",
            onClick: function(e) {
              e.stopPropagation();
              showFullCardModal(cardObj);
              closeAllMenus();
            }
          }
        ];

        // --- Add Skill Buttons if card has skills ---
        if (!isOpponent) {
          const cardData = dummyCards.find(c => c.id === cardObj.cardId);
          if (cardData && Array.isArray(cardData.skill)) {
            cardData.skill
            .filter(skillObj => !skillObj.activation) // Only show skills without activation
            .forEach(skillObj => {
              // PATCH: show CW/CCW icons
              const activation = skillObj.activation || {};
              let requirements = Array.isArray(activation.requirement)
                ? activation.requirement
                : (activation.requirement ? [activation.requirement] : []);
              const reqIcons = getRequirementIcons(requirements);

              const isEnabled = canActivateSkill(cardObj, skillObj, 'void', gameState);

              buttons.push({
                text: `${skillObj.name} ${parseEffectText(skillObj.cost)}${reqIcons}`,
                html: true,
                disabled: !canActivateSkill(cardObj, skillObj, 'void', gameState),
                onClick: function(e) {
                  e.stopPropagation();
                  if (!canActivateSkill(cardObj, skillObj, 'void', gameState)) return;
                  activateSkill(cardObj, skillObj);
                  closeAllMenus();
                  openVoidModal();
                }
              });
            });
          }
        }

        const menu = createCardMenu(buttons);
        document.body.appendChild(menu); // Append to body, not wrapper

        // Position menu absolutely using the image rect
        const rect = img.getBoundingClientRect();
        placeMenuWithinViewport(menu, rect);

        menu.onclick = function(e) { e.stopPropagation(); };

        // Hide menu when clicking elsewhere
        modal.onclick = function(e) {
          if (!e.target.closest('.card-menu')) {
            closeAllMenus();
            if (e.target === modal) modal.style.display = 'none';
          }
        };
      };
      wrapper.appendChild(cardDiv);
      list.appendChild(wrapper);
      cardDiv.appendChild(img);
    });
  }
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
function isPlayerTurn(phaseObj)    { return phaseObj.turn === 'player'; }
function isOpponentTurn(phaseObj)  { return phaseObj.turn === 'opponent'; }
function isPhase(phaseObj, phase)  { return phaseObj.phase === phase; }
function isPlayerPhase(phaseObj, phase)   { return isPlayerTurn(phaseObj) && isPhase(phaseObj, phase); }
function isOpponentPhase(phaseObj, phase) { return isOpponentTurn(phaseObj) && isPhase(phaseObj, phase); }
function isStartPhase(phaseObj)    { return isPhase(phaseObj, 'start'); }
function isActionPhase(phaseObj)   { return isPhase(phaseObj, 'action'); }
function isEndPhase(phaseObj)      { return isPhase(phaseObj, 'end'); }
function isPlayerEndPhase(phaseObj)   { return isPlayerTurn(phaseObj) && isEndPhase(phaseObj); }
function isOpponentEndPhase(phaseObj) { return isOpponentTurn(phaseObj) && isEndPhase(phaseObj); }
function isPlayerActionPhase(phaseObj)   { return isPlayerTurn(phaseObj) && isActionPhase(phaseObj); }
function isOpponentActionPhase(phaseObj) { return isOpponentTurn(phaseObj) && isActionPhase(phaseObj); }
function isStartOfTurn(phaseObj) { return isStartPhase(phaseObj); } // both player and opponent

// Display/class helpers
function getPhaseDisplayName(phaseKey) { return PHASE_DISPLAY_NAMES[phaseKey] || phaseKey; }
function getPhaseClass(phaseKey)       { return PHASE_CLASS[phaseKey] || ""; }

function handleStartPhase(turn) {
  // Example: Draw a card at the start of each turn
  drawCards(turn, 1);
  // Reset mana/essence or resource for this turn
  resetTurnResources(turn);
  // Trigger start-of-turn effects (statuses, abilities, etc.)
  // triggerStartPhaseEffects(turn);
  // Log action
  appendVisualLog({
    action: "startPhase",
    who: turn
  }, false, turn === "player");
}

function handleActionPhase(turn) {
  // Reset action/attack flags for all cards/entities of this turn
  resetTurnFlags(turn);
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
  // Grant Evasion to all qualifying creatures at end of each player's End Phase
  try {
    grantEvasionAtEndPhase();
  } catch (e) {
    console.error("Error granting end-phase Evasion:", e);
  }
  // Handle weather effects durations etc.
  handleWeatherEffectsEndPhase();
  // Optionally do day/night cycle counting if you track end-phase counters
  // (unchanged) - if you have a day/night counter elsewhere, that logic remains
  // Example incrementing dayNightCycleCounter was in earlier code; keep it if required.
  // Optionally log phase end
  appendVisualLog({
    action: "endPhase",
    who: turn
  }, false, turn === "player");
}

function updatePhase() {
  // Update badge for turn
  if (phaseBadge) {
    phaseBadge.classList.remove('opponent-turn', 'player-turn');
    phaseBadge.classList.add(gameState.turn === 'opponent' ? 'opponent-turn' : 'player-turn');
  }
  // Update player/turn label
  if (phasePlayerSpan) phasePlayerSpan.textContent = (gameState.turn === "player" ? "Your turn" : "Opponent's turn");
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

// Attach to button if not already attached
if(nextPhaseBtn) nextPhaseBtn.onclick = goToNextPhase;

// ----------- //
// --- LOG --- //
// ----------- //

// --- Example: Append action log ---
function logAction(text) {
  appendChatLog('action', text);
}

// --- Example: Append system log ---
function logSystem(text) {
  appendChatLog('system', text);
}
function getCpuProfile(deck) {
  return {
    username: deck.name, // e.g. "Verdant Might"
    avatar: deck.image,  // e.g. 'CardImages/Avatars/Fairy.png'
    banner: deck.bannerArt, // e.g. 'CardImages/Banners/GreenBanner.png'
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
  if (gameState.turn !== "opponent") return;
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
  if (gameState.playerDominion && gameState.playerDominion.currentHP <= 0) {
    showEndGameAnimation("Defeat", "#e25555");
    // disable actions, offer rematch, etc.
    return true;
  }
  if (gameState.opponentDominion && gameState.opponentDominion.currentHP <= 0) {
    showEndGameAnimation("Victory", "#ffe066");
    // disable actions, offer rematch, etc.
    return true;
  }
  return false;
}
function extractDominionFromDeck(deckArr) {
  const idx = deckArr.findIndex(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    if (!card) return false;
    // Prefer the shared helper if present
    if (typeof isDominion === 'function') return isDominion(card);
    // Fallback: support trait as string or array
    const t = card.trait;
    if (Array.isArray(t)) return t.map(x => String(x).toLowerCase()).includes('dominion');
    return String(t || '').toLowerCase() === 'dominion';
  });
  if (idx !== -1) {
    return deckArr.splice(idx, 1)[0];
  }
  return null;
}

if (gameState.playerDominion && gameState.playerDominion.currentHP <= 0) {
  showEndGameAnimation("Defeat", "#e25555");
  // Optionally: disable further actions, or trigger a reset
}
if (gameState.opponentDominion && gameState.opponentDominion.currentHP <= 0) {
  showEndGameAnimation("Victory", "#ffe066");
  // Optionally: disable further actions, or trigger a reset
}

function initiateDominionSelection(deckArr, afterSelection) {
  // DOMINION SETUP
  const dominionObj = extractDominionFromDeck(deckArr);
  if (dominionObj) {
    dominionObj.currentHP = getBaseHp(dominionObj.cardId);
    gameState.playerDominion = dominionObj;
    gameState.playerDomains.unshift(dominionObj);
    const idx = deckArr.findIndex(c => c.instanceId === dominionObj.instanceId);
    if (idx !== -1) deckArr.splice(idx, 1);
    renderGameState();
  }
}
function putRandomChampionOnTop(deckArr) {
  // Get all champions in deck (robust to trait shape)
  const champions = deckArr.filter(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    if (!card) return false;
    if (typeof isChampion === 'function') return isChampion(card);
    const t = card.trait;
    if (Array.isArray(t)) return t.map(x => String(x).toLowerCase()).includes('champion');
    return String(t || '').toLowerCase() === 'champion';
  });
  if (champions.length === 0) return; // no champion found

  // Pick random champion
  const idx = Math.floor(Math.random() * champions.length);
  const championCard = champions[idx];

  // Remove from current position
  const deckIdx = deckArr.findIndex(c => c.instanceId === championCard.instanceId);
  if (deckIdx === -1) return;
  deckArr.splice(deckIdx, 1);

  // Put on top of deck
  deckArr.unshift(championCard);
}

// ESSENCE GENERATION //
function generateEssence(cardObj) {
  // Add the card's defined essence into the owner's pooled essence
  if (!cardObj) return;
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef || !cardDef.essence) return;

  // Determine owner by membership in gameState arrays
  const owner = (gameState.playerDomains.includes(cardObj) || gameState.playerCreatures.includes(cardObj)) ? 'player'
    : (gameState.opponentDomains.includes(cardObj) || gameState.opponentCreatures.includes(cardObj)) ? 'opponent'
    : (cardObj.owner ? (cardObj.owner === 'player' ? 'player' : 'opponent') : 'player');

  // Parse the essence string like "{g}{g}{r}{2}" and add to pool counts
  const essStr = cardDef.essence || '';
  // color letters map
  const letters = { G: 'green', R: 'red', U: 'blue', Y: 'yellow', C: 'gray', P: 'purple', B: 'black', W: 'white' };
  const matches = essStr.match(/\{([GRUYCPBW]|[0-9]+)\}/gi) || [];
  matches.forEach(m => {
    const inner = m.replace(/[{}]/g, '').toUpperCase();
    if (/^[0-9]+$/.test(inner)) {
      // treat numeric token as that many colorless units
      gameState.essencePools[owner].colorless += Number(inner);
    } else if (letters[inner]) {
      gameState.essencePools[owner][letters[inner]] += 1;
    }
  });

  // trigger UI update
  renderGameState && renderGameState();
}


// ESSENCE CONSUPTION LOGIC
function showEssencePaymentModal(opts = {}) {
  // opts expected:
  // { card: cardDataOrObj, cost: parsedCostObject, owner: 'player'|'opponent', onPaid: fn }
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
  const owner = opts.owner === 'opponent' ? 'opponent' : 'player';
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

  // POOLED ESSENCE UI: render clickable tokens from the pool (player or opponent)
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
          // assign to colorless need
          reqPaid.colorless = (reqPaid.colorless || 0) + 1;
          paymentPlan.push({ poolOwner, color: 'colorless', amount: 1 });
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
          // fallback: if no explicit colorless need, try to fill any remaining color requirements (not implemented here)
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
          const imgSrc = ESSENCE_IMAGE_MAP['X1'];
          const isPaid = i < (reqPaid[r.color] || 0);
          icons += `<img src="${imgSrc}" 
            style="width:24px;height:24px;vertical-align:middle;margin: 0 3px;
            filter:${isPaid ? "none" : "grayscale(0.5) brightness(0.5)"};
            opacity:${isPaid ? "1" : "0.7"};
            transition:filter 0.2s,opacity 0.2s;">`;
        }
      } else {
        // Colored essence: use its color image
        const imgSrc = ESSENCE_IMAGE_MAP[r.color] || ESSENCE_IMAGE_MAP.gray;
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
  return [...gameState.playerDomains, ...gameState.playerCreatures /* add more if needed */];
}
// ATTACHMENTS LOGIC
function attachCard(targetCardObj, attachmentCardObj) {
  if (!targetCardObj || !attachmentCardObj) return false;
  targetCardObj.attachedCards = targetCardObj.attachedCards || [];
  targetCardObj.attachedCards.push(attachmentCardObj);
  return true;
}
// ATTACK LOGIC
function startAttackTargeting(attackerId, attackerZone, cardDiv) {
  attackMode.attackerId = attackerId;
  attackMode.attackerZone = attackerZone;
  battlefield.classList.add('attack-mode-backdrop');

  // Find attacker object
  let attacker =
    gameState.playerCreatures.find(c => c.instanceId === attackerId) ||
    gameState.opponentCreatures.find(c => c.instanceId === attackerId);
  
  if (!canAttack(attacker, gameState)) {
    showToast("Cannot attack the turn it's summoned.");
    return;
  }
  const targets = getAttackTargets(attacker);

  targets.forEach(cardObj => {
    // Try both rows for finding the DOM element
    let targetDiv = findCardDivInZone('opponent-creatures-zone', cardObj.instanceId)
      || findCardDivInZone('opponent-domains-zone', cardObj.instanceId);
    if (targetDiv) {
      targetDiv.classList.add('attack-target-highlight');
      targetDiv.onclick = function(e) {
        e.stopPropagation();
        endAttackTarget();
        resolveAttack(attackerId, cardObj.instanceId);
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
  // Must exist, be a creature, and be on the field
  if (!cardObj) return false;
  // Check attacksRemaining (if undefined, default to 1)
  const remaining = (typeof cardObj.attacksRemaining === "number") ? cardObj.attacksRemaining : 1;
  if (remaining <= 0) return false;

  // Summoning sickness: if it was summoned this turn and doesn't have Rush, cannot attack
  if (cardObj.hasSummonedThisTurn && !hasRush(cardObj)) return false;

  // Must be in ATK (vertical) orientation
  if (cardObj.orientation !== "vertical") return false;

  // Add any other restrictions (e.g. tapped, stunned)
  // Check if there are any valid targets
  const targets = getAttackTargets(cardObj);
  if (!targets || targets.length === 0) return false;
  return true;
}
function getAttackTargets(attackerObj = null) {
  // Gather all opponent cards
  const creatures = gameState.opponentCreatures;
  const domains = gameState.opponentDomains;
  const artifacts = gameState.opponentArtifacts || [];
  const allOpponentField = [...creatures, ...domains, ...artifacts];

  // Build map of colors to opponent creatures
  const colorToCreatures = {};
  creatures.forEach(creature => {
    getCardColors(creature).forEach(color => {
      if (!colorToCreatures[color]) colorToCreatures[color] = [];
      colorToCreatures[color].push(creature);
    });
  });

  // Domains and artifacts to filter
  const domainsAndArtifacts = [...domains, ...artifacts];

  // Filter out protected domains/artifacts
  const protectedDomainsArtifacts = domainsAndArtifacts.filter(cardObj => {
    const cardColors = getCardColors(cardObj);
    // If ANY color of the domain/artifact has a protecting creature, it's protected
    return cardColors.some(color => colorToCreatures[color] && colorToCreatures[color].length > 0);
  });

  // Only allow attack on protected domains/artifacts if no creature of that color exists
  const attackableDomainsArtifacts = domainsAndArtifacts.filter(cardObj => !protectedDomainsArtifacts.includes(cardObj));

  // Build initial target list applying color protection rule
  let targets = [
    ...creatures,
    ...attackableDomainsArtifacts
  ];

  // If no attackerObj provided, just return targets after color protection
  if (!attackerObj) return targets;

  // --- INLINE ABILITY FILTERS ---
  const attackerDef = dummyCards.find(c => c.id === attackerObj.cardId);
  if (!attackerDef || !attackerDef.ability) return targets;
  let filtered = targets;
  Object.keys(TARGET_FILTER_ABILITY).forEach(abilityName => {
    if (attackerDef.ability.includes(abilityName)) {
      filtered = TARGET_FILTER_ABILITY[abilityName].filter(attackerObj, filtered);
    }
  });
  return filtered;
}
function endAttackTarget() {
  // Remove highlights and listeners
  gameState.opponentCreatures.forEach(cardObj => {
    const targetDiv = findCardDivInZone('opponent-creatures-zone', cardObj.instanceId);
    if (targetDiv) {
      targetDiv.classList.remove('attack-target-highlight');
      targetDiv.onclick = null; // Remove attack targeting handler
    }
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
  const attacker =
    gameState.playerCreatures.find(c => c.instanceId === attackerId) ||
    gameState.opponentCreatures.find(c => c.instanceId === attackerId);
  const defender =
    gameState.opponentCreatures.find(c => c.instanceId === defenderId) ||
    gameState.opponentDomains.find(c => c.instanceId === defenderId) ||
    gameState.playerCreatures.find(c => c.instanceId === defenderId) ||
    gameState.playerDomains.find(c => c.instanceId === defenderId);

  if (!attacker || !defender) return;

  // BEFORE DAMAGE: decide First Strike / Invulnerability based on speed difference
  const speedDiff = getSpeedDifference(attacker, defender); // positive means attacker faster
  if (speedDiff >= 2) applyStatus(attacker, 'Quickstrike', 1);
  if (speedDiff >= 3) applyStatus(attacker, 'InvulnerableAtk', 1);
  if (-speedDiff >= 2) applyStatus(defender, 'Quickstrike', 1);
  if (-speedDiff >= 3) applyStatus(defender, 'InvulnerableAtk', 1);

  // Trigger onAttack/onDefense skills BEFORE damage calculation
  triggerOnAttackSkills(attacker, defender);
  triggerOnDefenseSkills(defender, attacker);

  // Damage calculation and KO logic
  damageCalculation(attacker, defender);

  // After the attack resolves, consume one attack from the attacker
  if (attacker) {
    attacker.attacksRemaining = Math.max(0, (typeof attacker.attacksRemaining === "number" ? attacker.attacksRemaining : 1) - 1);
    attacker.hasAttacked = attacker.attacksRemaining <= 0;
  }

  // AFTER DAMAGE: remove the temporary statuses applied for this attack
  removeStatus(attacker, 'Quickstrike');
  removeStatus(attacker, 'InvulnerableAtk');
  removeStatus(defender, 'Quickstrike');
  removeStatus(defender, 'InvulnerableAtk');

  // Log the attack, etc. (existing log code here)
  appendAttackLog({
    attacker,
    defender,
    defenderOrientation: defender.orientation,
    who: getCardOwner(attacker)
  });
}


function damageCalculation(attacker, defender) {
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  const defenderDef = dummyCards.find(c => c.id === defender.cardId);
  const attackerInfo = getZoneInfoForCard(attacker);
  const defenderInfo = getZoneInfoForCard(defender);
  // Read temporary status flags here, where attacker/defender are defined
  const attackerQuickstrike = hasStatus(attacker, 'Quickstrike');
  const attackerInvulnerable = hasStatus(attacker, 'InvulnerableAtk');

  const defenderQuickstrike = hasStatus(defender, 'Quickstrike');
  const defenderInvulnerable = hasStatus(defender, 'InvulnerableAtk');

  // ATK VS ATK -- Creature vs Creature in ATK (vertical)
  if (defenderDef.category === "creature" && defender.orientation === "vertical") {
    const attackerDmg = computeCardStat(attacker, "atk");
    const defenderDmg = computeCardStat(defender, "atk");

    // If either side has Quickstrike (first strike), resolve in order
    if ((attackerQuickstrike && !defenderQuickstrike) || (!attackerQuickstrike && defenderQuickstrike)) {
      if (attackerQuickstrike && !defenderQuickstrike) {
        // Attacker hits first
        defender.currentHP = Math.max(0, (defender.currentHP || getBaseHp(defender.cardId)) - attackerDmg);
        if (defender.currentHP > 0) {
          // Defender retaliates only if still alive and attacker not invulnerable while attacking
          const retaliate = attackerInvulnerable ? 0 : defenderDmg;
          attacker.currentHP = Math.max(0, (attacker.currentHP || getBaseHp(attacker.cardId)) - retaliate);
        }
      } else {
        // Defender has Quickstrike
        attacker.currentHP = Math.max(0, (attacker.currentHP || getBaseHp(attacker.cardId)) - defenderDmg);
        if (attacker.currentHP > 0) {
          const retaliate = defenderInvulnerable ? 0 : attackerDmg;
          defender.currentHP = Math.max(0, (defender.currentHP || getBaseHp(defender.cardId)) - retaliate);
        }
      }
    } else {
      // Neither or both have Quickstrike: simultaneous damage (but respect invulnerability flags)
      let defenderIncoming = attackerDmg;
      let attackerIncoming = defenderDmg;

      if (attackerInvulnerable) attackerIncoming = 0;
      if (defenderInvulnerable) defenderIncoming = 0;

      defender.currentHP = Math.max(0, (defender.currentHP || getBaseHp(defender.cardId)) - defenderIncoming);
      attacker.currentHP = Math.max(0, (attacker.currentHP || getBaseHp(attacker.cardId)) - attackerIncoming);
    }

    // KO handling: move to void if dead
    if (defender.currentHP <= 0) moveCard(defender.instanceId, defenderInfo.arr, gameState.playerVoid);
    if (attacker.currentHP <= 0) moveCard(attacker.instanceId, attackerInfo.arr, gameState.playerVoid);

    // Apply abilities' status effects if defender is still on field after resolution
    if (
      defenderDef?.category === "creature" &&
      defenderInfo.arr?.includes(defender)
    ) {
      const attackerAbilities = attackerDef.ability || [];
      attackerAbilities.forEach(abilityName => {
        if (STATUS_EFFECTS[abilityName]) {
          applyStatus(defender, abilityName);
        }
      });
    }

    renderGameState();
    setupDropZones();
    return;
  }

  // ATK VS DEF (defender horizontal)
  if (defenderDef.category === "creature" && defender.orientation === "horizontal") {
    const damage = Math.max(0, computeCardStat(attacker, "atk") - computeCardStat(defender, "def"));
    dealDamage(attacker, defender, damage);
    renderGameState();
    setupDropZones();
    return;
  }

  // ATK VS DOMAIN OR ARTIFACT
  dealDamage(attacker, defender, computeCardStat(attacker, "atk"));
  renderGameState();
  setupDropZones();
  
  // Only apply status if defender is still alive on field
  if (
    defenderDef?.category === "creature" &&
    defenderInfo.arr?.includes(defender)
  ) {
    const attackerAbilities = attackerDef.ability || [];
    attackerAbilities.forEach(abilityName => {
      if (STATUS_EFFECTS[abilityName]) {
        applyStatus(defender, abilityName);
      }
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

  // KO logic: move to void if HP <= 0
  if (targetObj.currentHP <= 0) {
    const fromArr = findCardFieldArray(targetObj);
    if (fromArr) {
      moveCard(targetObj.instanceId, fromArr, gameState.playerVoid);
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
        if (STATUS_EFFECTS[abilityName]) {
          applyStatus(targetObj, abilityName);
        }
      });
    }
  }
}
function triggerOnAttackSkills(attacker, defender) {
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  if (!attackerDef || !attackerDef.skill) return;
  const skills = Array.isArray(attackerDef.skill) ? attackerDef.skill : [attackerDef.skill];
  skills.forEach(skill => {
    if (skill.activation && skill.activation.class === "onAttack") {
      // Only trigger if any requirement passes (or none exist)
      if (!skill.activation.requirement || canActivateSkill(attacker, skill, getZoneNameForCard(attacker), gameState)) {
        resolveSkill(attacker, skill, { trigger: "onAttack", defender });
      }
    }
  });
}

function triggerOnDefenseSkills(defender, attacker) {
  const defenderDef = dummyCards.find(c => c.id === defender.cardId);
  if (!defenderDef || !defenderDef.skill) return;
  const skills = Array.isArray(defenderDef.skill) ? defenderDef.skill : [defenderDef.skill];
  skills.forEach(skill => {
    if (skill.activation && skill.activation.class === "onDefense") {
      // Only trigger if any requirement passes (or none exist)
      if (!skill.activation.requirement || canActivateSkill(defender, skill, getZoneNameForCard(defender), gameState)) {
        resolveSkill(defender, skill, { trigger: "onDefense", attacker });
      }
    }
  });
}

// Grant Evasion counters at each End Phase for creatures with Speed tier >= 3
function grantEvasionAtEndPhase() {
  // All on-field creatures: player + opponent
  const allCreatures = [...gameState.playerCreatures, ...gameState.opponentCreatures];
  let grantedCount = 0;
  allCreatures.forEach(card => {
    try {
      if (getSpeedTier(card) >= 2) {
        addEvasion(card, 1);
        grantedCount++;
      }
    } catch (e) {
      // safe fallback: if something goes wrong for a card, skip it
      console.error("grantEvasionAtEndPhase error for", card, e);
    }
  });

  if (grantedCount > 0) {
    // Inform the player(s) and refresh UI
    showToast(`${grantedCount} creature${grantedCount === 1 ? "" : "s"} gained +1 Evasion`, { type: "info" });
    renderGameState && renderGameState();
    setupDropZones && setupDropZones();
  }
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
  const headsImg = "OtherImages/Icons/Heads.png";
  const tailsImg = "OtherImages/Icons/Tails.png";
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
          if (onResult) onResult(isHeads ? "player" : "opponent");
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
    domains: gameState.playerDomains.map(stripCardForSync),
    voidCards: gameState.playerVoid.map(stripCardForSync),
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

// RESET GAMESTATE WHEN A PLAYER LEAVES/CONCEDES
function resetGameState() {
  gameState = {
    playerDeck: [],
    playerHand: [],
    playerCreatures: [],
    playerDomains: [],
    playerVoid: [],
    opponentDeck: [],
    opponentHand: [],
    opponentCreatures: [],
    opponentDomains: [],
    opponentVoid: [],
    playerDominion: null,
    opponentDominion: null,
    turn: "player",
    phase: "draw"
  };
  renderGameState();
  setupDropZones();
  // Optionally hide gameplay UI
  document.getElementById('gameplay-section').classList.remove('active');
  document.getElementById('mode-select-section').classList.add('active');
  // Hide profiles
  document.getElementById('my-profile').style.display = 'none';
  document.getElementById('opponent-profile').style.display = 'none';
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
  // If drawing to hand AND it's the opponent's log, show cardback
  if (showCardback) {
    let cardback = window.selectedOpponentDeck?.cardbackArt
      || gameState.opponentProfile?.cardbackArt
      || "OtherImages/Cardbacks/CBDefault.png";
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
    Void: "OtherImages/Icons/Void.png",
    Deck: "OtherImages/Icons/DefaultDeckBox.png",
    Hand: "OtherImages/Icons/Hand.png",
    Domains: "OtherImages/Icons/Domains.png",
    Creatures: "OtherImages/Icons/Domains.png",    
      // Add more as needed
  };  
  return `<img class="log-zone-img" src="${zoneIcons[zone] || ''}" title="${zone}" style="width:32px;vertical-align:middle;">`;
}
// LOG LOGIC
function renderLogAction({
  sourceCard,        // { image, name, cardId }
  action,            // "move", "attack", "target", etc.
  dest,              // { image, name, cardId } OR "Void"/"Deck"/"Hand"/etc
  who = "player"     // "player" or "opponent"
}, isMe = true) {
const actionIcons = {
  move: "OtherImages/Icons/Move.png",
  attack: "OtherImages/Icons/Attack.png",
  effect: "OtherImages/Icons/Effect.png",
  draw: "OtherImages/Icons/Move.png",
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
  const logDiv = document.getElementById('game-log');
  if (!logDiv) return;
  // Get card data
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  const defenderDef = dummyCards.find(c => c.id === defender.cardId);

  // Compose the log HTML
  let logHtml = `<div class="log-action attack ${who}" style="background:${who === 'player' ? '#232' : '#322'}11;border-radius:7px;display:inline-flex;align-items:center;">`;

  // Attacker image
  logHtml += cardImgLog(attackerDef, { width: 38, who });

  // Attack icon
  logHtml += `<img src="OtherImages/Icons/Attack.png" alt="Attack" style="width:32px;height:32px;vertical-align:middle;margin:0 9px;">`;

  // Defender image
  logHtml += cardImgLog(defenderDef, {width: 38, marginLeft: "8px", who, rotate: defenderOrientation === "horizontal" ? 90 : 0 });
  logHtml += `</div>`;
  logDiv.insertAdjacentHTML('beforeend', logHtml);
  logDiv.scrollTop = logDiv.scrollHeight;

  // Only emit if not from socket
  if (!fromSocket && window.socket && window.currentRoomId) {
    // Add sender
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
  } else if (obj.type === "changePosition") {
    // Find the card object using instanceId and cardId if needed
    const cardObj = { cardId: obj.cardId, instanceId: obj.instanceId };
    appendPositionChangeLog(cardObj, obj.newOrientation, obj.prevOrientation, true);
  } else {
    appendVisualLog(obj, true, false);
  }
});
// CHANGE POSITION LOG
function appendPositionChangeLog(cardObj, newOrientation, prevOrientation, fromSocket = false) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef) return;
  const logDiv = document.getElementById('game-log');
  let logHtml = `<div class="log-action" style="padding:5px 0;display:flex;align-items:center;">`;

  if (prevOrientation === "vertical" && newOrientation === "horizontal") {
    // ATK to DEF
    logHtml += cardImgLog(cardDef, { border: "2px solid #ffe066", width: 36, rotate: 0 });
    logHtml += `<img src="OtherImages/Icons/Tapped.png"
      alt="Tapped" style="width:28px;vertical-align:middle;margin-left:8px;margin-right:13px;">`;
    logHtml += cardImgLog(cardDef, { border: "2px solid #ffe066", width: 36, marginLeft: "7px", rotate: 90 });
  } else if (prevOrientation === "horizontal" && newOrientation === "vertical") {
    // DEF to ATK
    logHtml += cardImgLog(cardDef, { border: "2px solid #ffe066", width: 36, marginRight: "7px", rotate: 90 });
    logHtml += `<img src="OtherImages/Icons/Untapped.png" alt="Untapped" style="width:28px;vertical-align:middle;margin:0 7px;">`;
    logHtml += cardImgLog(cardDef, { border: "2px solid #ffe066", width: 36, rotate: 0 });
  }
  logHtml += `</div>`;
  logDiv.insertAdjacentHTML('beforeend', logHtml);
  logDiv.scrollTop = logDiv.scrollHeight;
  // Only emit if not from socket
  if (!fromSocket && window.socket && window.currentRoomId) {
    const obj = {
      cardId: cardObj.cardId,
      instanceId: cardObj.instanceId,
      newOrientation,
      prevOrientation,
      sender: gameState.playerProfile?.username || "me",
      type: "changePosition"
    };
    window.socket.emit('game action log', window.currentRoomId, obj);
  }
}

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
        if (cond.owner === "player" && !(gameState.playerCreatures.includes(cardObj) || gameState.playerDomains.includes(cardObj))) return false;
        if (cond.owner === "opponent" && !(gameState.opponentCreatures.includes(cardObj) || gameState.opponentDomains.includes(cardObj))) return false;
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
// CHANGE POSITION HELPER
function changeCardPosition(cardObj, newOrientation, callback) {
  if (!cardObj) return;
  const prevOrientation = cardObj.orientation;
  if (prevOrientation === newOrientation) { if (callback) callback(); return; }
  const zoneId = findZoneIdForCard(cardObj);

  animateCardPositionChange(cardObj, zoneId, prevOrientation, newOrientation, () => {
    cardObj.orientation = newOrientation;
    cardObj.hasChangedPositionThisTurn = true;
    appendPositionChangeLog(cardObj, newOrientation, prevOrientation);
    renderGameState();
    setupDropZones();
    emitPublicState();
    if (callback) callback();
  });
}
// APPEND TO LOG
function appendVisualLog(obj, fromSocket = false, isMe = true) {
  const logDiv = document.getElementById('game-log');
  if (!logDiv) return;

  const container = document.createElement('div');
  container.className = 'log-row';

  // If the log object contains a plain message/text, parse tokens in that text
  const text = obj && (obj.message || obj.text);
  if (text) {
    container.appendChild(parseInlineIconsToFragment(text, { size: 18 }));
  } else {
    // Fallback: render the existing HTML block and then replace any tokens inside its text nodes
    const tmp = document.createElement('div');
    tmp.innerHTML = renderLogAction(obj);
    // Replace tokens in tmp (so tokens inside the rendered HTML also get replaced)
    replaceTokensInElement(tmp, { size: 18 });
    // Move children from tmp into container
    while (tmp.firstChild) container.appendChild(tmp.firstChild);
  }

  logDiv.appendChild(container);
  logDiv.scrollTop = logDiv.scrollHeight;

  // Only emit if not from socket
  if (!fromSocket && window.socket && window.currentRoomId) {
    obj.sender = gameState.playerProfile?.username || "me";
    window.socket.emit('game action log', window.currentRoomId, obj);
  }
}
function showWaitingForOpponentModal() {
  // Show loading spinner/modal
  let modal = document.createElement('div');
  modal.id = 'waiting-modal';
  modal.className = 'modal';
  modal.innerHTML = `<div class="modal-content" style="text-align:center;"><h3>Waiting for opponent...</h3><div class="spinner"></div></div>`;
  document.body.appendChild(modal);
}
function closeWaitingForOpponentModal() {
  let modal = document.getElementById('waiting-modal');
  if (modal) modal.remove();
}

function canPayEssence(cardObj, costStr) {
  const colorCodes = "GRUYCPBW";
  let availableEssenceStr = cardObj.essence || "";
  // First, check colored requirements and subtract them from available
  for (let code of colorCodes) {
    const need = countEssenceType(costStr, code);
    const have = countEssenceType(availableEssenceStr, code);
    if (have < need) return false;
    // Remove what you need from the available string for colorless calculation
    for (let i = 0; i < need; i++) {
      availableEssenceStr = availableEssenceStr.replace(new RegExp(`\\{${code}\\}`), "");
    }
  }
  // Now handle colorless
  const colorlessMatches = typeof costStr === "string" ? costStr.match(/\{([1-9]|1[0-9]|20)\}/g) : [];
  let colorlessNeeded = 0;
  if (colorlessMatches) {
    colorlessNeeded = colorlessMatches.map(m => Number(m.replace(/[{}]/g, ""))).reduce((a, b) => a + b, 0);
  }
  // Count all remaining essence units
  const available = getTotalEssence(availableEssenceStr);
  if (available < colorlessNeeded) return false;
  return true;
}
function getTotalEssence(essenceStr) {
  // Counts all essence units, colored and colorless
  if (typeof essenceStr !== "string") return 0;
  const matches = essenceStr.match(/\{([GRUYCPBW]|[1-9]|1[0-9]|20)\}/g);
  return matches ? matches.length : 0;
}

/**
 * PRIORITY ORDER for trigger collection:
 * 1. Player's cards: field (creatures+domains), hand, void, deck (by instanceId)
 * 2. Opponent's cards: field, hand, void, deck (by instanceId)
 */
function collectTriggersForEvent(eventType, context) {
  const turnPlayer = gameState.turn; // "player" or "opponent"
  // Helper to flatten and sort arrays by instanceId (string compare for determinism)
  const sortById = arr => arr.slice().sort((a, b) => String(a.instanceId).localeCompare(String(b.instanceId)));

  // Get in priority order
  const playerZones = [
    sortById(gameState.playerCreatures),
    sortById(gameState.playerDomains),
    sortById(gameState.playerHand),
    sortById(gameState.playerVoid),
    sortById(gameState.playerDeck)
  ];
  const oppZones = [
    sortById(gameState.opponentCreatures),
    sortById(gameState.opponentDomains),
    sortById(gameState.opponentHand),
    sortById(gameState.opponentVoid),
    sortById(gameState.opponentDeck)
  ];
  // Respect player or opponent first
  const allZones = turnPlayer === "player"
    ? [...playerZones, ...oppZones]
    : [...oppZones, ...playerZones];

  const triggers = [];
  for (const zone of allZones) {
    for (const cardObj of zone) {
      if (!cardObj || !cardObj.skill) continue;
      const skills = Array.isArray(cardObj.skill) ? cardObj.skill : [cardObj.skill];
      for (const skillObj of skills) {
        if (skillObj.activation && skillObj.activation.trigger === eventType) {
          // Check condition
          const cond = skillObj.activation.triggerCondition;
          if (cond) {
            // e.g. {type: "Dragon"} (matches summonedCard/type/etc)
            let match = true;
            for (const [key, val] of Object.entries(cond)) {
              if (!fieldIncludes(context.summonedCard, key, val)) match = false;
            }
            if (!match) continue;
          } else if (context.summonedCard && context.summonedCard !== cardObj) {
            // If no condition: only trigger if self was summoned
            continue;
          }
          triggers.push({ cardObj, skillObj, context });
        }
      }
    }
  }
  return triggers;
}

// -------------------- //
// --- QUEUE SKILLS --- //
// -------------------- //
function queueEvent(eventType, context) {
  const triggers = collectTriggersForEvent(eventType, context);
  if (triggers.length) eventQueue.push({ eventType, context, triggers });
  processEventQueue();
}

function processEventQueue() {
  if (isProcessingEvents) return;
  isProcessingEvents = true;

  function nextBatch() {
    if (eventQueue.length === 0) {
      isProcessingEvents = false;
      return;
    }
    const { eventType, context, triggers } = eventQueue.shift();
    // Process each trigger in order, supporting async/manual targeting
    let i = 0;
    function processNextTrigger() {
      if (i >= triggers.length) {
        // Done with this batch, move to next event
        nextBatch();
        return;
      }
      const { cardObj, skillObj, context: trigContext } = triggers[i++];
      // Use your effect resolution logic—handleTriggerEvent, etc
      // If effect is async/manual, processNextTrigger must be called in its completion callback
      resolveTriggerEffect(cardObj, skillObj, trigContext || context, processNextTrigger);
    }
    processNextTrigger();
  }
  nextBatch();
}

/**
 * Unified effect/trigger resolver.
 * Ensures that if skill requires manual target (startSkillTarget), we pause until the user completes selection.
 * Otherwise, resolves immediately and continues the batch.
 */
function resolveTriggerEffect(cardObj, skillObj, context, onComplete) {
  // You may want to merge this logic with your `handleTriggerEvent` and `resolveSkillEffect`
  const handlerDef = TRIGGER_EVENT_MAP[skillObj.activation.trigger];
  if (handlerDef && typeof handlerDef.handler === "function") {
    // Patch: handler must accept onComplete for async/manual effects
    const maybeAsync = handlerDef.handler.length >= 4; // function(cardObj, skillObj, context, onComplete)
    if (maybeAsync) {
      handlerDef.handler(cardObj, skillObj, context, onComplete);
    } else {
      handlerDef.handler(cardObj, skillObj, context);
      if (onComplete) onComplete();
    }
  } else {
    // Fallback: resolve effect as in your normal skill resolution
    resolveSkill(cardObj, skillObj, context);
    if (onComplete) onComplete();
  }
}



/*-------------------
// ANIMATION LOGIC //
-------------------*/

// --- MOVING ANIMATION --- //
function animateCardMove(instanceId, fromZoneId, toZoneId, afterAnim) {
  if (!fromZoneId || !toZoneId) { afterAnim && afterAnim(); return; }
  const fromZone = document.getElementById(fromZoneId);
  if (!fromZone) { afterAnim && afterAnim(); return; }
  const cardDiv = Array.from(fromZone.querySelectorAll('.card-battlefield')).find(div =>
    div.dataset.instanceId === instanceId
  );
  if (!cardDiv) { afterAnim && afterAnim(); return; }

  // Fade out
  cardDiv.classList.add('card-fade-out');
  setTimeout(() => {
    cardDiv.classList.remove('card-fade-out');
    afterAnim && afterAnim();

    // Fade in at destination after render
    setTimeout(() => {
      const toZone = document.getElementById(toZoneId);
      if (!toZone) return;
      const newCardDiv = Array.from(toZone.querySelectorAll('.card-battlefield')).find(div =>
        div.dataset.instanceId === instanceId);
      if (newCardDiv) {
        newCardDiv.classList.add('card-fade-in');
        setTimeout(() => newCardDiv.classList.remove('card-fade-in'), 250);
      }
    }, 35);
  }, 220);
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
function animateCardPositionChange(cardObj, zoneId, prevOrientation, newOrientation, callback) {
  const cardDiv = findCardDivInZone(zoneId, cardObj.instanceId);
  if (!cardDiv) { if (callback) callback(); return; }

  // Remove both orientation classes just in case
  cardDiv.classList.remove("vertical", "horizontal");
  // Add previous orientation
  cardDiv.classList.add(prevOrientation);

  // Force reflow for reliable transition start
  void cardDiv.offsetWidth;

  // Switch to new orientation (triggers CSS transition)
  setTimeout(() => {
    cardDiv.classList.remove(prevOrientation);
    cardDiv.classList.add(newOrientation);
  }, 10);

  // Listen for transition end (one time)
  cardDiv.addEventListener("transitionend", function handler(e) {
    // Only care about the transform transition
    if (e.propertyName === "transform") {
      cardDiv.removeEventListener("transitionend", handler);
      if (callback) callback();
    }
  });
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
function animateHandCardAction(cardObj, callback) {
  const handDiv = document.getElementById('player-hand');
  const cardDiv = Array.from(handDiv.querySelectorAll('.card-battlefield')).find(div =>
    div.dataset.instanceId === cardObj.instanceId
  );
  if (!cardDiv) { if (callback) callback(); return; }
  cardDiv.classList.add('card-fade-out');
  setTimeout(() => {
    cardDiv.classList.remove('card-fade-out');
    if (callback) callback();
  }, 300);
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
function canActivateSkill(cardObj, skillObj, currentZone, gameState, targetObj = null) {
  // 1. REQUIREMENTS: All must pass their handler's canActivate
  let requirements = [];
  if (skillObj.requirement) {
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
    const reqDef = REQUIREMENT_MAP[reqKey];
    if (reqDef && typeof reqDef.canActivate === 'function') {
      if (!reqDef.canActivate(cardObj, skillObj, currentZone, gameState, req)) return false;
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
    const effectDef = SKILL_EFFECT_MAP[effectKey];
    if (effectDef && typeof effectDef.canActivate === 'function') {
      if (!effectDef.canActivate(cardObj, skillObj, currentZone, gameState, effect)) return false;
    }
  }

  // 3. Status Effects
  if (cardObj._paralyzed || cardObj._frozen) return false;
  if (cardObj.canActivateSkill === false) return false;

  // 4. Cost (OPTIONAL: handled by requirement/effect handler or here for fallback)
  if (skillObj.cost) {
    const sources = [...gameState.playerDomains, ...gameState.playerCreatures];
    const availableEssence = sources.map(card => card.essence || '').join('');
    if (!canPayEssence({ essence: availableEssence }, skillObj.cost)) return false;
  }

  // 5. Target validation (OPTIONAL: handled in effect handler or here)
  if (skillObj.target) {
    const targets = getTargets(skillObj.target, cardObj);
    if (!targets || targets.length === 0) return false;
  }
  return true;
}

// Update activateSkill to use the animation before requirements/effects
function activateSkill(cardObj, skillObj, options = {}) {
  const zoneId = findZoneIdForCard(cardObj);
  const currentZone = options.currentZone || getZoneNameForCard(cardObj);

  // 1. Activation animation or handler (if present)
  if (skillObj.activation && skillObj.activation.handler) {
    skillObj.activation.handler(cardObj, skillObj, () => {
      showEssencePaymentModal();
    });
  } else {
    // Default: animate only
    animateSkillActivation(cardObj, zoneId, () => {
      showEssencePaymentModal();
    });
  }
}


// Helper to get requirement(s) for a skill
function getSkillRequirements(skillObj) {
  if (skillObj.requirement) {
    return Array.isArray(skillObj.requirement) ? skillObj.requirement : [skillObj.requirement];
  }
  const activation = skillObj.activation || {};
  if (activation.requirement) {
    return Array.isArray(activation.requirement) ? activation.requirement : [activation.requirement];
  }
  return [];
}

  function runResolution() {
    // NULL COUNTER CHECK:
    // If the opponent has any Null Counters they consume one to counter this skill.
    try {
      const consumedBy = tryConsumeOpponentNullCounterForSkill(cardObj);
      if (consumedBy) {
        // Notify players and stop resolution
        const whoText = consumedBy === 'player' ? 'Player' : 'Opponent';
        showToast && showToast(`Null Counter consumed by ${whoText}! Skill was countered.`, { type: "info" });
        // Optional: append to the game log for clarity
        appendVisualLog && appendVisualLog({
          action: "nullCounter",
          text: `${whoText} consumed a Null Counter and countered ${cardObj.name || cardObj.cardId}'s skill: ${skillObj.name || ''}`,
          who: getCardOwner(cardObj) === "player" ? "opponent" : "player"
        });
        // Re-render state and stop (do not resolve skill)
        renderGameState && renderGameState();
        return;
      }
    } catch (err) {
      console.warn("Null Counter check error:", err);
      // Continue to resolve skill even if null counter check failed unexpectedly
    }

    // No Null Counter consumed — proceed to resolve the skill
    resolveSkill(cardObj, skillObj);
    renderGameState && renderGameState();
  }

function proceedSkillActivation(cardObj, skillObj, options = {}) {
  const activation = skillObj.activation || {};
  let requirements = Array.isArray(activation.requirement)
    ? activation.requirement
    : (activation.requirement ? [activation.requirement] : []);
  function runRequirements(i) {
    if (i >= requirements.length) {
      // All requirements done, now run effect
      resolveSkill(cardObj, skillObj);
      renderGameState();
      return;
    }
    const req = requirements[i];
    if (REQUIREMENT_MAP[req] && REQUIREMENT_MAP[req].handler) {
      // Support async requirements
      if (REQUIREMENT_MAP[req].handler.length >= 3) {
        REQUIREMENT_MAP[req].handler(cardObj, skillObj, () => runRequirements(i + 1));
      } else {
        REQUIREMENT_MAP[req].handler(cardObj, skillObj);
        runRequirements(i + 1);
      }
    } else {
      runRequirements(i + 1);
    }
  }
  runRequirements(0);
}

// EFFECT RESOLUTION LOGIC //
function resolveSkill(cardObj, skillObj, context = {}, onComplete) {
  let effect = skillObj.effect;

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
    const className = step.class;
    const handler = SKILL_EFFECT_MAP[className];
    if (!handler || !handler.handler) {
      nextEffect();
      return;
    }
    // Pass the effect step and nextEffect for chaining
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
      'player-creatures-zone', 'player-domains-zone',
      'opponent-creatures-zone', 'opponent-domains-zone'
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
    const skillType = SKILL_EFFECT_MAP[type];
    if (skillType && skillType.handler) {
      // Optionally, validate card location or status if needed
      // For example, skip effect if sourceCardObj was moved to deck/void by a requirement
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
    const allOpponentField = [...gameState.opponentCreatures, ...gameState.opponentDomains];
    startSkillTarget(
      allOpponentField,
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
           gameState.playerDomains.includes(sourceCardObj);
  }
  // For other types, add custom logic as needed
  return true;
}
function isSkillEffectValid(sourceCardObj, skillObj) {
  // For single-target skills:
  if (skillObj.target) {
    // If the target is no longer in the zone (e.g. not in field, not in domains array, etc)
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
    gameState.playerDomains.includes(targetObj) ||
    gameState.opponentCreatures.includes(targetObj) ||
    gameState.opponentDomains.includes(targetObj)
    // ...add other zones as needed
  );
}

function isCardStillPresent(cardObj) {
  return isTargetStillPresent(cardObj);
}

function parseCost(costStr) {
  // Converts "{2}{B}{G}" → { colorless: 2, black: 1, green: 1 }
  const cost = {};
  if (typeof costStr !== "string") return cost;
  const regex = /\{([0-9]+|[GRUYCPBW])\}/g;
  let match;
  while ((match = regex.exec(costStr))) {
    const val = match[1];
    if (!isNaN(val)) {
      cost.colorless = (cost.colorless || 0) + Number(val);
    } else {
      // Map letter to color name
      const colorMap = {
        G: "green", R: "red", U: "blue", Y: "yellow", C: "gray",
        P: "purple", B: "black", W: "white",
      };
      const color = colorMap[val];
      if (color) cost[color] = (cost[color] || 0) + 1;
    }
  }
  return cost;
}

/*------------------
// STATUS EFFECTS //
------------------*/
function applyStatus(cardObj, statusName, duration = STATUS_EFFECTS[statusName].duration) {
  cardObj.statuses = cardObj.statuses || [];
  if (!cardObj.statuses.some(s => s.name === statusName)) {
    cardObj.statuses.push({ name: statusName, duration });
    STATUS_EFFECTS[statusName].apply(cardObj);
  }
}

function removeStatus(cardObj, statusName) {
  if (!cardObj.statuses) return;
  cardObj.statuses = cardObj.statuses.filter(s => s.name !== statusName);
  if (STATUS_EFFECTS[statusName]) STATUS_EFFECTS[statusName].remove(cardObj);
}

function handleStatusEffects(cardObj) {
  if (!cardObj.statuses) return;
  cardObj.statuses.forEach(status => {
    if (STATUS_EFFECTS[status.name].onTurnStart) {
      STATUS_EFFECTS[status.name].onTurnStart(cardObj);
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
  [...gameState.playerCreatures, ...gameState.opponentCreatures].forEach(cardObj => {
    if (cardObj.statuses) {
      cardObj.statuses.forEach(status => {
        if (STATUS_EFFECTS[status.name]?.onEndPhase) {
          STATUS_EFFECTS[status.name].onEndPhase(cardObj);
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
  // Get all relevant cards (creatures, domains, etc)
  const allCards = [
    ...gameState.playerCreatures, ...gameState.playerDomains,
    ...gameState.opponentCreatures, ...gameState.opponentDomains
  ];
  allCards.forEach(cardObj => {
    if (!cardObj.statuses) return;
    cardObj.statuses.forEach(status => {
      const statusDef = STATUS_EFFECTS[status.name];
      if (!statusDef) return;
      // Determine if this status should tick in this phase
      if (
        (statusDef.tick === "allEnd" && isEndPhase(phaseObj)) ||
        (statusDef.tick === "playerEnd" && isPlayerEndPhase(phaseObj)) ||
        (statusDef.tick === "opponentEnd" && isOpponentEndPhase(phaseObj))
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

// ----------------------------------- //
// --- Card Field Helper Functions --- //
// ----------------------------------- //
function summonTokenInstance(tokenDef, ownerCardObj) {
  const tokenInstance = {
    ...tokenDef,
    instanceId: "token_" + tokenDef.id + "_" + Math.random().toString(36).slice(2, 10),
    isToken: true,
    owner: getCardOwner(ownerCardObj),
    currentHP: tokenDef.hp
  };
  // Place in correct battlefield array
  if (tokenDef.category && tokenDef.category.toLowerCase() === "creature") {
    if (tokenInstance.owner === "player") gameState.playerCreatures.push(tokenInstance);
    else gameState.opponentCreatures.push(tokenInstance);
  } else if (tokenDef.category && tokenDef.category.toLowerCase() === "domain") {
    if (tokenInstance.owner === "player") gameState.playerDomains.push(tokenInstance);
    else gameState.opponentDomains.push(tokenInstance);
  }
  renderGameState();
  setupDropZones && setupDropZones();
}

function showTokenSelectionModal(tokenDefs, amount, onComplete) {
  // Remove any existing modal
  let modal = document.getElementById('token-selection-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'token-selection-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 99999;
  modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

  const content = document.createElement('div');
  content.className = 'modal-content';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';
  content.style.gap = '18px';
  content.onclick = e => e.stopPropagation();

  content.innerHTML = `<h3>Choose ${amount} Token${amount > 1 ? "s" : ""} to Summon</h3>
    <div style="display:flex;gap:24px;justify-content:center;" id="token-choice-row"></div>
    <button class="btn-negative-secondary" id="token-cancel-btn" style="margin-top:16px;">Cancel</button>`;
  modal.appendChild(content);
  document.body.appendChild(modal);

  // Add token options
  const row = content.querySelector('#token-choice-row');
  tokenDefs.forEach((tokenDef, idx) => {
    const div = document.createElement('div');
    div.className = 'token-choice';
    div.style.cursor = "pointer";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.transition = "box-shadow 0.13s, border 0.13s";
    div.innerHTML = `
      <img src="${tokenDef.image}" alt="${tokenDef.name}" style="width:80px;height:auto;border-radius:8px;box-shadow:0 2px 8px #000b;">
      <div style="margin-top:6px;font-weight:bold;color:#ffe066;">${tokenDef.name}</div>
    `;
    row.appendChild(div);
  });

  // Multi-select logic
  let selected = [];
  Array.from(row.children).forEach((div, idx) => {
    div.onclick = function() {
      // If already selected, deselect
      const selIdx = selected.indexOf(idx);
      if (selIdx !== -1) {
        selected.splice(selIdx, 1);
        div.style.boxShadow = "";
        div.style.border = "";
      } else if (selected.length < amount) {
        selected.push(idx);
        div.style.boxShadow = "0 0 0 4px #ffe066aa";
        div.style.border = "2px solid #ffe066";
      }
      // If selection is full, auto-complete
      if (selected.length === amount) {
        setTimeout(() => {
          modal.remove();
          onComplete(selected.map(i => tokenDefs[i]));
        }, 250);
      }
    };
  });

  // Deselect on cancel
  content.querySelector('#token-cancel-btn').onclick = function() {
    modal.remove();
  };
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
// --- BADGES / COUNTERS UI HELPERS ---
// Renders a row of simple icon+count badges into containerId
function renderBadgeRow(containerId, badges) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  badges.forEach(b => {
    const el = document.createElement('div');
    el.className = 'badge-counter';
    el.style.display = 'inline-flex';
    el.style.alignItems = 'center';
    el.style.gap = '6px';
    el.style.padding = '6px 8px';
    el.style.borderRadius = '8px';
    el.style.background = b.background || '#1b2430';
    el.style.color = b.color || '#fff';
    el.title = b.title || '';
    el.innerHTML = `
      ${b.icon ? `<img src="${b.icon}" alt="${b.key || ''}" style="width:18px;height:18px;display:inline-block;">` : ''}
      <span class="badge-count" style="font-weight:700;color:${b.countColor||'#ffe066'};min-width:18px;text-align:right;">${b.count}</span>
      ${b.label ? `<span style="font-size:0.85em;color:#d0d6df;margin-left:6px;">${b.label}</span>` : ''}
    `;
    container.appendChild(el);
  });
}

// Convenience wrappers. Use your gameState/getNullCounters functions as available.
function updateOpponentBadges() {
  // example: show Null Counters (falls back to gameState.opponentNullCounters)
  const nullCount = (typeof getNullCounters === 'function') ? getNullCounters('opponent') : (gameState.opponentNullCounters || 0);
  const badges = [
    { key: 'nullCounterOpp', icon: 'OtherImages/Icons/NullCounterSmall.png', count: nullCount, label: '', title: `Null Counters: ${nullCount}` }
    // add more opponent badges here as { key, icon, count, label, title }
  ];
  renderBadgeRow('opponent-badges-row', badges);
}

function updatePlayerBadges() {
  const nullCount = (typeof getNullCounters === 'function') ? getNullCounters('player') : (gameState.playerNullCounters || 0);
  const badges = [
    { key: 'nullCounterPlayer', icon: 'OtherImages/Icons/NullCounterSmall.png', count: nullCount, label: '', title: `Null Counters: ${nullCount}` }
    // add more player badges here
  ];
  renderBadgeRow('player-badges-row', badges);
}

// Hook into UI refresh: call these from your renderGameState (or after relevant state updates)
const _origRenderGameState = typeof renderGameState === 'function' ? renderGameState : null;
function renderGameStateWithBadges() {
  if (typeof _origRenderGameState === 'function') _origRenderGameState();
  updateOpponentBadges();
  updatePlayerBadges();
}
// If renderGameState already exists, override it to ensure badges update automatically
if (typeof renderGameState === 'function') {
  const orig = renderGameState;
  renderGameState = function() {
    orig.apply(this, arguments);
    updateOpponentBadges();
    updatePlayerBadges();
  };
}
// --- GAME STATUS UI (Day/Night + Weather) ---
// Renders a compact row showing current time-of-day and active weather effects.
// Call updateGameStatusRow() from renderGameState() or whenever gameState.timeOfDay/gameState.weatherEffects change.
function formatWeatherTitle(effectObj) {
  // effectObj: { name: "Rain", duration: 2 } - adapt as needed
  const effectDef = WEATHER_EFFECTS && WEATHER_EFFECTS[effectObj.name];
  const desc = effectDef && effectDef.description ? effectDef.description : "";
  return `${effectObj.name}${effectObj.duration ? ` (${effectObj.duration})` : ""}${desc ? ` — ${desc}` : ""}`;
}
// --- REPLACEMENT: updateGameStatusRow (renders day/night and weather icons)
// Updated updateGameStatusRow - ensures pooled essence and casting preview are shown
function updateGameStatusRow() {
  const container = document.getElementById('game-status-inline');
  if (!container) return;
  container.innerHTML = '';

  // Day / Night icon (supports all four)
  const tod = gameState.timeOfDay || 'day';
  const todMap = {
    day: 'OtherImages/Icons/Status/Day.png',
    dusk: 'OtherImages/Icons/Status/Dusk.png',
    night: 'OtherImages/Icons/Status/Night.png',
    dawn: 'OtherImages/Icons/Status/Dawn.png'
  };
  const todWrap = document.createElement('div');
  todWrap.style.display = 'flex';
  todWrap.style.flexDirection = 'column';
  todWrap.style.alignItems = 'center';
  todWrap.style.gap = '6px';

  const todImg = document.createElement('img');
  todImg.src = todMap[tod] || todMap.day;
  todImg.alt = tod;
  todImg.title = `Time: ${tod}`;
  todImg.style.width = '28px';
  todImg.style.height = '28px';
  todWrap.appendChild(todImg);

  const todLbl = document.createElement('div');
  todLbl.textContent = tod.charAt(0).toUpperCase() + tod.slice(1);
  todLbl.style.fontSize = '0.75em';
  todLbl.style.color = '#ffe066';
  todLbl.style.fontWeight = '700';
  todWrap.appendChild(todLbl);

  // Player essence block
  const pWrap = document.createElement('div');
  pWrap.style.display = 'flex';
  pWrap.style.flexDirection = 'column';
  pWrap.style.alignItems = 'center';
  pWrap.style.gap = '4px';
  const pLabel = document.createElement('div');
  pLabel.textContent = 'You';
  pLabel.style.fontSize = '0.75em';
  pLabel.style.color = '#d0d6df';
  pWrap.appendChild(pLabel);
  const pIcons = document.createElement('div');
  pIcons.style.display = 'flex';
  pIcons.style.flexWrap = 'wrap';
  pIcons.style.justifyContent = 'center';
  pIcons.style.gap = '4px';
  renderEssenceSummaryInto(pIcons, getEssencePool('player'), { size: 16 });
  pWrap.appendChild(pIcons);

  // Opponent essence block
  const oWrap = document.createElement('div');
  oWrap.style.display = 'flex';
  oWrap.style.flexDirection = 'column';
  oWrap.style.alignItems = 'center';
  oWrap.style.gap = '4px';
  const oLabel = document.createElement('div');
  oLabel.textContent = 'Opp';
  oLabel.style.fontSize = '0.75em';
  oLabel.style.color = '#d0d6df';
  oWrap.appendChild(oLabel);
  const oIcons = document.createElement('div');
  oIcons.style.display = 'flex';
  oIcons.style.flexWrap = 'wrap';
  oIcons.style.justifyContent = 'center';
  oIcons.style.gap = '4px';
  renderEssenceSummaryInto(oIcons, getEssencePool('opponent'), { size: 16 });
  oWrap.appendChild(oIcons);

  // Casting preview (if payment modal is open)
  const casting = window.currentCasting || null;
  const castWrap = document.createElement('div');
  castWrap.style.display = 'flex';
  castWrap.style.flexDirection = 'column';
  castWrap.style.alignItems = 'center';
  castWrap.style.gap = '6px';
  if (casting && casting.card) {
    const img = document.createElement('img');
    img.src = casting.card.image || '';
    img.alt = casting.card.name || 'Casting';
    img.style.width = '36px';
    img.style.height = '36px';
    img.style.borderRadius = '6px';
    img.style.boxShadow = '0 2px 10px rgba(0,0,0,0.45)';
    castWrap.appendChild(img);
    if (casting.cost) {
      const costDiv = document.createElement('div');
      costDiv.innerHTML = getEssenceCostDisplay(casting.cost);
      castWrap.appendChild(costDiv);
    }
  }

  // Weather icons stack (kept minimal)
  const weatherWrap = document.createElement('div');
  weatherWrap.style.display = 'flex';
  weatherWrap.style.flexDirection = 'column';
  weatherWrap.style.alignItems = 'center';
  weatherWrap.style.gap = '6px';
  if (Array.isArray(gameState.weatherEffects) && gameState.weatherEffects.length) {
    gameState.weatherEffects.forEach(e => {
      const def = WEATHER_EFFECTS[e.name] || {};
      const icon = document.createElement('img');
      icon.src = def.icon || `OtherImages/Icons/${String(e.name).replace(/\s+/g,'')}.png`;
      icon.alt = e.name;
      icon.title = `${e.name}${e.duration ? ' ('+e.duration+')' : ''}`;
      icon.style.width = '18px';
      icon.style.height = '18px';
      weatherWrap.appendChild(icon);
    });
  }

  // assemble
  container.appendChild(todWrap);
  container.appendChild(pWrap);
  if (castWrap.children.length) container.appendChild(castWrap);
  container.appendChild(oWrap);
  container.appendChild(weatherWrap);
}

// Hook into renderGameState so updates happen automatically
if (typeof renderGameState === 'function') {
  const _origRenderGameState = renderGameState;
  renderGameState = function() {
    _origRenderGameState.apply(this, arguments);
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

// Expose to window in case other modules (shop, UI) want to read them directly
if (typeof window !== 'undefined') {
  window.getTimeOfDay = getTimeOfDay;
  window.isDay = isDay;
  window.isNight = isNight;
  window.isDusk = isDusk;
  window.isDawn = isDawn;
}
// Add more as needed...
function weatherSetter(weatherName) {return (cardObj, skillObj, context) => {if (context.setWeather) context.setWeather(weatherName, cardObj);};}
// --- Utility: get all colors/types/archetypes/traits/abilities (for filters, etc.) ---
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
function getCardTraits(cardObj) {
  const card = getCardDef(cardObj);
  if (!card) return [];
  if (Array.isArray(card.trait)) return card.trait;
  if (typeof card.trait === "string") return [card.trait];
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
  // Instance-granted abilities from effects (e.g., Champion)
  if (cardObj && Array.isArray(cardObj._grantedAbilities)) {
    // Merge unique entries; _grantedAbilities elements may be strings or objects
    cardObj._grantedAbilities.forEach(ab => {
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
function haveSharedTypeOrArchetype(cardA, cardB) {
  const aTypes = getCardTypes(cardA), bTypes = getCardTypes(cardB);
  const aArchs = getCardArchetypes(cardA), bArchs = getCardArchetypes(cardB);
  return aTypes.some(t => bTypes.includes(t)) || aArchs.some(a => bArchs.includes(a));
}
// --- NULL COUNTER HELPERS ---
// owner: "player" or "opponent"
function getNullCounters(owner) {
  if (owner === "opponent") return Number(gameState.opponentNullCounters || 0);
  return Number(gameState.playerNullCounters || 0);
}
function setNullCounters(owner, n) {
  const val = Math.max(0, Number(n) || 0);
  if (owner === "opponent") gameState.opponentNullCounters = val;
  else gameState.playerNullCounters = val;
  // UI update if needed
  renderGameState && renderGameState();
}
function addNullCounters(owner, amount = 1) {
  const current = getNullCounters(owner);
  setNullCounters(owner, current + Math.max(0, Number(amount) || 0));
  // Optional log
  showToast && showToast(`${owner === 'player' ? 'You' : 'Opponent'} gained ${amount} Null Counter${amount === 1 ? '' : 's'}`, { type: 'info' });
}
function consumeNullCounter(owner) {
  const current = getNullCounters(owner);
  if (current <= 0) return false;
  setNullCounters(owner, current - 1);
  return true;
}
// Utility: check and consume a counter belonging to the opponent of the given card's owner
function tryConsumeOpponentNullCounterForSkill(cardObj) {
  const owner = getCardOwner(cardObj) || (cardObj.owner || "player");
  const opponent = owner === "player" ? "opponent" : "player";
  if (getNullCounters(opponent) > 0) {
    consumeNullCounter(opponent);
    return opponent; // return which side consumed
  }
  return null;
}
// ------------------------------------- //
// --- HELPERS FOR SPRITE ANIMATIONS --- //
// ------------------------------------- //
function isCardActionable(cardObj, cardData, gameState, zone) {
  // 1. Playable from hand
  if (zone === 'hand') {
    if (canPayEssence(cardData.cost, getAllEssenceSources())) return true;
  }

  // 2. Can attack (for creatures on field)
  if (zone === 'player-creatures-zone' && typeof canAttack === "function") {
    if (canAttack(cardObj, gameState)) return true;
  }

  // 3. Can change position (for creatures/domains on field)
  if ((zone === 'player-creatures-zone' || zone === 'player-domains-zone') && typeof canChangePosition === "function") {
    if (canChangePosition(cardObj, zone, gameState)) return true;
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
function isAnyVoidCardActionable(gameState, dummyCards) {
  return gameState.playerVoid.some(cardObj => {
    const cardData = dummyCards.find(c => c.id === cardObj.cardId);
    return isCardActionable(cardObj, cardData, gameState, "void");
  });
}

// --- Game Log modal + clickable icon (inserted between profiles) ---
// Moves existing #game-log or #chat-log into a modal for a focused view.
// When modal closes, the log element is re-attached to its original location.

(function() {
  // State for moving the log node back when the modal closes
  let __gameLog_state = {
    originalParent: null,
    nextSibling: null
  };

  function openGameLogModal() {
    // If modal exists, just show it (it may have been hidden)
    let existing = document.getElementById('game-log-modal');
    if (existing) {
      existing.style.display = 'flex';
      return;
    }

    // Create modal wrapper
    const modal = document.createElement('div');
    modal.id = 'game-log-modal';
    modal.className = 'game-log-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.onclick = (e) => { if (e.target === modal) closeGameLogModal(); }; // backdrop click closes

    // Modal content
    const content = document.createElement('div');
    content.className = 'game-log-modal-content';

    // Header row (title + close)
    const header = document.createElement('div');
    header.className = 'game-log-modal-header';
    const title = document.createElement('div');
    title.className = 'game-log-modal-title';
    title.textContent = 'Game Log';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'game-log-modal-close';
    closeBtn.setAttribute('aria-label', 'Close Game Log');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeGameLogModal;

    header.appendChild(title);
    header.appendChild(closeBtn);
    content.appendChild(header);

    // Body container where we will place the existing log element
    const body = document.createElement('div');
    body.className = 'game-log-modal-body';
    body.id = 'game-log-modal-body';
    content.appendChild(body);

    // Footer optional: you could add filter/search controls here later
    modal.appendChild(content);
    document.body.appendChild(modal);

    // Move the existing log element (#game-log preferred, fallback to #chat-log) into the modal body
    const logDiv = document.getElementById('game-log') || document.getElementById('chat-log');
    if (logDiv) {
      // store original place for restoration
      __gameLog_state.originalParent = logDiv.parentNode;
      __gameLog_state.nextSibling = logDiv.nextSibling;
      body.appendChild(logDiv);
      // ensure the moved node is scrollable and fits modal
      logDiv.style.maxHeight = 'calc(100vh - 160px)';
      logDiv.style.overflow = 'auto';
      logDiv.style.width = '100%';
    } else {
      // No existing log found — create an empty placeholder inside the modal
      const placeholder = document.createElement('div');
      placeholder.id = 'game-log';
      placeholder.className = 'game-log';
      placeholder.textContent = 'No logs yet.';
      placeholder.style.padding = '12px';
      body.appendChild(placeholder);
    }
  }

  function closeGameLogModal() {
    const modal = document.getElementById('game-log-modal');
    if (!modal) return;
    // Try to restore the moved log element back to its original parent
    const logDiv = document.getElementById('game-log') || document.getElementById('chat-log');
    if (logDiv && __gameLog_state.originalParent) {
      try {
        // Restore style cleanup
        logDiv.style.maxHeight = '';
        logDiv.style.overflow = '';
        // Reinsert to original location
        if (__gameLog_state.nextSibling) {
          __gameLog_state.originalParent.insertBefore(logDiv, __gameLog_state.nextSibling);
        } else {
          __gameLog_state.originalParent.appendChild(logDiv);
        }
      } catch (e) {
        // If restoring fails, append to body to avoid losing it
        document.body.appendChild(logDiv);
      }
    }
    // Remove modal from DOM
    modal.remove();
    // Clear stored state
    __gameLog_state.originalParent = null;
    __gameLog_state.nextSibling = null;
  }

  function toggleGameLogModal() {
    const modal = document.getElementById('game-log-modal');
    if (modal && modal.style.display !== 'none') closeGameLogModal();
    else openGameLogModal();
  }

  // Insert the clickable icon between profiles on DOMContentLoaded
function insertGameLogIcon() {
  // Attempt to place the icon between opponent and player profile in the battlefield leftbar.
  var leftbar = document.getElementById('battlefield-leftbar');
  if (!leftbar) return;

  // Remove any existing toggle to avoid duplicates
  var existing = document.getElementById('game-log-toggle-wrap');
  if (existing) existing.remove();

  // Find the player profile element to insert before it (so icon sits between the two profiles)
  var myProfile = document.getElementById('my-profile');

  // Create wrapper and icon
  var wrap = document.createElement('div');
  wrap.id = 'game-log-toggle-wrap';
  wrap.style.display = 'flex';
  wrap.style.justifyContent = 'center';
  wrap.style.margin = '10px 0';
  wrap.style.zIndex = '5'; // ensure visible

  var img = document.createElement('img');
  img.id = 'game-log-toggle';
  // Use a notebook/view icon you have in assets; adjust path if different
  img.src = 'OtherImages/Icons/Notebook.png';
  img.alt = 'Game Log';
  img.title = 'Toggle Game Log';
  img.style.width = '44px';
  img.style.height = '44px';
  img.style.cursor = 'pointer';
  img.style.filter = 'drop-shadow(0 2px 8px rgba(0,0,0,0.45))';
  img.style.borderRadius = '8px';
  img.style.background = '#1f2a3a';

  // Toggle handler: show/hide the game log panel (keeps DOM element location intact)
  img.onclick = function(e) {
    e.stopPropagation();
    var gl = document.getElementById('game-log');
    if (!gl) return;
    if (gl.style.display === 'none' || getComputedStyle(gl).display === 'none') {
      gl.style.display = 'flex';
    } else {
      gl.style.display = 'none';
    }
  };

  wrap.appendChild(img);

  // Insert into leftbar before the player profile (so it's between opponent and player)
  if (myProfile) leftbar.insertBefore(wrap, myProfile);
  else leftbar.appendChild(wrap);
}

  // Attach insertion on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Insert the icon (if UI present)
    insertGameLogIcon();

    // Also ensure if the user interacts with profile toggles later, icon remains present
    // Simple resilience: observe for insertion of profiles and (re)insert if needed.
    const leftbar = document.getElementById('battlefield-leftbar') || document.getElementById('my-profile')?.parentNode;
    if (leftbar) {
      const observer = new MutationObserver(() => {
        if (!document.getElementById('game-log-icon')) insertGameLogIcon();
      });
      observer.observe(leftbar, { childList: true, subtree: false });
    }
  });

  // Expose open/close for manual calls (optional)
  window.openGameLogModal = openGameLogModal;
  window.closeGameLogModal = closeGameLogModal;
  window.toggleGameLogModal = toggleGameLogModal;
})();
document.getElementById('game-log').addEventListener('click', function(e) {
  if (e.target.classList.contains('log-card-img')) {
    const instanceId = e.target.getAttribute('data-instanceid');
    const cardId = e.target.getAttribute('data-cardid');
    let cardObj = null;
    const allArrays = [
      gameState.playerHand,
      gameState.playerCreatures,
      gameState.playerDomains,
      gameState.playerVoid,
      gameState.opponentHand,
      gameState.opponentCreatures,
      gameState.opponentDomains,
      gameState.opponentVoid,
      gameState.playerDeck,
      gameState.opponentDeck,
    ];
    if (instanceId) {
      for (const arr of allArrays) {
        cardObj = arr.find(c => c.instanceId === instanceId);
        if (cardObj) break;
      }
    }
    // If not found, fallback to dummyCards for static info
    if (!cardObj && cardId) {
      cardObj = dummyCards.find(c => c.id === cardId);
    }
    if (cardObj) showFullCardModal(cardObj);
  }
});

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
  var settingsBtn = document.getElementById('battlefield-settings-btn');
  if (settingsBtn) {
    settingsBtn.onclick = function() {
      var modal = document.getElementById('settings-menu-pop');
      if (modal) modal.style.display = 'flex';
      else console.warn("Settings modal not found!");
    };
  }
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
  window.socket.on('opponent_left', () => {
    // Show toast/message
    showToast("Opponent has left the match.");
    resetGameState();
  });
}


if (window.socket) {
  window.socket.on('opponent state update', (state) => {
    gameState.opponentDeck = Array.from({ length: state.deckCount }, () => ({}));
    gameState.opponentHand = Array.from({ length: state.handCount }, () => ({}));
    // Battlefield zones: use the real card objects sent from server
    gameState.opponentCreatures = state.creatures || [];
    gameState.opponentDomains = state.domains || [];
    gameState.opponentVoid = state.voidCards || [];
    gameState.opponentPhase = state.phase;
    gameState.opponentTurn = state.turn;
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
    avatar: window.playerProfilePic || "CardImages/Avatars/Default.png",
    banner: window.playerProfileBanner || "CardImages/Banners/DefaultBanner.png",
    power: typeof calculatePlayerPower === "function" ? calculatePlayerPower() : 0
  };
  socket.emit('profile', playerProfile);
});

// After local selection:
showWaitingForOpponentModal();
socket.on('opponent profile', function(profileObj) {
  const oppProfileDiv = document.getElementById('opponent-profile');
  oppProfileDiv.innerHTML = "";
  oppProfileDiv.appendChild(renderProfilePanel(profileObj));
  oppProfileDiv.style.display = '';
});

// Make available globally if called from client.js:
if (window.socket) {
  window.socket.on('casual-match-found', function(matchData) {
    document.getElementById('casual-searching-modal').style.display = 'none';

    // Build playerProfile using selected deck
    const playerDeckObj = window.selectedPlayerDeck?.deckObj || window.selectedPlayerDeck;
    const playerProfile = {
      username: window.playerUsername || "You",
      avatar: window.playerProfilePic || "CardImages/Avatars/Default.png",
      banner: window.playerProfileBanner || "CardImages/Banners/DefaultBanner.png",
      power: typeof calculatePlayerPower === "function" ? calculatePlayerPower() : 0
    };

    // Send player profile to server after joining room
    window.socket.emit('join room', matchData.roomId);
    window.socket.emit('profile', playerProfile);

    // Start game with correct profile objects
    startGame({
      mode: "casual",
      playerDeck: playerDeckObj,
      opponentDeck: matchData.opponentDeck?.deckObj || matchData.opponentDeck,
      playerProfile: playerProfile,
      opponentProfile: matchData.opponentProfile,
      isCpuGame: false,
      matchData
    });
  });
} else {
  console.error("Socket.io not initialized!");
}

if (window.socket) {
  window.socket.on('coin-flip-result', function(result) {
    // result should be "player" or "opponent" (or "heads"/"tails")
    showCoinFlipModal(function(whoStarts) {
      gameState.turn = whoStarts;
      gameState.phase = "draw";
      // ...continue with setup...
      initiateDominionSelection(gameState.playerDeck, () => {
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
window.isOpponentTurn = isOpponentTurn;
window.isPhase = isPhase;
window.isPlayerPhase = isPlayerPhase;
window.isOpponentPhase = isOpponentPhase;
window.isStartPhase = isStartPhase;
window.isActionPhase = isActionPhase;
window.isEndPhase = isEndPhase;
window.isPlayerEndPhase = isPlayerEndPhase;
window.isOpponentEndPhase = isOpponentEndPhase;
window.isPlayerActionPhase = isPlayerActionPhase;
window.isOpponentActionPhase = isOpponentActionPhase;
window.isStartOfTurn = isStartOfTurn;

window.getPhaseDisplayName = getPhaseDisplayName;
window.getPhaseClass = getPhaseClass;
