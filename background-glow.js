// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create background glow effect
  createBackgroundGlowEffect();
});

// Function to create background glow effect
function createBackgroundGlowEffect() {
  // Create the background glow element
  const backgroundGlow = document.createElement('div');
  
  // Add class for styling
  backgroundGlow.classList.add('background-glow');
  
  // Add to the DOM - add glow first so it appears behind content
  document.body.insertBefore(backgroundGlow, document.body.firstChild);
  
  // Add styles
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
        circle 300px at var(--mouse-x, 30%) var(--mouse-y, 30%),
        rgba(255, 100, 100, 0.04),
        transparent 70%
      );
      will-change: background;
      transition: background 0.15s;
    }
    
    /* Enhanced glow on interactive elements */
    a:hover ~ .background-glow,
    button:hover ~ .background-glow,
    .card-header:hover ~ .background-glow,
    .experience-card:hover ~ .background-glow,
    .project-card:hover ~ .background-glow,
    .anchor-text:hover ~ .background-glow {
      background: radial-gradient(
        circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(255, 100, 100, 0.06),
        transparent 80%
      );
    }
  `;
  
  document.head.appendChild(style);
  
  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    // Calculate percentage positions
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    // Update CSS variables for the radial gradient position
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  });
  
  // Handle click effects
  document.addEventListener('mousedown', () => {
    backgroundGlow.style.background = `radial-gradient(
      circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 100, 100, 0.08),
      transparent 80%
    )`;
  });
  
  document.addEventListener('mouseup', () => {
    backgroundGlow.style.background = `radial-gradient(
      circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 100, 100, 0.04),
      transparent 70%
    )`;
  });
}