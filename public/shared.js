// CARD LIST //    
const dummyCards = [
/*

// CHAMPIONS BASIC //

{id: 'SylvaniaThornEmpress', name: 'Sylvania, Thorn Empress', rarity: 'Legendary', image: 'CardImages/Sylvan/SylvaniaThornEmpress.png', 
 category: 'Creature', color: 'Green', type: ['Elf', 'Mage'], trait: 'Champion', hp: 11, atk: 1, def: 0,
 cost: '{G}', archetype: 'Sylvan', ability: 'Ranged', set: 'ElementaGenesis'
 skill: [
  {name: 'Champion Ascent', cost: '{g}', 
   effect: {class: 'Unseal'}, championAscend: true}
  {name: 'Bloomchant', cost: '{g}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'essenceGreen', amount: 2}},
  {name: "Briar Queen's Grasp", cost: '{G}',
   requirement: [{class:'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Strike', amount: 3, status: 'Bind'}},
  ]},

{id: 'KaelenBlazebornHuntress', name: 'Kaelen, Blazeborn Huntress', rarity: 'Legendary', image: 'CardImages/Inferno/KaelenBlazebornHuntress.png', 
 category: 'Creature', color: 'Red', type: 'Warrior', trait: 'Champion', hp: 4, atk: 1, def: 0,
 cost: '{R}', archetype: '', ability: ['Burn','Ranged'], set: 'ElementaGenesis',
 skill: [
  {name: 'Flameshot', cost: '{r}',
   requirement: [{class:'Special'}, {class: 'CCW'}], 
   effect: {class: 'Strike', status: 'Burn', amount: 2}},
  {name: 'Scorching Skyfall', cost: '{R}{R}',
   requirement: [{class:'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Burn', amount: 2, target: 3}}
  ]},

{id: 'ZaryonPearlhavenCommander', name: 'Zaryon, Pearlhaven Commander', rarity: 'Legendary', image: 'CardImages/Tidal/ZaryonPearlhavenCommander.png', 
 category: 'Creature', color: 'Blue', type: ['Merfolk', 'Warrior'], trait: 'Champion', hp: 12, atk: 2, def: 1,
 cost: '{U}', archetype: '', ability: ['Dive','Pierce'], set: 'ElementaGenesis'
 skill: [
  {name: 'Deepkin Rally', cost: '{u}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'Token', tokenChoices: ['MerfolkWarrior', 'MerfolkMermaid'], amount: }},
  {name: 'Tidepiercer Vortex', cost: '{u}{u}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Soak', amount: 3, target: 3}}
 ]},

{id: 'ZyraThunderbladeDuelist', name: 'Zyra, Thunderblade Duelist', rarity: 'Legendary', image: 'CardImages/Tempest/ZyraThunderbladeDuelist.png', 
 category: 'Creature', color: 'Yellow', type: 'Warrior', trait: 'Champion', hp: 7, atk: 1, def: 1,
 cost: '{Y}{Y}', archetype: '', ability: ['Dash'] set: 'ElementaGenesis',
 skill: [
  {name: 'Voltcleave', cost: '{y}',
   requirement: [{class:'Special'}, {class: 'CCW'}], 
   effect: {class: 'Pierce', amount: 2}},
  {name:'Blade Tempest, cost: '{Y}{Y}',
   requirement: {class:'Ultimate'}, 
   effect: {class: 'Strike', target: 3 amount: 2}}
 ]},

{id: 'GravokDrakzulTyrant', name: 'Gravok, Drakzul Tyrant', rarity: 'Legendary', image: 'CardImages/Terra/GravokDrakzulTyrant.png', 
 category: 'Creature', color: 'Gray', type: 'Warrior', trait: 'Champion', hp: 10, atk: 2, def: 1,
 cost: '{C}', archetype: '', ability: ['Armor','Crush'], set: 'ElementaGenesis',
 skill: [
  {name: 'Twin Impact', cost: '{c}',
   requirement: [{class:'Special'}, {class: 'CCW'}], 
   effect: {class: 'Strike', target: 2, amount: 2}},
  {name: 'Seismic Smite', cost: '{c}{C}',
   requirement: [{class:'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Strike', target: 3, amount: 2}}
 ]},

{id: 'MordrathVirkulPhantom', name: 'Mordrath, Virkul Phantom', rarity: 'Legendary', image: 'CardImages/Cursed/MordrathVirkulPhantom.png', 
 category: 'Creature', color: 'Purple', type: ['Undead', 'Warrior'], trait: 'Champion', hp: 6, atk: 1, def: 1,
 cost: '{P}', archetype: '', ability: ['Immunity','Venom'], set: 'ElementaGenesis',
 skill: [
  {name: 'Reanimate', cost: '{1}{P}{P}',
   effect: {class: 'Reanimate'}},
  {name: 'Blightfall Slash', cost: '{P}{P}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 1}},
  {name: 'Toxic Miasma', cost: '{p}{p}',
   requirement: [{class:'Ultimate'}, {class: 'CW'}], 
   effect: {class: 'Miasma', def: 1}},
 ]},

{id: 'ElyndraDawnbladeofHeavens', name: 'Elyndra, Dawnblade of Heavens', rarity: 'Legendary', image: 'CardImages/Radiance/ElyndraDawnbladeofHeavens.png', 
 category: 'Creature', color: 'White', type: 'Warrior', trait: 'Champion', hp: 11, atk: 1, def: 1,
 cost: '{W}', archetype: '', ability: ['Aegis','Veil'], set: 'ElementaGenesis',
 skill: [
  {name: 'Bloomchant', cost: '{w}',
   requirement: [{class:'Special'}, {class: 'CW'}], 
   effect: {class: 'Inspire', def: 1}},
  {name: 'Radiant Severance', cost: '{w}{W}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: {class: 'Strike', status: 'Aegis'},

 ]},

{id: 'VelmiraMistressofSilence', name: 'Velmira, Mistress of Silence', rarity: 'Legendary', image: 'CardImages/Umbral/VelmiraMistressofSilence.png', 
 category: 'Creature', color: 'Black', type: 'Mage', trait: 'Champion', hp: 5, atk: 1, def: 0,
 cost: '{B}', archetype: '', ability: ['Ranged','Veil'], set: 'ElementaGenesis',
 skill: [
  {name:'Lifetithe', cost: '{B}',
   requirement: {class:'CCW'}, 
   effect: {class: 'Seal'}},
  {name: 'Eternal Silence', cost: '{b}{b}',
   requirement: [{class:'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Burst', amount: 0, status: 'Seal'}
 ]},

// DRAGONS //

{id: 'VerdarokSylvanWarden', name: 'Verdarok, Sylvan Warden', rarity: 'Legendary', image: 'CardImages/Thornwing/VerdarokSylvanWarden.png', 
 category: 'Creature', color: 'Green', type: 'Dragon', archetype: 'Thornwing', trait: 'Evolution', hp: 18, atk: 5, def: 3,
 cost: '{4}{G}{G}', ability: ['Flying','Protect'], set: 'ScalesofRuin',
 skill: [
  {name: 'Reveal', cost: '{g}',
   requirement: {class: 'Reveal'},
   resolution: {effect: 'Inspire', ability: 'Protect', def: 1}},
  {name: 'Defender', 
   activation: {class: 'Defender'},
   resolution: {effect: 'Search', archetype: 'Thornwing'}},
  {name: 'Wooden Bastion', cost: '{g}{g}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}],
   effect: {class: 'Armor', amount: 5}},
  {name: 'Evolution', cost: '{g}{g}{g}',
   effect: {class: 'Evolution'}}
 ]},
{id: 'VerdarokMossletFlutterwing', name: 'Verdarok, Mosslet Flutterwing', rarity: 'Legendary', image: 'CardImages/Thornwing/VerdarokMossletFlutterwing.png', 
 category: 'Creature', color: 'Green', type: 'Dragon', archetype: 'Thornwing', hp: 7, atk: 2, def: 1,
 cost: '{G}{G}', ability: ['Flying','Protect'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Reveal', cost: '{g}',
   requirement: {class: 'Reveal'},
   resolution: {effect: 'Inspire', ability: 'Protect', def: 1}},
  {name: 'Defender', 
   activation: {class: 'Defender'},
   resolution: {effect: 'Search', archetype: 'Thornwing', amount: 1}},
  {name: 'Verdant Galeburst', cost: '{g}{g}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}],
   effect: {class: 'Mossbound Terrain'}},
  {name: 'Evolve', cost: '{g}',
   effect: {class: 'Evolve'}}
 ]},

{id: 'PyronyxInfernoBlazingscale', name: 'Pyronyx, Inferno Blazingscale', rarity: 'Legendary', image: 'CardImages/Cinderscale/PyronyxInfernoBlazingscale.png', 
 category: 'Creature', color: 'Red', type: 'Dragon', archetype: 'Blazingscale', trait: 'Evolution', hp: 11, atk: 5, def: 2,
 cost: '{3}{R}{R}', ability: ['Burn','Flying','Ranged'], set: 'ScalesofRuin',
 skill: [
  {name: 'Reveal', cost: '{R}',
   requirement: {class: 'Reveal'}
   resolution: {effect: 'Strike', amount: 1, status: 'Burn'}},
  {name: 'Cataclysmic Blaze', cost: '{r}{r}{R}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Burst', amount: 3, status: 'Burn'}},
  {name: 'Evolution', cost: '{r}{r}',
   effect: {class: 'Evolution'}}
 ]},
{id: 'PyronyxEmberBreeze', name: 'Pyronyx, Ember Breeze', rarity: 'Legendary', image: 'CardImages/Cinderscale/PyronyxEmberBreeze.png', 
 category: 'Creature', color: 'Red', type: 'Dragon', archetype: 'Blazingscale', hp: 4, atk: 3, def: 1,
 cost: '{R}{R}', ability: ['Burn','Flying'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Reveal', cost: '{R}',
   requirement: {class: 'Reveal'}
   resolution: {effect: 'Strike', amount: 1, status: 'Burn'}},
  {name: 'Cataclysmic Blaze', cost: '{r}{r}{R}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Burst', amount: 3, status: 'Burn'}},
  {name: 'Evolve', cost: '{r}',
   effect: {class: 'Evolve'}}
 ]},

{id: 'AbyndraTidalWraith', name: 'Abyndra, Tidal Wraith', rarity: 'Legendary', image: 'CardImages/Abyssdrake/AbyndraTidalWraith.png', 
 category: 'Creature', color: 'Blue', type: 'Dragon', archetype: 'Abyssdrake', trait: 'Evolution', hp: 19, atk: 4, def: 2,
 cost: '{5}{U}{U}', ability: ['Flying','Aegis','Veil'], set: 'ScalesofRuin',
 skill: [
  {name: 'Reveal', cost: '{u}',
   requirement: {class: 'Reveal'}
   resolution: {effect: 'Search', name category: 'Domain', color: 'Blue'}},
  {name: 'Ocean's Requiem', cost: '{u}{u}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: {class: 'Burst', amount: 3, status: 'Burn'}},
  {name: 'Maelstrom Oblivion', cost: '{u}{u}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: [{class: 'Soak', amount: 2, target: 3}, {class: 'Rain'}]}
  {name: 'Evolution', cost: '{u}{u}',
   effect: {class: 'Evolution'}}
 ]},
{id: 'AbyndraRipplefinGloomlet', name: 'Abyndra, Ripplefin Gloomlet', rarity: 'Legendary', image: 'CardImages/Abyssdrake/AbyndraRipplefinGloomlet.png', 
 category: 'Creature', color: 'Blue', type: 'Dragon', archetype: 'Abyssdrake', hp: 7, atk: 2, def: 1,
 cost: '{U}{U}', ability: ['Flying','Veil'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Reveal', cost: '{u}',
   requirement: {class: 'Reveal'},
   resolution: {effect: 'Search', category: 'Domain', color: 'Blue'}},
  {name: 'Mirror of the Deep', cost: '{u}{u}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: {class: 'Burst', amount: 3, status: 'Burn'}},
  {name: 'Evolve', cost: '{u}',
   effect: {class: 'Evolve'}}
 ]},

{id: 'VoltrazekTempestReaver', name: 'Voltrazek, Tempest Reaver', rarity: 'Legendary', image: 'CardImages/Stormrazor/VoltrazekTempestReaver.png', 
 category: 'Creature', color: 'Yellow', type: 'Dragon', archetype: 'Stormrazor', trait: 'Evolution', hp: 13, atk: 4, def: 1,
 cost: '{3}{Y}{Y}', ability: ['Flying','Pierce'], set: 'ScalesofRuin',
 skill: [
  {name: 'Reveal', cost: '{y}',
   requirement: {class: 'Reveal'},
   resolution: {effect: 'Search', category: 'Spell', color: 'Yellow'}},
  {name: 'Electro Burst', cost: '{y}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: {class: 'Burst', amount: 1}},
  {name: 'Evolution', cost: '{y}{y}{y}',
   effect: {class: 'Evolution'}}
 ]},
{id: 'VoltrazekSparkletStormling', name: 'Voltrazek, Sparkle tStormling', rarity: 'Legendary', image: 'CardImages/Stormrazor/VoltrazekSparkletStormling.png', 
 category: 'Creature', color: 'Yellow', type: 'Dragon', archetype: 'Stormrazor', hp: 5, atk: 3, def: 0,
 cost: '{Y}{Y}', ability: ['Flying','Pierce'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Dash', cost: '{y}',
   resolution: {effect: 'Dash'}},
  {name: 'Gigavolt Prance', cost: '{y}',
   requirement: [{class: 'Ultimate'}, {class:'CCW'}], 
   effect: {class: 'Burst', amount: 1}},
  {name: 'Evolve', cost: '{y}',
   effect: {class: 'Evolve'}}
 ]},

{id: 'MyxarothCursedVenomspine', name: 'Myxaroth, Cursed Venomspine', rarity: 'Legendary', image: 'CardImages/Venomspine/MyxarothCursedVenomspine.png', 
 category: 'Creature', color: 'Purple', type: 'Dragon', trait: 'Evolution', hp: 13, atk: 4, def: 2,
 cost: '{4}{P}{P}', archetype: 'Venomspine', ability: ['Flying','Venom'], set: 'ScalesofRuin',
 skill: [
  {name: 'Discard', cost: '{p}',
   requirement: {class:'Discard'},
   effect: {class: 'Strike', status: 'Poison'}},
  {name: 'Toxic Miasma', cost: '{p}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Toxic Miasma'}},
  {name: 'Void Evolution', cost: '{p}{p}{p}',
   effect: {class: 'Void Evolution'}}
 ]},
{id: 'MyxarothToxletMireling', name: 'Myxaroth, Toxlet Mireling', rarity: 'Legendary', image: 'CardImages/Venomspine/MyxarothToxletMireling.png', 
 category: 'Creature', color: 'Purple', type: 'Dragon', archetype: 'Venomspine', hp: 5, atk: 2, def: 1,
 cost: '{P}{P}', ability: ['Flying','Venom'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Discard', cost: '{p}',
   requirement: {class:'Discard'},
   effect: {class: 'Decay'}},
  {name: 'Acidblight Swell', cost: '{p}{p}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Toxic Miasma'}},
  {name: 'Evolve', cost: '{p}',
   effect: {class: 'Evolve'}}
 ]},

{id: 'FerronyxTerraColossus', name: 'Ferronyx, Terra Colossus', rarity: 'Legendary', image: 'CardImages/Terraclaw/FerronyxTerraColossus.png', 
 category: 'Creature', color: 'Gray', type: 'Dragon', archetype: 'Ironclaw', trait: 'Evolution', hp: 9, armor: 7, atk: 5, def: 3,
 cost: '{4}{C}{C}', ability: ['Armor','Flying','Protect'], set: 'ScalesofRuin',
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
{id: 'FerronyxShardletGrindlewyrm', name: 'Ferronyx, Shardlet Grindlewyrm', rarity: 'Legendary', image: 'CardImages/Terraclaw/FerronyxShardletGrindlewyrm.png', 
 category: 'Creature', color: 'Gray', type: 'Dragon', archetype: 'Ironclaw', hp: 3, armor: 4, atk: 4, def: 2,
 cost: '{C}{C}', ability: ['Armor','Flying','Protect'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Reveal', cost: '{c}',
   requirement: {class: 'Reveal},
   effect: {class: 'Armor'}},
  {name: 'Forgelight Mantle', cost: '{c}{c}',
   requirement: [{class: 'Ultimate'}, {class:'CW'}], 
   effect: {class: 'Armor', target: playersCreatures}},
  {name: 'Evolve', cost: '{c}',
   effect: {class: 'Evolve'}}
 ]},

{id: 'NoctyrosUmbralNightshroud', name: 'Noctyros, Umbral Nightshroud', rarity: 'Legendary', image: 'CardImages/Nightshroud/NoctyrosUmbralNightshroud.png', 
 category: 'Creature', color: 'Black', type: 'Dragon', archetype: 'Nightshroud', trait: 'Evolution', hp: 12, atk: 6, def: 2,
 cost: '{4}{B}{B}', ability: ['Flying','Dusk'], set: 'ScalesofRuin',
 skill: [
  {name: 'Discard', cost: '{B}',
   requirement: {class:'Discard'}, 
   effect: {class: 'Mill', type: 'Dragon'}},
  {name: 'Nightfall Surge', cost: '{B}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burst'}},
  {name: 'Void Evolution', cost: '{b}{b}',
   effect: {class: 'Void Evolution'}}
 ]},
{id: 'NoctyrosDuskWhisper', name: 'Noctyros, Dusk Whisper', rarity: 'Legendary', image: 'CardImages/Nightshroud/NoctyrosDuskWhisper.png', 
 category: 'Creature', color: 'Black', type: 'Dragon', archetype: 'Nightshroud', hp: 5, atk: 3, def: 1,
 cost: '{4}{B}{B}', ability: ['Flying','Night'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Discard', cost: '{B}',
   requirement: {class:'Discard'}, 
   effect: {class: 'Mill', type: 'Dragon'}},
  {name: 'Nightfall Surge', cost: '{B}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burst'}},
  {name: 'Void Evolution', cost: '{b}{b}',
   effect: {class: 'Void Evolution'}}
 ]},

{id: 'SolarythRadiantSolarwyrm', name: 'Solaryth, Radiant Solarwyrm', rarity: 'Legendary', image: 'CardImages/Solarwyrm/SolarythRadiantSolarwyrm.png', 
 category: 'Creature', color: 'White', type: 'Dragon', archetype: 'Solarwyrm', trait: 'Evolution', hp: 17, atk: 4, def: 2,
 cost: '{4}{W}{W}', ability: ['Flying','Aegis'], set: 'ScalesofRuin',
 skill: [
  {name: 'Seal', cost: '{W}{W}',
   requirement: {class: 'CCW'},
   resolution: {class: 'Seal'}},
  {name: 'Celestial Scales', cost: '{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CW'}],
   effect: {class: 'Inspire', ability: 'Aegis'}},
  {name: 'Evolution', cost: '{w}{w}{w}',
   effect: {class: 'Evolution'}}
 ]},
{id: 'SolarythGlintletDawnbloom', name: 'Solaryth, Glintlet Dawnbloom', rarity: 'Legendary', image: 'CardImages/Solarwyrm/SolarythGlintletDawnbloom.png', 
 category: 'Creature', color: 'White', type: 'Dragon', archetype: 'Solarwyrm', hp: 6, atk: 2, def: 1,
 cost: '{W}{W}', ability: ['Flying','Aegis'], set: 'WyrmheartAwakening',
 skill: [
  {name: 'Seal', cost: '{W}{W}',
   requirement: {class: 'CCW'},
   resolution: {class: 'Seal'}},
  {name: 'Dawnveil Benediction', cost: '{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CW'}],
   effect: {class: 'Daybreak Field'}},
  {name: 'Evolve', cost: '{w}',
   effect: {class: 'Evolve'}}
 ]},

// CHAMPIONS ADVANCED //

{id: 'FaelyraSatyrEmpress', name: 'Faelyra, Satyr Empress', rarity: 'Legendary', image: 'CardImages/Satyrs/FaelyraSatyrEmpress.png', imageFullArt: 'CardImages/Satyrs/FaelyraSatyrEmpressFA.png',
 category: 'Creature', color: 'Green', type: ['Faefolk', 'Mage'], archetype: 'Satyr', trait: 'Champion', hp: 11, atk: 1, def: 0,
 cost: '{G}{G}', ability: 'Ranged', set: 'SavageTerritory',
 skill: [
  {name: 'Mystveil',
   activation: {class: 'Arrival'},
   effect: {class: 'Mystveil'}},
  {name: 'Manifest', cost: '{g}'
   requirement: [{class: 'Special}, {class: 'CW'}],
   effect: {class: 'Token', tokenChoices: ['SatyrTokenGreen', 'SatyrTokenRed', 'SatyrTokenPurple'], amount: 1}},
  {name: 'Satyr Echo',
   activation: {class: 'Echo', type: 'Satyr'},
   effect: {class: 'Heal', amount: 3}},
  {name: 'Chorus of the Wild', cost: '{g}{g}',
   requirement: [{class: 'Ultimate'}, {class: 'CW'}],
   effect: {class: 'Heal', target: 'allPlayerField', amount: 2}}
 ]},

{id: 'LyssaraScarletVindicator', name: 'Lyssara, Scarlet Vindicator', rarity: 'Legendary', image: 'CardImages/Fireland/LyssaraScarletVindicator.png', 
 category: 'Creature', color: ['Black','Red'], type: 'Warrior', trait: 'Champion', hp: 7, atk: 3, def: 1,
 cost: '{r}{c}', archetype: '', ability: 'Rush', set: 'StandardPack',
 skill: [
  {name: 'Scarlet Reprisal', cost: '{r}',
   requirement: {class: 'Special', class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Scarlet Crescent', cost: '{R}{B}',
   requirement: {class: 'Special', class: 'CCW'},
   effect: {class: 'Exploit', amount: 1, target:3}}
 ]},
 
{id: 'KaelyraFirelandHeiress', name: 'Kaelyra, Fireland Heiress', rarity: 'Legendary', image: 'CardImages/Fireland/KaelyraFirelandHeiress.png', imageFullArt: 'CardImages/Fireland/KaelyraFirelandHeiressFA.png',
 category: 'Creature', color: ['Red','Black'], type: ['Mage', 'Demon'], archetype: 'Fireland', trait: 'Champion', hp: 8, atk: 2, def: 0,
 cost: '{R}{R}{B}', ability: ['Burn','Ranged'], set: 'Savage Territory',
 skill: [
  {name: 'Manifest', cost: '{r}',
   effect: {class: 'Token', name: 'Emberling'}},
  {name: 'Flametongue Invocation', cost: '{R}{B}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Invoke', archetype: 'Fireland'}}
 ]},

{id: 'VorgannaCrimsonBlade', name: 'Vorganna, Crimson Blade', rarity: 'Legendary', image: 'CardImages/Fireland/VorgannaCrimsonBlade.png', 
 category: 'Creature', color: ['Black','Red'], type: 'Warrior', trait: 'Champion', hp: 7, atk: 3, def: 1,
 cost: '{B}{R}', archetype: '', ability: ['Burn','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Pyrecleave', cost: '{r}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Scarlet Crescent', cost: '{R}{B}',
   requirement: {class: 'CCW'},
   effect: {class: 'Exploit', amount: 1, target:3}}
 ]},

{id: 'TydrosCoralboundTidebreaker', name: 'Tydros, Coralbound Tidebreaker', rarity: 'Legendary', image: 'CardImages/Coralbound/TydrosCoralboundTidebreaker.png', 
 category: 'Creature', color: ['Blue','Gray'], type: 'Warrior', archetype: 'Coralbound', trait: 'Champion', hp: 12, atk: 2, def: 0,
 cost: '{U}{U}{C}', ability: ['Dive','Ranged'], set: 'StandardPack',
 skill: [
  {name: 'XXX', cost: '{W}{W}',
   requirement: {class: 'CCW'},
   effect: {class: 'XXX'}},
  {name: 'Flametongue Invocation', cost: '{R}{B}',
   requirement: {class: 'CW'},
   effect: {class: 'Invoke', archetype: 'Fireland'}}
 ]},
 
{id: 'AstranyraThunderbane', name: 'Astranyra, Thunderbane', rarity: 'Legendary', image: 'CardImages/Demon/AstranyraThunderbane.png', 
 category: 'Creature', color: 'Black', type: 'Warrior', trait: 'Champion', hp: 8, atk: 1, def: 0,
 cost: '{y}{y}', archetype: '', ability: 'Ranged', set: 'StandardPack',
 skill: [
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
 
{id: 'VeniryssSpiderPrincess', name: 'Veniryss, Spider Princess', rarity: 'Legendary', image: 'CardImages/Silkbound/VeniryssSpiderPrincess.png', 
 category: 'Creature', color: ['Purple','Green'], type: 'Mage', archetype: 'Silkbound', trait: 'Champion', hp: 8, atk: 1, def: 0,
 cost: '{P}{G}', ability: 'Venom', set: 'StandardPack',
 skill: [
  {name: 'Manifest', cost: '{p}{g}',
   requirement: {class: 'CW'},
   effect: {class: 'Token', token: 'Spider', amount: 2}},
  {name: 'Silken Dominion', cost: '{P}{G}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}], 
   effect: {class: 'Bind', amount: 0, target: 4}}
 ]},

{id: 'RaukharKnightofDuskwings', name: 'Raukhar, Knight of Duskwings', rarity: 'Legendary', image: 'CardImages/Duskwing/RaukharKnightofDuskwings.png', 
 category: 'Creature', color: ['Black','Yellow'], type: 'Avian', archetype: 'Duskwing', trait: 'Champion', hp: 7, atk: 3, def: 1,
 cost: '{B}{Y}', ability: ['Flying','Scavenger'], set: 'FeatheredOmen',
 skill: [
  {name: 'Dash', cost: '{Y}',
   effect: {class: 'Dash'}},
  {name: 'Shadowfeather Storm', cost: '{B}{Y}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 2, target: 3}}
 ]},

{id: 'GarudaWingsofZephyra', name: 'Garuda, Wings of Zephyra', rarity: 'Legendary', image: 'CardImages/Zephyra/GarudaWingsofZephyra.png', 
 category: 'Creature', color: ['Yellow','White'], type: 'Avian', archetype: 'Zephyra', trait: 'Champion', hp: 9, atk: 2, def: 1,
 cost: '{Y}{W}', ability: ['Flying'], set: 'FeatheredOmen',
 skill: [
  {name:'Dash', cost: '{Y}',
   effect: {class: 'Dash'}},
  {name: 'Featherfall Tempest', cost: '{Y}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burst', amount: 1}}
 ]},
{id: 'NyzarielArchdemonDuchess', name: 'Nyzariel, Archdemon Duchess', rarity: 'Legendary', image: 'CardImages/Demon/NyzarielArchdemonDuchess.png', 
 category: 'Creature', color: 'Black', type: 'Warrior', trait: 'Champion', hp: 6, atk: 2, def: 0,
 cost: '{b}{b}', archetype: '', ability: 'Ranged', set: 'StandardPack',
 skill: [
  {name: '', cost: '{b}',
   requirement: {class: 'CCW'},
   effect: {class: 'Burn', amount: 3}},
  {name: 'Soulrend Sovereignty', cost: '{b}{B}',
   requirement: [{class: 'Ultimate'}, {class:'Sacrifice', amount: 1}, {class: 'CW'}],
   effect: {class: 'Destroy', target: 1 }}
 ]},
*/
 
{id: 'ForestFairy', name: 'Forest Fairy', rarity: 'Common', image: 'CardImages/BasicCreatures/Fairy.png', 
 category: 'Creature', color: 'Green', type: 'Faefolk', archetype: 'Fairy', hp: 1, atk: 1, def: 0,
 cost: '{0}', ability: 'Flying', set: 'ElementaGenesis'},
{id: 'ForestGoblin', name: 'Forest Goblin', rarity: 'Common', image: 'CardImages/BasicCreatures/Goblin.png', 
 category: 'Creature', color: 'Green', type: 'Brutefolk', archetype: 'Goblin', hp: 3, atk: 1, def: 0,
 cost: '{0}', set: 'ElementaGenesis'},
{id: 'Emberling', name: 'Emberling', rarity: 'Common', image: 'CardImages/BasicCreatures/Emberling.png', 
 category: 'Creature', color: 'Red', type: 'Beast', archetype: 'Fireland', hp: 3, atk: 2, def: 0,
 cost: '{0}', ability: 'Burn', set: 'ElementaGenesis',
 skill: [
  {name:'Discard', cost: '{r}',
   requirement: {class: 'Discard'},
   effect: {class: 'Strike', amount: 0, status: 'Burn'}},
 ]},
{id: 'Fire Pixie', name: 'Fire Pixie', rarity: 'Common', image: 'CardImages/BasicCreatures/FirePixie.png', 
 category: 'Creature', color: 'Red', type: 'Faefolk', archetype: 'Fairy', hp: 3, atk: 2, def: 0,
 cost: '{0}', ability: ['Burn','Flying'], set: 'ElementaGenesis'},
{id: 'Hellcharger', name: 'Hellcharger', rarity: 'Common', image: 'CardImages/BasicCreatures/Hellcharger.png', 
 category: 'Creature', color: 'Red', type: 'Warrior', archetype: 'Fireland', hp: 3, atk: 2, def: 0,
 cost: '{1}', ability: 'Burn', set: 'ElementaGenesis'},
{id: 'WaterElemental', name: 'Water Elemental', rarity: 'Common', image: 'CardImages/BasicCreatures/WaterElemental.png', 
 category: 'Creature', color: 'Blue', type: 'Elemental', archetype: 'Hydral', hp: 5, atk: 2, def: 0,
 cost: '{U}', ability: ['Dive','Elusive','Soak'], set: 'ElementaGenesis'},
{id: 'DesertWolf', name: 'Desert Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/DesertWolf.png', 
 category: 'Creature', color: 'Gray', type: 'Beast', archetype: 'Moonfang', hp: 3, atk: 2, def: 0,
 cost: '{1}', ability: 'Ambush', set: 'ElementaGenesis'},
{id: 'Golemites', name: 'Golemites', rarity: 'Common', image: 'CardImages/BasicCreatures/Golemites.png', 
 category: 'Creature', color: 'Gray', type: 'Elemental', archetype: 'Golemheart', hp: 3, armor: 1, atk: 2, def: 0,
 cost: '{0}', ability: 'Armor', set: 'ElementaGenesis',
 skill: [
  {name: 'Arrival', cost: '{c}',
   activation: {class: 'Arrival'},
   effect: {class: 'Token', name: 'Golemite'}},
  {name: 'Echo', 
   activation: {class: 'Echo'},
   effect: {class: 'Search', type: 'Golem'}},
 ]},
{id: 'Wolf', name: 'Wolf', rarity: 'Common', image: 'CardImages/BasicCreatures/Wolf.png', 
 category: 'Creature', color: 'Black', type: 'Beast', hp: 3, atk: 2, def: 0,
 cost: '{1}', archetype: 'Moonfang', ability: 'Ambush', set: 'ElementaGenesis',
 skill: [
  {name: 'Transform', cost: '{b}{b}',
   effect: {class: 'Transform', name: 'Werewolf'}},
 ]},
{id: 'Skeleton', name: 'Skeleton', rarity: 'Common', image: 'CardImages/BasicCreatures/Skeleton.png',
 category: 'Creature', color: 'Black', type: 'Undead', archetype: 'Skullframe', hp: 1, atk: 1, def: 0,
 cost: '{0}', ability: 'Immunity', set: 'ElementaGenesis',
 skill: [
  {name: 'Reanimate', cost: '{B}', 
   effect: {class: 'Reanimate'}}
 ]},
{id: 'Bat', name: 'Bat', rarity: 'Common', image: 'CardImages/BasicCreatures/Bat.png', 
 category: 'Creature', color: 'Black', type: ['Beast', 'Avian'], archetype: 'Vampiric', hp: 3, atk: 2, def: 0,
 cost: '{1}', ability: ['Drain','Flying'], set: 'ElementaGenesis'},
{id: 'Imp', name: 'Imp', rarity: 'Common', image: 'CardImages/BasicCreatures/Imp.png', 
 category: 'Creature', color: 'Black', type: 'Demon', archetype: '', hp: 1, atk: 2, def: 0,
 cost: '{1}', ability: ['Ambush','Flying'], set: 'ElementaGenesis'},
{id: 'Vampire', name: 'Vampire', rarity: 'Rare', image: 'CardImages/BasicCreatures/Vampire.png', 
 category: 'Creature', color: 'Black', type: 'Undead', archetype: 'Vampiric', hp: 3, atk: 2, def: 0,
 cost: '{1}{B}', ability: ['Drain','Flying'], set: 'ElementaGenesis'},
 
/*


{id: 'ForestWarrior', name: 'Forest Warrior', rarity: 'Rare', image: 'CardImages/BasicCreatures/ForestWarrior.png', 
 category: 'Creature', color: 'Green', type: ['Construct','Warrior'], archetype: 'Arbor', hp: 6, atk: 3, def: 1, cost: '{1}{G}', 
 ability: ['Drain','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Dash', cost: '{G}',
   effect: {class: 'Dash'}}
 ]},
{id: 'ForestMage', name: 'Forest Mage', rarity: 'Rare', image: 'CardImages/Arbor/ForestMage.png', 
 category: 'Creature', color: 'Green', type: ['Elemental','Mage'], archetype: 'Arbor', hp: 5, atk: 2, def: 0, cost: '{1}{G}', 
 ability: 'Ranged', set: 'StandardPack'
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Search', category: 'Spell'}},
  {name: 'Bloomchant',
   requirement: {class: 'CW'}
   effect: {class: 'Essence', color: '{G}', amount: 1}}
 ]},
{id: 'WoodlandCentaur', name: 'Woodland Centaur', rarity: 'Rare', image: 'CardImages/Hybrid/WoodlandCentaur.png', 
 category: 'Creature', color: 'Green', type: 'Beast', archetype: 'Hybrid', hp: 8, atk: 3, def: 1, cost: '{1}{G}', 
 ability: ['Intimidate','Leap','Rush'], set: 'SavageTerritory'},

{id: 'DragonEgg', name: 'Dragon Egg', rarity: 'Common', image: 'CardImages/BasicCreatures/DragonEgg.png', 
 category: 'Creature', color: 'Red', type: 'Dragon', hp: 1, atk: 0, def: 0, cost: '{0}', 
 archetype: '', ability: ['Fire Armor'], skill: 'Awaken', set: 'WyrmheartAwakening'},

{id: 'WaterWyrm', name: 'Water Wyrm', rarity: 'Legendary', image: 'CardImages/Abyssdrake/WaterWyrm.png', 
 category: 'Creature', color: 'Blue', type: ['Dragon','Elemental'], archetype: ['Abyssdrake', 'Hydral'], hp: 6, atk: 2, def: 0,
 cost: '{1}{U}', ability: ['Dive','Elusive','Soak'], set: 'WyrmheartAwakening'},

{id: 'ZephyraHarpy', name: 'Zephyra Harpy', rarity: 'Rare', image: 'CardImages/Zephyra/ZephyraHarpy.png', 
 category: 'Creature', color: 'Yellow', type: 'Avian', archetype: 'Zephyra', hp: 7, atk: 3, def: 1,
 cost: '{1}{Y}{Y}', ability: 'Flying', set: 'FeatheredOmen',
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'}
   effect: {class: 'Token', name: 'Treant'}},
 ]},
{id: 'AnvilguardDwarf', name: 'Anvilguard Dwarf', rarity: 'Common', image: 'CardImages/Drakzul/AnvilguardDwarf.png', 
 category: 'Creature', color: 'Gray', type: 'Warrior', archetype: 'Dwarf', hp: 8, atk: 3, def: 2,
 cost: '{1}{c}', ability: 'Ambush', set: 'ElementaGenesis'},
{id: 'DrakzulBrute', name: 'Drakzul Brute', rarity: 'Common', image: 'CardImages/Drakzul/DrakzulBrute.png', 
 category: 'Creature', color: 'Gray', type: 'Warrior', archetype: 'Dwarf', hp: 8, atk: 3, def: 2,
 cost: '{1}{c}', ability: 'Ambush', set: 'ElementaGenesis'},
{id: 'SatyrRitualist', name: 'Satyr Ritualist', rarity: 'Rare', image: 'CardImages/Satyr/SatyrRitualist.png', 
 category: 'Creature', color: 'Purple', type: 'Faefolk', hp: 4, atk: 2, def: 0, cost: '{P}', 
 archetype: 'Satyr', ability: ['Ranged','Spellboost'], skill: 'Arrival', set: 'StandardPack',
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'}
   effect: {class: 'Search', color: 'Purple'}},
 ]},
{id: 'TreantWitch', name: 'Treant Witch', rarity: 'Epic', image: 'CardImages/Arbor/TreantWitch.png', 
 category: 'Creature', color: ['Green','Black'], type: ['Elemental','Mage'], hp: 8, atk: 3, def: 1, cost: '{1}{G}{B}', 
 archetype: 'Arbor', ability: 'Ranged', set: 'StandardPack',
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
{id: 'AngelicWarrior', name: 'Angelic Warrior', rarity: 'Common', image: 'CardImages/Seraph/AngelicWarrior.png', 
 category: 'Creature', color: 'White', type: 'Warrior', hp: 6, atk: 3, def: 1,
 cost: '{1}{W}', archetype: 'Seraph', ability: 'Flying', set: 'StandardPack'},
{id: 'Valkyrie', name: 'Valkyrie', rarity: 'Common', image: 'CardImages/BasicCreatures/Valkyrie.png', 
 category: 'Creature', color: 'White', type: 'Warrior', hp: 5, atk: 3, def: 1,
 cost: '{2}', archetype: '', ability: '', set: 'StandardPack'},
{id: 'HeraldofLight', name: 'Herald of Light', rarity: 'Rare', image: 'CardImages/BasicCreatures/HeraldofLight.png', 
 category: 'Creature', color: 'White', type: 'Construct', hp: 8, atk: 2, def: 1,
 cost: '{1}{W}', archetype: 'Seraph', ability: ['Flying','Aegis'], set: 'StandardPack',
  skill: [
  {name: 'XXX', 
   requirement: {class: 'CW'},
   effect: {class: 'Essence', color: 'White'}}
 ]},
{id: 'SacredKirin', name: 'Sacred Kirin', rarity: 'Epic', image: 'CardImages/Hybrid/SacredKirin.png', 
 category: 'Creature', color: 'White', type: 'Beast', hp: 13, atk: 4, def: 1, cost: '{3}{W}', 
 archetype: 'Hybrid', ability: ['Intimidate','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Heavenstep Radiance', cost: '{W}',
   requirement: {class: 'CCW'},
   effect: {class: 'Strike', amount: 3}}
 ]},
{id: 'LightPossessedArmor', name: 'Light Possessed Armor', rarity: 'Rare', image: 'CardImages/BasicCreatures/LightPossessedArmor.png', 
 category: 'Creature', color: 'White', type: 'Construct', hp: 4, atk: 3, def: 1, cost: '{1}{W}', 
 archetype: '', ability: ['Armor','Rush'], skill: '', set: 'StandardPack'},

// OTHER MULTICOLORED //

{id: 'DragonsApprentice', name: "Dragon's Apprentice", rarity: 'Rare', image: 'CardImages/Dragon/DragonsApprentice.png', 
 category: 'Creature', color: 'Red', type: 'Dragon', trait: 'Evolution', hp: 4, atk: 2, def: 0,
 cost: '{2}', archetype: '', ability: ['Burn','Flying','Ranged'], set: 'ScalesofRuin',
 skill: [
  {name: 'Evolve', cost: '{2}', 
   effect: {class: 'Evolve'}}
 ]},

{id: 'Jackalope', name: 'Jackalope', rarity: 'Rare', image: 'CardImages/Hybrid/Jackalope.png', 
 category: 'Creature', color: ['Green','Black'], type: 'Beast', hp: 5, atk: 2, def: 0,
 cost: '{G}{B}', archetype: 'Hybrid', ability: ['Burn','Flying','Ranged'], set: 'StandardPack',
 skill: [
  {name: 'Echo', cost: '{0}',
   requirement: {class: 'Echo', archetype: 'Hybrid'}
   effect: {class: 'Search', archetype: 'Hybrid'}}
 ]},

{id: 'DarkHarpy', name: 'Dark Harpy', rarity: 'Rare', image: 'CardImages/Zephyra/DarkHarpy.png', 
 category: 'Creature', color: ['Yellow','Black'], type: 'Avian', hp: 6, atk: 4, def: 1,
 cost: '{2}{Y}{B}', archetype: 'Harpy', ability: ['Flying','Quickdraw'], set: 'StandardPack',
 skill: [
  {name: 'Dash', cost: '{Y}{B}',
   effect: {class: 'Dash'}}
 ]},

*/

// PIXIEBOUND //
 
/*

{id: 'FairyWarrior', name: 'Fairy Warrior', rarity: 'Rare', image: 'CardImages/Fairy/FairyWarrior.png', 
 category: 'Creature', color: 'Green', type: ['Faefolk','Warrior'], hp: 5, atk: 3, def: 1, cost: '{1}{G}', 
 archetype: 'Fairy', ability: ['Flying','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Dash', cost: '{G}',
  effect: {class: 'Dash'}}
 ]},



*/
 
// CINDERCORE //
{id: 'CindercoreSentry', name: 'Cindercore Sentry', rarity: 'Common', image: 'CardImages/Cindercore/CindercoreSentry.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 2, armor: 3, atk: 2, def: 1,
 cost: '{1}{R}', archetype: 'Cindercore', ability: ['Armor','Fire Exploit'], set: 'StandardPack',
 skill: [
  {name: 'Scorch Protocol', cost: '{1}{R}', 
   requirement: {class: 'Special'},
   effect: [{class: 'Search', archetype: 'Cindercore'}, {class: 'Strike', amount: 0, status: 'Burn'}]},
  {name: 'Fuse', cost: '{R}{R}', 
   effect: {class: 'Fuse'}}
 ]},
{id: 'CindercoreProtector', name: 'Cindercore Protector', rarity: 'Rare', image: 'CardImages/Cindercore/CindercoreProtector.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3,
 cost: '{3}{R}', archetype: 'Cindercore', ability: ['Armor','Exploit','Protect'], set: 'StandardPack',
 skill: [
  {name: 'Volcanic Vortex', cost: '{1}{R}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 3, status: ['Burn','Bind']}},
  {name: 'Fuse', cost: '{R}', 
   effect: {class: 'Fuse'}}
 ]},
{id: 'CindercoreVanguard', name: 'Cindercore Vanguard', rarity: 'Common', image: 'CardImages/Cindercore/CindercoreVanguard.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 15, atk: 6, def: 3,
 cost: '{1}{R}', archetype: 'Cindercore', ability: ['Armor', 'Exploit', 'Rush'], set: 'StandardPack',
skill: [
  {name: 'Fire Pulse', cost: '{R}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}], 
   effect: {class: 'Burst', amount: 1, status: 'Burn'}},
 {name: 'Fuse', cost: '{R}', 
   effect: {class: 'Fuse'}}
 ]},
{id: 'CindercoreGolem', name: 'Cindercore Golem', rarity: 'Rare', image: 'CardImages/Cindercore/CindercoreGolem.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 15, atk: 6, def: 3,
 cost: '{3}{R}', archetype: ['Cindercore','Golemheart'], ability: 'Armor', set: 'StandardPack',
 skill: [
  {name: 'Volcanic Vortex', cost: '{1}{R}',
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 3, status: ['Burn','Bind']}}
 ]},
{id: 'IgnavarynCindercoreAutomaton', name: 'Ignavaryn, Cindercore Automaton', rarity: 'Legendary', image: 'CardImages/Cindercore/Ignavaryn, Cindercore Automaton.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 5, armor: 10, atk: 6, def: 3,
 cost: '{5}{R}{R}', archetype: 'Cindercore', ability: ['Armor','Exploit','Protect'], set: 'StandardPack',
 skill: [
  {name: 'Stash', cost: '{R}', 
   requirement: {class: 'Stash'},
   effect: {class: 'Strike', amount: 2, status: 'Burn'}},
  {name: 'Thermal Overdrive', cost: '{r}{r}{R}', 
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burst', amount: 3, status: 'Burn'}},
  {name: 'Recycle', cost: '{R}', 
   effect: {class: 'Recycle'},
   resolution: {class: 'Strike', amount: 2, status: 'Burn'}},
  {name: 'Fusion', cost: '{r}{r}{r}', 
   effect: {class: 'Fusion'}}
 ]},

// Fireland //
{id: 'FirelandScamperling', name: 'Fireland Scamperling', rarity: 'Common', image: 'CardImages/Fireland/FirelandScamperling.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1,
 cost: '{2}', archetype: 'Fireland', ability: ['Burn','Rush'], set: 'StandardPack'},
{id: 'FirelandCindercub', name: 'Fireland Cindercub', rarity: 'Common', image: 'CardImages/Fireland/FirelandCindercub.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1,
 cost: '{1}', archetype: 'Fireland', ability: ['Burn','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Evolve', cost: '{r}{r}', 
   effect: {class: 'Evolve'}}
 ]},
{id: 'FirelandLynx', name: 'Fireland Lynx', rarity: 'Common', image: 'CardImages/Fireland/FirelandLynx.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 3, atk: 2, def: 1,
 cost: '{3}{R}', archetype: 'Fireland', ability: ['Burn','Leap','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Evolve', cost: '{r}', 
   effect: {class: 'Evolve'}}
 ]},
{id: 'FirelandKitsune', name: 'Fireland Kitsune', rarity: 'Common', image: 'CardImages/Fireland/FirelandKitsune.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 4, atk: 3, def: 0,
 cost: '{1}{R}', archetype: 'Fireland', ability: ['Burn','Leap','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Beast Arrival', cost: '{r}{r}',
   activation: {class: 'Arrival', type: 'Beast'},
   effect: {class: 'Search', archetype: 'Fireland'}}
 ]},
{id: 'FirelandDirebeast', name: 'Fireland Direbeast', rarity: 'Rare', image: 'CardImages/Fireland/FirelandDirebeast.png', 
 category: 'Creature', color: 'Red', type: 'Beast', hp: 9, atk: 5, def: 2,
 cost: '{4}{R}', archetype: 'Fireland', ability: ['Burn','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Evolution', cost: '{r}{r}', 
   effect: {class: 'Evolution'}}
 ]},
{id: 'FirelandHellhound', name: 'Fireland Hellhound', rarity: 'Rare', image: 'CardImages/Fireland/FirelandHellhound.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], hp: 7, atk: 5, def: 1,
 cost: '{2}{R}', archetype: 'Fireland', ability: ['Burn','Intimidate','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Evolve', cost: '{r}', 
   effect: {class: 'Evolve'}}
 ]},
{id: 'FirelandHellmaw', name: 'Fireland Hellmaw', rarity: 'Epic', image: 'CardImages/Fireland/Fireland Hellmaw.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Dragon','Demon'], hp: 8, atk: 6, def: 1,
 cost: '{2}{R}{B}', archetype: 'Fireland', ability: ['Burn','Flying','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Evolve', cost: '{r}', 
   effect: {class: 'Evolve'}}
 ]},
{id: 'EphorosFirelandBehemoth', name: 'Ephoros, Fireland Behemoth', rarity: 'Legendary', image: 'CardImages/Fireland/EphorosFirelandBehemoth.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], hp: 13, atk: 9, def: 3,
 cost: '{5}{R}{B}', archetype: 'Fireland', ability: [{effect: "Inspire", archetype: "Rush", atk: 1, def: 1}, 'Burn','Crush','Intimidate'], set: 'StandardPack',
 skill: [
  {name: 'Discard', cost: '{r}', 
   requirement: {class: 'Discard'},
   effect: {class: 'Strike', amount: 3, status: 'Burn'}},
  {name: 'Void Evolution', cost: '{r}{r}', 
   effect: {class: 'VoidEvolution'}}
 ]},
{id: 'EphorosFirelandBehemothFA', name: 'Ephoros, Fireland Behemoth', rarity: 'Legendary', image: 'CardImages/Fireland/Ephoros, Fireland Behemoth FA.png', 
 category: 'Creature', color: ['Red','Black'], type: ['Beast','Demon'], hp: 13, atk: 9, def: 3,
 cost: '{5}{R}{B}', archetype: 'Fireland', ability: [{effect: "Inspire", archetype: "Rush", atk: 1, def: 1},'Burn','Crush','Intimidate'], set: 'StandardPack'},

