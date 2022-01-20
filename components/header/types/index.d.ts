import type { SvelteComponentTyped } from "svelte/internal";

export interface HeaderProps {
  id?: string;
  label: string;
  title?: string;
  class?: string;
  style?: string;
}

export interface HeaderSlots {
  default: Record<string, unknown>;
}

export declare class HeaderComponent extends SvelteComponentTyped<
  HeaderProps,
  Record<string, unknown>,
  HeaderSlots
> {}

export default HeaderComponent;
