/* eslint-disable no-param-reassign */
import { saveVolume, saveTheme, getVolume } from '../repository/repository';
import { getClickSound } from './sound-service';
import { getBoolValue } from '../shared/helpers';

export function changeVolume(settings) {
  const val = settings.changeVolume();

  let textVal = 'silent';
  if (val) {
    textVal = 'silent';
  } else {
    textVal = 'loud';
  }

  saveVolume(textVal);
}

export function changeTheme(settings) {
  const val = settings.changeTheme();

  let textVal = 'dark';
  if (val) {
    textVal = 'dark';
  } else {
    textVal = 'light';
  }

  saveTheme(textVal);
  return textVal;
}

export function createSettings(data) {
  const gameVolume = getVolume();

  if (!gameVolume) {
    data.settings.volume.isSilent = false;
  } else {
    data.settings.volume.isSilent = getBoolValue(gameVolume);
  }

  data.settings.createSettings();

  data.top.collapse.el.append(data.settings.score.el);
  data.settings.score.el.addEventListener('click', () => {
    data.showScore();
    getClickSound(data.settings.volume.isSilent, data.isLoad);
  });

  data.top.collapse.el.append(data.settings.theme.el);
  data.settings.theme.el.addEventListener('click', () => {
    const val = changeTheme(data.settings);
    data.body.changeDataTheme(val);
    getClickSound(data.settings.volume.isSilent, data.isLoad);
  });

  data.top.collapse.el.append(data.settings.volume.el);
  data.settings.volume.el.addEventListener('click', () => {
    changeVolume(data.settings);
    getClickSound(data.settings.volume.isSilent, data.isLoad);
  });
}
