import type { SvelteComponentTyped } from "svelte/internal";

export interface BadgeProps {
  id?: string;
  title?: string;
  class?: string;
  count: number;
  max?: number;
  style?: string;
}

export interface BadgeEvents {}

export interface BadgeSlots {
  default: {};
}

export declare class BadgeComponent extends SvelteComponentTyped<
  BadgeProps,
  BadgeEvents,
  BadgeSlots
> {}

export default BadgeComponent;
