# `@responsive-ui/snackbar`

> A snackbar component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/snackbar.svg)](https://www.npmjs.com/package/@responsive-ui/snackbar)
[![download](https://img.shields.io/npm/dw/@responsive-ui/snackbar.svg)](https://www.npmjs.com/package/@responsive-ui/snackbar)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fsnackbar)](https://bundlephobia.com/result?p=@responsive-ui/snackbar)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/snackbar
```

or

```console
yarn add @responsive-ui/snackbar
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104030411-4ec8dc80-5206-11eb-98b1-b8fe246b38b0.png"
alt="@responsive-ui/snackbar" />

## Properties, Events & Slots

```ts
interface SnackbarProps {
  text: string;
  variant?: string;
  class?: string;
  timeout?: number;
  rounded?: boolean;
}

interface SnackbarEvents {
  close?: void;
}

interface SnackbarSlots {
  default: {};
}

declare class Snackbar extends SvelteComponentTyped<
  SnackbarProps,
  SnackbarEvents,
  SnackbarSlots
> {}
```

## Example

```svelte
<script>
  import Snackbar from "@responsive-ui/snackbar";

  Snackbar.show({
    timeout: 10000,
    text: "Snackbar message",
  });
</script>

<Snackbar.default>
  Default Message
</Snackbar.default>
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/snackbar](https://github.com/wetix/responsive-ui/tree/master/components/snackbar) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
