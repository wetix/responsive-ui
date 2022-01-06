import type { SvelteComponentTyped } from "svelte/internal";

export interface BottomBarProps {
  id?: string;
  title?: string;
  class?: string;
  style?: string;
}

export interface BottomBarEvents {}

export interface BottomBarSlots {
  default: {};
}

export declare class BottomBarComponent extends SvelteComponentTyped<
  BottomBarProps,
  BottomBarEvents,
  BottomBarSlots
> {}

export default BottomBarComponent;
