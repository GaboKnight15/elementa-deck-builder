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
// === RENDERING / UI ===
// ==========================
function getCardBgClass(card) {
  let colors = Array.isArray(card.color) ? card.color : [card.color];
  colors = colors.filter(Boolean).map(c => c.toLowerCase());
  if (colors.length === 1) return `card-bg-${colors[0]}`;
  if (colors.length === 2) return `card-bg-${colors[0]}-${colors[1]}`;
  return `card-bg-gold`;
}
// ==========================
// === RENDERING CARDS ===
// ==========================
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
