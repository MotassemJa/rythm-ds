# rythm-radio-group



<!-- Auto Generated Below -->


## Overview

Groups `rythm-radio` elements into a single named fieldset, managing shared
selection state and propagating disabled/required to all children.

## Properties

| Property            | Attribute     | Description                                                                   | Type                         | Default      |
| ------------------- | ------------- | ----------------------------------------------------------------------------- | ---------------------------- | ------------ |
| `disabled`          | `disabled`    | Disables all radio buttons in the group.                                      | `boolean`                    | `false`      |
| `label`             | `label`       | Accessible `<legend>` text for the fieldset.                                  | `string \| undefined`        | `undefined`  |
| `name` _(required)_ | `name`        | Shared `name` attribute applied to all `rythm-radio` children.                | `string`                     | `undefined`  |
| `orientation`       | `orientation` | Layout orientation of the radio options.                                      | `"horizontal" \| "vertical"` | `'vertical'` |
| `required`          | `required`    | Marks all radio buttons as required.                                          | `boolean`                    | `false`      |
| `value`             | `value`       | Currently selected value; mutable so the group can update it on child change. | `string \| undefined`        | `undefined`  |


## Events

| Event         | Description                            | Type                  |
| ------------- | -------------------------------------- | --------------------- |
| `rythmChange` | Fired when the selected value changes. | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
