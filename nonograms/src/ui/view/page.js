import body from '../components/body';
import header from '../components/header';
import content from '../components/wrapper';

export default function initPage() {
  header.initNav();
  content.init();

  body.initBody('dark');
  body.el.append(header.el);
  body.el.append(content.el);
}
