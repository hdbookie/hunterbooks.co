/* ===========================
   Main JavaScript
   =========================== */

// Initialize everything when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });
    
    closeMobileMenu.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const bgAnimation = document.querySelector('.bg-animation');
        if (bgAnimation) {
            bgAnimation.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Initialize on page load
window.addEventListener('load', () => {
    // Hide loading screen after a short delay
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
        }
    }, 1500);
    
    // Initialize all modules
    if (typeof initializeLanguage !== 'undefined') initializeLanguage();
    if (typeof createParticles !== 'undefined') createParticles();
    if (typeof createCursorTrail !== 'undefined') createCursorTrail();
    if (typeof typeTerminal !== 'undefined') typeTerminal();
    if (typeof fetchGitHubActivity !== 'undefined') fetchGitHubActivity();
    
    console.log('Portfolio loaded successfully!');
});