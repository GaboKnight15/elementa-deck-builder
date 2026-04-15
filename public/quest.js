window.playerQuests = window.playerQuests || {};
window.playerAchievements = window.playerAchievements || {};

const COLOR_QUESTS = ['green', 'red', 'blue', 'yellow', 'purple', 'gray', 'black', 'white'];
// Quest LIST
const QUEST_SLOTS = 5;
const QUEST_POOL = [
  { id: 'purchase_pack', type: 'quest', description: 'Purchase a Booster Pack', goal: 1, reward: { type: 'currency', amount: 100 }, image: 'Images/Blank/Pack.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_green_card', type: 'quest', description: 'Collect a Green Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/Green.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_red_card', type: 'quest', description: 'Collect a Red Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/Red.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_blue_card', type: 'quest', description: 'Collect a Blue Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/Blue.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_yellow_card', type: 'quest', description: 'Collect a Yellow Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/Yellow.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_purple_card', type: 'quest', description: 'Collect a Purple Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/Purple.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_gray_card', type: 'quest', description: 'Collect a Gray Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/Gray.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_black_card', type: 'quest', description: 'Collect a Black Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/Black.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { id: 'collect_white_card', type: 'quest', description: 'Collect a White Card', goal: 1, reward: { type: 'currency', amount: 80 }, image: 'Images/Blank/White.png', progress: 0, claimed: false, completed: false, refillAt: null},
  { questId: null, refillAt: 1720000000000 },
];

// -------------------- //
// --- ACHIEVEMENTS --- //
// -------------------- //

const ACHIEVEMENTS = {
  account: { title: "Account", groups: [ 
  { id: 'account_level', title: 'Level', image: 'Images/Blank/Level.png', tiers: [
    { tier: 1, goal: 2, description: "Hero level 2", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 2, goal: 3,  description: "Hero level 3", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 3, goal: 4,  description: "Hero level 4", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 4, goal: 5,  description: "Hero level 5", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 5, goal: 6,  description: "Hero level 6", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 6, goal: 7,  description: "Hero level 7", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 7, goal: 8,  description: "Hero level 8", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 8, goal: 9,  description: "Hero level 9", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 9, goal: 10,  description: "Hero level 10", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 10, goal: 11,  description: "Hero level 11", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 11, goal: 12,  description: "Hero level 12", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 12, goal: 13,  description: "Hero level 13", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 13, goal: 14,  description: "Hero level 14", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 14, goal: 15,  description: "Hero level 15", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 15, goal: 16,  description: "Hero level 16", reward: 100, image: 'Images/Blank/Level.png' },
    { tier: 16, goal: 17,  description: "Hero level 17", reward: 100, image: 'Images/Blank/Level.png' },
   ]}]},
// COLORS //
  color: { title: 'Color', groups: [
  { id: 'color_green', title: 'Green', image: 'Images/Blank/Green.png', tiers: [
    { tier: 1, goal: 25,  description: "Collect 25 {green} cards", reward: 100, image: 'Images/Blank/Green.png' },
    { tier: 2, goal: 50,  description: "Collect 50 {green} cards", reward: 100, image: 'Images/Blank/Green.png' },
    { tier: 3, goal: 100,  description: "Collect 100 {green} cards", reward: 100, image: 'Images/Blank/Green.png' },
    { tier: 4, goal: 200,  description: "Collect 200 {green} cards", reward: 100, image: 'Images/Blank/Green.png' },
    { tier: 5, goal: 400,  description: "Collect 400 {green} cards", reward: 100, image: 'Images/Blank/Green.png' },
  ]},
  { id: 'color_red', title: 'Red', image: 'Images/Blank/Red.png', tiers: [
    { tier: 1, goal: 25,  description: "Collect 25 {red} cards", reward: 100, image: 'Images/Blank/Red.png' },
    { tier: 2, goal: 50,  description: "Collect 50 {red} cards", reward: 100, image: 'Images/Blank/Red.png' },
    { tier: 3, goal: 100,  description: "Collect 100 {red} cards", reward: 100, image: 'Images/Blank/Red.png' },
    { tier: 4, goal: 200,  description: "Collect 200 {red} cards", reward: 100, image: 'Images/Blank/Red.png' },
    { tier: 5, goal: 400,  description: "Collect 400 {red} cards", reward: 100, image: 'Images/Blank/Red.png' },
  ]},
  { id: 'color_blue', title: 'Blue', image: 'Images/Blank/Blue.png', tiers: [
    { tier: 1, goal: 25,  description: "Collect 25 {blue} cards", reward: 100, image: 'Images/Blank/Blue.png' },
    { tier: 2, goal: 50,  description: "Collect 50 {blue} cards", reward: 100, image: 'Images/Blank/Blue.png' },
    { tier: 3, goal: 100,  description: "Collect 100 {blue} cards", reward: 100, image: 'Images/Blank/Blue.png' },
    { tier: 4, goal: 200,  description: "Collect 200 {blue} cards", reward: 100, image: 'Images/Blank/Blue.png' },
    { tier: 5, goal: 400,  description: "Collect 400 {blue} cards", reward: 100, image: 'Images/Blank/Blue.png' },
  ]},
  { id: 'color_yellow', title: 'Yellow', image: 'Images/Blank/Yellow.png', tiers: [
    { tier: 1, goal: 25,  description: "Collect 25 {yellow} cards", reward: 100, image: 'Images/Blank/Yellow.png' },
    { tier: 2, goal: 50,  description: "Collect 50 {yellow} cards", reward: 100, image: 'Images/Blank/Yellow.png' },
    { tier: 3, goal: 100,  description: "Collect 100 {yellow} cards", reward: 100, image: 'Images/Blank/Yellow.png' },
    { tier: 4, goal: 200,  description: "Collect 200 {yellow} cards", reward: 100, image: 'Images/Blank/Yellow.png' },
    { tier: 5, goal: 400,  description: "Collect 400 {yellow} cards", reward: 100, image: 'Images/Blank/Yellow.png' },
  ]},
  { id: 'color_purple', title: 'Purple', image: 'Images/Blank/Purple.png', tiers: [
    { tier: 1, goal: 25,  description: "Collect 25 {purple} cards", reward: 100, image: 'Images/Blank/Purple.png' },
    { tier: 2, goal: 50,  description: "Collect 50 {purple} cards", reward: 100, image: 'Images/Blank/Purple.png' },
    { tier: 3, goal: 100,  description: "Collect 100 {purple} cards", reward: 100, image: 'Images/Blank/Purple.png' },
    { tier: 4, goal: 200,  description: "Collect 200 {purple} cards", reward: 100, image: 'Images/Blank/Purple.png' },
    { tier: 5, goal: 400,  description: "Collect 400 {purple} cards", reward: 100, image: 'Images/Blank/Purple.png' },
  ]},
  { id: 'color_gray', title: 'Gray', image: 'Images/Blank/Gray.png', tiers: [
    { tier: 1, goal: 25,  description: "Collect 25 {gray} cards", reward: 100, image: 'Images/Blank/Gray.png' },
    { tier: 2, goal: 50,  description: "Collect 50 {gray} cards", reward: 100, image: 'Images/Blank/Gray.png' },
    { tier: 3, goal: 100,  description: "Collect 100 {gray} cards", reward: 100, image: 'Images/Blank/Gray.png' },
    { tier: 4, goal: 200,  description: "Collect 200 {gray} cards", reward: 100, image: 'Images/Blank/Gray.png' },
    { tier: 5, goal: 400,  description: "Collect 400 {gray} cards", reward: 100, image: 'Images/Blank/Gray.png' },
  ]},
  { id: 'color_white', title: 'White', image: 'Images/Blank/White.png', tiers: [
    { tier: 1, goal: 25,  description: "Collect 25 {white} cards", reward: 100, image: 'Images/Blank/White.png' },
    { tier: 2, goal: 50,  description: "Collect 50 {white} cards", reward: 100, image: 'Images/Blank/White.png' },
    { tier: 3, goal: 100,  description: "Collect 100 {white} cards", reward: 100, image: 'Images/Blank/White.png' },
    { tier: 4, goal: 200,  description: "Collect 200 {white} cards", reward: 100, image: 'Images/Blank/White.png' },
    { tier: 5, goal: 400,  description: "Collect 400 {white} cards", reward: 100, image: 'Images/Blank/White.png' },
  ]},
  { id: 'color_black', title: 'Black', image: 'Images/Blank/Black.png', tiers: [
    { tier: 1, goal: 25,  description: "Collect 25 {black} cards", reward: 100, image: 'Images/Blank/Black.png' },
    { tier: 2, goal: 50,  description: "Collect 50 {black} cards", reward: 100, image: 'Images/Blank/Black.png' },
    { tier: 3, goal: 100,  description: "Collect 100 {black} cards", reward: 100, image: 'Images/Blank/Black.png' },
    { tier: 4, goal: 200,  description: "Collect 200 {black} cards", reward: 100, image: 'Images/Blank/Black.png' },
    { tier: 5, goal: 400,  description: "Collect 400 {black} cards", reward: 100, image: 'Images/Blank/Black.png' },
  ]},
]},
// TYPES //
  type: { title: 'Type', groups: [
  { id: 'type_avian', title: 'Avian', image: 'Images/Type/Avian.png', tiers: [
    { tier: 1, goal: 5, description: "Collect 5 {avian} cards", reward: 100, icon: 'Icons/Type/Avian.png', colorHex: '#a47c3b' },
    { tier: 2, goal: 10, description: "Collect 10 {avian} cards", reward: 100, icon: 'Icons/Type/Avian.png', colorHex: '#a47c3b' },
    { tier: 3, goal: 15, description: "Collect 15 {avian} cards", reward: 100, icon: 'Icons/Type/Avian.png', colorHex: '#a47c3b' },
  ]},
  { id: 'type_beast', title: 'Beast', image: 'Images/Type/Beast.png', tiers: [
    { tier: 1, goal: 5, description: "Collect 5 {beast} cards", reward: 100, icon: 'Icons/Type/Beast.png', colorHex: '#a47c3b' },
  ]},
]},
/*
  { id: 'construct1', label: 'Construct', section: 'Color', group: 'Construct', tier: 1, goal: 25,  description: "Collect 25 {construct} cards", reward: 100, icon: 'Icons/Type/Construct.png', colorHex: '#a47c3b' },
  { id: 'demon1', label: 'Demon', section: 'Color', group: 'Demon', tier: 1, goal: 25,  description: "Collect 25 {demon} cards", reward: 100, icon: 'Icons/Type/Demon.png', colorHex: '#e0801c' },
  { id: 'dragon1', label: 'Dragon', section: 'Color', group: 'Dragon', tier: 1, goal: 25,  description: "Collect 25 {dragon} cards", reward: 100, icon: 'Icons/Type/Dragon.png', colorHex: '#e0801c' },
  { id: 'elemental1', label: 'Elemental', section: 'Color', group: 'Elemental', tier: 1, goal: 25,  description: "Collect 25 {elemental} cards", reward: 100, icon: 'Icons/Type/Elemental.png', colorHex: '#e0801c' },
  { id: 'fairy1', label: 'Faefolk', section: 'Color', group: 'Fairy', tier: 1, goal: 25,  description: "Collect 25 {fairy} cards", reward: 100, icon: 'Icons/Type/Fairy.png', colorHex: '#e0801c' },
  { id: 'undead1', label: 'Undead', section: 'Color', group: 'Undead', tier: 1, goal: 25,  description: "Collect 25 {undead} cards", reward: 100, icon: 'Icons/Type/Undead.png', colorHex: '#a47c3b' },

  { id: 'satyr1', label: 'Satyr', section: 'Color', group: 'Satyr', tier: 1, goal: 25,  description: "Collect 25 {satyr} cards", reward: 100, icon: 'Icons/Archetype/Satyr.png', colorHex: '#888888' },
  { id: 'goblin1', label: 'Goblin', section: 'Color', group: 'Goblin', tier: 1, goal: 25,  description: "Collect 25 {goblin} cards", reward: 100, icon: 'Icons/Archetype/Goblin.png', colorHex: '#888888' },
// ARCHETYPES //  
  { id: 'duskwing1', label: 'Duskwing', section: 'Color', group: 'Color', tier: 1, goal: 25,  description: "Collect 25 {duskwing} cards", reward: 100, icon: 'Icons/Archetype/Duskwing.png', colorHex: '#888888' },
  { id: 'fireland1', label: 'Fireland', section: 'Color', group: 'Color', tier: 1, goal: 25,  description: "Collect 25 {fireland} cards", reward: 100, icon: 'Icons/Archetype/Fireland.png', colorHex: '#888888' },
  { id: 'frostland1', label: 'Frostland', section: 'Color', group: 'Color', tier: 1, goal: 25,  description: "Collect 25 {frostland} cards", reward: 100, icon: 'Icons/Archetype/Frostland.png', colorHex: '#888888' },
  { id: 'golemheart1', label: 'Golemheart', section: 'Color', group: 'Color', tier: 1, goal: 25,  description: "Collect 25 {golemheart} cards", reward: 100, icon: 'Icons/Archetype/Golem.png', colorHex: '#888888' },

  // --- Dragons --- //
  { id: 'thornwing1', label: 'Thornwing', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {thornwing} cards", reward: 100, icon: 'Icons/Archetype/Thornwing.png', colorHex: '#888888' },
  { id: 'blazingscale1', label: 'Blazingscale', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {blazingscale} cards", reward: 100, icon: 'Icons/Archetype/Blazingscale.png', colorHex: '#888888' },
  { id: 'abyssdrake1', label: 'Abyssdrake', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {abyssdrake} cards", reward: 100, icon: 'Icons/Archetype/Abyssdrake.png', colorHex: '#888888' },
  { id: 'stormrazor1', label: 'Stormrazor', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {stormrazor} cards", reward: 100, icon: 'Icons/Archetype/Stormrazor.png', colorHex: '#888888' },
  { id: 'ironclaw1', label: 'Ironclaw', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {ironclaw } cards", reward: 100, icon: 'Icons/Archetype/TerraIronclaw.png', colorHex: '#888888' },
  { id: 'dreadspine1', label: 'Dreadspine', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {dreadspine} cards", reward: 100, icon: 'Icons/Archetype/Dreadspine.png', colorHex: '#888888' },
  { id: 'solarwyrm1', label: 'Solarwyrm', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {solarwyrm} cards", reward: 100, icon: 'Icons/Archetype/Solarwyrm.png', colorHex: '#888888' },
  { id: 'nightshroud1', label: 'Nightshroud', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {nightshroud} cards", reward: 100, icon: 'Icons/Archetype/Nightshroud.png', colorHex: '#888888' },

  // --- Constructs --- //
  { id: 'grovehusk1', label: 'Grovehusk', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {grovehusk} cards", reward: 100, icon: 'Icons/Archetype/Grovehusk.png', colorHex: '#888888' },
  { id: 'cindercore1', label: 'Cindercore', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {cindercore} cards", reward: 100, icon: 'Icons/Archetype/Cindercore.png', colorHex: '#888888' },
  { id: 'coralbound1', label: 'Coralbound', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {coralbound} cards", reward: 100, icon: 'Icons/Archetype/Coralbound.png', colorHex: '#888888' },
  { id: 'stormdrive1', label: 'Stormdrive', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {stormdrive} cards", reward: 100, icon: 'Icons/Archetype/Stormdrive.png', colorHex: '#888888' },
  { id: 'ironwrought1', label: 'Ironwrought', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {ironwrought} cards", reward: 100, icon: 'Icons/Archetype/Ironwrought.png', colorHex: '#888888' },
  { id: 'plagueaxis1', label: 'Plagueaxis', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {plagueaxis} cards", reward: 100, icon: 'Icons/Archetype/Plagueaxis.png', colorHex: '#888888' },
  { id: 'solarforge1', label: 'Solarforge', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {solarforge} cards", reward: 100, icon: 'Icons/Archetype/Solarforge.png', colorHex: '#888888' },
  { id: 'shadowgear1', label: 'Shadowgear', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {shadowgear} cards", reward: 100, icon: 'Icons/Archetype/Shadowgear.png', colorHex: '#888888' },

  { id: 'hybrid1', label: 'Hybrid', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {hybrid} cards", reward: 100, icon: 'Icons/Archetype/Hybrid.png', colorHex: '#888888' },
  { id: 'webcursed1', label: 'Webcursed', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {webcursed} cards", reward: 100, icon: 'Icons/Archetype/Webcursed.png', colorHex: '#888888' },
  { id: 'seraph1', label: 'Seraph', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {seraph} cards", reward: 100, icon: 'Icons/Archetype/Seraph.png', colorHex: '#888888' },
  { id: 'zephyra1', label: 'Zephyra', section: 'Color', group: 'Archetype', tier: 1, goal: 25,  description: "Collect 25 {zephyra} cards", reward: 100, icon: 'Icons/Archetype/Zephyra.png', colorHex: '#888888' },

// TRAITS //
  { id: 'evolution1', label: 'Evolution', section: 'Trait', group: 'Evolution', tier: 1, goal: 3,  description: "Collect 3 {evolution} cards", reward: 100, icon: 'Icons/Trait/Evolution.png', colorHex: '#a47c3b' },
  { id: 'evolution2', label: 'Evolution', section: 'Trait', group: 'Evolution', tier: 2, goal: 8,  description: "Collect 8 {evolution} cards", reward: 100, icon: 'Icons/Trait/Evolution.png', colorHex: '#a47c3b' },
  { id: 'evolution3', label: 'Evolution', section: 'Trait', group: 'Evolution', tier: 3, goal: 15,  description: "Collect 15 {evolution} cards", reward: 100, icon: 'Icons/Trait/Evolution.png', colorHex: '#a47c3b' },

  { id: 'warrior1', label: 'Warrior', section: 'Trait', group: 'Warrior', tier: 1, goal: 5,  description: "Collect 5 {warrior} cards", reward: 100, icon: 'Icons/Type/Warrior.png', colorHex: '#e0801c' },
  { id: 'warrior2', label: 'Warrior', section: 'Trait', group: 'Warrior', tier: 2, goal: 10,  description: "Collect 10 {warrior} cards", reward: 100, icon: 'Icons/Type/Warrior.png', colorHex: '#e0801c' },
  { id: 'warrior3', label: 'Warrior', section: 'Trait', group: 'Warrior', tier: 3, goal: 15,  description: "Collect 15 {warrior} cards", reward: 100, icon: 'Icons/Type/Warrior.png', colorHex: '#e0801c' },
  { id: 'warrior4', label: 'Warrior', section: 'Trait', group: 'Warrior', tier: 4, goal: 20,  description: "Collect 20 {warrior} cards", reward: 100, icon: 'Icons/Type/Warrior.png', colorHex: '#e0801c' },
  { id: 'warrior5', label: 'Warrior', section: 'Trait', group: 'Warrior', tier: 5, goal: 25,  description: "Collect 25 {warrior} cards", reward: 100, icon: 'Icons/Type/Warrior.png', colorHex: '#e0801c' },

  { id: 'brute1', label: 'Brute', section: 'Trait', group: 'Brute', tier: 1, goal: 4,  description: "Collect 4 {brute} cards", reward: 100, icon: 'Icons/Type/Brute.png', colorHex: '#a47c3b' },
  { id: 'brute2', label: 'Brute', section: 'Trait', group: 'Brute', tier: 2, goal: 10,  description: "Collect 10 {brute} cards", reward: 100, icon: 'Icons/Type/Brute.png', colorHex: '#a47c3b' },
  { id: 'brute3', label: 'Brute', section: 'Trait', group: 'Brute', tier: 3, goal: 25,  description: "Collect 25 {brute} cards", reward: 100, icon: 'Icons/Type/Brute.png', colorHex: '#a47c3b' },

  { id: 'assembly1', label: 'Assembly', section: 'Trait', group: 'Assembly', tier: 1, goal: 3,  description: "Collect 3 {assembly} cards", reward: 100, icon: 'Icons/Trait/Assembly.png', colorHex: '#a47c3b' },
  { id: 'assembly2', label: 'Assembly', section: 'Trait', group: 'Assembly', tier: 2, goal: 8,  description: "Collect 8 {assembly} cards", reward: 100, icon: 'Icons/Trait/Assembly.png', colorHex: '#a47c3b' },
  { id: 'assembly3', label: 'Assembly', section: 'Trait', group: 'Assembly', tier: 3, goal: 15,  description: "Collect 15 {assembly} cards", reward: 100, icon: 'Icons/Trait/Assembly.png', colorHex: '#a47c3b' },

  { id: 'fusion1', label: 'Fusion', section: 'Trait', group: 'Fusion', tier: 1, goal: 25,  description: "Collect 25 {fusion } cards", reward: 100, icon: 'Icons/Trait/Fusion.png', colorHex: '#a47c3b' },
  { id: 'relic1', label: 'Relic', section: 'Trait', group: 'Relic', tier: 1, goal: 25,  description: "Collect 25 {relic} cards", reward: 100, icon: 'Icons/Trait/Relic.png', colorHex: '#e0801c' },
  { id: 'equipment1', label: 'Equipment', section: 'Trait', group: 'Equipment', tier: 1, goal: 25,  description: "Collect 25 {equipment} cards", reward: 100, icon: 'Icons/Trait/Equipment.png', colorHex: '#e0801c' },
  { id: 'enchantment1', label: 'Enchantment', section: 'Trait', group: 'Enchantment', tier: 1, goal: 25,  description: "Collect 25 {enchantment} cards", reward: 100, icon: 'Icons/Trait/Enchantment.png', colorHex: '#a47c3b' },
  { id: 'mage1', label: 'Mage', section: 'Trait', group: 'Mage', tier: 1, goal: 25,  description: "Collect 25 {mage} cards", reward: 100, icon: 'Icons/Trait/Mage.png', colorHex: '#a47c3b' },
  { id: 'ranger1', label: 'Ranger', section: 'Trait', group: 'Ranger', tier: 1, goal: 25,  description: "Collect 25 {nightshroud} cards", reward: 100, icon: 'Icons/Trait/Ranger.png', colorHex: '#a47c3b' },
*/
// COSMETICS //
  cosmetic: { title: 'Cosmetic', groups: [
  { id: 'cosmetic_avatar', title: 'Avatar', image: 'Images/Type/Avatar.png', tiers: [
    { tier: 1, goal: 5,  description: "Collect 5 Avatars", reward: 100, image: 'Images/Blank/Avatar.png' },
    { tier: 2, goal: 10,  description: "Collect 10 Avatars", reward: 100, image: 'Images/Blank/Avatar.png' },
    { tier: 3, goal: 15,  description: "Collect 15 Avatars", reward: 100, image: 'Images/Blank/Avatar.png' },
    { tier: 4, goal: 20,  description: "Collect 20 Avatars", reward: 100, image: 'Images/Blank/Avatar.png' },
    { tier: 5, goal: 25,  description: "Collect 25 Avatars", reward: 100, image: 'Images/Blank/Avatar.png' },
    { tier: 6, goal: 30,  description: "Collect 30 Avatars", reward: 100, image: 'Images/Blank/Avatar.png' },
    { tier: 7, goal: 35,  description: "Collect 35 Avatars", reward: 100, image: 'Images/Blank/Avatar.png' },
    { tier: 8, goal: 40,  description: "Collect 40 Avatars", reward: 100, image: 'Images/Blank/Avatar.png' },
  ]},
/*
  { id: 'banner1', section: 'Cosmetic', group: 'Banner', tier: 1, goal: 25,  description: "Collect 25 Banners", reward: 100, image: 'Images/Blank/Green.png' },
  { id: 'cardback1', section: 'Cosmetic', group: 'Cardback', tier: 1, goal: 25,  description: "Collect 25 Cardbacks", reward: 100, image: 'Images/Blank/Green.png' },
*/ 
  ]
  },
};

// ----------------- //
// --- FUNCTIONS --- //
// ----------------- //
function getPlayerLevel() {
  return playerLevel;
}
function setQuestData(data, shouldSave = false) {
  playerQuests = data;
  if (shouldSave) saveProgress();
}

function getQuestData() {
  return playerQuests;
}
function setAchievementData(data, shouldSave = false) {
  playerAchievements = data;
  if (shouldSave) saveProgress();
}
function getAchievementData() {
  return playerAchievements;
}
function getQuestResets(cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    if (typeof cb === "function") cb({});
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(function(doc) {
      const resets = (doc.exists && doc.data().questResets) ? doc.data().questResets : {};
      if (typeof cb === "function") cb(resets);
    })
    .catch(function() {
      if (typeof cb === "function") cb({});
    });
}
function setQuestResets(obj, cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    if (typeof cb === "function") cb();
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).set(
    { questResets: obj }, { merge: true }
  ).then(function() {
    if (typeof cb === "function") cb();
  });
}
function resetQuestsIfNeeded() {
  const now = new Date();
  getQuestResets(function(resets) {
    let changed = false;
    //  reset at 00:00 UTC
    const last = resets.lastReset ? new Date(resets.lastReset) : null;
    const nowUtc = new Date(now.toISOString().split('T')[0] + "T00:00:00.000Z");
    if (!last || nowUtc > last) {
      resetQuestProgress('');
      resets.lastReset = nowUtc.toISOString();
      changed = true;
    }
    if (changed) setQuestResets(resets);
  });
}
// 3. Reset Quest progress for a type
function resetQuestProgress(type) {
  let quests = getQuestData();
  getActiveQuests(function(activeQuests) {
    for (const quest of activeQuests) {
      quests[quest.id] = { progress: 0, completed: false, claimed: false };
    }
    setQuestData(quests);
  });
}

