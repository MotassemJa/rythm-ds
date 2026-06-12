import { Component, Prop, h, Host } from '@stencil/core';

export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
export type BadgeSize = 'sm' | 'md';

@Component({
  tag: 'rythm-badge',
  styleUrl: 'rythm-badge.css',
  shadow: true,
})
export class RythmBadge {
  @Prop() color: BadgeColor = 'neutral';
  @Prop() size: BadgeSize = 'md';
  /** Renders as a small dot with no text */
  @Prop() dot: boolean = false;

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
