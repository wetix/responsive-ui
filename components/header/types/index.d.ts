import type { SvelteComponentTyped } from "svelte/internal";

export interface HeaderProps {
  id?: string;
  label: string;
  title?: string;
  class?: string;
  style?: string;
}

export interface HeaderEvents {}

export interface HeaderSlots {
  default: {};
}

declare class Header extends SvelteComponentTyped<
  HeaderProps,
  HeaderEvents,
  HeaderSlots
> {}

export default Header;
