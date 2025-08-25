// CARD LIST //    
const dummyCards = [
/*

// CHAMPIONS BASIC //

{id: 'SylvaniaThornEmpress', name: 'Sylvania, Thorn Empress', rarity: 'Legendary', image: 'CardImages/Sylvan/Sylvania, Thorn Empress.png', 
 category: 'Creature', color: 'Green', type: ['Elf', 'Mage'], trait: 'Champion', hp: 11, atk: 1, def: 0,
 cost: {green: 3}, essence: {green: 1}, archetype: 'Sylvan', ability: ['Ranged',''], skill: ['Dash {Y}{W}','Hexblast {B}{CW}','Briar Queen's Grasp {G}{CCW}'], set: 'StandardPack'},

{id: 'KaelenBlazebornHuntress', name: 'Kaelen, Blazeborn Huntress', rarity: 'Legendary', image: 'CardImages/Skullframe/Kaelen, Blazeborn Huntress.png', 
 category: 'Creature', color: 'Red', type: 'Warrior', trait: 'Champion', hp: 8, atk: 1, def: 0,
 cost: {red: 3}, essence: {red: 1}, archetype: '', ability: ['Burn','Ranged'], skill: ['Hexblast {B}{CW}', { name: 'Scorching Skyfall', cost: '{R}{R}{CCW}', type: 'Burst', damage: 2, burn: true }],
 set: 'StandardPack'},

{id: 'ZaryonPearlhavenCommander', name: 'Zaryon, Pearlhaven Commander', rarity: 'Legendary', image: 'CardImages/Skullframe/Zaryon, Pearlhaven Commander.png', 
 category: 'Creature', color: 'Blue', type: ['Merfolk', 'Warrior'], trait: 'Champion', hp: 12, atk: 2, def: 1,
 cost: {blue: 3}, essence: {blue: 1}, archetype: '', ability: ['Dive','Pierce'], skill: ['Hexbind {Y}{Y}','Hexblast {B}{CW}','Tidepiercer Vortex {U}{CCW}'], set: 'StandardPack'},

{id: 'ZyraThunderbladeDuelist', name: 'Zyra, Thunderblade Duelist', rarity: 'Legendary', image: 'CardImages/Skullframe/Zyra, Thunderblade Duelist.png', 
 category: 'Creature', color: 'Yellow', type: 'Warrior', trait: 'Champion', hp: 7, atk: 1, def: 0,
 cost: {yellow: 3}, essence: {yellow: 1}, archetype: '', ability: ['Ranged','Veil'], skill: ['Hexbind {Y}{Y}','Hexblast {B}{CW}','Blade Tempest {Y}{Y}'], set: 'StandardPack'},

{id: 'MordrathPlagueKing', name: 'Mordrath, Plague King', rarity: 'Legendary', image: 'CardImages/Skullframe/Mordrath, Plague King.png', 
 category: 'Creature', color: 'Purple', type: ['Undead', 'Warrior'], trait: 'Champion', hp: 6, atk: 1, def: 1,
 cost: {purple: 3}, essence: {purple: 1}, archetype: '', ability: ['Immunity','Venom'], skill: ['Hexbind {B}{P}','Hexblast {B}{CW}','Reanimate {2}{B}{B}'], set: 'StandardPack'},

{id: 'GravokDrakzulTyrant', name: 'Gravok, Drakzul Tyrant', rarity: 'Legendary', image: 'CardImages/Skullframe/Gravok, Drakzul Tyrant.png', 
 category: 'Creature', color: 'Gray', type: 'Warrior', trait: 'Champion', hp: 10, atk: 2, def: 1,
 cost: {gray: 3}, essence: {gray: 1}, archetype: '', ability: ['Armor','Crush'], skill: ['Hexblast {B}{CW}','Seismic Smite {C}{CCW}'], set: 'StandardPack'},

{id: 'VelmiraMistressofSilence', name: 'Velmira, Mistress of Silence', rarity: 'Legendary', image: 'CardImages/Skullframe/Velmira, Mistress of Silence.png', 
 category: 'Creature', color: 'Black', type: 'Mage', trait: 'Champion', hp: 9, atk: 2, def: 0,
 cost: {black: 3}, essence: {black: 1}, archetype: '', ability: ['Ranged','Veil'], skill: ['Hexbind {B}{P}','Hexblast {B}{CW}','Reanimate {2}{B}{B}'], set: 'StandardPack'},

{id: 'ElyndraDawnbladeofHeavens', name: 'Elyndra, Dawnblade of Heavens', rarity: 'Legendary', image: 'CardImages/Skullframe/Elyndra, Dawnblade of Heavens.png', 
 category: 'Creature', color: 'White', type: 'Warrior', trait: 'Champion', hp: 10, atk: 2, def: 1,
 cost: {white: 3}, essence: {white: 1}, archetype: '', ability: ['Aegis','Veil'], skill: ['Hexbind {B}{P}','Hexblast {B}{CW}','Radiant Severance {W}{CCW}'], set: 'StandardPack'},


// DRAGONS //

{id: 'Verdarok, Sylvan Warden', name: 'Verdarok, Sylvan Warden', rarity: 'Legendary', image: 'CardImages/Thornwings/Pyronyx, Inferno Gale.png', 
 category: 'Creature', color: 'Green', type: 'Dragon', trait: 'Evolution', hp: 18, atk: 5, def: 3,
 cost: {colorless: 4, green: 2}, archetype: 'Thornwing', ability: ['Flying','Protect'], skill: ['Hexbind {Y}{Y}','Hexblast {B}{CW}','Blade Tempest {Y}{Y}'], set: 'StandardPack'},

{id: 'PyronyxInfernoGale', name: 'Pyronyx, Inferno Gale', rarity: 'Legendary', image: 'CardImages/Cinderscales/Noctyros, Umbral Tyrant.png', 
 category: 'Creature', color: 'Red', type: 'Dragon', trait: 'Evolution', hp: 11, atk: 5, def: 2,
 cost: {colorless: 3, red: 2}, archetype: 'Cinderscale', ability: ['Burn','Flying','Ranged'], skill: ['Reveal {R}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

{id: 'AbyndraTidalWraith', name: 'Abyndra, Tidal Wraith', rarity: 'Legendary', image: 'CardImages/Abyssdrakes/Abyndra, Tidal Wraith.png', 
 category: 'Creature', color: 'Blue', type: 'Dragon', trait: 'Evolution', hp: 19, atk: 4, def: 2,
 cost: {colorless: 5, blue: 2}, archetype: 'Abyssdrake', ability: ['Flying','Aegis','Veil'], skill: ['Reveal {R}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

{id: 'VoltrazekTempestReaver', name: 'Voltrazek, Tempest Reaver', rarity: 'Legendary', image: 'CardImages/Stormrazors/Voltrazek, Tempest Reaver.png', 
 category: 'Creature', color: 'Yellow', type: 'Dragon', trait: 'Evolution', hp: 13, atk: 4, def: 1,
 cost: {colorless: 3, yellow: 2}, archetype: 'Stormrazor', ability: ['Flying','Pierce'], skill: ['Reveal {R}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

{id: 'ToxigonBlightedMaw', name: 'Toxigon, Blighted Maw', rarity: 'Legendary', image: 'CardImages/Venomspines/Toxigon, Blighted Maw.png', 
 category: 'Creature', color: 'Purple', type: 'Dragon', trait: 'Evolution', hp: 4, atk: 4, def: 1,
 cost: {colorless: 4, purple: 2}, archetype: 'Venomspine', ability: ['Flying','Venom'], skill: ['Reveal {R}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

{id: 'FerronyxTerraColossus', name: 'Ferronyx, Terra Colossus', rarity: 'Legendary', image: 'CardImages/Terraclaws/Ferronyx, Terra Colossus.png', 
 category: 'Creature', color: 'Gray', type: 'Dragon', trait: 'Evolution', hp: 9, armor: 5, atk: 5, def: 2,
 cost: {colorless: 4, gray: 2}, archetype: 'Terraclaw', ability: ['Armor','Flying','Protect'], skill: ['Reveal {R}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

{id: 'NoctyrosUmbralTyrant', name: 'Noctyros, Umbral Tyrant', rarity: 'Legendary', image: 'CardImages/Nightshrouds/Noctyros, Umbral Tyrant.png', 
 category: 'Creature', color: 'Black', type: 'Dragon', trait: 'Evolution', hp: 12, atk: 6, def: 2,
 cost: {colorless: 4, black: 2}, archetype: 'Nightshroud', ability: ['Flying','Protect'], skill: ['Discard {B}','Nightfall Surge {B}{CW}'], set: 'StandardPack'},

{id: 'SolarythRadianceDawnbreaker', name: 'Solaryth, Radiance Dawnbreaker', rarity: 'Legendary', image: 'CardImages/Solarwyrms/Solaryth, Radiance Dawnbreaker.png', 
 category: 'Creature', color: 'White', type: 'Dragon', trait: 'Evolution', hp: 17, atk: 4, def: 2,
 cost: {colorless: 4, white: 2}, archetype: 'Solarwyrm', ability: ['Flying','Aegis'], skill: ['Seal {W}{W}','Celestial Scales {W}{CW}'], set: 'StandardPack'},


// CHAMPIONS ADVANCED //
{id: 'FaeliraSatyrEmpress', name: 'Faelira, Satyr Empress', rarity: 'Legendary', image: 'CardImages/Firelands/Faelira, Satyr Empress.png', 
 category: 'Creature', color: 'Green', type: ['Satyr', 'Mage'], trait: 'Champion', hp: 11, atk: 2, def: 0,
 cost: {green: 3}, essence: {green: 1}, archetype: '', ability: ['Ranged',''], skill: ['Dash {Y}{W}','Hexblast {B}{CW}','Flametongue Invocation {R}{B}'], set: 'StandardPack'},

{id: 'KaelyraFirelandsHeiress', name: 'Kaelyra, Firelands Heiress', rarity: 'Legendary', image: 'CardImages/Firelands/Kaelyra, Firelands Heiress.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Mage', 'Demon'], trait: 'Champion', hp: 8, atk: 2, def: 0,
 cost: {red: 2, black: 1}, essence: {red: 1}, archetype: 'Firelands', ability: ['Burn','Ranged'], skill: ['Dash {Y}{W}','Hexblast {B}{CW}','Flametongue Invocation {R}{B}'], set: 'StandardPack'},

{id: 'VorgannaCrimsonBlade', name: 'Vorganna, Crimson Blade', rarity: 'Legendary', image: 'CardImages/Firelands/Vorganna, Crimson Blade.png', 
 category: 'Creature', color: ['Black','Red'], type: 'Warrior', trait: 'Champion', hp: 9, atk: 3, def: 0,
 cost: {black: 2, red: 1}, essence: {black: 1}, archetype: '', ability: ['Burn','Ranged'], skill: ['Dash {Y}{W}','Hexblast {B}{CW}','Flametongue Invocation {R}{B}'], set: 'StandardPack'},

{id: 'TydrosCoralboundTidebreaker', name: 'Tydros, Coralbound Tidebreaker', rarity: 'Legendary', image: 'CardImages/Firelands/Tydros, Coralbound Tidebreaker.png', 
 category: 'Creature', color: ['Blue','Gray'], type: 'Warrior', trait: 'Champion', hp: 12, atk: 2, def: 0,
 cost: {blue: 2, gray: 1}, essence: {blue: 1}, archetype: '', ability: ['Dive','Ranged'], skill: ['Dash {Y}{W}','Hexblast {B}{CW}','Flametongue Invocation {R}{B}'], set: 'StandardPack'},

{id: 'VeniryssSpiderPrincess', name: 'Veniryss, Spider Princess', rarity: 'Legendary', image: 'CardImages/Silkbound/Veniryss, Spider Princess.png', 
 category: 'Creature', color: ['Purple','Green'], type: 'Mage', trait: 'Champion', hp: 10, atk: 1, def: 0,
 cost: {purple: 2, green: 1}, essence: {purple: 1}, archetype: 'Silkbound', ability: ['Venom','Veil'], skill: ['Dash {Y}{W}','Hexblast {B}{CW}','Silken Dominion {P}{G}{CCW}'], set: 'StandardPack'},

{id: 'RaukharKnightofDuskwings', name: 'Raukhar, Knight of Duskwings', rarity: 'Legendary', image: 'CardImages/Duskwings/Raukhar, Knight of Duskwings.png', 
 category: 'Creature', color: ['Black','Yellow'], type: 'Avian', trait: 'Champion', hp: 9, atk: 2, def: 1,
 cost: {black: 2, yellow: 1}, essence: {black: 1}, archetype: 'Duskwings', ability: ['Flying','Scavenger'], skill: ['Dash {Y}{W}','Hexblast {B}{CW}','Shadowfeather Storm {B}{B}{Y}{CCW}'], set: 'StandardPack'},

{id: 'GarudaWingsofZephyra', name: 'Garuda, Wings of Zephyra', rarity: 'Legendary', image: 'CardImages/Zephyra/Garuda, Wings of Zephyra.png', 
 category: 'Creature', color: ['Yellow','White'], type: 'Avian', trait: 'Champion', hp: 9, atk: 2, def: 1,
 cost: {yellow: 2, white: 1}, essence: {yellow: 1}, archetype: 'Zephyra', ability: ['Flying','Veil'], skill: ['Dash {Y}{W}','Hexblast {B}{CW}','Featherfall Tempest {Y}{W}{CW}'], set: 'StandardPack'},
*/
{id: 'ForestFairy', name: 'Forest Fairy', rarity: 'Common', image: 'CardImages/BasicCreatures/Fairy.png', 
 category: 'Creature', color: 'Green', type: 'Fairy', hp: 1, atk: 1, def: 0,
 cost: 0, archetype: 'Fairy', ability: 'Flying', set: 'StandardPack'},
{id: 'ForestGoblin', name: 'Forest Goblin', rarity: 'Common', image: 'CardImages/BasicCreatures/Goblin.png', 
 category: 'Creature', color: 'Green', type: 'Goblin', hp: 3, atk: 1, def: 0,
 cost: 0, archetype: 'Goblin', set: 'StandardPack'},
{id: 'Emberling', name: 'Emberling', rarity: 'Common', image: 'CardImages/BasicCreatures/Emberling.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 0,
 cost: 0, archetype: 'Firelands', ability: 'Burn', set: 'StandardPack'},
{id: 'Fire Pixie', name: 'Fire Pixie', rarity: 'Common', image: 'CardImages/BasicCreatures/FirePixie.png', 
 category: 'Creature', color: 'Red', type: 'Fairy', hp: 3, atk: 2, def: 0,
 cost: 0, archetype: 'Pixiebound', ability: ['Burn','Flying'], set: 'StandardPack'},
{id: 'Hellcharger', name: 'Hellcharger', rarity: 'Common', image: 'CardImages/BasicCreatures/Hellcharger.png', 
 category: 'Creature', color: 'Red', type: 'Warrior', hp: 3, atk: 2, def: 0,
 cost: {colorless: 1}, archetype: 'Firelands', ability: 'Burn', set: 'StandardPack'},
{id: 'WaterElemental', name: 'Water Elemental', rarity: 'Common', image: 'CardImages/BasicCreatures/WaterElemental.png', 
 category: 'Creature', color: 'Blue', type: 'Elemental', hp: 5, atk: 2, def: 0,
 cost: {blue: 1}, archetype: '', ability: ['Dive','Elusive','Soak'], set: 'StandardPack'},
{id: 'DesertWolf', name: 'Desert Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/DesertWolf.png', 
 category: 'Creature', color: 'Gray', type: 'Beast', hp: 3, atk: 2, def: 0,
 cost: {colorless: 1}, archetype: 'Moonfang', ability: 'Ambush', set: 'StandardPack'},
{id: 'Golemites', name: 'Golemites', rarity: 'Common', image: 'CardImages/BasicCreatures/Golemites.png', 
 category: 'Creature', color: 'Gray', type: 'Elemental', hp: 3, armor: 1, atk: 2, def: 0,
 cost: 0, archetype: 'Golemheart', ability: 'Armor', set: 'StandardPack'},
{id: 'Wolf', name: 'Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/Wolf.png', 
 category: 'Creature', color: 'Black', type: 'Beast', hp: 3, atk: 2, def: 0,
 cost: {colorless: 1}, archetype: 'Moonfang', ability: 'Ambush', set: 'StandardPack'},
{id: 'Skeleton', name: 'Skeleton', rarity: 'Common', image: 'CardImages/BasicCreatures/Skeleton.png',
 category: 'Creature', color: 'Black', type: 'Undead', hp: 1, atk: 1, def: 0,
 cost: 0, archetype: 'Skullframe', ability: 'Immunity',
 skill: [{ name: 'Reanimate', cost: '{1}{B}', type: 'Reanimate'}], set: 'StandardPack'},
{id: 'Bat', name: 'Bat', rarity: 'Common', image: 'CardImages/BasicCreatures/Bat.png', 
 category: 'Creature', color: 'Black', type: 'Vampire', hp: 3, atk: 2, def: 0,
 cost: {colorless: 1}, archetype: 'Vampiric', ability: ['Drain','Flying'], set: 'StandardPack'},
{id: 'Imp', name: 'Imp', rarity: 'Common', image: 'CardImages/BasicCreatures/Imp.png', 
 category: 'Creature', color: 'Black', type: 'Demon', hp: 1, atk: 2, def: 0,
 cost: { colorless: 1 },  archetype: '', ability: ['Ambush','Flying'], set: 'StandardPack'},
{id: 'Vampire', name: 'Vampire', rarity: 'Rare', image: 'CardImages/BasicCreatures/Vampire.png', 
 category: 'Creature', color: 'Black', type: 'Demon', hp: 3, atk: 2, def: 0,
 cost: {colorless: 1, black: 1}, archetype: 'Vampiric', ability: ['Drain','Flying'], set: 'StandardPack'},
/*
{id: 'ForestWarrior', name: 'Forest Warrior', rarity: 'Rare', image: 'CardImages/BasicCreatures/Forest Warrior.png', 
 category: 'Creature', color: 'Green', type: ['Construct','Warrior'], hp: 6, atk: 3, def: 1, cost: {colorless: 1, green: 1}, 
 archetype: '', ability: ['Drain','Rush'], skill: 'Dash {G}', set: 'StandardPack'},
{id: 'ForestMage', name: 'Forest Mage', rarity: 'Rare', image: 'CardImages/Treant/Forest Mage.png', 
 category: 'Creature', color: 'Green', type: ['Elemental','Mage'], hp: 5, atk: 2, def: 0, cost: {colorless: 1, green: 1}, 
 archetype: 'Treant', ability: 'Ranged', skill: 'Bloomchant {CW}', set: 'StandardPack'},
{id: 'WoodlandCentaur', name: 'Woodland Centaur', rarity: 'Rare', image: 'CardImages/BasicCreatures/Woodland Centaur.png', 
 category: 'Creature', color: 'Green', type: 'Beast', hp: 8, atk: 3, def: 1, cost: {colorless: 1, green: 1}, 
 archetype: 'Hybrids', ability: ['Intimidate','Leap','Rush'], skill: '', set: 'StandardPack'},

{id: 'WaterWyrm', name: 'Water Wyrm', rarity: 'Legendary', image: 'CardImages/Abyssdrakes/Water Wyrm.png', 
 category: 'Creature', color: 'Blue', type: ['Dragon','Elemental'], trait: 'Evolution', hp: 6, atk: 2, def: 0,
 cost: {colorless: 1, blue: 1}, archetype: 'Abyssdrake', ability: ['Dive','Elusive','Soak'], skill: ['Reveal {R}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

{id: 'ZephyraHarpy', name: 'Zephyra Harpy', rarity: 'Rare', image: 'CardImages/Harpies/Zephyra Harpy.png', 
 category: 'Creature', color: 'Yellow', type: 'Avian', hp: 7, atk: 3, def: 1,
 cost: {colorless: 1, yellow: 2}, archetype: 'Harpy', ability: ['Flying','Quickdraw'], skill: ['Echo {G}{B}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

{id: 'SatyrRitualist', name: 'Satyr Ritualist', rarity: 'Rare', image: 'CardImages/BasicCreatures/Satyr Ritualist.png', 
 category: 'Creature', color: 'Purple', type: 'Satyr', hp: 4, atk: 2, def: 0, cost: {purple: 1}, 
 archetype: 'Satyr', ability: ['Ranged','Spellboost'], skill: 'Arrival', set: 'StandardPack'},
{id: 'TreantWitch', name: 'Treant Witch', rarity: 'Epic', image: 'CardImages/BasicCreatures/Treant Witch.png', 
 category: 'Creature', color: ['Green','Black'], type: ['Elemental','Mage'], hp: 8, atk: 3, def: 1, cost: {colorless: 1, green: 1, black: 1}, 
 archetype: 'Treant', ability: ['Ranged','Burn'], skill: 'Reanimate {G}{B}', set: 'StandardPack'},
{id: 'AngelicWarrior', name: 'Angelic Warrior', rarity: 'Common', image: 'CardImages/BasicCreatures/Angelic Warrior.png', 
 category: 'Creature', color: 'White', type: 'Warrior', hp: 6, atk: 3, def: 1,
 cost: {colorless: 1, white: 1}, archetype: 'Seraph', ability: 'Flying', set: 'StandardPack'},
{id: 'Valkyrie', name: 'Valkyrie', rarity: 'Common', image: 'CardImages/BasicCreatures/Valkyrie.png', 
 category: 'Creature', color: 'White', type: 'Warrior', hp: 5, atk: 3, def: 1,
 cost: {colorless: 2}, archetype: '', ability: '', set: 'StandardPack'},
{id: 'HeraldofLight', name: 'Herald of Light', rarity: 'Rare', image: 'CardImages/BasicCreatures/Herald of Light.png', 
 category: 'Creature', color: 'White', type: 'Construct', hp: 8, atk: 2, def: 1,
 cost: {colorless: 1, white: 1}, archetype: 'Seraph', ability: ['Flying','Aegis'], set: 'StandardPack'},
{id: 'SacredKirin', name: 'Sacred Kirin', rarity: 'Epic', image: 'CardImages/BasicCreatures/Sacred Kirin.png', 
 category: 'Creature', color: 'White', type: 'Beast', hp: 13, atk: 4, def: 1, cost: {colorless: 3, white: 1}, 
 archetype: 'Hybrids', ability: ['Intimidate','Rush'], skill: 'Heavenstep Radiance {W}{CW}', set: 'StandardPack'},
{id: 'LightPossessedArmor', name: 'Light Possessed Armor', rarity: 'Rare', image: 'CardImages/BasicCreatures/Light Possessed Armor.png', 
 category: 'Creature', color: 'White', type: 'Construct', hp: 4, atk: 3, def: 1, cost: {colorless: 1, white: 1}, 
 archetype: '', ability: ['Armor','Rush'], skill: '', set: 'StandardPack'},

// OTHER MULTICOLORED //

{id: 'DragonsApprentice', name: 'Dragon's Apprentice', rarity: 'Rare', image: 'CardImages/Cinderscales/Dragon's Apprentice.png', 
 category: 'Creature', color: 'Red', type: 'Dragon', trait: 'Evolution', hp: 4, atk: 2, def: 0,
 cost: {colorless: 2}, archetype: '', ability: ['Burn','Flying','Ranged'], skill: ['Reveal {R}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

{id: 'Jackalope', name: 'Jackalope', rarity: 'Rare', image: 'CardImages/Hybrids/Jackalope.png', 
 category: 'Creature', color: ['Green','Black'], type: 'Beast', hp: 5, atk: 2, def: 0,
 cost: {green: 1, black: 1}, archetype: 'Hybrids', ability: ['Burn','Flying','Ranged'], skill: ['Echo {G}{B}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

{id: 'DarkHarpy', name: 'Dark Harpy', rarity: 'Rare', image: 'CardImages/Harpies/Dark Harpy.png', 
 category: 'Creature', color: ['Yellow','Black'], type: 'Avian', hp: 6, atk: 4, def: 1,
 cost: {colorless: 2, yellow: 1, black: 1}, archetype: 'Harpy', ability: ['Flying','Quickdraw'], skill: ['Echo {G}{B}','Cataclysmic Blaze {R}{CW}'], set: 'StandardPack'},

*/

// PIXIEBOUND //
/*
{id: 'FairyWarrior', name: 'Fairy Warrior', rarity: 'Rare', image: 'CardImages/BasicCreatures/Fairy Warrior.png', 
 category: 'Creature', color: 'Green', type: ['Fairy','Warrior'], hp: 4, atk: 3, def: 1, cost: {colorless: 1, green: 1}, 
 archetype: 'Pixiebound', ability: ['Flying','Rush'], skill: 'Dash {G}', set: 'StandardPack'},



*/
 
// CINDERCORE //
{id: 'CindercoreSentry', name: 'Cindercore Sentry', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Sentry.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3,
 cost: {colorless: 3, red: 1}, archetype: 'Cindercore', ability: 'Armor', set: 'StandardPack'},
{id: 'CindercoreProtector', name: 'Cindercore Protector', rarity: 'Rare', image: 'CardImages/Cindercore/Cindercore Protector.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3,
 cost: {colorless: 3, red: 1}, archetype: 'Cindercore', ability: 'Armor', set: 'StandardPack'},
{id: 'CindercoreVanguard', name: 'Cindercore Vanguard', rarity: 'Common', image: 'CardImages/Cindercore/Cindercore Vanguard.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3,
 cost: {colorless: 1, red: 1}, archetype: 'Cindercore', ability: 'Armor', set: 'StandardPack'},
{id: 'CindercoreGolem', name: 'Cindercore Golem', rarity: 'Rare', image: 'CardImages/Cindercore/Cindercore Golem.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 15, atk: 6, def: 3,
 cost: {colorless: 3, red: 1}, archetype: ['Cindercore','Golemheart'], ability: 'Armor', set: 'StandardPack'},
{id: 'IgnavarynCindercoreAutomaton', name: 'Ignavaryn, Cindercore Automaton', rarity: 'Legendary', image: 'CardImages/Cindercore/Ignavaryn, Cindercore Automaton.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3,
 cost: {colorless: 5, red: 2}, archetype: 'Cindercore', ability: 'Armor', set: 'StandardPack'},

// FIRELANDS //
{id: 'FirelandsScamperling', name: 'Firelands Scamperling', rarity: 'Common', image: 'CardImages/Firelands/Firelands Scamperling.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1,
 cost: {colorless: 2}, archetype: 'Firelands', ability: ['Burn','Rush'], set: 'StandardPack'},
{id: 'FirelandsCindercub', name: 'Firelands Cindercub', rarity: 'Common', image: 'CardImages/Firelands/Firelands Cindercub.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1,
 cost: {colorless: 1}, archetype: 'Firelands', ability: ['Burn','Rush'], set: 'StandardPack'},
{id: 'FirelandsLynx', name: 'Firelands Lynx', rarity: 'Common', image: 'CardImages/Firelands/Firelands Lynx.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1,
 cost: {colorless: 3, red: 1}, archetype: 'Firelands', ability: ['Burn','Leap','Rush'], set: 'StandardPack'},
{id: 'FirelandsKitsune', name: 'Firelands Kitsune', rarity: 'Common', image: 'CardImages/Firelands/Firelands Kitsune.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 4, atk: 3, def: 0,
 cost: {colorless: 1, red: 1}, archetype: 'Firelands', ability: ['Burn','Leap','Rush'], set: 'StandardPack'},
{id: 'FirelandsDirebeast', name: 'Firelands Direbeast', rarity: 'Rare', image: 'CardImages/Firelands/Firelands Direbeast.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 9, atk: 5, def: 2,
 cost: {colorless: 4, red: 1}, archetype: 'Firelands', ability: ['Burn','Rush'], set: 'StandardPack'},
{id: 'FirelandsHellhound', name: 'Firelands Hellhound', rarity: 'Rare', image: 'CardImages/Firelands/Firelands Hellhound.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], hp: 7, atk: 5, def: 1,
 cost: {colorless: 2, red: 1}, archetype: 'Firelands', ability: ['Burn','Intimidate','Rush'], set: 'StandardPack'},
{id: 'FirelandsHellmaw', name: 'Firelands Hellmaw', rarity: 'Epic', image: 'CardImages/Firelands/Firelands Hellmaw.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Dragon','Demon'], hp: 8, atk: 6, def: 1,
 cost: {colorless: 2, red: 1, black: 1}, archetype: 'Firelands', ability: ['Burn','Flying','Rush'], set: 'StandardPack'},
{id: 'EphorosFirelandsBehemoth', name: 'Ephoros, Firelands Behemoth', rarity: 'Legendary', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], hp: 13, atk: 9, def: 3,
 cost: {colorless: 5, red: 1, black: 1}, archetype: 'Firelands', ability: ['Burn','Crush','Intimidate'], set: 'StandardPack'},
{id: 'EphorosFirelandsBehemothFA', name: 'Ephoros, Firelands Behemoth', rarity: 'Legendary', image: 'CardImages/Firelands/Ephoros, Firelands Behemoth FA.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], hp: 13, atk: 9, def: 3,
 cost: {colorless: 5, red: 1, black: 1}, archetype: 'Firelands', ability: ['Burn','Crush','Intimidate'], set: 'StandardPack'},

