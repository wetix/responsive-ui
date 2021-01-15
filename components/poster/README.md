# @responsive-ui/poster

> A poster component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/poster.svg)](https://www.npmjs.com/package/@responsive-ui/poster)
[![download](https://img.shields.io/npm/dw/@responsive-ui/poster.svg)](https://www.npmjs.com/package/@responsive-ui/poster)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fposter)](https://bundlephobia.com/result?p=@responsive-ui/poster)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/poster
```

or

```console
yarn add @responsive-ui/poster
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104025685-f55daf00-51ff-11eb-8254-e6efee445707.png"
alt="@responsive-ui/poster" />

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

## Example

```svelte
<script>
  import Poster from '@responsive-ui/poster';
</script>

<Poster src="data:image/png;base64,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" />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/2ad7ede9845b4b449e4b453951a4f7ad?version=3.31.2)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/poster](https://github.com/wetix/responsive-ui/tree/master/components/poster) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
