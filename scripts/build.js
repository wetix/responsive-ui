import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { rollup } from "rollup";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import sveltePreprocess from "svelte-preprocess";

const extractCss = () => {
  const styles = {};
  const order = [];
  let changes = 0;

  return {
    name: "css",
    transform(code, id) {
      // if (!filter(id)) {
      // return;
      // }

      if (!/.css/gi.test(id)) {
        return;
      }

      // // When output is disabled, the stylesheet is exported as a string
      // if (options.output === false) {
      //   return {
      //     code: 'export default ' + JSON.stringify(code),
      //     map: { mappings: '' }
      //   }
      // }

      code = code.replace(/.svelte\-[A-Z0-9]+/gi, "");

      // Track the order that each stylesheet is imported.
      if (!order.includes(id)) {
        order.push(id);
      }

      // Keep track of every stylesheet
      // Check if it changed since last render
      if (styles[id] !== code && (styles[id] || code)) {
        styles[id] = code;
        changes++;
      }

      return "";
    },
    generateBundle(opts, bundle) {
      // // No stylesheet needed
      // if (!changes || options.output === false) {
      //   return
      // }
      // changes = 0
      // // Combine all stylesheets, respecting import order
      let css = "";
      for (let x = 0; x < order.length; x++) {
        const id = order[x];
        css += styles[id] || "";
      }
      // // Emit styles through callback
      // if (typeof options.output === 'function') {
      //   options.output(css, styles, bundle)
      //   return
      // }
      // if (typeof dest !== 'string') {
      //   // Don't create unwanted empty stylesheets
      //   if (!css.length) {
      //     return
      //   }
      //   // Guess destination filename
      //   dest =
      //     opts.file ||
      //     (Array.isArray(opts.output)
      //       ? opts.output[0].file
      //       : opts.output && opts.output.file) ||
      //     opts.dest ||
      //     'bundle.js'
      //   if (dest.endsWith('.js')) {
      //     dest = dest.slice(0, -3)
      //   }
      //   dest = dest + '.css'
      // }
      // // Emit styles to file
      this.emitFile({ type: "asset", fileName: "index.css", source: css });
    },
  };
};

const production = !process.env.ROLLUP_WATCH;

const analyzePackageJson = async (bundle, filepath, pkg) => {
  const files = [pkg.main, pkg.module, pkg.browser];
  const map = new Map();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(file);
    if (!file) continue;

    const filename = path.basename(file);
    map.set(filename, true);
    if (map.has(file)) continue;

    const ext = path.extname(file).toLowerCase();
    let result = {
      file: filename,
      format: "iife",
      name: "app",
    };

    switch (ext) {
      case ".mjs":
        result = Object.assign(result, { format: "es" });
        break;
      case ".cjs":
        result = Object.assign(result, { format: "cjs" });
        break;
    }

    const { output } = await bundle.generate(result);
    for (const chunk of output) {
      const { fileName } = chunk;
      const outputPath = `${filepath}/${path.dirname(file)}/${fileName}`;

      if (chunk.type === "asset") {
        fs.outputFileSync(outputPath, chunk.source);
      } else {
        fs.outputFileSync(outputPath, chunk.code);
      }
    }
  }
};

(async function Bundle() {
  const pkgsPath = path.resolve("./packages");
  const files = fs.readdirSync(pkgsPath);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // skip .DS_STORE file in mac
    if (/^.ds_store$/i.test(file)) continue;
    const ext = path.extname(file).toLowerCase();
    if (ext) continue;
    console.log(chalk.green(file));
    const pkg = JSON.parse(
      fs.readFileSync(path.resolve(`./packages/${file}/package.json`), "utf8")
    );

    const bundle = await rollup({
      input: path.resolve(`./packages/${file}/${pkg.svelte}`),
      plugins: [
        svelte({
          compilerOptions: {
            // enable run-time checks when not in production
            dev: !production,
          },
          emitCss: true,
          // we'll extract any component CSS out into
          // a separate file - better for performance
          preprocess: sveltePreprocess(),
        }),
        extractCss(),
        // css({ output: "index.css" }),
        resolve({
          preferBuiltins: true,
          browser: true,
          dedupe: ["svelte"],
        }),
        commonjs(),
        typescript({
          sourceMap: false,
        }),
      ],
    });

    await analyzePackageJson(bundle, `./packages/${file}`, pkg);
  }
})();
