import type { SvelteComponentTyped } from "svelte/internal";

export interface BottomBarProps {
  class?: string;
  style?: string;
}

declare class BottomBar extends SvelteComponentTyped<BottomBarProps> {}

export default BottomBar;
