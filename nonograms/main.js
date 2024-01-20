import './src/sass/style.scss';
import arr from './src/ui/templates/templates';

function toggleCell(cell) {
  cell.classList.toggle('black');
  // Add logic to check for game completion
  // Add logic for right-click (context menu) and other features
  // Add logic for game duration, sound effects, and saving game state
}

document.addEventListener('DOMContentLoaded', () => {
  const gridSize = arr[0].figure.length;
  console.log(gridSize);
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('grid-container');

  arr[0].figure.forEach((line, i) => {
    line.forEach((cell, idx) => {
      const el = document.createElement('div');
      el.classList.add('cell');
      if (cell.name === 'cell') {
        el.addEventListener('click', () => toggleCell(el));
      }
      if (cell.name === 'hint') {
        el.innerText = cell.value;
        if (cell.border?.includes('right')) {
          el.style.borderRight = '2px solid #000';
        }
        if (cell.border?.includes('bottom')) {
          el.style.borderBottom = '2px solid #000';
        }
      }
      gridContainer.appendChild(el);
    });
  });

  document.body.appendChild(gridContainer);
});
