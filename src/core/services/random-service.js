/* eslint-disable no-param-reassign */
import RANDOM_DATA from '../game-figures/templates';
import { getPassedGames, savePassedGames, getRandomCard } from '../repository/repository';

export function fillPassedGames(data) {
  const passed = getPassedGames();
  passed.forEach((el) => data.changePassedGame(el));
}

export function changePassedGame(id, data) {
  data.passedGames.push(id);
  data.changeData(id);
  if (data.passedGames.length === 16) {
    data.passedGames = [];
    data.changeData(id);
    data.changePassedGame(id);
  }
}

export function saveRandomGames(data) {
  savePassedGames(data.passedGames);
}

export function changeId(data) {
  const idx = Math.floor(Math.random() * data.randomData.length);
  data.randomId = data.randomData[idx].id;

  data.changePassedGame(data.randomId);
  const scheme = getRandomCard(data.randomId);

  data.getSpecLevel(scheme.level, scheme.name);
}

export function changeData(id, data) {
  data.randomData = data.randomData.filter((el) => el.id !== id);
  if (data.passedGames.length === 16) {
    data.randomData = [...RANDOM_DATA];
  }
}
