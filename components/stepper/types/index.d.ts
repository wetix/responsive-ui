import type { SvelteComponentTyped } from "svelte/internal";

export type StepperItem = {
  title: string;
  description?: string;
};

export interface StepperProps {
  items: StepperItem[];
  current?: number;
  class?: string;
}

export interface StepperEvents {
  change?: any;
}

export interface StepperSlots {
  default: {};
}

declare class Stepper extends SvelteComponentTyped<
  StepperProps,
  StepperEvents,
  StepperSlots
> {}

export default Stepper;
