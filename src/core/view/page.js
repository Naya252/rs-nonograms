/* eslint-disable no-lonely-if */
import {
  getCardsData,
  getCardData,
  saveTheme,
  getTheme,
  saveVolume,
  getVolume,
  saveGameData,
  getSavedGame,
} from '../repository/repository';
import { getBoolTheme, getBoolValue } from '../shared/helpers';
import { FILL_SOUND, CLEAN_SOUND, X_SOUND } from '../shared/constants';

import Body from './body';
import Header from '../layouts/header/header';
import Main from '../layouts/main/content';

import Settings from '../components/settings/settings';
import Levels from '../components/levels/levels';
import Cards from '../components/game-cards/game-cards';
import Actions from '../components/game-actions/game-actions';
import Grid from '../components/grid/grid';
import Timer from '../components/timer/timer';

import Modal from '../components/modal/modal';
import Alert from '../components/alert/alert';

export default class Game {
  constructor() {
    this.body = new Body();
    this.top = new Header();
    this.content = new Main();

    this.settings = new Settings();
    this.lvl = new Levels();
    this.crd = new Cards();

    this.grd = new Grid();
    this.tmr = new Timer();
    this.actions = new Actions();

    this.modal = new Modal();
    this.alert = new Alert();
  }

  // ================== Settings ============================================

  createSettings() {
    const gameVolume = getVolume();

    if (!gameVolume) {
      this.settings.volume.isSilent = true;
    } else {
      this.settings.volume.isSilent = getBoolValue(gameVolume);
    }

    this.settings.createSettings();
    this.top.collapse.el.append(this.settings.theme.el);
    this.settings.theme.el.addEventListener('click', () => {
      this.changeTheme();
    });

    this.top.collapse.el.append(this.settings.volume.el);
    this.settings.volume.el.addEventListener('click', () => {
      this.changeVolume();
    });
  }

  changeTheme() {
    const val = this.settings.changeTheme();

    let textVal = 'dark';
    if (val) {
      textVal = 'dark';
    } else {
      textVal = 'light';
    }

    this.body.changeDataTheme(textVal);
    saveTheme(textVal);
  }

  changeVolume() {
    const val = this.settings.changeVolume();

    let textVal = 'silent';
    if (val) {
      textVal = 'silent';
    } else {
      textVal = 'loud';
    }
    saveVolume(textVal);
  }

  // ================== Levels ==============================================

  createLevels() {
    this.lvl.createLevels();
    this.lvl.levels.el.addEventListener('click', (event) => this.selectCurLevel(event));
    this.content.main.el.append(this.lvl.levels.el);

    const saved = getSavedGame();
    if (saved) {
      this.addSavedGameLvl();
    }

    this.lvl.levels.el.childNodes[1].click();
  }

  addSavedGameLvl() {
    if (this.lvl.levels.el.childNodes.length === 8) {
      this.lvl.levels.createLevel({ name: 'saved' });
    }
  }

  selectCurLevel(event) {
    const isSelect = this.lvl.selectCurLevel(event);

    if (this.lvl.curLevel.value === 'saved') {
      this.selectSaved();
    } else {
      if (isSelect) {
        this.crd.cleanCards();
        this.createCards();
      } else {
        if (this.grd.grid.el) {
          this.grd.cleanGrid();
          this.actions.removeActions();
        }
      }
    }
  }

  selectSaved() {
    this.crd.cleanCards();
    this.grd.cleanGrid();
    this.actions.removeActions();
    this.tmr.cleanTimer();

    const data = getSavedGame();
    this.createGrid(data.card, data.timer);
    this.fillSavedGame(data.grid);
  }

  // ================== Cards ===============================================

  createCards() {
    const cards = getCardsData(this.lvl.curLevel.value);

    this.crd.createCards(cards);
    this.crd.cards.el.addEventListener('click', (event) => this.selectCurCard(event));
    this.content.main.el.append(this.crd.cards.el);

    this.crd.cards.el.childNodes[0].click();
  }

  selectCurCard(event) {
    const isSelect = this.crd.selectCurCard(event);

    if (isSelect) {
      this.createGrid();
    }
  }

  // ================== Grid ================================================

  createGrid(savedCard, savedTime) {
    let game;

    if (savedCard) {
      game = getCardData(savedCard);
    } else {
      game = this.crd.cards.data.filter((el) => el.name === this.crd.curCard.value);
    }

    if (game.length) {
      this.grd.cleanGrid();
      this.grd.createGrid(game[0]);
      this.grd.grid.el.addEventListener('click', (event) => this.selectCell(event));
      this.content.main.el.append(this.grd.grid.el);

      this.createTimer(savedTime);
      this.createActions();
    }
  }

