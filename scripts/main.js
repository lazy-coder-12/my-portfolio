/* ============================================
   PORTFOLIO WEBSITE - MAIN JAVASCRIPT FILE
   ============================================
   
   This JavaScript file provides interactive functionality for the portfolio:
   - Navigation enhancements
   - Scroll detection and effects
   - Smooth scrolling
   - Active link highlighting
   - Portfolio interactions
   - Utility functions
   
   ============================================ */

/* ============================================
   1. DOM ELEMENT REFERENCES
   ============================================
   Cache commonly used DOM elements for better performance.
   Searching the DOM multiple times is inefficient. */

// Navigation elements
const primaryNav = document.getElementById('primary-navigation');
const navLinks = document.querySelectorAll('.nav-link');
const mainHeader = document.querySelector('.main-header');

// Main content sections
const heroSection = document.getElementById('hero-section');
const projectCards = document.querySelectorAll('.project-card');
const ctaSection = document.getElementById('contact-section');

// Body and HTML elements for scroll detection
const body = document.body;
const html = document.documentElement;

/* ============================================
   2. INITIALIZATION
   ============================================
   Run initialization functions when the DOM is fully loaded.
   Using DOMContentLoaded ensures all elements are available. */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
    
    // Initialize all event listeners and features
    initializeScrollDetection();
    initializeActiveLinkHighlight();
    initializeProjectCards();
    initializeSmoothScroll();
});

/* ============================================
   3. SCROLL DETECTION
   ============================================
   Detect when user scrolls and apply effects (e.g., add header shadow).
   Uses throttling to prevent excessive function calls. */

let isScrolling = false;
let scrollTimeout;

/**
 * Initialize scroll detection for header effects
 */
function initializeScrollDetection() {
    window.addEventListener('scroll', function() {
        // Throttle scroll event - only run every 10ms
        if (!isScrolling) {
            isScrolling = true;
            window.requestAnimationFrame(handleScrollEffect);
        }
    }, { passive: true });
}

/**
 * Handle scroll effects on elements
 * Updates header appearance based on scroll position
 */
