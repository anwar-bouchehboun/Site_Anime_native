// Données des animes
const animeData = [
  {
    id: 1,
    title: "One Piece",
    genre: ["Action", "Aventure", "Comédie", "Fantasy"],
    year: 1999,
    episodes: 1000,
    rating: 9.5,
    studio: "Toei Animation",
    synopsis:
      "Monkey D. Luffy rêve de retrouver le trésor légendaire et de devenir le Roi des Pirates.",
    image: "image/anime-one_piece-monkey_d_luffy-365906.jpeg",
  },
  {
    id: 2,
    title: "Demon Slayer",
    genre: ["Action", "Fantasy", "Historique", "Surnaturel"],
    year: 2019,
    episodes: 44,
    rating: 8.9,
    studio: "ufotable",
    synopsis:
      "Tanjiro Kamado devient un chasseur de démons après que sa famille a été massacrée et sa sœur transformée en démon.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 3,
    title: "Attack on Titan",
    genre: ["Action", "Drame", "Fantasy", "Horreur"],
    year: 2013,
    episodes: 87,
    rating: 9.2,
    studio: "MAPPA",
    synopsis:
      "Dans un monde où l'humanité doit se protéger des Titans, Eren Yeager jure de se venger après une tragédie personnelle.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 4,
    title: "My Hero Academia",
    genre: ["Action", "Comédie", "Super-héros"],
    year: 2016,
    episodes: 113,
    rating: 8.4,
    studio: "Bones",
    synopsis:
      "Dans un monde où 80% de la population possède des super-pouvoirs, Izuku Midoriya, né sans don, tente de devenir un héros.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 5,
    title: "Naruto",
    genre: ["Action", "Aventure", "Arts martiaux"],
    year: 2002,
    episodes: 720,
    rating: 8.3,
    studio: "Pierrot",
    synopsis:
      "Naruto Uzumaki, un jeune ninja hyperactif, cherche à gagner la reconnaissance de ses pairs et rêve de devenir le Hokage de son village.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 6,
    title: "Jujutsu Kaisen",
    genre: ["Action", "Surnaturel", "École", "Horreur"],
    year: 2020,
    episodes: 24,
    rating: 8.7,
    studio: "MAPPA",
    synopsis:
      "Yuji Itadori, un lycéen doté d'une force surhumaine, rejoint une organisation secrète de sorciers pour exterminer des fléaux.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 7,
    title: "Violet Evergarden",
    genre: ["Drame", "Fantasy", "Tranche de vie"],
    year: 2018,
    episodes: 13,
    rating: 8.9,
    studio: "Kyoto Animation",
    synopsis:
      "Une ancienne soldate tente de comprendre le dernier message de son mentor et découvre le sens des émotions en devenant écrivaine.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 8,
    title: "Death Note",
    genre: ["Thriller", "Suspense", "Psychologique", "Surnaturel"],
    year: 2006,
    episodes: 37,
    rating: 9.0,
    studio: "Madhouse",
    synopsis:
      "Light Yagami trouve un mystérieux carnet qui lui donne le pouvoir de tuer quiconque dont il connaît le nom et le visage.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 9,
    title: "Fullmetal Alchemist: Brotherhood",
    genre: ["Action", "Aventure", "Drame", "Fantasy"],
    year: 2009,
    episodes: 64,
    rating: 9.1,
    studio: "Bones",
    synopsis:
      "Deux frères pratiquent l'alchimie en quête de la pierre philosophale pour récupérer leurs corps après une tentative ratée de ramener leur mère à la vie.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 10,
    title: "Hunter x Hunter",
    genre: ["Action", "Aventure", "Fantasy"],
    year: 2011,
    episodes: 148,
    rating: 9.0,
    studio: "Madhouse",
    synopsis:
      "Gon Freecss part à la recherche de son père et passe l'examen difficile pour devenir un Hunter officiel.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 11,
    title: "Spy x Family",
    genre: ["Action", "Comédie", "Espionnage"],
    year: 2022,
    episodes: 25,
    rating: 8.6,
    studio: "Wit Studio & CloverWorks",
    synopsis:
      "Un espion, une tueuse à gages et une télépathe forment une famille pour accomplir une mission, sans connaître la véritable identité des autres.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
  {
    id: 12,
    title: "Tokyo Ghoul",
    genre: ["Action", "Drame", "Horreur", "Surnaturel"],
    year: 2014,
    episodes: 48,
    rating: 7.9,
    studio: "Pierrot",
    synopsis:
      "Ken Kaneki, un étudiant ordinaire, devient mi-humain mi-goule après une rencontre fatidique, et doit apprendre à s'adapter à sa nouvelle vie.",
    image: "image/anime-one_piece-monkey_d_luffy-391517.jpeg",
  },
];

// Genres uniques pour les filtres
const uniqueGenres = [
  ...new Set(animeData.flatMap((anime) => anime.genre)),
].sort();

// Années uniques pour les filtres
const uniqueYears = [...new Set(animeData.map((anime) => anime.year))].sort(
  (a, b) => b - a
);

// Configuration de la pagination
const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let totalPages = 1;
let currentAnimes = [];

// Fonction pour sauvegarder les données dans localStorage
function saveDataToLocalStorage() {
  localStorage.setItem("animeCollection", JSON.stringify(animeData));
  console.log("Données sauvegardées dans le localStorage");
}

// Fonction pour récupérer les données du localStorage
function getDataFromLocalStorage() {
  const data = localStorage.getItem("animeCollection");
  return data ? JSON.parse(data) : [];
}

// Initialisation: sauvegarde des données si le localStorage est vide
if (!localStorage.getItem("animeCollection")) {
  saveDataToLocalStorage();
}

// Fonction de recherche par titre
function searchByTitle(query) {
  const animes = getDataFromLocalStorage();
  if (!query || query.trim() === "") {
    return animes;
  }

  const searchQuery = query.toLowerCase().trim();
  return animes.filter((anime) =>
    anime.title.toLowerCase().includes(searchQuery)
  );
}

// Fonction de filtrage par genre
function filterByGenre(genre) {
  const animes = getDataFromLocalStorage();

  if (!genre || genre === "all") {
    return animes;
  }

  return animes.filter((anime) => anime.genre.includes(genre));
}

// Fonction de filtrage par année
function filterByYear(year) {
  const animes = getDataFromLocalStorage();

  if (!year || year === "all") {
    return animes;
  }

  return animes.filter((anime) => anime.year === parseInt(year));
}

// Fonction de tri des animes
function sortAnimes(animes, sortBy = "title") {
  const sortedAnimes = [...animes];

  switch (sortBy) {
    case "title":
      return sortedAnimes.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sortedAnimes.sort((a, b) => b.title.localeCompare(a.title));
    case "year":
      return sortedAnimes.sort((a, b) => a.year - b.year);
    case "year-desc":
      return sortedAnimes.sort((a, b) => b.year - a.year);
    case "rating":
      return sortedAnimes.sort((a, b) => a.rating - b.rating);
    case "rating-desc":
      return sortedAnimes.sort((a, b) => b.rating - a.rating);
    default:
      return sortedAnimes;
  }
}

// Fonction de recherche avancée combinant plusieurs filtres
function advancedSearch(filters = {}) {
  let animes = getDataFromLocalStorage();

  // Filtrer par titre si spécifié
  if (filters.title) {
    const searchQuery = filters.title.toLowerCase().trim();
    animes = animes.filter((anime) =>
      anime.title.toLowerCase().includes(searchQuery)
    );
  }

  // Filtrer par genre si spécifié
  if (filters.genre && filters.genre !== "all") {
    animes = animes.filter((anime) => anime.genre.includes(filters.genre));
  }

  // Filtrer par année si spécifiée
  if (filters.year && filters.year !== "all") {
    animes = animes.filter((anime) => anime.year === parseInt(filters.year));
  }

  // Trier les résultats si spécifié
  if (filters.sortBy) {
    animes = sortAnimes(animes, filters.sortBy);
  }

  // Mettre à jour les animes courants et le nombre total de pages
  currentAnimes = animes;
  totalPages = Math.ceil(animes.length / ITEMS_PER_PAGE);

  // Si le numéro de page actuel est supérieur au nombre total de pages, revenir à la page 1
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = 1;
  }

  return animes;
}

