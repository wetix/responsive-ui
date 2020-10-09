import type { SvelteComponent } from "svelte";

import Notification from "./Notification.svelte";

interface Props {
  target?: HTMLElement;
  placement: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number;
  title: string | SvelteComponent;
  description: string | SvelteComponent;
  onClose?: () => {};
  onClick?: () => {};
}

export const success = (props: Props) => {
  props = Object.assign({ duration: 3000, target: document.body }, props);
  const { target, duration, ...otherProps } = props;
  const component = new Notification({
    target,
    props: otherProps,
  });

  if (duration > 0) {
    setTimeout(() => {
      component.$destroy(); // remove component from dom
    }, duration);
  }
};

export const error = () => {};
