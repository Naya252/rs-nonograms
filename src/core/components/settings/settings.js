import BtnUI from './ui/btn-ui';

export default class Settings {
  constructor() {
    this.volume = new BtnUI({
      btnClass: 'volume btn btn-link mx-2',
      trueIcon: 'bi-volume-mute',
      falseIcon: 'bi-volume-up',
    });
    this.theme = new BtnUI({
      btnClass: 'theme btn btn-link mx-2',
      trueIcon: 'bi-moon',
      falseIcon: 'bi-brightness-high',
    });
    this.score = new BtnUI({
      btnClass: 'score btn btn-link mx-2',
      trueIcon: 'bi-bookmark-star',
      falseIcon: 'bi-bookmark-star-fill',
    });
  }

  changeTheme() {
    this.theme.isDark = !this.theme.isDark;
    this.theme.changeIcon(this.theme.isDark);

    return this.theme.isDark;
  }

  changeVolume() {
    this.volume.isSilent = !this.volume.isSilent;
    this.volume.changeIcon(this.volume.isSilent);

    return this.volume.isSilent;
  }

  createSettings() {
    this.score.create();
    this.score.changeIcon();

    this.volume.create();
    this.volume.changeIcon(this.volume.isSilent);

    this.theme.create();
    this.theme.changeIcon(this.theme.isDark);
  }
}
