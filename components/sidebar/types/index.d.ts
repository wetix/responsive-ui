import type { SvelteComponentTyped } from "svelte/internal";

export interface SidebarProps {
  id?: string;
  class?: string;
  style?: string;
  top?: string;
  side?: "left" | "right";
  open?: boolean;
}

export interface SidebarSlots {
  default: Record<string, unknown>;
}

export declare class SidebarComponent extends SvelteComponentTyped<
  SidebarProps,
  Record<string, unknown>,
  SidebarSlots
> {}

export default SidebarComponent;