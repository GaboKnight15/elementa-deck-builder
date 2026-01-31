const dummyCards = [
// ------------------------ //
// --- ELEMENTA GENESIS --- //
// ------------------------ //

{id: 'VeyaEmeraldDruidess', name: 'Veya, Emerald Druidess', rarity: 'Legendary', image: 'Cards/egg/VeyaEmeraldDruidess.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Human', archetype: '', trait: 'Mage', hp: 5, atk: 1, def: 0,
 cost: '{G}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{g}', effect: {class: 'Summon'}},
  {name: 'Verdant Invocation', cost: '{0}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'essenceGreen', amount: 1}},
  {name: "Lifebloom Grace", cost: '{G}',
   requirement: {class:'Ultimate'}, 
   effect: {class: 'Heal', amount: 2, target: 2}},
  ]},

{id: 'Verdara', name: 'Verdara', rarity: 'Legendary', image: 'Cards/egg/Verdara.png', flavor: '', 
 category: 'Domain', color: 'Green', type: '', hp: 20, cost: '{0}', essence: '{G}', trait: 'Dominion', set: 'ElementaGenesis',
 skill: [{name: 'Flourish', cost: '{g}', requirement: {class: 'CW'}, effect: {class: 'Search', trait: 'Terrain'}}]},

{id: 'SylvanAnima', name: 'Sylvan Anima', rarity: 'Legendary', image: 'Cards/egg/SylvanAnima.png', flavor: '', 
 category: 'Spell', color: 'Green', type: 'Aura', cost: '{2}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{2}', effect: [{class : 'Essence', color: 'Green', amount: 3}, {class: 'Cast'}]}]},

{id: 'DeepwoodUrsan', name: 'Deepwood Ursan', rarity: 'Rare', image: 'Cards/egg/DeepwoodUrsan.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Beast', archetype: '', trait: '', hp: 7, atk: 4, def: 1,
 cost: '{1}{G}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}{g}', effect: {class: 'Summon'}},
  {name: 'Frenzy', activation: {class:'Frenzy'}, effect: {class: 'Frenzy'}},
  {name: 'Apex Feast', requirement: [{class:'Special'}, {class:'Frenzy'}], effect: {class: 'Recover', amount: 2}},
  ]},

{id: 'EarthrootTitan', name: 'Earthroot Titan', rarity: 'Rare', image: 'Cards/egg/EarthrootTitan.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Beast', archetype: 'Giant', trait: '', hp: 12, atk: 5, def: 2,
 cost: '{G}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{2}{g}{g}', effect: {class: 'Summon'}},
  {name: 'Defender', cost: '{0}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'essenceGreen', amount: 1}},
  ]},

{id: 'ElementalofFoliages', name: 'Elemental of Foliages', rarity: 'Rare', image: 'Cards/egg/ElementalofFoliages.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: '', hp: 8, atk: 3, def: 1, cost: '{g}{g}', 
 ability: ['Protect','Regenerate'], set: 'ElementaGenesis',
 skill: [{name: 'Sylvan Discovery', cost: '{g}{g}', effect: [{class: 'Summon'}, {class: 'Search', targetColor: 'Green', targetTrait: 'Terrain'}]},
 ]},

{id: 'LifesGrowth', name: "Life's Growth", rarity: 'Rare', image: 'Cards/egg/LifesGrowth.png', flavor: '', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: '{g}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{g}', effect: [{class: 'Essence', amount: 2, color: 'Green'}, {class: 'Cast'}]}]},

{id: 'ForestFairy', name: 'Forest Fairy', rarity: 'Common', image: 'Cards/egg/Fairy.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Fairy', hp: 2, atk: 1, def: 0,
 cost: '{0}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},
 
{id: 'Satyr', name: 'Satyr', rarity: 'Common', image: 'Cards/egg/Satyr.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Satyr', hp: 5, atk: 1, def: 1,
 cost: '{1}', ability: '', set: 'ElementaGenesis', 
 skill: [{name: 'Summon', cost: '{1}', effect: {class: 'Summon'}}]},

{id: 'WildwoodGoblin', name: 'Forest Goblin', rarity: 'Common', image: 'Cards/egg/Goblin.png', flavor: '',
 category: 'Creature', color: 'Green', type: 'Brute', archetype: 'Goblin', hp: 3, atk: 1, def: 0,
 cost: '{0}', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

{id: 'ElementalofLeaves', name: 'Elemental of Leaves', rarity: 'Common', image: 'Cards/egg/ElementalofLeaves.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: '', hp: 4, atk: 1, def: 0, cost: '{G}', 
 ability: '', set: 'ElementaGenesis',
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'},
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},

{id: 'VineApe', name: 'Vine Ape', rarity: 'Common', image: 'Cards/fo/VineApe.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Beast', archetype: 'Ape', hp: 4, atk: 2, def: 1,
 cost: '{1}', ability: '', set: 'ElementaGenesis', 
 skill: [{name: 'Summon', cost: '{1}', effect: {class: 'Summon'}}]},

{id: 'Forest', name: 'Forest', rarity: 'Common', image: 'Cards/egg/Forest.png', flavor: '', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{0}', effect: {class: 'Terraform'}}]},

{id: 'Flourish', name: 'Flourish', rarity: 'Common', image: 'Cards/egg/Flourish.png', flavor: '', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: '{2}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{2}', effect: [{class: 'Essence', color: 'Green', amount: 3}, {class: 'Cast'}]}]},
 
{id: 'EssenceSurge', name: 'Essence Surge', rarity: 'Common', image: 'Cards/egg/EssenceSurge.png', flavor: '', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: '{2}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{2}', effect: [{class: 'Essence', color: 'Green', amount: 3}, {class: 'Cast'}]}]},

// --- EG RED --- //
{id: 'KaelenBlazebornHuntress', name: 'Kaelen, Blazeborn Huntress', rarity: 'Legendary', image: 'Cards/egr/KaelenBlazebornHuntress.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Human', archetype: '', trait: 'Ranger', hp: 3, atk: 1, def: 0,
 cost: '{R}', ability: 'Burn', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{r}', effect: {class: 'Summon'}},
  {name: 'Flameshot', cost: '{r}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'Burn', amount: 3}},
  {name: 'Scorching Arrowcall',
   requirement: [{class:'Ultimate'}, {class: 'CW'}], 
   effect: {class: 'Rally', amount: 1}}
  ]},
 
{id: 'Magmaris', name: 'Magmaris', rarity: 'Legendary', image: 'Cards/egr/Magmaris.png', flavor: '', 
 category: 'Domain', color: 'Red', type: '', hp: 20, cost: '{0}', essence: '{R}', trait: 'Dominion', set: 'ElementaGenesis',
 skill: [{name: 'Ignite', cost: '{r}', requirement: {class: 'CW'}, effect: {class: 'Burn', amount: 1}}]},
 
{id: 'InfernoEruption', name: 'Inferno Eruption', rarity: 'Legendary', image: 'Cards/egr/InfernoEruption.png', flavor: '', 
 category: 'Spell', color: 'Red', type: 'Fire', trait: '', cost: '{1}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{0}', effect: {class: 'Cast'}}]},

{id: 'CinderpeakTyrant', name: 'Cinderpeak Tyrant', rarity: 'Rare', image: 'Cards/egr/CinderpeakTyrant.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Brute', archetype: 'Giant', trait: '', hp: 10, atk: 5, def: 2,
 cost: '{3}{r}', ability: 'Crush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{3}{r}', effect: {class: 'Summon'}}]},

{id: 'BlazescaleWarDrake', name: 'Blazescale War-Drake', rarity: 'Rare', image: 'Cards/egr/BlazescaleWarDrake.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Dragon', archetype: 'Blazescale', trait: '', hp: 7, atk: 4, def: 2,
 cost: '{2}{r}', ability: 'Rush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{2}{r}', effect: {class: 'Summon'}}]},

{id: 'ElementalofFlames', name: 'Elemental of Flames', rarity: 'Rare', image: 'Cards/egr/ElementalofFlames.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Elemental', archetype: 'Pyro', trait: '', hp: 5, atk: 4, def: 0,
 cost: '{r}{r}', ability: ['Elusive','Scorch'], set: 'ElementaGenesis',
 skill: [{name: 'Inferno Discovery', cost: '{r}{r}',
		  effect: [{class:'Summon'}, {class:'Search', amount: 1, targetColor: 'Red', targetTrait: 'Terrain'}]}]},

{id: 'MagmarisMercenary', name: 'Magmaris Mercenary', rarity: 'Rare', image: 'Cards/egr/MagmarisMercenary.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Human', archetype: '', trait: '', hp: 5, atk: 2, def: 1,
 cost: '{1}{r}', ability: 'Defiant', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{r}{r}', effect: {class: 'Summon'}},
 {name: 'Flaming Slash', cost: '{r}', requirement: [{class:'Special'}, {class: 'CW'}], 
  effect: {class: 'Burn', amount: 4}},
 {name: 'Frenzy', activation: {class:'Frenzy'}, effect: {class: 'Frenzy'}},
 {name: 'Scorching Contract', requirement: {class:'Frenzy'}, 
  effect: [{class: 'Draw', amount: 1}, {class: 'Discard', amount: 1}]}]},

{id: 'MoltenExpanse', name: 'Molten Expanse', rarity: 'Rare', image: 'Cards/egr/MoltenExpanse.png', flavor: '', 
 category: 'Domain', color: 'Red', type: 'Terrain', hp: 7, cost: '{r}', essence: '{R}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{r}', effect: {class: 'Terraform'}},
  {name: 'Flourish', cost: '{g}', requirement: {class: 'CW'}, effect: {class: 'Search', trait: 'Terrain'}}]},

{id: 'EmberstormCyclone', name: 'Emberstorm Cyclone', rarity: 'Rare', image: 'Cards/egr/EmberstormCyclone.png', flavor: '', 
 category: 'Spell', color: 'Red', type: 'Fire', trait: 'Aura', cost: '{2}{r}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{2}{r}', effect: {class: 'Cast'}}]},

{id: 'Emberling', name: 'Emberling', rarity: 'Common', image: 'Cards/egr/Emberling.png', flavor: '',
 category: 'Creature', color: 'Red', type: 'Beast', archetype: 'Fireland', hp: 2, atk: 1, def: 0,
 cost: '{0}', ability: ['Burn','Rush'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},
 
{id: 'ElementalofEmbers', name: 'Elemental of Embers', rarity: 'Common', image: 'Cards/egr/ElementalofEmbers.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Elemental', archetype: 'Pyro', trait: '', hp: 3, atk: 2, def: 0,
 cost: '{r}', ability: ['Elusive','Scorch'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{r}', effect: {class: 'Summon'}}]},

{id: 'Kobold', name: 'Kobold', rarity: 'Common', image: 'Cards/egr/Kobold.png', flavor: '',
 category: 'Creature', color: 'Red', type: 'Reptile', archetype: '', hp: 3, atk: 2, def: 1,
 cost: '{1}', ability: ['Defiant','Rush'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

{id: 'Volcano', name: 'Volcano', rarity: 'Common', image: 'Cards/egr/Volcano.png', flavor: '', 
 category: 'Domain', color: 'Red', type: 'Terrain', hp: 5, cost: '{0}', essence: '{R}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{0}', effect: {class: 'Terraform'}}]},

{id: 'FlameBlast', name: 'Flame Blast', rarity: 'Common', image: 'Cards/egr/FlameBlast.png', flavor: '', 
 category: 'Spell', color: 'Red', type: 'Fire', cost: '{r}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{1}', effect: {class: 'Cast'}}]},

{id: 'EssenceAssault', name: 'Essence Assault', rarity: 'Common', image: 'Cards/egr/EssenceAssault.png', flavor: '', 
 category: 'Spell', color: 'Red', type: 'Spell', cost: '{1}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{1}', effect: {class: 'Cast'}}]},
 
// --- EG BLUE --- //
{id: 'SerenyaTideboundEnchantress', name: 'Serenya, Tidebound Enchantress', rarity: 'Legendary', image: 'Cards/egu/SerenyaTideboundEnchantress.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Human', archetype: '', trait: 'Mage', hp: 5, atk: 1, def: 0,
 cost: '{U}', ability: 'Soak', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{u}', effect: {class: 'Summon'}},
  {name: 'Tidecall Ascendance', cost: '{u}', requirement: {class: 'Special'}, effect: {class: 'Draw', amount: 1}},
  {name: 'Riptide Command', cost: '{u}{u}',
   requirement: [{class: 'Ultimate'}, {class: 'CW'}],
   effect: {class: 'Repel', amount: 2, target:'opponentCreatures'}}
 ]},
 
{id: 'Umarion', name: 'Umarion', rarity: 'Legendary', image: 'Cards/egu/Umarion.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: '', hp: 20, cost: '{0}', essence: '{U}', trait: 'Dominion', set: 'ElementaGenesis',
 skill: [{name: 'Insight', cost: '{u}', requirement: {class: 'CW'}, effect: {class: 'Draw', amount:1}},
 {name: 'Insight', cost: '{u}', requirement: {class: 'CW'}, effect: {class: 'Draw', amount:1}}]},
 
{id: 'TidalMaelstrom', name: 'Tidal Maelstrom', rarity: 'Legendary', image: 'Cards/egu/TidalMaelstrom.png', flavor: '', 
 category: 'Spell', color: 'Blue', type: 'Water', cost: '{2}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{u}{u}{u}', effect: [{class: 'Soak', amount: 2, target: 3}, {class: 'Cast'}]}]},

{id: 'GiantMaelstromSquid', name: 'Giant Maelstrom-Squid', rarity: 'Rare', image: 'Cards/egu/GiantMaelstromSquid.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Oceanic', archetype: '', trait: '', hp: 11, atk: 3, def: 1,
 cost: '{1}{u}{U}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}{u}{u}', effect: {class: 'Summon'}},
  {name: 'Colossal Constriction', cost: '{u}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'Bind', amount: 0, target:'opponentCreatures'}},
 ]},
 
{id: 'WavecrashWhale', name: 'Wavecrash Whale', rarity: 'Rare', image: 'Cards/egu/WavecrashWhale.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Oceanic', archetype: 'Marine', trait: '', hp: 15, atk: 5, def: 1,
 cost: '{4}{u}', ability: 'Dive', set: 'ElementaGenesis',
 skill: [{name: 'Whalefall Wake', cost: '{4}{u}', effect: {class: 'Summon'}},
	{name: 'Riptide Rush', requirement: {class: 'Passive'},
	 effect: {class: 'Inspire', target: 'playerCreatures', targetType: 'Oceanic', accel: 1}}]},

{id: 'ElementalofTorrents', name: 'Elemental of Torrents', rarity: 'Rare', image: 'Cards/egu/ElementalofTorrents.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Elemental', archetype: 'Hydral', trait: '', hp: 8, atk: 3, def: 0,
 cost: '{u}{u}', ability: 'Drench', set: 'ElementaGenesis',
 skill: [{name: 'Tidal Discovery', cost: '{u}{u}',
		  effect: [{class: 'Summon'}, {class: 'Search', amount: 1, targetColor: 'Blue', targetTrait: 'Terrain'}]},
 ]},

{id: 'Mermaid', name: 'Mermaid', rarity: 'Common', image: 'Cards/egu/Mermaid.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Oceanic', archetype: 'Merfolk', trait: '', hp: 4, atk: 1, def: 0,
 cost: '{0}', ability: 'Dive', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

{id: 'ElementalofDroplets', name: 'Elemental of Droplets', rarity: 'Common', image: 'Cards/egu/ElementalofDroplets.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Elemental', archetype: 'Hydral', trait: '', hp: 4, atk: 1, def: 0,
 cost: '{u}', ability: ['Drench','Elusive'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{u}', effect: {class: 'Summon'}}]},

{id: 'Ocean', name: 'Ocean', rarity: 'Common', image: 'Cards/egu/Ocean.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{0}', effect: {class: 'Terraform'}}]},

{id: 'EssenceRift', name: 'Essence Rift', rarity: 'Common', image: 'Cards/egu/EssenceRift.png', flavor: '', 
 category: 'Spell', color: 'Blue', type: 'Spell', cost: '{1}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{1}', effect: [{class: 'Draw', amount: 2}, {class: 'Cast'}]}]},

// --- EG YELLOW --- //
{id: 'ZyraThunderbladeDuelist', name: 'Zyra, Thunderblade Duelist', rarity: 'Legendary', image: 'Cards/egy/ZyraThunderbladeDuelist.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Human', archetype: '', trait: 'Warrior', hp: 5, atk: 1, def: 1,
 cost: '{Y}', ability: ['Dash'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{y}', effect: {class: 'Summon'}},
  {name: 'Dash', cost: '{0}', effect: {class: 'Dash'}},
  {name: 'Thunderclap Tempo', cost: '{y}', requirement: {class:'Special'}, effect: {class: 'Flurry', amount: 1}},
  {name: 'Blade Tempest', cost: '{Y}{Y}', requirement: {class: 'Ultimate'}, effect: {class: 'Strike', target: 3, amount: 2}}
 ]},
         
{id: 'Aetherion', name: 'Aetherion', rarity: 'Legendary', image: 'Cards/egy/Aetherion.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: '', hp: 20, cost: '{0}', essence: '{Y}', trait: 'Dominion', set: 'ElementaGenesis',
 skill: [{name: 'Shock', cost: '{y}', requirement: {class: 'CW'}, effect: {class: 'Strike', amount: 2}}]},
         
{id: 'TempestDevastation', name: 'Tempest Devastation', rarity: 'Legendary', image: 'Cards/egy/TempestDevastation.png', flavor: '', 
 category: 'Spell', color: 'Yellow', type: 'Thunder', cost: '{y}{y}{y}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{y}{y}{y}', effect: [{class: 'Strike', amount: 3}, {class: 'Cast'}]}]},
         
{id: 'GalestrikeRoc', name: 'Galestrike Roc', rarity: 'Rare', image: 'Cards/egy/GalestrikeRoc.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Avian', archetype: '', trait: '', hp: 6, atk: 4, def: 2,
 cost: '{1}{y}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}{y}', effect: {class: 'Summon'}}]},

{id: 'ElementalofGales', name: 'Elemental of Gales', rarity: 'Rare', image: 'Cards/egy/ElementalofGales.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Elemental', archetype: 'Wind', trait: '', hp: 6, atk: 3, def: 0,
 cost: '{1}{y}', ability: ['Elusive','Flying'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{y}{y}', effect: {class: 'Summon'}}]},

{id: 'ElementalofLightning', name: 'Elemental of Lightning', rarity: 'Rare', image: 'Cards/egy/ElementalofLightning.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Elemental', archetype: 'Voltkin', trait: '', hp: 5, atk: 3, def: 0,
 cost: '{y}{y}', ability: ['Elusive','Static'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{y}{y}', effect: {class: 'Summon'}}]},
         
{id: 'StratosCloudBeast', name: 'Stratos Cloud Beast', rarity: 'Rare', image: 'Cards/foy/StratosCloudBeast.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Beast', archetype: '', trait: '', hp: 6, atk: 4, def: 0,
 cost: '{2}{y}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{y}{y}', effect: {class: 'Summon'}}]},
         
{id: 'StormspirePinnacle', name: 'Stormspire Pinnacle', rarity: 'Rare', image: 'Cards/egy/StormspirePinnacle.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 9, cost: '{y}', essence: '{Y}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{y}', effect: {class: 'Terraform'}},
  {name: 'Flourish', cost: '{g}', requirement: {class: 'CW'}, effect: {class: 'Search', trait: 'Terrain'}}]},
         
{id: 'PiercingLightning', name: 'Piercing Lightning', rarity: 'Rare', image: 'Cards/egy/PiercingLightning.png', flavor: '', 
 category: 'Spell', color: 'Yellow', type: 'Thunder', cost: '{y}{y}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{y}{y}', effect: [{class: 'Strike', amount: 3}, {class: 'Cast'}]}]},

{id: 'Birdfolk', name: 'Birdfolk', rarity: 'Common', image: 'Cards/egy/Birdfolk.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Avian', archetype: '', hp: 4, atk: 2, def: 1, 
 cost: '{y}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{y}', effect: {class: 'Summon'}}]},

{id: 'SuncrestFalcon', name: 'Suncrest Falcon', rarity: 'Common', image: 'Cards/egy/SuncrestFalcon.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Avian', archetype: '', hp: 3, atk: 2, def: 0, 
 cost: '{y}{y}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{y}{y}', effect: {class: 'Summon'}}]},

{id: 'ElementalofSparks', name: 'Elemental of Sparks', rarity: 'Common', image: 'Cards/egy/ElementalofSparks.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Elemental', archetype: 'Voltkin', trait: '', hp: 2, atk: 2, def: 0,
 cost: '{y}', ability: ['Elusive','Static'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{y}{y}', effect: {class: 'Summon'}}]},

{id: 'ZephyrSprite', name: 'Zephyr Sprite', rarity: 'Common', image: 'Cards/egy/ZephyrSprite.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Elemental', archetype: 'Wind', trait: '', hp: 2, atk: 2, def: 0,
 cost: '{y}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{y}{y}', effect: {class: 'Summon'}}]},

{id: 'Peaks', name: 'Peaks', rarity: 'Common', image: 'Cards/egy/Peaks.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{0}', effect: {class: 'Terraform'}}]},

{id: 'Thunderlash', name: 'Thunderlash', rarity: 'Common', image: 'Cards/egy/Thunderlash.png', flavor: '', 
 category: 'Spell', color: 'Yellow', type: 'Spell', cost: '{y}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{1}', effect: [{class: 'Strike', amount: 3}, {class: 'Cast'}]}]},

{id: 'EssenceRay', name: 'Essence Ray', rarity: 'Common', image: 'Cards/egy/EssenceRay.png', flavor: '', 
 category: 'Spell', color: 'Yellow', type: 'Spell', cost: '{1}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{1}', effect: [{class: 'Strike', amount: 3}, {class: 'Cast'}]}]},

// --- EG GRAY --- //
{id: 'RudgarIronfistMauler', name: 'Rudgar, Ironfist Mauler', rarity: 'Legendary', image: 'Cards/egc/RudgarIronfistMauler.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Human', archetype: '', trait: 'Warrior', hp: 5, atk: 2, def: 1,
 cost: '{C}', ability: 'Crush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{c}', effect: {class: 'Summon'}},
  {name: 'Stonebreaker Punch', cost: '{c}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'Strike', target: 1, amount: 5}},
  {name: 'Village Hero', cost: '{c}',
   requirement: {class:'Ultimate'}, 
   effect: {class: 'Ascend', amount: 1}}
 ]},
         
{id: 'Drakzul', name: 'Drakzul', rarity: 'Legendary', image: 'Cards/egc/Drakzul.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: '', hp: 20, cost: '{0}', essence: '{C}', trait: 'Dominion', set: 'ElementaGenesis',
 skill: [{name: 'Fortify', cost: '{c}', requirement: {class: 'CW'}, effect: {class: 'Armor', amount: 1}}]},

{id: 'TerraEmergence', name: 'Terra Emergence', rarity: 'Legendary', image: 'Cards/egc/TerraEmergence.png', flavor: '', 
 category: 'Spell', color: 'Gray', type: '', cost: '{c}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{c}{c}', effect: [{class: 'Cast'}, {class: 'Search', targetTrait: 'Terrain'}]},
  {name: 'Expel', cost: '{c}',
   requirement: {class: 'Expel'},
   effect: {class: 'Search', targetTrait: 'Terrain'}}]},

{id: 'RockmaulRhino', name: 'Rockmaul Rhino', rarity: 'Rare', image: 'Cards/egc/RockmaulRhino.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Beast', archetype: '', trait: '', hp: 8, atk: 4, def: 2,
 cost: '{C}', ability: 'Crush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{c}', effect: {class: 'Summon'}},
  {name: 'Twin Impact', cost: '{c}',
   requirement: [{class:'Special'}, {class: 'CCW'}], 
   effect: {class: 'Strike', target: 2, amount: 2}},
  {name: 'Seismic Smite', cost: '{c}{C}',
   requirement: [{class:'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Strike', target: 3, amount: 2}}]},

{id: 'ElementalofBoulders', name: 'Elemental of Boulders', rarity: 'Rare', image: 'Cards/egc/ElementalofBoulders.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Elemental', archetype: 'Golem', trait: '', hp: 5, atk: 4, def: 3,
 cost: '{c}{c}', ability: 'Immunity', set: 'ElementaGenesis',
 skill: [{name: 'Terra Discovery', cost: '{c}{c}', effect: [{class: 'Summon'}, {class: 'Search', amount: 1, targetColor: 'Gray', targetTrait: 'Terrain'}]},
  {name: 'Mountain Earthcraft', activation: {class:'Brace'}, effect: {class: 'Inspire', armor: 1, targetCategory: 'Terrain'}}]},

{id: 'SlatebackLizard', name: 'Slateback Lizard', rarity: 'Rare', image: 'Cards/egc/SlatebackLizard.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Reptile', archetype: '', trait: '', hp: 6, atk: 4, def: 2,
 cost: '{C}', ability: 'Crush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{c}', effect: {class: 'Summon'}},
  {name: 'Twin Impact', cost: '{c}',
   requirement: [{class:'Special'}, {class: 'CCW'}], 
   effect: {class: 'Strike', target: 2, amount: 2}},
  {name: 'Seismic Smite', cost: '{c}{C}',
   requirement: [{class:'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Strike', target: 3, amount: 2}}
 ]},

 {id: 'SeismicRupture', name: 'Seismic Rupture', rarity: 'Common', image: 'Cards/egc/SeismicRupture.png', flavor: '', 
 category: 'Spell', color: 'Gray', type: '', cost: '{c}{c}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{c}{c}', effect: {class: 'Cast'}},
  {name: 'Disable', cost: '{1}', 
   effect: {class: 'Disable', amount: 2, target: 3}},
 ]},

{id: 'Orc', name: 'Orc', rarity: 'Common', image: 'Cards/egc/Orc.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Beast', archetype: 'Orc', trait: 'Warrior', hp: 5, atk: 3, def: 1,
 cost: '{C}', ability: ['Defiant','Intimidate'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{c}', effect: {class: 'Summon'}}]},

{id: 'BarrensTrampler', name: 'Barrens Trampler', rarity: 'Common', image: 'Cards/egc/BarrensTrampler.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Beast', archetype: 'Orc', trait: '', hp: 10, atk: 2, def: 2,
 cost: '{C}', ability: 'Crush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{c}', effect: {class: 'Summon'}}]},

{id: 'RockshellArmadillo', name: 'Rockshell Armadillo', rarity: 'Common', image: 'Cards/egc/RockshellArmadillo.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Beast', archetype: '', trait: '', hp: 3, atk: 1, def: 2,
 cost: '{C}', ability: ['Defender','Unbreakable'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{c}', effect: {class: 'Summon'}},
 ]},

{id: 'ElementalofPebbles', name: 'Elemental of Pebbles', rarity: 'Common', image: 'Cards/egc/ElementalofPebbles.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Elemental', archetype: 'Golem', trait: '', hp: 3, atk: 2, def: 2,
 cost: '{C}', ability: ['Dormant','Immunity'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{c}', effect: {class: 'Summon'}}]},

{id: 'Mountain', name: 'Mountain', rarity: 'Common', image: 'Cards/egc/Mountain.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{0}', effect: {class: 'Terraform'}}]},

{id: 'StoneFist', name: 'Stone Fist', rarity: 'Common', image: 'Cards/egc/StoneFist.png', flavor: '', 
 category: 'Spell', color: 'Gray', type: 'Aura', cost: '{c}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{0}', effect: {class: 'Cast'}}]},
         
{id: 'EssenceBarrier', name: 'Essence Barrier', rarity: 'Common', image: 'Cards/egc/EssenceBarrier.png', flavor: '', 
 category: 'Spell', color: 'Gray', type: 'Aura', cost: '{1}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{0}', effect: {class: 'Cast'}},
  {name: 'Inspire', cost: '{1}', effect: {class: 'Strike', amount: 3}}]},

// --- EG PURPLE --- //
{id: 'SelgorCorruptedWarlock', name: 'Selgor, Corrupted Warlock', rarity: 'Legendary', image: 'Cards/egp/SelgorCorruptedWarlock.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Human', archetype: '', trait: 'Mage', hp: 4, atk: 1, def: 1,
 cost: '{P}', ability: 'Wither', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{p}', effect: {class: 'Summon'}},
  {name: 'Soul Reap',
   requirement: [{class: 'Special'}, {class: 'Sacrifice', target: 1, targetCategory: 'Creature'}],
   effect: {class: 'Rally', amount: 2}},
  {name: 'Corruptive Surge', cost: '{P}{P}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1}}
 ]},

{id: 'Virkul', name: 'Virkul', rarity: 'Legendary', image: 'Cards/egp/Virkul.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: '', hp: 20, cost: '{0}', essence: '{P}', trait: 'Dominion', set: 'ElementaGenesis',
 skill: [{name: 'Corrupt', cost: '{p}', requirement: {class: 'CW'}, effect: {class: 'Curse', amount: 1}}]},
         
{id: 'CursedWorldfall', name: 'Cursed Worldfall', rarity: 'Legendary', image: 'Cards/egp/CursedWorldfall.png', flavor: '', 
 category: 'Spell', color: 'Purple', type: 'Aura', cost: '{p}{p}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{p}{p}', effect: [{class: 'Aura'}, {class: 'Hindrance'}]}]},

{id: 'GoliathCroaker', name: 'Goliath Croaker', rarity: 'Rare', image: 'Cards/egp/GoliathCroaker.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Beast', archetype: '', trait: '', hp: 11, atk: 3, def: 2,
 cost: '{1}{p}{P}', ability: 'Poisonous', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}{p}{p}', effect: {class: 'Summon'}}]},

{id: 'DreadcoilViper', name: 'Dreadcoil Viper', rarity: 'Rare', image: 'Cards/egp/DreadcoilViper.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Reptile', archetype: '', trait: '', hp: 7, atk: 3, def: 1,
 cost: '{p}{p}', ability: 'Venom', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{p}{p}', effect: {class: 'Summon'}}]},

{id: 'ElementalofMiasmas', name: 'Elemental of Miasmas', rarity: 'Rare', image: 'Cards/egp/ElementalofMiasmas.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Elemental', archetype: 'Corruptor', trait: '', hp: 7, atk: 3, def: 1,
 cost: '{p}{p}', ability: 'Poisonous', set: 'ElementaGenesis',
 skill: [{name: 'Cursed Discovery', cost: '{p}{p}', activation: {class:'Arrival'},
		  effect: [{class: 'Summon'}, {class: 'Search', amount: 1, targetColor: 'Purple', targetTrait: 'Terrain'}]}]},

{id: 'FesterglowFrontier', name: 'Festerglow Frontier', rarity: 'Rare', image: 'Cards/egp/FesterglowFrontier.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 6, cost: '{p}', essence: '{p}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{p}', effect: {class: 'Terraform'}},
  {name: 'Flourish', cost: '{g}', requirement: {class: 'CW'}, effect: {class: 'Search', trait: 'Terrain'}}]},

{id: 'BlightWave', name: 'BlightWave', rarity: 'Rare', image: 'Cards/egp/BlightWave.png', flavor: '', 
 category: 'Spell', color: 'Purple', type: 'Poison', cost: '{p}{p}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{p}{p}', effect: [{class: 'Cast'}, {class: 'Search'}]},
  {name: 'Expel', cost: '{c}', 
   requirement: {class: 'Expel'}, effect: {class: 'Search', targetTrait: 'Terrain'}}]},

{id: 'GiantHornet', name: 'Giant Hornet', rarity: 'Common', image: 'Cards/egp/GiantHornet.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Bug', archetype: '', trait: '', hp: 3, atk: 2, def: 0,
 cost: '{p}', ability: ['Flying','Venom'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{p}', effect: {class: 'Summon'}}]},

{id: 'ElementalofToxins', name: 'Elemental of Toxins', rarity: 'Common', image: 'Cards/egp/ElementalofToxins.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Elemental', archetype: 'Corruptor', trait: '', hp: 3, atk: 1, def: 0,
 cost: '{p}', ability: ['Elusive','Poisonous'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{p}{p}', effect: {class: 'Summon'}}]},

{id: 'FenGoblin', name: 'Fen Goblin', rarity: 'Common', image: 'Cards/egp/FenGoblin.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Brute', archetype: 'Goblin', trait: '', hp: 2, atk: 1, def: 0,
 cost: '{0}', ability: ['Pilfer','Venom'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},
         
{id: 'Swamp', name: 'Swamp', rarity: 'Common', image: 'Cards/egp/Swamp.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{0}', effect: {class: 'Terraform'}}]},

{id: 'SporeCloud', name: 'Spore Cloud', rarity: 'Common', image: 'Cards/egp/SporeCloud.png', flavor: '', 
 category: 'Spell', color: 'Purple', type: 'Toxic', cost: '{1}{p}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{1}{p}', effect: [{class: 'Poison', amount: 0, target: 3}, {class: 'Cast'}]}]},
         
{id: 'EssenceBreak', name: 'Essence Break', rarity: 'Common', image: 'Cards/egp/EssenceBreak.png', flavor: '', 
 category: 'Spell', color: 'Purple', type: 'Spell', cost: '{1}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{2}', effect: {class: 'Cast'}},
  {name: 'Spell', cost: '{1}', effect: {class: 'Strike', amount: 3}}]},

// --- EG WHITE --- //
{id: 'ElyndraDawnbladeofHeavens', name: 'Elyndra, Dawnblade of Heavens', rarity: 'Legendary', image: 'Cards/egw/ElyndraDawnbladeofHeavens.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Human', archetype: '', trait: 'Warrior', hp: 5, atk: 2, def: 1,
 cost:'{w}', ability: 'Aegis', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{w}', effect: {class: 'Summon'}},
  {name: 'Dawnbreak', cost: '{w}', requirement: {class:'Special'}, effect: {class: 'Bolster', amount: 1}},
  {name: 'Radiant Severance', cost: '{w}{w}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}], 
   effect: [{class: 'Strike', amount: 4}, {status: 'Aegis'}]}]},

{id: 'Solmara', name: 'Solmara', rarity: 'Legendary', image: 'Cards/egw/Solmara.png', flavor: '', 
 category: 'Domain', color: 'White', type: '', hp: 20, cost: '{0}', essence: '{W}', trait: 'Dominion', set: 'ElementaGenesis',
 skill: [{name: 'Blessing', cost: '{w}', requirement: {class: 'CW'}, effect: {class: 'Terraform'}}]},

{id: 'RadiantJudgement', name: 'Radiant Judgement', rarity: 'Legendary', image: 'Cards/egw/RadiantJudgement.png', flavor: '', 
 category: 'Spell', color: 'White', type: 'Spell', cost: '{1}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{w}{w}', effect: {class: 'Cast'}}]},

{id: 'Pegasus', name: 'Pegasus', rarity: 'Rare', image: 'Cards/egw/Pegasus.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Beast', archetype: '', trait: '', hp: 6, atk: 2, def: 1,
 cost: '{2}{W}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{2}{w}', effect: {class: 'Summon'}}]},

{id: 'SkylionExemplar', name: 'Skylion Exemplar', rarity: 'Rare', image: 'Cards/egw/SkylionExemplar.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Beast', archetype: '', trait: '', hp: 8, atk: 4, def: 2,
 cost: '{3}{w}', ability: ['Aegis', 'Flying', 'Protect'], set: 'ElementaGenesis',
 skill: [{name: 'Wings of Absolution', cost: '{4}{w}',
		  effect: [{class: 'Summon'}, {class: 'Inspire', status: 'Aegis', target: 2, targetCategory: 'Creature'}]},
 {name: 'Hallowed Conviction', requirement: {class: 'Passive'}, 
   effect: {class: 'Inspire', rally: 1, target: 'playerCreatures', targetStatus: 'Aegis'}}]},

{id: 'ElementalofLusters', name: 'Elemental of Lusters', rarity: 'Rare', image: 'Cards/egw/ElementalofLusters.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Elemental', archetype: 'Luminaut', trait: '', hp: 7, atk: 3, def: 0,
 cost: '{w}{w}', ability: 'Elusive', set: 'ElementaGenesis',
 skill: [{name: 'Radiant Discovery', cost: '{w}{w}',
		  effect: [{class: 'Summon'}, {class: 'Search', targetColor: 'White', targetTrait: 'Terrain'}]},
 {name: 'Blinding Splendor', cost: '{w}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}], 
   effect: {class: 'Disable', target: 'opponentCreatures'}}]},

{id: 'Angel', name: 'Angel', rarity: 'Common', image: 'Cards/egw/Angel.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Angel', archetype: 'Seraph', trait: '', hp: 5, atk: 1, def: 0,
 cost: '{w}', ability: ['Flying', 'Veil'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{w}', effect: {class: 'Summon'}},
	{name: 'Frenzy', activation: {class:'Frenzy'}, effect: {class: 'Frenzy'}},
 	{name: 'Graceborn', requirement: {class:'Frenzy'}, effect: {class: 'Purify', target: 1}}]},

