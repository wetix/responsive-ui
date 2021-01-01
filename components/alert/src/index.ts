import Alert from "./Alert.svelte";

const open = () => {
  const component = new Alert({
    target: document.body,
  });
  component.$on("close", () => {
    component.$destroy();
  });
  return {
    close() {},
  };
};

export { open };
