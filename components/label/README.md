# @responsive-ui/label

> A label component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/label.svg)](https://www.npmjs.com/package/@responsive-ui/label)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Flabel)](https://bundlephobia.com/result?p=@responsive-ui/label)
[![download](https://img.shields.io/npm/dw/@responsive-ui/label.svg)](https://www.npmjs.com/package/@responsive-ui/label)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/label
```

or

```console
yarn add @responsive-ui/label
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104732431-331a8480-5778-11eb-8831-e9848977863d.png"
alt="@responsive-ui/label" />

## Properties, Events & Slots

```ts
interface LabelProps {
  label: string;
  for?: string;
  form?: string;
  class?: string;
  style?: string;
}

interface LabelEvents {}

interface LabelSlots {
  default: {};
}

declare class Label extends SvelteComponentTyped<
  LabelProps,
  LabelEvents,
  LabelSlots
> {}
```

## Example

```svelte
<script>
  import Label from '@responsive-ui/label';
</script>

<Label label="testing">
  description here
</Label>
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/b95c9457a368429583c5c5eb40f666eb?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/label](https://github.com/wetix/responsive-ui/tree/master/components/label) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
