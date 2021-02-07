# @responsive-ui/tab

> A tab component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/tab.svg)](https://www.npmjs.com/package/@responsive-ui/tab)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Ftab)](https://bundlephobia.com/result?p=@responsive-ui/tab)
[![download](https://img.shields.io/npm/dw/@responsive-ui/tab.svg)](https://www.npmjs.com/package/@responsive-ui/tab)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/tab
```

or

```console
yarn add @responsive-ui/tab
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104733087-28142400-5779-11eb-9f5a-9957edcaa495.png"
alt="@responsive-ui/tab" />

## Properties, Events & Slots

```ts
interface TabItem {
  label: string;
  component?: SvelteComponent;
  style?: string;
}

interface TabProps {
  items: TabItem[];
  selected?: number;
  style?: string;
}

interface TabEvents {}

interface TabSlots {
  default: {
    selected: number;
  };
}

declare class Tab extends SvelteComponentTyped<TabProps, TabEvents, TabSlots> {}
```

## Example

```svelte
<script>
  import Tab from '@responsive-ui/tab';

  const tabItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d" },
  ];
</script>

<Tab items={tabItems} />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/95ab0950fa2740bea8b2338a497c46cf?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/tab](https://github.com/wetix/responsive-ui/tree/master/components/tab) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
