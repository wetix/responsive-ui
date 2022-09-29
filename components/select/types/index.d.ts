import type { SvelteComponentTyped } from "svelte/internal";

export type SelectOption = {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  value: string;
};

export interface SelectProps {
  id?: string;
  ref?: HTMLElement;
  name?: string;
  size?: number;
  multiple?: boolean;
  value?: string | string[];
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  options: SelectOption[];
  style?: string;
}

export interface SelectEvents {
  change?: WindowEventMap["change"];
  blur?: WindowEventMap["blur"];
}

export declare class SelectComponent extends SvelteComponentTyped<
  SelectProps,
  SelectEvents
> {}

export default SelectComponent;
