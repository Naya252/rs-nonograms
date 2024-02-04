/* eslint-disable no-param-reassign */
import { getClickSound } from './sound-service';

export function changeGameinfo(data) {
  data.top.header.el.childNodes[0].childNodes[0].childNodes[2].innerHTML = `${data.crd.curCard.value}  (${data.lvl.curLevel.value})`;
}

export function changePageSize(width, data) {
  if (!data.pageSize) {
    data.pageSize = width;
  } else {
    if (data.pageSize <= 767 && width > 767) {
      data.pageSize = width;
      data.controls.append(data.lvl.levels.el);
      data.controls.append(data.crd.cards.el);
      data.wrap.childNodes[1].insertAdjacentElement('afterbegin', data.tmr.timer.el);

      if (data.body.el.classList.contains('burger-open')) {
        data.top.burger.el.classList.remove('cog-rotate');
        data.top.collapse.el.classList.remove('translateY');
        data.body.el.classList.remove('burger-open');
        data.content.main.el.removeAttribute('inert');
        data.top.collapse.el.classList.remove('show');
      }
    }
    if (data.pageSize > 767 && width <= 767) {
      data.pageSize = width;
      data.top.nav.el.childNodes[1].insertAdjacentElement('afterbegin', data.tmr.timer.el);
      data.top.nav.el.childNodes[3].childNodes[0].append(data.lvl.levels.el);
      data.top.nav.el.childNodes[3].childNodes[0].append(data.crd.cards.el);
    }
  }
}

export function toggleCollapse(data) {
  getClickSound(data.settings.volume.isSilent, data.isLoad);

  if (data.top.collapse.el.classList.contains('show')) {
    data.top.burger.el.classList.remove('cog-rotate');
    data.top.collapse.el.classList.remove('translateY');

    setTimeout(() => {
      data.body.el.classList.remove('burger-open');
      data.content.main.el.removeAttribute('inert');
      data.top.collapse.el.classList.remove('show');
    }, 300);
  } else {
    data.top.burger.el.classList.add('cog-rotate');
    data.top.collapse.el.classList.add('show');
    data.body.el.classList.add('burger-open');
    data.content.main.el.setAttribute('inert', true);

    setTimeout(() => {
      data.top.collapse.el.classList.add('translateY');
    }, 300);
  }
}
