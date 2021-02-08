# @responsive-ui/select

> A select component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/select.svg)](https://www.npmjs.com/package/@responsive-ui/select)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fselect)](https://bundlephobia.com/result?p=@responsive-ui/select)
[![download](https://img.shields.io/npm/dw/@responsive-ui/select.svg)](https://www.npmjs.com/package/@responsive-ui/select)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/select
```

or

```console
yarn add @responsive-ui/select
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104732706-94425800-5778-11eb-96fd-3220b84ea33b.png"
alt="@responsive-ui/select" />

## Properties, Events & Slots

```ts
type SelectOption = {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  value: any;
};

interface SelectProps {
  name?: string;
  readonly?: boolean;
  value?: string;
  options: SelectOption[];
}

interface SelectEvents {
  change?: any;
}

interface SelectSlots {
  default: {};
}

declare class Select extends SvelteComponentTyped<
  SelectProps,
  SelectEvents,
  SelectSlots
> {}
```

## Example

```svelte
<script>
  import Select from '@responsive-ui/select';

  const options = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d" },
  ];

  const onChange = (e) => {
    console.log(e)
  }
</script>

<Select
  value="c"
  options={options}
  on:change={onChange}
/>
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/e95880d4083f4e80bb162678c4676ccd?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/select](https://github.com/wetix/responsive-ui/tree/master/components/select) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
