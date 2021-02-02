import type { SvelteComponentTyped } from "svelte/internal";

export type MenuItems = {
  title: string;
  value: string | number;
  disabled?: boolean;
  submenus?: MenuItems[];
}

export interface MenuProps {
  items: MenuItems[];
}

export interface MenuEvents {
  click?: (v: {
    value: any
    event: MouseEvent
  }) => void
}

declare class Menu extends SvelteComponentTyped<MenuProps, MenuEvents> {}

export default Menu;
