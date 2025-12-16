---
title: Functional Icons
---

<!-- markdownlint-disable-next-line MD001 -->
### Usage

You could either use the Icon font provided with [DB UI Core](https://db-ui.github.io/core/?p=viewall-base-icons) or reference the functional color icons directly via the `<use>` HTML tag within the `<svg>` HTML tag, compare to the source code provided with this pattern, like e.g.:

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="20"
  aria-hidden="true"
>
  <use href="/assets/icons/functional/action/db_ic_account_20.svg#icon"></use>
</svg>
```

#### Adapt icons colors

To change the line-colors of the icon define a color value for its CSS variable:

- `--db-icon-color`

The fallback for an undefined `--db-icon-color` is the `font-color` defined around or for the `<svg>` itself.

#### Accessibility

We're adding the attribute `aria-hidden="true"` to the `<svg>` HTML tag so that the icon is hidden from assistive tools like not being read out by screen readers.
