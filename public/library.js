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

  // Update progress display
  updateLibraryProgress(filteredCards);

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

function updateLibraryProgress(filteredCards) {
  const favoriteIds = getFavoriteCards();
  const favoritedCount = filteredCards.filter(card => favoriteIds.includes(card.id)).length;
  const total = filteredCards.length;

  // Gather all modal-applied filters
  const selectedFilters = getSelectedFiltersFromModal();
  let filterInfoArray = Object.entries(selectedFilters || {})
    .filter(([key, values]) => values && values.length > 0)
    .flatMap(([key, values]) => values);

  // Add the name filter if provided
  const nameFilter = libraryNameFilter ? libraryNameFilter.value.toLowerCase() : "";
  if (nameFilter) {
    filterInfoArray.push(nameFilter);
  }

  // Combine filter info
  const filterInfo = filterInfoArray.length ? filterInfoArray.join(' ') : '';

  let str = '';
  if (total === 0) {
    str = filterInfo
      ? `No cards match the selected filters: <b>${filterInfo}</b>`
      : 'No cards match the selected filters.';
  } else if (showFavoritesOnlyLibrary) {
    str = `Favorites <b>${favoritedCount}</b>`;
    if (filterInfo) str += ` (${filterInfo})`;
  } else {
    str = `Showing <b>${total}</b> cards`;
    if (filterInfo) str += ` (${filterInfo})`;
  }

  const progDiv = document.getElementById('library-progress');
  if (progDiv) progDiv.innerHTML = str;
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
  if (window._libraryMenuOutsideHandler) {
    document.body.removeEventListener('mousedown', window._libraryMenuOutsideHandler);
    window._libraryMenuOutsideHandler = null;
  }
  
  // Add new outside click handler
  window._libraryMenuOutsideHandler = function(e) {
    if (!menu.contains(e.target)) {
      menu.style.display = "none";
      menu._activeCard = null;
      document.body.removeEventListener('mousedown', window._libraryMenuOutsideHandler);
      window._libraryMenuOutsideHandler = null;
    }
  };
  
  setTimeout(() => {
    document.body.addEventListener('mousedown', window._libraryMenuOutsideHandler);
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