{id: 'ElementalofGleams', name: 'Elemental of Gleams', rarity: 'Common', image: 'Cards/egw/ElementalofGleams.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Elemental', archetype: 'Luminaut', trait: '', hp: 3, atk: 1, def: 0,
 cost: '{W}', ability: ['Elusive', 'Regenerate'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{2}{w}', effect: {class: 'Summon'}}]},

{id: 'Valkyrie', name: 'Valkyrie', rarity: 'Common', image: 'Cards/egw/Valkyrie.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Celestial', archetype: '', trait: 'Warrior', hp: 5, atk: 2, def: 1,
 cost: '{1}', ability: 'Defiant', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}', effect: {class: 'Summon'}}]},
         
{id: 'LightmaneHorse', name: 'Lightmane Horse', rarity: 'Common', image: 'Cards/egw/LightmaneHorse.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Beast', archetype: '', trait: '', hp: 6, atk: 2, def: 1,
 cost: '{2}{W}', ability: 'Rush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{2}{w}', effect: {class: 'Summon'}}]},

{id: 'SheperdDog', name: 'Sheperd Dog', rarity: 'Common', image: 'Cards/egw/SheperdDog.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Beast', archetype: '', trait: '', hp: 6, atk: 2, def: 1,
 cost: '{W}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{w}', effect: {class: 'Summon'}}]},

{id: 'GuardianOwl', name: 'Guardian Owl', rarity: 'Common', image: 'Cards/egw/GuardianOwl.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Avian', archetype: '', trait: '', hp: 6, atk: 2, def: 1,
 cost: '{W}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{w}', effect: {class: 'Summon'}},
  {name: 'Bloomchant', cost: '{w}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'Inspire', def: 1}},
 ]},

{id: 'SunbatheHills', name: 'Sunbathe Hills', rarity: 'Common', image: 'Cards/egw/SunbatheHills.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 8, cost: '{1}', essence: '{W}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{1}', effect: {class: 'Terraform'}}]},

{id: 'Plains', name: 'Plains', rarity: 'Common', image: 'Cards/egw/Plains.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{0}', effect: {class: 'Terraform'}}]},

{id: 'HaloFlare', name: 'Halo Flare', rarity: 'Common', image: 'Cards/egw/HaloFlare.png', flavor: '', 
 category: 'Spell', color: 'White', type: 'Spell', cost: '{1}{w}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{1}{w}', effect: {class: 'Cast'}}]},

{id: 'EssenceBlessing', name: 'Essence Blessing', rarity: 'Common', image: 'Cards/egw/EssenceBlessing.png', flavor: '', 
 category: 'Spell', color: 'White', type: 'Spell', cost: '{1}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{0}', effect: {class: 'Cast'}}]},
         
// --- EG BLACK --- //
{id: 'VelmiraMistressofSilence', name: 'Velmira, Mistress of Silence', rarity: 'Legendary', image: 'Cards/egb/VelmiraMistressofSilence.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Human', archetype: '', trait: 'Mage', hp: 4, atk: 1, def: 0,
 cost: '{B}', ability: 'Veil', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}},
  {name:'Shadowseal Vigor', activation: {class:'Sealed'}, 
   effect: {class: 'Rally', amount: 1}},
  {name: 'Eternal Silence', requirement: [{class:'Ultimate'}, {class: 'CW'}], 
   effect: {class: 'Seal', amount: 0, target: 1}},
  {name: 'Eternal Silence', cost: '{b}', requirement: [{class:'Ultimate'}, {class: 'CW'}], 
   effect: {class: 'Seal', amount: 2, target: 2}}]},

{id: 'Nocthyra', name: 'Nocthyra', rarity: 'Legendary', image: 'Cards/egb/Nocthyra.png', flavor: '', 
 category: 'Domain', color: 'Black', type: '', hp: 20, cost: '{0}', essence: '{B}', trait: 'Dominion', set: 'ElementaGenesis',
 skill: [{name: 'Life-Tithe', cost: '{b}', requirement: {class: 'CW'}, effect: [{class: 'Soulcost', amount: 1}, {class: 'Draw', amount: 2}]}]},

{id: 'UmbralNova', name: 'Umbral Nova', rarity: 'Legendary', image: 'Cards/egb/UmbralNova.png', flavor: '', 
 category: 'Spell', color: 'Black', type: '', cost: '{2}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{0}', effect: {class: 'Cast'}}]},

{id: 'BroodTyrant', name: 'Brood Tyrant', rarity: 'Rare', image: 'Cards/egb/BroodTyrant.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Dragon', archetype: '', trait: 'Mage', hp: 7, atk: 4, def: 2,
 cost: '{B}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}},
  {name:'Lifetithe', cost: '{B}',
   requirement: {class:'CCW'}, 
   effect: {class: 'Token', token: 'Imp'}}]},

{id: 'GraveweaverWarlock', name: 'Graveweaver Warlock', rarity: 'Rare', image: 'Cards/egb/GraveweaverWarlock.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Brute', archetype: 'Orc', trait: 'Mage', hp: 6, atk: 3, def: 2,
 cost: '{B}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}},
  {name:'Lifetithe', cost: '{B}',
   requirement: {class:'CW'}, 
   effect: {class: 'Token', token: 'Imp'}}]},

{id: 'ElementalofShadows', name: 'Elemental of Shadows', rarity: 'Rare', image: 'Cards/egb/ElementalofShadows.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Elemental', archetype: 'Obscurid', trait: '', hp: 5, atk: 3, def: 0,
 cost: '{b}{b}', ability: ['Ambush','Elusive'], set: 'ElementaGenesis',
 skill: [{name: 'Umbral Discovery', cost: '{b}{b}', effect: [{class: 'Summon'}, {class: 'Search', amount: 1, targetColor: 'Black', targetTrait: 'Terrain'}]},
]},

{id: 'UmbrawindHollow', name: 'Umbrawind Hollow', rarity: 'Rare', image: 'Cards/egb/UmbrawindHollow.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 8, cost: '{1}{b}', essence: '{B}', set: 'ElementaGenesis',
 skill: [{name: 'Silent Quarry', requirement: {class:'CW'},
		  effect: {class: 'Search', amount: 1, targetCategory: 'Creature', targetAbility: 'Ambush'}}]},

{id: 'Mindbreak', name: 'Mindbreak', rarity: 'Rare', image: 'Cards/egb/Mindbreak.png', flavor: '', 
 category: 'Spell', color: 'Black', type: '', cost: '{2}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{0}', effect: {class: 'Cast'}}]},
         
{id: 'ElementalofShades', name: 'Elemental of Shades', rarity: 'Common', image: 'Cards/egb/ElementalofShades.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Elemental', archetype: 'Obscurid', trait: '', hp: 3, atk: 2, def: 0,
 cost: '{B}', ability: ['Ambush','Elusive'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}}]},
         
{id: 'Skeleton', name: 'Skeleton', rarity: 'Common', image: 'Cards/egb/Skeleton.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Undead', archetype: 'Skullframe', hp: 1, atk: 1, def: 0,
 cost: '{0}', ability: 'Immunity', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
 {name: 'Reanimate', cost: '{1}', effect: {class: 'Reanimate'}}]},

{id: 'Zombie', name: 'Zombie', rarity: 'Common', image: 'Cards/egb/Zombie.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Undead', archetype: '', hp: 3, atk: 2, def: 0,
 cost: '{1}', ability: ['Curse','Immunity'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}', effect: {class: 'Summon'}},
 {name: 'Reanimate', cost: '{b}', effect: {class: 'Reanimate'}}]},

{id: 'Ghost', name: 'Ghost', rarity: 'Common', image: 'Cards/egb/Ghost.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Undead', archetype: '', hp: 1, atk: 1, def: 0,
 cost: '{0}', ability: ['Elusive','Intimidate'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
 {name: 'Reanimate', cost: '{b}', effect: {class: 'Reanimate'}}]}, 

{id: 'Bat', name: 'Bat', rarity: 'Common', image: 'Cards/egb/Bat.png', flavor: '', 
 category: 'Creature', color: 'Black', type: ['Beast', 'Avian'], archetype: 'Vampiric', hp: 3, atk: 1, def: 0,
 cost: '{1}', ability: ['Drain','Flying'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}', effect: {class: 'Summon'}}]},
         
{id: 'CarrionCrow', name: 'CarrionCrow', rarity: 'Common', image: 'Cards/egb/CarrionCrow.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Avian', archetype: 'Duskwing', trait: '', hp: 2, atk: 2, def: 0,
 cost: '{1}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}}]},
         
{id: 'Shadowland', name: 'Shadowland', rarity: 'Common', image: 'Cards/egb/Shadowland.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{0}', effect: {class: 'Terraform'}}]},

{id: 'ShadowLeech', name: 'Shadow Leech', rarity: 'Common', image: 'Cards/egb/ShadowLeech.png', flavor: '', 
 category: 'Spell', color: 'Black', type: '', cost: '{b}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{0}', effect: {class: 'Cast'}}]},
         
{id: 'EssencePurge', name: 'Essence Purge', rarity: 'Common', image: 'Cards/egb/EssencePurge.png', flavor: '', 
 category: 'Spell', color: 'Black', type: 'Spell', cost: '{3}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{3}', effect: {class: 'Cast'}}]},
