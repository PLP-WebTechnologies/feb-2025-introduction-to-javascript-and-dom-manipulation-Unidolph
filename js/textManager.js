/**
 * Text Manager Module
 * Handles text manipulation functionality
 */

// Array of sample texts to cycle through
const sampleTexts = [
  "JavaScript can change HTML content dynamically!",
  "The DOM (Document Object Model) is a programming interface for web documents.",
  "With JavaScript, you can access and change all the elements of an HTML document.",
  "Event listeners allow you to execute code when specific events occur.",
  "JavaScript was created in 10 days by Brendan Eich."
];

let currentTextIndex = 0;

/**
 * Initialize text manager functionality
 */
function initTextManager() {
  const changeTextBtn = getElement('change-text-btn');
  const dynamicText = getElement('dynamic-text');
  
  changeTextBtn.addEventListener('click', () => {
    // Update the text index
    currentTextIndex = (currentTextIndex + 1) % sampleTexts.length;
    
    // Create a fade out effect
    dynamicText.style.opacity = 0;
    
    // Wait for fade out, then change text and fade in
    setTimeout(() => {
      dynamicText.textContent = sampleTexts[currentTextIndex];
      dynamicText.style.opacity = 1;
      
      // Animate the section container
      const card = dynamicText.closest('.card');
      animatePulse(card);
    }, 300);
  });
  
  // Add transition to the text element
  dynamicText.style.transition = 'opacity 0.3s ease';
}