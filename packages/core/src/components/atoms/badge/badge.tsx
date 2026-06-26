import { Component, Prop, h, Host, Mixin } from '@stencil/core';
import { SizeMixinFactory } from '../../../mixins/size.mixin';

export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
export type BadgeSize = 'sm' | 'md';

/**
 * Compact visual indicator for status labels or numeric counts.
 */
@Component({
  tag: 'rythm-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class Badge extends Mixin(SizeMixinFactory) {
  /** Color intent. */
  @Prop() color: BadgeColor = 'neutral';

  /** Renders as a small dot with no text; hides slot content from assistive tech. */
  @Prop() dot: boolean = false;

  /** Decorative primary-to-secondary gradient ring around the badge, independent of `color`. */
  @Prop({ reflect: true }) gradientBorder: boolean = false;

  render() {
    return (
      <Host>
        <span
          class={{
            badge: true,
            [`badge--${this.color}`]: true,
            [`badge--${this.size}`]: true,
            'badge--dot': this.dot,
          }}
          aria-hidden={this.dot ? 'true' : undefined}
        >
          {!this.dot && <slot />}
        </span>
      </Host>
    );
  }
}
