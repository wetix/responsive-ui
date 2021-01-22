import type { SvelteComponentTyped } from "svelte/internal";

export interface AccordionItem {
  title: string;
  content: any;
}

export interface AccordionProps {
  class?: string;
  items: AccordionItem[];
  multiple?: boolean;
  style?: string;
}

export interface AccordionEvents {}

export interface AccordionSlots {}

declare class Accordion extends SvelteComponentTyped<
  AccordionProps,
  AccordionEvents,
  AccordionSlots
> {}

export default Accordion;
