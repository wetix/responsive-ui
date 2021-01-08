import type { SvelteComponentTyped } from "svelte/internal";

export interface SnackbarProps {
  text: string;
  variant?: string;
  class?: string;
  timeout?: number;
  rounded?: boolean;
}

export interface SnackbarEvents {
  close?: void;
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
