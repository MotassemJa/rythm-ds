import { isEnabled } from './engine';
import { sounds, SoundType } from './sounds';

export type { SoundType };

export function playSound(type: SoundType): void {
  if (!isEnabled()) return;
  sounds[type]?.();
}

export const RythmSounds = {
  enable(): void {
    document.documentElement.setAttribute('data-rythm-sounds', 'on');
  },
  disable(): void {
    document.documentElement.removeAttribute('data-rythm-sounds');
  },
  isEnabled(): boolean {
    return isEnabled();
  },
};
