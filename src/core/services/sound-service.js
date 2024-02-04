import { FILL_SOUND, CLEAN_SOUND, X_SOUND, CLICK_SOUND, NOTIFICATION_SOUND, WIN_SOUND } from '../shared/constants';

export function getFillSound(isSilent) {
  if (!isSilent) {
    const audio = new Audio(FILL_SOUND);
    audio.volume = 0.3;
    audio.play();
  }
}

export function getCleanSound(isSilent) {
  if (!isSilent) {
    const audio = new Audio(CLEAN_SOUND);
    audio.volume = 0.3;
    audio.play();
  }
}

export function getXSound(isSilent) {
  if (!isSilent) {
    const audio = new Audio(X_SOUND);
    audio.volume = 0.2;
    audio.play();
  }
}

export function getClickSound(isSilent, isLoad) {
  if (!isSilent && isLoad) {
    const audio = new Audio(CLICK_SOUND);
    audio.volume = 0.8;
    audio.play();
  }
}

export function getNotificationSound(isSilent) {
  if (!isSilent) {
    const audio = new Audio(NOTIFICATION_SOUND);
    audio.volume = 0.8;
    audio.play();
  }
}

export function getWinSound(isSilent) {
  if (!isSilent) {
    const audio = new Audio(WIN_SOUND);
    audio.volume = 0.3;
    audio.play();
  }
}
