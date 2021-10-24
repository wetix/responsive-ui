import type { SvelteComponentTyped } from "svelte/internal";

export interface DockProps {
  class?: string;
  open?: boolean;
  closable?: boolean;
  width?: string;
  placement?: "left" | "right";
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
