// Check if device supports hover (desktop)
const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Custom Cursor (Only active on Desktop)
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

if (isDesktop && cursor && cursorTrail) {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const distX = mouseX - trailX;
        const distY = mouseY - trailY;

        trailX = trailX + (distX * 0.1);
        trailY = trailY + (distY * 0.1);

        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorTrail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-card');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1.5)`;
            cursor.style.mixBlendMode = 'normal';
            cursor.style.background = 'var(--accent-color)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
            cursor.style.mixBlendMode = 'difference';
            cursor.style.background = 'var(--gradient-primary)';
        });
    });
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.style.background = 'rgba(10, 10, 11, 0.95)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 11, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
}, { passive: true });

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .contact-card, .about-card, .hero-text, .section-title');

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        const delay = (index % 4) * 0.1; 
        el.style.animationDelay = `${delay}s`;
        observer.observe(el);
    });
});

// Typing Animation
const phrases = ["social media content", "logos", "& websites"];
const heroSubtitle = document.querySelector(".subtitle-line");

if (heroSubtitle) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        const displayedText = currentPhrase.substring(0, charIndex);
        heroSubtitle.textContent = displayedText;

        let typeSpeed = 100;

        if (isDeleting) { typeSpeed = 50; }

        if (!isDeleting && charIndex < currentPhrase.length) {
            charIndex++;
            setTimeout(typeEffect, typeSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, typeSpeed);
        } else {
            if (!isDeleting) {
                isDeleting = true;
                setTimeout(typeEffect, 1500);
            } else {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 500);
            }
        }
    }
    setTimeout(typeEffect, 1000);
}

// Floating Elements Animation
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach((element) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = 4 + Math.random() * 4;
    element.style.animationDelay = `${randomDelay}s`;
    element.style.animationDuration = `${randomDuration}s`;
});

// Form Handling
const contactForm = document.querySelector('form');
const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    if(input.value) {
        input.classList.add('has-value');
        input.parentElement.classList.add('focused');
    }

    input.addEventListener('focus', () => { input.parentElement.classList.add('focused'); });
    input.addEventListener('blur', () => {
        if (!input.value) { input.parentElement.classList.remove('focused'); }
    });
    input.addEventListener('input', () => {
        if (input.value) { input.classList.add('has-value'); } 
        else { input.classList.remove('has-value'); }
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            formInputs.forEach(input => {
                input.classList.remove('has-value');
                input.parentElement.classList.remove('focused');
            });
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--bg-card)' : '#ef4444'};
        border: 1px solid ${type === 'success' ? 'var(--primary-color)' : 'transparent'};
        color: white;
        border-radius: 0.5rem;
        z-index: 10000;
        transform: translateX(120%);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        font-weight: 500;
        box-shadow: var(--shadow-xl);
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    document.body.appendChild(notification);
    requestAnimationFrame(() => { notification.style.transform = 'translateX(0)'; });

    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => { document.body.removeChild(notification); }, 300);
    }, 4000);
}

// Parallax Effect
window.addEventListener('scroll', () => {
    if (isDesktop) {
        const scrolled = window.scrollY;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
        }
    }
}, { passive: true });

// Button Ripple
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        this.appendChild(ripple);
        setTimeout(() => { ripple.remove(); }, 600);
    });
});