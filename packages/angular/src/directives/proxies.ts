/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@rythm-ds/core';


@ProxyCmp({
  inputs: ['alt', 'icon', 'initials', 'shape', 'size', 'src']
})
@Component({
  selector: 'rythm-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alt', 'icon', 'initials', 'shape', 'size', 'src'],
})
export class RythmAvatar {
  protected el: HTMLRythmAvatarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface RythmAvatar extends Components.RythmAvatar {}


@ProxyCmp({
  inputs: ['color', 'dot', 'size']
})
@Component({
  selector: 'rythm-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'dot', 'size'],
})
export class RythmBadge {
  protected el: HTMLRythmBadgeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface RythmBadge extends Components.RythmBadge {}


@ProxyCmp({
  inputs: ['color', 'disabled', 'href', 'iconEnd', 'iconOnly', 'iconStart', 'loading', 'noSound', 'size', 'target', 'type', 'variant']
})
@Component({
  selector: 'rythm-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'disabled', 'href', 'iconEnd', 'iconOnly', 'iconStart', 'loading', 'noSound', 'size', 'target', 'type', 'variant'],
})
export class RythmButton {
  protected el: HTMLRythmButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['rythmClick']);
  }
}


export declare interface RythmButton extends Components.RythmButton {
  /**
   * Fired on click when the button is neither disabled nor loading.
   */
  rythmClick: EventEmitter<CustomEvent<MouseEvent>>;
}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'indeterminate', 'label', 'name', 'noSound', 'required', 'value']
})
@Component({
  selector: 'rythm-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'indeterminate', 'label', 'name', 'noSound', 'required', 'value'],
})
export class RythmCheckbox {
  protected el: HTMLRythmCheckboxElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['rythmChange']);
  }
}


export declare interface RythmCheckbox extends Components.RythmCheckbox {
  /**
   * Fired when the checked state changes.
   */
  rythmChange: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['label', 'orientation']
})
@Component({
  selector: 'rythm-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'orientation'],
})
export class RythmDivider {
  protected el: HTMLRythmDividerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface RythmDivider extends Components.RythmDivider {}


@ProxyCmp({
  inputs: ['label', 'name', 'size']
})
@Component({
  selector: 'rythm-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'name', 'size'],
})
export class RythmIcon {
  protected el: HTMLRythmIconElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface RythmIcon extends Components.RythmIcon {}


@ProxyCmp({
  inputs: ['autocomplete', 'clearable', 'disabled', 'error', 'hint', 'iconEnd', 'iconStart', 'label', 'name', 'noSound', 'placeholder', 'readonly', 'required', 'size', 'type', 'value']
})
@Component({
  selector: 'rythm-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autocomplete', 'clearable', 'disabled', 'error', 'hint', 'iconEnd', 'iconStart', 'label', 'name', 'noSound', 'placeholder', 'readonly', 'required', 'size', 'type', 'value'],
})
export class RythmInput {
  protected el: HTMLRythmInputElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['rythmBlur', 'rythmChange', 'rythmClear', 'rythmFocus', 'rythmInput']);
  }
}


export declare interface RythmInput extends Components.RythmInput {
  /**
   * Fired when the input loses focus.
   */
  rythmBlur: EventEmitter<CustomEvent<void>>;
  /**
   * Fired when the value is committed (equivalent to the native `change` event).
   */
  rythmChange: EventEmitter<CustomEvent<string>>;
  /**
   * Fired when the clear button is clicked.
   */
  rythmClear: EventEmitter<CustomEvent<void>>;
  /**
   * Fired when the input receives focus.
   */
  rythmFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Fired on every keystroke.
   */
  rythmInput: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'label', 'name', 'noSound', 'required', 'value']
})
@Component({
  selector: 'rythm-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'label', 'name', 'noSound', 'required', 'value'],
})
export class RythmRadio {
  protected el: HTMLRythmRadioElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['rythmChange']);
  }
}


export declare interface RythmRadio extends Components.RythmRadio {
  /**
   * Fired when this radio button is selected.
   */
  rythmChange: EventEmitter<CustomEvent<string | undefined>>;
}


@ProxyCmp({
  inputs: ['disabled', 'label', 'name', 'orientation', 'required', 'value']
})
@Component({
  selector: 'rythm-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'label', 'name', 'orientation', 'required', 'value'],
})
export class RythmRadioGroup {
  protected el: HTMLRythmRadioGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['rythmChange']);
  }
}


export declare interface RythmRadioGroup extends Components.RythmRadioGroup {
  /**
   * Fired when the selected value changes.
   */
  rythmChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['label', 'size']
})
@Component({
  selector: 'rythm-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'size'],
})
export class RythmSpinner {
  protected el: HTMLRythmSpinnerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface RythmSpinner extends Components.RythmSpinner {}


@ProxyCmp({
  inputs: ['color', 'dismissible', 'noSound']
})
@Component({
  selector: 'rythm-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'dismissible', 'noSound'],
})
export class RythmTag {
  protected el: HTMLRythmTagElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['rythmDismiss']);
  }
}


export declare interface RythmTag extends Components.RythmTag {
  /**
   * Fired when the dismiss button is clicked.
   */
  rythmDismiss: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['as', 'color', 'size', 'truncate', 'weight']
})
@Component({
  selector: 'rythm-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['as', 'color', 'size', 'truncate', 'weight'],
})
export class RythmText {
  protected el: HTMLRythmTextElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface RythmText extends Components.RythmText {}


@ProxyCmp({
  inputs: ['checked', 'disabled', 'label', 'labelPosition', 'name', 'noSound']
})
@Component({
  selector: 'rythm-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'label', 'labelPosition', 'name', 'noSound'],
})
export class RythmToggle {
  protected el: HTMLRythmToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['rythmChange']);
  }
}


export declare interface RythmToggle extends Components.RythmToggle {
  /**
   * Fired when the toggle state changes.
   */
  rythmChange: EventEmitter<CustomEvent<boolean>>;
}


