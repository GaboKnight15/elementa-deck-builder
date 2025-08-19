const DEFAULT_CPU_DECKS = [
  {
    id: 'green',
    name: 'Verdant Might',
    color: 'green',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Fairy.png',
    bannerArt: 'CardImages/Banners/GreenBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/FairyCardback.png',
    cards: [
      { id: 'Verdara', amount: 1 },
      { id: 'ForestFairy', amount: 4 },
      { id: 'ForestGoblin', amount: 4 },
      { id: 'HeartwoodEmeralds', amount: 4 },
      { id: 'LifeGrowth', amount: 4 },
      { id: 'EssenceSurge', amount: 4 },
      { id: 'basicforest', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'red',
    name: 'Ember Tyranny',
    color: 'red',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Emberling.png',
    bannerArt: 'CardImages/Banners/RedBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/CBFirelands.png',
    cards: [
      { id: 'Ashkar', amount: 1 },
      { id: 'Emberling', amount: 4 },
      { id: 'FirePixie', amount: 4 },
      { id: 'Hellcharger', amount: 2 },
      { id: 'CindercoreEmber', amount: 4 },
      { id: 'EssenceAssault', amount: 4 },
      { id: 'basicvolcano', amount: 4 },
      // ... etc
    ]
  },
    {
    id: 'blue',
    name: 'Tidebound Will',
    color: 'blue',
    difficulty: '⭐',
    image: 'CardImages/Avatars/WaterElemental.png',
    bannerArt: 'CardImages/Banners/BlueBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/BlueCardback.png',
    cards: [
      { id: 'Marinthae', amount: 1 },
      { id: 'WaterElemental', amount: 4 },
      { id: 'TidecallersPearl', amount: 4 },
      { id: 'EssenceRift', amount: 4 },
      { id: 'basicocean', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'yellow',
    name: 'Surgecallers Rite',
    color: 'yellow',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Thunderspawn.png',
    bannerArt: 'CardImages/Banners/YellowBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/YellowCardback.png',
    cards: [
      { id: 'Aetherion', amount: 1 },
      { id: 'StormcoreDynamo', amount: 4 },
      { id: 'EssenceBolt', amount: 4 },
      { id: 'basicpeaks', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'purple',
    name: 'Venom Bloom',
    color: 'purple',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Goblin.png',
    bannerArt: 'CardImages/Banners/PurpleBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/PurpleCardback.png',
    cards: [
      { id: 'Virkul', amount: 1 },
      { id: 'Goblin', amount: 4 },
      { id: 'PlagueThornTalisman', amount: 4 },
      { id: 'EssenceBreak', amount: 4 },
      { id: 'basicswamp', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'gray',
    name: 'Ironroot Vow',
    color: 'gray',
    difficulty: '⭐',
    image: 'CardImages/Avatars/RockLizard.png',
    bannerArt: 'CardImages/Banners/GrayBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/GrayCardback.png',
    cards: [
      { id: 'Drakzul', amount: 1 },
      { id: 'Golemites', amount: 4 },
      { id: 'DesertWolf', amount: 4 },
      { id: 'TitansAnvil', amount: 4 },
      { id: 'EssenceBarrier', amount: 4 },
      { id: 'basicmountain', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'black',
    name: 'Shadowy Descent',
    color: 'black',
    difficulty: '⭐',
    image: 'CardImages/Avatars/Wolf.png',
    bannerArt: 'CardImages/Banners/BlackBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/BlackCardback.png',
    cards: [
      { id: 'Nocthyra', amount: 1 },
      { id: 'Imp', amount: 4 },
      { id: 'Skeleton', amount: 4 },
      { id: 'Bat', amount: 4 },
      { id: 'Vampire', amount: 4 },
      { id: 'basicvampire', amount: 4 },
      { id: 'VeiloftheForgotten', amount: 4 },
      { id: 'EssencePurge', amount: 4 },
      { id: 'basicshadowforest', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'white',
    name: 'Radiant Oath',
    color: 'white',
    difficulty: '⭐',
    image: 'CardImages/Avatars/AngelicWarrior.png',
    bannerArt: 'CardImages/Banners/WhiteBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/WhiteCardback.png',
    cards: [
      { id: 'Solmara', amount: 1 },
      { id: 'AngelicWarrior', amount: 4 },
      { id: 'basicfirepixie', amount: 4 },
      { id: 'LumenSpire', amount: 4 },
      { id: 'EssenceBlessing', amount: 4 },
      { id: 'basicplains', amount: 4 },
      // ... etc
    ]
  },
  {
    id: 'red2',
    name: 'Forgebound Titans',
    color: ['red','gray'],
    difficulty: '⭐⭐',
    image: 'CardImages/Avatars/Emberling.png',
    bannerArt: 'CardImages/Banners/RedBanner.png',
    cardbackArt: 'OtherImages/Cardbacks/RedCardback.png',
    cards: [
      { id: 'Ashkar', amount: 1 },
      { id: 'SmolderingGolemheart', amount: 2 },
      { id: 'GolemheartSentinel', amount: 3 },
      { id: 'GolemheartGiant', amount: 3 },
      { id: 'Golemites', amount: 4 },
      { id: 'FireGolem', amount: 4 },
      { id: 'GolemheartInfusor', amount: 4 },
      { id: 'LifeGrowth', amount: 4 },
      { id: 'EssenceAssault', amount: 4 },
      { id: 'EssenceBarrier', amount: 4 },
      { id: 'basicvolcano', amount: 4 },
      { id: 'basicmountain', amount: 4 },
      
      // ... etc
    ]
  },
  // ...repeat for other colors
];

// Handle mode selection
function showCpuDeckModal() {
  const modal = document.getElementById('cpu-deck-modal');
  const list = document.getElementById('cpu-deck-list');
  list.innerHTML = '';

  // Difficulty options
  const difficultyOptions = [
    { label: "Easy", value: "⭐" },
    { label: "Medium", value: "⭐⭐" },
    { label: "Hard", value: "⭐⭐⭐" }
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
  DEFAULT_CPU_DECKS.filter(deck => deck.difficulty === selectedDifficulty).forEach(deck => {
    const div = document.createElement('div');
    div.className = 'cpu-deck-option';
    div.style.position = 'relative';
    div.style.width = '140px';
    div.style.height = '140px';
    div.style.border = '3px solid ' + deck.color;
    div.style.borderRadius = '18px';
    div.style.background = '#232a3c';
    div.style.margin = '10px';
    div.style.display = 'inline-block';
    div.style.overflow = 'hidden';

    div.innerHTML = `
      <div style="position:relative;width:100%;height:100%;">
        <img src="${deck.image}" alt="${deck.name}" class="deck-art-img" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">
        <div class="deck-name"
          style="position:absolute;bottom:0;width:100%;background:rgba(10,12,20,0.84);color:${deck.color};letter-spacing:0.5px;padding:4px 0 4px 0;z-index:2;">
          ${deck.name}
        </div>
        <div class="deck-difficulty"
          style="position:absolute;top:1px;left:1px;z-index:3;">
          <span style="background:rgba(0,0,0,0.65);border-radius:50%;padding:3px 3px;">
            ${deck.difficulty}
          </span>
        </div>
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
        opponentDeck: deck,
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
        div.style.cursor = totalCards >= 50 ? 'pointer' : 'not-allowed';
        div.style.border = deck.id === activeId ? '3px solid #ffe066' : '2px solid #333';
        div.innerHTML = `
          <div style="position:relative; width:100%; height:140px;">
            ${image ? `<img src="${image}" alt="${deck.name}" class="deck-art-img" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">` : ''}
            <div class="deck-name"
              style="position:absolute;bottom:0;width:100%;background:rgba(10,12,20,0.84);color:#ffe066;font-weight:bold;text-align:center;letter-spacing:0.5px;padding:4px 0 4px 0;z-index:2;">
              ${deck.name}
            </div>
          </div>
        `;
        if (totalCards >= 50) {
          div.onclick = () => {
            window.selectedPlayerDeck = deck;
            if (typeof renderModePlayerDeckTile === "function") renderModePlayerDeckTile();
            modal.style.display = 'none';
          };
        } else {
          div.onclick = null;
        }
        playerList.appendChild(div);
      });
    }
  }

  // --- Render Default Decks ---
  function renderDefaultDecks() {
    defaultList.innerHTML = '';
    const defaultDecks = DEFAULT_CPU_DECKS;
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
        div.style.border = '3px solid ' + deck.color;
        div.style.borderRadius = '18px';
        div.style.display = 'inline-block';
        div.style.overflow = 'hidden';

div.innerHTML = `
  <div style="position:relative;width:100%;height:100%;">
    <img src="${deck.image}" alt="${deck.name}" class="deck-art-img" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">
    <div class="deck-name"
      style="position:absolute;bottom:0;width:100%;background:rgba(10,12,20,0.84);color:${deck.color};letter-spacing:0.5px;padding:4px 0 4px 0;z-index:2;">
      ${deck.name}
    </div>
  </div>
`;
div.onclick = () => {
window.selectedPlayerDeck = {
  ...deck,
  cardbackArt: decks[deckName].cardbackArt,
  highlightArt: deck.image,
  deckObj: {
    ...deck,
    cardbackArt: decks[deckName].cardbackArt,
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
    <img class="deck-slot-cardback-img" src="${deckObj.cardbackArt || "OtherImages/Cardbacks/DefaultCardback.png"}" alt="Cardback" style="position:absolute;right:8px;width:32px;height:44px;">
    <img id="deck-slot-view-icon" src="OtherImages/Icons/View.png" alt="View Deck" 
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
