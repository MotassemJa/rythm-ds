import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

export type TagColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Compact label chip with optional dismiss action.
 */
@Component({
  tag: 'rythm-tag',
  styleUrl: 'tag.css',
  shadow: true,
})
export class Tag {
  /** Color intent. */
  @Prop() color: TagColor = 'neutral';

  /** Shows a dismiss button inside the tag. */
  @Prop() dismissible: boolean = false;

  /** Suppress sound feedback for this instance. */
  @Prop() noSound: boolean = false;

  /** Fired when the dismiss button is clicked. */
  @Event({ eventName: 'rythmDismiss' }) rythmDismiss!: EventEmitter<void>;

  private onDismissClick(ev: MouseEvent) {
    ev.stopPropagation();
    if (!this.noSound) playSound('click');
    this.rythmDismiss.emit();
  }

  render() {
    return (
      <Host>
        <span
          class={{
            tag: true,
            [`tag--${this.color}`]: true,
            'tag--dismissible': this.dismissible,
          }}
        >
          <slot />
          {this.dismissible && (
            <button
              type="button"
              class="tag__dismiss"
              aria-label="Remove"
              onClick={(ev: MouseEvent) => this.onDismissClick(ev)}
            >
              <rythm-icon name="x" size="xs" />
            </button>
          )}
        </span>
      </Host>
    );
  }
}
