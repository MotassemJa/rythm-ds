import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Visual separator between content sections, with an optional centred text label.
 */
@Component({
  tag: 'rythm-divider',
  styleUrl: 'rythm-divider.css',
  shadow: true,
})
export class Divider {
  /** Optional label displayed at the centre of the divider line. */
  @Prop() label?: string;

  /** Orientation of the divider line. */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  render() {
    const isVertical = this.orientation === 'vertical';
    return (
      <Host
        role="separator"
        aria-orientation={this.orientation}
        aria-label={this.label}
      >
        <div
          class={{
            divider: true,
            'divider--horizontal': !isVertical,
            'divider--vertical': isVertical,
            'divider--labeled': !!this.label,
          }}
        >
          {this.label && <span class="divider__label">{this.label}</span>}
        </div>
      </Host>
    );
  }
}
