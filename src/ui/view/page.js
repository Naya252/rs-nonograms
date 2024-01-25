import body from '../components/body';

import content from '../components/content';

export default function initPage() {
  content.init();

  body.initBody('dark');

  body.el.append(content.el);
}
