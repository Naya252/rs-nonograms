/* eslint-disable no-param-reassign */
import { getNotificationSound, getClickSound } from './sound-service';
import { completeScore, formateTime } from '../shared/helpers';
import { setWinGame } from '../repository/repository';

export function closeModal(event, data) {
  const cls = event.target.closest('.cls');
  const submit = event.target.closest('.sbmt');
  // const backdrop = event.target.className === 'modal fade show';

  const hasInvisinleBtn = data.modal.cancelBtn.classList.contains('invisible');
  const type = data.modal.el.getAttribute('data-type');

  if (cls || (submit && hasInvisinleBtn) || (submit && !hasInvisinleBtn)) {
    getClickSound(data.settings.volume.isSilent, data.isLoad);

    if (submit && !hasInvisinleBtn) {
      data.callActions('sbmt', type);
    } else {
      data.callActions('cancel', type);
    }

    if (type === 'score') {
      data.close();

      data.modal.scoreBody.remove();
      // eslint-disable-next-line no-param-reassign
      data.modal.scoreBody = null;
      data.modal.createBody();
      if (data.tmr.timer.isStart) {
        data.cancelTimerPause();
      }
    }
  }
}

export function openModal(type, scoreData, data) {
  if (!data.modal.el) {
    data.modal.create();
    data.modal.el.addEventListener('click', (event) => {
      data.closeModal(event);
    });
  }

  if (type !== 'win') {
    getNotificationSound(data.settings.volume.isSilent);
  }

  if (scoreData && type === 'score') {
    const scrData = completeScore(scoreData);

    scrData.forEach((el, i) => {
      const time = formateTime(el.timer);
      data.modal.createRow({ ...el, num: i + 1, timer: time });
    });
  }

  data.body.el.append(data.modal.backdrop);
  data.body.el.append(data.modal.el);

  setTimeout(() => {
    data.tmr.pauseTimer();
    data.body.el.classList.add('modal-open');
    data.top.header.el.setAttribute('inert', true);
    data.content.main.el.setAttribute('inert', true);

    data.modal.open(type, data.tmr.timer.sec);
  }, 300);
}

export function close(data) {
  data.modal.close();

  data.body.el.classList.remove('modal-open');
  data.top.header.el.removeAttribute('inert');
  data.content.main.el.removeAttribute('inert');

  data.body.el.lastChild.remove();
  data.body.el.lastChild.remove();
}

export function callActions(action, type, data) {
  if ((type === 'solution' || type === 'reset' || type === 'change') && action === 'cancel') {
    data.cancelTimerPause();
    data.close();
  }

  if (type === 'solution' && action === 'sbmt') {
    data.submitSolution();
    data.close();
  }
  if (type === 'reset' && action === 'sbmt') {
    data.submitResetGame();
    data.close();
  }
  if (type === 'change' && action === 'sbmt') {
    data.tmr.timer.isStart = false;
    data.close();

    if (data.changeGameEvt) {
      if (data.changeGameEvt.target.classList.contains('scheme')) {
        data.selectCurCard(data.changeGameEvt);
      } else if (data.changeGameEvt.target.parentNode.classList.contains('scheme')) {
        data.selectCurCard(data.changeGameEvt.target.parentNode);
      } else {
        data.selectCurLevel(data.changeGameEvt);
      }
    } else {
      data.changeId();
      getClickSound(data.settings.volume.isSilent, data.isLoad);
    }
  }

  if (type === 'win') {
    data.tmr.timer.isStart = false;
    data.close();
    const dataSet = {
      lvl: data.lvl.curLevel.value,
      card: data.crd.curCard.value,
      timer: data.tmr.timer.sec,
      id: new Date(),
    };
    setWinGame(dataSet);

    setTimeout(() => {
      data.alert.addAlert('score');
      getNotificationSound(data.settings.volume.isSilent);
    }, 300);
  }
}
