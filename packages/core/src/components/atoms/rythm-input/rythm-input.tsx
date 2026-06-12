import { Component, Prop, Event, EventEmitter, State, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

let inputIdCounter = 0;

type InputType = 'text' | 'email' | 'password' | 'search' | 'url' | 'number' | 'tel';

/**
 * Accessible text input with label, hint, error, icon slots, password visibility
 * toggle, and clearable support.
 */
@Component({
  tag: 'rythm-input',
  styleUrl: 'rythm-input.css',
  shadow: true,
})
export class Input {
  private inputId = '';
  private hintId = '';
  private errorId = '';

  /** @internal Whether the password is currently visible. */
  @State() private showPassword: boolean = false;

  /** Native `autocomplete` attribute. */
  @Prop() autocomplete?: string;

  /** Shows a clear (×) button when the field has a value. */
  @Prop() clearable: boolean = false;

  /** Disables the input. */
  @Prop() disabled: boolean = false;

  /** Error message — sets `aria-invalid` and renders below the input with `role="alert"`. */
  @Prop() error?: string;

  /** Helper text displayed below the input when there is no error. */
  @Prop() hint?: string;

  /** Lucide icon name displayed at the end of the field. */
  @Prop() iconEnd?: string;

  /** Lucide icon name displayed at the start of the field. */
  @Prop() iconStart?: string;

  /** Visible label text rendered above the input. */
  @Prop() label?: string;

  /** Form field name. */
  @Prop() name?: string;

  /** Suppress sound feedback for this instance. */
  @Prop() noSound: boolean = false;

  /** Placeholder text shown when the field is empty. */
  @Prop() placeholder?: string;

  /** Makes the input read-only. */
  @Prop() readonly: boolean = false;

  /** Marks the field as required. */
  @Prop() required: boolean = false;

  /** Visual size variant. */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Input type. Changing to `password` enables the show/hide toggle. */
  @Prop() type: InputType = 'text';

  /** Controlled value of the input. */
  @Prop({ mutable: true }) value: string = '';

  /** Fired when the input loses focus. */
  @Event({ eventName: 'rythmBlur' }) rythmBlur!: EventEmitter<void>;

  /** Fired when the value is committed (equivalent to the native `change` event). */
  @Event({ eventName: 'rythmChange' }) rythmChange!: EventEmitter<string>;

  /** Fired when the clear button is clicked. */
  @Event({ eventName: 'rythmClear' }) rythmClear!: EventEmitter<void>;

  /** Fired when the input receives focus. */
  @Event({ eventName: 'rythmFocus' }) rythmFocus!: EventEmitter<void>;

  /** Fired on every keystroke. */
  @Event({ eventName: 'rythmInput' }) rythmInput!: EventEmitter<string>;

  componentWillLoad() {
    this.inputId = `rythm-input-${++inputIdCounter}`;
    this.hintId = `${this.inputId}-hint`;
    this.errorId = `${this.inputId}-error`;
  }

  private get describedBy(): string | undefined {
    const ids: string[] = [];
    if (this.hint) ids.push(this.hintId);
    if (this.error) ids.push(this.errorId);
    return ids.length ? ids.join(' ') : undefined;
  }

  private get effectiveType(): string {
    if (this.type === 'password') return this.showPassword ? 'text' : 'password';
    return this.type;
  }

  private onInputChange(ev: Event) {
    this.value = (ev.target as HTMLInputElement).value;
    this.rythmChange.emit(this.value);
  }

  private onInputClear() {
    this.value = '';
    if (!this.noSound) playSound('click');
    this.rythmClear.emit();
  }

  private onInputInput(ev: Event) {
    this.value = (ev.target as HTMLInputElement).value;
    this.rythmInput.emit(this.value);
  }

  render() {
    const hasError = !!this.error;
    const isPassword = this.type === 'password';
    const showClear = this.clearable && this.value && !this.disabled && !this.readonly;
    const showEndIcon = this.iconEnd && !showClear && !isPassword;

    return (
      <Host>
        <div
          class={{
            field: true,
            [`field--${this.size}`]: true,
            'field--error': hasError,
            'field--disabled': this.disabled,
          }}
        >
          {this.label && (
            <label class="field__label" htmlFor={this.inputId}>
              {this.label}
              {this.required && (
                <span class="field__required" aria-hidden="true"> *</span>
              )}
            </label>
          )}

          <div class="field__control">
            {this.iconStart && (
              <span class="field__icon field__icon--start" aria-hidden="true">
                <rythm-icon name={this.iconStart} size="sm" />
              </span>
            )}

            <input
              id={this.inputId}
              class={{
                'field__input': true,
                'field__input--icon-start': !!this.iconStart,
                'field__input--icon-end': !!(showEndIcon || showClear || isPassword),
              }}
              type={this.effectiveType}
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readOnly={this.readonly}
              required={this.required}
              name={this.name}
              autoComplete={this.autocomplete}
              aria-invalid={hasError ? 'true' : undefined}
              aria-describedby={this.describedBy}
              aria-required={this.required ? 'true' : undefined}
              onInput={(ev: Event) => this.onInputInput(ev)}
              onChange={(ev: Event) => this.onInputChange(ev)}
              onFocus={() => this.rythmFocus.emit()}
              onBlur={() => this.rythmBlur.emit()}
            />

            {isPassword && (
              <button
                type="button"
                class="field__icon field__icon--end field__icon--btn"
                aria-label={this.showPassword ? 'Hide password' : 'Show password'}
                onClick={() => (this.showPassword = !this.showPassword)}
              >
                <rythm-icon name={this.showPassword ? 'eye-off' : 'eye'} size="sm" />
              </button>
            )}

            {showClear && (
              <button
                type="button"
                class="field__icon field__icon--end field__icon--btn"
                aria-label="Clear"
                onClick={() => this.onInputClear()}
              >
                <rythm-icon name="x" size="sm" />
              </button>
            )}

            {showEndIcon && (
              <span class="field__icon field__icon--end" aria-hidden="true">
                <rythm-icon name={this.iconEnd!} size="sm" />
              </span>
            )}
          </div>

          {this.hint && !hasError && (
            <p id={this.hintId} class="field__hint">
              {this.hint}
            </p>
          )}
          {hasError && (
            <p id={this.errorId} class="field__error" role="alert">
              <rythm-icon name="alert-circle" size="xs" />
              {this.error}
            </p>
          )}
        </div>
      </Host>
    );
  }
}
