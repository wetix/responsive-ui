import type { SvelteComponentTyped } from "svelte/internal";

export interface SnackbarProps {
  message: string;
  variant?: string;
  class?: string;
  duration?: number;
  closable?: string;
  rounded?: boolean;
}

export interface SnackbarEvents {
  close?: CustomEvent<{}>;
}

export interface SnackbarSlots {
  default: {};
}

declare class Snackbar extends SvelteComponentTyped<
  SnackbarProps,
  SnackbarEvents,
  SnackbarSlots
> {}

export default Snackbar;
