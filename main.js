import './src/sass/style.scss';

import Game from './src/core/view/page';

const game = new Game();
game.init();

window.addEventListener('beforeunload', (event) => game.saveRandomGames(event));
window.addEventListener('load', () => {
  game.isLoad = true;
});
window.addEventListener('resize', (event) => {
  game.changePageSize(event.target.innerWidth);
});
