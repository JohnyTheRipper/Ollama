// script.js
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('code-flash');
  const ctx = canvas.getContext('2d');

  // Set the canvas dimensions
  canvas.width = 400;
  canvas.height = 400;

  // Define some constants for our code flash effect
  const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const FONT_SIZE = 18;
  const FONT_FAMILY = 'monospace';
  const nordicColors = [
    '#8FBCBB', // Frost
    '#5E81AC', // Berg
    '#434C5E', // Night
    '#3B4252', // Dark
    '#2E3440', // Deep
  ];

  function getRandomNordicColor(alpha = 1) {
    const randomIndex = Math.floor(Math.random() * nordicColors.length);
    return alpha === 1 ? nordicColors[randomIndex] : `${nordicColors[randomIndex]}${alpha}`;
  }

  const TEXT_COLOR = getRandomNordicColor(); // Update to random Nordic color
  const BACKGROUND_COLOR = 'transparent';
  const CHANGE_RATE = 0.01; // adjust this value to control the speed of letter changes
  const GLOW_COLOR = getRandomNordicColor(0.2); // Update to random Nordic color with alpha
  const GLOW_RADIUS = 2; // adjust this value to control the glow radius

  // Initialize a 2D array to store our grid of letters
  let grid = [];
  for (let i = 0; i < 21; i++) {
    grid.push([]);
    for (let j = 0; j < 21; j++) {
      grid[grid.length - 1].push(getRandomCharacter());
    }
  }

  // Function to generate a random character
  function getRandomCharacter() {
    return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  }

  // Main animation loop
  function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each letter in the grid with a glow effect
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        // Draw the glow effect
        ctx.shadowColor = GLOW_COLOR;
        ctx.shadowBlur = GLOW_RADIUS;
        ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
        ctx.fillStyle = TEXT_COLOR;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(grid[i][j], j * FONT_SIZE + (400 - 21 * FONT_SIZE) / 2, i * FONT_SIZE + (400 - 21 * FONT_SIZE) / 2);

        // Remove the glow effect for the next letter
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    }

    // Randomly change the letters
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (Math.random() < CHANGE_RATE) {
          grid[i][j] = getRandomCharacter();
        }
      }
    }

    // Request the next animation frame
    requestAnimationFrame(animate);
  }

  // Start the animation
  animate();
});
