import type { SvelteComponentTyped } from "svelte/internal";

export interface BadgeProps {
  class?: string;
  count: number;
  max?: number;
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
