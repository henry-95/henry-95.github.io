// Initialize BaguetteBox
document.addEventListener('DOMContentLoaded', function () {
    baguetteBox.run('.baguetteBox-gallery', {
        animation: 'fadeIn',
        noScrollbars: true
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');

    function toggleMenu() {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    }

    if (toggle && menu) {
        // Toggle on button click
        toggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            toggleMenu();
        });

        // Close when clicking a link inside the menu
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !toggle.contains(e.target) && !menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
            }
        });
    }
});