// 4. Get progress for a Quest
function getQuestProgress(quest) {
  let data = getQuestData();
  if (!data[quest.id]) {
    data[quest.id] = { progress: 0, completed: false, claimed: false };
    setQuestData(data);
  }
  return data[quest.id];
}

// 5. Increment Quest progress by 1 (call from shop.js or elsewhere)
function incrementQuestProgress(questId) {
  let data = getQuestData();
  getActiveQuests(function(questsList) {
    const quest = questsList.find(m => m.id === questId);
    if (!quest) return;
    if (!data[questId]) data[questId] = { progress: 0, completed: false, claimed: false };
    if (data[questId].completed) return;

    data[questId].progress = Math.min(quest.goal, (data[questId].progress || 0) + 1);
    if (data[questId].progress >= quest.goal) data[questId].completed = true;
    setQuestData(data, false);
    renderQuests();
    updateQuestsNotificationDot();
  });
}

function claimQuestReward(quest, cb) {
  let data = getQuestData();
  if (!data[quest.id] || !data[quest.id].completed || data[quest.id].claimed) {
    if (typeof cb === "function") cb(false);
    return false;
  }
  setCurrency(getCurrency() + quest.reward.amount);
  data[quest.id].claimed = true;
  // Set per-quest resetAt (24 hours from now)
  data[quest.id].resetAt = Date.now() + 24 * 60 * 60 * 1000;
  setQuestData(data);
  updateQuestsNotificationDot();
  saveProgress();
  renderQuests();
  startQuestTimers();
  if (typeof cb === "function") cb(true);
  return true;
}

