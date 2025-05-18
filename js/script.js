document.addEventListener('DOMContentLoaded', () => {
    // Animation pour le header lors du défilement
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Configuration du diaporama
    const slideshow = document.querySelector('.slideshow');
    if (slideshow) {
        const slides = document.querySelectorAll('.slide');
        const navBtns = document.querySelectorAll('.slide-nav-btn');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        let currentSlide = 0;
        let slideInterval;

        // Fonction pour afficher un slide spécifique
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            navBtns.forEach(btn => btn.classList.remove('active'));
            
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            navBtns[currentSlide].classList.add('active');
        }

        // Navigation par les flèches
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(currentSlide - 1);
                startSlideInterval();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(currentSlide + 1);
                startSlideInterval();
            });
        }

        // Navigation par les points
        navBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startSlideInterval();
            });
        });

        // Démarrage du diaporama automatique
        function startSlideInterval() {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000); // Change slide every 5 seconds
        }

        // Initialisation du diaporama
        showSlide(0);
        startSlideInterval();
    }

    // Animation lors du scroll pour les éléments
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Pour animer les éléments visibles au chargement initial

    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            menuToggle.classList.toggle('active');
        });
    }

    // Gestion de la FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            // Initialiser la hauteur à 0
            answer.style.height = "0px";
            
            question.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
                
                // Afficher/masquer la réponse
                if (item.classList.contains('active')) {
                    answer.style.height = answer.scrollHeight + "px";
                } else {
                    answer.style.height = "0px";
                }
                
                // Fermer les autres questions
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.height = "0px";
                    }
                });
            });
        });
    }
});