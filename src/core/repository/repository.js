import templates from '../game-figures/templates';

export function getCardsData(value) {
  const cards = templates.filter((el) => el.level === value);
  return cards;
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

export function saveGame(data) {}

export function checkSavedGame(data) {}

export function saveUsedSchemes(data) {}

export function saveWinGame(data) {}

export function showWinningTable(data) {}