function renderQuests() {
  const list = document.getElementById('quests-list');
  if (!list) return;
  list.innerHTML = '';
  let timerDiv = document.getElementById('quest-reset-timer');
  if (!timerDiv) {
    timerDiv = document.createElement('div');
    timerDiv.id = 'quest-reset-timer';
    list.parentElement.insertBefore(timerDiv, list);
  }
  updateQuestResetTimer();
  getActiveQuests(function(quests) {
    // Always slice to maximum QUEST_SLOTS
    const displayedQuests = (quests || []).filter(q => !!q && !!q.id).slice(0, QUEST_SLOTS);

    let renderedCount = 0;
    for (let i = 0; i < QUEST_SLOTS; i++) {
      const quest = displayedQuests[i];
      if (!quest) {
        const entry = document.createElement('div');
        entry.className = 'quest-entry empty-quest-slot';
        entry.innerHTML = `<div class="quest-desc">Empty Quest Slot</div>`;
        list.appendChild(entry);
        renderedCount++;
        continue;
      }
      const questDef = QUEST_POOL.find(q => q.id === (quest.id || quest));
      if (!questDef) continue;
      const progress = getQuestProgress(questDef);

      // If claimed, skip rendering (quests disappear once claimed)
      if (progress.claimed) continue;

      // Timer HTML if needed
      let timerHtml = '';
      if (progress.resetAt) {
        timerHtml = `<div class="quest-timer" id="quest-timer-${questDef.id}" style="font-size:0.93em;color:#ffe066;margin-bottom:2px;"></div>`;
      }
      const percent = Math.min(100, Math.round((progress.progress / questDef.goal) * 100));
      const entry = document.createElement('div');
      entry.className = 'quest-entry';
      entry.innerHTML = `
        <img src="${questDef.image || 'Images/Domains/placeholder.png'}" alt="Quest" class="quest-image">
        <div class="quest-main">
          <div class="quest-desc">${questDef.description}</div>
          ${timerHtml}
          <div class="quest-progress-row">
            <div class="quest-progress-bar-wrap">
              <div class="quest-progress-bar" style="width:${percent}%;"></div>
            </div>
            <div class="quest-progress-numbers">${progress.progress} / ${questDef.goal}</div>
            <div class="quest-reward">
              <img class="currency-icon" src="Icons/Other/Coins.png" alt="Coins">${questDef.reward.amount}
            </div>
          </div>
        </div>
      `;
      // Claimable: entire entry clickable and greenish
      if (progress.completed && !progress.claimed) {
        entry.classList.add('quest-claimable');
        entry.style.cursor = 'pointer';
        entry.onclick = function() {
          claimQuestReward(questDef, function() {
            renderQuests(); // Re-render to remove claimed quest
          });
        };
      } else {
        entry.onclick = null;
      }
      list.appendChild(entry);
      renderedCount++;
    }

    // Fill empty slots if claimed quests were present
    while (renderedCount < QUEST_SLOTS) {
      const entry = document.createElement('div');
      entry.className = 'quest-entry empty-quest-slot';
      entry.innerHTML = `<div class="quest-desc">Empty Quest Slot</div>`;
      list.appendChild(entry);
      renderedCount++;
    }

    startQuestTimers();
  });
}
function ensureQuestSlots(cb) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  const userDoc = firebase.firestore().collection('users').doc(user.uid);

  userDoc.get().then(doc => {
    const data = doc.exists ? doc.data() : {};
    const lastQuestDate = data.lastQuestDate || null;
    const today = getTodayUtcDateString();

    let needsUpdate = (lastQuestDate !== today);
    let activeQuests = Array.isArray(data.activeQuests) ? data.activeQuests.slice(0, QUEST_SLOTS) : [];

    // Only keep valid quests and ensure unique IDs
    let uniqueQuestIds = new Set();
    activeQuests = activeQuests.filter(q => {
      const id = q.id || q;
      if (uniqueQuestIds.has(id)) return false;
      uniqueQuestIds.add(id);
      return QUEST_POOL.some(poolQuest => poolQuest.id === id);
    });

    if (needsUpdate || activeQuests.length < QUEST_SLOTS) {
      // Fill empty slots with unique quests not already in activeQuests
      const existingIds = new Set(activeQuests.map(q => q.id || q));
      // Deep copy QUEST_POOL and shuffle
      let pool = QUEST_POOL.filter(q => !existingIds.has(q.id));
      pool = pool.filter(q => q.id); // skip pool entries without id

      // Shuffle pool
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      while (activeQuests.length < QUEST_SLOTS && pool.length > 0) {
        activeQuests.push(pool.pop());
      }

      // Final safety: slice in case of accidental overflow
      activeQuests = activeQuests.slice(0, QUEST_SLOTS);

      userDoc.set({
        activeQuests,
        lastQuestDate: today
      }, { merge: true }).then(() => {
        if (typeof cb === "function") cb(activeQuests);
        renderQuests();
      });
    } else {
      // No reset needed, just ensure exactly 5 unique quests
      let uniqueQuestIds = new Set();
      activeQuests = activeQuests.filter(q => {
        const id = q.id || q;
        if (uniqueQuestIds.has(id)) return false;
        uniqueQuestIds.add(id);
        return true;
      });
      activeQuests = activeQuests.slice(0, QUEST_SLOTS);

      if (typeof cb === "function") cb(activeQuests);
      renderQuests();
    }
  });
}
function getTodayUtcDateString() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    .toISOString().split("T")[0];
}
function getNextUtcMidnightMs() {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  return next - now;
}

