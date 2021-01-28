import type { SvelteComponentTyped } from "svelte/internal";

export interface DatePickerProps {
  class?: string;
  ref?: null | HTMLInputElement;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  placeholder?: string;
}

export interface DatePickerEvents {
  change?: void;
}

export interface DatePickerSlots {}

declare class DatePicker extends SvelteComponentTyped<
  DatePickerProps,
  DatePickerEvents,
  DatePickerSlots
> {}

export default DatePicker;
