import { Component, Prop, h, Host, Mixin } from '@stencil/core';
import { ICONS } from '../../../utils/icons';
import { SizeMixinFactory } from '../../../mixins/size.mixin';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Renders a single icon from the Rythm icon registry as an inline SVG.
 * When `label` is omitted the icon is treated as decorative and hidden from
 * assistive technology.
 */
@Component({
  tag: 'rythm-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class Icon extends Mixin(SizeMixinFactory) {
  /**
   * Accessible label announced by screen readers.
   * Omit for decorative icons — the element will be aria-hidden automatically.
   */
  @Prop() label?: string;

  /** Name of the icon from the Rythm icon registry. */
  @Prop() name!: string;

  render() {
    const path = ICONS[this.name];

    if (!path) {
      console.warn(`[rythm-icon] Unknown icon: "${this.name}"`);
    }

    const attrs = this.label
      ? { role: 'img', 'aria-label': this.label }
      : { 'aria-hidden': 'true' };

    const svgString = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;display:block;">${path ?? ''}</svg>`;

    return (
      <Host>
        <span
          class={`icon icon--${this.size}`}
          innerHTML={svgString}
          {...attrs}
        />
      </Host>
    );
  }
}
