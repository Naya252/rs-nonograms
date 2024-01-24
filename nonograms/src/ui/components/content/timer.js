import createElement from '../../../shared/helpers';

export default class Timer {
  constructor(tag = 'div', className = 'timer') {
    this.timer = {
      tag,
      className,
      el: null,
      sec: 0,
      value: '00:00',
      isStart: false,
      req: null,
    };
  }

  startTimer() {
    this.timer.sec = 0;
    const rafStart = Date.now();
    const tick = () => {
      const seconds = Math.floor((Date.now() - rafStart) / 1000 || 0);

      if (this.timer.sec !== seconds) {
        this.changeTimerValue(seconds);
      }
      this.timer.req = window.requestAnimationFrame(tick);
    };

    this.timer.req = tick();
  }

  changeTimerValue(sec) {
    this.timer.sec = sec;
    this.timer.value = new Date(1970, 0, 0, 0, 0, +sec || 0).toLocaleTimeString('ru');
    this.timer.el.innerText = this.timer.value;
  }

  cleanTimer() {
    window.cancelAnimationFrame(this.timer.req);
    this.timer.sec = 0;
    this.timer.value = '00:00';
    this.timer.isStart = false;
  }

  createTimer() {
    if (!this.timer.el) {
      this.timer.el = createElement(this.timer.tag, this.timer.className);
      this.timer.el.innerText = this.timer.value;
    } else {
      this.timer.el.innerText = this.timer.value;
    }
  }
}
