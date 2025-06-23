const gridContainer = document.getElementById("gridContainer");
const resetButton = document.getElementById("resetButton");
const clearButton = document.getElementById("clearButton");
const gridSizeInput = document.getElementById("gridSize");

let gridSize = 16;

function createGrid(size) {
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // Initialize white and blank color data
    cell.style.backgroundColor = "hsl(0, 0%, 100%)";
    cell.dataset.lightness = "100";
    cell.dataset.hue = "";         // Will be assigned on first hover
    cell.dataset.saturation = "";

    cell.addEventListener("mouseover", () => {
      let lightness = parseInt(cell.dataset.lightness);
      
      // First hover: assign random color
      if (!cell.dataset.hue) {
        const randomHue = Math.floor(Math.random() * 360);       // Hue: 0-359
        const randomSaturation = Math.floor(Math.random() * 50) + 50; // Saturation: 50-100%
        cell.dataset.hue = randomHue;
        cell.dataset.saturation = randomSaturation;
      }

      const hue = cell.dataset.hue;
      const saturation = cell.dataset.saturation;

      // Darken cell
      if (lightness > 0) {
        lightness -= 10;
        lightness = Math.max(lightness, 0);
        cell.dataset.lightness = lightness;
      }

      // Apply color
      cell.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });

    gridContainer.appendChild(cell);
  }
}

function getValidGridSize() {
  const value = parseInt(gridSizeInput.value);
  if (isNaN(value) || value < 1 || value > 100) {
    alert("Please enter a number between 1 and 100.");
    return null;
  }
  return value;
}

function clearGrid() {
  const cells = gridContainer.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style.backgroundColor = "hsl(0, 0%, 100%)";
    cell.dataset.lightness = "100";
    cell.dataset.hue = "";
    cell.dataset.saturation = "";
  });
}

resetButton.addEventListener("click", () => {
  const newSize = getValidGridSize();
  if (newSize) {
    gridSize = newSize;
    createGrid(gridSize);
  }
});

clearButton.addEventListener("click", clearGrid);

createGrid(gridSize);
