# @responsive-ui/menu

> A menu component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/menu.svg)](https://www.npmjs.com/package/@responsive-ui/menu)
[![download](https://img.shields.io/npm/dw/@responsive-ui/menu.svg)](https://www.npmjs.com/package/@responsive-ui/menu)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fposter)](https://bundlephobia.com/result?p=@responsive-ui/menu)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/menu
```

or

```console
yarn add @responsive-ui/menu
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/7383278/105787754-15d88800-5fba-11eb-9f4f-8a8f84048b70.png"
alt="@responsive-ui/menu" />

## Properties, Events & Slots

```ts
interface MenuItems {
  title: string;
  value: any;
  disabled?: boolean;
  href?: string;
  collapsed?: boolean;
  submenus?: MenuItems[];
}

interface MenuProps {
  items: MenuItems[];
  onSelectMenu: (data: number[]) => void
}

declare class Menu extends SvelteComponentTyped<MenuProps> {}
```

## Example

```svelte
<script>
  import Menu from '@responsive-ui/menu';
  
  const menus = [
    { title: "Item 1", href: "#item1" },
    { title: "Item 2", href: "#item2" },
    {
      title: "Item Submenu",
      submenus: [
        {
          title: "Submenu 1",
          href: "#submenu1"
        },
        {
          title: "Submenu disabled",
          href: "#submenu-disabled",
          disabled: true
        }
      ],
      collapsed: false,
    },
  ]

  const handleSelectMenu = (data): void => {
    if (data && data.length > 0) {
      console.log(data)
      menus[data[data.length - 1]].collapsed =
        !menus[data[data.length - 1]]?.collapsed || false;
    }
  };
</script>

<Menu items={menus} onSelectMenu={handleSelectMenu} />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/2ad7ede9845b4b449e4b453951a4f7ad?version=3.31.2)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/menu](https://github.com/wetix/responsive-ui/tree/master/components/menu) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
