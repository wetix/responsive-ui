import type { SvelteComponentTyped } from "svelte/internal";

export type NavItem = {
  title?: string;
  icon?: string;
  value: string;
  link: string;
};

export interface AppBarProps {
  class?: string;
  title?: string;
  navItems: Array<any>;
  hasBg?: boolean;
  style?: string;
}

export interface AppBarEvents {}

export interface AppBarSlots {
  left: {};
  right: {};
}

declare class AppBar extends SvelteComponentTyped<
  AppBarProps,
  AppBarEvents,
  AppBarSlots
> {}

export default AppBar;
