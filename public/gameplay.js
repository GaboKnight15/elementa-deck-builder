// ========================== 
// === GAMEPLAY LOGIC ===
// ==========================
// ==========================
// === CONSTANTS & STATE ===
// ==========================
// Map phase keys to your custom names
const PHASE_DISPLAY_NAMES = {draw: "Draw Phase", essence: "Essence Phase", action: "Action Phase", end: "End Phase"};
const PHASE_CLASS = {draw: 'phase-draw', essence: 'phase-essence', action: 'phase-action', end: 'phase-end'};
const PHASES = [{ turn: 'player', phase: 'draw' },{ turn: 'player', phase: 'essence' },{ turn: 'player', phase: 'action' },{ turn: 'player', phase: 'end' },
  { turn: 'opponent', phase: 'draw' },{ turn: 'opponent', phase: 'essence' },{ turn: 'opponent', phase: 'action' },{ turn: 'opponent', phase: 'end' }];
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

  turn: "player",
  phase: "draw"
};

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
    description: 'Cannot attack for 1 turn.',
    duration: 1,
    apply: (cardObj) => {
      cardObj._frozen = true;
      cardObj.canAttack = false;
    },
    remove: (cardObj) => {
      cardObj._frozen = false;
      cardObj.canAttack = true;
    },
    onTurnStart: (cardObj) => {
      // If there’s logic for re-enabling attack after duration, handle here
    }
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
  }
  // ... add more statuses
};

