const dummyCards = [
// ---------------- //
// ELEMENTA GENESIS //
// ---------------- //

// EGG //
/*{id: 'MightoftheValiant', name: 'Might of the Valiant', rarity: 'Rare', image: 'Cards/egr/MightoftheValiant.png', flavor: '', 
 category: 'Spell', color: ['Green','Gay'], type: 'Aura', cost: '{g}{c}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{g}{c}', eff: {class: 'cast'}},
	{name: 'Might of the Valiant', mana: 1, eff: {class: 'bolster', atk: 1, hp: 1}},
	{name: 'Might of the Valiant', mana: 3, eff: {class: 'bolster', atk: 2, hp: 3}}]},
	*/
{id: 'Verdara', name: 'Verdara', rarity: 'Legend', image: 'Cards/egg/Verdara.png', flavor: '', 
 category: 'Terrain', color: 'Green', type: ['Sylvan','Domain'], hp: 20, essence: '{g2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Flourish', req: 'tap', eff: {class: 'bolster', hp: 2}, text: 'Give +{2} HP to 1 creature.'}]},

{id: 'EryndorVerdaraDruidlord', name: 'Eryndor, Verdara Druidlord', rarity: 'Legend', image: 'Cards/egg/EryndorVerdaraDruidlord.png', flavor: '', 
 category: 'Creature', fight: 'Sylvan Burst', color: 'Green', type: ['Sylvan','Elf','Warrior'], hp: 5, atk: 2, cost: '{g3}', ability: '', set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egg/VeyaVerdaraDruidessFA.png', skill: [
	{name: 'Summon', cost: '{g3}', eff: {class: 'summon'}},
	{name: 'Ancient Sylvan Decree', req: 'tap', eff: {class: 'disable', target: 'enemyCreatures', cost: ''}},
	{name: 'Timeless Zenith Blessing', req: 'void', eff: {class: 'bolster', target: 'playerField', type: 'Sylvan', atk: 1, hp: 2}, text: 'Give +{1}/+{2} to all Sylvan allies.'}]},

{id: 'GlaistigWildhornEmpress', name: 'Glaistig, Wildhorn Empress', rarity: 'Legend', image: 'Cards/egg/GlaistigWildhornEmpress.png', flavor: 'Beneath a crown of entwined blossoms, she dances through the forest while singing weaving spells of mirth. Satyrs, woodland creatures, and even the shyest spirits follow her lead, enchanted by her boundless charm.',
 category: 'Creature', fight: 'Satiric Pulse', color: 'Green', type: ['Satyr','Mage'], hp: 3, atk: 1, cost: '{g2}', ability: 'Vigor', set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egg/FaelyraWildhornEmpressFA.png', skill: [
	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Rhythmic Conjure', trig: 'summon', eff: {class: 'summon', id: 'Satyr'}, text: "When she's summoned, summon 1 Satyr from your hand."},
	{name: 'Chorus of the Wild', req: 'tap', eff: {class: 'bolster', atk: 1, hp: 2, type: 'Satyr', target: 'playerCreatures'}, text: 'Give +{1}/+{2} to all satyr allies.'}]},

{id: 'ThistlePixieStarlight', name: 'Thistle, Pixie Starlight', rarity: 'Legend', image: 'Cards/egg/ThistlePixieStarlight.png', flavor: 'Beneath a crown of entwined blossoms, she dances through the forest while singing weaving spells of mirth. Satyrs, woodland creatures, and even the shyest spirits follow her lead, enchanted by her boundless charm.',
 category: 'Creature', fight: 'Faefolk Pulse', color: 'Green', type: ['Fairy','Mage'], hp: 2, atk: 1, cost: '{g3}', ability: 'Flying', set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egg/FaelyraWildhornEmpressFA.png', skill: [
	{name: 'Summon', cost: '{g3}', eff: {class: 'summon'}},
	{name: 'Stardust Veil', trig: 'summon', eff: {class: 'purify', target: 'playerCreatures'}, text: 'On summon, purify all creature allies.'},
	{name: 'Luminescent Grace', cost: '{g}{x}', trig: 'attack', eff: {class: 'bolster', atk: 1, hp: '{x}', type: 'Satyr', target: 'playerCreatures'}}]},

// EGG RARE //
{id: 'VerdaraSoldier', name: 'Verdara Soldier', rarity: 'Rare', image: 'Cards/egg/VerdaraSoldier.png', flavor: '', 
 category: 'Creature', fight: 'Sylvan Slash', color: 'Green', type: ['Verdant','Spirit','Warrior'], hp: 4, atk: 2, cost: '{g4}', 
 ability: ['Drain','Protect'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g4}', eff: {class: 'summon'}},
	{name: 'Nature Prowess', trig: 'summon', eff: {class: 'bolster', atk: 1, countColor: 'Green'}, text: 'If summoned, gain +{1}/{0} for each sylvan creature ally.'},
	{name: 'Forest Phalanx', trig: 'attack', eff: {class: 'add', type: ['Sylvan','Terrain']}, text: 'If this attacks, add 1 sylvan terrain.'}]},

/*{id: 'WildhornSongreaver', name: 'Wildhorn Songreaver', rarity: 'Rare', image: 'Cards/egg/WildhornSongreaver.png', flavor: '', 
 category: 'Creature', fight: 'Horncall Crescendo', color: 'Green', type: 'Satyr', hp: 4, atk: 2, cost: '{g2}', ability: 'Vigor', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Hidden Overture', discard: 1, eff: {class: 'enable', amount: 1}},
	{name: 'Horncall Crescendo', cost: '{g}', trig: 'attack', discard: 1, eff: {class: 'bolster', atk: 1, type: 'Satyr', target: 'playerCreatures'}}]},
*/
{id: 'EarthrootTitan', name: 'Earthroot Titan', rarity: 'Rare', image: 'Cards/egg/EarthrootTitan.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Beast'], hp: 6, atk: 3, cost: '{g5}', ability: 'Rush', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g5}', eff: {class: 'summon'}}, {trig: 'summon', eff: {class: 'enable'}},
	{name: 'Barkhide', strike: true, eff: {class: 'bolster', hp: 1}},
	{name: 'Overgrowth', cost: '{0}', awaken: true, eff: {class: 'bolster', atk: 1, hp: 1}}]},

{id: 'NuminousWandererTanuki', name: 'Numinous Wanderer Tanuki', rarity: 'Rare', image: 'Cards/egg/NuminousWandererTanuki.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Sylvan','Beast','Rogue'], hp: 3, atk: 1, cost: '{g4}', 
 ability: ['Dispel','Stealth'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g4}', eff: {class: 'summon'}},
	{name: 'Gilded Leaf Deception', trig: 'summon', eff: {class: 'bolster', atk: 1, countColor: 'Green'}},
	{name: 'Boundless Path', trig: 'summon', eff: {class: 'add', type: ['Sylvan','Terrain']}}]},

{id: 'EnchantedBranchesLeshy', name: 'Enchanted Branches Leshy', rarity: 'Rare', image: 'Cards/egg/EnchantedBranchesLeshy.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Spirit'], hp: 6, atk: 2, cost: '{g4}', 
 ability: ['Bind','Vigor'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g4}', eff: {class: 'summon'}},
	{name: 'Shifting Bark Facade', trig: 'echo', eff: {class: 'summon', category: 'Creature', type: 'Verdant', cost: '<3'}},
	{name: 'Primal Forest Pulse', trig: 'summon', eff: {class: 'recover', q: 2, type: 'Verdant'}}]},

/*{id: 'StreamVagrantKappa', name: 'Stream Vagrant Kappa', rarity: 'Rare', image: 'Cards/egg/StreamVagrantKappa.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Green','Blue'], type: ['Sylvan','Merfolk'], hp: 3, atk: 2, cost: '{g2}{u}', 
 ability: ['Dive','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g2}{u}', eff: {class: 'summon'}},
	{name: 'Riverbed Flotsam Glean', trig: 'summon', eff: {class: 'recover', category: 'Artifact'},
	 text: 'When this card is summoned, recover 1 fallen artifact.'},
	{name: 'Drifting Foam Escape', req: 'return', eff: {class: 'drench', target: 'enemyCreatures'}}]},
*/
{id: 'VigorousSatiricOrchard', name: 'Vigorous, Satiric Orchard', rarity: 'Rare', image: 'Cards/egg/VigorousSatiricOrchard.png', flavor: 'The air thickens with the scent of fermented nectar and the echoes of mocking laughter. Here, every fallen fruit is a catalyst for a riotous surge of primal power.', 
 category: 'Terrain', color: 'Green', type: 'Satyr', hp: 4, cost: '{g2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{g2}', eff: {class: 'terraform'}}, {trig: 'summon', eff: {class: 'bolster', atk: 1, target: 'playerCreatures', type: 'Satyr'}, text: 'If this is played, give +{1}/{0} to satyr allies.'},
	{name: 'Wild Revelry', req: 'tap', eff: {class: 'bolster', hp: 1, target: 'playerCreatures', type: 'Satyr'}, text: 'Give {0}/+{1} to satyr allies.'}]},

{id: 'SylvanAnima', name: 'Sylvan Anima', rarity: 'Rare', image: 'Cards/egg/SylvanAnima.png', flavor: '', 
 category: 'Spell', color: 'Green', type: ['Sylvan','Enchantment'], cost: '{g2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{g2}', eff: {class: 'cast'}},
	{name: 'Awaken', awaken: true, eff: [{class: 'Recover', amount: 1}, {class : 'Essence', color: 'Green', amount: 1}]}]},

// EGG COMMON //
{id: 'LifesGrowth', name: "Life's Growth", rarity: 'Common', image: 'Cards/egg/LifesGrowth.png', flavor: '', 
 category: 'Spell', color: 'Green', type: ['Sylvan','Enchantment'], cost: '{g3}', mana: 3, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{g3}', eff: {class: 'enchant'}},
	{name: "Life's Growth", mana: 1, req: 'tap', eff: {class: 'essence', amount: 2, color: 'Green'}}]},

{id: 'VerdantRebirth', name: 'Verdant Rebirth', rarity: 'Rare', image: 'Cards/egg/VerdantRebirth.png', flavor: '', 
 category: 'Spell', color: 'Green', type: ['Nature','Spell'], cost: '{g3}', mana: 1, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{g3}', eff: {class: 'cast'}},
	{name: 'Verdant Rebirth', req: 'tap', mana: 1, eff: {class: 'revive', category: 'Creature', type: 'Sylvan'}}]},

{id: 'Pixie', name: 'Pixie', rarity: 'Common', image: 'Cards/egg/Pixie.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: 'Fairy', hp: 1, atk: 1, cost: '{g}', ability: 'Flying', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g}', eff: {class: 'summon'}}]},

{id: 'ElementalofLeaves', name: 'Elemental of Leaves', rarity: 'Common', image: 'Cards/egg/ElementalofLeaves.png', flavor: '', 
 category: 'Creature', fight: 'Verdant Strike', color: 'Green', type: ['Verdant','Spirit'], hp: 2, atk: 1, cost: '{g}', ability: ['Regenerate','Vigor'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g}', eff: {class: 'summon'}}]},

{id: 'WildhornFaun', name: 'Wildhorn Faun', rarity: 'Common', image: 'Cards/egg/WildhornFaun.png', flavor: '', 
 category: 'Creature', fight: 'Vigorous Strike', color: 'Green', type: 'Satyr', hp: 3, atk: 1, cost: '{g}', ability: 'Vigor', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g}', eff: {class: 'summon'}}]},

{id: 'WildhornHuntress', name: 'Wildhorn Huntress', rarity: 'Common', image: 'Cards/egg/WildhornHuntress.png', flavor: '', 
 category: 'Creature', fight: 'Vigorous Slash', color: 'Green', type: ['Satyr','Warrior'], hp: 4, atk: 2, cost: '{g3}', ability: ['Rush','Vigor'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g3}', eff: {class: 'summon'}}, {trig: 'summon', eff: {class: 'enable'}},
	{name: 'Vigorous Haste', trig: 'frenzy', eff: {class: 'bolster', atk: 1, hp: 1}}]},
 
{id: 'WildhornSkirmisher', name: 'Wildhorn Skirmisher', rarity: 'Common', image: 'Cards/egg/WildhornSkirmisher.png', flavor: 'Each arrow is a promise kept. No trespasser leaves the forest unmarked.', 
 category: 'Creature', fight: 'Vigorous Shot', color: 'Green', type: ['Satyr','Ranger'], hp: 3, atk: 1, cost: '{g2}', ability: ['Conceil'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Feral Empowerment', req: 'tap', eff: [{class: 'discard', q: 1, target: 'playerHand'}, {class: 'destroy', target: 'enemyCreatures'}, {class: 'bolster', atk: 1}]}]},
 
{id: 'GrovekeeperDiviner', name: 'Grovekeeper Diviner', rarity: 'Common', image: 'Cards/egg/GrovekeeperDiviner.png', flavor: '', 
 category: 'Creature', fight: 'Vigorous Blessing', color: 'Green', type: ['Satyr','Mage'], hp: 3, atk: 1, cost: '{g2}', ability: ['Purify'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Horncall Requiem', trig: 'summon', eff: {class: 'add', type: 'Satyr'}, text: 'If summoned, add 1 satyr from your deck.'},
	{name: 'Horncall Requiem', req: 'tap', eff: {class: 'bolster', type: 'Satyr', target: 'playerCreatures', hp: 1}, text: 'Give {0}/+{1} to satyr allies.'}]},
	
{id: 'DeepwoodUrsan', name: 'Deepwood Ursan', rarity: 'Common', image: 'Cards/egg/DeepwoodUrsan.png', flavor: '', 
 category: 'Creature', fight: 'Apex Feast', color: 'Green', type: ['Sylvan','Beast'], hp: 6, atk: 3, cost: '{g4}', ability: '', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g4}', eff: {class: 'summon'}},
	{name: 'Apex Feast', ep: '{g}', eff: [{class: 'banish', q: 1, target: 'enemyFallen', category: 'Creature'}, {class: 'bolster', atk: 1, hp: 1}]}]},
	
{id: 'WoodlandAntler', name: 'Woodland Antler', rarity: 'Common', image: 'Cards/egg/WoodlandAntler.png', flavor: '', 
 category: 'Creature', fight: 'Forest Freight', color: 'Green', type: ['Sylvan','Beast'], hp: 4, atk: 2, cost: '{g3}', ability: 'Rush', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g3}', eff: {class: 'summon'}},
	{name: 'Forest Freight', trig: 'attack', eff: {class: 'add', category: 'Terrain', type: 'Sylvan'}}]},

{id: 'WoodlandSpriteKodama', name: 'Woodland Sprite Kodama', rarity: 'Rare', image: 'Cards/egg/WoodlandSpriteKodama.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Green','Black'], type: ['Verdant','Spirit'], hp: 2, atk: 1, cost: '{g}{b}', 
 ability: 'Curse', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Curse of the Woodsman', trig: 'echo', eff: {class: 'summon', category: 'Creature', type: 'Verdant', cost: '<3'}},
	{name: 'Primal Forest Pulse', trig: 'summon', eff: {class: 'recover', q: 2, type: 'Verdant'}}]},

{id: 'Forest', name: 'Forest', rarity: 'Common', image: 'Cards/egg/Forest.png', flavor: '', 
 category: 'Terrain', color: 'Green', type: ['Sylvan','Terrain'], essence: '{g}', hp: 5, cost: '{g2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{g2}', eff: {class: 'terraform'}}]},

{id: 'FlourishingVitality', name: 'Flourishing Vitality', rarity: 'Common', image: 'Cards/egg/FlourishingVitality.png', flavor: '', 
 category: 'Spell', color: 'Green', type: ['Sylvan','Aura'], cost: '{g}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{g}', eff: {class: 'cast'}},
	{name: 'Flourishing Vitality', req: 'tap', mana: 1, eff: [{class: 'Heal', amount: 5}, {class: 'Draw', amount: 1}]}]},
 
/*{id: 'EssenceSurge', name: 'Essence Surge', rarity: 'Common', image: 'Cards/egg/EssenceSurge.png', flavor: '', 
 category: 'Spell', color: 'Green', type: 'Spell', cost: '{g2}', mana: 3, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{g2}', eff: {class: 'cast'}},
	{name: 'Essence Surge', req: 'tap', mana: 1, eff: {class: 'essence', color: 'colorless'}}]},
/*
// EGR //
// EGR LEGEND //
{id: 'Magmaris', name: 'Magmaris', rarity: 'Legend', image: 'Cards/egr/Magmaris.png', flavor: '', 
 category: 'Terrain', color: 'Red', type: ['Inferno','Domain'], hp: 20, essence: '{r2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Inferno Essence', req: 'tap', eff: {class: 'essence', color: 'green'}},
	{name: 'Ignite', req: 'tap', eff: {class: 'bolster', atk: 1 }}]},

{id: 'KaelenBlazebornHuntress', name: 'Kaelen, Blazeborn Huntress', rarity: 'Legend', image: 'Cards/egr/KaelenBlazebornHuntress.png', flavor: 'Born from fire, she hunts with the sky ablaze, and the horizon burns where her arrows fall. Every shot she looses carries the fury of a thousand sunsets.', 
 category: 'Creature', fight: 'Flameshot', color: 'Red', type: ['Fire','Ranger'], hp: 2, atk: 1, cost: '{r}', ability: '', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r}', eff: {class: 'summon'}},
	{name: 'Flameshot', cost: '{r}', eff: {class: 'burn', q: 2}},
	{name: 'Fervor Arrowcall', cost: '{r}', trig: 'summon', eff: {class: 'bolster', amount: 1, targets: 'playerCreatures'}}]},
 
{id: 'InfernoEruption', name: 'Inferno Eruption', rarity: 'Rare', image: 'Cards/egr/InfernoEruption.png', flavor: '', 
 category: 'Spell', color: 'Red', type: ['Fire','Spell'], cost: '{r4}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{r4}', eff: {class: 'cast'}}, {trig: 'summon', eff: {class: 'burn', q: 3, target: 'allCreatures'}},
	{name: 'Inferno Eruption', req: 'tap', mana: 1, eff: {class: 'add', q: 1, color: 'Red', category: 'Terrain'}}]},

{id: 'CinderpeakTyrant', name: 'Cinderpeak Tyrant', rarity: 'Rare', image: 'Cards/egr/CinderpeakTyrant.png', flavor: '', 
 category: 'Creature', fight: 'Orckish Warcry', color: 'Red', type: ['Giant','Orc'], hp: 9, atk: 4, cost: '{r6}', ability: 'Crush', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r6}', eff: {class: 'summon'}},
 	{name: 'Orckish Warcry', trig: 'attack', eff: {class: 'bolster', atk: 1, type: 'Orc', target: 'playerCreatures'}},
	{name: 'Final War Spoils', trig: 'echo', eff: {class: 'add', type: 'Equipment'}}]},

{id: 'BlazescaleWarDrake', name: 'Blazescale War-Drake', rarity: 'Rare', image: 'Cards/egr/BlazescaleWarDrake.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Red', type: 'Dragon', hp: 5, atk: 3, cost: '{r4}', ability: 'Rush', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r4}', eff: {class: 'summon'}}]},

{id: 'MoonlitVixenKumiho', name: 'Moonlit Vixen Kumiho', rarity: 'Rare', image: 'Cards/egr/MoonlitVixenKumiho.png', flavor: '', 
 category: 'Creature', fight: 'Orckish Warcry', color: 'Red', type: ['Fire','Beast','Rogue'], hp: 9, atk: 2, cost: '{r5}', ability: ['ambush','Dissolve','Pilfer'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r5}', eff: {class: 'summon'}},
 	{name: 'Lunar Glow Guise', req: 'discard', eff: {class: 'inspire', atk: 1, type: 'Orc', target: 'playerCreatures'}},
	{name: 'Fox Fire Burst', trig: 'echo', eff: {class: 'add', type: 'Equipment'}}]},

{id: 'ElementalofFlames', name: 'Elemental of Flames', rarity: 'Rare', image: 'Cards/egr/ElementalofFlames.png', flavor: '', 
 category: 'Creature', fight: 'Fire Strike', color: 'Red', type: ['Fire','Spirit'], hp: 3, atk: 2, cost: '{r3}', ability: ['Elusive','Burn'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r3}', eff: {class: 'summon'}},
	{name: 'Inferno Discovery', trig: 'summon', eff: {class: 'burn'}}]},

{id: 'MagmarisMercenary', name: 'Magmaris Mercenary', rarity: 'Rare', image: 'Cards/egr/MagmarisMercenary.png', flavor: '', 
 category: 'Creature', fight: 'Flaming Slash', color: 'Red', type: ['Fire','Rogue'], hp: 3, atk: 2, cost: '{r3}', ability: ['Defiant','Scorch'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r3}', eff: {class: 'summon'}},
	{name: 'Flaming Slash', trig: 'attack', eff: {class: 'burn', amount: 1, target: 'enemyUnits'}},
	{name: 'Scorching Contract', trig: 'summon', eff: [{class: 'discard', q:1, target: 'playerhand'}, {class: 'bolster', atk: 2, hp: 1, target:'self'}]}]},

{id: 'FlamingDirebeast', name: 'Flaming Direbeast', rarity: 'Rare', image: 'Cards/egr/FlamingDirebeast.png', flavor: '',
 category: 'Creature', fight: 'Searing Haste', color: 'Red', type: ['Fire','Beast'], hp: 6, atk: 3, cost: '{r4}', ability: ['Burn','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r4}', eff: {class: 'summon'}}, {trig: 'summon, eff: {class: 'enable'}},
	{name: 'Searing Haste', trig: 'attack', eff: {class: 'add', type: ['Beast','Fire']}},
	{name: 'Spirit Stoke', cost: '{r}', req: void, eff: {class: 'destroy', blight: 'burned'}}]},

{id: 'BestialScorchedBarrens', name: 'Bestial Scorched Barrens', rarity: 'Rare', image: 'Cards/egr/BestialScorchedBarrens.png', flavor: '', 
 category: 'Terrain', color: 'Red', type: ['Fire','Beast','Terrain'], hp: 3, cost: '{r2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{r2}', eff: {class: 'terraform'}}, {trig: 'summon', eff: {class: 'enable', type: ['Fire','Beast']}, text: 'Enable 1 fire beast creature.'},
	{name: 'Frenzied Fervor', req: 'tap', eff: {class: 'bolster', atk: 1, type: 'Beast', targets: 'playerCreatures'}, text: 'Give +{1} ATK to all beast creatures.'}]},

{id: 'CinderfoxKitsune', name: 'Cinderfox Kitsune', rarity: 'Common', image: 'Cards/egr/CinderfoxKitsune.png', flavor: '',
 category: 'Creature', fight: 'Searing Haste', color: 'Red', type: ['Fire','Beast'], hp: 2, atk: 1, cost: '{r2}', ability: ['Burn','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r2}', eff: {class: 'summon'}},
	{name: 'Searing Haste', trig: 'attack', eff: {class: 'add', category: 'Creature', type: ['Beast','Fire']}},
	{name: 'Spirit Stoke', passive: true, eff: {class: 'bolster', amount: 1, count: 'typePlayer', type: 'Fire'}}]},

{id: 'Emberling', name: 'Emberling', rarity: 'Common', image: 'Cards/egr/Emberling.png', flavor: '',
 category: 'Creature', fight: 'Searing Haste', color: 'Red', type: ['Fire','Beast'], hp: 1, atk: 1, cost: '{r}', ability: ['Burn','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r}', eff: {class: 'summon'}}, {trig: 'summon', eff: {class: 'enable'}}]},
 
{id: 'ElementalofEmbers', name: 'Elemental of Embers', rarity: 'Common', image: 'Cards/egr/ElementalofEmbers.png', flavor: '', 
 category: 'Creature', fight: 'Fire Strike', color: 'Red', type: ['Fire','Spirit','Elemental'], hp: 2, atk: 1, cost: '{r}', ability: ['Elusive','Scorch'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{r}', eff: {class: 'summon'}}]},

{id: 'MoltenExpanse', name: 'Molten Expanse', rarity: 'Common', image: 'Cards/egr/MoltenExpanse.png', flavor: '', 
 category: 'Terrain', color: 'Red', type: ['Fire','Terrain'], hp: 6, cost: '{r3}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{r3}', eff: {class: 'terraform'}},
	{name: 'Inferno Booster', req: 'tap', eff: {class: 'add', category: 'Spell', type: 'Fire'}, text: 'Add 1 fire spell from your deck.'}]},

{id: 'Volcano', name: 'Volcano', rarity: 'Common', image: 'Cards/egr/Volcano.png', flavor: '', 
 category: 'Terrain', color: 'Red', type: ['Inferno','Terrain'], essence: '{r}', hp: 5, cost: '{r2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{2}', eff: {class: 'terraform'}}]},

{id: 'FlameBlast', name: 'Flame Blast', rarity: 'Common', image: 'Cards/egr/FlameBlast.png', flavor: '', 
 category: 'Spell', color: 'Red', type: ['Fire','Spell'], cost: '{r}', mana: 1, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{r}', eff: {class: 'cast'}},
	{name: 'Flame Blast', mana: 1, eff: {class: 'burn', amount: 4}, text: 'Burn strike 4 to an enemy.'}]},

{id: 'EssenceAssault', name: 'Essence Assault', rarity: 'Common', image: 'Cards/egr/EssenceAssault.png', flavor: '', 
 category: 'Spell', color: 'Red', cost: '{r}', Type: 'Aura', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{1}', eff: {class: 'cast'}},
	{name: 'Essence Assault', mana: 1, eff: {class: 'bolster', atk: 1}, text: 'Give +{1}/{0} to 1 ally creature.'}]},

// --- EG BLUE --- //
{id: 'ZaryonUmarionCommander', name: 'Zaryon, Umarion Commander', rarity: 'Legend', image: 'Cards/egu/ZaryonUmarionCommander.png', flavor: '', 
 category: 'Creature', fight: 'Tidepiercer Vortex', color: 'Blue', type: ['Merfolk','Warrior'], hp: 5, atk: 2, cost: '{u4}', ability: ['Dive','Protect'], set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egu/ZaryonUmarionCommanderFA.png', skill: [
	{name: 'Summon', cost: '{u4}', eff: {class: 'summon'}},
	{name: 'Deepkin Rally', trig: 'summon', eff: {class: 'add', id: 'Mermaid'}},
	{name: 'Tidepiercer Vortex', cost: '{u}', trig: 'attack', eff: {class: 'destroy', category: 'Artifact', amount: 1}}]},

{id: 'SerenyaTideboundEnchantress', name: 'Serenya, Tidebound Enchantress', rarity: 'Legend', image: 'Cards/egu/SerenyaTideboundEnchantress.png', flavor: '', 
 category: 'Creature', fight: 'Riptide Command', color: 'Blue', type: ['Water','Mage'], hp: 3, atk: 1, cost: '{u}', ability: 'Soak', set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egu/SerenyaTideboundEnchantressFA.png', skill: [
	{name: 'Summon', cost: '{u}', eff: {class: 'summon'}},
	{name: 'Tidecall Ascendance', cost: '{u}', eff: {class: 'Draw', amount: 1}},
	{name: 'Riptide Command', cost: '{u}{u}', trig: 'attack', eff: {class: 'repel', amount: 2, target:'opponentCreatures'}}]},
 
{id: 'Umarion', name: 'Umarion', rarity: 'Legend', image: 'Cards/egu/Umarion.png', flavor: '', 
 category: 'Terrain', color: 'Blue', type: ['Tidal','Domain'], hp: 20, essence: '{u2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Insight', req: 'tap', eff: {class: 'draw', amount: 1 }, text: 'Draw 1 card.'}]},
 
{id: 'WavecrashWhale', name: 'Wavecrash Whale', rarity: 'Rare', image: 'Cards/egu/WavecrashWhale.png', flavor: '', 
 category: 'Creature', fight: 'Riptide Rush', color: 'Blue', type: 'Marine', hp: 12, atk: 5, cost: '{u8}', ability: ['Dive','Crush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{u8}', eff: {class: 'summon'}},
	{name: 'Whalefall Wake', trig: 'summon', eff: {class: 'summon'}},
	{name: 'Riptide Rush', eff: {class: 'Inspire', target: 'playerCreatures', type: 'Oceanic', accel: 1}}]},

{id: 'ElementalofTorrents', name: 'Elemental of Torrents', rarity: 'Rare', image: 'Cards/egu/ElementalofTorrents.png', flavor: '', 
 category: 'Creature', fight: 'Water Strike', color: 'Blue', type: ['Water','Spirit','Elemental'], hp: 4, atk: 2, cost: '{u3}', ability: ['Drench','Elusive'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{u3}', eff: {class: 'summon'}},
	{name: 'Tidal Discovery', trig: 'summon', eff: {class: 'Search', amount: 1, color: 'Blue', category: 'Terrain'}}]},

{id: 'HoarfrostSorceressYukionna', name: 'Hoarfrost Sorceress Yuki-onna', rarity: 'Rare', image: 'Cards/egu/HoarfrostSorceressYukionna.png', flavor: '', 
 category: 'Creature', fight: 'Water Strike', color: ['Blue','Gray'], type: ['Ice','Spirit','Mage'], hp: 2, atk: 1, cost: '{u}{c}', ability: ['Drench','Elusive'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{u}{c}', eff: {class: 'summon'}},
	{name: 'Rime Coated Glare', trig: 'attack', eff: {class: 'Paralyze', target: 'enemyCreatures'}},
	{name: 'Whiteout Frostbane', trig: 'echo', eff: {class: 'Destroy', category: 'Creature', targetBlight: 'frozen'}}]},
 
{id: 'MermaidSanctuary', name: "Mermaid Sanctuary", rarity: 'Rare', image: 'Cards/egr/MermaidSanctuary.png', flavor: '', 
 category: 'Terrain', color: 'Blue', type: ['Merfolk','Terrain'], hp: 4, cost: '{u2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{u2}', eff: {class: 'terraform'}},
	{name: 'Deep Surging Rest', req: 'tap', eff: [{class: 'essence', color: 'Blue', amount: 1}, {class: 'heal', target: 'playerCreatures', type: 'Merfolk', amount: 3]}]},

{id: 'TidalMaelstrom', name: 'Tidal Maelstrom', rarity: 'Rare', image: 'Cards/egu/TidalMaelstrom.png', flavor: '', 
 category: 'Spell', color: 'Blue', type: ['Water','Spell'], cost: '{u4}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{u4}', eff: {class: 'cast'}},
	{name: 'Tidal Maelstrom', mana: 1, req: 'tap', eff: {class: 'Soak', amount: 2, target: 3}}]},
 
{id: 'Mermaid', name: 'Mermaid', rarity: 'Common', image: 'Cards/egu/Mermaid.png', flavor: '', 
 category: 'Creature', fight: 'Diving Strike', color: 'Blue', type: 'Merfolk', hp: 3, atk: 1, cost: '{u}', ability: 'Dive', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{u}', eff: {class: 'summon'}}]},

{id: 'ElementalofDroplets', name: 'Elemental of Droplets', rarity: 'Common', image: 'Cards/egu/ElementalofDroplets.png', flavor: '', 
 category: 'Creature', fight: 'Water Strike', color: 'Blue', type: ['Water','Spirit'], hp: 2, atk: 1, cost: '{u}', ability: ['Drench','Elusive'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{u}', eff: {class: 'summon'}}]},

{id: 'Dolphin', name: 'Dolphin', rarity: 'Common', image: 'Cards/egu/Dolphin.png', flavor: '', 
 category: 'Creature', fight: 'Diving Strike', color: 'Blue', type: 'Marine', hp: 3, atk: 1, cost: '{u}', ability: 'Dive', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{u}', eff: {class: 'summon'}},
	{name: 'Oceanic Companion', trig: 'summon', eff: {class: 'bolster', target: 'playerCreatures', type: 'Marine', atk: 1}},
	{name: 'Oceanic Companion', trig: 'echo', eff: {class: 'wither', hp: 1, atk: 1}}]},

{id: 'RuneboundShark', name: 'Runebound Shark', rarity: 'Common', image: 'Cards/egu/RuneboundShark.png', flavor: '', 
 category: 'Creature', fight: 'Riptide Ravage', color: 'Blue', type: 'Marine', hp: 4, atk: 3, cost: '{u3}', ability: ['Dive','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{u3}', eff: {class: 'summon'}},
	{name: 'Riptide Ravage', damage: true, eff: {class: 'bolster', atk: 1}},
	{name: 'Slipstream', eff: {class: 'Inspire', ability: 'Accel', targetAbility: 'Dive', amount: 1}}]},

{id: 'Ocean', name: 'Ocean', rarity: 'Common', image: 'Cards/egu/Ocean.png', flavor: '', 
 category: 'Terrain', color: 'Blue', hp: 5, cost: '{u2}', essence: '{u}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{u2}', eff: {class: 'terraform'}}]},

{id: 'EssenceInsight', name: 'Essence Insight', rarity: 'Common', image: 'Cards/egu/EssenceInsight.png', flavor: '', 
 category: 'Spell', color: 'Colorless', cost: '{u}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{u}', eff: {class: 'cast'}},
	{name: 'Essence Insight', eff: {class: 'draw'}, text: 'Draw 1 card.'}]},

// EG YELLOW //
// EG YELLOW LEGEND //
{id: 'Aetherion', name: 'Aetherion', rarity: 'Legend', image: 'Cards/egy/Aetherion.png', flavor: '', 
 category: 'Terrain', color: 'Yellow', hp: 20, essence: '{y2}', type: ['Storm','Domain'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Shock', req: 'tap', eff: {class: 'strike', amount: 2 }}]},
 
{id: 'GarudaAetherionWings', name: 'Garuda, AetherionWings', rarity: 'Legend', image: 'Cards/Zephyra/GarudaAetherionWings.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Yellow', type: ['Avian','Warrior'], hp: 5, atk: 2, cost: '{y3}', ability: 'Flying', set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/Zephyra/GarudaAetherionWingsFA.png', skill: [
	{name: 'Summon', cost: '{y3}', eff: {class: 'summon'}},
	{name: 'Dash', cost: '{y}{y}', eff: {class: 'Dash'}},
	{name: 'Featherfall Tempest', cost: '{y}{y}', eff: {class: 'strike', amount: 1, target: 3}}]},
	
{id: 'ZyraThunderbladeDuelist', name: 'Zyra, Thunderblade Duelist', rarity: 'Legend', image: 'Cards/egy/ZyraThunderbladeDuelist.png', flavor: '', 
 category: 'Creature', fight: 'Blade Tempest', color: 'Yellow', type: ['Thunder','Rogue'], hp: 3, atk: 2, cost: '{y2}', ability: ['Dash','Static'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y2}', eff: {class: 'summon'}},
	{name: 'Dash', cost: '{y}', eff: {class: 'Dash'}},
	{name: 'Thunderclap Tempo', req: 'Untap', eff: {class: 'Flurry', amount: 1}},
	{name: 'Blade Tempest', cost: '{y2}', eff: {class: 'strike', target: 3, amount: 2}}]},

// EG YELLOW RARE //
{id: 'GalestrikeRoc', name: 'Galestrike Roc', rarity: 'Rare', image: 'Cards/egy/GalestrikeRoc.png', flavor: '', 
 category: 'Creature', fight: 'Flying Strike', color: 'Yellow', type: 'Avian', hp: 7, atk: 3, cost: '{y4}', ability: 'Flying', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y4}', eff: {class: 'summon'}},
	{name: 'Skyline Scouting', trig: 'summon', eff: {class: 'add', amount: 1, targetAbility: 'Flying'}},
	{name: 'Tailwind', eff: {class: 'Inspire', ability: 'Accel', amount: 1, targetAbility: 'Flying'}}]},

{id: 'AetherionElectromancer', name: 'Aetherion Electromancer', rarity: 'Rare', image: 'Cards/egy/AetherionElectromancer.png', flavor: '', 
 category: 'Creature', fight: 'Thunder Burst', color: 'Yellow', type: ['Thunder','Rogue'], hp: 3, atk: 1, cost: '{y3}', ability: 'Static', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y3}', eff: {class: 'summon'}},
	{name: 'Skyline Scouting', cost: '{2}{y}', eff: {class: 'Search', amount:1, targetAbility: 'Flying'}},
	{name: 'Tailwind', eff: {class: 'Inspire', ability: 'Accel', amount: 1, targetAbility: 'Flying'}}]},

{id: 'ElementalofGales', name: 'Elemental of Gales', rarity: 'Rare', image: 'Cards/egy/ElementalofGales.png', flavor: '', 
 category: 'Creature', fight: 'Wind Burst', color: 'Yellow', type: ['Wind','Spirit'], hp: 3, atk: 3, cost: '{y3}', ability: ['Elusive','Flying'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y3}', eff: {class: 'summon'}}]},

{id: 'ElementalofLightning', name: 'Elemental of Lightning', rarity: 'Rare', image: 'Cards/egy/ElementalofLightning.png', flavor: '', 
 category: 'Creature', fight: 'Thunder Burst', color: 'Yellow', type: ['Thunder','Spirit','Elemental'], hp: 4, atk: 3, cost: '{y3}', ability: ['Elusive','Static'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y3}', eff: {class: 'summon'}},
	{name: 'Storm Discovery', cost: '{2}{y}', eff: [{class: 'summon'}, {class: 'Search', amount: 1, color: 'Yellow', targetTrait: 'Terrain'}]}]},

{id: 'VoltwingImpundulu', name: 'Voltwing Impundulu', rarity: 'Rare', image: 'Cards/egy/VoltwingImpundulu.png', flavor: '', 
 category: 'Creature', fight: 'Flying Strike', color: 'Yellow', type: ['Thunder','Avian'], hp: 5, atk: 3, cost: '{y4}', ability: 'Flying', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y4}', eff: {class: 'summon'}},
	{name: 'Fulminant Descent', trig: 'summon', eff: {class: 'destroy', targetBlight: 'Paralyzed'}},
	{name: 'Supercharged Feathers', cost: '{y2}, eff: {class: 'bolster', atk: 'x', type: ['Thunder','Avian']}}]},

{id: 'StormspirePinnacle', name: 'Stormspire Pinnacle', rarity: 'Rare', image: 'Cards/egy/StormspirePinnacle.png', flavor: '', 
 category: 'Terrain', color: 'Yellow', type: 'Thunder', hp: 8, cost: '{y4}', ability: 'Static', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{y4}', eff: {class: 'terraform'}},
	{name: 'Fulmination Field', passive: true, eff: {class: 'potency', source: 'Thunder', amount: 1}}]},

{id: 'StormDevastation', name: 'Storm Devastation', rarity: 'Rare', image: 'Cards/egy/StormDevastation.png', flavor: '', 
 category: 'Spell', color: 'Yellow', type: ['Thunder','Spell'], cost: '{y5}', mana: 1, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{y5}', eff: {class: 'cast'}},
	{name: 'Storm Devastation', eff: {class: 'strike', amount: 3}}]},

// EG YELLOW COMMON //
{id: 'Birdfolk', name: 'Birdfolk', rarity: 'Common', image: 'Cards/egy/Birdfolk.png', flavor: '', 
 category: 'Creature', fight: 'Flying Strike', color: 'Yellow', type: ['Avian','Warrior'], hp: 3, atk: 2, cost: '{y2}', ability: 'Flying', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y2}', eff: {class: 'summon'}}]},

{id: 'SuncrestFalcon', name: 'Suncrest Falcon', rarity: 'Common', image: 'Cards/egy/SuncrestFalcon.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Yellow', type: 'Avian', hp: 2, atk: 2, cost: '{y}', ability: 'Flying', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y}', eff: {class: 'summon'}}]},

{id: 'ElementalofSparks', name: 'Elemental of Sparks', rarity: 'Common', image: 'Cards/egy/ElementalofSparks.png', flavor: '', 
 category: 'Creature', fight: 'Thunder Strike', color: 'Yellow', type: ['Thunder','Elemental','Spirit'], hp: 2, atk: 2, cost: '{y}', ability: ['Elusive','Static'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y}', eff: {class: 'summon'}}]},

{id: 'ZephyrSprite', name: 'Zephyr Sprite', rarity: 'Common', image: 'Cards/egy/ZephyrSprite.png', flavor: '', 
 category: 'Creature', fight: 'Wind Strike', color: 'Yellow', type: ['Wind','Elemental','Spirit'], hp: 2, atk: 2, cost: '{y}', ability: 'Flying', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{y}', eff: {class: 'summon'}}]},

{id: 'Peaks', name: 'Peaks', rarity: 'Common', image: 'Cards/egy/Peaks.png', flavor: '', 
 category: 'Terrain', color: 'Yellow', type: ['Storm','Terrain'], essence: '{y}', hp: 5, cost: '{y2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{y2}', eff: {class: 'terraform'}},
	{name: 'Storm Essence', req: 'tap', eff: {class: 'essence', color: 'yellow'}}]},

{id: 'Thunderlash', name: 'Thunderlash', rarity: 'Common', image: 'Cards/egy/Thunderlash.png', flavor: '', 
 category: 'Spell', color: 'Yellow', type: 'Thunder', cost: '{y}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{y}', eff: {class: 'cast'}}]},

{id: 'EssenceRay', name: 'Essence Ray', rarity: 'Common', image: 'Cards/egy/EssenceRay.png', flavor: '', 
 category: 'Spell', color: 'Yellow', cost: '{y}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{y}', eff: {class: 'cast'}},
	{name: 'Essence Ray', req: 'tap', eff: {class: 'strike', amount: 3}}]},

// EG GRAY //
// EG GRAY LEGEND //
{id: 'GravokDrakzulTyrant', name: 'Gravok, Drakzul Tyrant', rarity: 'Legend', image: 'Cards/egc/GravokDrakzulTyrant.png', flavor: '', 
 category: 'Creature', fight: 'Seismic Shatter', color: 'Gray', type: ['Orc','Brute'], hp: 3, atk: 2, cost: '{c3}',
 ability: ['Armor','Crush'], set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egc/GravokDrakzulTyrantFA.png', skill: [
	{name: 'Summon', cost: '{c3}', eff: {class: 'summon'}},
	{name: 'Stone Mantle', trig: 'summon', eff: {class: 'bolster', hp: 'x'}},
	{name: 'Seismic Smite', trig: 'attack', eff: {class: 'destroy', status: 'disabled', amount: 1}}]},

{id: 'RudgarIronfistMauler', name: 'Rudgar, Ironfist Mauler', rarity: 'Legend', image: 'Cards/egc/RudgarIronfistMauler.png', flavor: '', 
 category: 'Creature', fight: 'Stonebreaker Punch', color: 'Gray', type: 'Warrior', hp: 5, atk: 2, cost: '{c2}', ability: 'Crush', set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egc/RudgarIronfistMaulerFA.png', skill: [
	{name: 'Summon', cost: '{c2}', eff: {class: 'summon'}},
	{name: 'Stonebreaker Punch', trig: 'attack', eff: {class: 'strike', target: 1, amount: 5}},
	{name: 'Village Hero', awaken: true, eff: {class: 'bolster', atk: 1, hp: 1}}]},
         
{id: 'Drakzul', name: 'Drakzul', rarity: 'Legend', image: 'Cards/egc/Drakzul.png', flavor: '', 
 category: 'Terrain', color: 'Gray', hp: 20, essence: '{c2}', type: ['Terra','Domain'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Fortify', req: 'tap', eff: {class: 'armor', amount: 1}},
	{name: 'Terra Essence', req: 'tap', eff: {class: 'essence', color: 'gray'}}]},

// EG GRAY RARE //
{id: 'TerraformationEmergence', name: 'Terra Emergence', rarity: 'Legend', image: 'Cards/egc/TerraformationEmergence.png', flavor: '', 
 category: 'Spell', color: 'Colorless', type: 'Enchantment', cost: '{2}', mana: 3, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{c3}', eff: {class: 'Enchant'}},
	{name: 'Terraformation Emergence', req: 'tap', mana: 1, eff: {class: 'add', targetTrait: 'Terrain'}}]},

{id: 'DrakzulWarmonger', name: 'Drakzul Warmonger', rarity: 'Rare', image: 'Cards/egc/DrakzulWarmonger.png', flavor: '', 
 category: 'Creature', fight: 'Crushing Strike', color: 'Gray', type: ['Terra','Warrior'], hp: 6, atk: 3, cost: '{c3}', ability: 'Crush', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{c3}', eff: {class: 'summon'}},
	{name: 'Twin Impact', req: 'tap', eff: {class: 'strike', target: 2, amount: 2}},
	{name: 'Seismic Smite', cost: '{c2}', eff: {class: 'strike', target: 3, amount: 2}}]},

{id: 'RockmaulRhino', name: 'Rockmaul Rhino', rarity: 'Rare', image: 'Cards/egc/RockmaulRhino.png', flavor: '', 
 category: 'Creature', fight: 'Megahorn Strike', color: 'Gray', type: ['Rock','Beast'], hp: 7, atk: 4, cost: '{c5}', ability: ['Armor','Pierce'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{c5}', eff: {class: 'summon'}},
	{name: 'Seismic Smite', cost: '{c}', eff: {class: 'strike', target: 3, amount: 2}}]},

{id: 'ElementalofBoulders', name: 'Elemental of Boulders', rarity: 'Rare', image: 'Cards/egc/ElementalofBoulders.png', flavor: '', 
 category: 'Creature', fight: 'Rock Strike', color: 'Gray', type: ['Rock','Spirit','Elemental','Golem'], hp: 6, atk: 3, cost: '{c3}', ability: ['Armor','Crush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{c3}', eff: {class: 'summon'}},
	{name: 'Terra Discovery', trig: 'summon', eff: {class: 'add', color: 'Gray', type: 'Terrain'}},
	{name: 'Mountain Earthcraft', damage: true, eff: {class: 'Inspire', armor: 1, category: 'Terrain'}}]},

{id: 'SlatebackLizard', name: 'Slateback Lizard', rarity: 'Rare', image: 'Cards/egc/SlatebackLizard.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Gray', type: ['Rock','Dragon'], hp: 3, atk: 2, cost: '{c3}', ability: ['Armor','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{c3}', eff: {class: 'summon'}},
	{name: 'Seismic Smite', cost: '{c}', eff: {class: 'strike', target: 3, amount: 2}}]},

{id: 'OrcEncampment', name: 'Orc Encampment', rarity: 'Rare', image: 'Cards/egc/OrcEncampment.png', flavor: '', 
 category: 'Terrain', color: 'Gray', type: 'Orc', hp: 5, cost: '{c2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{c2}', eff: {class: 'terraform'}}]},
 
 {id: 'SeismicRupture', name: 'Seismic Rupture', rarity: 'Common', image: 'Cards/egc/SeismicRupture.png', flavor: '', 
 category: 'Spell', color: 'Gray', type: ['Ground','Spell'], cost: '{c3}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{c3}', eff: {class: 'cast'}},
	{name: 'Disable', cost: '{1}', eff: {class: 'disable', amount: 2, target: 'enemyField'}}]},

// EG GRAY COMMON //
{id: 'Golemites', name: 'Golemites', rarity: 'Common', image: 'Cards/egc/Golemite.png', flavor: '', 
 category: 'Creature', fight: 'Rock Strike', color: 'Gray', type: 'Golem', hp: 2, atk: 1, cost: '{c}', ability: 'Armor', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{c}', eff: {class: 'summon'}}]},

{id: 'Orc', name: 'Orc', rarity: 'Common', image: 'Cards/egc/Orc.png', flavor: '', 
 category: 'Creature', fight: 'Crushing Strike', color: 'Gray', type: ['Orc','Brute'], hp: 4, atk: 2, cost: '{1}', ability: ['Defiant','Intimidate'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{1}', eff: {class: 'summon'}}]},

{id: 'RockshellArmadillo', name: 'Rockshell Armadillo', rarity: 'Common', image: 'Cards/egc/RockshellArmadillo.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Gray', type: ['Rock','Beast'], hp: 2, atk: 1, cost: '{c}', ability: ['Armor','Unbreakable'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{c}', eff: {class: 'summon'}}]},

{id: 'ElementalofPebbles', name: 'Elemental of Pebbles', rarity: 'Common', image: 'Cards/egc/ElementalofPebbles.png', flavor: '', 
 category: 'Creature', fight: 'Rock Strike', color: 'Gray', type: ['Rock','Spirit','Golem','Elemental'], hp: 2, atk: 2, cost: '{c}', ability: ['Armor','Crush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{c}', eff: {class: 'summon'}}]},

{id: 'Mountain', name: 'Mountain', rarity: 'Common', image: 'Cards/egc/Mountain.png', flavor: '', 
 category: 'Terrain', color: 'Gray', hp: 5, cost: '{c2}', essence: '{c}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{c2}', eff: {class: 'terraform'}},
	{name: 'Terra Essence', req: 'tap', eff: {class: 'essence', color: 'gray'}}]},

{id: 'StoneFist', name: 'Stone Fist', rarity: 'Common', image: 'Cards/egc/StoneFist.png', flavor: '', 
 category: 'Spell', color: 'Gray', type: ['Rock','Aura'], cost: '{c}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{c}', eff: {class: 'cast'}},
	{name: 'Stone Fist', trig: 'summon', eff: {class: 'bolster', atk: 1}},
	{name: 'Stone Fist', req: 'tap', mana: 1, eff: {class: 'inspire', ability: 'Armor', hp: 1}}]},
         
{id: 'EssenceBarrier', name: 'Essence Barrier', rarity: 'Common', image: 'Cards/egc/EssenceBarrier.png', flavor: '', 
 category: 'Spell', color: 'Gray', type: 'Aura', cost: '{c}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{c}', eff: {class: 'cast'}},
	{name: 'Essence Barrier', eff: {class: 'bolster', hp: 2}, text: 'Give aegis to an ally unit.'}]},

// EG PURPLE //
// EG PURPLE LEGEND //
{id: 'MordrathVirkulPhantom', name: 'Mordrath, Virkul Phantom', rarity: 'Legend', image: 'Cards/egp/MordrathVirkulPhantom.png', flavor: 'With every step, the earth blackens, flowers wither, and the air grows thick with despair — a knight cursed to rot all he touches.', 
 category: 'Creature', fight: 'Blighted Strike', color: 'Purple', type: ['Spirit','Warrior'], hp: 3, atk: 3, cost: '{p3}', ability: ['Armor','Exploit','Resilience'], set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egp/MordrathVirkulPhantomFA.png', skill: [
	{name: 'Summon', cost: '{p3}', eff: {class: 'summon'}},
	{name: 'Blightfall Slash', req: 'tap', eff: {class: 'strike', amount: 1}},
	{name: 'Hallowed Plate', trig: 'echo', eff: {class: 'spawn', id: 'Spirit'}}]},
	
{id: 'SelgorCorruptedWarlock', name: 'Selgor, Corrupted Warlock', rarity: 'Legend', image: 'Cards/egp/SelgorCorruptedWarlock.png', flavor: '', 
 category: 'Creature', fight: 'Corruptive Surge', color: 'Purple', type: ['Mystic','Mage'], hp: 4, atk: 1, cost: '{p4}', ability: ['Curse','Drain'], set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egp/SelgorCorruptedWarlockFA.png', skill: [
	{name: 'Summon', cost: '{p4}', eff: {class: 'summon'}},
	{name: 'Soul Reap', tribute: 1, eff: {class: 'Rally', amount: 2}},
	{name: 'Corruptive Surge', cost: '{p}{p}', trig: 'attack', eff: {class: 'curse', target: 'enemyCreatures', amount: 1}}]},

{id: 'Virkul', name: 'Virkul', rarity: 'Legend', image: 'Cards/egp/Virkul.png', flavor: '', 
 category: 'Terrain', color: 'Purple', hp: 20, essence: '{p2}', type: ['Mystic','Domain'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Distort', req: 'tap', eff: {class: 'curse', amount: 1}}]},

// EG PURPLE RARE //
{id: 'ElementalofMiasmas', name: 'Elemental of Miasmas', rarity: 'Rare', image: 'Cards/egp/ElementalofMiasmas.png', flavor: '', 
 category: 'Creature', fight: 'Toxic Burst', color: 'Purple', type: ['Toxic','Spirit'], hp: 7, atk: 2, cost: '{p3}', ability: ['Elusive','Poisonous'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cursed Discovery', cost: '{p3}', trig: 'summon', eff: [{class: 'summon'}, {class: 'Search', amount: 1, color: 'Purple', category: 'Terrain'}]}]},

{id: 'SpiritualGloomPlateau', name: 'Spiritual Gloom Plateau', rarity: 'Rare', image: 'Cards/egp/SpiritualGloomPlateau.png', flavor: '', 
 category: 'Terrain', color: 'Purple', type: ['Spirit','Terrain'], hp: 6, cost: '{p2}', essence: '{p}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{p2}', eff: {class: 'terraform'}},
	{name: 'Hallowed Wake', req: 'tap', eff: {class: 'spawn', id: 'Ghost'}},
	{name: 'Hallowed Wake', req: 'tap', eff: {class: 'bolster', atk: 1, type: ['Spirit','Ghost']}}]},

{id: 'CursedWorldfall', name: 'Cursed Worldfall', rarity: 'Rare', image: 'Cards/egp/CursedWorldfall.png', flavor: '', 
 category: 'Spell', color: 'Purple', type: ['Enchantment','Corrupted'], cost: '{p3}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{p3}', eff: {class: 'Enchant'}},
	{name: 'Cursed Worldfall', req: 'tap', eff: {class: 'Hindrance'}}]},
 
{id: 'BlightWave', name: 'BlightWave', rarity: 'Common', image: 'Cards/egp/BlightWave.png', flavor: '', 
 category: 'Spell', color: 'Purple', type: 'Toxic', cost: '{p3}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{p3}', eff: {class: 'cast'}},
	{name: 'Blightwave', eff: {class: 'poison', amount: 1, target: 'enemyField'}},
	{name: 'Expel', expel: true, eff: {class: 'add', category: 'Terrain'}}]},

// EG PURPLE COMMON //
{id: 'ElementalofToxins', name: 'Elemental of Toxins', rarity: 'Common', image: 'Cards/egp/ElementalofToxins.png', flavor: '', 
 category: 'Creature', fight: 'Toxic Strike', color: 'Purple', type: ['Toxic','Spirit'], hp: 2, atk: 1, cost: '{p}', ability: ['Elusive','Poisonous'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{p}', eff: {class: 'summon'}}]},

{id: 'FesterglowFrontier', name: 'Festerglow Frontier', rarity: 'Common', image: 'Cards/egp/FesterglowFrontier.png', flavor: '', 
 category: 'Terrain', color: 'Purple', type: 'Toxic', hp: 6, cost: '{p2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{p2}', eff: {class: 'terraform'}},
	{name: 'Flourish', req: 'tap', eff: {class: 'add', category: 'Terrain'}}]},

{id: 'Swamp', name: 'Swamp', rarity: 'Common', image: 'Cards/egp/Swamp.png', flavor: '', 
 category: 'Terrain', color: 'Purple', hp: 5, cost: '{p2}', essence: '{p}', type: ['Mystic','Terrain'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{p2}', eff: {class: 'terraform'}}]},

{id: 'Mindbreak', name: 'Mindbreak', rarity: 'Common', image: 'Cards/egp/Mindbreak.png', flavor: '', 
 category: 'Spell', color: 'Purple', type: 'Corrupted', cost: '{p3}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{p3}', eff: {class: 'cast'}},
	{name: 'Mindbreak', eff: {class: 'discard'}}]},
 
{id: 'SporeCloud', name: 'Spore Cloud', rarity: 'Common', image: 'Cards/fop/SporeCloud.png', flavor: '', 
 category: 'Spell', color: 'Purple', type: ['Toxic','Spell'], cost: '{p2}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{p2}', eff: {class: 'cast'}},
	{name: 'Spore Cloud', eff: {class: 'poison', target: 'enemyCreatures'}}]},
         
{id: 'EssenceBreak', name: 'Essence Break', rarity: 'Common', image: 'Cards/egp/EssenceBreak.png', flavor: '', 
 category: 'Spell', color: 'Purple', cost: '{3}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{3}', eff: {class: 'cast', target: 1}},
	{name: 'Essence Break', mana: 1, eff: {class: 'dissolve'}}]},

// EG WHITE //
// EG WHITE LEGEND //
{id: 'Solmara', name: 'Solmara', rarity: 'Legend', image: 'Cards/egw/Solmara.png', flavor: '', 
 category: 'Terrain', color: 'White', hp: 20, type: ['Radiant','Dominion'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Radiant Essence', req: 'tap', eff: {class: 'essence', color: 'white' }},
	{name: 'Blessing', req: 'tap', eff: {class: 'heal', amount: 3 }}]},

{id: 'SeraphielSolmaraParagon', name: 'Seraphiel, Solmara Paragon', rarity: 'Legend', image: 'Cards/egw/SeraphielSolmaraParagon.png', flavor: '', 
 category: 'Creature', fight: 'Seraphic Judgement', color: 'White', type: ['Angel','Warrior'], hp: 4, atk: 2, cost: '{w3}', ability: ['Flying','Protect'], set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egw/SeraphielSolmaraParagonFA.png', skill: [
	{name: 'Summon', cost: '{w3}', eff: {class: 'summon'}},
	{name: 'Divine Ascendance', trig: 'summon', cost: '{w}', eff: {class: 'bolster', atk: 1, def: 2}},
	{name: 'Divine Ascendance', void: true, cost: '{w}', eff: {class: 'bolster', atk: 1, def: 2}},
	{name: 'Seraphic Judgement', cost: '{w}{x}{x}', trig: 'attack', eff: {class: 'destroy', target: 'enemyCreatures', amount: '{x}'}}]},
	 
{id: 'ElyndraDawnbladeofHeavens', name: 'Elyndra, Dawnblade of Heavens', rarity: 'Legend', image: 'Cards/egw/ElyndraDawnbladeofHeavens.png', flavor: '', 
 category: 'Creature', fight: 'Radiant Strike', color: 'White', type: ['Radiant','Warrior'], hp: 3, atk: 2, cost: '{w2}', ability: 'Aegis', set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egw/ElyndraDawnbladeofHeavensFA.png', skill: [
	{name: 'Summon', cost: '{w2}', eff: {class: 'summon'}},
	{name: 'Dawnbreak', cost: '{w}', trig: 'summon', eff: {class: 'bolster', amount: 1}},
	{name: 'Radiant Severance', cost: '{w}', trig: 'attack', eff: [{class: 'strike', amount: 3}, {status: 'Aegis'}]}]},

// EG WHITE RARE //
{id: 'SolmaraArchpriest', name: 'Solmara Archpriest', rarity: 'Rare', image: 'Cards/egw/SolmaraArchpriest.png', flavor: '', 
 category: 'Creature', fight: 'Radiant Strike', color: 'White', type: ['Holy','Mage'], hp: 4, atk: 1, cost: '{w3}', ability: 'Purify', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w3}', eff: {class: 'summon'}},
	{name: 'Summon', cost: '{2}{w}', eff: {class: 'summon'}}]},

{id: 'Pegasus', name: 'Pegasus', rarity: 'Common', image: 'Cards/egw/Pegasus.png', flavor: '', 
 category: 'Creature', fight: 'Mythical Strike', color: 'White', type: ['Mythical','Beast'], hp: 6, atk: 3, 
 cost: '{w3}', ability: ['Flying','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{2}{w}', eff: {class: 'summon'}}]},

{id: 'SkylionExemplar', name: 'Skylion Exemplar', rarity: 'Rare', image: 'Cards/egw/SkylionExemplar.png', flavor: '', 
 category: 'Creature', fight: 'Radiant Strike', color: 'White', type: ['Holy','Beast'], hp: 6, atk: 3, cost: '{w4}', ability: ['Aegis','Flying','Protect'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w4}', eff: {class: 'summon'}},
	{name: 'Wings of Absolution', trig: 'summon', eff: {class: 'inspire', status: 'Aegis', amount: 2}},
	{name: 'Hallowed Conviction', trig: 'attack', cost: '{w}', eff: {class: 'bolster', status: 'Aegis', hp: 1, atk: 1}}]},

{id: 'ElementalofLusters', name: 'Elemental of Lusters', rarity: 'Rare', image: 'Cards/ecw/ElementalofLusters.png', flavor: '', 
 category: 'Creature', fight: 'Light Strike', color: 'White', type: ['Light','Spirit'], hp: 4, atk: 1, cost: '{w3}', ability: ['Elusive','Regenerate'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w3}', eff: {class: 'summon'}},
	{name: 'Radiant Discovery', trig: 'summon', eff: {class: 'add', color: 'White', category: 'Terrain'}},
 	{name: 'Blinding Splendor', trig: 'attack', eff: {class: 'disable', target: 'opponentCreatures'}}]},

{id: 'RadiantJudgement', name: 'Radiant Judgement', rarity: 'Rare', image: 'Cards/egw/RadiantJudgement.png', flavor: '', 
 category: 'Spell', color: 'White', type: 'Light', cost: '{w4}', mana: 3, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{w4}', eff: {class: 'cast'}},
	{name: 'Radiant Judgement', req: 'tap', eff: {class: 'destroy', amount: 2}}]},

// EG WHITE COMMON //
{id: 'Angel', name: 'Angel', rarity: 'Common', image: 'Cards/egw/Angel.png', flavor: '', 
 category: 'Creature', fight: 'Seraphic Strike', color: 'White', type: ['Angel'], hp: 3, atk: 1, cost: '{w}', ability: ['Flying','Purify'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w}', eff: {class: 'summon'}},
 	{name: 'Graceborn', eff: {class: 'Purify', target: 1}}]},

{id: 'DawlightLady', name: 'Dawlight Lady', rarity: 'Common', image: 'Cards/egw/DawlightLady.png', flavor: '', 
 category: 'Creature', fight: 'Radiant Strike', color: 'White', type: ['Radiant','Elf'], hp: 2, atk: 0, cost: '{w}', ability: 'Aegis', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w}', eff: {class: 'summon'}}]},
 
{id: 'DawnbladeSeraph', name: 'Dawnblade Seraph', rarity: 'Common', image: 'Cards/egw/DawnbladeSeraph.png', flavor: '', 
 category: 'Creature', fight: 'Seraphic Strike', color:'White', type: ['Celestial','Warrior'], hp: 4, atk: 2, cost: '{w2}', ability: ['Flying','Protect'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w2}', eff: {class: 'summon'}},
	{name: 'Dash', cost: '{w}', eff: {class: 'Dash'}}]},

{id: 'ElementalofGleams', name: 'Elemental of Gleams', rarity: 'Common', image: 'Cards/ecw/ElementalofGleams.png', flavor: '', 
 category: 'Creature', fight: 'Light Strike', color: 'White', type: ['Light','Spirit'], hp: 3, atk: 1, cost: '{w}', ability: ['Elusive','Regenerate'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w}', eff: {class: 'summon'}},
	{name: 'Blinding Splendor', trig: 'attack', eff: {class: 'disable', target: 'opponentCreatures'}}]},

{id: 'Valkyrie', name: 'Valkyrie', rarity: 'Common', image: 'Cards/egw/Valkyrie.png', flavor: '', 
 category: 'Creature', fight: '', color: 'White', type: ['Radiant','Warrior'], hp: 4, atk: 2, cost: '{w}', ability: 'Defiant', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w}', eff: {class: 'summon'}}]},
         
{id: 'ShiningPigeonCaladrius', name: 'Shining Pigeon Caladrius', rarity: 'Common', image: 'Cards/egw/ShiningPigeonCaladrius.png', flavor: '', 
 category: 'Creature', fight: 'Radiant Strike', color: 'White', type: ['Holy','Avian'], hp: 2, atk: 0, cost: '{w}', ability: 'Flying', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w}', eff: {class: 'summon'}}]},

{id: 'WhitegroveHuntress', name: 'Whitegrove Huntress', rarity: 'Common', image: 'Cards/egw/WhitegroveHuntress.png', flavor: '', 
 category: 'Creature', fight: '', color: 'White', type: ['Radiant','Elf','Ranger'], hp: 3, atk: 2, cost: '{w2}', ability: '', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{w2}', eff: {class: 'summon'}}]},

{id: 'RadiantEnclave', name: 'Radiant Enclave', rarity: 'Common', image: 'Cards/egw/RadiantEnclave.png', flavor: '', 
 category: 'Terrain', color: 'White', type: ['Radiant','Terrain'], hp: 7, cost: '{w3}', essence: '{w}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{w3}', eff: {class: 'terraform'}}]},

{id: 'Plains', name: 'Plains', rarity: 'Common', image: 'Cards/egw/Plains.png', flavor: '', 
 category: 'Terrain', color: 'White', type: ['Radiant','Terrain'], essence: '{w2}', hp: 5, cost: '{w}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{w2}', eff: {class: 'terraform'}}]},

{id: 'HaloFlare', name: 'Halo Flare', rarity: 'Common', image: 'Cards/egw/HaloFlare.png', flavor: '', 
 category: 'Spell', color: 'White', type: ['Light','Spell'], cost: '{w2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{w2}', eff: {class: 'cast'}}]},

{id: 'EssenceBlessing', name: 'Essence Blessing', rarity: 'Common', image: 'Cards/egw/EssenceBlessing.png', flavor: '', 
 category: 'Spell', color: 'Colorless', cost: '{w}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{w}', eff: {class: 'cast'}},
	{name: 'Essence Blessing', eff: {class: 'heal', amount: 3}} ]},
         
// --- EG BLACK --- //
{id: 'MorvaneNoctyraOathbreaker', name: 'Morvane, Noctyra Oathbreaker', rarity: 'Legend', image: 'Cards/egb/MorvaneNoctyraOathbreaker.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Black', type: ['Zombie','Mage'], hp: 6, atk: 2, cost: '{b3}', ability: ['Immortal','Reanimate'], set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egb/MorvaneNoctyraOathbreakerFA.png', skill: [
	{name: 'Summon', cost: '{b3}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b3}', eff: {class: 'Reanimate'}},
	{name: 'Soul Barter', trig: 'attack', eff: [{class: 'spawn', targetId: 'Zombie'}, {class: 'bolster', atk: 1}, {class: 'wither', hp: 1]},
	{name: 'Deathless Vow', type: 'Zombie', eff: [{class: 'bolster', atk: 1}, {class: 'wither', hp: 1]}]},

{id: 'VelmiraMistressofSilence', name: 'Velmira, Mistress of Silence', rarity: 'Legend', image: 'Cards/egb/VelmiraMistressofSilence.png', flavor: '', 
 category: 'Creature', fight: 'Eternal Silence', color: 'Black', type: ['Umbral','Mage'], hp: 3, atk: 1, cost: '{b2}', ability: ['Seal','Veil'], set: ['ElementaGenesis','EssenceLegacy'], fullArt: 'Cards/egb/VelmiraMistressofSilenceFA.png', skill: [
	{name: 'Summon', cost: '{b}{b}', eff: {class: 'summon'}},
	{name: 'Shadowseal Vigor', passive: true, eff: {class: 'bolster', atk: 1, count: 'sealed'}},
	{name: 'Eternal Silence', trig: 'attack', cost: '{b}{x}', eff: {class: 'seal', amount: '{x}'}}]},

{id: 'Nocthyra', name: 'Nocthyra', rarity: 'Legend', image: 'Cards/egb/Nocthyra.png', flavor: '', 
 category: 'Terrain', color: 'Black', hp: 20, essence: '{b2}', type: ['Umbral','Domain'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Exaction', req: 'tap', discard: 1, eff: {class: 'draw', amount: 2}}]},

{id: 'UmbralNova', name: 'Umbral Nova', rarity: 'Legend', image: 'Cards/egb/UmbralNova.png', flavor: '', 
 category: 'Spell', color: 'Black', type: 'Dark', cost: '{b4}', mana: 2, set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{b4}', eff: {class: 'cast'}},
	{name: 'Umbral Nova', trig: 'summon', eff: {class: 'destroy', target: 'enemyUnits'}},
	{name: 'Umbral Nova', eff: {class: 'destroy', target: 'enemyUnits'}}]},

{id: 'NoctyraEnforcer', name: 'Noctyra Enforcer', rarity: 'Rare', image: 'Cards/egb/NoctyraEnforcer.png', flavor: '', 
 category: 'Creature', fight: 'Umbral Strike', color: 'Black', type: ['Umbral','Rogue'], hp: 3, atk: 0, cost: '{b3}', ability: 'Ambush', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{b3}', eff: {class: 'summon'}},
	{name: 'Shadowstrike', act: {class: 'assault'}, eff: {class: 'bolster', atk: 1}},
	{name: 'Umbral Retribution', act: {class: 'echo'}, eff: {class: 'destroy'}}]},

{id: 'GraveweaverWarlock', name: 'Graveweaver Warlock', rarity: 'Rare', image: 'Cards/egb/GraveweaverWarlock.png', flavor: '', 
 category: 'Creature', fight: 'Deathmarch Legionaire', color: 'Black', type: ['Dark','Orc','Mage'], hp: 6, atk: 3, cost: '{b4}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{b4}', eff: {class: 'summon'}},
	{name: 'Morbid Pact', req {obj: 'discard', q: 1}, cost: '{b}', eff: {class: 'add', type: 'Zombie'}},
	{name: 'Deathmarch Legionaire', trig: 'attack', cost: '{b2}', eff: {class: 'revive', id: 'Zombie', amount: 2}}]},

{id: 'ConquerorDeathknightDraugr', name: 'Conqueror Deathknight Draugr', rarity: 'Rare', image: 'Cards/egb/ConquerorDeathknightDraugr.png', flavor: '', 
 category: 'Creature', fight: 'Unending Siege', color: 'Black', type: ['Zombie','Warrior','Undead'], hp: 3, atk: 3, cost: '{b3}', ability: ['Defiant','Immortal','Reanimate'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{b3}', eff: {class: 'summon'}}, {name: 'Reanimate', cost: '{b3}', eff: {class: 'Reanimate'}},
	{name: 'Unending Siege', trig: 'assault', eff: {class: 'revive', id: 'Zombie', q: 1}},
	{name: 'Soul Vanquish', req 'discard', cost: '{b2}', eff: {class: 'destroy'}}]},

{id: 'ElementalofShadows', name: 'Elemental of Shadows', rarity: 'Rare', image: 'Cards/ecb/ElementalofShadows.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Black', type: ['Shadow','Spirit','Elemental'], hp: 4, atk: 3, cost: '{b3}', ability: ['Ambush','Elusive'], set: ['ElementaGenesis','EssenceLegacy'], skill: [	
	 {name: 'Summon', cost: '{b3}', eff: {class: 'summon'}},
	 {name: 'Umbral Discovery', trig: 'summon', eff: {class: 'add', color: 'Black', targetTrait: 'Terrain'}}]},

{id: 'GraveveilFields', name: 'Graveveil Fields', rarity: 'Rare', image: 'Cards/egb/GraveveilFields.png', flavor: '', 
 category: 'Terrain', color: 'Black', type: 'Undead', hp: 5, cost: '{b2}', essence: '{b}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{b2}', eff: {class: 'terraform'}},
	{name: 'Stagnant Mist Shackle', passive: true, eff: {class: 'inspire', target: 'allCreatures', type: 'Undead', inspire: 'Veil'}},
	{name: 'Soul Drain Seepage', act: {class: 'strike', type: 'Undead'}, eff: {class: 'Recover', amount: 2}}]},
         
{id: 'ElementalofShades', name: 'Elemental of Shades', rarity: 'Common', image: 'Cards/ecb/ElementalofShades.png', flavor: '', 
 category: 'Creature', fight: 'Shadow Strike', color: 'Black', type: ['Shadow','Spirit','Elemental'], hp: 2, atk: 1, cost: '{b}', ability: ['Ambush','Elusive'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{b}', eff: {class: 'summon'}}]},
         
{id: 'Skeleton', name: 'Skeleton', rarity: 'Common', image: 'Cards/egb/Skeleton.png', flavor: '', 
 category: 'Creature', fight: 'Bone Strike', color: 'Black', type: ['Bone','Undead'], hp: 1, atk: 1, cost: '{b}', ability: 'Reanimate', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{b}', eff: {class: 'summon'}}, {name: 'Reanimate', cost: '{b}', eff: {class: 'Reanimate'}}]},

{id: 'Zombie', name: 'Zombie', rarity: 'Common', image: 'Cards/egb/Zombie.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Black', type: 'Zombie', hp: 3, atk: 1, cost: '{b}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{b}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b}', eff: {class: 'reanimate'}}]},

{id: 'Ghost', name: 'Ghost', rarity: 'Common', image: 'Cards/egb/Ghost.png', flavor: '', 
 category: 'Creature', fight: 'Ghostly Strike', color: 'Black', type: ['Spirit', 'Undead'], hp: 1, atk: 1, cost: '{b}', ability: ['Elusive','Intimidate'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{b}', eff: {class: 'summon'}}]}, 

{id: 'Bat', name: 'Bat', rarity: 'Common', image: 'Cards/egb/Bat.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Black', type: 'Beast', hp: 3, atk: 1, cost: '{b}', ability: ['Drain','Flying'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Summon', cost: '{b}', eff: {class: 'summon'}}]},

{id: 'UmbrawindHollow', name: 'Umbrawind Hollow', rarity: 'Common', image: 'Cards/egb/UmbrawindHollow.png', flavor: '', 
 category: 'Terrain', color: 'Black', type: 'Shadow', hp: 6, cost: '{b3}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{b3}', eff: {class: 'terraform'}},
	{name: 'Silent Quarry', req: 'tap', eff: {class: 'Search', amount: 1, category: 'Creature', fight: '', targetAbility: 'Ambush'}}]},

{id: 'Shadowland', name: 'Shadowland', rarity: 'Common', image: 'Cards/egb/Shadowland.png', flavor: '', 
 category: 'Terrain', color: 'Black', type: ['Umbral','Terrain'], essence: '{b}', hp: 5, cost: '{b2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Terraform', cost: '{b2}', eff: {class: 'terraform'}}]},

{id: 'ShadowLeech', name: 'Shadow Leech', rarity: 'Common', image: 'Cards/egb/ShadowLeech.png', flavor: '', 
 category: 'Spell', color: 'Black', type: 'Shadow', cost: '{b}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{b}', eff: {class: 'cast'}},
	{name: 'Shadow Leech', trig: 'summon', mana: 1, eff: {class: 'strike', q: 3}},
	{name: 'Shadow Leech', req: 'tap', mana: 1, eff: {class: 'restore', q: 3}}]},
         
{id: 'EssencePurge', name: 'Essence Purge', rarity: 'Common', image: 'Cards/egb/EssencePurge.png', flavor: '', 
 category: 'Spell', color: 'Colorless', cost: '{b}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
	{name: 'Cast', cost: '{b}', eff: {class: 'cast'}},
	{name: 'Essence Purge', mana: 1, eff: {class: 'destroy', category: 'Unit'}, text: 'Destroy 1 enemy unit'}]},

// FRACTURED ORIGINS //

{id: 'SylvaniaThornvaleQueen', name: 'Sylvania, Thornvale Queen', rarity: 'Legend', image: 'Cards/Elf/SylvaniaThornvaleQueen.png', flavor: '', 
 category: 'Creature', fight: 'Elven Strike', color: 'Green', type: ['Elf','Mage'], hp: 2, atk: 1, cost: '{g}', ability: 'Bind', set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{g}', eff: {class: 'summon'}},
	{name: 'Bloomchant', cost: '{g}', req: 'tap', eff: {class: 'essenceGreen', amount: 2}},
	{name: "Briar Queen's Grasp", cost: '{g}', req: 'tap', eff: {class: 'Bind', amount: 1, target: 2}}]},
  
{id: 'VerdarokSylvanThornwing', name: 'Verdarok, Sylvan Thornwing', rarity: 'Legend', image: 'Cards/fog/VerdarokSylvanThornwing.png', flavor: '', 
 category: 'Creature', fight: 'Sylvan Burst', color: 'Green', type: ['Verdant','Dragon'], hp: 7, atk: 4, cost: '{g7}', ability: ['Flying','Vigor'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{g7}', eff: {class: 'summon'}},
	{name: 'Warden Scutes', trig: 'summon', eff: {class: 'inspire', def: 1, target: 'playerCreatures', type: 'Dragon'}},
	{name: 'Warden Scutes', cost: '{g}', req: 'discard', eff: {class: 'inspire', def: 1, color: 'green'}},
	{name: "Guardian's Rampart", cost: '{g2}', req: 'Special', eff: {class: 'Inspire', def: 1, target: 'PlayerCreatures', type: 'Dragon'}}]},

{id: 'VerdarokMossletGuardian', name: 'Verdarok, Mosslet Guardian', rarity: 'Rare', image: 'Cards/fog/VerdarokMossletGuardian.png', flavor: '', 
 category: 'Creature', fight: 'Verdant Strike', color: 'Green', type: ['Verdant','Dragon'], hp: 3, atk: 2, cost: '{g2}', ability: ['Flying','Regenerate'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Warden Scutes', trig: 'summon', eff: {class: 'inspire', def: 1, target: 'playerCreature', type: 'Dragon'}},
	{name: 'Warden Scutes', req: 'discard', cost: '{g}', eff: {class: 'inspire', def: 1, target: 'playerCreature', type: 'Dragon'}},
	{name: 'Rootwyrm Rising', trig: 'attack', eff: {class: 'strike', amount: 'sourceHp'}}]},
 
{id: 'ThicketmistDrakeling', name: 'Thicketmist Drakeling', rarity: 'Legend', image: 'Cards/fog/ThicketmistDrakeling.png', flavor: '', 
 category: 'Creature', fight: 'Verdant Strike', color: 'Green', type: ['Verdant','Dragon'], hp: 3, atk: 2, cost: '{g3}', ability: ['Flying','Vigor'], set: 'FracturedOrigins', skill: [
	{name: 'Summon', cost: '{g3}', eff: {class: 'summon'}},
	{name: 'Verdant Galeburst', cost: '{g}', trig: 'attack', eff: {class: 'Mossbound Terrain'}}]},
 
{id: 'VerdantLindwurm', name: 'Verdant Lindwurm', rarity: 'Legend', image: 'Cards/fog/VerdantLindwurm.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Dragon'], hp: 3, atk: 2, cost: '{g2}', ability: ['Flying','Regenerate'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Defender', act: {class: 'Defender'}, eff: {class: 'Search', archetype: 'Thornwing', amount: 1}}]},

{id: 'PyronyxInfernoBlazingscale', name: 'Pyronyx, Inferno Blazingscale', rarity: 'Legend', image: 'Cards/for/PyronyxInfernoBlazingscale.png', flavor: '', 
 category: 'Creature', fight: 'Inferno Burst', color: 'Red', type: ['Fire','Dragon'], hp: 6, atk: 3, cost: '{r6}', ability: ['Burn','Flying'], set: 'FracturedOrigins', skill: [
	{name: 'Summon', cost: '{r6}', eff: {class: 'summon'}},
	{name: 'Searing Outbreak', cost: '{r}', req: 'discard', eff: {class: 'burn', amount: 3}},
	{name: 'Cataclysmic Blaze', trig: 'attack', eff: {class: 'burn', q: 3, target: 'enemyCreatures'}}]},

{id: 'PyronyxEmberBreeze', name: 'Pyronyx, Ember Breeze', rarity: 'Rare', image: 'Cards/for/PyronyxEmberBreeze.png', flavor: '', 
 category: 'Creature', fight: 'Fire Strike', color: 'Red', type: ['Fire','Dragon'], hp: 3, atk: 2, cost: '{r2}', ability: ['Burn','Flying'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{r2}', eff: {class: 'summon'}},
	{name: 'Ignis Flutter', cost: '{r}', eff: {class: 'Dash'}},
	{name: 'Searing Outbreak', cost: '{r3}', eff: {class: 'burn', amount: 3, target: 2}}]},

{id: 'AbyndraTidalAbyssdrake', name: 'Abyndra, Tidal Abyssdrake', rarity: 'Legend', image: 'Cards/fou/AbyndraTidalAbyssdrake.png', flavor: '', 
 category: 'Creature', fight: 'Tidal Burst', color: 'Blue', type: ['Water','Dragon'], hp: 8, atk: 4, cost: '{u7}', ability: ['Dive','Flying','Soak'], set: 'FracturedOrigins', skill: [
	{name: 'Summon', cost: '{u7}', eff: {class: 'summon'}},
	{name: 'Reveal', cost: '{u}', eff: {class: 'Search', category: 'Terrain', color: 'Blue'}},
	{name: "Ocean's Requiem", cost: '{u2}', eff: {class: 'bury', target: 'enemyDeck'}},
	{name: 'Maelstrom Oblivion', cost: '{u3}', eff: [{class: 'drench', amount: 2, target: 3}, {class: 'Rain'}]}]},

{id: 'AbyndraRipplefinGloomlet', name: 'Abyndra, Ripplefin Gloomlet', rarity: 'Rare', image: 'Cards/fou/AbyndraRipplefinGloomlet.png', flavor: '', 
 category: 'Creature', fight: 'Water Strike', color: 'Blue', type: ['Water','Dragon'], hp: 3, atk: 2, cost: '{u2}', ability: ['Dive','Soak'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{u2}', eff: {class: 'summon'}},
	{name: 'Reveal', cost: '{u}', eff: {eff: 'Search', category: 'Terrain', color: 'Blue'}},
	{name: 'Mirror of the Deep', cost: '{u}{u}', eff: {class: '', amount: 3, status: 'Burn'}}]},

{id: 'AstranyraThunderbaneStrider', name: 'Astranyra, Thunderbane Strider', rarity: 'Legend', image: 'Cards/foy/AstranyraThunderbaneStrider.png', flavor: '', 
 category: 'Creature', fight: 'Thunder Strike', color: 'Yellow', type: ['Thunder','Rogue'], hp: 3, atk: 2, cost: '{y2}', ability: 'Pierce', set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{y2}', eff: {class: 'summon'}},
	{name: '', cost: '{y}', req: 'tap', eff: {class: 'Burn', amount: 3}}]},

{id: 'VoltrazekTempestStormrazor', name: 'Voltrazek, Tempest Stormrazor', rarity: 'Legend', image: 'Cards/foy/VoltrazekTempestStormrazor.png', flavor: '', 
 category: 'Creature', fight: 'Storm Burst', color: 'Yellow', type: ['Thunder','Dragon'], hp: 6, atk: 4, cost: '{y5}', ability: ['Static','Flying'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{y5}', eff: {class: 'summon'}},
	{name: 'Reveal', cost: '{y}', eff: {class: 'Search', category: 'Spell', color: 'Yellow'}},
	{name: 'Electro Burst', cost: '{y}', eff: {class: 'strike', amount: 1, target: 3}}]},

{id: 'VoltrazekSparkletStormling', name: 'Voltrazek, Sparklet Stormling', rarity: 'Rare', image: 'Cards/foy/VoltrazekSparkletStormling.png', flavor: '', 
 category: 'Creature', fight: 'Thunder Strike', color: 'Yellow', type: ['Thunder','Dragon'], hp: 3, atk: 2, cost: '{y2}', ability: ['Dash','Flying','Static'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{y2}', eff: {class: 'summon'}},
 	{name: 'Dash', cost: '{y}', eff: {class: 'dash'}},
	{name: 'Overcharge', cost: '{y}{y}{y}', eff: [{class: 'Overcharge'}, {class: 'Inspire', ability: 'Rush'}]},
	{name: 'Gigavolt Prance', cost: '{y}', trig: 'attack', eff: {class: '', amount: 1}}]},

{id: 'MyxarothCursedDreadspine', name: 'Myxaroth, Cursed Dreadspine', rarity: 'Legend', image: 'Cards/fop/MyxarothCursedDreadspine.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Purple', type: ['Corrupted','Dragon'], hp: 6, atk: 4, cost: '{p7}', ability: ['Flying','Curse'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{p7}', eff: {class: 'summon'}}, {name: 'Reanimate', cost: '{p7}', eff: {class: 'reanimate'}},
	{name: 'Discard', cost: '{p}', req: 'discard', eff: {class: 'poison', amount: 2}},
	{name: 'Toxic Miasma', cost: '{p}', eff: {class: 'Toxic Miasma'}}]},

{id: 'MyxarothToxletMireling', name: 'Myxaroth, Toxlet Mireling', rarity: 'Rare', image: 'Cards/fop/MyxarothToxletMireling.png', flavor: '', 
 category: 'Creature', fight: 'Toxic Strike', color: 'Purple', type: ['Cursed','Dragon'], hp: 3, atk: 2, cost: '{p2}', ability: ['Flying','Curse'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{p2}', eff: {class: 'summon'}},
	{name: 'Discard', cost: '{p}', eff: {class: 'Decay'}},
	{name: 'Acidblight Swell', cost: '{p}{p}', eff: {class: 'Toxic Miasma'}}]},

{id: 'FerronyxTerraIronclaw', name: 'Ferronyx, Terra Ironclaw', rarity: 'Legend', image: 'Cards/foc/FerronyxTerraIronclaw.png', flavor: 'Forged in the bones of the earth, its scales of stone and iron ring like shields in battle.', 
 category: 'Creature', fight: 'Terra Burst', color: 'Gray', type: ['Steel','Dragon'], hp: 6, atk: 4, cost: '{c7}', ability: ['Armor','Flying'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{c7}', eff: {class: 'summon'}},
	{name: 'Metalwing Command', cost: '{c}', req: 'discard', eff: {class: 'Armor'}},
	{name: 'Unbreakable Adamant', cost: '{c2}', eff: {class: 'Armor', target: 'playerCreatures'}}]},
 
{id: 'FerronyxIronhideStonelet', name: 'Ferronyx, Ironhide Stonelet', rarity: 'Rare', image: 'Cards/foc/FerronyxIronhideStonelet.png', flavor: '', 
 category: 'Creature', fight: 'Steel Strike', color: 'Gray', type: ['Steel','Dragon'], hp: 3, atk: 2, cost: '{c2}', ability: ['Armor','Flying'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{c2}', eff: {class: 'summon'}},
	{name: 'Reveal', cost: '{c}', eff: {class: 'Armor'}},
	{name: 'Ironbound Bash', trig: {attack: true}. checK: {armor: 'higher', attacker: true, defender: flase}, eff: {class: 'destroy', target: enemyDefending}},
	{name: 'Forgelight Mantle', cost: '{c}{c}', eff: {class: 'Armor', target: 'playerCreatures'}}]},
 
{id: 'FerronyxShardletGrindlewyrm', name: 'Ferronyx, Shardlet Grindlewyrm', rarity: 'Rare', image: 'Cards/foc/FerronyxShardletGrindlewyrm.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Gray', type: ['Steel','Dragon'], hp: 2, atk: 2, cost: '{1}{c}', ability: 'Flying', set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{1}{c}', eff: {class: 'summon'}},
	{name: 'Reveal', cost: '{c}', eff: {class: 'Armor'}},
	{name: 'Forgelight Mantle', cost: '{c}{c}', eff: {class: 'Armor', target: 'playerCreatures'}}]},

{id: 'SolarythRadiantSolarwyrm', name: 'Solaryth, Radiant Solarwyrm', rarity: 'Legend', image: 'Cards/fow/SolarythRadiantSolarwyrm.png', flavor: '', 
 category: 'Creature', fight: 'Radiant Burst', color: 'White', type: ['Light','Dragon'], hp: 8, atk: 4, cost: '{w7}', ability: ['Flying','Aegis'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{w7}', eff: {class: 'summon'}},
	{name: 'Celestial Scales', req: 'discard', eff: {class: 'inspire', ability: 'Aegis'}}]},
 
{id: 'SolarythGlintletDawnbloom', name: 'Solaryth, Glintlet Dawnbloom', rarity: 'Rare', image: 'Cards/fow/SolarythGlintletDawnbloom.png', flavor: '', 
 category: 'Creature', fight: 'Light Strike', color: 'White', type: ['Light','Dragon'], hp: 3, atk: 2, cost: '{w2}', ability: ['Flying','Aegis'], set: 'WyrmheartAwakening', skill: [
 	{name: 'Summon', cost: '{w2}', eff: {class: 'summon'}},
	{name: 'Seal', cost: '{w}{w}', eff: {class: 'Seal'}},
	{name: 'Dawnveil Benediction', cost: '{w}', eff: {class: 'Daybreak Field'}}]},

{id: 'NyzarielArchdemonDuchess', name: 'Nyzariel, Archdemon Duchess', rarity: 'Legend', image: 'Cards/fob/NyzarielArchdemonDuchess.png', flavor: '', 
 category: 'Creature', fight: 'Archdemon Burst', color: 'Black', type: ['Demon','Mage'], hp: 3, atk: 2, cost: '{b2}', ability: 'Conceal', set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{b2}', eff: {class: 'summon'}},
	{name: '', cost: '{1}{b}', eff: {class: 'Burn', amount: 3}},
	{name: 'Soulrend Sovereignty', cost: '{b}', req: {obj: 'destroy', target: 'playerCreatures', q:1}, eff: {class: 'Destroy', target: 1 }}]},

{id: 'NoctyrosUmbralNightshroud', name: 'Noctyros, Umbral Nightshroud', rarity: 'Legend', image: 'Cards/fob/NoctyrosUmbralNightshroud.png', flavor: '', 
 category: 'Creature', fight: 'Umbral Burst', color: 'Black', type: ['Dark','Dragon'], hp: 6, atk: 4, cost: '{b6}', ability: ['Flying','Seal'], set: 'FracturedOrigins', skill: [
	{name: 'Summon', cost: '{b6}', eff: {class: 'summon'}}, {name: 'Reanimate', cost: '{b6}', eff: {class: 'reanimate'}},
	{name: 'Discard', cost: '{b}', req: 'discard', eff: {class: 'Mill', type: 'Dragon'}},
	{name: 'Nightfall Surge', cost: '{b}', eff: {class: ''}}]},
 
{id: 'NoctyrosDuskWhisper', name: 'Noctyros, Dusk Whisper', rarity: 'Rare', image: 'Cards/fob/NoctyrosDuskWhisper.png', flavor: '', 
 category: 'Creature', fight: 'Dark Strike', color: 'Black', type: ['Dark','Dragon'], hp: 3, atk: 2, cost: '{b2}', ability: ['Flying','Reanimate'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{b2}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b2}', eff: {class: 'reanimate'}},
	{name: 'Discard', cost: '{b}', eff: {class: 'Mill', type: 'Dragon'}},
	{name: 'Nightfall Surge', cost: '{b}', req: [{class: 'Special'}, {class: 'CCW'}], eff: {class: ''}}]},

{id: 'Imp', name: 'Imp', rarity: 'Common', image: 'Cards/fob/Imp.png', flavor: '', 
 category: 'Creature', fight: 'Demonic Strike', color: 'Black', type: 'Demon', hp: 2, atk: 2, cost: '{b}', ability: ['Ambush','Flying'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{b}', eff: {class: 'summon'}}]},

{id: 'KaelyraFirelandHeiress', name: 'Kaelyra, Fireland Heiress', rarity: 'Legend', image: 'Cards/egr/KaelyraFirelandHeiress.png', flavor: '', fullArt: 'Cards/Fireland/KaelyraFirelandHeiressFA.png', flavor: '',
 category: 'Creature', fight: 'Fire Burst', color: 'Red', type: ['Fire','Mage'], hp: 4, atk: 2, cost: '{r2}', ability: 'Burn', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{r2}', eff: {class: 'summon'}},
	{name: 'Conflagration', trig: 'summon', eff: {class: 'add', category: 'Spell', type: 'Fire'}},
	{name: 'Conflagration', trig: 'attack', eff: {class: 'add', category: 'Spell', type: 'Fire'}},
	{name: 'Flametongue Invocation', cost: '{r}', eff: {class: 'spawn', type: 'Fire'}}]},

{id: 'TydrosCoralboundTidebreaker', name: 'Tydros, Coralbound Tidebreaker', rarity: 'Legend', image: 'Cards/Coralbound/TydrosCoralboundTidebreaker.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Blue', type: 'Water', hp: 5, atk: 2, cost: '{u3}', ability: ['Dive','Soak'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{u3}', eff: {class: 'summon'}},
	{name: 'Brine Embrace', cost: '{u}', eff: {class: 'Inspire', drenchedArmor: 3, target: 1}},
	{name: 'Hydrosurge Wave', cost: '{u2}', eff: [{class: 'destroy', q: 1, target: 'enemyUnits'}, {class: 'drench', target: 'enemyUnits'}]}]},

{id: 'AngelicPaladin', name: 'Angelic Paladin', rarity: 'Common', image: 'Cards/fow/AngelicPaladin.png', flavor: '', 
 category: 'Creature', fight: '', color:'White', type: ['Angel','Spirit'], hp: 4, atk: 2, cost: '{w3}', ability: ['Armor','Protect'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{w3}', eff: {class: 'summon'}},
	{name:'Dash', cost: '{1}{w}', eff: {class: 'Dash'}}]},
 
{id: 'ShadeWisp', name: 'Shade Wisp', rarity: 'Common', image: 'Cards/ecb/ShadeWisp.png', flavor: '', 
 category: 'Creature', fight: 'Shadow Bash', color: 'Black', type: ['Shadow','Spirit','Elemental'], hp: 2, atk: 1, cost: '{b}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{b}', eff: {class: 'summon'}},
	{name: '', cost: '{b}', eff: {class: 'Burn', amount: 3}}]},
 
{id: 'ShadeMurkkin', name: 'Shade Murkkin', rarity: 'Common', image: 'Cards/ecb/ShadeMurkkin.png', flavor: '', 
 category: 'Creature', fight: 'Shadow Ram', color: 'Black', type: ['Shadow','Elemental'], hp: 3, atk: 2, cost: '{b2}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{b2}', eff: {class: 'summon'}},
	{name: '', cost: '{b}', eff: {class: 'Burn', amount: 3}}]},

{id: 'ShadeReaver', name: 'Shade Reaver', rarity: 'Rare', image: 'Cards/ecb/ShadeReaver.png', flavor: '', 
 category: 'Creature', fight: 'Shadow Cleave', color: 'Black', type: ['Shadow','Elemental'], hp: 4, atk: 3, cost: '{b3}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{b3}', eff: {class: 'summon'}},
  	{name: '', cost: '{b}', eff: {class: 'Burn', amount: 3}}]},

{id: 'OrrkalDevouringIncarnate', name: "Orr'kal, Devouring Incarnate", rarity: 'Legend', image: 'Cards/ecb/OrrkalDevouringIncarnate.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Black', type: ['Shadow','Elemental','Fusion'], hp: 2, atk: 0, cost: '{b6}', ability: ['Dissolve','Fusion'], set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{b6}', eff: {class: 'summon'}},
	{name: 'Fusion', eff: {class: 'fusion', type: ['Shadow','Spirit']}},
	{frenzy: true, eff: {class: 'dissolve'}},
  	{name: '', cost: '{b}', req: {class: 'CCW'}, eff: {class: 'Burn', amount: 3}}]},
 
{id: 'ShadowgearScout', name: 'Shadowgear Scout', rarity: 'Rare', image: 'Cards/ecb/ShadowgearScout.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Black', type: ['Shadow','Steel','Spirit','Construct'], hp: 2, atk: 2, cost: '{b2}', ability: ['Armor','Dissolve'], set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{b2}', eff: {class: 'summon'}},
  	{name: '', trig: 'echo', eff: {class: 'summon', id: 'Shade'}}]},
 
{id: 'ShadowgearAutomaton', name: 'Shadowgear Automaton', rarity: 'Rare', image: 'Cards/ecb/ShadowgearAutomaton.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Black', type: ['Shadow','Steel','Spirit','Construct'], hp: 2, atk: 3, cost: '{b3}', ability: ['Armor','Dissolve'], set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{b3}', eff: {class: 'summon'}},
	{name: '', trig: 'echo', eff: {class: 'summon', id: 'Shade'}}]},
 
{id: 'SummitWatcher', name: 'Summit Watcher', rarity: 'Common', image: 'Cards/Faefolk/SummitWatcher.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Gray', type: 'Satyr', hp: 3, atk: 1, cost: '{c}', ability: 'Focus', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{c}', eff: {class: 'summon'}}]},
 
{id: 'WildhornRavager', name: 'Wildhorn Ravager', rarity: 'Common', image: 'Cards/Faefolk/WildhornRavager.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Gray', type: ['Beast','Satyr'], hp: 5, atk: 2, cost: '{c3}', ability: ['Rush','Fervor'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{c3}', eff: {class: 'summon'}}]},
 
{id: 'ElderwoodOccultist', name: 'Elderwood Occultist', rarity: 'Common', image: 'Cards/Faefolk/ElderwoodOccultist.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Purple', type: ['Satyr','Mage'], hp: 3, atk: 2, cost: '{p2}', ability: '', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{p2}', eff: {class: 'summon'}},
  	{name: 'Discard', cost: '{r}', req: {class: 'Discard'}, eff: {class: 'strike', amount: 0, status: 'Burn'}}]},

{id: 'HeartwoodEmeralds', name: 'Heartwood Emeralds', rarity: 'Common', image: 'Cards/ecg/HeartwoodEmeralds.png', flavor: '', 
 category: 'Artifact', color: 'Green', type: 'Relic', hp: 8, cost: '{g2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Equip', cost: '{g2}', eff: {class: 'Equip'}}]},
 
{id: 'EmeraldVeil', name: 'Emerald Veil', rarity: 'Rare', image: 'Cards/ecg/EmeraldVeil.png', flavor: '', 
 category: 'Terrain', color: 'Green', hp: 8, cost: '{g}', essence: '{g}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Terraform', cost: '{g}', eff: {class: 'terraform'}}]},
 
{id: 'WaterElemental', name: 'Water Elemental', rarity: 'Common', image: 'Cards/fou/WaterElemental.png',  flavor: '',
 category: 'Creature', fight: '', color: 'Blue', type: ['Water','Spirit','Elemental'], hp: 5, atk: 1, cost: '{u}', ability: ['Elusive','Soak'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{u}', eff: {class: 'summon'}}]},

{id: 'Wolf', name: 'Wolf', rarity: 'Common', image: 'Cards/Beast/Wolf.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Black', type: ['Dark','Beast'], hp: 3, atk: 2, cost: '{b}', ability: ['Ambush','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{b2}', eff: {class: 'summon'}},
	{name: 'Transform', tribute: true, cost: '{b2}', eff: {class: 'summon', id: 'Werewolf'}}]},
 
{id: 'ForestMage', name: 'Forest Mage', rarity: 'Common', image: 'Cards/Arbor/ForestMage.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Spirit','Mage'], hp: 5, atk: 2, cost: '{g2}', ability: '', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Bloomchant', req: {class: 'CW'}, eff: {class: 'Essence', color: '{G}', amount: 1}}]},

{id: 'ArborColossus', name: 'Arbor Colossus', rarity: 'Common', image: 'Cards/ecg/ArborColossus.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Spirit'], hp: 5, atk: 2, cost: '{g2}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Bloomchant', req: 'tap', eff: {class: 'Essence', color: '{g}', amount: 1}}]},

{id: 'GroveMage', name: 'Grove Mage', rarity: 'Common', image: 'Cards/Arbor/GroveMage.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Construct'], hp: 3, atk: 2, cost: '{g2}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Bloomchant', req: {class: 'CW'}, eff: {class: 'Essence', color: '{G}', amount: 1}}]},
 
{id: 'GroveWatcher', name: 'Grove Watcher', rarity: 'Common', image: 'Cards/ecg/GroveWatcher.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Spirit'], hp: 5, atk: 2, cost: '{g3}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{g3}', eff: {class: 'summon'}},
	{name: 'Bloomchant', req: 'tap', eff: {class: 'Essence', color: '{G}', amount: 1}}]},
 
{id: 'VerdantSage', name: 'Verdant Sage', rarity: 'Rare', image: 'Cards/ecg/VerdantSage.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Spirit','Elemental','Mage'], hp: 7, atk: 2, cost: '{g3}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{g3}', eff: {class: 'summon'}},
	{name: 'Bloomchant', req: {class: 'CW'}, eff: {class: 'Essence', color: '{G}', amount: 1}}]},

{id: 'VerdantGolemite', name: 'Verdant Golemite', rarity: 'Rare', image: 'Cards/ecg/VerdantGolemite.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: 'Elemental', trait: ['Verdant','Golem'], hp: 2, atk: 2, def: 2, cost: '{g}{c}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{1}{b}', eff: {class: 'summon'}},
	{name: 'Bloomchant', req: {class: 'CW'}, eff: {class: 'Essence', color: '{G}', amount: 1}}]},
 
{id: 'SylvanManifestation', name: 'Sylvan Manifestation', rarity: 'Rare', image: 'Cards/ecg/SylvanManifestation.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Spirit','Elemental'], hp: 5, atk: 2, cost: '{g4}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{g4}', eff: {class: 'summon'}},
	{name: 'Bloomchant', req: {class: 'CW'}, eff: {class: 'Essence', color: '{G}', amount: 1}}]},

{id: 'JadebarkWarden', name: 'Jadebark Warden', rarity: 'Rare', image: 'Cards/ecg/JadebarkWarden.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Construct'], hp: 5, atk: 2, cost: '{g2}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Bloomchant', req: {class: 'CW'}, eff: {class: 'Essence', color: '{G}', amount: 1}}]},

{id: 'ElarisGroveLeafcaller', name: 'Elaris, Grove Leafcaller', rarity: 'Legend', image: 'Cards/ecg/ElarisGroveLeafcaller.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Verdant','Satyr','Mage'], hp: 5, atk: 2, cost: '{g2}{b}', ability: '', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{g2}{b}', eff: {class: 'summon'}},
	{name: 'Bloomchant', eff: {class: 'Essence', color: '{G}', amount: 1}}]},

{id: 'DragonEgg', name: 'Dragon Egg', rarity: 'Common', image: 'Cards/fon/DragonEgg.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Colorless', type: 'Dragon', hp: 1, atk: 0, cost: '{r}', set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{r}', eff: {class: 'summon'}},
	]},

{id: 'WaterWyrm', name: 'Water Wyrm', rarity: 'Common', image: 'Cards/fou/WaterWyrm.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Blue', type: ['Water','Dragon','Elemental'], hp: 6, atk: 2, 
 cost: '{u}', ability: ['Dive','Elusive','Soak'], set: 'FracturedOrigins'},

{id: 'ZephyraHarpy', name: 'Zephyra Harpy', rarity: 'Rare', image: 'Cards/ecy/ZephyraHarpy.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Yellow', type: 'Avian', hp: 4, atk: 2, cost: '{y2}', ability: 'Flying', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{y2}', eff: {class: 'summon'}}]},
 
{id: 'AnvilgateDwarf', name: 'Anvilgate Dwarf', rarity: 'Rare', image: 'Cards/foc/AnvilgateDwarf.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Gray', type: ['Dwarf','Warrior'], hp: 4, atk: 2, cost: '{c2}', ability: '', set: 'FracturedOrigins'},

{id: 'EnchantedBranchesSpriggan', name: 'Enchanted Branches Spriggan', rarity: 'Rare', image: 'Cards/ecg/EnchantedBranchesSpriggan.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Green','Black'], type: ['Verdant','Spirit','Mage'], hp: 4, atk: 2, cost: '{g2}{p}', ability: 'Vigor', set: 'DesolateFrontiers', skill: [
 	{name: 'Summon', cost: '{g}{b}', eff: {class: 'summon'}},
	{name: 'Manifest', cost: '{g}{b}', req: {class: 'Special'}, eff: {class: 'spawn', id: 'Treant'}},
	{name: 'Recycle', cost: '{g}{b}', req: {class: 'Recycle'}, eff: {class: 'spawn', id: 'Treant'}}]},

{id: 'AngelicWarrior', name: 'Angelic Warrior', rarity: 'Common', image: 'Cards/Seraph/AngelicWarrior.png', flavor: '', 
 category: 'Creature', fight: '', color: 'White', type: ['Angel','Warrior'], hp: 4, atk: 2, cost: '{w2}', ability: 'Flying', set: 'FracturedOrigins'},

{id: 'SacredKirin', name: 'Sacred Kirin', rarity: 'Rare', image: 'Cards/dfw/SacredKirin.png', flavor: '', 
 category: 'Creature', fight: '', color: 'White', type: ['Mythical','Beast'], hp: 7, atk: 4, cost: '{w3}', ability: 'Rush', set: 'DesolateFrontiers', skill: [
	{name: 'Summon', cost: '{w3}', eff: {class: 'summon'}},
	{name: 'Heavenstep Radiance', cost: '{w}', req: {class: 'CCW'}, eff: {class: 'strike', amount: 3}}]},

{id: 'DragonsApprentice', name: "Dragon's Apprentice", rarity: 'Common', image: 'Cards/fon/DragonsApprentice.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Colorless', type: 'Dragon', hp: 3, atk: 2, cost: '{r}', ability: 'Flying', set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{r}', eff: {class: 'summon'}}]},

{id: 'Jackalope', name: 'Jackalope', rarity: 'Common', image: 'Cards/dfg/Jackalope.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Green','Black'], type: ['Mythical','Beast'], hp: 4, atk: 2, cost: '{g}{b}', ability: '', set: 'DesolateFrontiers', skill: [
 	{name: 'Summon', cost: '{g}{b}', eff: {class: 'summon'}}
	{name: 'Echo', cost: '{0}', req: {class: 'Echo', archetype: 'Hybrid'}, eff: {class: 'Search', archetype: 'Hybrid'}}]},

{id: 'DarkHarpy', name: 'Dark Harpy', rarity: 'Common', image: 'Cards/Zephyra/DarkHarpy.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Yellow','Black'], type: ['Dark','Avian'], hp: 4, atk: 3, cost: '{y2}{b}', ability: 'Flying', set: 'FeatheredOmen', skill: [
 	{name: 'Summon', cost: '{y2}{b}', eff: {class: 'summon'}},
	{name: 'Dash', cost: '{y}{b}', eff: {class: 'Dash'}}]},
 
{id: 'GildedBladedancer', name: 'Gilded Bladedancer', rarity: 'Common', image: 'Cards/ecg/GildedBladedancer.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Green', type: ['Fairy','Warrior'], hp: 3, atk: 2, cost: '{g2}', ability: ['Flying','Rush'], set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{g2}', eff: {class: 'summon'}},
	{name: 'Dash', cost: '{g}', eff: {class: 'Dash'}}]},

{id: 'FirelandLynx', name: 'Fireland Lynx', rarity: 'Common', image: 'Cards/egr/FirelandLynx.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Red', type: ['Fire','Beast'], hp: 3, atk: 2, cost: '{r}', ability: ['Burn','Leap','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{r}', eff: {class: 'summon'}}]},
 
{id: 'FirelandKitsune', name: 'Fireland Kitsune', rarity: 'Common', image: 'Cards/egr/FirelandKitsune.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Red', type: ['Fire','Beast'], hp: 4, atk: 2, cost: '{1}{r}', ability: ['Burn','Leap','Rush'], set: 'SavageTerritory', skill: [
 	{name: 'Summon', cost: '{0}', eff: {class: 'summon'}},
	{name: 'Beast Arrival', cost: '{r}{r}', act: {class: 'Arrival', type: 'Beast'}, eff: {class: 'add', archetype: 'Fireland'}}]},
 
{id: 'FlamingDirebeast', name: 'Flaming Direbeast', rarity: 'Rare', image: 'Cards/egr/FlamingDirebeast.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Red', type: ['Fire','Beast'], hp: 6, atk: 3, cost: '{r4}', ability: ['Burn','Rush'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{r4}', eff: {class: 'summon'}}, {trig: 'summon', eff: {class: 'rush'}},
	{name: 'Searing Haste', trig: 'attack', eff: {class: 'bolster', atk: 1, type: ['Fire','Beast']}},
	{name: 'Spirit Stoke', req: void, eff: {class: 'bolster', atk: 1, type: ['Fire','Beast']}}]},
 
{id: 'EphorosFirelandBehemoth', name: 'Ephoros, Fireland Behemoth', rarity: 'Legend', image: 'Cards/dfr/EphorosFirelandBehemoth.png', flavor: '', fullArt: 'Cards/Fireland/EphorosFirelandBehemothFA.png', flavor: '',
 category: 'Creature', fight: 'Hellflame Onslaught', color: ['Red','Black'], type: ['Fire','Beast','Demon'], hp: 7, atk: 4, cost: '{r4}{b2}', ability: ['Burn','Rush','Reanimate'], set: 'EchoesofCreation', skill: [
	{name: 'Summon', cost: '{r4}{b2}', eff: {class: 'summon'}},
	{name: 'Infernal Volley', cost: '{r}', req: discard, eff: {class: 'Burn', amount: 3}, text: 'Discard to burn {3}'},
	{name: 'Hellflame Onslaught', summont: true, eff: {class: 'inspire', atk: 1, target: 'playerCreatures', type: ['Fire','Demon']}, text: 'Rally {1} to allied fire demons'}]},

// GOLEMHEART //
{id: 'PyrokragGolemheartTitan', name: 'Pyrokrag, Golemheart Titan', rarity: 'Legend', image: 'Cards/ecr/PyrokragGolemheartTitan.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Red','Gray'], type: ['Fire','Rock','Spirit','Golem'], hp: 8, atk: 5, cost: '{r7}{c3}', ability: ['Armor''Burn','Fusion'], set: 'FracturedOrigins', skill: [
	{name: 'Summon', cost: '{r7}{c3}', eff: {class: 'summon'}},
	{name: 'Fusion', eff: {class: 'fusion', type: ['Fire','Rock']}},
	{name: 'Magma Catalyst', req: discard, eff: [{class: 'bury', q: 2, type: ['Fire','Rock']}, {class: 'burn', q: 'playerFallen', type: 'Fire'}], 
	 text: 'Discard this ally, bury 2 fire rock allies and burn {1} for each fallen fire ally.'},
	{name: 'Moltern Aegis Nova', cost: '{r2}{c}', eff: [{class: 'wither', atk:1, hp:3}, {class: 'destroy', blight: 'burned', target: 'allField'}, {class: 'burn', amount: 3, target: 3}],
	 text: 'Lose -{1}/-{3}, destroy all burned creatures and burn strike 2 to all enemies.'}]},
 
{id: 'GolemheartGiant', name: 'Golemheart Giant', rarity: 'Rare', image: 'Cards/ecr/GolemheartGiant.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Red', 'Gray'], type: ['Fire','Golem'], hp: 5, atk: 4, cost: '{r4}{c2}', ability: 'Scorch', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{r4}{c2}', eff: {class: 'summon'}},
	{name: 'Fusion', eff: {class: 'fusion', type: ['Fire','Rock']}},
	{name: 'Echo', trig: 'echo', eff: {class: 'Inpire', armor: 2}}]},
 
{id: 'SmolderingGolem', name: 'Smoldering Golemheart', rarity: 'Rare', image: 'Cards/ecr/SmolderingGolemheart.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Red','Gray'], type: ['Fire','Rock','Spirit','Golem'], hp: 5, atk: 4, cost: '{r5}{c2}', ability: ['Armor','Burn'], set: 'PrimordialAscension', skill: [
 	{name: 'Summon', cost: '{r5}{c2}', eff: {class: 'summon'}},
	{name: 'Fusion', eff: {class: 'fusion', type: ['Fire','Rock']}},
	{name: 'Emberplate Detonation', cost: '{r}', eff: {class: 'Burn', amount: 2, target: 3}}]},

{id: 'FireGolem', name: 'Fire Golem', rarity: 'Common', image: 'Cards/ecr/FireGolem.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Red','Gray'], type: ['Fire','Rock','Spirit','Golem'], hp: 3, atk: 2, cost: '{r2}{c}', ability: ['Armor','Burn'], set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{r2}{c}', eff: {class: 'summon'}},
	{name: 'Magma Catalyst', trig: 'summon', eff: {class: 'bury', type: ['Fire','Rock']}},
	{name: 'Echo', trig: 'echo', eff: {class: 'burn', q: 3}}]},

{id: 'KaelgorranElementalPrimordial', name: 'Kaelgorran, Elemental Primordial', rarity: 'Legend', image: 'Cards/ecn/KaelgorranElementalPrimordial.png', flavor: '', fullArt: 'Cards/Golems/KaelgorranElementalPrimordialFA.png', flavor: '',
 category: 'Creature', fight: '', color: ['Gray'], type: ['Golem','Fusion'], hp: 7, atk: 4, cost: '{c9}', set: 'EchoesofCreation', skill: [
 	{name: 'Summon', cost: '{5}{c}', eff: {class: 'summon'}},
	{name: 'Fusion', eff: {class: 'fusion', type: 'Rock'}},
	{name: 'Discard', cost: '{c}', req: {class: 'Discard'}, eff: {class: 'Search', type: 'Golem'}},
	{name: 'Echo', act: {class: 'Echo'}, eff: {class: 'spawn', targetId: 'Golemite', amount: 2}},]},

{id: 'AcidicGolem', name: 'Acidic Golem', rarity: 'Rare', image: 'Cards/ecp/AcidicGolem.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Purple', 'Gray'], type: ['Toxic','Golem'], hp: 5, atk: 3, cost: '{p3}{c2}', ability: 'Poisonous', set: 'PrimordialAscension', skill: [
	{name: 'Summon', cost: '{3}{p}', eff: {class: 'summon'}}]},

// CINDERCORE //
{id: 'CinderScout', name: 'Cinder Scout', rarity: 'Common', image: 'Cards/ihr/CinderScout.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Red', type: ['Fire','Steel','Spirit','Construct'], hp: 1, atk: 1, cost: '{r}', ability: ['Armor','Burn','Exploit'], set: 'InfiniteHorizons', skill: [
 	{name: 'Summon', cost: '{r}', eff: {class: 'summon'}},
	{name: 'Discard', cost: '{r}', req: {class: 'Discard'}, eff: [{class: 'Search', archetype: 'Cindercore'}, {class: 'Burn', amount: 0}]}]},

{id: 'CindercoreSentry', name: 'Cindercore Sentry', rarity: 'Common', image: 'Cards/ihr/CindercoreSentry.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Red', type: ['Fire','Steel','Spirit','Construct'], hp: 2, atk: 1, cost: '{r2}', ability: ['Armor','Burn','Exploit'], set: 'InfiniteHorizons', skill: [
 	{name: 'Summon', cost: '{r2}', eff: {class: 'summon'}},
	{name: 'Pyrosurge Protocol', trig: 'summon', eff: [{class: 'add', type: ['Fire','Steel']}, {class: 'burn', q: 1}]}]},

{id: 'CindercoreProtector', name: 'Cindercore Protector', rarity: 'Rare', image: 'Cards/ihr/CindercoreProtector.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Red', type: ['Fire','Steel','Spirit','Construct'], hp: 3, atk: 2, cost: '{r4}', ability: ['Armor','Burn','Exploit','Protect'], set: 'InfiniteHorizons', skill: [
 	{name: 'Summon', cost: '{r4}', eff: {class: 'summon'}},
	{name: 'Volcanic Vortex', cost: '{1}{R}', eff: {class: 'strike', amount: 3, status: ['Burn','Bind']}}]},

{id: 'CindercoreVanguard', name: 'Cindercore Vanguard', rarity: 'Common', image: 'Cards/ihr/CindercoreVanguard.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Red', type: ['Fire','Construct'], hp: 3, atk: 2, cost: '{r3}', ability: ['Armor','Burn','Exploit','Rush'], set: 'InfiniteHorizons', skill: [
 	{name: 'Summon', cost: '{r3}', eff: {class: 'summon'}},
	{name: 'Fire Pulse', cost: '{r}', eff: {class: 'Burn', amount: 1, target: 2}}]},

{id: 'CinderGolem', name: 'Cinder Golem', rarity: 'Common', image: 'Cards/ecr/CinderGolem.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Red', 'Gray'], type: ['Fire','Golem'], hp: 5, atk: 4, cost: '{r4}', ability: '', set: 'IronbornProtocol', skill: [
 	{name: 'Summon', cost: '{r4}', eff: {class: 'summon'}},
	{name: 'Volcanic Vortex', cost: '{r2}', eff: {class: 'strike', amount: 3, status: ['Burn','Bind']}}]},

{id: 'IgnavarynCindercoreAutomaton', name: 'Ignavaryn, Cindercore Automaton', rarity: 'Legend', image: 'Cards/ihr/IgnavarynCindercoreAutomaton.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Red', type: ['Fire','Construct'], cost: {r7}, hp: 8, atk: 4, ability: ['Armor','Burn','Exploit'], set: 'InfiniteHorizons', skill: [
 	{name: 'Summon', cost: '{r7}', eff: {class: 'summon'}},
	{name: 'Fusion', eff: {class: 'fusion', ep: {r}, type: ['Fire','Steel']}},
	{name: 'Pyrosurge Protocol', req: discard, eff: {class: 'burn', q: 2}, text: 'Discard and burn {2} to an enemy'},
	{name: 'Pyrocore Overdrive', trig: 'echo', eff: {class: 'burn', target: 'enemyCreatures'}, text: 'Burn all enemies.'},
	{name: 'Thermal Overdrive', cost: '{r}{r}{r}', eff: {class: 'Burn', amount: 3, target: 3}}]},
 
// CORALBOUND //
{id: 'CoralDrone', name: 'Coral Drone', rarity: 'Common', image: 'Cards/ihu/CoralDrone.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Blue', type: ['Water','Construct'], hp: 1, atk: 1, cost: '{u}', ability: ['Armor','Exploit','Soak'], set: 'InfiniteHorizons', skill: [
	{name: 'Summon', cost: '{u}', eff: {class: 'summon'}},
	{name: 'Recycle', cost: '{U}', req: {class: 'Recycle'}, eff: {class: 'Soak', amount: 0, target: 1}}]},
 
{id: 'CoralboundSentry', name: 'Coralbound Sentry', rarity: 'Common', image: 'Cards/ihu/CoralboundSentry.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Blue', type: ['Water','Steel','Spirit','Construct'], hp: 2, atk: 1, cost: '{u2}', ability: ['Armor','Drench','Exploit'], set: 'InfiniteHorizons', skill: [
 	{name: 'Summon', cost: '{u2}', eff: {class: 'summon'}},
	{name: 'Hydrosurge Protocol', trig: 'summon', eff: [{class: 'add', type: ['Water','Steel']}, {class: 'Drench', q: 1}]}]},
 
{id: 'CoralboundProtector', name: 'Coralbound Protector', rarity: 'Rare', image: 'Cards/ihu/CoralboundProtector.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Blue', type: ['Water','Steel','Spirit','Construct'], hp: 4, atk: 3, cost: '{u4}', ability: ['Armor','Drench','Exploit','Protect'], set: 'InfiniteHorizons', skill: [
	{name: 'Summon', cost: '{u4}', eff: {class: 'summon'}},
	{name: 'Hydrosurge Protocol', req: 'echo', eff: {class: 'recover', q: 2, type: ['Water','Steel']}},
	{name: 'Runic Deluge', cost: '{u}{u}', module: 2, eff: {class: 'Fuse'}}]},
 
{id: 'CoralboundVanguard', name: 'Coralbound Vanguard', rarity: 'Common', image: 'Cards/ihu/CoralboundVanguard.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Blue', type: ['Water','Steel','Spirit','Construct'], hp: 3, atk: 2, cost: '{u3}', ability: ['Armor','Drench','Explot','Rush'], set: 'InfiniteHorizons', skill: [
 	{name: 'Summon', cost: '{u3}', eff: {class: 'summon'}},
	{name: 'Fusion', eff: {class: 'fusion', ep: {u}, type: ['Water','Steel']}},
	{name: 'Hydrosurge Protocol', trig: 'frenzy', eff: {class: 'add', type: ['Water','Steel']}}]},
 
{id: 'MaelvyrnCoralboundAutomaton', name: 'Maelvyrn, Coralbound Automaton', rarity: 'Legend', image: 'Cards/ihu/MaelvyrnCoralboundAutomaton.png', flavor: '', fullArt: 'Cards/Coralbound/MaelvyrnCoralboundAutomatonFA.png', flavor: '',
 category: 'Creature', fight: '', color: 'Blue', type: ['Water','Steel','Spirit','Construct'], hp: 9, atk: 5, cost: '{u7}', ability: ['Armor','Drench','Exploit','Fusion'], set: 'InfiniteHorizons', skill: [
 	{name: 'Summon', cost: '{u7}', eff: {class: 'summon'}},
	{name: 'Fusion', ep: '{u}, eff: {class: 'fusion', type: ['Water','Steel']}},
	{name: 'Blueprint Retrieval', cost: '{u}', stash: 1, eff: {class: 'add', category: 'Spell', type: 'Construct'}},
	{name: 'Hydroburst Cannon', cost: '{u2}', eff: {class: 'soak', target: 'allEnemies'}}]},
 
{id: 'HydrosurgeProtocol', name: 'Hydrosurge Protocol', rarity: 'Common', image: 'Cards/Construct/HydrosurgeProtocol.png', flavor: '', 
 category: 'Spell', color: 'Blue', type: ['Water','Construct','Aura'], cost: '{u2}', set: 'InfiniteHorizons', skill: [
 	{name: 'Cast', cost: '{u2}', eff: {class: 'cast'}},
	{name: 'Hydrosurge Protocol', req: 'tap', req: {recycle: 1, type: ['Water','Steel'], eff: {class: 'Soak', amount: 0, target: 2}}]},

// --- HYDRAL CARDS ---//
{id: 'HydrionPrimevalFloodbringer', name: 'Hydrion, Primeval Floodbringer', rarity: 'Legend', image: 'Cards/fou/HydrionPrimevalFloodbringer.png', flavor: '', fullArt: 'Cards/Coralbound/MaelvyrnCoralboundAutomatonFA.png', flavor: '',
 category: 'Creature', fight: '', color: 'Blue', type: ['Water','Spirit','Elemental'], cost: {u8}, hp: 10, atk: 0, ability: ['Dive','Drench','Elusive'], set: 'PrimordialAscension', skill: [
 	{name: 'Summon', cost: '{u8}', eff: {class: 'summon'}},
	{name: 'Fusion', ep: '{u}', eff: {class: 'fusion', type: ['Water','Spirit']}},
	{name: 'Stash', cost: '{U}',  req: {class: 'Stash'}, eff: {class: 'Search', archetype: 'Coralbound'}},
	{name: 'Tide of Oblivion', cost: '{u3}', eff: {class: 'Soak', amount: 8}}]},

// SKULLFRAME //
{id: 'SkullframeDefector', name: 'Skullframe Defector', rarity: 'Common', image: 'Cards/fob/SkullframeDefector.png', flavor: '', 
 category: 'Creature', fight: '', color: 'Black', type: 'Undead', hp: 3, atk: 2, cost: '{b3}', ability: ['Reanimate'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{b3}', eff: {class: 'summon'}},
  	{name: 'Reanimate', cost: '{b3}', eff: {class: 'reanimate'}}]},

{id: 'UnyieldingSoul', name: 'Unyielding Soul', rarity: 'Common', image: 'Cards/fob/UnyieldingSoul.png', flavor: '', 
 category: 'Creature', fight: 'Bone Strike', color: 'Black', type: 'Undead', hp: 2, atk: 1, cost: '{b2}', ability: ['Reanimate','Rush'], set: 'DesolateFrontiers', skill: [
 	{name: 'Summon', cost: '{b2}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b2}', eff: {class: 'Reanimate'}}]},

{id: 'SkullframeAcolyte', name: 'Skullframe Acolyte', rarity: 'Common', image: 'Cards/fob/SkullframeAcolyte.png', flavor: '', 
 category: 'Creature', fight: 'Bonestrike', color: ['Black', 'Purple'], type: ['Bone','Mage'], hp: 3, atk: 2, cost: '{b}{p}', ability: 'Reanimate', set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{b}{p}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b}{p}', eff: {class: 'reanimate'}},
	{name: 'Bonestrike', void: true, cost: '{p}', eff: {class: 'strike', q: 3}}]},

{id: 'Cryptwinds', name: 'Cryptwinds', rarity: 'Common', image: 'Cards/fob/Cryptwinds.png', flavor: '', 
 category: 'Creature', fight: 'Bone Claw Strike', color: 'Black', type: ['Dragon','Undead'], hp: 4, atk: 2, cost: '{b}', ability: ['Flying','Reanimate'], set: 'FracturedOrigins', skill: [
 	{name: 'Summon', cost: '{b}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b}', eff: {class: 'reanimate'}},
	{name: 'Revenant Scales', req: 'summon', eff: {class: 'destroy', q: 1, target: 'playerField'}},
 	{name: 'Draconic Bonecall', req: 'discard', cost: '{b}', eff: [{class: 'add', q: 1, type: 'Dragon'}, {class: 'spawn', id: 'Skeleton'}]}]},
 
{id: 'XulZulSkullframeEternal', name: "Xul'Zul, Skullframe Eternal", rarity: 'Legend', image: 'Cards/fop/XulZulSkullframeEternal.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Black','Purple'], type: ['Bone','Dragon','Undead'], hp: 7, atk: 4, cost: '{b3}{p2}', ability: ['Flying','Reanimate'], set: 'DesolateFrontiers', skill: [
 	{name: 'Summon', cost: '{b3}{p2}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b3}{p2}', eff: {class: 'reanimate'}},
	{name: 'Revenant Scales', trig: 'summon', eff: {class: 'destroy', target: 'playerCreatures'}},
	{name: 'Curseflame Inferno', trig: 'attack' eff: {class: 'burn', q: 1, target: 'enemyCreatures'}}]},

{id: 'SkullframeArmoredDragon', name: 'Skullframe Armored Dragon', rarity: 'Rare', image: 'Cards/fob/SkullframeArmoredDragon.png', flavor: '', 
 category: 'Creature', fight: 'Draconic Bonestrike', color: 'Black', type: ['Bone','Dragon'], hp: 4, atk: 3, cost: '{b2}', ability: ['Armor','Flying','Reanimate'], set: 'DesolateFrontiers', skill: [
 	{name: 'Summon', cost: '{b2}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b2}', eff: {class: 'reanimate'}},
 	{name: 'Revenant Scales', trig: 'summon', eff: {class: 'destroy', q: 2, target: 'playerCreatures'}},
 	{name: 'Draconic Bonestrike', req: 'discard', cost: '{b3}', eff: [{class: 'destroy', q: 1, target: 'allField'}, {class: 'spawn', target: 'Skeleton'}]}]},

{id: 'SkullframeHexmistress', name: 'Skullframe Hexmistress', rarity: 'Rare', image: 'Cards/fob/SkullframeHexmistress.png', flavor: '', 
 category: 'Creature', fight: '', color: ['Black', 'Purple'], type: ['Undead','Mage'], hp: 3, atk: 2, cost: '{b2}{p}', ability: 'Reanimate', set: 'DesolateFrontiers', skill: [
 	{name: 'Summon', cost: '{b2}{p}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b2}{p}', eff: {class:'reanimate'}},
	{name: 'Bonecall', trig: 'summon', eff: {class: 'revive', id: 'Skeleton'}},
	{name: 'Ebonhex Flare', req: 'tap',  eff: {class: 'burn', q: 3}}]},

{id: 'MaldryssSkullframeArchmage', name: 'Maldryss, Skullframe Archmage', rarity: 'Legend', image: 'Cards/fob/MaldryssSkullframeArchmage.png', flavor: '', fullArt: 'Cards/Skullframe/MaldryssSkullframeArchmageFA.png', flavor: '',
 category: 'Creature', fight: '', color: ['Black','Purple'], type: ['Bone','Undead','Mage'], hp: 4, atk: 2, 
 cost: '{b2}{p}', ability: ['Burn','Reanimate'], set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{b2}{p}', eff: {class: 'summon'}},
	{name: 'Reanimate', cost: '{b2}{p}', eff: {class: 'reanimate'}},
	{name: 'Hexbind', cost: '{p}{p}', eff: {class: 'Bind', amount: 4}},
	{name: 'Ebonhex Crush', trig: 'attack', eff: {class: 'destroy', targetBlight: 'burned'}}]},

{id: 'Soulhexing', name: 'Soulhexing', rarity: 'Common', image: 'Cards/fob/Soulhexing.png', flavor: '', 
 category: 'Spell', color: 'Black', type: 'Undead', cost: '{b2}', set: 'DesolateFrontiers', skill: [
	{name: 'Cast', cost: '{b2}', text: 'Destroy a creature afflicted by any status', eff: {class: 'destroy', blight: true}}]},

{id: 'Witherwake', name: 'Witherwake', rarity: 'Common', image: 'Cards/dfb/Witherwake.png', flavor: '', 
 category: 'Spell', color: ['Black','Purple'], type: ['Bone','Undead','Dragon','Enchantment'], cost: '{p}{b}', set: 'DesolateFrontiers', skill: [
 	{name: 'Cast', cost: '{p}{b}', eff: {class: 'cast'}},
	{name: 'Hexbind', cost: '{p}{b}', eff: {class: 'Bind', amount: 4}}]},

// ARTIFACTS //
{id: 'GolemheartInfusor', name: 'Golemheart Infusor', rarity: 'Common', image: 'Cards/ecc/GolemheartInfusor.png', flavor: '', 
 category: 'Artifact', color: 'Gray', type: ['Golem','Relic'], hp: 5, cost: '{c}', set: 'EchoesofCreation', skill: [
 	{name: 'Equip', cost: '{0}', eff: {class: 'Equip'}},]},

{id: 'CindercoreEmber', name: 'Cindercore Ember', rarity: 'Common', image: 'Cards/ecr/CindercoreEmber.png', flavor: '', 
 category: 'Artifact', color: 'Red', type: ['Fire','Golem','Relic'], hp: 6, cost: '{r}{c}', set: 'EchoesofCreation', skill: [
 	{name: 'Deploy', cost: '{r}{c}', eff: {class: 'Equip'}}]},
 
{id: 'TidecallersPearl', name: 'Tidecallers Pearl', rarity: 'Common', image: 'Cards/egu/TidecallersPearl.png', flavor: '', 
 category: 'Artifact', color: 'Blue', type: ['Merfolk','Relic'], hp: 5, cost: '{u3}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Deploy', cost: '{u3}', eff: {class: 'deploy'}},
	{name: "Tidecaller's Pearl", passive: true, eff: {class: 'reduction', ep: {u}, target: 'playerSpells'}}]},
 
{id: 'PlagueThornTalisman', name: 'Plague Thorn Talisman', rarity: 'Common', image: 'Cards/Artifact/PlagueThornTalisman.png', flavor: '', 
 category: 'Artifact', color: 'Purple', type: ['Toxic','Relic'], hp: 5, cost: '{p3}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Deploy', cost: '{p3}', eff: {class: 'Equip'}}]},
 
{id: 'TitansAnvil', name: 'Titans Anvil', rarity: 'Rare', image: 'Cards/foc/TitansAnvil.png', flavor: 'Upon this colossal anvil, mountains are broken and reforged into weapons of legend. Each strike rings with the echo of gods.', 
 category: 'Relic', color: 'Gray', type: 'Relic', hp: 5, cost: '{c3}', set: 'FracturedOrigins', skill: [
 	{name: 'Deploy', cost: '{c3}', eff: {class: 'deploy'}},
	{name: 'Forge', req: 'tap', eff: {class: 'add', type:'Equipment'}}]},
 
{id: 'LumenSpire', name: 'Lumen Spire', rarity: 'Common', image: 'Cards/fow/Lumen Spire.png', flavor: '', 
 category: 'Artifact', color: 'White', type: 'Relic', hp: 5, cost: '{w2}', set: 'FracturedOrigins', skill: [
 	{name: 'Deploy', cost: '{w2}', eff: {class: 'Equip'}}]},

{id: 'DrakzulTwinHammers', name: 'Drakzul Twin Hammers', rarity: 'Rare', image: 'Cards/Artifact/DrakzulTwinHammers.png', flavor: '', 
 category: 'Artifact', color: 'Gray', type: 'Equipment', hp: 5, cost: '{c2}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Equip', cost: '{c2}', eff: {class: 'Inspire', ability: 'Crush'}},
	{name: 'Twin Impact', cost: '{c2}', req: 'tap', eff: {class: 'destroy', q: 2, target: 'enemyCreatures', status: 'disabled'}}]},

{id: 'DragonsGrove', name: "Dragon's Grove", rarity: 'Rare', image: 'Cards/fog/DragonsGrove.png', flavor: '', 
 category: 'Terrain', color: 'Green', type: ['Verdant','Dragon','Terrain'], ability: 'Vigor', essence: '{g}', hp: 7, cost: '{g3}', set: 'FracturedOrigins', skill: [
 	{name: 'Terraform', cost: '{g3}', eff: {class: 'terraform'}},
	{name: 'Draconic Pulse', trig: 'summon', eff: {class: 'bolster', hp: 1, type: ['Verdant','Dragon'], target: 'playerCreatures'}},
	{name: 'Sylvan Scales', req: {class: 'summon', type: ['Sylvan','Dragon'], eff: {class: 'inspire', hp: 1}}]},
 
{id: 'DragonsSpire', name: "Dragon's Spire", rarity: 'Rare', image: 'Cards/for/DragonsSpire.png', flavor: '', 
 category: 'Terrain', color: 'Red', type: ['Fire','Dragon','Terrain'], hp: 6, cost: '{r2}', set: 'FracturedOrigins', skill: [
 	{name: 'Terraform', cost: '{r2}', eff: {class: 'terraform'}},
	{name: 'Inferno Scales', act: {'Draw', archetype: 'Dragon'}, eff: {class: 'Burn', amount: 1}},
	{name: 'Draconic Blaze', cost: '{r2}', eff: {class: 'Burn', amount: 2, target: 2}}]},
 
{id: 'DragonsAtoll', name: "Dragon's Atoll", rarity: 'Rare', image: 'Cards/fou/DragonsAtoll.png', flavor: '', 
 category: 'Terrain', color: 'Blue', type: ['Water','Dragon','Terrain'], hp: 11, cost: '{u4}', set: 'FracturedOrigins', skill: [
	{name: 'Terraform', cost: '{u4}', eff: {class: 'terraform'}},
	{name: 'Slumbering Shroud', trig: 'echo', type: 'Dragon', eff: {class: 'Recall', type: 'Dragon'}},
	{name: 'Draconic Inheritance', cost: '{u2}', act: {'Echo', archetype: 'Dragon'}, eff: {class: 'NullSigil'}}]},
 
{id: 'DragonsSkyreach', name: "Dragon's Skyreach", rarity: 'Rare', image: 'Cards/foy/DragonsSkyreach.png', flavor: '', 
 category: 'Terrain', color: 'Yellow', type: ['Thunder','Dragon','Terrain'], ability: 'Flying', hp: 9, cost: '{y3}', set: 'FracturedOrigins', skill: [
 	{name: 'Terraform', cost: '{y3}', eff: {class: 'terraform'}},
	{name: 'Dragon Echo', cost: '{u}', act: {'Echo', archetype: 'Dragon'}, eff: {class: 'NullSigil'}},
	{name: 'Draconic Storm', cost: '{u2}', eff: {class: 'Thunderstorm'}}]},

{id: 'DragonsBastion', name: "Dragon's Bastion", rarity: 'Rare', image: 'Cards/foc/DragonsBastion.png', flavor: '', 
 category: 'Terrain', color: 'Gray', type: ['Steel','Dragon','Terrain'], ability: ['Armor','Protect'], hp: 12, cost: '{c4}', essence: '{c}', set: 'FracturedOrigins', skill: [
 	{name: 'Terraform', cost: '{c4}', eff: {class: 'terraform'}},
	{name: 'Dragon Echo', cost: '{u}', act: {'Echo', archetype: 'Dragon'}, eff: {class: 'NullSigil'}},
	{name: 'Draconic Ironwall', cost: '{c2}', eff: {class: 'Curse'}},]},
 
{id: 'DragonsHollow', name: "Dragon's Hollow", rarity: 'Rare', image: 'Cards/fop/DragonsHollow.png', flavor: '', 
 category: 'Terrain', color: 'Purple', type: ['Cursed','Dragon','Terrain'], hp: 7, cost: '{p3}', set: 'FracturedOrigins', skill: [
 	{name: 'Terraform', cost: '{p3}', eff: {class: 'terraform'}},
	{name: 'Dragon Echo', cost: '{u}', act: {'Echo', archetype: 'Dragon'}, eff: {class: 'NullSigil'}},
	{name: 'Draconic Curse', cost: '{p2}', eff: {class: 'Curse'}}]}, 
 
{id: 'DragonsHaven', name: "Dragon's Haven", rarity: 'Rare', image: 'Cards/fow/DragonsHaven.png', flavor: '', 
 category: 'Terrain', color: 'White', type: ['Light','Dragon','Terrain'], ability: ['Aegis','Flying'], hp: 10, cost: '{w4}', set: 'FracturedOrigins', skill: [
	{name: 'Terraform', cost: '{w4}', eff: {class: 'terraform'}},
	{name: 'Dragon Draw', cost: '{u}', act: {'Echo', archetype: 'Dragon'}, eff: {class: 'NullSigil'}},
	{name: 'Draconic Solarflare', cost: '{w}{w}', eff: {class: 'Night'}}]},
 
{id: 'DragonsMoonhold', name: "Dragon's Moonhold", rarity: 'Rare', image: 'Cards/fob/DragonsMoonhold.png', flavor: '', 
 category: 'Terrain', color: 'Black', type: ['Dark','Dragon','Terrain'], ability: 'Seal', hp: 6, cost: '{b3}', set: 'FracturedOrigins', skill: [
 	{name: 'Terraform', cost: '{b3}', eff: {class: 'terraform'}},
	{name: 'Dragon Echo', cost: '{u}', act: {'Echo', archetype: 'Dragon'}, eff: {class: 'NullSigil'}},
	{name: 'Draconic Nightfall', cost: '{b2}', eff: {class: 'Night'}}]},
 
{id: 'HardenedScales', name: 'Hardened Scales', rarity: 'Common', image: 'Cards/fog/HardenedScales.png', flavor: '', 
 category: 'Spell', color: 'Colorless', type: ['Dragon','Aura'], cost: '{2}', mana: 3, set: 'FracturedOrigins', skill: [
 	{name: 'Cast', cost: '{2}', eff: {class: 'cast'}},
	{name: 'Hardened Scales', mana: 1, req: 'tap', eff: {class: 'give', atk: 1, hp: 2, type: 'Dragon'}},
	{name: 'Hardened Scales', mana: 2, req: 'tap', eff: {class: 'give', atk: 2, hp: 3, type: 'Dragon'}}]},

{id: 'ElementalofFoliages', name: 'Elemental of Foliages', rarity: 'Rare', image: 'Cards/ecg/ElementalofFoliages.png', flavor: '', 
 category: 'Creature', fight: 'Verdant Strike', color: 'Green', type: ['Verdant','Spirit','Elemental'], hp: 6, atk: 2, cost: '{g3}',  ability: ['Protect','Regenerate'], set: 'EchoesofCreation', skill: [
	{name: 'Summon', cost: '{g3}', {class: 'summon'}},
	{name: 'Sylvan Discovery', trig: 'summon', {class: 'add', color: 'Green', category: 'Terrain'}}]},
 
{id: 'WildwoodGoblin', name: 'Wildwood Goblin', rarity: 'Common', image: 'Cards/egg/WildwoodGoblin.png', flavor: '',
 category: 'Creature', fight: '', color: 'Green', type: 'Goblin', hp: 1, atk: 1, cost: '{g}', ability: 'Pilfer', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Summon', cost: '{g}', eff: {class: 'summon'}},
	{trig: 'frenzy', eff: {class: 'pilfer'}}]},
 
{id: 'Thicket', name: 'Thicket', rarity: 'Common', image: 'Cards/fog/Thicket.png', flavor: '', 
 category: 'Terrain', color: 'Green', type: ['Sylvan','Terrain'], hp: 7, cost: '{g}', set: 'FracturedOrigins', skill: [
 	{name: 'Terraform', cost: '{g}', eff: {class: 'terraform'}}]},
 
{id: 'GoblinVillage', name: 'Goblin Village', rarity: 'Common', image: 'Cards/Brute/GoblinVillage.png', flavor: '', 
 category: 'Terrain', color: 'Green', type: 'Goblin', hp: 5, cost: '{0}', set: 'StandardPack2'},
 
{id: 'Thornreach', name: 'Thornreach', rarity: 'Legendary', image: 'Cards/fog/Thornreach.png', flavor: '', 
 category: 'Terrain', color: 'Green', type: ['Sylvan','Elf','Domain'], hp: 20, essence: '{g2}', set: 'FracturedOrigins'},
 
{id: 'FairyFountain', name: 'Fairy Fountain', rarity: 'Common', image: 'Cards/ecg/FairyFountain.png', flavor: '', 
 category: 'Terrain', color: 'Green', type: 'Fairy', hp: 2, cost: '{g}', set: 'EchoesofCreation'},

{id: 'ElvenVillage', name: 'Elven Village', rarity: 'Common', image: 'Cards/fog/ElvenVillage.png', flavor: '', 
 category: 'Terrain', color: 'Green', type: ['Elf','Terrain'], hp: 3, cost: '{g}', set: 'FracturedOrigins'},

{id: 'SylvanCanopy', name: 'Sylvan Canopy', rarity: 'Common', image: 'Cards/egg/SylvanCanopy.png', flavor: '', 
 category: 'Terrain', color: 'Green', type: 'Sylvan', hp: 5, cost: '{0}', set: ['ElementaGenesis','EssenceLegacy']},

{id: 'OrcVillage', name: 'Orc Village', rarity: 'Common', image: 'Cards/for/OrcVillage.png', flavor: '', 
 category: 'Terrain', color: 'Red', type: 'Orc', hp: 4, cost: '{r}', set: 'FracturedOrigins'},
 
{id: 'Smokeblight Frontier', name: 'Smokeblight Frontier', rarity: 'Common', image: 'Cards/Domain/SmokeblightFrontier.png', flavor: '', 
 category: 'Terrain', color: 'Red', type: '', hp: 5, cost: '{0}', set: 'StandardPack2'},

{id: 'Pearlhaven', name: 'Pearlhaven', rarity: 'Legend', image: 'Cards/fou/Pearlhaven.png', flavor: '', 
 category: 'Terrain', color: 'Blue', type: ['Merfolk','Domain'], hp: 16, cost: '{3}', essence: '{u2}', set: 'FracturedOrigins'},

{id: 'GlacierRift', name: 'Glacier Rift', rarity: 'Common', image: 'Cards/Frostland/GlacierRift.png', flavor: '', 
 category: 'Terrain', color: 'Blue', type: 'Terrain', hp: 5, cost: '{0}', essence: '{u}{c}', set: 'DesolateFrontiers'},
 
{id: 'FrostlandCitadel', name: 'Frostland Citadel', rarity: 'Legendary', image: 'Cards/Frostland/FrostlandCitadel.png', flavor: '', 
 category: 'Terrain', color: 'Blue', type: ['Ice','Domain'], hp: 5, cost: '{0}', essence: '{u}{c}', set: 'DesolateFrontiers'},

{id: 'SkywardArchipelago', name: 'Skyward Archipelago', rarity: 'Common', image: 'Cards/egy/SkywardArchipelago.png', flavor: '', 
 category: 'Terrain', color: 'Yellow', type: ['Sky','Terrain'], hp: 7, cost: '{y3}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Terraform', cost: '{y3}', eff: {class: 'terraform'}},
	{name: 'Flourish', cost: '{g}', req: 'tap', eff: {class: 'add', type: 'Terrain'}}]},

{id: 'ElementalsPlateau', name: "Elemental's Plateau", rarity: 'Rare', image: 'Cards/Elemental/ElementalsPlateau.png', flavor: '', 
 category: 'Terrain', color: 'Yellow', type: 'Elemental', hp: 5, cost: '{0}', set: 'PrimordialAscension'},

{id: 'ZephyrasStormpeaks', name: "Zephyra's Stormpeaks", rarity: 'Rare', image: 'Cards/Avian/ZephyrasStormpeaks.png', flavor: '', 
 category: 'Terrain', color: 'Yellow', type: ['Avian','Terrain'], hp: 5, cost: '{y}', set: 'EchoesofCreation'},

{id: 'Mireworks', name: 'Mireworks', rarity: 'Common', image: 'Cards/Domain/Mireworks.png', flavor: '', 
 category: 'Terrain', color: 'Purple', type: ['Construct','Domain'], hp: 5, cost: '{0}', essence: '{p2}', set: 'StandardPack2'},

{id: 'GoblinCamp', name: 'Goblin Camp', rarity: 'Common', image: 'Cards/Brute/GoblinCamps.png', flavor: '', 
 category: 'Terrain', color: 'Purple', type: 'Goblin', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},

{id: 'MiregateBasin', name: 'Miregate Basin', rarity: 'Common', image: 'Cards/Domain/MiregateBasin.png', flavor: '', 
 category: 'Terrain', color: 'Purple', type: 'Terrain', hp: 5, cost: '{0}', essence: '{P}', set: 'StandardPack2'},

{id: 'IrondeepBastion', name: 'Irondeep Bastion', rarity: 'Common', image: 'Cards/Domain/IrondeepBastion.png', flavor: '', 
 category: 'Terrain', color: 'Gray', type: 'Terrain', hp: 14, cost: '{c}{c}', essence: '{C}', set: 'StandardPack2'},
 
{id: 'GoblinOutpost', name: 'Goblin Outpost', rarity: 'Common', image: 'Cards/Brute/GoblinOutpost.png', flavor: '', 
 category: 'Terrain', color: 'Gray', type: 'Goblin', hp: 8, cost: '{1}', essence: '{C}', set: 'EchoesofCreation'},
 
{id: 'DwarfenStronghold', name: 'Dwarfen Stronghold', rarity: 'Rare', image: 'Cards/Brute/DwarfenStronghold.png', flavor: '', 
 category: 'Terrain', color: 'Gray', type: 'Domain', hp: 11, cost: '{1}{c}', essence: '{c}', set: 'FracturedOrigins'},

{id: 'EmberjawRange', name: 'Emberjaw Range', rarity: 'Common', image: 'Cards/Domain/EmberjawRange.png', flavor: '', 
 category: 'Terrain', color: ['Gray','Red'], type: 'Terrain', hp: 5, cost: '{0}', essence: '{c}', set: 'StandardPack2'},
 
{id: 'Anvilgate', name: 'Anvilgate', rarity: 'Legend', image: 'Cards/foc/Anvilgate.png', flavor: '', 
 category: 'Terrain', color: 'Gray', type: ['Dwarf','Domain'], hp: 20, cost: '{c3}', essence: '{c2}', set: 'FracturedOrigins'},
 
{id: 'StonewoundBarrens', name: 'Stonewound Barrens', rarity: 'Common', image: 'Cards/Domain/StonewoundBarrens.png', flavor: '', 
 category: 'Terrain', color: 'Gray', type: 'Terrain', hp: 5, cost: '{0}', essence: '{c}', set: 'StandardPack2'},

{id: 'Fellchasm', name: 'Fellchasm', rarity: 'Rare', image: 'Cards/fob/Fellchasm.png', flavor: '', 
 category: 'Terrain', color: 'Black', type: 'Demon', hp: 13, cost: '{1}{b}{r}', essence: '{b}{r}', set: 'FracturedOrigins'},
  
{id: 'DarkSea', name: 'Dark Sea', rarity: 'Common', image: 'Cards/dfb/DarkSea.png', flavor: '', 
 category: 'Terrain', color: ['Blue','Black'], type: '', hp: 5, cost: '{u2}{b}', essence: '{u}{b}', set: 'DesolateFrontiers'},
 
{id: 'Graveyard', name: 'Graveyard', rarity: 'Common', image: 'Cards/fob/Graveyard.png', flavor: '', 
 category: 'Terrain', color: 'Black', type: ['Umbral','Terrain'], hp: 3, cost: '{b}', set: 'FracturedOrigins'},
 
{id: 'ShadelornWastes', name: 'Shadelorn Wastes', rarity: 'Rare', image: 'Cards/ecb/ShadelornWastes.png', flavor: '', 
 category: 'Terrain', color: 'Black', type: 'Elemental', trait: 'Shadow', hp: 8, cost: '{b2}', essence: '{b}', set: 'EchoesofCreation'},

{id: 'ZephyrasPlateau', name: "Zephyra's Plateau", rarity: 'Common', image: 'Cards/Avian/ZephyrasPlateau.png', flavor: '', 
 category: 'Terrain', color: ['Yellow','White'], type: 'Avian', hp: 6, cost: '{y2}', set: 'StandardPack2'},

{id: 'HalosCrown', name: "Halo's Crown", rarity: 'Common', image: 'Cards/Domain/HalosCrown.png', flavor: '', 
 category: 'Terrain', color: 'White', type: 'Terrain', hp: 5, cost: '{w4}', essence: '{w}{w}', set: 'FracturedOrigins'},
 
{id: 'SunspireSanctum', name: 'Sunspire Sanctum', rarity: 'Common', image: 'Cards/Domain/SunspireSanctum.png', flavor: '', 
 category: 'Terrain', color: 'White', type: '', hp: 5, cost: '{0}', essence: '{w}', set: 'EchoesofCreation'},
 
{id: 'DawnbreakRidge', name: 'Dawnbreak Ridge', rarity: 'Common', image: 'Cards/Domain/DawnbreakRidge.png', flavor: '', 
 category: 'Terrain', color: 'White', type: 'Terrain', hp: 7, cost: '{w3}', essence: '{w}', set: 'FracturedOrigins'},
 
{id: 'LumenlowFields', name: 'Lumenlow Fields', rarity: 'Rare', image: 'Cards/egw/LumenlowFields.png', flavor: '', 
 category: 'Terrain', color: 'White', type: 'Terrain', hp: 6, cost: '{w3}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Terraform', cost: '{w3}', eff: {class: 'terraform'}},
	{name: 'Luminous Descent', cost: '{1}', eff: {class: 'terraform'}}]},
 
{id: 'SunbatheHills', name: 'Sunbathe Hills', rarity: 'Common', image: 'Cards/egw/SunbatheHills.png', flavor: '', 
 category: 'Terrain', color: 'White', hp: 8, cost: '{w}', set: ['ElementaGenesis','EssenceLegacy'], skill: [
 	{name: 'Terraform', cost: '{1}', eff: {class: 'terraform'}}]},
*/
];

// Cost mapping and renderer (returns HTML string)
const ESSENCE_IMAGE_MAP = {
  multi: "Icons/Essence/multi.png",
  r: "Icons/Essence/red.png", r2: "Icons/Essence/red2.png", r3: "Icons/Essence/red3.png", r4: "Icons/Essence/red4.png", r5: "Icons/Essence/red5.png", r6: "Icons/Essence/red6.png", r7: "Icons/Essence/red7.png",
  u: "Icons/Essence/blue.png", u2: "Icons/Essence/blue2.png", u3: "Icons/Essence/blue3.png", u4: "Icons/Essence/blue4.png", u5: "Icons/Essence/blue5.png", u6: "Icons/Essence/blue6.png", u7: "Icons/Essence/blue7.png",
  g: "Icons/Essence/green.png", g2: "Icons/Essence/green2.png", g3: "Icons/Essence/green3.png", g4: "Icons/Essence/green4.png", g5: "Icons/Essence/green5.png", g6: "Icons/Essence/green6.png", g7: "Icons/Essence/green7.png",
  y: "Icons/Essence/yellow.png", y2: "Icons/Essence/yellow2.png", y3: "Icons/Essence/yellow3.png", y4: "Icons/Essence/yellow4.png", y5: "Icons/Essence/yellow5.png", y6: "Icons/Essence/yellow6.png", y7: "Icons/Essence/yellow7.png",
  p: "Icons/Essence/purple.png", p2: "Icons/Essence/purple2.png", p3: "Icons/Essence/purple3.png", p4: "Icons/Essence/purple4.png", p5: "Icons/Essence/purple5.png", p6: "Icons/Essence/purple6.png", p7: "Icons/Essence/purple7.png",
  c: "Icons/Essence/gray.png", c2: "Icons/Essence/gray2.png", c3: "Icons/Essence/gray3.png", c4: "Icons/Essence/gray4.png", c5: "Icons/Essence/gray5.png", c6: "Icons/Essence/gray6.png", c7: "Icons/Essence/gray7.png",
  b: "Icons/Essence/black.png", b2: "Icons/Essence/black2.png", b3: "Icons/Essence/black3.png", b4: "Icons/Essence/black4.png", b5: "Icons/Essence/black5.png", b6: "Icons/Essence/black6.png", b7: "Icons/Essence/black7.png",
  w: "Icons/Essence/white.png", w2: "Icons/Essence/white2.png", w3: "Icons/Essence/white3.png", w4: "Icons/Essence/white4.png", w5: "Icons/Essence/white5.png", w6: "Icons/Essence/white6.png", w7: "Icons/Essence/white7.png",
  x0: "Icons/Essence/x0.png", x1: "Icons/Essence/x1.png", x2: "Icons/Essence/x2.png", x3: "Icons/Essence/x3.png",
  x4: "Icons/Essence/x4.png", x5: "Icons/Essence/x5.png", x6: "Icons/Essence/x6.png", x7: "Icons/Essence/x7.png",
  x8: "Icons/Essence/x8.png", x9: "Icons/Essence/x9.png", x10: "Icons/Essence/x10.png", x11: "Icons/Essence/x11.png",
  x12: "Icons/Essence/x12.png", x13: "Icons/Essence/x13.png", x14: "Icons/Essence/x14.png", x15: "Icons/Essence/x15.png",
  x16: "Icons/Essence/x16.png", x17: "Icons/Essence/x17.png", x18: "Icons/Essence/x18.png", x19: "Icons/Essence/x19.png", x20: "Icons/Essence/x20.png"
};
const addCoinsBtn = document.getElementById('add-coins-btn');
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000];
let lastPlayerPower = null;

const FILTERS = {
  ownership: { key: 'ownership', label: 'Ownership', options: ['All','Owned','Undiscovered','Locked'] },
  color: { key: 'color', label: 'Color', options: ['All', 'Green', 'Red', 'Blue', 'Yellow', 'Gray', 'Purple', 'White', 'Black'] },
  category: { key: 'category', label: 'Category', options: ['All','Creature','Terrain','Artifact','Spell'] },
  type: { key: 'type', label: 'Type', options: ['All','Beast','Brute','Construct','Demon','Dragon','Dwarf','Elemental',
	'Elf','Fairy','Fire','Goblin','Orc','Satyr','Spirit','Water','Zombie'] },
  rarity: { key: 'rarity', label: 'Rarity', options: ['All','Common','Rare','Legend'] },
  /*archetype: { key: 'archetype', label: 'Archetype', options: ['All','Blazefeather','Cindercore','Coralbound','Fireland','Frostland','Golemheart','Moonfang','Skullframe','Voltwing','Zephyra'] },
*/ability: { key: 'ability', label: 'Ability', options: ['All','Aegis','Ambush','Blightstrike','Burn','Conceal','Crush','Curse',
    'Defender','Defiant','Dive','Dormant','Drain','Drench','Elusive','Exploit','Flying','Focus','Freeze','Frostbite',
    'Immunity','Intimidate','Leap','Levitate','Paralyze','Pierce','Pilfer','Poisonous','Precision','Protect','Provoke',
    'Regenerate','Relentless','Resilience','Rush','Scorch','Soak','Static','Toxic','Unbreakable','Veil','Wither']},
  pack: { key: 'pack', label: 'Pack', options: ['All', 'ElementaGenesis', 'FracturedOrigins','EchoesofCreations','DesolateFrontiers','InfiniteHorizons'] }
 // Add more as needed
};

const CARD_KEYWORD = {
// ------------- //
// --- STATS --- //
// ------------- //
attack: {name: "Attack", text: "Attack value.", icon: "Icons/Stat/Atk.png" },
defense: {name: "Defense", text: "Defense value.", icon: "Icons/Stat/Def.png" },
armor: {name: "Armor", text: "Secondary sustain stat. Cards lose armor first before HP. When the armor breaks, nullifies remaining damage. Losses {1} Speed.", icon: "Icons/Stat/Armor.png" },

// -------------- //
// --- COLORS --- //
// -------------- //
green: {name: "Green", text: "", icon: "Icons/Color/Green.png" },
red: {name: "Red", text: "", icon: "Icons/Color/Red.png" },
blue: {name: "Blue", text: "", icon: "Icons/Color/Blue.png" },
yellow: {name: "Yellow", text: "", icon: "Icons/Color/Yellow.png" },
gray: {name: "Gray", text: "", icon: "Icons/Color/Gray.png" },
purple: {name: "Purple", text: "", icon: "Icons/Color/Purple.png" },
white: {name: "White", text: "", icon: "Icons/Color/White.png" },
black: {name: "Black", text: "", icon: "Icons/Color/Black.png" },
colorless: {name: "Colorless", text: "", icon: "Icons/Color/Colorless.png" },

// ----------------- //
// --- ABILITIES --- //
// ----------------- //
aegis: {name: "Aegis", text: "Prevents the next damage received, then is removed.", icon: "Icons/Ability/Aegis.png" },
ambush: {name: "Ambush", text: "Cannot be targeted by opponent's attacks or skills. Gets revealed after attacking or using a skill.", icon: "Icons/Ability/Ambush.png" },
reap: {name: "Reap", text: "Destroys enemy creature after dealing damage.", icon: "Icons/Ability/Reap.png" },
bind: {name: "Bind", text: "Burns after an attack or skill.", icon: "Icons/Ability/Bind.png" },
burn: {name: "Burn", text: "Burns after an attack or skill.", icon: "Icons/Ability/Burn.png" },
conceal: {name: "Conceal", text: "Opponent can only target this creature for attacks last", icon: "Icons/Ability/Conceal.png" },
crush: {name: "Crush", text: "Remove all armor from target unit.", icon: "Icons/Ability/Crush.png"},
curse: {name: "Curse", text: "Curses opposing creature after dealing damage.", icon: "Icons/Ability/Curse.png"},
defender: {name: "Defender", text: "Deals damage using its defense while disabled.", icon: "Icons/Ability/Defender.png" },
defiant: {name: "Defiant", text: "Does not disable after attacking.", icon: "Icons/Ability/Defiant.png" },
dive: {name: "Dive", text: "Cannot be targeted while disabled.", icon: "Icons/Ability/Dive.png" },
drain: {name: "Drain", text: "Gain HP equal to damage dealt by attacks.", icon: "Icons/Ability/Drain.png" },
drench: {name: "Drench", text: "Soaks after an attack", icon: "Icons/Ability/Drench.png" },
elusive: {name: "Elusive", text: "Cannot be damaged by attacks.", icon: "Icons/Ability/Elusive.png" },
exploit: {name: "Exploit", text: "Deals {1} more damage with attacks if the enemy has any hindrance.", icon: "Icons/Ability/Exploit.png" },
flying: {name: "Flying", text: "Can only be blocked by other Flying{flying}, Mage{mage} or Ranger{ranger} units. Speed {1}.", icon: "Icons/Ability/Flying.png" },
focus: {name: "Focus", text: "Can attack any card regardless of abilities (except Ambush)", icon: "Icons/Ability/Focus.png" },
freeze: {name: "Freeze", text: "Freezes after an attack or skill.", icon: "Icons/Ability/Freeze.png" },
frostbite: {name: "Frostbite", text: "Freezes after an attack", icon: "Icons/Ability/Frostbite.png" },
immunity: {name: "Immunity", text: "Unaffected by status ailments.", icon: "Icons/Ability/Immunity.png" },
intimidate: {name: "Intimidate", text: "When declaring an attack, disable defending creature", icon: "Icons/Ability/Intimidate.png" },
levitate: {name: "Levitate", text: "Cannot be disabled. Speed +{1}", icon: "Icons/Ability/Levitate.png" },
pierce: {name: "Pierce", text: "Ignores Armor.", icon: "Icons/Ability/Pierce.png"},
pilfer: {name: "Pilfer", text: "Steals any essence after attacking.", icon: "Icons/Ability/Pilfer.png"},
poisonous: {name: "Poisonous", text: "Poisons after an attack", icon: "Icons/Ability/Poisonous.png" },
precision: {name: "Precision", text: "Ignores Evasion. Speed {1}", icon: "Icons/Ability/Precision.png" },
provoke: {name: "Provoke", text: "Enemy creatures must attack if able", icon: "Icons/Ability/Provoke.png" },
protect: {name: "Protect", text: "Opponent can only target this creature for attacks.", icon: "Icons/Ability/Protect.png" },
rush: {name: "Rush", text: "Gets enabled when summoned.", icon: "Icons/Ability/Rush.png" },
static: {name: "Static", text: "Inflicts {paralysis} after battle.", icon: "Icons/Ability/Static.png" },
unbreakable: {name: "Unbreakable", text: "Cannot be destroyed by effects.", icon: "Icons/Ability/Unbreakable.png" },
veil: {name: "Veil", text: "Cannot be targeted by skills.", icon: "Icons/Ability/Veil.png" },
wither: {name: "Wither", text: "Inflict {wither} upon dealing damage. Withered cards cannot be healed.", icon: "Icons/Ability/Wither.png" },

// -------------------- //
// --- REQUIREMENTS --- //
// -------------------- //
discard: {name: "Discard", text: "Sends from the hand to the fallen zone."},
stash: {name: "Stash", text: "Returns from the hand to the deck as a cost."},
recycle: {name: "Recycle", text: "Returns from the void to the deck as a cost."},
retreat: {name: "Retreat", text: "Returns from the field to the hand as a cost."},
withdraw: {name: "Withdraw", text: "Returns from the field to the deck as a cost."},
sacrifice: {name: "Sacrifice", text: "Sends from the field to the void as a cost."},

// -------------- //
// --- SKILLS --- //
// -------------- //
 
// --- Activation Triggers --- //
arrival: {name: "Arrival", text: "Activates when an unit is summoned."},
echo: {name: "Echo", text: "Activates when an unit is sent to the void."},
draw: {name: "Draw", text: "Activates when a card is drawn."},
assault: {name: "Assault", text: "Activates after declaring an attack."},
frenzy: {name: "Frenzy", text: "Activates after dealing damage with an attack."},
defender: {name: "Defender", text: "Activates after the opponent declares an attack."},
brace: {name: "Brace", text: "Activates after receiving damage from an attack."},

// --- SKILLS --- //
strike: {name: "Strike", text: "Deal damage to target unit."},
burst: {name: "Burst", text: "Deal damage to all opponents."},
destroy: {name: "Destroy", text: "Send one unit from the field to the void."},
banish: {name: "Banish", text: "Return one unit from the field to the deck."},
repel: {name: "Repel", text: "Return one unit from the field to the hand."},
mill: {name: "Mill", text: "Sends one card from the deck to the void."},

// --- SELF SUMMON SKILLS --- //
reanimate: {name: "Reanimate", text: "Can be summoned from the fallen."},
dash: {name: "Dash", text: "Summon from the hand with half HP (rounded up). Gain {1} Speed."},
overcharge: {name: "Overcharge", text: "Summon from the hand. Gain {1}/{1}"},
manifest: {name: "Manifest", text: "Summon from the deck after meeting certain conditions."},

// --- PHASE SKILLS --- //
awaken: {name: "Awaken", text: "Activates during the draw step."},
aftermath: {name: "Aftermath", text: "Activates during the end step."},

// ---------------------------------- //
// --- STATUS AND WEATHER EFFECTS --- //
// ---------------------------------- //

// --- STATUS EFFECTS --- //
poisoned: {name: "Poisoned", text: "Lose 1 HP during each end step per stack."},
cursed: {name: "Cursed", text: "Lose -{1}/-{1} during each end step per stack."},
bound: {name: "Bound", text: "Gets disabled. Does not enable."},
burned: {name: "Burned", text: "Receives 1 more damage."},
frozen: {name: "Frozen", text: "Gets disabled. Does not enable. Cannot activate skills."},
paralysis: {name: "Paralyzed", text: "Cannot attack."},
drenched: {name: "Drenched", text: "Loses -{1} {atk} per stack."},
withered: {name: "Withered", text: "Cannot be healed."},

// --- Undead --- //
skullframe: {name: "Skullframe", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 5 }, icon: "Icons/Archetype/Skullframe.png" , text: "Clad in bone and bound by forbidden sorcery, the Skullframe march as deathless engines of war. When shattered, dark magic stitches marrow and spirit back together, raising them anew. Masters of necrotic arts and relentless persistence, the Skullframe are an archetype of inevitability, overwhelming foes with grim magic and unending reanimation until nothing living remains to resist."},

// --- Celestial --- //
seraph: {name: "Seraph", profile: { hp: 9, atk: 4, def: 8, spd: 4, hc: 3, ep: 4 }, icon: "Icons/Archetype/Seraph.png" , ability: 'Flying', text: "Born of radiant light and celestial grace, the Seraph soar above the battlefield as guardians and warriors. Their wings gleam with divine energy, and their presence purifies and inspires those around them. Majestic and unwavering, they strike with the justice of the heavens, defending the innocent and smiting darkness wherever it dwells."},

/*pyreclad: {name: "Pyreclad", profile: { hp: 1, atk: 8, def: 2, spd: 8, hc: 2, ep: 8 }, icon: "Icons/Archetype/Pyreclad.png" , text: "Born from blazing skies and molten embers, the Pyreclad are fierce avians wreathed in fire. Some bear armor forged in volcanic heat, turning them into flying fortresses of flame. Swift and relentless, they scorch the battlefield with fiery talons and blazing wings, leaving nothing but ash in their wake."},
voltwing: {name: "Voltwing", profile: { hp: 1, atk: 8, def: 1, spd: 10, hc: 3, ep: 10 }, icon: "Icons/Archetype/Voltwing.png" , text: "Born of storm and sky, the Voltwings are avians whose wings crackle with raw electricity. They dive with blinding speed, striking with piercing thunder that rends the air and scorches the battlefield. Agile and relentless, Voltwings are living lightning, their attacks swift, precise, and impossible to evade."},
zephyra: {name: "Zephyra", profile: { hp: 5, atk: 6, def: 5, spd: 9, hc: 1, ep: 8 }, icon: "Icons/Archetype/Voltwing.png" , text: "Born of storm and sky, the Voltwings are avians whose wings crackle with raw electricity. They dive with blinding speed, striking with piercing thunder that rends the air and scorches the battlefield. Agile and relentless, Voltwings are living lightning, their attacks swift, precise, and impossible to evade."},
duskwing: {name: "Duskwing", profile: { hp: 4, atk: 8, def: 2, spd: 7, hc: 4, ep: 9 }, icon: "Icons/Archetype/Duskwing.png" , text: "Shadows take flight in the form of Duskwings, dark avians whose sleek, crow-like forms glide silently through the night. With piercing eyes and razor-sharp talons, they watch from above, harbingers of omens and stealthy strikes. Wherever they gather, darkness deepens, and the unseen becomes a dangerous ally."},
moonfang: {name: "Moonfang", profile: { hp: 5, atk: 9, def: 3, spd: 8, hc: 1, ep: 5 }, icon: "Icons/Archetype/Moonfang.png" , text: "Born of lunar light and shadowed forests, the Moonfang wolves prowl by day with keen senses and silent steps. When the moon rises, their forms twist into fearsome werewolves, claws and fangs sharpened by the night. Driven by instinct and the pull of the moon, they strike with relentless ferocity, hunting as packs that embody both cunning and primal wrath."},
fireland: {name: "Fireland", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Fireland.png" , text: "Born of volcanic wrath and infernal hunger, these fire-beasts hunt not for survival, but to spread the consuming blaze of their cursed homeland. Fueled by relentless ferocity, the Fireland are defined by their fiery rushing strikes. They are known by their aggression, overwhelming foes with sudden, searing attacks before the battle has even begun."},
webcursed: {name: "Webcursed", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Webcursed.png" , text: "Born from shadowed corners and forgotten ruins, the Webcursed are spiders whose venom and silk ensnare all who dare enter their lair. Each step into their tangled domain invites paralysis and dread, as they patiently hunt, binding prey in intricate traps. Cunning and relentless, the Webcursed weave both terror and death into every silken strand."},
frostland: {name: "Frostland", profile: { hp: 8, atk: 2, def: 9, spd: 2, hc: 10, ep: 1 }, icon: "Icons/Archetype/Frostland.png" , text: "Born of glacial silence and eternal winter, the Frostland embody the merciless stillness of the frozen wastes. Their strength lies not in speed, but in control, freezing foes in place and shattering them with ruthless precision. Defined by their mastery of ice, they lock enemies in chilling stasis before striking the final, frigid blow."},

// --- Construct --- //
grovehusk: {name: "Grovehusk", profile: { hp: 9, atk: 2, def: 10, spd: 2, hc: 5, ep: 7 }, icon: "Icons/Archetype/Grovehusk.png" , text: "NA."},
cindercore: {name: "Cindercore", profile: { hp: 2, atk: 8, def: 7, spd: 1, hc: 2, ep: 6 }, icon: "Icons/Archetype/Cindercore.png" , text: "Forged in molten crucibles deep beneath the world, the Cindercore are living constructs of stone and flame. Their hearts burn with rivers of lava, each strike searing with lingering pain. Unlike other flames that flare and fade, Cindercore are defined by their never-ending burning mastery and unyielding defenses. They are an archetype of attrition, grinding foes down with relentless heat until only ash and ruin remain."},
coralbound: {name: "Coralbound", profile: { hp: 9, atk: 4, def: 7, spd: 3, hc: 3, ep: 1 }, icon: "Icons/Archetype/Coralbound.png" , text: "Forged in the abyssal depths where steel meets coral, these aquatic constructs channel the crushing force of the ocean. With cannons unleashing torrents of compressed, high-pressure water, the Coralbound strike with relentless precision. Their true lethality emerges against soaked opponents, turning vulnerability into devastation. Defined by their mechanical resilience and liquid ferocity, they drown foes beneath waves of unyielding power."},
stratosurge: {name: "Stratosurge", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Stratosurge.png" , text: "Forged from clouds, lightning, and the power of the heavens, the Stratosurge soar through the skies with divine purpose. Their bodies hum with electric energy, and their strikes rain down with precision from above. Majestic and unstoppable, they bring the fury of storms and the might of the heavens to every battlefield."},
stormdrive: {name: "Stormdrive", profile: { hp: 2, atk: 7, def: 4, spd: 6, hc: 5, ep: 6 }, icon: "Icons/Archetype/Stormdrive.png" , text: "Fueled by raw electricity and engineered for flight, Stormdrive blaze across the battlefield with blinding speed. Their crackling bodies strike with precision, discharging bolts that tear through defenses. Agile and relentless, they harness the chaotic energy of storms to dominate the skies and outpace any foe."},
ironwrought: {name: "Ironwrought", profile: { hp: 7, atk: 5, def: 10, spd: 1, hc: 2, ep: 4 }, icon: "Icons/Archetype/Ironwrought.png" , text: "Bound from stone and forged with iron, the Ironwrought constructs are embodiments of unyielding strength. Their massive frames crush obstacles and shield allies alike, moving with the relentless weight of the earth. Slow but unstoppable, they dominate the battlefield through sheer durability and grounded might."},
plagueaxis: {name: "Plagueaxis", profile: { hp: 7, atk: 7, def: 4, spd: 2, hc: 6, ep: 5 }, icon: "Icons/Archetype/Plagueaxis.png" , text: "Forged from toxic sludge and corrupted machinery, the Plagueaxis spread decay wherever they tread. Their bodies exude poisonous fumes, and their attacks corrode both earth and enemy alike. Relentless and insidious, they turn the battlefield into a hazardous wasteland, leaving blighted terrain and weakened foes in their wake."},
solarforge: {name: "Solarforge", profile: { hp: 9, atk: 4, def: 8, spd: 3, hc: 2, ep: 7 }, icon: "Icons/Archetype/Solarforge.png" , text: "Forged from molten light and radiant energy, the Solarforge shine with unyielding brilliance. Their bodies radiate warmth and power, blinding foes while protecting allies. Every strike channels the fury of the sun, turning their presence into a beacon of strength and a force of relentless illumination on the battlefield."},
shadowgear: {name: "Shadowgear", profile: { hp: 1, atk: 7, def: 5, spd: 5, hc: 7, ep: 6 }, icon: "Icons/Archetype/Shadowgear.png" , text: "Bound by darkness and animated by restless shades, the Shadowgear move with eerie precision. Armor and weaponry fused with shadow strike unseen, slipping through defenses to overwhelm foes. Silent and relentless, they turn ordinary machinery into vessels of fear, wielding shadows as both shield and blade."},

// --- Elemental --- // 
pyro: {name: "Pyro", profile: { hp: 3, atk: 8, def: 2, spd: 6, hc: 4, ep: 6 }, icon: "Icons/Archetype/Pyro.png" , text: "Born from molten fury and the heart of burning flames, Pyros are pure embodiments of fire. Their bodies blaze with uncontrolled heat, and their movements ignite the air itself. Wherever they tread, flames consume and scorch, leaving nothing but ash in their wake, a testament to their unrelenting, fiery essence."},
hydral: {name: "Hyral", profile: { hp: 10, atk: 1, def: 4, spd: 4, hc: 9, ep: 3 }, icon: "Icons/Archetype/Hydral.png" , text: "Forged from rivers, tides, and the endless depths, the Hyrals are living currents of water given form. They surge and crash with unrelenting force, drenching and drowning all who oppose them. Fluid and adaptable, they strike with the inevitability of the ocean, pulling foes beneath waves of relentless, liquid power."},
galeform: {name: "Galeform", profile: { hp: 9, atk: 1, def: 6, spd: 3, hc: 7, ep: 10 }, icon: "Icons/Archetype/Galeform.png" , text: "Born of tempests and the rush of wind, Galeforms are swift, elusive elementals that strike with blades of air. Their movements are a blur, their attacks slicing and tearing with unerring precision. Masters of speed and agility, they descend like hurricanes, overwhelming foes with relentless, cutting gusts and the fury of the skies."},
golem: {name: "Golem", profile: { hp: 8, atk: 7, def: 10, spd: 1, hc: 2, ep: 4 }, icon: "Icons/Archetype/Golem.png" , text: "Forged from bedrock and shaped by the ages, the golems are embodiments of the earth. Their massive forms crush all that stand against them, while their unyielding bodies shrug off attacks with unwavering resilience. Slow but unstoppable, they move with the relentless patience of mountains, turning the battlefield into a fortress of stone and earth."},
obscurid: {name: "Obscurid", profile: { hp: 7, atk: 7, def: 3, spd: 8, hc: 6, ep: 7 }, icon: "Icons/Archetype/Obscurid.png" , text: "Born from shadow and void, the Obscurids are creeping shades that feed on the essence of life. Their forms shift and blur, slipping through defenses to drain strength and spirit from all who stand before them. Masters of subtlety and decay, they leave only emptiness in their wake, turning vitality into darkness."},
luminaut: {name: "Luminaut", profile: { hp: 9, atk: 3, def: 7, spd: 8, hc: 2, ep: 6 }, icon: "Icons/Archetype/Luminaut.png" , text: "Born of pure light and radiant energy, the Luminauts illuminate the battlefield with brilliance. Their presence purifies corruption and inspires allies, while their searing attacks blaze with the power of the sun. Majestic and unwavering, they embody the essence of radiance, turning darkness into hope and striking down those who oppose their light."},
corruptor: {name: "Corruptor", profile: { hp: 4, atk: 7, def: 4, spd: 2, hc: 5, ep: 5 }, icon: "Icons/Archetype/Corruptor.png" , text: "Born of venom, rot, and foul decay, the Corruptors spread poison wherever they go. Their touch withers plant and flesh alike, and their toxic presence corrupts even the purest of lands. Relentless and insidious, they revel in contamination, leaving blighted ground and weakened foes in their poisonous wake."},
voltkin: {name: "Voltkin", profile: { hp: 1, atk: 7, def: 1, spd: 7, hc: 4, ep: 6 }, icon: "Icons/Archetype/Voltkin.png" , text: "Forged from lightning and crackling energy, the Voltkin are living storms incarnate. Their bodies surge with electric power, striking with blinding speed and precision. Every movement sparks chaos, and every attack leaves a trail of crackling destruction, embodying the relentless fury of the storm."},
glacial: {name: "Glacial", profile: { hp: 9, atk: 3, def: 7, spd: 2, hc: 9, ep: 3 }, icon: "Icons/Archetype/Glacial.png" , text: "Born from frost and frozen winds, the Glacials are elementals of ice and chill. Their touch freezes the air and hardens the ground, slowing all who oppose them. Silent and relentless, they strike with the precision of falling icicles, leaving the battlefield encased in frost and their enemies trapped in the grip of winter’s wrath."},

// --- Dragon --- //
thornwing: {name: "Thornwing", profile: { hp: 8, atk: 4, def: 7, spd: 4, hc: 4, ep: 8 }, icon: "Icons/Archetype/Thornwing.png" , text: "Forged of scale, bark, and living wood, the Thornwing dragons embody the resilience of the ancient forests. Their hides are plated in thorned armor, their wings creaking like timber in the wind. Where others strike with fire or venom, they endure, turning battles into wars of attrition. The Thornwing are defined by their unyielding defenses, outlasting foes until nature itself reclaims the battlefield."},
blazingscale: {name: "Blazingscale", profile: { hp: 2, atk: 10, def: 3, spd: 8, hc: 3, ep: 8 }, icon: "Icons/Archetype/Blazingscale.png" , text: "Dragons wreathed in flame and fury, the Blazingscale are living wildfires given form. With every wingbeat they ignite the skies, leaving charred wastelands in their wake. They are devastation incarnate turning the land itself into an endless inferno."},
abyssdrake: {name: "Abyssdrake", profile: { hp: 9, atk: 3, def: 8, spd: 7, hc: 8, ep: 2 }, icon: "Icons/Archetype/Abyssdrake.png" , text: "Born from the crushing depths, the Abyssdrakes command the ocean’s fury as their weapon. With thunderous roars they summon towering tides, swallowing armies and kingdoms beneath relentless waves. To face an Abyssdrake is to stand against the endless surge of the abyss, a flood that drowns all hope beneath its dark waters."},
stormrazor: {name: "Stormrazor", profile: { hp: 4, atk: 9, def: 3, spd: 9, hc: 4, ep: 9 }, icon: "Icons/Archetype/Stormrazor.png" , text: "Forged in the heart of raging tempests, the Stormrazors embody the untamed wrath of thunder and sky. They descend with blinding speed, their wings crackling with storms as lightning answers their command. Each strike is a flash of devastation, leaving smoldering ruin in the wake of their tempestuous fury."},
ironclaw: {name: "Ironclaw", profile: { hp: 8, atk: 4, def: 9, spd: 3, hc: 2, ep: 3 }, icon: "Icons/Archetype/Ironclaw.png" , text: "Carved from stone and tempered iron, the Ironclaw dragons are bastions of unyielding strength. Their armored scales deflect even the fiercest assaults, and their presence fortifies the lands they guard. Patient and resolute, they stand as living ramparts, defending their territory with unbreakable resolve and steadfast vigilance."},
dreadspine: {name: "Dreadspine", profile: { hp: 6, atk: 7, def: 4, spd: 5, hc: 6, ep: 5 }, icon: "Icons/Archetype/Dreadspine.png" , text: "Twisted by venom and rot, the Dreadspine spread decay wherever their wings shadow the land. Their breath carries no flame, but a vile miasma that withers forests, poisons rivers, and corrodes stone. To face them is to watch life unravel into ruin, for their presence festers the earth with corruption untamed."},
solarwyrm: {name: "Solarwyrm", profile: { hp: 8, atk: 5, def: 6, spd: 6, hc: 5, ep: 4 }, icon: "Icons/Archetype/Solarwyrm.png" , text: "Born of pure light and radiant fire, the Solarwyrms stand as vigilant guardians of sacred lands. Their wings shimmer with the brilliance of the sun, and their gaze pierces through shadows of corruption. Guided by unwavering justice, they defend their realm with searing power, purifying all that threatens the sanctity of their domain."},
nightshroud: {name: "Nightshroud", profile: { hp: 6, atk: 7, def: 3, spd: 6, hc: 4, ep: 6 }, icon: "Icons/Archetype/Nightshroud.png" , text: "Born from the abyss of endless night, the Nightshrouds are dragons wreathed in shadow and silence. Their scales absorb the faintest light, and their movements are whispers across the battlefield. Masters of stealth and dread, they strike from darkness, leaving fear and uncertainty in their wake, as if the night had taken form to hunt."},
glimmerscale: {name: "Glimmerscale", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Archetype/Glimmerscale.png" , text: "Born of starlight and shimmering wings, the Glimmerscale are fairy-dragons whose radiant power is as enchanting as it is devastating. They weave between grace and fury, purifying corruption with gleaming light before unleashing searing, luminous strikes. Defined by their dual nature of elegance and ferocity, they are an archetype that blinds foes with brilliance, striking down darkness in a cascade of radiant fire."},  
*/};

const TYPES = {
	// CREATURE //
	angel: {name: "Angel", icon: "Icons/Type/Angel.png", text: "Beacons of divinity and order, the celestials are born of pure light and cosmic harmony. Their presence bends the heavens and stills the storms, for they are the will of creation made radiant. Guided by purpose beyond mortal grasp, they bring both mercy and judgment — for in their eyes, salvation and destruction are but reflections of balance restored."},
	avian: {name: "Avian", icon: "Icons/Type/Avian.png" , ability: 'Flying', text: "Graceful and fierce, the avians rule the skies with wisdom born of the wind. From mountaintop sanctuaries they watch the shifting lands below, their keen eyes ever wary, their hearts bound to the endless horizon. Whether messengers of dawn or harbingers of storm, the Avians embody freedom itself — swift, untouchable, and guided by the breath of the heavens."},
	beast: {name: "Beast", icon: "Icons/Type/Beast.png", ability: 'Rush', text: "Untamed and primal, beasts embody the raw pulse of nature unshaped by reason or restraint. From the silent hunter stalking through shadowed woods to the thunderous titan that shakes the earth, each creature moves with instinctive purpose. Though driven by hunger and survival, beasts are more than mere savagery — they are the heartbeat of the wild, the first language of a world that remembers no masters."},
	bone: {name: "Bone", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Bone.png" , text: ""},
	demon: {name: "Demon", icon: "Icons/Type/Demon.png", text: "Born from malice, ambition, and the echoes of forsaken gods, demons are the chaos that festers beneath creation. They thrive in conflict, feeding on desire, fear, and despair — yet each is bound by its own cunning will. To mortals they appear as nightmares made flesh, but to themselves they are architects of freedom, tearing down the fragile order that cages the world. Their power is corruption, and their truth — liberation through ruin."},
	dragon: {name: "Dragon", icon: "Icons/Type/Dragon.png", text: "Majestic, ancient, and unmatched in power, dragons embody the primal forces of creation and destruction. Each scale glimmers with the legacy of ages, and each breath reshapes the world itself. Though their temperaments vary—from wise guardians to wrathful tyrants—all dragons command awe and fear in equal measure, their presence a living reminder that the elements themselves can take form and will."},
	ghost: {name: "Ghost", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Ghost.png" , text: ""},
	harpy: {name: "Harpy", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Harpy.png" , text: ""},
	marine: {name: "Marine", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Marine.png" , text: ""},
	merfolk: {name: "Merfolk", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Merfolk.png" , text: ""},
	spirit: {name: "Spirit", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Spirit.png" , text: ""},
	zombie: {name: "Zombie", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Zombie.png" , text: ""},

	// AFFINITY - ATTRIBUTE //
	corrupted: {name: "Corrupted", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Corrupted.png" , text: ""},
	dark: {name: "Dark", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Dark.png" , text: ""},
	fire: {name: "Fire", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Fire.png" , text: ""},
	ice: {name: "Ice", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Ice.png" , text: ""},
	light: {name: "Light", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Light.png" , text: ""},
	nature: {name: "Nature", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Nature.png" , text: ""},
	mythical: {name: "Mythic", profile: { hp: 8, atk: 7, def: 4, spd: 5, hc: 2, ep: 3 }, icon: "Icons/Type/Mythical.png" , text: "Ferocious and untamed, Hybrids roam the wilds with bodies forged from multiple forms. With the strength of a bull, the speed of a stag, or the cunning of a fox, each beast strikes fear into those who cross their path. Raw instincts and primal power guide them, making every encounter with a Hybrid a savage test of survival."},
	rock: {name: "Rock", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Rock.png" , text: ""},
	sand: {name: "Sand", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Sand.png" , text: ""},
	steel: {name: "Steel", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Steel.png" , text: ""},
	shadow: {name: "Shadow", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Shadow.png" , text: ""},
	thunder: {name: "Thunder", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Thunder.png" , text: ""},
	toxic: {name: "Toxic", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Toxic.png" , text: ""},
	verdant: {name: "Verdant", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Verdant.png" , text: ""},
	water: {name: "Water", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Water.png" , text: ""},
	wind: {name: "Wind", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Wind.png" , text: ""},

	// FAEFOLK //
	fairy: {name: "Fairy", profile: { hp: 1, atk: 8, def: 2, spd: 8, hc: 2, ep: 10 }, icon: "Icons/Type/Fairy.png", ability: 'Flying', text: "Delicate yet mischievous, fairies flit through forests and meadows, their presence leaving trails of sparkling light. Though small, they wield surprising magic, weaving illusions and enchantments to protect their homes or play tricks on unwary travelers. Their beauty belies a cunning and spirited nature, always dancing between wonder and mischief."},
	elf: {name: "Elf", profile: { hp: 6, atk: 6, def: 4, spd: 6, hc: 2, ep: 7 }, icon: "Icons/Type/Elf.png", text: "Graceful and eternal, elves move with the harmony of the forests they protect. Skilled in both magic and archery, they strike with precision and wisdom, blending into nature as if part of it. Their keen senses and ancient knowledge make them formidable guardians, defending their realms with elegance, patience, and unwavering resolve."},
	satyr: {name: "Satyr", profile: { hp: 7, atk: 5, def: 5, spd: 5, hc: 3, ep: 8 }, icon: "Icons/Type/Satyr.png", text: "Wild-hearted and cunning, Satyrs embody the untamed spirit of nature. Their laughter echoes through moonlit groves as they dance between mischief and wisdom, balancing chaos and creation. Though their revels seem carefree, Satyrs are fierce protectors of their forests—striking swiftly with wit, charm, and primal magic when their woodland sanctuaries are threatened."},

	// BRUTE // 
	goblin: {name: "Goblin", profile: { hp: 2, atk: 7, def: 2, spd: 5, hc: 2, ep: 7 }, icon: "Icons/Type/Goblin.png", text: "Small, cunning, and endlessly resourceful, goblins thrive in hidden warrens and shadowed corners. They scurry with mischievous intent, ambushing foes and exploiting every weakness. Though individually weak, they strike in numbers, their chaotic energy turning even the simplest skirmish into unpredictable mayhem."},
	orc: {name: "Orcs", profile: { hp: 9, atk: 6, def: 8, spd: 3, hc: 1, ep: 1 }, icon: "Icons/Type/Orc.png", text: "Brutal, relentless, and fiercely proud, orcs thrive on the chaos of battle. Their strength and endurance make them formidable warriors, while their tribal bonds and warlike culture drive them to conquer and dominate. Though often feared for their ferocity, orcs are bound by honor within their clans, turning raw power into disciplined, devastating force."},
	dwarf: {name: "Dwarf", profile: { hp: 8, atk: 5, def: 9, spd: 1, hc: 3, ep: 3 }, icon: "Icons/Type/Dwarf.png", text: "Stout and steadfast, dwarves are master smiths and artisans, shaping stone and metal with unmatched skill. Their halls echo with hammer strikes and the roar of furnaces, as they craft weapons, armor, and treasures of legend quality. Fierce in defense and meticulous in craft, dwarves embody endurance, precision, and the enduring strength of their mountain homes."},
	arbor: {name: "Arbor", profile: { hp: 9, atk: 1, def: 6, spd: 3, hc: 7, ep: 10 }, icon: "Icons/Type/Arbor.png", text: "Born of roots, bark, and the living green of forests, the Arbor are guardians of nature’s heart. Their limbs weave and grow with unstoppable force, entangling foes and protecting the land. Patient yet relentless, they draw strength from the earth, turning forests into living battlegrounds where every vine and branch is a weapon."},

	// VESSEL //
	golem: {name: "Golem", profile: { hp: 4, atk: 10, def: 2, spd: 9, hc: 3, ep: 8 }, icon: "Icons/Type/Golem.png" , ability: 'Armor', text: "Forged from stone, metal, and elemental essence, golems are unstoppable engines of brute force. Their armored bodies shrug off attacks, while their immense strength allows them to exploit every weakness in their foes. Patient yet relentless, golems dominate the battlefield, their elemental fury leaving devastation in their calculated, crushing path."},
	construct: {name: "Construct", icon: "Icons/Type/Construct.png", ability: 'Armor', text: "Forged by mortal hands yet animated by unnatural will, constructs stand as monuments to creation without life. Some serve with perfect obedience, others wander seeking the purpose their makers abandoned. Whether wrought from steel, stone, or enchanted coral, each construct bears the echo of its creator’s intent — a silent testament to the line between genius and hubris."},
	elemental: {name: "Elemental", icon: "Icons/Type/Elemental.png", text: "Primordial and eternal, elementals are the living essence of the world’s raw forces. They are not born, but awakened; the whisper of wind given voice, the heartbeat of stone given motion. Neither good nor evil, they embody balance, shaping creation with every surge of flame, wave, or storm."},

	// TRAITS //
	armored: {name: "Armored", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Armored.png" , text: ""},
	assembly: {name: "Assembly", text: "Summon from the hand | Attach selected spare parts.", icon: "Icons/Trait/Assembly.png" },
	domain: {name: "Domain", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Domain.png" , text: ""},
	evolve: {name: "Evolve", text: "Get an 'Evolve' counter.", icon: "Icons/Trait/Evolve.png" },
	evolution: {name: "Evolution", text: "Summon from the hand | Attach 1 unit of the same archetype that have an 'Evolve' counter on it.", icon: "Icons/Trait/Evolution.png" },
	fuse: {name: "Fuse", text: "Get a 'Fuse' counter.", icon: "Icons/Trait/Fuse.png" },
	fusion: {name: "Fusion", text: "Summon from the hand | Attach 2 units of the same archetype that have a 'Fuse' counter on it.", icon: "Icons/Trait/Fusion.png" },
	transform: {name: "Transform", text: "Transforms unit by certain conditions | Attach it to the summoned unit", icon: "Icons/Trait/Transform.png" },
	warrior: {name: "Warrior", text: "Close combat units. If HP is below 1/3, gain {1}/{1}.", icon: "Icons/Trait/Warrior.png", ability: 'Protect',  },
	mage: {name: "Mage", text: "Can target flying and elusive creatures for attacks. Gain {1} Spd", icon: "Icons/Trait/Mage.png" },
	rogue: {name: "Rogue", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Rogue.png" , text: ""},
	ranger: {name: "Ranger", text: "Can target flying creatures for attacks. Gain {2} Spd", icon: "Icons/Trait/Ranger.png" },
	// ARTIFACTS //
	relic: {name: "Relic", text: "Attach to Terrains of the same Color.", icon: "Icons/Trait/Relic.png" },
	equipment: {name: "Equipment", text: "Attach to Creatures of the same Color/Type/Archetype.", icon: "Icons/Trait/Equipment.png" },
	weather: {name: "Weather", profile: { hp: 0, atk: 0, def: 0, spd: 0, hc: 0, ep: 0 }, icon: "Icons/Type/Weather.png" , text: ""},
	// SPELLS //
	aura: {name: "Aura", text: "Attach to creatures.", icon: "Icons/Trait/Aura.png" },
	enchantment: {name: "Enchantment", text: "Attach to lands.", icon: "Icons/Trait/Enchantment.png" },
  // ...
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
const defaultBanner = "Images/Banner/Default.png";
const avatarOptions = [
// --- COMMON GREEN AVATARS --- //
{ name: 'Fairy', src: 'Images/Avatar/Green/Fairy.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Wildwood Goblin', src: 'Images/Avatar/Green/WildwoodGoblin.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Verdant Serpent', src: 'Images/Avatar/VerdantSerpent.png', rarity: 'Common', price: 10, obtain: 'shop' },

{ name: 'Fire Golem', src: 'Images/Avatar/Red/FireGolem.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Kobold', src: 'Images/Avatar/Red/Kobold.png', rarity: 'Common', price: 10, obtain: 'shop' },
// --- ELEMENTA GENESIS COMMON CREATURES --- //
{ name: 'Satyr', src: 'Images/Avatar/Green/Satyr.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Emberling', src: 'Images/Avatar/Red/Emberling.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Mermaid', src: 'Images/Avatar/Blue/Mermaid.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Dolphin', src: 'Images/Avatar/Blue/Dolphin.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Runebound Shark', src: 'Images/Avatar/Blue/RuneboundShark.png', rarity: 'Common', price: 10, obtain: 'shop' },

{ name: 'Birdfolk', src: 'Images/Avatar/Yellow/Birdfolk.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Zephyr Sprite', src: 'Images/Avatar/Yellow/ZephyrSprite.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Thunderspawn', src: 'Images/Avatar/Yellow/Thunderspawn.png', rarity: 'Common', price: 10, obtain: 'shop' },

{ name: 'Orc', src: 'Images/Avatar/Gray/Orc.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Rockshell Armadillo', src: 'Images/Avatar/Gray/RockshellArmadillo.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Summit Watcher', src: 'Images/Avatar/Gray/SummitWatcher.png', rarity: 'Common', price: 10, obtain: 'shop' },

// --- COMMON WHITE AVATARS --- //
{ name: 'Angel', src: 'Images/Avatar/White/Angel.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Valkyrie', src: 'Images/Avatar/White/Valkyrie.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Angelic Warrior', src: 'Images/Avatar/White/AngelicWarrior.png', rarity: 'Common', price: 10, obtain: 'shop' },
// --- COMMON BLACK AVATARS --- //
{ name: 'Skeleton', src: 'Images/Avatar/Black/Skeleton.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Zombie', src: 'Images/Avatar/Black/Zombie.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Wolf', src: 'Images/Avatar/Black/Wolf.png', rarity: 'Common', price: 10, obtain: 'shop' },


// ECHOES OF CREATIONS RARE ELEMENTALS //
{ name: 'Elemental of Foliages', src: 'Images/Avatar/Green/ElementalofFoliages.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Elemental of Flames', src: 'Images/Avatar/Red/ElementalofFlames.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Elemental of Torrents', src: 'Images/Avatar/Blue/ElementalofTorrents.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Elemental of Gales', src: 'Images/Avatar/Yellow/ElementalofGales.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Elemental of Lightning', src: 'Images/Avatar/Yellow/ElementalofLightning.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Elemental of Boulders', src: 'Images/Avatar/Gray/ElementalofBoulders.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Elemental of Miasmas', src: 'Images/Avatar/Purple/ElementalofMiasmas.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Elemental of Lusters', src: 'Images/Avatar/White/ElementalofLusters.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Elemental of Shadows', src: 'Images/Avatar/Black/ElementalofShadows.png', rarity: 'Rare', price: 50, obtain: 'shop' },

// ELEMENTA GENESIS RARE HEROES  //
{ name: 'Verdara Soldier', src: 'Images/Avatar/Green/VerdaraSoldier.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Magmaris Mercenary', src: 'Images/Avatar/Red/MagmarisMercenary.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Umarion Paladin', src: 'Images/Avatar/Blue/UmarionPaladin.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Aetherion Electromancer', src: 'Images/Avatar/Yellow/AetherionElectromancer.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Drakzul Warmonger', src: 'Images/Avatar/Gray/DrakzulWarmonger.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Virkul Assassin', src: 'Images/Avatar/Purple/VirkulAssassin.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Solmara Archpriest', src: 'Images/Avatar/White/SolmaraArchpriest.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'NoctyraEnforcer', src: 'Images/Avatar/Black/NoctyraEnforcer.png', rarity: 'Rare', price: 50, obtain: 'shop' },


{ name: 'Rockmaul Rhino', src: 'Images/Avatar/Gray/RockmaulRhino.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Corrupted Dragon', src: 'Images/Avatar/Purple/CorruptedDragon.png', rarity: 'Rare', price: 50, obtain: 'shop' },

// ELEMENTA GENESIS LEGENDARY HEROES //
{ name: 'Veya, Verdara Druidess', src: 'Images/Avatar/Green/Veya.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Kaelen, Blazeborn Huntress', src: 'Images/Avatar/Red/Kaelen.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Serenya, Tidebound Enchantress', src: 'Images/Avatar/Blue/Serenya.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Zyra, Thunderblade Duelist', src: 'Images/Avatar/Yellow/Zyra.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Rudgar, Ironfist Mauler', src: 'Images/Avatar/Gray/Rudgar.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Selgor, Corrupted Warlord', src: 'Images/Avatar/Purple/Selgor.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Elyndra, Dawnblade of Heavens', src: 'Images/Avatar/White/Elyndra.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Velmira, Mistress of Silence', src: 'Images/Avatar/Black/Velmira.png', rarity: 'Legend', price: 100, obtain: 'shop' },

// ELEMENTA GENESIS HEROES 2 //
{ name: 'Faelyra, Wildhorn Empress', src: 'Images/Avatar/Green/Faelyra.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Kaelyra, Magmaris Heiress', src: 'Images/Avatar/Red/Kaelyra.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Zaryon, Umarion Commander', src: 'Images/Avatar/Blue/Zaryon.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Garuda, Aetherion Wings', src: 'Images/Avatar/Yellow/Garuda.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Gravok, Drakzul Tyrant', src: 'Images/Avatar/Gray/Gravok.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Mordrath, Virkul Phantom', src: 'Images/Avatar/Purple/Mordrath.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Seraphiel, Solmara Paragon', src: 'Images/Avatar/White/Seraphiel.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Morvane, Noctyra Oathbreaker', src: 'Images/Avatar/Black/Morvane.png', rarity: 'Legend', price: 100, obtain: 'shop' },


// FRACTURED ORIGINS HEROES //
{ name: 'Sylvania, Thornvale Queen', src: 'Images/Avatar/Green/Sylvania.png', rarity: 'Legend', price: 100, obtain: 'shop' },

{ name: 'Tydros, Coralbound Tidebreaker', src: 'Images/Avatar/Blue/Tydros.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Astranyra, Thunderbane', src: 'Images/Avatar/Yellow/Astranyra.png', rarity: 'Legend', price: 100, obtain: 'shop' },


  
{ name: 'Nyzariel, Archdemon Duchess', src: 'Images/Avatar/Black/Nyzariel.png', rarity: 'Legend', price: 100, obtain: 'shop' },

// DRAGONLINGS //
{ name: 'Verdarok, Mosslet Guardian', src: 'Images/Avatar/Green/VerdarokMossletGuardian.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Pyronyx, Ember Breeze', src: 'Images/Avatar/Red/PyronyxEmberBreeze.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Abyndra, Foamscale Wyrmling', src: 'Images/Avatar/Blue/AbyndraFoamscaleWyrmling.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Voltrazek, Boltling Skyrend', src: 'Images/Avatar/Yellow/VoltrazekBoltlingSkyrend.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Ferronyx, Ironhide Stonelet', src: 'Images/Avatar/Gray/FerronyxIronhideStonelet.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Myxaroth, Mirefang Broodling', src: 'Images/Avatar/Purple/MyxarothMirefangBroodling.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Solaryth, Dawngleam Whelp', src: 'Images/Avatar/White/SolarythDawngleamWhelp.png', rarity: 'Rare', price: 50, obtain: 'shop' },
{ name: 'Noctyros, Dusk Whisper', src: 'Images/Avatar/Black/NoctyrosDuskWhisper.png', rarity: 'Rare', price: 50, obtain: 'shop' },

// --- LEGENDARY GREEN AVATARS --- //

// ELDER DRAGONS //
{ name: 'Verdarok, Sylvan Thornwing', src: 'Images/Avatar/Green/VerdarokSylvanThornwing.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Pyronyx, Inferno Blazingscale', src: 'Images/Avatar/Red/PyronyxInfernoBlazingscale.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Abyndra, Tidal Abyssdrake', src: 'Images/Avatar/Blue/AbyndraTidalAbyssdrake.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Voltrazek, Tempest Stormrazor', src: 'Images/Avatar/Yellow/VoltrazekTempestStormrazor.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Ferronyx, Terra Ironclaw', src: 'Images/Avatar/Gray/FerronyxTerraIronclaw.png', rarity: 'Legend', price: 100, obtain: 'shop' },	
{ name: 'Myxaroth, Cursed Dreadspine', src: 'Images/Avatar/Purple/MyxarothCursedDreadspine.png', rarity: 'Legend', price: 100, obtain: 'shop' },	
{ name: 'Solaryth, Radiant Solarwyrm', src: 'Images/Avatar/White/SolarythRadiantSolarwyrm.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Noctyros, Umbral Nightshroud', src: 'Images/Avatar/Black/NoctyrosUmbralNightshroud.png', rarity: 'Legend', price: 100, obtain: 'shop' },

// LEGENDARY ELEMENTALS //
// ECHOES OF CREATION COMMON ELEMENTALS //
{ name: 'Elemental of Leaves', src: 'Images/Avatar/Green/ElementalofLeaves.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Elemental of Embers', src: 'Images/Avatar/Red/ElementalofEmbers.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Elemental of Droplets', src: 'Images/Avatar/Blue/ElementalofDroplets.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Elemental of Sparks', src: 'Images/Avatar/Yellow/ElementalofSparks.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Elemental of Pebbles', src: 'Images/Avatar/Gray/ElementalofPebbles.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Elemental of Toxins', src: 'Images/Avatar/Purple/ElementalofToxins.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Elemental of Gleams', src: 'Images/Avatar/White/ElementalofGleams.png', rarity: 'Common', price: 10, obtain: 'shop' },
{ name: 'Elemental of Shades', src: 'Images/Avatar/Black/ElementalofShades.png', rarity: 'Common', price: 10, obtain: 'shop' },

{ name: 'Pyrokrag, Golemheart Titan', src: 'Images/Avatar/Red/Pyrokrag.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Hydrion, Primeval Floodbringer', src: 'Images/Avatar/Blue/Hydrion.png', rarity: 'Legend', price: 100, obtain: 'shop' },


// LEGENDARY CONSTRUCTS //
{ name: 'Ignavaryn, Cindercore Automaton', src: 'Images/Avatar/Red/Ignavaryn.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Maelvyrn, Coralbound Leviathan', src: 'Images/Avatar/Blue/Maelvyrn.png', rarity: 'Legend', price: 100, obtain: 'shop' },

{ name: 'Ephoros, Hellfire Behemoth', src: 'Images/Avatar/Red/Ephoros.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Ashara, Hellfire Matriarch', src: 'Images/Avatar/Red/Ashara.png', rarity: 'Legend', price: 100, obtain: 'shop' },

{ name: 'Eirawen, Frostland Queen', src: 'Images/Avatar/Blue/Eirawen.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Draven, Adamant Emperor', src: 'Images/Avatar/Gray/Draven.png', rarity: 'Legend', price: 100, obtain: 'shop' },

{ name: 'Veniryss, Spider Princess', src: 'Images/Avatar/Purple/Veniryss.png', rarity: 'Legend', price: 100, obtain: 'shop' },

{ name: 'Maldryss, Skullframe Archmage', src: 'Images/Avatar/Black/Maldryss.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Raukhar, Duskwing Knight', src: 'Images/Avatar/Black/Raukhar.png', rarity: 'Legend', price: 100, obtain: 'shop' },
{ name: 'Vorganna, Crimson Blade', src: 'Images/Avatar/Black/Vorganna.png', rarity: 'Legend', price: 100, obtain: 'shop' },

];

const bannerOptions = [
  { name: 'Forest', src: 'Images/Banner/Forest.png', price: 100, obtain: 'shop', unlock: { type: "achievementTierClaimed", groupId: "color_green", tier: 1 } },
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

const cardbackOptions = [
  { name: 'Fairy', src: 'Images/Cardback/Fairy.png', rarity: 'Common', price: 100, obtain: 'shop' },
  { name: 'Cindercore', src: 'Images/Cardback/Cindercore.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Construct', src: 'Images/Cardback/Construct.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Coralbound', src: 'Images/Cardback/Coralbound.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Fireland', src: 'Images/Cardback/Fireland.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Goblin', src: 'Images/Cardback/Goblin.png', rarity: 'Common', price: 100, obtain: 'shop' },
  { name: 'Golemheart', src: 'Images/Cardback/Golemheart.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Merfolk', src: 'Images/Cardback/Merfolk.png', rarity: 'Common', price: 100, obtain: 'shop' },
  { name: 'Moonfang', src: 'Images/Cardback/Moonfang.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Satyr', src: 'Images/Cardback/Satyr.png', rarity: 'Common', price: 100, obtain: 'shop' },
  { name: 'Obscurid', src: 'Images/Cardback/Obscurid.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Stonebound', src: 'Images/Cardback/Stonebound.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Stormcore', src: 'Images/Cardback/Stormcore.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Plagueaxis', src: 'Images/Cardback/Plagueaxis.png', rarity: 'Legend', price: 100, obtain: 'shop' },
  { name: 'Grovehusk', src: 'Images/Cardback/Woodframe.png', rarity: 'Legend', price: 100, obtain: 'shop' }
];

const cardStyles = [
	{ cardId: 'EryndorVerdaraKing', key: "fullArt", label: "Eryndor", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'FaelyraWildhornEmpress', key: "fullArt", label: "Faelyra", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'KaelyraMagmarisHeiress', key: "fullArt", label: "Kaelyra", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'KaelenFirelandHuntress', key: "fullArt", label: "Kaelen", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'SerenyaTideboundEnchantress', key: "fullArt", label: "Serenya", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'ZaryonUmarionCommander', key: "fullArt", label: "Zaryon", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'ZyraThunderbladeDuelist', key: "fullArt", label: "Zyra", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'GarudaAetherion Wings', key: "fullArt", label: "Garuda", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'RudgarIronfistMauler', key: "fullArt", label: "Rudgar", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'GravokDrakzulTyrant', key: "fullArt", label: "Gravok", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'SelgorCorruptedWarlock', key: "fullArt", label: "Selgor", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'MordrathVirkulPhantom', key: "fullArt", label: "Mordrath", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'ElyndraDawnbladeofHeavens', key: "fullArt", label: "Elyndra", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'SeraphielSolmaraParagon', key: "fullArt", label: "Seraphiel", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'VelmiraMistressofSilence', key: "fullArt", label: "Faelyra", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'MorvaneNoctyraOathbreaker', key: "fullArt", label: "Morvane", rarity: 'Legend', price: 100, obtain: 'shop' },
	{ cardId: 'Forest', key: "fullArt", label: "Forest", rarity: 'Common', price: 10, obtain: 'shop' },
	{ cardId: 'Volcano', key: "fullArt", label: "Volcano", rarity: 'Common', price: 10, obtain: 'shop' },	
	{ cardId: 'Ocean', key: "fullArt", label: "Ocean", rarity: 'Common', price: 10, obtain: 'shop' },
	{ cardId: 'Peaks', key: "fullArt", label: "Peaks", rarity: 'Common', price: 10, obtain: 'shop' },
	{ cardId: 'Mountain', key: "fullArt", label: "Mountain", rarity: 'Common', price: 10, obtain: 'shop' },
	{ cardId: 'Swamp', key: "fullArt", label: "Swamp", rarity: 'Common', price: 10, obtain: 'shop' },	
	{ cardId: 'Plains', key: "fullArt", label: "Plains", rarity: 'Common', price: 10, obtain: 'shop' },
	{ cardId: 'Wasteland', key: "fullArt", label: "Wasteland", rarity: 'Common', price: 10, obtain: 'shop' },	
];

const packPrices = [
  { id: "EssenceLegacy", name: "Essence Legacy", price: 90,
    image: 'Images/Pack/EssenceLegacy.png'
  },
  { id: "ElementaGenesis", name: "Elementa Genesis", price: 100,
    image: 'Images/Pack/ElementaGenesis.png'
  },
/*
  { id: "HeroesAwaken", name: "Heroes Awaken", price: 100,
    image: 'Images/Pack/HeroesAwaken.png'
  },
  {
    id: "ScalesofRuin",
    name: "Scales of Ruin",
    price: 100,
    image: 'Images/Pack/ScalesofRuin.png',
	pack: ['CardImages/Pack/ScalesofRuinPyronyx.png', 'CardImages/Pack/ScalesofRuinVoltrazek.png',
		   'CardImages/Pack/ScalesofRuinMyxaroth.png', 'CardImages/Pack/ScalesofRuinNoctyros.png']
  },*/
  // "ScalesofRuin": 100,"WyrmheartAwakening": 100,"MischiefUnbound": 100,"PrimordialAscension": 100,"IronbornProtocol": 100,"SavageTerritory": 100,"FeatheredOmen": 100,
];
const packOptions = packPrices;

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
// ---- Global player state defaults (must be declared before use) ----
let playerCollection = {};
let playerCurrency = 0;
let playerEssence = 0;
let playerLevel = 1;
let playerExp = 0;
const COLLECTION_KEY = "cardCollection";
const NEW_CARD_KEY = "newlyUnlockedCards";
// ----------------- //
// --- FUNCTIONS --- //
// ----------------- //

function getNewlyUnlockedCards() {
  return JSON.parse(localStorage.getItem(NEW_CARD_KEY)) || [];
}

function setNewlyUnlockedCards(arr) {
  localStorage.setItem(NEW_CARD_KEY, JSON.stringify(arr));
}
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
  timerDiv.textContent = `Next quests reset in ${formatTimer(ms)}`;
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
  const dot = document.getElementById('achievements-notification-dot');
  if (!dot) return;

  let hasClaimable = false;

  for (const sectionDef of Object.values(ACHIEVEMENTS || {})) {
    const groups = Array.isArray(sectionDef?.groups) ? sectionDef.groups : [];

    for (const group of groups) {
      const groupId = group?.id;
      const tiers = Array.isArray(group?.tiers) ? group.tiers : [];
      if (!groupId) continue;

      const progressValue = Number(achievementData?.progress?.[groupId] || 0);
      const claimedMap = achievementData?.claimed?.[groupId] || {};

      for (const t of tiers) {
        const tierNum = Number(t?.tier || 0);
        const goal = Number(t?.goal || 0);
        if (!tierNum || !goal) continue;

        const completed = progressValue >= goal;
        const claimed = !!claimedMap[tierNum];

        if (completed && !claimed) {
          hasClaimable = true;
          break;
        }
      }

      if (hasClaimable) break;
    }

    if (hasClaimable) break;
  }

  dot.style.display = hasClaimable ? 'block' : 'none';
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

// Expose quest/achievement/level functions globally for use in other scripts or inline HTML
window.renderQuests = renderQuests;
window.renderAchievements = renderAchievements;
window.renderPlayerLevel = renderPlayerLevel;
window.updateQuestsNotificationDot = updateQuestsNotificationDot;
window.updateAchievementsNotificationDot = updateAchievementsNotificationDot;
window.startQuestTimers = startQuestTimers;
window.ACHIEVEMENTS = ACHIEVEMENTS;
let currentSearchQuery = "";
let currentUserPage = 0;
let lastVisibleUser = null;
let userSearchPages = [];
const USERS_PER_PAGE = 10;

// ==========================
// === LIBRARY SECTION ===
// ==========================

const libraryGallery = document.getElementById('library-cards');
const libraryBackBtn = document.getElementById('library-back-btn');
const librarySettingsBtn = document.getElementById('library-settings-btn');
const libraryFilterBtn = document.getElementById('library-filter-btn');
const libraryNameFilter = document.getElementById('filter-name-library');
const libraryFavIcon = document.getElementById('filter-favorites-library');
let showFavoritesOnlyLibrary = false;

// Back button
if (libraryBackBtn) {
  libraryBackBtn.onclick = function() {
    document.getElementById('library-section').classList.remove('active');
    document.getElementById('home-section').classList.add('active');
  };
}

// Settings button
if (librarySettingsBtn) {
  librarySettingsBtn.onclick = function() {
    document.getElementById('settings-modal').style.display = 'flex';
  };
}

// Filter button
if (libraryFilterBtn) {
  libraryFilterBtn.onclick = () => {
    showFilterModal('library', (selectedFilters) => {
      renderLibrary();
    });
  };
}

// Name filter
if (libraryNameFilter) {
  libraryNameFilter.addEventListener('input', function() {
    renderLibrary();
  });
}

// Favorites filter
if (libraryFavIcon) {
  libraryFavIcon.onclick = function() {
    showFavoritesOnlyLibrary = !showFavoritesOnlyLibrary;
    updateFavoriteFilterIconLibrary();
    renderLibrary();
  };
}

// Reset filters button
const resetLibraryBtn = document.getElementById('reset-library-filters-btn');
if (resetLibraryBtn) {
  resetLibraryBtn.onclick = function() {
    // Reset name filter
    if (libraryNameFilter) libraryNameFilter.value = '';
    
    // Reset favorites
    showFavoritesOnlyLibrary = false;
    updateFavoriteFilterIconLibrary();
    
    // Reset modal filters (if you have a function to do this)
    if (typeof resetFilterModal === 'function') {
      resetFilterModal('library');
    }
    
    // Re-render
    renderLibrary();
  };
}

function updateFavoriteFilterIconLibrary() {
  if (!libraryFavIcon) return;
  if (showFavoritesOnlyLibrary) {
    libraryFavIcon.style.filter = 'none';
    libraryFavIcon.style.opacity = '1';
    libraryFavIcon.title = 'Showing favorites';
  } else {
    libraryFavIcon.style.filter = 'grayscale(1)';
    libraryFavIcon.style.opacity = '0.6';
    libraryFavIcon.title = 'Show only favorites';
  }
}

function createCardLibrary(card) {
  const div = document.createElement('div');
  div.className = 'card-library'; // Changed from 'card-gallery' to 'card-library'
  
  if (card.rarity) {
    div.setAttribute('data-rarity', card.rarity);
  }
  div.classList.add(getRarityBgClass(card));

  const img = document.createElement('img');
  img.src = card.image;
  img.onerror = function() {
    this.onerror = null;
    this.src = "Icons/Other/Placeholder.png";
  };
  img.alt = card.name;
  img.classList.add('card-art-image');
  img.title = card.name;

  div.appendChild(img);

  // Add star for favorite
  if (isFavorite(card.id)) {
    const star = document.createElement('img');
    star.src = 'Icons/Other/Star.png';
    star.alt = 'Favorite';
    star.className = 'library-favorite-star'; // Updated class name
    star.style.position = 'absolute';
    star.style.top = '6px';
    star.style.right = '6px';
    star.style.width = '28px';
    star.style.height = '28px';
    star.style.zIndex = '5';
    div.appendChild(star);
  }

  // **ATTACH HOLD-TO-VIEW HANDLER**
  holdClickToView(div, card, (e) => {
    e.stopPropagation();
    showLibraryCardMenu(card, div);
  });

  return div;
}

function renderLibrary() {
  if (!libraryGallery) return;
  
  // Clear the library
  libraryGallery.innerHTML = '';

  const favoriteIds = getFavoriteCards();
  const selectedFilters = getSelectedFiltersFromModal(); // Fetch modal-selected filters
  
  if (!selectedFilters) {
    console.error('No filters available; rendering aborted.');
    return;
  }
  
  const nameFilter = libraryNameFilter?.value?.toLowerCase() || '';
  
  // Filter all cards from dummyCards (the complete card library)
  const filteredCards = filterCards({
    collection: null, // No collection filtering for library
    favoriteIds,
    showFavoritesOnly: showFavoritesOnlyLibrary,
    nameFilter,  
    ...selectedFilters,
  });

  // Early return if no cards match the filters
  if (filteredCards.length === 0) {
    libraryGallery.innerHTML = "<div>No cards match the selected filters.</div>";
    return;
  }

  // Render each card
  filteredCards.forEach((card) => {
    const cardDiv = createCardLibrary(card);
    libraryGallery.appendChild(cardDiv);
  });
}

function showLibraryCardMenu(card, anchorDiv) {
  // Get the menu DOM element
  const menu = document.getElementById('library-card-menu');
  if (!menu) return;

  // Remove modal-specific classes/styles
  menu.className = "menu";
  menu.style.display = "block";
  menu.style.position = "absolute";
  menu.style.zIndex = "1000";
  menu.style.minWidth = "180px";
  menu.style.boxShadow = "0 6px 32px #000b";
  menu.style.borderRadius = "14px";
  menu.style.background = "#253047";
  menu.style.padding = "0";
  menu.style.transition = "opacity 0.2s";
  menu._activeCard = card;

  // Remove any previous outside click handler
  if (window.libraryMenuOutsideHandler) {
    document.body.removeEventListener('mousedown', window.libraryMenuOutsideHandler);
    window.libraryMenuOutsideHandler = null;
  }
  
  // Add new outside click handler
  window.libraryMenuOutsideHandler = function(e) {
    if (!menu.contains(e.target)) {
      menu.style.display = "none";
      menu._activeCard = null;
      document.body.removeEventListener('mousedown', window.libraryMenuOutsideHandler);
      window.libraryMenuOutsideHandler = null;
    }
  };
  
  setTimeout(() => {
    document.body.addEventListener('mousedown', window.libraryMenuOutsideHandler);
  }, 10);

  // Position the menu near the card
  const rect = anchorDiv.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  
  let top = rect.top + scrollY + 10;
  let left = rect.right + scrollX + 12;

  // If not enough space to the right, show to the left
  if (left + menu.offsetWidth > window.innerWidth) {
    left = rect.left + scrollX - menu.offsetWidth - 12;
    if (left < 0) left = 10;
  }
  
  // If not enough space below, show above
  if (top + menu.offsetHeight > window.innerHeight) {
    top = rect.bottom + scrollY - menu.offsetHeight - 10;
    if (top < 0) top = 10;
  }

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;

  // Set up handlers for actions
  document.getElementById('library-card-view-btn').onclick = function() {
    showFullCardModal(card);
    menu.style.display = "none";
  };

  // === FAVORITE BUTTON ===
  const modalContent = menu.querySelector('.modal-content');
  let favoriteBtn = modalContent.querySelector('#library-card-favorite-btn');
  if (favoriteBtn) favoriteBtn.remove();

  favoriteBtn = document.createElement('button');
  favoriteBtn.id = "library-card-favorite-btn";
  favoriteBtn.className = "settings-item";
  favoriteBtn.style.width = "100%";
  favoriteBtn.style.textAlign = "left";
  
  const isFav = isFavorite(card.id);
  favoriteBtn.innerHTML = `<img src="Icons/Other/Star.png" alt="Favorite" style="width:20px;vertical-align:middle;margin-right:10px;"> ${isFav ? 'Unfavorite' : 'Favorite'}`;
  
  favoriteBtn.onclick = function(e) {
    e.stopPropagation();
    toggleFavorite(card.id);
    menu.style.display = "none";
    renderLibrary();
  };
  
  modalContent.appendChild(favoriteBtn);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Render library when section becomes active
  const librarySection = document.getElementById('library-section');
  if (librarySection) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          if (librarySection.classList.contains('active')) {
            renderLibrary();
          }
        }
      });
    });
    observer.observe(librarySection, { attributes: true });
  }
});

// ==========================
// === GALLERY LOGIC ===
// ==========================
const gallery = document.getElementById('gallery-cards');
const CREATE_ESSENCE_COST = {common: 5, rare: 25, legendary: 100};
const VOID_ESSENCE_REFUND = {common: 1, rare: 5, legendary: 20};

let showFavoritesOnly = false;

// ==========================
// === RENDERING CARDS ===
// ==========================
document.getElementById("gallery-filter-btn").onclick = () => {
  showFilterModal((selectedFilters) => {
    // Render the filtered cards
    renderGallery(filteredCards);
  });
};
// Favorite filter icon logic
document.addEventListener('DOMContentLoaded', function() {
  const favIcon = document.getElementById('filter-favorites-gallery');
  if (favIcon) {
    favIcon.onclick = function() {
      showFavoritesOnly = !showFavoritesOnly;
      updateFavoriteFilterIcon();
      renderGallery();
    };
    updateFavoriteFilterIcon();
  }
});

// Add to DOMContentLoaded or after filter setup
document.addEventListener('DOMContentLoaded', function() {
  const resetBtn = document.getElementById('reset-gallery-filters-btn');
  if (resetBtn) {
resetBtn.onclick = function() {
  // Reset text input and ownership (if present)
  const nameInput = document.getElementById('filter-name-gallery');
  if (nameInput) nameInput.value = "";

  const ownershipInput = document.getElementById('filter-ownership-gallery');
  if (ownershipInput) ownershipInput.value = "Owned";

  // Reset favorites
  showFavoritesOnly = false;
  updateFavoriteFilterIcon();

  renderGallery();
};
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Extend gallery essence display to include Bulk Void button
  const galleryEl = document.getElementById('gallery-essence-amount');
  if (galleryEl) {
    let bulkVoidBtn = document.getElementById('bulk-void-btn');
    if (!bulkVoidBtn) {
      bulkVoidBtn = document.createElement('img');
      bulkVoidBtn.id = 'bulk-void-btn';
      bulkVoidBtn.src = 'Icons/Other/Void.png';
      bulkVoidBtn.alt = 'Bulk Void';
      bulkVoidBtn.title = 'Bulk Void duplicates for essence';
      bulkVoidBtn.style.width = '28px';
      bulkVoidBtn.style.height = '28px';
      bulkVoidBtn.style.cursor = 'pointer';
      bulkVoidBtn.style.verticalAlign = 'middle';
      bulkVoidBtn.style.marginLeft = '8px';
      bulkVoidBtn.onclick = showBulkVoidModal;
      galleryEl.parentNode.insertBefore(bulkVoidBtn, galleryEl.nextSibling);
    }
  }
});
// Update the icon appearance
function updateFavoriteFilterIcon() {
  const favIcon = document.getElementById('filter-favorites-gallery');
  if (!favIcon) return;
  if (showFavoritesOnly) {
    favIcon.style.filter = 'none';
    favIcon.style.opacity = '1';
    favIcon.title = 'Showing favorites';
  } else {
    favIcon.style.filter = 'grayscale(1)';
    favIcon.style.opacity = '0.6';
    favIcon.title = 'Show only favorites';
  }
}

function getMinimumKeptForRarity(card) {
  if (!card.rarity) return 1; // Default fallback
  switch (card.rarity.toLowerCase()) {
    case 'legendary': return 1;
    case 'rare':      return 2;
    case 'common':      return 3;
    default:          return 1;
  }
}

function getRarityKey(card) {
  // Defensive: default to 'common' if missing/unknown
  return (card.rarity || 'common').toLowerCase();
}
document.getElementById('gallery-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('gallery-back-btn').onclick = function() {
  // For example, return to home or previous section
  document.getElementById('gallery-section').classList.remove('active');
  document.getElementById('home-section').classList.add('active');
};
function getRarityBgClass(card) {
  // Returns a CSS class for the rarity wrapper color
  switch ((card.rarity || '').toLowerCase()) {
    case 'common':    return 'card-rarity-common';
    case 'rare':      return 'card-rarity-rare';
    case 'legendary': return 'card-rarity-legendary';
    default:          return 'card-rarity-common';
  }
}
function createCardGallery(card) {
    const collection = getCollection();
    const owned = collection[card.id] || 0;

    const div = document.createElement('div');
    div.className = 'card-gallery';
    if (card.rarity) div.setAttribute('data-rarity', card.rarity);
  
    div.classList.add(getRarityBgClass(card));

    const img = document.createElement('img');
    img.src = (typeof window.getCardArtForOwner === "function")
      ? window.getCardArtForOwner(card, "player")
      : card.image;
  
    img.onerror = function() {
      this.onerror = null;
      this.src = "Icons/Other/Placeholder.png";
    };
    img.alt = card.name;
    img.classList.add('card-art-image');
    img.title = card.name;

    // GRAY OUT if not owned
    if (owned === 0) {
      img.classList.add('card-image-locked');
      div.classList.add('card-locked');
    }

    div.appendChild(img);

    // "New!" badge
    const newCards = getNewlyUnlockedCards();
    if (newCards.includes(card.id)) {
      const newBadge = document.createElement('div');
      newBadge.className = 'new-card-badge';
      newBadge.textContent = 'New!';
      div.appendChild(newBadge);
    }

    // Show count badge
    const countBadge = document.createElement('div');
    countBadge.className = 'card-count-badge';
    countBadge.textContent = owned;
    div.appendChild(countBadge);

    // Add star for favorite
    if (isFavorite(card.id)) {
      const star = document.createElement('img');
      star.src = 'Icons/Other/Star.png';
      star.alt = 'Favorite';
      star.className = 'gallery-favorite-star';
      star.style.position = 'absolute';
      star.style.top = '6px';
      star.style.right = '6px';
      star.style.width = '28px';
      star.style.height = '28px';
      star.style.zIndex = '5';
      div.appendChild(star);
    }
  holdClickToView(div, card, (e) => {
    e.stopPropagation();
    showGalleryCardMenu(card, div);
  });
  return div;
}

function renderGallery() {
  // Clear the gallery before rendering
  gallery.innerHTML = '';

  // Get the player collection and favorite cards
  const collection = getCollection();
  const favoriteIds = getFavoriteCards();

  const selectedFilters = getSelectedFiltersFromModal(); // Fetch modal-selected filters
  if (!selectedFilters) {
    console.error('No filters available; rendering aborted.');
    return;
  }
  const nameFilterInput = document.getElementById('filter-name-gallery');
  const nameFilter = nameFilterInput?.value?.toLowerCase() || '';
  // Filter cards based on the selections from the modal
  const filteredCards = filterCards({
    collection,
    favoriteIds,
    showFavoritesOnly,
    nameFilter,  
    ...selectedFilters,
  });

  // Update the collection progress display based on filtered cards
  updateGalleryCollectionProgress(filteredCards);

  // Early return if no cards match the filters
  if (filteredCards.length === 0) {
    gallery.innerHTML = "<div>No cards match the selected filters.</div>";
    return;
  }

  // Render each card that matches the filters
  filteredCards.forEach((card) => {
    const cardDiv = createCardGallery(card); // Generate the card HTML
    gallery.appendChild(cardDiv); // Append the card to the gallery
  });

  // Optionally update the essence display for the UI
  updateEssenceDisplay();
}

// FAVORITE CARDS
function getFavoriteCards() {
  return Array.isArray(window.favoriteCards) ? window.favoriteCards : [];
}
function isFavorite(cardId) {
  return getFavoriteCards().includes(cardId);
}
function toggleFavorite(cardId) {
  if (!window.favoriteCards) window.favoriteCards = [];
  const idx = window.favoriteCards.indexOf(cardId);
  if (idx >= 0) {
    window.favoriteCards.splice(idx, 1);
  } else {
    window.favoriteCards.push(cardId);
  }
  saveProgress();
}

function showGalleryCardMenu(card, anchorDiv) {
  // Get the menu DOM element
  const menu = document.getElementById('gallery-card-menu');
  if (!menu) return;

  // Remove modal-specific classes/styles
  menu.className = "menu";
  menu.style.display = "block";
  menu.style.position = "absolute";
  menu.style.zIndex = "1000";
  menu.style.minWidth = "180px";
  menu.style.boxShadow = "0 6px 32px #000b";
  menu.style.borderRadius = "14px";
  menu.style.background = "#253047";
  menu.style.padding = "0";
  menu.style.transition = "opacity 0.2s";
  menu._activeCard = card;

  // Remove any previous outside click handler
  if (window.galleryMenuOutsideHandler) {
    document.body.removeEventListener('mousedown', window.galleryMenuOutsideHandler);
    window.galleryMenuOutsideHandler = null;
  }
  // Add new outside click handler
  window.galleryMenuOutsideHandler = function(e) {
    if (!menu.contains(e.target)) {
      menu.style.display = "none";
      menu._activeCard = null;
      document.body.removeEventListener('mousedown', window.galleryMenuOutsideHandler);
      window.galleryMenuOutsideHandler = null;
    }
  };
  setTimeout(() => {
    document.body.addEventListener('mousedown', window.galleryMenuOutsideHandler);
  }, 10);

  // Position the menu near the card
  const rect = anchorDiv.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  // By default, show to the right and slightly below the card
  let top = rect.top + scrollY + 10;
  let left = rect.right + scrollX + 12;

  // If not enough space to the right, show to the left
  if (left + menu.offsetWidth > window.innerWidth) {
    left = rect.left + scrollX - menu.offsetWidth - 12;
    if (left < 0) left = 10;
  }
  // If not enough space below, show above
  if (top + menu.offsetHeight > window.innerHeight) {
    top = rect.bottom + scrollY - menu.offsetHeight - 10;
    if (top < 0) top = 10;
  }

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;

  // Set up handlers for actions
  document.getElementById('gallery-card-view-btn').onclick = function() {
    showFullCardModal(card);
    menu.style.display = "none";
    const newCards = getNewlyUnlockedCards().filter(id => id !== card.id);
    setNewlyUnlockedCards(newCards);
    renderGallery();
  };
  document.getElementById('gallery-card-create-btn').onclick = function() {
    createCreateCardButton(card, renderGallery).onclick(new MouseEvent('click'));
    menu.style.display = "none";
  };
  document.getElementById('gallery-card-void-btn').onclick = function() {
    createVoidCardButton(card, renderGallery).onclick(new MouseEvent('click'));
    menu.style.display = "none";
  };
  // === FOIL BUTTON ===
  const modalContent = menu.querySelector('.modal-content');
  const owned = getCollection()[card.id] || 0;

  // === FAVORITE BUTTON ===
  let favoriteBtn = modalContent.querySelector('#gallery-card-favorite-btn');
  if (favoriteBtn) favoriteBtn.remove();

  favoriteBtn = document.createElement('button');
  favoriteBtn.id = "gallery-card-favorite-btn";
  favoriteBtn.className = "settings-item";
  favoriteBtn.style.width = "100%";
  favoriteBtn.style.textAlign = "left";
  const isFav = isFavorite(card.id);
  favoriteBtn.innerHTML = `<img src="Icons/Other/Star.png" alt="Favorite" style="width:20px;vertical-align:middle;margin-right:10px;"> ${isFav ? 'Unfavorite' : 'Favorite'}`;
  favoriteBtn.onclick = function(e) {
    e.stopPropagation();
    toggleFavorite(card.id);
    menu.style.display = "none";
    renderGallery();
  };
  
  let styleBtn = modalContent.querySelector('#gallery-card-style-btn');
  if (styleBtn) styleBtn.remove();

  styleBtn = document.createElement('button');
  styleBtn.id = "gallery-card-style-btn";
  styleBtn.className = "settings-item";
  styleBtn.style.width = "100%";
  styleBtn.style.textAlign = "left";
  styleBtn.innerHTML = `<img src="Icons/Other/Style.png" alt="Style" style="width:20px;vertical-align:middle;margin-right:10px;"> Style`;

  // Determine all possible style images for this card
  const allStyles = [];
  if (card.image) allStyles.push({key: "default", src: card.image, label: "Default"});
  if (card.imageFullArt) allStyles.push({key: "fullArt", src: card.imageFullArt, label: "Full Art"});
  // Add more as you implement more styles

  // Determine which styles are unlocked for this player
  const unlockedStyles = [];
  if (card.image) unlockedStyles.push({key: "default", src: card.image, label: "Default"});
  if (card.imageFullArt && window.playerUnlockedFullArt && window.playerUnlockedFullArt[card.id]) {
    unlockedStyles.push({key: "fullArt", src: card.imageFullArt, label: "Full Art"});
  }
  // Add more unlocks as you implement them

  // If only 1 style OR all styles unlocked, disable the button
  if (unlockedStyles.length <= 1 || unlockedStyles.length === allStyles.length) {
    styleBtn.disabled = true;
    styleBtn.style.opacity = "0.4";
    styleBtn.title = "No alternate styles available to unlock for this card";
  } else {
    styleBtn.onclick = function(e) {
      e.stopPropagation();
      menu.style.display = "none";
      showCardStyleModal(card, unlockedStyles);
    };
  }
}

function showCardStyleModal(card, styleImages) {
  // Remove existing modal if present
  let modal = document.getElementById('card-style-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'card-style-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

  // Get current style selection (optional: store in playerCardStyles)
  const currentStyle = (window.playerCardStyles && window.playerCardStyles[card.id]) || "default";

  // Modal content
  let content = document.createElement('div');
  content.className = 'modal-content';
  content.style.maxWidth = '540px';
  content.style.background = '#232a3a';
  content.style.borderRadius = '16px';
  content.style.padding = '28px 22px';

  content.innerHTML = `<h3 style="color:#ffe066;text-align:center;margin-bottom:18px;">Choose Card Style</h3>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px 14px;margin-bottom:20px;">
      ${styleImages.map(style => `
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <img src="${style.src}" 
            alt="${style.label}" 
            style="width:110px;height:154px;object-fit:cover;cursor:pointer;${currentStyle===style.key?"outline:3px solid #ffe066;":""}border-radius:7px;box-shadow:0 2px 12px #0007;"
            onclick="selectCardStyle('${card.id}', '${style.key}')" />
          <div style="font-size:1em;color:#ffe066;">${style.label}</div>
        </div>
      `).join('')}
    </div>
    <button id="close-card-style-modal" class="btn-negative-secondary">Close</button>
  `;
  modal.appendChild(content);
  document.body.appendChild(modal);

  // Close logic
  document.getElementById('close-card-style-modal').onclick = function() { modal.remove(); };
}

function createCreateCardButton(card, onActionDone) {
  const owned = getCollection()[card.id] || 0;
  const btn = document.createElement('img');
  btn.src = 'Icons/Other/Essence.png';
  btn.alt = 'Create';
  const rarityKey = getRarityKey(card);
  const cost = CREATE_ESSENCE_COST[rarityKey] || 5;
  btn.title = `Create (costs ${cost} Essence)`;
  btn.className = "gallery-action-btn";
  btn.style.background = "none";
  btn.style.cursor = "pointer";
  btn.style.width = "38px";
  btn.style.height = "38px";
  btn.style.maxWidth = "38px";
  btn.style.maxHeight = "38px";
  btn.style.objectFit = "contain";
  btn.style.transition = "transform 0.15s, box-shadow 0.15s";
  btn.onclick = function(e) {
    e.stopPropagation();
    showEssenceConfirmModal({
      action: "create",
      card,
      amount: cost,
      onConfirm: function() {
        if (playerEssence < cost) {
          showToast("Not enough Essence", {type:"error"});
          return;
        }
        const collection = getCollection();
        const wasOwned = collection[card.id] > 0;
        collection[card.id] = (collection[card.id] || 0) + 1;
        playerCollection = collection;
        playerEssence -= cost;
        updateEssenceDisplay();
        saveProgress();
        if (!wasOwned && collection[card.id] > 0) {
          const newCards = getNewlyUnlockedCards();
          if (!newCards.includes(card.id)) {
            newCards.push(card.id);
            setNewlyUnlockedCards(newCards);
          }
        }
        if (onActionDone) onActionDone();
      }
    });
  };
  return btn;
}

function createVoidCardButton(card, onActionDone) {
  const owned = getCollection()[card.id] || 0;
  const btn = document.createElement('img');
  btn.src = 'Icons/Other/Void.png';
  btn.alt = 'Void';
  const rarityKey = getRarityKey(card);
  const refund = VOID_ESSENCE_REFUND[rarityKey] || 1;
  btn.title = `Void (refunds ${refund} Essence)`;
  btn.className = "gallery-action-btn";
  btn.style.background = "none";
  btn.style.cursor = "pointer";
  btn.style.width = "38px";
  btn.style.height = "38px";
  btn.style.maxWidth = "38px";
  btn.style.maxHeight = "38px";
  btn.style.objectFit = "contain";
  btn.style.transition = "transform 0.15s, box-shadow 0.15s";
  const minKept = getMinimumKeptForRarity(card);
  if (owned <= minKept) {
    btn.style.opacity = "0.5";
    btn.style.pointerEvents = "none";
    btn.title = `You must keep at least ${minKept} copies of this card (${card.rarity || "Unknown rarity"}).`;
  }
  btn.onclick = function(e) {
    e.stopPropagation();
    showEssenceConfirmModal({
      action: "void",
      card,
      amount: refund,
      onConfirm: function() {
        const collection = getCollection();
        const ownedCount = collection[card.id] || 0;
        if (ownedCount <= minKept) {
          showToast(`You must keep at least ${minKept} of this card (${card.rarity || "Unknown rarity"}).`);
          return;
        }
        collection[card.id] -= 1;
        playerCollection = collection;
        playerEssence += refund;
        updateEssenceDisplay();
        saveProgress();
        if (onActionDone) onActionDone();
      }
    });
  };
  return btn;
}
// CREATE/VOID CONFIRM MODAL
function showEssenceConfirmModal({action, card, amount, onConfirm }) {
  const modal = document.getElementById('essence-confirm-modal');
  const msgDiv = document.getElementById('essence-confirm-msg');
  const cardImg = document.getElementById('essence-confirm-card-img');
  const amtDiv = document.getElementById('essence-confirm-amount');
  const confirmBtn = document.getElementById('essence-confirm-btn');
  const cancelBtn = document.getElementById('essence-cancel-btn');
  // Set message
  msgDiv.textContent = 
    action === "create"
      ? `Create '${card.name}' ? `
      : `Void '${card.name}' ? `;
  // Card image
  cardImg.src = card.image;
  cardImg.alt = card.name;
  // Amount with icon
  amtDiv.innerHTML = `${amount} <img src="Icons/Other/Essence.png" alt="Essence" style="width:24px;height:24px;vertical-align:middle;">`;
  // Show modal
  modal.style.display = "flex";
  // Confirm handler
  confirmBtn.onclick = function() {
    modal.style.display = "none";
    if (typeof onConfirm === "function") onConfirm();
  };
  // Cancel handler
  cancelBtn.onclick = function() {
    modal.style.display = "none";
  };
  // Close on outside click
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  };
}
function updateGalleryCollectionProgress(filteredCards) {
  const collection = getCollection();
  const owned = filteredCards.filter((card) => (collection[card.id] || 0) > 0).length;
  const total = filteredCards.length;

  // Retrieve filters from the modal
  const selectedFilters = getSelectedFiltersFromModal();

  // Ownership-specific logic
  const ownershipFilters = selectedFilters.selectedOwnerships || [];
  const ownershipAll = ownershipFilters.length === 0 || ownershipFilters.includes("All");
  const ownershipSingle = ownershipFilters.length === 1 ? ownershipFilters[0] : null;

  // Gather all modal-applied filters
  let filterInfoArray = Object.entries(selectedFilters)
    .filter(([key, values]) => values && values.length > 0) // Remove empty filters
    .flatMap(([key, values]) => values);

  // Add the name filter if provided (not part of the modal)
  const nameInput = document.getElementById('filter-name-gallery');
  const nameFilter = nameInput ? nameInput.value.toLowerCase() : "";
  if (nameFilter) {
    filterInfoArray.push(nameFilter);
  }

  // Combine filter info into a readable summary
  const filterInfo = filterInfoArray.length ? filterInfoArray.join(' ') : '';

  // Determine collection progress string
  let str = '';
  if (total === 0) {
    // No matching cards
    str = filterInfo
      ? `No cards match the selected filters: <b>${filterInfo}</b>`
      : 'No cards match the selected filters.';
  } else if (ownershipAll) {
    // Display "Collected X/Y"
    str = `Collected <b>${owned}</b> / <b>${total}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  } else if (ownershipSingle === 'Undiscovered') {
    // Display "Undiscovered X"
    str = `Undiscovered <b>${total}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  } else if (ownershipSingle === 'Locked') {
    // Display "Locked X"
    str = `Locked <b>${total}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  } else if (ownershipSingle === 'Owned') {
    // Display "Owned X"
    str = `Owned <b>${owned}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  } else {
    // Default: "Collected X/Y"
    str = `Collected <b>${owned}</b> / <b>${total}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  }

  // Update the progress element in the UI
  const progDiv = document.getElementById('gallery-collection-progress');
  if (progDiv) progDiv.innerHTML = str;
}

// --- BULK VOID MODAL --- //
function showBulkVoidModal() {
  const collection = getCollection();
  const cardsToVoid = [];

  dummyCards.forEach(card => {
    const owned = collection[card.id] || 0;
    const minKept = getMinimumKeptForRarity(card);
    const voidable = owned - minKept;
    if (voidable > 0) {
      const refund = VOID_ESSENCE_REFUND[getRarityKey(card)] || 1;
      cardsToVoid.push({
        card,
        count: voidable,
        refund,
        subtotal: voidable * refund,
        checked: true
      });
    }
  });

  const modal = document.getElementById('bulk-void-modal');
  const content = document.getElementById('bulk-void-modal-content');

  if (cardsToVoid.length === 0) {
    content.innerHTML = `
      <h3 style="color:#ffe066;margin-bottom:12px;">Bulk Void</h3>
      <div style="margin-bottom:20px;color:#fff;">
        You have no voidable duplicates at this time.<br>
        You must keep at least the minimum for each card's rarity.
      </div>
      <div style="display:flex;justify-content:center;gap:12px;">
        <button class="btn-negative-secondary" id="bulk-void-cancel-btn">Close</button>
      </div>
    `;
    modal.style.display = 'flex';
    document.getElementById('bulk-void-cancel-btn').onclick = () => { modal.style.display = 'none'; };
    modal.onclick = function(e) {
      if (e.target === modal) modal.style.display = "none";
    };
    return;
  }

  // Helper to render the list and recalculate
  function renderCardRows() {
    // Recalculate totals
    let totalEssence = 0;
    let checkedCount = 0;
    const essenceImg = `<img src="Icons/Other/Essence.png" alt="Essence" style="width:18px;height:18px;vertical-align:middle;">`;

    let cardRows = cardsToVoid.map((cdata, idx) => {
      if (cdata.checked) {
        totalEssence += cdata.subtotal;
        checkedCount++;
      }
      const nameColor = cdata.subtotal > 0 ? "#ffe066" : "#fff";
      return `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:7px;">
          <input type="checkbox" id="bulk-void-checkbox-${idx}" ${cdata.checked ? "checked" : ""} style="width:20px;height:20px;">
          <img src="${cdata.card.image}" alt="${cdata.card.name}" class="bulk-void-card-img" style="width:38px;height:54px;border-radius:5px;border:2px solid #444;cursor:pointer;"
            onclick="showFullCardModal(dummyCards.find(c => c.id === '${cdata.card.id}'));">
          <span style="font-weight:bold;color:${nameColor};">${cdata.card.name}</span>
          <span style="color:#eee;">
            (${cdata.refund} ${essenceImg}) 
            <span style="color:#fff;">×${cdata.count}</span>
          </span>
          <span style="color:#6f6;">+${cdata.subtotal}</span>
        </div>
      `;
    }).join('');

    content.innerHTML = `
      <h3 style="color:#ffe066;margin-bottom:12px;">Bulk Void</h3>
      <div style="margin-bottom:18px;color:#fff;">
        Are you sure you want to void these cards for <span style="color:#6f6;font-weight:bold;">${totalEssence} ${essenceImg}</span>?
      </div>
      <div style="max-height:270px;overflow-y:auto;margin-bottom:18px;">
        ${cardRows}
      </div>
      <div style="display:flex;justify-content:center;gap:12px;">
        <button class="btn-secondary" id="bulk-void-confirm-btn" ${checkedCount === 0 ? "disabled style='opacity:0.6;'" : ""}>Void Selected</button>
        <button class="btn-negative-secondary" id="bulk-void-cancel-btn">Cancel</button>
      </div>
    `;

    // Wire up all checkboxes
    cardsToVoid.forEach((ctv, i) => {
      const cb = document.getElementById(`bulk-void-checkbox-${i}`);
      if (cb) {
        cb.onchange = function() {
          ctv.checked = cb.checked;
          renderCardRows();
        };
      }
    });

    // Confirm and cancel handlers
    document.getElementById('bulk-void-cancel-btn').onclick = () => { modal.style.display = 'none'; };
    document.getElementById('bulk-void-confirm-btn').onclick = function() {
      cardsToVoid.forEach(({card, count, checked}) => {
        if (checked) collection[card.id] -= count;
      });
      playerEssence += totalEssence;
      saveProgress();    
      updateEssenceDisplay();
      renderGallery();
      modal.style.display = 'none';
      showToast(`Bulk voided ${checkedCount} cards for ${totalEssence} Essence!`, {type: "success"});
    };
    modal.onclick = function(e) {
      if (e.target === modal) modal.style.display = "none";
    };
  }

  renderCardRows();
  modal.style.display = 'flex';
}

// --- Helper to handle selection & persist choice (add to global scope)
window.playerCardStyles = window.playerCardStyles || {}; // { cardId: styleKey }
window.selectCardStyle = function(cardId, styleKey) {
  window.playerCardStyles[cardId] = styleKey;
  // Optionally, save to localStorage or backend here
  showToast("Style selected!", {type: "success"});
  // Refresh gallery to apply new style
  if (typeof renderGallery === "function") renderGallery();
  // Close modal
  let modal = document.getElementById('card-style-modal');
  if (modal) modal.remove();
};
// ==========================
// === EVENT LISTENERS ===
// ==========================
// GALLERY EVENT FILTERS
document.getElementById('filter-name-gallery').addEventListener('input', renderGallery);
window.renderGallery = renderGallery;
// ========================== 
// === SHOP LOGIC ===
// ========================== 
const shopSection = document.getElementById('shop-section');
const shopContainer = document.getElementById('shop-container');
const packOpeningModal = document.getElementById('pack-opening-modal');
const openedPackRowModal = document.getElementById('opened-pack-row-modal');
const closePackOpeningModalBtn = document.getElementById('close-pack-opening-modal');
const PACK_SIZE = 5;

const PACK_SLOT_ODDS_DEFAULT = [
  { slot: 1, odds: { Common: 92, Rare: 7, Legendary: 1 } },
  { slot: 2, odds: { Common: 85, Rare: 13, Legendary: 2 } },
  { slot: 3, odds: { Common: 75, Rare: 22, Legendary: 3 } },
  { slot: 4, odds: { Common: 60, Rare: 35, Legendary: 5 } },
  { slot: 5, odds: { Rare: 90, Legendary: 10 } },
];

let cosmeticConfirmModal = null;

document.getElementById('shop-settings-btn').onclick = function() {
  document.getElementById('settings-modal').style.display = 'flex';
};
document.getElementById('shop-back-btn').onclick = function() {
  document.getElementById('shop-section').classList.remove('active');
  document.getElementById('home-section').classList.add('active');
};

function showPackContentsModal(packId, packName) {
  // Remove existing modal if any
  let modal = document.getElementById('pack-contents-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'pack-contents-modal';
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

  // Find cards in this pack
  const cardsInPack = (window.dummyCards || dummyCards || []).filter(card => {
    if (Array.isArray(card.set)) {
      return card.set.includes(packId);
    }
    return card.set === packId;
  });

  let cardsHtml = '';
  if (cardsInPack.length) {
    cardsHtml = `<div id="pack-cards-grid" style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-height:340px;overflow-y:auto;">` +
      cardsInPack.map((card, idx) => `
        <div class="pack-card-entry" data-card-idx="${idx}" 
          style="display:flex;flex-direction:column;align-items:center;width:70px;cursor:pointer;transition:transform 0.17s, box-shadow 0.17s;">
          <img src="${card.image}" title="${card.name}" alt="${card.name}" 
            style="width:66px;height:88px;box-shadow:0 2px 8px #0006;transition:box-shadow 0.17s, transform 0.17s;">        </div>
      `).join('') +
      `</div>`;
  } else {
    cardsHtml = `<div style="color:#ffe066;text-align:center;">No cards listed for this pack.</div>`;
  }

  modal.innerHTML = `
    <div class="modal-content" style="min-width:340px;max-width:600px;padding:24px 24px 12px 24px;background:#232a3a;border-radius:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <h2 style="margin:0;font-size:1.25em;color:#ffe066;">${packName}</h2>
      </div>
      <div style="margin-top:12px">${cardsHtml}</div>
      <div style="text-align:center;margin-top:18px;">
        <button id="pack-contents-close-btn" class="btn-negative-secondary" style="margin-left:12px;">Close</button>
      </div>
      <style>
        #pack-cards-grid .pack-card-entry:hover img {
          box-shadow: 0 4px 16px #ffe06688, 0 2px 12px #000b;
          transform: scale(1.08);
        }
        #pack-cards-grid .pack-card-entry:hover {
          z-index: 2;
        }
      </style>
    </div>
  `;
  document.body.appendChild(modal);

  // Add click handlers for each card to open showFullCardModal
  if (cardsInPack.length) {
    const grid = modal.querySelector('#pack-cards-grid');
    if (grid) {
      grid.querySelectorAll('.pack-card-entry').forEach((el, idx) => {
        el.onclick = function(e) {
          e.stopPropagation();
          const card = cardsInPack[idx];
          if (typeof window.showFullCardModal === "function") {
            window.showFullCardModal(card);
          }
        };
      });
    }
  }

  document.getElementById('pack-contents-close-btn').onclick = function() {
    modal.remove();
  };
}
function showCosmeticConfirmModal({imgSrc, name, type, price, onConfirm, packId, itemId}) {
  if (cosmeticConfirmModal) cosmeticConfirmModal.remove();
  cosmeticConfirmModal = null;
  cosmeticConfirmModal = document.createElement('div');
  cosmeticConfirmModal.className = 'modal';
  cosmeticConfirmModal.style.display = 'flex';
  cosmeticConfirmModal.style.alignItems = 'center';
  cosmeticConfirmModal.style.justifyContent = 'center';
cosmeticConfirmModal.style.position = 'absolute';
cosmeticConfirmModal.style.inset = '0';
cosmeticConfirmModal.style.zIndex = '9999';
  // Bulk selector (default 1)
  let bulkSelectorHtml = '';
  if (type === 'pack') {
    bulkSelectorHtml = `
      <div style="margin:10px 0 0 0;text-align:center;">
        <label for="pack-bulk-count" style="color:#ffe066;font-weight:bold;margin-right:6px;">Number of Packs:</label>
        <select id="pack-bulk-count" style="font-size:1.1em;padding:3px 12px;border-radius:7px;">
          ${[...Array(10)].map((_,i)=>`<option value="${i+1}">${i+1}</option>`).join('')}
        </select>
      </div>
    `;
  }
  cosmeticConfirmModal.innerHTML = `
    <div class="modal-content" style="position:relative;">
      <button id="pack-info-btn" style="position:absolute;top:5px;right:0;background:none;border:none;cursor:pointer;">
        <img src='Icons/Other/Info.png' alt="Pack Info" style="width:28px;">
      </button>
      <img src="${imgSrc}" alt="Cosmetic Preview" title="${name || ''}" style="max-width:200px;box-shadow:0 2px 10px #0005;">
      <div class="currency-display" style="margin:10px 0;">
        <img class="currency-icon" src='Icons/Other/Coins.png' alt="Coins">
        <span id="modal-total-price">${price}</span>
      </div>
      ${bulkSelectorHtml}
      <div style="display:flex;gap:18px;justify-content:center;margin-top:8px;">
        <button id="cosmetic-get-btn" class="btn-secondary">Get</button>
        <button id="cosmetic-cancel-btn" class="btn-negative-secondary">Cancel</button>
      </div>
    </div>
  `;
  const gameShell = document.getElementById('game-shell');
(gameShell || document.body).appendChild(cosmeticConfirmModal);

  // Bulk price update logic
  if (type === 'pack') {
    const countSelect = cosmeticConfirmModal.querySelector('#pack-bulk-count');
    const priceSpan = cosmeticConfirmModal.querySelector('#modal-total-price');
    countSelect.onchange = function() {
      priceSpan.textContent = price * parseInt(this.value, 10);
    };
  }
  // Info button logic: only for packs
  if (type === 'pack' && packId) {
    cosmeticConfirmModal.querySelector('#pack-info-btn').onclick = function(e) {
      e.stopPropagation();
      showPackContentsModal(packId, name);
    };
  } else {
    // Hide info button for non-pack purchases
    cosmeticConfirmModal.querySelector('#pack-info-btn').style.display = 'none';
  }

  // Confirm
  cosmeticConfirmModal.querySelector('#cosmetic-get-btn').onclick = function() {
    this.disabled = true;
    onConfirm(function(purchaseSucceeded) {
      if (purchaseSucceeded === false) {
        cosmeticConfirmModal.querySelector('#cosmetic-get-btn').disabled = false;
        return;
      }
      // Handle avatar, banner, or cardback purchase
      if (type === "avatar" || type === "banner" || type === "cardback") {
        // Select the correct global variable based on type
        const unlockKeyMap = {
          avatar: "playerUnlockedAvatars",
          banner: "playerUnlockedBanners",
          cardback: "playerUnlockedCardbacks",
        };
        const unlockKey = unlockKeyMap[type];

        // Get the list of unlocked items for the specified type
        window[unlockKey] = window[unlockKey] || [];
        if (!window[unlockKey].includes(itemId)) {
          // Add the purchased item to the corresponding list
          window[unlockKey].push(itemId);

          // Save progress dynamically using appropriate set function
          const setFunctionMap = {
            avatar: setUnlockedAvatars,
            banner: setUnlockedBanners,
            cardback: setUnlockedCardbacks,
          };
          setFunctionMap[type](window[unlockKey]); // Dynamically call the corresponding save function
          saveProgress(); // Ensure state is updated
        }
      }
		
      cosmeticConfirmModal.remove();
      cosmeticConfirmModal = null;
    });
  };
  // Cancel
  cosmeticConfirmModal.querySelector('#cosmetic-cancel-btn').onclick = function() {
    cosmeticConfirmModal.remove();
    cosmeticConfirmModal = null;
  };
  cosmeticConfirmModal.onclick = function(e) {
    if (e.target === cosmeticConfirmModal) {
      cosmeticConfirmModal.remove();
      cosmeticConfirmModal = null;
    }
  };
}

function getPackPool(packId) {
  // Optional special case if you add EssenceLegacy
  if (packId === "EssenceLegacy") return (window.dummyCards || []).slice();

  return (window.dummyCards || []).filter(card =>
    Array.isArray(card.set) ? card.set.includes(packId) : card.set === packId
  );
}

function rollFromOdds(oddsObj) {
  const entries = Object.entries(oddsObj).map(([value, weight]) => ({ value, weight }));
  const total = entries.reduce((s, x) => s + Number(x.weight || 0), 0);
  let r = Math.random() * total;

  for (const e of entries) {
    r -= Number(e.weight || 0);
    if (r <= 0) return e.value;
  }
  return entries[entries.length - 1]?.value;
}

function pickRandom(pool) {
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function generatePackCards(packId, slotTable = PACK_SLOT_ODDS_DEFAULT) {
  const pool = getPackPool(packId);
	if (!Array.isArray(pool) || pool.length === 0) {
	  console.error(`[generatePackCards] Empty pool for packId="${packId}". Check card.set values.`);
		return [];
	}

  const result = [];
  for (const slotDef of slotTable) {
    const rarity = rollFromOdds(slotDef.odds);
    // Fallbacks so the pack always fills even if the pool is missing a rarity
    result.push(
      pickRandom(rarityPool) ||
      pickRandom(pool)
    );
  }

  return result.slice(0, PACK_SIZE);
}
// CURRENCY DEDUCTION
function purchaseCosmetic(cost, purchaseCallback, done) {
  let balance = getCurrency();
  if (typeof balance !== "number" || balance < cost) {
    showToast("Not enough coins!", { type: "error" });
    if (typeof done === "function") done(false);
    return false;
  }
  playerCurrency = balance - cost;
  saveProgress();
  updateCurrencyDisplay();
  showToast("Purchase successful!", { type: "success" });
// EXP FROM COSMETICS   
  if (typeof grantExp === "function") {
    const exp = Math.max(1, Math.floor(cost / 10)); 
    grantExp(exp);
    showToast(`You gained ${exp} EXP!`, { type: "success", duration: 1800 });
  }
  if (typeof purchaseCallback === "function") purchaseCallback(function() {
    saveProgress();
    updateCurrencyDisplay();
    if (typeof done === "function") done(true);
  });
  else if (typeof done === "function") done(true);
}

let lastPackCards = [];
let lastPackNewIds = [];
// Open pack logic
function openPack(type, count = 1, done) {
  const collection = getCollection();
  let cards = [];
  let allNewIds = [];

  for (let i = 0; i < count; i++) {
		const packCards = generatePackCards(type);
		if (!packCards || packCards.length === 0) {
 		 showToast(`No cards found for pack "${type}".`, { type: "error" });
 		 if (typeof done === "function") done(false);
 		 return;
		}
  }
  // Remove duplicates from allNewIds (for the "New!" badge)
  allNewIds = [...new Set(allNewIds)];

  lastPackCards = cards;
  lastPackNewIds = allNewIds;

  // OPENED PACK MODAL
openedPackRowModal.innerHTML = `
  <div class="opened-pack-cards-grid">
    ${cards.map((card, i) => `
      <div class="opened-card opened-card-flip" data-card-idx="${i}">
        <div class="opened-card-inner">
          <div class="opened-card-back">
            <img src='Images/Cardback/Default.png' alt="Card Back" style="width:100px;height:auto;display:block;margin:auto;">
          </div>
          <div class="opened-card-front" data-rarity="${card.rarity || ''}">
            <img src="${card.image}" alt="${card.name}" style="width:100px;height:auto;display:block;margin:auto;">
          </div>
        </div>
      </div>
    `).join('')}
  </div>
`;
  packOpeningModal.style.display = "flex";

  setTimeout(() => {
    const cardDivs = openedPackRowModal.querySelectorAll('.opened-card');
    cardDivs.forEach((div) => {
      const idx = parseInt(div.getAttribute('data-card-idx'), 10);
      const card = lastPackCards[idx];
      if (!card) return;
      const frontDiv = div.querySelector('.opened-card-front');
      if (frontDiv && window.applyRarityParticlesToCard) {
        applyRarityParticlesToCard(frontDiv, card.rarity);
      }
    });
  }, 0); // after DOM insert

  // Animate cards in sequence: flip from back to front, with sound and zoom
  const cardDivs = openedPackRowModal.querySelectorAll('.opened-card');
  cardDivs.forEach((div, i) => {
    setTimeout(() => {
      const idx = parseInt(div.getAttribute('data-card-idx'), 10);
      const card = lastPackCards[idx];
      const front = div.querySelector('.opened-card-front');

      // Play the flip sound based on rarity
      let flipSnd;
      switch ((card.rarity || '').toLowerCase()) {
        case 'rare':
          flipSnd = document.getElementById('card-flip-rare-sound');
          break;
        case 'legendary':
          flipSnd = document.getElementById('card-flip-legendary-sound');
          break;
        default:
          flipSnd = document.getElementById('card-flip-common-sound');
      }
      if (flipSnd) {
        flipSnd.currentTime = 0;
        flipSnd.play();
      }

      // Special zoom-in animation for rare/legendary
      let zoomClass = '';
      switch ((card.rarity || '').toLowerCase()) {
        case 'rare':
          zoomClass = 'zoom-rare'; break;
        case 'legendary':
          zoomClass = 'zoom-legendary'; break;
      }
      if (zoomClass && front) {
        front.classList.add(zoomClass);
        setTimeout(() => front.classList.remove(zoomClass), 700);
      }

      div.classList.add('flipped');
      setTimeout(() => {
        // After flip animation, attach onclick to card front
        if (lastPackNewIds.includes(card.id)) {
          if (!front.querySelector('.new-card-badge')) {
            const badge = document.createElement('div');
            badge.className = 'new-card-badge';
            badge.textContent = 'New!';
            front.appendChild(badge);
          }
        }
        if (front && typeof window.showFullCardModal === 'function') {
          front.onclick = () => {
            window.showFullCardModal(card);
          };
        }
      }, 600); // after flip
    }, 250 * i);
  });

  // Add cards to collection one by one, then save once at the end
  let addCardsCount = 0;
  function addNextCard() {
    if (addCardsCount < cards.length) {
      addToCollection(cards[addCardsCount].id, 1);
      addCardsCount++;
      setTimeout(addNextCard, 0);
    } else {
      // Update the global "new" list for gallery etc.
      if (lastPackNewIds.length > 0) {
        let newCards = getNewlyUnlockedCards();
        lastPackNewIds.forEach(id => {
          if (!newCards.includes(id)) newCards.push(id);
        });
        setNewlyUnlockedCards(newCards);
      }
      if (window.renderGallery) window.renderGallery();
      saveProgress();
      if (typeof done === "function") done();
    }
  }
  addNextCard();
}

// Handle closing the modal
closePackOpeningModalBtn.onclick = () => {
  packOpeningModal.style.display = "none";
  openedPackRowModal.innerHTML = '';
};

// Clicking outside modal-content closes modal
packOpeningModal.onclick = function(e) {
  if (e.target === packOpeningModal) {
    packOpeningModal.style.display = "none";
    openedPackRowModal.innerHTML = '';
  }
};

// Handle pack image click
const packImages = document.querySelectorAll('.pack-image');
packImages.forEach(img => {
  img.onclick = function(e) {
    e.stopPropagation();
    openPack(img.dataset.pack);
    img.blur();
  };
  img.tabIndex = 0;
  img.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
      openPack(img.dataset.pack);
      img.blur();
    }
  });
});

shopContainer.addEventListener('click', (e) => {
  if (
    !e.target.closest('.opened-card') &&
    !e.target.closest('.pack-image') &&
    !e.target.matches('button[data-pack]')
  ) {
  }
});

// --- PACK RENDERING --- //
function renderShopPacks() {
  const packOptionsDiv = document.getElementById('pack-options');
  if (!packOptionsDiv) return;
  packOptionsDiv.innerHTML = '';
  packOptions.forEach(pack => {
    const wrapper = document.createElement('div');
    wrapper.className = 'shop-pack-option';

    const img = document.createElement('img');
    img.className = 'pack-image';
    img.src = pack.image;
    img.alt = pack.name;
    img.dataset.pack = pack.id;
    img.style.cursor = 'pointer';
	img.title = pack.name;
	  
    // --- Pack Name Element --- //
    const nameTag = document.createElement('div');
    nameTag.className = 'pack-name';
    nameTag.style.textAlign = 'center';
    nameTag.style.marginTop = '8px';
    nameTag.style.fontWeight = 'bold';
	nameTag.style.color = '#ffe066';
    nameTag.textContent = pack.name;
	  
    // --- Price Tag --- //	  
    const priceTag = document.createElement('span');
    priceTag.className = 'currency-display';
    priceTag.style.display = 'flex';
    priceTag.style.alignItems = 'center';
    priceTag.style.justifyContent = 'center';
    priceTag.style.marginTop = '8px';
    priceTag.innerHTML = `
      <img class="currency-icon" src='Icons/Other/Coins.png' alt="Coins">
      <span>${pack.price}</span>
    `;
	  
    img.onclick = function(e) {
      e.stopPropagation();
      showCosmeticConfirmModal({
        imgSrc: img.src,
	 	name: pack.name,
        type: 'pack',
        price: pack.price,
		packId: pack.id,
        onConfirm: function(cb, count = 1) {
			const totalCost = pack.price * count;
         	purchaseCosmetic(totalCost, function(done) {
            openPack(pack.id, count, function() {
              if (typeof incrementQuestProgress === 'function') {
                incrementQuestProgress('purchase_pack_daily');
                incrementQuestProgress('purchase_pack_weekly');
              }
              if (typeof done === "function") done();
            });
          }, cb);
        }
      });
    };
    wrapper.appendChild(img);
	wrapper.appendChild(nameTag);  
    wrapper.appendChild(priceTag);
    packOptionsDiv.appendChild(wrapper);
  });
}

function getUnlockedAvatars() {
  return (window.playerUnlockedAvatars || window.unlockedAvatars || []);
}
function setUnlockedAvatars(arr) {
  playerUnlockedAvatars = arr; 
  saveProgress();
}
function getUnlockedBanners() {
  return (window.playerUnlockedBanners || window.unlockedBanners || []);
}
function setUnlockedBanners(arr) {
  playerUnlockedBanners = arr; 
  saveProgress();
}
function getUnlockedCardbacks() {
  return (window.playerUnlockedCardbacks || window.unlockedCardbacks || []);
}
function setUnlockedCardbacks(arr) {
  playerUnlockedCardbacks = arr;
  saveProgress();
}
function renderShopCosmetics({
  gridId,
  options,
  getUnlocked,
  setUnlocked,
  unlockMsg,
  wrapperClass,
  imgClass
}) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
	
  let unlocked = (typeof getUnlocked === "function" ? getUnlocked() : []);
  if (!Array.isArray(unlocked)) unlocked = [];
	
  grid.innerHTML = '';

  // Sort so NOT owned first, owned last
  const sorted = options.slice().sort((a, b) => {
    const aOwned = unlocked.includes(a.src);
    const bOwned = unlocked.includes(b.src);
    return Number(aOwned) - Number(bOwned); // false(0) first, true(1) last
  });

  sorted.forEach(opt => {
    const src = opt.src;
    const price = opt.price;
    const owned = unlocked.includes(src);

	const wrapper = document.createElement('div');
    wrapper.className = wrapperClass;

    const img = document.createElement('img');
    img.src = src;
    img.className = imgClass;
    img.style.cursor = owned ? 'default' : 'pointer';
    img.title = opt.name;

    // Gray out owned cosmetics
    if (owned) {
      img.style.filter = 'grayscale(1) brightness(0.65)';
      img.style.opacity = '0.85';
    }

    const priceTag = document.createElement('span');
    priceTag.className = 'currency-display';
    priceTag.style.display = 'flex';
    priceTag.style.alignItems = 'center';
    priceTag.style.justifyContent = 'center';
    priceTag.style.marginTop = '8px';
    priceTag.innerHTML = `
      <img class="currency-icon" src='Icons/Other/Coins.png' alt="Coins">
      <span>${price}</span>
    `;

    // Optional: hide price for owned items
    if (owned) {
      priceTag.style.opacity = '0.5';
    }

    if (!owned) {
      img.onclick = function() {
        showCosmeticConfirmModal({
          imgSrc: src,
          name: opt.name,
          type: wrapperClass.replace('shop-','').replace('-option',''),
          price,
          onConfirm: function(cb) {
            purchaseCosmetic(price, function(done) {
              if (!unlocked.includes(src)) {
                unlocked.push(src);
                setUnlocked(unlocked);
              }
              renderShopCosmetics({
                gridId, options, getUnlocked, setUnlocked, unlockMsg, wrapperClass, imgClass
              });
              showToast(unlockMsg);
              if (typeof window.renderPlayerPower === "function") window.renderPlayerPower();
              if (typeof done === "function") done();
            }, cb);
          }
        });
      };
    } else {
      // Optional: click owned item to preview only
      img.onclick = function() {
        if (typeof window.showToast === "function") showToast("Already owned.", { type: "info" });
      };
    }

    wrapper.appendChild(img);
    wrapper.appendChild(priceTag);
    grid.appendChild(wrapper);
  });
}

// --- USE THE GENERIC FUNCTION FOR EACH COSMETIC TYPE ---
function renderShopAvatars() {
  renderShopCosmetics({
    gridId: 'shop-avatars-grid',
    options: avatarOptions.filter(opt => !opt.obtain || opt.obtain === "shop" 
      || (Array.isArray(opt.obtain) && opt.obtain.includes("shop"))),
    getUnlocked: getUnlockedAvatars,
    setUnlocked: setUnlockedAvatars,
    unlockMsg: 'Avatar unlocked!',
    wrapperClass: 'shop-avatar-option',
    imgClass: 'shop-avatar-img'
  });
}
function renderShopBanners() {
  renderShopCosmetics({
    gridId: 'shop-banners-grid',
    options: bannerOptions.filter(opt => !opt.obtain || opt.obtain === "shop" 
		|| (Array.isArray(opt.obtain) && opt.obtain.includes("shop"))),
    getUnlocked: getUnlockedBanners,
    setUnlocked: setUnlockedBanners,
    unlockMsg: 'Banner unlocked!',
    wrapperClass: 'shop-banner-option',
    imgClass: 'shop-banner-img'
  });
}
function renderShopCardbacks() {
  renderShopCosmetics({
    gridId: 'shop-cardbacks-grid',
    options: cardbackOptions.filter(opt => !opt.obtain || opt.obtain === "shop" 
		|| (Array.isArray(opt.obtain) && opt.obtain.includes("shop"))),
    getUnlocked: getUnlockedCardbacks,
    setUnlocked: setUnlockedCardbacks,
    unlockMsg: 'Cardback unlocked!',
    wrapperClass: 'shop-cardback-option',
    imgClass: 'shop-cardback-img'
  });
}

// FLIP ANIMATION //
function animateCardFlipSequence(cardDivs, onAfterFlip) {
  cardDivs.forEach((div, i) => {
    setTimeout(() => {
      const flipSnd = document.getElementById('card-flip-sound');
      if (flipSnd) {
        flipSnd.currentTime = 0;
        flipSnd.play();
      }
      div.classList.add('flipped');
      setTimeout(() => {
        if (typeof onAfterFlip === "function") onAfterFlip(div, i);
      }, 600); // after flip
    }, 180 * i);
  });
}

// INITIALIZATION //
function renderShop() {
      renderShopCardbacks(),
      renderShopBanners(),
      renderShopAvatars()
      renderShopPacks();
	  // renderShopDecks(); //
      updateCurrencyDisplay();
}
window.renderShop = renderShop;
function appendFriendsProfilePanel(user, container, context) {
  if (!user || typeof user !== 'object') return;
  // Use all available fields, fallback if missing
  const playerData = {
    username: user.username || user.uid,
    profilePic: user.profilePic || user.avatar || 'Images/Avatar/Default.png',
    profileBanner: user.profileBanner || user.banner || "Images/Banner/Default.png",
    power: typeof user.power === "number" ? user.power : 0,
    achievements: Array.isArray(user.achievements) ? user.achievements : [],
    badges: Array.isArray(user.badges) ? user.badges : [],
    avatars: Array.isArray(user.unlockedAvatars) ? user.unlockedAvatars : [],
    banners: Array.isArray(user.unlockedBanners) ? user.unlockedBanners : [],
    cardbacks: Array.isArray(user.unlockedCardbacks) ? user.unlockedCardbacks : []
  };
  const tile = renderProfilePanel(playerData, {
    onClick: () => showProfileMenu(tile, user, context),
    className: 'profile-panel-tile'
  });
  container.appendChild(tile);
}

// SEARCH LOGIC
function triggerPlayerSearch(page = 0) {
  const query = document.getElementById('player-search-input').value.trim();
  const resultsDiv = document.getElementById('player-search-results');
  resultsDiv.innerHTML = '<div style="color:#ffe066;">Searching...</div>';
  if (!query) {
    resultsDiv.innerHTML = '<div style="color:#e25555;">Please enter a username or ID.</div>';
    return;
  }
  currentSearchQuery = query;
  currentUserPage = page;

  // Page logic
  let userQuery = firebase.firestore().collection('users')
    .where('username', '>=', query)
    .where('username', '<=', query + '\uf8ff')
    .orderBy('username')
    .limit(USERS_PER_PAGE);

  // If not first page, use startAfter
  if (userSearchPages[page - 1]) {
    userQuery = userQuery.startAfter(userSearchPages[page - 1]);
  }

  userQuery.get().then(function(snap) {
    if (snap.empty) {
      resultsDiv.innerHTML = '<div style="color:#e25555;">No players found.</div>';
      return;
    }
    // Save the last doc for next page
    if (snap.docs.length > 0) {
      lastVisibleUser = snap.docs[snap.docs.length - 1];
      userSearchPages[page] = lastVisibleUser;
    }
    const currentUid = getCurrentUserId();
    const players = snap.docs
      .map(doc => ({ uid: doc.id, ...doc.data() }))
      .filter(player => player.uid !== currentUid);
    displayPlayerSearchResults(players, page, snap.size < USERS_PER_PAGE);
  });
}
// Utility: get current user info
function getCurrentUserId() {
  return firebase.auth().currentUser?.uid;
}
function getCurrentUsername() {
  return firebase.auth().currentUser?.displayName;
}
// Show the player search modal
function showPlayerSearchModal() {
  document.getElementById('player-search-modal').style.display = 'flex';
  document.getElementById('player-search-input').value = '';
  document.getElementById('player-search-results').innerHTML = '';
}

// Close modal
document.getElementById('close-player-search-modal').onclick = function() {
  document.getElementById('player-search-modal').style.display = 'none';
};

// For example, add this to your Requests tab logic:
document.getElementById('player-search-trigger').onclick = function() {
  userSearchPages = [];
  triggerPlayerSearch(0);
};
// Also search on enter in the input box
document.getElementById('player-search-input').addEventListener('keydown', function(e) {
  if (e.key === "Enter") {
    userSearchPages = [];
    triggerPlayerSearch(0);
  }
});

// Renders results in modal, now with pagination controls
function displayPlayerSearchResults(players, page = 0, isLastPage = false) {
  const resultsDiv = document.getElementById('player-search-results');
  if (!players.length) {
    resultsDiv.innerHTML = '<div style="color:#e25555;">No players found.</div>';
    return;
  }
  resultsDiv.innerHTML = '';
  players.forEach(player => {
    appendFriendsProfilePanel(player, resultsDiv, 'search');
  });

  // --- Pagination controls ---
  const nav = document.createElement('div');
  nav.style.display = 'flex';
  nav.style.justifyContent = 'center';
  nav.style.marginTop = '18px';
  nav.style.gap = '16px';

  if (typeof page !== 'undefined' && page > 0) {
    const prevBtn = document.createElement('button');
    prevBtn.textContent = "Previous";
    prevBtn.onclick = () => triggerPlayerSearch(page - 1);
    nav.appendChild(prevBtn);
  }
  if (!isLastPage) {
    const nextBtn = document.createElement('button');
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => triggerPlayerSearch(page + 1);
    nav.appendChild(nextBtn);
  }
  resultsDiv.appendChild(nav);
}

function showPlayerSearchMenu(tile, player) {
  // Remove any existing menus
  let menu = document.getElementById('player-search-menu');
  if (menu) menu.remove();

  menu = document.createElement('div');
  menu.id = 'player-search-menu';
  menu.className = 'menu';
  menu.style.position = 'absolute';
  menu.style.zIndex = 9999;
  menu.style.minWidth = '160px';
  menu.innerHTML = `
    <button class="settings-item" style="width:100%;text-align:left;">
      <img src="OtherImages/Icons/View.png" alt="View" style="width:20px;vertical-align:middle;margin-right:10px;"> View
    </button>
    <button class="settings-item" style="width:100%;text-align:left;">
      <img src="OtherImages/Icons/Friends.png" alt="Add" style="width:20px;vertical-align:middle;margin-right:10px;"> Send Friend Request
    </button>
  `;

  // "View" action
  menu.children[0].onclick = function(e) {
    e.stopPropagation();
    showFullCardModal({ avatar: player.avatar, banner: player.banner, username: player.username, uid: player.uid });
    menu.remove();
  };
  // "Send Friend Request" action
  menu.children[1].onclick = function(e) {
    e.stopPropagation();
    sendFriendRequest(player.username || player.uid);
    menu.remove();
  };

  // Position menu near tile
  const rect = tile.getBoundingClientRect();
  placeMenuWithinShell(menu, rect);

  // Remove menu if clicking outside
  setTimeout(() => {
    document.body.addEventListener('click', function handler(e) {
      if (!menu.contains(e.target)) menu.remove();
      document.body.removeEventListener('click', handler);
    }, { once: true });
  }, 20);

  // Prevent menu from closing if clicked inside
  menu.onclick = (e) => e.stopPropagation();
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

// --- SEND FRIEND REQUEST: subcollection approach per Firestore rules ---
function sendFriendRequest(targetUid) {
  const currentUid = getCurrentUserId();
  if (!currentUid || !targetUid) return;

  // Reference to outgoing requests for current user (optional for tracking sent requests)
  const currentRef = firebase.firestore().collection('users').doc(currentUid);

  // Check if request already sent to avoid duplicates
  firebase.firestore()
    .collection('users')
    .doc(targetUid)
    .collection('requests')
    .doc(currentUid)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        showToast("Request already sent.");
        return;
      }
      // Create request document in recipient's requests subcollection
      firebase.firestore()
        .collection('users')
        .doc(targetUid)
        .collection('requests')
        .doc(currentUid)
        .set({
          fromUid: currentUid,
          fromUsername: window.playerUsername || currentUid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
          // Optionally, track outgoing requests in current user's doc
          currentRef.get().then(function(doc2) {
            let sent = doc2.data()?.sentRequests || [];
            if (!sent.includes(targetUid)) sent.push(targetUid);
            currentRef.set({ sentRequests: sent }, { merge: true }).then(function() {
              showToast("Friend request sent!");
              renderDiscoverPanel && renderDiscoverPanel();
            });
          });
        })
        .catch(function(err) {
          showToast("Error sending request: " + err.message);
        });
    });
}

// --- ACCEPT/DECLINE should also remove from sentRequests on the sender ---

function acceptFriendRequest(uid) {
  // ... existing logic ...
  // remove incoming request from friendRequests
  // add each other as friends
  // Remove from sender's sentRequests
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;

  // Remove incoming request
  const currentRef = firebase.firestore().collection('users').doc(currentUid);
  currentRef.get().then(function(doc) {
    let requests = doc.data()?.friendRequests || [];
    requests = requests.filter(r => r.fromUid !== uid);
    let friends = doc.data()?.friends || [];
    if (!friends.includes(uid)) friends.push(uid);
    currentRef.set({ friendRequests: requests, friends }, { merge: true }).then(function() {
      // Add myself to their friends, remove from their sentRequests
      const theirRef = firebase.firestore().collection('users').doc(uid);
      theirRef.get().then(function(theirDoc) {
        let theirFriends = theirDoc.data()?.friends || [];
        if (!theirFriends.includes(currentUid)) theirFriends.push(currentUid);
        let sent = theirDoc.data()?.sentRequests || [];
        sent = sent.filter(fid => fid !== currentUid);
        theirRef.set({ friends: theirFriends, sentRequests: sent }, { merge: true }).then(function() {
          showToast("Friend request accepted.");
          renderFriendsList && renderFriendsList();
        });
      });
    });
  });
}

// Decline a friend request
function declineFriendRequest(uid) {
  // remove incoming request from friendRequests
  // Remove from sender's sentRequests
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;

  const currentRef = firebase.firestore().collection('users').doc(currentUid);
  currentRef.get().then(function(doc) {
    let requests = doc.data()?.friendRequests || [];
    requests = requests.filter(r => r.fromUid !== uid);
    currentRef.set({ friendRequests: requests }, { merge: true }).then(function() {
      // Remove from sender's sentRequests
      const theirRef = firebase.firestore().collection('users').doc(uid);
      theirRef.get().then(function(theirDoc) {
        let sent = theirDoc.data()?.sentRequests || [];
        sent = sent.filter(fid => fid !== currentUid);
        theirRef.set({ sentRequests: sent }, { merge: true }).then(function() {
          showToast("Friend request declined.");
          renderReceivedRequests && renderReceivedRequests();
        });
      });
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
      list.innerHTML += '<div>No friends yet.</div>';
      return;
    }
    ids.forEach(fid => {
      firebase.firestore().collection('users').doc(fid).get().then(function(friendDoc) {
        const userData = friendDoc.data() || {};
        appendFriendsProfilePanel({
          uid: fid,
          username: userData.username || fid,
          profilePic: userData.profilePic || userData.avatar || 'Images/Avatar/Default.png',
          profileBanner: userData.profileBanner || userData.banner || 'Images/Banner/Default.png',
          power: typeof userData.power === "number" ? userData.power : 0,
          achievements: Array.isArray(userData.achievements) ? userData.achievements : [],
          badges: Array.isArray(userData.badges) ? userData.badges : [],
          avatars: Array.isArray(userData.unlockedAvatars) ? userData.unlockedAvatars : [],
          banners: Array.isArray(userData.unlockedBanners) ? userData.unlockedBanners : [],
          cardbacks: Array.isArray(userData.unlockedCardbacks) ? userData.unlockedCardbacks : []
        }, list, 'friends');
      });
    });
  });
}

function viewFriendProfile(fid) {
  firebase.firestore().collection('users').doc(fid).get().then(function(doc) {
    const userData = doc.data() || {};
    const playerData = {
      username: userData.username || fid,
      profilePic: userData.profilePic || userData.avatar || 'Images/Avatar/Default.png',
      profileBanner: userData.profileBanner || userData.banner || 'Images/Banner/Default.png',
      power: typeof userData.power === "number" ? userData.power : 0,
      achievements: Array.isArray(userData.achievements) ? userData.achievements : [],
      badges: Array.isArray(userData.badges) ? userData.badges : [],
      avatars: Array.isArray(userData.unlockedAvatars) ? userData.unlockedAvatars : [],
      banners: Array.isArray(userData.unlockedBanners) ? userData.unlockedBanners : [],
      cardbacks: Array.isArray(userData.unlockedCardbacks) ? userData.unlockedCardbacks : []
    };
    showProfileModal(playerData);
  });
}

function renderDiscoverPanel() {
  // Don't overwrite the search input/button! Only update the user list div.
  const usersDiv = document.getElementById('discover-users-list');
  usersDiv.innerHTML = '<div style="color:#ffe066;">Loading random users...</div>';

  const currentUid = getCurrentUserId();
  if (!currentUid) {
    usersDiv.innerHTML = '<div style="color:#e25555;">Please log in.</div>';
    return;
  }

  // Get your current friends, blocked, requests
  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const userData = doc.data() || {};
    const friends = userData.friends || [];
    const blocked = userData.blocked || [];
    const receivedReqs = (userData.friendRequests || []).map(r => r.fromUid);
    
    let sentRequests = [];
    if (Array.isArray(userData.sentRequests)) {
      sentRequests = userData.sentRequests;
      // Get random users to display
      firebase.firestore().collection('users').limit(50).get().then(function(snapshot) {
        let users = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
        users = users.filter(u =>
          u.uid !== currentUid &&                     // not yourself
          !friends.includes(u.uid) &&                 // not your friend
          !blocked.includes(u.uid) &&                 // not blocked
          !receivedReqs.includes(u.uid) &&            // haven't sent you a request
          !sentRequests.includes(u.uid)               // you haven't sent them a request
        );
        usersDiv.innerHTML = '';
        if (!users.length) {
          usersDiv.innerHTML = '<div style="color:#888;">No users to discover!</div>';
        }
        users.forEach(user => {
          appendFriendsProfilePanel(user, usersDiv, 'discover');
        });
      });

    } else {
      // Legacy scan: Get sent requests (users to whom you have sent a request)
      firebase.firestore().collection('users').get().then(function(snapshot) {
        let sentRequestsLegacy = [];
        snapshot.forEach(userDoc => {
          const reqs = userDoc.data()?.friendRequests || [];
          reqs.forEach(r => {
            if (r.fromUid === currentUid) {
              sentRequestsLegacy.push(userDoc.id);
            }
          });
        });

        // Get random users to display
        firebase.firestore().collection('users').limit(50).get().then(function(snapshot) {
          let users = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
          users = users.filter(u =>
            u.uid !== currentUid &&
            !friends.includes(u.uid) &&
            !blocked.includes(u.uid) &&
            !receivedReqs.includes(u.uid) &&
            !sentRequestsLegacy.includes(u.uid)
          );
          usersDiv.innerHTML = '';
          if (!users.length) {
            usersDiv.innerHTML = '<div style="color:#888;">No users to discover!</div>';
          }
          users.forEach(user => {
            appendFriendsProfilePanel(user, usersDiv, 'discover');
          });
        });
      });
    }
  });

  // Make sure the search logic stays!
  document.getElementById('discover-search-btn').onclick = function() {
    discoverSearch();
  };
  document.getElementById('discover-search-input').onkeydown = function(e) {
    if (e.key === "Enter") discoverSearch();
  };
}

function discoverSearch() {
  const query = document.getElementById('discover-search-input').value.trim();
  const usersDiv = document.getElementById('discover-users-list');
  if (!query) return renderDiscoverPanel();
  usersDiv.innerHTML = '<div style="color:#ffe066;">Searching...</div>';
  firebase.firestore().collection('users')
    .where('username', '>=', query)
    .where('username', '<=', query + '\uf8ff')
    .orderBy('username')
    .limit(10)
    .get().then(snap => {
      let users = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      const currentUid = getCurrentUserId();
      users = users.filter(u => u.uid !== currentUid);
      // --- Layout: 3 per row, flex ---
      usersDiv.innerHTML = '';
      users.forEach(user => {
        appendFriendsProfilePanel(user, usersDiv, 'discover');
      });
    });
}

function blockUser(uid) {
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(doc => {
    let blocked = doc.data()?.blocked || [];
    if (!blocked.includes(uid)) blocked.push(uid);
    // Remove from friends/requests too
    let friends = doc.data()?.friends || [];
    friends = friends.filter(id => id !== uid);
    let friendRequests = doc.data()?.friendRequests || [];
    friendRequests = friendRequests.filter(r => r.fromUid !== uid);
    userRef.set({ blocked, friends, friendRequests }, { merge: true }).then(() => {
      showToast('Blocked user.');
      renderBlockedPanel();
      renderFriendsList();
    });
  });
}

function unblockUser(uid) {
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(doc => {
    let blocked = doc.data()?.blocked || [];
    blocked = blocked.filter(id => id !== uid);
    userRef.set({ blocked }, { merge: true }).then(() => {
      showToast('Unblocked user.');
      renderBlockedPanel();
    });
  });
}
document.getElementById('tab-friends').onclick = function() {
  selectFriendsTab();
};
document.getElementById('tab-discover').onclick = function() {
  selectDiscoverTab();
};
document.getElementById('tab-requests').onclick = function() {
  selectRequestsTab();
};
document.getElementById('tab-blocked').onclick = function() {
  selectBlockedTab();
};

function selectFriendsTab() {
  setTab('friends');
  renderFriendsList();
}
function selectDiscoverTab() {
  setTab('discover');
  renderDiscoverPanel();
}
function selectRequestsTab() {
  setTab('requests');
  renderRequestsPanel();
}
function selectBlockedTab() {
  setTab('blocked');
  renderBlockedPanel();
}

function setTab(tab) {
  ['friends', 'discover', 'requests', 'blocked'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.remove('selected');
    document.getElementById(`panel-${t}`).style.display = 'none';
  });
  document.getElementById(`tab-${tab}`).classList.add('selected');
  document.getElementById(`panel-${tab}`).style.display = '';
}
document.getElementById('close-friends-modal').onclick = function() {
  const modal = document.getElementById('friends-modal');
  if (modal) modal.style.display = 'none';
};
document.getElementById('requests-search-trigger').onclick = function() {
  const value = document.getElementById('search-friends').value;
  document.getElementById('player-search-input').value = value;
  showPlayerSearchModal();
  if (value) {
    userSearchPages = [];
    triggerPlayerSearch(0);
  }
};

function closeMenuOnClick(menu) {
  // Click on outside
  function outsideClickHandler(e) {
    if (!menu.contains(e.target)) {
      menu.remove();
      document.body.removeEventListener('click', outsideClickHandler);
    }
  }

  setTimeout(() => {
    document.body.addEventListener('click', outsideClickHandler, { once: true });
  }, 10);

  // Click on any option inside menu (assumes your options are <button> elements)
  const buttons = menu.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      menu.remove();
      document.body.removeEventListener('click', outsideClickHandler);
    });
  });
}
window.closeMenuOnClick = closeMenuOnClick;

function showProfileMenu(tile, user, context) {
  
  let menu = document.createElement('div');
  menu.id = 'friends-profile-menu';
  menu.className = 'menu';
  menu.style.position = 'absolute';
  menu.style.minWidth = '160px';

    // Unique button IDs using Option 1
  const viewBtnId = `menu-view-btn-${user.uid}`;
  const reqBtnId = `menu-request-btn-${user.uid}`;
  const blockBtnId = `menu-block-btn-${user.uid}`;
  const unfBtnId = `menu-unfriend-btn-${user.uid}`;
  const acceptBtnId = `menu-accept-btn-${user.uid}`;
  const declineBtnId = `menu-decline-btn-${user.uid}`;
  const unblockBtnId = `menu-unblock-btn-${user.uid}`;
  const cancelBtnId = `menu-cancel-btn-${user.uid}`;

   // Add context-appropriate actions
  if (context === 'friends') {
    menu.innerHTML += `<button id="${viewBtnId}" class="settings-item btn-secondary">View</button>`;
    menu.innerHTML += `<button id="${unfBtnId}" class="settings-item btn-negative-secondary">Unfriend</button>`;
    menu.innerHTML += `<button id="${blockBtnId}" class="settings-item btn-secondary">Block</button>`;
  } else if (context === 'discover') {
    menu.innerHTML += `<button id="${viewBtnId}" class="settings-item btn-secondary">View</button>`;
    menu.innerHTML += `<button id="${reqBtnId}" class="settings-item btn-secondary">Send Friend Request</button>`;
    menu.innerHTML += `<button id="${blockBtnId}" class="settings-item btn-secondary">Block</button>`;
  } else if (context === 'pending-received') {
    menu.innerHTML += `<button id="${viewBtnId}" class="settings-item btn-secondary">View</button>`;
    menu.innerHTML += `<button id="${acceptBtnId}" class="settings-item btn-secondary">Accept</button>`;
    menu.innerHTML += `<button id="${declineBtnId}" class="settings-item btn-negative-secondary">Decline</button>`;
    menu.innerHTML += `<button id="${blockBtnId}" class="settings-item btn-secondary">Block</button>`;
  } else if (context === 'pending-sent') {
    menu.innerHTML += `<button id="${viewBtnId}" class="settings-item btn-secondary">View</button>`;
    menu.innerHTML += `<button id="${cancelBtnId}" class="settings-item btn-negative-secondary">Cancel Request</button>`;
  } else if (context === 'blocked') {
    menu.innerHTML += `<button id="${viewBtnId}" class="settings-item btn-secondary">View</button>`;
    menu.innerHTML += `<button id="${unblockBtnId}" class="settings-item btn-secondary">Unblock</button>`;
  } else {
    menu.innerHTML += `<button id="${viewBtnId}" class="settings-item btn-secondary">View</button>`;
  }

  // Place menu
  document.body.appendChild(menu);
  const rect = tile.getBoundingClientRect();
  placeMenuWithinShell(menu, rect);

  menu.style.zIndex = '99999';
  menu.onclick = function(e) { e.stopPropagation(); };

  // Attach handlers for all buttons
  // View
  const viewBtn = document.getElementById(viewBtnId);
  if (viewBtn) {
    viewBtn.onclick = function(e) {
      e.stopPropagation();
      viewFriendProfile(user.uid);
    };
  }
  // Unfriend
  const unfBtn = document.getElementById(unfBtnId);
  if (unfBtn) {
    unfBtn.onclick = function(e) {
      e.stopPropagation();
      removeFriend(user.uid);
    };
  }
  // Block
  const blockBtn = document.getElementById(blockBtnId);
  if (blockBtn) {
    blockBtn.onclick = function(e) {
      e.stopPropagation();
      blockUser(user.uid);
    };
  }
  // Send Friend Request
  const reqBtn = document.getElementById(reqBtnId);
  if (reqBtn) {
    reqBtn.onclick = function(e) {
      e.stopPropagation();
      sendFriendRequest(user.uid);
    };
  }
  // Accept
  const acceptBtn = document.getElementById(acceptBtnId);
  if (acceptBtn) {
    acceptBtn.onclick = function(e) {
      e.stopPropagation();
      acceptFriendRequest(user.uid);
    };
  }
  // Decline
  const declineBtn = document.getElementById(declineBtnId);
  if (declineBtn) {
    declineBtn.onclick = function(e) {
      e.stopPropagation();
      declineFriendRequest(user.uid);
    };
  }
  // Unblock
  const unblockBtn = document.getElementById(unblockBtnId);
  if (unblockBtn) {
    unblockBtn.onclick = function(e) {
      e.stopPropagation();
      unblockUser(user.uid);
    };
  }
  // Cancel Request
  const cancelBtn = document.getElementById(cancelBtnId);
  if (cancelBtn) {
    cancelBtn.onclick = function(e) {
      e.stopPropagation();
      cancelSentRequest(user.uid);
    };
  }
  closeMenuOnClick(menu);
}

function renderRequestsPanel() {
  // This should render both received and sent requests if you have both sections.
  // Example placeholder:
  const panel = document.getElementById('panel-requests');
  if (!panel) return;
  panel.innerHTML = `
    <div id="panel-requests-received"></div>
    <div id="panel-requests-sent"></div>
  `;
  // You can call your existing logic to populate these:
  renderReceivedRequests();
  renderSentRequests();
}

function renderBlockedPanel() {
  // This should render the blocked users list.
  const panel = document.getElementById('panel-blocked');
  if (!panel) return;
  panel.innerHTML = `<div id="blocked-users-list"></div>`;
  renderBlockedUsersList();
}

function renderReceivedRequests() {
  // Fetch and display all friend requests you have received
  const currentUid = getCurrentUserId();
  const receivedDiv = document.getElementById('panel-requests-received');
  if (!currentUid || !receivedDiv) return;
  receivedDiv.innerHTML = '<div style="color:#ffe066;">Loading...</div>';

  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const requests = doc.data()?.friendRequests || [];
    if (!requests.length) {
      receivedDiv.innerHTML = '<div style="color:#888;">No incoming requests.</div>';
      return;
    }
    receivedDiv.innerHTML = '<b>Incoming Requests:</b>';
    requests.forEach(r => {
      // Fetch sender's profile
      firebase.firestore().collection('users').doc(r.fromUid).get().then(function(senderDoc) {
        const user = {
          uid: r.fromUid,
          username: r.fromUsername || r.fromUid,
          avatar: senderDoc.data()?.avatar || 'Images/Avatar/Default.png',
          banner: senderDoc.data()?.banner,
          power: senderDoc.data()?.power || 0
        };
        appendFriendsProfilePanel(user, receivedDiv, 'pending-received');
      });
    });
  });
}

function renderSentRequests() {
  // Fetch and display all friend requests you have sent (pending)
  const currentUid = getCurrentUserId();
  const sentDiv = document.getElementById('panel-requests-sent');
  if (!currentUid || !sentDiv) return;
  sentDiv.innerHTML = '<div style="color:#ffe066;">Loading...</div>';

  // To get sent requests, scan all users for requests from you
  firebase.firestore().collection('users').get().then(function(snapshot) {
    const sent = [];
    snapshot.forEach(doc => {
      const reqs = doc.data()?.friendRequests || [];
      reqs.forEach(r => {
        if (r.fromUid === currentUid) {
          sent.push({
            uid: doc.id,
            username: doc.data()?.username || doc.id,
            avatar: doc.data()?.avatar || 'Images/Avatar/Default.png',
            banner: doc.data()?.banner,
            power: doc.data()?.power || 0
          });
        }
      });
    });
    if (!sent.length) {
      sentDiv.innerHTML = '<div style="color:#888;">No sent requests.</div>';
      return;
    }
    sentDiv.innerHTML = '<b>Sent Requests:</b>';
    sent.forEach(user => {
      appendFriendsProfilePanel(user, sentDiv, 'pending-sent');
    });
  });
}

function renderBlockedUsersList() {
  // Fetch and display all users you have blocked
  const currentUid = getCurrentUserId();
  const blockedDiv = document.getElementById('blocked-users-list');
  if (!currentUid || !blockedDiv) return;
  blockedDiv.innerHTML = '<div style="color:#ffe066;">Loading...</div>';

  firebase.firestore().collection('users').doc(currentUid).get().then(function(doc) {
    const blocked = doc.data()?.blocked || [];
    if (!blocked.length) {
      blockedDiv.innerHTML = '<div style="color:#888;">No blocked users.</div>';
      return;
    }
    blockedDiv.innerHTML = '<b>Blocked Users:</b>';
    blocked.forEach(uid => {
      firebase.firestore().collection('users').doc(uid).get().then(function(userDoc) {
        const user = {
          uid: uid,
          username: userDoc.data()?.username || uid,
          avatar: userDoc.data()?.avatar || 'Images/Avatar/Default.png',
          banner: userDoc.data()?.banner,
          power: userDoc.data()?.power || 0
        };
        appendFriendsProfilePanel(user, blockedDiv, 'blocked');
      });
    });
  });
}
// --- CANCEL SENT REQUEST: removes from outgoing & target's doc ---
function cancelSentRequest(uid) {
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;
  // Remove our request from their friendRequests list
  const targetRef = firebase.firestore().collection('users').doc(uid);
  targetRef.get().then(function(doc) {
    let requests = doc.data()?.friendRequests || [];
    requests = requests.filter(r => r.fromUid !== currentUid);
    targetRef.set({ friendRequests: requests }, { merge: true }).then(function() {
      // Remove from our sentRequests
      const currentRef = firebase.firestore().collection('users').doc(currentUid);
      currentRef.get().then(function(doc2) {
        let sent = doc2.data()?.sentRequests || [];
        sent = sent.filter(fid => fid !== uid);
        currentRef.set({ sentRequests: sent }, { merge: true }).then(function() {
          showToast("Cancelled friend request.");
          renderSentRequests && renderSentRequests();
        });
      });
    });
  });
}
// -- Helper for removing a friend --
function removeFriend(uid) {
  const currentUid = getCurrentUserId();
  if (!currentUid || !uid) return;
  // Remove from our friends
  const userRef = firebase.firestore().collection('users').doc(currentUid);
  userRef.get().then(function(doc) {
    let friends = doc.data()?.friends || [];
    friends = friends.filter(fid => fid !== uid);
    userRef.set({ friends }, { merge: true }).then(function() {
      // Remove us from their friends too
      const theirRef = firebase.firestore().collection('users').doc(uid);
      theirRef.get().then(function(theirDoc) {
        let theirFriends = theirDoc.data()?.friends || [];
        theirFriends = theirFriends.filter(fid => fid !== currentUid);
        theirRef.set({ friends: theirFriends }, { merge: true }).then(function() {
          showToast("Friend removed.");
          renderFriendsList();
        });
      });
    });
  });
}

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
  const modal = document.getElementById('daily-login-modal');
  const daysRoot = document.getElementById('daily-login-days');
  const closeBtn = document.getElementById('daily-login-close-btn');

  if (!modal || !daysRoot || !closeBtn) {
    console.warn('[DailyLogin] Missing modal DOM elements. Did you add #daily-login-modal to index.html?');
    return;
  }

  const { lastClaimedDay } = getDailyLoginInfo();

  // Build rewards HTML
  let rewardsHtml = '';
  DAILY_LOGIN_REWARDS.forEach((reward, i) => {
    const isToday = i === dayIdx;
    const isClaimed = i < lastClaimedDay;
    const isFuture = i > dayIdx;

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
            <img src="Icons/Other/Star.png" style="width:18px;" title="Claimable Today"></div>` : ''}
        ${isClaimed ? `<div style="position:absolute;top:6px;right:6px;">
            <img src="Icons/Other/Checkmark.png" style="width:18px;" title="Claimed"></div>` : ''}
      </div>
    `;
  });

  // Inject into the existing modal container
  daysRoot.innerHTML = rewardsHtml;

  // Show modal
  modal.style.display = 'flex';

  // Click logic for each reward slot
  daysRoot.querySelectorAll('.daily-login-reward').forEach((el) => {
    const i = parseInt(el.getAttribute('data-day'), 10);
    const isToday = i === dayIdx;
    const { lastClaimedDay } = getDailyLoginInfo();
    const isClaimed = i < lastClaimedDay;

    el.onclick = function (e) {
      e.stopPropagation();

      if (!isToday || isClaimed) {
        showToast(isClaimed ? "Already claimed this reward!" : "You can only claim today's reward.", { type: "info" });
        return;
      }

      const { lastLoginDate } = getDailyLoginInfo();
      const today = getUtcDateString();
      if (lastLoginDate === today) {
        showToast("Already claimed today's reward!", { type: "info" });
        return;
      }

      const reward = DAILY_LOGIN_REWARDS[i];
      addCoins(reward.coins);
      setEssence(getEssence() + reward.essence);
      setDailyLoginInfo(i + 1, today);

      showToast(`Claimed: ${reward.coins} Coins & ${reward.essence} Essence for ${reward.title}!`, { type: "success" });

      // Hide modal (don't remove)
      modal.style.display = 'none';
    };
  });

  // Close button
  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };

  // Click outside closes
  modal.onclick = function (e) {
    if (e.target === modal) modal.style.display = 'none';
  };
}
window.isCosmeticUnlockedByRequirement = function(unlockReq) {
  if (!unlockReq) return true;

  if (unlockReq.type === "achievementTierClaimed") {
    const st = window.playerAchievements || {};
    const claimed = st.claimed || {};
    return !!(claimed[unlockReq.groupId] && claimed[unlockReq.groupId][unlockReq.tier]);
  }

  if (unlockReq.type === "achievementTierCompleted") {
    const st = window.playerAchievements || {};
    const progress = st.progress || {};
    const v = Number(progress[unlockReq.groupId] || 0);

    // We need the goal number for that tier:
    const idx = window._ACHIEVEMENT_INDEX || {}; // you already build this in quest.js
    const entry = idx[unlockReq.groupId];
    const tierDef = entry?.group?.tiers?.find(t => Number(t.tier) === Number(unlockReq.tier));
    const goal = Number(tierDef?.goal || 0);

    return goal > 0 && v >= goal;
  }

  return true; // fail-open for unknown types (or false if you prefer strict)
};

// Icons logic
function normalizeKey(s) {
  if (!s && s !== 0) return '';
  return String(s).toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
}
function getTypeId(typeName) {
  return normalizeKey(typeName); // "Dragon" -> "dragon"
}

// Return icon URL for a keyword (type/ability/archetype/trait/etc.)
function getKeywordIcon(name) {
  if (!name) return null;
  const key = normalizeKey(name);
  if (!key) return null;

  if (CARD_KEYWORD?.[key]?.icon) return CARD_KEYWORD[key].icon;
  if (TYPES?.[key]?.icon) return TYPES[key].icon;

  return null;
}
// --- Inline icon parsing helpers (use CARD_KEYWORD map from shared.js) ---
function getEssenceIconPath(token) {
  if (!token) return null;
  const key = String(token).toLowerCase().trim();
  return ESSENCE_IMAGE_MAP?.[key] || null;
}

function getKeywordIconPath(token) {
  if (!token) return null;

  const key = normalizeKey(token);

  // 1. Essence icons first: {g}, {g2}, {x1}, etc.
  const essenceIcon = getEssenceIconPath(key);
  if (essenceIcon) return essenceIcon;

  // 2. Type definitions if available
  if (typeof getTypeDef === 'function') {
    const typeDef = getTypeDef(token);
    if (typeDef?.icon) return typeDef.icon;
  }

  // 3. CARD_KEYWORD / TYPES fallback
  const keywordEntry = CARD_KEYWORD?.[key] || TYPES?.[key];
  if (!keywordEntry) return null;

  if (typeof keywordEntry === 'string') return keywordEntry;
  if (typeof keywordEntry === 'object') {
    return keywordEntry.icon || keywordEntry.image || keywordEntry.path || null;
  }

  return null;
}

// Escape HTML for safe HTML generation
function escapeHtmlInline(s) {
  return String(s || '').replace(/[&<>"']/g, function (m) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
  });
}
// Generic renderer for a token like "g2", "flying", "cw", etc.
function renderTokenToHtml(token, options = {}) {
  const {
    size = 18,
    className = 'inline-icon',
    altPrefix = ''
  } = options;

  if (!token) return '';

  const raw = String(token).trim();
  const lower = raw.toLowerCase();

  // Tap / untap special cases
  if (lower === 'cw') {
    return `<img src="Icons/Essence/Tap.png" class="${escapeHtmlInline(className)}" alt="Tapped" title="Tapped" style="width:${size}px;height:${size}px;vertical-align:middle;margin:0 6px;">`;
  }
  if (lower === 'ccw') {
    return `<img src="Icons/Essence/Untap.png" class="${escapeHtmlInline(className)}" alt="Untapped" title="Untapped" style="width:${size}px;height:${size}px;vertical-align:middle;margin:0 6px;">`;
  }

  // Essence icons: {g}, {g2}, {x1}, etc.
  const essencePath = getEssenceIconPath(lower);
  if (essencePath) {
    return `<img src="${escapeHtmlInline(essencePath)}" class="${escapeHtmlInline(className)}" alt="${escapeHtmlInline((altPrefix ? altPrefix + ' ' : '') + raw)}" title="${escapeHtmlInline(raw)}" style="width:${size}px;height:${size}px;vertical-align:middle;margin:0 6px;">`;
  }

  // Keyword/type/ability icons
  const path = getKeywordIconPath(raw);
  if (path) {
    return `<img src="${escapeHtmlInline(path)}" class="${escapeHtmlInline(className)}" alt="${escapeHtmlInline((altPrefix ? altPrefix + ' ' : '') + raw)}" title="${escapeHtmlInline(raw)}" style="width:${size}px;height:${size}px;vertical-align:middle;margin:0 6px;">`;
  }

  return '';
}
// options: { size: number (px), className: string, altPrefix: string }
function parseInlineIconsToFragment(text, options = {}) {
  const { size = 18, className = 'inline-icon', altPrefix = '' } = options;
  const frag = document.createDocumentFragment();
  if (text === undefined || text === null) return frag;

  const str = String(text);
  const re = /\{([^}]+)\}/g;
  let lastIndex = 0;
  let m;

  while ((m = re.exec(str)) !== null) {
    if (m.index > lastIndex) {
      frag.appendChild(document.createTextNode(str.slice(lastIndex, m.index)));
    }

    lastIndex = re.lastIndex;
    const token = m[1].trim();
    const html = renderTokenToHtml(token, { size, className, altPrefix });

    if (html) {
      const wrapper = document.createElement('span');
      wrapper.innerHTML = html;
      while (wrapper.firstChild) frag.appendChild(wrapper.firstChild);
    } else {
      frag.appendChild(document.createTextNode('{' + token + '}'));
    }
  }

  if (lastIndex < str.length) {
    frag.appendChild(document.createTextNode(str.slice(lastIndex)));
  }

  return frag;
}

// If you need an HTML string (escaped), use this
function parseInlineIconsToHtml(text, options = {}) {
  const { size = 18, className = 'inline-icon', altPrefix = '' } = options;
  if (text === undefined || text === null) return '';

  const str = String(text);
  const re = /\{([^}]+)\}/g;
  let lastIndex = 0;
  let out = '';
  let m;

  while ((m = re.exec(str)) !== null) {
    if (m.index > lastIndex) {
      out += escapeHtmlInline(str.slice(lastIndex, m.index));
    }

    lastIndex = re.lastIndex;
    const token = m[1].trim();
    const html = renderTokenToHtml(token, { size, className, altPrefix });

    out += html || escapeHtmlInline('{' + token + '}');
  }

  if (lastIndex < str.length) {
    out += escapeHtmlInline(str.slice(lastIndex));
  }

  return out;
}

function replaceTokensInElement(rootEl, options = {}) {
  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  let node;

  while ((node = walker.nextNode())) {
    if (node.nodeValue && node.nodeValue.includes('{')) {
      textNodes.push(node);
    }
  }

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
    const key = normalizeKey(text);
    const keywordEntry = CARD_KEYWORD?.[key] || TYPES?.[key] || null;

    const icon = keywordEntry?.icon || getKeywordIcon(text);
    const displayName = keywordEntry?.name || text;
    const description = keywordEntry?.description || displayName;

    const escText = displayName.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escDescription = description.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (icon) {
      return `
        <div class="kw-chip" title="${escDescription}">
          <img
            src="${icon}"
            alt="${escText}"
            title="${escDescription}"
            class="kw-chip-icon"
          >
          <span class="kw-chip-text" title="${escDescription}">${escText}</span>
        </div>
      `;
    } else {
      return `
        <div class="kw-chip" title="${escDescription}">
          <span class="kw-chip-text" title="${escDescription}">${escText}</span>
        </div>
      `;
    }
  }).filter(Boolean);

  return `<div class="kw-chip-row">${chips.join('')}</div>`;
}

// Use this to parse effect text with tokens into HTML with images/icons
function parseEffectText(effect) {
  if (!effect) return "";

  if (typeof effect !== "string") {
    if (Array.isArray(effect)) {
      effect = effect.map(e => typeof e === "string" ? e : JSON.stringify(e)).join(", ");
    } else {
      effect = JSON.stringify(effect);
    }
  }

  return parseInlineIconsToHtml(effect, {
    size: 20,
    className: 'effect-inline-icon'
  });
}

function countEssenceType(essenceStr, typeCode) {
  if (typeof essenceStr !== "string" || !typeCode) return 0;

  const normalized = String(typeCode).toLowerCase();

  // Matches both {g} and {g2}, {g3}, etc.
  const regex = new RegExp(`\\{${normalized}(\\d+)?\\}`, "gi");
  const matches = [...essenceStr.matchAll(regex)];

  let total = 0;
  for (const match of matches) {
    total += match[1] ? Number(match[1]) : 1;
  }
  return total;
}

function countColorlessEssence(essenceStr) {
  if (typeof essenceStr !== "string") return 0;

  const matches = [...essenceStr.matchAll(/\{x(\d+)\}/gi)];
  return matches.reduce((sum, m) => sum + Number(m[1] || 0), 0);
}

// POWER
function getPlayerLevelFromPower(power) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (power >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

function renderStatIcon(statType, value) {
  const key = "X" + value;
  const imgSrc = ESSENCE_IMAGE_MAP[key];
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

  // Trait
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
	(card.atk !== undefined ? `<span class="full-card-info-label">ATK:</span> ${renderStatIcon('atk', card.atk)} ` : '') +
	(card.hp !== undefined ? `<span class="full-card-info-label">HP:</span> ${renderStatIcon('hp', card.hp)} ` : '') +

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

  // Compose modal content (side-by-side)
  modalContent.innerHTML = `
    <div class="full-card-modal-flex" style="position:relative;">
      <div class="full-card-image-container">
        <img src="${card.image}" alt="${card.name}" class="full-card-modal-img ${owned === 0 ? 'card-image-locked' : ''}">
      </div>
      <div class="full-card-info-panel">
        ${infoHtml}
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
  if (!costData) {
    return `<img src="${ESSENCE_IMAGE_MAP.x0}" alt="Cost: 0" style="width:22px;height:22px;vertical-align:middle;">`;
  }

  if (typeof costData !== "string") {
    return `<img src="${ESSENCE_IMAGE_MAP.x0}" alt="Cost: 0" style="width:22px;height:22px;vertical-align:middle;">`;
  }

  return costData.replace(/\{([^}]+)\}/g, (match, token) => {
    const key = String(token).trim().toLowerCase();

    if (key === "cw") {
      return `<img src="Icons/Essence/Tap.png" style="width:22px;height:22px;vertical-align:middle;">`;
    }

    if (key === "ccw") {
      return `<img src="Icons/Essence/Untap.png" style="width:22px;height:22px;vertical-align:middle;">`;
    }

    const imgSrc = ESSENCE_IMAGE_MAP[key];
    if (imgSrc) {
      return `<img src="${imgSrc}" alt="${key}" style="width:22px;height:22px;vertical-align:middle;">`;
    }

    return `<span style="font-weight:bold;color:#ffe066;font-size:1.12em;vertical-align:middle;margin-right:2px;">{${token}}</span>`;
  });
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
function closeAllMenus() {
  document.querySelectorAll('.card-menu').forEach(menu => menu.remove());

  // also clear transient targeting highlights/click handlers
  document.querySelectorAll('.target-highlight, .selected, .attack-target-highlight').forEach(el => {
    el.classList.remove('target-highlight', 'selected', 'attack-target-highlight');
    el.onclick = null;
  });

  const bf = document.getElementById('battlefield');
  if (bf) bf.classList.remove('skill-mode-backdrop', 'attack-mode-backdrop');
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

function getCardImage(card, preferredStyle = null) {
  if (!card) return 'Icons/Other/Placeholder.png';
  
  // Get player's selected style for this specific card (if any)
  const playerSelectedStyle = window.playerCardStyles?.[card.id];
  const styleToUse = preferredStyle || playerSelectedStyle || 'default';
  
  // Map style names to card properties
  const styleMap = {
    'default': card.image,
    'fullArt': card.fullArt,
  };
  
  // Get the requested style, fallback to default if not available
  const selectedImage = styleMap[styleToUse];
  
  // Check if the style is unlocked for this player
  if (styleToUse !== 'default' && selectedImage) {
    const isUnlocked = isCardStyleUnlocked(card.id, styleToUse);
    if (isUnlocked) {
      return selectedImage;
    }
  }
  // Fallback to default image
  return card.image || 'Icons/Other/Placeholder.png';
}

function isCardStyleUnlocked(cardId, styleType) {
  if (styleType === 'default') return true; // Default is always unlocked
  switch (styleType) {
    case 'fullArt': return window.playerUnlockedFullArt?.[cardId] === true;
	default:
    return false;
  }
}

function getAvailableCardStyles(card, onlyUnlocked = false) {
  const allStyles = [];
  // Default is always available
  allStyles.push({
    key: 'default',
    name: 'Default',
    image: card.image,
    unlocked: true
  });
  // Full Art
  if (card.fullArt) {
    allStyles.push({
      key: 'fullArt',
      name: 'Full Art',
      image: card.fullArt,
      unlocked: isCardStyleUnlocked(card.id, 'fullArt')
    });
  }
  // Filter to only unlocked if requested
  if (onlyUnlocked) {
    return allStyles.filter(style => style.unlocked);
  }
  return allStyles;
}

function unlockCardStyle(cardId, styleType) {
  switch (styleType) {
    case 'fullArt':
      if (!window.playerUnlockedFullArt) window.playerUnlockedFullArt = {};
      window.playerUnlockedFullArt[cardId] = true;
      break;
  }
  saveProgress();
  showToast(`Unlocked ${styleType} style!`, { type: 'success' });
}

// MENU INSIDE VIEWPORT
function placeMenuWithinShell(menu, triggerRect, preferred = "bottom") {
  // Pick your shell/root element (adjust selector if needed)
  const shell =
    document.getElementById('app-main') ||
    document.getElementById('game-shell') ||
    document.querySelector('.game-shell') ||
    document.body;

  // Ensure shell can anchor absolutely-positioned children
  const shellStyle = getComputedStyle(shell);
  if (shellStyle.position === 'static') {
    shell.style.position = 'relative';
  }

  // Attach menu to shell (not body)
  if (menu.parentNode !== shell) {
    shell.appendChild(menu);
  }

  menu.style.position = 'absolute';
  menu.style.zIndex = '3000';

  // Rects
  const shellRect = shell.getBoundingClientRect();

  // Initial preferred position relative to shell
  let top = (preferred === 'top')
    ? (triggerRect.top - shellRect.top) - menu.offsetHeight - 8
    : (triggerRect.bottom - shellRect.top) + 8;

  let left = (triggerRect.left - shellRect.left);

  // Force layout to get size if needed
  const menuRect = menu.getBoundingClientRect();
  const menuW = menuRect.width;
  const menuH = menuRect.height;

  const maxLeft = shell.clientWidth - menuW - 8;
  const maxTop = shell.clientHeight - menuH - 8;

  // Horizontal clamp to shell
  left = Math.max(8, Math.min(left, maxLeft));

  // Vertical fallback logic
  if (top > maxTop) {
    const above = (triggerRect.top - shellRect.top) - menuH - 8;
    if (above >= 8) {
      top = above;
    } else {
      top = maxTop;
    }
  }

  top = Math.max(8, Math.min(top, maxTop));

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
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

window.getCardArt = function(card, owner = "player") {
  const selected = (owner === "player")
    ? (window.playerCardStyles?.[card.id] || "default")
    : (window.opponentCardStyles?.[card.id] || "default");

  if (selected === "fullArt" && card.fullArt) return card.fullArt;
  if (selected === "foil" && card.imageFoil) return card.imageFoil;
  return card.image;
};

window.getCardArtForOwner = function(card, owner) {
  // owner: "player" | "opponent"
  const styles =
    owner === "opponent"
      ? (window.opponentCardStyles || {})
      : (window.playerCardStyles || {});

  const selected = styles[card.id] || "default";

  // Map style keys to your card object fields:
  if (selected === "fullArt" && card.fullArt) return card.fullArt;
  if (selected === "default" && card.image) return card.image;

  // fallback
  return card.image;
};
// PROFILE PANEL POP-UP
document.addEventListener('DOMContentLoaded', function() {
  const badgeImg = document.getElementById('player-badge-img');
  if (badgeImg) {
    badgeImg.onclick = function() {
      const achievementData =
        (typeof getAchievementData === "function") ? (getAchievementData() || {}) : {};

      const achievements =
        Array.isArray(window.ACHIEVEMENTS)
          ? window.ACHIEVEMENTS
              .filter(a => achievementData?.[a?.id]?.claimed)
              .map(a => a.id)
          : [];

      const playerData = {
        username: window.playerUsername || (window.auth && window.auth.currentUser && window.auth.currentUser.displayName) || "Player",
        profilePic: window.playerProfilePic || badgeImg.src,
        profileBanner: window.playerProfileBanner || "Images/Banner/Default.png",
        power: typeof calculatePlayerPower === "function" ? calculatePlayerPower() : 0,
        achievements,
        badges: []
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
      case 'Legend': maxCount = 1; perCardPower = 10; foilPower = 20; break;
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
if (typeof getAchievementData === "function" && Array.isArray(window.ACHIEVEMENTS)) {
  const achievementData = getAchievementData();
  let achievementsClaimed = 0;

  window.ACHIEVEMENTS.forEach(ach => {
    const progress = achievementData?.[ach.id];
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
  const profileBanner = profile.profileBanner || profile.banner || "Images/Banner/Default.png";
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
let allBadges = [];
if (typeof ACHIEVEMENTS !== "undefined" && ACHIEVEMENTS) {
  if (Array.isArray(ACHIEVEMENTS)) {
    allBadges = ACHIEVEMENTS;
  } else {
    // Object form: { general: { groups: [...] }, color: { groups: [...] }, ... }
    for (const section of Object.values(ACHIEVEMENTS)) {
      const groups = Array.isArray(section?.groups) ? section.groups : [];
      for (const g of groups) {
        const id = g?.id || g?.key || g?.name;
        if (!id) continue;
        allBadges.push({
          id,
          name: g?.title || g?.name || id,
          image: g?.image || g?.icon || g?.img || ""
        });
      }
    }
  }
}
  const ownedBadges = (profile.achievements || []).concat(profile.badges || []);
  const badgeImageMap = {};
for (const badge of allBadges) {
  badgeImageMap[badge.id] = badge.image || badge.img || "";
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
  favoriteIds = [],        // Default to an empty array for safety
  showFavoritesOnly = false,
  nameFilter = "",
  selectedFilters = {},    // Default to an empty object
}) {
  return dummyCards.filter((card) => {
    // Name filter (outside the modal)
    if (nameFilter && !card.name.toLowerCase().includes(nameFilter.toLowerCase())) {
      return false; // Card name doesn't match
    }

    // Favorites filter (outside the modal)
    if (showFavoritesOnly && !favoriteIds.includes(card.id)) {
      return false; // Card is not in the favorites list
    }

    // Process filters generated by the modal
    for (const [key, selectedValues] of Object.entries(selectedFilters)) {
      if (!selectedValues || selectedValues.length === 0 || selectedValues.includes("All")) {
        continue; // No filter applied for this category or "All" is selected
      }

      const cardField = Array.isArray(card[FILTERS[key].key]) // Check if the field is an array
        ? card[FILTERS[key].key].map((value) => value.toLowerCase())
        : [String(card[FILTERS[key].key] || "").toLowerCase()];

      // Check if the card's field matches any of the selected filter values
      if (!cardField.some((value) => selectedValues.includes(value))) {
        return false; // Card doesn't match the filter
      }
    }
    return true; // Card matches all filters
  });
}
window.filterCards = filterCards;

function showFilterModal(context, callback) {
  let modal = document.getElementById('filter-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'filter-modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }

  // Build modal content dynamically
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Filters</h2>
      <div id="filter-options">
        ${Object.keys(FILTERS)
          .map(
            (key) => `
            <div class="filter-category">
              <h3>${FILTERS[key].label}</h3>
              ${FILTERS[key].options
                .map(
                  (option) => `
                  <label>
                    <input 
                      type="checkbox" 
                      data-filter="${key}" 
                      value="${option}"
                    >
                    ${option}
                  </label>`
                )
                .join('')}
            </div>
          `
          )
          .join('')}
      </div>
      <div class="modal-buttons">
        <button id="filter-apply-btn" class="btn-primary">Apply</button>
        <button id="filter-cancel-btn" class="btn-secondary">Cancel</button>
      </div>
    </div>
  `;

  modal.style.display = 'flex'; // Display the modal

  // Apply button logic: Read filter values and trigger the callback
  modal.querySelector('#filter-apply-btn').onclick = () => {
    modal.style.display = 'none'; // Close modal

    // Collect selected filters
    const selectedFilters = {};
    Object.keys(FILTERS).forEach((key) => {
      const selectedOptions = [
        ...modal.querySelectorAll(`input[data-filter="${key}"]:checked`),
      ];
      selectedFilters[key] = selectedOptions.map((checkbox) => checkbox.value.toLowerCase());
    });

    // Pass the selected filters to the callback
    if (callback) callback(selectedFilters);
  };

  // Cancel button logic: Close modal
  modal.querySelector("#filter-cancel-btn").onclick = () => {
    modal.style.display = "none";
  };

  // Close modal when clicking outside the content
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}
function getSelectedFiltersFromModal() {
  // Safely retrieve the modal and ensure it exists
  const modal = document.getElementById('filter-modal');
  if (!modal) {
    console.warn("Filter modal not found in the DOM.");
    return {};
  }

  return {
    selectedOwnerships: Array.from(
      modal.querySelectorAll('[data-filter="ownership"]:checked') || []
    ).map((el) => el.value),
    selectedColors: Array.from(
      modal.querySelectorAll('[data-filter="color"]:checked') || []
    ).map((el) => el.value.toLowerCase()),
    selectedTypes: Array.from(
      modal.querySelectorAll('[data-filter="type"]:checked') || []
    ).map((el) => el.value.toLowerCase()),
    selectedRarities: Array.from(
      modal.querySelectorAll('[data-filter="rarity"]:checked') || []
    ).map((el) => el.value.toLowerCase()),
    selectedArchetypes: Array.from(
      modal.querySelectorAll('[data-filter="archetype"]:checked') || []
    ).map((el) => el.value.toLowerCase()),
    selectedTraits: Array.from(
      modal.querySelectorAll('[data-filter="trait"]:checked') || []
    ).map((el) => el.value.toLowerCase()),
    selectedAbilities: Array.from(
      modal.querySelectorAll('[data-filter="ability"]:checked') || []
    ).map((el) => el.value.toLowerCase()),
    selectedCategories: Array.from(
      modal.querySelectorAll('[data-filter="category"]:checked') || []
    ).map((el) => el.value.toLowerCase()),
  };
}

// HOLD CLICK //
function holdClickToView(element, cardObj, onShortClick = null, options = {}) {
  const {
    holdDuration = 500,
    showVisualFeedback = true,
    feedbackClass = 'holding',
    dragThreshold = 3,            // Lower threshold for better sensitivity
    enableDragDetection = true
  } = options;

  let holdTimer = null;
  let isHolding = false;
  let isDragging = false;
  let hasMoved = false;
  let startX = 0;
  let startY = 0;

  // Mouse handlers
  element.addEventListener('mousedown', function(e) {
    // Only respond to left click
    if (e.button !== 0) return;
    
    isHolding = false;
    isDragging = false;
    hasMoved = false;
    
    // Record starting position for drag detection
    if (enableDragDetection) {
      startX = e.clientX;
      startY = e.clientY;
    }
    
    // Add visual feedback
    if (showVisualFeedback) {
      element.classList.add(feedbackClass);
    }
    
    holdTimer = setTimeout(() => {
      // Only trigger if we haven't started dragging AND haven't moved
      if (!isDragging && !hasMoved) {
        isHolding = true;
        
        // Remove visual feedback
        if (showVisualFeedback) {
          element.classList.remove(feedbackClass);
        }
        
        // Show full card modal
        showFullCardModal(cardObj);
      }
    }, holdDuration);
  });

  // Detect drag movement
  if (enableDragDetection) {
    element.addEventListener('mousemove', function(e) {
      if (holdTimer && !isDragging && !isHolding) {
        const deltaX = Math.abs(e.clientX - startX);
        const deltaY = Math.abs(e.clientY - startY);
        
        // If mouse moved beyond threshold, it's a drag or movement
        if (deltaX > dragThreshold || deltaY > dragThreshold) {
          hasMoved = true;
          clearTimeout(holdTimer);
          
          // Remove visual feedback
          if (showVisualFeedback) {
            element.classList.remove(feedbackClass);
          }
        }
      }
    });

    // Listen to dragstart event (native HTML5 drag)
    element.addEventListener('dragstart', function(e) {
      isDragging = true;
      hasMoved = true;
      clearTimeout(holdTimer);
      
      // Remove visual feedback
      if (showVisualFeedback) {
        element.classList.remove(feedbackClass);
      }
    });

    element.addEventListener('dragend', function(e) {
      // Reset drag state after drag ends
      setTimeout(() => {
        isDragging = false;
        hasMoved = false;
      }, 50); // Small delay to prevent click from firing
    });
  }

  element.addEventListener('mouseup', function(e) {
    clearTimeout(holdTimer);
    
    // Remove visual feedback
    if (showVisualFeedback) {
      element.classList.remove(feedbackClass);
    }
    
    // Handle short click (only if not holding, not dragging, and hasn't moved)
    if (!isHolding && !isDragging && !hasMoved && e.button === 0) {
      if (typeof onShortClick === 'function') {
        onShortClick(e);
      }
    }
    
    // Reset states (with small delay for drag)
    if (!isDragging) {
      setTimeout(() => {
        isHolding = false;
        hasMoved = false;
      }, 10);
    }
  });

  element.addEventListener('mouseleave', function(e) {
    clearTimeout(holdTimer);
    
    // Remove visual feedback
    if (showVisualFeedback) {
      element.classList.remove(feedbackClass);
    }
    
    // Reset states (but keep isDragging if actively dragging)
    if (!isDragging) {
      isHolding = false;
      hasMoved = false;
    }
  });

  // Touch handlers for mobile
  let touchStartX = 0;
  let touchStartY = 0;

  element.addEventListener('touchstart', function(e) {
    isHolding = false;
    isDragging = false;
    hasMoved = false;
    
    // Record touch position for drag detection
    if (enableDragDetection && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
    
    // Add visual feedback
    if (showVisualFeedback) {
      element.classList.add(feedbackClass);
    }
    
    holdTimer = setTimeout(() => {
      // Only trigger if we haven't started dragging
      if (!isDragging && !hasMoved) {
        isHolding = true;
        
        // Remove visual feedback
        if (showVisualFeedback) {
          element.classList.remove(feedbackClass);
        }
        
        // Show full card modal
        showFullCardModal(cardObj);
      }
    }, holdDuration);
  });

  // Detect touch drag movement
  if (enableDragDetection) {
    element.addEventListener('touchmove', function(e) {
      if (holdTimer && !isDragging && !isHolding && e.touches.length > 0) {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
        
        // If touch moved beyond threshold, it's a drag
        if (deltaX > dragThreshold || deltaY > dragThreshold) {
          hasMoved = true;
          clearTimeout(holdTimer);
          
          // Remove visual feedback
          if (showVisualFeedback) {
            element.classList.remove(feedbackClass);
          }
        }
      }
    });
  }

  element.addEventListener('touchend', function(e) {
    clearTimeout(holdTimer);
    
    // Remove visual feedback
    if (showVisualFeedback) {
      element.classList.remove(feedbackClass);
    }
    
    // Handle short tap (only if not holding and not dragging)
    if (!isHolding && !isDragging && !hasMoved) {
      if (typeof onShortClick === 'function') {
        e.preventDefault();
        onShortClick(e);
      }
    }
    
    // Reset states
    setTimeout(() => {
      isHolding = false;
      isDragging = false;
      hasMoved = false;
    }, 10);
  });

  element.addEventListener('touchcancel', function(e) {
    clearTimeout(holdTimer);
    
    // Remove visual feedback
    if (showVisualFeedback) {
      element.classList.remove(feedbackClass);
    }
    
    // Reset states
    setTimeout(() => {
      isHolding = false;
      isDragging = false;
      hasMoved = false;
    }, 10);
  });
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
function isWhite(cardObj) 	 { return isColor(cardObj, "White"); }
function isBlack(cardObj) 	 { return isColor(cardObj, "Black"); }
function isRed(cardObj)   	 { return isColor(cardObj, "Red"); }
function isGreen(cardObj) 	 { return isColor(cardObj, "Green"); }
function isBlue(cardObj)  	 { return isColor(cardObj, "Blue"); }
function isYellow(cardObj)	 { return isColor(cardObj, "Yellow"); }
function isGray(cardObj)  	 { return isColor(cardObj, "Gray"); }
function isPurple(cardObj)	 { return isColor(cardObj, "Purple"); }
function isColorless(cardObj){ return isColor(cardObj, "Colorless"); }

// CATEGORY
function isCategory(cardObj, category) {return fieldIncludes(cardObj, "category", category);}
function isCreature(cardObj)  { return isCategory(cardObj, "Creature"); }
function isTerrain(cardObj)   { return isCategory(cardObj, "Terrain"); }
function isArtifact(cardObj)  { return isCategory(cardObj, "Artifact"); }
function isSpell(cardObj)     { return isCategory(cardObj, "Spell"); }

// TYPE
function isType(cardObj, type) {return fieldIncludes(cardObj, "type", type);}
function isAngel(cardObj)    { return isType(cardObj, "Angel"); }
function isArbor(cardObj)    { return isType(cardObj, "Arbor"); }
function isAssembly(cardObj) { return isType(cardObj, "Assembly"); }
function isAura(cardObj)     { return isType(cardObj, "Aura"); }
function isAvian(cardObj)    { return isType(cardObj, "Avian"); }
function isBeast(cardObj)    { return isType(cardObj, "Beast"); }
function isBrute(cardObj)    { return isType(cardObj, "Brute"); }
function isConstruct(cardObj){ return isType(cardObj, "Construct"); }
function isDark(cardObj)     { return isType(cardObj, "Dark"); }
function isDemon(cardObj)    { return isType(cardObj, "Demon"); }
function isDomain(cardObj)   { return isType(cardObj, "Domain"); }
function isDragon(cardObj)   { return isType(cardObj, "Dragon"); }
function isDwarf(cardObj)    { return isType(cardObj, "Dwarf"); }
function isElemental(cardObj){ return isType(cardObj, "Elemental"); }
function isElf(cardObj)      { return isType(cardObj, "Elf"); }
function isEnchantment(cardObj){ return isType(cardObj, "Enchantment"); }
function isEquipment(cardObj){ return isType(cardObj, "Equipment"); }
function isEvolution(cardObj){ return isType(cardObj, "Evolution"); }
function isFairy(cardObj)    { return isType(cardObj, "Fairy"); }
function isFaefolk(cardObj)  { return isType(cardObj, "Faefolk"); }
function isFire(cardObj)     { return isType(cardObj, "Fire"); }
function isFusion(cardObj)   { return isType(cardObj, "Fusion"); }
function isGoblin(cardObj)   { return isType(cardObj, "Goblin"); }
function isGolem(cardObj)    { return isType(cardObj, "Golem"); }
function isLight(cardObj)    { return isType(cardObj, "Light"); }
function isMage(cardObj)     { return isType(cardObj, "Mage"); }
function isOrc(cardObj)      { return isType(cardObj, "Orc"); }
function isRanger(cardObj)   { return isType(cardObj, "Ranger"); }
function isRelic(cardObj)    { return isType(cardObj, "Relic"); }
function isSatyr(cardObj)    { return isType(cardObj, "Satyr"); }
function isSpirit(cardObj)   { return isType(cardObj, "Spirit"); }
function isSteel(cardObj)    { return isType(cardObj, "Steel"); }
function isThunder(cardObj)  { return isType(cardObj, "Thunder"); }
function isUndead(cardObj)   { return isType(cardObj, "Undead"); }
function isVerdant(cardObj)  { return isType(cardObj, "Verdant"); }
function isWarrior(cardObj)  { return isType(cardObj, "Warrior"); }
function isWater(cardObj)    { return isType(cardObj, "Water"); }
function isWind(cardObj)     { return isType(cardObj, "Wind"); }
function isZombie(cardObj)   { return isType(cardObj, "Zombie"); }

// --- ARCHETYPE --- //
function isArchetype(cardObj, archetype) {return fieldIncludes(cardObj, "archetype", archetype);}
// --- DRAGON --- //
function isThornwing(cardObj)    { return isArchetype(cardObj, "Thornwing"); }
function isBlazingScale(cardObj) { return isArchetype(cardObj, "Blazingscale"); }
function isAbyssdrake(cardObj)   { return isArchetype(cardObj, "Abyssdrake"); }
function isStormRazor(cardObj)   { return isArchetype(cardObj, "Stormrazor"); }
function isIronclaw(cardObj)     { return isArchetype(cardObj, "Ironclaw"); }
function isDreadspine(cardObj)  { return isArchetype(cardObj, "Dreadspine"); }
function isSolarwyrm(cardObj)    { return isArchetype(cardObj, "Solarwyrm"); }
function isNightshroud(cardObj)  { return isArchetype(cardObj, "Nightshroud"); }
function isGlimmerscale(cardObj) { return isArchetype(cardObj, "Glimmerscale"); }

// --- ELEMENTAL --- //
function isPyro(cardObj)       { return isArchetype(cardObj, "Pyro"); }
function isHydral(cardObj)     { return isArchetype(cardObj, "Hydral"); }
function isVoltkin(cardObj)    { return isArchetype(cardObj, "Voltkin"); }
function isCorruptor(cardObj)  { return isArchetype(cardObj, "Corruptor"); }
function isLuminaut(cardObj)   { return isArchetype(cardObj, "Luminaut"); }
function isObscurid(cardObj)   { return isArchetype(cardObj, "Obscurid"); }

// --- CONSTRUCT --- //
function isGrovehusk(cardObj)   { return isArchetype(cardObj, "Grovehusk"); }
function isCindercore(cardObj)  { return isArchetype(cardObj, "Cindercore"); }
function isCoralbound(cardObj)  { return isArchetype(cardObj, "Coralbound"); }
function isStratosurge(cardObj) { return isArchetype(cardObj, "Stratosurge"); }
function isIronwrought(cardObj) { return isArchetype(cardObj, "Ironwrought"); }
function isPlagueaxis(cardObj)  { return isArchetype(cardObj, "Plagueaxis"); }
function isSolarforge(cardObj)  { return isArchetype(cardObj, "Solarforge"); }
function isShadowgear(cardObj)  { return isArchetype(cardObj, "Shadowgear"); }

// --- BEAST --- //
function isFireland(cardObj)   { return isArchetype(cardObj, "Fireland"); }
function isFrostland(cardObj)  { return isArchetype(cardObj, "Frostland"); }

// --- UNDEAD --- //
function isSkullframe(cardObj)  { return isArchetype(cardObj, "Skullframe"); }
function isVampiric(cardObj)  { return isArchetype(cardObj, "Vampiric"); }

// --- Celestial --- //
function isSeraph(cardObj)      { return isArchetype(cardObj, "Seraph"); }
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
function onParalyzed(cb)  { return addBlightListener('Paralyzed', cb); }
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


// --- STATUS --- //
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
  const container = document.getElementById('profile-icon-grid');
  if (!container) return;

  container.innerHTML = ''; // Clear existing icons

  // Get unlocked avatars with callback
  getUnlockedAvatars(function(avatars) {
    // Ensure avatars is an array
    if (!Array.isArray(avatars)) {
      console.warn('No avatars available');
      container.innerHTML = '<div style="color:#ffe066;text-align:center;padding:20px;">No avatars available</div>';
      return;
    }

    // Render each avatar
    avatars.forEach(avatar => {
      const wrapper = document.createElement('div');
      wrapper.className = 'profile-icon-option';
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';
      wrapper.style.margin = '10px';
      wrapper.style.cursor = 'pointer';
      wrapper.style.border = selectedIcon === avatar.src ? '3px solid #ffe066' : '3px solid transparent';
      wrapper.style.borderRadius = '50%';
      wrapper.style.transition = 'border 0.2s, transform 0.2s';
      
      const img = document.createElement('img');
      img.src = avatar.src || avatar;
      img.alt = avatar.name || 'Avatar';
      img.style.width = '80px';
      img.style.height = '80px';
      img.style.borderRadius = '50%';
      img.style.objectFit = 'cover';
      img.style.display = 'block';
      
      img.onclick = function() {
        selectProfileIcon(avatar.src || avatar);
        renderProfileIcons(avatar.src || avatar);
      };
      
      wrapper.onmouseenter = function() {
        wrapper.style.transform = 'scale(1.1)';
      };
      
      wrapper.onmouseleave = function() {
        wrapper.style.transform = 'scale(1)';
      };
      
      wrapper.appendChild(img);
      container.appendChild(wrapper);
    });
  });
}
// --- Render Banners ---
function renderProfileBanners(selectedBanner) {
  const container = document.getElementById('profile-banner-grid');
  if (!container) return;

  container.innerHTML = ''; // Clear existing banners

  // Get unlocked banners with callback
  getUnlockedBanners(function(banners) {
    // Ensure banners is an array
    if (!Array.isArray(banners)) {
      console.warn('No banners available');
      container.innerHTML = '<div style="color:#ffe066;text-align:center;padding:20px;">No banners available</div>';
      return;
    }

    // Render each banner
    banners.forEach(banner => {
      const wrapper = document.createElement('div');
      wrapper.className = 'profile-banner-option';
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';
      wrapper.style.margin = '10px';
      wrapper.style.cursor = 'pointer';
      wrapper.style.border = selectedBanner === banner.src ? '3px solid #ffe066' : '3px solid transparent';
      wrapper.style.borderRadius = '10px';
      wrapper.style.transition = 'border 0.2s, transform 0.2s';
      
      const img = document.createElement('img');
      img.src = banner.src || banner;
      img.alt = banner.name || 'Banner';
      img.style.width = '200px';
      img.style.height = '100px';
      img.style.borderRadius = '8px';
      img.style.objectFit = 'cover';
      img.style.display = 'block';
      
      img.onclick = function() {
        selectProfileBanner(banner.src || banner);
        renderProfileBanners(banner.src || banner);
      };
      
      wrapper.onmouseenter = function() {
        wrapper.style.transform = 'scale(1.05)';
      };
      
      wrapper.onmouseleave = function() {
        wrapper.style.transform = 'scale(1)';
      };
      
      wrapper.appendChild(img);
      container.appendChild(wrapper);
    });
  });
}
    
// --- Open/Close Avatar Modal ---
profilePicMenuBtn.onclick = function() {
  const modal = document.getElementById('profile-icon-modal');
  if (modal) {
    modal.style.display = 'flex';
    // Get current selected icon
    const currentIcon = document.getElementById('profile-pic')?.src || 'Images/Avatar/Default.png';
    renderProfileIcons(currentIcon);
  }
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

  window.playerProfilePic = iconUrl; // Update the local profile pic
  firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({ profilePic: iconUrl }, { merge: true }) // Update Firestore with new profile pic
    .then(function () {
      // Update profile picture displays
      if (profilePic) profilePic.src = iconUrl;
      if (profilePicMenu) profilePicMenu.src = iconUrl;

      // Re-render profile icons
      renderProfileIcons(iconUrl);

      // Close the avatar modal
      if (profileIconModal) profileIconModal.style.display = "none";
    })
    .catch(function (err) {
      console.error("[auth] Failed to update profile icon:", err);
    });
}

// --- Banner Modal ---
profileBanner.onclick = function() {
  const modal = document.getElementById('profile-banner-modal');
  if (modal) {
    modal.style.display = 'flex';
    // Get current selected banner
    const currentBanner = profileBanner?.src || 'Images/Banner/Default.png';
    renderProfileBanners(currentBanner);
  }
};

closeProfileBannerModalBtn.onclick = function () {
  if (profileBannerModal) profileBannerModal.style.display = "none";
};

profileBannerModal.onclick = function (e) {
  if (e.target === profileBannerModal) {
    profileBannerModal.style.display = "none";
  }
};

// --- Banner Selection ---
function selectProfileBanner(bannerUrl) {
  const user = auth.currentUser;
  if (!user) return;

  window.playerProfileBanner = bannerUrl; // Update local state with the selected banner
  firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({ profileBanner: bannerUrl }, { merge: true }) // Update Firestore with the selected banner
    .then(function () {
      // Re-render banners
      renderProfileBanners(bannerUrl);

      // Close the banner modal
      if (profileBannerModal) profileBannerModal.style.display = "none";
    })
    .catch(function (err) {
      console.error("[auth] Failed to update profile banner:", err);
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
  if (typeof placeMenuWithinShell === 'function') {
    placeMenuWithinShell(profileMenu, rect, 'bottom');
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
document.getElementById('friends-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};

// ---------------- //
// --- SETTINGS --- //
// ---------------- //



// Settings Modal Logic
document.addEventListener('DOMContentLoaded', function() {
  const settingsModal = document.getElementById('settings-modal');
  const cancelSettingsBtn = document.getElementById('cancel-settings-btn');
  const toggleNotices = document.getElementById('toggle-notices');
  const toggleMusic = document.getElementById('toggle-music');
  const settingsLogoutBtn = document.getElementById('settings-logout-btn');
  
  // All settings buttons
  const settingIds = [
    'home-settings-btn',
    'gallery-settings-btn',
    'builder-settings-btn',
    'deck-selection-settings-btn',
    'gameplay-settings-btn',
    'shop-settings-btn'
  ];
  
  // Open modal when any settings button is clicked
  settingIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = function() {
        if (settingsModal) {
          // Load saved settings when opening modal
          if (toggleNotices) {
            toggleNotices.checked = localStorage.getItem('settings-notices') === 'on';
          }
          if (toggleMusic) {
            toggleMusic.checked = localStorage.getItem('settings-music') === 'on';
          }
          settingsModal.style.display = 'flex';
        }
      };
    }
  });

  // Cancel button
  if (cancelSettingsBtn) {
    cancelSettingsBtn.onclick = function() {
      settingsModal.style.display = 'none';
    };
  }

  // Logout button
  if (settingsLogoutBtn) {
    settingsLogoutBtn.onclick = function() {
      if (typeof logout === "function") {
        logout();
      } else if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut().then(function() {
          location.reload();
        });
      }
    };
  }

  // Close modal when clicking outside
  if (settingsModal) {
    settingsModal.onclick = function(e) {
      if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
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

window.sendFriendRequest = sendFriendRequest;
window.acceptFriendRequest = acceptFriendRequest;
window.declineFriendRequest = declineFriendRequest;
window.renderFriendsList = renderFriendsList;
window.blockUser = blockUser;
window.unblockUser = unblockUser;
window.viewFriendProfile = viewFriendProfile;
window.removeFriend = removeFriend;
window.cancelSentRequest = cancelSentRequest;
window.playerUnlockedAvatars = window.playerUnlockedAvatars || [];
window.unlockedAvatars = window.unlockedAvatars || [];
window.playerUnlockedBanners = window.playerUnlockedBanners || [];
window.unlockedBanners = window.unlockedBanners || [];
window.playerUnlockedCardbacks = window.playerUnlockedCardbacks || [];
window.unlockedCardbacks = window.unlockedCardbacks || [];
window.playerUnlockedCosmetics = window.playerUnlockedCosmetics || [];
window.unlockedCosmetics = window.unlockedCosmetics || [];
