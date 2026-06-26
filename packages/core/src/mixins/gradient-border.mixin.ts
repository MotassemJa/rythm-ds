import { Prop } from '@stencil/core';

export const GradientBorderMixinFactory = (Base: any) => {
  class GradientBorderMixin extends Base {
    /** Decorative primary-to-secondary gradient ring, independent of color/variant. */
    @Prop({ reflect: true }) gradientBorder: boolean = false;
  }
  return GradientBorderMixin;
};
