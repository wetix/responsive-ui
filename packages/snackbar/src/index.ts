import Snackbar from "./Snackbar.svelte";

interface SnackbarProps {
  title: string;
}

const queue = [];
const success = (props: SnackbarProps) => {
  const component = new Snackbar({
    target: document.body,
  });
  component.$$.on_destroy.push(() => {
    console.log("everything is end!");
  });
  queue.push(component);
  setTimeout(() => {
    const first = queue.shift();
    console.log(first);
    first.$destroy();
  }, 3000);
};

export default Snackbar;
export { success };
