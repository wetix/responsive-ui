import type { SvelteComponentTyped } from "svelte/internal";

export type SelectOption = {
  label: string;
  disabled?: boolean;
  value: string;
};

interface SelectProps {
  id?: string;
  ref?: null | HTMLSelectElement;
  name?: string;
  size?: number;
  multiple?: false;
  value?: string | string[];
  disabled?: boolean;
  readonly?: boolean;
  options: SelectOption[];
  style?: string;
}

export interface SelectEvents {
  change?: any;
  blur?: any;
}

declare class Select extends SvelteComponentTyped<SelectProps, SelectEvents> {}

export default Select;
