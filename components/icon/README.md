# @responsive-ui/icon

> A icon component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/icon.svg)](https://www.npmjs.com/package/@responsive-ui/icon)
[![download](https://img.shields.io/npm/dw/@responsive-ui/icon.svg)](https://www.npmjs.com/package/@responsive-ui/icon)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Ficon)](https://bundlephobia.com/result?p=@responsive-ui/icon)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/icon
```

or

```console
yarn add @responsive-ui/icon
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104583469-20cb1880-569c-11eb-9dc6-956efc1ea542.png"
alt="@responsive-ui/button" />

## Properties, Events & Slots

```ts
interface IconProps {
  type: string;
  stroke?: string;
  style?: string;
}

interface IconEvents {
  click?: void;
}

declare class Icon extends SvelteComponentTyped<IconProps, IconEvents> {}
```

## Example

```svelte
<script>
  import Icon from '@responsive-ui/icon';
</script>

<Icon type="filter" />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/4c61a7751527430181dbfd478a54a263?version=3.31.2)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/icon](https://github.com/wetix/responsive-ui/tree/master/components/icon) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
