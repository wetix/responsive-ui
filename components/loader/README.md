# @responsive-ui/loader

> A loader component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/loader.svg)](https://www.npmjs.com/package/@responsive-ui/loader)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Floader)](https://bundlephobia.com/result?p=@responsive-ui/loader)
[![download](https://img.shields.io/npm/dw/@responsive-ui/loader.svg)](https://www.npmjs.com/package/@responsive-ui/loader)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/loader
```

or

```console
yarn add @responsive-ui/loader
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/106019879-17ab6400-60fe-11eb-9456-d24fc8fd5ed9.png"
alt="@responsive-ui/loader" />

## Properties, Events & Slots

```ts
interface LoaderProps {
  fit?: "viewport" | "none";
  size?: "default" | "small";
}

declare class Loader extends SvelteComponentTyped<LoaderProps> {}
```

## Example

```svelte
<script>
  import Loader from '@responsive-ui/loader';
</script>

<Loader />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/f38d0c0bf6754647bbc78cfe74cc356c?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/loader](https://github.com/wetix/responsive-ui/tree/master/components/loader) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
