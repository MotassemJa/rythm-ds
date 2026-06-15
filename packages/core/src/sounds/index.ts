import { isEnabled } from './engine';
import { sounds, SoundType } from './sounds';
import { rythmConfig } from '../store/config.store';

export type { SoundType };

export function playSound(type: SoundType): void {
  if (!isEnabled()) return;
  sounds[type]?.();
}

/** @deprecated Use `RythmSound` from the main package export instead. */
export const RythmSounds = {
  enable(): void   { rythmConfig.sound = true; },
  disable(): void  { rythmConfig.sound = false; },
  isEnabled(): boolean { return rythmConfig.sound; },
};
