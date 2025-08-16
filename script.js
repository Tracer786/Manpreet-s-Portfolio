document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#2563eb"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#2563eb",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Update mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    // Ensure menu is closed on page load
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    body.classList.remove('no-scroll');

    function toggleMenu(e) {
        if (e) e.stopPropagation();
        const isOpen = navMenu.classList.contains('active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
        body.classList.add('no-scroll');
        // Add animation class
        navMenu.style.transition = 'transform 0.3s ease-in-out';
    }

    function closeMenu() {
        navMenu.style.transition = 'transform 0.3s ease-in-out';
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    // Event Listeners
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Close menu on resize if screen becomes larger than mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Tab functionality
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all tabs and panes
            tabLinks.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });

            // Add active class to current tab and pane
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }

        // Add shadow to header when scrolling
        const header = document.querySelector('.header');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to top functionality
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Experience section hover effect
    document.querySelectorAll('.timeline-header').forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('expanded');
        });
    });

    // Project scroll functionality
    const projectsScroll = document.querySelector('.projects-scroll');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (projectsScroll && leftArrow && rightArrow) {
        // Responsive: On mobile, scroll exactly one project at a time
        function getCardWidth() {
            if (window.innerWidth <= 767) {
                // On mobile, project-card is 100% width of scroll container
                return projectsScroll.offsetWidth;
            } else {
                // Desktop/tablet: use card width + gap
                const card = projectsScroll.querySelector('.project-card');
                if (!card) return 0;
                const gap = parseInt(getComputedStyle(projectsScroll).gap) || 0;
                return card.offsetWidth + gap;
            }
        }

        const updateArrows = () => {
            const cardWidth = getCardWidth();
            const maxScroll = projectsScroll.scrollWidth - projectsScroll.clientWidth;
            leftArrow.disabled = projectsScroll.scrollLeft <= 0;
            rightArrow.disabled = projectsScroll.scrollLeft >= maxScroll - 10;
        };

        leftArrow.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            // Snap to previous project
            projectsScroll.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            // Snap to next project
            projectsScroll.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });

        projectsScroll.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        updateArrows(); // Initial check
    }

    // Experience horizontal scroll for mobile (like projects)
    const experienceTimeline = document.querySelector('.experience-timeline');
    const expLeftArrow = document.querySelector('.experience-scroll-arrow.left');
    const expRightArrow = document.querySelector('.experience-scroll-arrow.right');

    function getExperienceCardWidth() {
        if (!experienceTimeline) return 0;
        if (window.innerWidth <= 767) {
            return experienceTimeline.offsetWidth;
        } else {
            return 0;
        }
    }

    function updateExperienceArrows() {
        if (!experienceTimeline || !expLeftArrow || !expRightArrow) return;
        // Only enable arrows on mobile
        if (window.innerWidth > 767) {
            expLeftArrow.style.display = "none";
            expRightArrow.style.display = "none";
            return;
        } else {
            expLeftArrow.style.display = "flex";
            expRightArrow.style.display = "flex";
        }
        const cardWidth = getExperienceCardWidth();
        const maxScroll = experienceTimeline.scrollWidth - experienceTimeline.clientWidth;
        expLeftArrow.disabled = experienceTimeline.scrollLeft <= 0;
        expRightArrow.disabled = experienceTimeline.scrollLeft >= maxScroll - 10;
    }

    if (experienceTimeline && expLeftArrow && expRightArrow) {
        expLeftArrow.addEventListener('click', () => {
            const cardWidth = getExperienceCardWidth();
            experienceTimeline.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });
        expRightArrow.addEventListener('click', () => {
            const cardWidth = getExperienceCardWidth();
            experienceTimeline.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });
        experienceTimeline.addEventListener('scroll', updateExperienceArrows);
        window.addEventListener('resize', updateExperienceArrows);
        updateExperienceArrows();
    }

    // Animate stats counters when they come into view
    let statsAnimated = false;
    const stats = document.querySelectorAll('.stat-number');

    function animateStats() {
        if (statsAnimated) return;
        stats.forEach(stat => {
            stat.classList.add('animated');
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);

            let current = start;
            stat.textContent = '0';
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                // If there's a .plus sibling, keep it after the number
                if (stat.nextElementSibling && stat.nextElementSibling.classList.contains('plus')) {
                    stat.nextElementSibling.style.display = 'inline-block';
                }
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
        statsAnimated = true;
    }

    function resetStats() {
        stats.forEach(stat => {
            stat.textContent = '0';
            stat.classList.remove('animated');
            // Hide plus if present
            if (stat.nextElementSibling && stat.nextElementSibling.classList.contains('plus')) {
                stat.nextElementSibling.style.display = 'inline-block';
            }
        });
        statsAnimated = false;
    }

    // Intersection Observer for about and experience section
    const aboutSection = document.querySelector('.about');
    const experienceSection = document.querySelector('.experience');

    // --- FIX: Always animate stats on mobile, use observer only on desktop/tablet ---
    if (window.innerWidth <= 767) {
        // On mobile, animate stats immediately
        animateStats();
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
        // On iPad/tablet, animate stats immediately on page load
        animateStats();
    } else {
        // Observe about section for animating stats
        if (aboutSection) {
            new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                    }
                });
            }, { threshold: 0.5 }).observe(aboutSection);
        }
        // Observe experience section for resetting stats when it is NOT visible
        if (experienceSection) {
            new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        resetStats();
                    }
                });
            }, { threshold: 0.5 }).observe(experienceSection);
        }
    }

    // --- Navbar scroll functionality ---
    let lastScroll = 0;
    const header = document.querySelector('.header');
    let navTimeout = null;
    let inHeroSection = true; // Assume true on load
    let navHovered = false; // Track if mouse is over navbar

    // Helper to show/hide navbar
    function showNavbar() {
        header.classList.add('nav-scrolled');
        header.classList.remove('nav-hidden');
    }
    function hideNavbar() {
        header.classList.remove('nav-scrolled');
        header.classList.add('nav-hidden');
    }

    // Detect hero section height for scroll threshold
    const heroSection = document.getElementById('home') || document.querySelector('.hero');
    let heroHeight = 0;
    if (heroSection) {
        heroHeight = heroSection.offsetHeight;
    }

    // On load, set initial navbar state
    function updateNavbarOnLoad() {
        if (window.scrollY <= 10) {
            inHeroSection = true;
            showNavbar();
        } else {
            inHeroSection = false;
            hideNavbar();
        }
    }
    updateNavbarOnLoad();

    // --- Prevent navbar from hiding if hovered ---
    header.addEventListener('mouseenter', function() {
        navHovered = true;
        if (navTimeout) {
            clearTimeout(navTimeout);
            navTimeout = null;
        }
        showNavbar();
    });
    header.addEventListener('mouseleave', function() {
        navHovered = false;
        // If not in hero, start hide timer again
        if (!inHeroSection) {
            if (navTimeout) clearTimeout(navTimeout);
            navTimeout = setTimeout(() => {
                if (!inHeroSection && !navHovered) hideNavbar();
            }, 1000);
        }
    });

    window.addEventListener('scroll', function() {
        // Consider "in hero" only if at the very top (scrolled less than 10px)
        if (window.scrollY <= 10) {
            inHeroSection = true;
            showNavbar();
            if (navTimeout) {
                clearTimeout(navTimeout);
                navTimeout = null;
            }
            lastScroll = window.scrollY;
            return;
        } else {
            inHeroSection = false;
        }

        // Outside hero section
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            hideNavbar();
        } else if (currentScroll > lastScroll) {
            // Scrolling down
            hideNavbar();
        } else if (currentScroll < lastScroll) {
            // Scrolling up (even a little)
            showNavbar();
            // Hide after 1 second if not in hero and not hovered
            if (navTimeout) clearTimeout(navTimeout);
            navTimeout = setTimeout(() => {
                if (!inHeroSection && !navHovered) hideNavbar();
            }, 1000);
        }
        lastScroll = currentScroll;
    });

    // --- Animate elements when they come into view (including about stats) ---
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section, .project-card, .skill-card, .timeline-item, .stat-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements (including about stats)
    document.querySelectorAll('.section, .project-card, .skill-card, .timeline-item, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMail();
        });
    }

    // Add placeholder for form inputs for better UX
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        if (!input.id) return;

        const label = document.querySelector(`label[for="${input.id}"]`);
        if (!label) return;

        input.addEventListener('focus', () => {
            label.style.color = 'var(--primary-color)';
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.color = 'var(--text-light)';
            }
        });
    });

    function sendMail() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const mobile = document.getElementById('mobile');

        // Reset error states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        let isValid = true;

        // Name: required, no numbers, min 3, max 50 chars
        const nameVal = name.value.trim();
        if (
            nameVal === '' ||
            /\d/.test(nameVal) ||
            nameVal.length < 3 ||
            nameVal.length > 50
        ) {
            name.parentElement.classList.add('error');
            isValid = false;
        }

        // Email: required, valid format
        const emailVal = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
            emailVal === '' ||
            !emailRegex.test(emailVal)
        ) {
            email.parentElement.classList.add('error');
            isValid = false;
        }

        // Mobile: optional, if present must be 10 digits, start with 6/7/8/9
        let mobileVal = mobile.value.trim();
        if (mobileVal !== '') {
            // Remove any non-digit characters
            mobileVal = mobileVal.replace(/\D/g, '');
            if (
                !/^[6-9]\d{9}$/.test(mobileVal)
            ) {
                mobile.parentElement.classList.add('error');
                isValid = false;
            } else {
                // Auto-append +91
                mobileVal = '+91' + mobileVal;
            }
        } else {
            mobileVal = '';
        }

        // Subject: required, min 2, max 100 chars
        const subjectVal = subject.value.trim();
        if (
            subjectVal === '' ||
            subjectVal.length < 2 ||
            subjectVal.length > 100
        ) {
            subject.parentElement.classList.add('error');
            isValid = false;
        }

        // Message: required, min 5, max 1000 chars
        const messageVal = message.value.trim();
        if (
            messageVal === '' ||
            messageVal.length < 5 ||
            messageVal.length > 1000
        ) {
            message.parentElement.classList.add('error');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        let params = {
            name: nameVal,
            email: emailVal,
            subject: subjectVal,
            message: messageVal,
            mobile: mobileVal
        };

        emailjs.send("service_89w3yi8", "template_lboj2wn", params)
            .then(function() {
                alert("Your message has been sent successfully!");
                contactForm.reset();
            }, function(error) {
                alert("Failed to send message. Please try again later.");
            });
    }
});
