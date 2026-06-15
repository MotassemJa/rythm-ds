import { playSound } from '../sounds';
import type { SoundType } from '../sounds';

export const SoundMixinFactory = (Base: any) => {
  class SoundMixin extends Base {
    protected playIfEnabled(type: SoundType): void {
      playSound(type);
    }
  }
  return SoundMixin;
};
