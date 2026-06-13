import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Interactive button with multiple variants, colors, sizes, icon slots, and loading state.
 * Renders as an `<a>` element when `href` is provided.
 */
@Component({
  tag: 'rythm-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class Button {
  /** Color intent. */
  @Prop() color: ButtonColor = 'primary';

  /** Disables interaction and applies disabled styling. */
  @Prop() disabled: boolean = false;

  /** Renders the button as an anchor element pointing to this URL. */
  @Prop() href?: string;

  /** Icon name (from rythm-icon registry) rendered after the label. */
  @Prop() iconEnd?: string;

  /** Square icon-only button — requires an `aria-label` on the host element. */
  @Prop() iconOnly: boolean = false;

  /** Icon name (from rythm-icon registry) rendered before the label. */
  @Prop() iconStart?: string;

  /** Shows a spinner and prevents interaction while an async action is in progress. */
  @Prop() loading: boolean = false;

  /** Suppress the click sound for this instance. */
  @Prop() noSound: boolean = false;

  /** Visual size. */
  @Prop() size: ButtonSize = 'md';

  /** Anchor `target` attribute; applied only when `href` is set. */
  @Prop() target?: string;

  /** Native button `type` attribute. */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Visual style variant. */
  @Prop() variant: ButtonVariant = 'solid';

  /** Fired on click when the button is neither disabled nor loading. */
  @Event({ eventName: 'rythmClick' }) rythmClick!: EventEmitter<MouseEvent>;

  private onButtonClick(ev: MouseEvent) {
    if (this.disabled || this.loading) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (!this.noSound) playSound('click');
    this.rythmClick.emit(ev);
  }

  render() {
    const isLink = !!this.href;
    const Tag = isLink ? 'a' : 'button';

    const cls = {
      btn: true,
      [`btn--${this.variant}`]: true,
      [`btn--${this.color}`]: true,
      [`btn--${this.size}`]: true,
      'btn--loading': this.loading,
      'btn--icon-only': this.iconOnly,
      'btn--disabled': this.disabled,
    };

    return (
      <Host>
        <Tag
          class={cls}
          type={!isLink ? this.type : undefined}
          href={isLink ? this.href : undefined}
          target={isLink ? this.target : undefined}
          disabled={!isLink && this.disabled ? true : undefined}
          aria-disabled={this.disabled ? 'true' : undefined}
          aria-busy={this.loading ? 'true' : undefined}
          tabindex={this.disabled ? '-1' : undefined}
          onClick={(ev: MouseEvent) => this.onButtonClick(ev)}
        >
          {this.loading && <rythm-spinner size="sm" label="Loading" />}
          {this.iconStart && !this.loading && (
            <rythm-icon name={this.iconStart} size="sm" />
          )}
          {!this.iconOnly && (
            <span class="btn__label">
              <slot />
            </span>
          )}
          {this.iconOnly && <slot />}
          {this.iconEnd && !this.loading && (
            <rythm-icon name={this.iconEnd} size="sm" />
          )}
        </Tag>
      </Host>
    );
  }
}
