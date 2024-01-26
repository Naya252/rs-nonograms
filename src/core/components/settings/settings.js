import createElement from '../../shared/helpers';

export default class Settings {
  constructor() {
    this.iconTag = 'i';
    this.iconClass = 'bi';
    this.volume = {
      tag: 'button',
      className: 'volume btn btn-link mx-2',
      el: null,
      isSilent: true,
      muteIconClass: 'bi-volume-mute',
      volumeIconClass: 'bi-volume-up',
      icon: null,
    };
    this.theme = {
      tag: 'button',
      className: 'theme btn btn-link mx-2',
      el: null,
      isDark: true,
      sunIcon: 'bi-brightness-high',
      moonIcon: 'bi-moon',
      sunEl: null,
      moonEl: null,
    };
  }

  changeVolumeIcon() {
    if (this.volume.isSilent) {
      this.volume.icon.classList.remove('bi-volume-mute');
      this.volume.icon.classList.add('bi-volume-up');
    } else {
      this.volume.icon.classList.add('bi-volume-mute');
      this.volume.icon.classList.remove('bi-volume-up');
    }
  }

  changeThemeIcon() {
    if (this.theme.isDark) {
      this.theme.icon.classList.add('bi-brightness-high');
      this.theme.icon.classList.remove('bi-moon');
    } else {
      this.theme.icon.classList.remove('bi-brightness-high');
      this.theme.icon.classList.add('bi-moon');
    }
  }

  changeTheme() {
    this.theme.isDark = !this.theme.isDark;
    this.changeThemeIcon();

    return this.theme.isDark;
  }

  changeVolume() {
    this.volume.isSilent = !this.volume.isSilent;
    this.changeVolumeIcon();
  }

  createSettings() {
    this.volume.el = createElement(this.volume.tag, this.volume.className);
    this.volume.icon = createElement(this.iconTag, this.iconClass);
    this.volume.el.append(this.volume.icon);
    this.changeVolumeIcon();
    this.volume.el.addEventListener('click', () => {
      this.changeVolume();
    });

    this.theme.el = createElement(this.theme.tag, this.theme.className);
    this.theme.icon = createElement(this.iconTag, this.iconClass);
    this.theme.el.append(this.theme.icon);
    this.changeThemeIcon();
    this.theme.el.addEventListener('click', () => {
      this.changeTheme();
    });
  }
}