// GOLEMHEART //
{id: 'PyrokragGolemheartTitan', name: 'Pyrokrag, Golemheart Titan', rarity: 'Legendary', image: 'CardImages/Golems/Pyrokrag, Golemheart Titan.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 9, armor: 5, atk: 8, def: 3,
 cost: {colorless: 5, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Fire Armor', trait: 'Fusion', set: 'Primordial Ascension'},
{id: 'GolemheartGiant', name: 'Golemheart Giant', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Giant.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 6, atk: 5, def: 2,
 cost: {colorless: 2, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Burn', set: 'PrimordialAscension'},
{id: 'SmolderingGolemheart', name: 'Smoldering Golemheart', rarity: 'Rare', image: 'CardImages/Golems/Smoldering Golemheart .png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 5, armor: 3, atk: 5, def: 2,
 cost: {colorless: 6, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Burn', set: 'PrimordialAscension'},
{id: 'GolemheartSentinel', name: 'Golemheart Sentinel', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Sentinel.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 7, armor: 3, atk: 3, def: 2,
 cost: {colorless: 1, red: 1, gray: 1}, archetype: 'Golemheart', ability: 'Protect', set: 'PrimordialAscension'},
{id: 'FireGolem', name: 'Fire Golem', rarity: 'Common', image: 'CardImages/Golems/Fire Golem.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: ['Elemental','Golem'], hp: 3, atk: 2, def: 1,
 cost: {red: 1, gray: 1}, archetype: ['Firelands','Golemheart'], ability: 'Burn', set: 'PrimordialAscension'},
{id: 'KaelgorranElementalPrimordial', name: 'Kaelgorran, Elemental Primordial', rarity: 'Legendary', image: 'CardImages/Golems/Kaelgorran, Elemental Primordial.png', 
 category: 'Creature', color: ['Green','Red', 'gray'], type: ['Elemental','Golem'], hp: 18, atk: 6, def: 3, cost: {colorless: 4, red: 1, gray: 1},
 archetype: 'Golemheart', ability: 'Burn', trait: 'Fusion', set: 'Primordial Ascension'},
{id: 'AcidicGolem', name: 'Acidic Golem', rarity: 'Rare', image: 'CardImages/Golems/Acidic Golem.png', 
 category: 'Creature', color: ['Purple', 'Gray'], type: ['Elemental','Golem'], hp: 8, armor: 4, atk: 4, def: 3, cost: {colorless: 2, purple: 1, gray: 1}, archetype: 'Golemheart', ability: 'toxic', set: 'PrimordialAscension'},

// CORALBOUND //
{id: 'CoralboundSentry', name: 'Coralbound Sentry', rarity: 'Common', image: 'CardImages/Coralbound/Coralbound Sentry.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 4, atk: 2, def: 1,
 cost: {blue: 1}, archetype: 'Coralbound', ability: '', set: 'StandardPack'},
{id: 'CoralboundProtector', name: 'Coralbound Protector', rarity: 'Rare', image: 'CardImages/Coralbound/Coralbound Protector.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 10, atk: 3, def: 2,
 cost: {colorless: 3, blue: 1}, archetype: 'Coralbound', ability: ['Protect','Lifelink'], set: 'StandardPack'},
{id: 'CoralboundVanguard', name: 'Coralbound Vanguard', rarity: 'Rare', image: 'CardImages/Coralbound/Coralbound Vanguard.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 6, atk: 3, def: 1,
 cost: {colorless: 1, blue: 1}, archetype: 'Coralbound', ability: 'Rush', set: 'StandardPack'},
{id: 'MaelvyrnCoralboundAutomatonFA', name: 'Maelvyrn, Coralbound Automaton', rarity: 'Legendary', image: 'CardImages/Coralbound/Maelvyrn, Coralbound Automaton.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 20, atk: 8, def: 5, cost: {colorless: 6, blue: 2},
 archetype: 'Coralbound', ability: 'Protect', trait: 'Fusion', set: 'StandardPack'},

// GLIMMERSCALE //
{id: 'WyrmofThornsandSunfire', name: 'Wyrm of Thorns and Sunfire', rarity: 'Rare', image: 'CardImages/Glimmerscale/Wyrm of Thorns and Sunfire.png', 
 category: 'Creature', color: ['Green', 'Red', 'White'], type: ['Dragon','Fairy'], hp: 10, atk: 3, def: 1,
 cost: {green: 1, red: 1, white: 1}, archetype: 'Glimmerscale', ability: ['Flying','Intimidate'], set: 'StandardPack'},
/*
{id: 'FairyDragon', name: 'Fairy Dragon', rarity: 'Rare', image: 'CardImages/Glimmerscale/Fairy Dragon.png', 
 category: 'Creature', color: ['Green', 'Red', 'White'], type: ['Dragon','Fairy'], hp: 6, atk: 2, def: 1, cost: {green: 1, red: 1, white: 1},
 ability: ['Flying','Intimidate'], archetype: 'Glimmerscale', skill: ['Purify {W}{CW}','Floral Mirage {G}{CW}'], set: 'StandardPack'},

{id: 'FairyAmphitere', name: 'Fairy Amphitere', rarity: 'Rare', image: 'CardImages/Glimmerscale/Fairy Amphitere.png', 
 category: 'Creature', color: ['Green', 'Red', 'White'], type: ['Dragon','Fairy'], hp: 14, atk: 5, def: 2, cost: {green: 1, red: 1, white: 1},
 ability: ['Flying','Intimidate'], archetype: 'Glimmerscale', skill: ['Purify {W}{CW}','Dewlight Spiral {1}{G}{W}'], set: 'StandardPack'},


*/
 
// SKULLFRAME //
{id: 'SkullframeDefector', name: 'Skullframe Defector', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Defector.png', 
 category: 'Creature', color: 'Black', type: ['Undead','Warrior'], hp: 3, atk: 2, def: 1,
 cost: {colorless: 1}, archetype: 'Skullframe', ability: 'Immunity', skill: 'Reanimate {2}{B}', set: 'StandardPack'},
{id: 'SkullframeUnyielding', name: 'Skullframe Unyielding', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Unyielding.png', 
 category: 'Creature', color: 'Black', type: 'Undead', hp: 4, atk: 1, def: 0,
 cost: {colorless: 1, black: 1}, archetype: 'Skullframe', ability: ['Immunity','Rush'], skill: 'Reanimate {2}{B}', set: 'StandardPack'},
{id: 'SkullframeAcolyte', name: 'Skullframe Acolyte', rarity: 'Common', image: 'CardImages/Skullframe/Skullframe Acolyte.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: 'Undead', hp: 5, atk: 3, def: 1,
 cost: {colorless: 1, purple: 1, black: 1}, archetype: 'Skullframe', ability: ['Immunity','Ranged'], skill: ['Revive','Reanimate {2}{B}{P}'], set: 'StandardPack'},
{id: 'SkullframeCryptwinds', name: 'Skullframe Cryptwinds', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Cryptwinds.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2,
 cost: {colorless: 1, black: 2}, archetype: 'Skullframe', ability: ['Flying', 'Immunity'], skill: 'Reanimate {1}{B}{B}', set: 'StandardPack'},
{id: 'SkullframeSpectralDragon', name: 'Skullframe Spectral Dragon', rarity: 'Epic', image: 'CardImages/Skullframe/Skullframe Spectral Dragon.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2, cost: {colorless: 3, purple: 1, black: 1},
 archetype: 'Skullframe', ability: ['Flying', 'Immunity'], skill: ['Curseflame Inferno {2}{P}{P}{B}','Reanimate {2}{B}{B}'], set: 'StandardPack'},
{id: 'SkullframeArmoredDragon', name: 'Skullframe Armored Dragon', rarity: 'Rare', image: 'CardImages/Skullframe/Skullframe Armored Dragon.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2,
 cost: {colorless: 2, purple: 1, black: 1}, archetype: 'Skullframe', ability: ['Flying','Immunity','Armor'], skill: 'Reanimate {3}{B}{B}', set: 'StandardPack'},
{id: 'SkullframeHexmistress', name: 'Skullframe Hexmistress', rarity: 'Epic', image: 'CardImages/Skullframe/Skullframe Hexmistress.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Undead','Mage'], hp: 6, atk: 4, def: 1,
  cost: {colorless: 1, black: 1, purple: 1}, archetype: 'Skullframe', ability: ['Immunity','Ranged'], skill: ['Ebonhex Flare {B}{B}{P}','Ebonhex Crush {B}','Reanimate {2}{B}{B}'], set: 'StandardPack'},
{id: 'MaldryssSkullframeArchmage', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Undead','Mage'], trait: 'Champion', hp: 8, atk: 1, def: 0,
 cost: {black: 2, purple: 1}, essence: {black: 1}, archetype: 'Skullframe', ability: ['Drain','Immunity','Ranged'], skill: ['Hexbind {B}{P}','Hexblast {B}{CW}','Reanimate {2}{B}{B}'], set: 'StandardPack'},
{id: 'MaldryssSkullframeArchmageFA', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/Maldryss, Skullframe Archmage FA.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Undead','Mage'], trait: 'Champion', hp: 8, atk: 1, def: 0,
 cost: {black: 2, purple: 1}, essence: {black: 1}, archetype: 'Skullframe', ability: ['Drain','Immunity','Ranged'], skill: ['Hexbind {B}{P}','Hexblast {B}{CW}','Reanimate {2}{B}{B}'], set: 'StandardPack'},
{id: 'Soulhexing', name: 'Soulhexing', rarity: 'Common', image: 'CardImages/Skullframe/Soulhexing.png', 
 category: 'Spell', color: 'Black', type: 'Spell', cost: {colorless: 2, black: 1}, archetype: 'Skullframe', effect: 'Destroy a creature afflicted by any status', set: 'StandardPack'},
{id: 'Witherwake', name: 'Witherwake', rarity: 'Common', image: 'CardImages/Skullframe/Witherwake.png', 
 category: 'Spell', color: ['Black','Purple'], type: 'Spell', cost: {purple: 1, black: 1}, archetype: 'Skullframe', effect: 'Burst Poison', set: 'StandardPack'},

// SERAPH
/*
{id: 'SeraphielSolmaraPrincess', name: 'Seraphiel, Solmara Princess', rarity: 'Legendary', image: 'CardImages/Seraph/Seraphiel, Solmara Princess.png', 
 category: 'Creature', color: 'White', type: 'Angel', trait: 'Champion', hp: 10, atk: 2, def: 0,
 cost: {white: 3}, essence: {white: 1}, archetype: 'Seraph', ability: 'Flying', set: 'StandardPack'},


*/
 
// FROSTLANDS //
{id: 'FrostlandsDragon', name: 'Frostlands Dragon', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Dragon.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Dragon', hp: 9, atk: 5, def: 2,
 cost: {colorless: 3, blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandsWyrm', name: 'Frostlands Wyrm', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Wyrm.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Dragon', hp: 9, atk: 5, def: 2,
 cost: {colorless: 1, blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandsGolem', name: 'Frostlands Golem', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Golem.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Elemental', hp: 9, atk: 5, def: 2,
 cost: {colorless: 1, blue: 1, gray: 1}, archetype: 'Frostlands', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'FrostlandsPhoenix', name: 'Frostlands Phoenix', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Phoenix.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Avian', hp: 9, atk: 5, def: 2,
 cost: {blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandsRuneforgedAutomaton', name: 'Frostlands Runeforged Automaton', rarity: 'Rare', image: 'CardImages/Frostlands/Frostlands Runeforged Automaton.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Construct', hp: 9, atk: 5, def: 2,
 cost: {colorless: 2, blue: 1, gray: 1}, archetype: 'Frostlands', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'FrostlandsRuneforgedColossus', name: 'Frostlands Runeforged Colossus', rarity: 'Epic', image: 'CardImages/Frostlands/Frostlands Runeforged Colossus.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Construct', hp: 9, atk: 5, def: 2,
 cost: {colorless: 4, blue: 1, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Crush'], set: 'StandardPack'},
{id: 'EirawenFrostlandsQueenFA', name: 'Eirawen, Frostlands Queen', rarity: 'Legendary', image: 'CardImages/Frostlands/Eirawen, Frostlands Queen.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Mage', trait: 'Champion', hp: 11, atk: 1, def: 0,
 cost: {blue: 2, gray: 1}, archetype: 'Frostlands', ability: ['Ice Armor','Flying'], set: 'StandardPack'},

// ARTIFACTS //
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

// SPELLS //
{id: 'EssenceSurge', name: 'Essence Surge', rarity: 'Common', image: 'CardImages/Spells/Essence Surge.png', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: {colorless: 2}, effect: 'Gain 3 essence', set: 'StandardPack'},
{id: 'EssenceAssault', name: 'Essence Assault', rarity: 'Common', image: 'CardImages/Spells/Essence Assault.png', 
 category: 'Spell', color: 'Red', type: 'Spell', cost: {colorless: 1}, effect: 'Give a unit +2/0', set: 'StandardPack'},
{id: 'EssenceRift', name: 'Essence Rift', rarity: 'Common', image: 'CardImages/Spells/Essence Rift.png', 
 category: 'Spell', color: 'Blue', type: 'Spell', cost: {colorless: 2}, effect: 'Draw 2', set: 'StandardPack'},
{id: 'EssenceBolt', name: 'Essence Bolt', rarity: 'Common', image: 'CardImages/Spells/Essence Bolt.png', 
 category: 'Spell', color: 'Yellow', type: 'Spell', cost: {colorless: 1}, effect: 'Strike 3', set: 'StandardPack'},
{id: 'EssenceBreak', name: 'Essence Break', rarity: 'Common', image: 'CardImages/Spells/Essence Break.png', 
 category: 'Spell', color: 'Purple', type: 'Spell', cost: {colorless: 1}, effect: 'Destroy 1 essence', set: 'StandardPack'},
{id: 'EssenceBarrier', name: 'Essence Barrier', rarity: 'Common', image: 'CardImages/Spells/Essence Barrier.png', 
 category: 'Spell', color: 'Gray', type: 'Aura', cost: {colorless: 1}, effect: 'Aegis', set: 'StandardPack'},
{id: 'EssencePurge', name: 'Essence Purge', rarity: 'Common', image: 'CardImages/Spells/Essence Purge.png', 
 category: 'Spell', color: 'Black', type: 'Aura', cost: {colorless: 2}, effect: 'Cannot generate essence', set: 'StandardPack'},
{id: 'EssenceBlessing', name: 'Essence Blessing', rarity: 'Common', image: 'CardImages/Spells/Essence Blessing.png', 
 category: 'Spell', color: 'White', type: 'Spell', cost: {colorless: 1}, effect: 'Cleanse 5', set: 'StandardPack'},
{id: 'LifeGrowth', name: 'Life Growth', rarity: 'Common', image: 'CardImages/Spells/Life Growth.png', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: {green: 1}, effect: 'Gain {G}{G}', set: 'StandardPack'},
/*
{id: 'HardenedScales', name: 'Hardened Scales', rarity: 'Common', image: 'CardImages/Spells/Hardened Scales.png', 
 category: 'Spell', color: ['Green','Red'], type: 'Aura', cost: {colorless: 1}, effect: 'Gain {G}{G}', set: 'StandardPack'},
{id: 'VerdantRebirth', name: 'Verdant Rebirth', rarity: 'Common', image: 'CardImages/Spells/Verdant Rebirth.png', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: {colorless: 2, green: 1}, effect: 'Gain {G}{G}', set: 'StandardPack'},
  
 
 
 */
// DOMAINS //
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
const addCoinsBtn = document.getElementById('add-coins-btn');
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000];
let lastPlayerPower = null;

const CARD_KEYWORD_EXPLANATIONS = {
  burn: {
    name: "Burn",
    description: "Burns opposing unit upon striking with an attack/skill."
  },
  burned: {
    name: "Burned",
    description: "Burned units lose 1 HP during each end step, and receive 1 more damage."
  },
  freeze: {
    name: "Freeze",
    description: "Freezes opposing unit upon striking with an attack/skill."
  },
  frozen: {
    name: "Frozen",
    description: "Frozen units cannot attack, activate skills or receive damage."
  },
  paralyze: {
    name: "Paralyze",
    description: "Paralyzes opposing unit upon striking with an attack/skill."
  },
  paralysis: {
    name: "Paralysis",
    description: "Paralyzed units cannot attack or return attack damage."
  },
  soaked: {
    name: "Soaked",
    description: "Soaked units deal -1 physical damage per stack."
  },
  soak: {
    name: "Soak",
    description: "Soaks opposing unit upon striking with an attack/skill."
  },
  toxic: {
    name: "Toxic",
    description: "Poisons opposing unit upon striking with an attack/skill."
  },
  venom: {
    name: "Venom",
    description: "Poisons opposing unit upon striking with an attack/skill."
  },
  protect: {
    name: "Protect",
    description: "Opponent can only target this unit for attacks."
  },
  barrier: {
    name: "Barrier",
    description: "Prevents the next damage received to any unit."
  },
  aegis: {
    name: "Aegis",
    description: "Unaffected by skills and effects."
  },
  veil: {
    name: "Veil",
    description: "Cannot be targeted by opponent's Skills and effects."
  },
  immunity: {
    name: "Immunity",
    description: "Unaffected by status conditions."
  },
  ambush: {
    name: "Ambush",
    description: "Cannot be targeted by opponent's attacks, skills and effects. Unit is revealed after attacking or using a skill/effect"
  },
  flying: {
    name: "Flying",
    description: "Can only be blocked by other units with Flying. All Ranged units can damage it if declaring attack"
  },
  ranged: {
    name: "Ranged",
    description: "Can attack units with Flying, ignores Protect, does not receive attack damage upon attacking another unit without ranged."
  },
  rush: {
    name: "Rush",
    description: "Can attack on the turn it is played."
  },
  drain: {
    name: "Drain",
    description: "When this unit deals damage, gain that much life."
  },
  intimidate: {
    name: "Intimidate",
    description: "When declaring an attack, {CW} that unit"
  },
  provoke: {
    name: "Provoke",
    description: "When declaring an attack, {CCW} that unit"
  },
  firearmor: {
    name: "Fire Armor",
    description: "Burns opposing unit upon receive attack damage"
  },
  icearmor: {
    name: "Ice Armor",
    description: "Freezes opposing unit upon receive attack damage"
  },
  poisonarmor: {
    name: "Poison Armor",
    description: "Poisons opposing unit upon receive attack damage"
  },
  soakedarmor: {
    name: "Soaked Armor",
    description: "Soaks opposing unit upon receive attack damage"
  },
  crush: {
    name: "Crush",
    description: "Destroys opposing creature upon attacking regardless of HP."
  },
  reanimate: {
    name: "Reanimate",
    description: "If this unit is in the Void, revive it."
  },
  dash: {
    name: "Dash",
    description: "Can also be summoned from the hand. Returns to hand during your opponent's end step."
  },
  echo: {
    name: "Echo",
    description: "Activates when the card is sent to the Void."
  },
  discard: {
    name: "Discard",
    description: "Activates by discarding it."
  },
  aura: {
    name: "Aura",
    description: "Must be equipped to units of the same color."
  },
  firelands: {
    name: "Firelands",
    description: "Born of volcanic wrath and infernal hunger, these fire-beasts hunt not for survival, but to spread the consuming blaze of their cursed homeland. Fueled by relentless ferocity, the Firelands are defined by their fiery rushing strikes. They are known by their aggression, overwhelming foes with sudden, searing attacks before the battle has even begun."
  },
  cindercore: {
    name: "Cindercore",
    description: "Forged in molten crucibles deep beneath the world, the Cindercore are living constructs of stone and flame. Their hearts burn with rivers of lava, each strike searing with lingering pain. Unlike other flames that flare and fade, the Cindercore are defined by their never-ending burning mastery and their unyielding defenses. They are an archetype of attrition, grinding foes down with relentless heat until only ash and ruin remain."
  },
  skullframe: {
    name: "Skullframe",
    description: "Clad in bone and bound by forbidden sorcery, the Skullframe march as deathless engines of war. When shattered, dark magic stitches marrow and spirit back together, raising them anew. Masters of necrotic arts and relentless persistence, the Skullframe are an archetype of inevitability, overwhelming foes with grim magic and unending reanimation until nothing living remains to resist."
  },

  champion: {
    name: "Champion",
    description: "Main creatures that can be upgraded to Champion and provide essence support. Champion creatures receive +{1}/+{1} and upgraded skills"
  },
  // Add more keywords as needed
};
// Use this to parse effect text with tokens into HTML with images/icons
function parseEffectText(effect) {
  if (!effect) return "";

  // Map color codes to image paths
  const ESSENCE_ICON = {
    G:  "OtherImages/Essence/Green.png",
    R:  "OtherImages/Essence/Red.png",
    U:  "OtherImages/Essence/Blue.png",
    Y:  "OtherImages/Essence/Yellow.png",
    C:  "OtherImages/Essence/Gray.png",
    P:  "OtherImages/Essence/Purple.png",
    B:  "OtherImages/Essence/Black.png",
    W:  "OtherImages/Essence/White.png"
  };

  // Replace color icons {G},{R}, etc.
  effect = effect.replace(/\{([GRUYCPBW])\}/g, (match, code) =>
    `<img src="${ESSENCE_ICON[code]}" style="height:1.3em;vertical-align:middle;margin-right:2px;">`
  );

  // Replace tapped/untapped icons
  effect = effect.replace(/\{CW\}/g,
    '<img src="OtherImages/Icons/Tapped.png" style="height:1.3em;vertical-align:middle;margin-right: 2px;" title="Tapped">'
  );
  effect = effect.replace(/\{CCW\}/g,
    '<img src="OtherImages/Icons/Untapped.png" style="height:1.3em;vertical-align:middle;margin-right: 2px;" title="Untapped">'
  );

  // Replace numbers {0}..{20} with bold numbers or custom spans
 // Replace numbers {0}..{20} with colorless essence images!
 effect = effect.replace(/\{([0-9]|1[0-9]|20)\}/g, (match, num) => {
  // Use COST_IMAGE_MAP['X'+num] to match renderCardCost logic
   const imgSrc = typeof COST_IMAGE_MAP !== 'undefined' ? COST_IMAGE_MAP['X'+num] : null;
   if (imgSrc) {
     return `<img src="${imgSrc}" style="height:1.3em;vertical-align:middle;margin-right:2px;">`;
   }
   // fallback: number as before
   return `<span style="font-weight:bold;color:#ffe066;font-size:1.12em;vertical-align:middle;margin-right: 2px;">${num}</span>`;
 });

  return effect;
}


// POWER
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

// --- INFO MODAL LOGIC ---
function showInfoModal(cardObj) {
  const card = dummyCards.find(c => c.id === (cardObj.cardId || cardObj.id));
  if (!card) return;
  const infoModal = document.getElementById('card-info-modal');
  const infoContent = document.getElementById('card-info-modal-content');
  if (!infoModal || !infoContent) return;

  // Gather keywords
  let keywordSections = [];
  function addKeywordSection(type, value) {
    if (!value) return;
    let values = Array.isArray(value) ? value : [value];
    for (const v of values) {
    const key = String(v).toLowerCase().replace(/\s+/g, ''); // Lowercase and remove all spaces
      if (CARD_KEYWORD_EXPLANATIONS[key]) {
        keywordSections.push({
          type,
          name: CARD_KEYWORD_EXPLANATIONS[key].name || v,
          desc: CARD_KEYWORD_EXPLANATIONS[key].description
        });
      }
    }
  }
  addKeywordSection("Trait", card.trait);
  addKeywordSection("Type", card.type);
  addKeywordSection("Ability", card.ability);
  addKeywordSection("Skill", card.skill);
  addKeywordSection("Archetype", card.archetype);

  let html = `<div style="font-weight:bold;font-size:1.3em;color:#ffe066;margin-bottom:10px;">Keywords & Abilities </div>`;
  if (keywordSections.length) {
    keywordSections.forEach((sec, i) => {
      html += `
        <div style="margin-bottom:14px;">
          <div style="font-size:1.14em;color:#ffe066;font-weight:bold;">${sec.name}</div>
          <div style="font-size:1em;color:#fff;">${parseEffectText(sec.desc)}</div>
        </div>
      `;
      // Add divider after each section except the last
      if (i < keywordSections.length - 1) {
        html += `<div class="card-modal-divider"></div>`;
      }
    });
  } else {
    html += `<div style="color:#eee;">No special keywords or abilities found for this card.</div>`;
  }
  html += `<button id="close-card-info-modal" class="btn-negative-secondary" style="margin-top:18px;">Close</button>`;

  infoContent.innerHTML = html;
  infoModal.style.display = 'flex';
  document.getElementById('close-card-info-modal').onclick = function() {
    infoModal.style.display = 'none';
  };
  infoModal.onclick = function(e) {
    if (e.target === infoModal) infoModal.style.display = 'none';
  };
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

  // INFO HTML
  let infoHtml = '';
  infoHtml += `<div class="full-card-info-title">${card.name}</div>`;
  infoHtml += `<div class="card-modal-divider"></div>`;
  infoHtml += labeled("Category", card.category);
  infoHtml += labeled("Rarity", card.rarity);
  infoHtml += labeled("Archetype", Array.isArray(card.archetype) ? card.archetype.join(", ") : card.archetype);
  infoHtml += labeled("Type", Array.isArray(card.type) ? card.type.join(", ") : card.type);
  infoHtml += labeled("Ability", Array.isArray(card.ability) ? card.ability.join(", ") : card.ability);
  infoHtml += labeled("Trait", Array.isArray(card.trait) ? card.trait.join(", ") : card.trait);
  if (card.skill) {
  // Ensure skills is always an array
   let skills = Array.isArray(card.skill) ? card.skill : [card.skill];
   infoHtml += `<div class="full-card-info-row"><span class="full-card-info-label">Skills:</span></div>`;
   skills.forEach(skill => {
    infoHtml += `<div class="full-card-info-row" style="margin-left:18px;">${parseEffectText(skill)}</div>`;
   });
  }
  infoHtml += `<div class="card-modal-divider"></div>`;
  let statsRow = '';
  if (card.hp !== undefined || card.atk !== undefined || card.def !== undefined || card.cost !== undefined) {
   statsRow = '<div class="full-card-info-row">' +
   (card.hp !== undefined ? `<span class="full-card-info-label">HP:</span> ${renderStatIcon('hp', card.hp)} ` : '') +
   (card.atk !== undefined ? `<span class="full-card-info-label">ATK:</span> ${renderStatIcon('atk', card.atk)} ` : '') +
   (card.def !== undefined ? `<span class="full-card-info-label">DEF:</span> ${renderStatIcon('def', card.def)} ` : '') +
   `<span class="full-card-info-label">Cost:</span> ${renderCardCost(card.cost)}` +
   '</div>';
  }
  infoHtml += `<div class="card-modal-divider"></div>`;
  let textHtml = '';
  if (card.text) {
    textHtml = `<div class="full-card-info-section" style="font-size:1.08em;color:#ffe066;margin-top:10px;">${card.text}</div>`;
  }
  let effectHtml = '';
  if (card.effect) {
   effectHtml = `<div class="full-card-info-section" style="font-size:1.08em;color:#ffe066;margin-top:10px;">${parseEffectText(card.effect)}</div>`;
  }

   // --- INFO BUTTON ---
  let infoButtonHtml = `<img id="card-info-btn" src="OtherImages/Icons/Info.png" alt="Info" title="Keyword & Ability Info">`;
  // Compose modal content (side-by-side)
  modalContent.innerHTML = `
    <div class="full-card-modal-flex" style="position:relative;">
      ${infoButtonHtml}
      <div class="full-card-image-container">
        <img src="${card.image}" alt="${card.name}" class="full-card-modal-img ${owned === 0 ? 'card-image-locked' : ''}">
      </div>
      <div class="full-card-info-panel">
        ${infoHtml}
        ${statsRow}
        ${effectHtml}
        ${textHtml}
      </div>
    </div>
  `;

  // Attach Info Button Handler
  const infoBtn = document.getElementById('card-info-btn');
  if (infoBtn) {
    infoBtn.onclick = function(e) {
      e.stopPropagation();
      showInfoModal(cardObj);
    };
  }
  modal.style.display = 'flex';
}

// IMAGE MODAL CLOSE
document.getElementById('image-modal').onclick = (e) => {
  if (e.target.id === 'image-modal') {
    document.getElementById('image-modal').style.display = "none";
  }
};

// --- ADD INFO MODAL HTML TO PAGE IF NOT PRESENT ---
(function ensureInfoModal() {
  if (!document.getElementById('card-info-modal')) {
    const infoModal = document.createElement('div');
    infoModal.id = 'card-info-modal';
    infoModal.className = 'modal';
    infoModal.style.display = 'none';
    infoModal.innerHTML = `
      <div id="card-info-modal-content" class="modal-content" style="max-width:480px;min-width:320px;padding:32px 26px 18px 26px;background:#212a3b;border-radius:18px;margin:auto;box-shadow:0 4px 32px #000a;">
      </div>
    `;
    document.body.appendChild(infoModal);
  }
})();

function renderCardCost(costData) {
  // Accepts either {red:2, blue:1, ...} or [{color:'red',amount:2}, ...]
  let html = '';
  if (!costData) {
   // Show the zero image if cost is 0
   return `<img src="${COST_IMAGE_MAP.X0}" alt="Cost: 0" style="width:22px;height:22px;vertical-align:middle;">`;
  }

  // Array style: [{color: 'red', amount: 2}, {colorless: 3}]
  if (Array.isArray(costData)) {
    costData.forEach(c => {
      if (c.color && COST_IMAGE_MAP[c.color]) {
        for (let i = 0; i < (c.amount || 1); i++) {
          html += `<img src="${COST_IMAGE_MAP[c.color]}" alt="${c.color}" style="width:22px;height:22px;vertical-align:middle;">`;
        }
      } else if (c.colorless) {
        const key = 'X' + c.colorless;
        if (COST_IMAGE_MAP[key]) {
          html += `<img src="${COST_IMAGE_MAP[key]}" alt="Colorless" style="width:22px;height:22px;vertical-align:middle;">`;
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
        html += `<img src="${COST_IMAGE_MAP[imgKey]}" alt="Colorless" style="width:22px;height:22px;vertical-align:middle;">`;
      }
    } else if (COST_IMAGE_MAP[key]) {
      for (let i = 0; i < costData[key]; i++) {
        html += `<img src="${COST_IMAGE_MAP[key]}" alt="${key}" style="width:22px;height:22px;vertical-align:middle;">`;
      }
    }
  }
  return html || `<img src="${COST_IMAGE_MAP.X0}" alt="Cost: 0" style="width:22px;height:22px;vertical-align:middle;">`;
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

// CLOSE MODAL AND MENU HELPERS
function closeAllModals() {document.querySelectorAll('.modal').forEach(modal => {modal.style.display = 'none';});}
function closeAllMenus() {document.querySelectorAll('.card-menu').forEach(m => m.remove());}

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

// PROFILE PANEL POP-UP
document.addEventListener('DOMContentLoaded', function() {
  const badgeImg = document.getElementById('player-badge-img');
  if (badgeImg) {
    badgeImg.onclick = function() {
      // Build playerData for showProfileModal
      const playerData = {
        username: window.playerUsername || (window.auth && window.auth.currentUser && window.auth.currentUser.displayName) || "Player",
        profilePic: window.playerProfilePic || badgeImg.src,
        profileBanner: window.playerProfileBanner || "CardImages/Banners/DefaultBanner.png",
        power: typeof calculatePlayerPower === "function" ? calculatePlayerPower() : 0,
        achievements: (typeof getAchievementData === "function" && typeof ACHIEVEMENTS !== "undefined")
          ? ACHIEVEMENTS.filter(a => getAchievementData()[a.id]?.claimed).map(a => a.id)
          : [],
        badges: [] // Add badge ids as needed
      };
      showProfileModal(playerData);
    };
  }
});

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

function renderProfilePanel(profile, options = {}) {
  profile = profile || {};
  const profileBanner = profile.profileBanner || profile.banner || "CardImages/Banners/DefaultBanner.png";
  const profilePic = profile.profilePic || profile.avatar || "CardImages/Avatars/Default.png";
  const username = profile.username || "Unknown";
  const power = typeof profile.power === "number" ? profile.power : 0;
  const displayUsername = username.length > 12 ? username.slice(0, 12) + "…" : username;

  // Create container
  const container = document.createElement('div');
  container.className = options.className || 'profile-panel-tile';
  container.style.background = `url('${profileBanner}')`;
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';
  container.style.borderRadius = '18px';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.gap = '5px';
  container.style.minHeight = '120px';
  container.style.position = 'relative';
  container.style.boxSizing = 'border-box';

  // Avatar
  const avatar = document.createElement('img');
  avatar.src = profilePic;
  avatar.alt = "Profile";
  avatar.style.width = '88px';
  avatar.style.height = '88px';
  avatar.style.borderRadius = '50%';
  avatar.style.border = '4px solid #ffe066';
  avatar.style.boxShadow = '0 2px 16px #000c';
  avatar.style.objectFit = 'cover';
  avatar.style.background = '#1a1b23';
  avatar.style.zIndex = '2';
  avatar.style.flexShrink = '0';

  // Info stack
  const infoStack = document.createElement('div');
  infoStack.style.display = 'flex';
  infoStack.style.flexDirection = 'column';
  infoStack.style.justifyContent = 'center';
  infoStack.style.alignItems = 'center';

  // Username
  const usernameDiv = document.createElement('div');
  usernameDiv.textContent = displayUsername;
  usernameDiv.style.fontSize = '1.38em';
  usernameDiv.style.fontWeight = 'bold';
  usernameDiv.style.color = '#ffe066';
  usernameDiv.style.textShadow = '0 2px 8px #000';
  usernameDiv.style.marginBottom = '6px';
  usernameDiv.style.whiteSpace = "nowrap";
  usernameDiv.style.overflow = "hidden";
  usernameDiv.style.textOverflow = "ellipsis";
  usernameDiv.style.maxWidth = "70vw"; // Responsive, not px
  usernameDiv.style.minWidth = "0";

  // Power display
  const powerDiv = document.createElement('div');
  powerDiv.style.fontSize = '1.1em';
  powerDiv.style.fontWeight = 'bold';
  powerDiv.style.color = '#fff';
  powerDiv.style.display = 'flex';
  powerDiv.style.alignItems = 'center';
  powerDiv.style.gap = '8px';

  const powerIcon = document.createElement('img');
  powerIcon.src = 'OtherImages/Icons/Power.png';
  powerIcon.style.width = '24px';

  const powerValue = document.createElement('span');
  powerValue.textContent = power;
  powerValue.style.color = '#ffe066';

  powerDiv.appendChild(powerIcon);
  powerDiv.appendChild(powerValue);

  // Compose info stack
  infoStack.appendChild(usernameDiv);
  infoStack.appendChild(powerDiv);

  // Compose container
  container.appendChild(avatar);
  container.appendChild(infoStack);
  // Click handler (optional)
  if (typeof options.onClick === 'function') {
    container.style.cursor = 'pointer';
    container.onclick = function(e) {
      e.stopPropagation();
      options.onClick(e, profile);
    };
  }
  return container;
}
window.renderProfilePanel = renderProfilePanel;

// playerData: { username, profilePic, profileBanner, power, achievements: [badgeId,...], badges: [badgeId,...] }
function showProfileModal(profile) {
  profile = profile || {};
  // Use only what's passed in
  // Example:
  const username = profile.username || "Unknown";
  const profilePic = profile.profilePic || profile.avatar || "CardImages/Avatars/Default.png";
  const profileBanner = profile.profileBanner || profile.banner || "CardImages/Banners/DefaultBanner.png";
  const power = typeof profile.power === "number" ? profile.power : 0;
  const achievements = profile.achievements || [];
  const badges = profile.badges || [];
  const avatars = profile.avatars || profile.unlockedAvatars || [];
  const banners = profile.banners || profile.unlockedBanners || [];
  const cardbacks = profile.cardbacks || profile.unlockedCardbacks || [];
 
  const modal = document.getElementById('profile-modal');
  const content = document.getElementById('profile-modal-content');
  if (!modal || !content) return;

  // --- BADGE SECTIONS ---
  // You may already have ACHIEVEMENTS and BADGE_IMAGES in your code.
  // For this example, we'll use ACHIEVEMENTS as all badges.
  const allBadges = (typeof ACHIEVEMENTS !== "undefined") ? ACHIEVEMENTS : [];
  const ownedBadges = (profile.achievements || []).concat(profile.badges || []);
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

  // --- OWNED COSMETICS SECTIONS ---
  // Prefer playerData arrays if present (for other users), else fallback to current user's unlocked
  const ownedAvatars = Array.isArray(profile.avatars) && profile.avatars.length
    ? profile.avatars
    : (typeof getUnlockedAvatars === "function" ? getUnlockedAvatars() : (window.playerUnlockedAvatars || []));
  const ownedBanners = Array.isArray(profile.banners) && profile.banners.length
    ? profile.banners
    : (typeof getUnlockedBanners === "function" ? getUnlockedBanners() : (window.playerUnlockedBanners || []));
  const ownedCardbacks = Array.isArray(profile.cardbacks) && profile.cardbacks.length
    ? profile.cardbacks
    : (typeof getUnlockedCardbacks === "function" ? getUnlockedCardbacks() : (window.playerUnlockedCardbacks || []));
 
  let avatarSection = '';
  if (ownedAvatars.length) {
    avatarSection = `
      <div style="padding:16px 0 0 0;text-align:center;">
        <div style="font-weight:bold;font-size:1.13em;color:#ffe066;margin-bottom:10px;">Avatars</div>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">
          ${ownedAvatars.map(src => `<img src="${src}" alt="Avatar" class="cosmetic-img" style="width:52px;height:52px;border-radius:50%;border:2px solid #ffe066;box-shadow:0 2px 8px #0007;">`).join('')}
        </div>
      </div>
    `;
  }

  let bannerSection = '';
  if (ownedBanners.length) {
    bannerSection = `
      <div style="padding:16px 0 0 0;text-align:center;">
        <div style="font-weight:bold;font-size:1.13em;color:#ffe066;margin-bottom:10px;">Banners</div>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">
          ${ownedBanners.map(src => `<img src="${src}" alt="Banner" class="cosmetic-img" style="width:70px;height:36px;border-radius:8px;border:2px solid #ffe066;box-shadow:0 2px 8px #0007;">`).join('')}
        </div>
      </div>
    `;
  }

  let cardbackSection = '';
  if (ownedCardbacks.length) {
    cardbackSection = `
      <div style="padding:16px 0 0 0;text-align:center;">
        <div style="font-weight:bold;font-size:1.13em;color:#ffe066;margin-bottom:10px;">Cardbacks</div>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">
          ${ownedCardbacks.map(src => `<img src="${src}" alt="Cardback" class="cosmetic-img" style="width:40px;height:56px;border-radius:6px;border:2px solid #ffe066;box-shadow:0 2px 8px #0007;">`).join('')}
        </div>
      </div>
    `;
  }
  // Clear previous content
  content.innerHTML = "";

  // Add the new profilePanel DOM node
  const profilePanel = renderProfilePanel(profile);
  content.appendChild(profilePanel);

  // Add badge section and close button as HTML
  const badgesAndClose = document.createElement("div");
  badgesAndClose.innerHTML = `
    ${badgeSection}
    ${avatarSection}
    ${bannerSection}
    ${cardbackSection}
    <button id="close-profile-modal" class="btn-negative-secondary">Close</button>
  `;
  content.appendChild(badgesAndClose);

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
// INPUT HELPER
function showInputModal({
  title = "Enter value",
  label = "",
  defaultValue = "",
  maxLength = null,
  placeholder = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  validate = null, // (val) => errorMsg or null
  onConfirm,
  onCancel
} = {}) {
  closeAllModals();
  let modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

  let content = document.createElement('div');
  content.className = 'modal-content';
  content.style.minWidth = "340px";
  content.style.maxWidth = "90vw";
  content.style.padding = "32px 26px 18px 26px";
  content.style.background = "#212a3b";
  content.style.borderRadius = "18px";
  content.onclick = e => e.stopPropagation();

  content.innerHTML = `
    <h3 style="color:#ffe066;margin-bottom:12px;">${title}</h3>
    ${label ? `<div style="margin-bottom:7px;color:#ffe066;">${label}</div>` : ""}
    <input id="modal-input-field" type="text" value="${defaultValue}"
      ${maxLength ? `maxlength="${maxLength}"` : ""}
      placeholder="${placeholder}"
      style="width:100%;padding:8px 11px;font-size:1.13em;border-radius:7px;margin-bottom:10px;" />
    <div id="modal-input-error" style="color:#e25555;font-size:0.98em;margin-bottom:8px;display:none"></div>
    <button id="modal-input-confirm" class="btn-secondary" style="margin-right:8px;">${confirmText}</button>
    <button id="modal-input-cancel" class="btn-negative-secondary">${cancelText}</button>
  `;
  modal.appendChild(content);
  document.body.appendChild(modal);

  const input = content.querySelector("#modal-input-field");
  const errorDiv = content.querySelector("#modal-input-error");
  const confirmBtn = content.querySelector("#modal-input-confirm");
  const cancelBtn = content.querySelector("#modal-input-cancel");

  input.focus();

  confirmBtn.onclick = function() {
    const val = input.value.trim();
    let error = null;
    if (validate) error = validate(val);
    if (error) {
      errorDiv.textContent = error;
      errorDiv.style.display = "";
      input.style.border = "2px solid #e25555";
      return;
    }
    modal.remove();
    if (onConfirm) onConfirm(val);
  };
  cancelBtn.onclick = function() {
    modal.remove();
    if (onCancel) onCancel();
  };

  input.oninput = function() {
    errorDiv.style.display = "none";
    input.style.border = "";
  };

  input.onkeydown = function(e) {
    if (e.key === "Enter") confirmBtn.click();
    if (e.key === "Escape") cancelBtn.click();
  };
}
window.showInputModal = showInputModal;
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
function isFoilCard(cardId) {
  return window.playerFoilCards && window.playerFoilCards[cardId];
}
