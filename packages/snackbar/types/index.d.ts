import type { SvelteComponentTyped } from "svelte/internal";

export interface SnackbarProps {}

export interface SnackbarEvents {}

export interface SnackbarSlots {
  default: {};
}

declare class Snackbar extends SvelteComponentTyped<
  SnackbarProps,
  SnackbarEvents,
  SnackbarSlots
> {}

export default Snackbar;
