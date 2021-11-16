import type { SvelteComponentTyped } from "svelte/internal";

export type NavItem = {
  label?: string;
  icon?: string;
  value: string;
  link: string;
};

export interface AppBarProps {
  id?: string;
  class?: string;
  logoSrc?: string;
  title?: string;
  navItems: Array<any>;
  hasBg?: boolean;
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
