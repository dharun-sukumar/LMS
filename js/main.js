// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile navigation
  initMobileNavigation();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize animations on scroll
  initScrollAnimations();
});

// Mobile Navigation Functions
function initMobileNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (mobileNavClose && mobileNav) {
    mobileNavClose.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close mobile nav when clicking on links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close mobile nav when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileNav && mobileNav.classList.contains('active')) {
      if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.card, .course-card, .testimonial, .learning-path-card, .success-story');
  
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// Utility function to handle responsive behavior
function handleResize() {
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (window.innerWidth > 768 && mobileNav) {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Add resize listener
window.addEventListener('resize', handleResize);

// Add CSS for animations
const animationStyles = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
