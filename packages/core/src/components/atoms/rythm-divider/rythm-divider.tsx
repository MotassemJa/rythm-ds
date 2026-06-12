import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'rythm-divider',
  styleUrl: 'rythm-divider.css',
  shadow: true,
})
export class RythmDivider {
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';
  /** Optional label displayed at the centre of the divider */
  @Prop() label?: string;

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
          {this.label && (
            <span class="divider__label">{this.label}</span>
          )}
        </div>
      </Host>
    );
  }
}
