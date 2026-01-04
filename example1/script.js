document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Navbar scroll effect
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-brand-dark/95', 'shadow-md');
            navbar.classList.remove('glass-nav');
        } else {
            navbar.classList.add('glass-nav');
            navbar.classList.remove('bg-brand-dark/95', 'shadow-md');
        }
    }

    window.addEventListener('scroll', updateNavbar);
    // Initial check
    updateNavbar();

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        // Add a slide animation class if we wanted, but hidden toggle is fine for now
        // Simple fade in using tailwind classes if we wanted logic here, 
        // but simplest is just class toggle.
    });

    // Close mobile menu on click outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in classes to sections we want to animate
    document.querySelectorAll('section > div').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });
});
