# @responsive-ui/header

> A header component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/header.svg)](https://www.npmjs.com/package/@responsive-ui/header)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fheader)](https://bundlephobia.com/result?p=@responsive-ui/header)
[![download](https://img.shields.io/npm/dw/@responsive-ui/header.svg)](https://www.npmjs.com/package/@responsive-ui/header)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/header
```

or

```console
yarn add @responsive-ui/header
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104027903-052ac280-5203-11eb-9326-2ee47aa1901b.png"
alt="@responsive-ui/header" />

## Properties, Events & Slots

```ts
interface HeaderProps {
  title: string;
  style?: string;
}

interface HeaderEvents {}

interface HeaderSlots {
  default: {};
}

declare class Header extends SvelteComponentTyped<
  HeaderProps,
  HeaderEvents,
  HeaderSlots
> {}
```

## Example

```svelte
<script>
  import Header from '@responsive-ui/header';
</script>

<Header title="Responsive UI" />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/f2f4c638c5734107b3c72a8794a961ee?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/header](https://github.com/wetix/responsive-ui/tree/master/components/header) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
