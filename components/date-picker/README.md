# @responsive-ui/date-picker

> A date-picker component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/date-picker.svg)](https://www.npmjs.com/package/@responsive-ui/date-picker)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Faccordion)](https://bundlephobia.com/result?p=@responsive-ui/date-picker)
[![download](https://img.shields.io/npm/dw/@responsive-ui/date-picker.svg)](https://www.npmjs.com/package/@responsive-ui/date-picker)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/date-picker
```

or

```console
yarn add @responsive-ui/date-picker
```

## Look and Feel

<!-- <img src="https://user-images.githubusercontent.com/28108597/105842391-0f292f80-6011-11eb-94c6-47728f2eb9f3.png"
alt="@responsive-ui/date-picker" /> -->

## Properties, Events & Slots

```ts
interface DatePickerProps {
  class?: string;
  ref?: null | HTMLInputElement;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  placeholder?: string;
}

interface DatePickerEvents {
  change?: void;
}

interface DatePickerSlots {}

declare class DatePicker extends SvelteComponentTyped<
  DatePickerProps,
  DatePickerEvents,
  DatePickerSlots
> {}
```

## Example

```svelte
<script>
  import DatePicker from '@responsive-ui/date-picker';
</script>

<DatePicker />
```

<!-- [Try it yourself in Svelte Repl](https://svelte.dev/repl/91c1018434d44dc081229b45e18653a7?version=latest) -->

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/date-picker](https://github.com/wetix/responsive-ui/tree/master/components/date-picker) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
