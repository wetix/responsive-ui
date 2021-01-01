import type { SvelteComponentTyped } from "svelte/internal";

export interface SnackbarProps {
  variant: string;
  message: string;
  timeout?: number;
  rounded?: boolean;
}

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
