import type { SvelteComponentTyped } from "svelte/internal";

export interface AlertProps {
  class?: string;
  style?: string;
}

declare class Alert extends SvelteComponentTyped<AlertProps> {}

export default Alert;
