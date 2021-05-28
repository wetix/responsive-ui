import type { SvelteComponentTyped } from "svelte/internal";

export interface AppBarProps {
  class?: string;
  title?: string;
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
