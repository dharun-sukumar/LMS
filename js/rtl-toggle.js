document.addEventListener('DOMContentLoaded', () => {
  // RTL Toggle functionality
  const rtlBtn = document.getElementById('rtl-toggle');
  const rtlBtnMobile = document.getElementById('rtl-toggle-mobile');
  const saved = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', saved);

  // Update both desktop and mobile RTL buttons
  const updateRtlButtonText = (direction) => {
    const text = direction === 'ltr' ? 'Switch to RTL' : 'Switch to LTR';
    if (rtlBtn) rtlBtn.textContent = text;
    if (rtlBtnMobile) rtlBtnMobile.textContent = text;
  };

  updateRtlButtonText(saved);

  const toggleRtl = () => {
    const curr = document.documentElement.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', curr);
    localStorage.setItem('dir', curr);
    updateRtlButtonText(curr);
  };

  if (rtlBtn) {
    rtlBtn.addEventListener('click', toggleRtl);
  }

  if (rtlBtnMobile) {
    rtlBtnMobile.addEventListener('click', toggleRtl);
  }

  // Hamburger Menu functionality
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      hamburger.classList.add('active');
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMobileNav();
      });
    }

    // Close mobile nav when clicking on a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileNav();
        // Navigate to the link after closing
        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      });
    });

    // Close mobile nav when clicking outside
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        closeMobileNav();
      }
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileNav();
      }
    });

    // Function to close mobile navigation
    function closeMobileNav() {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close mobile nav on window resize (if screen becomes larger)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
        closeMobileNav();
      }
    });
  }
});
