// Fonction pour initialiser les événements de recherche et filtrage
document.addEventListener("DOMContentLoaded", function () {
  // Initialiser les filtres
  initializeFilters();
  // Charger tous les animes au démarrage
  const allAnimes = getDataFromLocalStorage();

  // Mettre à jour les animes courants et calculer le nombre total de pages
  currentAnimes = allAnimes;
  totalPages = Math.ceil(allAnimes.length / ITEMS_PER_PAGE);

  // Utiliser la pagination si nous sommes sur la page des animes
  if (window.location.pathname.includes("animes.html")) {
    // Initialiser la pagination avec la page 1
    currentPage = 1;
    displayPaginatedAnimes();

    // Mettre à jour le compteur d'animes
    const countElement = document.querySelector(".anime-count");
    if (countElement) {
      countElement.textContent = `${allAnimes.length} anime(s) trouvé(s)`;
    }
  } else {
    displayAnimes(allAnimes);
  }

  // Événements de filtrage
  const searchInput = document.querySelector(".search-box input");
  const genreSelect = document.getElementById("genre");
  const yearSelect = document.getElementById("year");
  const sortSelect = document.getElementById("sort");
  // Fonction pour appliquer tous les filtres
  function applyFilters() {
    const filters = {
      title: searchInput ? searchInput.value : "",
      genre: genreSelect ? genreSelect.value : "all",
      year: yearSelect ? yearSelect.value : "all",
      sortBy: sortSelect ? sortSelect.value : "title",
    };

    // Réinitialiser à la page 1 lors du filtrage
    currentPage = 1;
    const filteredAnimes = advancedSearch(filters);

    // Utiliser la pagination si nous sommes sur la page des animes
    if (window.location.pathname.includes("animes.html")) {
      displayPaginatedAnimes();
    } else {
      displayAnimes(filteredAnimes);
    }

    // Mise à jour du nombre d'animes trouvés
    const countElement = document.querySelector(".anime-count");
    if (countElement) {
      countElement.textContent = `${filteredAnimes.length} anime(s) trouvé(s)`;
    }
  }

  // Recherche en temps réel
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(function () {
        applyFilters();
      }, 300)
    );
  }

  // Changement des filtres select
  if (genreSelect) {
    genreSelect.addEventListener("change", applyFilters);
  }

  if (yearSelect) {
    yearSelect.addEventListener("change", applyFilters);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters);
  }

  // Bouton de recherche
  const searchButton = document.querySelector(".search-box button");
  if (searchButton) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      applyFilters();
    });
  }
});

// Fonction utilitaire pour limiter le nombre d'exécutions (debounce)
function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