/*
// DRAGONS //

{id: 'VerdarokSylvanThornwing', name: 'Verdarok, Sylvan Thornwing', rarity: 'Legendary', image: 'Cards/Thornwing/VerdarokSylvanThornwing.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Dragon', archetype: 'Thornwing', trait: 'Evolution', hp: 9, atk: 5, def: 3,
 cost: '{4}{G}{G}', ability: ['Flying','Protect'], set: 'ScalesofRuin',
 skill: [
  {name: 'Warden Scutes', cost: '{g}',
   requirement: {class: 'Reveal'},
   effect: {class: 'Inspire', def: 1, spd: 1}},
  {name: 'Defender', 
   activation: {class: 'Defender'},
   effect: {class: 'Search', archetype: 'Thornwing'}},
  {name: 'Evolution', cost: '{g}{g}{g}',
   effect: {class: 'Evolution'}},
  {name: 'Guardian's Rampart', cost: '{g}{g}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}],
   effect: {class: 'Inspire', def: 1, targetType: allDragons}},
 ]},
{id: 'VerdarokMossletFlutterwing', name: 'Verdarok, Mosslet Flutterwing', rarity: 'Legendary', image: 'Cards/Thornwing/VerdarokMossletFlutterwing.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Dragon', archetype: 'Thornwing', hp: 4, atk: 2, def: 1,
 cost: '{G}{G}', ability: ['Flying','Protect'], set: 'WyrmheartAwakening',
 skill: [{name: 'Summon', cost: '{g}', effect: {class: 'Summon'}},
  {name: 'Rootwyrm Rising', cost: '{g}',
   requirement: {class: 'Reveal'},
   effect: {class: 'Inspire', ability: 'Protect', def: 1}},
  {name: 'Warden Scutes', 
   activation: {class: 'Defender'},
   effect: {class: 'Search', archetype: 'Thornwing', amount: 1}},
  {name: 'Evolve', cost: '{g}',
   effect: {class: 'Evolve'}},
  {name: 'Groveguard', cost: '{g}{g}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}],
   effect: {class: 'Mossbound Terrain'}},
 ]},
{id: 'ThicketmistDrakeling', name: 'Thicketmist Drakeling', rarity: 'Legendary', image: 'Cards/Thornwing/ThicketmistDrakeling.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Dragon', archetype: 'Thornwing', hp: 7, atk: 2, def: 1,
 cost: '{G}{G}', ability: ['Flying','Protect'], set: 'WyrmheartAwakening',
 skill: [{name: 'Summon', cost: '{1}{g}', effect: {class: 'Summon'}},
  {name: 'Reveal', cost: '{g}',
   requirement: {class: 'Reveal'},
   effect: {class: 'Inspire', ability: 'Protect', def: 1}},
  {name: 'Evolve', cost: '{g}',
   effect: {class: 'Evolve'}},
  {name: 'Verdant Galeburst', cost: '{g}{g}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}],
   effect: {class: 'Mossbound Terrain'}},
 ]},
{id: 'VerdantLindwurm', name: 'Verdant Lindwurm', rarity: 'Legendary', image: 'Cards/Thornwing/VerdantLindwurm.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Dragon', archetype: 'Thornwing', hp: 7, atk: 2, def: 1,
 cost: '{G}{G}', ability: ['Flying','Protect'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Reveal', cost: '{g}',
   requirement: {class: 'Reveal'},
   effect: {class: 'Inspire', ability: 'Protect', def: 1}},
  {name: 'Defender', 
   activation: {class: 'Defender'},
   effect: {class: 'Search', archetype: 'Thornwing', amount: 1}},
  {name: 'Evolve', cost: '{g}',
   effect: {class: 'Evolve'}},
  {name: 'Verdant Galeburst', cost: '{g}{g}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}],
   effect: {class: 'Mossbound Terrain'}},
 ]},

{id: 'PyronyxInfernoBlazingscale', name: 'Pyronyx, Inferno Blazingscale', rarity: 'Legendary', image: 'Cards/Blazingscale/PyronyxInfernoBlazingscale.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Dragon', archetype: 'Blazingscale', trait: 'Evolution', hp: 8, atk: 5, def: 2,
 cost: '{3}{R}{R}', ability: 'Flying', set: 'ScalesofRuin',
 skill: [  {name: 'Evolution', cost: '{r}{r}', effect: {class: 'Evolution'}}
  {name: 'Searing Outbreak', cost: '{R}',
   requirement: {class: 'Reveal'}
   effect: {class: 'Burn', amount: 3}},
  {name: 'Cataclysmic Blaze', cost: '{r}{r}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Burn', amount: 3, target: 3}},
 ]},
{id: 'PyronyxEmberBreeze', name: 'Pyronyx, Ember Breeze', rarity: 'Legendary', image: 'Cards/Blazingscale/PyronyxEmberBreeze.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Dragon', archetype: 'Blazingscale', hp: 4, atk: 3, def: 1,
 cost: '{R}{R}', ability: 'Flying', set: 'WyrmheartAwakening',
 skill: [{name: 'Summon', cost: '{r}', effect: {class: 'Summon'}},
  {name: 'Ignis Flutter', cost: '{R}',
   effect: {class: 'Dash'}},
  {name: 'Searing Outbreak', cost: '{r}{r}{R}',
   requirement: [{class: 'Ultimate'}, {class: 'CW'}], 
   effect: {class: 'Burn', amount: 3, target: 2}},
 ]},

{id: 'AbyndraTidalAbyssdrake', name: 'Abyndra, Tidal Abyssdrake', rarity: 'Legendary', image: 'Cards/Abyssdrake/AbyndraTidalAbyssdrake.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Dragon', archetype: 'Abyssdrake', trait: 'Evolution', hp: 19, atk: 4, def: 2,
 cost: '{5}{U}{U}', ability: ['Flying','Veil'], set: 'ScalesofRuin',
 skill: [{name: 'Summon', cost: '{u}{u}', effect: {class: 'Summon'}},
  {name: 'Reveal', cost: '{u}',
   requirement: {class: 'Reveal'}
   effect: {class: 'Search', name category: 'Domain', color: 'Blue'}},
  {name: 'Ocean's Requiem', cost: '{u}{u}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: {class: '', amount: 3, status: 'Burn'}},
  {name: 'Evolution', cost: '{u}{u}{u}',
   effect: {class: 'Evolution'}},
  {name: 'Maelstrom Oblivion', cost: '{u}{u}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: [{class: 'Soak', amount: 2, target: 3}, {class: 'Rain'}]}
 ]},
{id: 'AbyndraRipplefinGloomlet', name: 'Abyndra, Ripplefin Gloomlet', rarity: 'Legendary', image: 'Cards/Abyssdrake/AbyndraRipplefinGloomlet.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Dragon', archetype: 'Abyssdrake', hp: 7, atk: 2, def: 1,
 cost: '{U}{U}', ability: ['Flying','Veil'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Reveal', cost: '{u}',
   requirement: {class: 'Reveal'},
   effect: {effect: 'Search', category: 'Domain', color: 'Blue'}},
  {name: 'Evolve', cost: '{u}',
   effect: {class: 'Evolve'}},
  {name: 'Mirror of the Deep', cost: '{u}{u}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: {class: '', amount: 3, status: 'Burn'}},
 ]},

{id: 'VoltrazekTempestStormrazor', name: 'Voltrazek, Tempest Stormrazor', rarity: 'Legendary', image: 'Cards/Stormrazor/VoltrazekTempestStormrazor.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Dragon', archetype: 'Stormrazor', trait: 'Evolution', hp: 8, atk: 4, def: 2,
 cost: '{3}{Y}{Y}', ability: 'Flying', set: 'ScalesofRuin',
 skill: [
  {name: 'Reveal', cost: '{y}',
   requirement: {class: 'Reveal'},
   effect: {class: 'Search', category: 'Spell', color: 'Yellow'}},
  {name: 'Evolution', cost: '{y}{y}{y}',
   effect: {class: 'Evolution'}},
  {name: 'Electro Burst', cost: '{y}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: {class: 'Strike', amount: 1, target: 3}},
 ]},
{id: 'VoltrazekSparkletStormling', name: 'Voltrazek, Sparklet Stormling', rarity: 'Legendary', image: 'Cards/Stormrazor/VoltrazekSparkletStormling.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Dragon', archetype: 'Stormrazor', hp: 5, atk: 4, def: 1,
 cost: '{Y}{Y}', ability: 'Flying', set: 'WyrmheartAwakening',
 skill: [{name: 'Summon', cost: '{y}{y}', effect: {class: 'Summon'}},
  {name: 'Overcharge', cost: '{y}{y}{y}',
   effect: [{class: 'Overcharge'}, {class: 'Inspire', ability: 'Rush'}]},
  {name: 'Evolve', cost: '{y}',
   effect: [{class: 'Evolve'}, {class: 'Storm'}]},
  {name: 'Gigavolt Prance', cost: '{y}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: {class: '', amount: 1}},
 ]},

{id: 'MyxarothCursedDreadspine', name: 'Myxaroth, Cursed Dreadspine', rarity: 'Legendary', image: 'Cards/Dreadspine/MyxarothCursedDreadspine.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Dragon', trait: 'Evolution', hp: 13, atk: 4, def: 2,
 cost: '{4}{P}{P}', archetype: 'Dreadspine', ability: ['Flying','Venom'], set: 'ScalesofRuin',
 skill: [
  {name: 'Discard', cost: '{p}',
   requirement: {class:'Discard'},
   effect: {class: 'Poison', amount: 2}},
  {name: 'Void Evolution', cost: '{p}{p}{p}',
   effect: {class: 'Void Evolution'}},
  {name: 'Toxic Miasma', cost: '{p}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Toxic Miasma'}},
 ]},
{id: 'MyxarothToxletMireling', name: 'Myxaroth, Toxlet Mireling', rarity: 'Legendary', image: 'Cards/Dreadspine/MyxarothToxletMireling.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Dragon', archetype: 'Dreadspine', hp: 5, atk: 2, def: 1,
 cost: '{P}{P}', ability: ['Flying','Venom'], set: 'WyrmheartAwakening',
 skill: [{name: 'Summon', cost: '{p}{p}', effect: {class: 'Summon'}},
  {name: 'Discard', cost: '{p}',
   requirement: {class:'Discard'},
   effect: {class: 'Decay'}},
  {name: 'Acidblight Swell', cost: '{p}{p}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Toxic Miasma'}},
  {name: 'Evolve', cost: '{p}',
   effect: {class: 'Evolve'}}
 ]},

{id: 'FerronyxTerraColossus', name: 'Ferronyx, Terra Colossus', rarity: 'Legendary', image: 'Cards/Terraclaw/FerronyxTerraColossus.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Dragon', archetype: 'Ironclaw', trait: 'Evolution', hp: 9, armor: 7, atk: 5, def: 3,
 cost: '{4}{C}{C}', ability: ['Armor','Flying'], set: 'ScalesofRuin',
 skill: [
  {name: 'Reveal', cost: '{c}',
   requirement: {class: 'Reveal},
   effect: {class: 'Armor'}},
  {name: 'Unbreakable Adamant', cost: '{c}{c}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}], 
   effect: {class: 'Armor', target: playersCreatures}},
  {name: 'Evolution', cost: '{c}{c}',
   effect: {class: 'Evolution'}}
 ]},
{id: 'FerronyxShardletGrindlewyrm', name: 'Ferronyx, Shardlet Grindlewyrm', rarity: 'Legendary', image: 'Cards/Terraclaw/FerronyxShardletGrindlewyrm.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Dragon', archetype: 'Ironclaw', hp: 3, armor: 4, atk: 4, def: 2,
 cost: '{C}{C}', ability: ['Armor','Flying'], set: 'WyrmheartAwakening',
 skill: [{name: 'Summon', cost: '{c}{c}', effect: {class: 'Summon'}},
  {name: 'Reveal', cost: '{c}',
   requirement: {class: 'Reveal},
   effect: {class: 'Armor'}},
  {name: 'Forgelight Mantle', cost: '{c}{c}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}], 
   effect: {class: 'Armor', target: playersCreatures}},
  {name: 'Evolve', cost: '{c}',
   effect: {class: 'Evolve'}}
 ]},

{id: 'NoctyrosUmbralNightshroud', name: 'Noctyros, Umbral Nightshroud', rarity: 'Legendary', image: 'Cards/Nightshroud/NoctyrosUmbralNightshroud.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Dragon', archetype: 'Nightshroud', trait: 'Evolution', hp: 12, atk: 6, def: 2,
 cost: '{4}{B}{B}', ability: ['Flying','Dusk'], set: 'ScalesofRuin',
 skill: [
  {name: 'Discard', cost: '{B}',
   requirement: {class:'Discard'}, 
   effect: {class: 'Mill', type: 'Dragon'}},
  {name: 'Nightfall Surge', cost: '{B}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: ''}},
  {name: 'Void Evolution', cost: '{b}{b}',
   effect: {class: 'Void Evolution'}}
 ]},
{id: 'NoctyrosDuskWhisper', name: 'Noctyros, Dusk Whisper', rarity: 'Legendary', image: 'Cards/Nightshroud/NoctyrosDuskWhisper.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Dragon', archetype: 'Nightshroud', hp: 5, atk: 3, def: 1,
 cost: '{4}{B}{B}', ability: 'Flying', set: 'WyrmheartAwakening',
 skill: [{name: 'Summon', cost: '{b}{b}', effect: {class: 'Summon'}},
  {name: 'Discard', cost: '{B}',
   requirement: {class:'Discard'}, 
   effect: {class: 'Mill', type: 'Dragon'}},
  {name: 'Nightfall Surge', cost: '{B}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: ''}},
  {name: 'Evolve', cost: '{b}',
   effect: [{class: 'Evolve'}, {class: 'Dusk'}]},
 ]},

{id: 'SolarythRadiantSolarwyrm', name: 'Solaryth, Radiant Solarwyrm', rarity: 'Legendary', image: 'Cards/Solarwyrm/SolarythRadiantSolarwyrm.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Dragon', archetype: 'Solarwyrm', trait: 'Evolution', hp: 17, atk: 4, def: 2,
 cost: '{4}{W}{W}', ability: ['Flying','Aegis'], set: 'ScalesofRuin',
 skill: [
  {name: 'Seal', cost: '{W}{W}',
   requirement: {class: 'CCW'},
   effect: {class: 'Seal'}},
  {name: 'Celestial Scales', cost: '{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CW'}],
   effect: {class: 'Inspire', ability: 'Aegis'}},
  {name: 'Evolution', cost: '{w}{w}{w}',
   effect: {class: 'Evolution'}}
 ]},
{id: 'SolarythGlintletDawnbloom', name: 'Solaryth, Glintlet Dawnbloom', rarity: 'Legendary', image: 'Cards/Solarwyrm/SolarythGlintletDawnbloom.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Dragon', archetype: 'Solarwyrm', hp: 6, atk: 2, def: 1,
 cost: '{W}{W}', ability: ['Flying','Aegis'], set: 'WyrmheartAwakening',
 skill: [{name: 'Summon', cost: '{b}{b}', effect: {class: 'Summon'}},
  {name: 'Seal', cost: '{W}{W}',
   requirement: {class: 'CCW'},
   effect: {class: 'Seal'}},
  {name: 'Dawnveil Benediction', cost: '{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CW'}],
   effect: {class: 'Daybreak Field'}},
  {name: 'Evolve', cost: '{w}',
   effect: {class: 'Evolve'}}
 ]},

{id: 'FaelyraWildhornEmpress', name: 'Faelyra, Wildhorn Empress', rarity: 'Legendary', image: 'Cards/Satyr/FaelyraWildhornEmpress.png', flavor: '', imageFullArt: 'Cards/Satyrs/FaelyraSatyrEmpressFA.png', flavor: '',
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Satyr', trait: 'Mage', hp: 6, atk: 1, def: 0,
 cost: '{G}', ability: '', set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{g}', effect: {class: 'Summon'}},
  {name: 'Manifest', cost: '{g}'
   requirement: [{class: 'Special}, {class: 'CW'}],
   effect: {class: 'Token', tokenChoices: ['SatyrTokenGreen', 'SatyrTokenRed', 'SatyrTokenPurple'], amount: 1}},
  {name: 'Satyr Echo',
   activation: {class: 'Echo', type: 'Satyr'},
   effect: {class: 'Heal', amount: 3}},
  {name: 'Chorus of the Wild', cost: '{g}{g}',
   requirement: [{class: 'Ultimate'}, {class: 'CW'}],
   effect: {class: 'Heal', amount: 2, target: 3}}
 ]},

{id: 'LyssaraScarletVindicator', name: 'Lyssara, Scarlet Vindicator', rarity: 'Legendary', image: 'Cards/Fireland/LyssaraScarletVindicator.png', flavor: '', 
 category: 'Creature', color: ['Black','Red'], type: 'Human', archetype: '', trait: 'Warrior', hp: 7, atk: 3, def: 1,
 cost: '{r}{c}', ability: 'Rush', set: 'StandardPack',
 skill: [
  {name: 'Scarlet Reprisal', cost: '{r}',
   requirement: {class: 'Special', class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Scarlet Crescent', cost: '{R}{B}',
   requirement: {class: 'Special', class: 'CCW'},
   effect: {class: 'Exploit', amount: 1, target:3}}
 ]},
{id: 'SylvaniaThornvaleQueen', name: 'Sylvania, Thornvale Queen', rarity: 'Legendary', image: 'Cards/Elf/SylvaniaThornvaleQueen.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Elf', trait: 'Mage', hp: 6, atk: 1, def: 0,
 cost: '{G}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{g}', effect: {class: 'Summon'}},
  {name: 'Bloomchant', cost: '{g}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'essenceGreen', amount: 2}},
  {name: "Briar Queen's Grasp", cost: '{G}',
   requirement: [{class:'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Bind', amount: 1, target: 2}},
  ]}, 
{id: 'KaelyraFirelandHeiress', name: 'Kaelyra, Fireland Heiress', rarity: 'Legendary', image: 'Cards/Fireland/KaelyraFirelandHeiress.png', flavor: '', imageFullArt: 'Cards/Fireland/KaelyraFirelandHeiressFA.png', flavor: '',
 category: 'Creature', color: ['Red','Black'], type: 'Demon', archetype: 'Fireland', trait: 'Mage', hp: 8, atk: 2, def: 0,
 cost: '{R}{R}{B}', ability: 'Burn', set: 'Savage Territory',
 skill: [{name: 'Summon', cost: '{r}', effect: {class: 'Summon'}},
  {name: 'Manifest', cost: '{r}',
   effect: {class: 'Token', name: 'Emberling'}},
  {name: 'Flametongue Invocation', cost: '{R}{B}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Invoke', archetype: 'Fireland'}}
 ]},
{id: 'ZaryonPearlhavenCommander', name: 'Zaryon, Pearlhaven Commander', rarity: 'Legendary', image: 'Cards/Merfolk/ZaryonPearlhavenCommander.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Merfolk', archetype: '', trait: 'Warrior', hp: 12, atk: 2, def: 1,
 cost: '{U}', ability: ['Dive','Pierce'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{u}', effect: {class: 'Summon'}},
  {name: 'Deepkin Rally', cost: '{u}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'Token', tokenChoices: ['MerfolkWarrior', 'MerfolkMermaid'], amount: }},
  {name: 'Tidepiercer Vortex', cost: '{u}{u}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Soak', amount: 3, target: 3, zone: 'opponentCreatures'}}
 ]},
{id: 'GravokDrakzulTyrant', name: 'Gravok, Drakzul Tyrant', rarity: 'Legendary', image: 'Cards/Brute/GravokDrakzulTyrant.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Brute', archetype: '', trait: 'Warrior', hp: 10, atk: 2, def: 1,
 cost: '{C}', ability: ['Armor','Crush'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{c}', effect: {class: 'Summon'}},
  {name: 'Twin Impact', cost: '{c}',
   requirement: [{class:'Special'}, {class: 'CCW'}], 
   effect: {class: 'Strike', target: 2, amount: 2}},
  {name: 'Seismic Smite', cost: '{c}{C}',
   requirement: [{class:'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Strike', target: 3, amount: 2}}
 ]},
{id: 'VorgannaCrimsonBlade', name: 'Vorganna, Crimson Blade', rarity: 'Legendary', image: 'Cards/Fireland/VorgannaCrimsonBlade.png', flavor: '', 
 category: 'Creature', color: ['Black','Red'], type: '', archetype: '', trait: 'Warrior', hp: 7, atk: 3, def: 1,
 cost: '{B}{R}', ability: ['Burn','Rush'], set: 'StandardPack',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}},
  {name: 'Pyrecleave', cost: '{r}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Scarlet Crescent', cost: '{R}{B}',
   requirement: {class: 'CCW'},
   effect: {class: 'Exploit', amount: 1, target:3}}
 ]},

{id: 'TydrosCoralboundTidebreaker', name: 'Tydros, Coralbound Tidebreaker', rarity: 'Legendary', image: 'Cards/Coralbound/TydrosCoralboundTidebreaker.png', flavor: '', 
 category: 'Creature', color: ['Blue','Gray'], type: 'Merfolk', archetype: 'Coralbound', trait: 'Warrior', hp: 12, atk: 2, def: 0,
 cost: '{U}{U}{C}', ability: 'Dive', set: 'IronbornProtocol',
 skill: [{name: 'Summon', cost: '{u}', effect: {class: 'Summon'}},
  {name: 'Brine Embrace', cost: '{u}',
   requirement: {class: 'CCW'},
   effect: {class: 'Inspire', drenchedArmor: 3, target: 1}},
  {name: 'Hydrosurge Wave', cost: '{u}{u}',
   requirement: {class: 'CCW'},
   effect: {class: 'Soak', amount: 2, target: 3}}
 ]},
 
{id: 'AstranyraThunderbane', name: 'Astranyra, Thunderbane', rarity: 'Legendary', image: 'Cards/Demon/AstranyraThunderbane.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Human', archetype: '', trait: 'Warrior', hp: 8, atk: 1, def: 0,
 cost: '{y}{y}', ability: 'Pierce', set: 'StandardPack',
 skill: [{name: 'Summon', cost: '{y}', effect: {class: 'Summon'}},
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
 
{id: 'VeniryssSpiderPrincess', name: 'Veniryss, Spider Princess', rarity: 'Legendary', image: 'Cards/Silkbound/VeniryssSpiderPrincess.png', flavor: '', 
 category: 'Creature', color: ['Purple','Green'], type: 'Faefolk', archetype: ['Elf','Silkbound'], trait: 'Mage', hp: 8, atk: 1, def: 0,
 cost: '{P}{G}', ability: 'Venom', set: 'StandardPack',
 skill: [{name: 'Summon', cost: '{g}', effect: {class: 'Summon'}},
  {name: 'Manifest', cost: '{p}{g}',
   requirement: {class: 'CW'},
   effect: {class: 'Token', token: 'SpiderToken', amount: 2}},
  {name: 'Silken Dominion', cost: '{P}{G}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Bind', amount: 0, target: 4}}
 ]},
{id: 'MordrathVirkulPhantom', name: 'Mordrath, Virkul Phantom', rarity: 'Legendary', image: 'Cards/Ghost/MordrathVirkulPhantom.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Undead', archetype: 'Ghost', trait: 'Warrior', hp: 6, atk: 1, def: 1,
 cost: '{P}', ability: ['Immunity','Venom'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{p}', effect: {class: 'Summon'}},
  {name: 'Reanimate', cost: '{1}{P}{P}',
   effect: {class: 'Reanimate'}},
  {name: 'Blightfall Slash', cost: '{P}{P}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1}},
  {name: 'Toxic Miasma', cost: '{p}{p}',
   requirement: [{class:'Ultimate'}, {class: 'CW'}], 
   effect: {class: 'Miasma', def: 1}},
 ]},
{id: 'RaukharKnightofDuskwings', name: 'Raukhar, Knight of Duskwings', rarity: 'Legendary', image: 'Cards/Duskwing/RaukharKnightofDuskwings.png', flavor: '', 
 category: 'Creature', color: ['Black','Yellow'], type: 'Avian', archetype: 'Duskwing', trait: 'Warrior', hp: 7, atk: 3, def: 1,
 cost: '{B}{Y}', ability: ['Flying','Scavenger'], set: 'FeatheredOmen',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}},
  {name: 'Dash', cost: '{Y}',
   effect: {class: 'Dash'}},
  {name: 'Shadowfeather Storm', cost: '{B}{Y}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 2, target: 3}}
 ]},

{id: 'GarudaWingsofZephyra', name: 'Garuda, Wings of Zephyra', rarity: 'Legendary', image: 'Cards/Zephyra/GarudaWingsofZephyra.png', flavor: '', 
 category: 'Creature', color: ['Yellow','White'], type: 'Avian', archetype: 'Zephyra', trait: 'Warrior', hp: 9, atk: 2, def: 1,
 cost: '{Y}{W}', ability: ['Flying'], set: 'FeatheredOmen',
 skill: [{name: 'Summon', cost: '{y}', effect: {class: 'Summon'}},
  {name:'Dash', cost: '{w}',
   effect: {class: 'Dash'}},
  {name: 'Featherfall Tempest', cost: '{Y}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1, target: 3}}
 ]},
{id: 'EcliphosAethercruxPrime', name: 'Ecliphos, Aethercrux Prime', rarity: 'Legendary', image: 'Cards/Lightforge/EcliphosAethercruxPrime.png', flavor: '', 
 category: 'Creature', color:'White', type: 'Construct', archetype: 'Lightforge', trait: 'Warrior', hp: 9, atk: 2, def: 1,
 cost: '{w}{w}', ability: ['Protect'], set: 'FeatheredOmen',
 skill: [{name: 'Summon', cost: '{w}', effect: {class: 'Summon'}},
  {name:'Dash', cost: '{w}',
   effect: {class: 'Dash'}},
  {name: 'Featherfall Tempest', cost: '{Y}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1, target: 3}}
 ]},
{id: 'AethercruxParagon', name: 'Aethercrux Paragon', rarity: 'Legendary', image: 'Cards/Lightforge/AethercruxParagon.png', flavor: '', 
 category: 'Creature', color:'White', type: 'Construct', archetype: 'Lightforge', trait:  'Warrior', hp: 9, atk: 2, def: 1,
 cost: '{w}{w}', ability: ['Protect'], set: 'FeatheredOmen',
 skill: [{name: 'Summon', cost: '{w}', effect: {class: 'Summon'}},
  {name:'Dash', cost: '{w}',
   effect: {class: 'Dash'}},
  {name: 'Featherfall Tempest', cost: '{Y}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1, target: 3}}
 ]},
{id: 'OrbitronExarch', name: 'Orbitron Exarch', rarity: 'Legendary', image: 'Cards/Lightforge/OrbitronExarch.png', flavor: '', 
 category: 'Creature', color:'White', type: 'Construct', archetype: 'Lightforge', trait:  'Warrior', hp: 9, atk: 2, def: 1,
 cost: '{w}{w}', ability: ['Protect'], set: 'FeatheredOmen',
 skill: [{name: 'Summon', cost: '{w}{w}', effect: {class: 'Summon'}},
  {name:'Dash', cost: '{w}',
   effect: {class: 'Dash'}},
  {name: 'Featherfall Tempest', cost: '{Y}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1, target: 3}}
 ]},
{id: 'GalaxionStrider', name: 'GalaxionStrider', rarity: 'Legendary', image: 'Cards/Lightforge/GalaxionStrider.png', flavor: '', 
 category: 'Creature', color:'White', type: 'Construct', archetype: 'Lightforge', trait:  'Warrior', hp: 9, atk: 2, def: 1,
 cost: '{w}{w}', ability: ['Protect'], set: 'CelestialWonders',
 skill: [{name: 'Summon', cost: '{w}', effect: {class: 'Summon'}},
  {name:'Dash', cost: '{w}',
   effect: {class: 'Dash'}},
  {name: 'Featherfall Tempest', cost: '{Y}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1, target: 3}}
 ]},
{id: 'AngelicPaladin', name: 'Angelic Paladin', rarity: 'Common', image: 'Cards/Lightforge/AngelicPaladin.png', flavor: '', 
 category: 'Creature', color:'White', type: 'Construct', archetype: 'Lightforge', trait:  'Warrior', hp: 9, atk: 2, def: 1,
 cost: '{w}{w}', ability: ['Protect'], set: 'CelestialWonders',
 skill: [{name: 'Summon', cost: '{1}{w}', effect: {class: 'Summon'}},
  {name:'Dash', cost: '{w}',
   effect: {class: 'Dash'}},
  {name: 'Featherfall Tempest', cost: '{Y}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1, target: 3}}
 ]},
{id: 'DawnbladeSeraph', name: 'Dawnblade Seraph', rarity: 'Common', image: 'Cards/Seraph/DawnbladeSeraph.png', flavor: '', 
 category: 'Creature', color:'White', type: 'Construct', archetype: 'Lightforge', trait:  'Warrior', hp: 9, atk: 2, def: 1,
 cost: '{w}{w}', ability: ['Protect'], set: 'CelestialWonders',
 skill: [{name: 'Summon', cost: '{w}', effect: {class: 'Summon'}},
  {name:'Dash', cost: '{w}',
   effect: {class: 'Dash'}},
  {name: 'Featherfall Tempest', cost: '{Y}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1, target: 3}}
 ]},
{id: 'DawlightLady', name: 'Dawlight Lady', rarity: 'Common', image: 'Cards/Human/DawlightLady.png', flavor: '', 
 category: 'Creature', color:'White', type: 'Construct', archetype: 'Lightforge', trait:  'Warrior', hp: 9, atk: 2, def: 1,
 cost: '{w}{w}', ability: ['Protect'], set: 'CelestialWonders',
 skill: [{name: 'Summon', cost: '{w}', effect: {class: 'Summon'}},
  {name:'Dash', cost: '{w}',
   effect: {class: 'Dash'}},
  {name: 'Featherfall Tempest', cost: '{Y}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1, target: 3}}
 ]},

{id: 'NyzarielArchdemonDuchess', name: 'Nyzariel, Archdemon Duchess', rarity: 'Legendary', image: 'Cards/Demon/NyzarielArchdemonDuchess.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Demon', archetype: 'Archdemon', trait: 'Mage', hp: 6, atk: 2, def: 0,
 cost: '{b}{b}', ability: '', set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}},
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
{id: 'ShadeWisp', name: 'Shade Wisp', rarity: 'Common', image: 'Cards/Obscurid/ShadeWisp.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Elemental', archetype: 'Obscurid', trait: '', hp: 2, atk: 2, def: 0,
 cost: '{b}{b}', ability: '', set: 'ShadowsBeyond',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
{id: 'ShadeMurkkin', name: 'Shade Murkkin', rarity: 'Common', image: 'Cards/Obscurid/ShadeMurkkin.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Elemental', archetype: 'Obscurid', trait: '', hp: 2, atk: 2, def: 0,
 cost: '{b}{b}', ability: '', set: 'ShadowsBeyond',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}},
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
{id: 'ShadeReaver', name: 'Shade Reaver', rarity: 'Rare', image: 'Cards/Obscurid/ShadeReaver.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Elemental', archetype: 'Obscurid', trait: '', hp: 2, atk: 2, def: 0,
 cost: '{b}{b}', ability: '', set: 'ShadowsBeyond',
 skill: [{name: 'Summon', cost: '{1}{b}', effect: {class: 'Summon'}},
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
{id: 'ShadeColossus', name: 'Shade Colossus', rarity: 'Rare', image: 'Cards/Obscurid/ShadeColossus.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Elemental', archetype: 'Obscurid', trait: '', hp: 2, atk: 2, def: 0,
 cost: '{b}{b}', ability: '', set: 'ShadowsBeyond',
 skill: [{name: 'Summon', cost: '{5}{b}', effect: {class: 'Summon'}},
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
{id: 'ShadowgearScout', name: 'Shadowgear Scout', rarity: 'Rare', image: 'Cards/Obscurid/ShadowgearScout.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Construct', archetype: 'Shadowgear', trait: '', hp: 2, atk: 2, def: 0,
 cost: '{b}{b}', ability: '', set: 'ShadowsBeyond',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}},
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
{id: 'ShadowgearAutomaton', name: 'Shadowgear Automaton', rarity: 'Rare', image: 'Cards/Obscurid/ShadowgearAutomaton.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Construct', archetype: 'Shadowgear', trait: '', hp: 2, atk: 2, def: 0,
 cost: '{b}{b}', ability: '', set: 'ShadowsBeyond',
 skill: [{name: 'Summon', cost: '{1}{b}', effect: {class: 'Summon'}},
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
 
{id: 'WildHuntress', name: 'Wild Huntress', rarity: 'Common', image: 'Cards/Faefolk/WildHuntress.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Satyr', trait: 'Warrior', hp: 7, atk: 4, def: 2,
 cost: '{1}{g}', ability: 'Rush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}{g}', effect: {class: 'Summon'}}]},
{id: 'FaunRanger', name: 'Faun Ranger', rarity: 'Common', image: 'Cards/Faefolk/FaunRanger.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Satyr', trait: 'Ranger', hp: 6, atk: 3, def: 1,
 cost: '{1}{g}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}{g}', effect: {class: 'Summon'}}]},
{id: 'FaunDiviner', name: 'Faun Diviner', rarity: 'Common', image: 'Cards/Faefolk/FaunDiviner.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Satyr', hp: 7, atk: 1, def: 0,
 cost: '{1}{g}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}{g}', effect: {class: 'Summon'}}]},
{id: 'SummitWatcher', name: 'Summit Watcher', rarity: 'Common', image: 'Cards/Faefolk/SummitWatcher.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Faefolk', archetype: 'Satyr', hp: 7, atk: 1, def: 1,
 cost: '{c}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{c}', effect: {class: 'Summon'}}]},
{id: 'WildhornRavager', name: 'Wildhorn Ravager', rarity: 'Common', image: 'Cards/Faefolk/WildhornRavager.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Faefolk', archetype: 'Satyr', hp: 7, atk: 3, def: 1,
 cost: '{1}{c}', ability: 'Rush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}{c}', effect: {class: 'Summon'}}]},
{id: 'ElderwoodOccultist', name: 'Elderwood Occultist', rarity: 'Common', image: 'Cards/Faefolk/ElderwoodOccultist.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Faefolk', archetype: 'Satyr', trait: 'Mage', hp: 4, atk: 2, def: 0,
 cost: '{p}', ability: '', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{p}', effect: {class: 'Summon'}},
  {name:'Discard', cost: '{r}',
   requirement: {class: 'Discard'},
   effect: {class: 'Strike', amount: 0, status: 'Burn'}},
 ]},

{id: 'HeartwoodEmeralds', name: 'Heartwood Emeralds', rarity: 'Common', image: 'Cards/ecg/HeartwoodEmeralds.png', flavor: '', 
 category: 'Artifact', color: 'Green', type: 'Relic', archetype: 'Heartwood', hp: 8, cost: '{1}{g}', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{1}{g}', effect: {class: 'Equip'}}]},
 
{id: 'EmeraldVeil', name: 'Emerald Veil', rarity: 'Rare', image: 'Cards/ecg/EmeraldVeil.png', flavor: '', 
 category: 'Domain', color: 'Green', type: '', hp: 8, cost: '{g}', essence: '{G}', trait: 'Terrain', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{g}', effect: {class: 'Terraform'}},
  {name: 'Flourish', cost: '{g}', requirement: {class: 'CW'}, effect: {class: 'Search', trait: 'Terrain'}}]},

{id: 'Fire Pixie', name: 'Fire Pixie', rarity: 'Common', image: 'Cards/Faefolk/FirePixie.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Faefolk', archetype: 'Fairy', hp: 3, atk: 2, def: 0,
 cost: '{0}', ability: ['Burn','Flying'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

{id: 'Hellcharger', name: 'Hellcharger', rarity: 'Common', image: 'Cards/Demon/Hellcharger.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Warrior', archetype: 'Fireland', hp: 3, atk: 2, def: 0,
 cost: '{1}', ability: 'Burn', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}', effect: {class: 'Summon'}}]},
{id: 'WaterElemental', name: 'Water Elemental', rarity: 'Common', image: 'Cards/Elemental/WaterElemental.png',  flavor: '',
 category: 'Creature', color: 'Blue', type: 'Elemental', archetype: 'Hydral', hp: 5, atk: 2, def: 0,
 cost: '{U}', ability: ['Elusive','Soak'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{u}', effect: {class: 'Summon'}}]},
{id: 'DesertWolf', name: 'Desert Wolf', rarity: 'Common', image: 'Cards/Beast/DesertWolf.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Beast', archetype: 'Moonfang', hp: 3, atk: 2, def: 0,
 cost: '{1}', ability: 'Ambush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}', effect: {class: 'Summon'}}]},
{id: 'Golemites', name: 'Golemites', rarity: 'Common', image: 'Cards/Elemental/Golemites.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Elemental', archetype: 'Golemheart', hp: 3, armor: 1, atk: 2, def: 0,
 cost: '{0}', ability: 'Armor', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Arrival', cost: '{c}',
   activation: {class: 'Arrival'},
   effect: {class: 'Token', name: 'Golemite'}},
  {name: 'Echo', 
   activation: {class: 'Echo'},
   effect: {class: 'Search', type: 'Golem'}},
 ]},

{id: 'Wolf', name: 'Wolf', rarity: 'Common', image: 'Cards/Beast/Wolf.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Beast', archetype: 'Moonfang', hp: 3, atk: 2, def: 0,
 cost: '{1}', ability: 'Ambush', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}', effect: {class: 'Summon'}},
  {name: 'Transform', cost: '{b}{b}',
   effect: {class: 'Transform', name: 'Werewolf'}},
 ]},

{id: 'Imp', name: 'Imp', rarity: 'Common', image: 'Cards/Demon/Imp.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Demon', archetype: '', hp: 1, atk: 2, def: 0,
 cost: '{1}', ability: ['Ambush','Flying'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}', effect: {class: 'Summon'}}]},
{id: 'Vampire', name: 'Vampire', rarity: 'Common', image: 'Cards/Vampiric/Vampire.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Undead', archetype: 'Vampiric', hp: 3, atk: 2, def: 0,
 cost: '{1}{B}', ability: ['Drain','Flying'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{1}{b}', effect: {class: 'Summon'}}]},
 
{id: 'ForestWarrior', name: 'Forest Warrior', rarity: 'Rare', image: 'Cards/Arbor/ForestWarrior.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Construct', archetype: 'Arbor', trait: 'Warrior', hp: 6, atk: 3, def: 1, cost: '{1}{G}', 
 ability: ['Drain','Rush'], set: 'ElementaGenesis',
 skill: [
  {name: 'Dash', cost: '{G}',
   effect: {class: 'Dash'}}
 ]},
{id: 'ForestMage', name: 'Forest Mage', rarity: 'Rare', image: 'Cards/Arbor/ForestMage.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: 'Mage', hp: 5, atk: 2, def: 1, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'ArborColossus', name: 'Arbor Colossus', rarity: 'Rare', image: 'Cards/Arbor/ArborColossus.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: 'Mage', hp: 5, atk: 2, def: 0, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'GroveMage', name: 'Grove Mage', rarity: 'Rare', image: 'Cards/Arbor/GroveMage.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: 'Mage', hp: 5, atk: 2, def: 0, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'GroveWatcher', name: 'Grove Watcher', rarity: 'Rare', image: 'Cards/Arbor/GroveWatcher.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: 'Mage', hp: 5, atk: 2, def: 0, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'VerdantSage', name: 'Verdant Sage', rarity: 'Rare', image: 'Cards/Arbor/VerdantSage.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: 'Mage', hp: 5, atk: 2, def: 0, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},

{id: 'VerdantGolemite', name: 'Verdant Golemite', rarity: 'Rare', image: 'Cards/Arbor/VerdantGolemite.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: '', hp: 5, atk: 2, def: 0, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'SylvanManifestation', name: 'Sylvan Manifestation', rarity: 'Rare', image: 'Cards/Arbor/SylvanManifestation.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: '', hp: 5, atk: 2, def: 0, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'VerdaraSoldier', name: 'Verdara Soldier', rarity: 'Rare', image: 'Cards/Arbor/VerdaraSoldier.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Construct', archetype: 'Arbor', trait: 'Warrior', hp: 9, atk: 3, def: 2, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'JadebarkWarden', name: 'Jadebark Warden', rarity: 'Rare', image: 'Cards/Arbor/JadebarkWarden.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: 'Warrior', hp: 5, atk: 2, def: 0, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'ElarisGroveLeafcaller', name: 'Elaris, Grove Leafcaller', rarity: 'Rare', image: 'Cards/Arbor/ElarisGroveLeafcaller.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', trait: 'Mage', hp: 5, atk: 2, def: 0, cost: '{1}{G}', 
 ability: '', set: 'ElementaGenesis'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'WoodlandCentaur', name: 'Woodland Centaur', rarity: 'Rare', image: 'Cards/Hybrid/WoodlandCentaur.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Beast', archetype: 'Hybrid', hp: 8, atk: 3, def: 2, cost: '{1}{G}', 
 ability: ['Leap','Rush'], set: 'SavageTerritory'},

{id: 'DragonEgg', name: 'Dragon Egg', rarity: 'Common', image: 'Cards/Dragon/DragonEgg.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Dragon', hp: 1, atk: 0, def: 0, cost: '{0}', 
 archetype: '', ability: ['Fire Armor'], skill: 'Awaken', set: 'WyrmheartAwakening'},

{id: 'WaterWyrm', name: 'Water Wyrm', rarity: 'Legendary', image: 'Cards/Abyssdrake/WaterWyrm.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: ['Dragon','Elemental'], archetype: ['Abyssdrake', 'Hydral'], hp: 6, atk: 2, def: 0,
 cost: '{1}{U}', ability: ['Dive','Elusive','Soak'], set: 'WyrmheartAwakening'},

{id: 'ZephyraHarpy', name: 'Zephyra Harpy', rarity: 'Rare', image: 'Cards/Zephyra/ZephyraHarpy.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Avian', archetype: 'Zephyra', hp: 7, atk: 3, def: 1,
 cost: '{1}{Y}{Y}', ability: 'Flying', set: 'FeatheredOmen',
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'}
   effect: {class: 'Token', name: 'Treant'}},
 ]},
{id: 'AnvilguardDwarf', name: 'Anvilguard Dwarf', rarity: 'Common', image: 'Cards/Brute/AnvilguardDwarf.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Brute', archetype: 'Dwarf', trait: 'Warrior', hp: 8, atk: 4, def: 3,
 cost: '{1}{c}', ability: 'Ambush', set: 'ElementaGenesis'},
{id: 'DrakzulBrute', name: 'Drakzul Brute', rarity: 'Common', image: 'Cards/Brute/DrakzulBrute.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Brute', archetype: 'Dwarf', trait: 'Warrior', hp: 8, atk: 3, def: 2,
 cost: '{1}{c}', ability: 'Crush', set: 'EchoesofCreation'},

{id: 'SatyrRitualist', name: 'Satyr Ritualist', rarity: 'Rare', image: 'Cards/Satyr/SatyrRitualist.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Faefolk', archetype: 'Satyr', trait: 'Mage', hp: 4, atk: 2, def: 0, cost: '{P}', 
 ability: 'Spellboost', skill: 'Arrival', set: 'EchoesofCreation',
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'}
   effect: {class: 'Search', color: 'Purple'}},
 ]},
{id: 'TreantWitch', name: 'Treant Witch', rarity: 'Rare', image: 'Cards/Arbor/TreantWitch.png', flavor: '', 
 category: 'Creature', color: ['Green','Black'], type: 'Elemental', archetype: 'Arbor', trait: 'Mage', hp: 8, atk: 3, def: 1, cost: '{1}{G}{B}', 
  ability: '', set: 'FracturedOrigins',
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'}
   effect: {class: 'Token', name: 'Treant'}},
  {name: 'Manifest', cost: '{g}{b}'
   requirement: [{class: 'Special}, {class: 'CW'}],
   effect: {class: 'Token', tokenChoices: 'TreantToken', amount: 1}},
  {name: 'Recycle', cost: '{g}{b}',
   requirement: {class: 'Recycle'},
   effect: {class: 'Token', name: 'Treant'}}
 ]},
{id: 'AngelicWarrior', name: 'Angelic Warrior', rarity: 'Common', image: 'Cards/Seraph/AngelicWarrior.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Celestial', archetype: 'Seraph', trait: 'Warrior', hp: 6, atk: 3, def: 2,
 cost: '{1}{W}', ability: 'Flying', set: 'StandardPack'},

{id: 'HeraldofLight', name: 'Herald of Light', rarity: 'Rare', image: 'Cards/BasicCreatures/HeraldofLight.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Construct', archetype: 'Seraph', hp: 8, atk: 2, def: 1,
 cost: '{1}{W}', ability: ['Flying','Aegis'], set: 'ElementaGenesis',
  skill: [
  {name: 'XXX', 
   requirement: {class: 'CW'},
   effect: {class: 'Essence', color: 'White'}}
 ]},
{id: 'SacredKirin', name: 'Sacred Kirin', rarity: 'Rare', image: 'Cards/Hybrid/SacredKirin.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Beast', archetype: 'Hybrid', hp: 13, atk: 4, def: 2, cost: '{3}{W}', 
 ability: 'Rush', set: 'SavageTerritory',
 skill: [
  {name: 'Heavenstep Radiance', cost: '{W}',
   requirement: {class: 'CCW'},
   effect: {class: 'Strike', amount: 3}}
 ]},
{id: 'LightPossessedArmor', name: 'Light Possessed Armor', rarity: 'Rare', image: 'Cards/Construct/LightPossessedArmor.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Construct', archetype: 'Solarforge', hp: 4, atk: 3, def: 3, cost: '{1}{W}', 
 ability: ['Armor','Rush'], skill: '', set: 'ElementaGenesis'},

// OTHER MULTICOLORED //

{id: 'DragonsApprentice', name: "Dragon's Apprentice", rarity: 'Rare', image: 'Cards/Dragon/DragonsApprentice.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Dragon', archetype: '', hp: 4, atk: 2, def: 0,
 cost: '{2}', ability: 'Flying', set: 'ScalesofRuin',
 skill: [
  {name: 'Evolve', cost: '{2}', 
   effect: {class: 'Evolve'}}
 ]},

{id: 'Jackalope', name: 'Jackalope', rarity: 'Rare', image: 'Cards/Hybrid/Jackalope.png', flavor: '', 
 category: 'Creature', color: ['Green','Black'], type: 'Beast', archetype: 'Hybrid', hp: 5, atk: 2, def: 1,
 cost: '{G}{B}', ability: '', set: 'SavageTerritory',
 skill: [
  {name: 'Echo', cost: '{0}',
   requirement: {class: 'Echo', archetype: 'Hybrid'}
   effect: {class: 'Search', archetype: 'Hybrid'}}
 ]},

{id: 'DarkHarpy', name: 'Dark Harpy', rarity: 'Rare', image: 'Cards/Zephyra/DarkHarpy.png', flavor: '', 
 category: 'Creature', color: ['Yellow','Black'], type: 'Avian', archetype: 'Harpy', hp: 6, atk: 4, def: 1,
 cost: '{2}{Y}{B}', ability: 'Flying', set: 'FeatheredOmen',
 skill: [
  {name: 'Dash', cost: '{Y}{B}',
   effect: {class: 'Dash'}}
 ]},

// PIXIEBOUND //
 
{id: 'FairyWarrior', name: 'Fairy Warrior', rarity: 'Rare', image: 'Cards/Fairy/FairyWarrior.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Fairy', type: 'Warrior', hp: 5, atk: 3, def: 2, cost: '{1}{G}', 
 ability: ['Flying','Rush'], set: 'ElementaGenesis',
 skill: [
  {name: 'Dash', cost: '{G}',
  effect: {class: 'Dash'}}
 ]},

{id: 'DreadbloomFaerie', name: 'Dreadbloom Faerie', rarity: 'Rare', image: 'Cards/Fairy/DreadbloomFaerie.png', flavor: '', 
 category: 'Creature', color: ['Green','Purple'], type: 'Faefolk', archetype: 'Fairy', type: '', hp: 5, atk: 3, def: 1, cost: '{1}{G}', 
 ability: ['Flying','Rush'], set: 'ElementaGenesis',
 skill: [
  {name: 'Dash', cost: '{G}',
  effect: {class: 'Dash'}}
 ]},





// Fireland //
{id: 'FirelandScamperling', name: 'Fireland Scamperling', rarity: 'Common', image: 'Cards/Beast/FirelandScamperling.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1,
 cost: '{2}', archetype: 'Fireland', ability: ['Burn','Rush'], set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},
{id: 'FirelandCindercub', name: 'Fireland Cindercub', rarity: 'Common', image: 'Cards/Beast/FirelandCindercub.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Beast', archetype: 'Fireland', hp: 3, atk: 2, def: 1,
 cost: '{1}', ability: ['Burn','Rush'], set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Evolve', cost: '{r}{r}', 
   effect: {class: 'Evolve'}}
 ]},
{id: 'FirelandLynx', name: 'Fireland Lynx', rarity: 'Common', image: 'Cards/Beast/FirelandLynx.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Beast', archetype: 'Fireland', hp: 3, atk: 2, def: 1,
 cost: '{3}{R}', ability: ['Burn','Leap','Rush'], set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Evolve', cost: '{r}', description: 'Gain a {firelandEvolveSigil}',
   effect: {class: 'Evolve'}}
 ]},
{id: 'FirelandKitsune', name: 'Fireland Kitsune', rarity: 'Common', image: 'Cards/Beast/FirelandKitsune.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Beast', archetype: 'Fireland', hp: 4, atk: 3, def: 0,
 cost: '{1}{R}', ability: ['Burn','Leap','Rush'], set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Beast Arrival', cost: '{r}{r}',
   activation: {class: 'Arrival', type: 'Beast'},
   effect: {class: 'Search', archetype: 'Fireland'}}
 ]},
{id: 'FirelandDirebeast', name: 'Fireland Direbeast', rarity: 'Rare', image: 'Cards/Beast/FirelandDirebeast.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Beast', archetype: 'Fireland', hp: 9, atk: 5, def: 2,
 cost: '{4}{R}', ability: ['Burn','Rush'], set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Evolution', cost: '{r}{r}', 
   effect: {class: 'Evolution'}}
 ]},
{id: 'FirelandHellhound', name: 'Fireland Hellhound', rarity: 'Rare', image: 'Cards/Beast/FirelandHellhound.png', flavor: '', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], archetype: 'Fireland', hp: 7, atk: 5, def: 1,
 cost: '{2}{R}', ability: ['Burn','Rush'], set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Evolve', cost: '{r}', 
   effect: {class: 'Evolve'}}
 ]},
{id: 'FirelandHellmaw', name: 'Fireland Hellmaw', rarity: 'Rare', image: 'Cards/Beast/Fireland Hellmaw.png', flavor: '', 
 category: 'Creature', color: ['Red','Black'], type: ['Dragon','Demon'], archetype: 'Fireland', hp: 8, atk: 6, def: 1,
 cost: '{2}{R}{B}', ability: ['Burn','Flying','Rush'], set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Evolve', cost: '{r}', 
   effect: {class: 'Evolve'}}
 ]},
{id: 'EphorosFirelandBehemoth', name: 'Ephoros, Fireland Behemoth', rarity: 'Legendary', image: 'Cards/Beast/EphorosFirelandBehemoth.png', flavor: '', imageFullArt: 'Cards/Fireland/EphorosFirelandBehemothFA.png', flavor: '',
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], archetype: 'Fireland', hp: 13, atk: 9, def: 3,
 cost: '{5}{R}{B}', ability: ['Burn','Crush'], set: 'SavageTerritory',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Discard', cost: '{r}', description: 'Discard to burn {3}',
   requirement: {class: 'Discard'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Void Evolution', cost: '{r}{r}', description: 'Fusion summon from the void',
   effect: {class: 'VoidEvolution'}}
 ]},

// GOLEMHEART //
{id: 'PyrokragGolemheartTitan', name: 'Pyrokrag, Golemheart Titan', rarity: 'Legendary', image: 'Cards/Elemental/PyrokragGolemheartTitan.png', flavor: '', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', archetype: 'Golem', hp: 5, atk: 8, def: 3,
 cost: '{5}{R}{C}', ability: 'Scorch', trait: 'Fusion', set: 'PrimordialAscension',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Stash', cost: '{r}', description: 'Return from your hand to the deck and burn {1}',
   requirement: {class: 'Stash'},
   effect: {class: 'Burn', amount: 1}},
  {name: 'Mill', 
   requirement: {class: 'Mill', type: 'Golem'},
   effect: {class: 'Armor', amount: 4}},
  {name: 'Moltern Aegis Nova', cost: '{r}{r}{c}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burn', amount: 3, target: 3}},
  {name: 'Void Fusion', cost: '{r}{c}', 
   effect: {class: 'Void Fusion'}}
 ]},
{id: 'GolemheartGiant', name: 'Golemheart Giant', rarity: 'Rare', image: 'Cards/Elemental/GolemheartGiant.png', flavor: '', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', archetype: 'Golem', hp: 6, armor: 4, atk: 5, def: 2,
 cost: '{2}{R}{C}', ability: 'Scorch', set: 'PrimordialAscension',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Echo',
   activation: {class: 'Echo'},
   effect: {class: 'Inpire', armor: 2}},
 ]},
{id: 'SmolderingGolem', name: 'Smoldering Golemheart', rarity: 'Rare', image: 'Cards/Elemental/SmolderingGolemheart.png', flavor: '', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', archetype: 'Golem', hp: 7, armor: 4, atk: 5, def: 2,
 cost: '{6}{R}{C}', ability: 'Scorch', set: 'PrimordialAscension',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Golem Echo', 
   activation: {class: 'Echo', type: 'Golem'},
   effect: {class: 'Armor', armor: 3}},
  {name: 'Emberplate Detonation', cost: '{r}',
   requirement: {class: 'Ultimate'},
   effect: {class: 'Burn', amount: 2, target: 3}},
  {name: 'Fuse', cost: '{r}',
   effect: {class: 'Fuse'}},  
 ]},
{id: 'GolemheartSentinel', name: 'Golemheart Sentinel', rarity: 'Rare', image: 'Cards/Elemental/GolemheartSentinel.png', flavor: '', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 7, armor: 3, atk: 3, def: 2,
 cost: '{1}{R}{C}', archetype: 'Golemheart', ability: 'Protect', set: 'PrimordialAscension'},

{id: 'FireGolem', name: 'Fire Golem', rarity: 'Common', image: 'Cards/Golems/Fire Golem.png', flavor: '', 
 category: 'Creature', color: ['Red', 'Gray'], type: ['Elemental','Golem'], hp: 3, armor: 1, atk: 2, def: 1,
 cost: '{R}{C}', archetype: 'Golemheart', ability: ['Burn', 'Scorch'], set: 'PrimordialAscension',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Discard', cost: '{c}', 
   requirement: {class: 'Discard'},
   effect: {class: 'Search', type: 'Golem'}},
  {name: 'Echo', cost: '{r}',
   activation: {class: 'Echo'},
   effect: {class: 'Strike', status: 'Burn', amount: 3}},
  {name: 'Fuse', cost: '{r}', 
   effect: {class: 'Fuse'}},
 ]},

{id: 'KaelgorranElementalPrimordial', name: 'Kaelgorran, Elemental Primordial', rarity: 'Legendary', image: 'Cards/Elemental/KaelgorranElementalPrimordial.png', flavor: '', imageFullArt: 'Cards/Golems/KaelgorranElementalPrimordialFA.png', flavor: '',
 category: 'Creature', color: ['Green','Red', 'Gray'], type: 'Elemental', archetype: 'Golem', hp: 6, atk: 6, def: 4, cost: '{4}{R}{C}',
 ability: 'Burn', trait: 'Fusion', set: 'PrimordialAscension',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Discard', cost: '{c}', 
   requirement: {class: 'Discard'},
   effect: {class: 'Search', type: 'Golem'}},
  {name: 'Echo', 
   activation: {class: 'Echo'},
   effect: {class: 'Token', tokenChoices: ['ElementalTokenGray', 'ElementalTokenGreen', 'ElementalTokenRed'], amount: 2}},
  {name: 'Fusion', cost: '{g}{r}{c}', 
   effect: {class: 'Fusion'}},  
 ]},

{id: 'AcidicGolem', name: 'Acidic Golem', rarity: 'Rare', image: 'Cards/Elemental/AcidicGolem.png', flavor: '', 
 category: 'Creature', color: ['Purple', 'Gray'], type: 'Elemental', archetype: 'Golem', hp: 8, armor: 4, atk: 4, def: 3,
 cost: '{2}{P}{C}', ability: 'Poisonous', set: 'PrimordialAscension',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

// ------------------------- //
// --- IRONBORN PROTOCOL --- //
// ------------------------- //

// CINDERCORE //
{id: 'CinderScout', name: 'Cinder Scout', rarity: 'Common', image: 'Cards/Construct/CinderScout.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Construct', archetype: 'Cindercore', hp: 1, armor: 1, atk: 2, def: 1,
 cost: '{R}', ability: ['Armor','Exploit'], set: 'IronbornProtocol',
 skill: [{name: 'Summon', cost: '{r}', effect: {class: 'Summon'}},
  {name: 'Discard', cost: '{R}', 
   requirement: {class: 'Discard'},
   effect: [{class: 'Search', archetype: 'Cindercore'}, {class: 'Burn', amount: 0}]},
  {name: 'Fuse', cost: '{R}{R}', 
   effect: {class: 'Fuse'}}
 ]},

{id: 'CindercoreSentry', name: 'Cindercore Sentry', rarity: 'Common', image: 'Cards/Construct/CindercoreSentry.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Construct', archetype: 'Cindercore', hp: 2, armor: 3, atk: 2, def: 1,
 cost: '{1}{R}', ability: ['Armor','Fire Exploit'], set: 'IronbornProtocol',
 skill: [{name: 'Summon', cost: '{1}{r}', effect: {class: 'Summon'}},
  {name: 'Scorch Protocol', cost: '{1}{R}', 
   requirement: {class: 'Special'},
   effect: [{class: 'Search', archetype: 'Cindercore'}, {class: 'Burn', amount: 0}]},
  {name: 'Fuse', cost: '{R}{R}', 
   effect: {class: 'Fuse'}}
 ]},

{id: 'CindercoreProtector', name: 'Cindercore Protector', rarity: 'Rare', image: 'Cards/Construct/CindercoreProtector.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Construct', archetype: 'Cindercore', hp: 15, atk: 6, def: 3,
 cost: '{3}{R}', ability: ['Armor','Exploit','Protect'], set: 'IronbornProtocol',
 skill: [{name: 'Summon', cost: '{3}{r}', effect: {class: 'Summon'}},
  {name: 'Volcanic Vortex', cost: '{1}{R}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 3, status: ['Burn','Bind']}},
  {name: 'Fuse', cost: '{R}', 
   effect: {class: 'Fuse'}}
 ]},

{id: 'CindercoreVanguard', name: 'Cindercore Vanguard', rarity: 'Common', image: 'Cards/Construct/CindercoreVanguard.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Construct', archetype: 'Cindercore', hp: 15, atk: 6, def: 3,
 cost: '{1}{R}', ability: ['Armor', 'Exploit', 'Rush'], set: 'IronbornProtocol',
skill: [{name: 'Summon', cost: '{1}{r}', effect: {class: 'Summon'}},
  {name: 'Fire Pulse', cost: '{R}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}], 
   effect: {class: 'Burn', amount: 1, target: 2}},
 {name: 'Fuse', cost: '{R}', 
   effect: {class: 'Fuse'}}
 ]},

{id: 'CindercoreGolem', name: 'Cindercore Golem', rarity: 'Rare', image: 'Cards/Construct/CindercoreGolem.png', flavor: '', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', archetype: ['Cindercore','Golemheart'], hp: 15, atk: 6, def: 3,
 cost: '{3}{R}', ability: 'Armor', set: 'IronbornProtocol',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Volcanic Vortex', cost: '{1}{R}',
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 3, status: ['Burn','Bind']}}
 ]},

{id: 'IgnavarynCindercoreAutomaton', name: 'Ignavaryn, Cindercore Automaton', rarity: 'Legendary', image: 'Cards/Construct/IgnavarynCindercoreAutomaton.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Construct', archetype: 'Cindercore', hp: 5, armor: 10, atk: 6, def: 3,
 cost: '{5}{R}{R}', ability: ['Armor','Exploit','Protect'], set: 'IronbornProtocol',
 skill: [{name: 'Assemble', cost: '{0}', effect: {class: 'Assemble'}},
  {name: 'Stash', cost: '{R}', description: 'Return from your hand to your deck and burn {2}',
   requirement: {class: 'Stash'},
   effect: {class: 'Burn', amount: 2}},
  {name: 'Thermal Overdrive', cost: '{r}{r}{r}', 
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burn', amount: 3, target: 3}},
  {name: 'Recycle', cost: '{R}', 
   effect: {class: 'Recycle'},
   effect: {class: 'Burn', amount: 2}},
  {name: 'Fusion', cost: '{r}{r}{r}', 
   effect: {class: 'Fusion'}}
 ]},
 
// CORALBOUND //
{id: 'CoralDrone', name: 'Coral Drone', rarity: 'Common', image: 'Cards/Construct/CoralDrone.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Construct', archetype: 'Coralbound', hp: 1, armor: 1, atk: 1, def: 1,
 cost: '{U}', ability: ['Water Exploit', 'Armor'], set: 'IronbornProtocol',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Recycle', cost: '{U}', 
   requirement: {class: 'Recycle'},
   effect: {class: 'Soak', amount: 0, target: 1}},
  {name: 'Fuse', cost: '{u}{u}', 
   effect: {class: 'Fuse'}},
 ]},
 
{id: 'CoralboundSentry', name: 'Coralbound Sentry', rarity: 'Common', image: 'Cards/Construct/CoralboundSentry.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Construct', archetype: 'Coralbound', hp: 4, armor: 1, atk: 2, def: 1,
 cost: '{U}', ability: ['Water Exploit', 'Armor'], set: 'IronbornProtocol',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Hydrosurge Protocol', cost: '{U}', 
   requirement: {class: 'Special'},
   effect: [{class: 'Search', archetype: 'Coralbound'}, {class: 'Soak', amount: 1, target: 1}]},
  {name: 'Fuse', cost: '{u}{u}', 
   effect: {class: 'Fuse'}},
 ]},
 
{id: 'CoralboundProtector', name: 'Coralbound Protector', rarity: 'Rare', image: 'Cards/Construct/CoralboundProtector.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Construct', archetype: 'Coralbound', hp: 7, armor: 3, atk: 3, def: 2,
 cost: '{3}{U}', ability: ['Protect','Lifelink'], set: 'IronbornProtocol',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Echo', cost: '{U}', 
   effect: {class: 'Token', name: 'Coral Drone'}},
  {name: 'Fuse', cost: '{u}', 
   effect: {class: 'Fuse'}},
 ]},
 
{id: 'CoralboundVanguard', name: 'Coralbound Vanguard', rarity: 'Rare', image: 'Cards/Construct/CoralboundVanguard.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Construct', archetype: 'Coralbound', hp: 4, armor: 2, atk: 3, def: 1,
 cost: '{1}{U}', ability: 'Rush', set: 'IronbornProtocol',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Token', name: 'Coral Drone'}},
  {name: 'Fuse', cost: '{u}', 
   effect: {class: 'Fuse'}},
 ]},
 
{id: 'MaelvyrnCoralboundAutomaton', name: 'Maelvyrn, Coralbound Automaton', rarity: 'Legendary', image: 'Cards/Construct/MaelvyrnCoralboundAutomaton.png', flavor: '', imageFullArt: 'Cards/Coralbound/MaelvyrnCoralboundAutomatonFA.png', flavor: '',
 category: 'Creature', color: 'Blue', type: 'Construct', archetype: 'Coralbound', hp: 14, atk: 7, armor: 5, def: 4, cost: '{6}{U}{U}',
 ability: ['Exploit', 'Unbreakable'], trait: 'Fusion', set: 'IronbornProtocol',
 skill: [
  {name: 'Fusion', cost: '{u}{u}{u}{u}', 
   effect: {class: 'Fusion'}},
  {name: 'Blueprint Retrieval', cost: '{U}', 
    requirement: {class: 'Stash'},
    effect: {class: 'Search', type: 'Construct'}},
  {name: 'Hydroburst Cannon', cost: '{U}{U}', 
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Soak', amount: 8}},
 ]},
 
{id: 'HydrosurgeProtocol', name: 'Hydrosurge Protocol', rarity: 'Common', image: 'Cards/Construct/HydrosurgeProtocol.png', flavor: '', 
 category: 'Spell', color: 'Blue', type: 'Construct',
 cost: '{1}{U}', archetype: 'Coralbound', set: 'IronbornProtocol',
 skill: [{name: 'Cast', cost: '{1}{u}', effect: [{class: 'Soak', amount: 1, target: 3}, {class: 'Cast'}]},
  {name: 'Recycle', cost: '{u}', effect: {class: 'Soak', amount: 0, target: 2}},
 ]},

// --- HYDRAL CARDS ---//
{id: 'HydrionPrimevalFloodbringer', name: 'Hydrion, Primeval Floodbringer', rarity: 'Legendary', image: 'Cards/Construct/HydrionPrimevalFloodbringer.png', flavor: '', imageFullArt: 'Cards/Coralbound/MaelvyrnCoralboundAutomatonFA.png', flavor: '',
 category: 'Creature', color: 'Blue', type: 'Elemental', archetype: 'Hydral', trait: 'Fusion', hp: 20, atk: 0, def: 0, cost: '{6}{U}{U}',
 ability: ['Elusive', 'Soak'], set: 'PrimordialAscension',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Stash', cost: '{U}', 
    requirement: {class: 'Stash'},
    effect: {class: 'Search', archetype: 'Coralbound'}},
  {name: 'Deluge Incarnate',
   activation: {class: 'Echo'},
   effect: {class: 'Token', name: 'Coral Drone', amount: 2}},
  {name: 'Fusion', cost: '{u}{u}{u}{u}', 
   effect: {class: 'Fusion'}},
  {name: 'Tide of Oblivion', cost: '{U}{U}', 
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Soak', amount: 8}},
 ]},

// GLIMMERSCALE //
{id: 'WyrmofThornsandSunfire', name: 'Wyrm of Thorns and Sunfire', rarity: 'Rare', image: 'Cards/Dragon/Wyrm of Thorns and Sunfire.png', flavor: '', 
 category: 'Creature', color: ['Green', 'Red', 'White'], type: 'Dragon', archetype: ['Fairy', 'Glimmerscale'], hp: 10, atk: 3, def: 1,
 cost: '{G}{R}{W}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Thornbloom', cost: '{g}{w}', 
    requirement: [{class: 'Special'}, {class: 'CW'}],
    effect: {class: 'Essence'}},
  {name: 'Sunfire Blast', cost: '{r}{g}{w}', 
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burn', amount: 2, target: 3}},
  {name: 'Evolve', cost: '{g}{w}', 
   effect: {class: 'Evolve'}},
 ]},

{id: 'FairyDragon', name: 'Fairy Dragon', rarity: 'Rare', image: 'Cards/Dragon/FairyDragon.png', flavor: '', 
 category: 'Creature', color: ['Green', 'Red', 'White'], type: 'Dragon', hp: 6, atk: 2, def: 1, cost: '{G}{R}{W}',
 ability: ['Flying','Intimidate'], archetype: ['Fairy', 'Glimmerscale'], set: 'MischiefUnbound',
 skill: [
  {name: 'Purify', cost: '{W}',
   requirement: {class: 'CW'},
   effect: {class: 'Purify'}},
  {name:'Floral Mirage', cost: '{G}',
   requirement: [{class: 'Special'}, {class: 'CW'}],
   effect: {class: 'Ambush'}}
 ]},

{id: 'FairyAmphitere', name: 'Fairy Amphitere', rarity: 'Rare', image: 'Cards/Dragon/FairyAmphitere.png', flavor: '', 
 category: 'Creature', color: ['Green', 'Red', 'White'], type: 'Dragon', archetype: ['Fairy', 'Glimmerscale'], hp: 14, atk: 5, def: 2,
 cost: '{G}{R}{W}',ability: 'Flying', set: 'MischiefUnbound',
 skill: [
  {name: 'Purify', cost: '{W}',
   requirement: [{class: 'Special'}, {class: 'CW'}],
   effect: {class: 'Purify'}},
  {name: 'Dewlight Spiral', cost: '{G}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: [{class: 'Sunlight'}, {class: 'Strike', amount: 3}]}
 ]},
 
//--- GOBLIN CARDS ---//
{id: 'GoblinWarlod', name: 'Goblin Warlod', rarity: 'Legendary', image: 'Cards/Brute/GoblinWarlod.png', flavor: '', 
 category: 'Creature', color: ['Green', 'Purple', 'Black'], type: 'Brute', archetype: 'Goblin', trait: 'Mage', hp: 13, atk: 4, def: 1,
 cost: '{g}{p}{b}', ability: '', set: 'MischiefUnbound'
 skill: [
  {name: 'Inspire Goblins', cost: '{g}',
   requirement: {class:'Special'}, 
   effect: {class: 'Inspire', type: 'Goblin', atk: 1}},
  {name: "Discard", cost: '{b}',
   requirement: {class:'Discard'},
   effect: {class: 'Token', tokenChoices: ["GoblinTokenGreen", "GoblinTokenRed", "GoblinTokenPurple", "GoblinTokenGray", "GoblinTokenBlack"]}
  },
  {name: "Arrival", 
   activation: {class:'Arrival'},
   effect: {class: 'Token', tokenChoices: ["GoblinTokenGreen", "GoblinTokenRed", "GoblinTokenPurple", "GoblinTokenGray", "GoblinTokenBlack"]}},
 ]},
  
//--- MOONFANG ---//
{id: 'SinisterWolf', name: 'Sinister Wolf', rarity: 'Common', image: 'Cards/Beast/SinisterWolf.png', flavor: '', 
 category: 'Creature', color: ['Black'], type: 'Beast', archetype: 'Moonfang', hp: 5, atk: 3, def: 0,
 cost: '{1}{B}', ability: ['Ambush','Rush'], set: 'ElementaGenesis',
 skill: [
  {name: 'Transform', cost: '{P}{P}{B}', 
   effect: {class: 'Transform'}}
 ]},
{id: 'Werewolf', name: 'Werewolf', rarity: 'Common', image: 'Cards/Beast/Werewolf.png', flavor: '', 
 category: 'Creature', color: ['Black'], type: 'Beast', hp: 10, atk: 4, def: 1,
 cost: '{3}{B}', archetype: 'Moonfang', ability: ['Ambush'], set: 'ElementaGenesis',
 skill: [
  {name: 'Discard', cost: '{B}',
  requirement: {class: 'Discard'},
  effect: {class: 'Search', archetype: 'Moon'}},
 ]},



 
// SKULLFRAME //
{id: 'SkullframeDefector', name: 'Skullframe Defector', rarity: 'Common', image: 'Cards/Undead/SkullframeDefector.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Undead', archetype: 'Skullframe', trait: 'Warrior', hp: 3, atk: 2, def: 1,
 cost: '{1}', ability: 'Immunity', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Reanimate', cost: '{2}{B}', 
   effect: {class: 'Reanimate'}}
 ]},

{id: 'SkullframeUnyielding', name: 'Skullframe Unyielding', rarity: 'Common', image: 'Cards/Undead/SkullframeUnyielding.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Undead', archetype: 'Skullframe', trait: 'Warrior', hp: 4, atk: 1, def: 0,
 cost: '{1}{B}', ability: ['Immunity','Rush'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Reanimate', cost: '{2}{B}{B}', 
   effect: {class: 'Reanimate'}},
 ]},

{id: 'SkullframeAcolyte', name: 'Skullframe Acolyte', rarity: 'Common', image: 'Cards/Undead/SkullframeAcolyte.png', flavor: '', 
 category: 'Creature', color: ['Black', 'Purple'], type: 'Undead', archetype: 'Skullframe', trait: 'Mage', hp: 5, atk: 3, def: 1,
 cost: '{1}{P}{B}', ability: 'Immunity', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Revive', cost: '{2}{B}', 
   requirement: {class: 'CW'},
   effect: {class: 'Revive', archetype: 'Skullframe'}},
  {name: 'Reanimate', cost: '{2}{B}{B}', 
   effect: {class: 'Reanimate'}},
 ]},

{id: 'SkullframeCryptwinds', name: 'Skullframe Cryptwinds', rarity: 'Rare', image: 'Cards/Undead/SkullframeCryptwinds.png', flavor: '', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], archetype: 'Skullframe', hp: 8, atk: 4, def: 1,
 cost: '{1}{B}{B}', ability: ['Flying', 'Immunity'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Discard', cost: '{B}', 
   requirement: {class: 'Discard'},
   effect: {class: 'Search', amount: 1, type: ['Dragon','Undead']}},
  {name: 'Reanimate', cost: '{b}{B}{B}',
   requirement: {class: 'Sacrifice', amount: 1},
   effect: {class: 'Reanimate'}},
  ]},
 
{id: 'SkullframeSpectralDragon', name: 'Skullframe Spectral Dragon', rarity: 'Rare', image: 'Cards/Undead/SkullframeSpectralDragon.png', flavor: '', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], archetype: 'Skullframe', hp: 12, atk: 6, def: 2,
  cost: '{3}{P}{B}', ability: ['Flying', 'Immunity'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Curseflame Inferno', cost: '{2}{P}{P}{B}', 
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burn', amount: 2, target: 3}},
  {name: 'Reanimate', cost: '{2}{B}{B}', 
   requirement: {class: 'Sacrifice', amount: 1},
   effect: {class: 'Reanimate'}}
 ]},

{id: 'SkullframeArmoredDragon', name: 'Skullframe Armored Dragon', rarity: 'Rare', image: 'Cards/Undead/SkullframeArmoredDragon.png', flavor: '', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], archetype: 'Skullframe', hp: 5, armor: 4, atk: 5, def: 2,
 cost: '{2}{P}{B}', ability: ['Flying','Immunity','Armor'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Reanimate', cost: '{3}{B}{B}',
   requirement: {class: 'Sacrifice'}, amount: 1,
   effect: {class: 'Reanimate'}}
 ]},

{id: 'SkullframeHexmistress', name: 'Skullframe Hexmistress', rarity: 'Rare', image: 'Cards/Undead/SkullframeHexmistress.png', flavor: '', 
 category: 'Creature', color: ['Black', 'Purple'], type: 'Undead', archetype: 'Skullframe', trait: 'Mage', hp: 6, atk: 3, def: 1,
 cost: '{1}{B}{P}', ability: 'Immunity', set: 'ShadowsBeyond',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Bonecall', cost: '{b}',
   requirement: [{class: 'Special'}, {class: 'CW'}],
   effect: {class: 'Token', token: 'Skeleton', amount: 1}},
  {name: 'Ebonhex Flare', cost: '{P}{B}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}], 
   effect: {class: 'Strike', amount: 3, status:'Burn'}},
  {name: 'Reanimate', cost: '{1}{B}{B}{p}', 
   effect: {class:'Reanimate'}}
 ]},

{id: 'MaldryssSkullframeArchmage', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'Cards/Undead/MaldryssSkullframeArchmage.png', flavor: '', imageFullArt: 'Cards/Skullframe/MaldryssSkullframeArchmageFA.png', flavor: '',
 category: 'Creature', color: ['Black', 'Purple'], type: 'Undead', archetype: 'Skullframe', trait: 'Mage', hp: 4, atk: 2, def: 1,
 cost: '{B}', ability: ['Drain','Immunity'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{b}', effect: {class: 'Summon'}},
  {name: 'Hexbind', cost: '{P}{B}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Bind', amount: 4}},
  {name: 'Ebonhex Crush', cost: '{B}{p}',  
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Exploit', amount: 5}},
  {name: 'Reanimate', cost: '{2}{B}{B}', 
   effect: {class: 'Reanimate'}}
 ]},

{id: 'Soulhexing', name: 'Soulhexing', rarity: 'Common', image: 'Cards/Undead/Soulhexing.png', flavor: '', 
 category: 'Spell', color: 'Black', type: 'Spell', cost: '{2}{B}', archetype: 'Skullframe', effect: 'Destroy a creature afflicted by any status', set: 'ElementaGenesis'},
{id: 'Witherwake', name: 'Witherwake', rarity: 'Common', image: 'Cards/Undead/Witherwake.png', flavor: '', 
 category: 'Spell', color: ['Black','Purple'], type: 'Spell', cost: '{P}{B}', archetype: 'Skullframe', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Hexbind', cost: '{P}{B}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Bind', amount: 4}},
 ]},

// SERAPH
{id: 'SeraphielSolmaraPrincess', name: 'Seraphiel, Solmara Princess', rarity: 'Legendary', image: 'Cards/Seraph/SeraphielSolmaraPrincess.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Angel', archetype: 'Seraph', trait: 'Warrior', hp: 6, atk: 1, def: 1,
 cost: '{W}{W}', ability: 'Flying', set: 'FracturedOrigins',
 skill: [
  {name: 'Divine Ascendance', cost: '{w}{w}',
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: [{class: 'Buff', atk: 1, def: 1}, {class: 'Summon'}, {class: 'Aegis}]},
  {name: 'Seraphic Judgement', cost: '{2}{w}{w}', 
   requirement: [{class: 'Ultimate'}, {class: 'CW'}],
   effect: {class: 'Banish', amount: 1}},
 ]},
 
// Frostland //
{id: 'FrostlandDragon', name: 'Frostland Dragon', rarity: 'Rare', image: 'Cards/Frostland/FrostlandDragon.png', flavor: '', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Dragon', hp: 9, atk: 5, def: 2,
 cost: '{3}{U}{C}', archetype: 'Frostland', ability: ['Ice Armor','Flying'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

{id: 'FrostlandWyrm', name: 'Frostland Wyrm', rarity: 'Rare', image: 'Cards/Frostland/FrostlandWyrm.png', flavor: '', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Dragon', hp: 9, atk: 5, def: 2,
 cost: '{1}{U}{C}', archetype: 'Frostland', ability: ['Ice Armor','Flying'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

{id: 'FrostlandGolem', name: 'Frostland Golem', rarity: 'Rare', image: 'Cards/Frostland/FrostlandGolem.png', flavor: '', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Elemental', archetype: 'Frostland', hp: 9, atk: 5, def: 2,
 cost: '{1}{U}{C}', ability: 'Ice Armor', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

{id: 'FrostlandPhoenix', name: 'Frostland Phoenix', rarity: 'Rare', image: 'Cards/Frostland/FrostlandPhoenix.png', flavor: '', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Avian', archetype: 'Frostland', hp: 9, atk: 5, def: 1,
 cost: '{U}{C}', ability: ['Ice Armor','Flying'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}},
  {name: 'Echo', 
   activation: {class: 'Echo'}, 
   effect: {class: 'Token', token: 'Phoenix Ashes'}},
 ]},

{id: 'FrostlandRuneforgedAutomaton', name: 'Frostland Runeforged Automaton', rarity: 'Rare', image: 'Cards/Frostland/FrostlandRuneforgedAutomaton.png', flavor: '', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Construct', archetype: 'Frostland', hp: 9, atk: 5, def: 2,
 cost: '{2}{U}{C}', ability: ['Crush','Exploit'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

{id: 'FrostlandRuneforgedColossus', name: 'Frostland Runeforged Colossus', rarity: 'Rare', image: 'Cards/Frostland/FrostlandRuneforgedColossus.png', flavor: '', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Construct', archetype: 'Frostland', hp: 9, atk: 5, def: 2,
 cost: '{4}{U}{C}', ability: ['Crush', 'Exploit'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

{id: 'EirawenFrostlandQueenFA', name: 'Eirawen, Frostland Queen', rarity: 'Legendary', image: 'Cards/Frostland/EirawenFrostlandQueen.png', flavor: '', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Elf', archetype: 'Frostland', trait: 'Mage', hp: 6, atk: 1, def: 0,
 cost: '{U}{U}{C}', ability: ['Ice Armor','Flying'], set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{0}', effect: {class: 'Summon'}}]},

// ARTIFACTS //
{id: 'GolemheartInfusor', name: 'Golemheart Infusor', rarity: 'Common', image: 'Cards/Elemental/GolemheartInfusor.png', flavor: '', 
 category: 'Artifact', color: 'Gray', type: 'Relic', hp: 5, cost: '{C}', archetype: 'Golemheart', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{0}', effect: {class: 'Equip'}}]},

{id: 'CindercoreEmber', name: 'Cindercore Ember', rarity: 'Common', image: 'Cards/Artifact/CindercoreEmber.png', flavor: '', 
 category: 'Artifact', color: 'Red', type: 'Relic', archetype: 'Cindercore', hp: 7, cost: '{1}{R}', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{1}{r}', effect: {class: 'Equip'}}]},
{id: 'TidecallersPearl', name: 'Tidecallers Pearl', rarity: 'Common', image: 'Cards/Artifact/TidecallersPearl.png', flavor: '', 
 category: 'Artifact', color: 'Blue', type: 'Relic', hp: 5, cost: '{2}{U}', archetype: 'Coralbound', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{0}', effect: {class: 'Equip'}}]},
{id: 'StormcoreDynamo', name: 'Stormcore Dynamo', rarity: 'Common', image: 'Cards/Artifact/StormcoreDynamo.png', flavor: '', 
 category: 'Artifact', color: 'Yellow', type: 'Relic', archetype: 'Stormcore', hp: 5, cost: '{2}{Y}', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{0}', effect: {class: 'Equip'}}]},
{id: 'PlagueThornTalisman', name: 'Plague Thorn Talisman', rarity: 'Common', image: 'Cards/Artifact/PlagueThornTalisman.png', flavor: '', 
 category: 'Artifact', color: 'Purple', type: 'Relic', hp: 5, cost: '{2}{P}', archetype: 'Plaguecore', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{0}', effect: {class: 'Equip'}}]},
{id: 'TitansAnvil', name: 'Titans Anvil', rarity: 'Common', image: 'Cards/Artifact/TitansAnvil.png', flavor: '', 
 category: 'Artifact', color: 'Gray', type: 'Relic', hp: 5, cost: '{1}{C}', archetype: '', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{0}', effect: {class: 'Equip'}}]},
{id: 'VeiloftheForgotten', name: 'Veil of the Forgotten', rarity: 'Common', image: 'Cards/Artifact/VeiloftheForgotten.png', flavor: '', 
 category: 'Artifact', color: 'Black', type: 'Relic', hp: 5, cost: '{2}{B}', archetype: '', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{0}', effect: {class: 'Equip'}}]},
{id: 'LumenSpire', name: 'Lumen Spire', rarity: 'Common', image: 'Cards/Artifact/Lumen Spire.png', flavor: '', 
 category: 'Artifact', color: 'White', type: 'Relic', hp: 5, cost: '{2}{W}', archetype: '', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{0}', effect: {class: 'Equip'}}]},

{id: 'DrakzulTwinHammers', name: 'Drakzul Twin Hammers', rarity: 'Common', image: 'Cards/Artifact/DrakzulTwinHammers.png', flavor: '', 
 category: 'Artifact', color: 'Gray', type: 'Equipment', hp: 5, cost: '{c}{C}', archetype: '', set: 'ElementaGenesis',
 skill: [{name: 'Equip', cost: '{c}{c}', 
   requirement: {class: 'Equip', targetColor: 'Gray', targetTrait: 'Warrior'},
   effect: {class: 'Inspire', ability: 'Crush'}},
  {name: 'Twin Impact', cost: '{c}{c}', 
   requirement: {class: 'ccw'},
   effect: {class: 'Strike', amount: 2, target: 2}},
 ]},
 
// SPELLS //

{id: 'VerdantRebirth', name: 'Verdant Rebirth', rarity: 'Common', image: 'Cards/Spell/VerdantRebirth.png', flavor: '', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: '{2}{G}', effect: 'Gain {G}{G}', set: 'ElementaGenesis'},

/*
Dragon Terrains
{id: 'DragonsGrove', name: 'Dragon's Grove', rarity: 'Rare', image: 'Cards/Dragon/DragonsGrove.png', flavor: '', 
 category: 'Domain', color: 'Green', type: ['Terrain', 'Dragon'], archetype: 'Thornwing', hp: 13, cost: '{g}{g}', essence: '{g}{g}', set: 'WyrmheartAwakening',
 skill: [
  {name: 'Draconic Pulse', cost: '{g}{g}',
   effect: {class: 'Heal', amount: 2, target: 2}},
  {name: 'Dragon Summon', 
   activation: {'Summon', archetype: 'Dragon'},
   effect: {class: 'Burn', amount: 1}},
 ]},
{id: 'DragonsSpire', name: 'Dragon's Spire', rarity: 'Rare', image: 'Cards/Dragon/DragonsSpire.png', flavor: '', 
 category: 'Domain', color: 'Red', type: ['Terrain', 'Dragon'], archetype: 'Blazingscale', hp: 11, cost: '{r}{r}', essence: '{r}{R}', set: 'WyrmheartAwakening',
 skill: [
  {name: 'Dragon Summon', 
   activation: {'Draw', archetype: 'Dragon'},
   effect: {class: 'Burn', amount: 1}},
  {name: 'Draconic Blaze', cost: '{r}{r}',
   effect: {class: 'Burn', amount: 2, target: 2}},
 ]},
{id: 'DragonsAtoll', name: 'Dragon's Atoll', rarity: 'Rare', image: 'Cards/Dragon/DragonsAtoll.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: ['Terrain', 'Dragon'], archetype: 'Abyssdrake', hp: 16, cost: {u}{u}', essence: '{u}{u}', set: 'WyrmheartAwakening',
  skill: [
  {name: 'Awaken', cost: '{u}{u}',
   activation: {class: 'Awaken'},
   effect: {class: 'Heal', amount: 2}},
  {name: 'Dragon Echo', 
   activation: {'Echo', archetype: 'Dragon'},
   effect: {class: 'Recall', amount: 1, archetype: 'Dragon'}},
 {name: 'Draconic Abyss', cost: '{u}{u}',
  activation: {'Echo', archetype: 'Dragon'},
  effect: {class: 'NullSigil'}},
 ]},
 
{id: 'DragonsSkyreach', name: 'Dragon's Skyreach', rarity: 'Rare', image: 'Cards/Dragon/DragonsSkyreach.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: ['Terrain', 'Dragon'], archetype: 'Stormrazor', hp: 11, cost: '{y}{y}', essence: '{Y}', set: 'StandardPack2',
 skill: [
  {name: 'Awaken', cost: '{u}{u}',
   activation: {class: 'Awaken'},
   effect: {class: 'Heal', amount: 2}},
  {name: 'Dragon Echo', cost: '{u}',
   activation: {'Echo', archetype: 'Dragon'},
   effect: {class: 'NullSigil'}},
 {name: 'Draconic Storm', cost: '{u}{u}',
  effect: {class: 'Thunderstorm'}},
 ]},

{id: 'DragonsBastion', name: 'Dragon's Bastion', rarity: 'Rare', image: 'Cards/Dragon/DragonsBastion.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: ['Terrain', 'Dragon'], archetype: 'Ironclaw', hp: 12, cost: '{c}{c}', essence: '{C}', set: 'WyrmheartAwakening',
 skill: [
  {name: 'Awaken', cost: '{u}{u}',
   activation: {class: 'Awaken'},
   effect: {class: 'Heal', amount: 2}},
  {name: 'Dragon Echo', cost: '{u}',
   activation: {'Echo', archetype: 'Dragon'},
   effect: {class: 'NullSigil'}},
 {name: 'Draconic Ironwall', cost: '{c}{c}',
  effect: {class: 'Curse'}},
 ]},
 
{id: 'DragonsHollow', name: 'Dragon's Hollow', rarity: 'Rare', image: 'Cards/Dragon/DragonsHollow.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: ['Terrain', 'Dragon'], archetype: 'Dreadspine', hp: 12, cost: '{0}', essence: '{P}', set: 'WyrmheartAwakening',
 skill: [
  {name: 'Awaken', cost: '{u}{u}',
   activation: {class: 'Awaken'},
   effect: {class: 'Heal', amount: 2}},
  {name: 'Dragon Echo', cost: '{u}',
   activation: {'Echo', archetype: 'Dragon'},
   effect: {class: 'NullSigil'}},
 {name: 'Draconic Curse', cost: '{p}{p}',
  effect: {class: 'Curse'}},
 ]}, 
 
{id: 'DragonsHaven', name: 'Dragon's Haven', rarity: 'Rare', image: 'Cards/Dragon/DragonsHaven.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 13, cost: '{w}{w}', essence: '{w}{w}', set: 'WyrmheartAwakening',
  skill: [
  {name: 'Awaken', cost: '{u}{u}',
   activation: {class: 'Awaken'},
   effect: {class: 'Heal', amount: 2}},
  {name: 'Dragon Draw', cost: '{u}',
   activation: {'Echo', archetype: 'Dragon'},
   effect: {class: 'NullSigil'}},
 {name: 'Draconic Solarflare', cost: '{w}{w}',
  effect: {class: 'Night'}},
 ]},
 
{id: 'DragonsMoonhold', name: 'Dragon's Moonhold', rarity: 'Rare', image: 'Cards/Dragon/DragonsMoonhold.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 13, cost: '{b}{b}', essence: '{b}{b}', set: 'WyrmheartAwakening',
 skill: [
  {name: 'Awaken', cost: '{u}{u}',
   activation: {class: 'Awaken'},
   effect: {class: 'Heal', amount: 2}},
  {name: 'Dragon Echo', cost: '{u}',
   activation: {'Echo', archetype: 'Dragon'},
   effect: {class: 'NullSigil'}},
 {name: 'Draconic Nightfall', cost: '{b}{b}',
  effect: {class: 'Night'}},
 ]},
 
{id: 'HardenedScales', name: 'Hardened Scales', rarity: 'Common', image: 'Cards/Dragon/HardenedScales.png', flavor: '', 
 category: 'Spell', color: ['Green','Red'], type: 'Dragon', trait: 'Aura', cost: '{1}', set: 'ElementaGenesis',
 skill: [{name: 'Cast', cost: '{0}',
          effect: [{class: 'Equip', type: 'Dragon'}, {class: 'Inspire', armor: 2},
                   {class: 'Inspire', ability: 'Immunity'}, {class: 'Inspire', def: 1}]},
 ]},

 {id: 'MysticalBaize', name: 'Mystical Baize', rarity: 'Rare', image: 'Cards/dh/MysticalBaize.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Beast', archetype: '', trait: '', hp: 6, atk: 2, def: 1,
 cost: '{2}{W}', ability: 'Flying', set: 'ElementaGenesis',
 skill: [{name: 'Summon', cost: '{2}{w}', effect: {class: 'Summon'}}]},
 
// --- Green Domains --- //
{id: 'Thicket', name: 'Thicket', rarity: 'Common', image: 'Cards/FTOG/Thicket.png', flavor: '', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 8, cost: '{1}', essence: '{G}{g}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{1}', effect: {class: 'Terraform'}}]},
 
{id: 'GoblinVillage', name: 'Goblin Village', rarity: 'Common', image: 'Cards/Brute/GoblinVillage.png', flavor: '', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'StandardPack2'},
 
{id: 'Thornreach', name: 'Thornreach', rarity: 'Common', image: 'Cards/Domain/Thornreach.png', flavor: '', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'FracturedOrigins'},
 
{id: 'FairyFountain', name: 'Fairy Fountain', rarity: 'Common', image: 'Cards/Faefolk/FairyFountain.png', flavor: '', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'MischievousUnbound'},

{id: 'ElvenVillage', name: 'Elven Village', rarity: 'Rare', image: 'Cards/Faefolk/ElvenVillage.png', flavor: '', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 10, cost: '{0}', essence: '{G}', set: 'EchoesofCreation'},

{id: 'SylvanCanopy', name: 'Sylvan Canopy', rarity: 'Common', image: 'Cards/Domain/Sylvan Canopy.png', flavor: '', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'ElementaGenesis'},

// --- Red Domains --- //

{id: 'OrcVillage', name: 'Orc Village', rarity: 'Common', image: 'Cards/Brute/OrcVillage.png', flavor: '', 
 category: 'Domain', color: 'Red', type: 'Terrain', hp: 7, cost: '{1}', essence: '{r}', set: 'EchoesofCreation'},
 
{id: 'CindercoreForgehold', name: 'Cindercore Forgehold', rarity: 'Common', image: 'Cards/Construct/CindercoreForgehold.png', flavor: '', 
 category: 'Domain', color: 'Red', type: 'Terrain', hp: 5, cost: '{0}', essence: '{R}', set: 'IronbornProtocol'},

{id: 'Smokeblight Frontier', name: 'Smokeblight Frontier', rarity: 'Common', image: 'Cards/Domain/SmokeblightFrontier.png', flavor: '', 
 category: 'Domain', color: 'Red', type: 'Terrain', hp: 5, cost: '{0}', essence: '{R}', set: 'StandardPack2'},

// --- Blue Domains --- //

{id: 'Pearlhaven', name: 'Pearlhaven', rarity: 'Common', image: 'Cards/Domain/Pearlhaven.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: 'Domain', hp: 16, cost: '{u}{u}{u}', essence: '{u}{u}', set: 'EchoesofCreation'},
 
{id: 'MermaidsSanctuary', name: 'Mermaid's Sanctuary', rarity: 'Rare', image: 'Cards/Merfolk/MermaidsSanctuary.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 11, cost: '{1}{u}', essence: '{u}', set: 'EchoesofCreation'},

{id: 'TheAbyssalCrown', name: 'The Abyssal Crown', rarity: 'Common', image: 'Cards/Abyss/TheAbyssalCrown.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 12, cost: '{u}{b}', essence: '{u}{b}', set: 'DrownedRealms'},
 
{id: 'LagoonoftheVerdantTide', name: 'Lagoon of the Verdant Tide', rarity: 'Common', image: 'Cards/Domain/LagoonoftheVerdant Tide.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
 
{id: 'CoralboundReef', name: 'Coralbound Reef', rarity: 'Common', image: 'Cards/Construct/CoralboundReef.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
 
{id: 'GlasswaveReefs', name: 'Glasswave Reefs', rarity: 'Common', image: 'Cards/Domain/GlasswaveReefs.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
 
{id: 'GlacierRift', name: 'Glacier Rift', rarity: 'Common', image: 'Cards/Frostland/GlacierRift.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
 
{id: 'FrostlandCitadel', name: 'Frostland Citadel', rarity: 'Common', image: 'Cards/Frostland/FrostlandCitadel.png', flavor: '', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},

// --- Yellow Domains --- //
{id: 'SkywardArchipelago', name: 'Skyward Archipelago', rarity: 'Rare', image: 'Cards/egy/SkywardArchipelago.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 6, cost: '{y}', essence: '{Y}', set: 'ElementaGenesis',
 skill: [{name: 'Terraform', cost: '{y}', effect: {class: 'Terraform'}},
{name: 'Flourish', cost: '{g}', requirement: {class: 'CW'}, effect: {class: 'Search', trait: 'Terrain'}}]},
  
{id: 'TempestCradle', name: 'Tempest Cradle', rarity: 'Common', image: 'Cards/Domain/TempestCradle.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},

{id: 'ElementalsPlateau', name: 'Elemental's Plateau', rarity: 'Common', image: 'Cards/Elemental/ElementalsPlateau.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'PrimordialAscension'},

{id: 'ZephyrasStormpeaks', name: 'Zephyra's Stormpeaks', rarity: 'Common', image: 'Cards/Avian/ZephyrasStormpeaks.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'EchoesofCreation'},

{id: 'CloudveilSanctum', name: 'Cloudveil Sanctum', rarity: 'Common', image: 'Cards/Domain/CloudveilSanctum.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},
 
{id: 'CitadelofArclight', name: 'Citadel of Arclight', rarity: 'Common', image: 'Cards/Domain/CitadelofArclight.png', flavor: '', 
 category: 'Domain', color: ['Yellow','White'], type: 'Terrain', hp: 13, cost: '{y}{w}', essence: '{y}{w}', set: 'StandardPack2'},
 
{id: 'BoltspireIsles', name: 'Boltspire Isles', rarity: 'Common', image: 'Cards/Domain/BoltspireIsles.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},
 
{id: 'SkybreakerRings', name: 'Skybreaker Rings', rarity: 'Common', image: 'Cards/Domain/SkybreakerRings.png', flavor: '', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},

 // --- Purple Domains --- //

{id: 'OrcVillage', name: 'Orc Village', rarity: 'Common', image: 'Cards/Brute/OrcVillage.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},

{id: 'TheMireworks', name: 'The Mireworks', rarity: 'Common', image: 'Cards/Domain/TheMireworks.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},

{id: 'GoblinCamp', name: 'Goblin Camp', rarity: 'Common', image: 'Cards/Brute/GoblinCamps.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},
 
{id: 'BlackrotTunnels', name: 'Blackrot Tunnels', rarity: 'Common', image: 'Cards/Domain/BlackrotTunnels.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},
 
{id: 'Festerglow Fen', name: 'Festerglow Fen', rarity: 'Common', image: 'Cards/Domain/FesterglowFen.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},
 
{id: 'SwampLake', name: 'Swamp Lake', rarity: 'Common', image: 'Cards/Domain/SwampLake.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},
 
{id: 'MiregateBasin', name: 'Miregate Basin', rarity: 'Common', image: 'Cards/Domain/MiregateBasin.png', flavor: '', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},

// --- Gray Domains --- //

{id: 'IrondeepBastion', name: 'Irondeep Bastion', rarity: 'Common', image: 'Cards/Domain/IrondeepBastion.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 14, cost: '{c}{c}', essence: '{C}', set: 'StandardPack2'},
 
{id: 'GoblinOutpost', name: 'Goblin Outpost', rarity: 'Common', image: 'Cards/Brute/GoblinOutpost.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: 'Domain', hp: 8, cost: '{1}', essence: '{C}', set: 'EchoesofCreation'},
 
{id: 'OrcEncampment', name: 'Orc Encampment', rarity: 'Common', image: 'Cards/Brute/OrcEncampment.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: 'Domain', hp: 12, cost: '{2}', essence: '{C}', set: 'StandardPack2'},
 
{id: 'DwarfenStronghold', name: 'Dwarfen Stronghold', rarity: 'Common', image: 'Cards/Brute/DwarfenStronghold.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: 'Domain', hp: 11, cost: '{1}{c}', essence: '{c}', set: 'EchoesofCreation'},

{id: 'TheEmberjawRange', name: 'The Emberjaw Range', rarity: 'Common', image: 'Cards/Domain/TheEmberjawRange.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'StandardPack2'},
 
{id: 'AnvilgatePlateau', name: 'Anvilgate Plateau', rarity: 'Common', image: 'Cards/Domain/AnvilgatePlateau.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{1}{c}{c}', essence: '{C}{c}', set: 'StandardPack2'},
 
{id: 'StonewoundBarrens', name: 'Stonewound Barrens', rarity: 'Common', image: 'Cards/Domain/StonewoundBarrens.png', flavor: '', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'StandardPack2'},

// --- Black Domains --- //

{id: 'Fellchasm', name: 'Fellchasm', rarity: 'Common', image: 'Cards/Domain/Fellchasm.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 13, cost: '{1}{b}{r}', essence: '{b}{r}', set: 'SavageTerritory'},
 
{id: 'VampiricCitadel', name: 'Vampiric Citadel', rarity: 'Common', image: 'Cards/Undead/VampiricCitadel.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'EchoesofCreation'},
 
{id: 'ShadeglassCrag', name: 'Shadeglass Crag', rarity: 'Common', image: 'Cards/Domain/ShadeglassCrag.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 
{id: 'GraveveilFields', name: 'Graveveil Fields', rarity: 'Common', image: 'Cards/Domain/GraveveilFields.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 
{id: 'DarkSea', name: 'Dark Sea', rarity: 'Common', image: 'Cards/Domain/DarkSea.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 
{id: 'Boneyard', name: 'Boneyard', rarity: 'Common', image: 'Cards/Undead/Boneyard.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 
{id: 'TheShadelornSanctum', name: 'The Shadelorn Sanctum', rarity: 'Common', image: 'Cards/Domain/TheShadelornSanctum.png', flavor: '', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},

// --- White Domains --- //

{id: 'ZephyrasPlateau', name: 'Zephyra's Plateau', rarity: 'Common', image: 'Cards/Avian/ZephyrasPlateau.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'StandardPack2'},
 
{id: 'AngelsReach', name: 'Angel's Reach', rarity: 'Common', image: 'Cards/Seraph/AngelsReach.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'EchoesofCreation'},

{id: 'HalosCrown', name: 'Halo's Crown', rarity: 'Common', image: 'Cards/Domain/HalosCrown.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'FracturedOrigins'},
 
{id: 'SunspireSanctum', name: 'Sunspire Sanctum', rarity: 'Common', image: 'Cards/Domain/SunspireSanctum.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'EchoesofCreation'},
 
{id: 'DawnbreakRidge', name: 'Dawnbreak Ridge', rarity: 'Common', image: 'Cards/Domain/DawnbreakRidge.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'FracturedOrigins'},
 
{id: 'LumenlowFields', name: 'Lumenlow Fields', rarity: 'Common', image: 'Cards/Domain/LumenlowFields.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'ElementaGenesis'},
 
{id: 'RadianteEnclave', name: 'Radiante Enclave', rarity: 'Common', image: 'Cards/Domain/RadianteEnclave.png', flavor: '', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'EchoesofCreation'},

// ---- TOKENS ---- //
 
// --- Goblin Tokens --- //
{id: 'GoblinTokenGreen', name: 'Forest Goblin', rarity: 'Common', image: 'Cards/Token/GoblinTokenGreen.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Brute', archetype: 'Goblin', hp: 4, atk: 1, def: 0},
{id: 'GoblinTokenRed', name: 'Smoke Goblin', rarity: 'Common', image: 'Cards/Token/GoblinTokenRed.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Brute', archetype: 'Goblin', hp: 2, atk: 2, def: 0},
{id: 'GoblinTokenPurple', name: 'Mire Goblin', rarity: 'Common', image: 'Cards/Token/GoblinTokenPurple.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Brute', archetype: 'Goblin', hp: 3, atk: 1, def: 0},
{id: 'GoblinTokenGray', name: 'Craft Goblin', rarity: 'Common', image: 'Cards/Token/GoblinTokenGray.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Brute', archetype: 'Goblin', hp: 3, atk: 1, def: 1},
{id: 'GoblinTokenBlack', name: 'Evil Goblin', rarity: 'Common', image: 'Cards/Token/GoblinTokenBlack.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Brute', archetype: 'Goblin', hp: 3, atk: 1, def: 0},

// --- Fairy Tokens --- //
{id: 'FairyTokenGreen', name: 'Forest Fairy', rarity: 'Common', image: 'Cards/Token/FairyTokenGreen.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Fairy', hp: 1, atk: 1, def: 0, archetype: 'Fairy', ability: 'Flying'},
// --- Satyr Tokens --- //
{id: 'SatyrTokenGreen', name: 'Satyr', rarity: 'Common', image: 'Cards/Token/SatyrTokenGreen.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Satyr', hp: 5, atk: 1, def: 1, ability: 'Protect'},
{id: 'SatyrTokenRed', name: 'Inferno Satyr', rarity: 'Common', image: 'Cards/Token/SatyrTokenRed.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Faefolk', archetype: 'Satyr', hp: 2, atk: 2, def: 0, ability: 'Rush'},
{id: 'SatyrTokenGray', name: 'Terra Satyr', rarity: 'Common', image: 'Cards/Token/SatyrTokenGray.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Faefolk', archetype: 'Satyr', hp: 4, atk: 1, def: 1},
{id: 'SatyrTokenPurple', name: 'Corrupted Satyr', rarity: 'Common', image: 'Cards/Token/SatyrTokenPurple.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Faefolk', archetype: 'Satyr', trait: 'Ranger', hp: 2, atk: 1, def: 0, ability: 'Venom'},
// --- Construct Tokens --- //
{id: 'CinderScoutToken', name: 'Cinder Scout', rarity: 'Common', image: 'Cards/Token/CinderScoutToken.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Construct', archetype: 'Cindercore', hp: 2, atk: 1, def: 0, ability: 'Rush'},
{id: 'CoralDroneToken', name: 'Coral Drone', rarity: 'Common', image: 'Cards/Token/CoralDroneToken.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Construct', archetype: 'Coralbound', hp: 1, atk: 1, def: 1, ability: 'Protect'},
// --- Other Tokens --- // 
{id: 'TreantToken', name: 'Treant', rarity: 'Common', image: 'Cards/Token/TreantToken.png', flavor: '', 
 category: 'Creature', color: ['Green', 'Black'], type: 'Elemental', archetype: 'Arbor', hp: 6, atk: 2, def: 1},
{id: 'PhoenixAshes', name: 'Phoenix Ashes', rarity: 'Common', image: 'Cards/Token/PhoenixAshes.png', flavor: '', 
 category: 'Creature', color: ['Red', 'Yellow'], type: 'Avian', archetype: 'Pyreclad', hp: 1, atk: 0, def: 0},
{id: 'DragonEgg', name: 'Dragon Egg', rarity: 'Common', image: 'Cards/Token/DragonEgg.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Dragon', hp: 1, atk: 0, def: 0},
{id: 'BirdfolkTokenYellow', name: 'Forest Fairy', rarity: 'Common', image: 'Cards/Token/BirdfolkTokenYellow.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Avian', archetype: 'Zephyra', hp: 3, atk: 1, def: 0, ability: 'Flying'},
{id: 'SkeletonToken', name: 'Skeleton', rarity: 'Common', image: 'Cards/Token/SkeletonToken.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Undead', hp: 1, atk: 1, def: 0, ability: 'Immunity'},
{id: 'WolfToken', name: 'Wolf', rarity: 'Common', image: 'Cards/Token/WolfToken.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Beast', archetype: 'Moonfang', hp: 2, atk: 1, def: 0, ability: 'Ambush'},
{id: 'BatToken', name: 'Bat', rarity: 'Common', image: 'Cards/Token/BatToken.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Beast', archetype: 'Vampiric', hp: 3, atk: 2, def: 0, ability: ['Drain','Flying']},
{id: 'ImpToken', name: 'Imp', rarity: 'Common', image: 'Cards/Token/ImpToken.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Demon', archetype: '', hp: 1, atk: 2, def: 0, ability: ['Ambush','Flying']},
 
// --- Elemental Tokens --- //
{id: 'ElementalTokenGreen', name: 'Elemental of Leaves', rarity: 'Common', image: 'Cards/Token/ElementalTokenGreen.png', flavor: '', 
 category: 'Creature', color: 'Green', type: 'Elemental', archetype: 'Arbor', hp: 5, atk: 1, def: 1,
 skill: [{name: 'Fuse', cost: '{g}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenRed', name: 'Elemental of Embers', rarity: 'Common', image: 'Cards/Token/ElementalTokenRed.png', flavor: '', 
 category: 'Creature', color: 'Red', type: 'Elemental', archetype: 'Pyro', hp: 2, atk: 2, def: 0, ability: ['Burn', 'Elusive', 'Scorch'],
 skill: [{name: 'Fuse', cost: '{r}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenBlue', name: 'Elemental of Droplets', rarity: 'Common', image: 'Cards/Token/ElementalTokenBlue.png', flavor: '', 
 category: 'Creature', color: 'Blue', type: 'Elemental', archetype: 'Hydral', hp: 4, atk: 1, def: 0, ability: ['Soak', 'Elusive', 'Drenched'],
 skill: [{name: 'Fuse', cost: '{u}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenYellow', name: 'Elemental of Sparks', rarity: 'Common', image: 'Cards/Token/ElementalTokenYellow.png', flavor: '', 
 category: 'Creature', color: 'Yellow', type: 'Elemental', archetype: 'Voltkin', hp: 3, atk: 1, def: 0, ability: ['Paralyze', 'Elusive', 'Static'],
 skill: [{name: 'Fuse', cost: '{y}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenPurple', name: 'Elemental of Toxins', rarity: 'Common', image: 'Cards/Token/ElementalTokenPurple.png', flavor: '', 
 category: 'Creature', color: 'Purple', type: 'Elemental', archetype: 'Corruptor', hp: 2, atk: 1, def: 0, ability: ['Venom', 'Elusive', 'Poisonous'],
 skill: [{name: 'Fuse', cost: '{p}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenGray', name: 'Elemental of Pebbles', rarity: 'Common', image: 'Cards/Token/ElementalTokenGray.png', flavor: '', 
 category: 'Creature', color: 'Gray', type: 'Elemental', archetype: 'Golem', hp: 3, armor: 2, atk: 1, def: 1,
 skill: [{name: 'Fuse', cost: '{c}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenBlack', name: 'Elemental of Shades', rarity: 'Common', image: 'Cards/Token/ElementalTokenBlack.png', flavor: '', 
 category: 'Creature', color: 'Black', type: 'Elemental', archetype: 'Obscurid', hp: 3, atk: 1, def: 0, ability: ['Drain', 'Elusive'],
 skill: [{name: 'Fuse', cost: '{b}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenWhite', name: 'Elemental of Gleams', rarity: 'Common', image: 'Cards/Token/ElementalTokenWhite.png', flavor: '', 
 category: 'Creature', color: 'White', type: 'Elemental', archetype: 'Luminaut', hp: 4, atk: 1, def: 0,
 skill: [{name: 'Fuse', cost: '{w}', effect: {class: 'Fuse'}}]},
 */
];

