import type { SvelteComponentTyped } from "svelte/internal";

export interface BadgeProps {
  count: number;
  max?: number;
  class?: string;
  style?: string;
}

export interface BadgeEvents {}

export interface BadgeSlots {}

declare class Badge extends SvelteComponentTyped<
  BadgeProps,
  BadgeEvents,
  BadgeSlots
> {}

export default Badge;
