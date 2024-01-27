import templates from '../game-figures/templates';

export function getCardsData() {
  const cards = templates.filter((el) => el.level === this.lvl.curLevel.value);
  return cards;
}

// export function saveGame(data) {}

// export function checkSavedGame(data) {}

// export function saveUsedSchemes(data) {}

// export function saveWinGame(data) {}

// export function showWinningTable(data) {}
