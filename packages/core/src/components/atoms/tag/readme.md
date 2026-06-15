# rythm-tag



<!-- Auto Generated Below -->


## Overview

Compact label chip with optional dismiss action.

## Properties

| Property      | Attribute     | Description                            | Type                                                                          | Default     |
| ------------- | ------------- | -------------------------------------- | ----------------------------------------------------------------------------- | ----------- |
| `color`       | `color`       | Color intent.                          | `"danger" \| "neutral" \| "primary" \| "secondary" \| "success" \| "warning"` | `'neutral'` |
| `dismissible` | `dismissible` | Shows a dismiss button inside the tag. | `boolean`                                                                     | `false`     |


## Events

| Event          | Description                               | Type                |
| -------------- | ----------------------------------------- | ------------------- |
| `rythmDismiss` | Fired when the dismiss button is clicked. | `CustomEvent<void>` |


## Dependencies

### Depends on

- [rythm-icon](../icon)

### Graph
```mermaid
graph TD;
  rythm-tag --> rythm-icon
  style rythm-tag fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