// Fonction pour obtenir les animes de la page actuelle
function getCurrentPageAnimes() {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return currentAnimes.slice(startIndex, endIndex);
}

// Fonction pour changer de page
function changePage(pageNumber) {
  if (pageNumber < 1 || pageNumber > totalPages) {
    return false;
  }

  currentPage = pageNumber;
  return true;
}

// Fonction pour générer les boutons de pagination
function generatePagination(container) {
  if (!container) return;

  container.innerHTML = "";

  if (totalPages <= 1) {
    return;
  }

  // Création des liens de pagination
  // Bouton précédent
  if (currentPage > 1) {
    const prevBtn = document.createElement("a");
    prevBtn.href = "#";
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (changePage(currentPage - 1)) {
        displayPaginatedAnimes();
      }
    });
    container.appendChild(prevBtn);
  }

  // Pages numérotées
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Ajuster la page de départ si nécessaire
  startPage = Math.max(1, endPage - maxVisiblePages + 1);

  for (let i = startPage; i <= endPage; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;

    if (i === currentPage) {
      pageLink.classList.add("active");
    }

    pageLink.addEventListener("click", function (e) {
      e.preventDefault();
      if (changePage(i)) {
        displayPaginatedAnimes();
      }
    });

    container.appendChild(pageLink);
  }

  // Bouton suivant
  if (currentPage < totalPages) {
    const nextBtn = document.createElement("a");
    nextBtn.href = "#";
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (changePage(currentPage + 1)) {
        displayPaginatedAnimes();
      }
    });
    container.appendChild(nextBtn);
  }
}

