# @responsive-ui/tooltip

> An tooltip component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/tooltip.svg)](https://www.npmjs.com/package/@responsive-ui/tooltip)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Ftooltip)](https://bundlephobia.com/result?p=@responsive-ui/tooltip)
[![download](https://img.shields.io/npm/dw/@responsive-ui/tooltip.svg)](https://www.npmjs.com/package/@responsive-ui/tooltip)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/main/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/tooltip
```

or

```console
yarn add @responsive-ui/tooltip
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104733584-de780900-5779-11eb-8a5b-c54019866418.png"
alt="@responsive-ui/tooltip" />

## Properties, Events & Slots

```ts
interface TooltipProps {
  placeholder: string;
  trigger?: TooltipTrigger[];
  class?: string;
}

interface TooltipEvents {}

interface TooltipSlots {
  default: {};
}

declare class Tooltip extends SvelteComponentTyped<
  TooltipProps,
  TooltipEvents,
  TooltipSlots
> {}
```

## Example

```svelte
<script>
  import Tooltip from '@responsive-ui/tooltip';
</script>

<Tooltip>
</Tooltip>
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/c86cd10826ae4ac695e5d31175e444a4?version=latest)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/tooltip](https://github.com/wetix/responsive-ui/tree/main/components/tooltip) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/main/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
