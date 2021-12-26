import { SvelteComponent, tick } from "svelte/internal";
import Snackbar from "./Snackbar.svelte";
import type { SnackbarProps } from "../types/Snackbarbar";

const queue: SvelteComponent[] = [];

interface SnackbarComponent {
  close(): void;
}

const show = (props: SnackbarProps): SnackbarComponent => {
  const { duration = 3000 } = props;
  props = Object.assign({ rounded: true }, props);
  const component = new Snackbar({
    target: document.body,
    props,
    intro: true,
  });

  const pos = queue.length;
  const close = () => {
    setTimeout(async () => {
      const arr = queue.splice(pos, 1);
      if (arr.length > 0) {
        arr[0].$set({ show: false });
        await tick();
        setTimeout(() => {
          arr[0].$destroy();
        }, 50);
      }
    }, duration);
  };

  if (duration > 0) {
    close();
  }
  queue.push(component);
  return {
    close,
  };
};

export default Snackbar;
export { show };
