import { Component, Prop, Event, EventEmitter, State, h, Host } from '@stencil/core';
import { playSound } from '../../../sounds';

let inputIdCounter = 0;

type InputType = 'text' | 'email' | 'password' | 'search' | 'url' | 'number' | 'tel';

@Component({
  tag: 'rythm-input',
  styleUrl: 'rythm-input.css',
  shadow: true,
})
export class RythmInput {
  @Prop() type: InputType = 'text';
  @Prop({ mutable: true }) value: string = '';
  @Prop() placeholder?: string;
  @Prop() label?: string;
  /** Helper text below the input */
  @Prop() hint?: string;
  /** Error message — sets aria-invalid and shows below input */
  @Prop() error?: string;
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  /** Lucide icon name displayed at the start */
  @Prop() iconStart?: string;
  /** Lucide icon name displayed at the end */
  @Prop() iconEnd?: string;
  /** Shows a clear (×) button when the field has a value */
  @Prop() clearable: boolean = false;
  @Prop() name?: string;
  @Prop() autocomplete?: string;
  @Prop() noSound: boolean = false;

  @State() private showPassword: boolean = false;

  @Event({ eventName: 'rythmInput' })  rythmInput!:  EventEmitter<string>;
  @Event({ eventName: 'rythmChange' }) rythmChange!: EventEmitter<string>;
  @Event({ eventName: 'rythmClear' })  rythmClear!:  EventEmitter<void>;
  @Event({ eventName: 'rythmFocus' })  rythmFocus!:  EventEmitter<void>;
  @Event({ eventName: 'rythmBlur' })   rythmBlur!:   EventEmitter<void>;

  private inputId    = `rythm-input-${++inputIdCounter}`;
  private hintId     = `${this.inputId}-hint`;
  private errorId    = `${this.inputId}-error`;

  private get describedBy(): string | undefined {
    const ids: string[] = [];
    if (this.hint)  ids.push(this.hintId);
    if (this.error) ids.push(this.errorId);
    return ids.length ? ids.join(' ') : undefined;
  }

  private get effectiveType(): string {
    if (this.type === 'password') return this.showPassword ? 'text' : 'password';
    return this.type;
  }

  private handleInput(ev: Event) {
    this.value = (ev.target as HTMLInputElement).value;
    this.rythmInput.emit(this.value);
  }

  private handleChange(ev: Event) {
    this.value = (ev.target as HTMLInputElement).value;
    this.rythmChange.emit(this.value);
  }

  private handleClear() {
    this.value = '';
    if (!this.noSound) playSound('click');
    this.rythmClear.emit();
  }

  render() {
    const hasError = !!this.error;
    const isPassword = this.type === 'password';
    const showClear = this.clearable && this.value && !this.disabled && !this.readonly;
    const showEndIcon = this.iconEnd && !showClear && !isPassword;

    return (
      <Host>
        <div class={{ 'field': true, [`field--${this.size}`]: true, 'field--error': hasError, 'field--disabled': this.disabled }}>
          {this.label && (
            <label class="field__label" htmlFor={this.inputId}>
              {this.label}
              {this.required && <span class="field__required" aria-hidden="true"> *</span>}
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
              onInput={(ev: Event) => this.handleInput(ev)}
              onChange={(ev: Event) => this.handleChange(ev)}
              onFocus={() => this.rythmFocus.emit()}
              onBlur={() => this.rythmBlur.emit()}
            />

            {/* Password toggle */}
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

            {/* Clear button */}
            {showClear && (
              <button
                type="button"
                class="field__icon field__icon--end field__icon--btn"
                aria-label="Clear"
                onClick={() => this.handleClear()}
              >
                <rythm-icon name="x" size="sm" />
              </button>
            )}

            {/* End icon (decorative) */}
            {showEndIcon && (
              <span class="field__icon field__icon--end" aria-hidden="true">
                <rythm-icon name={this.iconEnd!} size="sm" />
              </span>
            )}
          </div>

          {this.hint && !hasError && (
            <p id={this.hintId} class="field__hint">{this.hint}</p>
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
