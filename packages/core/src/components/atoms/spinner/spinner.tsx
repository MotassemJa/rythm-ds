import { Component, Prop, h, Host, Mixin } from '@stencil/core';
import { SizeMixinFactory } from '../../../mixins/size.mixin';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Animated SVG arc loading indicator. Announces its label to screen readers
 * via `role="status"`.
 */
@Component({
  tag: 'rythm-spinner',
  styleUrl: 'spinner.css',
  shadow: true,
})
export class Spinner extends Mixin(SizeMixinFactory) {
  /** Accessible label announced to screen readers. */
  @Prop() label: string = 'Loading…';

  render() {
    return (
      <Host role="status" aria-label={this.label}>
        <svg
          class={`spinner spinner--${this.size}`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            class="spinner__track"
            cx="12"
            cy="12"
            r="10"
            stroke-width="2.5"
          />
          <path
            class="spinner__arc"
            d="M12 2a10 10 0 0 1 10 10"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>
        <span class="sr-only">{this.label}</span>
      </Host>
    );
  }
}
