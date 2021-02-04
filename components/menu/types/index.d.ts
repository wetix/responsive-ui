import type { SvelteComponentTyped } from "svelte/internal";

export type MenuItem = {
  title: string;
  value: string | number;
  disabled?: boolean;
  submenus?: MenuItem[];
};

export interface MenuProps {
  items: MenuItem[];
}

export interface MenuEvents {
  click?: (v: { value: any; event: MouseEvent }) => void;
}

declare class Menu extends SvelteComponentTyped<MenuProps, MenuEvents> {}

export default Menu;
