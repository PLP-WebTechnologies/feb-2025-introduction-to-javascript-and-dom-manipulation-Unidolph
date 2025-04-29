/**
 * Main Script
 * Initializes and connects all components
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  
  // Initialize all managers
  initTextManager();
  initStyleManager();
  initElementManager();
  
  // Add subtle animations to cards on page load
  animateCardsOnLoad();
  
  // Add hover effects to buttons
  addButtonHoverEffects();
  
  // Update the subtitle with the current date
  updateSubtitle();
});

/**
 * Animate cards sequentially on page load
 */
function animateCardsOnLoad() {
  const cards = document.querySelectorAll('.card');
  
  // Add animation styles
  const styleElement = createElement('style');
  styleElement.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .card-animate {
      opacity: 0;
      animation: fadeInUp 0.5s ease forwards;
    }
  `;
  document.head.appendChild(styleElement);
  
  // Animate each card with a delay
  cards.forEach((card, index) => {
    card.classList.add('card-animate');
    card.style.animationDelay = `${index * 0.15}s`;
  });
}

/**
 * Add hover effects to all buttons
 */
function addButtonHoverEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseout', () => {
      button.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Update the subtitle with the current date
 */
function updateSubtitle() {
  const subtitle = getElement('subtitle');
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
  subtitle.innerHTML = `Learn how JavaScript can manipulate the DOM <span class="date">(Today: ${formattedDate})</span>`;
  
  // Add style for the date
  const styleElement = createElement('style');
  styleElement.textContent = `
    .date {
      font-style: italic;
      color: var(--text-light);
      margin-left: 5px;
    }
  `;
  document.head.appendChild(styleElement);
}