  fillSavedGame(data) {
    this.grd.points.cur = data;
    this.grd.fillSavedCells();
  }

  selectCell(event) {
    if (!this.grd.grid.el.classList.contains('lock')) {
      const cell = event.target.closest('.cell');
      if (cell.hasAttribute('id')) {
        if (!this.tmr.timer.isStart) {
          this.tmr.timer.isStart = true;
          this.tmr.startTimer();
          this.actions.activateButtons();
        }

        const { isFill, isWin } = this.grd.selectCell(event);

        // this.audioX = new Audio(X_SOUND);

        if (!this.settings.volume.isSilent) {
          if (isFill) {
            new Audio(FILL_SOUND).play();
          } else {
            new Audio(CLEAN_SOUND).play();
          }
        }

        if (isWin) {
          this.winGame();
        }
      }
    }
  }

  winGame() {
    this.grd.lockGrid();
    this.tmr.pauseTimer();
    this.actions.addDisabled();
    this.actions.activeReset();

    this.openModal();
  }

  // ================== Modal ===============================================

  openModal() {
    if (!this.modal.el) {
      this.modal.create();
      this.modal.el.addEventListener('click', (event) => this.closeModal(event));
    }

    this.body.el.append(this.modal.backdrop);
    this.body.el.append(this.modal.el);

    setTimeout(() => {
      this.body.el.classList.add('modal-open');
      this.top.header.el.setAttribute('inert', true);
      this.content.main.el.setAttribute('inert', true);
      this.modal.open('Great!', `You have solved the nonogram in ${this.tmr.timer.sec} seconds!`);
    }, 300);
  }

  closeModal(event) {
    const button = event.target.closest('.cls');
    const backdrop = event.target.className === 'modal fade show';

    if (button || backdrop) {
      this.modal.close();

      this.body.el.classList.remove('modal-open');
      this.top.header.el.removeAttribute('inert');
      this.content.main.el.removeAttribute('inert');

      this.body.el.lastChild.remove();
      this.body.el.lastChild.remove();

      setTimeout(() => {
        this.alert.addAlert('score');
      }, 300);
    }
  }

  // ================== Timer ===============================================

  createTimer(savedTime) {
    this.tmr.cleanTimer();
    this.tmr.createTimer(savedTime);
    this.content.main.el.append(this.tmr.timer.el);
  }

  // ================== Actions =============================================

  createActions() {
    this.actions.createActions();
    this.actions.solution.el.addEventListener('click', () => this.showSolution());
    this.actions.reset.el.addEventListener('click', () => this.resetGame());
    this.actions.save.el.addEventListener('click', () => this.saveGame());

    this.content.main.el.append(this.actions.save.el);
    this.content.main.el.append(this.actions.solution.el);
    this.content.main.el.append(this.actions.reset.el);
  }

  resetGame() {
    this.tmr.cleanTimer();
    this.tmr.createTimer();
    this.grd.cleanCells();
    this.grd.lockGrid();
    this.actions.resetGame();
  }

  showSolution() {
    this.grd.lockGrid();
    this.tmr.cleanTimer();
    this.tmr.createTimer();
    this.grd.fillScheme();

    this.actions.showSolution();
  }

  saveGame() {
    const lastSaved = getSavedGame();
    console.log(lastSaved);
    if (lastSaved === null || (lastSaved && lastSaved.grid.join('=') !== this.grd.points.cur.join('='))) {
      const data = {
        lvl: this.lvl.curLevel.value,
        card: this.crd.curCard.value,
        grid: this.grd.points.cur,
        timer: this.tmr.timer.sec,
      };
      saveGameData(data);

      this.addSavedGameLvl();

      this.alert.addAlert();
    } else {
      this.alert.addAlert('not');
    }
  }

  // ================== HTML ================================================
  createHtml() {
    const gameTheme = getTheme();

    if (!gameTheme) {
      this.body.initBody('dark');
      this.settings.theme.isDark = true;
    } else {
      this.body.initBody(gameTheme);
      this.settings.theme.isDark = getBoolTheme(gameTheme);
    }

    this.top.initNav();
    this.content.init();

    this.body.el.append(this.top.header.el);
    this.body.el.append(this.content.main.el);

    this.createSettings();
    this.createLevels();

    this.alert.create();
    this.body.el.append(this.alert.el);
  }

  init() {
    this.createHtml();

    // const myAlert = document.getElementById('myAlert');
    // myAlert.addEventListener('closed.bs.alert', (event) => {
    //   console.log('fff');
    //   // do something, for instance, explicitly move focus to the most appropriate element,
    //   // so it doesn't get lost/reset to the start of the page
    //   // document.getElementById('...').focus()
    // });
  }
}
