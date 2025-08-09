// CARD LIST //   
const dummyCards = [
{id: 'ForestFairy', name: 'Forest Fairy', rarity: 'Common', image: 'CardImages/BasicCreatures/Fairy.png', 
 category: 'Creature', color: 'Green', type: 'fairy', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Fairy', ability: 'Flying', set: 'StandardPack'},
{id: 'ForestGoblin', name: 'Forest Goblin', rarity: 'Common', image: 'CardImages/BasicCreatures/Goblin.png', 
 category: 'Creature', color: 'Green', type: 'Goblin', hp: 3, atk: 1, def: 0, cost: 0, archetype: 'Goblin', set: 'StandardPack'},
{id: 'Emberling', name: 'Emberling', rarity: 'Common', image: 'CardImages/BasicCreatures/Emberling.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 0, cost: 0, archetype: 'Firelands', ability: 'Burn', set: 'StandardPack'},
{id: 'Fire Pixie', name: 'Fire Pixie', rarity: 'Common', image: 'CardImages/BasicCreatures/FirePixie.png', 
 category: 'Creature', color: 'Red', type: 'Fairy', hp: 3, atk: 2, def: 0, cost: 0, archetype: 'Firelands', ability: ['Burn','Flying'], set: 'StandardPack'},
{id: 'Hellcharger', name: 'Hellcharger', rarity: 'Common', image: 'CardImages/BasicCreatures/Hellcharger.png', 
 category: 'Creature', color: 'Red', type: 'Warrior', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Firelands', ability: 'Burn', set: 'StandardPack'},
{id: 'WaterElemental', name: 'Water Elemental', rarity: 'Common', image: 'CardImages/BasicCreatures/WaterElemental.png', 
 category: 'Creature', color: 'Blue', type: 'Elemental', hp: 5, atk: 2, def: 0, cost: {blue: 1}, archetype: 'Firelands', ability: ['Dive','Elusive','Soak'], set: 'StandardPack'},
{id: 'DesertWolf', name: 'Desert Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/DesertWolf.png', 
 category: 'Creature', color: 'Gray', type: 'Beast', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Scorchlands', ability: 'Burn', set: 'StandardPack'},
{id: 'Golemites', name: 'Golemites', rarity: 'Common', image: 'CardImages/BasicCreatures/Golemites.png', 
 category: 'Creature', color: 'Gray', type: 'Elemental', hp: 3, atk: 2, def: 0, cost: 0, archetype: 'Golemheart', ability: 'Burn', set: 'StandardPack'},
{id: 'Wolf', name: 'Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/Wolf.png', 
 category: 'Creature', color: 'Black', type: 'Beast', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Moonfang', ability: 'Ambush', set: 'StandardPack'},
{id: 'Skeleton', name: 'Skeleton', rarity: 'Common', image: 'CardImages/BasicCreatures/Skeleton.png',
 category: 'Creature', color: 'Black', type: 'Undead', hp: 1, atk: 1, def: 0, cost: 0, archetype: 'Skullframe', set: 'StandardPack'},
{id: 'Bat', name: 'Bat', rarity: 'Common', image: 'CardImages/BasicCreatures/Bat.png', 
 category: 'Creature', color: 'Black', type: 'Vampire', hp: 3, atk: 2, def: 0, cost: {colorless: 1}, archetype: 'Vampiric', ability: ['Drain','Flying'], set: 'StandardPack'},
{id: 'Imp', name: 'Imp', rarity: 'Common', image: 'CardImages/BasicCreatures/Imp.png', 
 category: 'Creature', color: 'Black', type: 'Demon', hp: 1, atk: 1, def: 0, cost: { colorless: 1 }, essence: {black: 1}, archetype: 'Skullframe', ability: ['Ambush','Flying'], set: 'StandardPack'},
{id: 'Vampire', name: 'Vampire', rarity: 'Rare', image: 'CardImages/BasicCreatures/Vampire.png', 
 category: 'Creature', color: 'Black', type: 'Demon', hp: 3, atk: 2, def: 0, cost: {colorless: 1, black: 1}, archetype: 'Vampiric', ability: ['Drain','Flying'], set: 'StandardPack'},

{id: 'CindercoreGolem', name: 'Cindercore Golem', rarity: 'Rare', image: 'CardImages/Cindercore/Cindercore Golem.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'elemental', hp: 15, atk: 6, def: 3, cost: {colorless: 3, red: 1}, archetype: ['Cindercore','Golemheart'], ability: 'burn', set: 'StandardPack'},
{id: 'CindercoreSentry', name: 'Cindercore Sentry', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Sentry.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3, cost: {colorless: 3, red: 1}, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'CindercoreProtector', name: 'Cindercore Protector', rarity: 'Rare', image: 'CardImages/Cindercore/Cindercore Protector.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3, cost: {colorless: 3, red: 1}, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'CindercoreVanguard', name: 'Cindercore Vanguard', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Vanguard.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3, cost: {colorless: 1, red: 1}, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},
{id: 'IgnavarynCindercoreAutomaton', name: 'Ignavaryn, Cindercore Automaton', rarity: 'Legendary', image: 'CardImages/Cindercore/Ignavaryn, Cindercore Automaton.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3, cost: {colorless: 5, red: 2}, archetype: 'Cindercore', ability: 'burn', set: 'StandardPack'},

{id: 'FirelandsScamperling', name: 'Firelands Scamperling', rarity: 'Common', image: 'CardImages/Firelands/Firelands Scamperling.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1, cost: {colorless: 2}, archetype: 'Firelands', ability: ['burn','rush'], set: 'StandardPack'},
{id: 'FirelandsCindercub', name: 'Firelands Cindercub', rarity: 'Common', image: 'CardImages/Firelands/Firelands Cindercub.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1, cost: {colorless: 1}, archetype: 'Firelands', ability: ['burn','rush'], set: 'StandardPack'},
{id: 'FirelandsLynx', name: 'Firelands Lynx', rarity: 'Common', image: 'CardImages/Firelands/Firelands Lynx.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1, cost: {colorless: 3, red: 1}, archetype: 'Firelands', ability: ['burn','leap','rush'], set: 'StandardPack'},
{id: 'FirelandsKitsune', name: 'Firelands Kitsune', rarity: 'Common', image: 'CardImages/Firelands/Firelands Kitsune.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 4, atk: 3, def: 0, cost: {colorless: 1, red: 1}, archetype: 'Firelands', ability: ['burn','leap','rush'], set: 'StandardPack'},
{id: 'FirelandsDirebeast', name: 'Firelands Direbeast', rarity: 'Rare', image: 'CardImages/Firelands/Firelands Direbeast.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 9, atk: 5, def: 2, cost: {colorless: 4, red: 1}, archetype: 'Firelands', ability: ['burn','rush'], set: 'StandardPack'},
{id: 'FirelandsHellhound', name: 'Firelands Hellhound', rarity: 'Rare', image: 'CardImages/Firelands/Firelands Hellhound.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], hp: 7, atk: 5, def: 1, cost: {colorless: 2, red: 1}, archetype: 'Firelands', ability: ['burn','leap','rush'], set: 'StandardPack'},
{id: 'FirelandsHellmaw', name: 'Firelands Hellmaw', rarity: 'Epic', image: 'CardImages/Firelands/Firelands Hellmaw.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Dragon','Demon'], hp: 8, atk: 6, def: 1, cost: {colorless: 2, red: 1, black: 1}, archetype: 'Firelands', ability: ['burn','Flying','rush']},
{id: 'EphorosFirelandsBehemoth', name: 'Ephoros, Firelands Behemoth', rarity: 'Legendary', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], hp: 13, atk: 9, def: 3, cost: {colorless: 5, red: 1, black: 1}, archetype: 'Firelands', ability: ['burn','crush','intimidate'], set: 'StandardPack'},
{id: 'EphorosFirelandsBehemothFA', name: 'Ephoros, Firelands Behemoth', rarity: 'Legendary', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth FA.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], hp: 13, atk: 9, def: 3, cost: {colorless: 5, red: 1, black: 1}, archetype: 'Firelands', ability: ['burn','crush','intimidate'], set: 'StandardPack'},

{id: 'PyrokragGolemheartTitan', name: 'Pyrokrag, Golemheart Titan', rarity: 'Legendary', image: 'CardImages/Golems/Pyrokrag, Golemheart Titan.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 9, armor: 5, atk: 8, def: 3, cost: {colorless: 5, red: 1, gray: 1}, 
 archetype: 'Golemheart', ability: 'Fire Armor', trait: 'Fusion', set: 'Primordial Ascension'},
{id: 'GolemheartGiant', name: 'Golemheart Giant', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Giant.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 6, atk: 5, def: 2, cost: {colorless: 2, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Burn', set: 'PrimordialAscension'},
{id: 'SmolderingGolemheart', name: 'Smoldering Golemheart', rarity: 'Rare', image: 'CardImages/Golems/Smoldering Golemheart .png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 5, armor: 3, atk: 5, def: 2, cost: {colorless: 6, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Burn', set: 'PrimordialAscension'},
{id: 'GolemheartSentinel', name: 'Golemheart Sentinel', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Sentinel.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 7, armor: 3, atk: 3, def: 2, cost: {colorless: 1, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Protect', set: 'PrimordialAscension'},
{id: 'FireGolem', name: 'Fire Golem', rarity: 'Common', image: 'CardImages/Golems/Fire Golem.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: ['Elemental','Golem'], hp: 3, atk: 2, def: 1, cost: {red: 1, gray: 1}, archetype: ['Firelands','Golemheart'], ability: 'Burn', set: 'PrimordialAscension'},
{id: 'KaelgorranElementalPrimordial', name: 'Kaelgorran, Elemental Primordial', rarity: 'Legendary', image: 'CardImages/Golems/Kaelgorran, Elemental Primordial.png', 
 category: 'Creature', color: ['Green','Red', 'gray'], type: ['Elemental','Golem'], hp: 3, atk: 2, def: 1, cost: {colorless: 4, red: 1, gray: 1},
 archetype: 'Golemheart', ability: 'burn', trait: 'Fusion', set: 'Primordial Ascension'},
{id: 'AcidicGolem', name: 'Acidic Golem', rarity: 'Rare', image: 'CardImages/Golems/Acidic Golem.png', 
 category: 'Creature', color: ['Purple', 'Gray'], type: ['Elemental','Golem'], hp: 8, armor: 4, atk: 4, def: 3, cost: {colorless: 2, purple: 1, gray: 1}, archetype: 'Golemheart', ability: 'toxic', set: 'PrimordialAscension'},

{id: 'CoralboundSentry', name: 'Coralbound Sentry', rarity: 'Common', image: 'CardImages/Coralbound/Coralbound Sentry.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 4, atk: 2, def: 1, cost: {blue: 1}, archetype: 'Coralbound', ability: '', set: 'StandardPack'},
{id: 'CoralboundProtector', name: 'Coralbound Protector', rarity: 'Rare', image: 'CardImages/Coralbound/Coralbound Protector.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 10, atk: 3, def: 2, cost: {colorless: 3, blue: 1}, archetype: 'Coralbound', ability: ['protect','lifelink'], set: 'StandardPack'},
{id: 'CoralboundVanguard', name: 'Coralbound Vanguard', rarity: 'Rare', image: 'CardImages/Coralbound/Coralbound Vanguard.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 6, atk: 3, def: 1, cost: {colorless: 1, blue: 1}, archetype: 'Coralbound', ability: 'rush', set: 'StandardPack'},
{id: 'MaelvyrnCoralboundAutomatonFA', name: 'Maelvyrn, Coralbound Automaton', rarity: 'Legendary', image: 'CardImages/Coralbound/Maelvyrn, Coralbound Automaton.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 20, atk: 8, def: 5, cost: {colorless: 6, blue: 2},
 archetype: 'Coralbound', ability: 'Protect', trait: 'Fusion', set: 'StandardPack'},

{id: 'WyrmofThornsandSunfire', name: 'Wyrm of Thorns and Sunfire', rarity: 'Rare', image: 'CardImages/Glimmerscale/Wyrm of Thorns and Sunfire.png', 
 category: 'Creature', color: ['Green', 'Red', 'White'], type: ['Dragon','Fairy'], hp: 10, atk: 3, def: 1, cost: {green: 1, red: 1, white: 1}, ability: ['Flying','Intimidate'], set: 'StandardPack'},

{id: 'SkullframeDefector', name: 'Skullframe Defector', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Defector.png', 
 category: 'Creature', color: 'Black', type: 'Undead', hp: 3, atk: 2, def: 1, cost: {colorless: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'SkullframeUnyielding', name: 'Skullframe Unyielding', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Unyielding.png', 
 category: 'Creature', color: 'Black', type: 'Undead', hp: 4, atk: 1, def: 0, cost: {colorless: 1, black: 1}, archetype: 'Skullframe', ability: 'rush', set: 'StandardPack'},
{id: 'SkullframeAcolyte', name: 'Skullframe Acolyte', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Acolyte.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: 'Undead', hp: 5, atk: 3, def: 1, cost: {colorless: 1, purple: 1, black: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'SkullframeCryptwinds', name: 'Skullframe Cryptwinds', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Cryptwinds.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2, cost: {colorless: 1, black: 2}, archetype: 'Skullframe', ability: 'Flying', set: 'StandardPack'},
{id: 'SkullframeSpectralDragon', name: 'Skullframe Spectral Dragon', rarity: 'Epic', image: 'CardImages/Skullframe/Skullframe Spectral Dragon.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2, cost: {colorless: 3, purple: 1, black: 1}, archetype: 'Skullframe', ability: 'Flying', set: 'StandardPack'},
{id: 'SkullframeArmoredDragon', name: 'Skullframe Armored Dragon', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Armored Dragon.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2, cost: {colorless: 2, purple: 1, black: 1}, archetype: 'Skullframe', ability: 'Flying', set: 'StandardPack'},
{id: 'SkullframeHexmistress', name: 'Skullframe Hexmistress', rarity: 'Epic', image: 'CardImages/Skullframe/Skullframe Hexmistress.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: 'Undead', hp: 6, atk: 4, def: 1, cost: 3, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'MaldryssSkullframeArchmage', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: 'Undead', trait: 'Champion', hp: 8, atk: 4, def: 1, cost: {black: 2, purple: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'MaldryssSkullframeArchmageFA', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage FA.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: 'Undead', trait: 'Champion', hp: 8, atk: 4, def: 1, cost: {black: 2, purple: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'Soulhexing', name: 'Soulhexing', rarity: 'Common', image: 'CardImages/Skullframe/Soulhexing.png', 
 category: 'Spell', color: 'Black', type: 'Spell', cost: {colorless: 2, black: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},
{id: 'Witherwake', name: 'Witherwake', rarity: 'Common', image: 'CardImages/Skullframe/Witherwake.png', 
 category: 'Spell', color: ['Black','Purple'], type: 'Spell', cost: {purple: 1, black: 1}, archetype: 'Skullframe', ability: 'burn', set: 'StandardPack'},

{id: 'FrostlandsDragon', name: 'Frostlands Dragon', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Dragon.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Dragon', hp: 9, atk: 5, def: 2, cost: {colorless: 3, blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandsWyrm', name: 'Frostlands Wyrm', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Wyrm.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Dragon', hp: 9, atk: 5, def: 2, cost: {colorless: 1, blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandsGolem', name: 'Frostlands Golem', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Golem.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Elemental', hp: 9, atk: 5, def: 2, cost: {colorless: 1, blue: 1, gray: 1}, archetype: 'Frostlands', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'FrostlandsPhoenix', name: 'Frostlands Phoenix', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Phoenix.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Avian', hp: 9, atk: 5, def: 2, cost: {blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandsRuneforgedAutomaton', name: 'Frostlands Runeforged Automaton', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Runeforged Automaton.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Construct', hp: 9, atk: 5, def: 2, cost: {colorless: 2, blue: 1, gray: 1}, archetype: 'Frostlands', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'FrostlandsRuneforgedColossus', name: 'Frostlands Runeforged Colossus', rarity: 'Epic', image: 'CardImages/Frostlands/Frostlands Runeforged Colossus.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Construct', hp: 9, atk: 5, def: 2, cost: {colorless: 4, blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Crush'], set: 'StandardPack'},
{id: 'EirawenFrostlandsQueenFA', name: 'Eirawen, Frostlands Queen', rarity: 'Legendary', image: 'CardImages/Frostlands/Eirawen, Frostlands Queen.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Mage', trait: 'Champion', hp: 11, atk: 1, def: 0, cost: {blue: 2, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},

{id: 'GolemheartInfusor', name: 'Golemheart Infusor', rarity: 'Common', image: 'CardImages/Artifacts/Golemheart Infusor.png', 
 category: 'Artifact', color: 'Gray', type: 'Relic', hp: 5, cost: {gray: 1}, archetype: 'Golemheart', ability: '', set: 'StandardPack'},
{id: 'HeartwoodEmeralds', name: 'Heartwood Emeralds', rarity: 'Common', image: 'CardImages/Artifacts/Heartwood Emeralds.png', 
 category: 'Artifact', color: 'Green', type: 'Relic', hp: 5, cost: {colorless: 1, green: 1}, archetype: 'Heartwood', ability: '', set: 'StandardPack'},
{id: 'CindercoreEmber', name: 'Cindercore Ember', rarity: 'Common', image: 'CardImages/Artifacts/Cindercore Ember.png', 
 category: 'Artifact', color: 'Red', type: 'Relic', hp: 5, cost: {colorless: 2, red: 1}, archetype: 'Cindercore', ability: '', set: 'StandardPack'},
{id: 'TidecallersPearl', name: 'Tidecallers Pearl', rarity: 'Common', image: 'CardImages/Artifacts/Tidecallers Pearl.png', 
 category: 'Artifact', color: 'Blue', type: 'Relic', hp: 5, cost: {colorless: 2, blue: 1}, archetype: 'Coralbound', ability: '', set: 'StandardPack'},
{id: 'StormcoreDynamo', name: 'Stormcore Dynamo', rarity: 'Common', image: 'CardImages/Artifacts/Stormcore Dynamo.png', 
 category: 'Artifact', color: 'Yellow', type: 'Relic', hp: 5, cost: {colorless: 2, yellow: 1}, archetype: 'Stormcore', ability: '', set: 'StandardPack'},
{id: 'PlagueThornTalisman', name: 'Plague Thorn Talisman', rarity: 'Common', image: 'CardImages/Artifacts/Plague Thorn Talisman.png', 
 category: 'Artifact', color: 'Purple', type: 'Relic', hp: 5, cost: {colorless: 2, purple: 1}, archetype: 'Plaguecore', ability: '', set: 'StandardPack'},
{id: 'TitansAnvil', name: 'Titans Anvil', rarity: 'Common', image: 'CardImages/Artifacts/Titans Anvil.png', 
 category: 'Artifact', color: 'Gray', type: 'Relic', hp: 5, cost: {colorless: 1, gray: 1}, archetype: '', ability: '', set: 'StandardPack'},
{id: 'VeiloftheForgotten', name: 'Veil of the Forgotten', rarity: 'Common', image: 'CardImages/Artifacts/Veil of the Forgotten.png', 
 category: 'Artifact', color: 'Black', type: 'Relic', hp: 5, cost: {colorless: 2, black: 1}, archetype: '', ability: '', set: 'StandardPack'},
{id: 'LumenSpire', name: 'Lumen Spire', rarity: 'Common', image: 'CardImages/Artifacts/Lumen Spire.png', 
 category: 'Artifact', color: 'White', type: 'Relic', hp: 5, cost: {colorless: 2, white: 1}, archetype: '', ability: '', set: 'StandardPack'},

{id: 'LifeGrowth', name: 'Life Growth', rarity: 'Common', image: 'CardImages/Spells/Life Growth.png', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: {green: 1}, ability: 'burn', set: 'StandardPack'},
{id: 'EssenceSurge', name: 'Essence Surge', rarity: 'Common', image: 'CardImages/Spells/Essence Surge.png', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: {colorless: 2}, ability: 'Gain 3 essence', set: 'StandardPack'},
{id: 'EssenceAssault', name: 'Essence Assault', rarity: 'Common', image: 'CardImages/Spells/Essence Assault.png', 
 category: 'Spell', color: 'Red', type: 'Spell', cost: {colorless: 1}, ability: 'burn', set: 'StandardPack'},
{id: 'EssenceRift', name: 'Essence Rift', rarity: 'Common', image: 'CardImages/Spells/Essence Rift.png', 
 category: 'Spell', color: 'Blue', type: 'Spell', cost: {colorless: 2}, ability: 'Draw 2', set: 'StandardPack'},
{id: 'EssenceBolt', name: 'Essence Bolt', rarity: 'Common', image: 'CardImages/Spells/Essence Bolt.png', 
 category: 'Spell', color: 'Yellow', type: 'Spell', cost: {colorless: 1}, ability: 'Strike 3', set: 'StandardPack'},
{id: 'EssenceBreak', name: 'Essence Break', rarity: 'Common', image: 'CardImages/Spells/Essence Break.png', 
 category: 'Spell', color: 'Purple', type: 'Spell', cost: {colorless: 1}, ability: 'Destroy 1 essence', set: 'StandardPack'},
{id: 'EssenceBarrier', name: 'Essence Barrier', rarity: 'Common', image: 'CardImages/Spells/Essence Barrier.png', 
 category: 'Spell', color: 'Gray', type: 'Aura', cost: {colorless: 1}, ability: 'Aegis', set: 'StandardPack'},
{id: 'EssencePurge', name: 'Essence Purge', rarity: 'Common', image: 'CardImages/Spells/Essence Purge.png', 
 category: 'Spell', color: 'Black', type: 'Aura', cost: {colorless: 2}, ability: 'burn', set: 'StandardPack'},
{id: 'EssenceBlessing', name: 'Essence Blessing', rarity: 'Common', image: 'CardImages/Spells/Essence Blessing.png', 
 category: 'Spell', color: 'White', type: 'Spell', cost: {colorless: 1}, ability: 'Cleanse 5', set: 'StandardPack'},

{id: 'basicforest', name: 'Forest', rarity: 'Common', image: 'CardImages/Domains/Green Basic Location.png', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: { red: 2 }, essence: {green: 1}, set: 'StandardPack2'},
{id: 'basicvolcano', name: 'Volcano', rarity: 'Common', image: 'CardImages/Domains/Red Basic Location.png', 
 category: 'Domain', color: 'Red', type: 'Terrain', hp: 5, cost: { red: 2 }, essence: {red: 1}, set: 'StandardPack2'},
{id: 'basicocean', name: 'Ocean', rarity: 'Common', image: 'CardImages/Domains/Blue Basic Location.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: { red: 1, green: 1, colorless: 3 }, essence: {blue: 1}, set: 'StandardPack2'},
{id: 'basicmountain', name: 'Mountain', rarity: 'Common', image: 'CardImages/Domains/Gray Basic Location.png', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: { red: 2 }, essence: {gray: 1}, set: 'StandardPack2', artwork: "CardImages/Artworks/Mountain.png"},
{id: 'basicswamp', name: 'Swamp', rarity: 'Common', image: 'CardImages/Domains/Purple Basic Location.png', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: { colorless: 2 }, essence: {purple: 1}, set: 'StandardPack2'},
{id: 'basicpeaks', name: 'Peaks', rarity: 'Common', image: 'CardImages/Domains/Yellow Basic Location.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: { colorless: 2 }, essence: {yellow: 1}, set: 'StandardPack2'},
{id: 'basicplains', name: 'Plains', rarity: 'Common', image: 'CardImages/Domains/White Basic Location.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: { colorless: 2 }, essence: {white: 1}, set: 'StandardPack2'},
{id: 'basicshadowforest', name: 'Shadow Forest', rarity: 'Common', image: 'CardImages/Domains/Black Basic Location.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: { red: 1, green: 1, colorless: 3 }, essence: {black: 1}, set: 'StandardPack2'},
{id: 'Verdara', name: 'Verdara', rarity: 'Legendary', image: 'CardImages/Domains/Green Domain.png', 
 category: 'Domain', color: 'Green', type: 'Dominion', hp: 20, cost: 0, essence: {green: 1}, trait: 'Dominion', set: 'StandardPack2'},
{id: 'Ashkar', name: 'Ashkar', rarity: 'Legendary', image: 'CardImages/Domains/Red Domain.png', 
 category: 'Domain', color: 'Red', type: 'Dominion', hp: 20, cost: 0, essence: {red: 1}, trait: 'Dominion', set: 'StandardPack2'},
{id: 'Marinthae', name: 'Marinthae', rarity: 'Legendary', image: 'CardImages/Domains/Blue Domain.png', 
 category: 'Domain', color: 'Blue', type: 'Dominion', hp: 20, cost: 0, essence: {blue: 1}, trait: 'Dominion', set: 'StandardPack2'},
{id: 'Aetherion', name: 'Aetherion', rarity: 'Legendary', image: 'CardImages/Domains/Yellow Domain.png', 
 category: 'Domain', color: 'Yellow', type: 'Dominion', hp: 20, cost: 0, essence: {yellow: 1}, trait: 'Dominion', set: 'StandardPack2'},
{id: 'Virkul', name: 'Virkul', rarity: 'Legendary', image: 'CardImages/Domains/Purple Domain.png', 
 category: 'Domain', color: 'Purple', type: 'Dominion', hp: 20, cost: 0, essence: {purple: 1}, trait: 'Dominion', set: 'StandardPack2'},
{id: 'Drakzul', name: 'Drakzul', rarity: 'Legendary', image: 'CardImages/Domains/Gray Domain.png', 
 category: 'Domain', color: 'Gray', type: 'Dominion', hp: 20, cost: 0, essence: {gray: 1}, trait: 'Dominion', set: 'StandardPack2', artwork: "CardImages/Artworks/Mountain.png"},
{id: 'Solmara', name: 'Solmara', rarity: 'Legendary', image: 'CardImages/Domains/White Domain.png', 
 category: 'Domain', color: 'White', type: 'Dominion', hp: 20, cost: 0, essence: {white: 1}, trait: 'Dominion', set: 'StandardPack2'},
{id: 'Nocthyra', name: 'Nocthyra', rarity: 'Legendary', image: 'CardImages/Domains/Black Domain.png', 
 category: 'Domain', color: 'Black', type: 'Dominion', hp: 20, cost: 0, essence: {black: 1}, trait: 'Dominion', set: 'StandardPack2'},
];
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
  X0: "OtherImages/Essence/EssenceZero.png",
  X1: "OtherImages/Essence/EssenceOne.png",
  X2: "OtherImages/Essence/EssenceTwo.png",
  X3: "OtherImages/Essence/EssenceThree.png",
  X4: "OtherImages/Essence/EssenceFour.png",
  X5: "OtherImages/Essence/EssenceFive.png",
  X6: "OtherImages/Essence/EssenceSix.png",
  X7: "OtherImages/Essence/EssenceSeven.png",
  X8: "OtherImages/Essence/EssenceEight.png",
  X9: "OtherImages/Essence/EssenceNine.png",
  X10: "OtherImages/Essence/EssenceTen.png",
  X11: "OtherImages/Essence/EssenceEleven.png",
  X12: "OtherImages/Essence/EssenceTwelve.png",
  X13: "OtherImages/Essence/EssenceThirteen.png",
  X14: "OtherImages/Essence/EssenceFourteen.png",
  X15: "OtherImages/Essence/EssenceFifteen.png",
  X16: "OtherImages/Essence/EssenceSixteen.png",
  X17: "OtherImages/Essence/EssenceSeventeen.png",
  X18: "OtherImages/Essence/EssenceEighteen.png",
  X19: "OtherImages/Essence/EssenceNineteen.png",
  X20: "OtherImages/Essence/EssenceTwenty.png"
};
const addCoinsBtn = document.getElementById('add-coins-btn');
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000];
let lastPlayerPower = null;

function getPlayerLevelFromPower(power) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (power >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

function renderStatIcon(statType, value) {
  // statType: "hp", "atk", "def", "cost"
  // value: number
  // Use COST_IMAGE_MAP["X" + value]
  const key = "X" + value;
  const imgSrc = COST_IMAGE_MAP[key];
  if (imgSrc) {
    // Tooltip for accessibility
    return `<img src="${imgSrc}" alt="${statType.charAt(0).toUpperCase() + statType.slice(1)}: ${value}" class="stat-img stat-${statType}" style="width:22px;height:22px;vertical-align:middle;margin-right:2px;">`;
  } else {
    return `<span>${value}</span>`;
  }
}
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
  (card.hp !== undefined ? `<span class="full-card-info-label">HP:</span> ${renderStatIcon('hp', card.hp)} ` : '') +
  (card.atk !== undefined ? `<span class="full-card-info-label">ATK:</span> ${renderStatIcon('atk', card.atk)} ` : '') +
  (card.def !== undefined ? `<span class="full-card-info-label">DEF:</span> ${renderStatIcon('def', card.def)} ` : '') +
  `<span class="full-card-info-label">Cost:</span> ${renderCardCost(card.cost)}` +
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

function renderCardCost(costData) {
  // Accepts either {red:2, blue:1, ...} or [{color:'red',amount:2}, ...]
  let html = '';
  if (!costData) {
   // Show the zero image if cost is 0
   return `<img src="${COST_IMAGE_MAP.X0}" alt="Cost: 0" style="width:26px;height:26px;vertical-align:middle;">`;
  }

  // Array style: [{color: 'red', amount: 2}, {colorless: 3}]
  if (Array.isArray(costData)) {
    costData.forEach(c => {
      if (c.color && COST_IMAGE_MAP[c.color]) {
        for (let i = 0; i < (c.amount || 1); i++) {
          html += `<img src="${COST_IMAGE_MAP[c.color]}" alt="${c.color}" style="width:26px;height:26px;vertical-align:middle;">`;
        }
      } else if (c.colorless) {
        const key = 'X' + c.colorless;
        if (COST_IMAGE_MAP[key]) {
          html += `<img src="${COST_IMAGE_MAP[key]}" alt="Colorless" style="width:26px;height:26px;vertical-align:middle;">`;
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
  return html || `<img src="${COST_IMAGE_MAP.X0}" alt="Cost: 0" style="width:26px;height:26px;vertical-align:middle;margin-right:2px;">`;
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

// MENU INSIDE VIEWPORT
function placeMenuWithinViewport(menu, triggerRect, preferred = "bottom") {
  // Default position: below the triggering element
  let top = triggerRect.bottom + window.scrollY + 8;
  let left = triggerRect.left + window.scrollX;

  // Temporarily set position to get true size
  menu.style.position = 'absolute';
  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;

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
// Example function to get number of unique collected cards (replace with your real function)
function getUniqueCollectedCardsCount() {
  if (window.getCollection) {
    const collection = window.getCollection();
    return Object.keys(collection)
      .filter(cid => collection[cid] > 0).length;
  }
  return 0;
}

// Placeholder for badge image selection (replace with your unlock logic)
function getCurrentPlayerBadgeImage() {
  // For now, just default, later use player level or unlocks
  return "OtherImages/Levels/One.png";
}

// PLAYER BADGE MENU
function showPlayerBadgeMenu(badgeImgEl) {
  // Hide any existing menus
  const menu = document.getElementById('player-badge-menu');
  if (!menu) return;

  // Update menu data
  document.getElementById('player-badge-menu-img').src = getCurrentPlayerBadgeImage();
  document.getElementById('player-badge-level-num').textContent = window.playerLevel || 1;
  document.getElementById('player-badge-unique-cards').textContent = getUniqueCollectedCardsCount();

  // Position menu next to badge image
  const rect = badgeImgEl.getBoundingClientRect();
  menu.style.left = rect.right + 12 + 'px';
  menu.style.top = (rect.top - 6) + 'px';
  menu.style.display = 'block';

  // Hide on click elsewhere
  setTimeout(() => {
    document.body.addEventListener('click', function handler(e) {
      if (!menu.contains(e.target)) menu.style.display = 'none';
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 20);
  // Prevent clicks inside the menu from closing it
  menu.onclick = (e) => e.stopPropagation();
}

 // ACCOUNT POWER
function calculatePlayerPower() {
  let power = 0;
  const collection = window.playerCollection || {};
  const foilCards = window.playerFoilCards || {};
  const avatars = window.playerUnlockedAvatars || [];
  const banners = window.playerUnlockedBanners || [];
  const cardbacks = window.playerUnlockedCardbacks || [];

  for (const card of dummyCards) {
    const owned = collection[card.id] || 0;
    const rarity = (card.rarity || 'common').toLowerCase();

    let maxCount = 0, perCardPower = 0, foilPower = 0;
    switch (rarity) {
      case 'common':    maxCount = 4; perCardPower = 1; foilPower = 2; break;
      case 'rare':      maxCount = 3; perCardPower = 3; foilPower = 6; break;
      case 'epic':      maxCount = 2; perCardPower = 10; foilPower = 20; break;
      case 'legendary': maxCount = 1; perCardPower = 25; foilPower = 50; break;
      default:          maxCount = 4; perCardPower = 1; foilPower = 2; break;
    }
    if (owned > 0) {
      power += perCardPower;
    }
    // Foil: only if player has foil version of this card
    if (foilCards[card.id]) {
      power += foilPower;
    }
  }

  // COSMETICS CONTRIBUTION
  power += (new Set(avatars)).size * 5;
  power += (new Set(banners)).size * 5;
  power += (new Set(cardbacks)).size * 5;

 // Achievements: +10 for each claimed achievement
  if (typeof getAchievementData === "function" && typeof ACHIEVEMENTS !== "undefined") {
    const achievementData = getAchievementData();
    let achievementsClaimed = 0;
    ACHIEVEMENTS.forEach(ach => {
      const progress = achievementData[ach.id];
      if (progress && progress.claimed) achievementsClaimed++;
    });
    power += achievementsClaimed * 10;
  }
  return power;
}
function renderPlayerPower() {
  const power = calculatePlayerPower();
  const el = document.getElementById('player-power-label');
  if (el) el.textContent = power;

  if (lastPlayerPower !== null && power > lastPlayerPower) {
    const diff = power - lastPlayerPower;
    showToast(`Power increased by ${diff}!`, { type: "success" });
  }
  lastPlayerPower = power;
}
// --- PROFILE MODAL LOGIC ---
function renderProfileInfoSection(playerData) {
  playerData = playerData || {};
  const profileBanner = playerData.profileBanner || "CardImages/Banners/DefaultBanner.png";
  const profilePic = playerData.profilePic || "CardImages/Avatars/Default.png";
  const username = playerData.username || "Unknown Player";
  const power = playerData.power || 0;

  return `
  <div style="
    background: url('${profileBanner}');
    background-size: cover;
    background-position: center;
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 24px;
    min-height: 120px;
    padding: 24px 32px 24px 32px;
    position: relative;
  ">
    <img src="${profilePic}" alt="Profile" style="
      width: 88px; height: 88px; border-radius: 50%;
      border: 4px solid #ffe066; box-shadow: 0 2px 16px #000c;
      object-fit: cover; background: #1a1b23; z-index:2;
      flex-shrink: 0;
    ">
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
      <div style="
        font-size: 1.38em; font-weight: bold; color: #ffe066;
        text-shadow: 0 2px 8px #000;
        margin-bottom: 6px;
        ">
        ${username}
      </div>
      <div style="
        font-size: 1.1em; font-weight: bold; color: #fff;
        display: flex; align-items: center; gap: 8px;
      ">
        <img src="OtherImages/Icons/Power.png" style="width:24px;">
        <span style="color:#ffe066;">${power}</span>
      </div>
    </div>
  </div>
  `;
}
// playerData: { username, profilePic, profileBanner, power, achievements: [badgeId,...], badges: [badgeId,...] }
function showProfileModal(playerData) {
  const modal = document.getElementById('profile-modal');
  const content = document.getElementById('profile-modal-content');
  if (!modal || !content) return;

  // Default values if not provided
  playerData = playerData || {};
  const profileBanner = playerData.profileBanner || "CardImages/Banners/DefaultBanner.png";
  const profilePic = playerData.profilePic || "CardImages/Avatars/Default.png";
  const username = playerData.username || "Unknown Player";
  const power = playerData.power || 0;

 let profileInfoSection = renderProfileInfoSection(playerData);

  // --- BADGE SECTIONS ---
  // You may already have ACHIEVEMENTS and BADGE_IMAGES in your code.
  // For this example, we'll use ACHIEVEMENTS as all badges.
  const allBadges = (typeof ACHIEVEMENTS !== "undefined") ? ACHIEVEMENTS : [];
  const ownedBadges = (playerData.achievements || []).concat(playerData.badges || []);
  const badgeImageMap = {}; // {badgeId: imageUrl}
  if (allBadges.length) {
    for (const badge of allBadges) {
      badgeImageMap[badge.id] = badge.image || badge.img || "";
    }
  }

  // Render all badges, grayed-out if not owned
  let badgeSection = `
    <div style="padding:22px 0 10px 0;text-align:center;">
      <div style="font-weight:bold;font-size:1.18em;color:#ffe066;margin-bottom:12px;">Badges</div>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
  `;
  for (const badge of allBadges) {
    const isOwned = ownedBadges.includes(badge.id);
    badgeSection += `
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <img src="${badgeImageMap[badge.id] || 'OtherImages/Icons/Rewards.png'}"
          alt="${badge.name || badge.title || badge.id}"
          style="width:54px;height:54px;${isOwned ? '' : 'filter:grayscale(1) brightness(0.6) opacity(0.5);'}box-shadow:0 2px 8px #0004;">
      </div>
    `;
  }
  badgeSection += "</div></div>";

  // --- Assemble Modal Content ---
  content.innerHTML = `
    ${profileInfoSection}
    ${badgeSection}
    <button id="close-profile-modal" class="btn-negative-secondary"">Close</button>
  `;

  // --- Close Logic ---
  document.getElementById('close-profile-modal').onclick = function() {
    modal.style.display = 'none';
  };
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Show modal
  modal.style.display = 'flex';
}

// Example usage (for testing in console):
// showProfileModal({username:"Gabo", profilePic:"CardImages/Avatars/Faelyra.png", profileBanner:"CardImages/Banners/Verdara.png", power:1234, achievements:["achv1","achv2"], badges:["badge1"]});
// FILTERS FOR GALLERY AND DECK BUILDER
function filterCards({
  collection,
  favoriteIds,
  showFavoritesOnly,
  selectedOwnerships,
  nameFilter,
  selectedColors,
  selectedCategories,
  selectedTypes,
  selectedRarities,
  selectedTraits,
  selectedArchetypes,
  selectedAbilities
}) {
  return dummyCards.filter(card => {
    // Ownership filter (custom multi-select logic)
    if (selectedOwnerships && selectedOwnerships.length && !selectedOwnerships.includes("")) {
      if (selectedOwnerships.includes("Owned") && (!collection[card.id] || collection[card.id] === 0))
        return false;
      if (selectedOwnerships.includes("Undiscovered") && (collection[card.id] || 0) > 0)
        return false;
      if (selectedOwnerships.includes("Locked") && !card.locked)
        return false;
      if (
        !selectedOwnerships.includes("Owned") &&
        !selectedOwnerships.includes("Undiscovered") &&
        !selectedOwnerships.includes("Locked")
      )
        return false;
    }
    if (nameFilter && !card.name.toLowerCase().includes(nameFilter)) return false;

    if (showFavoritesOnly && !favoriteIds.includes(card.id)) return false;
    // Color multi-filter
if (selectedColors && selectedColors.length) {
  const cardColors = Array.isArray(card.color) ? card.color.map(c => c.toLowerCase()) : [String(card.color).toLowerCase()];
  if (!cardColors.some(c => selectedColors.includes(c))) return false;
}
if (selectedCategories && selectedCategories.length) {
  const cardCategories = Array.isArray(card.category) ? card.category.map(c => c.toLowerCase()) : [String(card.category).toLowerCase()];
  if (!cardCategories.some(c => selectedCategories.includes(c))) return false;
}
if (selectedTypes && selectedTypes.length) {
  const cardTypes = Array.isArray(card.type) ? card.type.map(t => t.toLowerCase()) : [String(card.type).toLowerCase()];
  if (!cardTypes.some(t => selectedTypes.includes(t))) return false;
}
if (selectedRarities && selectedRarities.length) {
  const cardRarities = Array.isArray(card.rarity) ? card.rarity.map(r => r.toLowerCase()) : [String(card.rarity).toLowerCase()];
  if (!cardRarities.some(r => selectedRarities.includes(r))) return false;
}
if (selectedTraits && selectedTraits.length) {
  const cardTraits = Array.isArray(card.trait) ? card.trait.map(t => t.toLowerCase()) : [String(card.trait || '').toLowerCase()];
  if (!cardTraits.some(t => selectedTraits.includes(t))) return false;
}
if (selectedArchetypes && selectedArchetypes.length) {
  const cardArchetypes = Array.isArray(card.archetype) ? card.archetype.map(a => a.toLowerCase()) : [String(card.archetype).toLowerCase()];
  if (!cardArchetypes.some(a => selectedArchetypes.includes(a))) return false;
}
if (selectedAbilities && selectedAbilities.length) {
  const cardAbilities = Array.isArray(card.ability) ? card.ability.map(a => a.toLowerCase()) : [String(card.ability).toLowerCase()];
  if (!cardAbilities.some(a => selectedAbilities.includes(a))) return false;
}
    return true;
  });
}
window.filterCards = filterCards;

// Set up badge click handler
document.addEventListener('DOMContentLoaded', function() {
  const badgeImg = document.getElementById('player-badge-img');
  if (badgeImg) {
    // Set image (update this logic as you unlock more images)
    badgeImg.src = getCurrentPlayerBadgeImage();
    badgeImg.onclick = function(e) {
      e.stopPropagation();
      showPlayerBadgeMenu(badgeImg);
    };
  }
});
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
// PROFILE MODAL
document.addEventListener('DOMContentLoaded', function() {
  const badgeImg = document.getElementById('player-badge-menu-img');
  if (badgeImg) {
    badgeImg.style.cursor = "pointer";
    badgeImg.onclick = function(e) {
      e.stopPropagation();
      // Gather current player data for the modal
      const playerData = {
        username: window.playerUsername || (window.auth && window.auth.currentUser && window.auth.currentUser.displayName) || "Player",
        profilePic: window.playerProfilePic || badgeImg.src,
        profileBanner: window.playerProfileBanner || "CardImages/Banners/DefaultBanner.png",
        power: typeof calculatePlayerPower === "function" ? calculatePlayerPower() : 0,
        // Optionally, pass owned achievements/badges if available
        achievements: (typeof getAchievementData === "function" && typeof ACHIEVEMENTS !== "undefined")
          ? ACHIEVEMENTS.filter(a => getAchievementData()[a.id]?.claimed).map(a => a.id)
          : [],
        badges: [] // add badge ids as needed
      };
      showProfileModal(playerData);
    };
  }
});
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
function isFoilCard(cardId) {
  return window.playerFoilCards && window.playerFoilCards[cardId];
}
