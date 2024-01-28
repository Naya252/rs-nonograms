import templates from '../game-figures/templates';

export function getCardsData(value) {
  const cards = templates.filter((el) => el.level === value);
  return cards;
}

export function getCardData(value) {
  const card = templates.filter((el) => el.name === value);
  return card;
}

export function saveTheme(theme) {
  localStorage.setItem('n-n-theme', theme);
}

export function getTheme() {
  const theme = localStorage.getItem('n-n-theme');
  return theme;
}

export function saveVolume(volume) {
  localStorage.setItem('n-n-volume', volume);
}

export function getVolume() {
  const volume = localStorage.getItem('n-n-volume');
  return volume;
}

export function saveGameData(data) {
  localStorage.setItem('n-n-game', JSON.stringify(data));
}

export function getSavedGame() {
  const data = localStorage.getItem('n-n-game');
  return JSON.parse(data);
}

export function getWinGame() {
  const data = localStorage.getItem('n-n-win');
  return data ? JSON.parse(data) : [];
}

export function setWinGame(data) {
  const oldArr = getWinGame();

  let newArr = [...oldArr, data];
  if (newArr.length > 5) {
    newArr = newArr.slice(1);
  }
  localStorage.setItem('n-n-win', JSON.stringify(newArr));
}

export function checkSavedGame(data) {}

export function saveUsedSchemes(data) {}
