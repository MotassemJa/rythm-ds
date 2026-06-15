import { Component, Prop, Event, EventEmitter, Watch, h, Host, Mixin } from '@stencil/core';
import { DisabledMixinFactory } from '../../../mixins/disabled.mixin';
import { SoundMixinFactory } from '../../../mixins/sound.mixin';

let checkboxIdCounter = 0;

/**
 * Accessible checkbox with indeterminate state and optional sound feedback.
 */
@Component({
  tag: 'rythm-checkbox',
  styleUrl: 'checkbox.css',
  shadow: true,
})
export class Checkbox extends Mixin(DisabledMixinFactory, SoundMixinFactory) {
  private inputEl?: HTMLInputElement;
  private inputId = `rythm-checkbox-${++checkboxIdCounter}`;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

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
    this.playIfEnabled(this.checked ? 'toggle-on' : 'toggle-off');
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
