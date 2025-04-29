/**
 * Utility functions for DOM manipulation
 */

/**
 * Get an element by its ID
 * @param {string} id - The ID of the element to get
 * @returns {HTMLElement} - The element with the specified ID
 */
function getElement(id) {
  return document.getElementById(id);
}

/**
 * Generate a random color in hexadecimal format
 * @returns {string} - A random color in hexadecimal format
 */
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Create a new element with the specified parameters
 * @param {string} tagName - The tag name of the element to create
 * @param {string} [text] - The text content of the element
 * @param {object} [attributes] - The attributes to add to the element
 * @returns {HTMLElement} - The created element
 */
function createElement(tagName, text, attributes) {
  const element = document.createElement(tagName);
  
  if (text) {
    element.textContent = text;
  }
  
  if (attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }
  
  return element;
}

/**
 * Add a pulse animation to an element
 * @param {HTMLElement} element - The element to animate
 */
function animatePulse(element) {
  element.classList.add('pulse-animation');
  
  // Remove the animation class after it completes
  setTimeout(() => {
    element.classList.remove('pulse-animation');
  }, 600);
}

// Add pulse animation style to document
const styleElement = document.createElement('style');
styleElement.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .pulse-animation {
    animation: pulse 0.6s ease;
  }
`;
document.head.appendChild(styleElement);