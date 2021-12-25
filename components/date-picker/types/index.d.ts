import type { SvelteComponentTyped } from "svelte/internal";

export type DateChangeEvent = { date: null | Date; dateString: string };

export interface DatePickerProps {
  class?: string;
  open?: boolean;
  placeholder?: string;
  value?: string;
  ref?: HTMLInputElement;
  name?: string;
  readonly?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  format?: (v: Date) => string;
  disabledDate?: (v: Date) => boolean;
}

export interface DatePickerEvents {
  datechange?: CustomEvent<DateChangeEvent>;
  change?: WindowEventMap["change"];
}

export interface DatePickerSlots {}

declare class DatePicker extends SvelteComponentTyped<
  DatePickerProps,
  DatePickerEvents,
  DatePickerSlots
> {}

export default DatePicker;
