import type { SvelteComponentTyped } from "svelte/internal";

export type SubNavItem = Omit<NavItem, "subItems">;

export interface NavItem extends Record<string, any> {
  key: string;
  label: string;
  href?: string;
  search?: string;
  subItems?: SubNavItem[];
}

export interface AppBarProps {
  id?: string;
  class?: string;
  selectedKey?: string;
  selectedSubmenuKey?: string;
  clientHeight?: number;
  leadingItems: NavItem[];
  trailingItems: NavItem[];
  style?: string;
}

export interface AppBarEvents {
  /**
   * The onclick event occurs when the user clicks on app bar.
   */
  click?: WindowEventMap["click"];
}

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
  "menu-body": {
    items: NavItem[];
  };
  "menu-item": {
    index: number;
    selected: boolean;
    item: NavItem;
  };
}

export declare class AppBarComponent extends SvelteComponentTyped<
  AppBarProps,
  AppBarEvents,
  AppBarSlots
> {}

export default AppBarComponent;
