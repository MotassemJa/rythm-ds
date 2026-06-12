import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

let radioIdCounter = 0;

@Component({
  tag: 'rythm-radio',
  styleUrl: 'rythm-radio.css',
  shadow: true,
})
export class RythmRadio {
  @Prop({ reflect: true }) checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() value?: string;
  @Prop() required: boolean = false;
  @Prop() noSound: boolean = false;

  @Event({ eventName: 'rythmChange' }) rythmChange!: EventEmitter<string | undefined>;

  private inputId = `rythm-radio-${++radioIdCounter}`;

  private handleChange() {
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
              onChange={() => this.handleChange()}
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
