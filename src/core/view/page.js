import body from './body';

import content from '../layouts/main/content';

export default function initPage() {
  content.init();

  body.initBody('dark');

  body.el.append(content.el);
}
