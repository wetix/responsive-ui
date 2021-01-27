# @responsive-ui/bottom-modal

> A bottom modal component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/bottom-modal.svg)](https://www.npmjs.com/package/@responsive-ui/bottom-modal)
[![download](https://img.shields.io/npm/dw/@responsive-ui/bottom-modal.svg)](https://www.npmjs.com/package/@responsive-ui/bottom-modal)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fbottom-modal)](https://bundlephobia.com/result?p=@responsive-ui/bottom-modal)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/bottom-modal
```

or

```console
yarn add @responsive-ui/bottom-modal
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104998043-8a18a600-5a65-11eb-9fe8-381e3934476b.png"
alt="@responsive-ui/bottom-modal" />

## Properties, Events & Slots

```ts
interface BottomBarProps {
  class?: string;
  style?: string;
}

declare class BottomBar extends SvelteComponentTyped<BottomBarProps> {}
```

## Example

```svelte
<script>
  import BottomModal from '@responsive-ui/bottom-modal';
</script>

<BottomModal closable={true}>Bottom Modal</BottomModal>
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/00bbb3aaea2d43fcaca9e8ba9dfef718?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/bottom-modal](https://github.com/wetix/responsive-ui/tree/master/components/bottom-modal) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