// Cost mapping and renderer (returns HTML string)
const COST_IMAGE_MAP = {
  G: "Icons/Essence/Green.png",
  R: "Icons/Essence/Red.png",
  U: "Icons/Essence/Blue.png",
  Y: "Icons/Essence/Yellow.png",
  C: "Icons/Essence/Gray.png",
  P: "Icons/Essence/Purple.png",
  B: "Icons/Essence/Black.png",
  W: "Icons/Essence/White.png",
  X0: "Icons/Essence/Zero.png",
  X1: "Icons/Essence/One.png",
  X2: "Icons/Essence/Two.png",
  X3: "Icons/Essence/Three.png",
  X4: "Icons/Essence/Four.png",
  X5: "Icons/Essence/Five.png",
  X6: "Icons/Essence/Six.png",
  X7: "Icons/Essence/Seven.png",
  X8: "Icons/Essence/Eight.png",
  X9: "Icons/Essence/Nine.png",
  X10: "Icons/Essence/Ten.png",
  X11: "Icons/Essence/Eleven.png",
  X12: "Icons/Essence/Twelve.png",
  X13: "Icons/Essence/Thirteen.png",
  X14: "Icons/Essence/Fourteen.png",
  X15: "Icons/Essence/Fifteen.png",
  X16: "Icons/Essence/Sixteen.png",
  X17: "Icons/Essence/Seventeen.png",
  X18: "Icons/Essence/Eighteen.png",
  X19: "Icons/Essence/Nineteen.png",
  X20: "Icons/Essence/Twenty.png"
};
const addCoinsBtn = document.getElementById('add-coins-btn');
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000];
let lastPlayerPower = null;

