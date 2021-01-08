# @responsive-ui/poster

> A poster component of responsive-ui.

## Install

```console
npm install @responsive-ui/poster
```

or

```console
yarn add @responsive-ui/poster
```

<br/>

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104025685-f55daf00-51ff-11eb-8254-e6efee445707.png"
alt="@responsive-ui/poster" />

<br/>

## Properties, Events & Slots

```ts
interface PosterProps {
  src: string;
  width?: string;
  height?: string;
  hasShadow?: boolean;
  hasBorderRadius?: boolean;
  size?: "small" | "medium";
  style?: string;
}

interface PosterEvents {
  click?: void;
}

declare class Poster extends SvelteComponentTyped<PosterProps, PosterEvents> {}
```

<br/>

## Example

```svelte
<script>
  import FloatingActionButton from '@responsive-ui/poster';
</script>

<FloatingActionButton on:click={console.log} />
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/poster](https://github.com/wetix/responsive-ui/tree/master/components/poster) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
