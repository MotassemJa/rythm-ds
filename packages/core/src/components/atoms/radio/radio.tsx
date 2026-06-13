import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

let radioIdCounter = 0;

/**
 * Single radio button intended to be used inside a `rythm-radio-group`.
 */
@Component({
  tag: 'rythm-radio',
  styleUrl: 'radio.css',
  shadow: true,
})
export class Radio {
  private inputId = `rythm-radio-${++radioIdCounter}`;

  /** Whether this option is currently selected. Managed by `rythm-radio-group`. */
  @Prop({ reflect: true }) checked: boolean = false;

  /** Disables this radio button. */
  @Prop() disabled: boolean = false;

  /** Visible label text. Falls back to slotted content when omitted. */
  @Prop() label?: string;

  /** Form group name — managed automatically by `rythm-radio-group`. */
  @Prop() name?: string;

  /** Suppress sound feedback for this instance. */
  @Prop() noSound: boolean = false;

  /** Marks the field as required. */
  @Prop() required: boolean = false;

  /** Value emitted and submitted with the form when this option is selected. */
  @Prop() value?: string;

  /** Fired when this radio button is selected. */
  @Event({ eventName: 'rythmChange' }) rythmChange!: EventEmitter<string | undefined>;

  private onRadioChange() {
    if (!this.noSound) playSound('toggle-on');
    this.rythmChange.emit(this.value);
  }

  render() {
    return (
      <Host>
        <label class={{ 'radio-wrapper': true, 'radio-wrapper--disabled': this.disabled }}>
          <span class="radio__control">
            <input
              type="radio"
              id={this.inputId}
              class="radio__input"
              checked={this.checked}
              disabled={this.disabled}
              name={this.name}
              value={this.value}
              required={this.required}
              onChange={() => this.onRadioChange()}
            />
            <span class="radio__circle" aria-hidden="true" />
          </span>
          {this.label && <span class="radio__label">{this.label}</span>}
          {!this.label && <slot />}
        </label>
      </Host>
    );
  }
}