// GOLEMHEART //
{id: 'PyrokragGolemheartTitan', name: 'Pyrokrag, Golemheart Titan', rarity: 'Legendary', image: 'CardImages/Golems/Pyrokrag, Golemheart Titan.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 9, armor: 5, atk: 8, def: 3,
 cost: '{5}{R}{C}', archetype: 'Golemheart', ability: 'Scorch', trait: 'Fusion', set: 'Primordial Ascension',
 skill: [
  {name: 'Stash', cost: '{r}',
   requirement: {class: 'Stash'},
   effect: {class: 'Strike', amount: 1, status: 'Burn'}},
  {name: 'Mill', 
   requirement: {class: 'Mill', type: 'Golem'},
   effect: {class: 'Armor', amount: 4}},
  {name: 'Moltern Aegis Nova', cost: '{r}{r}{c}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burst', amount: 3, status: 'Burn'}},
  {name: 'Void Fusion', cost: '{r}{c}', 
   effect: {class: 'Void Fusion'}}
 ]},
{id: 'GolemheartGiant', name: 'Golemheart Giant', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Giant.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 6, armor: 4, atk: 5, def: 2,
 cost: '{2}{R}{C}', archetype: 'Golemheart', ability: ['Burn', 'Scorch'], set: 'PrimordialAscension',
 skill: [
  {name: 'Echo',
   activation: {class: 'Echo'},
   effect: {class: 'Inpire', armor: 2}},
 ]},
{id: 'SmolderingGolem', name: 'Smoldering Golemheart', rarity: 'Rare', image: 'CardImages/Golems/Smoldering Golemheart .png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 7, armor: 4, atk: 5, def: 2,
 cost: '{6}{R}{C}', archetype: 'Golemheart', ability: 'Burn', set: 'PrimordialAscension',
 skill: [
  {name: 'Golem Echo', 
   activation: {class: 'Echo', type: 'Golem'},
   effect: {class: 'Armor', armor: 3}},
  {name: 'Emberplate Detonation', cost: '{r}',
   requirement: {class: 'Ultimate'},
   effect: {class: 'Burst', status: 'Burn', amount: 2}},
  {name: 'Fuse', cost: '{r}',
   effect: {class: 'Fuse'}},  
 ]},
{id: 'GolemheartSentinel', name: 'Golemheart Sentinel', rarity: 'Rare', image: 'CardImages/Golems/Golemheart Sentinel.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: 'Elemental', hp: 7, armor: 3, atk: 3, def: 2,
 cost: '{1}{R}{C}', archetype: 'Golemheart', ability: 'Protect', set: 'PrimordialAscension'},
{id: 'FireGolem', name: 'Fire Golem', rarity: 'Common', image: 'CardImages/Golems/Fire Golem.png', 
 category: 'Creature', color: ['Red', 'Gray'], type: ['Elemental','Golem'], hp: 3, armor: 1, atk: 2, def: 1,
 cost: '{R}{C}', archetype: 'Golemheart', ability: ['Burn', 'Scorch'], set: 'PrimordialAscension',
 skill: [
  {name: 'Discard', cost: '{c}', 
   requirement: {class: 'Discard'},
   effect: {class: 'Search', type: 'Golem'}},
  {name: 'Echo', cost: '{r}',
   activation: {class: 'Echo'},
   effect: {class: 'Strike', status: 'Burn', amount: 3}},
  {name: 'Fuse', cost: '{r}', 
   effect: {class: 'Fuse'}},  
 ]},
{id: 'KaelgorranElementalPrimordial', name: 'Kaelgorran, Elemental Primordial', rarity: 'Legendary', image: 'CardImages/Golems/KaelgorranElementalPrimordial.png', imageFullArt: 'CardImages/Golems/KaelgorranElementalPrimordialFA.png',
 category: 'Creature', color: ['Green','Red', 'Gray'], type: ['Elemental','Golem'], hp: 20, armor: 8, atk: 6, def: 4, cost: '{4}{R}{C}',
 archetype: 'Golemheart', ability: 'Burn', trait: 'Fusion', set: 'Primordial Ascension',
 skill: [
  {name: 'Discard', cost: '{c}', 
   requirement: {class: 'Discard'},
   effect: {class: 'Search', type: 'Golem'}},
  {name: 'Echo', 
   activation: {class: 'Echo'},
   effect: {class: 'Token', tokenChoices: ['ElementalTokenGray', 'ElementalTokenGreen', 'ElementalTokenRed'], amount: 2}},
  {name: 'Fusion', cost: '{g}{r}{c}', 
   effect: {class: 'Fusion'}},  
 ]},
{id: 'AcidicGolem', name: 'Acidic Golem', rarity: 'Rare', image: 'CardImages/Golems/AcidicGolem.png', 
 category: 'Creature', color: ['Purple', 'Gray'], type: ['Elemental','Golem'], hp: 8, armor: 4, atk: 4, def: 3,
 cost: '{2}{P}{C}', archetype: 'Golemheart', ability: 'toxic', set: 'PrimordialAscension'},
 
