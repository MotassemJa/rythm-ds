import { Component, Prop, h, Host } from '@stencil/core';
import { ICONS } from '../../../utils/icons';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  tag: 'rythm-icon',
  styleUrl: 'rythm-icon.css',
  shadow: true,
})
export class RythmIcon {
  /** Name of the icon from the Rythm icon registry */
  @Prop() name!: string;

  /** Visual size */
  @Prop() size: IconSize = 'md';

  /** Accessible label. If omitted the icon is hidden from assistive tech (decorative). */
  @Prop() label?: string;

  render() {
    const path = ICONS[this.name];

    if (!path) {
      console.warn(`[rythm-icon] Unknown icon: "${this.name}"`);
    }

    const attrs = this.label
      ? { role: 'img', 'aria-label': this.label }
      : { 'aria-hidden': 'true' };

    // StencilJS innerHTML is valid on span — we embed the full SVG as a string
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
