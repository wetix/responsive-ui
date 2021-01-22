# @responsive-ui/button

> A button component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/button.svg)](https://www.npmjs.com/package/@responsive-ui/button)
[![download](https://img.shields.io/npm/dw/@responsive-ui/button.svg)](https://www.npmjs.com/package/@responsive-ui/button)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fbutton)](https://bundlephobia.com/result?p=@responsive-ui/button)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/button
```

or

```console
yarn add @responsive-ui/button
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104029132-92224b80-5204-11eb-9bc0-032449eb8053.png"
alt="@responsive-ui/button" />

## Properties, Events & Slots

```ts
interface ButtonProps {
  title?: string;
  name?: string;
  type?: "button" | "submit" | "reset";
  class?: string;
  disabled?: boolean;
  form?: string;
  style?: string;
}

interface ButtonEvents {
  click?: any;
}

interface ButtonSlots {
  default: {};
}

declare class Button extends SvelteComponentTyped<
  ButtonProps,
  ButtonEvents,
  ButtonSlots
> {}
```

## Example

```svelte
<script>
  import Button from '@responsive-ui/button';

  const onClick = () => {
    console.log("clicked!");
  }
</script>

<Button title="Click me" on:click={onClick}></Button>
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/d21567c5cfb24e7ea136ebfc0a269bfe?version=3.31.2)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/button](https://github.com/wetix/responsive-ui/tree/master/components/button) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
