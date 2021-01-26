import type { SvelteComponentTyped } from "svelte/internal";

export type MenuItems = {
  title: string;
  disabled?: boolean;
  href?: string;
  collapsed?: boolean;
  isActive?: boolean;
  submenus?: MenuItems[];
}

export interface MenuProps {
  items: MenuItems[];
}

export interface MenuEvents {
  change?: any
}

declare class Menu extends SvelteComponentTyped<MenuProps, MenuEvents> {}

export default Menu;
