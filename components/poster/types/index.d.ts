import type { SvelteComponentTyped } from "svelte/internal";

export interface PosterProps {
  src: string;
  width?: string;
  height?: string;
  hasShadow?: boolean;
  hasBorderRadius?: boolean;
  size?: "small" | "medium";
  style?: string;
}

export interface PosterEvents {
  click?: void;
}

declare class Poster extends SvelteComponentTyped<PosterProps, PosterEvents> {}

export default Poster;
