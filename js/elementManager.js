/**
 * Element Manager Module
 * Handles element manipulation functionality
 */

// Store references to DOM elements
let itemList;
let newItemInput;
let addItemBtn;
let removeItemBtn;

/**
 * Initialize element manager functionality
 */
function initElementManager() {
  // Get references to DOM elements
  itemList = getElement('item-list');
  newItemInput = getElement('new-item-input');
  addItemBtn = getElement('add-item-btn');
  removeItemBtn = getElement('remove-item-btn');
  
  // Set up event listeners
  addItemBtn.addEventListener('click', addNewItem);
  removeItemBtn.addEventListener('click', removeLastItem);
  
  // Add keyboard support for entering items
  newItemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addNewItem();
    }
  });
  
  // Add custom animation for new items
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    .new-item {
      animation: slideIn 0.3s ease forwards;
    }
  `;
  document.head.appendChild(styleElement);
}

/**
 * Add a new item to the list
 */
function addNewItem() {
  const itemText = newItemInput.value.trim();
  
  if (itemText) {
    // Create a new list item
    const newItem = createElement('li', itemText);
    newItem.classList.add('new-item');
    
    // Add event listener to toggle highlight on click
    newItem.addEventListener('click', () => {
      newItem.classList.toggle('highlight');
    });
    
    // Add the new item to the list
    itemList.appendChild(newItem);
    
    // Clear the input field
    newItemInput.value = '';
    
    // Focus back on the input for continued entry
    newItemInput.focus();
    
    // Add a success message that fades out
    showStatusMessage('Item added!', 'success');
  } else {
    // Show error message if input is empty
    showStatusMessage('Please enter an item text', 'error');
  }
}

/**
 * Remove the last item from the list
 */
function removeLastItem() {
  if (itemList.children.length > 0) {
    const lastItem = itemList.lastElementChild;
    
    // Add fadeOut class for animation
    lastItem.style.opacity = 0;
    lastItem.style.transform = 'translateX(20px)';
    
    // Wait for animation to complete before removing
    setTimeout(() => {
      itemList.removeChild(lastItem);
      showStatusMessage('Item removed!', 'warning');
    }, 300);
  } else {
    showStatusMessage('No items to remove', 'error');
  }
}

/**
 * Show a status message below the controls
 * @param {string} message - The message to display
 * @param {string} type - The type of message (success, error, warning)
 */
function showStatusMessage(message, type) {
  // Get the container element
  const container = getElement('items-container');
  
  // Check if a status message already exists
  let statusMessage = container.querySelector('.status-message');
  
  if (!statusMessage) {
    // Create a new status message element
    statusMessage = createElement('p', '', { class: 'status-message' });
    container.appendChild(statusMessage);
  }
  
  // Set the message text and type
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  
  // Add style for status messages if not already added
  if (!document.querySelector('#status-message-styles')) {
    const styleElement = createElement('style', '', { id: 'status-message-styles' });
    styleElement.textContent = `
      .status-message {
        margin-top: 10px;
        padding: 8px;
        border-radius: var(--radius);
        font-size: 0.9rem;
        opacity: 1;
        transition: opacity 0.5s ease;
      }
      
      .success {
        background-color: rgba(16, 185, 129, 0.2);
        color: #065F46;
      }
      
      .error {
        background-color: rgba(239, 68, 68, 0.2);
        color: #991B1B;
      }
      
      .warning {
        background-color: rgba(245, 158, 11, 0.2);
        color: #92400E;
      }
    `;
    document.head.appendChild(styleElement);
  }
  
  // Fade out after 3 seconds
  setTimeout(() => {
    statusMessage.style.opacity = 0;
  }, 3000);
}