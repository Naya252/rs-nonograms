export default class Grid {
  constructor(tag = 'div', className = 'grid-container') {
    this.grid = {
      tag,
      className,
      el: null,
      game: null,
      items: [],
    };
  }

  createGrid(game) {
    const gridWidth = game.figure[0].length;

    if (this.grid.el) {
      // eslint-disable-next-line prefer-destructuring
      let length = this.grid.items.length;

      while (length > 0) {
        length -= 1;
        this.grid.items[length].remove();
      }
    } else {
      this.grid.el = document.createElement('div');
      this.grid.el.classList.add('grid-container');
    }

    this.grid.el.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;

    game.figure.forEach((line) => {
      line.forEach((cell) => {
        const el = document.createElement('div');
        el.classList.add('cell');
        if (cell.name === 'cell') {
          el.addEventListener('click', () => el.classList.toggle('black'));
        }
        if (cell.name === 'hint') {
          el.innerText = cell.value;
          el.classList.add('hint');
          if (!cell.value) {
            el.classList.add('spirit');
          }

          if (cell.border?.includes('right')) {
            el.style.borderRight = '4px solid #000';
          }
          if (cell.border?.includes('bottom')) {
            el.style.borderBottom = '4px solid #000';
          }
        }
        this.grid.items.push(el);
        this.grid.el.appendChild(el);
      });
    });
  }
}
