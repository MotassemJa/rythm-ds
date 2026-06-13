import { Component, Prop, Event, EventEmitter, Listen, Element, h, Host } from '@stencil/core';

/**
 * Groups `rythm-radio` elements into a single named fieldset, managing shared
 * selection state and propagating disabled/required to all children.
 */
@Component({
  tag: 'rythm-radio-group',
  styleUrl: 'radio-group.css',
  shadow: true,
})
export class RadioGroup {
  @Element() el!: HTMLElement;

  /** Disables all radio buttons in the group. */
  @Prop() disabled: boolean = false;

  /** Accessible `<legend>` text for the fieldset. */
  @Prop() label?: string;

  /** Shared `name` attribute applied to all `rythm-radio` children. */
  @Prop() name!: string;

  /** Layout orientation of the radio options. */
  @Prop() orientation: 'horizontal' | 'vertical' = 'vertical';

  /** Marks all radio buttons as required. */
  @Prop() required: boolean = false;

  /** Currently selected value; mutable so the group can update it on child change. */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /** Fired when the selected value changes. */
  @Event({ eventName: 'rythmChange' }) rythmChange!: EventEmitter<string>;

  componentDidLoad() {
    this.syncChildren();
  }

  componentDidUpdate() {
    this.syncChildren();
  }

  @Listen('rythmChange')
  onChildChange(ev: CustomEvent<string>) {
    ev.stopPropagation();
    this.value = ev.detail;
    this.rythmChange.emit(this.value);
    this.syncChildren();
  }

  private syncChildren() {
    const host = this.el.shadowRoot ?? this.el;
    const slot = host.querySelector('slot') as HTMLSlotElement | null;
    const assignedNodes = slot?.assignedElements() ?? [];
    assignedNodes.forEach(node => {
      const radio = node as HTMLElement & { checked: boolean; name: string; disabled: boolean };
      radio.name = this.name;
      radio.checked = node.getAttribute('value') === this.value;
      if (this.disabled) radio.disabled = true;
    });
  }

  render() {
    return (
      <Host>
        <fieldset
          class={{
            'radio-group': true,
            [`radio-group--${this.orientation}`]: true,
          }}
          disabled={this.disabled}
        >
          {this.label && (
            <legend class="radio-group__legend">{this.label}</legend>
          )}
          <div class="radio-group__options">
            <slot />
          </div>
        </fieldset>
      </Host>
    );
  }
}
