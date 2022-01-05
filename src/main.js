import App from "./Test_2.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
