import type { SvelteComponentTyped } from "svelte/internal";

export interface BadgeProps {
  id?: string;
  title?: string;
  class?: string;
  count: number;
  max?: number;
  style?: string;
}

export interface BadgeSlots {
  default: Record<string, unknown>;
}

export declare class BadgeComponent extends SvelteComponentTyped<
  BadgeProps,
  Record<string, unknown>,
  BadgeSlots
> {}

export default BadgeComponent;
