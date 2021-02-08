import { defineConfig } from "vite";
// import svelte from "rollup-plugin-svelte";
// import commonjs from "@rollup/plugin-commonjs";
// import resolve from "@rollup/plugin-node-resolve";
// import sveltePreprocess from "svelte-preprocess";
// import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [
    // svelte({
    //   extensions: [".svelte"],
    //   preprocess: sveltePreprocess(),
    //   compilerOptions: {
    //     // enable run-time checks when not in production
    //     dev: true,
    //   },
    // }),
    // commonjs(),
    // resolve({
    //   preferBuiltins: true,
    //   browser: true,
    //   dedupe: ["svelte"],
    // }),
    // typescript({
    //   sourceMap: true,
    //   inlineSources: true,
    // }),
  ],
  dedupe: ["svelte"],
  server: {
    base: "public",
    // open: true,
    port: 3600,
  },
});
