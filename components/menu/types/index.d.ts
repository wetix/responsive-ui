import type { SvelteComponent } from "svelte";
import type { SvelteComponentDev, SvelteComponentTyped } from "svelte/internal";

export type MenuItem = {
  key: string;
  label: string;
  icon?: typeof SvelteComponent;
  disabled?: boolean;
  collapsed?: boolean;
  submenus?: MenuItem[];
};

export interface MenuProps {
  ref?: HTMLUListElement | null;
  id?: string;
  class?: string;
  multiple?: boolean;
  items: MenuItem[];
  style?: string;
}

export interface MenuEvents {
  click?: any;
}

export interface MenuSlots {
  item: {};
}

declare class Menu extends SvelteComponentTyped<
  MenuProps,
  MenuEvents,
  MenuSlots
> {}

export default Menu;