/*------------------------------
// ATTACK TARGETING ABILITIES //
------------------------------*/
const TARGET_FILTER_ABILITIES = {
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
    description: 'Ignores color protection, but only Flying or Ranged can block/retaliate Flying.',
    filter: (attacker, targets) => {
      // Flying ignores color protection (handled outside), so here: allow all
      return targets;
    }
  },
  Ranged: {
    icon: 'OtherImages/Icons/Ranged.png',
    name: 'Ranged',
    description: 'Can attack Flying; does not receive retaliation from non-Ranged defenders.',
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
      promptUserToSelectTarget(
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
// ATTACK RESOLUTION ABILITIES
const ATTACK_DECLARATION_ABILITIES = {
  Intimidate: {
    icon: 'OtherImages/Icons/Intimidate.png',
    name: 'Intimidate',
    description: 'When attacking, changes defending creature to DEF position.',
    effect: (attacker, defender) => {
      if (defender.orientation !== "horizontal") {
        defender.orientation = "horizontal";
        defender.hasChangedPositionThisTurn = true;
      }
    }
  },
  Provoke: {
    icon: 'OtherImages/Icons/Provoke.png',
    name: 'Provoke',
    description: 'When attacking, changes defending creature to ATK position.',
    effect: (attacker, defender) => {
      if (defender.orientation !== "vertical") {
        defender.orientation = "vertical";
        defender.hasChangedPositionThisTurn = true;
      }
    }
  }
  // ...add more declaration abilities here!
};

/*------------------------------
//---- SKILL TARGET TYPE ---- //
------------------------------*/
// Helper for requirements (add near SKILL_EFFECT_MAP)
// Helper for requirements (add near SKILL_EFFECT_MAP)
const REQUIREMENT_MAP = {
  CW: {
    zones: ['playerCreatures', 'playerDomains'],
    handler: function(sourceCardObj, skillObj) {
      if (Array.isArray(sourceCardObj.orientation)) {
        // If multi-orientation (not expected), use first
        sourceCardObj.orientation = sourceCardObj.orientation[0];
      }
      if (sourceCardObj.orientation !== "vertical") {
        showToast("Can only rotate from ATK to DEF if currently in ATK.");
        return;
      }
      changeCardPosition(sourceCardObj, "horizontal");
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      // Accept array of zones
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      return validZones.includes(currentZone) && sourceCardObj.orientation === "vertical";
    }
  },
  CCW: {
    zones: ['playerCreatures', 'playerDomains'],
    handler: function(sourceCardObj, skillObj) {
      if (Array.isArray(sourceCardObj.orientation)) {
        sourceCardObj.orientation = sourceCardObj.orientation[0];
      }
      if (sourceCardObj.orientation !== "horizontal") {
        showToast("Can only rotate from DEF to ATK if currently in DEF.");
        return;
      }
      changeCardPosition(sourceCardObj, "vertical");
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      return validZones.includes(currentZone) && sourceCardObj.orientation === "horizontal";
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
    handler: function(sourceCardObj, skillObj) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      const isField = validZones.some(zone =>
        (zone === 'playerCreatures' && gameState.playerCreatures.includes(sourceCardObj)) ||
        (zone === 'playerDomains' && gameState.playerDomains.includes(sourceCardObj))
      );
      if (!isField) {
        showToast("Sacrifice can only be activated from the field.");
        return;
      }
      const fromArr = gameState.playerCreatures.includes(sourceCardObj)
        ? gameState.playerCreatures
        : gameState.playerDomains;
      moveCard(sourceCardObj.instanceId, fromArr, gameState.playerVoid);
      renderGameState();
    },
    canActivate: function(sourceCardObj, skillObj, currentZone, gameState) {
      const validZones = Array.isArray(this.zones) ? this.zones : [this.zones];
      return validZones.includes(currentZone);
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
Strike: {
  icon: 'OtherImages/skillEffect/Strike.png',
  name: 'Strike',
  description: 'Deals damage to a single enemy target.',
  handler: function(sourceCardObj, skillObj) {
    const resolution = skillObj.resolution || {};
    promptUserToSelectTarget(
      [...gameState.opponentCreatures, ...gameState.opponentDomains],
      selectedTarget => {
        let damage = resolution.damage || 0;
        // Apply extra damage if target has Soak
        if (selectedTarget._soak && typeof selectedTarget.soakAmount === "number") {
          damage += selectedTarget.soakAmount;
        }
        if (damage > 0) dealDamage(sourceCardObj, selectedTarget, damage);

        // Apply status effects
        let statuses = Array.isArray(resolution.status) ? resolution.status : (resolution.status ? [resolution.status] : []);
        statuses.forEach(statusName => {
          if (STATUS_EFFECTS[statusName]) {
            applyStatus(selectedTarget, statusName);
          }
        });
        renderGameState();
      }
    );
  }
},
Burst: {
  icon: 'OtherImages/skillEffect/Burst.png',
  name: 'Burst',
  description: 'Deals damage to all enemy targets. May apply status effects.',
  handler: function(sourceCardObj, skillObj) {
    const targets = [...gameState.opponentCreatures, ...gameState.opponentDomains];
    targets.forEach(target => {
      let damage = skillObj.damage || 0;
      // Apply extra damage if target has Soak
      if (target._soak && typeof target.soakAmount === "number") {
        damage += target.soakAmount;
      }
      if (damage > 0) dealDamage(sourceCardObj, target, damage);
      // General status effect logic: apply any status flagged in skillObj
      let statuses = Array.isArray(skillObj.status) ? skillObj.status : (skillObj.status ? [skillObj.status] : []);
      statuses.forEach(statusName => {
        if (STATUS_EFFECTS[statusName]) {
          applyStatus(target, statusName);
        }
      });
    });
    renderGameState();
  }
},
Dash: {
  icon: 'OtherImages/skillEffect/Dash.png',
  name: 'Dash',
  description: 'Summon this card from your hand to the field.',
  handler: function(sourceCardObj, skillObj) {
    // Only activate if in hand
    const isHand = gameState.playerHand.includes(sourceCardObj);
    if (!isHand) {
      showToast("Dash can only be activated from your hand.");
      return;
    }
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
      showToast("Dash can only be used for creatures or domains.");
      return;
    }
    showSummonPositionModal(sourceCardObj, function(chosenOrientation) {
      moveCard(sourceCardObj.instanceId, gameState.playerHand, targetArr, { orientation: chosenOrientation });
      renderGameState();
      setupDropZones && setupDropZones();
    });
  }
},
  Heal: {
    icon: 'OtherImages/skillEffect/Heal.png',
    name: 'Heal',
    description: 'Heals an allied unit.',
    handler: function(sourceCardObj, skillObj) {
      promptUserToSelectTarget(
        [...gameState.allyCreatures, ...gameState.allyDomains],
        selectedTarget => {
          if (skillObj.heal) healTarget(selectedTarget, skillObj.heal);
          renderGameState();
        }
      );
    }
  },
  Cleanse: {
    icon: 'OtherImages/skillEffect/Cleanse.png',
    name: 'Cleanse',
    description: 'Removes debuffs/status effects from an allied target.',
    handler: function(sourceCardObj, skillObj) {
      promptUserToSelectTarget(
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
    description: 'Grants armor to an allied unit.',
    handler: function(sourceCardObj, skillObj) {
      promptUserToSelectTarget(
        [...gameState.allyCreatures, ...gameState.allyDomains],
        selectedTarget => {
          if (skillObj.armor) grantArmor(selectedTarget, skillObj.armor);
          renderGameState();
        }
      );
    }
  },
  Aegis: {
    icon: 'OtherImages/skillEffect/Aegis.png',
    name: 'Aegis',
    description: 'Grants a shield that blocks the next incoming damage.',
    handler: function(sourceCardObj, skillObj) {
      promptUserToSelectTarget(
        [...gameState.allyCreatures, ...gameState.allyDomains],
        selectedTarget => {
          grantAegis(selectedTarget);
          renderGameState();
        }
      );
    }
  },
  Reanimate: {
    icon: 'OtherImages/skillEffect/Reanimate.png',
    name: 'Reanimate',
    description: 'Return this card from the void to the field.',
    handler: function(sourceCardObj, skillObj) {
      // Only resolve if card is in void
      const isVoid = gameState.playerVoid.includes(sourceCardObj);
      if (!isVoid) {
        showToast("Reanimate can only be activated from the void.");
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
      });
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
    promptUserToSelectTarget(validTargets, selectedTarget => {
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
    handler: function(sourceCardObj, skillObj) {
      // Always use deck as source, hand as destination
      const deckArr = gameState.playerDeck;
      // Filtering logic (archetype, type, etc)
      const res = skillObj.resolution || {};
      const filterKeys = Object.keys(res).filter(k => !['zone', 'type', 'effect'].includes(k));
      const matches = deckArr.filter(cardObj => { 
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
        showToast("No matching cards found in your deck.");
        return;
      }
      showFilteredCardSelectionModal(matches, selectedCardObj => {
        moveCard(selectedCardObj.instanceId, gameState.playerDeck, gameState.playerHand);
        gameState.playerDeck = shuffle(gameState.playerDeck);
        closeAllModals();
        renderGameState();
        setupDropZones && setupDropZones();
        showToast(`${dummyCards.find(c=>c.id===selectedCardObj.cardId)?.name || "Card"} added to your hand!`);
      }, { title: "Search Deck - Choose a card" });
    }
  },
  // --- Moves another player card from void to field ---
  Revive: {
    icon: 'OtherImages/skillEffect/Revive.png',
    name: 'Revive',
    description: 'Revive a valid card from your void to the field.',
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
    description: 'Return a valid opponent card from the field to their hand.',
    handler: function(sourceCardObj, skillObj) {
      const res = skillObj.resolution || {};
      const fieldArrs = [gameState.opponentCreatures, gameState.opponentDomains];
      const allField = fieldArrs.flat();
      const filterKeys = Object.keys(res).filter(k => !['zone', 'type', 'effect'].includes(k));
      const matches = allField.filter(cardObj => {
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
        showToast("No matching opponent cards found on the field.");
        return;
      }
      showFilteredCardSelectionModal(matches, selectedCardObj => {
        const fromArr = fieldArrs.find(arr => arr.includes(selectedCardObj));
        moveCard(selectedCardObj.instanceId, fromArr, gameState.opponentHand);
        renderGameState();
      }, { title: "Bounce - Choose a card" });
    }
  },

  // --- Moves another opponent card from field to deck ---
  Banish: {
    icon: 'OtherImages/skillEffect/Banish.png',
    name: 'Banish',
    description: 'Return a valid opponent card from the field to their deck.',
    handler: function(sourceCardObj, skillObj) {
      const res = skillObj.resolution || {};
      const fieldArrs = [gameState.opponentCreatures, gameState.opponentDomains];
      const allField = fieldArrs.flat();
      const filterKeys = Object.keys(res).filter(k => !['zone', 'type', 'effect'].includes(k));
      const matches = allField.filter(cardObj => {
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
        showToast("No matching opponent cards found on the field.");
        return;
      }
      showFilteredCardSelectionModal(matches, selectedCardObj => {
        const fromArr = fieldArrs.find(arr => arr.includes(selectedCardObj));
        moveCard(selectedCardObj.instanceId, fromArr, gameState.opponentDeck);
        gameState.opponentDeck = shuffle(gameState.opponentDeck);
        renderGameState();
      }, { title: "Banish - Choose a card" });
    }
  },
  // Add more effects as needed (Strike, Heal, Destroy, etc.)
};

// ==========================
// === DOM REFERENCES ===
// ==========================
const phasePlayerSpan    = document.getElementById('phase-player');
const phaseNameSpan      = document.getElementById('phase-name');
const nextPhaseBtn       = document.getElementById('next-phase-btn');
const battlefield        = document.getElementById('battlefield');
const phaseBadge = document.getElementById('phase-badge');

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
  gameState.opponentDeck = shuffle(buildDeck(opponentDeck));
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
  document.getElementById('chat-ui').style.display = '';
  document.getElementById('chat-input-row').style.display = isCpuGame ? 'none' : '';
  document.getElementById('chat-log').style.display = '';
  
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
    // Optionally setup/reset chat
    if (typeof resetChatLog === "function") resetChatLog();
  }

  // Additional mode logic can go here (private, ranked, etc)
}

// ===================================
// === GAME SETUP HELPER FUNCTIONS ===
// ===================================
function drawOpeningHands() {
  for (let i = 0; i < INITIAL_HAND_SIZE; i++) {
    if (gameState.playerDeck.length > 0) {
      gameState.playerHand.push(gameState.playerDeck.shift());
    }
    if (gameState.opponentDeck.length > 0) {
      gameState.opponentHand.push(gameState.opponentDeck.shift());
    }
  }
}
function getZoneArray(zoneId) {
  switch (zoneId) {
    case "player-creatures-zone": return gameState.playerCreatures;
    case "player-domains-zone": return gameState.playerDomains;
    case "player-void-zone": return gameState.playerVoid;
    case "opponent-creatures-zone": return gameState.opponentCreatures;
    case "opponent-domains-zone": return gameState.opponentDomains;
    case "opponent-void-zone": return gameState.opponentVoid;
    // Add more if you have more zones
    default: return null;
  }
}
// Helper to get zone name for an array reference
function getZoneNameForArray(arr) {
  if (arr === gameState.playerCreatures) return 'playerCreatures';
  if (arr === gameState.playerDomains) return 'playerDomains';
  if (arr === gameState.opponentCreatures) return 'opponentCreatures';
  if (arr === gameState.opponentDomains) return 'opponentDomains';
  if (arr === gameState.playerHand) return 'playerHand';
  if (arr === gameState.opponentHand) return 'opponentHand';
  if (arr === gameState.playerDeck) return 'playerDeck';
  if (arr === gameState.opponentDeck) return 'opponentDeck';
  if (arr === gameState.playerVoid) return 'playerVoid';
  if (arr === gameState.opponentVoid) return 'opponentVoid';
  return '';
}
// ===================================
// ========== ACTIONS LOGIC ==========
// ===================================
// MOVE OBJECT
function moveCard(instanceId, fromArr, toArr, extra = {}) {
  const idx = fromArr.findIndex(card => card.instanceId === instanceId);
  if (idx !== -1) {
    let cardObj = { ...fromArr[idx], ...extra };
    let cardDef = dummyCards.find(c => c.id === cardObj.cardId);

    // If card has attachments and is leaving the field, detach them
    if (cardObj.attachedCards && cardObj.attachedCards.length > 0) {
      // Decide where to put them: to hand, toArr, or to void?
      let zoneName = getZoneNameForArray(toArr);
      let destinationArr = null;
      if (zoneName === 'playerHand') {
        destinationArr = gameState.playerHand;
      } else if (zoneName === 'playerVoid') {
        destinationArr = gameState.playerVoid;
      } else {
        // Default: send to void
        destinationArr = gameState.playerVoid;
      }
      cardObj.attachedCards.forEach(att => {
        destinationArr.push(att);
      });
      cardObj.attachedCards = []; // clear attachments
    }

    // Define which arrays are the field zones (battlefield)
    const fieldArrays = [
      gameState.playerCreatures,
      gameState.playerDomains,
      gameState.opponentCreatures,
      gameState.opponentDomains
    ];
    const fromField = fieldArrays.includes(fromArr);
    const toField = fieldArrays.includes(toArr);

    // If moving OUT of field, remove currentHP & orientation so it resets next time
    if (!toField) {
      delete cardObj.currentHP;
      delete cardObj.orientation;
    }
    const isDrawToHand =
      (fromArr === gameState.playerDeck && toArr === gameState.playerHand) ||
      (fromArr === gameState.opponentDeck && toArr === gameState.opponentHand);
    let logObj;
    if (isDrawToHand) {
      logObj = {
        sourceCard: {
          image: cardDef?.image,
          name: cardDef?.name,
          cardId: cardDef?.id,
          isDraw: true // flag for rendering cardback for opponent
        },
        action: "draw",
        dest: "Hand",
        who: (fromArr === gameState.playerDeck) ? "player" : "opponent",
        sender: gameState.playerProfile?.username || "me"
      };
    } else {
      // Standard move log
      const destZone = getZoneNameForArray(toArr);
      const sourceZone = getZoneNameForArray(fromArr);
      logObj = {
        sourceCard: { image: cardDef?.image, name: cardDef?.name, cardId: cardDef?.id },
        action: "move",
        dest: destZone === 'playerVoid' ? "Void"
          : destZone === 'playerHand' ? "Hand"
          : destZone === 'playerDeck' ? "Deck"
          : destZone === 'playerDomains' ? "Domains"
          : destZone === 'playerCreatures' ? "Creatures"
          : destZone === 'opponentVoid' ? "Void"
          : destZone === 'opponentHand' ? "Hand"
          : destZone === 'opponentDeck' ? "Deck"
          : destZone === 'opponentDomains' ? "Domains"
          : destZone === 'opponentCreatures' ? "Creatures"
          : destZone,
        from: sourceZone,
        who: (fromArr === gameState.playerHand || fromArr === gameState.playerDeck ||
              fromArr === gameState.playerDomains || fromArr === gameState.playerCreatures) ? "player" : "opponent",
        sender: gameState.playerProfile?.username || "me"
      };
    }

    // Always append log locally (solo or multiplayer!)
    appendVisualLog(logObj, false, logObj.who === "player");
    // Only emit to socket if in multiplayer mode
    if (window.socket && window.currentRoomId) {
      window.socket.emit('game action log', window.currentRoomId, logObj);
    }
    fromArr.splice(idx, 1);
    toArr.push(cardObj);
  }
  setupDropZones();
  emitPublicState();
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
  renderRowZone('opponent-creatures-zone', gameState.opponentCreatures, "creature");
  renderRowZone('opponent-domains-zone', gameState.opponentDomains, "domain");
  renderRowZone('player-creatures-zone', gameState.playerCreatures, "creature");
  renderRowZone('player-domains-zone', gameState.playerDomains, "domain");
  renderRightbarZones();
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
          alert("You can only play creature or domain cards here!");
          return;
        }
        
        // Always parse cost once here
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
    cardData.skill.forEach(skillObj => {
      const isEnabled = canActivateSkill(cardObj, skillObj, 'hand', gameState);
      buttons.push({
        text: `${skillObj.name} ${parseEffectText(skillObj.cost)}`,
        html: true,
        disabled: !isEnabled,
        onClick: function(e) {
          e.stopPropagation();
          if (!canActivateSkill(cardObj, skillObj, 'hand', gameState)) return;
          activateSkill(cardObj, skillObj);
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
    const cardEl = renderCardOnField(cardObj, zoneId);

    // Enable dragging onto a battlefield card for attachments
    const cardDiv = cardEl.querySelector('.card-battlefield');
    if (cardDiv) {
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
  const phaseBadge = document.getElementById('phase-badge');
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
    openVoidModal();
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
  modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

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
    <div style="margin-top:12px;">
      <button class="btn-negative-secondary" id="summon-cancel-btn">Cancel</button>
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
  content.querySelector('#summon-cancel-btn').onclick = function() {
    modal.remove();
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
function renderCardOnField(cardObj, zoneId) {
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  const category = cardData?.category?.toLowerCase();
  // Create wrapper FIRST!
  const wrapper = document.createElement('div');
  wrapper.className = 'card-battlefield-wrapper';

  // Main card div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-battlefield';
  cardDiv.dataset.instanceId = cardObj.instanceId;

  // Card image
  if (cardData && cardData.image) {
    const img = document.createElement('img');
    img.src = cardData.image;
    img.alt = cardData.name || "Card";
    img.style.width = "100%";
    img.style.height = "100%";
    if (cardObj.orientation === "horizontal") img.style.transform = "rotate(90deg)";
    cardDiv.appendChild(img);
  }

  // --- Stat Overlays ---
  const baseHP = typeof cardData.hp === "number" ? cardData.hp : undefined;
  const currentHP = typeof cardObj.currentHP === "number" ? cardObj.currentHP : baseHP;
  const baseATK = typeof cardObj.atk === "number" ? cardObj.atk : cardData.atk;
  const baseDEF = typeof cardObj.def === "number" ? cardObj.def : cardData.def;
  const currentArmor = typeof cardObj.armor === "number" ? cardObj.armor : cardData.armor;
  const showStats = category !== "spell";

  // HP Badge (bottom left)
  if (showStats && typeof currentHP === "number") {
    const hpBadge = document.createElement('div');
    hpBadge.className = 'stat-badge stat-hp';
    hpBadge.style.position = 'absolute';
    hpBadge.style.left = '0';
    hpBadge.style.bottom = '0';
    hpBadge.style.width = 'auto';
    hpBadge.style.height = '25px';
    hpBadge.style.zIndex = 20;
    hpBadge.innerHTML = `
      <img src="OtherImages/FieldIcons/HP.png" style="width:100%;height:100%;">
      <span style="
        position:absolute;
        left:0;top:0;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;color:#fff;
        text-shadow:0 1px 4px #232;z-index:22;
      ">${currentHP}</span>
    `;
    cardDiv.appendChild(hpBadge);
  }

  // ATK Badge (center bottom)
  if (showStats && typeof baseATK === "number") {
    const atkBadge = document.createElement('div');
    atkBadge.className = 'stat-badge stat-atk';
    atkBadge.style.position = 'absolute';
    atkBadge.style.left = '30%';
    atkBadge.style.bottom = '0';
    atkBadge.style.width = 'auto';
    atkBadge.style.height = '25%';
    atkBadge.style.zIndex = 20;
    atkBadge.innerHTML = `
      <img src="OtherImages/FieldIcons/ATK.png" style="width:100%;height:100%;">
      <span style="
        position:absolute;
        left:0;top:0;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;color:#fff;
        text-shadow:0 1px 4px #232;z-index:22;
      ">${baseATK}</span>
    `;
    cardDiv.appendChild(atkBadge);
  }

  // DEF Badge (right bottom)
  if (showStats && typeof baseDEF === "number") {
    const defBadge = document.createElement('div');
    defBadge.className = 'stat-badge stat-def';
    defBadge.style.position = 'absolute';
    defBadge.style.right = '0';
    defBadge.style.bottom = '0';
    defBadge.style.width = 'auto';
    defBadge.style.height = '25%';
    defBadge.style.zIndex = 20;
    defBadge.innerHTML = `
      <img src="OtherImages/FieldIcons/DEF.png" style="width:100%;height:100%;">
      <span style="
        position:absolute;
        left:0;top:0;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;color:#fff;
        text-shadow:0 1px 4px #232;z-index:22;
      ">${baseDEF}</span>
    `;
    cardDiv.appendChild(defBadge);
  }

  // ARMOR Badge (center-left, vertical middle)
  if (showStats && typeof currentArmor === "number" && currentArmor > 0) {
    const armorBadge = document.createElement('div');
    armorBadge.className = 'stat-badge stat-armor';
    armorBadge.style.position = 'absolute';
    armorBadge.style.left = '1px';
    armorBadge.style.top = '50%';
    armorBadge.style.transform = 'translateY(-50%)';
    armorBadge.style.width = 'auto';
    armorBadge.style.height = '25%';
    armorBadge.style.zIndex = 20;
    armorBadge.innerHTML = `
      <img src="OtherImages/FieldIcons/Armor.png" style="width:100%;height:100%;">
      <span style="
        position:absolute;
        left:0;top:0;width:100%;height:100%;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;;color:#ffe066;
        text-shadow:0 1px 4px #232;z-index:22;
      ">${currentArmor}</span>
    `;
    cardDiv.appendChild(armorBadge);
  }

  // --- HP Bar (move to bottom) ---
  if (showStats && typeof currentHP === "number" && typeof baseHP === "number" && baseHP > 0) {
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
if (cardObj.statuses) {
  cardObj.statuses.forEach(status => {
    const statusIcon = document.createElement('img');
    statusIcon.src = STATUS_EFFECTS[status.name].icon;
    statusIcon.title = STATUS_EFFECTS[status.name].description;
    statusIcon.className = "status-effect-icon";
    cardDiv.appendChild(statusIcon);
  });
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
      attDiv.style.right = '0px';
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

  // Essence pool rendering (unchanged)
  const essenceDiv = renderEssencePool(cardObj);
  if (essenceDiv) cardDiv.appendChild(essenceDiv);

  // Add cardDiv to wrapper
  wrapper.appendChild(cardDiv);

  // MANUAL HP UPDATE
  cardDiv.onclick = function(e) {
    e.stopPropagation();
    showCardActionMenu(cardObj.instanceId, zoneId, cardObj.orientation || "vertical", cardDiv);
  };

  return wrapper;
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
    essenceStr = essenceStr.replace(new RegExp(`\\{${type}\\}`), "");
  }
  cardObj.essence = essenceStr;
  renderGameState();
  return true;
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
  cardData.skill.forEach(skillObj => {
    const isEnabled = canActivateSkill(cardObj, skillObj, currentZone, gameState);
    buttons.push({
      text: `${skillObj.name} ${parseEffectText(skillObj.cost, skillObj.activation?.requirement)}`,
      html: true,
      disabled: !isEnabled,
      onClick: function(e) {
        e.stopPropagation();
        if (!canActivateSkill(cardObj, skillObj, currentZone, gameState)) return;
        activateSkill(cardObj, skillObj);
        closeAllMenus();
      }
    });
  });
}

/*
  // Only allow "View" if clicking a card in an opponent's zone
  if (zoneId === "opponent-creatures-zone" || zoneId === "opponent-domains-zone") {
    buttons.push({
      text: "View",
      onClick: function(e) {
        e.stopPropagation();
        showFullCardModal(cardObj);
        closeAllMenus();
      }
    });
  } else {
    // existing menu logic for player's zones...
    // (copy your normal menu here)
  }
  */
  
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
function openVoidModal() {
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
  const voidCards = gameState.playerVoid;
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

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.className = "modal-card-img";
    cardDiv.appendChild(img);

    // Make image clickable for menu
    img.style.cursor = "pointer";
    img.onclick = (e) => {
      e.stopPropagation();
      // Remove all card menus in this modal
      closeAllMenus();
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
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
        if (cardData && Array.isArray(cardData.skill)) {
          cardData.skill.forEach(skillObj => {
            buttons.push({
              text: `${skillObj.name} ${parseEffectText(skillObj.cost)}`,
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

// CURRENT PHASE
function getCurrentPhaseIndex() {
  return PHASES.findIndex(
    p => p.turn === gameState.turn && p.phase === gameState.phase
  );
}
function getCurrentViewTurn() {
  // If multiplayer, compare gameState.turn and your player identity
  // For this example, assume you are always "player" and opponent is "opponent"
  // If it's "player", show "Your turn". If "opponent", show "Opponent's turn"
  return gameState.turn === "player" ? "Your turn" : "Opponent's turn";
}
function updatePhase() {
  const phaseBadge = document.getElementById('phase-badge');
  const phaseNameSpan = document.getElementById('phase-name');
  const nextPhaseBtn = document.getElementById('next-phase-btn');
  phaseBadge.classList.remove('opponent-turn', 'player-turn');
  phaseBadge.classList.add(gameState.turn === 'opponent' ? 'opponent-turn' : 'player-turn');
  if (phasePlayerSpan) phasePlayerSpan.textContent = getCurrentViewTurn();
  // Display the current phase on the button
  if (nextPhaseBtn) {
    nextPhaseBtn.textContent = PHASE_DISPLAY_NAMES[gameState.phase] || gameState.phase;
  }  
  if (phaseNameSpan) {
    phaseNameSpan.className = PHASE_CLASS[gameState.phase];
    phaseNameSpan.textContent = PHASE_DISPLAY_NAMES[gameState.phase] || gameState.phase;
  }
  if (gameState.phase === "essence") {
    essencePhase(gameState.turn);
  }
  if (gameState.turn === "opponent") {
    setTimeout(runCpuTurn, 500);
  }  
  if (gameState.phase === "action") {
    resetAttackFlags(gameState.turn);
    if (gameState.turn === "player") {
      gameState.playerCreatures.forEach(card => card.hasChangedPositionThisTurn = false);
      gameState.playerDomains.forEach(card => card.hasChangedPositionThisTurn = false);
    }
    if (gameState.turn === "opponent") {
      gameState.opponentCreatures.forEach(card => card.hasChangedPositionThisTurn = false);
      gameState.opponentDomains.forEach(card => card.hasChangedPositionThisTurn = false);
    }
  }    
}
// Phase control events
nextPhaseBtn.onclick = () => {
  let idx = getCurrentPhaseIndex();
  idx = (idx + 1) % PHASES.length;
  gameState.turn = PHASES[idx].turn;
  gameState.phase = PHASES[idx].phase;
  updatePhase();
  renderGameState && renderGameState();
  setupDropZones();
};

// --- Log system: append to chat-log ---
function appendChatLog(type, sender, text, isMe = false) {
  const logDiv = document.getElementById('chat-log');
  const entry = document.createElement('div');
  entry.className = `log-${type}`;
  entry.innerHTML = `<span class="chat-sender${isMe ? ' chat-sender-me' : ''}">${sender}:</span> <span>${text}</span>`;
  logDiv.appendChild(entry);
  logDiv.scrollTop = logDiv.scrollHeight;
}

// --- Chat send logic ---
document.getElementById('send-chat-btn').onclick = function() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (msg.length && window.socket && window.currentRoomId) {
    window.socket.emit('game message', window.currentRoomId, msg);
    input.value = '';
  }
};

window.socket.on('game message', (data) => {
  // Highlight your own message
  const isMe = (data.sender === gameState.playerProfile?.username);
  appendChatLog('message', data.sender, data.msg, isMe);
});

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
      drawCards("opponent", 1);
      appendVisualLog({
        sourceCard: {/* info about drawn card or just {name:"Draw"} */},
        action: "draw",
        dest: "Hand",
        who: "opponent"
      }, false, false);
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

// CARD ANIMATIONS
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
    return card && card.trait && card.trait.toLowerCase() === "dominion";
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
  // Get all champions in deck
  const champions = deckArr.filter(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.trait && card.trait.toLowerCase() === "champion";
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
// ESSENCE GENERATION
function generateEssenceForCard(cardObj) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef || !cardDef.essence) return;
  // Just append the essence string for this card to cardObj.essence
  cardObj.essence = (cardObj.essence || "") + cardDef.essence;
  renderGameState();
}
function essencePhase(playerOrOpponent) {
  // Get the correct arrays
  const domains = playerOrOpponent === "player" ? gameState.playerDomains : gameState.opponentDomains;
  const creatures = playerOrOpponent === "player" ? gameState.playerCreatures : gameState.opponentCreatures;
  // Optionally filter for Champions only
  const champions = creatures.filter(cardObj => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    return card && card.trait === "champion";
  });

  // Domains
  domains.forEach(generateEssenceForCard);
  // Champions
  champions.forEach(generateEssenceForCard);

  // Optionally: show animation/notification
  renderGameState();
}
function animateEssencePop(icon) {
  icon.classList.add('essence-pop');
  icon.addEventListener('animationend', () => {
    icon.classList.remove('essence-pop');
  }, { once: true });
}

// ESSENCE CONSUPTION LOGIC
function showEssencePaymentModal(opts) {
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
  modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };

  // Modal content
  const content = document.createElement('div');
  content.className = 'modal-content';
  content.onclick = e => e.stopPropagation();
  modal.appendChild(content);

  // Header: Show card/ability being played/activated
  const card = opts.card;
  const cardData = card || {};
  const img = document.createElement('img');
  img.src = cardData.image || '';
  img.alt = cardData.name || '';
  img.style.width = '100px';
  img.style.borderRadius = '8px';
  img.style.marginRight = '12px';

  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.marginBottom = '10px';
  header.innerHTML = `<div style="font-size:1.2em;font-weight:bold;">Essence Cost</div>`;
  const iconUnits = expandCostToIcons(opts.cost);
  let costIconsHtml = iconUnits.map(unit =>
    `<img src="${unit.img}" style="width:32px;margin-right:2px;" alt="${unit.color} Essence">`
  ).join('');
  header.innerHTML += `<div>${costIconsHtml}</div>`;
  if (cardData.image) header.prepend(img);
  content.appendChild(header);

  // Requirement display
  const reqDiv = document.createElement('div');
  reqDiv.className = 'essence-requirements';
  reqDiv.style.marginBottom = '8px';

  // Convert opts.cost to array of {color, needed, paid}
  let requirements = [];
  if (typeof opts.cost === "number" && opts.cost === 0) {
    // No requirement
    requirements = [];
  } else if (typeof opts.cost === "object" && opts.cost !== null) {
    for (const color in opts.cost) {
      requirements.push({color, needed: opts.cost[color], paid: 0});
    }
  }

  // Payment state trackers
  let reqPaid = {};
  requirements.forEach(r => { reqPaid[r.color] = 0; });

  // Initial requirements display
  updateReqDiv(requirements, reqPaid, reqDiv);
  content.appendChild(reqDiv);

  // Payment assignment state (array of {cardObj, color, essenceIdx})
  let paymentPlan = [];

  // Helper to check if requirement is full
  function isPaidFull() {
    for (const r of requirements) {
      if ((reqPaid[r.color] || 0) < r.needed) return false;
    }
    return true;
  }

  // Show eligible sources and their Essence
  const sourcesDiv = document.createElement('div');
  sourcesDiv.className = 'essence-source-list';
  sourcesDiv.style.display = 'flex';
  sourcesDiv.style.flexWrap = 'wrap';
  sourcesDiv.style.gap = '18px';
  sourcesDiv.style.margin = '10px 0 18px 0';

  // List of {cardObj, color, idx (the nth essence of that color on this card)}
  let selectableEssenceUnits = [];
  opts.eligibleCards.forEach(sourceCard => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'essence-source-card';
    cardDiv.style.minWidth = '90px';
    cardDiv.style.background = '#20283e';
    cardDiv.style.border = '2px solid #333';
    cardDiv.style.padding = '7px';
    cardDiv.style.borderRadius = '9px';
    cardDiv.style.position = 'relative';

    // Card name/img
    const smallImg = document.createElement('img');
    smallImg.src = (dummyCards.find(c=>c.id===sourceCard.cardId)||{}).image || '';
    smallImg.style.width = '34px';
    smallImg.style.borderRadius = '4px';
    smallImg.style.marginBottom = '6px';
    cardDiv.appendChild(smallImg);

    const nameDiv = document.createElement('div');
    nameDiv.textContent = (dummyCards.find(c=>c.id===sourceCard.cardId)||{}).name || '';
    nameDiv.style.fontSize = '0.95em';
    nameDiv.style.marginBottom = '4px';
    cardDiv.appendChild(nameDiv);

    // Essence icons
    const essenceWrap = document.createElement('div');
    essenceWrap.style.display = 'flex';
    essenceWrap.style.flexWrap = 'wrap';
    essenceWrap.style.gap = '5px';
    // Colored essence
    for (const code in ESSENCE_IMAGE_MAP) {
      // code: green, red, etc.  Map to single letter
      const codeLetterMap = {green: 'G', red: 'R', blue: 'U', yellow: 'Y', gray: 'C', purple: 'P', black: 'B', white: 'W'};
      const codeLetter = codeLetterMap[code];
      let amt = countEssenceType(sourceCard.essence, codeLetter);
      for (let i = 0; i < amt; i++) {
        const icon = document.createElement('img');
        icon.src = ESSENCE_IMAGE_MAP[code];
        icon.className = 'essence-img';
        icon.style.width = '22px';
        icon.style.borderRadius = '50%';
        icon.style.cursor = "pointer";
        icon.style.border = '2px solid #aaa';
        icon.style.background = '#222';
        icon.style.margin = '1px';
        icon.title = code.charAt(0).toUpperCase()+code.slice(1) + " Essence (click to select)";

        let assigned = false;
        icon.onclick = function() {
          // Only assign if there is a remaining unpaid requirement of this type or colorless
          let assignColor = null;
          if ((reqPaid[code] || 0) < (opts.cost[code] || 0)) {
            assignColor = code;
          } else if (code !== "colorless" && (opts.cost.colorless && (reqPaid.colorless || 0) < opts.cost.colorless)) {
            assignColor = "colorless";
          }
          if (!assignColor || assigned) return;

          reqPaid[assignColor]++;
          paymentPlan.push({cardObj: sourceCard, color: code, essenceIdx: i, codeLetter: codeLetter});
          assigned = true;
          icon.style.opacity = '0.4';
          icon.style.border = '2.5px solid #ffe066';

          updateReqDiv(requirements, reqPaid, reqDiv);
          updateConfirmBtn();
        };
        selectableEssenceUnits.push({icon, cardObj: sourceCard, color: code, idx: i, codeLetter, assigned: ()=>assigned});
        essenceWrap.appendChild(icon);
      }
    }
    // Colorless essence
    let colorlessAmt = countColorlessEssence(sourceCard.essence);
    for (let i = 0; i < colorlessAmt; i++) {
      const icon = document.createElement('img');
      icon.src = ESSENCE_IMAGE_MAP['gray'];
      icon.className = 'essence-img';
      icon.style.width = '22px';
      icon.style.borderRadius = '50%';
      icon.style.cursor = "pointer";
      icon.style.border = '2px solid #aaa';
      icon.style.background = '#222';
      icon.style.margin = '1px';
      icon.title = "Colorless Essence (click to select)";
      let assigned = false;
      icon.onclick = function() {
        if ((reqPaid.colorless || 0) < (opts.cost.colorless || 0) && !assigned) {
          reqPaid.colorless++;
          paymentPlan.push({cardObj: sourceCard, color: 'colorless', essenceIdx: i});
          assigned = true;
          icon.style.opacity = '0.4';
          icon.style.border = '2.5px solid #ffe066';
          updateReqDiv(requirements, reqPaid, reqDiv);
          updateConfirmBtn();
        }
      };
      selectableEssenceUnits.push({icon, cardObj: sourceCard, color: 'colorless', idx: i, assigned: ()=>assigned});
      essenceWrap.appendChild(icon);
    }
    cardDiv.appendChild(essenceWrap);
    sourcesDiv.appendChild(cardDiv);
  });
  content.appendChild(sourcesDiv);

  // Confirm button
  const confirmBtn = document.createElement('button');
  confirmBtn.type = 'button';
  confirmBtn.className = 'btn-primary';
  confirmBtn.textContent = 'Confirm';
  confirmBtn.disabled = true;
  confirmBtn.style.marginTop = '12px';
  confirmBtn.onclick = function() {
    // Actually deduct the paid Essence (from string)
    for (const pay of paymentPlan) {
      if (!pay.cardObj.essence) continue;
      // Remove one colored essence
      if (pay.color !== 'colorless') {
        // Remove first occurrence of {codeLetter}
        pay.cardObj.essence = pay.cardObj.essence.replace(new RegExp(`\\{${pay.codeLetter}\\}`), "");
      } else {
        // Remove first colorless {number}
        pay.cardObj.essence = pay.cardObj.essence.replace(/\{([1-9]|1[0-9]|20)\}/, "");
      }
    }
    renderGameState();
    modal.style.display = 'none';
    if (opts.onPaid) opts.onPaid(paymentPlan);
  };
  content.appendChild(confirmBtn);

  function updateConfirmBtn() {
    confirmBtn.disabled = !isPaidFull();
  }

  // Cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'btn-negative-secondary';
  cancelBtn.style.marginLeft = '8px';
  cancelBtn.onclick = function() {
    modal.style.display = 'none';
  };
  content.appendChild(cancelBtn);
}
// Utility function: Expand cost object to list of unit icons
function expandCostToIcons(costObj) {
  const icons = [];
  // Colorless first: push X1 for each required
  for (let i = 0; i < (costObj.colorless || 0); i++) {
    icons.push({ color: 'colorless', img: ESSENCE_IMAGE_MAP['X1'] });
  }
  // Then colored mana
  const colorOrder = ['green','blue','red','white','black','yellow','purple','gray'];
  colorOrder.forEach(color => {
    for (let i = 0; i < (costObj[color] || 0); i++) {
      icons.push({ color, img: ESSENCE_IMAGE_MAP[color] });
    }
  });
  return icons;
}
// Requirement "progress" update
function updateReqDiv(requirements, reqPaid, reqDiv) {
  // requirements: array of {color, needed, paid}
  // reqPaid: {color: number}
  reqDiv.innerHTML = `<b>Essence Required:</b> ${
    requirements.map(r => {
      let icons = "";
      // Colorless: use the X1 image for each unit
      if (r.color === "colorless") {
        for (let i = 0; i < r.needed; i++) {
          const imgSrc = ESSENCE_IMAGE_MAP['X1'];
          const isPaid = i < (reqPaid[r.color] || 0);
          icons += `<img src="${imgSrc}" 
            style="width:24px;height:24px;vertical-align:middle;margin-right:2px;
            filter:${isPaid ? "none" : "grayscale(0.7) brightness(1.1)"};
            opacity:${isPaid ? "1" : "0.7"};
            transition:filter 0.2s,opacity 0.2s;">`;
        }
      } else {
        // Colored essence: use its color image
        const imgSrc = ESSENCE_IMAGE_MAP[r.color] || ESSENCE_IMAGE_MAP.gray;
        for (let i = 0; i < r.needed; i++) {
          const isPaid = i < (reqPaid[r.color] || 0);
          icons += `<img src="${imgSrc}" 
            style="width:24px;height:24px;vertical-align:middle;margin-right:2px;
            filter:${isPaid ? "none" : "grayscale(0.7) brightness(1.1)"};
            opacity:${isPaid ? "1" : "0.7"};
            transition:filter 0.2s,opacity 0.2s;">`;
        }
      }
      return `<span style="margin-right:12px;display:inline-flex;align-items:center;">${icons}</span>`;
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

  const targets = getOpponentAttackableTargets(attacker);

  targets.forEach(cardObj => {
    // Try both rows for finding the DOM element
    let targetDiv = findCardDivInZone('opponent-creatures-zone', cardObj.instanceId)
      || findCardDivInZone('opponent-domains-zone', cardObj.instanceId);
    if (targetDiv) {
      targetDiv.classList.add('attack-target-highlight');
      targetDiv.onclick = function(e) {
        e.stopPropagation();
        resolveAttack(attackerId, cardObj.instanceId);
        endAttackTargeting();
        battlefield.classList.remove('attack-mode-backdrop');
      };
    }
  });

  // Cancel handler
  attackMode.cancelHandler = function(e) {
    endAttackTargeting();
    battlefield.classList.remove('attack-mode-backdrop');
  };
  setTimeout(() => document.body.addEventListener('click', attackMode.cancelHandler, { once: true }), 10);
}

function getOpponentAttackableTargets(attackerObj = null) {
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

  // Now apply ability-based restrictions to this filtered list
  return filterAttackableTargets(attackerObj, targets);
}
function endAttackTargeting() {
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

function resolveAttack(attackerId, defenderId) {
  // Find attacker and defender card objects and their arrays
  let attacker, defender, attackerArr, defenderArr, attackerVoid, defenderVoid;

  attacker =
    gameState.playerCreatures.find(c => c.instanceId === attackerId) ||
    gameState.opponentCreatures.find(c => c.instanceId === attackerId);

  defender =
    gameState.opponentCreatures.find(c => c.instanceId === defenderId) ||
    gameState.opponentDomains.find(c => c.instanceId === defenderId) ||
    gameState.playerCreatures.find(c => c.instanceId === defenderId) ||
    gameState.playerDomains.find(c => c.instanceId === defenderId);

  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  const defenderDef = dummyCards.find(c => c.id === defender.cardId);

  handleAttackDeclarationAbilities(attacker, defender);

  if (gameState.playerCreatures.includes(attacker)) {
    attackerArr = gameState.playerCreatures;
    attackerVoid = gameState.playerVoid;
  } else if (gameState.opponentCreatures.includes(attacker)) {
    attackerArr = gameState.opponentCreatures;
    attackerVoid = gameState.opponentVoid;
  }
  if (gameState.playerCreatures.includes(defender)) {
    defenderArr = gameState.playerCreatures;
    defenderVoid = gameState.playerVoid;
  } else if (gameState.opponentCreatures.includes(defender)) {
    defenderArr = gameState.opponentCreatures;
    defenderVoid = gameState.opponentVoid;
  } else if (gameState.playerDomains.includes(defender)) {
    defenderArr = gameState.playerDomains;
    defenderVoid = gameState.playerVoid;
  } else if (gameState.opponentDomains.includes(defender)) {
    defenderArr = gameState.opponentDomains;
    defenderVoid = gameState.opponentVoid;
  }

  if (!attacker || !defender) return;

  // --- ABILITY LOGIC ---
  // Defender has Flying: can only be attacked by Flying or Ranged
  if (defenderHasAbility(defender, 'Flying')) {
    if (!(attackerHasAbility(attacker, 'Flying') || attackerHasAbility(attacker, 'Ranged'))) {
      showToast("You can only attack Flying creatures with Flying or Ranged cards!");
      return;
    }
  }

  // Ranged: does not receive retaliation when attacking
  let attackerGetsRetaliation = true;
  if (attackerHasAbility(attacker, 'Ranged') && defenderDef.category === "creature") {
    attackerGetsRetaliation = false;
  }

  // --- LOG THE ATTACK ---
  appendAttackLog({
    attacker: attacker,
    defender: defender,
    defenderOrientation: defender.orientation,
    who: getCardOwner(attacker)
  });  

  // === Attack Logic ===

  if (defenderDef.category === "creature") {
    if (defender.orientation === "horizontal") {
      dealDamage(attacker, defender, attacker.atk);
      if (attackerGetsRetaliation) {
        dealDamage(defender, attacker, defender.atk);
      }
    } else if (defender.orientation === "vertical") {
      let damage = Math.max(0, attacker.atk - defender.def);
      dealDamage(attacker, defender, damage);
      // Defender does not deal damage back
    }
  } else {
    dealDamage(attacker, defender, attacker.atk);
  }

  attacker.hasAttacked = true;

  // Apply status effects from attacker abilities to defender (if defender is a creature)
  const attackerAbilities = attackerDef.ability || [];
  if (defenderDef && defenderDef.category === "creature") {
    attackerAbilities.forEach(abilityName => {
      if (STATUS_EFFECTS[abilityName]) {
        applyStatus(defender, abilityName);
      }
    });
  }

  if (attacker.currentHP <= 0 && attackerArr && attackerVoid) moveCard(attacker.instanceId, attackerArr, attackerVoid);
  if (defender.currentHP <= 0 && defenderArr && defenderVoid) moveCard(defender.instanceId, defenderArr, defenderVoid);

  renderGameState();
  setupDropZones();
}
// --- Damage Helper: Deals armor/HP damage ---
function dealDamage(source, target, amount) {
  if (!target) return;
  if (target.armor && target.armor > 0) {
    let armorAbsorb = Math.min(target.armor, amount);
    target.armor -= armorAbsorb;
    amount -= armorAbsorb;
  }
  if (amount > 0) {
    target.currentHP = (typeof target.currentHP === "number" ? target.currentHP : getBaseHp(target.cardId)) - amount;
  }
}
// --- Utility: Determine card owner as "player" or "opponent" ---
function getCardOwner(cardObj) {
  if (gameState.playerCreatures.includes(cardObj) || gameState.playerDomains.includes(cardObj)) return "player";
  if (gameState.opponentCreatures.includes(cardObj) || gameState.opponentDomains.includes(cardObj)) return "opponent";
  return null;
}

// --- Reset hasAttacked for all creatures at start of player's/opponent's action phase ---
function resetAttackFlags(turn) {
  const arr = turn === "player" ? gameState.playerCreatures : gameState.opponentCreatures;
  arr.forEach(creature => { creature.hasAttacked = false; });
}

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
  // Clear chat
  const logDiv = document.getElementById('chat-log');
  if (logDiv) logDiv.innerHTML = '';
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
  move: "→",
  attack: "⚔️",
  effect: "★",
  draw: "⤵️",
    // Add more as needed
};
let showCardback = action === "draw" && !isMe;
let destHtml = typeof dest === "string"
  ? zoneImgLog(dest)
  : cardImgLog(dest, { who, action, isDraw: dest?.isDraw, showCardback });
let entryHtml = `
  <div class="log-action ${who}" style="background:${who === 'player' ? '#232' : '#322'}11;border-radius:7px;display:inline-flex;align-items:center;">
    ${cardImgLog(sourceCard, { who, action, isDraw: sourceCard?.isDraw, showCardback })}
    <span class="log-arrow" style="margin:0 7px 0 7px;">${actionIcons[action] || "→"}</span>
    ${destHtml}
  </div>
`;
  return entryHtml;
}

// ATTACK LOG
function appendAttackLog({ attacker, defender, defenderOrientation, who = "player" }, fromSocket = false, isMe = true) {
  const logDiv = document.getElementById('chat-log');
  if (!logDiv) return;
  // Get card data
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  const defenderDef = dummyCards.find(c => c.id === defender.cardId);

  // Compose the log HTML
  let logHtml = `<div class="log-action attack ${who}" style="background:${who === 'player' ? '#232' : '#322'}11;border-radius:7px;display:inline-flex;align-items:center;">`;

  // Attacker image
  logHtml += cardImgLog(attackerDef, { width: 38, borderRadius: "6px", marginRight: "8px", who });

  // Attack icon
  logHtml += `<img src="OtherImages/Icons/Attack.png" alt="Attack" style="width:32px;height:32px;vertical-align:middle;margin:0 9px;">`;

  // Defender image
  logHtml += cardImgLog(defenderDef, {width: 38, marginRight: "8px", who, rotate: defenderOrientation === "horizontal" ? 90 : 0 });
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
  const logDiv = document.getElementById('chat-log');
  let logHtml = `<div class="log-action" style="padding:5px 0;display:flex;align-items:center;">`;

  if (prevOrientation === "vertical" && newOrientation === "horizontal") {
    // ATK to DEF
    logHtml += cardImgLog(cardDef, { border: "2px solid #ffe066", width: 36, rotate: 0 });
    logHtml += `<img src="OtherImages/Icons/Tapped.png" alt="Tapped" style="width:28px;vertical-align:middle;margin:0 7px;">`;
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
function changeCardPosition(cardObj, newOrientation) {
  if (!cardObj) return;
  const prevOrientation = cardObj.orientation;
  if (prevOrientation === newOrientation) return; // No change
  cardObj.orientation = newOrientation;
  cardObj.hasChangedPositionThisTurn = true;
  appendPositionChangeLog(cardObj, newOrientation, prevOrientation);
  renderGameState();
  setupDropZones();
  emitPublicState();
}
// APPEND TO LOG
function appendVisualLog(obj, fromSocket = false, isMe = true) {
  const logDiv = document.getElementById('chat-log');
  logDiv.insertAdjacentHTML('beforeend', renderLogAction(obj));
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

function canActivateSkill(cardObj, skillObj, currentZone, gameState) {
  const activation = skillObj.activation || {};
  // 1. Check Zone (from activation)
  if (Array.isArray(activation.zone)) {
    if (!activation.zone.includes(currentZone)) return false;
  } else {
    if (activation.zone && activation.zone !== currentZone) return false;
  }

  // 2. Status Effects (Paralysis, Freeze, etc)
  if (cardObj._paralyzed || cardObj._frozen) return false;
  if (cardObj.canActivateSkill === false) return false;

  // 3. Essence Cost (assume skillObj.cost is a string like '{1}{U}', pass to your cost-checker)
  if (skillObj.cost) {
    const sources = [...gameState.playerDomains, ...gameState.playerCreatures];
    const availableEssence = sources.map(card => card.essence || '').join('');
    if (!canPayEssence({ essence: availableEssence }, skillObj.cost)) return false;
  }
  // 4. Activation requirement (optional: check if requirement can be performed)
  if (activation.requirement && REQUIREMENT_MAP[activation.requirement] && REQUIREMENT_MAP[activation.requirement].canActivate) {
    if (!REQUIREMENT_MAP[activation.requirement].canActivate(cardObj, skillObj, currentZone, gameState)) return false;
  }
  // 5. Any other custom activation requirements
  return true;
}

function hasAvailableTargets(skillObj, sourceCardObj, gameState) {
  switch (skillObj.type) {
    case 'Strike':
      return [...gameState.opponentCreatures, ...gameState.opponentDomains].length > 0;
    case 'Burst':
      return [...gameState.opponentCreatures, ...gameState.opponentDomains].length > 0;
    case 'Heal':
    case 'Cleanse':
    case 'Armor':
    case 'Aegis':
    case 'Veil':
      return [...gameState.allyCreatures, ...gameState.allyDomains].length > 0;
    // Add more cases as needed
    default:
      return true; // Default: assume available
  }
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

/*---------------------------------------------
// Helper functions for abilities and skills //
---------------------------------------------*/
function attackerHasAbility(cardObj, abilityName) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  return cardDef && Array.isArray(cardDef.ability) && cardDef.ability.includes(abilityName);
}
function defenderHasAbility(cardObj, abilityName) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  return cardDef && Array.isArray(cardDef.ability) && cardDef.ability.includes(abilityName);
}
function getCardColors(cardObj) {
  const cardDef = dummyCards.find(c => c.id === cardObj.cardId);
  if (!cardDef) return [];
  if (Array.isArray(cardDef.color)) return cardDef.color;
  if (typeof cardDef.color === "string") return [cardDef.color];
  return [];
}

/*------------------------------------
// SKILL RESOLUTION LOGIC //
------------------------------------*/
// Update activateSkill to use the animation before requirements/effects
function activateSkill(cardObj, skillObj, options = {}) {
  // Pay cost if needed
  const zoneId = findZoneIdForCard(cardObj);
  function afterAnim() {
    proceedSkillActivation(cardObj, skillObj, options);
  }
  if (skillObj.cost) {
    showEssencePaymentModal({
      card: cardObj,
      cost: parseCost(skillObj.cost),
      eligibleCards: getAllEssenceSources(),
      onPaid: function() {
        animateSkillActivation(cardObj, zoneId, afterAnim);
      }
    });
  } else {
    animateSkillActivation(cardObj, zoneId, afterAnim);
  }
}
// Helper: find zoneId for a cardObj
function findZoneIdForCard(cardObj) {
  if (gameState.playerCreatures.includes(cardObj)) return 'player-creatures-zone';
  if (gameState.playerDomains.includes(cardObj)) return 'player-domains-zone';
  if (gameState.opponentCreatures.includes(cardObj)) return 'opponent-creatures-zone';
  if (gameState.opponentDomains.includes(cardObj)) return 'opponent-domains-zone';
  return '';
}
function animateSkillActivation(cardObj, zoneId, callback) {
  // Find the card DOM element in its zone
  const cardDiv = findCardDivInZone(zoneId, cardObj.instanceId);
  if (!cardDiv) { callback && callback(); return; }

  // Create a clone for animation (so the card on field remains unchanged)
  const rect = cardDiv.getBoundingClientRect();
  const animDiv = cardDiv.cloneNode(true);
  animDiv.classList.add('skill-activation-anim');
  animDiv.style.position = 'fixed';
  animDiv.style.left = rect.left + 'px';
  animDiv.style.top = rect.top + 'px';
  animDiv.style.width = rect.width + 'px';
  animDiv.style.height = rect.height + 'px';
  animDiv.style.zIndex = 99999;
  animDiv.style.pointerEvents = 'none';
  animDiv.style.transition = 'none';

  document.body.appendChild(animDiv);

  // Initial: show edge (rotateY 90deg), place above original
  animDiv.style.transform = 'rotateY(90deg)';
  animDiv.style.opacity = '1';

  // Animate to front view
  setTimeout(() => {
    animDiv.style.transition = 'transform 0.7s cubic-bezier(.22,1.14,.32,1), opacity 0.3s 0.7s';
    animDiv.style.transform = 'rotateY(0deg)';
    // After rotate, fade out
    setTimeout(() => {
      animDiv.style.opacity = '0';
      setTimeout(() => {
        animDiv.remove();
        callback && callback();
      }, 300);
    }, 700);
  }, 20);
}
function proceedSkillActivation(cardObj, skillObj, options = {}) {
  // Handle requirements from activation
  const activation = skillObj.activation || {};
  let requirements = Array.isArray(activation.requirement)
    ? activation.requirement
    : (activation.requirement ? [activation.requirement] : []);
  for (let req of requirements) {
    if (REQUIREMENT_MAP[req] && REQUIREMENT_MAP[req].handler) {
      REQUIREMENT_MAP[req].handler(cardObj, skillObj);
    }
  }
  renderGameState(); // Ensure UI/state is up-to-date after requirements
  resolveSkillEffect(cardObj, skillObj);
}

// SKILL RESOLUTION LOGIC //
function resolveSkillEffect(cardObj, skillObj) {
  const resolution = skillObj.resolution || {};
  const effects = Array.isArray(resolution.effect) ? resolution.effect : [resolution.effect];
  effects.forEach(effectName => {
    const effectDef = SKILL_EFFECT_MAP[effectName];
    if (effectDef && effectDef.handler) {
      effectDef.handler(cardObj, skillObj);
    }
  });
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
  content.style.alignItems = 'flex-start';
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
  row.style.justifyContent = 'flex-start';
  row.style.alignItems = 'flex-start';
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
    img.style.borderRadius = '8px';
    img.style.background = '#222';
    img.style.padding = '2px';
    cardDiv.appendChild(img);
    cardDiv.title = cardData.name;
    // Immediate selection logic: no confirm button
    cardDiv.onclick = () => {
      modal.remove();
      onSelect(cardObj);
    };
    row.appendChild(cardDiv);
  });
  content.appendChild(row);
  modal.appendChild(content);
  document.body.appendChild(modal);
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

/*--------------------------------
// ATTACK DECLARATION ABILITIES //
--------------------------------*/
function filterAttackableTargets(attacker, targets) {
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  if (!attackerDef || !attackerDef.ability) return targets;
  let filtered = targets;
  Object.keys(TARGET_FILTER_ABILITIES).forEach(abilityName => {
    if (attackerDef.ability.includes(abilityName)) {
      filtered = TARGET_FILTER_ABILITIES[abilityName].filter(attacker, filtered);
    }
  });
  return filtered;
}

function handleAttackDeclarationAbilities(attacker, defender) {
  const attackerDef = dummyCards.find(c => c.id === attacker.cardId);
  if (!attackerDef || !attackerDef.ability) return;
  // Ensure ability is always an array
  const abilities = Array.isArray(attackerDef.ability) ? attackerDef.ability : [attackerDef.ability];
  abilities.forEach(abilityName => {
    const ability = ATTACK_DECLARATION_ABILITIES[abilityName];
    if (ability && ability.effect) {
      ability.effect(attacker, defender);
    }
  });
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

document.getElementById('chat-log').addEventListener('click', function(e) {
  if (e.target.classList.contains('log-card-img')) {
    const instanceId = e.target.getAttribute('data-instanceid');
    const cardId = e.target.getAttribute('data-cardid');
    let cardObj = null;
    // Try to find by instanceId first
    if (instanceId) {
      cardObj = dummyCards.find(c => c.instanceId === instanceId);
    }
    // If not found, fallback to cardId
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
