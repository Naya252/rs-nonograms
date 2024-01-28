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
    id: 1,
    level: 'easy',
    name: 'Location mark',
    figure: [...locationMark],
  },
  { id: 2, level: 'easy', name: 'Top hat', figure: [...topHat] },
  { id: 3, level: 'easy', name: 'Celtic cross', figure: [...celticCross] },
  { id: 4, level: 'easy', name: 'Tower', figure: [...tower] },
  { id: 5, level: 'easy', name: 'Camel', figure: [...camel] },
  { id: 6, level: 'medium', name: 'Bird', figure: [...bird] },
  { id: 7, level: 'medium', name: 'Cat', figure: [...cat] },
  { id: 8, level: 'medium', name: 'Deer', figure: [...deer] },
  { id: 9, level: 'medium', name: 'Duck', figure: [...duck] },
  { id: 10, level: 'medium', name: 'House', figure: [...house] },
  { id: 11, level: 'medium', name: 'Snowman', figure: [...snowman] },
  { id: 12, level: 'hard', name: 'Death', figure: [...death] },
  { id: 13, level: 'hard', name: 'Horse', figure: [...horse] },
  { id: 14, level: 'hard', name: 'Fish', figure: [...fish] },
  { id: 15, level: 'hard', name: 'Ram', figure: [...ram] },
  { id: 16, level: 'hard', name: 'Anchor', figure: [...anchor] },
];

export default templates;
