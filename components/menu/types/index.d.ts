import type { SvelteComponentTyped } from "svelte/internal";

export interface MenuOption extends Record<string, unknown> {
  key: string;
  label: string;
  href?: string;
  disabled?: boolean;
  collapsed?: boolean;
  submenus?: MenuOption[];
  separator?: boolean;
}

export interface MenuProps {
  ref?: HTMLUListElement;
  id?: string;
  class?: string;
  multiple?: boolean;
  options: MenuOption[];
  open?: boolean;
  style?: string;
}

export interface MenuEvents {
  click?: WindowEventMap["click"];
  optionselect?: CustomEvent<{ option: MenuOption }>;
}

export interface MenuSlots {
  "menu-option": {
    option: MenuOption;
  };
}

export declare class MenuComponent extends SvelteComponentTyped<
  MenuProps,
  MenuEvents,
  MenuSlots
> {}

export default MenuComponent;
