import svelte from "vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export default {
  plugins: [
    svelte({
      preprocess,
    }),
  ],
  rollupDedupe: ["svelte"],
};
