// ===========================
// PREMIUM PORTFOLIO - JavaScript
// Interactive & Dynamic Features
// ===========================

// ===== SCROLL TO NEXT SECTION FUNCTION =====
function scrollToNextSection() {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentScrollPos = window.scrollY + window.innerHeight / 2;

    // Find the next section below the current scroll position
    const nextSection = sections.find(section => {
        const sectionTop = section.offsetTop;
        return sectionTop > currentScrollPos;
    });

    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sections.length > 0) {
        // If no section found below, scroll to the first section
        sections[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Keep the old function name for backward compatibility
function smoothScrollToAbout() {
    scrollToNextSection();
}

// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScroll();
    initializeContactForm();
    initializeScrollAnimations();
    initializeInteractiveElements();
});

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            updateActiveNavLink(this);
        });
    });

    // Close menu when clicking outside (but not on nav-container or menu items)
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('.nav-container');
        const isClickOnNavMenu = event.target.closest('.nav-menu');

        if (!isClickInsideNav && !isClickOnNavMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

function initializeScroll() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavOnScroll(navLinks);
    });
}

function updateActiveNavOnScroll(links) {
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLink(clickedLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value,
                projectTitle: form.querySelector('input[type="text"]:nth-of-type(2)').value || 'Not specified',
                message: form.querySelector('textarea').value,
                timestamp: new Date().toISOString()
            };

            // Log form data (in production, this would send to a server)
            console.log('Contact Form Submission:', formData);

            // Show success message
            showFormSuccess();

            // Reset form
            form.reset();
        });
    }
}

function showFormSuccess() {
    const formWrapper = document.querySelector('.contact-form-wrapper');
    const successMessage = document.createElement('div');

    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 30px;
            background: linear-gradient(135deg, #06d6a0 0%, #00d4ff 100%);
            color: #0a0e27;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            font-weight: 700;
            box-shadow: 0 10px 30px rgba(6, 214, 160, 0.4);
            z-index: 2000;
            animation: slideInRight 0.5s ease;
        ">
            ✓ Message sent! I'll get back to you within 24 hours.
        </div>
    `;

    document.body.appendChild(successMessage);

    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all skill badges and expertise cards
    document.querySelectorAll('.badge, .expertise-card, .highlight-card, .timeline-content').forEach(el => {
        observer.observe(el);
    });
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractiveElements() {
    // Add stagger animation to badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.animation = `slideInLeft 0.5s ease ${index * 0.05}s forwards`;
    });

    // Add stagger animation to expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideInLeft 0.6s ease ${index * 0.1}s forwards`;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Add CSS animations dynamically
const styles = document.createElement('style');
styles.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .animate-in {
        animation: slideInLeft 0.6s ease forwards !important;
    }

    .success-message {
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #06d6a0 0%, #00d4ff 100%);
        color: #0a0e27;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(6, 214, 160, 0.4);
        z-index: 2000;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(styles);

// ===== PERFORMANCE MONITORING =====
function logPerformanceMetrics() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        console.log('Page Load Performance:');
        console.log(`Total Load Time: ${pageLoadTime}ms`);
        console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`);
        console.log(`Time to First Paint: ${perfData.responseEnd - perfData.navigationStart}ms`);
    }
}

// Log performance when page loads
window.addEventListener('load', logPerformanceMetrics);

// ===== PARALLAX EFFECT =====
function initializeParallax() {
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const elements = hero.querySelectorAll('[class*="hero"]');

            elements.forEach(el => {
                if (el.classList.contains('hero-text')) {
                    el.style.transform = `translateY(${scrollPosition * 0.5}px)`;
                }
            });
        });
    }
}

initializeParallax();

// ===== SKILL FILTER (Optional Interactive Feature) =====
function initializeSkillFilter() {
    const skillCategories = document.querySelectorAll('.skills-category h3');

    skillCategories.forEach(category => {
        category.style.cursor = 'pointer';
        category.addEventListener('click', function() {
            const badge = this.nextElementSibling;
            badge.style.maxHeight = badge.style.maxHeight === 'none' ? '0' : 'none';
            badge.style.overflow = 'hidden';
            badge.style.transition = 'all 0.3s ease';
        });
    });
}

// ===== DARK MODE TOGGLE (Optional) =====
function initializeDarkModeToggle() {
    // Check if dark mode is already enabled
    const isDarkMode = localStorage.getItem('darkMode') !== 'false';

    if (!isDarkMode) {
        document.body.classList.add('light-mode');
    }
}

// ===== ANALYTICS TRACKING =====
function trackPageView() {
    // This would integrate with Google Analytics or similar
    console.log('Page View Tracked:', {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
}

trackPageView();

// ===== LAZY LOADING IMAGES =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initializeLazyLoading();

// ===== SOCIAL SHARING =====
function initializeSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = window.location.href;
            const text = 'Check out this amazing portfolio!';

            let shareUrl = '';

            switch(platform) {
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

initializeSocialSharing();

// ===== KEYBOARD SHORTCUTS =====
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Press '/' to focus search or help
        if (e.key === '/' && e.ctrlKey) {
            e.preventDefault();
            console.log('Search functionality would open here');
        }

        // Press 'Escape' to close modals (if any)
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
}

initializeKeyboardShortcuts();

// ===== SCROLL TO TOP BUTTON =====
function initializeScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff 0%, #8338ec 100%);
        color: #0a0e27;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollBtn.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
}

initializeScrollToTop();

console.log('Portfolio site initialized successfully! 🚀');
