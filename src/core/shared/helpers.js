import { getWinGame } from '../repository/repository';
/**
 * Create element for DOM
 *
 * @param {String} selector html tag
 * @param {String} className class/es for new element
 * @param {Element} parent parent of the new element
 * @return {Element} created element
 *
 */
export function createElement(selector, className, parent) {
  const element = document.createElement(selector);
  element.className = className;
  if (parent) {
    parent.append(element);
  }
  return element;
}

export class BaseClass {
  constructor(tag, className) {
    this.tag = tag;
    this.el = null;
    this.className = className;
  }

  create() {
    this.el = createElement(this.tag, this.className);
  }
}

export function getBoolTheme(text) {
  return text === 'dark';
}

export function getBoolValue(text) {
  return text === 'silent';
}

export function getScore() {
  let data = getWinGame();
  data = data.sort((a, b) => a.timer - b.timer);

  return data;
}

export function getEmptyScore() {
  return { card: null, lvl: null, timer: null };
}

export function completeScore(arr) {
  const scoreData = [...arr];
  if (scoreData.length < 5) {
    const max = 5;
    let i = scoreData.length;
    while (i < max) {
      scoreData.push(getEmptyScore());
      i += 1;
    }
  }
  return scoreData;
}

// TODO сделать единую функцию для таймера и таблицы
export function formateTime(sec) {
  let value = null;
  if (sec) {
    const time = new Date(1970, 0, 0, 0, 0, +sec || 0).toLocaleTimeString('ru');

    if (time.toString().slice(0, 2) === '00') {
      value = time.toString().slice(3);
    } else {
      value = time;
    }
  }

  return value;
}
