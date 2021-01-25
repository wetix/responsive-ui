import type { SvelteComponentTyped } from "svelte/internal";

interface TwoOrMoreArray<T> extends Array<T> {
  0: T;
  1: T;
}

export type StepperItem = {
  title: string;
  description?: string;
};

export interface StepperProps {
  items: TwoOrMoreArray<StepperItem>;
  class?: string;
  style?: string;
}

export interface StepperEvents {
  change?(e: CustomEvent<number>): void;
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
