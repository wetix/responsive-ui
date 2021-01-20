import type { SvelteComponentTyped } from "svelte/internal";

export type SelectOption = {
  title: string;
  selected?: boolean;
  disabled?: boolean;
  value: any;
};

interface SelectProp {
  name?: string;
  size?: number;
  disabled?: boolean;
  readonly?: boolean;
  options: SelectOption[];
}

interface SingleSelectProps extends SelectProp {
  value?: string;
  multiple: false;
}

interface MultipleSelectProps extends SelectProp {
  value?: string[];
  multiple: true;
}

export type SelectProps = SingleSelectProps | MultipleSelectProps;

export interface SelectEvents {
  change?: any;
  blur?: any;
}

declare class Select extends SvelteComponentTyped<SelectProps, SelectEvents> {}

export default Select;