const FILTERS_CONFIG = [
  { key: 'ownership', label: 'Ownership', options: ['All','Owned','Undiscovered','Locked'], hideIn: ['builder'] },
  { key: 'color', label: 'Color', options: ['All','Green','Red','Blue','Gray','Purple','Yellow','Black','White'] },
  { key: 'category', label: 'Category', options: ['All','Creature','Artifact','Spell','Domain'] },
  { key: 'type', label: 'Type', options: ['All','Beast','Brute','Construct','Demon','Dragon','Elemental','Faefolk','Human','Undead'] },
  { key: 'rarity', label: 'Rarity', options: ['All','Common','Rare','Legendary'] },
  { key: 'trait', label: 'Trait', options: ['All','Assembly','Dominion','Evolution','Fusion','Warrior','Mage','Ranger','Relic','Equipment','Aura','Terrain','Locale'] },
  { key: 'archetype', label: 'Archetype', options: ['All','Blazefeather','Cindercore','Coralbound','Fireland','Frostland','Golemheart','Moonfang','Skullframe','Voltwing','Zephyra'] },
  { key: 'ability', label: 'Ability', options: ['All','Aegis','Ambush','Blightstrike','Burn','Conceal','Crush','Curse',
    'Defender','Defiant','Dive','Dormant','Drain','Drench','Elusive','Exploit','Flying','Focus','Freeze','Frostbite',
    'Immunity','Intimidate','Leap','Levitate','Paralyze','Pierce','Pilfer','Poisonous','Precision','Protect','Provoke',
    'Regenerate','Relentless','Resilience','Rush','Scorch','Soak','Static','Toxic','Unbreakable','Veil','Wither']},
  { key: 'pack', label: 'Pack', options: ['All', 'ElementaGenesis', 'FracturedOrigins','EchoesofCreations','DesolateFrontiers','InfiniteHorizons'] }
 // Add more as needed
];

const filterState = {
  gallery: {},
  builder: {}
  // Each key: filterKey -> array of selected options
};

