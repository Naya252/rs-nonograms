import { saveVolume, saveTheme } from '../repository/repository';

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
