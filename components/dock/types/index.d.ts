import type { SvelteComponentTyped } from "svelte/internal";

export interface DockProps {
  open?: boolean;
  placement?: string;
  width?: string;
  class?: string;
  style?: string;
}

export interface DockEvents {}

export interface DockSlots {
  default: {};
}

declare class Dock extends SvelteComponentTyped<
  DockProps,
  DockEvents,
  DockSlots
> {}

export default Dock;