// Fonction pour afficher les animes avec pagination
function displayPaginatedAnimes() {
  // Afficher les animes de la page actuelle
  displayAnimes(getCurrentPageAnimes());

  // Mettre à jour la pagination
  const paginationContainer = document.querySelector(".pagination");
  if (paginationContainer) {
    generatePagination(paginationContainer);
  }

  // Log pour débogage
  console.log(
    `Page: ${currentPage}/${totalPages}, ${ITEMS_PER_PAGE} animes par page, ${currentAnimes.length} au total`
  );
}

// Fonction pour afficher les animes dans le HTML
function displayAnimes(animes, containerSelector = ".anime-grid") {
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.error(`Conteneur ${containerSelector} non trouvé`);
    return;
  }

  container.innerHTML = "";

  if (animes.length === 0) {
    container.innerHTML = '<div class="no-results">Aucun anime trouvé</div>';
    return;
  }

  animes.forEach((anime) => {
    const animeCard = document.createElement("article");
    animeCard.className = "anime-card";

    animeCard.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}" class="anime-card-img">
      <div class="anime-card-content">
        <h3>${anime.title} <span class="anime-year">(${anime.year})</span></h3>
        <div class="anime-info">
          <div class="anime-rating">
            <i class="fas fa-star"></i> ${anime.rating.toFixed(1)}
          </div>
          <div class="anime-episodes">
            <i class="fas fa-film"></i> ${anime.episodes} épisodes
          </div>
        </div>
        <div class="anime-genres">
          ${anime.genre
            .map((g) => `<span class="genre-tag">${g}</span>`)
            .join("")}
        </div>
        <p class="anime-synopsis">${anime.synopsis}</p>
        <a href="#" class="btn-details">Voir détails</a>
      </div>
    `;

    container.appendChild(animeCard);
  });
}

// Fonction pour initialiser les filtres dans l'interface
function initializeFilters() {
  const genreSelect = document.getElementById("genre");
  const yearSelect = document.getElementById("year");
  const sortSelect = document.getElementById("sort");

  if (genreSelect) {
    genreSelect.innerHTML = '<option value="all">Tous les genres</option>';
    uniqueGenres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre;
      option.textContent = genre;
      genreSelect.appendChild(option);
    });
  }

  if (yearSelect) {
    yearSelect.innerHTML = '<option value="all">Toutes les années</option>';
    uniqueYears.forEach((year) => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    });
  }

  if (sortSelect) {
    sortSelect.innerHTML = `
      <option value="title">Titre (A-Z)</option>
      <option value="title-desc">Titre (Z-A)</option>
      <option value="year">Année (Ancien-Récent)</option>
      <option value="year-desc">Année (Récent-Ancien)</option>
      <option value="rating">Note (Croissant)</option>
      <option value="rating-desc">Note (Décroissant)</option>
    `;
  }
}
