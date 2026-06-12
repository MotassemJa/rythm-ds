import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

let toggleIdCounter = 0;

/**
 * Accessible toggle switch using a checkbox with `role="switch"`.
 */
@Component({
  tag: 'rythm-toggle',
  styleUrl: 'rythm-toggle.css',
  shadow: true,
})
export class Toggle {
  private inputId = `rythm-toggle-${++toggleIdCounter}`;

  /** Whether the toggle is on. */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** Disables the toggle. */
  @Prop() disabled: boolean = false;

  /** Visible label text. Falls back to slotted content when omitted. */
  @Prop() label?: string;

  /** Position of the label relative to the track. */
  @Prop() labelPosition: 'start' | 'end' = 'end';

  /** Form field name. */
  @Prop() name?: string;

  /** Suppress sound feedback for this instance. */
  @Prop() noSound: boolean = false;

  /** Fired when the toggle state changes. */
  @Event({ eventName: 'rythmChange' }) rythmChange!: EventEmitter<boolean>;

  private onToggleChange(ev: Event) {
    this.checked = (ev.target as HTMLInputElement).checked;
    if (!this.noSound) playSound(this.checked ? 'toggle-on' : 'toggle-off');
    this.rythmChange.emit(this.checked);
  }

  render() {
    const labelEl = this.label && (
      <span class="toggle__label">{this.label}</span>
    );

    return (
      <Host>
        <label
          class={{
            'toggle-wrapper': true,
            'toggle-wrapper--disabled': this.disabled,
            'toggle-wrapper--label-start': this.labelPosition === 'start',
          }}
          htmlFor={this.inputId}
        >
          {this.labelPosition === 'start' && labelEl}
          <span class="toggle__control">
            <input
              type="checkbox"
              role="switch"
              id={this.inputId}
              class="toggle__input"
              checked={this.checked}
              disabled={this.disabled}
              name={this.name}
              aria-checked={this.checked ? 'true' : 'false'}
              onChange={(ev: Event) => this.onToggleChange(ev)}
            />
            <span class="toggle__track" aria-hidden="true">
              <span class="toggle__thumb" />
            </span>
          </span>
          {this.labelPosition === 'end' && labelEl}
          {!this.label && <slot />}
        </label>
      </Host>
    );
  }
}
