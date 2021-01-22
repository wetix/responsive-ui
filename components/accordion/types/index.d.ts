import type { SvelteComponentDev, SvelteComponentTyped } from "svelte/internal";

export interface AccordionItem {
  title: string;
  content: string | SvelteComponentDev;
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
