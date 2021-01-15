# @responsive-ui/switch

> A switch component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/switch.svg)](https://www.npmjs.com/package/@responsive-ui/switch)
[![download](https://img.shields.io/npm/dw/@responsive-ui/switch.svg)](https://www.npmjs.com/package/@responsive-ui/switch)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fswitch)](https://bundlephobia.com/result?p=@responsive-ui/switch)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/switch
```

or

```console
yarn add @responsive-ui/switch
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104030012-b03c7b80-5205-11eb-81d0-b5e5a04af252.png"
alt="@responsive-ui/switch" />

## Properties, Events & Slots

```ts
interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
}

interface SwitchEvents {
  change?: () => {} | void;
}

declare class Switch extends SvelteComponentTyped<SwitchProps, SwitchEvents> {}
```

## Example

```svelte
<script>
  import Switch from '@responsive-ui/switch';
</script>

<Switch checked={false} />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/69f8b2f7d5944e25949a87c30b009256?version=3.31.2)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/switch](https://github.com/wetix/responsive-ui/tree/master/components/switch) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
