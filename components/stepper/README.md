# @responsive-ui/stepper

> A stepper component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/stepper.svg)](https://www.npmjs.com/package/@responsive-ui/stepper)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fstepper)](https://bundlephobia.com/result?p=@responsive-ui/stepper)
[![download](https://img.shields.io/npm/dw/@responsive-ui/stepper.svg)](https://www.npmjs.com/package/@responsive-ui/stepper)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/stepper
```

or

```console
yarn add @responsive-ui/stepper
```

## Look and Feel

<!-- <img src="https://user-images.githubusercontent.com/28108597/104026779-618ce280-5201-11eb-97ae-ca4af129b4c0.png"
alt="@responsive-ui/stepper" /> -->

## Properties, Events & Slots

```ts
type StepperItem = {
  label: string;
  description?: string;
};

interface StepperProps {
  items: StepperItem[];
  class?: string;
  style?: string;
}

interface StepperEvents {
  change?: any;
}

interface StepperSlots {
  default: {};
}

declare class Stepper extends SvelteComponentTyped<
  StepperProps,
  StepperEvents,
  StepperSlots
> {}
```

## Example

```svelte
<script>
  import Stepper from '@responsive-ui/stepper';
</script>

<Stepper />
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/stepper](https://github.com/wetix/responsive-ui/tree/master/components/stepper) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
