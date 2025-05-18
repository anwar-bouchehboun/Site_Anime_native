// Fichier de gestion de l'affichage des données
document.addEventListener("DOMContentLoaded", function () {
  // Vérifier si nous sommes sur la page des animes
  const isAnimesPage = window.location.pathname.includes("animes.html");

  // Afficher les informations de débogage pour la pagination
  if (isAnimesPage) {
    console.log("=== Page des Animes ===");
    console.log(`Nombre total d'animes: ${currentAnimes.length}`);
    console.log(`Animes par page: ${ITEMS_PER_PAGE}`);
    console.log(`Nombre total de pages: ${totalPages}`);
    console.log(`Page actuelle: ${currentPage}`);

    // Créer un tableau qui affiche toutes les données anime en format tableau
    console.table(animeData, ["id", "title", "year", "rating", "episodes"]);

    // Afficher les détails des animes sur la page actuelle
    console.log("Animes affichés sur la page actuelle:");
    const currentPageAnimes = getCurrentPageAnimes();
    currentPageAnimes.forEach((anime) => {
      console.log(
        `- ${anime.title} (${anime.year}) | ★ ${anime.rating} | ${anime.episodes} épisodes`
      );
    });
  }

  // Ajouter un événement pour afficher les détails d'un anime
  document.addEventListener("click", function (e) {
    // Vérifier si l'élément cliqué est un bouton "Voir détails"
    if (e.target.classList.contains("btn-details")) {
      e.preventDefault();

      // Trouver l'anime card parent
      const animeCard = e.target.closest(".anime-card");
      if (!animeCard) return;

      // Récupérer le titre de l'anime
      const animeTitle = animeCard
        .querySelector("h3")
        .textContent.split(" (")[0];

      // Trouver l'anime correspondant
      const anime = animeData.find((a) => a.title === animeTitle);
      if (!anime) return;

      // Afficher les détails dans une modal ou une alerte
      showAnimeDetails(anime);
    }
  });
});

// Fonction pour afficher les détails d'un anime
function showAnimeDetails(anime) {
  // Créer un élément modal
  const modal = document.createElement("div");
  modal.className = "anime-modal";

  // Contenu du modal
  modal.innerHTML = `
    <div class="anime-modal-content">
      <span class="anime-modal-close">&times;</span>
      <div class="anime-modal-header">
        <img src="${anime.image}" alt="${anime.title}" class="anime-modal-img">
        <div class="anime-modal-header-info">
          <h2>${anime.title}</h2>
          <div class="anime-modal-meta">
            <span><i class="fas fa-star"></i> ${anime.rating.toFixed(1)}</span>
            <span><i class="fas fa-calendar"></i> ${anime.year}</span>
            <span><i class="fas fa-film"></i> ${anime.episodes} épisodes</span>
          </div>
          <div class="anime-modal-studio">
            <span><i class="fas fa-video"></i> ${anime.studio}</span>
          </div>
          <div class="anime-modal-genres">
            ${anime.genre
              .map((g) => `<span class="genre-tag">${g}</span>`)
              .join("")}
          </div>
        </div>
      </div>
      <div class="anime-modal-body">
        <h3>Synopsis</h3>
        <p>${anime.synopsis}</p>
      </div>
    </div>
  `;

  // Ajouter le modal au body
  document.body.appendChild(modal);

  // Afficher le modal
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);

  // Gérer la fermeture du modal
  const closeBtn = modal.querySelector(".anime-modal-close");
  closeBtn.addEventListener("click", () => {
    modal.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  });

  // Fermer également en cliquant en dehors du contenu
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    }
  });
}

// Fonction pour mettre à jour visuellement la pagination
function updatePaginationStatus() {
  // Afficher le nombre total d'animes et la pagination active
  const countElement = document.querySelector(".anime-count");
  if (countElement) {
    countElement.textContent = `${currentAnimes.length} anime(s) trouvé(s) - Page ${currentPage}/${totalPages}`;
  }

  // Mettre en évidence la page active
  const paginationLinks = document.querySelectorAll(".pagination a");
  paginationLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.textContent == currentPage) {
      link.classList.add("active");
    }
  });
}

// Remplacer la fonction displayPaginatedAnimes pour inclure l'état de pagination
const originalDisplayPaginatedAnimes = displayPaginatedAnimes;
displayPaginatedAnimes = function () {
  originalDisplayPaginatedAnimes();
  updatePaginationStatus();
};
