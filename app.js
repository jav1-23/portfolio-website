// Portfolio JavaScript for Shodhan Kumar Shetty

class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.navLinks = document.querySelectorAll('.nav__link');
        this.pages = document.querySelectorAll('.page');
        this.mobileMenuToggle = document.querySelector('.nav__toggle');
        this.navList = document.querySelector('.nav__list');
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupResumeDownload();
        this.setupHeroButtons();
        this.setupExternalLinks();
        this.addPageTransitions();
        
        // Set initial page state
        this.showPage('home');
        
        console.log('Portfolio App initialized successfully');
    }
    
    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.dataset.page;
                
                if (targetPage && targetPage !== this.currentPage) {
                    this.showPage(targetPage);
                    this.updateActiveNavLink(link);
                    
                    // Close mobile menu if open
                    if (this.navList.classList.contains('active')) {
                        this.toggleMobileMenu();
                    }
                    
                    // Smooth scroll to top
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupMobileMenu() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav') && this.navList.classList.contains('active')) {
                    this.toggleMobileMenu();
                }
            });
        }
    }
    
    toggleMobileMenu() {
        this.navList.classList.toggle('active');
        this.mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.mobileMenuToggle.querySelectorAll('span');
        if (this.mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }
    
    showPage(pageId) {
        // Hide all pages with fade out effect
        this.pages.forEach(page => {
            if (page.classList.contains('page--active')) {
                page.style.opacity = '0';
                setTimeout(() => {
                    page.classList.remove('page--active');
                }, 150);
            }
        });
        
        // Show target page with fade in effect
        setTimeout(() => {
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('page--active');
                targetPage.style.opacity = '0';
                setTimeout(() => {
                    targetPage.style.opacity = '1';
                }, 50);
                this.currentPage = pageId;
                
                // Update page title
                this.updatePageTitle(pageId);
                
                // Add page-specific functionality
                this.handlePageSpecificLogic(pageId);
            }
        }, 150);
    }
    
    updateActiveNavLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    updatePageTitle(pageId) {
        const pageTitles = {
            'home': 'Shodhan Kumar Shetty - Portfolio',
            'projects': 'Projects - Shodhan Kumar Shetty',
            'resume': 'Resume - Shodhan Kumar Shetty',
            'contact': 'Contact - Shodhan Kumar Shetty'
        };
        
        document.title = pageTitles[pageId] || 'Shodhan Kumar Shetty - Portfolio';
    }
    
    setupHeroButtons() {
        const heroButtons = document.querySelectorAll('.hero__actions .btn');
        heroButtons.forEach(button => {
            if (button.dataset.page) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetPage = button.dataset.page;
                    this.showPage(targetPage);
                    
                    // Update navigation
                    const navLink = document.querySelector(`[data-page="${targetPage}"]`);
                    if (navLink) {
                        this.updateActiveNavLink(navLink);
                    }
                });
            }
        });
    }
    
    setupExternalLinks() {
        // Setup GitHub project links
        const githubButtons = document.querySelectorAll('.project-card__actions .btn');
        githubButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const href = button.getAttribute('href');
                if (href && href.includes('github.com')) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                    this.showNotification('Opening GitHub repository...', 'success');
                }
            });
        });
        
        // Setup social media links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                    const platform = href.includes('linkedin') ? 'LinkedIn' : 'GitHub';
                    this.showNotification(`Opening ${platform} profile...`, 'success');
                }
            });
        });
        
        // Setup footer links
        const footerLinks = document.querySelectorAll('.footer__links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                }
            });
        });
        
        // Setup contact page external links
        const contactExternalLinks = document.querySelectorAll('.contact-item a[href^="http"]');
        contactExternalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                    const platform = href.includes('linkedin') ? 'LinkedIn' : 'GitHub';
                    this.showNotification(`Opening ${platform} profile...`, 'success');
                }
            });
        });
    }
    
    setupResumeDownload() {
        const downloadBtn = document.querySelector('.resume__download .btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleResumeDownload();
            });
        }
    }
    
    handleResumeDownload() {
        // Create a more professional notification for resume download
        this.showNotification('Thank you for your interest! Please contact me directly at shodhankumarshetty963@gmail.com to receive the latest version of my resume.', 'info');
        
        // Auto-open email client with pre-filled subject
        setTimeout(() => {
            const emailSubject = encodeURIComponent('Request for Resume - Shodhan Kumar Shetty');
            const emailBody = encodeURIComponent('Hello Shodhan,\n\nI would like to request your latest resume.\n\nBest regards,');
            const mailtoLink = `mailto:shodhankumarshetty963@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            window.location.href = mailtoLink;
        }, 2000);
    }
    
    handlePageSpecificLogic(pageId) {
        switch(pageId) {
            case 'projects':
                this.animateProjectCards();
                break;
            case 'contact':
                this.setupContactInteractions();
                break;
            case 'home':
                this.animateSkillTags();
                break;
        }
    }
    
    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    animateSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.4s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1)';
            }, index * 50);
        });
    }
    
    setupContactInteractions() {
        const contactLinks = document.querySelectorAll('.contact-link');
        contactLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && (href.includes('mailto:') || href.includes('tel:'))) {
                    // Let the default behavior handle mailto and tel links
                    if (href.includes('mailto:')) {
                        this.showNotification('Opening your email client...', 'success');
                    } else if (href.includes('tel:')) {
                        this.showNotification('Initiating phone call...', 'success');
                    }
                }
            });
        });
        
        // Add hover effects to contact items
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    addPageTransitions() {
        // Add smooth transitions to all pages
        this.pages.forEach(page => {
            page.style.transition = 'opacity 0.3s ease-in-out';
        });
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-size: var(--font-size-sm);
            line-height: 1.4;
        `;
        
        // Add notification content styles
        const notificationContent = notification.querySelector('.notification__content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: flex-start;
            gap: var(--space-12);
        `;
        
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: var(--color-text-secondary);
            padding: 0;
            min-width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        if (type === 'success') {
            notification.style.borderLeft = '4px solid var(--color-success)';
        } else if (type === 'error') {
            notification.style.borderLeft = '4px solid var(--color-error)';
        } else {
            notification.style.borderLeft = '4px solid var(--color-primary)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Setup close button
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Auto hide after 8 seconds for longer messages
        const autoHideDelay = message.length > 50 ? 8000 : 5000;
        setTimeout(() => {
            this.hideNotification(notification);
        }, autoHideDelay);
    }
    
    hideNotification(notification) {
        if (notification && notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }
    
    // Utility method for smooth scrolling
    smoothScrollTo(targetY, duration = 800) {
        const startY = window.pageYOffset;
        const difference = targetY - startY;
        const startTime = performance.now();
        
        function step() {
            const progress = (performance.now() - startTime) / duration;
            const amount = ease(progress);
            window.scrollTo(0, startY + (difference * amount));
            
            if (progress < 0.99) {
                window.requestAnimationFrame(step);
            }
        }
        
        function ease(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }
        
        step();
    }
}

// Enhanced scroll behavior for better UX
class ScrollManager {
    constructor() {
        this.lastScrollTop = 0;
        this.header = document.querySelector('.header');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        }, { passive: true });
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to header when scrolling
        if (scrollTop > 10) {
            this.header.style.boxShadow = 'var(--shadow-md)';
        } else {
            this.header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        this.lastScrollTop = scrollTop;
    }
}

// Performance optimization: Intersection Observer for animations
class AnimationManager {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1, rootMargin: '50px' }
        );
        this.init();
    }
    
    init() {
        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll(
            '.skill-category, .project-card, .contact-item'
        );
        
        animateElements.forEach(el => {
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio app
    const app = new PortfolioApp();
    
    // Initialize scroll manager
    const scrollManager = new ScrollManager();
    
    // Initialize animation manager (only if Intersection Observer is supported)
    if ('IntersectionObserver' in window) {
        const animationManager = new AnimationManager();
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    app.showPage('home');
                    break;
                case '2':
                    e.preventDefault();
                    app.showPage('projects');
                    break;
                case '3':
                    e.preventDefault();
                    app.showPage('resume');
                    break;
                case '4':
                    e.preventDefault();
                    app.showPage('contact');
                    break;
            }
        }
    });
    
    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove any loading indicators
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => el.remove());
    });
    
    // Handle browser back/forward buttons (basic implementation)
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            app.showPage(e.state.page);
        }
    });
    
    console.log('All portfolio components initialized successfully!');
});
document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("downloadResumeBtn");

    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            const link = document.createElement("a");
            link.href = "doc/resume.pdf"; // adjust path if needed
            link.download = "Shodhan_Kumar_Shetty_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault(); // Prevent default link behavior
        const pageId = button.getAttribute('data-page');

        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('page--active');
        });

        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('page--active');
        }

        // Optional: update nav active state
        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-page') === pageId);
        });
    });
});
