// CARD LIST //   
const dummyCards = [
{id: 'basicfairy', name: 'Fairy', rarity: 'Common', image: 'CardImages/BasicCreatures/Fairy.png', 
 category: 'creature', color: 'green', type: 'fairy', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Fairy', ability: 'flying', set: 'StandardPack'},
{id: 'basicgoblin', name: 'Goblin', rarity: 'Common', image: 'CardImages/BasicCreatures/Goblin.png', 
 category: 'creature', color: 'green', type: 'goblin', hp: 3, atk: 1, def: 0, cost: 0, archetype: 'Goblin', set: 'StandardPack'},
{id: 'basicemberling', name: 'Emberling', rarity: 'Common', image: 'CardImages/BasicCreatures/Emberling.png', 
 category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 0, cost: 0, archetype: 'Firelands', ability: 'burn', set: 'StandardPack'},
{id: 'basicfirepixie', name: 'Fire Pixie', rarity: 'Common', image: 'CardImages/BasicCreatures/FirePixie.png', 
 category: 'creature', color: 'red', type: 'fairy', hp: 3, atk: 2, def: 0, cost: 0, archetype: 'Firelands', ability: ['burn','flying'], set: 'StandardPack'},
{id: 'basichellcharger', name: 'Hellcharger', rarity: 'Common', image: 'CardImages/BasicCreatures/Hellcharger.png', 
 category: 'creature', color: 'red', type: 'warrior', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Firelands', ability: 'burn', set: 'StandardPack'},
{id: 'basicelementalblue', name: 'Water Elemental', rarity: 'Common', image: 'CardImages/BasicCreatures/WaterElemental.png', 
 category: 'creature', color: 'blue', type: 'elemental', hp: 5, atk: 2, def: 0, cost: {blue: 1}, archetype: 'Firelands', ability: ['dive','elusive','soak'], set: 'StandardPack'},
{id: 'basicwolfgray', name: 'Desert Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/DesertWolf.png', 
 category: 'creature', color: 'gray', type: 'beast', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Scorchlands', ability: 'burn', set: 'StandardPack'},
{id: 'basicgolemites', name: 'Golemites', rarity: 'Common', image: 'CardImages/BasicCreatures/Golemites.png', 
 category: 'creature', color: 'gray', type: 'elemental', hp: 3, atk: 2, def: 0, cost: 0, archetype: 'Golemheart', ability: 'burn', set: 'StandardPack'},
{id: 'basicwolfblack', name: 'Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/Wolf.png', 
 category: 'creature', color: 'black', type: 'beast', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Moonfang', ability: 'ambush', set: 'StandardPack'},
{id: 'basicskeleton', name: 'Skeleton', rarity: 'Common', image: 'CardImages/BasicCreatures/Skeleton.png', category: 'creature', color: 'black', type: 'undead', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe', set: 'StandardPack'},
{id: 'basicbat', name: 'Bat', rarity: 'Common', image: 'CardImages/BasicCreatures/Bat.png', 
 category: 'creature', color: 'black', type: 'vampire', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Vampiric', ability: ['drain','flying'], set: 'StandardPack'},
{id: 'basicimp', name: 'Imp', rarity: 'Common', image: 'CardImages/BasicCreatures/Imp.png', 
 category: 'creature', color: 'black', trait: 'champion', type: 'demon', hp: 1, atk: 1, def: 0, cost: { red: 2 }, essence: {black: 1}, archetype: 'Skullframe', ability: ['ambush','flying'], set: 'StandardPack'},
{id: 'basicvampire', name: 'Vampire', rarity: 'Rare', image: 'CardImages/BasicCreatures/Vampire.png', 
 category: 'creature', color: 'black', type: 'demon', hp: 3, atk: 2, def: 0, cost: {colorless: 1, black: 1}, archetype: 'Vampiric', ability: ['drain','flying'], set: 'StandardPack'},

{id: 'cindercore1', name: 'Cindercore Golem', rarity: 'Rare', image: 'CardImages/Cindercore/Cindercore Golem.png', 
 category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: ['Cindercore','Golemheart'], ability: 'burn', set: 'StandardPack'},
{id: 'cindercore2', name: 'Cindercore Sentry', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Sentry.png', 
 category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'cindercore3', name: 'Cindercore Protector', rarity: 'Rare', image: 'CardImages/Cindercore/Cindercore Protector.png', 
 category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'cindercore4', name: 'Cindercore Vanguard', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Vanguard.png', 
 category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'cindercore5', name: 'Ignavaryn, Cindercore Automaton', rarity: 'Legendary', image: 'CardImages/Cindercore/Ignavaryn, Cindercore Automaton.png', 
 category: 'creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},

{id: 'firelands1', name: 'Firelands Scamperling', rarity: 'Common', image: 'CardImages/Firelands/Firelands Scamperling.png', 
 category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush'], set: 'StandardPack'},
{id: 'firelands2', name: 'Firelands Cindercub', rarity: 'Common', image: 'CardImages/Firelands/Firelands Cindercub.png', 
 category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush'], set: 'StandardPack'},
{id: 'firelands3', name: 'Firelands Lynx', rarity: 'Common', image: 'CardImages/Firelands/Firelands Lynx.png', 
 category: 'creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','leap','rush'], set: 'StandardPack'},
{id: 'firelands4', name: 'Firelands Kitsune', rarity: 'Common', image: 'CardImages/Firelands/Firelands Kitsune.png', 
 category: 'creature', color: 'red', type: 'beast', hp: 4, atk: 3, def: 0, cost: {colorless: 1, red: 1}, archetype: 'Firelands', ability: ['burn','leap','rush'], set: 'StandardPack'},
{id: 'firelands5', name: 'Firelands Direbeast', rarity: 'Rare', image: 'CardImages/Firelands/Firelands Direbeast.png', 
 category: 'creature', color: 'red', type: 'beast', hp: 9, atk: 5, def: 2, cost: {colorless: 4, red: 1}, archetype: 'Firelands', ability: ['burn','rush'], set: 'StandardPack'},
{id: 'firelands6', name: 'Firelands Hellhound', rarity: 'Rare', image: 'CardImages/Firelands/Firelands Hellhound.png', 
 category: 'creature', color: ['red','black'], type: ['beast','demon'], hp: 7, atk: 5, def: 1, cost: {colorless: 2, red: 1}, archetype: 'Firelands', ability: ['burn','leap','rush'], set: 'StandardPack'},
{id: 'firelands7', name: 'Firelands Hellmaw', rarity: 'Epic', image: 'CardImages/Firelands/Firelands Hellmaw.png', 
 category: 'creature', color: ['red','black'], type: ['dragon','demon'], hp: 8, atk: 6, def: 1, cost: {colorless: 2, red: 1, black: 1}, archetype: 'Firelands', ability: ['burn','flying','rush']},
{id: 'firelands8', name: 'Ephoros, Firelands Behemoth', rarity: 'Legendary', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth.png', 
 category: 'creature', color: ['red','black'], type: ['beast','demon'], hp: 13, atk: 9, def: 3, cost: {colorless: 5, red: 1, black: 1}, archetype: 'Firelands', ability: ['burn','crush','intimidate'], set: 'StandardPack'},
{id: 'firelands8a', name: 'Ephoros, Firelands Behemoth', rarity: 'Legendary', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth FA.png', 
 category: 'creature', color: ['red','black'], type: ['beast','demon'], hp: 13, atk: 9, def: 3, cost: {colorless: 5, red: 1, black: 1}, archetype: 'Firelands', ability: ['burn','crush','intimidate'], set: 'StandardPack'},

{id: 'golem1', name: 'Pyrokrag, Golemheart Titan', rarity: 'Legendary', image: 'CardImages/Golems/Pyrokrag, Golemheart Titan.png', 
 category: 'creature', color: ['red', 'gray'], type: ['fusion','elemental'], hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart', ability: 'burn', set: 'StandardPack'},
{id: 'golem2', name: 'Golemheart Giant', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Giant.png', 
 category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart', ability: 'burn', set: 'StandardPack'},
{id: 'golem3', name: 'Smoldering Golemheart', rarity: 'Rare', image: 'CardImages/Golems/Smoldering Golemheart .png', 
 category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart', ability: 'burn', set: 'StandardPack'},
{id: 'golem4', name: 'Golemheart Sentinel', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Sentinel.png', 
 category: 'creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Golemheart', ability: 'protect', set: 'StandardPack'},
{id: 'golem6', name: 'Fire Golem', rarity: 'Common', image: 'CardImages/Golems/Fire Golem.png', 
 category: 'creature', color: ['red', 'gray'], type: ['elemental','golem'], hp: 3, atk: 2, def: 1, cost: 2, archetype: ['Firelands','Golemheart'], ability: 'burn', set: 'StandardPack'},
{id: 'golem7', name: 'Kaelgorran, Elemental Primordial', rarity: 'Legendary', image: 'CardImages/Golems/Kaelgorran, Elemental Primordial.png', 
 category: 'creature', color: ['green','red', 'gray'], type: ['elemental','golem'], hp: 3, atk: 2, def: 1, cost: 2, archetype: ['Firelands','Golemheart'], ability: 'burn', set: 'StandardPack'},
{id: 'golem8', name: 'Acidic Golem', rarity: 'Common', image: 'CardImages/Golems/Acidic Golem.png', 
 category: 'creature', color: ['purple', 'gray'], type: ['elemental','golem'], hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Golemheart', ability: 'toxic', set: 'StandardPack'},

{id: 'coralbound1', name: 'Coralbound Sentry', rarity: 'Common', image: 'CardImages/Coralbound/Coralbound Sentry.png', 
 category: 'creature', color: 'blue', type: 'construct', hp: 4, atk: 2, def: 1, cost: {blue: 1}, archetype: 'Coralbound', ability: '', set: 'StandardPack'},
{id: 'coralbound2', name: 'Coralbound Protector', rarity: 'Rare', image: 'CardImages/Coralbound/Coralbound Protector.png', 
 category: 'creature', color: 'blue', type: 'construct', hp: 10, atk: 3, def: 2, cost: {colorless: 3, blue: 1}, archetype: 'Coralbound', ability: ['protect','lifelink'], set: 'StandardPack'},
{id: 'coralbound3', name: 'Coralbound Vanguard', rarity: 'Rare', image: 'CardImages/Coralbound/Coralbound Vanguard.png', 
 category: 'creature', color: 'blue', type: 'construct', hp: 6, atk: 3, def: 1, cost: {colorless: 1, blue: 1}, archetype: 'Coralbound', ability: 'rush', set: 'StandardPack'},
{id: 'coralbound4a', name: 'Maelvyrn, Coralbound Automaton', rarity: 'Legendary', image: 'CardImages/Coralbound/Maelvyrn, Coralbound Automaton.png', 
 category: 'creature', color: 'blue', type: 'construct', hp: 20, atk: 8, def: 5, cost: {colorless: 6, blue: 2}, archetype: 'Coralbound', ability: 'protect', set: 'StandardPack'},

{id: 'glimmerscale4', name: 'Wyrm of Thorns and Sunfire', rarity: 'Rare', image: 'CardImages/Glimmerwings/Wyrm of Thorns and Sunfire.png', category: 'creature', color: ['green', 'red', 'white'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, ability: ['intimidate','flying'], set: 'StandardPack'},

{id: 'skullframe01', name: 'Skullframe Defector', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Defector.png', 
 category: 'creature', color: 'black', type: 'undead', hp: 3, atk: 2, def: 1, cost: 1, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'skullframe02', name: 'Skullframe Unyielding', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Unyielding.png', 
 category: 'creature', color: 'black', type: 'undead', hp: 4, atk: 1, def: 0, cost: 2, archetype: 'Skullframe', ability: 'rush', set: 'StandardPack'},
{id: 'skullframe03', name: 'Skullframe Acolyte', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Acolyte.png', 
 category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 5, atk: 3, def: 1, cost: 3, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'skullframe04', name: 'Skullframe Cryptwinds', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Cryptwinds.png', 
 category: 'creature', color: ['black', 'purple'], type: ['dragon','undead'], hp: 12, atk: 6, def: 2, cost: 5, archetype: 'Skullframe', ability: 'flying', set: 'StandardPack'},
{id: 'skullframe05', name: 'Skullframe Spectral Dragon', rarity: 'Epic', image: 'CardImages/Skullframe/Skullframe Spectral Dragon.png', 
 category: 'creature', color: ['black', 'purple'], type: ['dragon','undead'], hp: 12, atk: 6, def: 2, cost: 5, archetype: 'Skullframe', ability: 'flying', set: 'StandardPack'},
{id: 'skullframe06', name: 'Skullframe Armored Dragon', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Armored Dragon.png', 
 category: 'creature', color: ['black', 'purple'], type: ['dragon','undead'], hp: 12, atk: 6, def: 2, cost: 5, archetype: 'Skullframe', ability: 'flying', set: 'StandardPack'},
{id: 'skullframe07', name: 'Skullframe Hexmistress', rarity: 'Epic', image: 'CardImages/Skullframe/Skullframe Hexmistress.png', 
 category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 6, atk: 4, def: 1, cost: 3, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'skullframe08', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage.png', 
 category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 8, atk: 4, def: 1, cost: 3, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'skullframe08a', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage FA.png', 
 category: 'creature', color: ['black', 'purple'], type: 'undead', hp: 8, atk: 4, def: 1, cost: 3, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'spell014', name: 'Soulhexing', rarity: 'Common', image: 'CardImages/Skullframe/Soulhexing.png', 
 category: 'spell', color: 'black', type: 'spell', cost: 3, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'spell015', name: 'Witherwake', rarity: 'Common', image: 'CardImages/Skullframe/Witherwake.png', 
 category: 'spell', color: ['black','purple'], type: 'spell', cost: 2, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},

{id: 'frostlands01', name: 'Frostlands Dragon', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Dragon.png', 
 category: 'creature', color: ['blue', 'gray'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, archetype: 'Frostlands', ability: ['Ice Armor','flying'], set: 'StandardPack'},
{id: 'frostlands02', name: 'Frostlands Wyrm', rarity: 'common', image: 'CardImages/Frostlands/Frostlands Wyrm.png', 
 category: 'creature', color: ['blue', 'gray'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, archetype: 'Frostlands', ability: ['Ice Armor','flying'], set: 'StandardPack'},
{id: 'frostlands03', name: 'Frostlands Golem', rarity: 'Common', image: 'CardImages/Frostlands/Frostlands Golem.png', 
 category: 'creature', color: ['blue', 'gray'], type: 'elemental', hp: 9, atk: 5, def: 2, cost: 3, archetype: 'Frostlands', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'frostlands04', name: 'Frostlands Phoenix', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Phoenix.png', 
 category: 'creature', color: ['blue', 'gray'], type: 'avian', hp: 9, atk: 5, def: 2, cost: 3, archetype: 'Frostlands', ability: ['Ice Armor','flying'], set: 'StandardPack'},
{id: 'frostlands05', name: 'Frostlands Runeforged Automaton', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Runeforged Automaton.png', 
 category: 'creature', color: ['blue', 'gray'], type: 'construct', hp: 9, atk: 5, def: 2, cost: 3, archetype: 'Frostlands', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'frostlands06', name: 'Frostlands Runeforged Titan', rarity: 'Epic', image: 'CardImages/Frostlands/Frostlands Runeforged Titan.png', 
 category: 'creature', color: ['blue', 'gray'], type: 'construct', hp: 9, atk: 5, def: 2, cost: 3, archetype: 'Frostlands', ability: ['Ice Armor','crush'], set: 'StandardPack'},
{id: 'frostlands07', name: 'Eirawen, Frostlands Queen', rarity: 'Legendary', image: 'CardImages/Frostlands/Eirawen, Frostlands Queen.png', 
 category: 'creature', color: ['blue', 'gray'], type: ['mage','champion'], hp: 11, atk: 1, def: 0, cost: 3, archetype: 'Frostlands', ability: ['Ice Armor','flying'], set: 'StandardPack'},

{id: 'artifact005', name: 'Golemheart infusor', rarity: 'Common', image: 'CardImages/Artifacts/Golemheart Infusor.png', 
 category: 'artifact', color: 'gray', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'Golemheart', ability: 'burn', set: 'StandardPack'},
{id: 'artifact006', name: 'Heartwood Emeralds', rarity: 'Common', image: 'CardImages/Artifacts/Heartwood Emeralds.png', 
 category: 'artifact', color: 'green', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'Heartwood', ability: 'burn', set: 'StandardPack'},
{id: 'artifact007', name: 'Cindercore Ember', rarity: 'Common', image: 'CardImages/Artifacts/Cindercore Ember.png', 
 category: 'artifact', color: 'red', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'artifact008', name: 'Tidecallers Pearl', rarity: 'Common', image: 'CardImages/Artifacts/Tidecallers Pearl.png', 
 category: 'artifact', color: 'blue', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'coralbound', ability: 'burn', set: 'StandardPack'},
{id: 'artifact009', name: 'Stormcore Dynamo', rarity: 'Common', image: 'CardImages/Artifacts/Stormcore Dynamo.png', 
 category: 'artifact', color: 'yellow', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore', ability: 'burn', set: 'StandardPack'},
{id: 'artifact010', name: 'Plague Thorn Talisman', rarity: 'Common', image: 'CardImages/Artifacts/Plague Thorn Talisman.png', 
 category: 'artifact', color: 'purple', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore', ability: 'burn', set: 'StandardPack'},
{id: 'artifact011', name: 'Titans Anvil', rarity: 'Common', image: 'CardImages/Artifacts/Titans Anvil.png', 
 category: 'artifact', color: 'gray', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore', ability: 'burn', set: 'StandardPack'},
{id: 'artifact012', name: 'Veil of the Forgotten', rarity: 'Common', image: 'CardImages/Artifacts/Veil of the Forgotten.png', 
 category: 'artifact', color: 'black', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore', ability: 'burn', set: 'StandardPack'},
{id: 'artifact013', name: 'Lumen Spire', rarity: 'Common', image: 'CardImages/Artifacts/Lumen Spire.png', 
 category: 'artifact', color: 'white', type: ['artifact','relic'], hp: 5, cost: 1, archetype: 'stormcore', ability: 'burn', set: 'StandardPack'},

{id: 'spell010', name: 'Life Growth', rarity: 'Common', image: 'CardImages/Spells/Life Growth.png', 
 category: 'spell', color: 'green', type: 'spell', cost: 1, ability: 'burn', set: 'StandardPack'},
{id: 'basicspell1', name: 'Essence Surge', rarity: 'basic', image: 'CardImages/Spells/Essence Surge.png', 
 category: 'spell', color: 'green', type: 'spell', cost: 2, ability: 'burn', set: 'StandardPack'},
{id: 'basicspell2', name: 'Essence Assault', rarity: 'basic', image: 'CardImages/Spells/Essence Assault.png', 
 category: 'spell', color: 'red', type: 'spell', cost: 2, ability: 'burn', set: 'StandardPack'},
{id: 'basicspell3', name: 'Essence Rift', rarity: 'basic', image: 'CardImages/Spells/Essence Rift.png', 
 category: 'spell', color: 'blue', type: 'spell', cost: 2, ability: 'burn', set: 'StandardPack'},
{id: 'basicspell4', name: 'Essence Bolt', rarity: 'basic', image: 'CardImages/Spells/Essence Bolt.png', 
 category: 'spell', color: 'yellow', type: 'spell', cost: 2, ability: 'burn', set: 'StandardPack'},
{id: 'basicspell5', name: 'Essence Break', rarity: 'basic', image: 'CardImages/Spells/Essence Break.png', 
 category: 'spell', color: 'purple', type: 'spell', cost: 4, ability: 'burn', set: 'StandardPack'},
{id: 'basicspell6', name: 'Essence Barrier', rarity: 'basic', image: 'CardImages/Spells/Essence Barrier.png', 
 category: 'spell', color: 'gray', type: 'spell', cost: 1, ability: 'burn', set: 'StandardPack'},
{id: 'basicspell7', name: 'Essence Purge', rarity: 'basic', image: 'CardImages/Spells/Essence Purge.png', 
 category: 'spell', color: 'black', type: 'spell', cost: 4, ability: 'burn', set: 'StandardPack'},
{id: 'basicspell8', name: 'Essence Blessing', rarity: 'basic', image: 'CardImages/Spells/Essence Blessing.png', 
 category: 'spell', color: 'white', type: 'spell', cost: 1, ability: 'burn', set: 'StandardPack'},

{id: 'basicforest', name: 'Forest', rarity: 'Common', image: 'CardImages/Domains/Green Basic Location.png', 
 category: 'domain', color: 'green', type: 'terrain', hp: 5, cost: { red: 2 }, essence: {green: 1}, set: 'StandardPack2'},
{id: 'basicvolcano', name: 'Volcano', rarity: 'Common', image: 'CardImages/Domains/Red Basic Location.png', 
 category: 'domain', color: 'red', type: 'terrain', hp: 5, cost: { red: 2 }, essence: {red: 1}, set: 'StandardPack2'},
{id: 'basicocean', name: 'Ocean', rarity: 'Common', image: 'CardImages/Domains/Blue Basic Location.png', 
 category: 'domain', color: 'blue', type: 'terrain', hp: 5, cost: { red: 1, green: 1, colorless: 3 }, essence: {blue: 1}, set: 'StandardPack2'},
{id: 'basicmountain', name: 'Mountain', rarity: 'Common', image: 'CardImages/Domains/Gray Basic Location.png', 
 category: 'domain', color: 'gray', type: 'terrain', hp: 5, cost: { red: 2 }, essence: {gray: 1}, set: 'StandardPack2', artwork: "CardImages/Artworks/Mountain.png"},
{id: 'basicswamp', name: 'Swamp', rarity: 'Common', image: 'CardImages/Domains/Purple Basic Location.png', 
 category: 'domain', color: 'purple', type: 'terrain', hp: 5, cost: { colorless: 2 }, essence: {purple: 1}, set: 'StandardPack2'},
{id: 'basicpeaks', name: 'Peaks', rarity: 'Common', image: 'CardImages/Domains/Yellow Basic Location.png', 
 category: 'domain', color: 'yellow', type: 'terrain', hp: 5, cost: { colorless: 2 }, essence: {yellow: 1}, set: 'StandardPack2'},
{id: 'basicplains', name: 'Plains', rarity: 'Common', image: 'CardImages/Domains/White Basic Location.png', 
 category: 'domain', color: 'white', type: 'terrain', hp: 5, cost: { colorless: 2 }, essence: {white: 1}, set: 'StandardPack2'},
{id: 'basicshadowforest', name: 'Shadow Forest', rarity: 'Common', image: 'CardImages/Domains/Black Basic Location.png', 
 category: 'domain', color: 'black', type: 'terrain', hp: 5, cost: { red: 1, green: 1, colorless: 3 }, essence: {black: 1}, set: 'StandardPack2'},
{id: 'maindomain1', name: 'Verdara', rarity: 'Legendary', image: 'CardImages/Domains/Green Domain.png', 
 category: 'domain', color: 'green', type: 'maindomain', hp: 20, cost: 0, essence: {green: 1}, set: 'StandardPack2'},
{id: 'maindomain2', name: 'Ashkar', rarity: 'Legendary', image: 'CardImages/Domains/Red Domain.png', 
 category: 'domain', color: 'red', type: 'maindomain', hp: 20, cost: 0, essence: {red: 1}, set: 'StandardPack2'},
{id: 'maindomain3', name: 'Marinthae', rarity: 'Legendary', image: 'CardImages/Domains/Blue Domain.png', 
 category: 'domain', color: 'blue', type: 'maindomain', hp: 20, cost: 0, essence: {blue: 1}, set: 'StandardPack2'},
{id: 'maindomain4', name: 'Aetherion', rarity: 'Legendary', image: 'CardImages/Domains/Yellow Domain.png', 
 category: 'domain', color: 'yellow', type: 'maindomain', hp: 20, cost: 0, essence: {yellow: 1}, set: 'StandardPack2'},
{id: 'maindomain5', name: 'Virkul', rarity: 'Legendary', image: 'CardImages/Domains/Purple Domain.png', 
 category: 'domain', color: 'purple', type: 'maindomain', hp: 20, cost: 0, essence: {purple: 1}, set: 'StandardPack2'},
{id: 'maindomain6', name: 'Drakzul', rarity: 'Legendary', image: 'CardImages/Domains/Gray Domain.png', 
 category: 'domain', color: 'gray', type: 'maindomain', hp: 20, cost: 0, essence: {gray: 1}, set: 'StandardPack2', artwork: "CardImages/Artworks/Mountain.png"},
{id: 'maindomain7', name: 'Solmara', rarity: 'Legendary', image: 'CardImages/Domains/White Domain.png', 
 category: 'domain', color: 'white', type: 'maindomain', hp: 20, cost: 0, essence: {white: 1}, set: 'StandardPack2'},
{id: 'maindomain8', name: 'Nocthyra', rarity: 'Legendary', image: 'CardImages/Domains/Black Domain.png', 
 category: 'domain', color: 'black', type: 'maindomain', hp: 20, cost: 0, essence: {black: 1}, set: 'StandardPack2'},
];

const addCoinsBtn = document.getElementById('add-coins-btn');

// --- CURRENCY DISPLAY ---
function updateCurrencyDisplay() {
  const el = document.getElementById('currency-amount');
  if (el) el.textContent = window.playerCurrency;
  const shopEl = document.getElementById('shop-currency-amount');
  if (shopEl) shopEl.textContent = window.playerCurrency;
}
// ==========================
// === SECTION NAVIGATION ===
// ==========================

// HOME SCREEN
document.querySelectorAll('.home-menu-btn').forEach(btn => {
  btn.onclick = function() {
    // Simulate click on main nav or call your navigation function
    const section = btn.getAttribute('data-section');
    // Hide all sections
    document.querySelectorAll('section[id$="-section"]').forEach(sectionEl => {
      sectionEl.classList.remove('section-active','active');
    });
    // Show the target section
    document.getElementById(section).classList.add('section-active');
    // Optionally call the special action if needed (copy from your shared.js)
    const specialActions = {
      'home-section' : function() {},
      'gallery-section' : window.renderGallery,
      'builder-section' : window.showDeckSelection,
      'gameplay-section': function() {
        document.querySelectorAll('section[id$="-section"]').forEach(sectionEl => {
          sectionEl.classList.remove('active');
        });
        document.getElementById('mode-select-section').classList.add('active');
      },
      'shop-section'    : window.renderShop
    };
    if (typeof specialActions[section] === 'function') {
      specialActions[section]();
    }
  };
});
document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('section-active', 'active'));
document.getElementById('home-section').classList.add('section-active');

if (typeof window.renderGallery === 'function') {
  window.renderGallery(); // keep if you want to pre-render gallery cards in the background; remove if not needed
}

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
// LOADING SCREEN
function showLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.style.display = 'flex';
}
function hideLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.style.display = 'none';
}
// VIEW CARDS
function showFullCardModal(cardObj) {
  const card = dummyCards.find(c => c.id === (cardObj.cardId || cardObj.id));
  if (!card) return;
  const collection = getCollection();
  const owned = collection[card.id] || 0;

  const modal = document.getElementById('image-modal');
  const modalContent = document.getElementById('modal-img-content');
  if (!modalContent) return;

  // Format cost display nicely
  function formatCost(cost) {
    if (cost === undefined || cost === null || cost === "" || cost === 0) return "0";
    if (typeof cost === "number") return cost.toString();
    if (typeof cost === "object") {
      let arr = [];
      for (let color in cost) {
        if (!cost.hasOwnProperty(color)) continue;
        arr.push(`<span class="cost-color cost-${color}">${cost[color]} <span>${color}</span></span>`);
      }
      return arr.join(" ");
    }
    return cost.toString();
  }

  // Info rows
  function labeled(label, value) {
    if (!value && value !== 0) return '';
    return `<div class="full-card-info-row"><span class="full-card-info-label">${label}:</span> <span>${value}</span></div>`;
  }

  // Compose info HTML
  let infoHtml = '';
  infoHtml += `<div class="full-card-info-title">${card.name}</div>`;
  infoHtml += labeled("Category", card.category);
  infoHtml += labeled("Rarity", card.rarity);
  infoHtml += labeled("Archetype", Array.isArray(card.archetype) ? card.archetype.join(", ") : card.archetype);
  infoHtml += labeled("Type", Array.isArray(card.type) ? card.type.join(", ") : card.type);
  infoHtml += labeled("Ability", Array.isArray(card.ability) ? card.ability.join(", ") : card.ability);

  let statsRow = '';
  if (card.hp !== undefined || card.atk !== undefined || card.def !== undefined || card.cost !== undefined) {
    statsRow = '<div class="full-card-info-row">' +
      (card.hp !== undefined ? `<span class="full-card-info-label">HP:</span> <span>${card.hp}</span> ` : '') +
      (card.atk !== undefined ? `<span class="full-card-info-label">ATK:</span> <span>${card.atk}</span> ` : '') +
      (card.def !== undefined ? `<span class="full-card-info-label">DEF:</span> <span>${card.def}</span> ` : '') +
      (card.cost !== undefined ? `<span class="full-card-info-label">Cost:</span> <span>${formatCost(card.cost)}</span>` : '') +
      '</div>';
  }

  let textHtml = '';
  if (card.text) {
    textHtml = `<div class="full-card-info-section" style="font-size:1.08em;color:#ffe066;margin-top:10px;">${card.text}</div>`;
  }

  // Compose modal content (side-by-side)
  modalContent.innerHTML = `
    <div class="full-card-modal-flex">
      <div class="full-card-image-container">
        <img src="${card.image}" alt="${card.name}" class="full-card-modal-img ${owned === 0 ? 'card-image-locked' : ''}">
      </div>
      <div class="full-card-info-panel">
        ${infoHtml}
        ${statsRow}
        ${textHtml}
      </div>
    </div>
  `;

  modal.style.display = 'flex';
}
// IMAGE MODAL CLOSE
document.getElementById('image-modal').onclick = (e) => {
  if (e.target.id === 'image-modal') {
    document.getElementById('image-modal').style.display = "none";
  }
};
const COLLECTION_KEY = "cardCollection";
const NEW_CARD_KEY = "newlyUnlockedCards";

function getNewlyUnlockedCards() {
  return JSON.parse(localStorage.getItem(NEW_CARD_KEY)) || [];
}

function setNewlyUnlockedCards(arr) {
  localStorage.setItem(NEW_CARD_KEY, JSON.stringify(arr));
}

// FIREBASE GALLERY
function setCollection(collection) {
  playerCollection = collection;
  saveProgress();
}
function getCollection() {
  return playerCollection || {};
}
function updateCollectionDependentUI() {
  if (typeof renderGallery === "function") renderGallery();
  // Add other UI updates that depend on collection here if needed
}

// ADD CARDS TO COLLECTION 
function addToCollection(cardId, amount = 1) {
  const collection = getCollection();
  const wasOwned = collection[cardId] > 0;
  collection[cardId] = (collection[cardId] || 0) + amount;
  saveProgress();

  // If just unlocked, mark as new
  if (!wasOwned && collection[cardId] > 0) {
    const newCards = getNewlyUnlockedCards();
    if (!newCards.includes(cardId)) {
      newCards.push(cardId);
      setNewlyUnlockedCards(newCards);
    }
  }

  // --- Green Card Quest ---
  const newlyAddedCard = dummyCards.find(c => c.id === cardId);
  if (newlyAddedCard) {
    const cardColors = Array.isArray(newlyAddedCard.color) ? newlyAddedCard.color : [newlyAddedCard.color];
    getActiveQuests(function(quests) {
      for (const quest of quests) {
        for (const color of COLOR_QUESTS) {
          if (
            quest.id && quest.id.includes(`${color}_card`) &&
            cardColors.includes(color)
          ) {
            incrementQuestProgress(quest.id);
          }
        }
      }
    });
  }

  // --- Unique Card Quest ---
  if (!wasOwned && collection[cardId] > 0) {
    getActiveQuests(function(quests) {
      for (const quest of quests) {
        if (quest.id && quest.id.includes('unique_card')) {
          incrementQuestProgress(quest.id);
        }
      }
    });
  }
  // Update color achievements (generalized)
  if (typeof updateColorAchievements === 'function') {updateColorAchievements();}
  // Update unique cards achievement
  if (typeof updateUniqueCardsAchievement === 'function') {updateUniqueCardsAchievement();}
}

function addCoins(amount) {
  window.playerCurrency += amount;
  saveProgress();
  updateCurrencyDisplay();
}
if (addCoinsBtn) {
  addCoinsBtn.onclick = function() {
    addCoins(100);
  };
}
// ESSENCE CURRENCY
function getEssence() { return playerEssence; }
function setEssence(amount) {
  playerEssence = amount;
  updateEssenceDisplay();
  saveProgress();
}
function updateEssenceDisplay() {
  const el = document.getElementById('essence-amount');
  if (el) el.textContent = playerEssence;
  const galleryEl = document.getElementById('gallery-essence-amount');
  if (galleryEl) galleryEl.textContent = playerEssence;
}

function setCurrency(amount) {
  playerCurrency = amount;
  updateCurrencyDisplay();
  saveProgress();
}
function getCurrency() {
  return playerCurrency;
}

// NOTIFICATIONS
function showToast(message, options = {}) {
  // Options: { duration: ms, type: 'success'|'error'|'info' }
  const duration = options.duration || 2500;
  const type = options.type || 'info';

  // Create toast container if not exists
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '24px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.zIndex = '99999';
    document.body.appendChild(container);
  }

  // Create toast message
  const toast = document.createElement('div');
  toast.className = 'toast-message ' + type;
  toast.textContent = message;

  // Styles
  toast.style.background = type === 'success' ? '#3cb371'
    : type === 'error' ? '#e74c3c'
    : '#222b3b';
  toast.style.color = '#fff';
  toast.style.padding = '12px 32px';
  toast.style.margin = '6px 0';
  toast.style.borderRadius = '8px';
  toast.style.fontSize = '1.05em';
  toast.style.boxShadow = '0 2px 8px #0006';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s';

  // Mount and animate
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; }, 30);

  // Remove after duration
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// --- FRIEND INVITE SYSTEM WITH FIRESTORE ---

// Utility: get current user info
function getCurrentUserId() {
  return firebase.auth().currentUser?.uid;
}
function getCurrentUsername() {
  return firebase.auth().currentUser?.displayName; // or store in Firestore
}

// Look up a user by username (returns {uid, username} or null)
function findUserByUsername(username, cb) {
  if (!username) {
    if (typeof cb === "function") cb(null);
    return;
  }
  firebase.firestore().collection('users')
    .where('username', '==', username).limit(1).get()
    .then(function(snap) {
      if (snap.empty) {
        if (typeof cb === "function") cb(null);
        return;
      }
      const doc = snap.docs[0];
      if (typeof cb === "function") cb({ uid: doc.id, ...doc.data() });
    });
}

// Send a friend request by username
function sendFriendRequest(username) {
  if (!username) return;
  const currentUid = getCurrentUserId();
  const currentUsername = getCurrentUsername();
  if (!currentUid || !currentUsername) {
    showToast("You must be logged in!");
    return;
  }
  findUserByUsername(username, function(user) {
    if (!user) {
      showToast("No user found with that username.");
      return;
    }
    if (user.uid === currentUid) {
      showToast("You can't add yourself!");
      return;
    }
    // Fetch their existing requests
    const ref = firebase.firestore().collection('users').doc(user.uid);
    ref.get().then(function(doc) {
      const requests = doc.data()?.friendRequests || [];
      // Prevent duplicate requests
      if (requests.some(r => r.fromUid === currentUid)) {
        showToast("Request already sent!");
        return;
      }
      // Add request
      requests.push({ fromUid: currentUid, fromUsername: currentUsername });
      ref.set({ friendRequests: requests }, { merge: true }).then(function() {
        showToast("Friend request sent!");
      });
    });
  });
}

// Accept a friend request
function acceptFriendRequest(fromUid, fromUsername) {
  const currentUid = getCurrentUserId();
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(function(doc) {
    let requests = doc.data()?.friendRequests || [];
    // Remove from requests
    requests = requests.filter(r => r.fromUid !== fromUid);
    // Add to friends
    let friends = doc.data()?.friends || [];
    if (!friends.includes(fromUid)) friends.push(fromUid);
    userRef.set({ friends, friendRequests: requests }, { merge: true }).then(function() {
      // Also add you to their friends
      const theirRef = firebase.firestore().collection('users').doc(fromUid);
      theirRef.get().then(function(theirDoc) {
        let theirFriends = theirDoc.data()?.friends || [];
        if (!theirFriends.includes(currentUid)) theirFriends.push(currentUid);
        theirRef.set({ friends: theirFriends }, { merge: true }).then(function() {
          showToast(`You and ${fromUsername} are now friends!`);
          renderFriendNotifications();
          renderFriendsList();
        });
      });
    });
  });
}

// Decline a friend request
function declineFriendRequest(fromUid) {
  const currentUid = getCurrentUserId();
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(function(doc) {
    let requests = doc.data()?.friendRequests || [];
    requests = requests.filter(r => r.fromUid !== fromUid);
    userRef.set({ friendRequests: requests }, { merge: true }).then(function() {
      renderFriendNotifications();
      renderFriendsList();
    });
  });
}

// Show a red dot if there are pending requests
function renderFriendNotifications() {
  const currentUid = getCurrentUserId();
  if (!currentUid) return;
  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const requests = doc.data()?.friendRequests || [];
    const dot = document.getElementById('friends-notification-dot');
    if (dot) dot.style.display = requests.length > 0 ? 'block' : 'none';
  });
}

// Render pending requests in friend modal
function renderFriendsList() {
  const modal = document.getElementById('friends-modal');
  const list = document.getElementById('friends-list');
  list.innerHTML = '<div>Loading...</div>';
  const currentUid = getCurrentUserId();
  if (!currentUid) {
    list.innerHTML = "<div>Please log in.</div>";
    return;
  }
  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const ids = doc.data()?.friends || [];
    const requests = doc.data()?.friendRequests || [];
    // Pending requests section
    if (requests.length) {
      const pendingDiv = document.createElement('div');
      pendingDiv.innerHTML = `<b>Friend Requests:</b>`;
      requests.forEach(r => {
        const entry = document.createElement('div');
        entry.className = 'friend-request-entry';
        entry.innerHTML = `
          <span>${r.fromUsername}</span>
          <button onclick="acceptFriendRequest('${r.fromUid}', '${r.fromUsername}')">Accept</button>
          <button onclick="declineFriendRequest('${r.fromUid}')">Decline</button>
        `;
        pendingDiv.appendChild(entry);
      });
      list.appendChild(pendingDiv);
    }
    // Friends section
    if (!ids.length) {
      list.innerHTML += '<div>No friends yet. Add someone by username!</div>';
      return;
    }
    ids.forEach(fid => {
      const entry = document.createElement('div');
      entry.className = 'friend-entry';
      entry.innerHTML = `
        <span>${fid}</span>
        <button onclick="viewFriendProfile('${fid}')">View</button>
        <button onclick="removeFriend('${fid}')">Remove</button>
      `;
      list.appendChild(entry);
    });
  });
}

// MENU INSIDE VIEWPORT
function placeMenuWithinViewport(menu, triggerRect, preferred = "bottom") {
  // Default position: below the triggering element
  let top = triggerRect.bottom + window.scrollY + 8;
  let left = triggerRect.left + window.scrollX;

  // Temporarily set position to get true size
  menu.style.position = 'absolute';
  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
  menu.style.zIndex = 9999;
  menu.style.display = 'block';

  document.body.appendChild(menu);

  // Now check for overflow
  const menuRect = menu.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Horizontal: If overflowing right, pull it left to fit
  if (menuRect.right > vw) {
    left = Math.max(vw - menuRect.width - 8, 8);
    menu.style.left = `${left}px`;
  }
  // Vertical: If overflowing bottom, show above trigger if fits, otherwise clamp to top
  if (menuRect.bottom > vh) {
    // Try above the trigger
    if (triggerRect.top - menuRect.height - 8 > 0) {
      top = triggerRect.top + window.scrollY - menuRect.height - 8;
    } else {
      top = Math.max(vh - menuRect.height - 8, 8);
    }
    menu.style.top = `${top}px`;
  }
  // If overflowing left, clamp to left edge
  if (menuRect.left < 0) {
    menu.style.left = `8px`;
  }
  // If overflowing top, clamp to top edge
  if (menuRect.top < 0) {
    menu.style.top = `8px`;
  }
}

// Hook up modals and icon
document.getElementById('friends-icon').onclick = function() {
  renderFriendsList();
  document.getElementById('friends-modal').style.display = 'flex';
};
document.getElementById('close-friends-modal').onclick = function() {
  document.getElementById('friends-modal').style.display = 'none';
};
document.getElementById('friends-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
// PARTICLE EFFECT
document.addEventListener("DOMContentLoaded", function() {
  // Only load particles when Home is visible (optional, can always load)
  particlesJS('home-particles', {
    particles: {
      number: { value: 40, density: { enable: true, value_area: 800 } },
      color: { value: "#ffe066" },
      shape: { type: "circle" },
      opacity: { value: 0.4, random: true },
      size: { value: 8, random: true },
      line_linked: { enable: true, distance: 110, color: "#ffe066", opacity: 0.13, width: 1 },
      move: { enable: true, speed: 1.1 }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: false }
      },
      modes: {
        repulse: { distance: 90 }
      }
    },
    retina_detect: true
  });
});
// Expose to global
window.sendFriendRequest = sendFriendRequest;
window.acceptFriendRequest = acceptFriendRequest;
window.declineFriendRequest = declineFriendRequest;
window.renderFriendsList = renderFriendsList; 
