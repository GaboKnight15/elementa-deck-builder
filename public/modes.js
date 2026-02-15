const DEFAULT_DECKS = [
{ id: 'Sylvan1', name: 'Sprouting Seeds', color: 'green', difficulty: '⭐',
  image: 'Images/Avatar/Green/Fairy.png', bannerArt: 'Images/Banner/Forest.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'SylvanElf', amount: 3 },      
    { id: 'ForestFairy', amount: 3 },
    { id: 'ForestGoblin', amount: 3 },
    { id: 'ElementalofLeaves', amount: 3 },
    { id: 'ForestWarrior', amount: 3 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'VerdantRebirth', amount: 2 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'SylvanCanopy', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Sylvan2', name: 'Verdant Might', color: 'green', difficulty: '⭐⭐',
  image: 'Images/Avatar/Green/WoodlandAntler.png', bannerArt: 'Images/Banner/Forest.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'DeepwoodUrsan', amount: 1 },
    { id: 'SylvanElf', amount: 3 },      
    { id: 'ForestFairy', amount: 3 },
    { id: 'ForestGoblin', amount: 3 },
    { id: 'ElementalofLeaves', amount: 3 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'LifeGrowth', amount: 1 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'EmeraldVeil', amount: 2 }, { id: 'SylvanCanopy', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Sylvan3', name: 'Ancient Wilds', color: 'green', difficulty: '⭐⭐⭐',
  image: 'Images/Avatar/Green/DeepwoodUrsan.png', bannerArt: 'Images/Banner/Forest.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 }, { id: 'VeyaEmeraldDruidess', amount: 1 }, { id: 'SylvanAnima', amount: 1 },
    { id: 'DeepwoodUrsan', amount: 2 },
    { id: 'SylvanElf', amount: 3 },      
    { id: 'ForestFairy', amount: 3 },
    { id: 'ElementalofLeaves', amount: 3 },
    { id: 'ForestWarrior', amount: 3 },
    { id: 'HeartwoodRelic', amount: 3 }, 
    { id: 'LifeGrowth', amount: 2 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'SylvanCanopy', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Sylvan4', name: 'Everdawn Wildheart', color: 'green', difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Green/VerdaraSoldier.png', bannerArt: 'Images/Banner/Verdara.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 }, { id: 'VeyaEmeraldDruidess', amount: 1 }, { id: 'SylvanAnima', amount: 1 },
    { id: 'DeepwoodUrsan', amount: 2 },
    { id: 'SylvanElf', amount: 3 },      
    { id: 'ForestFairy', amount: 3 },
    { id: 'ElementalofLeaves', amount: 3 },
    { id: 'ForestWarrior', amount: 3 },
    { id: 'HeartwoodRelic', amount: 3 }, 
    { id: 'LifeGrowth', amount: 2 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'SylvanCanopy', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Sylvan5', name: 'Worldroot Ascendancy', color: 'green', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Green/Veya.png', bannerArt: 'Images/Banner/Verdara.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 }, { id: 'VeyaEmeraldDruidess', amount: 1 }, { id: 'SylvanAnima', amount: 1 },
    { id: 'DeepwoodUrsan', amount: 2 },
    { id: 'SylvanElf', amount: 3 },
    { id: 'ForestFairy', amount: 3 },
    { id: 'ElementalofLeaves', amount: 3 },
    { id: 'ForestWarrior', amount: 3 },
    { id: 'HeartwoodRelic', amount: 3 }, 
    { id: 'LifeGrowth', amount: 2 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'SylvanCanopy', amount: 3 }, { id: 'Forest', amount: 3 },
]},
// --- GOBLIN DECKS --- //
{ id: 'Goblin1', name: 'Thornwine Chorus', color: ['green', 'red', 'gray', 'purple', 'black'], difficulty: '⭐',
  image: 'Images/Avatar/Green/WildwoodGoblin.png', bannerArt: 'Images/Banner/GreenBanner.png', cardbackArt: 'Images/Cardback/Goblin.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'FaunDiviner', amount: 3 },      
    { id: 'WildHuntress', amount: 3 },
    { id: 'FaunRanger', amount: 3 },
    { id: 'TreantGrovesent', amount: 3 },
    { id: 'SatyrOccultist', amount: 3 },
    { id: 'HunterSatyr', amount: 2 },
    { id: 'Treant', amount: 3 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'ArborCommunion', amount: 3 },
    { id: 'EmeraldVeil', amount: 3 }, { id: 'Forest', amount: 3 },
]},
// --- SATYR DECKS --- //
{ id: 'Satyr1', name: 'Thornwine Chorus', color: ['green', 'purple'], difficulty: '⭐',
  image: 'Images/Avatar/Green/Satyr.png', bannerArt: 'Images/Banner/GreenBanner.png', cardbackArt: 'Images/Cardback/Satyr.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'FaunDiviner', amount: 3 },      
    { id: 'WildHuntress', amount: 3 },
    { id: 'FaunRanger', amount: 3 },
    { id: 'SatyrOccultist', amount: 3 },
    { id: 'HunterSatyr', amount: 3 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'EssenceSurge', amount: 3 },
    { id: 'EmeraldVeil', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Satyr2', name: 'Thornwine Chorus', color: ['green', 'purple'], difficulty: '⭐⭐',
  image: 'Images/Avatar/Green/WildHuntress.png', bannerArt: 'Images/Banner/GreenBanner.png', cardbackArt: 'Images/Cardback/Satyr.png',
  cards: [ { id: 'Verdara', amount: 1 }, { id: 'FaelyraWildhornEmpress', amount: 1 }, 
    { id: 'LifeGrowth', amount: 1 },
    { id: 'FaunDiviner', amount: 3 },      
    { id: 'FaunRanger', amount: 3 },
    { id: 'WildHuntress', amount: 3 },
    { id: 'ElderwoodOccultist', amount: 3 },
    { id: 'SummitWatcher', amount: 3 },
    { id: 'WildhornRavager', amount: 2 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'EmeraldVeil', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Satyr3', name: 'Thornwine Chorus', color: ['green', 'purple'], difficulty: '⭐⭐',
  image: 'Images/Avatar/Green/Faelyra.png', bannerArt: 'Images/Banner/GreenBanner.png', cardbackArt: 'Images/Cardback/Satyr.png',
  cards: [ { id: 'Verdara', amount: 1 }, { id: 'FaelyraWildhornEmpress', amount: 1 }, 
    { id: 'LifeGrowth', amount: 1 },
    { id: 'FaunDiviner', amount: 3 },      
    { id: 'FaunRanger', amount: 3 },
    { id: 'WildHuntress', amount: 3 },
    { id: 'ElderwoodOccultist', amount: 3 },
    { id: 'SummitWatcher', amount: 3 },
    { id: 'WildhornRavager', amount: 2 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'EmeraldVeil', amount: 3 }, { id: 'Forest', amount: 3 },
]},
// --- INFERNO DECKS --- //
{ id: 'Inferno1', name: 'Kindled Fury', color: 'red', difficulty: '⭐',
  image: 'Images/Avatar/Red/Emberling.png', bannerArt: 'Images/Banner/Volcano.png', cardbackArt: 'Images/Cardback/Fireland.png',
  cards: [ { id: 'Ashkar', amount: 1 }, { id: 'KaelenBlazebornHuntress', amount: 1 },
    { id: 'Emberling', amount: 3 },
    { id: 'FirePixie', amount: 3 },
    { id: 'Hellcharger', amount: 2 },
    { id: 'CindercoreEmber', amount: 3 },
    { id: 'EssenceAssault', amount: 3 },
    { id: 'Volcano', amount: 3 },
]},
{ id: 'Inferno2', name: 'Rising Flames', color: 'red', difficulty: '⭐⭐',
  image: 'Images/Avatar/Red/Emberling.png', bannerArt: 'Images/Banner/Volcano.png', cardbackArt: 'Images/Cardback/Fireland.png',
  cards: [ { id: 'Ashkar', amount: 1 }, { id: 'KaelenBlazebornHuntress', amount: 1 },
    { id: 'Emberling', amount: 3 },
    { id: 'FirePixie', amount: 3 },
    { id: 'Hellcharger', amount: 2 },
    { id: 'CindercoreEmber', amount: 3 },
    { id: 'EssenceAssault', amount: 3 },
    { id: 'Volcano', amount: 3 },
]},
{ id: 'Inferno3', name: 'Ember Tyranny', color: 'red', difficulty: '⭐⭐⭐',
  image: 'Images/Avatar/Red/BlazescaleWarDrake.png', bannerArt: 'Images/Banner/Volcano.png', cardbackArt: 'Images/Cardback/Fireland.png',
  cards: [ { id: 'Ashkar', amount: 1 }, { id: 'KaelenBlazebornHuntress', amount: 1 },
    { id: 'Emberling', amount: 3 },
    { id: 'FirePixie', amount: 3 },
    { id: 'Hellcharger', amount: 2 },
    { id: 'CindercoreEmber', amount: 3 },
    { id: 'EssenceAssault', amount: 3 },
    { id: 'Volcano', amount: 3 },
]},
{ id: 'Inferno4', name: 'Relentless Blaze', color: 'red', difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Red/MagmarisMercenary.png', bannerArt: 'Images/Banner/Volcano.png', cardbackArt: 'Images/Cardback/Fireland.png',
  cards: [ { id: 'Ashkar', amount: 1 }, { id: 'KaelenBlazebornHuntress', amount: 1 },
    { id: 'ElementalofFlames', amount: 2 },
    { id: 'Emberling', amount: 3 },
    { id: 'FirePixie', amount: 3 },
    { id: 'Hellcharger', amount: 2 },
    { id: 'CindercoreEmber', amount: 3 },
    { id: 'FlameBlast', amount: 3 },
    { id: 'Volcano', amount: 3 },
]},
{ id: 'Inferno5', name: 'Ember Tyranny', color: 'red', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Red/Kaelen.png', bannerArt: 'Images/Banner/Volcano.png', cardbackArt: 'Images/Cardback/Fireland.png',
  cards: [ { id: 'Ashkar', amount: 1 }, { id: 'KaelenBlazebornHuntress', amount: 1 }, { id: 'InfernoEruption', amount: 1 },
    { id: 'ElementalofFlames', amount: 2 },
    { id: 'Emberling', amount: 3 },
    { id: 'FirePixie', amount: 3 },
    { id: 'Hellcharger', amount: 2 },
    { id: 'CindercoreEmber', amount: 3 },
    { id: 'FlameBlast', amount: 3 },
    { id: 'Volcano', amount: 3 },
]},

// --- FIRELAND DECKS --- //
{ id: 'Fireland1', name: 'Emberfang Pride', color: 'red', difficulty: '⭐',
  image: 'Images/Avatar/Red/Kaelen.png', bannerArt: 'Images/Banner/Badland.png', cardbackArt: 'Images/Cardback/Fireland.png',
  cards: [ { id: 'Ashkar', amount: 1 }, { id: 'KaelenBlazebornHuntress', amount: 1 },
    { id: 'EphorosFirelandBehemoth', amount: 1 },
    { id: 'HenchmanofEphoros', amount: 1 },
    { id: 'FirelandHellmaw', amount: 2 },
    { id: 'FirelandHellhound', amount: 3 },
    { id: 'FirelandDirebeast', amount: 3 },
    { id: 'FirelandKitsune', amount: 3 },
    { id: 'FirelandLynx', amount: 3 }, 
    { id: 'FirelandCindercub', amount: 3 },
    { id: 'FirelandScamperling', amount: 3 },
    { id: 'Volcano', amount: 3 },
]},
{ id: 'Fireland4', name: 'Ashmaw Brood', color: ['red', 'black'], difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Red/FlamingDirebeast.png', bannerArt: 'Images/Banner/Badland.png', cardbackArt: 'Images/Cardback/Fireland.png',
  cards: [ { id: 'Ashkar', amount: 1 }, { id: 'KaelyraFirelandHeiress', amount: 1 },
    { id: 'EphorosFirelandBehemoth', amount: 1 },
    { id: 'HenchmanofEphoros', amount: 1 },
    { id: 'FirelandHellmaw', amount: 2 },
    { id: 'FirelandHellhound', amount: 3 },
    { id: 'FirelandDirebeast', amount: 3 },
    { id: 'FirelandKitsune', amount: 3 },
    { id: 'FirelandLynx', amount: 3 }, 
    { id: 'FirelandCindercub', amount: 3 },
    { id: 'FirelandScamperling', amount: 3 },
    { id: 'Volcano', amount: 3 },
]},
{ id: 'Fireland6', name: 'Infernal Apex', color: ['red', 'black'], difficulty: '⭐⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Red/Ephoros.png', bannerArt: 'Images/Banner/Badland.png', cardbackArt: 'Images/Cardback/Fireland.png',
  cards: [ { id: 'Ashkar', amount: 1 }, { id: 'KaelyraFirelandHeiress', amount: 1 },
    { id: 'EphorosFirelandBehemoth', amount: 1 },
    { id: 'HenchmanofEphoros', amount: 1 },
    { id: 'FirelandHellmaw', amount: 2 },
    { id: 'FirelandHellhound', amount: 3 },
    { id: 'FirelandDirebeast', amount: 3 },
    { id: 'FirelandKitsune', amount: 3 },
    { id: 'FirelandLynx', amount: 3 }, 
    { id: 'FirelandCindercub', amount: 3 },
    { id: 'FirelandScamperling', amount: 3 },
    { id: 'Volcano', amount: 3 },
]},
// --- TIDAL DECKS --- //
{ id: 'Tidal1', name: 'Flowing Tides', color: 'blue', difficulty: '⭐',
  image: 'Images/Avatar/Blue/Mermaid.png', bannerArt: 'Images/Banner/Ocean.png', cardbackArt: 'Images/Cardback/Merfolk.png',
  cards: [ { id: 'Marinthae', amount: 1 },
    { id: 'WaterElemental', amount: 3 },
    { id: 'TidecallersPearl', amount: 3 },
    { id: 'EssenceRift', amount: 3 },
    { id: 'Ocean', amount: 3 },
]},
{ id: 'Tidal2', name: 'Relentless Flow', color: 'blue', difficulty: '⭐⭐',
  image: 'Images/Avatar/Blue/Dolphin.png', bannerArt: 'Images/Banner/Ocean.png', cardbackArt: 'Images/Cardback/Merfolk.png',
  cards: [ { id: 'Marinthae', amount: 1 },
    { id: 'WaterElemental', amount: 3 },
    { id: 'TidecallersPearl', amount: 3 },
    { id: 'EssenceRift', amount: 3 },
    { id: 'Ocean', amount: 3 },
]},
{ id: 'Tidal3', name: 'Oceanic Supremacy', color: 'blue', difficulty: '⭐⭐⭐',
  image: 'Images/Avatar/Blue/WavecrashWhale.png', bannerArt: 'Images/Banner/Ocean.png', cardbackArt: 'Images/Cardback/Merfolk.png',
  cards: [ { id: 'Marinthae', amount: 1 },
    { id: 'WaterElemental', amount: 3 },
    { id: 'TidecallersPearl', amount: 3 },
    { id: 'EssenceRift', amount: 3 },
    { id: 'Ocean', amount: 3 },
]},
{ id: 'Tidal4', name: 'Tidebound Will', color: 'blue', difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Blue/UmarionPaladin.png', bannerArt: 'Images/Banner/Umarion.png', cardbackArt: 'Images/Cardback/Merfolk.png',
  cards: [ { id: 'Marinthae', amount: 1 },
    { id: 'WaterElemental', amount: 3 },
    { id: 'TidecallersPearl', amount: 3 },
    { id: 'EssenceRift', amount: 3 },
    { id: 'Ocean', amount: 3 },
]},
{ id: 'Tidal5', name: 'Maelstrom Sovereignty', color: 'blue', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Blue/Serenya.png', bannerArt: 'Images/Banner/Umarion.png', cardbackArt: 'Images/Cardback/Merfolk.png',
  cards: [ { id: 'Marinthae', amount: 1 }, { id: 'SerenyaTideboundEnchantress', amount: 1 },
    { id: 'WaterElemental', amount: 3 },
    { id: 'TidecallersPearl', amount: 3 },
    { id: 'EssenceRift', amount: 3 },
    { id: 'Ocean', amount: 3 },
]},
// --- TEMPEST --- //
{ id: 'Tempest1', name: 'Feather Vanguard', color: 'yellow', difficulty: '⭐',
  image: 'Images/Avatar/Yellow/Birdfolk.png', bannerArt: 'Images/Banner/Peaks.png', cardbackArt: 'Images/Cardback/Stormcore.png',
  cards: [ { id: 'Aetherion', amount: 1 },
    { id: 'StormcoreDynamo', amount: 3 },
    { id: 'EssenceBolt', amount: 3 },
    { id: 'Peaks', amount: 3 },
]},
{ id: 'Tempest2', name: 'Static Pulse', color: 'yellow', difficulty: '⭐⭐',
  image: 'Images/Avatar/Yellow/Thunderspawn.png', bannerArt: 'Images/Banner/Peaks.png', cardbackArt: 'Images/Cardback/Stormcore.png',
  cards: [ { id: 'Aetherion', amount: 1 },
    { id: 'StormcoreDynamo', amount: 3 },
    { id: 'EssenceBolt', amount: 3 },
    { id: 'Peaks', amount: 3 },
]},
{ id: 'Tempest3', name: 'Sky Sovereigns', color: 'yellow', difficulty: '⭐⭐⭐',
  image: 'Images/Avatar/Yellow/GalestrikeRoc.png', bannerArt: 'Images/Banner/Peaks.png', cardbackArt: 'Images/Cardback/Stormcore.png',
  cards: [ { id: 'Aetherion', amount: 1 },
    { id: 'StormcoreDynamo', amount: 3 },
    { id: 'EssenceBolt', amount: 3 },
    { id: 'Peaks', amount: 3 },
]},
{ id: 'Tempest4', name: 'Surgecallers Rite', color: 'yellow', difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Yellow/AetherionElectromancer.png', bannerArt: 'Images/Banner/Aetherion.png', cardbackArt: 'Images/Cardback/Stormcore.png',
  cards: [ { id: 'Aetherion', amount: 1 },
    { id: 'StormcoreDynamo', amount: 3 },
    { id: 'Thunderlash', amount: 3 },
    { id: 'EssenceBolt', amount: 3 },
    { id: 'Peaks', amount: 3 },
]},
{ id: 'Tempest5', name: 'Aethervolt Crash', color: 'yellow', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Yellow/Zyra.png', bannerArt: 'Images/Banner/Aetherion.png', cardbackArt: 'Images/Cardback/Stormcore.png',
  cards: [ { id: 'Aetherion', amount: 1 }, { id: 'ZyraThunderbladeDuelist', amount: 1 },
    { id: 'StormcoreDynamo', amount: 3 },
    { id: 'Thunderlash', amount: 3 },
    { id: 'EssenceBolt', amount: 3 },
    { id: 'Peaks', amount: 3 },
]},
// --- TERRA DECKS --- //
{ id: 'Terra1', name: 'Ironroot Vow', color: 'gray', difficulty: '⭐',
  image: 'Images/Avatar/Gray/RockshellArmadillo.png', bannerArt: 'Images/Banner/Mountain.png', cardbackArt: 'Images/Cardback/Stonebound.png',
  cards: [ { id: 'Drakzul', amount: 1 },
    { id: 'Golemites', amount: 3 },
    { id: 'DesertWolf', amount: 3 },
    { id: 'TitansAnvil', amount: 3 },
    { id: 'EssenceBarrier', amount: 3 },
    { id: 'Mountain', amount: 3 },
]},
{ id: 'Terra2', name: 'Ironroot Vow', color: 'gray', difficulty: '⭐⭐',
  image: 'Images/Avatar/Gray/Orc.png', bannerArt: 'Images/Banner/Mountain.png', cardbackArt: 'Images/Cardback/Stonebound.png',
  cards: [ { id: 'Drakzul', amount: 1 },
    { id: 'Golemites', amount: 3 },
    { id: 'DesertWolf', amount: 3 },
    { id: 'TitansAnvil', amount: 3 },
    { id: 'EssenceBarrier', amount: 3 },
    { id: 'Mountain', amount: 3 },
]},
{ id: 'Terra3', name: 'Ironroot Vow', color: 'gray', difficulty: '⭐⭐⭐',
  image: 'Images/Avatar/Gray/RockmaulRhino.png', bannerArt: 'Images/Banner/Mountain.png', cardbackArt: 'Images/Cardback/Stonebound.png',
  cards: [ { id: 'Drakzul', amount: 1 },
    { id: 'Golemites', amount: 3 },
    { id: 'DesertWolf', amount: 3 },
    { id: 'TitansAnvil', amount: 3 },
    { id: 'EssenceBarrier', amount: 3 },
    { id: 'Mountain', amount: 3 },
]},
{ id: 'Terra4', name: 'Ironroot Vow', color: 'gray', difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Gray/DrakzulWarmonger.png', bannerArt: 'Images/Banner/Drakzul.png', cardbackArt: 'Images/Cardback/Stonebound.png',
  cards: [ { id: 'Drakzul', amount: 1 },
    { id: 'Golemites', amount: 3 },
    { id: 'DesertWolf', amount: 3 },
    { id: 'TitansAnvil', amount: 3 },
    { id: 'EssenceBarrier', amount: 3 },
    { id: 'Mountain', amount: 3 },
]},
{ id: 'Terra5', name: 'Ironroot Vow', color: 'gray', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Gray/Rudgar.png', bannerArt: 'Images/Banner/Drakzul.png', cardbackArt: 'Images/Cardback/Stonebound.png',
  cards: [ { id: 'Drakzul', amount: 1 },
    { id: 'Golemites', amount: 3 },
    { id: 'DesertWolf', amount: 3 },
    { id: 'TitansAnvil', amount: 3 },
    { id: 'EssenceBarrier', amount: 3 },
    { id: 'Mountain', amount: 3 },
]},
// --- CURSED DECKS --- //
{ id: 'Cursed1', name: 'Venom Bloom', color: 'purple', difficulty: '⭐',
  image: 'Images/Avatar/Purple/GiantHornet.png', bannerArt: 'Images/Banner/Swamp.png', cardbackArt: 'Images/Cardback/Goblin.png',
  cards: [ { id: 'Virkul', amount: 1 },
    { id: 'Goblin', amount: 3 },
    { id: 'PlagueThornTalisman', amount: 3 },
    { id: 'ToxicSpores', amount: 3 },
    { id: 'EssenceBreak', amount: 3 },
    { id: 'Swamp', amount: 3 },
]},
{ id: 'Cursed2', name: 'Venom Bloom', color: 'purple', difficulty: '⭐⭐',
  image: 'Images/Avatar/Purple/Goblin.png', bannerArt: 'Images/Banner/Swamp.png', cardbackArt: 'Images/Cardback/Goblin.png',
  cards: [ { id: 'Virkul', amount: 1 },
    { id: 'Goblin', amount: 3 },
    { id: 'PlagueThornTalisman', amount: 3 },
    { id: 'ToxicSpores', amount: 3 },
    { id: 'EssenceBreak', amount: 3 },
    { id: 'Swamp', amount: 3 },
]},
{ id: 'Cursed3', name: 'Venom Bloom', color: 'purple', difficulty: '⭐⭐⭐',
  image: 'Images/Avatar/Purple/DreadcoilViper.png', bannerArt: 'Images/Banner/Swamp.png', cardbackArt: 'Images/Cardback/Goblin.png',
  cards: [ { id: 'Virkul', amount: 1 },
    { id: 'Goblin', amount: 3 },
    { id: 'PlagueThornTalisman', amount: 3 },
    { id: 'ToxicSpores', amount: 3 },
    { id: 'EssenceBreak', amount: 3 },
    { id: 'Swamp', amount: 3 },
]},
{ id: 'Cursed4', name: 'Venom Bloom', color: 'purple', difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Purple/VirkulAssassin.png', bannerArt: 'Images/Banner/Virkul.png', cardbackArt: 'Images/Cardback/Goblin.png',
  cards: [ { id: 'Virkul', amount: 1 },
    { id: 'Goblin', amount: 3 },
    { id: 'PlagueThornTalisman', amount: 3 },
    { id: 'ToxicSpores', amount: 3 },
    { id: 'EssenceBreak', amount: 3 },
    { id: 'Swamp', amount: 3 },
]},
{ id: 'Cursed5', name: 'Venom Bloom', color: 'purple', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Purple/Selgor.png', bannerArt: 'Images/Banner/Virkul.png', cardbackArt: 'Images/Cardback/Goblin.png',
  cards: [ { id: 'Virkul', amount: 1 },
    { id: 'Goblin', amount: 3 },
    { id: 'PlagueThornTalisman', amount: 3 },
    { id: 'ToxicSpores', amount: 3 },
    { id: 'EssenceBreak', amount: 3 },
    { id: 'Swamp', amount: 3 },
]},
// --- RADIANT DECKS --- //
{ id: 'Radiant1', name: 'Celestial Light', color: 'white', difficulty: '⭐',
  image: 'Images/Avatar/White/Angel.png', bannerArt: 'Images/Banner/Plains.png', cardbackArt: 'Images/Cardback/Radiant.png',
  cards: [ { id: 'Solmara', amount: 1 },
    { id: 'ElementalofLusters', amount: 2 },
    { id: 'AngelicWarrior', amount: 3 },
    { id: 'Angel', amount: 3 },
    { id: 'Valkyrie', amount: 3 },
    { id: 'LumenSpire', amount: 3 },
    { id: 'EssenceBlessing', amount: 3 },
    { id: 'Plains', amount: 3 },
]},
{ id: 'Radiant2', name: 'Radiant Oath', color: 'white', difficulty: '⭐⭐',
  image: 'Images/Avatar/White/Valkyrie.png', bannerArt: 'Images/Banner/Plains.png', cardbackArt: 'Images/Cardback/Radiant.png',
  cards: [ { id: 'Solmara', amount: 1 },
    { id: 'ElementalofLusters', amount: 2 },
    { id: 'AngelicWarrior', amount: 3 },
    { id: 'Angel', amount: 3 },
    { id: 'Valkyrie', amount: 3 },
    { id: 'LumenSpire', amount: 3 },
    { id: 'EssenceBlessing', amount: 3 },
    { id: 'Plains', amount: 3 },
]},
{ id: 'Radiant3', name: 'Sacred Charge', color: 'white', difficulty: '⭐⭐⭐',
  image: 'Images/Avatar/White/SkylionExemplar.png', bannerArt: 'Images/Banner/Plains.png', cardbackArt: 'Images/Cardback/Radiant.png',
  cards: [ { id: 'Solmara', amount: 1 },
    { id: 'ElementalofLusters', amount: 2 }, { id: 'SkylionExemplar', amount: 2 },
    { id: 'AngelicWarrior', amount: 3 },
    { id: 'Angel', amount: 3 },
    { id: 'Valkyrie', amount: 3 },
    { id: 'LumenSpire', amount: 3 },
    { id: 'EssenceBlessing', amount: 3 },
    { id: 'Plains', amount: 3 },
]},
{ id: 'Radiant4', name: 'Sanctified Authority', color: 'white', difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/White/SolmaraArchpriest.png', bannerArt: 'Images/Banner/Solmara.png', cardbackArt: 'Images/Cardback/Radiant.png',
  cards: [ { id: 'Solmara', amount: 1 },
    { id: 'ElementalofLusters', amount: 2 },
    { id: 'AngelicWarrior', amount: 3 },
    { id: 'Angel', amount: 3 },
    { id: 'Valkyrie', amount: 3 },
    { id: 'LumenSpire', amount: 3 },
    { id: 'EssenceBlessing', amount: 3 },
    { id: 'Plains', amount: 3 },
]},
{ id: 'Radiant5', name: 'Radiant Oath', color: 'white', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/White/Elyndra.png', bannerArt: 'Images/Banner/Solmara.png', cardbackArt: 'Images/Cardback/Radiant.png',
  cards: [ { id: 'Solmara', amount: 1 }, { id: 'ElyndraDawnbladeofHeavens', amount: 1 },
    { id: 'ElementalofLusters', amount: 2 },
    { id: 'AngelicWarrior', amount: 3 },
    { id: 'Angel', amount: 3 },
    { id: 'Valkyrie', amount: 3 },
    { id: 'LumenSpire', amount: 3 },
    { id: 'EssenceBlessing', amount: 3 },
    { id: 'Plains', amount: 3 },
]},
// --- UMBRAL DECKS --- //
{ id: 'Umbral1', name: 'Whispered Midnight', color: 'black', difficulty: '⭐',
  image: 'Images/Avatar/Black/Wolf.png', bannerArt: 'Images/Banner/Shadowland.png', cardbackArt: 'Images/Cardback/Umbral.png',
  cards: [ { id: 'Nocthyra', amount: 1 },
    { id: 'Wolf', amount: 3 },
    { id: 'NoctyraEnforcer', amount: 2 },
    { id: 'GraveweaverWarlock', amount: 2 },
    { id: 'UmbrawindHollow', amount: 2 },
    { id: 'Bat', amount: 3 }, { id: 'Ghost', amount: 3 }, { id: 'Skeleton', amount: 3 },
    { id: 'Zombie', amount: 3 },
    { id: 'ShadowLeech', amount: 3 },
    { id: 'EssencePurge', amount: 3 },
    { id: 'Shadowland', amount: 3 },
]},
{ id: 'Umbral2', name: 'Grave Stirring', color: 'black', difficulty: '⭐⭐',
  image: 'Images/Avatar/Black/Zombie.png', bannerArt: 'Images/Banner/Shadowland.png', cardbackArt: 'Images/Cardback/Umbral.png',
  cards: [ { id: 'Nocthyra', amount: 1 },
    { id: 'Wolf', amount: 3 },
    { id: 'NoctyraEnforcer', amount: 2 },
    { id: 'GraveweaverWarlock', amount: 2 },
    { id: 'UmbrawindHollow', amount: 2 },
    { id: 'Bat', amount: 3 }, { id: 'Ghost', amount: 3 }, { id: 'Skeleton', amount: 3 },
    { id: 'Zombie', amount: 3 },
    { id: 'ShadowLeech', amount: 3 },
    { id: 'EssencePurge', amount: 3 },
    { id: 'Shadowland', amount: 3 },
]},
{ id: 'Umbral3', name: 'Necrotic Supremacy', color: 'black', difficulty: '⭐⭐⭐',
  image: 'Images/Avatar/Black/GraveweaverWarlock.png', bannerArt: 'Images/Banner/Shadowland.png', cardbackArt: 'Images/Cardback/Umbral.png',
  cards: [ { id: 'Nocthyra', amount: 1 },
    { id: 'Wolf', amount: 3 },
    { id: 'NoctyraEnforcer', amount: 2 },
    { id: 'GraveweaverWarlock', amount: 2 },
    { id: 'UmbrawindHollow', amount: 2 },
    { id: 'Bat', amount: 3 }, { id: 'Ghost', amount: 3 }, { id: 'Skeleton', amount: 3 },
    { id: 'Zombie', amount: 3 },
    { id: 'ShadowLeech', amount: 3 },
    { id: 'EssencePurge', amount: 3 },
    { id: 'Shadowland', amount: 3 },
]},
{ id: 'Umbral4', name: 'Shadowy Descent', color: 'black', difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Black/NoctyraEnforcer.png', bannerArt: 'Images/Banner/Noctyra.png', cardbackArt: 'Images/Cardback/Umbral.png',
  cards: [ { id: 'Nocthyra', amount: 1 },
    { id: 'Wolf', amount: 3 },
    { id: 'NoctyraEnforcer', amount: 2 },
    { id: 'GraveweaverWarlock', amount: 2 },
    { id: 'UmbrawindHollow', amount: 2 },
    { id: 'Bat', amount: 3 }, { id: 'Ghost', amount: 3 }, { id: 'Skeleton', amount: 3 },
    { id: 'Zombie', amount: 3 },
    { id: 'ShadowLeech', amount: 3 },
    { id: 'EssencePurge', amount: 3 },
    { id: 'Shadowland', amount: 3 },
]},
{ id: 'Umbral5', name: 'Umbral Stillness', color: 'black', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Black/Velmira.png', bannerArt: 'Images/Banner/Noctyra.png', cardbackArt: 'Images/Cardback/Umbral.png',
  cards: [ { id: 'Nocthyra', amount: 1 }, { id: 'VelmiraMistressofSilence', amount: 1 }, { id: 'UmbralNova', amount: 1 },
    { id: 'NoctyraEnforcer', amount: 2 },
    { id: 'GraveweaverWarlock', amount: 2 },
    { id: 'UmbrawindHollow', amount: 2 },
    { id: 'Wolf', amount: 3 },
    { id: 'Bat', amount: 3 }, { id: 'Ghost', amount: 3 }, { id: 'Skeleton', amount: 3 },
    { id: 'Zombie', amount: 3 },
    { id: 'ShadowLeech', amount: 3 },
    { id: 'EssencePurge', amount: 3 },
    { id: 'Shadowland', amount: 3 },
]},
// -------------- //  
// --- TIER 2 --- //
// -------------- //
{ id: 'Elf1', name: 'Verdant Might', color: 'green', difficulty: '⭐',
  image: 'Images/Avatar/Green/Fairy.png', bannerArt: 'Images/Banner/Forest.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'SylvaniaThornvaleQueen', amount: 1 },
    { id: 'SylvanElf', amount: 3 },      
    { id: 'ForestFairy', amount: 3 },
    { id: 'FairyWarrior', amount: 3 },
    { id: 'ForestGoblin', amount: 3 },
    { id: 'ElementalofLeaves', amount: 3 },
    { id: 'ForestMage', amount: 3 },
    { id: 'ForestWarrior', amount: 3 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'LifeGrowth', amount: 2 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'SylvanCanopy', amount: 3 }, { id: 'Forest', amount: 3 },
]},
// --- FAIRY DECKS --- //
{ id: 'Fairy1', name: 'Everbloom Harmony', color: 'green', difficulty: '⭐',
  image: 'Images/Avatar/Green/Fairy.png', bannerArt: 'Images/Banner/Forest.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'SylvaniaThornvaleQueen', amount: 1 },      
    { id: 'ForestFairy', amount: 3 }, { id: 'FairyWarrior', amount: 3 }, { id: 'ForestGoblin', amount: 3 },
    { id: 'FairyDrakeling', amount: 3 }, { id: 'WyrmofThornsandSunfire', amount: 2 }, { id: 'FairyAmphitere', amount: 1 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'FairyFountain', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Fairy2', name: 'Everbloom Harmony', color: ['green', 'white'], difficulty: '⭐⭐',
  image: 'Images/Avatar/Green/Fairy.png', bannerArt: 'Images/Banner/Forest.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'SylvaniaThornvaleQueen', amount: 1 },      
    { id: 'ForestFairy', amount: 3 }, { id: 'FairyWarrior', amount: 3 }, { id: 'ForestGoblin', amount: 3 },
    { id: 'FairyDrakeling', amount: 3 }, { id: 'WyrmofThornsandSunfire', amount: 2 }, { id: 'FairyAmphitere', amount: 1 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'FairyFountain', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Fairy3', name: 'Everbloom Harmony', color: ['green', 'white'], difficulty: '⭐⭐',
  image: 'Images/Avatar/Green/FairyWarrior.png', bannerArt: 'Images/Banner/Forest.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'SylvaniaThornEmpress', amount: 1 },      
    { id: 'ForestFairy', amount: 3 },
    { id: 'FairyWarrior', amount: 3 },
    { id: 'ForestGoblin', amount: 3 },
    { id: 'FairyDrakeling', amount: 3 },
    { id: 'WyrmofThornsandSunfire', amount: 2 },
    { id: 'FairyAmphitere', amount: 1 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'LifeGrowth', amount: 3 },
    { id: 'VerdantRebirth', amount: 3 },
    { id: 'EssenceSurge', amount: 3 }, { id: 'FairyFountain', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Fairy5', name: 'Everbloom Harmony', color: ['green', 'white'], difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Green/Fairy.png', bannerArt: 'Images/Banner/Verdara.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 }, { id: 'SylvaniaThornEmpress', amount: 1 },      
    { id: 'ForestFairy', amount: 3 }, { id: 'FairyWarrior', amount: 3 },
    { id: 'ForestGoblin', amount: 3 },
    { id: 'FairyDrakeling', amount: 3 },
    { id: 'WyrmofThornsandSunfire', amount: 2 },
    { id: 'FairyAmphitere', amount: 1 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'LifeGrowth', amount: 2 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'FairyFountain', amount: 3 }, { id: 'Forest', amount: 3 },
]},
// --- ARBOR DECKS --- //
{ id: 'Arbor2', name: 'Oakhaven Awakening', color: ['green', 'black'], difficulty: '⭐⭐',
  image: 'Images/Avatar/Green/TreantWitch.png', bannerArt: 'Images/Banner/Forest.png', cardbackArt: 'Images/Cardback/Arbor.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'SylvaniaThornEmpress', amount: 1 },      
    { id: 'TreantWitch', amount: 2 },
    { id: 'TreantOakwarden', amount: 3 },
    { id: 'TreantGrovesent', amount: 3 },
    { id: 'TreantElderbark', amount: 3 },
    { id: 'WyrmofThornsandSunfire', amount: 2 },
    { id: 'Treant', amount: 3 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'ArborCommunion', amount: 3 },
    { id: 'GlimbarkFrontier', amount: 3 }, { id: 'Forest', amount: 3 },
]},

// -------------- //  
// --- TIER 3 --- //
// -------------- //

{ id: 'Thornwing3', name: 'Wyrms of the Wildroot', color: 'green', difficulty: '⭐⭐',
  image: 'Images/Avatar/Green/VerdantSerpent.png', bannerArt: 'Images/Banner/Forest.png', cardbackArt: 'Images/Cardback/Thornwing.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'SylvaniaThornEmpress', amount: 1 },      
    { id: 'VerdarokSylvanWarden', amount: 1 },
    { id: 'FairyWarrior', amount: 3 },
    { id: 'ForestGoblin', amount: 3 },
    { id: 'FairyDrakeling', amount: 3 }, { id: 'WyrmofThornsandSunfire', amount: 2 }, { id: 'FairyAmphitere', amount: 1 },
    { id: 'HeartwoodRelic', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'FairyFountain', amount: 3 }, { id: 'Forest', amount: 3 },
]},
{ id: 'Thornwing5', name: 'Scales of Protection', color: 'green', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Green/Verdarok.png', bannerArt: 'Images/Banner/Verdara.png', cardbackArt: 'Images/Cardback/Thornwing.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'SylvaniaThornEmpress', amount: 1 },      
    { id: 'VerdarokSylvanWarden', amount: 1 }, { id: 'VerdarokMossletFlutterwing', amount: 1 },
    { id: 'ForestGoblin', amount: 3 },
    { id: 'FairyDrakeling', amount: 3 },
    { id: 'WyrmofThornsandSunfire', amount: 2 },
    { id: 'FairyAmphitere', amount: 1 },
    { id: 'HardenedScales', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'DragonsGrove', amount: 2 }, { id: 'Forest', amount: 3 },
]},
// --- CINDERCORE DECKS --- //
{ id: 'Cindercore2', name: 'Emberforged Legion', color: 'red', difficulty: '⭐⭐',
    image: 'Images/Avatar/Red/CinderScout.png', bannerArt: 'Images/Banner/Volcano.png', cardbackArt: 'Images/Cardback/Cindercore.png',
    cards: [ { id: 'Ashkar', amount: 1 },
    { id: 'IgnavarynCindercoreAutomaton', amount: 3 },
    { id: 'CinderScout', amount: 3 },
    { id: 'CindercoreSentry', amount: 3 },
    { id: 'CindercoreProtector', amount: 3 },
    { id: 'CindercoreVanguard', amount: 3 },
    { id: 'CindercoreGolem', amount: 3 },
    { id: 'CindercoreEmber', amount: 3 }, 
    { id: 'CindercoreForgehold', amount: 2 },
    { id: 'Volcano', amount: 3 },
]},
{ id: 'Cindercore3', name: 'Blazewrought Core', color: 'red', difficulty: '⭐⭐⭐',
  image: 'Images/Avatar/Red/CindercoreSentry.png', bannerArt: 'Images/Banner/Volcano.png', cardbackArt: 'Images/Cardback/Cindercore.png',
  cards: [ { id: 'Ashkar', amount: 1 },
    { id: 'IgnavarynCindercoreAutomaton', amount: 3 },
    { id: 'CinderScout', amount: 3 },
    { id: 'CindercoreSentry', amount: 3 },
    { id: 'CindercoreProtector', amount: 3 },
    { id: 'CindercoreVanguard', amount: 3 },
    { id: 'CindercoreGolem', amount: 3 },
    { id: 'CindercoreEmber', amount: 3 }, 
    { id: 'CindercoreForgehold', amount: 2 },
    { id: 'Volcano', amount: 3 },
]},
{ id: 'Cindercore4', name: 'Pyreforge Ascendancy', color: 'red', difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Red/CindercoreProtector.png', bannerArt: 'Images/Banner/Magmaris.png', cardbackArt: 'Images/Cardback/Cindercore.png',
  cards: [ { id: 'Ashkar', amount: 1 },
    { id: 'IgnavarynCindercoreAutomaton', amount: 1 },
    { id: 'CinderScout', amount: 3 },
    { id: 'CindercoreSentry', amount: 3 },
    { id: 'CindercoreProtector', amount: 3 },
    { id: 'CindercoreVanguard', amount: 3 },
    { id: 'CindercoreGolem', amount: 3 },
    { id: 'CindercoreEmber', amount: 3 }, 
    { id: 'CindercoreForgehold', amount: 2 },
    { id: 'Volcano', amount: 3 },
]},
{ id: 'Cindercore5', name: 'Infernal Crucible', color: 'red', difficulty: '⭐⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Red/Ignavaryn.png', bannerArt: 'Images/Banner/Magmaris.png', cardbackArt: 'Images/Cardback/Cindercore.png',
  cards: [ { id: 'Ashkar', amount: 1 },
    { id: 'IgnavarynCindercoreAutomaton', amount: 1 },
    { id: 'CinderScout', amount: 3 },
    { id: 'CindercoreSentry', amount: 3 },
    { id: 'CindercoreProtector', amount: 3 },
    { id: 'CindercoreVanguard', amount: 3 },
    { id: 'CindercoreGolem', amount: 3 },
    { id: 'CindercoreEmber', amount: 3 }, 
    { id: 'CindercoreForgehold', amount: 2 },
    { id: 'Volcano', amount: 3 },
]},

// --- CORALBOUND DECKS --- //
{ id: 'Coralbound2', name: 'Depthforge Awakening', color: 'blue', difficulty: '⭐⭐',
  image: 'Images/Avatar/Blue/CoralDrone.png', bannerArt: 'Images/Banner/Ocean.png', cardbackArt: 'Images/Cardback/Coralbound.png',
  cards: [ { id: 'Marinthae', amount: 1 },
  { id: 'MaelvyrnCoralboundAutomaton', amount: 3 },
  { id: 'CoralDrone', amount: 3 },
  { id: 'CoralboundSentry', amount: 3 },
  { id: 'HydrosurgeProtocol', amount: 3 },
  { id: 'CoralboundVanguard', amount: 3 },
  { id: 'TidecallersPearl', amount: 3 },
  { id: 'EssenceRift', amount: 3 },
  { id: 'Ocean', amount: 3 },
]},
{ id: 'Coralbound4', name: 'Tidewrought Vanguard', color: 'blue', difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Blue/CoralboundProtector.png', bannerArt: 'Images/Banner/Umarion.png', cardbackArt: 'Images/Cardback/Coralbound.png',
  cards: [ { id: 'Marinthae', amount: 1 },
    { id: 'MaelvyrnCoralboundAutomaton', amount: 3 },
    { id: 'CoralboundVanguard', amount: 3 },
    { id: 'CoralboundSentry', amount: 3 },
    { id: 'CoralDrone', amount: 3 },
    { id: 'TidecallersPearl', amount: 3 },
    { id: 'HydrosurgeProtocol', amount: 3 },
    { id: 'EssenceRift', amount: 3 },
    { id: 'Ocean', amount: 3 },
]},
{ id: 'Coralbound6', name: 'Coralheart Bastion', color: 'blue', difficulty: '⭐⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Blue/Maelvyrn.png', bannerArt: 'Images/Banner/Umarion.png', cardbackArt: 'Images/Cardback/Coralbound.png',
  cards: [ { id: 'Marinthae', amount: 1 },
    { id: 'MaelvyrnCoralboundAutomaton', amount: 1 },
    { id: 'CoralboundVanguard', amount: 3 },
    { id: 'CoralboundSentry', amount: 3 },
    { id: 'CoralDrone', amount: 3 },
    { id: 'TidecallersPearl', amount: 3 },
    { id: 'HydrosurgeProtocol', amount: 3 },
    { id: 'EssenceRift', amount: 3 },
    { id: 'Ocean', amount: 3 },
]},

// --- GOLEM DECKS --- //
{ id: 'Golem2', name: 'Pebble Sentinels', color: ['red','gray'], difficulty: '⭐⭐',
  image: 'Images/Avatar/Red/FireGolem.png', bannerArt: 'Images/Banner/Volcano.png', cardbackArt: 'Images/Cardback/Golem.png',
  cards: [ { id: 'Ashkar', amount: 1 },
    { id: 'SmolderingGolemheart', amount: 2 },
    { id: 'GolemheartSentinel', amount: 3 },
    { id: 'GolemheartGiant', amount: 3 },
    { id: 'Golemites', amount: 3 },
    { id: 'FireGolem', amount: 3 },
    { id: 'GolemheartInfusor', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'EssenceAssault', amount: 3 }, { id: 'EssenceBarrier', amount: 3 },
    { id: 'Volcano', amount: 3 }, { id: 'Mountain', amount: 3 },
]},
{ id: 'Golem4', name: 'Flameforge Guardians', color: ['red','gray'], difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Red/GolemheartSentinel.png', bannerArt: 'Images/Banner/RedBanner.png', cardbackArt: 'Images/Cardback/Golem.png',
  cards: [ { id: 'Ashkar', amount: 1 },
    { id: 'SmolderingGolemheart', amount: 2 },
    { id: 'GolemheartSentinel', amount: 3 },
    { id: 'GolemheartGiant', amount: 3 },
    { id: 'Golemites', amount: 3 },
    { id: 'FireGolem', amount: 3 },
    { id: 'GolemheartInfusor', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'EssenceAssault', amount: 3 }, { id: 'EssenceBarrier', amount: 3 },
    { id: 'Volcano', amount: 3 }, { id: 'Mountain', amount: 3 },
]},
{ id: 'Golem5', name: 'Pyrestone Giants', color: ['red','gray'], difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Red/Pyrokrag.png', bannerArt: 'Images/Banner/RedBanner.png', cardbackArt: 'Images/Cardback/Golem.png',
  cards: [ { id: 'Ashkar', amount: 1 },
    { id: 'PyrokragGolemheartTitan', amount: 1 },
    { id: 'SmolderingGolemheart', amount: 2 },
    { id: 'GolemheartSentinel', amount: 3 },
    { id: 'GolemheartGiant', amount: 3 },
    { id: 'Golemites', amount: 3 },
    { id: 'FireGolem', amount: 3 },
    { id: 'GolemheartInfusor', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'EssenceAssault', amount: 3 }, { id: 'EssenceBarrier', amount: 3 },
    { id: 'Volcano', amount: 3 }, { id: 'Mountain', amount: 3 },
]},
{ id: 'Golem6', name: 'Forgebound Titans', color: ['red','gray'], difficulty: '⭐⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Gray/Kaelgorran.png', bannerArt: 'Images/Banner/RedBanner.png', cardbackArt: 'Images/Cardback/Golem.png',
  cards: [ { id: 'Ashkar', amount: 1 },
    { id: 'KaelgorranElementalPrimordial', amount: 1 },
    { id: 'SmolderingGolemheart', amount: 2 },
    { id: 'GolemheartSentinel', amount: 2 },
    { id: 'GolemheartGiant', amount: 2 },
    { id: 'Golemites', amount: 3 },
    { id: 'FireGolem', amount: 3 },
    { id: 'GolemheartInfusor', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'EssenceAssault', amount: 3 }, { id: 'EssenceBarrier', amount: 3 },
    { id: 'Volcano', amount: 3 }, { id: 'Mountain', amount: 3 },
]},

// --- FROSTLAND DECKS --- //
{ id: 'Frostland2', name: 'Shard of Winter', color: ['blue', 'gray'], difficulty: '⭐⭐',
  image: 'Images/Avatar/FrostlandWyrm.png', bannerArt: 'Images/Banner/Ocean.png', cardbackArt: 'Images/Cardback/Frostland.png',
  cards: [ { id: 'Marinthae', amount: 1 },
    { id: 'EirawenFrostlandQueen', amount: 1 },      
    { id: 'FrostlandRuneforgedColossus', amount: 1 }, { id: 'FrostlandDragon', amount: 1 },
    { id: 'FrostlandRuneforgedAutomaton', amount: 3 },
    { id: 'FrostlandGolem', amount: 3 },
    { id: 'FrostlandPhoenix', amount: 2 },
    { id: 'FrostlandWyrm', amount: 1 },
    { id: 'HardenedScales', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'FrostlandCitadel', amount: 2 }, { id: 'GlacialReef', amount: 3 },
]},
{ id: 'Frostland4', name: 'Frostbound Vanguard', color: ['blue', 'gray'], difficulty: '⭐⭐⭐⭐',
  image: 'Images/Avatar/Eirawen.png', bannerArt: 'Images/Banner/Umarion.png', cardbackArt: 'Images/Cardback/Frostland.png',
  cards: [ { id: 'Marinthae', amount: 1 },
    { id: 'EirawenFrostlandQueen', amount: 1 },      
    { id: 'FrostlandRuneforgedColossus', amount: 1 }, { id: 'FrostlandDragon', amount: 1 },
    { id: 'FrostlandRuneforgedAutomaton', amount: 3 },
    { id: 'FrostlandGolem', amount: 3 },
    { id: 'FrostlandPhoenix', amount: 2 },
    { id: 'FrostlandWyrm', amount: 1 },
    { id: 'HardenedScales', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'FrostlandCitadel', amount: 2 }, { id: 'GlacialReef', amount: 3 },
]},
{ id: 'Frostland6', name: 'Eternal Glacier', color: ['blue', 'gray'], difficulty: '⭐⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/FrostlandRuneforgedColossus.png', bannerArt: 'Images/Banner/Umarion.png', cardbackArt: 'Images/Cardback/Frostland.png',
  cards: [ { id: 'Marinthae', amount: 1 },
    { id: 'EirawenFrostlandQueen', amount: 1 },      
    { id: 'FrostlandRuneforgedColossus', amount: 1 }, { id: 'FrostlandDragon', amount: 1 },
    { id: 'FrostlandRuneforgedAutomaton', amount: 3 },
    { id: 'FrostlandGolem', amount: 3 },
    { id: 'FrostlandPhoenix', amount: 2 },
    { id: 'FrostlandWyrm', amount: 1 },
    { id: 'HardenedScales', amount: 3 },
    { id: 'LifeGrowth', amount: 3 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'FrostlandCitadel', amount: 2 }, { id: 'GlacialReef', amount: 3 },
]},

// --- SKULLFRAME DECKS --- //
{ id: 'Skullframe1', name: 'Bone Servants', color: 'black', difficulty: '⭐',
  image: 'Images/Avatar/Black/Skeleton.png', bannerArt: 'Images/Banner/Graveyard.png', cardbackArt: 'Images/Cardback/Skullframe.png',
  cards: [ { id: 'Noctyra', amount: 1 },      
    { id: 'SkullframeHexmistress', amount: 2 },
    { id: 'SkullframeCryptwinds', amount: 3 },
    { id: 'SkullframeAcolyte', amount: 3 },
    { id: 'SkullframeUnyielding', amount: 3 },
    { id: 'SkullframeDefector', amount: 3 },
    { id: 'Skeleton', amount: 3 },
    { id: 'Soulhexing', amount: 3 }, { id: 'Witherwake', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'Boneyard', amount: 3 }, { id: 'Shadowland', amount: 3 },
]},
{ id: 'Skullframe2', name: 'Grave Sentinels', color: ['black', 'purple'], difficulty: '⭐⭐',
  image: 'Images/Avatar/Black/UnyieldingSoul.png', bannerArt: 'Images/Banner/Graveyard.png', cardbackArt: 'Images/Cardback/Skullframe.png',
  cards: [ { id: 'Noctyra', amount: 1 },      
    { id: 'SkullframeHexmistress', amount: 2 }, { id: 'SkullframeSpectralDragon', amount: 2 },
    { id: 'SkullframeArmoredDragon', amount: 3 },
    { id: 'SkullframeCryptwinds', amount: 3 },
    { id: 'SkullframeAcolyte', amount: 3 },
    { id: 'SkullframeUnyielding', amount: 3 },
    { id: 'SkullframeDefector', amount: 3 },
    { id: 'Skeleton', amount: 3 },
    { id: 'Soulhexing', amount: 3 }, { id: 'Witherwake', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'Boneyard', amount: 3 }, { id: 'Shadowland', amount: 3 },
]},
{ id: 'Skullframe4', name: 'Grave Lords', color: ['black', 'purple'], difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Black/SkullframeHexmistress.png', bannerArt: 'Images/Banner/Graveyard.png', cardbackArt: 'Images/Cardback/Skullframe.png',
  cards: [ { id: 'Noctyra', amount: 1 }, { id: 'MaldryssSkullframeArchmage', amount: 1 },      
    { id: 'SkullframeHexmistress', amount: 2 }, { id: 'SkullframeSpectralDragon', amount: 2 },
    { id: 'SkullframeArmoredDragon', amount: 3 },
    { id: 'SkullframeCryptwinds', amount: 3 },
    { id: 'SkullframeAcolyte', amount: 3 },
    { id: 'SkullframeUnyielding', amount: 3 },
    { id: 'SkullframeDefector', amount: 3 },
    { id: 'Skeleton', amount: 3 },
    { id: 'Soulhexing', amount: 3 }, { id: 'Witherwake', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'Boneyard', amount: 3 }, { id: 'Shadowland', amount: 3 },
]},
{ id: 'Skullframe5', name: 'Undead Rulers', color: ['black', 'purple'], difficulty: '⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Black/Maldryss.png', bannerArt: 'Images/Banner/Graveyard.png', cardbackArt: 'Images/Cardback/Skullframe.png',
  cards: [ { id: 'Noctyra', amount: 1 }, { id: 'MaldryssSkullframeArchmage', amount: 1 },      
    { id: 'SkullframeHexmistress', amount: 2 }, { id: 'SkullframeSpectralDragon', amount: 2 },
    { id: 'SkullframeArmoredDragon', amount: 3 },
    { id: 'SkullframeCryptwinds', amount: 3 },
    { id: 'SkullframeAcolyte', amount: 3 },
    { id: 'SkullframeUnyielding', amount: 3 },
    { id: 'SkullframeDefector', amount: 3 },
    { id: 'Skeleton', amount: 3 },
    { id: 'Soulhexing', amount: 3 }, { id: 'Witherwake', amount: 3 }, { id: 'EssencePurge', amount: 3 },
    { id: 'Boneyard', amount: 3 }, { id: 'Shadowland', amount: 3 },
]},

// --- GLIMMERSCALE DECKS --- //
{ id: 'Glimmerscale6', name: 'Draconic Concord', color: 'green', difficulty: '⭐⭐⭐⭐⭐⭐',
  image: 'Images/Avatar/Mythandriel.png', bannerArt: 'Images/Banner/Verdara.png', cardbackArt: 'Images/Cardback/Fairy.png',
  cards: [ { id: 'Verdara', amount: 1 },
    { id: 'SylvaniaThornEmpress', amount: 1 },      
    { id: 'VerdarokSylvanThornwing', amount: 1 }, { id: 'VerdarokMossletFlutterwing', amount: 1 },
    { id: 'ForestGoblin', amount: 3 },
    { id: 'FairyDrakeling', amount: 3 },
    { id: 'WyrmofThornsandSunfire', amount: 2 },
    { id: 'FairyAmphitere', amount: 1 },
    { id: 'HardenedScales', amount: 3 },
    { id: 'LifeGrowth', amount: 2 }, { id: 'VerdantRebirth', amount: 3 }, { id: 'EssenceSurge', amount: 3 },
    { id: 'DragonsGrove', amount: 2 }, { id: 'Forest', amount: 3 },
]},



  // ...repeat for other colors
];
// --- Helper: resolve simple color tokens to CSS colors (extend mapping as needed) ---
const NAMED_COLOR_MAP = {
  green: '#2aa64f',
  red: '#e74c3c',
  blue: '#2e9afe',
  yellow: '#ffd24d',
  gray: '#9aa0a6',
  purple: '#b36be4',
  white: '#fff8e6',
  black: '#222'
};
function resolveColorToken(token) {
  if (!token) return '#ffe066';
  if (typeof token !== 'string') return '#ffe066';
  const t = token.toLowerCase();
  return NAMED_COLOR_MAP[t] || token; // if it's already a hex or css value, return it
}
// Convert a hex color like "#aabbcc" to {r,g,b}
function hexToRgb(hex) {
  if (!hex) return null;
  let h = String(hex).trim();
  if (h[0] === '#') h = h.slice(1);
  if (h.length === 3) {
    h = h.split('').map(ch => ch + ch).join('');
  }
  if (h.length !== 6) return null;
  const num = parseInt(h, 16);
  if (isNaN(num)) return null;
  return { r: (num >> 16) & 0xff, g: (num >> 8) & 0xff, b: num & 0xff };
}
function rgbToHex({ r, g, b }) {
  const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + ((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b)).toString(16).slice(1);
}

// Given an array of color tokens (e.g. ["green","red"]) returns a blended hex color.
// Uses resolveColorToken to map named tokens to hex when possible; if resolveColorToken returns a non-hex, it will be ignored.
function getCombinedColor(colorInput) {
  if (!colorInput) return '#ffe066';
  const colors = Array.isArray(colorInput) ? colorInput : [colorInput];
  const rgbs = [];
  for (const c of colors) {
    let resolved = resolveColorToken(c);
    if (!resolved) continue;
    // If resolveColorToken returned a CSS color keyword (not hex), try to normalize common keywords to hex via NAMED_COLOR_MAP
    if (typeof resolved === 'string' && !resolved.startsWith('#')) {
      const lower = resolved.toLowerCase();
      if (NAMED_COLOR_MAP[lower]) resolved = NAMED_COLOR_MAP[lower];
    }
    const rgb = hexToRgb(resolved);
    if (rgb) rgbs.push(rgb);
  }
  if (rgbs.length === 0) {
    // last resort: attempt to average NAMED_COLOR_MAP values for tokens
    const fallback = colors.map(c => NAMED_COLOR_MAP[String(c).toLowerCase()]).filter(Boolean).map(hexToRgb);
    if (fallback.length === 0) return '#ffe066';
    const avg = fallback.reduce((acc, v) => ({ r: acc.r + v.r, g: acc.g + v.g, b: acc.b + v.b }), { r: 0, g: 0, b: 0 });
    avg.r /= fallback.length; avg.g /= fallback.length; avg.b /= fallback.length;
    return rgbToHex(avg);
  }
  // Average components
  const summed = rgbs.reduce((acc, v) => ({ r: acc.r + v.r, g: acc.g + v.g, b: acc.b + v.b }), { r: 0, g: 0, b: 0 });
  const avg = { r: summed.r / rgbs.length, g: summed.g / rgbs.length, b: summed.b / rgbs.length };
  return rgbToHex(avg);
}
// Escape HTML to avoid injection in inserted overlays
function escapeHtml(s) {
  if (s === undefined || s === null) return '';
  return String(s).replace(/[&<>"']/g, function (m) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];
  });
}

// --- Helper: generate deck name overlay HTML (single color OR two-color split) ---
// For two colors we render:
//  - two background halves (left/right) with the two colors
//  - two identical text elements clipped to left and right halves so letters appear half-colored
// --- Helper: generate deck name overlay HTML (single color OR mix) ---
function getDeckNameOverlayHtml(deck) {
  const name = escapeHtml(deck && deck.name ? deck.name : '');
  const color = deck && deck.color ? deck.color : null;

  // If multiple colors specified, compute a single combined color and use it
  if (Array.isArray(color) && color.length >= 1) {
    const combined = getCombinedColor(color);
    return `<div class="deck-name" style="position:absolute;bottom:0;width:100%;background:rgba(10,12,20,0.84);color:${combined};letter-spacing:0.5px;padding:6px 0;z-index:2;text-align:center;font-weight:bold;">${name}</div>`;
  }

  // Single color — keep the existing style
  const c = Array.isArray(color) ? resolveColorToken(color[0]) : resolveColorToken(color);
  const safeColor = c || '#ffe066';
  return `<div class="deck-name" style="position:absolute;bottom:0;width:100%;background:rgba(10,12,20,0.84);color:${safeColor};letter-spacing:0.5px;padding:6px 0;z-index:2;text-align:center;font-weight:bold;">${name}</div>`;
}
// Handle mode selection
function showCpuDeckModal() {
  const modal = document.getElementById('cpu-deck-modal');
  const list = document.getElementById('cpu-deck-list');
  list.innerHTML = '';

  // Difficulty options
  const difficultyOptions = [
    { label: "Easy", value: "⭐" },
    { label: "Medium", value: "⭐⭐" },
    { label: "Hard", value: "⭐⭐⭐" },
    { label: "Veteran", value: "⭐⭐⭐⭐" },
    { label: "Master", value: "⭐⭐⭐⭐⭐" },
    { label: "Legendary", value: "⭐⭐⭐⭐⭐⭐" },
  ];
  let selectedDifficulty = difficultyOptions[0].value;

  // Create difficulty selector row
  let diffRow = document.createElement('div');
  diffRow.className = 'cpu-difficulty-row';
  diffRow.style.display = 'flex';
  diffRow.style.justifyContent = 'center';
  diffRow.style.gap = '16px';
  diffRow.style.margin = '18px 0 10px 0';

  difficultyOptions.forEach(opt => {
    let btn = document.createElement('button');
    btn.textContent = opt.label;
    btn.className = 'cpu-difficulty-btn';
    btn.style.padding = '8px 18px';
    btn.style.borderRadius = '8px';
    btn.style.fontWeight = 'bold';
    btn.style.fontSize = '1.07em';
    btn.style.background = selectedDifficulty === opt.value ? '#ffe066' : '#232a3c';
    btn.style.color = selectedDifficulty === opt.value ? '#232a3c' : '#ffe066';
    btn.onclick = () => {
      selectedDifficulty = opt.value;
      renderDeckOptions();
      Array.from(diffRow.children).forEach(b => {
        b.style.background = b.textContent === opt.label ? '#ffe066' : '#232a3c';
        b.style.color = b.textContent === opt.label ? '#232a3c' : '#ffe066';
      });
    };
    diffRow.appendChild(btn);
  });

  // Rebuild modal
  modal.innerHTML = '';
  modal.appendChild(diffRow);
  modal.appendChild(list);

  let closeBtn = document.createElement('button');
  closeBtn.id = 'close-cpu-deck-modal';
  closeBtn.textContent = 'Cancel';
  closeBtn.className = 'btn-negative-secondary';
  closeBtn.style.marginTop = '16px';
  closeBtn.onclick = () => { modal.style.display = 'none'; };
  modal.appendChild(closeBtn);

  // Define and call renderDeckOptions INSIDE this function
function renderDeckOptions() {
  list.innerHTML = '';
  DEFAULT_DECKS.filter(deck => deck.difficulty === selectedDifficulty).forEach(deck => {
    const div = document.createElement('div');
    div.className = 'cpu-deck-option';
    div.style.position = 'relative';
    div.style.width = '140px';
    div.style.height = '140px';
    const borderColor = Array.isArray(deck.color) ? getCombinedColor(deck.color) : resolveColorToken(deck.color) || '#ffe066';
    div.style.border = '3px solid ' + borderColor;
    div.style.borderRadius = '18px';
    div.style.background = '#232a3c';
    div.style.margin = '10px';
    div.style.display = 'inline-block';
    div.style.overflow = 'hidden';

    div.innerHTML = `
      <div style="position:relative;width:100%;height:100%;">
        <img src="${deck.image}" alt="${deck.name}" class="deck-art-img" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">
        ${getDeckNameOverlayHtml(deck)}
      </div>
    `;
    div.onclick = () => {
      modal.style.display = 'none';
      window.selectedCpuDeck = deck;
      window.currentDeckSlot = deck.id;
      if (window.renderModePlayerDeckTile) window.renderModePlayerDeckTile();

      // Build playerProfile from selected deck
      const playerDeckObj = window.selectedPlayerDeck?.deckObj || window.selectedPlayerDeck;
      const playerProfile = {
        username: playerDeckObj?.ownerName || playerDeckObj?.username || "You",
        avatar: playerDeckObj?.avatar || playerDeckObj?.image,
        banner: playerDeckObj?.bannerArt,
        power: playerDeckObj?.power || 0
      };

      // Build opponentProfile from CPU deck
      const opponentProfile = {
        username: deck?.name,
        avatar: deck?.image,
        banner: deck?.bannerArt,
        power: deck?.power || 0
      };

      window.startGame({
        mode: "solo",
        playerDeck: playerDeckObj,
        opponentDeck: buildCpuDeck(deck),
        playerProfile: playerProfile,
        opponentProfile: opponentProfile,
        isCpuGame: true
      });
    };
    list.appendChild(div);
  });
}
renderDeckOptions();
modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };
modal.style.display = 'flex';
}

function showPlayerDeckModal() {
  const modal = document.getElementById('player-deck-modal');

  // --- Create Tab Bar ---
  let tabBar = document.createElement('div');
  tabBar.className = 'deck-tab-bar';
  tabBar.style.display = 'flex';
  tabBar.style.justifyContent = 'center';
  tabBar.style.gap = '20px';
  tabBar.style.margin = '16px 0 12px 0';

  let myDecksTab = document.createElement('button');
  myDecksTab.textContent = 'My Decks';
  myDecksTab.className = 'deck-tab-btn selected';

  let defaultDecksTab = document.createElement('button');
  defaultDecksTab.textContent = 'Default Decks';
  defaultDecksTab.className = 'deck-tab-btn';

  tabBar.appendChild(myDecksTab);
  tabBar.appendChild(defaultDecksTab);

  // --- Create Panels ---
  const playerList = document.createElement('div');
  playerList.id = 'player-deck-list';
  playerList.className = 'deck-tab-panel';

  const defaultList = document.createElement('div');
  defaultList.id = 'default-player-deck-list';
  defaultList.className = 'deck-tab-panel';

  // --- Render My Decks ---
function renderMyDecks() {
  playerList.innerHTML = '';
  const playerDecks = window.getPlayerDecks ? window.getPlayerDecks() : [];
  const activeId = window.getActiveDeckId ? window.getActiveDeckId() : null;
  if (!playerDecks.length) {
    playerList.innerHTML = '<div style="color:#ffe066;">No decks found! Please build a deck or select a Default deck</div>';
  } else {
    playerDecks.forEach(deck => {
      const totalCards = deck.deckObj && typeof deck.deckObj === "object"
        ? Object.values(deck.deckObj).filter(v => typeof v === 'number').reduce((a, b) => a + b, 0)
        : 0;
      const image = deck.deckObj && deck.deckObj.highlightArt ? deck.deckObj.highlightArt : null;
      const div = document.createElement('div');
      div.className = 'player-deck-option';

      // Only decks with exactly 30 cards are selectable
      if (totalCards === 30) {
        div.style.cursor = 'pointer';
        div.style.border = deck.id === activeId ? '3px solid #ffe066' : '2px solid #333';
        div.onclick = () => {
          window.selectedPlayerDeck = deck;
          if (typeof renderModePlayerDeckTile === "function") renderModePlayerDeckTile();
          modal.style.display = 'none';
        };
      } else {
        div.style.cursor = 'not-allowed';
        div.style.border = '2px solid #999'; // Lighter gray border for unselectable decks
        div.title = totalCards < 30 
          ? "Deck must have 30 cards to be used" 
          : "Deck cannot have more than 30 cards";
        div.onclick = null; // Prevent selection
      }

      div.innerHTML = `
        <div style="position:relative; width:100%; height:140px;">
          ${image ? `<img src="${image}" alt="${deck.name}" class="deck-art-img" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">` : ''}
          <div class="deck-name"
            style="position:absolute;bottom:0;width:100%;background:rgba(10,12,20,0.84);color:#ffe066;font-weight:bold;text-align:center;letter-spacing:0.5px;padding:4px 0 4px 0;z-index:2;">
            ${deck.name} (${totalCards} cards)
          </div>
        </div>
      `;
      playerList.appendChild(div);
    });
  }
}

  // --- Render Default Decks ---
  function renderDefaultDecks() {
    defaultList.innerHTML = '';
    const defaultDecks = DEFAULT_DECKS;
    if (Array.isArray(defaultDecks) && defaultDecks.length > 0) {
      const row = document.createElement('div');
      row.style.display = "flex";
      row.style.flexWrap = "wrap";
      row.style.gap = "16px";
      row.style.justifyContent = "center";
      defaultDecks.forEach(deck => {
        const div = document.createElement('div');
        div.className = 'default-player-deck-option';
        div.style.position = 'relative';
        div.style.width = '140px';
        div.style.height = '140px';
        const borderColorDefault = Array.isArray(deck.color) ? getCombinedColor(deck.color) : resolveColorToken(deck.color) || '#ffe066';
        div.style.border = '3px solid ' + borderColorDefault;
        div.style.borderRadius = '18px';
        div.style.display = 'inline-block';
        div.style.overflow = 'hidden';

div.innerHTML = `
  <div style="position:relative;width:100%;height:100%;">
    <img src="${deck.image}" alt="${deck.name}" class="deck-art-img" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">
        ${getDeckNameOverlayHtml(deck)}
  </div>
`;
div.onclick = () => {
window.selectedPlayerDeck = {
  ...deck,
  cardbackArt: deck.cardbackArt,
  highlightArt: deck.image,
  deckObj: {
    ...deck,
    cardbackArt: deck.cardbackArt,
    highlightArt: deck.image
  },
  isDefaultDeck: true
};
  if (typeof renderModePlayerDeckTile === "function") renderModePlayerDeckTile();
  modal.style.display = 'none';
};
        row.appendChild(div);
      });
      defaultList.appendChild(row);
    }
  }

  // --- Tab Switching Logic ---
  myDecksTab.onclick = () => {
    myDecksTab.classList.add('selected');
    defaultDecksTab.classList.remove('selected');
    playerList.style.display = '';
    defaultList.style.display = 'none';
  };

  defaultDecksTab.onclick = () => {
    defaultDecksTab.classList.add('selected');
    myDecksTab.classList.remove('selected');
    playerList.style.display = 'none';
    defaultList.style.display = '';
  };

  // --- Initial State ---
  playerList.style.display = '';
  defaultList.style.display = 'none';

  renderMyDecks();
  renderDefaultDecks();

  // --- Modal Layout ---
  modal.innerHTML = '';
  modal.appendChild(tabBar);
  modal.appendChild(playerList);
  modal.appendChild(defaultList);

  let closeBtn = document.createElement('button');
  closeBtn.id = 'close-player-deck-modal';
  closeBtn.textContent = 'Cancel';
  closeBtn.className = 'btn-negative-secondary';
  closeBtn.style.marginTop = '16px';
  closeBtn.onclick = () => { modal.style.display = 'none'; };
  modal.appendChild(closeBtn);

  modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };
  modal.style.display = 'flex';
}
document.addEventListener('DOMContentLoaded', function() {
  renderModePlayerDeckTile();
  closeAllModals();
});
function buildCpuDeck(deckDef) {
  const deck = [];
  deckDef.cards.forEach(cardEntry => {
    for (let i = 0; i < cardEntry.amount; i++) {
      deck.push({ cardId: cardEntry.id, instanceId: generateUniqueId() });
    }
  });
  return deck;
}

function generateUniqueId() {
  return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

// =========== PRIVATE LOBBY UI ===========
function showPrivateLobbyModal() {
  closeAllModals();
  const modal = document.getElementById('private-lobby-modal');
  document.getElementById('private-lobby-options').style.display = '';
  document.getElementById('lobby-created-view').style.display = 'none';
  document.getElementById('lobby-join-status').style.display = 'none';
  modal.style.display = 'flex';

  document.getElementById('create-lobby-btn').onclick = () => {
    // Generate lobby code, show code, hide options
    const lobbyCode = generateLobbyCode();
    document.getElementById('private-lobby-options').style.display = 'none';
    document.getElementById('lobby-created-view').style.display = '';
    document.getElementById('lobby-code-display').textContent = lobbyCode;
    // TODO: Call backend or socket to create the lobby
    window.currentLobbyCode = lobbyCode;
    createPrivateLobby(lobbyCode);
  };

  document.getElementById('join-lobby-btn').onclick = () => {
    const code = document.getElementById('join-lobby-code-input').value.trim().toUpperCase();
    if (!code) return;
    // TODO: Call backend or socket to join the lobby
    document.getElementById('lobby-join-status').style.display = '';
    document.getElementById('lobby-join-status').textContent = 'Joining lobby...';
    joinPrivateLobby(code);
  };

  document.getElementById('cancel-lobby-btn').onclick = () => {
    modal.style.display = 'none';
    // TODO: Cancel lobby on backend/socket if needed
    cancelPrivateLobby();
  };
  // Clicking outside modal closes it
  modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };
}

// Generates a simple 5-character code
function generateLobbyCode() {
  return Math.random().toString(36).substring(2,7).toUpperCase();
}

// Placeholder: fill these in with your socket logic
function createPrivateLobby(code) {
  // Example: socket.emit('create-lobby', { code });
  // Wait for opponent, then call onPrivateLobbyReady()
}
function joinPrivateLobby(code) {
  // Example: socket.emit('join-lobby', { code });
  // On success: onPrivateLobbyReady();
}
function cancelPrivateLobby() {
  // Example: socket.emit('cancel-lobby', { code: window.currentLobbyCode });
}

// Called when both players are in the lobby and ready to select decks
function onPrivateLobbyReady() {
  document.getElementById('private-lobby-modal').style.display = 'none';
  showPlayerDeckModal('private'); // or showOpponentDeckModal for the other player
  // After deck chosen, sync and then call startPrivateGame()
}

// CASUAL MODE
function showCasualSearchingModal() {
  document.getElementById('casual-searching-modal').style.display = 'flex';
  document.getElementById('cancel-casual-search-btn').onclick = function() {
    cancelCasualMatchmaking();
    document.getElementById('casual-searching-modal').style.display = 'none';
  };
}
// Start matchmaking (emit socket event)
function startCasualMatchmaking() {
  if (!window.selectedPlayerDeck) {
    showToast("No deck has been chosen");
    return; 
  }
  // Use deck from Modes if selected, fallback to builder slot
  let selectedDeckObj =
    window.selectedPlayerDeck?.deckObj ||
    window.selectedPlayerDeck ||
    (window.getCurrentDeck && window.getCurrentDeck());

  let selectedDeckName =
    window.selectedPlayerDeck?.name ||
    window.selectedPlayerDeck?.id ||
    (window.getActiveDeckId && window.getActiveDeckId());

  let bannerArt = selectedDeckObj?.bannerArt;
  let highlightArt = selectedDeckObj?.highlightArt;
  let cardbackArt = selectedDeckObj?.cardbackArt;

  window.socket.emit('casual-join', {
    deck: selectedDeckObj,
    deckName: selectedDeckName,
    bannerArt: bannerArt,
    highlightArt: highlightArt,
    cardbackArt: cardbackArt
  });
}
// Cancel matchmaking
function cancelCasualMatchmaking() {
  window.socket.emit('casual-cancel');
}

// Helper to render the deck tile in the mode select screen
function renderModePlayerDeckTile() {
  const slotDiv = document.getElementById('mode-player-deck-tile');
  if (!slotDiv) return;

  slotDiv.innerHTML = '';
  let deckName, deckObj, isDefaultDeck = false;

  if (window.selectedPlayerDeck) {
    deckName = window.selectedPlayerDeck.name || window.selectedPlayerDeck.id;
    deckObj = window.selectedPlayerDeck.deckObj || window.selectedPlayerDeck;
    isDefaultDeck = !!window.selectedPlayerDeck.isDefaultDeck;
  } else {
    // Don't fallback to builder.js active deck; require explicit selection!
    slotDiv.textContent = 'No Deck Selected';
    slotDiv.classList.add('empty');
    slotDiv.onclick = function(e) {
      if (window.showPlayerDeckModal)
        window.showPlayerDeckModal();
    };
    return;
  }

  slotDiv.classList.remove('empty');
  let image = deckObj.highlightArt ? deckObj.highlightArt : null;
  slotDiv.innerHTML = `
    <img class="deck-slot-highlight-img" src="${image}" alt="highlight" />
    <div class="deck-slot-title-overlay">${deckName}</div>
    <img class="deck-slot-cardback-img" src="${deckObj.cardbackArt || "Images/Cardback/Default.png"}" alt="Cardback" style="position:absolute;right:8px;width:32px;height:44px;">
    <img id="deck-slot-view-icon" src="Icons/Other/View.png" alt="View Deck" 
      style="position:absolute;top:8px;right:8px;width:30px;height:30px;z-index:10;cursor:pointer;filter:drop-shadow(0 0 4px #000b);">
  `;
  slotDiv.onclick = function(e) {
    if (e.target && e.target.id === 'deck-slot-view-icon') return;
    if (window.showPlayerDeckModal)
      window.showPlayerDeckModal();
  };
  // View icon click (open deck modal)
  const viewIcon = slotDiv.querySelector('#deck-slot-view-icon');
  if (viewIcon) {
    viewIcon.onclick = function(e) {
      e.stopPropagation();
      if (typeof showDeckViewModal === "function") {
        showDeckViewModal(deckName); // or pass deckObj if your showDeckViewModal takes the object
      }
    };
  } 
}

document.querySelector('.mode-option[data-mode="solo"]').addEventListener('click', function() {
  showCpuDeckModal();
});
document.querySelector('.mode-option[data-mode="private"]').addEventListener('click', function() {
  showPrivateLobbyModal();
});
document.querySelector('.mode-option[data-mode="casual"]').addEventListener('click', function() {
  showCasualSearchingModal();
  startCasualMatchmaking();
});
document.querySelector('.mode-option[data-mode="ranked"]').addEventListener('click', function() {
  if (typeof showRankedLobbyModal === "function") showRankedLobbyModal();
});
document.addEventListener('DOMContentLoaded', function() {
  ['solo','private','casual','ranked'].forEach(mode => {
    const el = document.querySelector(`.mode-option[data-mode="${mode}"]`);
    if (!el) return;
    el.addEventListener('click', function() {
      if (mode === "solo") showCpuDeckModal();
      else if (mode === "private") showPrivateLobbyModal();
      else if (mode === "casual" && typeof showPublicLobbyModal === "function") showPublicLobbyModal();
      else if (mode === "ranked" && typeof showRankedLobbyModal === "function") showRankedLobbyModal();
    });
  });
});
// BACK IMAGES
// CPU Deck Modal: Back to Mode Selection
document.getElementById('cpu-back-btn').addEventListener('click', function() {
  document.getElementById('cpu-deck-modal').style.display = 'none';
  document.getElementById('mode-select-section').style.display = '';
});

// Player Deck Modal: Back to CPU Deck Selection
document.getElementById('player-back-btn').addEventListener('click', function() {
  document.getElementById('player-deck-modal').style.display = 'none';
  document.getElementById('cpu-deck-modal').style.display = '';
});
