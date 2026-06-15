import { Component, Prop, h, Host, Mixin } from '@stencil/core';
import { SizeMixinFactory } from '../../../mixins/size.mixin';

export type TextAs =
  | 'p' | 'span' | 'div' | 'label' | 'strong' | 'em'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextColor =
  | 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'on-brand'
  | 'success' | 'warning' | 'danger' | 'inherit';
export type TextSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * Polymorphic text element with semantic color, size, weight, and truncation.
 * Use the `as` prop to select the rendered HTML element.
 */
@Component({
  tag: 'rythm-text',
  styleUrl: 'text.css',
  shadow: true,
})
export class Text extends Mixin(SizeMixinFactory) {
  /** The HTML element to render. */
  @Prop() as: TextAs = 'span';

  /** Semantic text color. */
  @Prop() color: TextColor = 'inherit';

  /** Type-scale size step. */
  @Prop() size: TextSize = 'base';

  /** Truncate overflowing text with an ellipsis. */
  @Prop() truncate: boolean = false;

  /** Font weight. */
  @Prop() weight: TextWeight = 'regular';

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
