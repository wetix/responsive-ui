# @responsive-ui/search

> A search component of responsive-ui.

## Install

```console
npm install @responsive-ui/search
```

or

```console
yarn add @responsive-ui/search
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/105341711-63e83700-5c1a-11eb-9c29-1f743e03bb4d.png"
alt="@responsive-ui/search" />

## Properties, Events & Slots

```ts
type SearchProps = {
  name: string;
  value: any;
  placeholder?: string;
  size?: number;
  loading?: boolean;
  spellcheck?: boolean;
  debounceTimer?: number;
};
```

## Example

```svelte
<script>
  import Search from '@responsive-ui/search';
</script>

<Search placeholder="Searching..."></Search>
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/098739b0d1ac44f2a994c9a615c213fd?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/search](https://github.com/wetix/responsive-ui/tree/master/components/search) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
