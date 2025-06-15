window.onerror = function (msg, url, line, col, error) {
  alert(`JS Error: ${msg}\nAt ${line}:${col}`);
};
// CARD LIST //
const dummyCards = [
{ id: 'basicfairy', name: 'Fairy', rarity: 'Basic', image: 'CardImages/BasicCreatures/Fairy.png', category: 'creature', color: 'green', type: 'fairy', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Fairy', ability: 'flying'},
{ id: 'basicgoblin', name: 'Goblin', rarity: 'Basic', image: 'CardImages/BasicCreatures/Goblin.png', category: 'creature', color: 'green', type: 'goblin', hp: 3, atk: 1, def: 0, cost: 0, archetype: 'Goblin'},
{ id: 'basicemberling', name: 'Emberling', rarity: 'Basic', image: 'CardImages/BasicCreatures/Emberling.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: 'burn'},
{ id: 'basicfirepixie', name: 'Fire Pixie', rarity: 'Basic', image: 'CardImages/BasicCreatures/Fire Pixie.png', category: 'creature', color: 'red', type: 'fairy', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: ['burn','flying']},
{ id: 'basichellcharger', name: 'Hellcharger', rarity: 'Basic', image: 'CardImages/BasicCreatures/Hellcharger.png', category: 'creature', color: 'red', type: 'warrior', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: 'burn'},
{ id: 'basicelementalblue', name: 'Water Elemental', rarity: 'Basic', image: 'CardImages/BasicCreatures/Water Elemental.png', category: 'creature', color: 'blue', type: 'elemental', hp: 5, atk: 2, def: 0, cost: 1, archetype: 'Firelands', ability: ['dive','elusive','soak']},
{ id: 'basicwolfgray', name: 'Desert Wolf', rarity: 'Basic', image: 'CardImages/BasicCreatures/Desert Wolf.png', category: 'creature', color: 'gray', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Scorchlands', ability: 'burn'},
{ id: 'basicgolemites', name: 'Golemites', rarity: 'Basic', image: 'CardImages/BasicCreatures/Golemites.png', category: 'creature', color: 'gray', type: 'elemental', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Golemheart', ability: 'burn'},
{ id: 'basicwolfblack', name: 'Wolf', rarity: 'Basic', image: 'CardImages/BasicCreatures/Wolf.png', category: 'creature', color: 'black', type: 'beast', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Moonfang', ability: 'ambush'},
{ id: 'basicskeleton', name: 'Skeleton', rarity: 'Basic', image: 'CardImages/BasicCreatures/Skeleton.png', category: 'creature', color: 'black', type: 'undead', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe'},
{ id: 'basicbat', name: 'Bat', rarity: 'Basic', image: 'CardImages/BasicCreatures/Bat.png', category: 'creature', color: 'black', type: 'vampire', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Vampiric', ability: ['drain','flying']},
{ id: 'basicimp', name: 'Imp', rarity: 'Basic', image: 'CardImages/BasicCreatures/Imp.png', category: 'creature', color: 'black', type: 'demon', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe', ability: ['ambush','flying']},
{ id: 'basicvampire', name: 'Vampire', rarity: 'Basic', image: 'CardImages/BasicCreatures/Vampire.png', category: 'creature', color: 'black', type: 'demon', hp: 3, atk: 2, def: 0, cost: 1, archetype: 'Vampiric', ability: ['drain','flying']},
    
{ id: 'cindercore1', name: 'Cindercore Golem', rarity: 'Rare', image: 'CardImages/Cindercore/Cindercore Golem.png', category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: ['Cindercore','Golemheart']},
{ id: 'cindercore2', name: 'Cindercore Sentry', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Sentry.png', category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore'},
{ id: 'cindercore3', name: 'Cindercore Protector', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Protector.png', category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore'},
{ id: 'cindercore4', name: 'Cindercore Vanguard', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Vanguard.png', category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore'},
{ id: 'cindercore5', name: 'Ignavaryn, Cindercore Automaton', rarity: 'Legendary', image: 'CardImages/Cindercore/Ignavaryn, Cindercore Automaton.png', category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore'},

{ id: 'firelands1', name: 'Firelands Scamperling', rarity: 'Common', image: 'CardImages/Firelands/Firelands Scamperling.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
{ id: 'firelands2', name: 'Firelands Cindercub', rarity: 'Common', image: 'CardImages/Firelands/Firelands Cindercub.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
{ id: 'firelands3', name: 'Firelands Lynx', rarity: 'Common', image: 'CardImages/Firelands/Firelands Lynx.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','leap','rush']},
{ id: 'firelands4', name: 'Firelands Kitsune', rarity: 'Common', image: 'CardImages/Firelands/Firelands Kitsune.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
{ id: 'firelands5', name: 'Firelands Direbeast', rarity: 'Rare', image: 'CardImages/Firelands/Firelands Direbeast.png', category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
{ id: 'firelands6', name: 'Firelands Hellhound', rarity: 'Common', image: 'CardImages/Firelands/Firelands Hellhound.png', category: 'creature', color: ['red','black'], type: ['beast','demon'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
{ id: 'firelands7', name: 'Firelands Hellmaw', rarity: 'Common', image: 'CardImages/Firelands/Firelands Hellmaw.png', category: 'creature', color: ['red','black'], type: ['dragon','demon'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','flying','rush']},
{ id: 'firelands8', name: 'Ephoros, Firelands Behemoth', rarity: 'Common', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth.png', category: 'creature', color: ['red','black'], type: ['beast','demon'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},
{ id: 'firelands8a', name: 'Ephoros, Firelands Behemoth', rarity: 'Common', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth FA.png', category: 'creature', color: ['red','black'], type: ['beast','demon'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush']},

{ id: 'golem1', name: 'Pyrokrag, Golemheart Titan', rarity: 'Legendary', image: 'CardImages/Golems/Pyrokrag, Golemheart Titan.png', category: 'creature', color: ['red', 'gray'], type: ['fusion','elemental'], hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart'},
{ id: 'golem2', name: 'Golemheart Giant', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Giant.png', category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart'},
{ id: 'golem3', name: 'Smoldering Golemheart', rarity: 'Rare', image: 'CardImages/Golems/Smoldering Golemheart .png', category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart'},
{ id: 'golem4', name: 'Golemheart Sentinel', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Sentinel.png', category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart', ability: 'protect'},
{ id: 'golem6', name: 'Fire Golem', rarity: 'Common', image: 'CardImages/Golems/Fire Golem.png', category: 'creature', color: ['red', 'gray'], type: ['elemental','golem'], hp: 3, atk: 2, def: 1, cost: 2, archetype: ['Firelands','Golemheart'], ability: 'burn'},
{ id: 'golem7', name: 'Kaelgorran, Elemental Primordial', rarity: 'Legendary', image: 'CardImages/Golems/Kaelgorran, Elemental Primordial.png', category: 'creature', color: ['green','red', 'gray'], type: ['elemental','golem'], hp: 3, atk: 2, def: 1, cost: 2, archetype: ['Firelands','Golemheart'], ability: 'burn'},
{ id: 'golem8', name: 'Acidic Golem', rarity: 'Common', image: 'CardImages/Golems/Acidic Golem.png', category: 'creature', color: ['purple', 'gray'], type: ['elemental','golem'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Golemheart', ability: 'toxic'},

{ id: 'coralbound1', name: 'Coralbound Sentry', rarity: 'Common', image: 'CardImages/Coralbound/Coralbound Sentry.png', category: 'creature', color: 'blue', type: 'construct', hp: 5, atk: 1, def: 1, cost: 1, archetype: 'Coralbound'},
{ id: 'coralbound2', name: 'Coralbound Protector', rarity: 'Common', image: 'CardImages/Coralbound/Coralbound Protector.png', category: 'creature', color: 'blue', type: 'construct', hp: 5, atk: 1, def: 1, cost: 1, archetype: 'Coralbound'},
{ id: 'coralbound3', name: 'Coralbound Vanguard', rarity: 'Common', image: 'CardImages/Coralbound/Coralbound Vanguard.png', category: 'creature', color: 'blue', type: 'construct', hp: 5, atk: 1, def: 1, cost: 1, archetype: 'Coralbound'},
{ id: 'coralbound4', name: 'Maelvyrn, Coralbound Automaton', rarity: 'Legendary', image: 'CardImages/Coralbound/Maelvyrn, Coralbound Automaton.png', category: 'creature', color: 'blue', type: 'construct', hp: 19, atk: 8, def: 5, cost: 9, archetype: 'Coralbound'},

{ id: 'card004', name: 'Wyrm of Thorns and Sunfire', rarity: 'Rare', image: 'CardImages/Glimmerwings/Wyrm of Thorns and Sunfire.png', category: 'creature', color: ['green', 'red', 'white'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, ability: ['intimidate','flying']},

{ id: 'skullframe01', name: 'Skullframe Defector', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Defector.png', category: 'creature', color: 'black', type: 'undead', hp: 3, atk: 2, def: 1, cost: 1, archetype: 'Skullframe'},
{ id: 'skullframe02', name: 'Skullframe Unyielding', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Unyielding.png', category: 'creature', color: 'black', type: 'undead', hp: 4, atk: 1, def: 0, cost: 2, archetype: 'Skullframe', ability: 'rush'},
{ id: 'skullframe03', name: 'Skullframe Acolyte', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Acolyte.png', category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 5, atk: 3, def: 1, cost: 3, archetype: 'Skullframe'},
{ id: 'skullframe04', name: 'Skullframe Cryptwinds', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Cryptwinds.png', category: 'creature', color: ['black', 'purple'], type: ['dragon','undead'], hp: 12, atk: 6, def: 2, cost: 5, archetype: 'Skullframe', ability: 'flying'},
{ id: 'skullframe05', name: 'Skullframe Spectral Dragon', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Spectral Dragon.png', category: 'creature', color: ['black', 'purple'], type: ['dragon','undead'], hp: 12, atk: 6, def: 2, cost: 5, archetype: 'Skullframe', ability: 'flying'},
{ id: 'skullframe06', name: 'Skullframe Armored Dragon', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Armored Dragon.png', category: 'creature', color: ['black', 'purple'], type: ['dragon','undead'], hp: 12, atk: 6, def: 2, cost: 5, archetype: 'Skullframe', ability: 'flying'},
{ id: 'skullframe07', name: 'Skullframe Hexmistress', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Hexmistress.png', category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 6, atk: 4, def: 1, cost: 3, archetype: 'Skullframe'},
{ id: 'skullframe08', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage.png', category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 8, atk: 4, def: 1, cost: 3, archetype: 'Skullframe'},
{ id: 'skullframe08a', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage FA.png', category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 8, atk: 4, def: 1, cost: 3, archetype: 'Skullframe'},
{ id: 'spell014', name: 'Soulhexing', rarity: 'Common', image: 'CardImages/Skullframe/Soulhexing.png', category: 'spell', color: 'black', type: 'spell', cost: 3, archetype: 'Skullframe'},
{ id: 'spell015', name: 'Witherwake', rarity: 'Common', image: 'CardImages/Skullframe/Witherwake.png', category: 'spell', color: ['black','purple'], type: 'spell', cost: 2, archetype: 'Skullframe'},

{ id: 'frostlands01', name: 'Frostlands Dragon', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Dragon.png', category: 'creature', color: ['blue', 'gray'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, ability: ['Ice Armor','flying'], archetype: 'Frostlands'},
{ id: 'frostlands02', name: 'Frostlands Wyrm', rarity: 'common', image: 'CardImages/Frostlands/Frostlands Wyrm.png', category: 'creature', color: ['blue', 'gray'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, ability: ['Ice Armor','flying'], archetype: 'Frostlands'},
{ id: 'frostlands03', name: 'Frostlands Golem', rarity: 'Common', image: 'CardImages/Frostlands/Frostlands Golem.png', category: 'creature', color: ['blue', 'gray'], type: 'elemental', hp: 9, atk: 5, def: 2, cost: 3, ability: 'Ice Armor', archetype: 'Frostlands'},
{ id: 'frostlands04', name: 'Frostlands Phoenix', rarity: 'Common', image: 'CardImages/Frostlands/Frostlands Phoenix.png', category: 'creature', color: ['blue', 'gray'], type: 'avian', hp: 9, atk: 5, def: 2, cost: 3, ability: ['Ice Armor','flying'], archetype: 'Frostlands'},
{ id: 'frostlands05', name: 'Frostlands Runeforged Automaton', rarity: 'Common', image: 'CardImages/Frostlands/Frostlands Runeforged Automaton.png', category: 'creature', color: ['blue', 'gray'], type: 'construct', hp: 9, atk: 5, def: 2, cost: 3, ability: 'Ice Armor', archetype: 'Frostlands'},
{ id: 'frostlands06', name: 'Frostlands Runeforged Titan', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Runeforged Titan.png', category: 'creature', color: ['blue', 'gray'], type: 'construct', hp: 9, atk: 5, def: 2, cost: 3, ability: ['Ice Armor','crush'], archetype: 'Frostlands'},
{ id: 'frostlands07', name: 'Eirawen, Frostlands Queen', rarity: 'Legendary', image: 'CardImages/Frostlands/Eirawen, Frostlands Queen.png', category: 'creature', color: ['blue', 'gray'], type: ['mage','champion'], hp: 11, atk: 1, def: 0, cost: 3, ability: ['Ice Armor','flying'], archetype: 'Frostlands'},

{ id: 'artifact005', name: 'Golemheart infusor', rarity: 'Common', image: 'CardImages/Artifacts/Golemheart Infusor.png', category: 'artifact', color: 'gray', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'Golemheart'},
{ id: 'artifact006', name: 'Heartwood Emeralds', rarity: 'Common', image: 'CardImages/Artifacts/Heartwood Emeralds.png', category: 'artifact', color: 'green', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'Heartwood'},
{ id: 'artifact007', name: 'Cindercore Ember', rarity: 'Common', image: 'CardImages/Artifacts/Cindercore Ember.png', category: 'artifact', color: 'red', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'cindercore'},
{ id: 'artifact008', name: 'Tidecallers Pearl', rarity: 'Common', image: 'CardImages/Artifacts/Tidecallers Pearl.png', category: 'artifact', color: 'blue', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'coralbound'},
{ id: 'artifact009', name: 'Stormcore Dynamo', rarity: 'Common', image: 'CardImages/Artifacts/Stormcore Dynamo.png', category: 'artifact', color: 'yellow', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},
{ id: 'artifact010', name: 'Plague Thorn Talisman', rarity: 'Common', image: 'CardImages/Artifacts/Plague Thorn Talisman.png', category: 'artifact', color: 'purple', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},
{ id: 'artifact011', name: 'Titans Anvil', rarity: 'Common', image: 'CardImages/Artifacts/Titans Anvil.png', category: 'artifact', color: 'gray', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},
{ id: 'artifact012', name: 'Veil of the Forgotten', rarity: 'Common', image: 'CardImages/Artifacts/Veil of the Forgotten.png', category: 'artifact', color: 'black', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},
{ id: 'artifact013', name: 'Lumen Spire', rarity: 'Common', image: 'CardImages/Artifacts/Lumen Spire.png', category: 'artifact', color: 'white', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore'},

{ id: 'spell010', name: 'Life Growth', rarity: 'Common', image: 'CardImages/Spells/Life Growth.png', category: 'spell', color: 'green', type: 'spell', cost: 1},
{ id: 'basicspell1', name: 'Essence Surge', rarity: 'basic', image: 'CardImages/Spells/Essence Surge.png', category: 'spell', color: 'green', type: 'spell', cost: 2},
{ id: 'basicspell2', name: 'Essence Assault', rarity: 'basic', image: 'CardImages/Spells/Essence Assault.png', category: 'spell', color: 'red', type: 'spell', cost: 2},
{ id: 'basicspell3', name: 'Essence Rift', rarity: 'basic', image: 'CardImages/Spells/Essence Rift.png', category: 'spell', color: 'blue', type: 'spell', cost: 2},
{ id: 'basicspell4', name: 'Essence Bolt', rarity: 'basic', image: 'CardImages/Spells/Essence Bolt.png', category: 'spell', color: 'yellow', type: 'spell', cost: 2},
{ id: 'basicspell5', name: 'Essence Break', rarity: 'basic', image: 'CardImages/Spells/Essence Break.png', category: 'spell', color: 'purple', type: 'spell', cost: 4},
{ id: 'basicspell6', name: 'Essence Barrier', rarity: 'basic', image: 'CardImages/Spells/Essence Barrier.png', category: 'spell', color: 'gray', type: 'spell', cost: 1},
{ id: 'basicspell7', name: 'Essence Purge', rarity: 'basic', image: 'CardImages/Spells/Essence Purge.png', category: 'spell', color: 'black', type: 'spell', cost: 4},
{ id: 'basicspell8', name: 'Essence Blessing', rarity: 'basic', image: 'CardImages/Spells/Essence Blessing.png', category: 'spell', color: 'white', type: 'spell', cost: 1},

{ id: 'basicforest', name: 'Forest', rarity: 'Basic', image: 'CardImages/Domains/Green Basic Location.png', category: 'domain', color: 'green', type: 'domain', hp: 5, cost: 1},
{ id: 'basicvolcano', name: 'Volcano', rarity: 'Basic', image: 'CardImages/Domains/Red Basic Location.png', category: 'domain', color: 'red', type: 'domain', hp: 5, cost: 1},
{ id: 'basicocean', name: 'Ocean', rarity: 'Basic', image: 'CardImages/Domains/Blue Basic Location.png', category: 'domain', color: 'blue', type: 'domain', hp: 5, cost: 1},
{ id: 'basicmountain', name: 'Mountain', rarity: 'Basic', image: 'CardImages/Domains/Gray Basic Location.png', category: 'domain', color: 'gray', type: 'domain', hp: 5, cost: 1},
{ id: 'basicswamp', name: 'Swamp', rarity: 'Basic', image: 'CardImages/Domains/Purple Basic Location.png', category: 'domain', color: 'purple', type: 'domain', hp: 5, cost: 1},
{ id: 'basicpeaks', name: 'Peaks', rarity: 'Basic', image: 'CardImages/Domains/Yellow Basic Location.png', category: 'domain', color: 'yellow', type: 'domain', hp: 5, cost: 1},
{ id: 'basicplains', name: 'Plains', rarity: 'Basic', image: 'CardImages/Domains/White Basic Location.png', category: 'domain', color: 'white', type: 'domain', hp: 5, cost: 1},
{ id: 'basicshadowforest', name: 'Shadow Forest', rarity: 'Basic', image: 'CardImages/Domains/Black Basic Location.png', category: 'domain', color: 'black', type: 'domain', hp: 5, cost: 1},

  ];
// ==========================
// === CONSTANTS & STATE ===
// ==========================
const PHASES = [
  { turn: 'player', phase: 'draw' },
  { turn: 'player', phase: 'main' },
  { turn: 'player', phase: 'end' },
  { turn: 'opponent', phase: 'draw' },
  { turn: 'opponent', phase: 'main' },
  { turn: 'opponent', phase: 'end' }
];
  // --- MULTI-DECK MANAGEMENT --- //
  const DECK_SLOTS_KEY = "deckSlots";
  const DECKS_KEY = "decks";
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
  turn: "player",
  phase: "draw"
};
// ==========================
// === DOM REFERENCES ===
// ==========================

  const deckSlotSelect     = document.getElementById('deck-slot-select');
  const addDeckSlotBtn     = document.getElementById('add-deck-slot-btn');
  const renameDeckSlotBtn  = document.getElementById('rename-deck-slot-btn');
  const deleteDeckSlotBtn  = document.getElementById('delete-deck-slot-btn');
  const deckTitle          = document.getElementById('deck-title');
  const startGameBtn       = document.getElementById('start-game-btn');
  const backToBuilderBtn   = document.getElementById('back-to-builder-btn');
  const battlefield        = document.getElementById('battlefield');
  const gallery            = document.getElementById('card-gallery');
  const deckList           = document.getElementById('deck-list');
  const cardCount          = document.getElementById('card-count');
  const modal              = document.getElementById('image-modal');
  const modalImg           = document.getElementById('modal-img');
  const closeBtn           = document.querySelector('.close');
  const toggleBtn          = document.getElementById('toggle-deck-btn');
  const deckPanel          = document.querySelector('.deck');
  // Phase display (HTML version, not JS-generated)
  const phasePlayerSpan    = document.getElementById('phase-player');
  const phaseNameSpan      = document.getElementById('phase-name');
  const nextPhaseBtn       = document.getElementById('next-phase-btn');
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

  let deckSlots = JSON.parse(localStorage.getItem(DECK_SLOTS_KEY)) || ["Deck 1"];
  let decks = JSON.parse(localStorage.getItem(DECKS_KEY)) || { "Deck 1": {} };
  let currentDeckSlot = localStorage.getItem("currentDeckSlot") || deckSlots[0];

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

// DECK CREATION LOGIC
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
function showBattlefield() {
  document.getElementById('battlefield-container').style.display = 'flex';
  document.getElementById('battlefield').style.display = 'block';
  // Hide builder-only elements, etc.
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

function updatePhaseBar() {
  document.getElementById('phase-player').textContent = gameState.turn;
  document.getElementById('phase-name').textContent = gameState.phase;
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
// CREATE CARD MENUS
function createCardMenu(buttons = []) {
  const menu = document.createElement('div');
  menu.className = 'card-menu';
  menu.style.position = 'absolute';
  menu.style.display = 'none';
  menu.style.top = '100%';
  menu.style.left = '0';
  menu.style.marginTop = '6px';
  // Don't set background, border, padding here—let CSS handle it

  buttons.forEach(btnConf => {
    const btn = document.createElement('button');
    btn.type = "button";
    btn.innerText = btnConf.text;
    if (btnConf.className) btn.className = btnConf.className;
    btn.onclick = btnConf.onClick;
    menu.appendChild(btn);
  });
  return menu;
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
      this.src = "CardImages/Domains/placeholder.png";
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
// === GAMEPLAY LOGIC ===
// ==========================
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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

function drawCards(who, n) {
  let deck = who === "player" ? gameState.playerDeck : gameState.opponentDeck;
  let hand = who === "player" ? gameState.playerHand : gameState.opponentHand;
  for (let i = 0; i < n && deck.length > 0; i++) {
    hand.push(deck.shift());
  }
  renderGameState();
  setupDropZones();
}

function renderGameState() {
  // RENDER PLAYER HAND
  const playerHandDiv = document.getElementById('player-hand');
    playerHandDiv.innerHTML = '';
    for (let cardObj of gameState.playerHand) {
      const card = dummyCards.find(c => c.id === cardObj.cardId);
      if (!card) continue;
      const div = document.createElement('div');
      div.className = 'card';
      div.draggable = true;
      div.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", cardObj.instanceId);
        e.dataTransfer.setData("source", "hand");
      };
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
  for (let i = 0; i < gameState.opponentHand.length; i++) {
    const div = document.createElement('div');
    div.className = 'card';
    const img = document.createElement('img');
    img.src = "CardImages/Domains/placeholder.png"; // Use your card back image
    img.alt = "Opponent's card";
    img.style.width = "80px";
    div.appendChild(img);
    opponentHandDiv.appendChild(div);
  }
    // Player Zones
  renderRowZone('player-creatures-zone', gameState.playerCreatures, "creature");
  renderRowZone('player-domains-zone', gameState.playerDomains, "domain");

  // Opponent Zones
  renderRowZone('opponent-creatures-zone', gameState.opponentCreatures, "creature");
  renderRowZone('opponent-domains-zone', gameState.opponentDomains, "domain"); 
}
// HAND OPTIONS MENU
function showHandCardMenu(instanceId, cardDiv) {
  // Remove any existing menu
  document.querySelectorAll('.card-menu').forEach(m => m.remove());

  const cardObj = gameState.playerHand.find(c => c.instanceId === instanceId);

  // Define actions
  const buttons = [
    {
      text: "Play",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerCreatures, { orientation: "vertical" });
        this.closest('.card-menu').remove();
      }
    },
    {
      text: "Send to Void",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerVoid);
        this.closest('.card-menu').remove();
      }
    },
    {
      text: "Return to Deck",
      onClick: function(e) {
        e.stopPropagation();
        moveCard(instanceId, gameState.playerHand, gameState.playerDeck);
        this.closest('.card-menu').remove();
      }
    },
    {
      text: "View",
      onClick: function(e) {
        e.stopPropagation();
        showFullCardModal(cardObj);
        this.closest('.card-menu').remove();
      }
    }
  ];
  const menu = createCardMenu(buttons);

  // Position relative to cardDiv
  cardDiv.style.position = 'relative';
  menu.style.display = 'block';
  cardDiv.appendChild(menu);

  // Hide menu when clicking elsewhere
  setTimeout(() => {
    document.body.addEventListener('click', function handler() {
      menu.remove();
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 10);
}
// DROP ZONES
function setupDropZones() {
  ['player-creatures-zone', 'player-domains-zone'].forEach(zoneId => {
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
      // Choose the correct target array based on zoneId
      let targetArr = zoneId === "player-creatures-zone" ? gameState.playerCreatures : gameState.playerDomains;
      moveCard(instanceId, gameState.playerHand, targetArr, {orientation: "vertical"});
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
  zoneDiv.appendChild(renderCardOnField(cardObj, zoneId));
}
  // Only for player's zones: add deck/void at right
  if (zoneId === "player-domains-zone") {
    appendDeckZone(zoneDiv, gameState.playerDeck, "player");
  }
  if (zoneId === "player-creatures-zone") {
    appendVoidZone(zoneDiv, gameState.playerVoid, "player");
  }
  // Do the same for opponent if you want
  if (zoneId === "opponent-domains-zone") {
    appendDeckZone(zoneDiv, gameState.opponentDeck, "opponent");
  }
  if (zoneId === "opponent-creatures-zone") {
    appendVoidZone(zoneDiv, gameState.opponentVoid, "opponent");
  }
}

// Helper to create and append the deck zone card at the end
function appendDeckZone(parentDiv, deckArray, who) {
  const deckZone = document.createElement('div');
  deckZone.className = 'deck-zone';
  const deckCard = document.createElement('div');
  deckCard.className = 'card';
  const img = document.createElement('img');
  img.src = "CardImages/Domains/placeholder.png";
  img.alt = who + "'s Deck";
  img.style.width = "60px";
  img.style.opacity = "0.85";
  deckCard.appendChild(img);

  const countDiv = document.createElement('div');
  countDiv.style.textAlign = 'center';
  countDiv.style.fontWeight = 'bold';
  countDiv.textContent = deckArray.length;
  deckCard.appendChild(countDiv);
  deckZone.appendChild(deckCard);

  // Deck menu for player
  if (who === "player") {
    deckCard.onclick = (e) => {
      e.stopPropagation();
      const rect = deckCard.getBoundingClientRect();
      deckActionsMenu.style.top = `${rect.bottom + window.scrollY + 8}px`;
      deckActionsMenu.style.left = `${rect.left + window.scrollX}px`;
      deckActionsMenu.style.display = "block";
    };
  }

  parentDiv.appendChild(deckZone);
}

function appendVoidZone(parentDiv, voidArray, who) {
  const voidZone = document.createElement('div');
  voidZone.className = 'void-zone';
  const voidCard = document.createElement('div');
  voidCard.className = 'card';
  // Show last card image if void is not empty
  if (voidArray.length > 0) {
    const lastCardObj = voidArray[voidArray.length - 1];
    const card = dummyCards.find(c => c.id === lastCardObj.cardId);
     if (card && card.image) {
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = card.name;
      img.style.width = "60px";
      img.style.opacity = "0.85";
      voidCard.appendChild(img);
    }
  }
  const countDiv = document.createElement('div');
  countDiv.style.textAlign = 'center';
  countDiv.style.fontWeight = 'bold';
  countDiv.textContent = voidArray.length;
  voidCard.appendChild(countDiv);
  voidZone.appendChild(voidCard);

  voidCard.onclick = (e) => {
    e.stopPropagation();
    showVoidModal();
  };

  parentDiv.appendChild(voidZone);
}
// RENDER DECK AND VOID
function renderDeckZone(zoneId, deckArray, who) {
  const zoneDiv = document.getElementById(zoneId);
  zoneDiv.innerHTML = '';
  const deckCard = document.createElement('div');
  deckCard.className = 'card';
  const img = document.createElement('img');
  img.src = "CardImages/Domains/placeholder.png";
  img.alt = who + "'s Deck";
  img.style.width = "60px";
  img.style.opacity = "0.85";
  deckCard.appendChild(img);

  const countDiv = document.createElement('div');
  countDiv.style.textAlign = 'center';
  countDiv.style.fontWeight = 'bold';
  countDiv.textContent = deckArray.length;
  deckCard.appendChild(countDiv);
  zoneDiv.appendChild(deckCard);

  // CLICK HANDLER FOR VOID ZONE
  if (zoneId.endsWith('void-zone')) {
    deckCard.onclick = (e) => {
      e.stopPropagation();
      showVoidModal();
      };
    }
}
// PLACECARDINZONE
function placeCardInZone(instanceId, zoneId, orientation = "vertical") {
  // Find and remove from all zones
  let cardObj;
  const allRows = [
    gameState.playerHand, gameState.playerCreatures, gameState.playerDomains, gameState.playerVoid,
    gameState.opponentHand, gameState.opponentCreatures, gameState.opponentDomains, gameState.opponentVoid
  ];
  for (const arr of allRows) {
    let idx = arr.findIndex(c => c.instanceId === instanceId);
    if (idx !== -1) {
      [cardObj] = arr.splice(idx, 1);
      break;
    }
  }
  if (!cardObj) return;
  // Add to correct zone
  if (zoneId === 'player-creatures-zone') {
  gameState.playerCreatures.push({ ...cardObj, orientation });
} else if (zoneId === 'player-domains-zone') {
  gameState.playerDomains.push({ ...cardObj, orientation });
} else if (zoneId === 'player-void-zone') {
  gameState.playerVoid.push(cleanCard(cardObj));
}
  renderGameState();
  setupDropZones();
}
// REMOVE STAT CHANGES
function cleanCard(cardObj) {
  const cleaned = { ...cardObj };
  delete cleaned.currentHP;
  delete cleaned.orientation;
  return cleaned;
}
  // Modal logic
  closeBtn.onclick = () => { modal.style.display = "none"; };
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// DECK SEARCH MODAL with Popup Menu on Card Click
function openDeckSearchModal() {
  const modal = document.getElementById('deck-search-modal');
  const content = document.getElementById('deck-search-content');
  content.innerHTML = "<h3>Select a card and choose an action</h3>";

  gameState.playerDeck.forEach((cardObj, idx) => {
    const card = dummyCards.find(c => c.id === cardObj.cardId);
    if (!card) return;

    // 1. Create a wrapper for each card
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';

    // 2. Create card button
    const btn = document.createElement('button');
    btn.style.display = 'flex';
    btn.style.flexDirection = 'column';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.width = "110px";
    btn.style.height = "170px";
    btn.style.padding = "6px";
    btn.style.background = "#444";
    btn.style.color = "#fff";
    btn.style.borderRadius = "10px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.transition = "background 0.2s";
    btn.classList.add('card', 'card-modal-dark');
    btn.onmouseover = () => btn.style.background = "#222";
    btn.onmouseout = () => btn.style.background = "#444";

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.name;
    img.style.maxWidth = "80px";
    img.style.maxHeight = "110px";
    img.style.display = "block";
    img.style.marginBottom = "6px";

    const name = document.createElement('div');
    name.textContent = card.name;
    name.className = "card-name";

    btn.appendChild(img);
    btn.appendChild(name);

    // 3. Attach menu on click, add menu to wrapper
    btn.onclick = (e) => {
      e.stopPropagation();
      // Remove any existing menu in this wrapper
      wrapper.querySelectorAll('.card-menu').forEach(m => m.remove());

      const buttons = [
        {
          text: "Add to Hand",
          onClick: function(ev) {
            ev.stopPropagation();
            moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerHand);
            openDeckSearchModal();
            this.closest('.card-menu').remove();
          }
        },
        {
          text: "Send to Void",
          onClick: function(ev) {
            ev.stopPropagation();
            moveCard(cardObj.instanceId, gameState.playerDeck, gameState.playerVoid);
            openDeckSearchModal();
            this.closest('.card-menu').remove();
          }
        },
        {
          text: "View",
          onClick: function(ev) {
            ev.stopPropagation();
            showFullCardModal(cardObj);
            this.closest('.card-menu').remove();
          }
        }
      ];
      const menu = createCardMenu(buttons);
      menu.style.display = 'flex';
      wrapper.appendChild(menu);

      // Hide menu when clicking elsewhere
      setTimeout(() => {
        document.body.addEventListener('click', function handler() {
          menu.remove();
          document.body.removeEventListener('click', handler);
        }, { once: true });
      }, 10);
    };

    wrapper.appendChild(btn);
    content.appendChild(wrapper);
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

// Void close logic
document.getElementById('close-void-modal').onclick = function() {
  document.getElementById('void-modal').style.display = "none";
};
document.getElementById('void-modal').addEventListener('click', function(event) {
  if (event.target === this) this.style.display = 'none';
});
// Unified function for all "View" actions:
function showFullCardModal(cardObj) {
  const card = dummyCards.find(c => c.id === (cardObj.cardId || cardObj.id));
  if (!card) return;
  const modal = document.getElementById('image-modal');
  const modalContent = document.getElementById('modal-img-content');
  const modalImg = document.getElementById('modal-img');
  if (modalContent) {
    modalContent.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <h2 style="text-align:center; color:white; margin-top:12px;">${card.name}</h2>
      <div style="text-align:center;">
        ${card.hp !== undefined ? `HP: ${card.hp}` : ''}
        ${card.atk !== undefined ? ` | ATK: ${card.atk}` : ''}
        ${card.def !== undefined ? ` | DEF: ${card.def}` : ''}
        ${card.cost !== undefined ? ` | Cost: ${card.cost}` : ''}
      </div>
      <div style="text-align:center;margin:8px 0;">
        ${card.rarity || ''} ${Array.isArray(card.type) ? card.type.join(', ') : card.type || ''}
      </div>
      <div style="text-align:center;font-size:0.98em;color:#555;">
        ${card.text || ''}
      </div>
    `;
    modal.style.display = 'flex';
    if (modalImg) modalImg.style.display = "none";
  } else {
    modalImg.src = card.image;
    modalImg.style.display = "block";
    modal.style.display = "flex";
  }
}
// IMAGE MODAL CLOSE LOGIC
document.querySelector('.close').onclick = () => {
  document.getElementById('image-modal').style.display = "none";
};
// CARD STATS DETECTION
function getBaseHp(cardId) {
  const card = dummyCards.find(c => c.id === cardId);
  return card ? card.hp : 1; // fallback to 1 if not found
}
function renderCardOnField(cardObj, zoneId) {
  // CURRENT HP
  if (typeof cardObj.currentHP !== "number") {
    cardObj.currentHP = getBaseHp(cardObj.cardId);
  }
  const baseHP = getBaseHp(cardObj.cardId);
  const currentHP = cardObj.currentHP;
  const hpPercent = Math.max(0, Math.min(1, currentHP / baseHP));

  // Color logic
  let barColor = "#4caf50"; // green
  if (hpPercent <= 0.25) {
    barColor = "#e53935"; // red
  } else if (hpPercent <= 0.5) {
    barColor = "#ff9800"; // orange
  }
  
  // Create the main card div
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card on-field';
  cardDiv.dataset.instanceId = cardObj.instanceId;
  cardDiv.style.position = 'relative';

  // Add card image
  const cardData = dummyCards.find(c => c.id === cardObj.cardId);
  if (cardData && cardData.image) {
    const img = document.createElement('img');
    img.src = cardData.image;
    img.alt = cardData.name || "Card";
    if (cardObj.orientation === "horizontal") {
      img.style.transform = "rotate(90deg)";
    }
    cardDiv.appendChild(img);
  } else {
    // fallback if no image
    cardDiv.textContent = cardData ? cardData.name : "Unknown";
  }

  // Allow any card to receive attachments
  cardDiv.ondragover = (e) => {
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedCard = gameState.playerHand.find(c => c.instanceId === draggedId);
    if (draggedCard) {
      e.preventDefault();
      cardDiv.classList.add('drag-over');
    }
  };
  cardDiv.ondragleave = () => cardDiv.classList.remove('drag-over');
  cardDiv.ondrop = (e) => {
    e.preventDefault();
    cardDiv.classList.remove('drag-over');
    const instanceId = e.dataTransfer.getData("text/plain");
    const idx = gameState.playerHand.findIndex(c => c.instanceId === instanceId);
    if (idx !== -1) {
      const attachObj = gameState.playerHand.splice(idx, 1)[0];
      if (!cardObj.attachedCards) cardObj.attachedCards = [];
      cardObj.attachedCards.push({ ...attachObj });
      renderGameState();
      setupDropZones();
    }
  };

  // Render attached cards ON TOP, stacked with a small vertical offset
  if (cardObj.attachedCards && cardObj.attachedCards.length > 0) {
    const stackDiv = document.createElement('div');
    stackDiv.className = 'attached-cards-stack';
    stackDiv.style.position = 'absolute';
    stackDiv.style.left = '50%';
    stackDiv.style.top = '12px'; // adjust as needed
    stackDiv.style.transform = 'translateX(-50%)';
    stackDiv.style.pointerEvents = 'none'; // so they don't block the parent card
    stackDiv.style.zIndex = '5';

    cardObj.attachedCards.forEach((attachObj, i) => {
      const attachData = dummyCards.find(c => c.id === attachObj.cardId);
      if (!attachData) return;
      const attDiv = document.createElement('div');
      attDiv.className = 'card attached-on-top';
      attDiv.style.width = '60px';
      attDiv.style.height = '85px';
      attDiv.style.position = 'absolute';
      attDiv.style.left = '0';
      attDiv.style.top = `${i * 16}px`; // stagger each attachment down a bit
      attDiv.style.pointerEvents = 'auto'; // allow tooltip/interaction if desired
      attDiv.title = attachData.name;

  // ATTACHMENT MENU
  attDiv.onclick = (e) => {
  e.stopPropagation();
  // Remove any open menus first
  attDiv.querySelectorAll('.card-menu').forEach(m => m.remove());
  // Create menu
  const buttons = [
    {
      text: "View",
      onClick: function(ev) {
        ev.stopPropagation();
        showFullCardModal(attachObj);
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
        setupDropZones();
        this.closest('.card-menu').remove();
      }
    }
  ];
  const menu = createCardMenu(buttons);
  menu.style.left = '70px'; // optional: offset menu to the right of attachment
  attDiv.appendChild(menu);
  menu.style.display = 'block';

  // Hide menu if click elsewhere
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
      img.style.borderRadius = '8px';
      attDiv.appendChild(img);

      stackDiv.appendChild(attDiv);
    });
    cardDiv.style.position = 'relative';
    cardDiv.appendChild(stackDiv);
  }

  // HP BADGE
  const hpBadge = document.createElement('span');
  hpBadge.className = 'hp-badge-heart';
  hpBadge.innerHTML = `
    <svg viewBox="0 0 32 32" class="hp-heart-svg" width="28" height="28">
      <path d="M16 29s-11-7-11-15C5 5.8 13 5.8 16 12.5 19 5.8 27 5.8 27 14c0 8-11 15-11 15z"
          fill="#e25555" stroke="#be2626" stroke-width="1"/>
      <text x="16" y="20" text-anchor="middle" font-size="14" fill="#fff" font-family="Verdana" font-weight="bold">${cardObj.currentHP}</text>
    </svg>
  `;
  cardDiv.appendChild(hpBadge);

  // Return a wrapper with cardDiv + hp bar below
  const wrapper = document.createElement('div');
  wrapper.className = 'card-on-field-wrapper';
  wrapper.style.display = 'flex';
  wrapper.style.flexDirection = 'column';
  wrapper.style.alignItems = 'center';

  wrapper.appendChild(cardDiv);

  // HP Bar just below the card
  const barWrap = document.createElement('div');
  barWrap.className = 'hp-bar-wrap';
  const bar = document.createElement('div');
  bar.className = 'hp-bar';
  bar.style.width = `${Math.round(hpPercent * 100)}%`;
  bar.style.backgroundColor = barColor;
  barWrap.appendChild(bar);
  wrapper.appendChild(barWrap);;
  
  // MANUAL HP UPDATE
  cardDiv.onclick = function(e) {
    e.stopPropagation();
    showCardActionMenu(cardObj.instanceId, zoneId, cardObj.orientation || "vertical", cardDiv);
  };
  return wrapper;
}
// ==========================
// === EVENT LISTENERS ===
// ==========================

// Deck slot events
  deckSlotSelect.addEventListener('change', () => {
    currentDeckSlot = deckSlotSelect.value;
    saveDeckState();
    updateDeckDisplay();
    renderGallery();
  });
// ADD DECK SLOT 
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
// RENAME DECK SLOT
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
// DELETE DECK SLOT
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
// START GAME LOGIC
startGameBtn.onclick = () => {
  showBattlefield();
  elementsToHide.forEach(el => el.style.display = 'none');
  battlefield.style.display = 'block';
  const deckObj = getCurrentDeck();
  
  gameState.playerDeck = shuffle(buildDeck(deckObj));
  gameState.playerHand = [];
  gameState.playerCreatures = [];
  gameState.playerDomains = [];
  gameState.playerVoid = [];

  gameState.opponentDeck = shuffle(buildDeck(deckObj));
  gameState.opponentHand = [];
  gameState.opponentCreatures = [];
  gameState.opponentDomains = [];
  gameState.opponentVoid = [];
  renderGameState();
  setupDropZones();

  // GAMEPLAY LOGIC //
  // SET-UP DRAG AND DROP EXCEPT VOIDE
['player-creatures-zone', 'player-domains-zone'].forEach(zoneId => {
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
    let targetArr = zoneId === "player-creatures-zone" ? gameState.playerCreatures : gameState.playerDomains;
    moveCard(instanceId, gameState.playerHand, targetArr, {orientation: "vertical"});
    renderGameState();
    setupDropZones();
  };
});
   };

// DECK SELECTION FOR GAMEPLAY //
function showDeckSelectionMenu() {
  // Create/select modal
  const modal = document.getElementById('deck-selection-modal');
  modal.innerHTML = `
    <h3>Select a Deck</h3>
    <ul id="deck-list-modal">
      ${deckSlots.map(ds => `<li class="deck-slot-item" data-deck="${ds}">${ds}</li>`).join('')}
    </ul>
    <button id="cancel-deck-select">Cancel</button>
  `;
  modal.style.display = 'block';
  document.querySelectorAll('.deck-slot-item').forEach(el => {
    el.onclick = () => {
      currentDeckSlot = el.dataset.deck;
      saveDeckState();
      modal.style.display = 'none';
      // Now start the game with selected deck
      actuallyStartGame();
    };
  });
  document.getElementById('cancel-deck-select').onclick = () => {
    modal.style.display = 'none';
  }
}

// MOVE OBJECT
function moveCard(instanceId, fromArr, toArr, extra = {}) {
  const idx = fromArr.findIndex(card => card.instanceId === instanceId);
  if (idx !== -1) {
    let cardObj = { ...fromArr[idx], ...extra };

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
    const toField = fieldArrays.includes(toArr);

    // If moving OUT of field, remove currentHP & orientation so it resets next time
    if (!toField) {
      delete cardObj.currentHP;
      delete cardObj.orientation;
    }
    fromArr.splice(idx, 1);
    toArr.push(cardObj);
  }
  renderGameState();
  setupDropZones();
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
backToBuilderBtn.onclick = () => {
  showBuilder();
  elementsToHide.forEach(el => el.style.display = '');
  battlefield.style.display = 'none';
};

// Phase control events
nextPhaseBtn.onclick = () => {
  let idx = getCurrentPhaseIndex();
  idx = (idx + 1) % PHASES.length;
  gameState.turn = PHASES[idx].turn;
  gameState.phase = PHASES[idx].phase;
  if (gameState.phase === 'draw') drawCards(gameState.turn, 1);
  updatePhaseBar();
  renderGameState && renderGameState();
  setupDropZones();
};
phaseNameSpan.onclick = function() { nextPhaseBtn.click(); };

  // GALLERY EVENT FILTERS
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

// ==========================
// === INITIALIZATION ===
// ==========================
  loadDeckState();
  refreshDeckSlotSelect();
  updateDeckDisplay();
  renderGallery();
  updatePhaseBar();
  showBuilder();

// FILTER COLOR EVENTS
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

  // Deck toggle logic
  toggleBtn.onclick = () => {
    deckPanel.classList.toggle('show');
    document.body.classList.toggle('deck-open', deckPanel.classList.contains('show'));
  };
  window.addEventListener('click', (e) => {
    if (!deckPanel.contains(e.target) && e.target !== toggleBtn && deckPanel.classList.contains('show')) {
      deckPanel.classList.remove('show');
    }
  });

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

// Attach event listeners ONCE
deckActionsMenu.querySelector('#deck-draw-btn').onclick = function() {
  if (gameState.turn === "player" && gameState.playerDeck.length > 0) {
    drawCards("player", 1);
  }
};
deckActionsMenu.querySelector('#deck-shuffle-btn').onclick = function() {
  gameState.playerDeck = shuffle(gameState.playerDeck);
  renderGameState();
  setupDropZones();
};
deckActionsMenu.querySelector('#deck-search-btn').onclick = function() {
  if (gameState.playerDeck.length > 0) {
    openDeckSearchModal();
  }
};

// Actions in zones
var currentCardMenuState = null;

function showCardActionMenu(instanceId, zoneId, orientation, cardDiv) {
  const menu = document.getElementById('card-action-menu');
  currentCardMenuState = { instanceId, zoneId, orientation };
  // POSITION MENU NEAR CARD
  const rect = cardDiv.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY + 4}px`;
  menu.style.left = `${rect.left + window.scrollX}px`;
  menu.style.display = 'block';
}

// HIDE ALL MENUS
document.body.addEventListener('click', function(e) {
  const menu = document.getElementById('card-action-menu');
  if (menu && menu.style.display === "block") {
    menu.style.display = "none";
  }
});

// PREVENT MENUS FROM CLOSING WHEN CLICK INSIDE
document.getElementById('card-action-menu').onclick = function(e) {
  e.stopPropagation();
};
document.getElementById('card-action-set-hp').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
  let arr = getZoneArray(zoneId);
  if (arr) {
    let cardObj = arr.find(card => card.instanceId === instanceId);
    if (!cardObj) return;
    let newHp = prompt("Set HP (1-99):", cardObj.currentHP);
    let num = parseInt(newHp, 10);
    if (!isNaN(num) && num > 0 && num <= 99) {
      cardObj.currentHP = num;
      renderGameState();
    }
  }
  document.getElementById('card-action-menu').style.display = 'none';
};
document.getElementById('card-action-return-hand').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
  let arr = getZoneArray(zoneId);
  if (arr) {
    // Remove from the current zone and get the card object
    const idx = arr.findIndex(card => card.instanceId === instanceId);
    if (idx !== -1) {
      const [cardObj] = arr.splice(idx, 1);
      // Always clean stats before pushing into hand
      gameState.playerHand.push(cleanCard(cardObj));
    }
  }
  renderGameState();
  setupDropZones();
  document.getElementById('card-action-menu').style.display = 'none';
};

document.getElementById('card-action-orient').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
  let arr = getZoneArray(zoneId);
  if (arr) {
    for (let c of arr) {
      if (c.instanceId === instanceId) {
      c.orientation = (c.orientation === "horizontal") ? "vertical" : "horizontal";
      }
    }
  }
  renderGameState();
  setupDropZones();
  document.getElementById('card-action-menu').style.display = 'none';
};

document.getElementById('card-action-send-void').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
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
  document.getElementById('card-action-menu').style.display = 'none';
};

document.getElementById('card-action-send-deck').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
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
  document.getElementById('card-action-menu').style.display = 'none';
};

document.getElementById('card-action-view').onclick = function() {
  if (!currentCardMenuState) return;
  const { instanceId, zoneId } = currentCardMenuState;
  let arr = getZoneArray(zoneId);
  if (arr) {
    const cardObj = arr.find(card => card.instanceId === instanceId);
    if (cardObj) {
      showFullCardModal(cardObj);
    }
  }
  document.getElementById('card-action-menu').style.display = 'none';
};
// ==== VOID MODAL CARD MENU ====
function showVoidModal() {
  const modal = document.getElementById('void-modal');
  const list = document.getElementById('void-card-list');
  list.innerHTML = '';

  const voidCards = gameState.playerVoid;
  if (voidCards.length === 0) {
    list.innerHTML = '<div style="color:#999;">Void is empty.</div>';
  } else {
    list.style.display = 'grid';
    list.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
    list.style.gap = '1em';
    voidCards.forEach((cardObj, idx) => {
      const card = dummyCards.find(c => c.id === cardObj.cardId);
      if (!card) return;

      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.alignItems = 'center';

      const btn = document.createElement('button');
      btn.style.display = 'flex';
      btn.style.flexDirection = 'column';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'center';
      btn.style.width = "110px";
      btn.style.height = "170px";
      btn.style.padding = "6px";
      btn.style.background = "#444";
      btn.style.color = "#fff";
      btn.style.borderRadius = "10px";
      btn.style.border = "none";
      btn.style.cursor = "pointer";

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
      name.style.fontWeight = "bold";
      name.style.textAlign = "center";
      name.style.color = "#fff";

      btn.appendChild(img);
      btn.appendChild(name);

      btn.onclick = (e) => {
        e.stopPropagation();
        wrapper.querySelectorAll('.card-menu').forEach(m => m.remove());
        const buttons = [
          {
            text: "Return to Hand",
            onClick: function(e) {
              e.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerHand);
              showVoidModal();
              this.closest('.card-menu').remove();
            }
          },
          {
            text: "Return to Deck",
            onClick: function(e) {
              e.stopPropagation();
              moveCard(cardObj.instanceId, gameState.playerVoid, gameState.playerDeck);
              showVoidModal();
              this.closest('.card-menu').remove();
            }
          },
          {
            text: "View",
            onClick: function(e) {
              e.stopPropagation();
              showFullCardModal(cardObj);
              this.closest('.card-menu').remove();
            }
          }
        ];
        const menu = createCardMenu(buttons);
        menu.style.display = 'flex';

        wrapper.appendChild(menu);

        setTimeout(() => {
          document.body.addEventListener('click', function handler() {
            menu.remove();
            document.body.removeEventListener('click', handler);
          }, { once: true });
        }, 10);
      };

      wrapper.appendChild(btn);
      list.appendChild(wrapper);
    });
  }
  modal.style.display = 'block';
}
document.body.addEventListener('click', function(e) {
});
// Void Modal
const voidModal = document.getElementById('void-modal');
const voidModalContent = document.getElementById('void-modal-content');
voidModal.addEventListener('click', function(event) {
  // Only close if clicking directly on the overlay (not inside modal content)
  if (event.target === voidModal) {
    voidModal.style.display = 'none';
  }
});
// CLOSES VOID SEARCH
function closeVoidModal() {
  document.getElementById('void-modal').style.display = "none";
}
// Find the current phase index
function getCurrentPhaseIndex() {
  return PHASES.findIndex(
    p => p.turn === gameState.turn && p.phase === gameState.phase
  );
}
// Call this after any phase or turn change
updatePhaseBar();
