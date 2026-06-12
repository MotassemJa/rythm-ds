import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

export type TagColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

@Component({
  tag: 'rythm-tag',
  styleUrl: 'rythm-tag.css',
  shadow: true,
})
export class RythmTag {
  @Prop() color: TagColor = 'neutral';
  @Prop() dismissible: boolean = false;
  @Prop() noSound: boolean = false;

  @Event({ eventName: 'rythmDismiss' }) rythmDismiss!: EventEmitter<void>;

  private handleDismiss(ev: MouseEvent) {
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
              onClick={(ev: MouseEvent) => this.handleDismiss(ev)}
            >
              <rythm-icon name="x" size="xs" />
            </button>
          )}
        </span>
      </Host>
    );
  }
}
