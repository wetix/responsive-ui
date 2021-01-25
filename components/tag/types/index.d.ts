import type { SvelteComponentTyped } from "svelte/internal";

export interface TagProps {
  class?: string;
  closable?: boolean;
  color?: string;
  value: string;
}

export interface TagEvents {
  close: any;
}

export interface TagSlots {
  default: {};
}

declare class Tag extends SvelteComponentTyped<TagProps, TagEvents, TagSlots> {}

export default Tag;
