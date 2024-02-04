/* eslint-disable no-lonely-if */
import RANDOM_DATA from '../game-figures/templates';
import { getTheme, saveGameData, getSavedGame } from '../repository/repository';
import { getBoolTheme, getScore, createElement } from '../shared/helpers';

import * as sound from '../services/sound-service';
import * as settings from '../services/settings-service';
import * as modalService from '../services/modal-service';
import * as randomService from '../services/random-service';
import * as levelService from '../services/level-service';
import * as schemeService from '../services/schemes-service';
import * as gridService from '../services/grid-service';

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

class Game {
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

    this.changeGameEvt = null;
    this.passedGames = [];
    this.randomData = [...RANDOM_DATA];
    this.randomId = 0;

    this.isLoad = false;
    this.controls = null;
    this.wrap = null;
    this.cellTarget = null;

    this.pageSize = null;
  }

  // ================== Random game ============================================

  fillPassedGames() {
    randomService.fillPassedGames(this);
  }

  changePassedGame(id) {
    randomService.changePassedGame(id, this);
  }

  saveRandomGames() {
    randomService.saveRandomGames(this);
  }

  changeId() {
    randomService.changeId(this);
  }

  changeData(id) {
    randomService.changeData(id, this);
  }

  // ================== Settings ============================================

  createSettings() {
    settings.createSettings(this);
  }

  showScore() {
    const scoreData = getScore();
    this.openModal('score', scoreData);
  }

  // ================== Levels ==============================================

  createLevels() {
    levelService.createLevels(this);
  }

  getSpecLevel(lvl, name) {
    levelService.getSpecLevel(lvl, name, this);
  }

  selectSpecificLevel(lvl, card) {
    levelService.selectSpecificLevel(lvl, card, this);
  }

  selectCurLevel(event) {
    levelService.selectCurLevel(event, this);
  }

  selectSaved() {
    levelService.selectSaved(this);
  }

  // ================== Cards ===============================================

  createCards(crd) {
    schemeService.createCards(crd, this);
  }

  selectSpecificCard(el) {
    schemeService.selectSpecificCard(el, this);
  }

  selectCurCard(event) {
    schemeService.selectCurCard(event, this);
  }

  // ================== Grid ================================================

  createGrid(savedCard, savedTime) {
    gridService.createGrid(savedCard, savedTime, this);
  }

  fillSavedGame(data, x) {
    gridService.fillSavedGame(data, x, this);
  }

  selectCell(event, isContext) {
    gridService.selectCell(event, isContext, this);
  }

  winGame() {
    gridService.winGame(this);
  }

  // ================== Modal ===============================================

  openModal(type, scoreData) {
    modalService.openModal(type, scoreData, this);
  }

  closeModal(event) {
    modalService.closeModal(event, this);
  }

  close() {
    modalService.close(this);
  }

  callActions(action, type) {
    modalService.callActions(action, type, this);
  }

  // ================== Timer ===============================================

  createTimer(savedTime) {
    this.tmr.cleanTimer();
    this.tmr.createTimer(savedTime);

    if (this.pageSize > 767) {
      this.wrap.childNodes[1].insertAdjacentElement('afterbegin', this.tmr.timer.el);
    } else {
      this.top.nav.el.childNodes[1].insertAdjacentElement('afterbegin', this.tmr.timer.el);
    }
  }

  // ================== Actions =============================================

  createActions() {
    this.actions.createActions();
    this.actions.solution.el.addEventListener('click', () => {
      this.showSolution();
      sound.getClickSound(this.settings.volume.isSilent, this.isLoad);
    });
    this.actions.reset.el.addEventListener('click', () => {
      this.resetGame();
      sound.getClickSound(this.settings.volume.isSilent, this.isLoad);
    });
    this.actions.save.el.addEventListener('click', () => {
      this.saveGame();
      sound.getClickSound(this.settings.volume.isSilent, this.isLoad);
    });
    this.actions.random.el.addEventListener('click', () => {
      if (this.tmr.timer.isStart) {
        this.openModal('change');
      } else {
        this.changeId();
        sound.getClickSound(this.settings.volume.isSilent, this.isLoad);
      }
    });
    this.actions.saved.el.addEventListener('click', () => {
      this.selectSaved();
      sound.getClickSound(this.settings.volume.isSilent, this.isLoad);
    });

    this.wrap.childNodes[1].append(this.actions.save.el);
    this.wrap.childNodes[1].append(this.actions.reset.el);
    this.wrap.childNodes[1].append(this.actions.solution.el);
    this.wrap.childNodes[1].append(this.actions.random.el);
    this.wrap.childNodes[1].append(this.actions.saved.el);
  }

  resetGame() {
    if (this.grd.grid.el.classList.contains('lock')) {
      this.submitResetGame();
    } else {
      this.openModal('reset');
    }
  }

  submitResetGame() {
    this.tmr.cleanTimer();
    this.tmr.createTimer();
    this.grd.cleanCells();
    this.actions.resetGame();
    if (this.grd.grid.el.classList.contains('lock')) {
      this.grd.lockGrid();
    }
  }

  showSolution() {
    if (this.tmr.timer.isStart) {
      this.openModal('solution');
    } else {
      this.grd.fillScheme();
      this.actions.showSolution();
    }
  }

  submitSolution() {
    this.grd.lockGrid();
    this.tmr.cleanTimer();
    this.tmr.createTimer();
    this.grd.fillScheme();
    this.actions.showSolution();
  }

  cancelTimerPause() {
    this.tmr.timer.isStart = true;
    this.tmr.startTimer(true);
  }

  saveGame() {
    const lastSaved = getSavedGame();

    if (
      lastSaved === null ||
      (lastSaved && lastSaved.grid.join('=') !== this.grd.points.cur.join('=')) ||
      (lastSaved && lastSaved.x.join('=') !== this.grd.points.x.join('='))
    ) {
      const data = {
        lvl: this.lvl.curLevel.value,
        card: this.crd.curCard.value,
        grid: this.grd.points.cur,
        x: this.grd.points.x,
        timer: this.tmr.timer.sec,
      };
      saveGameData(data);

      this.alert.addAlert();
    } else {
      this.alert.addAlert('not');
    }
  }

  // ================== HTML ================================================
  changeGameinfo() {
    this.top.header.el.childNodes[0].childNodes[0].childNodes[2].innerHTML = `${this.crd.curCard.value}  (${this.lvl.curLevel.value})`;
  }

  changePageSize(width) {
    if (!this.pageSize) {
      this.pageSize = width;
    } else {
      if (this.pageSize <= 767 && width > 767) {
        this.pageSize = width;
        this.controls.append(this.lvl.levels.el);
        this.controls.append(this.crd.cards.el);
        this.wrap.childNodes[1].insertAdjacentElement('afterbegin', this.tmr.timer.el);

        if (this.body.el.classList.contains('burger-open')) {
          this.top.burger.el.classList.remove('cog-rotate');
          this.top.collapse.el.classList.remove('translateY');
          this.body.el.classList.remove('burger-open');
          this.content.main.el.removeAttribute('inert');
          this.top.collapse.el.classList.remove('show');
        }
      }
      if (this.pageSize > 767 && width <= 767) {
        this.pageSize = width;
        this.top.nav.el.childNodes[1].insertAdjacentElement('afterbegin', this.tmr.timer.el);
        this.top.nav.el.childNodes[3].childNodes[0].append(this.lvl.levels.el);
        this.top.nav.el.childNodes[3].childNodes[0].append(this.crd.cards.el);
      }
    }
  }

  toggleCollapse() {
    sound.getClickSound(this.settings.volume.isSilent, this.isLoad);

    if (this.top.collapse.el.classList.contains('show')) {
      this.top.burger.el.classList.remove('cog-rotate');
      this.top.collapse.el.classList.remove('translateY');

      setTimeout(() => {
        this.body.el.classList.remove('burger-open');
        this.content.main.el.removeAttribute('inert');
        this.top.collapse.el.classList.remove('show');
      }, 300);
    } else {
      this.top.burger.el.classList.add('cog-rotate');
      this.top.collapse.el.classList.add('show');
      this.body.el.classList.add('burger-open');
      this.content.main.el.setAttribute('inert', true);

      setTimeout(() => {
        this.top.collapse.el.classList.add('translateY');
      }, 300);
    }
  }

  createHtml() {
    const gameTheme = getTheme();

    if (!gameTheme) {
      this.body.initBody('light');
      this.settings.theme.isDark = false;
    } else {
      this.body.initBody(gameTheme);
      this.settings.theme.isDark = getBoolTheme(gameTheme);
    }

    this.pageSize = window.innerWidth;

    this.top.initNav();
    this.content.init();
    this.top.burger.el.addEventListener('click', () => this.toggleCollapse());

    this.body.el.append(this.top.header.el);
    this.body.el.append(this.content.main.el);

    this.controls = createElement('div', 'controls');

    this.content.main.el.append(this.controls);

    this.createSettings();
    this.createLevels();

    this.alert.create();
    this.body.el.append(this.alert.el);
  }

  init() {
    this.createHtml();
    this.fillPassedGames();
  }
}

const game = new Game();
export default game;