function handleScrollEffect() {
    const scrollPosition = window.scrollY;
    
    // Add shadow to header when scrolled down
    if (scrollPosition > 10) {
        mainHeader.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        mainHeader.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    // Highlight project cards when they enter viewport
    projectCards.forEach(card => {
        if (isElementInViewport(card)) {
            card.classList.add('in-view');
        }
    });
    
    // Update active navigation link based on scroll position
    updateActiveNavLink();
    
    isScrolling = false;
}

/* ============================================
   4. ACTIVE LINK HIGHLIGHTING
   ============================================
   Highlight the active navigation link based on current scroll position.
   Helps users understand which section they're viewing. */

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    let current = '';
    
    // Define sections to track
    const sections = {
        'hero-section': 0,
        'featured-projects': window.innerHeight * 0.5,
        'contact-section': window.innerHeight * 0.5
    };
    
    // Find which section is currently visible
    for (const [sectionId, offset] of Object.entries(sections)) {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= window.scrollY + offset) {
            current = sectionId;
        }
    }
    
    // Update all nav links
    navLinks.forEach(link => {
        link.removeAttribute('aria-current');
        
        // Check if link points to current section
        const href = link.getAttribute('href');
        if (href && href.includes(current)) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Initialize active link highlighting on page load
 */
function initializeActiveLinkHighlight() {
    // Set up click handlers for smooth navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/* ============================================
   5. SMOOTH SCROLL INITIALIZATION
   ============================================
   Initialize smooth scrolling for internal anchor links.
   Modern browsers support this natively via CSS. */

/**
 * Initialize smooth scroll behavior
 */
function initializeSmoothScroll() {
    // CSS handles smooth scrolling via scroll-behavior: smooth;
    // This function is a placeholder for additional smooth scroll logic
    
    // Find all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only if href is not just "#"
            if (href !== '#') {
                e.preventDefault();
                
                const id = href.substring(1);
                const element = document.getElementById(id);
                
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

/* ============================================
   6. PROJECT CARD INTERACTIONS
   ============================================
   Add interactive effects to project cards.
   Provides visual feedback when user hovers/focuses on cards. */

/**
 * Initialize project card interactions
 */
function initializeProjectCards() {
    projectCards.forEach((card, index) => {
        // Add data attribute for tracking
        card.dataset.index = index;
        
        // Add keyboard focus styling
        card.addEventListener('focus', function(e) {
            if (e.target === this) {
                this.style.outline = '2px solid var(--color-primary)';
            }
        }, true);
        
        card.addEventListener('blur', function(e) {
            if (e.target === this) {
                this.style.outline = 'none';
            }
        }, true);
    });
}

/* ============================================
   7. VIEWPORT DETECTION
   ============================================
   Determine if an element is visible in the viewport.
   Useful for triggering animations and loading content. */

/**
 * Check if an element is visible in the viewport
 * @param {Element} element - The element to check
 * @param {number} offset - Optional pixel offset from viewport edge
 * @returns {boolean} - True if element is in viewport
 */
function isElementInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight - offset &&
        rect.bottom >= offset &&
        rect.left <= window.innerWidth &&
        rect.right >= 0
    );
}

/* ============================================
   8. UTILITY FUNCTIONS
   ============================================
   General purpose helper functions for common tasks. */

/**
 * Debounce function - prevents rapid function calls
 * Useful for resize, scroll, and input events
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/**
 * Throttle function - limits function calls to a maximum frequency
 * Useful for scroll and mousemove events
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Add class to element with optional delay
 * @param {Element} element - The element to add class to
 * @param {string} className - The class name to add
 * @param {number} delay - Optional delay in milliseconds
 */
function addClassWithDelay(element, className, delay = 0) {
    if (delay > 0) {
        setTimeout(() => element.classList.add(className), delay);
    } else {
        element.classList.add(className);
    }
}

/**
 * Remove class from element
 * @param {Element} element - The element to remove class from
 * @param {string} className - The class name to remove
 */
function removeClass(element, className) {
    element.classList.remove(className);
}

/**
 * Toggle class on element
 * @param {Element} element - The element to toggle class on
 * @param {string} className - The class name to toggle
 */
function toggleClass(element, className) {
    element.classList.toggle(className);
}

/* ============================================
   9. RESPONSIVE BEHAVIOR
   ============================================
   Handle responsive design changes for different screen sizes. */

/**
 * Handle window resize events
 */
const handleResize = debounce(function() {
    console.log('Window resized - adjust layout if needed');
    
    // Example: Update layout based on screen size
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 768) {
        // Mobile layout adjustments
        console.log('Mobile view');
    } else if (screenWidth < 1024) {
        // Tablet layout adjustments
        console.log('Tablet view');
    } else {
        // Desktop layout adjustments
        console.log('Desktop view');
    }
}, 300);

window.addEventListener('resize', handleResize, { passive: true });

/* ============================================
   10. PERFORMANCE OPTIMIZATION
   ============================================
   Tips for optimizing JavaScript performance:
   
   - Use event delegation for dynamic elements
   - Cache DOM references to avoid repeated queries
   - Use passive event listeners where possible
   - Debounce/throttle expensive operations
   - Use requestAnimationFrame for animations
   - Minimize DOM manipulation in loops
   - Lazy load images where possible
   - Consider using Intersection Observer API for visibility detection
   
   ============================================ */

/**
 * Example: Using Intersection Observer for better performance
 * Detects when elements enter the viewport
 */
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // Add animation class when element becomes visible
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

/* ============================================
   11. ERROR HANDLING
   ============================================
   Basic error handling for better debugging. */

/**
 * Log errors to console for debugging
 * In production, consider sending errors to a logging service
 */
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // Example: Send to error tracking service
    // trackError(event.error);
});

/* ============================================
   12. ACCESSIBILITY ENHANCEMENTS
   ============================================
   Additional accessibility features for keyboard and screen reader users. */

/**
 * Handle keyboard navigation shortcuts
 */
document.addEventListener('keydown', function(e) {
    // Example: Press 's' to focus on search (if you add one)
    // This is optional and can be customized based on your needs
    
    // Skip if modifier keys are pressed
    if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
    }
    
    // Add keyboard shortcuts here as needed
});

/* ============================================
   13. READY STATE
   ============================================
   Log when JavaScript has fully initialized. */

console.log('✓ Portfolio JavaScript initialized successfully');
console.log('✓ Features: Scroll detection, Active links, Smooth scrolling, Project interactions');
