import type { SvelteComponentTyped } from "svelte/internal";

export interface DockerProps {
  id?: string;
  title?: string;
  class?: string;
  open?: boolean;
  label: string;
  maskClosable?: boolean;
  width?: string;
  placement?: "left" | "right";
  style?: string;
}

export interface DockerEvents {}

export interface DockerSlots {
  default: {};
}

declare class Docker extends SvelteComponentTyped<
  DockerProps,
  DockerEvents,
  DockerSlots
> {}

export default Docker;
