# @responsive-ui/button

> A button component of responsive-ui.

## Install

```console
npm install @responsive-ui/button
```

or

```console
yarn add @responsive-ui/button
```

<br/>

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104029132-92224b80-5204-11eb-9bc0-032449eb8053.png"
alt="@responsive-ui/button" />

<br/>

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
  click?: void;
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

<br/>

## Usage

```svelte
<script>
  import Button from '@responsive-ui/button';

  const onClick = () => {
    console.log("clicked!");
  }
</script>

<Button title="Click me" on:click={onClick}></Button>
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/button](https://github.com/wetix/responsive-ui/tree/master/components/button) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
