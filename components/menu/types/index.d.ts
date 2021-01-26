import type { SvelteComponentTyped } from "svelte/internal";

export interface MenuItems {
  title: string;
  value: any;
  disabled?: boolean;
  href?: string;
  collapsed?: boolean;
  submenus?: MenuItems[];
}

export interface MenuProps {
  items: MenuItems[];
  onSelectMenu: (data: number[]) => void
}

declare class Menu extends SvelteComponentTyped<MenuProps> {}

export default Menu;
