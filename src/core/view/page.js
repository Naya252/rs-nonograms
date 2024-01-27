/* eslint-disable no-lonely-if */
import { getCardsData, saveTheme, getTheme } from '../repository/repository';
import { getBoolTheme } from '../shared/helpers';

import Body from './body';
import Header from '../layouts/header/header';
import Main from '../layouts/main/content';

import Settings from '../components/settings/settings';
import Levels from '../components/levels/levels';
import Cards from '../components/game-cards/game-cards';
import Actions from '../components/game-actions/game-actions';
import Grid from '../components/grid/grid';
import Timer from '../components/timer/timer';

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
  }

  // ================== Settings ============================================

  createSettings() {
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
    this.settings.changeVolume();
  }

  // ================== Levels ==============================================

  createLevels() {
    this.lvl.createLevels();
    this.lvl.levels.el.addEventListener('click', (event) => this.selectCurLevel(event));
    this.content.main.el.append(this.lvl.levels.el);

    this.lvl.levels.el.childNodes[1].click();
  }

  selectCurLevel(event) {
    const isSelect = this.lvl.selectCurLevel(event);

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

  createGrid() {
    const game = this.crd.cards.data.filter((el) => el.name === this.crd.curCard.value);

    if (game.length) {
      this.grd.cleanGrid();
      this.grd.createGrid(game[0]);
      this.grd.grid.el.addEventListener('click', (event) => this.selectCell(event));
      this.content.main.el.append(this.grd.grid.el);

      this.createTimer();
      this.createActions();
    }
  }

  selectCell(event) {
    if (!this.tmr.timer.isStart) {
      this.tmr.timer.isStart = true;
      this.tmr.startTimer();
      this.actions.activateButtons();
    }

    this.grd.selectCell(event);
  }

  // ================== Timer ===============================================

  createTimer() {
    this.tmr.cleanTimer();
    this.tmr.createTimer();
    this.content.main.el.append(this.tmr.timer.el);
  }

  // ================== Actions =============================================

  createActions() {
    this.actions.createActions();
    this.actions.solution.el.addEventListener('click', () => this.showSolution());
    this.actions.reset.el.addEventListener('click', () => this.resetGame());

    this.content.main.el.append(this.actions.save.el);
    this.content.main.el.append(this.actions.solution.el);
    this.content.main.el.append(this.actions.reset.el);
  }

  resetGame() {
    this.tmr.cleanTimer();
    this.tmr.createTimer();
    this.grd.cleanCells();
    this.actions.resetGame();
  }

  showSolution() {
    this.tmr.cleanTimer();
    this.tmr.createTimer();
    this.grd.fillScheme();

    this.actions.showSolution();
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
  }

  init() {
    this.createHtml();
  }
}
