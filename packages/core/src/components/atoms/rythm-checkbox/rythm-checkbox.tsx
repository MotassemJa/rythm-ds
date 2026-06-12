import { Component, Prop, Event, EventEmitter, Watch, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

let checkboxIdCounter = 0;

/**
 * Accessible checkbox with indeterminate state and optional sound feedback.
 */
@Component({
  tag: 'rythm-checkbox',
  styleUrl: 'rythm-checkbox.css',
  shadow: true,
})
export class Checkbox {
  private inputEl?: HTMLInputElement;
  private inputId = `rythm-checkbox-${++checkboxIdCounter}`;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** Disables the checkbox. */
  @Prop() disabled: boolean = false;

  /**
   * Indeterminate state — visually distinct from checked/unchecked.
   * Setting this to `false` after user interaction is handled internally.
   */
  @Prop({ mutable: true }) indeterminate: boolean = false;

  @Watch('indeterminate')
  onIndeterminateChange(val: boolean) {
    if (this.inputEl) this.inputEl.indeterminate = val;
  }

  /** Accessible label text. Falls back to slotted content when omitted. */
  @Prop() label?: string;

  /** Form field name. */
  @Prop() name?: string;

  /** Suppress sound feedback for this instance. */
  @Prop() noSound: boolean = false;

  /** Marks the field as required. */
  @Prop() required: boolean = false;

  /** Value submitted with the form when checked. */
  @Prop() value?: string;

  /** Fired when the checked state changes. */
  @Event({ eventName: 'rythmChange' }) rythmChange!: EventEmitter<boolean>;

  componentDidLoad() {
    if (this.inputEl) this.inputEl.indeterminate = this.indeterminate;
  }

  private onCheckboxChange(ev: Event) {
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
              onChange={(ev: Event) => this.onCheckboxChange(ev)}
            />
            <span class="checkbox__box" aria-hidden="true">
              {this.checked && !this.indeterminate && (
                <rythm-icon name="check" size="xs" />
              )}
              {this.indeterminate && <rythm-icon name="minus" size="xs" />}
            </span>
          </span>
          {this.label && <span class="checkbox__label">{this.label}</span>}
          {!this.label && <slot />}
        </label>
      </Host>
    );
  }
}
