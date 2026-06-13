# rythm-avatar



<!-- Auto Generated Below -->


## Overview

Displays a user avatar with an image, initials, or icon as a fallback chain.

## Properties

| Property   | Attribute  | Description                                                                      | Type                                            | Default     |
| ---------- | ---------- | -------------------------------------------------------------------------------- | ----------------------------------------------- | ----------- |
| `alt`      | `alt`      | Accessible alt text for the image; also used as the host aria-label.             | `string \| undefined`                           | `undefined` |
| `icon`     | `icon`     | Lucide icon name used as the last fallback when no src or initials are provided. | `string`                                        | `'user'`    |
| `initials` | `initials` | Up to two initials shown when no image is provided or it fails to load.          | `string \| undefined`                           | `undefined` |
| `shape`    | `shape`    | Shape of the avatar container.                                                   | `"circle" \| "square"`                          | `'circle'`  |
| `size`     | `size`     | Visual size.                                                                     | `"2xl" \| "lg" \| "md" \| "sm" \| "xl" \| "xs"` | `'md'`      |
| `src`      | `src`      | Image URL.                                                                       | `string \| undefined`                           | `undefined` |


## Shadow Parts

| Part       | Description              |
| ---------- | ------------------------ |
| `"avatar"` | The inner container div. |


## Dependencies

### Depends on

- [rythm-icon](../icon)

### Graph
```mermaid
graph TD;
  rythm-avatar --> rythm-icon
  style rythm-avatar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
