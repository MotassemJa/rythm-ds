import { Prop } from '@stencil/core';

/** Union of every size token used across all Rythm components. */
export type SizeStep = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'base';

export const SizeMixinFactory = (Base: any) => {
  class SizeMixin extends Base {
    /** Visual size. */
    @Prop() size: SizeStep = 'md';
  }
  return SizeMixin;
};
