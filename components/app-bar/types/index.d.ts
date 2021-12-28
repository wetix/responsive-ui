import type { SvelteComponentTyped } from "svelte/internal";

export interface NavItem extends Record<string, any> {
  label?: string;
  href?: string;
  subItems?: Omit<NavItem, "subItems">[];
  selected?: boolean;
}

export interface AppBarProps {
  id?: string;
  class?: string;
  menuCaption: string;
  clientHeight?: number;
  leadingItems: NavItem[];
  trailingItems: NavItem[];
  menuItems: NavItem[];
  style?: string;
}

export interface AppBarEvents {}

export interface AppBarSlots {
  logo: {};
  leading: {
    items: NavItem[];
  };
  trailing: {
    items: NavItem[];
  };
  "leading-item": {
    index: number;
    selected: boolean;
    item: NavItem;
  };
  "trailing-item": {
    index: number;
    selected: boolean;
    item: NavItem;
  };
  "menu-item": {
    index: number;
    selected: boolean;
    item: NavItem;
  };
}

declare class AppBar extends SvelteComponentTyped<
  AppBarProps,
  AppBarEvents,
  AppBarSlots
> {}

export default AppBar;
