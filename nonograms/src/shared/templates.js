import locationMark from './game-figures/low/location-mark';
import sortingHat from './game-figures/low/sorting-hat';
import celticCross from './game-figures/low/celtic-cross';
import tower from './game-figures/low/tower';
import deer from './game-figures/low/deer';

const templates = [
  {
    level: 'low',
    name: 'Location mark',
    figure: [...locationMark],
  },
  { level: 'low', name: 'Sorting hat', figure: [...sortingHat] },
  { level: 'low', name: 'Celtic cross', figure: [...celticCross] },
  { level: 'low', name: 'Tower', figure: [...tower] },
  { level: 'low', name: 'Deer', figure: [...deer] },
];

export default templates;
