import type { SvelteComponentTyped } from "svelte/internal";

export type SelectOption = {
  title: string;
  selected?: boolean;
  disabled?: boolean;
  value: any;
};

export interface SelectProps {
  name?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  options: SelectOption[];
}

export interface SelectEvents {
  change?: any;
}

export interface SelectSlots {
  default: {};
}

declare class Select extends SvelteComponentTyped<
  SelectProps,
  SelectEvents,
  SelectSlots
> {}

export default Select;
