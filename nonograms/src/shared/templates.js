import locationMark from './game-figures/low/location-mark';
import topHat from './game-figures/low/top-hat';
import celticCross from './game-figures/low/celtic-cross';
import tower from './game-figures/low/tower';
import camel from './game-figures/low/camel';
import bird from './game-figures/middle/bird';
import cat from './game-figures/middle/cat';
import deer from './game-figures/middle/deer';
import duck from './game-figures/middle/duck';
import house from './game-figures/middle/house';
import snowman from './game-figures/middle/snowman';
import death from './game-figures/high/death';
import horse from './game-figures/high/horse';
import fish from './game-figures/high/fish';
import ram from './game-figures/high/ram';
import anchor from './game-figures/high/anchor';

const templates = [
  {
    level: 'low',
    name: 'Location mark',
    figure: [...locationMark],
  },
  { level: 'low', name: 'Top hat', figure: [...topHat] },
  { level: 'low', name: 'Celtic cross', figure: [...celticCross] },
  { level: 'low', name: 'Tower', figure: [...tower] },
  { level: 'low', name: 'Camel', figure: [...camel] },
  { level: 'middle', name: 'Bird', figure: [...bird] },
  { level: 'middle', name: 'Cat', figure: [...cat] },
  { level: 'middle', name: 'Deer', figure: [...deer] },
  { level: 'middle', name: 'Duck', figure: [...duck] },
  { level: 'middle', name: 'House', figure: [...house] },
  { level: 'middle', name: 'Snowman', figure: [...snowman] },
  { level: 'high', name: 'Death', figure: [...death] },
  { level: 'high', name: 'Horse', figure: [...horse] },
  { level: 'high', name: 'Fish', figure: [...fish] },
  { level: 'high', name: 'Ram', figure: [...ram] },
  { level: 'high', name: 'Anchor', figure: [...anchor] },
];

export default templates;