// CORALBOUND //
 {id: 'CoralDrone', name: 'Coral Drone', rarity: 'Common', image: 'CardImages/Coralbound/CoralDrone.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 1, armor: 1, atk: 1, def: 1,
 cost: '{U}', archetype: 'Coralbound', ability: ['Water Exploit', 'Armor'], set: 'IronbornProtocol',
 skill: [
  {name: 'Recycle', cost: '{U}', 
   requirement: {class: 'Recycle'},
   effect: {class: 'Soak', amount: 0, target: 1}},
  {name: 'Fuse', cost: '{u}{u}', 
   effect: {class: 'Fuse'}},
 ]},
{id: 'CoralboundSentry', name: 'Coralbound Sentry', rarity: 'Common', image: 'CardImages/Coralbound/CoralboundSentry.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 4, armor: 1, atk: 2, def: 1,
 cost: '{U}', archetype: 'Coralbound', ability: ['Water Exploit', 'Armor'], set: 'IronbornProtocol',
 skill: [
  {name: 'Hydrosurge Protocol', cost: '{U}', 
   requirement: {class: 'Special'},
   effect: [{class: 'Search', archetype: 'Coralbound'}, {class: 'Soak', amount: 1, target: 1}]},
  {name: 'Fuse', cost: '{u}{u}', 
   effect: {class: 'Fuse'}},
 ]},
{id: 'CoralboundProtector', name: 'Coralbound Protector', rarity: 'Rare', image: 'CardImages/Coralbound/CoralboundProtector.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 7, armor: 3, atk: 3, def: 2,
 cost: '{3}{U}', archetype: 'Coralbound', ability: ['Protect','Lifelink'], set: 'IronbornProtocol',
 skill: [
  {name: 'Echo', cost: '{U}', 
   effect: {class: 'Token', name: 'Coral Drone'}},
  {name: 'Fuse', cost: '{u}', 
   effect: {class: 'Fuse'}},
 ]},
{id: 'CoralboundVanguard', name: 'Coralbound Vanguard', rarity: 'Rare', image: 'CardImages/Coralbound/CoralboundVanguard.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 4, armor: 2, atk: 3, def: 1,
 cost: '{1}{U}', archetype: 'Coralbound', ability: 'Rush', set: 'IronbornProtocol',
 skill: [
  {name: 'Arrival',
   activation: {class: 'Arrival'},
   effect: {class: 'Token', name: 'Coral Drone'}},
  {name: 'Fuse', cost: '{u}', 
   effect: {class: 'Fuse'}},
 ]},
{id: 'MaelvyrnCoralboundAutomaton', name: 'Maelvyrn, Coralbound Automaton', rarity: 'Legendary', image: 'CardImages/Coralbound/MaelvyrnCoralboundAutomaton.png', imageFullArt: 'CardImages/Coralbound/MaelvyrnCoralboundAutomatonFA.png',
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 14, atk: 7, armor: 5, def: 4, cost: '{6}{U}{U}', archetype: 'Coralbound',
 ability: ['Protect', 'Water Exploit'], trait: 'Fusion', set: 'IronbornProtocol',
 skill: [
  {name: 'Stash', cost: '{U}', 
    requirement: {class: 'Stash'},
    effect: {class: 'Search', archetype: 'Coralbound'}},
  {name: 'Echo',
   activation: {class: 'Echo'},
   effect: {class: 'Token', name: 'Coral Drone', amount: 2}},  
  {name: 'Hydroburst Cannon', cost: '{U}{U}', 
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 8, status: 'Soak'}},
  {name: 'Fusion', cost: '{u}{u}{U}{U}', 
   effect: {class: 'Fusion'}}
 ]},

