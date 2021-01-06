import type { SvelteComponentTyped } from "svelte/internal";

export interface LinkProps {
  title: string;
  href: string;
}

export interface LinkEvents {}

export interface LinkSlots {
  default: {};
}

declare class Link extends SvelteComponentTyped<
  LinkProps,
  LinkEvents,
  LinkSlots
> {}

export default Link;
