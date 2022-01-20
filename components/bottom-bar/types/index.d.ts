import type { SvelteComponentTyped } from "svelte/internal";

export interface BottomBarProps {
  id?: string;
  title?: string;
  class?: string;
  style?: string;
}

export interface BottomBarSlots {
  default: Record<string, unknown>;
}

export declare class BottomBarComponent extends SvelteComponentTyped<
  BottomBarProps,
  Record<string, unknown>,
  BottomBarSlots
> {}

export default BottomBarComponent;
