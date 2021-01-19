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
  size?: number;
  disabled?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  options: SelectOption[];
}

export interface SelectEvents {
  blur?: any;
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
