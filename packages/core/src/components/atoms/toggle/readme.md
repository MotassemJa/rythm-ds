# rythm-toggle



<!-- Auto Generated Below -->


## Overview

Accessible toggle switch using a checkbox with `role="switch"`.

## Properties

| Property        | Attribute        | Description                                                     | Type                  | Default     |
| --------------- | ---------------- | --------------------------------------------------------------- | --------------------- | ----------- |
| `checked`       | `checked`        | Whether the toggle is on.                                       | `boolean`             | `false`     |
| `disabled`      | `disabled`       | Disables interaction and applies disabled styling.              | `boolean`             | `false`     |
| `label`         | `label`          | Visible label text. Falls back to slotted content when omitted. | `string \| undefined` | `undefined` |
| `labelPosition` | `label-position` | Position of the label relative to the track.                    | `"end" \| "start"`    | `'end'`     |
| `name`          | `name`           | Form field name.                                                | `string \| undefined` | `undefined` |


## Events

| Event         | Description                          | Type                   |
| ------------- | ------------------------------------ | ---------------------- |
| `rythmChange` | Fired when the toggle state changes. | `CustomEvent<boolean>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
