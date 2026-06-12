import { Component, Prop, Event, EventEmitter, Watch, h, Host, Element } from '@stencil/core';
import { playSound } from '../../../sounds';

let checkboxIdCounter = 0;

@Component({
  tag: 'rythm-checkbox',
  styleUrl: 'rythm-checkbox.css',
  shadow: true,
})
export class RythmCheckbox {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) checked: boolean = false;
  /** Indeterminate state — visually distinct from checked/unchecked */
  @Prop({ mutable: true }) indeterminate: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() value?: string;
  @Prop() required: boolean = false;
  @Prop() noSound: boolean = false;

  @Event({ eventName: 'rythmChange' }) rythmChange!: EventEmitter<boolean>;

  private inputId = `rythm-checkbox-${++checkboxIdCounter}`;
  private inputEl?: HTMLInputElement;

  @Watch('indeterminate')
  onIndeterminate(val: boolean) {
    if (this.inputEl) this.inputEl.indeterminate = val;
  }

  componentDidLoad() {
    if (this.inputEl) this.inputEl.indeterminate = this.indeterminate;
  }

  private handleChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    if (!this.noSound) playSound(this.checked ? 'toggle-on' : 'toggle-off');
    this.rythmChange.emit(this.checked);
  }

  render() {
    return (
      <Host>
        <label class={{ 'checkbox-wrapper': true, 'checkbox-wrapper--disabled': this.disabled }}>
          <span class="checkbox__control">
            <input
              ref={el => (this.inputEl = el)}
              type="checkbox"
              id={this.inputId}
              class="checkbox__input"
              checked={this.checked}
              disabled={this.disabled}
              name={this.name}
              value={this.value}
              required={this.required}
              aria-checked={this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'}
              onChange={(ev: Event) => this.handleChange(ev)}
            />
            <span class="checkbox__box" aria-hidden="true">
              {this.checked && !this.indeterminate && (
                <rythm-icon name="check" size="xs" />
              )}
              {this.indeterminate && (
                <rythm-icon name="minus" size="xs" />
              )}
            </span>
          </span>
          {this.label && (
            <span class="checkbox__label">{this.label}</span>
          )}
          {!this.label && <slot />}
        </label>
      </Host>
    );
  }
}
