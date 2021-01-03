import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "./components/index.js",
  output: [
    {
      format: "iife",
      name: "ResponsiveUI",
      file: "components/lib/index.js",
    },
    {
      format: "es",
      file: "components/lib/index.mjs",
    },
    {
      format: "cjs",
      file: "components/lib/index.cjs",
    },
  ],
  plugins: [
    svelte({
      extensions: [".svelte"],
      preprocess: sveltePreprocess(),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      preferBuiltins: true,
      browser: true,
      dedupe: ["svelte"],
    }),

    commonjs(),

    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),
  ],
};
