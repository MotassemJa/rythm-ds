# rythm-icon



<!-- Auto Generated Below -->


## Overview

Renders a single icon from the Rythm icon registry as an inline SVG.
When `label` is omitted the icon is treated as decorative and hidden from
assistive technology.

## Properties

| Property            | Attribute | Description                                                                                                              | Type                                   | Default     |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ----------- |
| `label`             | `label`   | Accessible label announced by screen readers. Omit for decorative icons — the element will be aria-hidden automatically. | `string \| undefined`                  | `undefined` |
| `name` _(required)_ | `name`    | Name of the icon from the Rythm icon registry.                                                                           | `string`                               | `undefined` |
| `size`              | `size`    | Visual size.                                                                                                             | `"lg" \| "md" \| "sm" \| "xl" \| "xs"` | `'md'`      |


## Dependencies

### Used by

 - [rythm-avatar](../avatar)
 - [rythm-button](../button)
 - [rythm-checkbox](../checkbox)
 - [rythm-input](../input)
 - [rythm-tag](../tag)

### Graph
```mermaid
graph TD;
  rythm-avatar --> rythm-icon
  rythm-button --> rythm-icon
  rythm-checkbox --> rythm-icon
  rythm-input --> rythm-icon
  rythm-tag --> rythm-icon
  style rythm-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
