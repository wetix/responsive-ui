import type { SvelteComponent } from "svelte";
import type { SvelteComponentDev, SvelteComponentTyped } from "svelte/internal";

export interface MenuItem extends Record<string, unknown>{
  key: string;
  label: string;
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

export declare class MenuComponent extends SvelteComponentTyped<
  MenuProps,
  MenuEvents,
  MenuSlots
> {}

export default MenuComponent;
