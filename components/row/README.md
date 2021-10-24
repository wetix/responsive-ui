# @responsive-ui/row

> A row component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/row.svg)](https://www.npmjs.com/package/@responsive-ui/row)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Frow)](https://bundlephobia.com/result?p=@responsive-ui/row)
[![download](https://img.shields.io/npm/dw/@responsive-ui/row.svg)](https://www.npmjs.com/package/@responsive-ui/row)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/main/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/row
```

or

```console
yarn add @responsive-ui/row
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104026779-618ce280-5201-11eb-97ae-ca4af129b4c0.png"
alt="@responsive-ui/row" />

## Properties, Events & Slots

```ts
interface RowProps {
  align?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";
}

interface RowEvents {}

interface RowSlots {
  default: {};
}

declare class Row extends SvelteComponentTyped<RowProps, RowEvents, RowSlots> {}
```

## Example

```svelte
<script>
  import Row from '@responsive-ui/row';
  import Column from '@responsive-ui/row';
</script>

<Row>
  <Column span={12}>Left</Column>
  <Column span={12}>Right</Column>
</Row>
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/row](https://github.com/wetix/responsive-ui/tree/main/components/row) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/main/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
