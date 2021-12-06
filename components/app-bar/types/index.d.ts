import type { SvelteComponentTyped } from "svelte/internal";

export interface NavItem extends Record<string, string> {
  label?: string;
  link: string;
  subItems?: Omit<NavItem, "subItems">[];
  selected?: boolean;
}

export interface AppBarProps {
  id?: string;
  class?: string;
  title?: string;
  leadingItems: NavItem[];
  trailingItems: NavItem[];
  style?: string;
}

export interface AppBarEvents {}

export interface AppBarSlots {
  logo: {};
  left: {};
  right: {};
}

declare class AppBar extends SvelteComponentTyped<
  AppBarProps,
  AppBarEvents,
  AppBarSlots
> {}

export default AppBar;
