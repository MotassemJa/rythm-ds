import { Component, Prop, Event, EventEmitter, h, Host, Mixin } from '@stencil/core';
import { DisabledMixinFactory } from '../../../mixins/disabled.mixin';
import { SizeMixinFactory } from '../../../mixins/size.mixin';
import { SoundMixinFactory } from '../../../mixins/sound.mixin';

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
export class Button extends Mixin(DisabledMixinFactory, SizeMixinFactory, SoundMixinFactory) {
  /** Color intent. */
  @Prop() color: ButtonColor = 'primary';

  /** Renders the button as an anchor element pointing to this URL. */
  @Prop() href?: string;

  /** Decorative primary-to-secondary gradient ring around the button, independent of `variant`/`color`. */
  @Prop({ reflect: true }) gradientBorder: boolean = false;

  /** Icon name (from rythm-icon registry) rendered after the label. */
  @Prop() iconEnd?: string;

  /** Square icon-only button — requires an `aria-label` on the host element. */
  @Prop() iconOnly: boolean = false;

  /** Icon name (from rythm-icon registry) rendered before the label. */
  @Prop() iconStart?: string;

  /** Shows a spinner and prevents interaction while an async action is in progress. */
  @Prop() loading: boolean = false;

  /** Anchor `target` attribute; applied only when `href` is set. */
  @Prop() target?: string;

  /** Native button `type` attribute. */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Visual style variant. */
  @Prop() variant: ButtonVariant = 'solid';

  /** Fired on click when the button is neither disabled nor loading. */
  @Event({ eventName: 'rythmClick' }) rythmClick!: EventEmitter<MouseEvent>;

  private soundForColor() {
    if (this.color === 'success') return 'success' as const;
    if (this.color === 'danger')  return 'error'   as const;
    if (this.color === 'warning') return 'warning' as const;
    return 'click' as const;
  }

  private onButtonClick(ev: MouseEvent) {
    if (this.disabled || this.loading) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.playIfEnabled(this.soundForColor());
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
