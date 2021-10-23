# @responsive-ui/badge

> A badge component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/badge.svg)](https://www.npmjs.com/package/@responsive-ui/badge)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fbadge)](https://bundlephobia.com/result?p=@responsive-ui/badge)
[![download](https://img.shields.io/npm/dw/@responsive-ui/badge.svg)](https://www.npmjs.com/package/@responsive-ui/badge)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/main/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/badge
```

or

```console
yarn add @responsive-ui/badge
```

## Look and Feel

<!-- <img src="https://user-images.githubusercontent.com/28108597/104029132-92224b80-5204-11eb-9bc0-032449eb8053.png"
alt="@responsive-ui/badge" /> -->

## Properties, Events & Slots

```ts
interface BadgeProps {
  id?: string;
  class?: string;
  count: number;
  max?: number;
  style?: string;
}

interface BadgeEvents {}

interface BadgeSlots {
  default: {};
}

declare class Badge extends SvelteComponentTyped<
  BadgeProps,
  BadgeEvents,
  BadgeSlots
> {}
```

## Example

```svelte
<script>
  import Badge from '@responsive-ui/badge';

  const onClick = () => {
    console.log("clicked!");
  }
</script>

<Badge count={1000}>Badge</Badge>
```

<!-- [Try it yourself in Svelte Repl](https://svelte.dev/repl/d21567c5cfb24e7ea136ebfc0a269bfe?version=latest) -->

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/badge](https://github.com/wetix/responsive-ui/tree/main/components/badge) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/main/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
