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

<img src="https://user-images.githubusercontent.com/28108597/104732706-94425800-5778-11eb-96fd-3220b84ea33b.png"
alt="@responsive-ui/dropdown" />

## Properties, Events & Slots

```ts
type DropdownItem = {
  title: string;
  value: any;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
};

interface DropdownProps {
  title: string;
  disabled?: boolean;
  items: DropdownItem[];
  size: number;
}

interface DropdownSlot {
  default: {};
}

declare class Select extends SvelteComponentTyped<DropdownProps, _, DropdownSlot> {}
```

## Example

```svelte
<script>
  import Dropdown from '@responsive-ui/dropdown';

  const items = [
    { title: "CC", onClick: () => {console.log("clicked!!!!")} },
    { title: "Option A", disabled: true },
    { title: "Option B", value: "b", href: "#B" },
  ]
</script>

<Dropdown {items} />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/e95880d4083f4e80bb162678c4676ccd?version=3.31.2)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/dropdown](https://github.com/wetix/responsive-ui/tree/master/components/dropdown) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
