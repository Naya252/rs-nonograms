/* eslint-disable no-lonely-if */
import RANDOM_DATA from '../game-figures/templates';
import { getTheme } from '../repository/repository';
import { getBoolTheme, getScore, createElement } from '../shared/helpers';

import * as settings from '../services/settings-service';
import * as modalService from '../services/modal-service';
import * as randomService from '../services/random-service';
import * as levelService from '../services/level-service';
import * as schemeService from '../services/schemes-service';
import * as gridService from '../services/grid-service';
import * as actionsService from '../services/actions-service';
import * as resizeService from '../services/resize-service';

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
    actionsService.createActions(this);
  }

  resetGame() {
    actionsService.resetGame(this);
  }

  submitResetGame() {
    actionsService.submitResetGame(this);
  }

  showSolution() {
    actionsService.showSolution(this);
  }

  submitSolution() {
    actionsService.submitSolution(this);
  }

  cancelTimerPause() {
    actionsService.cancelTimerPause(this);
  }

  saveGame() {
    actionsService.saveGame(this);
  }

  // ================== HTML ================================================
  changeGameinfo() {
    resizeService.changeGameinfo(this);
  }

  changePageSize(width) {
    resizeService.changePageSize(width, this);
  }

  toggleCollapse() {
    resizeService.toggleCollapse(this);
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
