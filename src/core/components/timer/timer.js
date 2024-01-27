import TimerUI from './ui/timer-ui';

export default class Timer {
  constructor() {
    this.timer = new TimerUI();
  }

  addValues() {
    this.timer.sec = 0;
    this.timer.value = '00:00';
    this.timer.isStart = false;
    this.timer.req = null;
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
    if (this.timer.value.toString().slice(0, 2) === '00') {
      this.timer.el.innerText = this.timer.value.toString().slice(3);
    } else {
      this.timer.el.innerText = this.timer.value;
    }
  }

  cleanTimer() {
    window.cancelAnimationFrame(this.timer.req);
    this.timer.sec = 0;
    this.timer.value = '00:00';
    this.timer.isStart = false;
  }

  createTimer() {
    this.timer.createUI();
    this.addValues();
    this.timer.el.innerText = this.timer.value;
  }
}
