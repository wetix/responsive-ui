# @responsive-ui/dropdown

> A dropdown component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/dropdown.svg)](https://www.npmjs.com/package/@responsive-ui/dropdown)
[![download](https://img.shields.io/npm/dw/@responsive-ui/dropdown.svg)](https://www.npmjs.com/package/@responsive-ui/dropdown)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fdropdown)](https://bundlephobia.com/result?p=@responsive-ui/dropdown)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/dropdown
```

or

```console
yarn add @responsive-ui/dropdown
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/7383278/105826555-d92d8080-5ffb-11eb-99f7-39599a581ca4.png"
alt="@responsive-ui/dropdown" />

## Properties, Events & Slots

```ts
export type DropdownItem = {
  title: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
};

export type DropdownTriggerMode = "click" | "hover" | "context";

interface DropdownProps {
  title: string;
  disabled?: boolean;
  items: DropdownItem[];
  size: number;
  trigger: DropdownTriggerMode;
  maxDisplayItem: number;
}

interface DropdownSlot {
  default: {};
}

declare class Dropdown extends SvelteComponentTyped<
  DropdownProps,
  _,
  DropdownSlot
> {}
```

## Example

```svelte
<script>
  import Dropdown from '@responsive-ui/dropdown';

  const items = [
    { title: "CC", onClick: () => {console.log("clicked!!!!")} },
    { title: "Option A", disabled: true },
    { divider: true },
    { title: "Option B", value: "b", href: "#B" },
  ]
</script>

<Dropdown {items} />
```

[comment]: <> ([Try it yourself in Svelte Repl]&#40;https://svelte.dev/repl/e95880d4083f4e80bb162678c4676ccd?version=latest&#41;)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/dropdown](https://github.com/wetix/responsive-ui/tree/master/components/dropdown) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
