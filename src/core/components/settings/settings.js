import BtnUI from './ui/btn-ui';
import { VOLUME_ICON, MUTE_ICON, MOON_ICON, SUN_ICON, BOOKMARK_ICON } from '../../shared/constants';

export default class Settings {
  constructor() {
    this.volume = new BtnUI({
      btnClass: 'volume btn btn-link mx-2',
      trueIcon: VOLUME_ICON,
      falseIcon: MUTE_ICON,
    });
    this.theme = new BtnUI({
      btnClass: 'theme btn btn-link mx-2',
      trueIcon: SUN_ICON,
      falseIcon: MOON_ICON,
    });
    this.score = new BtnUI({
      btnClass: 'score btn btn-link mx-2',
      trueIcon: BOOKMARK_ICON,
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