// ----------------- //
// ACHIVEMENTS LOGIC //
// ----------------- //
// You need a stable group key per "achievement group" across all sections.
// If your ACHIEVEMENTS already has group.id, use that.
// Fallback: derive from sectionKey + groupKey.
function getAchievementGroupKey(sectionKey, group) {
  return group.id || group.key || group.name || `${sectionKey}::${group.title || 'group'}`;
}

// Clamp and sanitize progress
function clampProgress(val) {
  const n = Number(val || 0);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

// Find the "goal" / required amount for a tier.
// Adjust property names to match your tiers.
function getTierGoal(tier) {
  // Common: tier.goal, tier.required, tier.target, tier.amount
  return Number(tier.goal ?? tier.required ?? tier.target ?? tier.amount ?? 0) || 0;
}

function getTierReward(tier) {
  // Optional: tier.reward (coins/essence/cosmetic/etc)
  return tier.reward ?? null;
}

// Return progress for a group (current tier only)
function getAchievementProgress(groupKey) {
  
}

function ensureAchievementState() {
  window.playerAchievements = window.playerAchievements || {};
  if (!window.playerAchievements.progress || typeof window.playerAchievements.progress !== "object") {
    window.playerAchievements.progress = {};
  }
  if (!window.playerAchievements.claimed || typeof window.playerAchievements.claimed !== "object") {
    window.playerAchievements.claimed = {};
  }
  return window.playerAchievements;
}

function setAchievementProgress(sectionKey, groupId, value, { autoSave = true } = {}) {
  const st = ensureAchievementState();
  st.progress[groupId] = Math.max(0, Number(value || 0));

  if (autoSave && typeof saveProgress === "function") saveProgress();
}

function getAchievementProgress(groupId) {
  const st = ensureAchievementState();
  return Number(st.progress[groupId] || 0);
}

function isAchievementTierClaimed(groupId, tierNumber) {
  const st = ensureAchievementState();
  return !!(st.claimed[groupId] && st.claimed[groupId][tierNumber]);
}

function countCardsColor(colorName) {
  const collection = (typeof getCollection === 'function') ? getCollection() : {};
  const want = String(colorName || '').toLowerCase();

  let count = 0;
  (window.dummyCards || []).forEach(card => {
    const cardColor = String(card?.color || '').toLowerCase();
    if (cardColor !== want) return;

    const owned = Number(collection[card.id] || 0);
    if (owned > 0) count += 1;
  });
  return count;
}

function countCardsType(typeName) {
  const collection = (typeof getCollection === 'function') ? getCollection() : {};
  const want = String(typeName || '').toLowerCase();

  let count = 0;
  (window.dummyCards || []).forEach(card => {
    const t = card?.type;

    const matches =
      Array.isArray(t)
        ? t.map(x => String(x).toLowerCase()).includes(want)
        : String(t || '').toLowerCase() === want;

    if (!matches) return;

    const owned = Number(collection[card.id] || 0);
    if (owned > 0) count += 1;
  });

  return count;
}
function countOwnedCosmetics(kind) {
  // Change these keys to match your real saved variables
  const st = window.playerCosmetics || {};
  const arr =
    kind === "avatar"   ? (st.avatars   || window.ownedAvatars   || []) :
    kind === "banner"   ? (st.banners   || window.ownedBanners   || []) :
    kind === "cardback" ? (st.cardbacks || window.ownedCardbacks || []) :
    [];

  if (!Array.isArray(arr)) return 0;

  // unique IDs
  return new Set(arr.map(x => String(x))).size;
}

function updateCosmeticAchievements({ autoSave = true } = {}) {

  setAchievementProgress("cosmetic", "cosmetic_avatar", countOwnedCosmetics("avatar"), { autoSave: false });

  if (autoSave && typeof saveProgress === "function") saveProgress();
}
function renderAchievements() {
  // Find the currently active tab/category
  const activeTab = document.querySelector('.achievements-tab.active');
  const category = activeTab ? activeTab.getAttribute('data-category') : 'general';
  renderAchievementsCategory(category);
}

function updateUniqueCardsAchievement() {
  const collection = getCollection();
  // Count unique card IDs with at least 1 copy
  const uniqueCount = Object.keys(collection).filter(id => collection[id] > 0).length;
  if (typeof setAchievementProgress === 'function') {
    setAchievementProgress('collect_20_unique_cards', uniqueCount);
  }
}
function updateColorAchievements() {
  const collection = getCollection();
  ACHIEVEMENTS.forEach(ach => {
    if (ach.color) {
      const colorCardIds = dummyCards
        .filter(card => card.color && (
          (Array.isArray(card.color) && card.color.includes(ach.color)) ||
          card.color === ach.color
        ))
        .map(card => card.id);
      // Count in collection
      const count = colorCardIds.reduce((sum, id) => sum + (collection[id] || 0), 0);
      if (typeof setAchievementProgress === 'function') {
        setAchievementProgress(ach.id, count);
      }
    }
  });
}
function getNextResetTime() {
  if (!window.questResetTimestamp) {
    // Set it to now so that the next reset is 24 hours ahead
    window.questResetTimestamp = Date.now();
  }
  return window.questResetTimestamp + 24 * 60 * 60 * 1000;
}

function formatTimer(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

// --- QUEST RESET TIMER ---
let questResetTimerInterval = null;
function updateQuestResetTimer() {
  const timerDiv = document.getElementById('quest-reset-timer');
  if (!timerDiv) return;
  const ms = getNextUtcMidnightMs();
  timerDiv.textContent = `Next quests reset in ${formatTimerMs(ms)}`;
  // When timer reaches zero, reset quests and update UI
  if (ms <= 0) {
    resetQuestsIfNeeded();
    renderQuests();
  }
}
function startQuestResetTimer() {
  clearInterval(questResetTimerInterval);
  updateQuestResetTimer();
  questResetTimerInterval = setInterval(updateQuestResetTimer, 1000);
}

let TimerInterval = null;

function startQuestTimers() {
  clearInterval(window._allQuestTimers);
  function update() {
    let data = getQuestData();
    let updated = false;
    for (const questId in data) {
      const quest = data[questId];
      if (quest.claimed && quest.resetAt) {
        const el = document.getElementById('quest-timer-' + questId);
        const remain = quest.resetAt - Date.now();
        if (el) {
          if (remain > 0) {
            el.textContent = 'New quest in: ' + formatTimer(remain);
          } else {
            el.textContent = 'New quest available!';
          }
        }
        // When timer ends, reset this quest
        if (remain <= 0 && quest.claimed) {
          // Remove/reset this quest slot (you could replace with a new random quest)
          data[questId] = { progress: 0, completed: false, claimed: false };
          updated = true;
        }
      }
    }
    if (updated) {
      setQuestData(data);
      renderQuests();
    }
  }
  update();
  window._allQuestTimers = setInterval(update, 1000);
}
function getRandomQuests(pool, count) {
  const copy = [...pool];
  const selected = [];
  while (selected.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    selected.push(copy.splice(idx, 1)[0]);
  }
  return selected;
}

// --- FIREBASE-BASED Quest STATE ---
function getActiveQuests(cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    if (typeof cb === "function") cb([]);
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(function(doc) {
      const quests = (doc.exists && doc.data().activeQuests) ? doc.data().activeQuests : [];
      if (typeof cb === "function") cb(quests);
    })
    .catch(function() {
      if (typeof cb === "function") cb([]);
    });
}

function setActiveQuests(quests, cb) {
  const user = firebase.auth().currentUser;
  if (!user) {
    if (typeof cb === "function") cb();
    return;
  }
  firebase.firestore().collection('users').doc(user.uid).set(
    { activeQuests: quests }, { merge: true }
  ).then(function() {
    if (typeof cb === "function") cb();
  });
}

function refreshQuests() {
  playerQuests = {};
  window.questResetTimestamp = Date.now();
  saveProgress();
  renderQuests();
  startQuestTimers();
}

function updateQuestsNotificationDot() {
  getActiveQuests(function(questsList) {
    const questData = getQuestData();
    const hasClaimable = questsList.some(m => {
      const p = questData[m.id];
      return p && p.completed && !p.claimed;
    });
    const dot = document.getElementById('quests-notification-dot');
    if (dot) dot.style.display = hasClaimable ? 'block' : 'none';
  });
}

function updateAchievementsNotificationDot() {
  const achievementData = getAchievementData();
  const hasClaimable = ACHIEVEMENTS.some(a => {
    const p = achievementData[a.id];
    return p && p.completed && !p.claimed;
  });
  const dot = document.getElementById('achievements-notification-dot');
  if (dot) dot.style.display = hasClaimable ? 'block' : 'none';
}

// PLAYER LEVEL
function expToNextLevel(level) {
  return 100 + (level - 1) * 100; // Example: 100, 200, 300, ...
}

function grantExp(amount) {
  if (!amount) return;
  playerExp += amount;
  let leveledUp = false;
  while (playerExp >= expToNextLevel(playerLevel)) {
    playerExp -= expToNextLevel(playerLevel);
    playerLevel += 1;
    leveledUp = true;
    showToast(`Level Up! You reached Lv ${playerLevel}!`);
  }
  saveProgress();
  renderPlayerLevel();
  return leveledUp;
}

function renderPlayerLevel() {
  const levelEl = document.getElementById('player-level-label');
  if (levelEl) levelEl.textContent = "Lv " + playerLevel;
  const expBar = document.getElementById('player-exp-bar-fill');
  const expNum = document.getElementById('player-exp-numbers');
  const needed = expToNextLevel(playerLevel);
  const exp = typeof playerExp === "number" ? playerExp : 0;
  if (expBar) {
    // Clamp percentage between 0 and 100
    const percent = Math.max(0, Math.min(100, (exp / needed) * 100));
    expBar.style.width = percent + "%";
  }
  if (expNum) expNum.textContent = exp + " / " + needed;
}
function getAchievementTiers(section, group) {
  // Assumes ACHIEVEMENTS is a flat array OR object; adapt as needed
  // If ACHIEVEMENTS is an array of entries:
  const all = Array.isArray(window.ACHIEVEMENTS) ? window.ACHIEVEMENTS : [];

  const sec = String(section || '');
  const grp = String(group || '');

  return all
    .filter(a => a && a.section === sec && a.group === grp)
    .slice()
    .sort((a, b) => Number(a.tier || 0) - Number(b.tier || 0));
}
function ensureAchievementState() {
  if (!window.playerAchievements || typeof playerAchievements !== 'object') {
    window.playerAchievements = {};
  }
  if (!playerAchievements.groups || typeof playerAchievements.groups !== 'object') {
    playerAchievements.groups = {};
  }
  return playerAchievements;
}

function getAchievementGroupKeyFromEntry(entry) {
  return `${entry.section}::${entry.group}`;
}
function getTieredAchievementView(section, group, progressValue) {
  const tiers = getAchievementTiers(section, group);
  const groupKey = `${section}::${group}`;

  // Determine completion from progress, and persist "completed" flags (monotonic)
  tiers.forEach(t => {
    const tierNum = Number(t.tier || 0);
    const goal = Number(t.goal || 0);
    if (tierNum > 0 && goal > 0 && progressValue >= goal) {
      gs.completed[tierNum] = true;
    }
  });

  // Determine the next tier to display: first not completed
  let current = null;
  for (const t of tiers) {
    const tierNum = Number(t.tier || 0);
    if (!gs.completed[tierNum]) {
      current = t;
      break;
    }
  }
  // If all completed, show the last tier as "completed"
  if (!current && tiers.length) current = tiers[tiers.length - 1];

  return { tiers, current, state: gs, groupKey };
}
function buildAchievementIndex() {
  const idx = {};
  for (const [sectionKey, sectionDef] of Object.entries(ACHIEVEMENTS || {})) {
    const groups = Array.isArray(sectionDef.groups) ? sectionDef.groups : [];
    groups.forEach(group => {
      const key = getAchievementGroupKey(sectionKey, group);
      // Prefer explicit group.id for external references:
      const externalId = group.id || key;
      idx[externalId] = { sectionKey, group };
    });
  }
  return idx;
}
window._ACHIEVEMENT_INDEX = window._ACHIEVEMENT_INDEX || buildAchievementIndex();

function renderAchievementsCategory(sectionKey) {
  const panel = document.getElementById('achievements-list');
  if (!panel) return;

  panel.innerHTML = '';

  const sectionDef = (window.ACHIEVEMENTS || {})[sectionKey];
  if (!sectionDef || !Array.isArray(sectionDef.groups)) {
    panel.innerHTML = `<div style="opacity:.8">No achievements found for "${sectionKey}".</div>`;
    return;
  }

  sectionDef.groups.forEach(group => {
    if (!group || !group.id || !Array.isArray(group.tiers)) return;

    const groupId = group.id;
    const progressValue = getAchievementProgress(groupId);

    // Group header
    const groupHeader = document.createElement('div');
    groupHeader.className = 'achievement-group-header';
    groupHeader.textContent = group.title || groupId;
    panel.appendChild(groupHeader);

    // Build tier view models first so we can sort (claimed at bottom)
    const tierModels = group.tiers
      .slice()
      .sort((a, b) => Number(a.tier || 0) - Number(b.tier || 0))
      .map(t => {
        const tierNumber = Number(t.tier || 0);
        const goal = Number(t.goal || 0);
        const completed = goal > 0 && progressValue >= goal;
        const claimed = isAchievementTierClaimed(groupId, tierNumber);

        return { t, tierNumber, goal, completed, claimed };
      })
      .sort((a, b) => Number(a.claimed) - Number(b.claimed)); // false first, true last

    tierModels.forEach(({ t, tierNumber, goal, completed, claimed }) => {
      const row = document.createElement('div');
      row.className = 'achievement-entry';
      if (completed) row.classList.add('completed');
      if (claimed) row.classList.add('claimed'); // you can style .claimed in CSS to gray out

      // If you want: make it clickable only when completed && !claimed
      const claimable = completed && !claimed;
      if (claimable) {
        row.classList.add('claimable');
        row.style.cursor = 'pointer';
        row.onclick = () => {
          // You will implement claimAchievementTierReward(groupId, tierNumber)
          // then re-render
          if (typeof claimAchievementTierReward === "function") {
            claimAchievementTierReward(sectionKey, groupId, tierNumber);
            renderAchievementsCategory(sectionKey);
            updateAchievementsNotificationDot && updateAchievementsNotificationDot();
          }
        };
      }

      row.innerHTML = `
        <div class="ach-title">${t.description || 'Achievement'} (Tier ${tierNumber})</div>
        <div class="ach-progress">${Math.min(progressValue, goal)} / ${goal}</div>
        <div class="ach-reward">Reward: ${t.reward ?? 0}</div>
      `;

      panel.appendChild(row);
    });
  });
}

function openAchievementsModalDefault() {
  document.getElementById('achievements-modal').style.display = 'flex';
  document.querySelectorAll('.achievements-tab').forEach(t => t.classList.remove('active'));
  const generalTab = document.querySelector('.achievements-tab[data-category="general"]');
  if (generalTab) generalTab.classList.add('active');
  renderAchievementsCategory('general');
}

function computeAchievementsProgress({ autoSave = true } = {}) {
  // ACCOUNT: Level
  setAchievementProgress("account", "account_level", Number(window.playerLevel || 1), { autoSave: false });

  // COLOR: each group maps to a color name
  const colorMap = {
    color_green: "green",
    color_red: "red",
    color_blue: "blue",
    color_yellow: "yellow",
    color_purple: "purple",
    color_gray: "gray",
    color_white: "white",
    color_black: "black",
  };

  Object.entries(colorMap).forEach(([groupId, colorName]) => {
    const v = countCardsColor(colorName); // your existing unique-id counter
    setAchievementProgress("color", groupId, v, { autoSave: false });
  });

  // TYPE: examples you currently have
  const typeMap = {
    type_avian: "avian",
    type_beast: "beast",
  };

  Object.entries(typeMap).forEach(([groupId, typeName]) => {
    const v = countCollectedCardsByType(typeName);
    setAchievementProgress("type", groupId, v, { autoSave: false });
  });

  // COSMETIC: avatars
  setAchievementProgress("cosmetic", "cosmetic_avatar", countUnlockedAvatars(), { autoSave: false });

  if (autoSave && typeof saveProgress === "function") saveProgress();
}
window.computeAchievementsProgress = computeAchievementsProgress;
// --- ENSURE QUESTS RESET AT 00:00 UTC ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', function() {
  resetQuestsIfNeeded(); // Ensure daily reset logic runs
});
// OPEN/CLOSE LOGIC
document.getElementById('quests-icon').onclick = function() {
  document.getElementById('quests-modal').style.display = 'flex';
  startQuestResetTimer();
};
document.getElementById('close-quests-modal').onclick = function() {
  document.getElementById('quests-modal').style.display = 'none';
  clearInterval(questResetTimerInterval);
};
document.getElementById('quests-modal').onclick = function(e) {
  if (e.target === this) {
    this.style.display = 'none';
    clearInterval(questResetTimerInterval);
  }
};

document.getElementById('achievements-icon').onclick = openAchievementsModalDefault;

document.getElementById('achievements-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
document.getElementById('achievements-back-btn').onclick = function() {
  document.getElementById('achievements-modal').style.display = 'none';
  document.getElementById('home-section').classList.add('active');
};
// Tab switching logic
document.querySelectorAll('.achievements-tab').forEach(tab => {
  tab.onclick = function() {
    document.querySelectorAll('.achievements-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.getAttribute('data-category');
    renderAchievementsCategory(category);
  };
});
document.getElementById('achievements-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};
document.getElementById('close-quests-modal').onclick = function() {
  document.getElementById('quests-modal').style.display = 'none';
};
document.getElementById('quests-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};

// Expose quest/achievement/level functions globally for use in other scripts or inline HTML
window.renderQuests = renderQuests;
window.renderAchievements = renderAchievements;
window.renderPlayerLevel = renderPlayerLevel;
window.updateQuestsNotificationDot = updateQuestsNotificationDot;
window.updateAchievementsNotificationDot = updateAchievementsNotificationDot;
window.startQuestTimers = startQuestTimers;
window.ACHIEVEMENTS = ACHIEVEMENTS;
