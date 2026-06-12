import { Component, Prop, h, Host } from '@stencil/core';

export type TextSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type TextAs = 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'on-brand' | 'success' | 'warning' | 'danger' | 'inherit';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

@Component({
  tag: 'rythm-text',
  styleUrl: 'rythm-text.css',
  shadow: true,
})
export class RythmText {
  /** The HTML element to render */
  @Prop() as: TextAs = 'span';
  /** Type scale size */
  @Prop() size: TextSize = 'base';
  /** Semantic color */
  @Prop() color: TextColor = 'inherit';
  /** Font weight */
  @Prop() weight: TextWeight = 'regular';
  /** Truncate text with ellipsis */
  @Prop() truncate: boolean = false;

  render() {
    const Tag = this.as;
    return (
      <Host>
        <Tag
          class={{
            text: true,
            [`text--${this.size}`]: true,
            [`text--${this.color}`]: true,
            [`text--${this.weight}`]: true,
            'text--truncate': this.truncate,
          }}
        >
          <slot />
        </Tag>
      </Host>
    );
  }
}
