import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  tag: 'rythm-button',
  styleUrl: 'rythm-button.css',
  shadow: true,
})
export class RythmButton {
  @Prop() variant: ButtonVariant = 'solid';
  @Prop() color: ButtonColor = 'primary';
  @Prop() size: ButtonSize = 'md';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() href?: string;
  @Prop() target?: string;
  /** Icon name (from rythm-icon registry) rendered before the label */
  @Prop() iconStart?: string;
  /** Icon name rendered after the label */
  @Prop() iconEnd?: string;
  /** Square icon-only button — requires an aria-label on the host */
  @Prop() iconOnly: boolean = false;
  /** Suppress sound for this instance */
  @Prop() noSound: boolean = false;

  @Event({ eventName: 'rythmClick' }) rythmClick!: EventEmitter<MouseEvent>;

  private handleClick(ev: MouseEvent) {
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
          onClick={(ev: MouseEvent) => this.handleClick(ev)}
        >
          {this.loading && (
            <rythm-spinner size="sm" label="Loading" />
          )}
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
