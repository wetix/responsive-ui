# @responsive-ui/accordion

> A accordion component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/accordion.svg)](https://www.npmjs.com/package/@responsive-ui/accordion)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Faccordion)](https://bundlephobia.com/result?p=@responsive-ui/accordion)
[![download](https://img.shields.io/npm/dw/@responsive-ui/accordion.svg)](https://www.npmjs.com/package/@responsive-ui/accordion)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/accordion
```

or

```console
yarn add @responsive-ui/accordion
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/105443082-e79b3580-5ca5-11eb-864d-d3b2c7b5d1a2.png"
alt="@responsive-ui/accordion" />

## Properties, Events & Slots

```ts
interface AccordionItem {
  title: string;
  content: string | SvelteComponentDev;
}

interface AccordionProps {
  class?: string;
  items: AccordionItem[];
  multiple?: boolean;
  style?: string;
}

interface AccordionEvents {}

interface AccordionSlots {}

declare class Accordion extends SvelteComponentTyped<
  AccordionProps,
  AccordionEvents,
  AccordionSlots
> {}
```

## Example

```svelte
<script>
  import Accordion from '@responsive-ui/accordion';

  const accordionItems = [
    {
      title: "Title 1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!",
    },
    {
      title: "Title 2",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. B, in!",
    },
  ];
</script>

<Accordion items={accordionItems} multiple={true} />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/647efdb8779c4b7ebe14b01f5bd32b5f?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/accordion](https://github.com/wetix/responsive-ui/tree/master/components/accordion) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
