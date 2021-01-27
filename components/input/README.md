# @responsive-ui/input

> A input component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/input.svg)](https://www.npmjs.com/package/@responsive-ui/input)
[![download](https://img.shields.io/npm/dw/@responsive-ui/input.svg)](https://www.npmjs.com/package/@responsive-ui/input)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fbutton)](https://bundlephobia.com/result?p=@responsive-ui/input)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/input
```

or

```console
yarn add @responsive-ui/input
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/106004647-618c4e00-60ee-11eb-9fa7-27fc964ccfbd.png"
alt="@responsive-ui/input" />

## Properties, Events & Slots

```ts
interface InputProps {
  ref?: null | HTMLInputElement;
  class?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  size?: number;
  maxlength?: number;
  value?: any;
  required?: boolean;
  style?: string;
}

interface InputEvents {
  change?: any;
  input?: any;
  enter?: any;
}

declare class Input extends SvelteComponentTyped<InputProps, InputEvents> {}
```

## Example

```svelte
<script>
  import Input from '@responsive-ui/input';

  const onInput = (e) => {
    console.log(e.currentTarget.value);
  }
</script>

<Input on:input={onInput} />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/279084cad5bd49b4b839a1c7f29bf6d7?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/input](https://github.com/wetix/responsive-ui/tree/master/components/input) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
