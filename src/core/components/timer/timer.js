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
    const value = this.getTimerValue();
    this.timer.el.innerText = value;
  }

  getTimerValue() {
    let value;
    if (this.timer.value.toString().slice(0, 2) === '00') {
      value = this.timer.value.toString().slice(3);
    } else {
      value = this.timer.value;
    }
    return value;
  }

  pauseTimer() {
    window.cancelAnimationFrame(this.timer.req);
  }

  cleanTimer() {
    this.pauseTimer();
    this.timer.sec = 0;
    this.timer.value = '00:00';
    this.timer.isStart = false;
  }

  createTimer(savedTime) {
    this.timer.create();
    this.addValues();
    this.timer.el.innerText = this.timer.value;

    if (savedTime) {
      this.timer.sec = +savedTime;
      this.changeTimerValue(this.timer.sec);
    }
  }
}
