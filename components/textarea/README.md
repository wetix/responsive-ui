# @responsive-ui/textarea

> An textarea component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/textarea.svg)](https://www.npmjs.com/package/@responsive-ui/textarea)
[![download](https://img.shields.io/npm/dw/@responsive-ui/textarea.svg)](https://www.npmjs.com/package/@responsive-ui/textarea)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Ftextarea)](https://bundlephobia.com/result?p=@responsive-ui/textarea)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/textarea
```

or

```console
yarn add @responsive-ui/textarea
```

## Look and Feel

<!-- <img src="https://user-images.githubusercontent.com/28108597/104029132-92224b80-5204-11eb-9bc0-032449eb8053.png"
alt="@responsive-ui/button" /> -->

## Properties, Events & Slots

```ts
interface TextareaProps {
  name: string;
  value: any;
  rows?: number;
  placeholder?: string;
  autofocus?: boolean;
  autoresize?: boolean;
}

interface TextareaEvents {
  input?: void;
}

declare class Textarea extends SvelteComponentTyped<
  TextareaProps,
  TextareaEvents
> {}
```

## Example

```svelte
<script>
  import Textarea from '@responsive-ui/textarea';
</script>

<Textarea />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/5d4146f8408a49b18558d60cb1619aea?version=3.31.2)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/textarea](https://github.com/wetix/responsive-ui/tree/master/components/textarea) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
