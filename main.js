import './src/sass/style.scss';

import game from './src/core/game';

game.init();

window.addEventListener('beforeunload', (event) => game.saveRandomGames(event));
window.addEventListener('load', () => {
  game.isLoad = true;
});
window.addEventListener('resize', (event) => {
  game.changePageSize(event.target.innerWidth);
});