const CARD_KEYWORD = {
// ------------- //
// --- STATS --- //
// ------------- //
attack: {name: "Attack", description: "Attack value.", icon: "Icons/Stat/Atk.png" },
defense: {name: "Defense", description: "Defense value.", icon: "Icons/Stat/Def.png" },
armor: {name: "Armor", description: "Secondary sustain stat. Units loss armor first before HP. When the armor breaks, nullifies remaining damage. Losses {1} Speed", icon: "Icons/Stat/Armor.png" },
speed: {name: "Speed", description: "Speed value. Dash, Dive, Flying, Leap, and Rush +1 Spd. Mage +1 Spd. Ranger +2 Spd. Armor -1 Spd. Spd dif is  =>2 gain Quickstrike. Spd dif is => 3 gain Superstrike.", icon: "Icons/Stat/Spd.png" },

// -------------- //
// --- COLORS --- //
// -------------- //
green: {name: "Green", description: "", icon: "Icons/Color/Green.png" },
red: {name: "Red", description: "", icon: "Icons/Color/Red.png" },
blue: {name: "Blue", description: "", icon: "Icons/Color/Blue.png" },
yellow: {name: "Yellow", description: "", icon: "Icons/Color/Yellow.png" },
gray: {name: "Gray", description: "", icon: "Icons/Color/Gray.png" },
purple: {name: "Purple", description: "", icon: "Icons/Color/Purple.png" },
white: {name: "White", description: "", icon: "Icons/Color/White.png" },
black: {name: "Black", description: "", icon: "Icons/Color/Black.png" },

// ----------------- //
// --- ABILITIES --- //
// ----------------- //
aegis: {name: "Aegis", description: "Prevents the next damage received, then is removed.", icon: "Icons/Ability/Aegis.png" },
ambush: {name: "Ambush", description: "Cannot be targeted by opponent's attacks or skills. Gets revealed after attacking or using a skill.", icon: "Icons/Ability/Ambush.png" },
blightstrike: {name: "Blightstrike", description: "Destroys enemy creature after dealing damage.", icon: "Icons/Ability/Blightstrike.png" },
bind: {name: "Bind", description: "Burns after an attack or skill.", icon: "Icons/Ability/Bind.png" },
burn: {name: "Burn", description: "Burns after an attack or skill.", icon: "Icons/Ability/Burn.png" },
conceal: {name: "Conceal", description: "Opponent can only target this creature for attacks last", icon: "Icons/Ability/Conceal.png" },
crush: {name: "Crush", description: "Remove all armor from target unit.", icon: "Icons/Ability/Crush.png"},
curse: {name: "Curse", description: "Curses opposing creature after dealing damage.", icon: "Icons/Ability/Curse.png"},
defender: {name: "Defender", description: "Deals damage using its defense while disabled.", icon: "Icons/Ability/Defender.png" },
defiant: {name: "Defiant", description: "Does not disable after attacking.", icon: "Icons/Ability/Defiant.png" },
dive: {name: "Dive", description: "Cannot be targeted while disabled.", icon: "Icons/Ability/Dive.png" },
dormant: {name: "Dormant", description: "When summoned, it gets disabled.", icon: "Icons/Ability/Dormant.png" },
drain: {name: "Drain", description: "Gain HP equal to damage dealt by attacks.", icon: "Icons/Ability/Drain.png" },
drench: {name: "Drench", description: "Soaks after an attack", icon: "Icons/Ability/Drench.png" },
elusive: {name: "Elusive", description: "Cannot be damaged by attacks.", icon: "Icons/Ability/Elusive.png" },
exploit: {name: "Exploit", description: "Deals {1} more damage with attacks if the enemy has any hindrance.", icon: "Icons/Ability/Exploit.png" },
flying: {name: "Flying", description: "Can only be blocked by other Flying{flying}, Mage{mage} or Ranger{ranger} units. Speed {1}.", icon: "Icons/Ability/Flying.png" },
focus: {name: "Focus", description: "Can attack any card regardless of abilities (except Ambush)", icon: "Icons/Ability/Focus.png" },
freeze: {name: "Freeze", description: "Freezes after an attack or skill.", icon: "Icons/Ability/Freeze.png" },
frostbite: {name: "Frostbite", description: "Freezes after an attack", icon: "Icons/Ability/Frostbite.png" },
immunity: {name: "Immunity", description: "Unaffected by status ailments.", icon: "Icons/Ability/Immunity.png" },
intimidate: {name: "Intimidate", description: "When declaring an attack, disable defending creature", icon: "Icons/Ability/Intimidate.png" },
leap: {name: "Leap", description: "Can attack Flying characters. Speed +{1}", icon: "Icons/Ability/Leap.png" },
levitate: {name: "Levitate", description: "Cannot be disabled. Speed +{1}", icon: "Icons/Ability/Levitate.png" },
paralyze: {name: "Paralyze", description: "Paralyzes after an attack or skill.", icon: "Icons/Ability/Paralyze.png" },
pierce: {name: "Pierce", description: "Ignores Armor.", icon: "Icons/Ability/Pierce.png"},
pilfer: {name: "Pilfer", description: "Steals any essence after attacking.", icon: "Icons/Ability/Pilfer.png"},
poisonous: {name: "Poisonous", description: "Poisons after an attack", icon: "Icons/Ability/Poisonous.png" },
precision: {name: "Precision", description: "Ignores Evasion. Speed {1}", icon: "Icons/Ability/Precision.png" },
provoke: {name: "Provoke", description: "Enemy creatures must attack if able", icon: "Icons/Ability/Provoke.png" },
protect: {name: "Protect", description: "Opponent can only target this creature for attacks.", icon: "Icons/Ability/Protect.png" },
regenerate: {name: "Regenerate", description: "Recover {1} HP during each End Step.", icon: "Icons/Ability/Regenerate.png" },
relentless: {name: "Relentless", description: "Does not disable after the first attack. Can attack again.", icon: "Icons/Ability/Relentless.png" },
resilience: {name: "Resilience", description: "Does not disable after defending", icon: "Icons/Ability/Resilience.png" },
rush: {name: "Rush", description: "Can attack on the turn it is played. Speed {1}.", icon: "Icons/Ability/Rush.png" },
scorch: {name: "Scorch", description: "Burns after an attack", icon: "Icons/Ability/Scorch.png" },
soak: {name: "Soak", description: "Soaks after an attack or skill.", icon: "Icons/Ability/Soak.png" },
static: {name: "Static", description: "Inflicts {paralysis} upon fighting. Paralyzed cards cannot", icon: "Icons/Ability/Static.png" },
toxic: {name: "Venom", description: "Poisons after an attack or skill.", icon: "Icons/Ability/Toxic.png" },
unbreakable: {name: "Unbreakable", description: "Cannot be destroyed by effects.", icon: "Icons/Ability/Unbreakable.png" },
veil: {name: "Veil", description: "Cannot be targeted by effects.", icon: "Icons/Ability/Veil.png" },
wither: {name: "Wither", description: "Inflict {wither} upon dealing damage. Withered cards cannot be healed.", icon: "Icons/Ability/Wither.png" },

evasion: {name: "Evasion", description: "Prevents the next attack or skill to your unit. Consumes {1} Evasion counter.", icon: "Icons/Ability/Evasion.png" },

// -------------------- //
// --- REQUIREMENTS --- //
// -------------------- //
discard: {name: "Discard", description: "Sends from the hand to the void as a cost."},
stash: {name: "Stash", description: "Returns from the hand to the deck as a cost."},
recycle: {name: "Recycle", description: "Returns from the void to the deck as a cost."},
retreat: {name: "Retreat", description: "Returns from the field to the hand as a cost."},
withdraw: {name: "Withdraw", description: "Returns from the field to the deck as a cost."},
sacrifice: {name: "Sacrifice", description: "Sends from the field to the void as a cost."},

// -------------- //
// --- SKILLS --- //
// -------------- //
 
// --- Activation Triggers --- //
arrival: {name: "Arrival", description: "Activates when an unit is summoned."},
echo: {name: "Echo", description: "Activates when an unit is sent to the void."},
draw: {name: "Draw", description: "Activates when a card is drawn."},
assault: {name: "Assault", description: "Activates after declaring an attack."},
frenzy: {name: "Frenzy", description: "Activates after dealing damage with an attack."},
defender: {name: "Defender", description: "Activates after the opponent declares an attack."},
brace: {name: "Brace", description: "Activates after receiving damage from an attack."},

// --- SKILLS --- //
strike: {name: "Strike", description: "Deal damage to target unit."},
burst: {name: "Burst", description: "Deal damage to all opponent units."},
destroy: {name: "Destroy", description: "Send one unit from the field to the void."},
banish: {name: "Banish", description: "Return one unit from the field to the deck."},
repel: {name: "Repel", description: "Return one unit from the field to the hand."},
mill: {name: "Mill", description: "Sends one card from the deck to the void."},

// --- SELF SUMMON SKILLS --- //
reanimate: {name: "Reanimate", description: "Summon from the void."},
dash: {name: "Dash", description: "Summon from the hand with half HP (rounded up). Gain {1} Speed."},
overcharge: {name: "Overcharge", description: "Summon from the hand. Gain {1}/{1}"},
manifest: {name: "Manifest", description: "Summon from the deck after meeting certain conditions."},

// --- PHASE SKILLS --- //
awaken: {name: "Awaken", description: "Activates during the draw step."},
aftermath: {name: "Aftermath", description: "Activates during the end step."},

// --- WEATHER SKILLS --- //
drought: {name: "Drought", description: "Summons Sunlight{sunlight} and Sunburst{sunburst}.", icon: "Icons/Weather/Drought.png" },
drizzle: {name: "Drizzle", description: "Summons Rain{rain} and Downpour{downpour}.", icon: "Icons/Weather/Drizzle.png" },
stormcall: {name: "Stormcall", description: "Summons Storm{storm} and Thunderstorm{thunderstorm}.", icon: "Icons/Weather/Stormcall.png" },
frostcall: {name: "Frostcall", description: "Summons Snowfall and Blizzard.", icon: "Icons/Weather/Frostcall.png" },
strongwinds: {name: "Strongwinds", description: "Summons Gale and Hurricane.", icon: "Icons/Weather/Strongwinds.png" },
eruption: {name: "Eruption", description: "Summons Ashfall.", icon: "Icons/Weather/Eruption.png" },
decay: {name: "Decay", description: "Summons Miasma.", icon: "Icons/Weather/Decay.png" },
mystveil: {name: "Mystveil", description: "Summons Mist", icon: "Icons/Weather/Mist.png" },

// ---------------------------------- //
// --- STATUS AND WEATHER EFFECTS --- //
// ---------------------------------- //

// --- STATUS EFFECTS --- //
poisoned: {name: "Poisoned", description: "Lose 1 HP during each end step."},
bound: {name: "Bound", description: "Gets disabled. Does not enable during Start Step."},
burned: {name: "Burned", description: "Receives 1 more damage."},
frozen: {name: "Frozen", description: "Cannot do any action. Does not receive damage. If damaged, reduce the countdown by 1."},
paralysis: {name: "Paralysis", description: "Cannot attack. Lasts 2 turns per stack"},
soaked: {name: "Soaked", description: "Loses -{1} {atk}."},
withered: {name: "Withered", description: "Cannot be healed."},

// --- WEATHER EFFECTS --- //
sunlight: {name: "Sunlight", description: "Inferno +{1}/{0}. Radiance {0}/+{1}.", icon: "Icons/Weather/Sunlight.png" },
sunburst: {name: "Sunburst", description: "Inferno +{2}/{0}. Radiance +{1}/+{1}.", icon: "Icons/Weather/Sunburst.png" },
rain: {name: "Rain", description: "Tidal +{1}/{0}. Sylvan {0}/+{1}.", icon: "Icons/Weather/Rain.png" },
downpour: {name: "Downpour", description: "Tidal +{1}/+{1}. Sylvan {0}/+{1}.", icon: "Icons/Weather/Downpour.png" },
storm: {name: "Storm", description: "Tempest +{1}/{0}. Tidal {0}/+{1}.", icon: "Icons/Weather/Storm.png" },
thunderstorm: {name: "Thunderstorm", description: "Tempest +{2}/{0}. Tidal {0}/+{1}.", icon: "Icons/Weather/Thunderstorm.png" },
snowfall: {name: "Snowfall", description: "Frozen units lose 1 HP during the end step. Inspire {u} → Freeze.", icon: "Icons/Weather/Snowfall.png" },
blizzard: {name: "Blizzard", description: "Non-{u} units lose 1 HP during the end step. Inspire {u} → Freeze.", icon: "Icons/Weather/Blizzard.png" },
gale: {name: "Gale", description: "Tempest +{1}/{0}.", icon: "Icons/Weather/Gale.png" },
hurricane: {name: "Hurricane", description: "Tempest +{2}/{0}.", icon: "Icons/Weather/Hurricane.png" },
eruption: {name: "Eruption", description: "Inferno +{1}/{0}. Terra {0}/+{1}.", icon: "Icons/Weather/Eruption.png" },
decay: {name: "decay", description: "Corrupted +{1}/+{1}.", icon: "Icons/Weather/Decay.png" },
mystveil: {name: "Mystveil", description: "Sylvan +{1}/+{1}.", icon: "Icons/Weather/Mystveil.png" },

// -------------------- //
// --- TRAIT SKILLS --- //
// -------------------- //
assembly: {name: "Assembly", description: "Summon from the hand | Attach selected spare parts.", icon: "Icons/Trait/Assembly.png" },
evolve: {name: "Evolve", description: "Get an 'Evolve' counter.", icon: "Icons/Trait/Evolve.png" },
evolution: {name: "Evolution", description: "Summon from the hand | Attach 1 unit of the same archetype that have an 'Evolve' counter on it.", icon: "Icons/Trait/Evolution.png" },
voidEvolution: {name: "Void Evolution", description: "Summon from the hand/void | Attach 1 unit of the same type/archetype that have an 'Evolve' counter on it.", icon: "Icons/Trait/VoidEvolution.png" },
fuse: {name: "Fuse", description: "Get a 'Fuse' counter.", icon: "Icons/Trait/Fuse.png" },
fusion: {name: "Fusion", description: "Summon from the hand | Attach 2 units of the same archetype that have a 'Fuse' counter on it.", icon: "Icons/Trait/Fusion.png" },
voidFusion: {name: "Void Fusion", description: "Summon from the hand/void | Attach 2 units of the same type/archetype that have a 'Fuse' counter on it.", icon: "Icons/Trait/VoidFusion.png" },
transform: {name: "Transform", description: "Transforms unit by certain conditions | Attach it to the summoned unit", icon: "Icons/Trait/Transform.png" },
warrior: {name: "Warrior", description: "Close combat units. If HP is below 1/3, gain {1}/{1}.", icon: "Icons/Trait/Warrior.png" },
mage: {name: "Mage", description: "Can target flying and elusive creatures for attacks. Gain {1} Spd", icon: "Icons/Trait/Mage.png" },
ranger: {name: "Ranger", description: "Can target flying creatures for attacks. Gain {2} Spd", icon: "Icons/Trait/Ranger.png" },
relic: {name: "Relic", description: "Attach to Domains of the same Color.", icon: "Icons/Trait/Relic.png" },
equipment: {name: "Equipment", description: "Attach to Creatures of the same Color/Type/Archetype.", icon: "Icons/Trait/Equipment.png" },
aura: {name: "Aura", description: "Attach to creatures.", icon: "Icons/Trait/Aura.png" },
enchantment: {name: "Enchantment", description: "Attach to lands.", icon: "Icons/Trait/Enchantment.png" },

// ----- //
// TYPES //
// ----- //
avian: {name: "Construct", icon: "Icons/Type/Avian.png" , description: "Graceful and fierce, the avians rule the skies with wisdom born of the wind. From mountaintop sanctuaries they watch the shifting lands below, their keen eyes ever wary, their hearts bound to the endless horizon. Whether messengers of dawn or harbingers of storm, the Avians embody freedom itself — swift, untouchable, and guided by the breath of the heavens."},
beast: {name: "Beast", icon: "Icons/Type/Beast.png" , description: "Untamed and primal, beasts embody the raw pulse of nature unshaped by reason or restraint. From the silent hunter stalking through shadowed woods to the thunderous titan that shakes the earth, each creature moves with instinctive purpose. Though driven by hunger and survival, beasts are more than mere savagery — they are the heartbeat of the wild, the first language of a world that remembers no masters."},
brute: {name: "Brute", icon: "Icons/Type/Brute.png" , description: "Savage and unyielding, the Brute are forged in struggle and bound by blood. They thrive where strength is law and survival the only creed, their lives shaped by war, hunger, and the will to endure. Though scorned as beasts by softer races, they bear a primal honor — a truth carved in scars and fire. To face the Brute is to meet the raw, untamed spirit of the world before it learned mercy."},
construct: {name: "Construct", icon: "Icons/Type/Construct.png" , description: "Forged by mortal hands yet animated by unnatural will, constructs stand as monuments to creation without life. Some serve with perfect obedience, others wander seeking the purpose their makers abandoned. Whether wrought from steel, stone, or enchanted coral, each construct bears the echo of its creator’s intent — a silent testament to the line between genius and hubris."},
demon: {name: "Demon", icon: "Icons/Type/Demon.png" , description: "Born from malice, ambition, and the echoes of forsaken gods, demons are the chaos that festers beneath creation. They thrive in conflict, feeding on desire, fear, and despair — yet each is bound by its own cunning will. To mortals they appear as nightmares made flesh, but to themselves they are architects of freedom, tearing down the fragile order that cages the world. Their power is corruption, and their truth — liberation through ruin."},
dragon: {name: "Dragon", icon: "Icons/Type/Dragon.png" , description: "Majestic, ancient, and unmatched in power, dragons embody the primal forces of creation and destruction. Each scale glimmers with the legacy of ages, and each breath reshapes the world itself. Though their temperaments vary—from wise guardians to wrathful tyrants—all dragons command awe and fear in equal measure, their presence a living reminder that the elements themselves can take form and will."},
elemental: {name: "Elemental", icon: "Icons/Type/Elemental.png" , description: "Primordial and eternal, elementals are the living essence of the world’s raw forces. They are not born, but awakened; the whisper of wind given voice, the heartbeat of stone given motion. Neither good nor evil, they embody balance, shaping creation with every surge of flame, wave, or storm."},
faefolk: {name: "Faefolk", icon: "Icons/Type/Faefolk.png" , description: "Enigmatic and timeless, the Faefolk dwell where wonder and deceit intertwine. They are the laughter in moonlit groves, the whispers between leaves, and the shimmer at the edge of mortal sight. Guided by whim as much as wisdom, their magic bends nature’s laws with effortless grace — nurturing or destroying with the same delicate hand. To bargain with the Faefolk is to dance with beauty and peril alike."},
human: {name: "Human", icon: "Icons/Type/Human.png" , description: ""},
undead: {name: "Undead", icon: "Icons/Type/Human.png" , description: "" },
celestial: {name: "Celestial", icon: "Icons/Type/Celestial.png" , description: "Beacons of divinity and order, the celestials are born of pure light and cosmic harmony. Their presence bends the heavens and stills the storms, for they are the will of creation made radiant. Guided by purpose beyond mortal grasp, they bring both mercy and judgment — for in their eyes, salvation and destruction are but reflections of balance restored."},

// ---------- //
// ARCHETYPES //
// ---------- //
fireland: {name: "Fireland", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Fireland.png" , description: "Born of volcanic wrath and infernal hunger, these fire-beasts hunt not for survival, but to spread the consuming blaze of their cursed homeland. Fueled by relentless ferocity, the Fireland are defined by their fiery rushing strikes. They are known by their aggression, overwhelming foes with sudden, searing attacks before the battle has even begun."},
webcursed: {name: "Webcursed", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Webcursed.png" , description: "Born from shadowed corners and forgotten ruins, the Webcursed are spiders whose venom and silk ensnare all who dare enter their lair. Each step into their tangled domain invites paralysis and dread, as they patiently hunt, binding prey in intricate traps. Cunning and relentless, the Webcursed weave both terror and death into every silken strand."},
frostland: {name: "Frostland", profile: { hp: 8, atk: 2, def: 9, spd: 2, hc: 10, ep: 1 }, icon: "Icons/Archetype/Frostland.png" , description: "Born of glacial silence and eternal winter, the Frostland embody the merciless stillness of the frozen wastes. Their strength lies not in speed, but in control, freezing foes in place and shattering them with ruthless precision. Defined by their mastery of ice, they lock enemies in chilling stasis before striking the final, frigid blow."},
golem: {name: "Golem", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Golem.png" , description: "Forged from stone, metal, and elemental essence, golems are unstoppable engines of brute force. Their armored bodies shrug off attacks, while their immense strength allows them to exploit every weakness in their foes. Patient yet relentless, golems dominate the battlefield, their elemental fury leaving devastation in their calculated, crushing path."},

// --- Undead --- //
skullframe: {name: "Skullframe", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 5 }, icon: "Icons/Archetype/Skullframe.png" , description: "Clad in bone and bound by forbidden sorcery, the Skullframe march as deathless engines of war. When shattered, dark magic stitches marrow and spirit back together, raising them anew. Masters of necrotic arts and relentless persistence, the Skullframe are an archetype of inevitability, overwhelming foes with grim magic and unending reanimation until nothing living remains to resist."},

// --- Celestial --- //
seraph: {name: "Seraph", profile: { hp: 9, atk: 4, def: 8, spd: 4, hc: 3, ep: 4 }, icon: "Icons/Archetype/Seraph.png" , description: "Born of radiant light and celestial grace, the Seraph soar above the battlefield as guardians and warriors. Their wings gleam with divine energy, and their presence purifies and inspires those around them. Majestic and unwavering, they strike with the justice of the heavens, defending the innocent and smiting darkness wherever it dwells."},

// --- Beast --- //
mythic: {name: "Mythic", profile: { hp: 8, atk: 7, def: 4, spd: 5, hc: 2, ep: 3 }, icon: "Icons/Archetype/mythic.png" , description: "Ferocious and untamed, Hybrids roam the wilds with bodies forged from multiple forms. With the strength of a bull, the speed of a stag, or the cunning of a fox, each beast strikes fear into those who cross their path. Raw instincts and primal power guide them, making every encounter with a Hybrid a savage test of survival."},
moonfang: {name: "Moonfang", profile: { hp: 5, atk: 9, def: 3, spd: 8, hc: 1, ep: 5 }, icon: "Icons/Archetype/Moonfang.png" , description: "Born of lunar light and shadowed forests, the Moonfang wolves prowl by day with keen senses and silent steps. When the moon rises, their forms twist into fearsome werewolves, claws and fangs sharpened by the night. Driven by instinct and the pull of the moon, they strike with relentless ferocity, hunting as packs that embody both cunning and primal wrath."},

// --- Faefolk --- //
fairy: {name: "Fairy", profile: { hp: 1, atk: 8, def: 2, spd: 8, hc: 2, ep: 10 }, icon: "Icons/Archetype/Fairy.png" , description: "Delicate yet mischievous, fairies flit through forests and meadows, their presence leaving trails of sparkling light. Though small, they wield surprising magic, weaving illusions and enchantments to protect their homes or play tricks on unwary travelers. Their beauty belies a cunning and spirited nature, always dancing between wonder and mischief."},
elf: {name: "Elf", profile: { hp: 6, atk: 6, def: 4, spd: 6, hc: 2, ep: 7 }, icon: "Icons/Archetype/Elf.png" , description: "Graceful and eternal, elves move with the harmony of the forests they protect. Skilled in both magic and archery, they strike with precision and wisdom, blending into nature as if part of it. Their keen senses and ancient knowledge make them formidable guardians, defending their realms with elegance, patience, and unwavering resolve."},
satyr: {name: "Satyr", profile: { hp: 7, atk: 5, def: 5, spd: 5, hc: 3, ep: 8 }, icon: "Icons/Archetype/Satyr.png" , description: "Wild-hearted and cunning, Satyrs embody the untamed spirit of nature. Their laughter echoes through moonlit groves as they dance between mischief and wisdom, balancing chaos and creation. Though their revels seem carefree, Satyrs are fierce protectors of their forests—striking swiftly with wit, charm, and primal magic when their woodland sanctuaries are threatened."},

// --- Brute --- // 
goblin: {name: "Goblin", profile: { hp: 2, atk: 7, def: 2, spd: 5, hc: 2, ep: 7 }, icon: "Icons/Archetype/Goblin.png" , description: "Small, cunning, and endlessly resourceful, goblins thrive in hidden warrens and shadowed corners. They scurry with mischievous intent, ambushing foes and exploiting every weakness. Though individually weak, they strike in numbers, their chaotic energy turning even the simplest skirmish into unpredictable mayhem."},
orc: {name: "Orcs", profile: { hp: 9, atk: 6, def: 8, spd: 3, hc: 1, ep: 1 }, icon: "Icons/Archetype/Orc.png" , description: "Brutal, relentless, and fiercely proud, orcs thrive on the chaos of battle. Their strength and endurance make them formidable warriors, while their tribal bonds and warlike culture drive them to conquer and dominate. Though often feared for their ferocity, orcs are bound by honor within their clans, turning raw power into disciplined, devastating force."},
dwarf: {name: "Dwarf", profile: { hp: 8, atk: 5, def: 9, spd: 1, hc: 3, ep: 3 }, icon: "Icons/Archetype/Dwarf.png" , description: "Stout and steadfast, dwarves are master smiths and artisans, shaping stone and metal with unmatched skill. Their halls echo with hammer strikes and the roar of furnaces, as they craft weapons, armor, and treasures of legendary quality. Fierce in defense and meticulous in craft, dwarves embody endurance, precision, and the enduring strength of their mountain homes."},

// --- Avian --- //
pyreclad: {name: "Pyreclad", profile: { hp: 1, atk: 8, def: 2, spd: 8, hc: 2, ep: 8 }, icon: "Icons/Archetype/Pyreclad.png" , description: "Born from blazing skies and molten embers, the Pyreclad are fierce avians wreathed in fire. Some bear armor forged in volcanic heat, turning them into flying fortresses of flame. Swift and relentless, they scorch the battlefield with fiery talons and blazing wings, leaving nothing but ash in their wake."},
voltwing: {name: "Voltwing", profile: { hp: 1, atk: 8, def: 1, spd: 10, hc: 3, ep: 10 }, icon: "Icons/Archetype/Voltwing.png" , description: "Born of storm and sky, the Voltwings are avians whose wings crackle with raw electricity. They dive with blinding speed, striking with piercing thunder that rends the air and scorches the battlefield. Agile and relentless, Voltwings are living lightning, their attacks swift, precise, and impossible to evade."},
zephyra: {name: "Zephyra", profile: { hp: 5, atk: 6, def: 5, spd: 9, hc: 1, ep: 8 }, icon: "Icons/Archetype/Voltwing.png" , description: "Born of storm and sky, the Voltwings are avians whose wings crackle with raw electricity. They dive with blinding speed, striking with piercing thunder that rends the air and scorches the battlefield. Agile and relentless, Voltwings are living lightning, their attacks swift, precise, and impossible to evade."},
duskwing: {name: "Duskwing", profile: { hp: 4, atk: 8, def: 2, spd: 7, hc: 4, ep: 9 }, icon: "Icons/Archetype/Duskwing.png" , description: "Shadows take flight in the form of Duskwings, dark avians whose sleek, crow-like forms glide silently through the night. With piercing eyes and razor-sharp talons, they watch from above, harbingers of omens and stealthy strikes. Wherever they gather, darkness deepens, and the unseen becomes a dangerous ally."},
 
// --- Construct --- //
grovehusk: {name: "Grovehusk", profile: { hp: 9, atk: 2, def: 10, spd: 2, hc: 5, ep: 7 }, icon: "Icons/Archetype/Grovehusk.png" , description: "NA."},
cindercore: {name: "Cindercore", profile: { hp: 2, atk: 8, def: 7, spd: 1, hc: 2, ep: 6 }, icon: "Icons/Archetype/Cindercore.png" , description: "Forged in molten crucibles deep beneath the world, the Cindercore are living constructs of stone and flame. Their hearts burn with rivers of lava, each strike searing with lingering pain. Unlike other flames that flare and fade, Cindercore are defined by their never-ending burning mastery and unyielding defenses. They are an archetype of attrition, grinding foes down with relentless heat until only ash and ruin remain."},
coralbound: {name: "Coralbound", profile: { hp: 9, atk: 4, def: 7, spd: 3, hc: 3, ep: 1 }, icon: "Icons/Archetype/Coralbound.png" , description: "Forged in the abyssal depths where steel meets coral, these aquatic constructs channel the crushing force of the ocean. With cannons unleashing torrents of compressed, high-pressure water, the Coralbound strike with relentless precision. Their true lethality emerges against soaked opponents, turning vulnerability into devastation. Defined by their mechanical resilience and liquid ferocity, they drown foes beneath waves of unyielding power."},
stratosurge: {name: "Stratosurge", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Stratosurge.png" , description: "Forged from clouds, lightning, and the power of the heavens, the Stratosurge soar through the skies with divine purpose. Their bodies hum with electric energy, and their strikes rain down with precision from above. Majestic and unstoppable, they bring the fury of storms and the might of the heavens to every battlefield."},
stormdrive: {name: "Stormdrive", profile: { hp: 2, atk: 7, def: 4, spd: 6, hc: 5, ep: 6 }, icon: "Icons/Archetype/Stormdrive.png" , description: "Fueled by raw electricity and engineered for flight, Stormdrive blaze across the battlefield with blinding speed. Their crackling bodies strike with precision, discharging bolts that tear through defenses. Agile and relentless, they harness the chaotic energy of storms to dominate the skies and outpace any foe."},
ironwrought: {name: "Ironwrought", profile: { hp: 7, atk: 5, def: 10, spd: 1, hc: 2, ep: 4 }, icon: "Icons/Archetype/Ironwrought.png" , description: "Bound from stone and forged with iron, the Ironwrought constructs are embodiments of unyielding strength. Their massive frames crush obstacles and shield allies alike, moving with the relentless weight of the earth. Slow but unstoppable, they dominate the battlefield through sheer durability and grounded might."},
plagueaxis: {name: "Plagueaxis", profile: { hp: 7, atk: 7, def: 4, spd: 2, hc: 6, ep: 5 }, icon: "Icons/Archetype/Plagueaxis.png" , description: "Forged from toxic sludge and corrupted machinery, the Plagueaxis spread decay wherever they tread. Their bodies exude poisonous fumes, and their attacks corrode both earth and enemy alike. Relentless and insidious, they turn the battlefield into a hazardous wasteland, leaving blighted terrain and weakened foes in their wake."},
solarforge: {name: "Solarforge", profile: { hp: 9, atk: 4, def: 8, spd: 3, hc: 2, ep: 7 }, icon: "Icons/Archetype/Solarforge.png" , description: "Forged from molten light and radiant energy, the Solarforge shine with unyielding brilliance. Their bodies radiate warmth and power, blinding foes while protecting allies. Every strike channels the fury of the sun, turning their presence into a beacon of strength and a force of relentless illumination on the battlefield."},
shadowgear: {name: "Shadowgear", profile: { hp: 1, atk: 7, def: 5, spd: 5, hc: 7, ep: 6 }, icon: "Icons/Archetype/Shadowgear.png" , description: "Bound by darkness and animated by restless shades, the Shadowgear move with eerie precision. Armor and weaponry fused with shadow strike unseen, slipping through defenses to overwhelm foes. Silent and relentless, they turn ordinary machinery into vessels of fear, wielding shadows as both shield and blade."},

// --- Elemental --- // 
arbor: {name: "Arbor", profile: { hp: 9, atk: 1, def: 6, spd: 3, hc: 7, ep: 10 }, icon: "Icons/Archetype/Arbor.png" , description: "Born of roots, bark, and the living green of forests, the Arbor are guardians of nature’s heart. Their limbs weave and grow with unstoppable force, entangling foes and protecting the land. Patient yet relentless, they draw strength from the earth, turning forests into living battlegrounds where every vine and branch is a weapon."},
pyro: {name: "Pyro", profile: { hp: 3, atk: 8, def: 2, spd: 6, hc: 4, ep: 6 }, icon: "Icons/Archetype/Pyro.png" , description: "Born from molten fury and the heart of burning flames, Pyros are pure embodiments of fire. Their bodies blaze with uncontrolled heat, and their movements ignite the air itself. Wherever they tread, flames consume and scorch, leaving nothing but ash in their wake, a testament to their unrelenting, fiery essence."},
hydral: {name: "Hyral", profile: { hp: 10, atk: 1, def: 4, spd: 4, hc: 9, ep: 3 }, icon: "Icons/Archetype/Hydral.png" , description: "Forged from rivers, tides, and the endless depths, the Hyrals are living currents of water given form. They surge and crash with unrelenting force, drenching and drowning all who oppose them. Fluid and adaptable, they strike with the inevitability of the ocean, pulling foes beneath waves of relentless, liquid power."},
galeform: {name: "Galeform", profile: { hp: 9, atk: 1, def: 6, spd: 3, hc: 7, ep: 10 }, icon: "Icons/Archetype/Galeform.png" , description: "Born of tempests and the rush of wind, Galeforms are swift, elusive elementals that strike with blades of air. Their movements are a blur, their attacks slicing and tearing with unerring precision. Masters of speed and agility, they descend like hurricanes, overwhelming foes with relentless, cutting gusts and the fury of the skies."},
golem: {name: "Golem", profile: { hp: 8, atk: 7, def: 10, spd: 1, hc: 2, ep: 4 }, icon: "Icons/Archetype/Golem.png" , description: "Forged from bedrock and shaped by the ages, the golems are embodiments of the earth. Their massive forms crush all that stand against them, while their unyielding bodies shrug off attacks with unwavering resilience. Slow but unstoppable, they move with the relentless patience of mountains, turning the battlefield into a fortress of stone and earth."},
obscurid: {name: "Obscurid", profile: { hp: 7, atk: 7, def: 3, spd: 8, hc: 6, ep: 7 }, icon: "Icons/Archetype/Obscurid.png" , description: "Born from shadow and void, the Obscurids are creeping shades that feed on the essence of life. Their forms shift and blur, slipping through defenses to drain strength and spirit from all who stand before them. Masters of subtlety and decay, they leave only emptiness in their wake, turning vitality into darkness."},
luminaut: {name: "Luminaut", profile: { hp: 9, atk: 3, def: 7, spd: 8, hc: 2, ep: 6 }, icon: "Icons/Archetype/Luminaut.png" , description: "Born of pure light and radiant energy, the Luminauts illuminate the battlefield with brilliance. Their presence purifies corruption and inspires allies, while their searing attacks blaze with the power of the sun. Majestic and unwavering, they embody the essence of radiance, turning darkness into hope and striking down those who oppose their light."},
corruptor: {name: "Corruptor", profile: { hp: 4, atk: 7, def: 4, spd: 2, hc: 5, ep: 5 }, icon: "Icons/Archetype/Corruptor.png" , description: "Born of venom, rot, and foul decay, the Corruptors spread poison wherever they go. Their touch withers plant and flesh alike, and their toxic presence corrupts even the purest of lands. Relentless and insidious, they revel in contamination, leaving blighted ground and weakened foes in their poisonous wake."},
voltkin: {name: "Voltkin", profile: { hp: 1, atk: 7, def: 1, spd: 7, hc: 4, ep: 6 }, icon: "Icons/Archetype/Voltkin.png" , description: "Forged from lightning and crackling energy, the Voltkin are living storms incarnate. Their bodies surge with electric power, striking with blinding speed and precision. Every movement sparks chaos, and every attack leaves a trail of crackling destruction, embodying the relentless fury of the storm."},
glacial: {name: "Glacial", profile: { hp: 9, atk: 3, def: 7, spd: 2, hc: 9, ep: 3 }, icon: "Icons/Archetype/Glacial.png" , description: "Born from frost and frozen winds, the Glacials are elementals of ice and chill. Their touch freezes the air and hardens the ground, slowing all who oppose them. Silent and relentless, they strike with the precision of falling icicles, leaving the battlefield encased in frost and their enemies trapped in the grip of winter’s wrath."},

// --- Dragon --- //
thornwing: {name: "Thornwing", profile: { hp: 8, atk: 4, def: 7, spd: 4, hc: 4, ep: 8 }, icon: "Icons/Archetype/Thornwing.png" , description: "Forged of scale, bark, and living wood, the Thornwing dragons embody the resilience of the ancient forests. Their hides are plated in thorned armor, their wings creaking like timber in the wind. Where others strike with fire or venom, they endure, turning battles into wars of attrition. The Thornwing are defined by their unyielding defenses, outlasting foes until nature itself reclaims the battlefield."},
blazingscale: {name: "Blazingscale", profile: { hp: 2, atk: 10, def: 3, spd: 8, hc: 3, ep: 8 }, icon: "Icons/Archetype/Blazingscale.png" , description: "Dragons wreathed in flame and fury, the Blazingscale are living wildfires given form. With every wingbeat they ignite the skies, leaving charred wastelands in their wake. They are devastation incarnate turning the land itself into an endless inferno."},
abyssdrake: {name: "Abyssdrake", profile: { hp: 9, atk: 3, def: 8, spd: 7, hc: 8, ep: 2 }, icon: "Icons/Archetype/Abyssdrake.png" , description: "Born from the crushing depths, the Abyssdrakes command the ocean’s fury as their weapon. With thunderous roars they summon towering tides, swallowing armies and kingdoms beneath relentless waves. To face an Abyssdrake is to stand against the endless surge of the abyss, a flood that drowns all hope beneath its dark waters."},
stormrazor: {name: "Stormrazor", profile: { hp: 4, atk: 9, def: 3, spd: 9, hc: 4, ep: 9 }, icon: "Icons/Archetype/Stormrazor.png" , description: "Forged in the heart of raging tempests, the Stormrazors embody the untamed wrath of thunder and sky. They descend with blinding speed, their wings crackling with storms as lightning answers their command. Each strike is a flash of devastation, leaving smoldering ruin in the wake of their tempestuous fury."},
ironclaw: {name: "Ironclaw", profile: { hp: 8, atk: 4, def: 9, spd: 3, hc: 2, ep: 3 }, icon: "Icons/Archetype/Ironclaw.png" , description: "Carved from stone and tempered iron, the Ironclaw dragons are bastions of unyielding strength. Their armored scales deflect even the fiercest assaults, and their presence fortifies the lands they guard. Patient and resolute, they stand as living ramparts, defending their territory with unbreakable resolve and steadfast vigilance."},
dreadspine: {name: "Dreadspine", profile: { hp: 6, atk: 7, def: 4, spd: 5, hc: 6, ep: 5 }, icon: "Icons/Archetype/Dreadspine.png" , description: "Twisted by venom and rot, the Dreadspine spread decay wherever their wings shadow the land. Their breath carries no flame, but a vile miasma that withers forests, poisons rivers, and corrodes stone. To face them is to watch life unravel into ruin, for their presence festers the earth with corruption untamed."},
solarwyrm: {name: "Solarwyrm", profile: { hp: 8, atk: 5, def: 6, spd: 6, hc: 5, ep: 4 }, icon: "Icons/Archetype/Solarwyrm.png" , description: "Born of pure light and radiant fire, the Solarwyrms stand as vigilant guardians of sacred lands. Their wings shimmer with the brilliance of the sun, and their gaze pierces through shadows of corruption. Guided by unwavering justice, they defend their realm with searing power, purifying all that threatens the sanctity of their domain."},
nightshroud: {name: "Nightshroud", profile: { hp: 6, atk: 7, def: 3, spd: 6, hc: 4, ep: 6 }, icon: "Icons/Archetype/Nightshroud.png" , description: "Born from the abyss of endless night, the Nightshrouds are dragons wreathed in shadow and silence. Their scales absorb the faintest light, and their movements are whispers across the battlefield. Masters of stealth and dread, they strike from darkness, leaving fear and uncertainty in their wake, as if the night had taken form to hunt."},
glimmerscale: {name: "Glimmerscale", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Glimmerscale.png" , description: "Born of starlight and shimmering wings, the Glimmerscale are fairy-dragons whose radiant power is as enchanting as it is devastating. They weave between grace and fury, purifying corruption with gleaming light before unleashing searing, luminous strikes. Defined by their dual nature of elegance and ferocity, they are an archetype that blinds foes with brilliance, striking down darkness in a cascade of radiant fire."},  
};
const profileArea            = document.getElementById('profile-area'); 
const profileMenu            = document.getElementById('profile-menu');
const profilePic             = document.getElementById('profile-pic');
let profilePicMenuBtn        = document.getElementById('profile-pic-btn');
const profilePicMenu         = document.getElementById('profile-pic-menu');
const profileUsernameDisplay = document.getElementById('profile-username-display');

const profileIconModal          = document.getElementById('profile-icon-modal');
const profileIcons              = document.getElementById('profile-icons');
const closeProfileIconModalBtn  = document.getElementById('close-profile-icon-modal');

const appMain = document.getElementById('app-main');
const mainNav = document.getElementById('main-nav');
// Banner selection logic
const profileBannerContainer = document.getElementById('profile-banner-container');
const profileBanner = document.getElementById('profile-banner');
const profileBannerModal = document.getElementById('profile-banner-modal');
const profileBanners = document.getElementById('profile-banners');
const closeProfileBannerModalBtn = document.getElementById('close-profile-banner-modal');

const defaultIcon = "Images/Avatar/Default.png";
const defaultBanner = "Images/Banner/DefaultBanner.png";
const allAvatarOptions = [
// --- COMMON GREEN AVATARS --- //
  { name: 'Elemental of Leaves', src: 'Images/Avatar/ElementalofLeaves.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Fairy', src: 'Images/Avatar/Fairy.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Wildwood Goblin', src: 'Images/Avatar/WildwoodGoblin.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Satyr', src: 'Images/Avatar/Satyr.png', rarity: 'Common', price: 10, obtain: 'shop' },
  /*{ name: 'Verdant Serpent', src: 'Images/Avatar/VerdantSerpent.png', rarity: 'Common', price: 10, obtain: 'shop' },*/
// --- COMMON RED AVATARS --- //
  { name: 'Elemental of Embers', src: 'Images/Avatar/ElementalofEmbers.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Emberling', src: 'Images/Avatar/Emberling.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Fire Golem', src: 'Images/Avatar/FireGolem.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Kobold', src: 'Images/Avatar/Kobold.png', rarity: 'Common', price: 10, obtain: 'shop' },
// --- COMMON BLUE AVATARS --- //
  { name: 'Elemental of Droplets', src: 'Images/Avatar/ElementalofDroplets.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Mermaid', src: 'Images/Avatar/Mermaid.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Water Elemental', src: 'Images/Avatar/WaterElemental.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Runebound Shark', src: 'Images/Avatar/RuneboundShark.png', rarity: 'Common', price: 10, obtain: 'shop' },
// --- COMMON YELLOW AVATARS --- //
  { name: 'Birdfolk', src: 'Images/Avatar/Birdfolk.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Elemental of Sparks', src: 'Images/Avatar/ElementalofSparks.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Elemental of Breeze', src: 'Images/Avatar/ElementalofBreeze.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Thunderspawn', src: 'Images/Avatar/Thunderspawn.png', rarity: 'Common', price: 10, obtain: 'shop' },
// --- COMMON GRAY AVATARS --- //
  { name: 'Elemental of Pebbles', src: 'Images/Avatar/ElementalofPebbles.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Orc', src: 'Images/Avatar/Orc.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Rockshell Armadillo', src: 'Images/Avatar/RockshellArmadill.png', rarity: 'Common', price: 10, obtain: 'shop' },

  { name: 'Rock Lizard', src: 'Images/Avatar/RockLizard.png', rarity: 'Common', price: 10, obtain: 'shop' },
// --- COMMON PURPLE AVATARS --- //
  { name: 'Elemental of Toxins', src: 'Images/Avatar/ElementalofToxins.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Fen Goblin', src: 'Images/Avatar/FenGoblin.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Giant Hornet', src: 'Images/Avatar/GiantHornet.png', rarity: 'Common', price: 10, obtain: 'shop' },

// --- COMMON WHITE AVATARS --- //
  { name: 'Elemental of Gleams', src: 'Images/Avatar/ElementalofGleams.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Angel', src: 'Images/Avatar/Angel.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Valkyrie', src: 'Images/Avatar/Valkyrie.png', rarity: 'Common', price: 10, obtain: 'shop' },

  { name: 'Angelic Warrior', src: 'Images/Avatar/AngelicWarrior.png', rarity: 'Common', price: 10, obtain: 'shop' },
// --- COMMON BLACK AVATARS --- //
  { name: 'Elemental of Shades', src: 'Images/Avatar/ElementalofShades.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Skeleton', src: 'Images/Avatar/Skeleton.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Zombie', src: 'Images/Avatar/Zombie.png', rarity: 'Common', price: 10, obtain: 'shop' },
  { name: 'Wolf', src: 'Images/Avatar/Wolf.png', rarity: 'Common', price: 10, obtain: 'shop' },

// --- RARE GREEN AVATARS --- //
  { name: 'Elemental of Foliages', src: 'Images/Avatar/ElementalofFoliages.png', rarity: 'Rare', price: 50, obtain: 'shop' },
  { name: 'Verdara Soldier', src: 'Images/Avatar/VerdaraSoldier.png', rarity: 'Rare', price: 50, obtain: 'shop' },
// --- RARE RED AVATARS --- //
  { name: 'Elemental of Flames', src: 'Images/Avatar/ElementalofFlames.png', rarity: 'Rare', price: 50, obtain: 'shop' },
  { name: 'Magmaris Mercenary', src: 'Images/Avatar/MagmarisMercenary.png', rarity: 'Rare', price: 50, obtain: 'shop' },

// --- RARE BLUE AVATARS --- //
  { name: 'Elemental of Torrents', src: 'Images/Avatar/ElementalofTorrents.png', rarity: 'Rare', price: 50, obtain: 'shop' },
  { name: 'Umarion Paladin', src: 'Images/Avatar/UmarionPaladin.png', rarity: 'Rare', price: 50, obtain: 'shop' },
// --- RARE YELLOW AVATARS --- //
  { name: 'Elemental of Gales', src: 'Images/Avatar/ElementalofGales.png', rarity: 'Rare', price: 50, obtain: 'shop' },
  { name: 'Aetherion Electromancer', src: 'Images/Avatar/AetherionElectromancer.png', rarity: 'Rare', price: 50, obtain: 'shop' },

// --- RARE GRAY AVATARS --- //
  { name: 'Elemental of Boulders', src: 'Images/Avatar/ElementalofBoulders.png', rarity: 'Rare', price: 50, obtain: 'shop' },
  { name: 'Rockmaul Rhino', src: 'Images/Avatar/RockmaulRhino.png', rarity: 'Rare', price: 50, obtain: 'shop' },

  { name: 'Drakzul Warmonger', src: 'Images/Avatar/DrakzulWarmonger.png', rarity: 'Rare', price: 50, obtain: 'shop' },

// --- RARE PURPLE AVATARS --- //
  { name: 'Elemental of Miasmas', src: 'Images/Avatar/ElementalofMiasmas.png', rarity: 'Rare', price: 50, obtain: 'shop' },
  { name: 'Virkul Assassin', src: 'Images/Avatar/VirkulAssassin.png', rarity: 'Rare', price: 50, obtain: 'shop' },

// --- RARE WHITE AVATARS --- //
  { name: 'Elemental of Lusters', src: 'Images/Avatar/ElementalofLusters.png', rarity: 'Rare', price: 50, obtain: 'shop' },
  { name: 'Solmara Crusader', src: 'Images/Avatar/SolmaraCrusader.png', rarity: 'Rare', price: 50, obtain: 'shop' },

// --- RARE BLACK AVATARS --- //
  { name: 'Elemental of Shadows', src: 'Images/Avatar/ElementalofShadows.png', rarity: 'Rare', price: 50, obtain: 'shop' },
  { name: 'NoctyraEnforcer', src: 'Images/Avatar/NoctyraEnforcer.png', rarity: 'Rare', price: 50, obtain: 'shop' },

// --- LEGENDARY GREEN AVATARS --- //
  { name: 'Sylvania, Thornvale Queen', src: 'Images/Avatar/Sylvania.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Veya, Emerald Druidess', src: 'Images/Avatar/Veya.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Faelyra, Wildhorn Empress', src: 'Images/Avatar/Faelyra.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Verdarok, Sylvan Thornwing', src: 'Images/Avatar/Verdarok.png', rarity: 'Legendary', price: 100, obtain: 'shop' },

// --- LEGENDARY RED AVATARS --- //
  { name: 'Kaelen, Blazeborn Huntress', src: 'Images/Avatar/Kaelen.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Kaelyra, Fireland Heiress', src: 'Images/Avatar/Kaelyra.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Pyronyx, Inferno Blazingscale', src: 'Images/Avatar/Pyronyx.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Ephoros, Hellfire Behemoth', src: 'Images/Avatar/Ephoros.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Pyrokrag, Golemheart Titan', src: 'Images/Avatar/Pyrokrag.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Ashara, Hellfire Matriarch', src: 'Images/Avatar/Ashara.png', rarity: 'Legendary', price: 100, obtain: 'shop' },

// --- LEGENDARY BLUE AVATARS --- //
  { name: 'Serenya, Tidebound Enchantress', src: 'Images/Avatar/Serenya.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Zaryon, Pearlhaven Commander', src: 'Images/Avatar/Zaryon.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Tydros, Coralbound Tidebreaker', src: 'Images/Avatar/Tydros.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Abyndra, Tidal Abyssdrake', src: 'Images/Avatar/Abyndra.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Maelvyrn, Coralbound Leviathan', src: 'Images/Avatar/Maelvyrn.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Eirawen, Frostland Queen', src: 'Images/Avatar/Eirawen.png', rarity: 'Legendary', price: 100, obtain: 'shop' },

// --- LEGENDARY YELLOW AVATARS --- //
  { name: 'Zyra, Thunderblade Duelist', src: 'Images/Avatar/Zyra.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Garuda, Wings of Zephyra', src: 'Images/Avatar/Garuda.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Voltrazek, Tempest Stormrazor', src: 'Images/Avatar/Voltrazek.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Astranyra, Thunderbane', src: 'Images/Avatar/Astranyra.png', rarity: 'Legendary', price: 100, obtain: 'shop' },

// --- LEGENDARY GRAY AVATARS --- //
  { name: 'Rudgar, Ironfist Mauler', src: 'Images/Avatar/Rudgar.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Veniryss, Spider Princess', src: 'Images/Avatar/Veniryss.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Gravok, Drakzul Tyrant', src: 'Images/Avatar/Gravok.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Ferronyx, Terra Ironclaw', src: 'Images/Avatar/Ferronyx.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Lyssara, Scarlet Vindicator', src: 'Images/Avatar/Lyssara.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Draven, Adamant Emperor', src: 'Images/Avatar/Draven.png', rarity: 'Legendary', price: 100, obtain: 'shop' },

// --- LEGENDARY PURPLE AVATARS --- //
  { name: 'Selgor, Corrupted Warlord', src: 'Images/Avatar/Selgor.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Mordrath, Virkul Phantom', src: 'Images/Avatar/Mordrath.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Myxaroth, Cursed Dreadspine', src: 'Images/Avatar/Myxaroth.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
	
// --- LEGENDARY WHITE AVATARS --- //
  { name: 'Elyndra, Dawnblade of Heavens', src: 'Images/Avatar/Elyndra.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Solaryth, Radiant Solarwyrm', src: 'Images/Avatar/Solaryth.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Seraphiel, Solmara Paragon', src: 'Images/Avatar/Seraphiel.png', rarity: 'Legendary', price: 100, obtain: 'shop' },

// --- LEGENDARY BLACK AVATARS --- //
  { name: 'Velmira, Mistress of Silence', src: 'Images/Avatar/Velmira.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Maldryss, Skullframe Archmage', src: 'Images/Avatar/Maldryss.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Nyzariel, Archdemon Duchess', src: 'Images/Avatar/Nyzariel.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Raukhar, Duskwing Knight', src: 'Images/Avatar/Raukhar.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Noctyros, Umbral Nightshroud', src: 'Images/Avatar/Noctyros.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Vorganna, Crimson Blade', src: 'Images/Avatar/Vorganna.png', rarity: 'Legendary', price: 100, obtain: 'shop' },

];

const allBannerOptions = [
  { name: 'Forest', src: 'Images/Banner/Forest.png', price: 100, obtain: 'shop' },
  { name: 'Volcano', src: 'Images/Banner/Volcano.png', price: 100, obtain: 'shop' },
  { name: 'Ocean', src: 'Images/Banner/Ocean.png', price: 100, obtain: 'shop' },
  { name: 'Peaks', src: 'Images/Banner/Peaks.png', price: 100, obtain: 'shop' },
  { name: 'Mountain', src: 'Images/Banner/Mountain.png', price: 100, obtain: 'shop' },
  { name: 'Swamp', src: 'Images/Banner/Swamp.png', price: 100, obtain: 'shop' },
  { name: 'Plains', src: 'Images/Banner/Plains.png', price: 100, obtain: 'shop' },
  { name: 'Shadowland', src: 'Images/Banner/Shadowland.png', price: 100, obtain: 'shop' },
  { name: 'Verdara', src: 'Images/Banner/Verdara.png', price: 100, obtain: 'shop' },
  { name: 'Magmaris', src: 'Images/Banner/Magmaris.png', price: 100, obtain: 'shop' },
  { name: 'Umarion', src: 'Images/Banner/Umarion.png', price: 100, obtain: 'shop' },
  { name: 'Aetherion', src: 'Images/Banner/Aetherion.png', price: 100, obtain: 'shop' },
  { name: 'Drakzul', src: 'Images/Banner/Drakzul.png', price: 100, obtain: 'shop' },
  { name: 'Virkul', src: 'Images/Banner/Virkul.png', price: 100, obtain: 'shop' },
  { name: 'Solmara', src: 'Images/Banner/Solmara.png', price: 100, obtain: 'shop' },
  { name: 'Noctyra', src: 'Images/Banner/Noctyra.png', price: 100, obtain: 'shop' },
  { name: 'Thornvale', src: 'Images/Banner/Thornvale.png', price: 100, obtain: 'shop' },
  { name: 'Pearlhaven', src: 'Images/Banner/Pearlhaven.png', price: 100, obtain: 'shop' },
  { name: 'Duskhaven', src: 'Images/Banner/Duskhaven.png', price: 100, obtain: 'shop' },
  { name: 'Dragons Grove', src: 'Images/Banner/DragonsGrove.png', price: 100, obtain: 'shop' },
  { name: 'Dragons Spire', src: 'Images/Banner/DragonsSpire.png', price: 100, obtain: 'shop' },
  { name: 'Dragons Atoll', src: 'Images/Banner/DragonsAtoll.png', price: 100, obtain: 'shop' },
  { name: 'Dragons Skyreach', src: 'Images/Banner/DragonsSkyreach.png', price: 100, obtain: 'shop' },
  { name: 'Dragons Bastion', src: 'Images/Banner/DragonsBastion.png', price: 100, obtain: 'shop' },
  { name: 'Dragons Hollow', src: 'Images/Banner/DragonsHollow.png', price: 100, obtain: 'shop' },
  { name: 'Dragons Haven', src: 'Images/Banner/DragonsHaven.png', price: 100, obtain: 'shop' },
  { name: 'Dragons Moonhold', src: 'Images/Banner/DragonsMoonhold.png', price: 100, obtain: 'shop' },
];

const allCardbackOptions = [
  { name: 'Fairy', src: 'Images/Cardback/Fairy.png', rarity: 'Common', price: 100, obtain: 'shop' },
  { name: 'Cindercore', src: 'Images/Cardback/Cindercore.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Construct', src: 'Images/Cardback/Construct.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Coralbound', src: 'Images/Cardback/Coralbound.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Fireland', src: 'Images/Cardback/Fireland.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Goblin', src: 'Images/Cardback/Goblin.png', rarity: 'Common', price: 100, obtain: 'shop' },
  { name: 'Golemheart', src: 'Images/Cardback/Golemheart.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Merfolk', src: 'Images/Cardback/Merfolk.png', rarity: 'Common', price: 100, obtain: 'shop' },
  { name: 'Moonfang', src: 'Images/Cardback/Moonfang.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Satyr', src: 'Images/Cardback/Satyr.png', rarity: 'Common', price: 100, obtain: 'shop' },
  { name: 'Obscurid', src: 'Images/Cardback/Obscurid.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Stonebound', src: 'Images/Cardback/Stonebound.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Stormcore', src: 'Images/Cardback/Stormcore.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Plagueaxis', src: 'Images/Cardback/Plagueaxis.png', rarity: 'Legendary', price: 100, obtain: 'shop' },
  { name: 'Grovehusk', src: 'Images/Cardback/Woodframe.png', rarity: 'Legendary', price: 100, obtain: 'shop' }
];

const packPrices = [
  { id: "ElementaGenesis", name: "Elementa Genesis", price: 100,
    image: 'Images/Pack/ElementaGenesis.png'
  },
  {
    id: "ScalesofRuin",
    name: "Scales of Ruin",
    price: 100,
    image: 'Images/Pack/ScalesofRuin.png',
	pack: ['CardImages/Pack/ScalesofRuinPyronyx.png', 'CardImages/Pack/ScalesofRuinVoltrazek.png',
		   'CardImages/Pack/ScalesofRuinMyxaroth.png', 'CardImages/Pack/ScalesofRuinNoctyros.png']
  },
  // "ScalesofRuin": 100,"WyrmheartAwakening": 100,"MischiefUnbound": 100,"PrimordialAscension": 100,"IronbornProtocol": 100,"SavageTerritory": 100,"FeatheredOmen": 100,
];
const allPackOptions = packPrices;
// --- Profile Icon Choices ---
function getAvailableAvatars() {
  // Use the allAvatarOptions array and filter unlocked avatars
  return allAvatarOptions.filter(avatar => window.playerUnlockedAvatars.includes(avatar.id));
}
  
function getAvailableBanners() {
  // Use the allBannerOptions array and filter unlocked banners
  return allBannerOptions.filter(banner => window.playerUnlockedBanners.includes(banner.id));
}
// Cardback options (expand as needed)
function getAvailableCardbacks() {
  // Use the allCardbackOptions array and filter unlocked cardbacks
  return allCardbackOptions.filter(cardback => window.playerUnlockedCardbacks.includes(cardback.id));
}
const PROFILE_METRICS = [
  { key: 'offense', label: 'Offense', color: '#ff6b4a' },
  { key: 'defense', label: 'Defense', color: '#44e055' },
  { key: 'utility', label: 'Utility', color: '#ffd166' },
  { key: 'tempo', label: 'Tempo', color: '#66d1ff' }
];
// Default profile used when none provided
const DEFAULT_KEYWORD_PROFILE = { offense: 5, defense: 5, utility: 5, tempo: 5 };
// Return the profile object for a single keyword (type/archetype/ability), or default if none
function getKeywordProfile(name) {
  if (!name && name !== 0) return DEFAULT_KEYWORD_PROFILE;
  const key = normalizeKey(name);
  if (!key) return DEFAULT_KEYWORD_PROFILE;
  if (typeof CARD_KEYWORD === 'object' && CARD_KEYWORD[key] && CARD_KEYWORD[key].profile) {
    return Object.assign({}, DEFAULT_KEYWORD_PROFILE, CARD_KEYWORD[key].profile);
  }
  // no explicit profile, return default
  return DEFAULT_KEYWORD_PROFILE;
}

// Merge multiple keyword names into one combined profile (average)
function mergeKeywordProfiles(values) {
  if (!values) return DEFAULT_KEYWORD_PROFILE;
  const arr = Array.isArray(values) ? values : [values];
  const sum = PROFILE_METRICS.reduce((acc, m) => { acc[m.key] = 0; return acc; }, {});
  let count = 0;
  for (const v of arr) {
    if (v === null || v === undefined) continue;
    const prof = getKeywordProfile(v);
    PROFILE_METRICS.forEach(m => { sum[m.key] += (typeof prof[m.key] === 'number' ? prof[m.key] : DEFAULT_KEYWORD_PROFILE[m.key]); });
    count++;
  }
  if (count === 0) return DEFAULT_KEYWORD_PROFILE;
  const avg = {};
  PROFILE_METRICS.forEach(m => { avg[m.key] = Math.round((sum[m.key] / count) * 10) / 10; }); // keep one decimal if desired
  return avg;
}

// Render profile bars HTML (profile: object with metric keys). widthPctScale scales values 0..10 to 0..100%.
// returns HTML string
function renderProfileBars(profile, opts = {}) {
  if (!profile) profile = DEFAULT_KEYWORD_PROFILE;
  const scaleMax = opts.scaleMax || 10; // expected max value
  const containerClass = opts.containerClass || 'keyword-profile';
  let html = `<div class="${containerClass}">`;
  PROFILE_METRICS.forEach(m => {
    const val = Math.max(0, Math.min(scaleMax, Number(profile[m.key] || 0)));
    const pct = Math.round((val / scaleMax) * 100);
    html += `
      <div class="kp-row">
        <div class="kp-label">${m.label}</div>
        <div class="kp-bar" role="img" aria-label="${m.label}: ${val}/${scaleMax}">
          <div class="kp-bar-fill" style="width:${pct}%; background:${m.color}"></div>
        </div>
        <div class="kp-value">${val}</div>
      </div>
    `;
  });
  html += `</div>`;
  return html;
}
const DAILY_LOGIN_REWARDS = [
 /* Example
{
  coins: 50,
  essence: 10,
  avatar: "Cards/Avatar/Maldryss.png",
  banner: "Cards/Banner/SkywardArchipelago.png",
  cardback: "Images/Cardbacks/CBInferno.png",
  avatars: ["Cards/Avatar/Kaelyra.png", "Cards/Avatar/Gravok.png"],
  banners: ["Cards/Banner/Verdara.png"],
  cardbacks: ["Images/Cardbacks/CBMystic.png"]
} */
  // Week 1
  { title: "Day 1", coins: 50, essence: 10 },
  { title: "Day 2", coins: 60, essence: 12 },
  { title: "Day 3", coins: 70, essence: 14 },
  { title: "Day 4", coins: 80, essence: 16 },
  { title: "Day 5", coins: 90, essence: 18 },
  { title: "Day 6", coins: 100, essence: 20 },
  { title: "Day 7", coins: 150, essence: 30 },
  // Week 2
  { title: "Day 8", coins: 50, essence: 10 },
  { title: "Day 9", coins: 60, essence: 12 },
  { title: "Day 10", coins: 70, essence: 14 },
  { title: "Day 11", coins: 80, essence: 16 },
  { title: "Day 12", coins: 90, essence: 18 },
  { title: "Day 13", coins: 100, essence: 20 },
  { title: "Day 14", coins: 200, essence: 40 },
  // Week 3
  { title: "Day 15", coins: 60, essence: 12 },
  { title: "Day 16", coins: 70, essence: 14 },
  { title: "Day 17", coins: 80, essence: 16 },
  { title: "Day 18", coins: 90, essence: 18 },
  { title: "Day 19", coins: 100, essence: 20 },
  { title: "Day 20", coins: 120, essence: 24 },
  { title: "Day 21", coins: 250, essence: 50 },
  // Week 4
  { title: "Day 22", coins: 70, essence: 14 },
  { title: "Day 23", coins: 80, essence: 16 },
  { title: "Day 24", coins: 90, essence: 18 },
  { title: "Day 25", coins: 100, essence: 20 },
  { title: "Day 26", coins: 120, essence: 24 },
  { title: "Day 27", coins: 150, essence: 30 },
  { title: "Day 28", coins: 500, essence: 100 }
];
function getUtcDateString() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    .toISOString().split("T")[0];
}
function getDailyLoginInfo() {
  if (window.auth && window.auth.currentUser) {
    return {
      lastClaimedDay: window.dailyLoginDay || 0,
      lastLoginDate: window.dailyLoginDate || "",
    };
  } else {
    // fallback for guests
    return {
      lastClaimedDay: Number(localStorage.getItem("dailyLoginDay") || "0"),
      lastLoginDate: localStorage.getItem("dailyLoginDate") || "",
    };
  }
}
function setDailyLoginInfo(day, date) {
  if (window.auth && window.auth.currentUser) {
    window.dailyLoginDay = day;
    window.dailyLoginDate = date;
    saveProgress();
  } else {
    localStorage.setItem("dailyLoginDay", String(day));
    localStorage.setItem("dailyLoginDate", date);
  }
}
function showDailyLoginModal(dayIdx) {
  // Remove existing modal
  let modal = document.getElementById('daily-login-modal');
  if (modal) modal.remove();
  const { lastClaimedDay, lastLoginDate } = getDailyLoginInfo();

  modal = document.createElement('div');
  modal.id = 'daily-login-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';

  let rewardsHtml = '';
  DAILY_LOGIN_REWARDS.forEach((reward, i) => {
    // Calculate state
    const isToday = i === dayIdx;
    const isClaimed = i < lastClaimedDay;
    const isFuture = i > dayIdx;

    // Styles for each state
    let borderColor = isToday ? '#ffe066' : isClaimed ? '#44e055' : '#333';
    let bgColor = isToday ? '#ffe06622' : isClaimed ? '#232f1c' : '#222';
    let opacity = isFuture ? 0.55 : 1;
    let textColor = isToday ? '#ffe066' : isClaimed ? '#aaa' : '#ffe066';
    let boxShadow = isToday ? '0 2px 8px #ffe06655' : isClaimed ? '0 2px 8px #44e05544' : '0 1px 4px #0002';
    let cursor = isToday && !isClaimed ? 'pointer' : 'default';

    rewardsHtml += `
      <div class="daily-login-reward${isToday ? ' today' : ''}${isClaimed ? ' claimed' : ''}${isFuture ? ' future' : ''}" 
           data-day="${i}"
           style="border-radius:8px;padding:9px;
            background:${bgColor};
            border:2px solid ${borderColor};
            box-shadow:${boxShadow};
            display:flex;flex-direction:column;align-items:center;width:88px;cursor:${cursor};
            opacity:${opacity};
            position:relative;"
           title="${isToday && !isClaimed ? "Claim today's reward" : isClaimed ? "Already claimed" : "Not yet available"}">
        <div style="font-weight:bold;color:${textColor};">${reward.title}</div>
        <div style="margin:4px 0;">
          <img src="Icons/Other/Coins.png" style="width:22px;vertical-align:middle;">
          <span style="color:#fff;">${reward.coins}</span>
        </div>
        <div>
          <img src="Icons/Other/Essence.png" style="width:22px;vertical-align:middle;">
          <span style="color:#fff;">${reward.essence}</span>
        </div>
        ${isToday && !isClaimed ? `<div style="position:absolute;top:6px;right:6px;">
            <img src="Images/Icons/Star.png" style="width:18px;" title="Claimable Today"></div>` : ''}
        ${isClaimed ? `<div style="position:absolute;top:6px;right:6px;">
            <img src="Icons/Other/Checkmark.png" style="width:18px;" title="Claimed"></div>` : ''}
      </div>
    `;
  });

  modal.innerHTML = `
    <div class="modal-content" style="max-width:750px;padding:22px 18px;background:#232a3a;border-radius:16px;">
      <h2 style="text-align:center;color:#ffe066;margin-bottom:12px;">Daily Login Rewards</h2>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;">${rewardsHtml}</div>
      <div style="text-align:center;margin-top:18px;">
        <button id="daily-login-close-btn" class="btn-negative-secondary" style="margin-left:12px;">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Add click logic for each reward slot
  modal.querySelectorAll('.daily-login-reward').forEach((el, i) => {
    const isToday = i === dayIdx;
    const isClaimed = i < lastClaimedDay;
    const isFuture = i > dayIdx;
    el.onclick = function(e) {
      // Only today's reward is claimable and not already claimed
      if (!isToday || isClaimed) {
        showToast(isClaimed ? "Already claimed this reward!" : "You can only claim today's reward.", { type: "info" });
        return;
      }
      // Check if already claimed today
      const { lastLoginDate } = getDailyLoginInfo();
      const today = getUtcDateString();
      if (lastLoginDate === today) {
        showToast("Already claimed today's reward!", { type: "info" });
        return;
      }
      // Claim today's reward
      const reward = DAILY_LOGIN_REWARDS[i];
      addCoins(reward.coins);
      setEssence(getEssence() + reward.essence);
      setDailyLoginInfo(i + 1, today);
      showToast(`Claimed: ${reward.coins} Coins & ${reward.essence} Essence for ${reward.title}!`, { type: "success" });
      modal.remove();
    };
  });

  document.getElementById('daily-login-close-btn').onclick = function() {
    modal.remove();
  };
  modal.onclick = function(e) {
    if (e.target === modal) modal.remove();
  };
}
document.getElementById('daily-login-icon').onclick = function() {
  const { lastClaimedDay, lastLoginDate } = getDailyLoginInfo();
  const today = getUtcDateString();
  let dayIdx = lastClaimedDay % DAILY_LOGIN_REWARDS.length;
  if (lastLoginDate === today) {
    showToast("You have already claimed today's reward!", { type: "info" });
    return;
  }
  showDailyLoginModal(dayIdx);
};

function normalizeKey(s) {
  if (!s && s !== 0) return '';
  return String(s).toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
}

// Return icon URL for a keyword (type/ability/archetype/trait/etc.)
function getKeywordIcon(name) {
  if (!name) return null;
  const key = normalizeKey(name);
  if (!key) return null;
  if (CARD_KEYWORD && CARD_KEYWORD[key] && CARD_KEYWORD[key].icon) {
    return CARD_KEYWORD[key].icon;
  }
  return null;
}
// --- Inline icon parsing helpers (use CARD_KEYWORD map from shared.js) ---
// Looks up the token in CARD_KEYWORD (supports string value or object with .icon/.image path)
function getKeywordIconPath(token) {
  if (!token) return null;
  // prefer the CARD_KEYWORD map if available
  const map = (typeof CARD_KEYWORD !== 'undefined') ? CARD_KEYWORD : (window.CARD_KEYWORD || {});
  if (!map) return null;

  // Normalize the token into the same canonical key shape used across the file
  // (remove spaces, punctuation, lowercase). Uses the existing normalizeKey helper.
  const key = normalizeKey(token);
  let entry = map[key];

  // fallback attempts: sometimes callers pass already-normalized keys or different casing
  if (!entry) {
    const lower = String(token).toLowerCase();
    entry = map[lower] || map[token] || map[token.toLowerCase()] || map[token.toUpperCase()];
  }

  if (!entry) return null;

  // Support shapes: string -> path, object -> { icon, image, path }
  if (typeof entry === 'string') return entry;
  if (typeof entry === 'object') {
    return entry.icon || entry.image || entry.path || null;
  }
  return null;
}

// Escape HTML for safe HTML generation
function _escapeHtmlInline(s) {
  return String(s || '').replace(/[&<>"']/g, function (m) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];
  });
}

// Replace tokens like {fireIcon} with <img> nodes inside a DocumentFragment.
// options: { size: number (px), className: string, altPrefix: string }
function parseInlineIconsToFragment(text, options = {}) {
  const { size = 18, className = 'inline-icon', altPrefix = '' } = options;
  const frag = document.createDocumentFragment();
  if (text === undefined || text === null) return frag;
  const str = String(text);
  // Match tokens like {tokenName}
  const re = /\{([a-zA-Z0-9_\-]+)\}/g;
  let lastIndex = 0;
  let m;
  while ((m = re.exec(str)) !== null) {
    // push plain text before token
    if (m.index > lastIndex) {
      frag.appendChild(document.createTextNode(str.slice(lastIndex, m.index)));
    }
    lastIndex = re.lastIndex;
    const token = m[1];
    const path = getKeywordIconPath(token);
    if (path) {
      const img = document.createElement('img');
      img.src = path;
      img.alt = (altPrefix ? altPrefix + ' ' : '') + token;
      img.className = className;
      img.style.width = size + 'px';
      img.style.height = size + 'px';
      img.style.verticalAlign = 'middle';
      img.style.margin = '0 6px';
      frag.appendChild(img);
    } else {
      // unknown token: keep literal text
      frag.appendChild(document.createTextNode('{' + token + '}'));
    }
  }
  // remaining text
  if (lastIndex < str.length) frag.appendChild(document.createTextNode(str.slice(lastIndex)));
  return frag;
}

// If you need an HTML string (escaped), use this
function parseInlineIconsToHtml(text, options = {}) {
  const { size = 18, className = 'inline-icon', altPrefix = '' } = options;
  if (text === undefined || text === null) return '';
  const str = String(text);
  const re = /\{([a-zA-Z0-9_\-]+)\}/g;
  let lastIndex = 0;
  let out = '';
  let m;
  while ((m = re.exec(str)) !== null) {
    if (m.index > lastIndex) {
      out += _escapeHtmlInline(str.slice(lastIndex, m.index));
    }
    lastIndex = m.index + m[0].length;
    const token = m[1];
    const path = getKeywordIconPath(token);
    if (path) {
      out += `<img src="${_escapeHtmlInline(path)}" class="${_escapeHtmlInline(className)}" alt="${_escapeHtmlInline((altPrefix ? altPrefix + ' ' : '') + token)}" style="width:${size}px;height:${size}px;vertical-align:middle;margin:0 6px;">`;
    } else {
      out += _escapeHtmlInline('{' + token + '}');
    }
  }
  if (lastIndex < str.length) out += _escapeHtmlInline(str.slice(lastIndex));
  return out;
}
function replaceTokensInElement(rootEl, options = {}) {
  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue && node.nodeValue.indexOf('{') !== -1) {
      textNodes.push(node);
    }
  }
  // Replace in reverse order (though order doesn't strictly matter, this avoids problems with live NodeList)
  for (let i = textNodes.length - 1; i >= 0; i--) {
    const txt = textNodes[i].nodeValue;
    const frag = parseInlineIconsToFragment(txt, options);
    textNodes[i].parentNode.replaceChild(frag, textNodes[i]);
  }
}
// Render one or multiple keywords as small chips with optional icon.
// values may be string, array, or undefined. Returns an HTML string.
function renderKeywordChips(values, opts = {}) {
  if (!values && values !== 0) return '';
  const arr = Array.isArray(values) ? values : [values];
  const chips = arr.map(v => {
    if (v === null || v === undefined) return '';
    const text = typeof v === 'string' ? v : String(v);
    const icon = getKeywordIcon(text);
    // escape text a bit
    const escText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (icon) {
      return `<div class="kw-chip"><img src="${icon}" alt="${escText}" title="${escText}" class="kw-chip-icon"><span class="kw-chip-text">${escText}</span></div>`;
    } else {
      return `<div class="kw-chip"><span class="kw-chip-text">${escText}</span></div>`;
    }
  }).filter(Boolean);
  return `<div class="kw-chip-row">${chips.join('')}</div>`;
}
// Use this to parse effect text with tokens into HTML with images/icons
function parseEffectText(effect) {
  if (!effect) return "";
  // If effect is not a string, attempt to serialize (for objects/arrays)
  if (typeof effect !== "string") {
    if (Array.isArray(effect)) {
      // Join array elements as strings
      effect = effect.map(e => typeof e === "string" ? e : JSON.stringify(e)).join(", ");
    } else {
      effect = JSON.stringify(effect);
    }
  }

 // Replace color icons {G},{R}, etc.
 effect = effect.replace(/\{([GRUYCPBW])\}/gi, (match, code) =>
   `<img src="${COST_IMAGE_MAP[code.toUpperCase()]}" style="height:1.3em;vertical-align:middle;margin-right:2px;">`
 );

  // Replace tapped/untapped icons
  effect = effect.replace(/\{CW\}/gi,
    '<img src="Icons/Essence/Tap.png" style="height:1.3em;vertical-align:middle;margin-right: 2px;" title="Tapped">'
  );
  effect = effect.replace(/\{CCW\}/gi,
    '<img src="Icons/Essence/Untap.png" style="height:1.3em;vertical-align:middle;margin-right: 2px;" title="Untapped">'
  );

  // Replace numbers {0}..{20} with bold numbers or custom spans
 // Replace numbers {0}..{20} with colorless essence images!
  effect = effect.replace(/\{([0-9]|1[0-9]|20)\}/g, (match, num) => {
    const imgSrc = typeof COST_IMAGE_MAP !== 'undefined' ? COST_IMAGE_MAP['X'+num] : null;
    if (imgSrc) {
      return `<img src="${_escapeHtmlInline(imgSrc)}" style="height:1.3em;vertical-align:middle;margin-right:2px;">`;
    }
    return `<span style="font-weight:bold;color:#ffe066;font-size:1.12em;vertical-align:middle;margin-right: 2px;">${num}</span>`;
  });
  // --- NEW: replace keyword tokens like {flying}, {ambush}, {zephyra}, {golem} etc. ---
  // This regex intentionally selects tokens that start with a letter (to avoid colliding with
  // the single-letter cost tokens and the numeric tokens already handled above).
  effect = effect.replace(/\{([a-zA-Z][a-zA-Z0-9_\-\s]*)\}/g, (match, token) => {
    // Skip tokens that are single-letter upper-case or pure numbers (already handled)
    if (/^[GRUYCPBW]$/.test(token)) return match;
    if (/^[0-9]+$/.test(token)) return match;

    const path = getKeywordIconPath(token);
    if (path) {
      // Use escaped path and include alt/title for accessibility
      const alt = _escapeHtmlInline(String(token));
      const title = _escapeHtmlInline(String(token));
      return `<img src="${_escapeHtmlInline(path)}" alt="${alt}" title="${title}" style="height:1.3em;vertical-align:middle;margin-right:2px;">`;
    }
    // No icon found for the token: keep the literal token text (or remove braces, depending on preference)
    // Here we return the token text without braces to be friendly in UI.
    return _escapeHtmlInline(token);
  });
  return effect;
}
function countEssenceType(essenceStr, typeCode) {
  if (typeof essenceStr !== "string") return 0;
  const matches = essenceStr.match(new RegExp(`\\{${typeCode}\\}`, "gi"));
  return matches ? matches.length : 0;
}
function countColorlessEssence(essenceStr) {
  if (typeof essenceStr !== "string") return 0;
  const matches = essenceStr.match(/\{([1-9]|1[0-9]|20)\}/g);
  return matches ? matches.map(m => Number(m.replace(/[{}]/g, ""))).reduce((a, b) => a + b, 0) : 0;
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
// REQUIREMENTS ICONS //
function getRequirementIcons(requirementsArr) {
  if (!requirementsArr || requirementsArr.length === 0) return "";
  let icons = "";
  requirementsArr.forEach(r => {
    if (r === "CW") {
      icons += `<img src="Icons/Essence/Tap.png" title="Activate in ATK position" style="width:21px;vertical-align:middle;">`;
    } else if (r === "CCW") {
      icons += `<img src="Icons/Essence/Untap.png" title="Activate in DEF position" style="width:21px;vertical-align:middle;">`;
    }
    // Add more requirement icons as needed
  });
  return icons;
}

// --- STATS CHART --- //
// Add more requirement icons as needed
const DEFAULT_STAT_PROFILE = { hp: 5, atk: 5, def: 5, spd: 5, hc: 5, ep: 5 };

// stat keys and display order
const STAT_KEYS = [
  { key: 'hp', label: 'HP' },
  { key: 'atk', label: 'ATK' },
  { key: 'def', label: 'DEF' },
  { key: 'spd', label: 'SPD' },
  { key: 'hc',  label: 'HC'  }, // Hindrance Control
  { key: 'ep',  label: 'EP'  }  // Essence Points
];
// Map an entry's stats -> normalize to { hp, atk, def, spd, hc, ep }
function normalizeKeywordStats(entry) {
  if (!entry) return Object.assign({}, DEFAULT_STAT_PROFILE);

  // If precise stats are provided under `stats`, use them
  if (entry.stats && typeof entry.stats === 'object') {
    const out = Object.assign({}, DEFAULT_STAT_PROFILE);
    STAT_KEYS.forEach(s => {
      if (typeof entry.stats[s.key] === 'number') out[s.key] = Math.max(1, Math.min(10, entry.stats[s.key]));
    });
    return out;
  }

  // If profile contains direct stat keys (hp, atk, def, spd, hc, ep), map those
  if (entry.profile && typeof entry.profile === 'object') {
    const p = entry.profile;
    const hasDirectStats = STAT_KEYS.some(s => typeof p[s.key] === 'number');
    if (hasDirectStats) {
      const out = Object.assign({}, DEFAULT_STAT_PROFILE);
      STAT_KEYS.forEach(s => {
        if (typeof p[s.key] === 'number') {
          out[s.key] = Math.max(1, Math.min(10, Math.round(p[s.key])));
        }
      });
      return out;
    }

    // Back-compat: legacy profile with offense/defense/tempo/utility mapping
    const out = Object.assign({}, DEFAULT_STAT_PROFILE);
    // offense -> ATK
    if (typeof p.offense === 'number') out.atk = Math.max(1, Math.min(10, Math.round(p.offense)));
    // defense -> DEF or HP bias
    if (typeof p.defense === 'number') {
      out.def = Math.max(1, Math.min(10, Math.round(p.defense)));
      out.hp  = Math.max(1, Math.min(10, Math.round(Math.max(out.hp, p.defense * 0.9))));
    }
    // tempo -> SPD
    if (typeof p.tempo === 'number') out.spd = Math.max(1, Math.min(10, Math.round(p.tempo)));
    // utility -> HC/EP (split)
    if (typeof p.utility === 'number') {
      out.hc = Math.max(1, Math.min(10, Math.round(Math.min(10, p.utility))));
      out.ep = Math.max(1, Math.min(10, Math.round(Math.min(10, p.utility))));
    }
    return out;
  }

  // fallback default
  return Object.assign({}, DEFAULT_STAT_PROFILE);
}

// Get combined stats for an array or single keyword (averages multiple keywords)
function getCombinedKeywordStats(values) {
  if (!values) return Object.assign({}, DEFAULT_STAT_PROFILE);
  const arr = Array.isArray(values) ? values : [values];
  const sums = STAT_KEYS.reduce((acc, s) => { acc[s.key] = 0; return acc; }, {});
  let count = 0;
  for (const v of arr) {
    if (v === null || v === undefined) continue;
    const key = normalizeKey(v);
    const entry = (typeof CARD_KEYWORD === 'object' && CARD_KEYWORD[key]) ? CARD_KEYWORD[key] : null;
    const stats = normalizeKeywordStats(entry);
    STAT_KEYS.forEach(s => { sums[s.key] += (typeof stats[s.key] === 'number' ? stats[s.key] : DEFAULT_STAT_PROFILE[s.key]); });
    count++;
  }
  if (count === 0) return Object.assign({}, DEFAULT_STAT_PROFILE);
  const avg = {};
  STAT_KEYS.forEach(s => { avg[s.key] = Math.round((sums[s.key] / count) * 10) / 10; }); // keep one decimal
  return avg;
}

// color mapping: values 1..9 -> gradient red -> green, value 10 -> blue
function getStatColor(value) {
  const v = Math.max(1, Math.min(10, Number(value) || 1));
  if (v === 10) return '#4aa3ff'; // Blue for top value
  // Gradient from red (#ff4d4d) to green (#4dff88) for values 1 to 9
  const gradientStop = (v - 1) / 8; // Normalize value (1 maps to 0, 9 maps to 1)
  const startColor = [255, 77, 77]; // RGB for red
  const endColor = [77, 255, 136]; // RGB for green

  // Interpolate RGB values
  const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * gradientStop);
  const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * gradientStop);
  const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * gradientStop);

  return `rgb(${r},${g},${b})`;
}

// render the stat graph (horizontal bars). Accepts object of stat keys (hp, atk, def, spd, hc, ep)
function renderStatGraphHtml(statsObj, opts = {}) {
  const scaleMax = 10;
  const containerClass = opts.containerClass || 'stat-graph';
  const labelWidth = opts.labelWidth || 48;
  let html = `<div class="${containerClass}">`;
  STAT_KEYS.forEach(s => {
    const raw = typeof statsObj[s.key] === 'number' ? statsObj[s.key] : DEFAULT_STAT_PROFILE[s.key];
    const val = Math.max(1, Math.min(scaleMax, Number(raw)));
    const pct = Math.round((val / scaleMax) * 100);
    const color = getStatColor(val);
    // Use inline styles with background + background-image:none and !important to avoid stylesheet overrides
    html += `
      <div class="sg-row">
        <div class="sg-label" style="width:${labelWidth}px">${s.label}</div>
        <div class="sg-bar" role="img" aria-label="${s.label}: ${val}/${scaleMax}">
          <div class="sg-bar-fill"
               style="width:${pct}%; background: ${color} !important; background-image: none !important;">
          </div>
        </div>
        <div class="sg-value">${val}</div>
      </div>
    `;
  });
  html += `</div>`;
  return html;
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
      if (CARD_KEYWORD[key]) {
        keywordSections.push({
          type,
          name: CARD_KEYWORD[key].name || v,
          desc: CARD_KEYWORD[key].description
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
        <div style="font-size:1.14em;color:#ffe066;font-weight:bold;">${sec.name}</div>
        <div style="font-size:1em;color:#fff;">${parseEffectText(sec.desc)}</div>
      `;

      // If this section is the Archetype block, insert the stat graph below it
      if (sec.type && String(sec.type).toLowerCase() === 'archetype') {
        // Prefer archetype stats, fall back to type, then trait
        let combinedStats = null;
        if (card.archetype) {
          combinedStats = getCombinedKeywordStats(card.archetype);
        } else if (card.type) {
          combinedStats = getCombinedKeywordStats(card.type);
        } else if (card.trait) {
          combinedStats = getCombinedKeywordStats(card.trait);
        } else {
          combinedStats = Object.assign({}, DEFAULT_STAT_PROFILE);
        }

        // Render stat graph HTML (helper: renderStatGraphHtml)
        html += `<div style="margin-top:8px;margin-bottom:12px;">`;
        html += renderStatGraphHtml(combinedStats, { containerClass: 'stat-graph' });
        html += `</div>`;
      }

      // Add divider after each section except the last
      if (i < keywordSections.length - 1) {
        html += `<div class="card-modal-divider"></div>`;
      }
    });
  } else {
    html += `<div style="color:#eee;">No special keywords or abilities found for this card.</div>`;
  }
  html += `<button id="close-card-info-modal" class="btn-negative-secondary" style="margin-top:16px;">Close</button>`;

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

	// Color
if (card.color) {
  const colorHtml = renderKeywordChips(card.color) || (Array.isArray(card.color) ? card.color.join(', ') : card.color);
  infoHtml += labeled("Color", colorHtml);
}
 
  // Category (show chip(s))
  if (card.category) {
    const catHtml = renderKeywordChips(card.category) || (Array.isArray(card.category) ? card.category.join(', ') : card.category);
    infoHtml += labeled("Category", catHtml);
  }

  // Rarity simple label
  if (card.rarity) {
    const rarHtml = renderKeywordChips(card.rarity) || (Array.isArray(card.rarity) ? card.rarity.join(', ') : card.rarity);
    infoHtml += labeled("Rarity", rarHtml);
  }

  // Archetype
  if (card.archetype) {
    const archHtml = renderKeywordChips(card.archetype) || (Array.isArray(card.archetype) ? card.archetype.join(', ') : card.archetype);
    infoHtml += labeled("Archetype", archHtml);
  }

  // Type(s) chips
  if (card.type) {
    const typeHtml = renderKeywordChips(card.type) || (Array.isArray(card.type) ? card.type.join(', ') : card.type);
    infoHtml += labeled("Type", typeHtml);
  }

  // Ability chips
  if (card.ability) {
    const abilityHtml = renderKeywordChips(card.ability) || (Array.isArray(card.ability) ? card.ability.join(', ') : card.ability);
    infoHtml += labeled("Ability", abilityHtml);
  }

  // Trait / special (dominion/etc)
  if (card.trait) {
    const traitHtml = renderKeywordChips(card.trait) || (Array.isArray(card.trait) ? card.trait.join(', ') : card.trait);
    infoHtml += labeled("Trait", traitHtml);
  }
 
if (card.skill) {
  let skills = Array.isArray(card.skill) ? card.skill : [card.skill];
  infoHtml += `<div class="full-card-info-row"><span class="full-card-info-label">Skills:</span></div>`;
  skills.forEach(skill => {
    if (typeof skill === "object" && skill !== null) {
      // Gather requirements in array
      let requirements = [];
      if (Array.isArray(skill.requirement)) {
        requirements = skill.requirement;
      } else if (skill.requirement) {
        requirements = [skill.requirement];
      }

      // Check for special/ultimate for CSS class
      const hasSpecial = requirements.some(req => req.class === "Special");
      const hasUltimate = requirements.some(req => req.class === "Ultimate");

      let skillNameClass = "";
      if (hasUltimate) {
        skillNameClass = "skill-ultimate-rainbow";
      } else if (hasSpecial) {
        skillNameClass = "skill-special-gradient";
      }

      infoHtml += `<div class="full-card-info-row">`;

      // Name with style
      if (skill.name) {
        infoHtml += `<span class="${skillNameClass}" style="${(!hasUltimate && !hasSpecial) ? 'color:#ffe066;font-weight:bold;align-self:center;' : ''}">${skill.name}</span> `;
      }

      // Cost
      if (skill.cost) {
        infoHtml += renderCardCost(skill.cost) + " ";
      }

      // Only show requirement.class CW or CCW
      requirements.forEach(req => {
        if (req.class === "CW" || req.class === "CCW") {
          infoHtml += `<span class="requirement-chip">${req.class}</span>`;
        }
      });

      infoHtml += `</div>`;
    } else {
      infoHtml += `<div class="full-card-info-row" style="margin-left:18px;">${parseEffectText(skill)}</div>`;
    }
  });
}
  infoHtml += `<div class="card-modal-divider"></div>`;
 
  // Stats row (hp/atk/def/cost)
  let statsRow = '';
  if (card.hp !== undefined || card.atk !== undefined || card.def !== undefined || card.cost !== undefined) {
   statsRow = '<div class="full-card-info-row">' +
   (card.hp !== undefined ? `<span class="full-card-info-label">HP:</span> ${renderStatIcon('hp', card.hp)} ` : '') +
   (card.atk !== undefined ? `<span class="full-card-info-label">ATK:</span> ${renderStatIcon('atk', card.atk)} ` : '') +
   (card.def !== undefined ? `<span class="full-card-info-label">DEF:</span> ${renderStatIcon('def', card.def)} ` : '') +
   `<span class="full-card-info-label">Cost:</span> ${renderCardCost(card.cost)}` +
   '</div>';
  }
  infoHtml += statsRow;
  infoHtml += `<div class="card-modal-divider"></div>`;
 
  // Text/effect areas
  if (card.effect) {
    infoHtml += `<div class="full-card-info-section" style="font-size:1.08em;color:#ffe066;margin-top:10px;">${parseEffectText(card.effect)}</div>`;
  }
  if (card.text) {
    infoHtml += `<div class="full-card-info-section" style="font-size:1.08em;color:#ffe066;margin-top:10px;">${card.text}</div>`;
  }

   // --- INFO BUTTON ---
  let infoButtonHtml = `<img id="card-info-btn" src="Icons/Other/Info.png" alt="Info" title="Keyword & Ability Info">`;
  // Compose modal content (side-by-side)
  modalContent.innerHTML = `
    <div class="full-card-modal-flex" style="position:relative;">
      ${infoButtonHtml}
      <div class="full-card-image-container">
        <img src="${card.image}" alt="${card.name}" class="full-card-modal-img ${owned === 0 ? 'card-image-locked' : ''}">
      </div>
      <div class="full-card-info-panel">
        ${infoHtml}
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
  let html = '';
  if (!costData) {
    return `<img src="${COST_IMAGE_MAP.X0}" alt="Cost: 0" style="width:22px;height:22px;vertical-align:middle;">`;
  }
  if (typeof costData === "string") {
    // Use parseEffectText for cost string, but limit to icons only
    html = costData.replace(/\{([GRUYCPBW])\}/gi, (match, code) =>
     `<img src="${COST_IMAGE_MAP[code.toUpperCase()]}" style="width:22px;height:22px;vertical-align:middle;">`
    );
    html = html.replace(/\{([0-9]|1[0-9]|20)\}/g, (match, num) => {
      const imgSrc = COST_IMAGE_MAP['X'+num];
      if (imgSrc) {
        return `<img src="${imgSrc}" style="width:22px;height:22px;vertical-align:middle;">`;
      }
      return `<span style="font-weight:bold;color:#ffe066;font-size:1.12em;vertical-align:middle;margin-right: 2px;">${num}</span>`;
    });
     // Tap/untap (case-insensitive)
    html = html.replace(/\{CW\}/gi,
      `<img src="Icons/Essence/Tap.png" style="width:22px;height:22px;vertical-align:middle;">`
    );
    html = html.replace(/\{CCW\}/gi,
      `<img src="Icons/Essence/Untap.png" style="width:22px;height:22px;vertical-align:middle;">`
    );
    return html;
  }
  // Fallback
  return `<img src="${COST_IMAGE_MAP.X0}" alt="Cost: 0" style="width:22px;height:22px;vertical-align:middle;">`;
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
function closeAllMenus() {document.querySelectorAll('.card-menu').forEach(menu => menu.remove());}

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
  return "Icons/Level/One.png";
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
        profileBanner: window.playerProfileBanner || "Images/Banner/Default.png",
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
      case 'common':    maxCount = 3; perCardPower = 1; foilPower = 2; break;
      case 'rare':      maxCount = 2; perCardPower = 3; foilPower = 6; break;
      case 'Legendary': maxCount = 1; perCardPower = 10; foilPower = 20; break;
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
  const profileBanner = profile.profileBanner || profile.banner || "Images/Banner/Default.png";
  const profilePic = profile.profilePic || profile.avatar || "Images/Avatar/Default.png";
  const username = profile.username || "Unknown";
  const power = typeof profile.power === "number" ? profile.power : 0;
  const displayUsername = username.length > 12 ? username.slice(0, 12) + "…" : username;

  // Create container
  const container = document.createElement('div');
  container.className = options.className || 'profile-panel-tile';
  container.style.background = `url('${profileBanner}')`;
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';

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
  usernameDiv.style.fontWeight = 'bold';
  usernameDiv.style.color = '#ffe066';
  usernameDiv.style.textShadow = '0 2px 8px #000';
  usernameDiv.style.marginBottom = '6px';
  usernameDiv.style.whiteSpace = "nowrap";
  usernameDiv.style.overflow = "hidden";
  usernameDiv.style.textOverflow = "ellipsis";

  // Power display
  const powerDiv = document.createElement('div');
  powerDiv.style.fontWeight = 'bold';
  powerDiv.style.color = '#fff';
  powerDiv.style.display = 'flex';
  powerDiv.style.alignItems = 'center';
  powerDiv.style.gap = '8px';

  const powerIcon = document.createElement('img');
  powerIcon.src = 'Icons/Other/Power.png';
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
  const profilePic = profile.profilePic || profile.avatar || "Images/Avatar/Default.png";
  const profileBanner = profile.profileBanner || profile.banner || "CaImagesrds/Banner/Default.png";
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
    <div style="padding:16px 0 10px 0;text-align:center;">
      <div style="font-weight:bold;font-size:1.18em;color:#ffe066;margin-bottom:12px;">Badges</div>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
  `;
  for (const badge of allBadges) {
    const isOwned = ownedBadges.includes(badge.id);
    badgeSection += `
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <img src="${badgeImageMap[badge.id] || 'Icons/Other/Rewards.png'}"
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
          ${ownedBanners.map(src => `<img src="${src}" alt="Banner" class="cosmetic-img" style="width:70px;height:auto;border-radius:8px;border:2px solid #ffe066;box-shadow:0 2px 8px #0007;">`).join('')}
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
  validate = null,
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
  content.onclick = e => e.stopPropagation();

 content.innerHTML = `
   <h3 style="color:#ffe066;margin-bottom:12px;">${title}</h3>
   ${label ? `<div style="margin-bottom:7px;color:#ffe066;">${label}</div>` : ""}
   <input id="modal-input-field" type="text" value="${defaultValue}"
     ${maxLength ? `maxlength="${maxLength}"` : ""}
     placeholder="${placeholder}"
     style="padding:8px 11px;font-size:1.13em;border-radius:7px;margin-bottom:10px;" />
   <div id="modal-input-error" style="color:#e25555;font-size:0.98em;margin-bottom:8px;display:none"></div>
   <div style="display:flex;justify-content:center;gap:10px;margin-top:2px;">
     <button id="modal-input-confirm" class="btn-secondary">${confirmText}</button>
     <button id="modal-input-cancel" class="btn-negative-secondary">${cancelText}</button>
   </div>
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
// showProfileModal({username:"Gabo", profilePic:"Cards/Avatar/Faelyra.png", profileBanner:"Cards/Banner/Verdara.png", power:1234, achievements:["achv1","achv2"], badges:["badge1"]});
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
  selectedAbilities,
  selectedPacks
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
    // --- PACK FILTER LOGIC: ---
    if (selectedPacks && selectedPacks.length && !selectedPacks.includes("All")) {
      // Map display names to dummyCards.set values
      const setMap = {
        "Elementa Genesis": "ElementaGenesis",
        "Scales of Ruin": "ScalesofRuin"
      };
      // If card.set is not in any selected pack, filter out
      if (!selectedPacks.some(pack => setMap[pack] === card.set)) return false;
    }
    return true;
  });
}
window.filterCards = filterCards;

