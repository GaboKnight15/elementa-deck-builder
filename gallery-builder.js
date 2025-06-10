// CARD LIST
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
// ==========================
// === CONSTANTS & STATE ===
// ==========================
const DECK_SLOTS_KEY = "deckSlots";
const DECKS_KEY = "decks";

// Deck slots and decks state
let deckSlots = JSON.parse(localStorage.getItem(DECK_SLOTS_KEY)) || ["Deck 1"];
let decks = JSON.parse(localStorage.getItem(DECKS_KEY)) || { "Deck 1": {} };
let currentDeckSlot = localStorage.getItem("currentDeckSlot") || deckSlots[0];

// ==========================
// === DOM REFERENCES ===
// ==========================
const deckSlotSelect     = document.getElementById('deck-slot-select');
const addDeckSlotBtn     = document.getElementById('add-deck-slot-btn');
const renameDeckSlotBtn  = document.getElementById('rename-deck-slot-btn');
const deleteDeckSlotBtn  = document.getElementById('delete-deck-slot-btn');
const deckTitle          = document.getElementById('deck-title');
const startGameBtn       = document.getElementById('start-game-btn');
const gallery            = document.getElementById('card-gallery');
const deckList           = document.getElementById('deck-list');
const cardCount          = document.getElementById('card-count');
const modal              = document.getElementById('image-modal');
const modalImg           = document.getElementById('modal-img');
const closeBtn           = document.querySelector('.close');
const toggleBtn          = document.getElementById('toggle-deck-btn');
const deckPanel          = document.querySelector('.deck');
const elementsToHide = [
  document.getElementById('deck-slot-selector'),
  document.getElementById('filters'),
  document.getElementById('card-gallery'),
  document.querySelector('.deck'),
  startGameBtn,
  toggleBtn
];

// ==========================
// === DECK MANAGEMENT ===
// ==========================
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

// ==========================
// === RENDERING / UI ===
// ==========================
function buildDeck(deckObj) {
  let deck = [];
  let uid = 1;
  for (let [cardId, count] of Object.entries(deckObj)) {
    for (let i = 0; i < count; i++) {
      deck.push({
        cardId: cardId,
        instanceId: cardId + "#" + (uid++)
      });
    }
  }
  return deck;
}
function showBuilder() {
  document.getElementById('battlefield-container').style.display = 'none';
  document.getElementById('battlefield').style.display = 'none';
  // Show builder-only elements, etc.
}
function getCardBgClass(card) {
  let colors = Array.isArray(card.color) ? card.color : [card.color];
  colors = colors.filter(Boolean).map(c => c.toLowerCase());
  if (colors.length === 1) return `card-bg-${colors[0]}`;
  if (colors.length === 2) return `card-bg-${colors[0]}-${colors[1]}`;
  return `card-bg-gold`;
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

// ==========================
// === DECK BUILDER EVENTS ===
// ==========================
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
document.getElementById('reset-deck-btn').onclick = () => {
  const deck = getCurrentDeck();
  for (const key in deck) {
    delete deck[key];
  }
  setCurrentDeck(deck);
  updateDeckDisplay();
  renderGallery();
};

// Gallery Filters
document.getElementById('filter-name').addEventListener('input', renderGallery);
document.getElementById('filter-color').addEventListener('change', renderGallery);
document.getElementById('filter-category').addEventListener('change', renderGallery);
document.getElementById('filter-type').addEventListener('change', renderGallery);
document.getElementById('filter-rarity').addEventListener('change', renderGallery);
document.getElementById('filter-archetype').addEventListener('change', renderGallery);
document.getElementById('filter-ability').addEventListener('change', renderGallery);

toggleBtn.onclick = () => {
  deckPanel.classList.toggle('show');
  document.body.classList.toggle('deck-open', deckPanel.classList.contains('show'));
};
window.addEventListener('click', (e) => {
  if (!deckPanel.contains(e.target) && e.target !== toggleBtn && deckPanel.classList.contains('show')) {
    deckPanel.classList.remove('show');
  }
});
