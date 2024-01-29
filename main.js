import './src/sass/style.scss';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Game from './src/core/view/page';

const game = new Game();
game.init();

window.addEventListener('beforeunload', (event) => game.saveRandomGames(event));
window.addEventListener('load', () => {
  game.isLoad = true;
});
