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
  }

  changeTheme() {
    this.theme.isDark = !this.theme.isDark;
    this.theme.changeIcon(this.theme.isDark);

    return this.theme.isDark;
  }

  changeVolume() {
    this.volume.isSilent = !this.volume.isSilent;
    this.volume.changeIcon(this.volume.isSilent);
  }

  createSettings() {
    this.volume.createSettingBtn();
    this.volume.isSilent = true;
    this.volume.changeIcon(this.volume.isSilent);
    this.volume.el.addEventListener('click', () => {
      this.changeVolume();
    });

    this.theme.createSettingBtn();
    this.theme.isDark = true;
    this.theme.changeIcon(this.theme.isDark);
    this.theme.el.addEventListener('click', () => {
      this.changeTheme();
    });
  }
}
