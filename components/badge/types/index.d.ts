import type { SvelteComponentTyped } from "svelte/internal";

export interface BadgeProps {
  id?: string;
  class?: string;
  count: number;
  max?: number;
  style?: string;
}

export interface BadgeEvents {}

export interface BadgeSlots {
  default: {};
}

declare class Badge extends SvelteComponentTyped<
  BadgeProps,
  BadgeEvents,
  BadgeSlots
> {}

export default Badge;