function openFiltersMasterMenu(context, anchorElem) {
  // Get or create the menu element
  let menu = document.getElementById('filters-master-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'filters-master-menu';
    menu.className = 'menu';
    document.body.appendChild(menu);
  }
  menu.innerHTML = ''; // Clear previous

  // Filter config: (you may want to use your FILTERS_CONFIG if present)
  const FILTERS = [
    { key: 'rarity', label: 'Rarity' },
    { key: 'color', label: 'Color' },
    { key: 'category', label: 'Category' },
    { key: 'trait', label: 'Trait' },
    { key: 'type', label: 'Type' },
    { key: 'archetype', label: 'Archetype' },
    { key: 'ability', label: 'Ability' },

    // Add/remove as needed
  ];

  FILTERS.forEach(f => {
    const row = document.createElement('div');
    row.className = 'filter-master-menu-row';
    row.style = 'padding:10px 18px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;';
    row.innerHTML = `<span>${f.label}</span>`;
    row.onclick = function(ev) {
      ev.stopPropagation();
      // You will need to pass the right filter config object
      openFilterDropdownMenu(context, { key: f.key, options: getFilterOptions(f.key, context) }, row);
    };
    menu.appendChild(row);
  });

  // Reset Filters button
  const resetRow = document.createElement('div');
  resetRow.className = 'filter-master-menu-row filter-reset-row';
  resetRow.style = 'padding:10px 18px;cursor:pointer;color:#ffe066;font-weight:bold;border-top:1px solid #334;';
  resetRow.textContent = 'Reset Filters';
  resetRow.onclick = function(ev) {
    ev.stopPropagation();
    if (window.resetFiltersForContext) window.resetFiltersForContext(context);
    menu.style.display = 'none';
    // Optionally, re-render gallery/builders
    if (context === 'gallery' && typeof renderGallery === 'function') renderGallery();
    if (context === 'builder' && typeof renderBuilder === 'function') renderBuilder();
  };
  menu.appendChild(resetRow);

  // Position menu below the button
  const rect = anchorElem.getBoundingClientRect();
  menu.style.left = (rect.left + window.scrollX) + "px";
  menu.style.top = (rect.bottom + window.scrollY + 6) + "px";
  menu.style.display = 'block';
  menu.style.position = 'absolute';
  menu.style.zIndex = 1000;

  // Close on outside click
  function closeMenu(e) {
    if (!menu.contains(e.target) && e.target !== anchorElem) {
      menu.style.display = 'none';
      document.removeEventListener('mousedown', closeMenu, true);
    }
  }
  setTimeout(() => document.addEventListener('mousedown', closeMenu, true), 10);
}

