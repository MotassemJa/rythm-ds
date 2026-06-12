import { Component, Prop, h, Host } from '@stencil/core';

export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
export type BadgeSize = 'sm' | 'md';

/**
 * Compact visual indicator for status labels or numeric counts.
 */
@Component({
  tag: 'rythm-badge',
  styleUrl: 'rythm-badge.css',
  shadow: true,
})
export class Badge {
  /** Color intent. */
  @Prop() color: BadgeColor = 'neutral';

  /** Renders as a small dot with no text; hides slot content from assistive tech. */
  @Prop() dot: boolean = false;

  /** Visual size. */
  @Prop() size: BadgeSize = 'md';

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
