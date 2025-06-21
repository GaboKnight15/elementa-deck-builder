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
// === SECTION NAVIGATION ===
// ==========================
// Add nav button listeners
document.querySelectorAll('#main-nav button[data-section]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Hide all content sections
    document.querySelectorAll('section[id$="-section"]').forEach(section => section.style.display = 'none');
    // Show the one matching the button's data-section
    const target = btn.getAttribute('data-section');
    document.getElementById(target).style.display = '';
  });
});
// Optionally, show builder-section by default on load
document.getElementById('builder-section').style.display = '';

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

// VIEW CARDS
function showFullCardModal(cardObj) {
  const card = dummyCards.find(c => c.id === (cardObj.cardId || cardObj.id));
  if (!card) return;
  const modal = document.getElementById('image-modal');
  const modalContent = document.getElementById('modal-img-content');
  const modalImg = document.getElementById('modal-img');
  if (modalContent) {
    modalContent.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <div style="text-align:center;">
        ${card.hp !== undefined ? `HP: ${card.hp}` : ''}
        ${card.atk !== undefined ? ` | ATK: ${card.atk}` : ''}
        ${card.def !== undefined ? ` | DEF: ${card.def}` : ''}
        ${card.cost !== undefined ? ` | Cost: ${card.cost}` : ''}
      </div>
      <div style="text-align:center;margin:8px 0;">
        ${card.rarity || ''} ${Array.isArray(card.type) ? card.type.join(', ') : card.type || ''}
      </div>
      <div style="text-align:center;font-size:0.98em;color:#555;">
        ${card.text || ''}
      </div>
    `;
    modal.style.display = 'flex';
    if (modalImg) modalImg.style.display = "none";
  } else {
    modalImg.src = card.image;
    modalImg.style.display = "block";
    modal.style.display = "flex";
  }
}
// IMAGE MODAL CLOSE
document.getElementById('image-modal').onclick = (e) => {
  if (e.target.id === 'image-modal') {
    document.getElementById('image-modal').style.display = "none";
  }
};
