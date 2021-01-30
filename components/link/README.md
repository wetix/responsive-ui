# @responsive-ui/link

> A link component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/link.svg)](https://www.npmjs.com/package/@responsive-ui/link)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Flink)](https://bundlephobia.com/result?p=@responsive-ui/link)
[![download](https://img.shields.io/npm/dw/@responsive-ui/link.svg)](https://www.npmjs.com/package/@responsive-ui/link)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/link
```

or

```console
yarn add @responsive-ui/link
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104732431-331a8480-5778-11eb-8831-e9848977863d.png"
alt="@responsive-ui/link" />

## Properties, Events & Slots

```ts
interface linkProps {
  title: string;
  for?: string;
  form?: string;
  class?: string;
  style?: string;
}

interface linkEvents {}

interface linkSlots {
  default: {};
}

declare class link extends SvelteComponentTyped<
  linkProps,
  linkEvents,
  linkSlots
> {}
```

## Example

```svelte
<script>
  import link from '@responsive-ui/link';
</script>

<link title="testing">
  description here
</link>
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/b95c9457a368429583c5c5eb40f666eb?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/link](https://github.com/wetix/responsive-ui/tree/master/components/link) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