// Helper: get filter options for a key (implement as needed)
function getFilterOptions(key, context) {
  // Return options for each filter; can be static or dynamic
  switch (key) {
    case 'color': return ['All', 'Green', 'Red', 'Blue', 'White', 'Black', 'Yellow', 'Gray', 'Purple'];
    case 'rarity': return ['All', 'Common', 'Rare', 'Legendary'];
    // ... and so on for others ...
    default: return ['All'];
  }
}
function openFilterDropdownMenu(context, filterConfig, anchorElem) {
  closeAllFilterDropdowns();

  // Build dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'filter-dropdown-menu';
  dropdown.style = 'position:absolute;z-index:1001;background:#232a3c;border-radius:10px;box-shadow:0 2px 16px #000b;padding:14px 18px;min-width:160px;';
  // Position right of anchorElem
  const rect = anchorElem.getBoundingClientRect();
  dropdown.style.left = (rect.right + window.scrollX + 6) + "px";
  dropdown.style.top = (rect.top + window.scrollY) + "px";

  // Build options
  filterConfig.options.forEach(opt => {
    const checked = (filterState[context][filterConfig.key]||[]).includes(opt) ||
      (opt === 'All' && (!(filterState[context][filterConfig.key]) || filterState[context][filterConfig.key].length === 0));
    const label = document.createElement('label');
    label.style = 'display:block;margin-bottom:7px;cursor:pointer;';
    label.innerHTML = `<input type="checkbox" value="${opt}" ${checked ? 'checked' : ''} style="margin-right:8px;">${opt}`;
    label.querySelector('input').onchange = function() {
      let arr = [...(filterState[context][filterConfig.key] || [])];
      if (opt === 'All') {
        // Clear all on All
        if (this.checked) arr = [];
      } else {
        // Uncheck All if any specific is checked
        const allBox = dropdown.querySelector('input[value="All"]');
        if (allBox) allBox.checked = false;
        if (this.checked) arr.push(opt);
        else arr = arr.filter(v => v !== opt);
      }
      // Remove dupes
      arr = [...new Set(arr)];
      // If All checked or nothing, clear array
      if (arr.includes('All') || arr.length === 0) arr = [];
      filterState[context][filterConfig.key] = arr;

      // --- FIX: Render the correct gallery ---
      if (context === 'builder' && typeof renderBuilder === 'function') {
        renderBuilder();
      } else if (context === 'gallery' && typeof renderGallery === 'function') {
        renderGallery();
      }

      // --- FIX: Anchor master menu to correct filter icon ---
      let anchorId = context === 'builder'
        ? 'open-filters-menu-builder'
        : 'open-filters-menu-gallery';
      let anchorElem = document.getElementById(anchorId);
      if (anchorElem) {
        openFiltersMasterMenu(context, anchorElem);
      }
    };
    dropdown.appendChild(label);
  });

  // Remove any previous dropdown
  closeAllFilterDropdowns();
  document.body.appendChild(dropdown);
}
// ----------------------------------- //
// --- Card Field Helper Functions --- //
// These functions work for both array and string fields (case-insensitive) //

function getCardDef(cardObj) {
  // Handles both dummyCards and direct card objects with full info
  const cid = cardObj.cardId || cardObj.id || cardObj;
  return typeof cardObj === "object" ? cardObj : dummyCards.find(c => c.id === cid);
}

function fieldIncludes(cardObj, field, value) {
  const card = getCardDef(cardObj);
  if (!card || !card[field]) return false;
  if (Array.isArray(card[field])) {
    return card[field].map(x => String(x).toLowerCase()).includes(String(value).toLowerCase());
  }
  return String(card[field]).toLowerCase() === String(value).toLowerCase();
}

// --- ATTACK LOGIC HELPERS --- //
function attackerHasAbility(cardObj, abilityName) {return hasAbility(cardObj, abilityName);}

function defenderHasAbility(cardObj, abilityName) {return hasAbility(cardObj, abilityName);}
// --- COLOR --- //
function isColor(cardObj, color) {return fieldIncludes(cardObj, "color", color);}
function isWhite(cardObj) { return isColor(cardObj, "White"); }
function isBlack(cardObj) { return isColor(cardObj, "Black"); }
function isRed(cardObj)   { return isColor(cardObj, "Red"); }
function isGreen(cardObj) { return isColor(cardObj, "Green"); }
function isBlue(cardObj)  { return isColor(cardObj, "Blue"); }
function isYellow(cardObj){ return isColor(cardObj, "Yellow"); }
function isGray(cardObj)  { return isColor(cardObj, "Gray"); }
function isPurple(cardObj){ return isColor(cardObj, "Purple"); }

// CATEGORY
function isCategory(cardObj, category) {return fieldIncludes(cardObj, "category", category);}
function isCreature(cardObj) { return isCategory(cardObj, "Creature"); }
function isDomain(cardObj)   { return isCategory(cardObj, "Domain"); }
function isArtifact(cardObj) { return isCategory(cardObj, "Artifact"); }
function isSpell(cardObj)    { return isCategory(cardObj, "Spell"); }

// TYPE
function isType(cardObj, type) {return fieldIncludes(cardObj, "type", type);}
function isAvian(cardObj)    { return isType(cardObj, "Avian"); }
function isBeast(cardObj)    { return isType(cardObj, "Beast"); }
function isBrute(cardObj)    { return isType(cardObj, "Brute"); }
function isConstruct(cardObj){ return isType(cardObj, "Construct"); }
function isDemon(cardObj)    { return isType(cardObj, "Demon"); }
function isDragon(cardObj)   { return isType(cardObj, "Dragon"); }
function isElemental(cardObj){ return isType(cardObj, "Elemental"); }
function isFaefolk(cardObj)  { return isType(cardObj, "Faefolk"); }
function isUndead(cardObj)   { return isType(cardObj, "Undead"); }

// --- ARCHETYPE --- //
function isArchtype(cardObj, archetype) {return fieldIncludes(cardObj, "archetype", archetype);}
// --- DRAGON --- //
function isThornwing(cardObj)    { return isArchtype(cardObj, "Thornwing"); }
function isBlazingScale(cardObj) { return isArchtype(cardObj, "Blazingscale"); }
function isAbyssdrake(cardObj)   { return isArchtype(cardObj, "Abyssdrake"); }
function isStormRazor(cardObj)   { return isArchtype(cardObj, "Stormrazor"); }
function isIronclaw(cardObj)     { return isArchtype(cardObj, "Ironclaw"); }
function isDreadspine(cardObj)  { return isArchtype(cardObj, "Dreadspine"); }
function isSolarwyrm(cardObj)    { return isArchtype(cardObj, "Solarwyrm"); }
function isNightshroud(cardObj)  { return isArchtype(cardObj, "Nightshroud"); }
function isGlimmerscale(cardObj) { return isArchtype(cardObj, "Glimmerscale"); }

// --- ELEMENTAL --- //
function isArbor(cardObj)      { return isArchtype(cardObj, "Arbor"); }
function isPyro(cardObj)       { return isArchtype(cardObj, "Pyro"); }
function isHydral(cardObj)     { return isArchtype(cardObj, "Hydral"); }
function isVoltkin(cardObj)    { return isArchtype(cardObj, "Voltkin"); }
function isGolem(cardObj)      { return isArchtype(cardObj, "Golem"); }
function isCorruptor(cardObj)  { return isArchtype(cardObj, "Corruptor"); }
function isLuminaut(cardObj)   { return isArchtype(cardObj, "Luminaut"); }
function isObscurid(cardObj)   { return isArchtype(cardObj, "Obscurid"); }

// --- CONSTRUCT --- //
function isGrovehusk(cardObj)   { return isArchtype(cardObj, "Grovehusk"); }
function isCindercore(cardObj)  { return isArchtype(cardObj, "Cindercore"); }
function isCoralbound(cardObj)  { return isArchtype(cardObj, "Coralbound"); }
function isStratosurge(cardObj) { return isArchtype(cardObj, "Stratosurge"); }
function isIronwrought(cardObj) { return isArchtype(cardObj, "Ironwrought"); }
function isPlagueaxis(cardObj)  { return isArchtype(cardObj, "Plagueaxis"); }
function isSolarforge(cardObj)  { return isArchtype(cardObj, "Solarforge"); }
function isShadowgear(cardObj)  { return isArchtype(cardObj, "Shadowgear"); }

// --- BEAST --- //
function isFireland(cardObj)   { return isArchtype(cardObj, "Fireland"); }
function isFrostland(cardObj)  { return isArchtype(cardObj, "Frostland"); }

// --- FAEFOLK --- //
function isElf(cardObj)    { return isArchtype(cardObj, "Elf"); }
function isFairy(cardObj)  { return isArchtype(cardObj, "Fairy"); }
function isSatyr(cardObj)  { return isArchtype(cardObj, "Satyr"); }

// --- BRUTE --- //
function isDwarf(cardObj)  { return isArchtype(cardObj, "Dwarf"); }
function isGoblin(cardObj) { return isArchtype(cardObj, "Goblin"); }
function isOrc(cardObj)    { return isArchtype(cardObj, "Orc"); }
// --- UNDEAD --- //
function isSkullframe(cardObj)  { return isArchtype(cardObj, "Skullframe"); }
function isVampiric(cardObj)  { return isArchtype(cardObj, "Vampiric"); }

// --- Celestial --- //
function isSeraph(cardObj)      { return isArchtype(cardObj, "Seraph"); }
// Add more as needed...

// --- TRAIT --- //
function isTrait(cardObj, trait) {return fieldIncludes(cardObj, "trait", trait);}
function isDominion(cardObj)  { return isTrait(cardObj, "Dominion"); }
function isWarrior(cardObj)   { return isTrait(cardObj, "Warrior"); }
function isMage(cardObj)      { return isTrait(cardObj, "Mage"); }
function isRanger(cardObj)    { return isTrait(cardObj, "Ranger"); }
function isEvolution(cardObj) { return isTrait(cardObj, "Evolution"); }
function isFusion(cardObj)    { return isTrait(cardObj, "Fusion"); }
// Add more as needed...

// --- ABILITY --- //
function hasAbility(cardObj, ability) {return fieldIncludes(cardObj, "ability", ability);}
function hasBurn(cardObj)       { return hasAbility(cardObj, "Burn"); }
function hasToxic(cardObj)      { return hasAbility(cardObj, "Toxic"); }
function hasSoak(cardObj)       { return hasAbility(cardObj, "Soak"); }
function hasFreeze(cardObj)     { return hasAbility(cardObj, "Freeze"); }
function hasBind(cardObj)       { return hasAbility(cardObj, "Bind"); }
function hasCurse(cardObj)      { return hasAbility(cardObj, "Curse"); }
function hasFlying(cardObj)     { return hasAbility(cardObj, "Flying"); }
function hasRush(cardObj)       { return hasAbility(cardObj, "Rush"); }
function hasProtect(cardObj)    { return hasAbility(cardObj, "Protect"); }
function hasAegis(cardObj)      { return hasAbility(cardObj, "Aegis"); }
function hasVeil(cardObj)       { return hasAbility(cardObj, "Veil"); }
function hasImmunity(cardObj)   { return hasAbility(cardObj, "Immunity"); }
function hasIntimidate(cardObj) { return hasAbility(cardObj, "Intimidate"); }
function hasAmbush(cardObj)     { return hasAbility(cardObj, "Ambush"); }

// --- BLIGHT --- //
// Primitive checks do direct, non-recursive inspection of internal flags and the statuses[] array.
// hasBlight simply composes the primitives.

function hasBlight(cardObj) {
  return Boolean(
    isBurned(cardObj) ||
    isPoisoned(cardObj) ||
    isSoaked(cardObj) ||
    isFrozen(cardObj) ||
    isBound(cardObj) ||
    isCursed(cardObj) ||
    isSealed(cardObj)
  );
}

function isBurned(cardObj) {
  if (!cardObj) return false;
  // Check internal flags first (back-compat)
  if (cardObj._burned || cardObj._burnedDEF) return true;
  // Then check statuses array (strings or objects with .name)
  if (Array.isArray(cardObj.statuses)) {
    for (const s of cardObj.statuses) {
      const name = (typeof s === 'string') ? s : (s && (s.name || s.id));
      if (!name) continue;
      const n = String(name).toLowerCase();
      if (n === 'burn' || n === 'burned') return true;
    }
  }
  return false;
}

function isPoisoned(cardObj) {
  if (!cardObj) return false;
  if (cardObj._poisoned) return true;
  if (Array.isArray(cardObj.statuses)) {
    for (const s of cardObj.statuses) {
      const name = (typeof s === 'string') ? s : (s && (s.name || s.id));
      if (!name) continue;
      const n = String(name).toLowerCase();
      if (n === 'poison' || n === 'poisoned') return true;
    }
  }
  return false;
}

function isSoaked(cardObj) {
  if (!cardObj) return false;
  if (cardObj._soak) return true;
  if (Array.isArray(cardObj.statuses)) {
    for (const s of cardObj.statuses) {
      const name = (typeof s === 'string') ? s : (s && (s.name || s.id));
      if (!name) continue;
      const n = String(name).toLowerCase();
      if (n === 'soak' || n === 'soaked') return true;
    }
  }
  return false;
}

function isFrozen(cardObj) {
  if (!cardObj) return false;
  if (cardObj._frozen) return true;
  if (Array.isArray(cardObj.statuses)) {
    for (const s of cardObj.statuses) {
      const name = (typeof s === 'string') ? s : (s && (s.name || s.id));
      if (!name) continue;
      const n = String(name).toLowerCase();
      if (n === 'freeze' || n === 'frozen') return true;
    }
  }
  return false;
}

function isBound(cardObj) {
  if (!cardObj) return false;
  if (cardObj._bound) return true;
  if (Array.isArray(cardObj.statuses)) {
    for (const s of cardObj.statuses) {
      const name = (typeof s === 'string') ? s : (s && (s.name || s.id));
      if (!name) continue;
      if (String(name).toLowerCase() === 'bound') return true;
    }
  }
  return false;
}

function isCursed(cardObj) {
  if (!cardObj) return false;
  if (cardObj._cursed) return true;
  if (Array.isArray(cardObj.statuses)) {
    for (const s of cardObj.statuses) {
      const name = (typeof s === 'string') ? s : (s && (s.name || s.id));
      if (!name) continue;
      const n = String(name).toLowerCase();
      if (n === 'cursed' || n === 'curse') return true;
    }
  }
  return false;
}

function isSealed(cardObj) {
  if (!cardObj) return false;
  if (cardObj._sealed) return true;
  if (Array.isArray(cardObj.statuses)) {
    for (const s of cardObj.statuses) {
      const name = (typeof s === 'string') ? s : (s && (s.name || s.id));
      if (!name) continue;
      const n = String(name).toLowerCase();
      if (n === 'sealed' || n === 'seal') return true;
    }
  }
  return false;
}
// internal listener registry: { "Soaked": [fn,fn], ... }
const blightListeners = {};

// internal: add listener, returns unsubscribe()
function addBlightListener(eventName, callback) {
  if (!eventName || typeof callback !== 'function') return () => {};
  const canonical = String(eventName).trim();
  if (!blightListeners[canonical]) blightListeners[canonical] = [];
  blightListeners[canonical].push(callback);
  return function unsubscribe() {
    const arr = blightListeners[canonical];
    if (!arr) return;
    const idx = arr.indexOf(callback);
    if (idx !== -1) arr.splice(idx, 1);
  };
}

// internal: notify listeners (defensive)
function notifyBlight(eventName, cardObj) {
  if (!eventName) return;
  const canonical = String(eventName).trim();
  const listeners = (blightListeners[canonical] || []).slice(); // copy
  for (const fn of listeners) {
    try { fn(cardObj); } catch (err) { console.warn(`notifyBlight listener for ${canonical} threw`, err); }
  }
}

// Public registration helpers (one per requested blight)
function onSoaked(cb)     { return addBlightListener('Soaked', cb); }
function onBurned(cb)     { return addBlightListener('Burned', cb); }
function onPoisoned(cb)   { return addBlightListener('Poisoned', cb); }
function onParalyzed(cb)  { return addBlightListener('Paralized', cb); }
function onBound(cb)      { return addBlightListener('Bound', cb); }
function onSealed(cb)     { return addBlightListener('Sealed', cb); }
function onCursed(cb)     { return addBlightListener('Cursed', cb); }
function onFrozen(cb)     { return addBlightListener('Frozen', cb); }

// Expose to window for console/tests if desired
window.onSoaked    = onSoaked;
window.onBurned    = onBurned;
window.onPoisoned  = onPoisoned;
window.onParalyzed = onParalyzed;
window.onBound     = onBound;
window.onSealed    = onSealed;
window.onCursed    = onCursed;
window.onFrozen    = onFrozen;


// --- TRAIT STATUS --- //
function hasEvolveSigil(cardObj) {
  if (!cardObj) return false;
  if (cardObj._hasEvolveSigil) return true;
  return Array.isArray(cardObj.statuses) && cardObj.statuses.some(s => s.name === 'EvolveSigil');
}
function hasFuseSigil(cardObj) {
  if (!cardObj) return false;
  if (cardObj._hasFuseSigil) return true;
  return Array.isArray(cardObj.statuses) && cardObj.statuses.some(s => s.name === 'FuseSigil');
}
// --- DAY/NIGHT CYCLE --- //
function getTimeOfDay() {if (!gameState || !gameState.timeOfDay) return 'day';return String(gameState.timeOfDay).toLowerCase();}
function isDay() {return getTimeOfDay() === 'day';}
function isNight() {return getTimeOfDay() === 'night';}
function isDusk() {return getTimeOfDay() === 'dusk';}
function isDawn() {return getTimeOfDay() === 'dawn';}


function countHandPlayer() {if (!window.gameState || !Array.isArray(gameState.playerHand)) return 0;
 return gameState.playerHand.length;}
function countHandOpponent() {if (!window.gameState || !Array.isArray(gameState.opponentHand)) return 0;
 return gameState.opponentHand.length;}
function countVoidPlayer() {if (!window.gameState || !Array.isArray(gameState.playerVoid)) 
 return 0; return gameState.playerVoid.length;}
function countVoidOpponent() {if (!window.gameState || !Array.isArray(gameState.opponentVoid)) 
 return 0;return gameState.opponentVoid.length;}
function countVoid() {return countVoidPlayer() + countVoidOpponent();}


// expose to window for use in UI/templates if desired
window.countHandPlayer = countHandPlayer;
window.countHandOpponent = countHandOpponent;
window.countVoid = countVoid;
window.countVoidOpponent = countVoidOpponent;
window.countVoidPlayer = countVoidPlayer;
// --- COUNTING HELPERS --- //
function countType(typeName) {
  if (!typeName) return 0;
  if (!window.gameState || !Array.isArray(gameState.playerCreatures)) return 0;
  try {
    return gameState.playerCreatures.filter(c => isType(c, typeName)).length;
  } catch (e) {
    // defensive fallback: match string field(s)
    try {
      return gameState.playerCreatures.filter(c => {
        const t = Array.isArray(c.type) ? c.type : [c.type];
        return t.some(x => String(x || '').toLowerCase() === String(typeName).toLowerCase());
      }).length;
    } catch (e2) {
      return 0;
    }
  }
}

// Per-type convenience wrappers (you requested these exact types)
function countBeast()     { return countType('Beast'); }
function countBrute()     { return countType('Brute'); }
function countConstruct() { return countType('Construct'); }
function countDemon()     { return countType('Demon'); }
function countDragon()    { return countType('Dragon'); }
function countElemental() { return countType('Elemental'); }
function countFaefolk()   { return countType('Faefolk'); }
function countHuman()     { return countType('Human'); }
function countUndead()    { return countType('Undead'); }
function countTypeVoid(typeName) {
  if (!typeName) return 0;
  if (!window.gameState || !Array.isArray(gameState.playerVoid)) return 0;

  try {
    // Prefer an existing helper (isType) when available
    if (typeof isType === 'function') {
      return gameState.playerVoid.filter(c => {
        try { return isType(c, typeName); } catch (e) { return false; }
      }).length;
    }

    // Fallback: inspect instance.type if available (string or array)
    return gameState.playerVoid.filter(c => {
      try {
        const t = Array.isArray(c.type) ? c.type : [c.type];
        return t.some(x => String(x || '').toLowerCase() === String(typeName).toLowerCase());
      } catch (e) {
        return false;
      }
    }).length;
  } catch (err) {
    // Last-resort defensive fallback: check the card definition (dummyCards) if present
    try {
      const defs = (typeof dummyCards !== 'undefined') ? dummyCards : [];
      return gameState.playerVoid.filter(c => {
        try {
          const def = defs.find(d => d.id === c.cardId) || {};
          const t = Array.isArray(def.type) ? def.type : [def.type];
          return t.some(x => String(x || '').toLowerCase() === String(typeName).toLowerCase());
        } catch (e2) {
          return false;
        }
      }).length;
    } catch (e2) {
      return 0;
    }
  }
}
window.countTypeVoid = countTypeVoid;

// --- COUNT TYPE VOID --- //
// Per-type convenience wrappers (player's VOID)
function countBeastVoid()     { return countTypeVoid('Beast'); }
function countBruteVoid()     { return countTypeVoid('Brute'); }
function countConstructVoid() { return countTypeVoid('Construct'); }
function countDemonVoid()     { return countTypeVoid('Demon'); }
function countDragonVoid()    { return countTypeVoid('Dragon'); }
function countElementalVoid() { return countTypeVoid('Elemental'); }
function countFaefolkVoid()   { return countTypeVoid('Faefolk'); }
function countHumanVoid()     { return countTypeVoid('Human'); }
function countUndeadVoid()    { return countTypeVoid('Undead'); }

window.countBeastVoid     = countBeastVoid;
window.countBruteVoid     = countBruteVoid;
window.countConstructVoid = countConstructVoid;
window.countDemonVoid     = countDemonVoid;
window.countDragonVoid    = countDragonVoid;
window.countElementalVoid = countElementalVoid;
window.countFaefolkVoid   = countFaefolkVoid;
window.countHumanVoid     = countHumanVoid;
window.countUndeadVoid    = countUndeadVoid;

function closeAllFilterDropdowns() {
  document.querySelectorAll('.filter-dropdown-menu').forEach(el => el.remove());
}
// Show News Modal
document.getElementById('news-icon').onclick = function() {
  document.getElementById('news-modal').style.display = 'flex';
  selectNewsTab('news');
};

document.getElementById('close-news-modal').onclick = function() {
  document.getElementById('news-modal').style.display = 'none';
};

// Tab selection logic
document.getElementById('tab-news').onclick = function() { selectNewsTab('news'); };
document.getElementById('tab-balance').onclick = function() { selectNewsTab('balance'); };
document.getElementById('tab-issues').onclick = function() { selectNewsTab('issues'); };

function selectNewsTab(tab) {
  ['news', 'balance', 'issues'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.remove('selected');
    document.getElementById(`panel-${t}`).style.display = 'none';
  });
  document.getElementById(`tab-${tab}`).classList.add('selected');
  document.getElementById(`panel-${tab}`).style.display = '';
  // Render panel content
  if (tab === 'news') renderNewsPanel();
  if (tab === 'balance') renderBalancePanel();
  if (tab === 'issues') renderIssuesPanel();
}
// --- AUTH.JS --- //
function checkAndShowDailyLogin() {
  const today = getUtcDateString();
  let { lastClaimedDay, lastLoginDate } = getDailyLoginInfo();
  let dayIdx = lastClaimedDay % DAILY_LOGIN_REWARDS.length;

  // Only show modal if not claimed today
  if (lastLoginDate !== today) {
    showDailyLoginModal(dayIdx);
  }
}

// --- Load Profile From Firestore ---
function loadProfile(user) {
  if (!user) return;
  firebase.firestore().collection('users').doc(user.uid).get()
    .then(doc => {
      let icon = defaultIcon;
      let name = user.displayName || user.email;
      let banner = defaultBanner;
      if (doc.exists) {
        const data = doc.data();
        if (data && data.profilePic) icon = data.profilePic;
        if (data && data.username) name = data.username;
        if (data && data.profileBanner) banner = data.profileBanner;
      }
      profilePic.src = icon;
      if (profilePicMenu) profilePicMenu.src = icon;
      profileUsernameDisplay.textContent = name;
      profileBanner.src = banner;
      checkAndShowDailyLogin();
    })
    .catch(err => {
      profilePic.src = defaultIcon;
      profileBanner.src = defaultBanner;
      profileUsernameDisplay.textContent = user.displayName || user.email || "";
    });
}
// --- Profile / Auth DOM Elements ---
document.addEventListener('DOMContentLoaded', function () {
  // --- ICON CHOICES ---
  function getUnlockedAvatars(cb) {
    const user = auth.currentUser;
    if (!user) {
      if (typeof cb === "function") cb([defaultIcon]);
      return;
    }
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(function(doc) {
        if (doc.exists && doc.data().unlockedAvatars) {
          window.playerUnlockedAvatars = doc.data().unlockedAvatars;  
          if (typeof cb === "function") cb(doc.data().unlockedAvatars);
          return;
        }
        if (typeof cb === "function") cb([defaultIcon]);
      });
  } 

  function getUnlockedBanners(cb) {
    const user = auth.currentUser;
    if (!user) {
      if (typeof cb === "function") cb([defaultBanner]);
      return;
    }
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(function(doc) {
        if (doc.exists && doc.data().unlockedBanners) {
          // Update global just like avatars
          window.playerUnlockedBanners = doc.data().unlockedBanners;
          if (typeof cb === "function") cb(doc.data().unlockedBanners);
          return;
        }
        if (typeof cb === "function") cb([defaultBanner]);
      });
  }

  // --- Render Profile Avatars ---
function renderProfileIcons(selectedIcon) {
  profileIcons.innerHTML = "";

  // Dynamically fetch available avatars
  const availableAvatars = getAvailableAvatars();

  if (availableAvatars.length === 0) {
    // Display fallback if no avatars are unlocked
    profileIcons.innerHTML = "<div style='color:#eee;'>No avatars available.</div>";
    return;
  }

  // Generate avatar UI elements
  availableAvatars.forEach((avatar) => {
    const img = document.createElement("img");
    img.src = avatar.src; // Use avatar src for the image source 
    img.className = avatar.src === selectedIcon ? "selected" : ""; // Add "selected" class if it's the selected icon
    img.alt = avatar.name || avatar.id; // Add alt attribute for accessibility
    img.title = avatar.name || avatar.id; // Add a title tooltip
    img.onclick = function () {
      selectProfileIcon(avatar.src); // Handle avatar selection
    };
    profileIcons.appendChild(img); // Append the image to the profileIcons container
  });
}
  // --- Render Banners ---
function renderProfileBanners(selectedBanner) {
  profileBanners.innerHTML = "";

  // Dynamically fetch available banners
  const availableBanners = getAvailableBanners();

  if (availableBanners.length === 0) {
    // Display fallback message if no banners are unlocked
    profileBanners.innerHTML = "<div style='color:#eee;'>No banners available.</div>";
    return;
  }

  // Generate banner UI elements
  availableBanners.forEach((banner) => {
    const img = document.createElement("img");
    img.src = banner.src; // Use banner src for the image source
    img.className = banner.src === selectedBanner ? "selected" : ""; // Add "selected" class if it's the selected banner
    img.alt = banner.name || banner.id; // Add alt attribute for accessibility
    img.title = banner.name || banner.id; // Add a title tooltip
    img.onclick = function () {
      selectProfileBanner(banner.src); // Handle banner selection
    };
    profileBanners.appendChild(img); // Append the image to the profileBanners container
  });
}
    
// --- Open/Close Avatar Modal ---
profilePicMenuBtn.onclick = function() {
  const currentIcon = profilePicMenu && profilePicMenu.src ? profilePicMenu.src.split('?')[0] : "";
  getUnlockedAvatars(function(unlocked) {
    renderProfileIcons(currentIcon, unlocked);
    if (profileIconModal) profileIconModal.style.display = 'flex';
  });
};
closeProfileIconModalBtn.onclick = function() {
  if (profileIconModal) profileIconModal.style.display = 'none';
};
profileIconModal.onclick = function(e) {
  if (e.target === profileIconModal) {
    profileIconModal.style.display = 'none';
  }
};
    
  // --- Avatar Selection ---
  function selectProfileIcon(iconUrl) {
    const user = auth.currentUser;
    if (!user) return;
    window.playerProfilePic = iconUrl;
    firebase.firestore().collection('users').doc(user.uid)
      .set({ profilePic: iconUrl }, {merge: true})
      .then(function() {
          if (profilePic) profilePic.src = iconUrl;
          if (profilePicMenu) profilePicMenu.src = iconUrl;          
          getUnlockedAvatars(function(unlocked) {
              renderProfileIcons(iconUrl, unlocked);
          });
          if (profileIconModal) profileIconModal.style.display = 'none';
      })
      .catch(function(err) {
        console.error('[auth] Failed to update profile icon:', err);
      });
  }

  // --- Banner Modal ---
  profileBanner.onclick = function() {
    const currentBanner = profileBanner.src.split('?')[0];
    getUnlockedBanners(function(unlocked) {
      renderProfileBanners(currentBanner, unlocked);
      profileBannerModal.style.display = 'flex';
    });
  };
  closeProfileBannerModalBtn.onclick = function() {
    profileBannerModal.style.display = 'none';
  };
  profileBannerModal.onclick = function(e) {
    if (e.target === profileBannerModal) {
      profileBannerModal.style.display = 'none';
    }
  };

  // --- Banner Selection ---
  function selectProfileBanner(bannerUrl) {
    const user = auth.currentUser;
    if (!user) return;
    window.playerProfileBanner = bannerUrl;
    firebase.firestore().collection('users').doc(user.uid)
      .set({ profileBanner: bannerUrl }, { merge: true })
      .then(function() {
        getUnlockedBanners(function(unlocked) {
          renderProfileBanners(bannerUrl, unlocked);
        });
        if (profileBannerModal) profileBannerModal.style.display = 'none';
      })
      .catch(function(err) {
        console.error('[auth] Failed to update profile banner:', err);
      });
  }

// --- Profile menu open logic ---
profilePic.onclick = function(e) {
  e.stopPropagation();
  document.querySelectorAll('.menu').forEach(m => {
    if (m !== profileMenu) m.style.display = 'none';
  });

  profileMenu.style.display = 'block';
  profileMenu.style.position = 'absolute';
  profileMenu.style.zIndex = 2000;

  const anchorEl = profilePic || profileArea;
  const rect = anchorEl.getBoundingClientRect();
  if (typeof placeMenuWithinViewport === 'function') {
    placeMenuWithinViewport(profileMenu, rect, 'below');
  } else {
    // fallback: position below anchor
    const top = rect.bottom + window.scrollY + 8;
    const left = rect.left + window.scrollX;
    profileMenu.style.top = `${top}px`;
    profileMenu.style.left = `${left}px`;
  }
};
    
if (!profilePicMenuBtn) {
  // Create the button if it doesn't exist
  profilePicMenuBtn = document.createElement('button');
  profilePicMenuBtn.id = 'profile-pic-btn';
  profilePicMenuBtn.style.display = 'none';
  document.body.appendChild(profilePicMenuBtn);
}

// Hide menu on outside click (like other menus)
    document.body.addEventListener('click', function(e) {
      if (
        profileMenu.style.display === 'block' &&
        !profileMenu.contains(e.target) &&
        !profilePic.contains(e.target)
      ) {
        profileMenu.style.display = 'none';
      }
    });

// Prevent menu from closing if clicking inside
    profileMenu.onclick = function(e) {
      e.stopPropagation();
    };
  const usernameDisplay = document.getElementById('profile-username-display');
  if (!usernameDisplay) return;

  usernameDisplay.style.cursor = "pointer";
  usernameDisplay.title = "Click to change username";

usernameDisplay.onclick = function () {
  const current = usernameDisplay.textContent || "";
  showInputModal({
    title: "Change Username",
    label: "Username (max 12 chars):",
    defaultValue: current,
    maxLength: 12,
    placeholder: "Enter new username",
    confirmText: "Update",
    validate: (val) => {
      if (!val) return "Username required.";
      if (val.length > 12) return "Max 12 characters.";
      // You could add more validation here (e.g. only alphanum)
      return null;
    },
    onConfirm: function(newName) {
      if (!newName || newName === current) return;
      const user = auth.currentUser;
      if (!user) return;
      user.updateProfile({ displayName: newName })
        .then(() => {
          return firebase.firestore().collection('users').doc(user.uid)
            .set({ username: newName }, { merge: true });
        })
        .then(() => {
          usernameDisplay.textContent = newName;
          if (typeof showToast === "function") showToast("Username updated!", { type: "success" });
        })
        .catch(err => {
          console.error("[auth] Failed to update username:", err);
          if (typeof showToast === "function") showToast("Failed to update username.", { type: "error" });
        });
    }
  });
};
});
// Initial News Panel content
function renderNewsPanel() {
  const panel = document.getElementById('panel-news');
  if (panel) panel.innerHTML = `<div style="font-size:1.25em;color:#ffe066;text-align:center;">Welcome to the World of Elementa</div>`;
}
function renderBalancePanel() {
  const panel = document.getElementById('panel-balance');
  if (panel) panel.innerHTML = `<div style="font-size:1.15em;color:#ffe066;text-align:center;">No balance updates yet.</div>`;
}
function renderIssuesPanel() {
  const panel = document.getElementById('panel-issues');
  if (panel) panel.innerHTML = `<div style="font-size:1.15em;color:#ffe066;text-align:center;">No issues reported yet.</div>`;
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

// ---------------- //
// --- SETTINGS --- //
// ---------------- //

// Popover Settings Menu Logic (applies sitewide)
document.addEventListener("DOMContentLoaded", function() {
  // Support all settings icons in all sections (add more if needed)
  const settingIds = [
    'home-settings-btn',
    'gallery-settings-btn',
    'builder-settings-btn',
    'gameplay-settings-btn',
    'shop-settings-btn'
  ];
  const settings = settingIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const menu = document.getElementById('settings-menu-pop');
  const toggleNotices = document.getElementById('toggle-notices');
  const toggleMusic = document.getElementById('toggle-music');

  // Open menu for any settings icon
// Open menu for any settings icon
settings.forEach(setting => {
  setting.onclick = function(e) {
    e.stopPropagation();

    // Get the bounding rect of the icon (anchor)
    const rect = setting.getBoundingClientRect();

    // Make the menu temporarily visible to calculate placement but keep it hidden initially
    menu.style.display = 'block'; // Ensure the menu is in the DOM for size calculations
    menu.style.visibility = 'hidden';

    // Position the menu first (before correcting it with placeMenuWithinViewport)
    menu.style.top = `${rect.bottom + window.scrollY}px`; // Place the menu right below
    menu.style.left = `${rect.right + window.scrollX}px`; // Place the menu to the right

    // Adjust the menu to ensure it remains within the viewport
    placeMenuWithinViewport(menu, rect, "bottom-right");

    // Show and activate the menu
    menu.classList.add('active');
    menu.style.visibility = 'visible';
    menu.style.display = 'block';

    // Load saved settings (example)
    toggleNotices.checked = localStorage.getItem('settings-notices') === 'on';
    toggleMusic.checked = localStorage.getItem('settings-music') === 'on';

    // Hide menu if user clicks outside
    setTimeout(() => {
      document.body.addEventListener('mousedown', hideSettingsMenu, { once: true });
    }, 10);
  };
});

function hideSettingsMenu(e) {
  menu.classList.remove('active');
  menu.style.display = 'none';
}

// Prevent clicks inside the menu from closing it
menu.onclick = function(e) { e.stopPropagation(); };

  function hideSettingsMenu(e) {
    menu.classList.remove('active');
    menu.style.display = 'none';
  }

  // Prevent menu click from closing it
  menu.onclick = function(e) { e.stopPropagation(); };

  // Toggle handlers
  toggleNotices.onchange = function() {
    localStorage.setItem('settings-notices', this.checked ? 'on' : 'off');
    // Add logic for enabling/disabling notices if needed
  };
  toggleMusic.onchange = function() {
    localStorage.setItem('settings-music', this.checked ? 'on' : 'off');
    // Add logic for enabling/disabling music if needed
  };

  // Logout button logic
  const settingsLogoutBtn = document.getElementById('settings-logout-btn');
  if (settingsLogoutBtn) {
    settingsLogoutBtn.onclick = function() {
      // If you have a function like logout() defined in auth.js:
      if (typeof logout === "function") {
        logout();
      } else if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut().then(function() {
          location.reload();
        });
      }
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
