import { Prop } from '@stencil/core';
import { playSound } from '../sounds';
import type { SoundType } from '../sounds';

export { SoundType };

export const SoundMixinFactory = (Base: any) => {
  class SoundMixin extends Base {
    /** Override the sound played by this component instance. */
    @Prop() sound?: SoundType;

    protected playIfEnabled(fallback: SoundType): void {
      playSound(this.sound ?? fallback);
    }
  }
  return SoundMixin;
};
