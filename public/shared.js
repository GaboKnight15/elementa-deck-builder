// CARD LIST //   
const dummyCards = [
{id: 'ForestFairy', name: 'Forest Fairy', rarity: 'Common', image: 'CardImages/BasicCreatures/Fairy.png', 
 category: 'Creature', color: 'green', type: 'fairy', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Fairy', ability: 'Flying', set: 'StandardPack'},
{id: 'ForestGoblin', name: 'Forest Goblin', rarity: 'Common', image: 'CardImages/BasicCreatures/Goblin.png', 
 category: 'Creature', color: 'green', type: 'Goblin', hp: 3, atk: 1, def: 0, cost: 0, archetype: 'Goblin', set: 'StandardPack'},
{id: 'Emberling', name: 'Emberling', rarity: 'Common', image: 'CardImages/BasicCreatures/Emberling.png', 
 category: 'Creature', color: 'red', type: 'Beast', hp: 3, atk: 2, def: 0, cost: 0, archetype: 'Firelands', ability: 'Burn', set: 'StandardPack'},
{id: 'Fire Pixie', name: 'Fire Pixie', rarity: 'Common', image: 'CardImages/BasicCreatures/FirePixie.png', 
 category: 'Creature', color: 'red', type: 'Fairy', hp: 3, atk: 2, def: 0, cost: 0, archetype: 'Firelands', ability: ['Burn','Flying'], set: 'StandardPack'},
{id: 'Hellcharger', name: 'Hellcharger', rarity: 'Common', image: 'CardImages/BasicCreatures/Hellcharger.png', 
 category: 'Creature', color: 'red', type: 'Warrior', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Firelands', ability: 'Burn', set: 'StandardPack'},
{id: 'WaterElemental', name: 'Water Elemental', rarity: 'Common', image: 'CardImages/BasicCreatures/WaterElemental.png', 
 category: 'Creature', color: 'blue', type: 'Elemental', hp: 5, atk: 2, def: 0, cost: {blue: 1}, archetype: 'Firelands', ability: ['Dive','Elusive','Soak'], set: 'StandardPack'},
{id: 'DesertWolf', name: 'Desert Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/DesertWolf.png', 
 category: 'Creature', color: 'gray', type: 'Beast', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Scorchlands', ability: 'Burn', set: 'StandardPack'},
{id: 'Golemites', name: 'Golemites', rarity: 'Common', image: 'CardImages/BasicCreatures/Golemites.png', 
 category: 'Creature', color: 'gray', type: 'Elemental', hp: 3, atk: 2, def: 0, cost: 0, archetype: 'Golemheart', ability: 'Burn', set: 'StandardPack'},
{id: 'Wolf', name: 'Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/Wolf.png', 
 category: 'Creature', color: 'black', type: 'Beast', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Moonfang', ability: 'Ambush', set: 'StandardPack'},
{id: 'Skeleton', name: 'Skeleton', rarity: 'Common', image: 'CardImages/BasicCreatures/Skeleton.png',
 category: 'Creature', color: 'Black', type: 'Undead', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe', set: 'StandardPack'},
{id: 'Bat', name: 'Bat', rarity: 'Common', image: 'CardImages/BasicCreatures/Bat.png', 
 category: 'Creature', color: 'black', type: 'Vampire', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Vampiric', ability: ['Drain','Flying'], set: 'StandardPack'},
{id: 'Imp', name: 'Imp', rarity: 'Common', image: 'CardImages/BasicCreatures/Imp.png', 
 category: 'Creature', color: 'black', trait: 'Champion', type: 'Demon', hp: 1, atk: 1, def: 0, cost: { red: 2 }, essence: {black: 1}, archetype: 'Skullframe', ability: ['Ambush','Flying'], set: 'StandardPack'},
{id: 'Vampire', name: 'Vampire', rarity: 'Rare', image: 'CardImages/BasicCreatures/Vampire.png', 
 category: 'Creature', color: 'black', type: 'Demon', hp: 3, atk: 2, def: 0, cost: {colorless: 1, black: 1}, archetype: 'Vampiric', ability: ['Drain','Flying'], set: 'StandardPack'},

{id: 'CindercoreGolem', name: 'Cindercore Golem', rarity: 'Rare', image: 'CardImages/Cindercore/Cindercore Golem.png', 
 category: 'Creature', color: ['red', 'gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: {colorless: 3, red: 1}, archetype: ['Cindercore','Golemheart'], ability: 'burn', set: 'StandardPack'},
{id: 'CindercoreSentry', name: 'Cindercore Sentry', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Sentry.png', 
 category: 'Creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: {colorless: 3, red: 1}, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'CindercoreProtector', name: 'Cindercore Protector', rarity: 'Rare', image: 'CardImages/Cindercore/Cindercore Protector.png', 
 category: 'Creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: {colorless: 3, red: 1}, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'cindercore4', name: 'Cindercore Vanguard', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Vanguard.png', 
 category: 'Creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'cindercore5', name: 'Ignavaryn, Cindercore Automaton', rarity: 'Legendary', image: 'CardImages/Cindercore/Ignavaryn, Cindercore Automaton.png', 
 category: 'Creature', color: 'red', type: 'construct', hp: 15, atk: 6, def: 3, cost: 7, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},

{id: 'FirelandsScamperling', name: 'Firelands Scamperling', rarity: 'Common', image: 'CardImages/Firelands/Firelands Scamperling.png', 
 category: 'Creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush'], set: 'StandardPack'},
{id: 'firelands2', name: 'Firelands Cindercub', rarity: 'Common', image: 'CardImages/Firelands/Firelands Cindercub.png', 
 category: 'Creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','rush'], set: 'StandardPack'},
{id: 'firelands3', name: 'Firelands Lynx', rarity: 'Common', image: 'CardImages/Firelands/Firelands Lynx.png', 
 category: 'Creature', color: 'red', type: 'beast', hp: 3, atk: 2, def: 1, cost: 2, archetype: 'Firelands', ability: ['burn','leap','rush'], set: 'StandardPack'},
{id: 'firelands4', name: 'Firelands Kitsune', rarity: 'Common', image: 'CardImages/Firelands/Firelands Kitsune.png', 
 category: 'Creature', color: 'red', type: 'beast', hp: 4, atk: 3, def: 0, cost: {colorless: 1, red: 1}, archetype: 'Firelands', ability: ['burn','leap','rush'], set: 'StandardPack'},
{id: 'firelands5', name: 'Firelands Direbeast', rarity: 'Rare', image: 'CardImages/Firelands/Firelands Direbeast.png', 
 category: 'Creature', color: 'red', type: 'beast', hp: 9, atk: 5, def: 2, cost: {colorless: 4, red: 1}, archetype: 'Firelands', ability: ['burn','rush'], set: 'StandardPack'},
{id: 'firelands6', name: 'Firelands Hellhound', rarity: 'Rare', image: 'CardImages/Firelands/Firelands Hellhound.png', 
 category: 'Creature', color: ['red','black'], type: ['beast','demon'], hp: 7, atk: 5, def: 1, cost: {colorless: 2, red: 1}, archetype: 'Firelands', ability: ['burn','leap','rush'], set: 'StandardPack'},
{id: 'firelands7', name: 'Firelands Hellmaw', rarity: 'Epic', image: 'CardImages/Firelands/Firelands Hellmaw.png', 
 category: 'Creature', color: ['red','black'], type: ['dragon','demon'], hp: 8, atk: 6, def: 1, cost: {colorless: 2, red: 1, black: 1}, archetype: 'Firelands', ability: ['burn','Flying','rush']},
{id: 'firelands8', name: 'Ephoros, Firelands Behemoth', rarity: 'Legendary', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth.png', 
 category: 'Creature', color: ['red','black'], type: ['beast','demon'], hp: 13, atk: 9, def: 3, cost: {colorless: 5, red: 1, black: 1}, archetype: 'Firelands', ability: ['burn','crush','intimidate'], set: 'StandardPack'},
{id: 'firelands8a', name: 'Ephoros, Firelands Behemoth', rarity: 'Legendary', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth FA.png', 
 category: 'Creature', color: ['red','black'], type: ['beast','demon'], hp: 13, atk: 9, def: 3, cost: {colorless: 5, red: 1, black: 1}, archetype: 'Firelands', ability: ['burn','crush','intimidate'], set: 'StandardPack'},

{id: 'PyrokragGolemheartTitan', name: 'Pyrokrag, Golemheart Titan', rarity: 'Legendary', image: 'CardImages/Golems/Pyrokrag, Golemheart Titan.png', 
 category: 'Creature', color: ['red', 'gray'], type: 'Elemental', hp: 9, armor: 5, atk: 8, def: 3, cost: {colorless: 5, red: 1, gray: 1}, 
 archetype: 'Golemheart', ability: 'burn', trait: 'Fusion', set: 'StandardPack'},
{id: 'GolemheartGiant', name: 'Golemheart Giant', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Giant.png', 
 category: 'Creature', color: ['red', 'gray'], type: 'Elemental', hp: 6, atk: 5, def: 2, cost: {colorless: 2, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Burn', set: 'StandardPack'},
{id: 'SmolderingGolemheart', name: 'Smoldering Golemheart', rarity: 'Rare', image: 'CardImages/Golems/Smoldering Golemheart .png', 
 category: 'Creature', color: ['red', 'gray'], type: 'Elemental', hp: 5, armor: 3, atk: 5, def: 2, cost: {colorless: 6, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Burn', set: 'StandardPack'},
{id: 'GolemheartSentinel', name: 'Golemheart Sentinel', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Sentinel.png', 
 category: 'Creature', color: ['red', 'gray'], type: 'Elemental', hp: 7, armor: 3, atk: 3, def: 2, cost: {colorless: 1, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Protect', set: 'StandardPack'},
{id: 'FireGolem', name: 'Fire Golem', rarity: 'Common', image: 'CardImages/Golems/Fire Golem.png', 
 category: 'Creature', color: ['red', 'gray'], type: ['Elemental','Golem'], hp: 3, atk: 2, def: 1, cost: {red: 1, gray: 1}, archetype: ['Firelands','Golemheart'], ability: 'Burn', set: 'StandardPack'},
{id: 'KaelgorranElementalPrimordial', name: 'Kaelgorran, Elemental Primordial', rarity: 'Legendary', image: 'CardImages/Golems/Kaelgorran, Elemental Primordial.png', 
 category: 'Creature', color: ['green','red', 'gray'], type: ['Elemental','Golem'], hp: 3, atk: 2, def: 1, cost: {colorless: 4, red: 1, gray: 1},
 archetype: ['Firelands','Golemheart'], ability: 'burn', trait: 'Fusion', set: 'StandardPack'},
{id: 'golem8', name: 'Acidic Golem', rarity: 'Rare', image: 'CardImages/Golems/Acidic Golem.png', 
 category: 'Creature', color: ['purple', 'gray'], type: ['elemental','Golem'], hp: 8, armor: 4, atk: 4, def: 3, cost: {colorless: 2, purple: 1, gray: 1}, archetype: 'Golemheart', ability: 'toxic', set: 'StandardPack'},

{id: 'CoralboundSentry', name: 'Coralbound Sentry', rarity: 'Common', image: 'CardImages/Coralbound/Coralbound Sentry.png', 
 category: 'Creature', color: 'blue', type: 'Construct', hp: 4, atk: 2, def: 1, cost: {blue: 1}, archetype: 'Coralbound', ability: '', set: 'StandardPack'},
{id: 'CoralboundProtector', name: 'Coralbound Protector', rarity: 'Rare', image: 'CardImages/Coralbound/Coralbound Protector.png', 
 category: 'Creature', color: 'blue', type: 'Construct', hp: 10, atk: 3, def: 2, cost: {colorless: 3, blue: 1}, archetype: 'Coralbound', ability: ['protect','lifelink'], set: 'StandardPack'},
{id: 'CoralboundVanguard', name: 'Coralbound Vanguard', rarity: 'Rare', image: 'CardImages/Coralbound/Coralbound Vanguard.png', 
 category: 'Creature', color: 'blue', type: 'Construct', hp: 6, atk: 3, def: 1, cost: {colorless: 1, blue: 1}, archetype: 'Coralbound', ability: 'rush', set: 'StandardPack'},
{id: 'MaelvyrnCoralboundAutomatonFA', name: 'Maelvyrn, Coralbound Automaton', rarity: 'Legendary', image: 'CardImages/Coralbound/Maelvyrn, Coralbound Automaton.png', 
 category: 'Creature', color: 'blue', type: 'Construct', hp: 20, atk: 8, def: 5, cost: {colorless: 6, blue: 2},
 archetype: 'Coralbound', ability: 'Protect', trait: 'Champion', set: 'StandardPack'},

{id: 'glimmerscale4', name: 'Wyrm of Thorns and Sunfire', rarity: 'Rare', image: 'CardImages/Glimmerscales/Wyrm of Thorns and Sunfire.png', category: 'Creature', color: ['green', 'red', 'white'], type: 'dragon', hp: 9, atk: 5, def: 2, cost: 3, ability: ['intimidate','Flying'], set: 'StandardPack'},

{id: 'SkullframeDefector', name: 'Skullframe Defector', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Defector.png', 
 category: 'Creature', color: 'black', type: 'Undead', hp: 3, atk: 2, def: 1, cost: {colorless: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'SkullframeUnyielding', name: 'Skullframe Unyielding', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Unyielding.png', 
 category: 'Creature', color: 'black', type: 'Undead', hp: 4, atk: 1, def: 0, cost: {colorless: 1, black: 1}, archetype: 'Skullframe', ability: 'rush', set: 'StandardPack'},
{id: 'SkullframeAcolyte', name: 'Skullframe Acolyte', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Acolyte.png', 
 category: 'Creature', color: ['black', 'purple'], type: 'Undead', hp: 5, atk: 3, def: 1, cost: {colorless: 1, , purple: 1, black: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'SkullframeCryptwinds', name: 'Skullframe Cryptwinds', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Cryptwinds.png', 
 category: 'Creature', color: ['black', 'purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2, cost: {colorless: 1, black: 2}, archetype: 'Skullframe', ability: 'Flying', set: 'StandardPack'},
{id: 'SkullframeSpectralDragon', name: 'Skullframe Spectral Dragon', rarity: 'Epic', image: 'CardImages/Skullframe/Skullframe Spectral Dragon.png', 
 category: 'Creature', color: ['black', 'purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2, cost: {colorless: 3, purple: 1, black: 1}, archetype: 'Skullframe', ability: 'Flying', set: 'StandardPack'},
{id: 'SkullframeArmoredDragon', name: 'Skullframe Armored Dragon', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Armored Dragon.png', 
 category: 'Creature', color: ['black', 'purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2, cost: {colorless: 2, purple: 1, black: 1}, archetype: 'Skullframe', ability: 'Flying', set: 'StandardPack'},
{id: 'SkullframeHexmistress', name: 'Skullframe Hexmistress', rarity: 'Epic', image: 'CardImages/Skullframe/Skullframe Hexmistress.png', 
 category: 'Creature', color: ['black', 'purple'], type: 'Undead', hp: 6, atk: 4, def: 1, cost: 3, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'MaldryssSkullframeArchmage', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage.png', 
 category: 'Creature', color: ['black', 'purple'], type: 'Undead', hp: 8, atk: 4, def: 1, cost: {black: 2, purple: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'MaldryssSkullframeArchmageFA', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage FA.png', 
 category: 'Creature', color: ['black', 'purple'], type: 'Undead', hp: 8, atk: 4, def: 1, cost: {black: 2, purple: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'Soulhexing', name: 'Soulhexing', rarity: 'Common', image: 'CardImages/Skullframe/Soulhexing.png', 
 category: 'Spell', color: 'black', type: 'spell', cost: {colorless: 2, black: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'Witherwake', name: 'Witherwake', rarity: 'Common', image: 'CardImages/Skullframe/Witherwake.png', 
 category: 'Spell', color: ['black','purple'], type: 'spell', cost: {purple: 1, black: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},

{id: 'FrostlandsDragon', name: 'Frostlands Dragon', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Dragon.png', 
 category: 'Creature', color: ['blue', 'gray'], type: 'Dragon', hp: 9, atk: 5, def: 2, cost: {colorless: 3, blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandsWyrm', name: 'Frostlands Wyrm', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Wyrm.png', 
 category: 'Creature', color: ['blue', 'gray'], type: 'Dragon', hp: 9, atk: 5, def: 2, cost: {colorless: 1, blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandsGolem', name: 'Frostlands Golem', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Golem.png', 
 category: 'Creature', color: ['blue', 'gray'], type: 'Elemental', hp: 9, atk: 5, def: 2, cost: {colorless: 1, blue: 1, gray: 1}, archetype: 'Frostlands', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'FrostlandsPhoenix', name: 'Frostlands Phoenix', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Phoenix.png', 
 category: 'Creature', color: ['blue', 'gray'], type: 'Avian', hp: 9, atk: 5, def: 2, cost: {blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandsRuneforgedAutomaton', name: 'Frostlands Runeforged Automaton', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Runeforged Automaton.png', 
 category: 'Creature', color: ['blue', 'gray'], type: 'Construct', hp: 9, atk: 5, def: 2, cost: {colorless: 2, blue: 1, gray: 1}, archetype: 'Frostlands', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'FrostlandsRuneforgedColossus', name: 'Frostlands Runeforged Colossus', rarity: 'Epic', image: 'CardImages/Frostlands/Frostlands Runeforged Titan.png', 
 category: 'Creature', color: ['blue', 'gray'], type: 'Construct', hp: 9, atk: 5, def: 2, cost: {colorless: 4, blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Crush'], set: 'StandardPack'},
{id: 'EirawenFrostlandsQueenFA', name: 'Eirawen, Frostlands Queen', rarity: 'Legendary', image: 'CardImages/Frostlands/Eirawen, Frostlands Queen.png', 
 category: 'Creature', color: ['blue', 'gray'], type: ['Mage','Champion'], hp: 11, atk: 1, def: 0, cost: {blue: 2, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},

{id: 'GolemheartInfusor', name: 'Golemheart Infusor', rarity: 'Common', image: 'CardImages/Artifacts/Golemheart Infusor.png', 
 category: 'Artifact', color: 'gray', type: 'Relic', hp: 5, cost: {gray: 1}, archetype: 'Golemheart', ability: '', set: 'StandardPack'},
{id: 'HeartwoodEmeralds', name: 'Heartwood Emeralds', rarity: 'Common', image: 'CardImages/Artifacts/Heartwood Emeralds.png', 
 category: 'Artifact', color: 'green', type: 'Relic', hp: 5, cost: {colorless: 1, green: 1}, archetype: 'Heartwood', ability: '', set: 'StandardPack'},
{id: 'CindercoreEmber', name: 'Cindercore Ember', rarity: 'Common', image: 'CardImages/Artifacts/Cindercore Ember.png', 
 category: 'Artifact', color: 'red', type: 'Relic', hp: 5, cost: {colorless: 2, red: 1}, archetype: 'Cindercore', ability: '', set: 'StandardPack'},
{id: 'TidecallersPearl', name: 'Tidecallers Pearl', rarity: 'Common', image: 'CardImages/Artifacts/Tidecallers Pearl.png', 
 category: 'Artifact', color: 'blue', type: 'Relic', hp: 5, cost: {colorless: 2, blue: 1}, archetype: 'Coralbound', ability: '', set: 'StandardPack'},
{id: 'StormcoreDynamo', name: 'Stormcore Dynamo', rarity: 'Common', image: 'CardImages/Artifacts/Stormcore Dynamo.png', 
 category: 'Artifact', color: 'yellow', type: 'Relic', hp: 5, cost: {colorless: 2, yellow: 1}, archetype: 'Stormcore', ability: '', set: 'StandardPack'},
{id: 'PlagueThornTalisman', name: 'Plague Thorn Talisman', rarity: 'Common', image: 'CardImages/Artifacts/Plague Thorn Talisman.png', 
 category: 'Artifact', color: 'purple', type: 'Relic', hp: 5, cost: {colorless: 2, purple: 1}, archetype: 'Plaguecore', ability: '', set: 'StandardPack'},
{id: 'TitansAnvil', name: 'Titans Anvil', rarity: 'Common', image: 'CardImages/Artifacts/Titans Anvil.png', 
 category: 'Artifact', color: 'gray', type: 'Relic', hp: 5, cost: {colorless: 1, gray: 1}, archetype: '', ability: '', set: 'StandardPack'},
{id: 'VeiloftheForgotten', name: 'Veil of the Forgotten', rarity: 'Common', image: 'CardImages/Artifacts/Veil of the Forgotten.png', 
 category: 'Artifact', color: 'black', type: 'Relic', hp: 5, cost: {colorless: 2, black: 1}, archetype: '', ability: '', set: 'StandardPack'},
{id: 'LumenSpire', name: 'Lumen Spire', rarity: 'Common', image: 'CardImages/Artifacts/Lumen Spire.png', 
 category: 'Artifact', color: 'white', type: 'Relic', hp: 5, cost: {colorless: 2, white: 1}, archetype: '', ability: '', set: 'StandardPack'},

{id: 'LifeGrowth', name: 'Life Growth', rarity: 'Common', image: 'CardImages/Spells/Life Growth.png', 
 category: 'Spell', color: 'green', type: 'spell', cost: {green: 1}, ability: 'burn', set: 'StandardPack'},
{id: 'EssenceSurge', name: 'Essence Surge', rarity: 'Common', image: 'CardImages/Spells/Essence Surge.png', 
 category: 'Spell', color: 'green', type: 'spell', cost: {colorless: 2}, ability: 'Gain 3 essence', set: 'StandardPack'},
{id: 'EssenceAssault', name: 'Essence Assault', rarity: 'Common', image: 'CardImages/Spells/Essence Assault.png', 
 category: 'Spell', color: 'red', type: 'spell', cost: {colorless: 1}, ability: 'burn', set: 'StandardPack'},
{id: 'EssenceRift', name: 'Essence Rift', rarity: 'Common', image: 'CardImages/Spells/Essence Rift.png', 
 category: 'Spell', color: 'blue', type: 'spell', cost: {colorless: 2}, ability: 'Draw 2', set: 'StandardPack'},
{id: 'EssenceBolt', name: 'Essence Bolt', rarity: 'Common', image: 'CardImages/Spells/Essence Bolt.png', 
 category: 'Spell', color: 'yellow', type: 'spell', cost: {colorless: 1}, ability: 'Strike 3', set: 'StandardPack'},
{id: 'EssenceBreak', name: 'Essence Break', rarity: 'Common', image: 'CardImages/Spells/Essence Break.png', 
 category: 'Spell', color: 'purple', type: 'spell', cost: {colorless: 1}, ability: 'Destroy 1 essence', set: 'StandardPack'},
{id: 'EssenceBarrier', name: 'Essence Barrier', rarity: 'Common', image: 'CardImages/Spells/Essence Barrier.png', 
 category: 'Spell', color: 'gray', type: 'Aura', cost: {colorless: 1}, ability: 'Aegis', set: 'StandardPack'},
{id: 'EssencePurge', name: 'Essence Purge', rarity: 'Common', image: 'CardImages/Spells/Essence Purge.png', 
 category: 'Spell', color: 'black', type: 'Aura', cost: {colorless: 2}, ability: 'burn', set: 'StandardPack'},
{id: 'EssenceBlessing', name: 'Essence Blessing', rarity: 'Common', image: 'CardImages/Spells/Essence Blessing.png', 
 category: 'Spell', color: 'white', type: 'spell', cost: {colorless: 1}, ability: 'Cleanse 5', set: 'StandardPack'},

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
// Always use only .active to show sections!
document.querySelectorAll('.home-menu-btn').forEach(btn => {
  btn.onclick = function() {
    const section = btn.getAttribute('data-section');
    // Hide all sections
    document.querySelectorAll('section[id$="-section"]').forEach(sectionEl => {
      sectionEl.classList.remove('active');
    });
    // Special actions for navigation
    const specialActions = {
      'gallery-section' : window.renderGallery,
      'builder-section' : window.showDeckSelection,
      'gameplay-section': function() {
        // Show only mode-select-section when clicking Play
        document.getElementById('mode-select-section').classList.add('active');
      },
      'shop-section'    : window.renderShop
    };
    if (section === 'gameplay-section') {
      // Show mode select only
      if (typeof specialActions['gameplay-section'] === 'function') specialActions['gameplay-section']();
    } else {
      document.getElementById(section).classList.add('active');
      if (typeof specialActions[section] === 'function') specialActions[section]();
    }
  };
});
// On page load, hide all, show home
document.querySelectorAll('section[id$="-section"]').forEach(section => section.classList.remove('active'));
document.getElementById('home-section').classList.add('active');

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
      `<span class="full-card-info-label">Cost:</span> <span>${renderCardCost(card.cost)}</span>` +
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

// Cost mapping and renderer (returns HTML string)
const COST_IMAGE_MAP = {
  red: "OtherImages/Essence/EssenceRed.png",
  blue: "OtherImages/Essence/EssenceBlue.png",
  green: "OtherImages/Essence/EssenceGreen.png",
  yellow: "OtherImages/Essence/EssenceYellow.png",
  purple: "OtherImages/Essence/EssencePurple.png",
  gray: "OtherImages/Essence/EssenceGray.png",
  black: "OtherImages/Essence/EssenceBlack.png",
  white: "OtherImages/Essence/EssenceWhite.png",
  X1: "OtherImages/Essence/EssenceOne.png",
  X2: "OtherImages/Essence/EssenceTwo.png",
  X3: "OtherImages/Essence/EssenceThree.png",
  X4: "OtherImages/Essence/EssenceFour.png",
  X5: "OtherImages/Essence/EssenceFive.png",
  X6: "OtherImages/Essence/EssenceSix.png",
  X7: "OtherImages/Essence/EssenceSeven.png",
  X8: "OtherImages/Essence/EssenceEight.png",
  X9: "OtherImages/Essence/EssenceNine.png",
  X10: "OtherImages/Essence/EssenceTen.png"
};

function renderCardCost(costData) {
  // Accepts either {red:2, blue:1, ...} or [{color:'red',amount:2}, ...]
  let html = '';
  if (!costData) return '0';

  // Array style: [{color: 'red', amount: 2}, {colorless: 3}]
  if (Array.isArray(costData)) {
    costData.forEach(c => {
      if (c.color && COST_IMAGE_MAP[c.color]) {
        for (let i = 0; i < (c.amount || 1); i++) {
          html += `<img src="${COST_IMAGE_MAP[c.color]}" alt="${c.color}" style="width:26px;height:26px;vertical-align:middle;margin-right:2px;">`;
        }
      } else if (c.colorless) {
        const key = 'X' + c.colorless;
        if (COST_IMAGE_MAP[key]) {
          html += `<img src="${COST_IMAGE_MAP[key]}" alt="Colorless" style="width:26px;height:26px;vertical-align:middle;margin-right:2px;">`;
        }
      }
    });
    return html || '0';
  }

  // Object style: {red: 2, blue: 1, colorless: 3}
  for (const key in costData) {
    if (!costData.hasOwnProperty(key)) continue;
    if (key === 'colorless' || key === 'X') {
      const imgKey = 'X' + costData[key];
      if (COST_IMAGE_MAP[imgKey]) {
        html += `<img src="${COST_IMAGE_MAP[imgKey]}" alt="Colorless" style="width:26px;height:26px;vertical-align:middle;margin-right:2px;">`;
      }
    } else if (COST_IMAGE_MAP[key]) {
      for (let i = 0; i < costData[key]; i++) {
        html += `<img src="${COST_IMAGE_MAP[key]}" alt="${key}" style="width:26px;height:26px;vertical-align:middle;margin-right:2px;">`;
      }
    }
  }
  return html || '0';
}
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
