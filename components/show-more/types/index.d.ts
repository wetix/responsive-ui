import type { SvelteComponentTyped } from "svelte/internal";

export interface ShowMoreProps {
  id?: string;
  title?: string;
  threshold?: number;
  class?: string;
  style?: string;
}

export interface ShowMoreSlots {
  default: Record<string, unknown>;
  trigger: Record<string, unknown>;
}

export declare class ShowMoreComponent extends SvelteComponentTyped<
  ShowMoreProps,
  Record<string, unknown>,
  ShowMoreSlots
> {}

export default ShowMoreComponent;
