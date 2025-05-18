// Fichier: c:\Users\Pc\Desktop\anime\mon-projet-web\js\news-display.js
// Fichier de gestion de l'affichage des actualités
document.addEventListener("DOMContentLoaded", function () {
  // Vérifier si nous sommes sur la page des actualités
  const isNewsPage = window.location.pathname.includes("actualites.html");

  if (isNewsPage) {
    console.log("=== Page des Actualités ===");

    // Initialiser les filtres pour les actualités
    initializeNewsFilters();

    // Effectuer une recherche et affichage initial
    const initialNews = advancedNewsSearch();

    // Afficher l'actualité à la une
    displayFeaturedNews();

    // Afficher les actualités paginées
    displayPaginatedNews();

    // Configurer les écouteurs d'événements pour les filtres
    setupNewsFilters();

    // Afficher les informations de débogage pour la pagination
    console.log(`Nombre total d'actualités: ${currentNewsItems.length}`);
    console.log(`Actualités par page: ${NEWS_ITEMS_PER_PAGE}`);
    console.log(`Nombre total de pages: ${totalNewsPages}`);
    console.log(`Page actuelle: ${currentNewsPage}`);

    // Créer un tableau qui affiche toutes les données d'actualités en format tableau
    console.table(newsData, ["id", "title", "category", "date", "author"]);

    // Afficher les détails des actualités sur la page actuelle
    console.log("Actualités affichées sur la page actuelle:");
    const currentPageNews = getCurrentPageNews();
    currentPageNews.forEach((news) => {
      console.log(
        `- ${news.title} | ${news.category} | ${news.date} | Par ${news.author}`
      );
    });
  }

  // Ajouter un événement pour afficher les détails d'une actualité
  document.addEventListener("click", function (e) {
    // Vérifier si l'élément cliqué est un lien "Lire la suite"
    if (
      e.target.classList.contains("read-more-link") ||
      e.target.classList.contains("read-more-btn") ||
      e.target.parentElement.classList.contains("read-more-link")
    ) {
      e.preventDefault();

      // Obtenir l'élément parent qui contient l'attribut data-id
      let element = e.target;

      while (element && !element.getAttribute("data-id")) {
        element = element.parentElement;
        if (!element) break;
      }

      if (!element) return;

      // Récupérer l'ID de l'actualité
      const newsId = parseInt(element.getAttribute("data-id"));

      // Trouver l'actualité correspondante
      const news = newsData.find((item) => item.id === newsId);

      if (!news) return;

      // Afficher les détails dans une modale
      showNewsDetails(news);
    }
  });
});

// Fonction pour configurer les filtres des actualités
function setupNewsFilters() {
  const searchForm = document.getElementById("news-search-form");
  const categorySelect = document.getElementById("news-category");
  const sortSelect = document.getElementById("news-sort");

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const searchInput = document.getElementById("news-search");

      // Préparer les filtres
      const filters = {};

      // Ajouter le terme de recherche si présent
      if (searchInput && searchInput.value.trim() !== "") {
        filters.title = searchInput.value;
      }

      // Ajouter la catégorie si sélectionnée
      if (categorySelect && categorySelect.value !== "all") {
        filters.category = categorySelect.value;
      }

      // Ajouter le tri si sélectionné
      if (sortSelect) {
        filters.sortBy = sortSelect.value;
      }

      // Effectuer la recherche
      advancedNewsSearch(filters);

      // Réinitialiser la page courante et afficher les résultats
      currentNewsPage = 1;
      displayPaginatedNews();
    });
  }

  // Écouter les changements de catégorie
  if (categorySelect) {
    categorySelect.addEventListener("change", function () {
      const searchInput = document.getElementById("news-search");
      const filters = {
        category: categorySelect.value,
        sortBy: sortSelect ? sortSelect.value : "date",
      };

      if (searchInput && searchInput.value.trim() !== "") {
        filters.title = searchInput.value;
      }

      advancedNewsSearch(filters);
      currentNewsPage = 1;
      displayPaginatedNews();
    });
  }

  // Écouter les changements de tri
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const searchInput = document.getElementById("news-search");
      const filters = {
        sortBy: sortSelect.value,
        category: categorySelect ? categorySelect.value : "all",
      };

      if (searchInput && searchInput.value.trim() !== "") {
        filters.title = searchInput.value;
      }

      advancedNewsSearch(filters);
      displayPaginatedNews();
    });
  }
}

// Fonction pour afficher les détails d'une actualité
function showNewsDetails(news) {
  // Créer un élément modal
  const modal = document.createElement("div");
  modal.className = "news-modal";

  // Contenu du modal
  modal.innerHTML = `
    <div class="news-modal-content">
      <span class="news-modal-close">&times;</span>
      <div class="news-modal-header">
        <img src="${news.image}" alt="${news.title}" class="news-modal-img">
        <div class="news-modal-header-info">
          <div class="news-modal-category">
            <span class="news-tag">${news.category}</span>
          </div>
          <h2>${news.title}</h2>
          <div class="news-modal-meta">
            <span><i class="far fa-calendar"></i> ${news.date}</span>
            <span><i class="far fa-user"></i> Par ${news.author}</span>
            <span><i class="far fa-comment"></i> ${news.comments} commentaires</span>
          </div>
        </div>
      </div>
      <div class="news-modal-body">
        <p>${news.content}</p>
      </div>
      <div class="news-modal-footer">
        <div class="news-modal-share">
          <span>Partager :</span>
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-pinterest"></i></a>
        </div>
      </div>
    </div>
  `;

  // Ajouter le modal au body
  document.body.appendChild(modal);

  // Afficher le modal avec une animation
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);

  // Gérer la fermeture du modal
  const closeBtn = modal.querySelector(".news-modal-close");
  closeBtn.addEventListener("click", () => {
    closeNewsModal(modal);
  });

  // Fermer le modal en cliquant en dehors du contenu
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeNewsModal(modal);
    }
  });

  // Fermer le modal avec la touche Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.querySelector(".news-modal")) {
      closeNewsModal(modal);
    }
  });
}

// Fonction pour fermer le modal d'actualités
function closeNewsModal(modal) {
  modal.style.opacity = "0";
  setTimeout(() => {
    if (modal.parentNode) {
      document.body.removeChild(modal);
    }
  }, 300); // Attendre la fin de l'animation
}

// Fonction pour mettre à jour le statut de la pagination (pour le débogage)
function updateNewsPaginationStatus() {
  console.log(
    `Page d'actualités actuelle: ${currentNewsPage}/${totalNewsPages}`
  );
  console.log(`${NEWS_ITEMS_PER_PAGE} actualités par page`);
  console.log(`${currentNewsItems.length} actualités au total`);
}
