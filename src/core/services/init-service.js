/* eslint-disable no-param-reassign */
import { getTheme } from '../repository/repository';
import { getBoolTheme, createElement } from '../shared/helpers';

export default function createHtml(data) {
  const gameTheme = getTheme();

  if (!gameTheme) {
    data.body.initBody('light');
    data.settings.theme.isDark = false;
  } else {
    data.body.initBody(gameTheme);
    data.settings.theme.isDark = getBoolTheme(gameTheme);
  }

  data.pageSize = window.innerWidth;

  data.top.initNav();
  data.content.init();
  data.top.burger.el.addEventListener('click', () => data.toggleCollapse());

  data.body.el.append(data.top.header.el);
  data.body.el.append(data.content.main.el);

  data.controls = createElement('div', 'controls');

  data.content.main.el.append(data.controls);

  data.createSettings();
  data.createLevels();

  data.alert.create();
  data.body.el.append(data.alert.el);
}
