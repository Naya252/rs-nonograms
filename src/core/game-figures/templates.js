import locationMark from './easy/location-mark';
import topHat from './easy/top-hat';
import celticCross from './easy/celtic-cross';
import tower from './easy/tower';
import camel from './easy/camel';
import bird from './medium/bird';
import cat from './medium/cat';
import deer from './medium/deer';
import duck from './medium/duck';
import house from './medium/house';
import snowman from './medium/snowman';
import death from './hard/death';
import horse from './hard/horse';
import fish from './hard/fish';
import ram from './hard/ram';
import anchor from './hard/anchor';

const templates = [
  {
    level: 'easy',
    name: 'Location mark',
    figure: [...locationMark],
  },
  { level: 'easy', name: 'Top hat', figure: [...topHat] },
  { level: 'easy', name: 'Celtic cross', figure: [...celticCross] },
  { level: 'easy', name: 'Tower', figure: [...tower] },
  { level: 'easy', name: 'Camel', figure: [...camel] },
  { level: 'medium', name: 'Bird', figure: [...bird] },
  { level: 'medium', name: 'Cat', figure: [...cat] },
  { level: 'medium', name: 'Deer', figure: [...deer] },
  { level: 'medium', name: 'Duck', figure: [...duck] },
  { level: 'medium', name: 'House', figure: [...house] },
  { level: 'medium', name: 'Snowman', figure: [...snowman] },
  { level: 'hard', name: 'Death', figure: [...death] },
  { level: 'hard', name: 'Horse', figure: [...horse] },
  { level: 'hard', name: 'Fish', figure: [...fish] },
  { level: 'hard', name: 'Ram', figure: [...ram] },
  { level: 'hard', name: 'Anchor', figure: [...anchor] },
];

export default templates;
