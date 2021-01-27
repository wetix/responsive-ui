# @responsive-ui/input-number

> A input-number component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/input-number.svg)](https://www.npmjs.com/package/@responsive-ui/input-number)
[![download](https://img.shields.io/npm/dw/@responsive-ui/input-number.svg)](https://www.npmjs.com/package/@responsive-ui/input-number)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Finput-number)](https://bundlephobia.com/result?p=@responsive-ui/input-number)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/input-number
```

or

```console
yarn add @responsive-ui/input-number
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/106004618-5a654000-60ee-11eb-94b4-cc121c6ba672.png"
alt="@responsive-ui/input-number" />

## Properties, Events & Slots

```ts
interface InputNumberProps {
  ref?: null | HTMLInputElement;
  class?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: number;
  min?: number;
  max?: number;
  readonly?: boolean;
  precision?: number;
  parser?: (v: string) => number;
  format?: (v: number) => string;
}

interface InputNumberEvents {
  input?: any;
  blur?: any;
  change?: any;
}

declare class InputNumber extends SvelteComponentTyped<
  InputNumberProps,
  InputNumberEvents
> {}
```

## Example

```svelte
<script>
  import InputNumber from '@responsive-ui/input-number';

  const onInput = (e) => {
    console.log(e.currentTarget.value);
  }
</script>

<InputNumber on:input={onInput} />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/30f8845b00424ba29a2be7290c752ba9?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/input-number](https://github.com/wetix/responsive-ui/tree/master/components/input-number) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
