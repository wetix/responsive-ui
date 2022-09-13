import type { SvelteComponentTyped } from "svelte/internal";

export interface TagProps {
  id?: string;
  label?: string;
  title?: string;
  class?: string;
  closable?: boolean;
  outline?: boolean;
  color?:
    | "blue"
    | "red"
    | "green"
    | "teal"
    | "orange"
    | "yellow"
    | "purple"
    | "pink"
    | "grey"
    | string;
  style?: string;
}

export interface TagEvents {
  close?: any;
}

export interface TagSlots {
  default: {};
}

export declare class TagComponent extends SvelteComponentTyped<
  TagProps,
  TagEvents,
  TagSlots
> {}

export default TagComponent;