// GLIMMERSCALE //
{id: 'WyrmofThornsandSunfire', name: 'Wyrm of Thorns and Sunfire', rarity: 'Rare', image: 'CardImages/Glimmerscale/Wyrm of Thorns and Sunfire.png', 
 category: 'Creature', color: ['Green', 'Red', 'White'], type: 'Dragon', hp: 10, atk: 3, def: 1,
 cost: '{G}{R}{W}', archetype: ['Fairy', 'Glimmerscale'], ability: ['Flying','Intimidate'], set: 'StandardPack',
 skill: [
  {name: 'Thornbloom', cost: '{g}{w}', 
    requirement: [{class: 'Special'}, {class: 'CW'}],
    effect: {class: 'Essence'}},
  {name: 'Sunfire Blast', cost: '{r}{g}{w}', 
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burst', amount: 2, status: 'Burn'}},
  {name: 'Evolve', cost: '{g}{w}', 
   effect: {class: 'Evolve'}}
 ]},
/*
{id: 'FairyDragon', name: 'Fairy Dragon', rarity: 'Rare', image: 'CardImages/Glimmerscale/FairyDragon.png', 
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

{id: 'FairyAmphitere', name: 'Fairy Amphitere', rarity: 'Rare', image: 'CardImages/Glimmerscale/FairyAmphitere.png', 
 category: 'Creature', color: ['Green', 'Red', 'White'], type: 'Dragon', hp: 14, atk: 5, def: 2, cost: '{G}{R}{W}',
 ability: ['Flying','Intimidate'], archetype: ['Fairy', 'Glimmerscale'], set: 'MischiefUnbound',
 skill: [
  {name: 'Purify', cost: '{W}',
   requirement: [{class: 'Special'}, {class: 'CW'}],
   effect: {class: 'Purify'}},
  {name: 'Dewlight Spiral', cost: '{G}{W}',
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: [{class: 'Sunlight'}, {class: 'Strike', amount: 3}]}
 ]},
// Goblins //

{id: 'GoblinWarlod', name: 'Goblin Warlod', rarity: 'Legendary', image: 'CardImages/Goblin/GoblinWarlod.png', 
 category: 'Creature', color: ['Green', 'Purple', 'Black'], type: ['Brutefolk', 'Mage'], hp: 13, atk: 4, def: 1,
 cost: '{g}{p}{b}', archetype: 'Goblin', ability: 'Ranged', set: 'MischiefUnbound'
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
  
// MOONFANG //

{id: 'SinisterWolf', name: 'Sinister Wolf', rarity: 'Epic', image: 'CardImages/Moonfang/SinisterWolf.png', 
 category: 'Creature', color: ['Black'], type: 'Beast', hp: 5, atk: 3, def: 0,
 cost: '{1}{B}', archetype: 'Moonfang', ability: ['Ambush','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Transform', cost: '{P}{P}{B}', 
   effect: {class: 'Transform'}}
 ]},
{id: 'Werewolf', name: 'Werewolf', rarity: 'Epic', image: 'CardImages/Moonfang/Werewolf.png', 
 category: 'Creature', color: ['Black'], type: 'Beast', hp: 10, atk: 4, def: 1,
 cost: '{3}{B}', archetype: 'Moonfang', ability: ['Ambush'], set: 'StandardPack',
 skill: [
  {name: 'Discard', cost: '{B}',
  requirement: {class: 'Discard'},
  effect: {class: 'Search', archetype: 'Moon'}},
 ]},


*/
 
// SKULLFRAME //
{id: 'SkullframeDefector', name: 'Skullframe Defector', rarity: 'Common', image: 'CardImages/Skullframe/SkullframeDefector.png', 
 category: 'Creature', color: 'Black', type: ['Undead','Warrior'], hp: 3, atk: 2, def: 1,
 cost: '{1}', archetype: 'Skullframe', ability: 'Immunity', set: 'StandardPack',
 skill: [
  {name: 'Reanimate', cost: '{2}{B}', 
   effect: {class: 'Reanimate'}}
 ]},
{id: 'SkullframeUnyielding', name: 'Skullframe Unyielding', rarity: 'Common', image: 'CardImages/Skullframe/SkullframeUnyielding.png', 
 category: 'Creature', color: 'Black', type: 'Undead', hp: 4, atk: 1, def: 0,
 cost: '{1}{B}', archetype: 'Skullframe', ability: ['Immunity','Rush'], set: 'StandardPack',
 skill: [
  {name: 'Reanimate', cost: '{2}{B}{B}', 
   effect: {class: 'Reanimate'}}
 ]},
{id: 'SkullframeAcolyte', name: 'Skullframe Acolyte', rarity: 'Common', image: 'CardImages/Skullframe/SkullframeAcolyte.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: 'Undead', hp: 5, atk: 3, def: 1,
 cost: '{1}{P}{B}', archetype: 'Skullframe', ability: ['Immunity','Ranged'], set: 'StandardPack',
 skill: [
  {name: 'Revive', cost: '{2}{B}', 
   requirement: {class: 'CW'},
   effect: {class: 'Revive', archetype: 'Skullframe'}},
  {name: 'Reanimate', cost: '{2}{B}{B}', 
   effect: {class: 'Reanimate'}}
 ]},
{id: 'SkullframeCryptwinds', name: 'Skullframe Cryptwinds', rarity: 'Rare', image: 'CardImages/Skullframe/SkullframeCryptwinds.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], hp: 8, atk: 4, def: 1,
 cost: '{1}{B}{B}', archetype: 'Skullframe', ability: ['Flying', 'Immunity'], set: 'StandardPack',
 skill: [
  {name: 'Discard', cost: '{B}', 
   requirement: {class: 'Discard'},
   effect: {class: 'Search', amount: 1, type: ['Dragon','Undead']}},
  {name: 'Reanimate', cost: '{b}{B}{B}',
   requirement: {class: 'Sacrifice', amount: 1},
   effect: {class: 'Reanimate'}}
  ]},
{id: 'SkullframeSpectralDragon', name: 'Skullframe Spectral Dragon', rarity: 'Epic', image: 'CardImages/Skullframe/SkullframeSpectralDragon.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], hp: 12, atk: 6, def: 2, cost: '{3}{P}{B}',
 archetype: 'Skullframe', ability: ['Flying', 'Immunity'], set: 'StandardPack',
 skill: [
  {name: 'Curseflame Inferno', cost: '{2}{P}{P}{B}', 
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Burst', amount: 2, status: 'Burn'}},
  {name: 'Reanimate', cost: '{2}{B}{B}', 
   requirement: {class: 'Sacrifice', amount: 1},
   effect: {class: 'Reanimate'}}
 ]},
{id: 'SkullframeArmoredDragon', name: 'Skullframe Armored Dragon', rarity: 'Rare', image: 'CardImages/Skullframe/SkullframeArmoredDragon.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Dragon','Undead'], hp: 5, armor: 4, atk: 5, def: 2,
 cost: '{2}{P}{B}', archetype: 'Skullframe', ability: ['Flying','Immunity','Armor'], set: 'StandardPack',
 skill: [
  {name: 'Reanimate', cost: '{3}{B}{B}',
   requirement: {class: 'Sacrifice'}, amount: 1,
   effect: {class: 'Reanimate'}}
 ]},
{id: 'SkullframeHexmistress', name: 'Skullframe Hexmistress', rarity: 'Epic', image: 'CardImages/Skullframe/SkullframeHexmistress.png', 
 category: 'Creature', color: ['Black', 'Purple'], type: ['Undead','Mage'], hp: 6, atk: 3, def: 1,
 cost: '{1}{B}{P}', archetype: 'Skullframe', ability: ['Immunity','Ranged'], set: 'StandardPack',
 skill: [
  {name: 'Bonecall', cost: '{b}',
   requirement: [{class: 'Special'}, {class: 'CW'}],
   effect: {class: 'Token', token: 'Skeleton', amount: 1}},
  {name: 'Ebonhex Flare', cost: '{P}{B}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}], 
   effect: {class: 'Strike', amount: 3, status:'Burn'}},
  {name: 'Reanimate', cost: '{1}{B}{B}{p}', 
   effect: {class:'Reanimate'}}
 ]},
{id: 'MaldryssSkullframeArchmage', name: 'Maldryss, Skullframe Archmage', rarity: 'Legendary', image: 'CardImages/Skullframe/MaldryssSkullframeArchmage.png', imageFullArt: 'CardImages/Skullframe/MaldryssSkullframeArchmageFA.png',
 category: 'Creature', color: ['Black', 'Purple'], type: ['Undead','Mage'], trait: 'Champion', hp: 8, atk: 1, def: 0,
 cost: '{B}{B}{P}', archetype: 'Skullframe', ability: ['Drain','Immunity','Ranged'], set: 'StandardPack',
 skill: [
  {name: 'Hexbind', cost: '{P}{B}', 
   requirement: [{class: 'Special'}, {class: 'CCW'}],
   effect: {class: 'Strike', amount: 4, status: ['Bind','Poison']}},
  {name: 'Ebonhex Crush', cost: '{B}',  
   requirement: [{class: 'Ultimate'}, {class: 'CCW'}],
   effect: {class: 'Exploit'}},
  {name: 'Reanimate', cost: '{2}{B}{B}', 
   effect: {class: 'Reanimate'}}
 ]},
{id: 'Soulhexing', name: 'Soulhexing', rarity: 'Common', image: 'CardImages/Skullframe/Soulhexing.png', 
 category: 'Spell', color: 'Black', type: 'Spell', cost: '{2}{B}', archetype: 'Skullframe', effect: 'Destroy a creature afflicted by any status', set: 'StandardPack'},
{id: 'Witherwake', name: 'Witherwake', rarity: 'Common', image: 'CardImages/Skullframe/Witherwake.png', 
 category: 'Spell', color: ['Black','Purple'], type: 'Spell', cost: '{P}{B}', archetype: 'Skullframe', effect: 'Burst Poison', set: 'StandardPack'},

// SERAPH
/*
{id: 'SeraphielSolmaraPrincess', name: 'Seraphiel, Solmara Princess', rarity: 'Legendary', image: 'CardImages/Seraph/SeraphielSolmaraPrincess.png', 
 category: 'Creature', color: 'White', type: 'Angel', trait: 'Champion', hp: 10, atk: 2, def: 0,
 cost: '{W}{W}{W}', archetype: 'Seraph', ability: 'Flying', set: 'StandardPack'},

*/
 
// Frostland //
{id: 'FrostlandDragon', name: 'Frostland Dragon', rarity: 'Rare', image: 'CardImages/Frostland/FrostlandDragon.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Dragon', hp: 9, atk: 5, def: 2,
 cost: '{3}{U}{C}', archetype: 'Frostland', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandWyrm', name: 'Frostland Wyrm', rarity: 'Rare', image: 'CardImages/Frostland/FrostlandWyrm.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Dragon', hp: 9, atk: 5, def: 2,
 cost: '{1}{U}{C}', archetype: 'Frostland', ability: ['Ice Armor','Flying'], set: 'StandardPack'},
{id: 'FrostlandGolem', name: 'Frostland Golem', rarity: 'Rare', image: 'CardImages/Frostland/FrostlandGolem.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Elemental', hp: 9, atk: 5, def: 2,
 cost: '{1}{U}{C}', archetype: 'Frostland', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'FrostlandPhoenix', name: 'Frostland Phoenix', rarity: 'Rare', image: 'CardImages/Frostland/FrostlandPhoenix.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Avian', hp: 9, atk: 5, def: 1,
 cost: '{U}{C}', archetype: 'Frostland', ability: ['Ice Armor','Flying'], set: 'StandardPack',
 skill: [
  {name: 'Echo', 
   activation: {class: 'Echo'}, 
   effect: {class: 'Token', token: 'Phoenix Ashes'}},
 ]},
{id: 'FrostlandRuneforgedAutomaton', name: 'Frostland Runeforged Automaton', rarity: 'Rare', image: 'CardImages/Frostland/FrostlandRuneforgedAutomaton.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Construct', hp: 9, atk: 5, def: 2,
 cost: '{2}{U}{C}', archetype: 'Frostland', ability: 'Ice Armor', set: 'StandardPack'},
{id: 'FrostlandRuneforgedColossus', name: 'Frostland Runeforged Colossus', rarity: 'Epic', image: 'CardImages/Frostland/FrostlandRuneforgedColossus.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Construct', hp: 9, atk: 5, def: 2,
 cost: '{4}{U}{C}', archetype: 'Frostland', ability: ['Ice Armor','Crush'], set: 'StandardPack'},
{id: 'EirawenFrostlandQueenFA', name: 'Eirawen, Frostland Queen', rarity: 'Legendary', image: 'CardImages/Frostland/EirawenFrostlandQueen.png', 
 category: 'Creature', color: ['Blue', 'Gray'], type: 'Mage', trait: 'Champion', hp: 11, atk: 1, def: 0,
 cost: '{U}{U}{C}', archetype: 'Frostland', ability: ['Ice Armor','Flying'], set: 'StandardPack'},

// ARTIFACTS //
{id: 'GolemheartInfusor', name: 'Golemheart Infusor', rarity: 'Common', image: 'CardImages/Artifacts/GolemheartInfusor.png', 
 category: 'Artifact', color: 'Gray', type: 'Relic', hp: 5, cost: '{C}', archetype: 'Golemheart', ability: '', set: 'ElementalGenesis'},
{id: 'HeartwoodEmeralds', name: 'Heartwood Emeralds', rarity: 'Common', image: 'CardImages/Artifacts/HeartwoodEmeralds.png', 
 category: 'Artifact', color: 'Green', type: 'Relic', hp: 5, cost: '{1}{G}', archetype: 'Heartwood', ability: '', set: 'ElementalGenesis'},
{id: 'CindercoreEmber', name: 'Cindercore Ember', rarity: 'Common', image: 'CardImages/Artifacts/CindercoreEmber.png', 
 category: 'Artifact', color: 'Red', type: 'Relic', hp: 5, cost: '{2}{R}', archetype: 'Cindercore', ability: '', set: 'ElementalGenesis'},
{id: 'TidecallersPearl', name: 'Tidecallers Pearl', rarity: 'Common', image: 'CardImages/Artifacts/TidecallersPearl.png', 
 category: 'Artifact', color: 'Blue', type: 'Relic', hp: 5, cost: '{2}{U}', archetype: 'Coralbound', ability: '', set: 'ElementalGenesis'},
{id: 'StormcoreDynamo', name: 'Stormcore Dynamo', rarity: 'Common', image: 'CardImages/Artifacts/StormcoreDynamo.png', 
 category: 'Artifact', color: 'Yellow', type: 'Relic', hp: 5, cost: '{2}{Y}', archetype: 'Stormcore', ability: '', set: 'ElementalGenesis'},
{id: 'PlagueThornTalisman', name: 'Plague Thorn Talisman', rarity: 'Common', image: 'CardImages/Artifacts/PlagueThornTalisman.png', 
 category: 'Artifact', color: 'Purple', type: 'Relic', hp: 5, cost: '{2}{P}', archetype: 'Plaguecore', ability: '', set: 'ElementalGenesis'},
{id: 'TitansAnvil', name: 'Titans Anvil', rarity: 'Common', image: 'CardImages/Artifacts/TitansAnvil.png', 
 category: 'Artifact', color: 'Gray', type: 'Relic', hp: 5, cost: '{1}{C}', archetype: '', ability: '', set: 'ElementalGenesis'},
{id: 'VeiloftheForgotten', name: 'Veil of the Forgotten', rarity: 'Common', image: 'CardImages/Artifacts/VeiloftheForgotten.png', 
 category: 'Artifact', color: 'Black', type: 'Relic', hp: 5, cost: '{2}{B}', archetype: '', ability: '', set: 'ElementalGenesis'},
{id: 'LumenSpire', name: 'Lumen Spire', rarity: 'Common', image: 'CardImages/Artifacts/Lumen Spire.png', 
 category: 'Artifact', color: 'White', type: 'Relic', hp: 5, cost: '{2}{W}', archetype: '', ability: '', set: 'ElementalGenesis'},

// SPELLS //
{id: 'EssenceSurge', name: 'Essence Surge', rarity: 'Common', image: 'CardImages/Spells/EssenceSurge.png', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: '{2}', set: 'ElementalGenesis',
 skill: [
  {name: 'Essence', cost: '{2}', 
   effect: {class: 'Essence', color: 'Green', amount: 3}},
 ]},
{id: 'EssenceAssault', name: 'Essence Assault', rarity: 'Common', image: 'CardImages/Spells/EssenceAssault.png', 
 category: 'Spell', color: 'Red', type: 'Spell', cost: '{1}', effect: 'Give a unit +2/0', set: 'ElementalGenesis'},
{id: 'EssenceRift', name: 'Essence Rift', rarity: 'Common', image: 'CardImages/Spells/EssenceRift.png', 
 category: 'Spell', color: 'Blue', type: 'Spell', cost: '{2}', set: 'StandardPack',
 skill: [
  {name: 'Draw', cost: '{2}', 
   effect: {class: 'Draw', amount: 2}},
 ]},
{id: 'EssenceBolt', name: 'Essence Bolt', rarity: 'Common', image: 'CardImages/Spells/EssenceBolt.png', 
 category: 'Spell', color: 'Yellow', type: 'Spell', cost: '{1}', set: 'ElementalGenesis',
 skill: [
  {name: 'Spell', cost: '{1}', 
   effect: {class: 'Strike', amount: 3}},
 ]},
{id: 'EssenceBreak', name: 'Essence Break', rarity: 'Common', image: 'CardImages/Spells/EssenceBreak.png', 
 category: 'Spell', color: 'Purple', type: 'Spell', cost: '{1}', effect: 'Destroy 1 essence', set: 'ElementalGenesis'},
{id: 'EssenceBarrier', name: 'Essence Barrier', rarity: 'Common', image: 'CardImages/Spells/EssenceBarrier.png', 
 category: 'Spell', color: 'Gray', type: 'Aura', cost: '{1}', effect: 'Aegis', set: 'ElementalGenesis'},
{id: 'EssencePurge', name: 'Essence Purge', rarity: 'Common', image: 'CardImages/Spells/EssencePurge.png', 
 category: 'Spell', color: 'Black', type: 'Aura', cost: '{2}', effect: 'Cannot generate essence', set: 'ElementalGenesis'},
{id: 'EssenceBlessing', name: 'Essence Blessing', rarity: 'Common', image: 'CardImages/Spells/EssenceBlessing.png', 
 category: 'Spell', color: 'White', type: 'Spell', cost: '{1}', effect: 'Cleanse 5', set: 'ElementalGenesis'},
{id: 'LifeGrowth', name: 'Life Growth', rarity: 'Common', image: 'CardImages/Spells/LifeGrowth.png', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: '{G}', effect: 'Gain {G}{G}', set: 'ElementalGenesis'},
{id: 'HydrosurgeProtocol', name: 'Hydrosurge Protocol', rarity: 'Common', image: 'CardImages/Coralbound/HydrosurgeProtocol.png', 
 category: 'Spell', color: 'Blue', type: 'Construct',
 cost: '{1}{U}', archetype: 'Coralbound', set: 'IronbornProtocol',
 skill: [
  {name: 'Soak', effect: {class: 'Soak', amount: 1, target: 3}},
  {name: 'Recycle', cost: '{u}', effect: {class: 'Soak', amount: 0, target: 2}},
 ]},
/*
{id: 'HardenedScales', name: 'Hardened Scales', rarity: 'Common', image: 'CardImages/Spells/HardenedScales.png', 
 category: 'Spell', color: ['Green','Red'], type: 'Aura', cost: '{1}', effect: 'Gain {G}{G}', set: 'ElementalGenesis'},
{id: 'VerdantRebirth', name: 'Verdant Rebirth', rarity: 'Common', image: 'CardImages/Spells/VerdantRebirth.png', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: '{2}{G}', effect: 'Gain {G}{G}', set: 'ElementalGenesis'},

Dragon Terrains
{id: 'DragonsGrove', name: 'Dragon's Grove', rarity: 'Epic', image: 'CardImages/Thornwing/DragonsGrove.png', 
 category: 'Domain', color: 'Green', type: ['Terrain', 'Dragon'], archetype: 'Thornwing', hp: 13, cost: '{g}{g}', essence: '{g}{g}', set: 'WyrmheartAwakening',
 skill: [
  {name: 'Draconic Pulse', cost: '{g}{g}',
   effect: {class: 'Heal', amount: 2, target: 2}},
  {name: 'Dragon Summon', 
   activation: {'Summon', archetype: 'Dragon'},
   effect: {class: 'Burn', amount: 1}},
 ]},
{id: 'DragonsSpire', name: 'Dragon's Spire', rarity: 'Epic', image: 'CardImages/Blazingscale/DragonsSpire.png', 
 category: 'Domain', color: 'Red', type: ['Terrain', 'Dragon'], archetype: 'Blazingscale', hp: 8, cost: '{r}{r}', essence: '{r}{R}', set: 'WyrmheartAwakening',
 skill: [
  {name: 'Dragon Summon', 
   activation: {'Draw', archetype: 'Dragon'},
   effect: {class: 'Burn', amount: 1}},
  {name: 'Draconic Blaze', cost: '{r}{r}',
   effect: {class: 'Burn', amount: 2, target: 2}},
 ]},
{id: 'DragonsAtoll', name: 'Dragon's Atoll', rarity: 'Epic', image: 'CardImages/Domains/DragonsAtoll.png', 
 category: 'Domain', color: 'Blue', type: ['Terrain', 'Dragon'], archetype: 'Abyssdrake', hp: 14, cost: '{u}{u}', essence: '{u}{u}', set: 'WyrmheartAwakening',
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
{id: 'DragonsSkyreach', name: 'Dragon's Skyreach', rarity: 'Epic', image: 'CardImages/Voltrazor/DragonsSkyreach.png', 
 category: 'Domain', color: 'Yellow', type: ['Terrain', 'Dragon'], archetype: 'Stormrazor', hp: 5, cost: '{y}{y}', essence: '{Y}', set: 'StandardPack2',
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

{id: 'DragonsBastion', name: 'Dragon's Bastion', rarity: 'Epic', image: 'CardImages/Ironclaw/DragonsBastion.png', 
 category: 'Domain', color: 'Gray', type: ['Terrain', 'Dragon'], archetype: 'Ironclaw', hp: 5, cost: '{c}{c}', essence: '{C}', set: 'WyrmheartAwakening',
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
{id: 'DragonsHollow', name: 'Dragon's Hollow', rarity: 'Epic', image: 'CardImages/Venomspine/DragonsHollow.png', 
 category: 'Domain', color: 'Purple', type: ['Terrain', 'Dragon'], archetype: 'Cursedspine', hp: 5, cost: '{0}', essence: '{P}', set: 'WyrmheartAwakening',
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
{id: 'DragonsHaven', name: 'Dragon's Haven', rarity: 'Epic', image: 'CardImages/Solarwyrm/DragonsHaven.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'WyrmheartAwakening',
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
 
{id: 'DragonsMoonhold', name: 'Dragon's Moonhold', rarity: 'Epic', image: 'CardImages/NIghtshroud/DragonsMoonhold.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'WyrmheartAwakening',
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

 
 Green Domains

 {id: 'GoblinVillage', name: 'Goblin Village', rarity: 'Common', image: 'CardImages/Goblin/GoblinVillage.png', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'StandardPack2'},
 {id: 'Thornreach', name: 'Thornreach', rarity: 'Common', image: 'CardImages/Domains/Thornreach.png', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'StandardPack2'},
 {id: 'FairyFountain', name: 'Fairy Fountain', rarity: 'Common', image: 'CardImages/Fairy/FairyFountain.png', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'StandardPack2'},

 {id: 'ElvesVillage', name: 'Elves Village', rarity: 'Common', image: 'CardImages/Elves/ElvesVillage.png', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'StandardPack2'},
 {id: 'SylvanCanopy', name: 'Sylvan Canopy', rarity: 'Common', image: 'CardImages/Domains/Sylvan Canopy.png', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'StandardPack2'},

 Red Domains

 {id: 'OrcVillage', name: 'Orc Village', rarity: 'Common', image: 'CardImages/Orc/OrcVillage.png', 
  category: 'Domain', color: 'Red', type: 'Terrain', hp: 5, cost: '{0}', essence: '{R}', set: 'StandardPack2'},
 {id: 'CindercoreForgehold', name: 'Cindercore Forgehold', rarity: 'Common', image: 'CardImages/Cindercore/CindercoreForgehold.png', 
  category: 'Domain', color: 'Red', type: 'Terrain', hp: 5, cost: '{0}', essence: '{R}', set: 'StandardPack2'},

 {id: 'MoltenExpanse', name: 'Molten Expanse', rarity: 'Common', image: 'CardImages/Domains/MoltenExpanse.png', 
  category: 'Domain', color: 'Red', type: 'Terrain', hp: 5, cost: '{0}', essence: '{R}', set: 'StandardPack2'},
 {id: 'Smokeblight Frontier', name: 'Smokeblight Frontier', rarity: 'Common', image: 'CardImages/Domains/SmokeblightFrontier.png', 
  category: 'Domain', color: 'Red', type: 'Terrain', hp: 5, cost: '{0}', essence: '{R}', set: 'StandardPack2'},

 Blue Domains

{id: 'Pearlhaven', name: 'Pearlhaven', rarity: 'Common', image: 'CardImages/Domains/Pearlhaven.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
{id: 'MermaidsSanctuary', name: 'Mermaid's Sanctuary', rarity: 'Common', image: 'CardImages/Merfolk/MermaidsSanctuary.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},

{id: 'TheAbyssalCrown', name: 'The Abyssal Crown', rarity: 'Common', image: 'CardImages/Abyss/TheAbyssalCrown.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
{id: 'LagoonoftheVerdantTide', name: 'Lagoon of the Verdant Tide', rarity: 'Common', image: 'CardImages/Domains/LagoonoftheVerdant Tide.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
{id: 'CoralboundReef', name: 'Coralbound Reef', rarity: 'Common', image: 'CardImages/Coralbound/CoralboundReef.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
{id: 'GlasswaveReefs', name: 'Glasswave Reefs', rarity: 'Common', image: 'CardImages/Domains/GlasswaveReefs.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
{id: 'GlacierRift', name: 'Glacier Rift', rarity: 'Common', image: 'CardImages/Domains/GlacierRift.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},
{id: 'FrostlandCitadel', name: 'Frostland Citadel', rarity: 'Common', image: 'CardImages/Frostland/FrostlandCitadel.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'StandardPack2'},

Yellow Domains

{id: 'TempestCradle', name: 'Tempest Cradle', rarity: 'Common', image: 'CardImages/Domains/TempestCradle.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},
{id: 'ElementalsPlateau', name: 'Elemental's Plateau', rarity: 'Common', image: 'CardImages/Domains/ElementalsPlateau.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},
{id: 'ZephyrasStormpeaks', name: 'Zephyra's Stormpeaks', rarity: 'Common', image: 'CardImages/Zephyra/ZephyrasStormpeaks.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},

{id: 'CloudveilSanctum', name: 'Cloudveil Sanctum', rarity: 'Common', image: 'CardImages/Domains/CloudveilSanctum.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},
{id: 'The CitadelofArclight', name: 'The Citadel of Arclight', rarity: 'Common', image: 'CardImages/Domains/TheCitadelofArclight.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},
{id: 'BoltspireIsles', name: 'Boltspire Isles', rarity: 'Common', image: 'CardImages/Domains/BoltspireIsles.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},
{id: 'SkybreakerRings', name: 'Skybreaker Rings', rarity: 'Common', image: 'CardImages/Domains/SkybreakerRings.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},
{id: 'SkywardArchipelago', name: 'Skyward Archipelago', rarity: 'Common', image: 'CardImages/Domains/SkywardArchipelago.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'StandardPack2'},

 Purple Domains

 {id: 'OrcVillage', name: 'Orc Village', rarity: 'Common', image: 'CardImages/Orc/OrcVillage.png', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},
 {id: 'TheMireworks', name: 'The Mireworks', rarity: 'Common', image: 'CardImages/Domains/TheMireworks.png', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},

 {id: 'GoblinCamp', name: 'Goblin Camp', rarity: 'Common', image: 'CardImages/Goblin/GoblinCamps.png', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},
 {id: 'BlackrotTunnels', name: 'Blackrot Tunnels', rarity: 'Common', image: 'CardImages/Domains/BlackrotTunnels.png', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},
 {id: 'Festerglow Fen', name: 'Festerglow Fen', rarity: 'Common', image: 'CardImages/Domains/FesterglowFen.png', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},
 {id: 'SwampLake', name: 'Swamp Lake', rarity: 'Common', image: 'CardImages/Domains/SwampLake.png', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},
 {id: 'MiregateBasin', name: 'Miregate Basin', rarity: 'Common', image: 'CardImages/Domains/MiregateBasin.png', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},

Gray Domains

{id: 'IrondeepBastion', name: 'Irondeep Bastion', rarity: 'Common', image: 'CardImages/Domains/IrondeepBastion.png', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'StandardPack2'},
{id: 'GoblinOutpost', name: 'Goblin Outpost', rarity: 'Common', image: 'CardImages/Goblin/GoblinOutpost.png', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'StandardPack2'},
{id: 'OrcVillage', name: 'Orc Village', rarity: 'Common', image: 'CardImages/Orc/OrcVillage.png', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'StandardPack2'},
{id: 'DwarfenStronghold', name: 'Dwarfen Stronghold', rarity: 'Common', image: 'CardImages/Domains/DwarfenStronghold.png', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'StandardPack2'},

{id: 'TheEmberjawRange', name: 'The Emberjaw Range', rarity: 'Common', image: 'CardImages/Domains/TheEmberjawRange.png', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'StandardPack2'},
{id: 'AnvilgatePlateau', name: 'Anvilgate Plateau', rarity: 'Common', image: 'CardImages/Domains/AnvilgatePlateau.png', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'StandardPack2'},
{id: 'StonewoundBarrens', name: 'Stonewound Barrens', rarity: 'Common', image: 'CardImages/Domains/StonewoundBarrens.png', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'StandardPack2'},

 Black Domains

 {id: 'Fellchasm', name: 'Fellchasm', rarity: 'Common', image: 'CardImages/Domains/Fellchasm.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 {id: 'VampiricCitadel', name: 'Vampiric Citadel', rarity: 'Common', image: 'CardImages/Domains/VampiricCitadel.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},

 {id: 'UmbrawindHollow', name: 'Umbrawind Hollow', rarity: 'Common', image: 'CardImages/Domains/UmbrawindHollow.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 {id: 'ShadeglassCrag', name: 'Shadeglass Crag', rarity: 'Common', image: 'CardImages/Domains/ShadeglassCrag.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 {id: 'GraveveilFields', name: 'Graveveil Fields', rarity: 'Common', image: 'CardImages/Domains/GraveveilFields.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 {id: 'DarkSea', name: 'Dark Sea', rarity: 'Common', image: 'CardImages/Domains/DarkSea.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 {id: 'Boneyard', name: 'Boneyard', rarity: 'Common', image: 'CardImages/Skullframe/Boneyard.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},
 {id: 'TheShadelornSanctum', name: 'The Shadelorn Sanctum', rarity: 'Common', image: 'CardImages/Domains/TheShadelornSanctum.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'StandardPack2'},

White Domains

{id: 'ZephyrasPlateau', name: 'Zephyra's Plateau', rarity: 'Common', image: 'CardImages/Zephyra/ZephyrasPlateau.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'StandardPack2'},
{id: 'AngelsReach', name: 'Angel's Reach', rarity: 'Common', image: 'CardImages/Seraph/AngelsReach.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'StandardPack2'},

{id: 'HalosCrown', name: 'Halo's Crown', rarity: 'Common', image: 'CardImages/Domains/HalosCrown.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'StandardPack2'},
{id: 'SunspireSanctum', name: 'Sunspire Sanctum', rarity: 'Common', image: 'CardImages/Domains/SunspireSanctum.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'StandardPack2'},
{id: 'DawnbreakRidge', name: 'Dawnbreak Ridge', rarity: 'Common', image: 'CardImages/Domains/DawnbreakRidge.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'StandardPack2'},
{id: 'LumenlowFields', name: 'Lumenlow Fields', rarity: 'Common', image: 'CardImages/Domains/LumenlowFields.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'StandardPack2'},
{id: 'RadianteEnclave', name: 'Radiante Enclave', rarity: 'Common', image: 'CardImages/Domains/RadianteEnclave.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'StandardPack2'},

 
 */
// DOMAINS //
{id: 'Forest', name: 'Forest', rarity: 'Common', image: 'CardImages/Domains/Green Basic Location.png', 
 category: 'Domain', color: 'Green', type: 'Terrain', hp: 5, cost: '{0}', essence: '{G}', set: 'ElementaGenesis'},
{id: 'Volcano', name: 'Volcano', rarity: 'Common', image: 'CardImages/Domains/Red Basic Location.png', 
 category: 'Domain', color: 'Red', type: 'Terrain', hp: 5, cost: '{0}', essence: '{R}', set: 'ElementaGenesis'},
{id: 'Ocean', name: 'Ocean', rarity: 'Common', image: 'CardImages/Domains/Blue Basic Location.png', 
 category: 'Domain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{U}', set: 'ElementaGenesis'},
{id: 'Mountain', name: 'Mountain', rarity: 'Common', image: 'CardImages/Domains/Gray Basic Location.png', 
 category: 'Domain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{C}', set: 'ElementaGenesis'},
{id: 'Swamp', name: 'Swamp', rarity: 'Common', image: 'CardImages/Domains/Purple Basic Location.png', 
 category: 'Domain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'ElementaGenesis'},
{id: 'Peaks', name: 'Peaks', rarity: 'Common', image: 'CardImages/Domains/Yellow Basic Location.png', 
 category: 'Domain', color: 'Yellow', type: 'Terrain', hp: 5, cost: '{0}', essence: '{Y}', set: 'ElementaGenesis'},
{id: 'Plains', name: 'Plains', rarity: 'Common', image: 'CardImages/Domains/White Basic Location.png', 
 category: 'Domain', color: 'White', type: 'Terrain', hp: 5, cost: '{0}', essence: '{W}', set: 'ElementaGenesis'},
{id: 'ShadowForest', name: 'Shadow Forest', rarity: 'Common', image: 'CardImages/Domains/Black Basic Location.png', 
 category: 'Domain', color: 'Black', type: 'Terrain', hp: 5, cost: '{0}', essence: '{B}', set: 'ElementaGenesis'},
{id: 'Verdara', name: 'Verdara', rarity: 'Legendary', image: 'CardImages/Domains/Green Domain.png', 
 category: 'Domain', color: 'Green', type: 'Dominion', hp: 20, cost: '{0}', essence: '{G}', trait: 'Dominion', set: 'ElementaGenesis'},
{id: 'Ashkar', name: 'Ashkar', rarity: 'Legendary', image: 'CardImages/Domains/Red Domain.png', 
 category: 'Domain', color: 'Red', type: 'Dominion', hp: 20, cost: '{0}', essence: '{R}', trait: 'Dominion', set: 'ElementaGenesis'},
{id: 'Marinthae', name: 'Marinthae', rarity: 'Legendary', image: 'CardImages/Domains/Blue Domain.png', 
 category: 'Domain', color: 'Blue', type: 'Dominion', hp: 20, cost: '{0}', essence: '{U}', trait: 'Dominion', set: 'ElementaGenesis'},
{id: 'Aetherion', name: 'Aetherion', rarity: 'Legendary', image: 'CardImages/Domains/Yellow Domain.png', 
 category: 'Domain', color: 'Yellow', type: 'Dominion', hp: 20, cost: '{0}', essence: '{Y}', trait: 'Dominion', set: 'ElementaGenesis'},
{id: 'Virkul', name: 'Virkul', rarity: 'Legendary', image: 'CardImages/Domains/Purple Domain.png', 
 category: 'Domain', color: 'Purple', type: 'Dominion', hp: 20, cost: '{0}', essence: '{P}', trait: 'Dominion', set: 'ElementaGenesis'},
{id: 'Drakzul', name: 'Drakzul', rarity: 'Legendary', image: 'CardImages/Domains/Gray Domain.png', 
 category: 'Domain', color: 'Gray', type: 'Dominion', hp: 20, cost: '{0}', essence: '{C}', trait: 'Dominion', set: 'ElementaGenesis'},
{id: 'Solmara', name: 'Solmara', rarity: 'Legendary', image: 'CardImages/Domains/White Domain.png', 
 category: 'Domain', color: 'White', type: 'Dominion', hp: 20, cost: '{0}', essence: '{W}', trait: 'Dominion', set: 'ElementaGenesis'},
{id: 'Nocthyra', name: 'Nocthyra', rarity: 'Legendary', image: 'CardImages/Domains/Black Domain.png', 
 category: 'Domain', color: 'Black', type: 'Dominion', hp: 20, cost: '{0}', essence: '{B}', trait: 'Dominion', set: 'ElementaGenesis'},

 
// ---- TOKENS ---- //
/*
// --- Goblin Tokens --- //
{id: 'GoblinTokenGreen', name: 'Forest Goblin', rarity: 'Common', image: 'CardImages/Tokens/GoblinTokenGreen.png', 
 category: 'Creature', color: 'Green', type: 'Goblin', hp: 3, atk: 1, def: 0},
{id: 'GoblinTokenRed', name: 'Smoke Goblin', rarity: 'Common', image: 'CardImages/Tokens/GoblinTokenRed.png', 
 category: 'Creature', color: 'Red', type: 'Goblin', hp: 3, atk: 1, def: 0},
{id: 'GoblinTokenPurple', name: 'Mire Goblin', rarity: 'Common', image: 'CardImages/Tokens/GoblinTokenPurple.png', 
 category: 'Creature', color: 'Purple', type: 'Goblin', hp: 3, atk: 1, def: 0},
{id: 'GoblinTokenGray', name: 'Craft Goblin', rarity: 'Common', image: 'CardImages/Tokens/GoblinTokenGray.png', 
 category: 'Creature', color: 'Gray', type: 'Goblin', hp: 3, atk: 1, def: 0},
{id: 'GoblinTokenBlack', name: 'Evil Goblin', rarity: 'Common', image: 'CardImages/Tokens/GoblinTokenBlack.png', 
 category: 'Creature', color: 'Black', type: 'Goblin', hp: 3, atk: 1, def: 0},
// --- Fairy Tokens --- //
{id: 'FairyTokenGreen', name: 'Forest Fairy', rarity: 'Common', image: 'CardImages/Tokens/FairyTokenGreen.png', 
 category: 'Creature', color: 'Green', type: 'Fairy', hp: 1, atk: 1, def: 0, archetype: 'Fairy', ability: 'Flying'},
// --- Satyr Tokens --- //
{id: 'SatyrTokenGreen', name: 'Sylvan Satyr', rarity: 'Common', image: 'CardImages/Tokens/SatyrTokenGreen.png', 
 category: 'Creature', color: 'Green', type: 'Satyr', hp: 4, atk: 1, def: 1, ability: 'Protect'},
{id: 'SatyrTokenRed', name: 'Inferno Satyr', rarity: 'Common', image: 'CardImages/Tokens/SatyrTokenRed.png', 
 category: 'Creature', color: 'Red', type: 'Satyr', hp: 2, atk: 1, def: 0, ability: 'Rush'},
{id: 'SatyrTokenPurple', name: 'Corrupted Satyr', rarity: 'Common', image: 'CardImages/Tokens/SatyrTokenPurple.png', 
 category: 'Creature', color: 'Purple', type: 'Satyr', hp: 2, atk: 1, def: 0, ability: ['Ranged','Venom']},
// --- Construct Tokens --- //
{id: 'CinderScoutToken', name: 'Cinder Scout', rarity: 'Common', image: 'CardImages/Tokens/CinderScoutToken.png', 
 category: 'Creature', color: 'Red', type: 'Construct', hp: 2, atk: 1, def: 0, ability: 'Rush'},
{id: 'CoralDroneToken', name: 'Coral Drone', rarity: 'Common', image: 'CardImages/Tokens/CoralDroneToken.png', 
 category: 'Creature', color: 'Blue', type: 'Construct', hp: 1, atk: 1, def: 1, ability: 'Protect'},
// --- Other Tokens --- // 
{id: 'TreantToken', name: 'Treant', rarity: 'Rare', image: 'CardImages/Tokens/TreantToken.png', 
 category: 'Creature', color: ['Green', 'Black'], type: 'Arbor', hp: 5, atk: 2, def: 1},
{id: 'PhoenixAshes', name: 'Phoenix Ashes', rarity: 'Rare', image: 'CardImages/Tokens/PhoenixAshes.png', 
 category: 'Creature', color: ['Red', 'Yellow'], type: 'Avian', archetype: 'Phoenix', hp: 1, atk: 0, def: 0},
{id: 'DragonEgg', name: 'Dragon Egg', rarity: 'Rare', image: 'CardImages/Tokens/DragonEgg.png', 
 category: 'Creature', color: 'Red', type: 'Dragon', hp: 1, atk: 0, def: 0},
{id: 'BirdfolkTokenYellow', name: 'Forest Fairy', rarity: 'Common', image: 'CardImages/Tokens/BirdfolkTokenYellow.png', 
 category: 'Creature', color: 'Yellow', type: 'Avian', hp: 3, atk: 1, def: 0, archetype: 'Zephyra', ability: 'Flying'},
{id: 'SkeletonToken', name: 'Skeleton', rarity: 'Common', image: 'CardImages/Tokens/SkeletonToken.png', 
 category: 'Creature', color: 'Black', type: 'Undead', hp: 1, atk: 1, def: 0, ability: 'Immunity'},
{id: 'WolfToken', name: 'Wolf', rarity: 'Common', image: 'CardImages/Tokens/WolfToken.png', 
 category: 'Creature', color: 'Black', type: 'Beast', hp: 2, atk: 1, def: 0, ability: 'Ambush'},
{id: 'BatToken', name: 'Bat', rarity: 'Common', image: 'CardImages/Tokens/BatToken.png', 
 category: 'Creature', color: 'Black', type: 'Beast', hp: 3, atk: 2, def: 0, archetype: 'Vampiric', ability: ['Drain','Flying']},
{id: 'ImpToken', name: 'Imp', rarity: 'Common', image: 'CardImages/Tokens/ImpToken.png', 
 category: 'Creature', color: 'Black', type: 'Demon', hp: 1, atk: 2, def: 0, archetype: '', ability: ['Ambush','Flying']},
 
// --- Elemental Tokens --- //
{id: 'ElementalTokenGreen', name: 'Elemental of Leaves', rarity: 'Common', image: 'CardImages/Tokens/ElementalTokenGreen.png', 
 category: 'Creature', color: 'Green', type: 'Elemental', hp: 3, atk: 1, def: 0, skill: [
 {name: 'Fuse', cost: '{g}{g}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenRed', name: 'Elemental of Embers', rarity: 'Common', image: 'CardImages/Tokens/ElementalTokenRed.png', 
 category: 'Creature', color: 'Red', type: 'Elemental', hp: 2, atk: 2, def: 0, skill: [
 {name: 'Fuse', cost: '{r}{r}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenBlue', name: 'Elemental of Droplets', rarity: 'Common', image: 'CardImages/Tokens/ElementalTokenBlue.png', 
 category: 'Creature', color: 'Blue', type: 'Elemental', hp: 3, atk: 1, def: 0, skill: [
 {name: 'Fuse', cost: '{u}{u}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenYellow', name: 'Elemental of Sparks', rarity: 'Common', image: 'CardImages/Tokens/ElementalTokenYellow.png', 
 category: 'Creature', color: 'Yellow', type: 'Elemental', hp: 3, atk: 1, def: 0, skill: [
 {name: 'Fuse', cost: '{y}{y}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenPurple', name: 'Elemental of Toxins', rarity: 'Common', image: 'CardImages/Tokens/ElementalTokenPurple.png', 
 category: 'Creature', color: 'Purple', type: 'Elemental', hp: 3, atk: 1, def: 0, skill: [
 {name: 'Fuse', cost: '{p}{p}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenGray', name: 'Elemental of Pebbles', rarity: 'Common', image: 'CardImages/Tokens/ElementalTokenGray.png', 
 category: 'Creature', color: 'Gray', type: 'Elemental', hp: 2, armor: 2, atk: 1, def: 1, skill: [
 {name: 'Fuse', cost: '{c}{c}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenBlack', name: 'Elemental of Shades', rarity: 'Common', image: 'CardImages/Tokens/ElementalTokenBlack.png', 
 category: 'Creature', color: 'Black', type: 'Elemental', hp: 3, atk: 1, def: 0, skill: [
 {name: 'Fuse', cost: '{b}{b}', effect: {class: 'Fuse'}}]},
{id: 'ElementalTokenWhite', name: 'Elemental of Gleams', rarity: 'Common', image: 'CardImages/Tokens/ElementalTokenWhite.png', 
 category: 'Creature', color: 'White', type: 'Elemental', hp: 4, atk: 1, def: 0, skill: [
 {name: 'Fuse', cost: '{w}{w}', effect: {class: 'Fuse'}}]},
 
*/
];
// Cost mapping and renderer (returns HTML string)
const COST_IMAGE_MAP = {
  G: "OtherImages/Essence/Green.png",
  R: "OtherImages/Essence/Red.png",
  U: "OtherImages/Essence/Blue.png",
  Y: "OtherImages/Essence/Yellow.png",
  C: "OtherImages/Essence/Gray.png",
  P: "OtherImages/Essence/Purple.png",
  B: "OtherImages/Essence/Black.png",
  W: "OtherImages/Essence/White.png",
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

const FILTERS_CONFIG = [
  { key: 'ownership', label: 'Ownership', options: ['All','Owned','Undiscovered','Locked'], hideIn: ['builder'] },
  { key: 'color', label: 'Color', options: ['All','Green','Red','Blue','Gray','Purple','Yellow','Black','White'] },
  { key: 'category', label: 'Category', options: ['All','Creature','Artifact','Spell','Domain'] },
  { key: 'type', label: 'Type', options: ['All','Elemental','Dragon','Construct','Beast','Demon','Mage','Equipment','Relic','Fairy','Goblin','Undead','Warrior'] },
  { key: 'rarity', label: 'Rarity', options: ['All','Common','Rare','Epic','Legendary'] },
  { key: 'trait', label: 'Trait', options: ['All','Champion','Dominion','Evolution','Fusion'] },
  { key: 'archetype', label: 'Archetype', options: ['All','Blazefeather','Cindercore','Coralbound','Fireland','Frostland','Golemheart','Moonfang','Skullframe','Voltwing','Zephyra'] },
  { key: 'ability', label: 'Ability', options: ['All','Ambush','Dive','Burn','Drain','Elusive','Flying','Ice Armor','Immunity','Intimidate','Leap','Lifelink','Protect','Provoke','Ranged','Rush','Toxic'] },
  { key: 'pack', label: 'Pack', options: ['All', 'Standard Pack', 'Standard Pack 2'] }
 // Add more as needed
];

const filterState = {
  gallery: {},
  builder: {}
  // Each key: filterKey -> array of selected options
};

const CARD_KEYWORD = {
/*-------------
// ABILITIES //
------------- */
// --- Frenzy Abilities --- //
burn: {name: "Burn", description: "Burns opposing unit upon dealing damage with an attack or skill.", icon: "Icons/Ability/Burn.png" },
freeze: {name: "Freeze", description: "Freezes opposing unit upon dealing damage with an attack or skill.", icon: "Icons/Ability/Freeze.png" },
paralyze: {name: "Paralyze", description: "Paralyzes opposing unit upon striking with an attack or skill.", icon: "Icons/Ability/Paralyze.png" },
soak: {name: "Soak", description: "Soaks opposing unit upon striking with an attack or skill.", icon: "Icons/Ability/Soak.png" },
venom: {name: "Venom", description: "Poisons opposing unit upon striking with an attack or skill.", icon: "Icons/Ability/Venom.png" },

protect: {name: "Protect", description: "Opponent can only target this unit for attacks.", icon: "Icons/Ability/Protect.png" },
barrier: {name: "Barrier", description: "Prevents the next damage received to any unit.", icon: "Icons/Ability/Barrier.png" },
evasion: {name: "Evasion", description: "Prevents the next skill target.", icon: "Icons/Ability/Evasion.png" },
aegis: {name: "Aegis", description: "Unaffected by skills and effects.", icon: "Icons/Ability/Venom.png" },
armor: {name: "Armor", description: "Secondary sustain stat. Units loss armor first before HP. When the armor breaks, nullifies remaining damage. Losses {1} Speed", icon: "Icons/Ability/Aegis.png" },

// --- Target Related Abilities --- //
veil: {name: "Veil", description: "Cannot be targeted by skills.", icon: "Icons/Ability/Veil.png" },
immunity: {name: "Immunity", description: "Unaffected by status ailments.", icon: "Icons/Ability/Immunity.png" },
ambush: {name: "Ambush", description: "Cannot be targeted by opponent's attacks or skills. Unit is revealed after attacking or using a skill", icon: "Icons/Ability/Ambush.png" },
flying: {name: "Flying", description: "Can only be blocked by other units with Flying or Ranged. Speed {1}.", icon: "Icons/Ability/Flying.png" },
ranged: {name: "Ranged", description: "Can attack units with Flying and Dive. Speed {1}.", icon: "Icons/Ability/Ranged.png" },

rush: {name: "Rush", description: "Can attack on the turn it is played. Speed {1}.", icon: "Icons/Ability/Rush.png" },
drain: {name: "Drain", description: "When this unit deals damage, gain that much life.", icon: "Icons/Ability/Drain.png" },
pierce: {name: "Pierce", description: "Ignores armor."},

// --- Assault Abilities --- //
intimidate: {name: "Intimidate", description: "When declaring an attack, {CW} that unit", icon: "OtherImages/StatIcons/Intimidate.png" },
provoke: {name: "Provoke", description: "When declaring an attack, {CCW} that unit", icon: "OtherImages/StatIcons/Provoke.png" },

 // --- Brace Abilities --- //
scorch: {name: "Scorch", description: "Burns opponent after receiving an attack", icon: "Icons/Ability/Scorch.png" },
frostbite: {name: "Frostbite", description: "Freezes opponent after receiving an attack", icon: "Icons/Ability/Frostbite.png" },
poisonous: {name: "Poisonous", description: "Poisons opponent after receiving an attack", icon: "Icons/Ability/Poisonous.png" },
drenched: {name: "Drenched", description: "Soaks opponent after receiving an attack", icon: "Icons/Ability/Drenched.png" },
static: {name: "Static", description: "Paralyzes opponent after receiving an attack", icon: "Icons/Ability/Static.png" },

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
crush: {name: "Crush", description: "Remove all armor from target unit."},
reanimate: {name: "Reanimate", description: "Summons this unit from the void."},
dash: {name: "Dash", description: "Summons this unit from the hand with half HP (rounded up). Gain {1} Speed."},

// --- PHASE SKILLS --- //
awaken: {name: "Awaken", description: "Activates during the draw step."},
aftermath: {name: "Aftermath", description: "Activates during the end step."},

// --- WEATHER SKILLS --- //
drought: {name: "Drought", description: "Summons Sunlight and Sunburst.", icon: "Icons/Weather/Drought.png" },
drizzle: {name: "Drizzle", description: "Summons Rain and Downpour.", icon: "Icons/Weather/Drizzle.png" },
stormcall: {name: "Stormcall", description: "Summons Storm and Thunderstorm.", icon: "Icons/Weather/Stormcall.png" },
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
burned: {name: "Burned", description: "Lose 1 HP during each end step per stack, and receive 1 more damage upon attack or skill."},
frozen: {name: "Frozen", description: "Cannot attack, activate skills or receive damage. Lasts 2 turns per stack. If damaged, reduce the countdown by 1."},
paralysis: {name: "Paralysis", description: "Cannot attack. Lasts 2 turns per stack"},
soaked: {name: "Soaked", description: "Lose -1 ATK per stack."},

// --- WEATHER EFFECTS --- //
sunlight: {name: "Sunlight", description: "Inferno +{1}/{0}. Radiance {0}/+{1}.", icon: "Icons/Weather/Sunlight.png" },
sunburst: {name: "Sunburst", description: "Inferno +{2}/{0}. Radiance +{1}/+{1}.", icon: "Icons/Weather/Sunburst.png" },
rain: {name: "Rain", description: "Tidal +{1}/{0}. Sylvan {0}/+{1}.", icon: "Icons/Weather/Rain.png" },
downpour: {name: "Downpour", description: "Tidal +{1}/+{1}. Sylvan {0}/+{1}.", icon: "Icons/Weather/Downpour.png" },
storm: {name: "Storm", description: "Tempest +{1}/{0}. Tidal {0}/+{1}.", icon: "Icons/Weather/Storm.png" },
thunderstorm: {name: "Thunderstorm", description: "Tempest +{2}/{0}. Tidal {0}/+{1}.", icon: "Icons/Weather/Thunderstorm.png" },
snowfall: {name: "Snowfall", description: "Frozen units lose 1 HP during the end step. Inspire Tidal → Freeze.", icon: "Icons/Weather/Snowfall.png" },
blizzard: {name: "Blizzard", description: "Non-Tidal units lose 1 HP during the end step. Inspire Tidal → Freeze.", icon: "Icons/Weather/Blizzard.png" },
gale: {name: "Gale", description: "Tempest +{1}/{0}.", icon: "Icons/Weather/Gale.png" },
hurricane: {name: "Hurricane", description: "Tempest +{2}/{0}.", icon: "Icons/Weather/Hurricane.png" },
eruption: {name: "Eruption", description: "Interno +{1}/{0}. Terra {0}/+{1}.", icon: "Icons/Weather/Eruption.png" },
decay: {name: "decay", description: "Corrupted +{1}/+{1}.", icon: "Icons/Weather/Decay.png" },
mystveil: {name: "Mystveil", description: "Sylvan +{1}/+{1}.", icon: "Icons/Weather/Mystveil.png" },

// -------------------- //
// --- TRAIT SKILLS --- //
// -------------------- //
 
// --- CHAMPION SKILLS --- //
championSummon: {name: "Champion Summon", description: "Summon Champion without skills."},
championAscent: {name: "Champion Ascent", description: "Enable the Champion's skills and inspire +{1}/+{1}."},
// --- EVOLUTION SKILLS --- //
evolve: {name: "Evolve", description: "Get an 'Evolve' counter.", icon: "OtherImages/StatIcons/Evolve.png" },
evolution: {name: "Evolution", description: "Summon from the hand | Attach 1 unit of the same type/archetype that have an 'Evolve' counter on it.", icon: "OtherImages/StatIcons/Evolution.png" },
voidEvolution: {name: "Void Evolution", description: "Summon from the hand/void | Attach 1 unit of the same type/archetype that have an 'Evolve' counter on it.", icon: "OtherImages/StatIcons/VoidEvolution.png" },
// --- FUSION SKILLS --- //
fuse: {name: "Fuse", description: "Get a 'Fuse' counter.", icon: "OtherImages/StatIcons/Fuse.png" },
fusion: {name: "Fusion", description: "Summon from the hand | Attach 2 units of the same type/archetype that have a 'Fuse' counter on it.", icon: "OtherImages/StatIcons/Fusion.png" },
voidFusion: {name: "Void Fusion", description: "Summon from the hand/void | Attach 2 units of the same type/archetype that have a 'Fuse' counter on it.", icon: "OtherImages/StatIcons/VoidFusion.png" },
// --- TRANSFORMATION SKILLS --- //
transform: {name: "Transform", description: "Transforms unit by certain conditions | Attach it to the summoned unit", icon: "OtherImages/StatIcons/Transform.png" },
// --- ARTIFACT SKILLS --- //
relic: {name: "Relic", description: "Attach to Domains of the same Color.", icon: "OtherImages/StatIcons/Relic.png" },
equipment: {name: "Equipment", description: "Attach to Creatures of the same Color/Type/Archetype.", icon: "OtherImages/StatIcons/Equipment.png" },
// --- AURA SKILLS --- //
aura: {name: "Aura", description: "Attach to units of the same Color.", icon: "OtherImages/StatIcons/Aura.png" },

// ----- //
// TYPES //
// ----- //
/* dragon: {name: "Dragon", icon: "Icons/Type/Dragon.png" , description: "Majestic, ancient, and unmatched in power, dragons embody the primal forces of creation and destruction. Each scale glimmers with the legacy of ages, and each breath reshapes the world itself. Though their temperaments vary—from wise guardians to wrathful tyrants—all dragons command awe and fear in equal measure, their presence a living reminder that the elements themselves can take form and will."},
beast: {name: "Beast", icon: "Icons/Type/Beast.png" , description: "Untamed and primal, beasts embody the raw pulse of nature unshaped by reason or restraint. From the silent hunter stalking through shadowed woods to the thunderous titan that shakes the earth, each creature moves with instinctive purpose. Though driven by hunger and survival, beasts are more than mere savagery — they are the heartbeat of the wild, the first language of a world that remembers no masters."},
elemental: {name: "Elemental", icon: "Icons/Type/Elemental.png" , description: "Primordial and eternal, elementals are the living essence of the world’s raw forces. They are not born, but awakened — the whisper of wind given voice, the heartbeat of stone given motion. Neither good nor evil, they embody balance itself, shaping and unshaping creation with every surge of flame, wave, or storm. To face an elemental is to confront the untamed will of the world made flesh."},
construct: {name: "Construct", icon: "Icons/Type/Construct.png" , description: "Forged by mortal hands yet animated by unnatural will, constructs stand as monuments to creation without life. Some serve with perfect obedience, others wander seeking the purpose their makers abandoned. Whether wrought from steel, stone, or enchanted coral, each construct bears the echo of its creator’s intent — a silent testament to the line between genius and hubris."},
faefolk: {name: "Faefolk", icon: "Icons/Type/Faefolk.png" , description: "Enigmatic and timeless, the Faefolk dwell where wonder and deceit intertwine. They are the laughter in moonlit groves, the whispers between leaves, and the shimmer at the edge of mortal sight. Guided by whim as much as wisdom, their magic bends nature’s laws with effortless grace — nurturing or destroying with the same delicate hand. To bargain with the Faefolk is to dance with beauty and peril alike."},
brutefolk: {name: "brutefolk", icon: "Icons/Type/brutefolk.png" , description: "Savage and unyielding, the Brutefolk are forged in struggle and bound by blood. They thrive where strength is law and survival the only creed, their lives shaped by war, hunger, and the will to endure. Though scorned as beasts by softer races, they bear a primal honor — a truth carved in scars and fire. To face the Brutefolk is to meet the raw, untamed spirit of the world before it learned mercy."},
demon: {name: "Demon", icon: "Icons/Type/Demon.png" , description: "Born from malice, ambition, and the echoes of forsaken gods, demons are the chaos that festers beneath creation. They thrive in conflict, feeding on desire, fear, and despair — yet each is bound by its own cunning will. To mortals they appear as nightmares made flesh, but to themselves they are architects of freedom, tearing down the fragile order that cages the world. Their power is corruption, and their truth — liberation through ruin."},
undead: {name: "Undead", icon: "Icons/Type/Undead.png" , description: "Bound by neither time nor death, the undead are echoes of life that refuse to fade. Animated by cursed will or unholy power, they wander between worlds — relics of hatred, sorrow, or unfinished purpose. Where they tread, warmth withers and silence reigns. To some they are abominations; to others, proof that even death can be conquered — at a terrible cost." },
celestial: {name: "Celestial", icon: "Icons/Type/Celestial.png" , description: "Beacons of divinity and order, the celestials are born of pure light and cosmic harmony. Their presence bends the heavens and stills the storms, for they are the will of creation made radiant. Guided by purpose beyond mortal grasp, they bring both mercy and judgment — for in their eyes, salvation and destruction are but reflections of balance restored."},
avian: {name: "Construct", icon: "Icons/Type/Avian.png" , description: "Graceful and fierce, the avians rule the skies with wisdom born of the wind. From mountaintop sanctuaries they watch the shifting lands below, their keen eyes ever wary, their hearts bound to the endless horizon. Whether messengers of dawn or harbingers of storm, the Avians embody freedom itself — swift, untouchable, and guided by the breath of the heavens."},

*/

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
hybrid: {name: "Hybrid", profile: { hp: 8, atk: 7, def: 4, spd: 5, hc: 2, ep: 3 }, icon: "Icons/Archetype/Hybrid.png" , description: "Ferocious and untamed, Hybrids roam the wilds with bodies forged from multiple forms. With the strength of a bull, the speed of a stag, or the cunning of a fox, each beast strikes fear into those who cross their path. Raw instincts and primal power guide them, making every encounter with a Hybrid a savage test of survival."},
moonfang: {name: "Moonfang", profile: { hp: 5, atk: 9, def: 3, spd: 8, hc: 1, ep: 5 }, icon: "Icons/Archetype/Moonfang.png" , description: "Born of lunar light and shadowed forests, the Moonfang wolves prowl by day with keen senses and silent steps. When the moon rises, their forms twist into fearsome werewolves, claws and fangs sharpened by the night. Driven by instinct and the pull of the moon, they strike with relentless ferocity, hunting as packs that embody both cunning and primal wrath."},

// --- Faefolk --- //
goblin: {name: "Goblin", profile: { hp: 2, atk: 7, def: 2, spd: 5, hc: 2, ep: 7 }, icon: "Icons/Archetype/Goblin.png" , description: "Small, cunning, and endlessly resourceful, goblins thrive in hidden warrens and shadowed corners. They scurry with mischievous intent, ambushing foes and exploiting every weakness. Though individually weak, they strike in numbers, their chaotic energy turning even the simplest skirmish into unpredictable mayhem."},
fairy: {name: "Fairy", profile: { hp: 1, atk: 8, def: 2, spd: 8, hc: 2, ep: 10 }, icon: "Icons/Archetype/Fairy.png" , description: "Delicate yet mischievous, fairies flit through forests and meadows, their presence leaving trails of sparkling light. Though small, they wield surprising magic, weaving illusions and enchantments to protect their homes or play tricks on unwary travelers. Their beauty belies a cunning and spirited nature, always dancing between wonder and mischief."},
elf: {name: "Elf", profile: { hp: 6, atk: 6, def: 4, spd: 6, hc: 2, ep: 7 }, icon: "Icons/Archetype/Elf.png" , description: "Graceful and eternal, elves move with the harmony of the forests they protect. Skilled in both magic and archery, they strike with precision and wisdom, blending into nature as if part of it. Their keen senses and ancient knowledge make them formidable guardians, defending their realms with elegance, patience, and unwavering resolve."},
satyr: {name: "Satyr", profile: { hp: 7, atk: 5, def: 5, spd: 5, hc: 3, ep: 8 }, icon: "Icons/Archetype/Satyr.png" , description: "Wild-hearted and cunning, Satyrs embody the untamed spirit of nature. Their laughter echoes through moonlit groves as they dance between mischief and wisdom, balancing chaos and creation. Though their revels seem carefree, Satyrs are fierce protectors of their forests—striking swiftly with wit, charm, and primal magic when their woodland sanctuaries are threatened."},
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
arbor: {name: "Arbor", icon: "Icons/Archetype/Arbor.png" , description: "Born of roots, bark, and the living green of forests, the Arbor are guardians of nature’s heart. Their limbs weave and grow with unstoppable force, entangling foes and protecting the land. Patient yet relentless, they draw strength from the earth, turning forests into living battlegrounds where every vine and branch is a weapon."},
pyroclast: {name: "Pyroclast", icon: "Icons/Archetype/Pyroclast.png" , description: "Born from molten fury and the heart of burning flames, the Pyroclasts are pure embodiments of fire. Their bodies blaze with uncontrolled heat, and their movements ignite the air itself. Wherever they tread, flames consume and scorch, leaving nothing but ash in their wake, a testament to their unrelenting, fiery essence."},
hydral: {name: "Hyral", icon: "Icons/Archetype/Hydral.png" , description: "Forged from rivers, tides, and the endless depths, the Hyrals are living currents of water given form. They surge and crash with unrelenting force, drenching and drowning all who oppose them. Fluid and adaptable, they strike with the inevitability of the ocean, pulling foes beneath waves of relentless, liquid power."},
galeform: {name: "Galeform", icon: "Icons/Archetype/Galeform.png" , description: "Born of tempests and the rush of wind, Galeforms are swift, elusive elementals that strike with blades of air. Their movements are a blur, their attacks slicing and tearing with unerring precision. Masters of speed and agility, they descend like hurricanes, overwhelming foes with relentless, cutting gusts and the fury of the skies."},
stonekin: {name: "Stonekin", icon: "Icons/Archetype/Stonekin.png" , description: "Forged from bedrock and shaped by the ages, the Stonekin are embodiments of the earth. Their massive forms crush all that stand against them, while their unyielding bodies shrug off attacks with unwavering resilience. Slow but unstoppable, they move with the relentless patience of mountains, turning the battlefield into a fortress of stone and earth."},
obscurid: {name: "Obscurid", icon: "Icons/Archetype/Obscurid.png" , description: "Born from shadow and void, the Obscurids are creeping shades that feed on the essence of life. Their forms shift and blur, slipping through defenses to drain strength and spirit from all who stand before them. Masters of subtlety and decay, they leave only emptiness in their wake, turning vitality into darkness."},
luminaut: {name: "Luminaut", icon: "Icons/Archetype/Luminaut.png" , description: "Born of pure light and radiant energy, the Luminauts illuminate the battlefield with brilliance. Their presence purifies corruption and inspires allies, while their searing attacks blaze with the power of the sun. Majestic and unwavering, they embody the essence of radiance, turning darkness into hope and striking down those who oppose their light."},
corruptor: {name: "Corruptor", icon: "Icons/Archetype/Corruptor.png" , description: "Born of venom, rot, and foul decay, the Corruptors spread poison wherever they go. Their touch withers plant and flesh alike, and their toxic presence corrupts even the purest of lands. Relentless and insidious, they revel in contamination, leaving blighted ground and weakened foes in their poisonous wake."},
voltkin: {name: "Voltkin", icon: "Icons/Archetype/Voltkin.png" , description: "Forged from lightning and crackling energy, the Voltkin are living storms incarnate. Their bodies surge with electric power, striking with blinding speed and precision. Every movement sparks chaos, and every attack leaves a trail of crackling destruction, embodying the relentless fury of the storm."},
glacial: {name: "Glacial", icon: "Icons/Archetype/Glacial.png" , description: "Born from frost and frozen winds, the Glacials are elementals of ice and chill. Their touch freezes the air and hardens the ground, slowing all who oppose them. Silent and relentless, they strike with the precision of falling icicles, leaving the battlefield encased in frost and their enemies trapped in the grip of winter’s wrath."},

// --- Dragon --- //
thornwing: {name: "Thornwing", profile: { hp: 9, atk: 4, def: 9, spd: 3, hc: 4, ep: 3 }, icon: "Icons/Archetype/Thornwing.png" , description: "Forged of scale, bark, and living wood, the Thornwing dragons embody the resilience of the ancient forests. Their hides are plated in thorned armor, their wings creaking like timber in the wind. Where others strike with fire or venom, they endure, turning battles into wars of attrition. The Thornwing are defined by their unyielding defenses, outlasting foes until nature itself reclaims the battlefield."},
blazingscale: {name: "Blazingscale", profile: { hp: 2, atk: 10, def: 3, spd: 8, hc: 3, ep: 8 }, icon: "Icons/Archetype/Blazingscale.png" , description: "Dragons wreathed in flame and fury, the Blazingscale are living wildfires given form. With every wingbeat they ignite the skies, leaving charred wastelands in their wake. They are devastation incarnate turning the land itself into an endless inferno."},
abyssdrake: {name: "Abyssdrake", profile: { hp: 9, atk: 3, def: 8, spd: 7, hc: 8, ep: 2 }, icon: "Icons/Archetype/Abyssdrake.png" , description: "Born from the crushing depths, the Abyssdrakes command the ocean’s fury as their weapon. With thunderous roars they summon towering tides, swallowing armies and kingdoms beneath relentless waves. To face an Abyssdrake is to stand against the endless surge of the abyss, a flood that drowns all hope beneath its dark waters."},
stormrazor: {name: "Stormrazor", profile: { hp: 4, atk: 9, def: 3, spd: 9, hc: 4, ep: 9 }, icon: "Icons/Archetype/Stormrazor.png" , description: "Forged in the heart of raging tempests, the Stormrazors embody the untamed wrath of thunder and sky. They descend with blinding speed, their wings crackling with storms as lightning answers their command. Each strike is a flash of devastation, leaving smoldering ruin in the wake of their tempestuous fury."},
ironclaw: {name: "Ironclaw", profile: { hp: 8, atk: 4, def: 9, spd: 3, hc: 2, ep: 3 }, icon: "Icons/Archetype/Ironclaw.png" , description: "Carved from stone and tempered iron, the Ironclaw dragons are bastions of unyielding strength. Their armored scales deflect even the fiercest assaults, and their presence fortifies the lands they guard. Patient and resolute, they stand as living ramparts, defending their territory with unbreakable resolve and steadfast vigilance."},
venomspine: {name: "Venomspine", profile: { hp: 6, atk: 7, def: 4, spd: 5, hc: 6, ep: 5 }, icon: "Icons/Archetype/Venomspine.png" , description: "Twisted by venom and rot, the Venomspines spread decay wherever their wings shadow the land. Their breath carries no flame, but a vile miasma that withers forests, poisons rivers, and corrodes stone. To face them is to watch life unravel into ruin, for their presence festers the earth with corruption untamed."},
solarwyrm: {name: "Solarwyrm", profile: { hp: 8, atk: 5, def: 6, spd: 6, hc: 5, ep: 4 }, icon: "Icons/Archetype/Solarwyrm.png" , description: "Born of pure light and radiant fire, the Solarwyrms stand as vigilant guardians of sacred lands. Their wings shimmer with the brilliance of the sun, and their gaze pierces through shadows of corruption. Guided by unwavering justice, they defend their realm with searing power, purifying all that threatens the sanctity of their domain."},
nightshroud: {name: "Nightshroud", profile: { hp: 6, atk: 7, def: 3, spd: 6, hc: 4, ep: 6 }, icon: "Icons/Archetype/Nightshroud.png" , description: "Born from the abyss of endless night, the Nightshrouds are dragons wreathed in shadow and silence. Their scales absorb the faintest light, and their movements are whispers across the battlefield. Masters of stealth and dread, they strike from darkness, leaving fear and uncertainty in their wake, as if the night had taken form to hunt."},
glimmerscale: {name: "Glimmerscale", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Glimmerscale.png" , description: "Born of starlight and shimmering wings, the Glimmerscale are fairy-dragons whose radiant power is as enchanting as it is devastating. They weave between grace and fury, purifying corruption with gleaming light before unleashing searing, luminous strikes. Defined by their dual nature of elegance and ferocity, they are an archetype that blinds foes with brilliance, striking down darkness in a cascade of radiant fire."},  

 /*------ //
// TRAITS //
// ------- */
champion: {name: "Champion", icon: "Icons/StatIcons/Champion.png" , description: "Main creatures that can be upgraded to Champion and provide essence support. Champion creatures receive +{1}/+{1} and upgraded skills"},
};

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
  avatar: "CardImages/Avatars/Maldryss.png",
  banner: "CardImages/Banners/SkywardArchipelago.png",
  cardback: "OtherImages/Cardbacks/CBInferno.png",
  avatars: ["CardImages/Avatars/Kaelyra.png", "CardImages/Avatars/Gravok.png"],
  banners: ["CardImages/Banners/Verdara.png"],
  cardbacks: ["OtherImages/Cardbacks/CBMystic.png"]
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
          <img src="OtherImages/Currency/Coins.png" style="width:22px;vertical-align:middle;">
          <span style="color:#fff;">${reward.coins}</span>
        </div>
        <div>
          <img src="OtherImages/Icons/Essence.png" style="width:22px;vertical-align:middle;">
          <span style="color:#fff;">${reward.essence}</span>
        </div>
        ${isToday && !isClaimed ? `<div style="position:absolute;top:6px;right:6px;">
            <img src="OtherImages/Icons/Star.png" style="width:18px;" title="Claimable Today"></div>` : ''}
        ${isClaimed ? `<div style="position:absolute;top:6px;right:6px;">
            <img src="OtherImages/Icons/Checkmark.png" style="width:18px;" title="Claimed"></div>` : ''}
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
  // Accept either global CARD_KEYWORD or window.CARD_KEYWORD (shared.js may export either)
  const map = (typeof CARD_KEYWORD !== 'undefined') ? CARD_KEYWORD : (window.CARD_KEYWORD || {});
  if (!map) return null;
  const entry = map[token] || map[token.toLowerCase()] || map[token.toUpperCase()];
  if (!entry) return null;
  // Support value shapes: string path, or object { icon: "...", image: "...", path: "..." }
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
    '<img src="OtherImages/Icons/Tapped.png" style="height:1.3em;vertical-align:middle;margin-right: 2px;" title="Tapped">'
  );
  effect = effect.replace(/\{CCW\}/gi,
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
      icons += `<img src="OtherImages/Icons/Tapped.png" title="Activate in ATK position" style="width:21px;vertical-align:middle;">`;
    } else if (r === "CCW") {
      icons += `<img src="OtherImages/Icons/Untapped.png" title="Activate in DEF position" style="width:21px;vertical-align:middle;">`;
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
  if (v === 10) return '#4aa3ff'; // blue for top value
  // gradient red -> green for 1..9
  const t = (v - 1) / (9 - 1); // 0..1 across 1..9
  // red: #ff4d4d -> rgb(255,77,77)
  // green: #4dff88 -> rgb(77,255,136)
  const r1 = 255, g1 = 77, b1 = 77;
  const r2 = 77,  g2 = 255, b2 = 136;
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
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
 
  // Category (show chip(s))
  if (card.category) {
    const catHtml = renderKeywordChips(card.category) || (Array.isArray(card.category) ? card.category.join(', ') : card.category);
    infoHtml += labeled("Category", catHtml);
  }

  // Rarity simple label
  infoHtml += labeled("Rarity", card.rarity || "");

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

  // Trait / special (champion/dominion/etc)
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
      `<img src="OtherImages/Icons/Tapped.png" style="width:22px;height:22px;vertical-align:middle;">`
    );
    html = html.replace(/\{CCW\}/gi,
      `<img src="OtherImages/Icons/Untapped.png" style="width:22px;height:22px;vertical-align:middle;">`
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
    <div style="padding:16px 0 10px 0;text-align:center;">
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
        "Standard Pack": "StandardPack",
        "Standard Pack 2": "StandardPack2"
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
    case 'rarity': return ['All', 'Common', 'Rare', 'Epic', 'Legendary'];
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
