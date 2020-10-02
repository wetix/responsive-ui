import type { SvelteComponent } from "svelte";

import Dock from "./Dock.svelte";

interface Props {
  target: HTMLElement;
  duration: number;
  title: string | SvelteComponent;
  description: string | SvelteComponent;
  onClose: () => {};
  onClick: () => {};
}

export const open = (props: Props) => {
  props = Object.assign({ target: document.body }, props);
  const { target, ...otherProps } = props;
  const component = new Dock({
    target,
    props: otherProps,
  });
};
