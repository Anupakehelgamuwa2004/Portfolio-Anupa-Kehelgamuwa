// Modern Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-modern');
    const navToggle = document.querySelector('.nav-modern-toggle');
    const navMenu = document.querySelector('.nav-modern-menu');
    const navLinks = document.querySelectorAll('.nav-modern-link');
    let lastScroll = 0;

    // Scroll Progress Indicator
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        nav.style.setProperty('--scroll-width', `${scrollPercent}%`);

        // Hide/show navbar on scroll
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Mobile Navigation Toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling with offset
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Active link highlighting
    const observerOptions = {
        threshold: 0.2,
        rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });

    // Add hover effect to nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // Force Home active when at the very top
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.nav-modern-link[href="#header"]').classList.add('active');
        }
    });
});

// Modern Tab Functionality
function openModernTab(tabName) {
    // Hide all panels
    document.querySelectorAll('.tab-modern-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-modern-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected panel
    document.getElementById(tabName).classList.add('active');
    
    // Activate clicked button
    event.target.closest('.tab-modern-btn').classList.add('active');
}

// Animate numbers
function animateNumbers() {
    document.querySelectorAll('.stat-modern-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-value'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Initialize animations when section is in view
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about-modern');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
});

// Placeholder for email functionality
function emailSend(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show success message (replace with actual email service)
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    document.getElementById('contact-form').reset();
}

// Add reveal animation on scroll
const observerOptionsReveal = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observerReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptionsReveal);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observerReveal.observe(el));
});

// Portfolio filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
});

// Portfolio carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('track');
    const prevBtn = document.querySelector('.scroll-prev');
    const nextBtn = document.querySelector('.scroll-next');
    const cardWidth = 350; // Match the card width from CSS
    const gap = 32; // Match the gap from CSS (2rem = 32px)
    const scrollAmount = cardWidth + gap;

    function scrollLeft() {
        const currentScroll = track.scrollLeft;
        const targetScroll = Math.max(0, currentScroll - scrollAmount);
        track.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }

    function scrollRight() {
        const currentScroll = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        const targetScroll = Math.min(maxScroll, currentScroll + scrollAmount);
        track.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }

    // Update button states based on scroll position
    function updateButtonStates() {
        prevBtn.style.opacity = track.scrollLeft > 0 ? '1' : '0.5';
        nextBtn.style.opacity = 
            track.scrollLeft < (track.scrollWidth - track.clientWidth - 10) ? '1' : '0.5';
    }

    // Add event listeners
    prevBtn.addEventListener('click', scrollLeft);
    nextBtn.addEventListener('click', scrollRight);
    track.addEventListener('scroll', updateButtonStates);

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            scrollLeft();
        } else if (e.key === 'ArrowRight') {
            scrollRight();
        }
    });

    // Initial button state
    updateButtonStates();
});

// Project Data
const projectData = {
    ticketing: {
        title: "Realtime Ticketing System",
        category: "Full Stack",
        image: "images/work1.png",
        description: "A sophisticated ticketing platform built with Java Spring Boot and Angular, featuring real-time updates, secure payment processing, and an intuitive user interface. The system handles high-concurrency scenarios and provides seamless user experience for both customers and administrators.",
        techStack: ["Java", "Spring Boot", "Angular", "SQL", "WebSocket", "JWT"],
        features: [
            "Real-time ticket availability updates",
            "Secure payment gateway integration",
            "Admin dashboard for event management",
            "User authentication and authorization",
            "Email notifications and confirmations",
            "Analytics and reporting tools"
        ],
        liveLink: "#",
        codeLink: "#"
    }
    // Add more projects here
};

// Modal Functionality
const modal = document.getElementById('projectModal');
const modalClose = modal.querySelector('.modal-close');
const modalOverlay = modal.querySelector('.modal-overlay');

// Open Modal
document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectId = e.currentTarget.dataset.project;
        const project = projectData[projectId];
        
        if (project) {
            // Update Modal Content
            modal.querySelector('.modal-title').textContent = project.title;
            modal.querySelector('.modal-badge').textContent = project.category;
            modal.querySelector('.modal-image img').src = project.image;
            modal.querySelector('.modal-description').textContent = project.description;
            
            // Update Tech Stack
            const techTags = modal.querySelector('.tech-tags');
            techTags.innerHTML = project.techStack.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
            
            // Update Features
            const featuresList = modal.querySelector('.features-list');
            featuresList.innerHTML = project.features.map(feature => 
                `<li><i class="fas fa-check"></i>${feature}</li>`
            ).join('');
            
            // Update Links
            modal.querySelector('.modal-link.live').href = project.liveLink;
            modal.querySelector('.modal-link.code').href = project.codeLink;
            
            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close Modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
}); 