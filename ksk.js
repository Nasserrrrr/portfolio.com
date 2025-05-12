document.addEventListener('DOMContentLoaded', () => {
    // Utility: Debounce function to limit event frequency
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Mobile Navigation
    const initMobileNav = () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
                const isExpanded = hamburger.classList.contains('active');
                hamburger.setAttribute('aria-expanded', isExpanded);
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }
    };

    // Sticky Navigation and Back to Top
    const initStickyNav = () => {
        const navbar = document.getElementById('navbar');
        const backToTop = document.querySelector('.back-to-top');

        if (navbar && backToTop) {
            const handleScroll = debounce(() => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            }, 10);

            window.addEventListener('scroll', handleScroll);
        }
    };

    // Smooth Scrolling
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Form Submission
    const initForm = () => {
        const contactForm = document.querySelector('.contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            });
        }
    };

    // Animation on Scroll
    const initAnimations = () => {
        const animateElements = document.querySelectorAll('.animate-text');

        const checkVisibility = () => {
            const windowHeight = window.innerHeight;
            animateElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };

        checkVisibility();
        window.addEventListener('scroll', debounce(checkVisibility, 10));
    };

    // Theme Switch
    const initThemeSwitch = () => {
        const checkbox = document.getElementById('checkbox');
        const toggleIcon = document.getElementById('toggle-icon');

        if (checkbox && toggleIcon) {
            // Load saved or system theme
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.body.classList.add('dark-mode');
                checkbox.checked = true;
                toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
            }

            checkbox.addEventListener('change', () => {
                document.body.classList.toggle('dark-mode');
                const isDarkMode = document.body.classList.contains('dark-mode');
                toggleIcon.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            });
        }
    };

    // Initialize all functionalities
    initMobileNav();
    initStickyNav();
    initSmoothScroll();
    initForm();
    initAnimations();
    initThemeSwitch();
});