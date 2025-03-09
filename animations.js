// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Animation enhancements
  enhanceAnimations();
  
  // Add hover glow effects to interactive elements
  addHoverEffects();
  
  // Add background glow effect
  addBackgroundGlowEffect();
});

// Function to enhance existing animations and add new ones
function enhanceAnimations() {
  // Select all section elements
  const sections = document.querySelectorAll('section');
  
  // Apply staggered entrance animations with IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delay based on element index for staggered effect
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe each section
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(section);
  });
  
  // Add floating animation to cards
  const cards = document.querySelectorAll('.experience-card, .project-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.animation = 'float 3s ease-in-out infinite';
      // Add very minimal blur to other elements when hovering a card
      document.querySelectorAll('.experience-card, .project-card').forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.style.filter = 'blur(1px)';
          otherCard.style.transition = 'filter 0.3s ease';
        }
      });
    });
    
    card.addEventListener('mouseleave', () => {
      // Remove the float animation when mouse leaves
      card.style.animation = '';
      // Remove blur from other cards
      document.querySelectorAll('.experience-card, .project-card').forEach(otherCard => {
        otherCard.style.filter = '';
      });
    });
  });
  
  // Add smooth entrance animation for page load
  document.body.classList.add('animated-entrance');
}

// Add hover glow effects to interactive elements
function addHoverEffects() {
  // Add subtle parallax effect to cards
  const cards = document.querySelectorAll('.experience-card, .project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Calculate tilt based on mouse position (reduced effect)
      const tiltX = (0.5 - yPercent) * 2; // Reduced from 5 to 2
      const tiltY = (xPercent - 0.5) * 2; // Reduced from 5 to 2
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// Function to add background glow effect (without cursor elements)
function addBackgroundGlowEffect() {
  // Create the background glow element
  const backgroundGlow = document.createElement('div');
  backgroundGlow.classList.add('background-glow');
  
  // Add to DOM
  document.body.insertBefore(backgroundGlow, document.body.firstChild);
  
  // Add styles for background glow
  const style = document.createElement('style');
  style.textContent = `
    .background-glow {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      background: radial-gradient(
        circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(255, 100, 100, 0.07),
        transparent 50%
      );
      will-change: background;
      transition: background 0.2s ease;
    }
    
    /* Remove underline from navigation links */
    #ABOUT, #EXPERIENCE, #PROJECTS {
      text-decoration: none !important;
    }
    
    /* Navigation hover effect without underline */
    #ABOUT:hover, #EXPERIENCE:hover, #PROJECTS:hover {
      color: rgba(255, 100, 100, 0.9) !important;
      text-decoration: none !important;
    }
    
    /* Enhanced glow on interactive elements */
    a:hover ~ .background-glow, 
    button:hover ~ .background-glow,
    .card-header:hover ~ .background-glow,
    .experience-card:hover ~ .background-glow,
    .project-card:hover ~ .background-glow,
    .anchor-text:hover ~ .background-glow {
      background: radial-gradient(
        circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(255, 100, 100, 0.1),
        transparent 60%
      );
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
    
    .animated-entrance {
      opacity: 0;
      animation: fullPageFadeIn 1s forwards;
    }
    
    @keyframes fullPageFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  
  document.head.appendChild(style);
  
  // Track mouse movement for background glow position
  document.addEventListener('mousemove', (e) => {
    // Calculate percentage positions
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    // Update CSS variables for the radial gradient position
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  });
  
  // Handle click effects for background glow
  document.addEventListener('mousedown', () => {
    backgroundGlow.style.background = `radial-gradient(
      circle 150px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 100, 100, 0.12),
      transparent 60%
    )`;
  });
  
  document.addEventListener('mouseup', () => {
    backgroundGlow.style.background = `radial-gradient(
      circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 100, 100, 0.07),
      transparent 50%
    )`;
  });
}