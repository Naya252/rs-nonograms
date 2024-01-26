import locationMark from './low/location-mark';
import topHat from './low/top-hat';
import celticCross from './low/celtic-cross';
import tower from './low/tower';
import camel from './low/camel';
import bird from './middle/bird';
import cat from './middle/cat';
import deer from './middle/deer';
import duck from './middle/duck';
import house from './middle/house';
import snowman from './middle/snowman';
import death from './high/death';
import horse from './high/horse';
import fish from './high/fish';
import ram from './high/ram';
import anchor from './high/anchor';

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
