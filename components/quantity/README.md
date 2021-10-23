# @responsive-ui/quantity

> A quantity component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/quantity.svg)](https://www.npmjs.com/package/@responsive-ui/loader)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fquantity)](https://bundlephobia.com/result?p=@responsive-ui/quantity)
[![download](https://img.shields.io/npm/dw/@responsive-ui/quantity.svg)](https://www.npmjs.com/package/@responsive-ui/quantity)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/main/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/quantity
```

or

```console
yarn add @responsive-ui/quantity
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/16622933/105789146-deb7a600-5fbc-11eb-85a5-24a1e4e0a56b.png"
alt="@responsive-ui/quantity" />

## Properties, Events & Slots

```
export interface QuantityProps {
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export interface QuantityEvents {
  change?: any
}
```

## Example

```svelte
<script>
  import Quantity from '@responsive-ui/quantity';
</script>

<Quantity min=5 max=15 />
```

<!-- [Try it yourself in Svelte Repl](https://svelte.dev/repl/f2f4c638c5734107b3c72a8794a961ee?version=latest) -->

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/quantity](https://github.com/wetix/responsive-ui/tree/main/components/quantity) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/main/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
