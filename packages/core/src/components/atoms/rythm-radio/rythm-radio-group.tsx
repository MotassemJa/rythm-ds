import { Component, Prop, Event, EventEmitter, Listen, Element, h, Host } from '@stencil/core';

@Component({
  tag: 'rythm-radio-group',
  styleUrl: 'rythm-radio-group.css',
  shadow: true,
})
export class RythmRadioGroup {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) value?: string;
  @Prop() name!: string;
  @Prop() label?: string;
  @Prop() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() required: boolean = false;
  @Prop() disabled: boolean = false;

  @Event({ eventName: 'rythmChange' }) rythmChange!: EventEmitter<string>;

  @Listen('rythmChange')
  onChildChange(ev: CustomEvent<string>) {
    ev.stopPropagation();
    this.value = ev.detail;
    this.rythmChange.emit(this.value);
    this.syncChildren();
  }

  componentDidLoad() {
    this.syncChildren();
  }

  componentDidUpdate() {
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
