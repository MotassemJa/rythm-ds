import { Prop } from '@stencil/core';

export const DisabledMixinFactory = (Base: any) => {
  class DisabledMixin extends Base {
    /** Disables interaction and applies disabled styling. */
    @Prop() disabled: boolean = false;
  }
  return DisabledMixin;
};
