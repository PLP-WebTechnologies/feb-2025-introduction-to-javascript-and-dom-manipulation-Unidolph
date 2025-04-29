/**
 * Style Manager Module
 * Handles style manipulation functionality
 */

// Array of size classes to cycle through
const sizeClasses = [
  { height: '100px', fontSize: '1rem' },
  { height: '150px', fontSize: '1.25rem' },
  { height: '200px', fontSize: '1.5rem' },
  { height: '120px', fontSize: '1.1rem' }
];

let currentSizeIndex = 0;
let currentColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();

/**
 * Initialize style manager functionality
 */
function initStyleManager() {
  const styleBox = getElement('style-box');
  const changeColorBtn = getElement('change-color-btn');
  const changeSizeBtn = getElement('change-size-btn');
  
  // Store the initial color
  currentColor = getComputedStyle(styleBox).backgroundColor;
  
  // Change color button functionality
  changeColorBtn.addEventListener('click', () => {
    const newColor = getRandomColor();
    styleBox.style.backgroundColor = newColor;
    currentColor = newColor;
    
    // Add indication that the button was clicked
    changeColorBtn.classList.add('btn-active');
    setTimeout(() => {
      changeColorBtn.classList.remove('btn-active');
    }, 200);
  });
  
  // Change size button functionality
  changeSizeBtn.addEventListener('click', () => {
    currentSizeIndex = (currentSizeIndex + 1) % sizeClasses.length;
    const { height, fontSize } = sizeClasses[currentSizeIndex];
    
    styleBox.style.height = height;
    styleBox.style.fontSize = fontSize;
    
    // Add indication that the button was clicked
    changeSizeBtn.classList.add('btn-active');
    setTimeout(() => {
      changeSizeBtn.classList.remove('btn-active');
    }, 200);
  });
  
  // Add active button style
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .btn-active {
      transform: scale(0.95);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
  `;
  document.head.appendChild(styleElement);
}