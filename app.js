// --- Card Background Helper ---
function getCardBgClass(card) {
  let colors = Array.isArray(card.color) ? card.color : [card.color];
  colors = colors.filter(Boolean).map(c => c.toLowerCase());
  // Only allow 1 or 2 colors for background
  if (colors.length === 1) return `card-bg-${colors[0]}`;
  if (colors.length === 2) return `card-bg-${colors[0]}-${colors[1]}`;
  // If 3+ colors, fallback to 'card-bg-gold' or any default
  return `card-bg-gold`;
}

// Card List //
  const dummyCards = [
      { id: 'basicfairy', name: 'Fairy', rarity: 'Basic', image: 'BasicCreatures/Fairy.png', category: 'creature', color: 'green', type: 'fairy', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Fairy', ability: 'flying'},
      { id: 'basicgoblin', name: 'Goblin', rarity: 'Basic', image: 'BasicCreatures/Goblin.png', category: 'creature', color: 'green', type: 'goblin', hp: 3, atk: 1, def: 0, cost: 0, archetype: 'Goblin'},
      { id: 'basicemberling', name: 'Emberling', rarity: 'Basic', image: 'BasicCreatures/Emberling.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: 'burn'},
      { id: 'basicfirepixie', name: 'Fire Pixie', rarity: 'Basic', image: 'BasicCreatures/Fire Pixie.png', category: 'creature', color: 'red', type: 'fairy', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: ['burn','flying']},
      { id: 'basichellcharger', name: 'Hellcharger', rarity: 'Basic', image: 'BasicCreatures/Hellcharger.png', category: 'creature', color: 'red', type: 'warrior', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: 'burn'},
      { id: 'basicelementalblue', name: 'Water Elemental', rarity: 'Basic', image: 'BasicCreatures/Water Elemental.png', category: 'creature', color: 'blue', type: 'elemental', hp: 5, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: ['dive','elusive','soak']},
      { id: 'basicwolfgray', name: 'Desert Wolf', rarity: 'Basic', image: 'BasicCreatures/Desert Wolf.png', category: 'creature', color: 'gray', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Scorchlands', ability: 'burn'},
      { id: 'basicgolemites', name: 'Golemites', rarity: 'Basic', image: 'BasicCreatures/Golemites.png', category: 'creature', color: 'gray', type: 'elemental', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Golemheart', ability: 'burn'},
      { id: 'basicwolfblack', name: 'Wolf', rarity: 'Basic', image: 'BasicCreatures/Wolf.png', category: 'creature', color: 'black', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Moonfang', ability: 'ambush'},
      { id: 'basicskeleton', name: 'Skeleton', rarity: 'Basic', image: 'BasicCreatures/Skeleton.png', category: 'creature', color: 'black', type: 'undead', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe'},
      { id: 'basicbat', name: 'Bat', rarity: 'Basic', image: 'BasicCreatures/Bat.png', category: 'creature', color: 'black', type: 'vampire', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Vampiric', ability: ['drain','flying']},
      { id: 'basicimp', name: 'Imp', rarity: 'Basic', image: 'BasicCreatures/Imp.png', category: 'creature', color: 'black', type: 'demon', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe', ability: ['ambush','flying']},
      { id: 'basicvampire', name: 'Vampire', rarity: 'Basic', image: 'BasicCreatures/Vampire.png', category: 'creature', color: 'black', type: 'demon', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Vampiric', ability: ['drain','flying']},
    
      { id: 'cindercore1', name: 'Cindercore Golemheart', rarity: 'Rare', image: 'Golems/Cindercore Golemheart.png', category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: ['Cindercore','Golemheart']},
      { id: 'cindercore2', name: 'Cindercore Sentry', rarity: 'Common', image: 'Cindercore/Cindercore Sentry.png', category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore'},
      { id: 'cindercore3', name: 'Cindercore Protector', rarity: 'Common', image: 'Cindercore/Cindercore Protector.png', category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore'},
      { id: 'cindercore4', name: 'Cindercore Vanguard', rarity: 'Common', image: 'Cindercore/Cindercore Vanguard.png', category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore'},
      { id: 'cindercore5', name: 'Ignavaryn, Cindercore Automaton', rarity: 'Legendary', image: 'Cindercore/Ignavaryn, Cindercore Automaton.png', category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore'},

      { id: 'firelands1', name: 'Firelands Scamperling', rarity: 'Common', image: 'Firelands/Firelands Scamperling.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
      { id: 'firelands2', name: 'Firelands Cindercub', rarity: 'Common', image: 'Firelands/Firelands Cindercub.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
      { id: 'firelands3', name: 'Firelands Lynx', rarity: 'Common', image: 'Firelands/Firelands Lynx.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','leap','rush']},
      { id: 'firelands4', name: 'Firelands Kitsune', rarity: 'Common', image: 'Firelands/Firelands Kitsune.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
      { id: 'firelands5', name: 'Firelands Direbeast', rarity: 'Rare', image: 'Firelands/Firelands Direbeast.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
      { id: 'firelands6', name: 'Firelands Hellhound', rarity: 'Common', image: 'Firelands/Firelands Hellhound.png', category: 'creature', color: ['red','black'], type: ['beast','demon'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
      { id: 'firelands7', name: 'Firelands Hellmaw', rarity: 'Common', image: 'Firelands/Firelands Hellmaw.png', category: 'creature', color: ['red','black'], type: ['dragon','demon'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','flying','rush']},
      { id: 'firelands8', name: 'Ephoros, Firelands Behemoth', rarity: 'Common', image: 'Firelands/Ephoros, Firelands Behemoth.png', category: 'creature', color: ['red','black'], type: ['beast','demon'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
      { id: 'firelands8a', name: 'Ephoros, Firelands Behemoth', rarity: 'Common', image: 'Firelands/Ephoros, Firelands Behemoth FA.png', category: 'creature', color: ['red','black'], type: ['beast','demon'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},

      { id: 'golem1', name: 'Pyrokrag, Golemheart Titan', rarity: 'Legendary', image: 'Golems/Pyrokrag, Golemheart Titan.png', category: 'creature', color: ['red', 'gray'], type: ['fusion','elemental'], hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart'},
      { id: 'golem2', name: 'Golemheart Giant', rarity: 'Rare', image: 'Golems/Golemheart Giant.png', category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart'},
      { id: 'golem3', name: 'Smoldering Golemheart', rarity: 'Rare', image: 'Golems/Smoldering Golemheart .png', category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart'},
      { id: 'golem4', name: 'Golemheart Sentinel', rarity: 'Rare', image: 'Golems/Golemheart Sentinel.png', category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart', ability: 'protect'},
      { id: 'golem6', name: 'Fire Golem', rarity: 'Common', image: 'Golems/Fire Golem.png', category: 'creature', color: ['red', 'gray'], type: ['elemental','golem'], hp: 3, atk: 2, def: 1, cost: 2, archetype: ['Firelands','Golemheart'], ability: 'burn'},
      { id: 'golem7', name: 'Kaelgorran, Elemental Primordial', rarity: 'Legendary', image: 'Golems/Kaelgorran, Elemental Primordial.png', category: 'creature', color: ['green','red', 'gray'], type: ['elemental','golem'], hp: 3, atk: 2, def: 1, cost: 2, archetype: ['Firelands','Golemheart'], ability: 'burn'},
      { id: 'golem8', name: 'Acidic Golem', rarity: 'Common', image: 'Golems/Acidic Golem.png', category: 'creature', color: ['purple', 'gray'], type: ['elemental','golem'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Golemheart', ability: 'toxic'},

      { id: 'coralbound1', name: 'Coralbound Sentry', rarity: 'Common', image: 'Coralbound/Coralbound Sentry.png', category: 'creature', color: 'blue', type: 'construct', hp: 5, atk: 1, def: 1, cost: 1, archetype: 'Coralbound'},
      { id: 'coralbound2', name: 'Coralbound Protector', rarity: 'Common', image: 'Coralbound/Coralbound Protector.png', category: 'creature', color: 'blue', type: 'construct', hp: 5, atk: 1, def: 1, cost: 1, archetype: 'Coralbound'},
      { id: 'coralbound3', name: 'Coralbound Vanguard', rarity: 'Common', image: 'Coralbound/Coralbound Vanguard.png', category: 'creature', color: 'blue', type: 'construct', hp: 5, atk: 1, def: 1, cost: 1, archetype: 'Coralbound'},
      { id: 'coralbound4', name: 'Maelvyrn, Coralbound Automaton', rarity: 'Legendary', image: 'images/Maelvyrn, Coralbound Automaton.png', category: 'creature', color: 'blue', type: 'construct', hp: 19, atk: 8, def: 5, cost: 9, archetype: 'Coralbound'},

      { id: 'card004', name: 'Wyrm of Thorns and Sunfire', rarity: 'Rare', image: 'images/Wyrm of Thorns and Sunfire.png', category: 'creature', color: ['green', 'red', 'white'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, ability: ['intimidate','flying']},

      { id: 'skullframe01', name: 'Skullframe Defector', rarity: 'Common', image: 'Skullframe/Skullframe Defector.png', category: 'creature', color: 'black', type: 'undead', hp: 3, atk: 2, def: 1, cost: 1, archetype: 'Skullframe'},
      { id: 'skullframe02', name: 'Skullframe Unyielding', rarity: 'Common', image: 'Skullframe/Skullframe Unyielding.png', category: 'creature', color: 'black', type: 'undead', hp: 4, atk: 1, def: 0, cost: 2, archetype: 'Skullframe', ability: 'rush'},
      { id: 'skullframe03', name: 'Skullframe Acolyte', rarity: 'Common', image: 'Skullframe/Skullframe Acolyte.png', category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 5, atk: 3, def: 1, cost: 3, archetype: 'Skullframe'},
      { id: 'skullframe04', name: 'Skullframe Cryptwinds', rarity: 'Common', image: 'Skullframe/Skullframe Cryptwinds.png', category: 'creature', color: ['black', 'purple'], type: ['dragon','undead'], hp: 12, atk: 6, def: 2, cost: 5, archetype: 'Skullframe', ability: 'flying'},
      { id: 'skullframe05', name: 'Skullframe Spectral Dragon', rarity: 'Rare', image: 'Skullframe/Skullframe Spectral Dragon.png', category: 'creature', color: ['black', 'purple'], type: ['dragon','undead'], hp: 12, atk: 6, def: 2, cost: 5, archetype: 'Skullframe', ability: 'flying'},
      { id: 'skullframe06', name: 'Skullframe Armored Dragon', rarity: 'Rare', image: 'Skullframe/Skullframe Armored Dragon.png', category: 'creature', color: ['black', 'purple'], type: ['dragon','undead'], hp: 12, atk: 6, def: 2, cost: 5, archetype: 'Skullframe', ability: 'flying'},
      { id: 'skullframe07', name: 'Skullframe Hexmistress', rarity: 'Rare', image: 'Skullframe/Skullframe Hexmistress.png', category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 6, atk: 4, def: 1, cost: 3, archetype: 'Skullframe'},
      { id: 'skullframe08', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'Skullframe/Maldryss, Skullframe Archmage.png', category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 8, atk: 4, def: 1, cost: 3, archetype: 'Skullframe'},
      { id: 'skullframe08a', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'Skullframe/Maldryss, Skullframe Archmage FA.png', category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 8, atk: 4, def: 1, cost: 3, archetype: 'Skullframe'},
      { id: 'spell014', name: 'Soulhexing', rarity: 'Common', image: 'Skullframe/Soulhexing.png', category: 'spell', color: 'black', type: 'spell', cost: 3, archetype: 'Skullframe'},
      { id: 'spell015', name: 'Witherwake', rarity: 'Common', image: 'Skullframe/Witherwake.png', category: 'spell', color: ['black','purple'], type: 'spell', cost: 2, archetype: 'Skullframe'},

      { id: 'frostlands01', name: 'Frostlands Dragon', rarity: 'Rare', image: 'Frostlands/Frostlands Dragon.png', category: 'creature', color: ['blue', 'gray'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, ability: ['Ice Armor','flying'], archetype: 'Frostlands'},
      { id: 'frostlands02', name: 'Frostlands Wyrm', rarity: 'common', image: 'Frostlands/Frostlands Wyrm.png', category: 'creature', color: ['blue', 'gray'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, ability: ['Ice Armor','flying'], archetype: 'Frostlands'},
      { id: 'frostlands03', name: 'Frostlands Golem', rarity: 'Common', image: 'Frostlands/Frostlands Golem.png', category: 'creature', color: ['blue', 'gray'], type: 'elemental', hp: 9, atk: 5, def: 2, cost: 3, ability: 'Ice Armor', archetype: 'Frostlands'},
      { id: 'frostlands04', name: 'Frostlands Phoenix', rarity: 'Common', image: 'Frostlands/Frostlands Phoenix.png', category: 'creature', color: ['blue', 'gray'], type: 'avian', hp: 9, atk: 5, def: 2, cost: 3, ability: ['Ice Armor','flying'], archetype: 'Frostlands'},
      { id: 'frostlands05', name: 'Frostlands Runeforged Automaton', rarity: 'Common', image: 'Frostlands/Frostlands Runeforged Automaton.png', category: 'creature', color: ['blue', 'gray'], type: 'construct', hp: 9, atk: 5, def: 2, cost: 3, ability: 'Ice Armor', archetype: 'Frostlands'},
      { id: 'frostlands06', name: 'Frostlands Runeforged Titan', rarity: 'Rare', image: 'Frostlands/Frostlands Runeforged Titan.png', category: 'creature', color: ['blue', 'gray'], type: 'construct', hp: 9, atk: 5, def: 2, cost: 3, ability: ['Ice Armor','crush'], archetype: 'Frostlands'},
      { id: 'frostlands07', name: 'Eirawen, Frostlands Queen', rarity: 'Legendary', image: 'Frostlands/Eirawen, Frostlands Queen.png', category: 'creature', color: ['blue', 'gray'], type: ['mage','champion'], hp: 11, atk: 1, def: 0, cost: 3, ability: ['Ice Armor','flying'], archetype: 'Frostlands'},

      { id: 'artifact005', name: 'Golemheart infusor', rarity: 'Common', image: 'images/Golemheart Infusor.png', category: 'artifact', color: 'gray', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'Golemheart'},
      { id: 'artifact006', name: 'Heartwood Emeralds', rarity: 'Common', image: 'images/Heartwood Emeralds.png', category: 'artifact', color: 'green', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'Heartwood'},
      { id: 'artifact007', name: 'Cindercore Ember', rarity: 'Common', image: 'images/Cindercore Ember.png', category: 'artifact', color: 'red', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'cindercore'},
      { id: 'artifact008', name: 'Tidecallers Pearl', rarity: 'Common', image: 'images/Tidecallers Pearl.png', category: 'artifact', color: 'blue', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'coralbound'},
      { id: 'artifact009', name: 'Stormcore Dynamo', rarity: 'Common', image: 'images/Stormcore Dynamo.png', category: 'artifact', color: 'yellow', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},
      { id: 'artifact010', name: 'Plague Thorn Talisman', rarity: 'Common', image: 'images/Plague Thorn Talisman.png', category: 'artifact', color: 'purple', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},
      { id: 'artifact011', name: 'Titans Anvil', rarity: 'Common', image: 'images/Titans Anvil.png', category: 'artifact', color: 'gray', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},
      { id: 'artifact012', name: 'Veil of the Forgotten', rarity: 'Common', image: 'images/Veil of the Forgotten.png', category: 'artifact', color: 'black', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},
      { id: 'artifact013', name: 'Lumen Spire', rarity: 'Common', image: 'images/Lumen Spire.png', category: 'artifact', color: 'white', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},

      { id: 'spell010', name: 'Life Growth', rarity: 'Common', image: 'images/Life Growth.png', category: 'spell', color: 'green', type: 'spell', cost: 1},
      { id: 'basicspell1', name: 'Essence Surge', rarity: 'basic', image: 'SpellsBasic/Essence Surge.png', category: 'spell', color: 'green', type: 'spell', cost: 2},
      { id: 'basicspell2', name: 'Essence Assault', rarity: 'basic', image: 'SpellsBasic/Essence Assault.png', category: 'spell', color: 'red', type: 'spell', cost: 2},
      { id: 'basicspell3', name: 'Essence Rift', rarity: 'basic', image: 'SpellsBasic/Essence Rift.png', category: 'spell', color: 'blue', type: 'spell', cost: 2},
      { id: 'basicspell4', name: 'Essence Bolt', rarity: 'basic', image: 'SpellsBasic/Essence Bolt.png', category: 'spell', color: 'yellow', type: 'spell', cost: 2},
      { id: 'basicspell5', name: 'Essence Break', rarity: 'basic', image: 'SpellsBasic/Essence Break.png', category: 'spell', color: 'purple', type: 'spell', cost: 4},
      { id: 'basicspell6', name: 'Essence Barrier', rarity: 'basic', image: 'SpellsBasic/Essence Barrier.png', category: 'spell', color: 'gray', type: 'spell', cost: 1},
      { id: 'basicspell7', name: 'Essence Purge', rarity: 'basic', image: 'SpellsBasic/Essence Purge.png', category: 'spell', color: 'black', type: 'spell', cost: 4},
      { id: 'basicspell8', name: 'Essence Blessing', rarity: 'basic', image: 'SpellsBasic/Essence Blessing.png', category: 'spell', color: 'white', type: 'spell', cost: 1},

      { id: 'basicforest', name: 'Forest', rarity: 'Basic', image: 'images/Forest.png', category: 'domain', color: 'green', type: 'domain', hp: 5, cost: 1},
      { id: 'basicvolcano', name: 'Volcano', rarity: 'Basic', image: 'images/Red Basic Location.png', category: 'domain', color: 'red', type: 'domain', hp: 5, cost: 1},
      { id: 'basicocean', name: 'Ocean', rarity: 'Basic', image: 'images/Blue Basic Location.png', category: 'domain', color: 'blue', type: 'domain', hp: 5, cost: 1},
      { id: 'basicmountain', name: 'Mountain', rarity: 'Basic', image: 'images/Gray Basic Location.png', category: 'domain', color: 'gray', type: 'domain', hp: 5, cost: 1},
      { id: 'basicswamp', name: 'Swamp', rarity: 'Basic', image: 'images/Purple Basic Location.png', category: 'domain', color: 'purple', type: 'domain', hp: 5, cost: 1},
      { id: 'basicpeaks', name: 'Peaks', rarity: 'Basic', image: 'images/Yellow Basic Location.png', category: 'domain', color: 'yellow', type: 'domain', hp: 5, cost: 1},
      { id: 'basicplains', name: 'Plains', rarity: 'Basic', image: 'images/White Basic Location.png', category: 'domain', color: 'white', type: 'domain', hp: 5, cost: 1},
      { id: 'basicshadowforest', name: 'Shadow Forest', rarity: 'Basic', image: 'images/Black Basic Location.png', category: 'domain', color: 'black', type: 'domain', hp: 5, cost: 1},

  ];

  // --- MULTI-DECK MANAGEMENT --- //
  const DECK_SLOTS_KEY = "deckSlots";
  const DECKS_KEY = "decks";
  let deckSlots = JSON.parse(localStorage.getItem(DECK_SLOTS_KEY)) || ["Deck 1"];
  let decks = JSON.parse(localStorage.getItem(DECKS_KEY)) || { "Deck 1": {} };
  let currentDeckSlot = localStorage.getItem("currentDeckSlot") || deckSlots[0];

  const deckSlotSelect = document.getElementById('deck-slot-select');
  const addDeckSlotBtn = document.getElementById('add-deck-slot-btn');
  const renameDeckSlotBtn = document.getElementById('rename-deck-slot-btn');
  const deleteDeckSlotBtn = document.getElementById('delete-deck-slot-btn');
  const deckTitle = document.getElementById('deck-title');
const startGameBtn = document.getElementById('start-game-btn');
const battlefield = document.getElementById('battlefield');
    // Phase display at top of battlefield
const phaseDisplay = document.createElement('div');
phaseDisplay.id = "phase-display";
phaseDisplay.style.margin = "1em";
phaseDisplay.style.fontSize = "1.2em";
battlefield.insertBefore(phaseDisplay, battlefield.firstChild);
const backToBuilderBtn = document.getElementById('back-to-builder-btn');

// Elements to hide/show (deck, filters, gallery, deck slot selector)
const elementsToHide = [
  document.getElementById('deck-slot-selector'),
  document.getElementById('filters'),
  document.getElementById('card-gallery'),
  document.querySelector('.deck'),
  startGameBtn
];

startGameBtn.onclick = () => {
  elementsToHide.forEach(el => el.style.display = 'none');
  battlefield.style.display = 'block';
};

backToBuilderBtn.onclick = () => {
  elementsToHide.forEach(el => el.style.display = '');
  battlefield.style.display = 'none';
};
  function saveDeckState() {
    localStorage.setItem(DECK_SLOTS_KEY, JSON.stringify(deckSlots));
    localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
    localStorage.setItem("currentDeckSlot", currentDeckSlot);
  }
  function loadDeckState() {
    deckSlots = JSON.parse(localStorage.getItem(DECK_SLOTS_KEY)) || ["Deck 1"];
    decks = JSON.parse(localStorage.getItem(DECKS_KEY)) || { "Deck 1": {} };
    currentDeckSlot = localStorage.getItem("currentDeckSlot") || deckSlots[0];
  }

  function getCurrentDeck() {
    return decks[currentDeckSlot] || {};
  }

  function setCurrentDeck(deckObj) {
    decks[currentDeckSlot] = deckObj;
    saveDeckState();
  }

  function refreshDeckSlotSelect() {
    deckSlotSelect.innerHTML = "";
    deckSlots.forEach(slot => {
      const opt = document.createElement('option');
      opt.value = slot;
      opt.textContent = slot;
      deckSlotSelect.appendChild(opt);
    });
    deckSlotSelect.value = currentDeckSlot;
    deckTitle.textContent = currentDeckSlot;
  }

  deckSlotSelect.addEventListener('change', () => {
    currentDeckSlot = deckSlotSelect.value;
    saveDeckState();
    updateDeckDisplay();
    renderGallery();
  });

  addDeckSlotBtn.addEventListener('click', () => {
    let newName = prompt("Deck name?", `Deck ${deckSlots.length + 1}`);
    if (!newName) return;
    if (deckSlots.includes(newName)) {
      alert("Deck name already exists!");
      return;
    }
    deckSlots.push(newName);
    decks[newName] = {};
    currentDeckSlot = newName;
    saveDeckState();
    refreshDeckSlotSelect();
    updateDeckDisplay();
    renderGallery();
  });

  renameDeckSlotBtn.addEventListener('click', () => {
    let newName = prompt("Rename deck to:", currentDeckSlot);
    if (!newName || newName === currentDeckSlot) return;
    if (deckSlots.includes(newName)) {
      alert("Deck name already exists!");
      return;
    }
    let idx = deckSlots.indexOf(currentDeckSlot);
    let deckData = decks[currentDeckSlot];
    deckSlots[idx] = newName;
    decks[newName] = deckData;
    delete decks[currentDeckSlot];
    currentDeckSlot = newName;
    saveDeckState();
    refreshDeckSlotSelect();
    updateDeckDisplay();
    renderGallery();
  });

  deleteDeckSlotBtn.addEventListener('click', () => {
    if (deckSlots.length === 1) {
      alert("You must have at least one deck.");
      return;
    }
    if (!confirm(`Delete "${currentDeckSlot}"? This cannot be undone.`)) return;
    let idx = deckSlots.indexOf(currentDeckSlot);
    deckSlots.splice(idx, 1);
    delete decks[currentDeckSlot];
    currentDeckSlot = deckSlots[Math.max(idx - 1, 0)];
    saveDeckState();
    refreshDeckSlotSelect();
    updateDeckDisplay();
    renderGallery();
  });

  // --- END MULTI-DECK --- //

  const gallery = document.getElementById('card-gallery');
  const deckList = document.getElementById('deck-list');
  const cardCount = document.getElementById('card-count');
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.close');
  const toggleBtn = document.getElementById('toggle-deck-btn');
  const deckPanel = document.querySelector('.deck');

  function canAddCard(card) {
    const deck = getCurrentDeck();
    const count = deck[card.id] || 0;
    const total = Object.values(deck).reduce((a, b) => a + b, 0);
    if (total >= 50) return false;
    if (card.rarity && card.rarity.toLowerCase() === 'legendary' && count >= 1) return false;
    if (card.rarity && card.rarity.toLowerCase() === 'rare' && count >= 2) return false;
    if (card.rarity && card.rarity.toLowerCase() === 'common' && count >= 3) return false;
    return true;
  }

  function updateDeckDisplay() {
  const deck = getCurrentDeck();
  deckList.innerHTML = '';
  let total = 0;

  // Group cards by category
  const sections = {
    creature: [],
    artifact: [],
    spell: [],
    domain: []
  };

  for (const [id, count] of Object.entries(deck)) {
    const card = dummyCards.find(c => c.id === id);
    if (!card) continue;
    const cat = getCardCategory(card);
    if (sections.hasOwnProperty(cat)) {
      sections[cat].push({ card, count });
    }
    total += count;
  }

  // Section display order
  const sectionNames = [
    { key: "creature", label: "Creatures" },
    { key: "artifact", label: "Artifacts" },
    { key: "spell", label: "Spells" },
    { key: "domain", label: "Domains" }
  ];

  for (const {key, label} of sectionNames) {
    if (sections[key].length === 0) continue;
    // Add section heading
    const heading = document.createElement('li');
    heading.textContent = label;
    heading.style.fontWeight = "bold";
    heading.style.marginTop = "12px";
    heading.style.marginBottom = "2px";
    deckList.appendChild(heading);

    for (const { card, count } of sections[key]) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.style.width = '40px';
      img.style.height = 'auto';
      img.style.marginRight = '8px';
      img.style.verticalAlign = 'middle';
      img.style.borderRadius = '4px';

      const span = document.createElement('span');
      span.textContent = `${card.name} ×${count} `;

      li.appendChild(img);
      li.appendChild(span);

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '−';
      removeBtn.onclick = () => {
        deck[card.id]--;
        if (deck[card.id] <= 0) {
          delete deck[card.id];
        }
        setCurrentDeck(deck);
        updateDeckDisplay();
        renderGallery();
        setTimeout(() => deckPanel.classList.add('show'), 0);
      };
      li.appendChild(removeBtn);
      deckList.appendChild(li);
    }
  }

  cardCount.textContent = total;
  setCurrentDeck(deck);
  saveDeckState();
}

  function createCardDiv(card) {
    const deck = getCurrentDeck();
    const div = document.createElement('div');
    div.className = 'card';
    if (card.rarity) {
    div.setAttribute('data-rarity', card.rarity);
  }
    div.classList.add(getCardBgClass(card));

    const img = document.createElement('img');
    img.src = card.image;
    img.onerror = function() {
      this.onerror = null;
      this.src = "images/placeholder.png";
    };
    img.alt = card.name;
    img.onclick = () => {
      modal.style.display = "block";
      modalImg.src = card.image;
    };
    div.appendChild(img);

    const name = document.createElement('h4');
    name.textContent = card.name;
    div.appendChild(name);

    const stats = document.createElement('div');
    stats.style.fontSize = '0.9em';
    stats.innerHTML = [
      card.hp !== undefined ? `HP: ${card.hp}` : '',
      card.atk !== undefined ? `ATK: ${card.atk}` : '',
      card.def !== undefined ? `DEF: ${card.def}` : '',
      card.cost !== undefined ? `Cost: ${card.cost}` : ''
    ].filter(Boolean).join(' | ');
    if (stats.innerHTML.trim() !== '') div.appendChild(stats);

    const details = document.createElement('div');
    details.style.fontSize = '0.8em';
    details.textContent = [
      card.rarity,
      Array.isArray(card.type) ? card.type.join(', ') : card.type
    ].filter(Boolean).join(' | ');
    if (details.textContent.trim() !== '') div.appendChild(details);

    const btn = document.createElement('button');
    btn.textContent = "Add to Deck";
    btn.disabled = !canAddCard(card);
    btn.onclick = () => {
      if (!canAddCard(card)) return;
      deck[card.id] = (deck[card.id] || 0) + 1;
      setCurrentDeck(deck);
      updateDeckDisplay();
      renderGallery();
      setTimeout(() => deckPanel.classList.add('show'), 0);
    };
    div.appendChild(btn);
    return div;
  }
    
function getCardCategory(card) {
  return card.category ? card.category.toLowerCase() : '';
}
function renderGallery() {
    gallery.innerHTML = '';
    const selectedColor = document.getElementById('filter-color').value.toLowerCase();
    const selectedType = document.getElementById('filter-type').value.toLowerCase();
    const selectedRarity = document.getElementById('filter-rarity').value.toLowerCase();
    const nameFilter = document.getElementById('filter-name').value.toLowerCase();
    const selectedArchetype = document.getElementById('filter-archetype').value.toLowerCase();
    const selectedAbility = document.getElementById('filter-ability').value.toLowerCase();
    const selectedCategory = document.getElementById('filter-category').value.toLowerCase();
    dummyCards.forEach(card => {
      if (nameFilter && !card.name.toLowerCase().includes(nameFilter)) return;
      if (selectedColor) {
        const colors = Array.isArray(card.color) ? card.color.map(c => c.toLowerCase()) : [card.color.toLowerCase()];
        if (!colors.includes(selectedColor)) return;
      }
      // Filter by category:
      if (selectedCategory) {
      if (!card.category || card.category.toLowerCase() !== selectedCategory) return;
      }
      if (selectedType) {
        const types = Array.isArray(card.type) ? card.type.map(t => t.toLowerCase()) : [card.type.toLowerCase()];
        if (!types.includes(selectedType)) return;
      }
      if (selectedRarity) {
        if (card.rarity.toLowerCase() !== selectedRarity) return;
      }
      if (selectedArchetype) {
        const archetypes = Array.isArray(card.archetype)
          ? card.archetype.map(a => a.toLowerCase())
          : [card.archetype?.toLowerCase()];
        if (!archetypes.includes(selectedArchetype)) return;
      }
      if (selectedAbility) {
        const abilities = Array.isArray(card.ability)
          ? card.ability.map(a => a.toLowerCase())
          : [card.ability?.toLowerCase()];
        if (!abilities.includes(selectedAbility)) return;
      }
      gallery.appendChild(createCardDiv(card));
    });
  }

  // Event Listeners
  document.getElementById('filter-name').addEventListener('input', renderGallery);
  document.getElementById('filter-color').addEventListener('change', renderGallery);
  document.getElementById('filter-category').addEventListener('change', renderGallery);
  document.getElementById('filter-type').addEventListener('change', renderGallery);
  document.getElementById('filter-rarity').addEventListener('change', renderGallery);
  document.getElementById('filter-archetype').addEventListener('change', renderGallery);
  document.getElementById('filter-ability').addEventListener('change', renderGallery);
  document.getElementById('reset-deck-btn').onclick = () => {
    const deck = getCurrentDeck();
    for (const key in deck) {
      delete deck[key];
    }
    setCurrentDeck(deck);
    updateDeckDisplay();
    renderGallery();
  };

  document.getElementById('filter-color').addEventListener('change', (e) => {
    const color = e.target.value.toLowerCase();
    document.body.className = document.body.className
      .split(' ')
      .filter(cls => !cls.startsWith('theme-'))
      .join(' ')
      .trim();
    if (color) {
      document.body.classList.add(`theme-${color}`);
    }
  });

  // Modal logic
  closeBtn.onclick = () => { modal.style.display = "none"; };
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

  // Deck toggle logic
  toggleBtn.onclick = () => {
    deckPanel.classList.toggle('show');
  };
  window.addEventListener('click', (e) => {
    if (!deckPanel.contains(e.target) && e.target !== toggleBtn && deckPanel.classList.contains('show')) {
      deckPanel.classList.remove('show');
    }
  });

  // Initial render
  loadDeckState();
  refreshDeckSlotSelect();
  updateDeckDisplay();
  renderGallery();

// 1. Add to your global variables
let gameState = {
  playerDeck: [],
  playerHand: [],
  opponentDeck: [],
  opponentHand: [],
  zones: {},
  turn: "player",
  phase: "draw"
};

// 2. Utility: Shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 3. When "Start Game" is clicked, load deck into gameState and shuffle
startGameBtn.onclick = () => {
  // Hide deck builder UI, show battlefield
  elementsToHide.forEach(el => el.style.display = 'none');
  battlefield.style.display = 'block';

  // Construct deck as an array of card ids, respecting deck counts
  const deckObj = getCurrentDeck();
  let fullDeck = [];
  for (let [id, count] of Object.entries(deckObj)) {
    for (let i = 0; i < count; i++) fullDeck.push(id);
  }
  gameState.playerDeck = shuffle([...fullDeck]);
  gameState.playerHand = [];

  // For now, opponent uses same deck (or you can randomize/dummy)
  gameState.opponentDeck = shuffle([...fullDeck]);
  gameState.opponentHand = [];

  gameState.turn = "player";
  gameState.phase = "draw";
  renderGameState();
  updatePhaseDisplay();
  document.querySelectorAll('.zone').forEach(zone => {
  zone.ondragover = (e) => {
    e.preventDefault(); // allow drop
    zone.classList.add('drag-over');
  };
  zone.ondragleave = () => {
    zone.classList.remove('drag-over');
  };
  zone.ondrop = (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const cardId = e.dataTransfer.getData("text/plain");
    let orientation = e.shiftKey ? "horizontal" : "vertical";
    placeCardInZone(cardId, zone.id, orientation);
  };
});
};

// Draw 1 button for player
const draw1PlayerBtn = document.createElement('button');
draw1PlayerBtn.textContent = "Player: Draw 1";
draw1PlayerBtn.onclick = () => {
  drawCards("player", 1);
};
battlefield.insertBefore(draw1PlayerBtn, document.getElementById("opponent-hand"));

// Draw 1 button for opponent
const draw1OpponentBtn = document.createElement('button');
draw1OpponentBtn.textContent = "Opponent: Draw 1";
draw1OpponentBtn.onclick = () => {
  drawCards("opponent", 1);
};
battlefield.insertBefore(draw1OpponentBtn, document.getElementById("opponent-hand"));

// 5. Draw cards function
function drawCards(who, n) {
  let deck = who === "player" ? gameState.playerDeck : gameState.opponentDeck;
  let hand = who === "player" ? gameState.playerHand : gameState.opponentHand;
  for (let i = 0; i < n && deck.length > 0; i++) {
    hand.push(deck.shift());
  }
  renderGameState();
  updatePhaseDisplay();
}

// Render game state (hands)
function renderGameState() {
  // Render player hand
  const playerHandDiv = document.getElementById('player-hand');
  playerHandDiv.innerHTML = '';
  for (let cardId of gameState.playerHand) {
    const card = dummyCards.find(c => c.id === cardId);
    if (!card) continue;
    const div = document.createElement('div');
    div.className = 'card';
    div.draggable = true;
    div.dataset.cardId = cardId;
    div.ondragstart = (e) => {
      e.dataTransfer.setData("text/plain", cardId);
    };
    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.style.width = "80px";
    div.appendChild(img);
    playerHandDiv.appendChild(div);
  }

  // Render opponent hand (as facedown cards)
  const opponentHandDiv = document.getElementById('opponent-hand');
  opponentHandDiv.innerHTML = '';
  for (let i = 0; i < gameState.opponentHand.length; i++) {
    const div = document.createElement('div');
    div.className = 'card';
    const img = document.createElement('img');
    img.src = "images/cardback.png"; // Use your card back image
    img.alt = "Opponent's card";
    img.style.width = "80px";
    div.appendChild(img);
    opponentHandDiv.appendChild(div);
  }
// Render cards in zones
  document.querySelectorAll('.zone').forEach(zone => {
    const zoneId = zone.id;
    zone.innerHTML = '';
    const cards = gameState.zones[zoneId] || [];
    for (const { cardId, orientation } of cards) {
      const card = dummyCards.find(c => c.id === cardId);
      if (!card) continue;
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      if (orientation === 'horizontal') {
        cardDiv.style.transform = 'rotate(90deg)';
      }
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.style.width = "80px";
      cardDiv.appendChild(img);
      zone.appendChild(cardDiv);
    }
  });
// Render player deck stack
  const playerDeckDiv = document.getElementById('player-deck-zone');
  playerDeckDiv.innerHTML = '';

  const playerDeckCard = document.createElement('div');
  playerDeckCard.className = 'card';
  const playerDeckImg = document.createElement('img');
  playerDeckImg.src = "images/cardback.png";
  playerDeckImg.alt = "Your Deck";
  playerDeckImg.style.width = "60px";
  playerDeckImg.style.opacity = "0.85";
  playerDeckCard.appendChild(playerDeckImg);

  const deckCount = document.createElement('div');
  deckCount.style.textAlign = 'center';
  deckCount.style.fontWeight = 'bold';
  deckCount.textContent = gameState.playerDeck.length;
  playerDeckCard.appendChild(deckCount);
  playerDeckDiv.appendChild(playerDeckCard);

// Show the menu when clicking the deck
  playerDeckCard.onclick = (e) => {
    e.stopPropagation();
    // Position the menu near the deck
    const rect = playerDeckCard.getBoundingClientRect();
    deckActionsMenu.style.top = `${rect.bottom + window.scrollY + 8}px`;
    deckActionsMenu.style.left = `${rect.left + window.scrollX}px`;
    deckActionsMenu.style.display = "block";
  };

  // Render opponent deck stack
  const opponentDeckDiv = document.getElementById('opponent-deck-zone');
  opponentDeckDiv.innerHTML = '';
  const opponentDeckCard = document.createElement('div');
  opponentDeckCard.className = 'card';
  const opponentDeckImg = document.createElement('img');
  opponentDeckImg.src = "images/cardback.png";
  opponentDeckImg.alt = "Opponent's Deck";
  opponentDeckImg.style.width = "60px";
  opponentDeckImg.style.opacity = "0.85";
  opponentDeckCard.appendChild(opponentDeckImg);
  const oppDeckCount = document.createElement('div');
  oppDeckCount.style.textAlign = 'center';
  oppDeckCount.style.fontWeight = 'bold';
  oppDeckCount.textContent = gameState.opponentDeck.length;
  opponentDeckCard.appendChild(oppDeckCount);
  opponentDeckDiv.appendChild(opponentDeckCard);

  // Click-to-draw for opponent deck
  opponentDeckCard.onclick = () => {
    if (gameState.turn === "opponent" && gameState.opponentDeck.length > 0) {
      drawCards("opponent", 1);
    }
  };
}

document.body.addEventListener('click', function(e) {
  let menu = document.getElementById('player-deck-actions');
  if (menu && menu.style.display === "block") {
    menu.style.display = "none";
  }
});
// Create the deck actions menu ONCE
let deckActionsMenu = document.createElement('div');
deckActionsMenu.id = 'player-deck-actions';
deckActionsMenu.style.display = 'none';
deckActionsMenu.style.position = 'absolute';
deckActionsMenu.style.background = 'white';
deckActionsMenu.style.border = '1px solid #aaa';
deckActionsMenu.style.borderRadius = '7px';
deckActionsMenu.style.zIndex = '999';
deckActionsMenu.style.padding = '8px';
deckActionsMenu.innerHTML = `
  <button id="deck-draw-btn">Draw</button>
  <button id="deck-shuffle-btn">Shuffle</button>
  <button id="deck-search-btn">Search</button>
`;
document.body.appendChild(deckActionsMenu);

// Prevent menu from closing when clicking inside it
deckActionsMenu.onclick = function(e) {
  e.stopPropagation();
};

// Attach event listeners ONCE
deckActionsMenu.querySelector('#deck-draw-btn').onclick = function() {
  if (gameState.turn === "player" && gameState.playerDeck.length > 0) {
    drawCards("player", 1);
    updatePhaseDisplay();
  }
  deckActionsMenu.style.display = "none";
};
deckActionsMenu.querySelector('#deck-shuffle-btn').onclick = function() {
  gameState.playerDeck = shuffle(gameState.playerDeck);
  renderGameState();
  deckActionsMenu.style.display = "none";
};
deckActionsMenu.querySelector('#deck-search-btn').onclick = function() {
  if (gameState.playerDeck.length > 0) {
    openDeckSearchModal();
  }
  deckActionsMenu.style.display = "none";
};

// Hide menu when clicking elsewhere
document.body.addEventListener('click', function(e) {
  if (deckActionsMenu && deckActionsMenu.style.display === "block") {
    deckActionsMenu.style.display = "none";
  }
});
// 7. Phase control
const nextPhaseBtn = document.createElement('button');
nextPhaseBtn.textContent = "Next Phase";
nextPhaseBtn.onclick = () => {
  advancePhase();
};
battlefield.appendChild(nextPhaseBtn);

function updatePhaseDisplay() {
  phaseDisplay.textContent = `Turn: ${gameState.turn} | Phase: ${gameState.phase}`;
}
// Drag cards to zones //
function placeCardInZone(cardId, zoneId, orientation = "vertical") {
  // Remove from hand
  const idx = gameState.playerHand.indexOf(cardId);
  if (idx !== -1) {
    gameState.playerHand.splice(idx, 1);
  }
  // Place in zone
  if (!gameState.zones[zoneId]) gameState.zones[zoneId] = [];
  gameState.zones[zoneId].push({ cardId, orientation });
  renderGameState(); // re-render everything
}
// 8. Phase logic (simplified)
const phaseOrder = ["draw", "main", "end"];
function advancePhase() {
  let idx = phaseOrder.indexOf(gameState.phase);
  if (idx === -1) idx = 0;
  if (idx < phaseOrder.length - 1) {
    gameState.phase = phaseOrder[idx + 1];
  } else {
    // End phase, switch turn
    gameState.phase = "draw";
    gameState.turn = gameState.turn === "player" ? "opponent" : "player";
    // Auto-draw 1 at start of turn
    drawCards(gameState.turn, 1);
  }
  updatePhaseDisplay();
}

// 9. Search Menu
function openDeckSearchModal() {
  const modal = document.getElementById('deck-search-modal');
  const content = document.getElementById('deck-search-content');
  content.innerHTML = "<h3>Select a card to add to your hand:</h3>";
  // Show all cards left in deck (one button per card instance)
  gameState.playerDeck.forEach((id, idx) => {
    const card = dummyCards.find(c => c.id === id);
    if (!card) return;

    const btn = document.createElement('button');
    btn.style.margin = "0.2em";
    btn.style.display = "flex";
    btn.style.flexDirection = "column";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.width = "110px";
    btn.style.height = "170px";
    btn.style.padding = "6px";

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.style.maxWidth = "80px";
    img.style.maxHeight = "110px";
    img.style.display = "block";
    img.style.marginBottom = "6px";

    const name = document.createElement('div');
    name.textContent = card.name;
    name.style.fontSize = "0.95em";
    name.style.color = "#223";
    name.style.fontWeight = "bold";
    name.style.textAlign = "center";

    btn.appendChild(img);
    btn.appendChild(name);

    btn.onclick = () => {
      gameState.playerHand.push(card.id);
      gameState.playerDeck.splice(idx, 1);
      closeDeckSearchModal();
      renderGameState();
      updatePhaseDisplay();
    };
    content.appendChild(btn);
  });
  modal.style.display = "block";
}
function closeDeckSearchModal() {
  document.getElementById('deck-search-modal').style.display = "none";
}
document.getElementById('close-deck-search').onclick = closeDeckSearchModal;
document.getElementById('deck-search-modal').onclick = (e) => {
  if (e.target.id === 'deck-search-modal') closeDeckSearchModal();
};
