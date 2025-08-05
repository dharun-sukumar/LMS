// RTL Toggle Component
(function() {
  'use strict';
  
  // Initialize RTL toggle functionality
  function initRTLToggle() {
    const rtlToggle = document.getElementById('rtl-toggle');
    const rtlToggleMobile = document.getElementById('rtl-toggle-mobile');
    const html = document.documentElement;
    
    // Check for saved RTL preference or detect from URL parameter
    let isRTL = localStorage.getItem('rtl-mode') === 'true';
    
    // Check for URL parameter (e.g., ?rtl=true)
    const urlParams = new URLSearchParams(window.location.search);
    const rtlParam = urlParams.get('rtl');
    if (rtlParam !== null) {
      isRTL = rtlParam === 'true';
      localStorage.setItem('rtl-mode', isRTL);
    }
    
    // Set initial state
    if (isRTL) {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar'); // or appropriate RTL language
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }
    
    updateToggleText(isRTL);
    
    // Desktop toggle
    if (rtlToggle) {
      rtlToggle.addEventListener('click', handleToggle);
    }
    
    // Mobile toggle
    if (rtlToggleMobile) {
      rtlToggleMobile.addEventListener('click', handleToggle);
    }
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
      // Alt + R to toggle RTL
      if (e.altKey && e.key === 'r') {
        e.preventDefault();
        handleToggle();
      }
    });
    
    function handleToggle() {
      const currentDir = html.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      const newLang = newDir === 'rtl' ? 'ar' : 'en';
      
      // Add switching animation class
      if (rtlToggle) rtlToggle.classList.add('switching');
      if (rtlToggleMobile) rtlToggleMobile.classList.add('switching');
      
      html.setAttribute('dir', newDir);
      html.setAttribute('lang', newLang);
      localStorage.setItem('rtl-mode', newDir === 'rtl');
      
      updateToggleText(newDir === 'rtl');
      
      // Add visual feedback
      showToggleFeedback(newDir);
      
      // Remove animation class after animation completes
      setTimeout(() => {
        if (rtlToggle) rtlToggle.classList.remove('switching');
        if (rtlToggleMobile) rtlToggleMobile.classList.remove('switching');
      }, 600);
      
      // Trigger custom event for other components
      window.dispatchEvent(new CustomEvent('rtlToggle', { 
        detail: { 
          direction: newDir,
          language: newLang,
          timestamp: Date.now()
        } 
      }));
      
      // Update any data attributes that might be used by CSS
      document.body.setAttribute('data-dir', newDir);
    }
    
    function updateToggleText(isRTL) {
      const text = isRTL ? 'Switch to LTR' : 'Switch to RTL';
      const globeIcon = '<i class="fas fa-globe"></i>';
      const directionIcon = isRTL ? '<i class="fas fa-arrow-left"></i>' : '<i class="fas fa-arrow-right"></i>';
      
      if (rtlToggle) {
        rtlToggle.innerHTML = `${globeIcon} ${directionIcon}`;
        rtlToggle.setAttribute('aria-label', text);
        rtlToggle.setAttribute('title', text);
        rtlToggle.classList.add('rtl-toggle-btn');
      }
      
      if (rtlToggleMobile) {
        rtlToggleMobile.innerHTML = `${globeIcon} ${directionIcon}`;
        rtlToggleMobile.setAttribute('aria-label', text);
        rtlToggleMobile.setAttribute('title', text);
        rtlToggleMobile.classList.add('rtl-toggle-btn');
      }
    }
    
    function showToggleFeedback(direction) {
      // Create temporary feedback element
      const feedback = document.createElement('div');
      feedback.textContent = direction === 'rtl' ? 'Switched to RTL' : 'Switched to LTR';
      feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary, #6366f1);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-100px);
        transition: transform 0.3s ease;
      `;
      
      document.body.appendChild(feedback);
      
      // Animate in
      setTimeout(() => {
        feedback.style.transform = 'translateY(0)';
      }, 10);
      
      // Remove after 2 seconds
      setTimeout(() => {
        feedback.style.transform = 'translateY(-100px)';
        setTimeout(() => {
          if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
          }
        }, 300);
      }, 2000);
    }
    
    // Initialize data attribute
    document.body.setAttribute('data-dir', html.getAttribute('dir'));
  }
  
  // Handle page navigation (for SPAs or dynamic content)
  function reinitializeRTL() {
    initRTLToggle();
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRTLToggle);
  } else {
    initRTLToggle();
  }
  
  // Listen for navigation events (for SPAs)
  window.addEventListener('popstate', reinitializeRTL);
  
  // Export for manual reinitialization if needed
  window.RTLToggle = {
    init: initRTLToggle,
    reinit: reinitializeRTL
  };
})();
