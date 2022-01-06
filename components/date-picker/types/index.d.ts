import type { SvelteComponentTyped } from "svelte/internal";

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

export type DatePickerDateChangeEvent = {
  date: null | Date;
  dateString: string;
};

export interface DatePickerEvents {
  focus?: WindowEventMap["focus"];
  blur?: WindowEventMap["blur"];
  change?: WindowEventMap["change"];
  datechange?: CustomEvent<DateChangeEvent>;
}

export interface DatePickerSlots {}

export declare class DatePickerComponent extends SvelteComponentTyped<
  DatePickerProps,
  DatePickerEvents,
  DatePickerSlots
> {}

export default DatePickerComponent;
