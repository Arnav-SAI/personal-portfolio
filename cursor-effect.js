// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create and initialize cursor glow effect
    createCursorGlowEffect();
  });
  
  // Function to create cursor glow effect
  function createCursorGlowEffect() {
    // Create the glow elements
    const cursorGlow = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    // Add classes for styling
    cursorGlow.classList.add('cursor-glow');
    cursorDot.classList.add('cursor-dot');
    
    // Add to the DOM
    document.body.appendChild(cursorGlow);
    document.body.appendChild(cursorDot);
    
    // Add styles for cursor effects
    const style = document.createElement('style');
    style.textContent = `
      body {
        cursor: none;
      }
      
      .cursor-glow {
        position: fixed;
        width: 250px;
        height: 250px;
        background: radial-gradient(circle, rgba(94, 234, 212, 0.3) 0%, rgba(94, 234, 212, 0) 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: screen;
        will-change: left, top;
        transition: width 0.3s ease, height 0.3s ease;
      }
      
      .cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background-color: var(--color-accent, #5eead4);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        will-change: left, top;
        filter: drop-shadow(0 0 5px var(--color-accent, #5eead4));
      }
      
      /* Hover effect on interactive elements */
      a:hover ~ .cursor-glow, 
      button:hover ~ .cursor-glow,
      .card-header:hover ~ .cursor-glow,
      .experience-card:hover ~ .cursor-glow,
      .project-card:hover ~ .cursor-glow,
      .anchor-text:hover ~ .cursor-glow {
        width: 350px;
        height: 350px;
        background: radial-gradient(circle, rgba(94, 234, 212, 0.4) 0%, rgba(94, 234, 212, 0) 70%);
      }
    `;
    
    document.head.appendChild(style);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      // Update glow position with a slight delay for smoother effect
      setTimeout(() => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
      }, 50);
      
      // Update dot position immediately for precise tracking
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });
    
    // Handle cursor effects when document loses focus
    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
    
    // Special effect when clicking
    document.addEventListener('mousedown', () => {
      cursorGlow.style.width = '200px';
      cursorGlow.style.height = '200px';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
      cursorGlow.style.width = '250px';
      cursorGlow.style.height = '250px';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }