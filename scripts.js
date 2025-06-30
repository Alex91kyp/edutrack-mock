/**
 * Scripts globaux pour EduTrack AI
 * Maquette statique - interactions de base
 */

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('EduTrack AI - Maquette initialisée');
    
    // Initialiser les composants
    initializeComponents();
    
    // Simuler des notifications
    if (window.location.pathname.includes('dashboard.html')) {
        simulateNotifications();
    }
});

/**
 * Initialise les composants interactifs de base
 */
function initializeComponents() {
    // Menu mobile
    setupMobileMenu();
    
    // Tooltips
    setupTooltips();
    
    // Animations au scroll
    setupScrollAnimations();
    
    // Boutons interactifs
    setupInteractiveButtons();
}

/**
 * Configuration du menu mobile
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animation de l'icône
            const icon = mobileMenuBtn.querySelector('[data-feather]');
            if (icon) {
                const isMenuOpen = !mobileMenu.classList.contains('hidden');
                icon.setAttribute('data-feather', isMenuOpen ? 'x' : 'menu');
                feather.replace();
            }
        });
        
        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('[data-feather]');
                if (icon) {
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            }
        });
    }
}

/**
 * Configuration des tooltips
 */
function setupTooltips() {
    // Les tooltips sont gérés par CSS pour cette maquette
    // En production, on pourrait utiliser une bibliothèque comme Tippy.js
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Logique future pour les tooltips avancés
        });
    });
}

/**
 * Animations au scroll
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.feature-card, .stats-card, section > div');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Configuration des boutons interactifs
 */
function setupInteractiveButtons() {
    // Boutons avec effet de loading
    const buttons = document.querySelectorAll('.btn-loading');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('.html')) {
                e.preventDefault();
                showLoadingState(this);
                
                // Simuler un délai de chargement
                setTimeout(() => {
                    hideLoadingState(this);
                    showNotification('Fonctionnalité en développement', 'info');
                }, 1500);
            }
        });
    });
}

/**
 * Affiche l'état de chargement d'un bouton
 */
function showLoadingState(button) {
    const originalText = button.textContent;
    button.setAttribute('data-original-text', originalText);
    button.disabled = true;
    button.classList.add('opacity-75');
    
    // Ajouter spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2';
    button.insertBefore(spinner, button.firstChild);
    
    button.childNodes[1].textContent = ' Chargement...';
}

/**
 * Cache l'état de chargement d'un bouton
 */
function hideLoadingState(button) {
    const originalText = button.getAttribute('data-original-text');
    const spinner = button.querySelector('.loading-spinner');
    
    if (spinner) spinner.remove();
    if (originalText) button.textContent = originalText;
    
    button.disabled = false;
    button.classList.remove('opacity-75');
}

/**
 * Simule des notifications pour le dashboard
 */
function simulateNotifications() {
    setTimeout(() => {
        showNotification('Nouvelle copie analysée pour Lucas D.', 'success');
    }, 2000);
    
    setTimeout(() => {
        showNotification('Rapport parent généré pour Sarah M.', 'info');
    }, 4000);
}

/**
 * Affiche une notification
 */
function showNotification(message, type = 'info') {
    const notification = createNotificationElement(message, type);
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

/**
 * Crée un élément de notification
 */
function createNotificationElement(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 max-w-sm bg-white border-l-4 p-4 shadow-lg rounded-lg transform translate-x-full transition-transform duration-300 ${getNotificationStyles(type)}`;
    
    notification.innerHTML = `
        <div class="flex">
            <div class="flex-shrink-0">
                ${getNotificationIcon(type)}
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-gray-800">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button class="text-gray-400 hover:text-gray-600" onclick="removeNotification(this.closest('.fixed'))">
                    <i data-feather="x" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `;
    
    // Rendre les icônes Feather
    setTimeout(() => feather.replace(), 0);
    
    return notification;
}

/**
 * Obtient les styles pour un type de notification
 */
function getNotificationStyles(type) {
    const styles = {
        success: 'border-green-500 bg-green-50',
        warning: 'border-yellow-500 bg-yellow-50',
        error: 'border-red-500 bg-red-50',
        info: 'border-blue-500 bg-blue-50'
    };
    return styles[type] || styles.info;
}

/**
 * Obtient l'icône pour un type de notification
 */
function getNotificationIcon(type) {
    const icons = {
        success: '<i data-feather="check-circle" class="w-5 h-5 text-green-600"></i>',
        warning: '<i data-feather="alert-triangle" class="w-5 h-5 text-yellow-600"></i>',
        error: '<i data-feather="x-circle" class="w-5 h-5 text-red-600"></i>',
        info: '<i data-feather="info" class="w-5 h-5 text-blue-600"></i>'
    };
    return icons[type] || icons.info;
}

/**
 * Supprime une notification
 */
function removeNotification(notification) {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/**
 * Simule le téléchargement d'un fichier
 */
function simulateUpload(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;
    
    showNotification('Upload en cours...', 'info');
    
    // Simuler le traitement
    setTimeout(() => {
        showNotification('Fichier uploadé avec succès!', 'success');
        // Rediriger vers la page de rapport
        setTimeout(() => {
            window.location.href = 'rapport.html';
        }, 1000);
    }, 2000);
}

/**
 * Simule la génération d'un rapport
 */
function generateReport(studentId) {
    showNotification('Génération du rapport en cours...', 'info');
    
    setTimeout(() => {
        showNotification('Rapport généré avec succès!', 'success');
    }, 3000);
}

/**
 * Simule la génération d'exercices
 */
function generateExercises(weaknesses) {
    showNotification('Génération des exercices personnalisés...', 'info');
    
    setTimeout(() => {
        showNotification('Exercices générés et prêts!', 'success');
    }, 2500);
}

/**
 * Utilitaires pour les graphiques (utilisation future avec Chart.js)
 */
const ChartUtils = {
    colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#06b6d4'
    },
    
    createGradient: function(ctx, colorStart, colorEnd) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    }
};

// Exposer les fonctions globalement pour les pages individuelles
window.EduTrackAI = {
    showNotification,
    simulateUpload,
    generateReport,
    generateExercises,
    ChartUtils
}; 