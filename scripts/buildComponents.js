import fs from "fs";
import asyncJs from "async";
import path from "path";
import chalk from "chalk";
import { rollup } from "rollup";
import camelCase from "camelcase";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { babel } from "@rollup/plugin-babel";
import sveltePreprocess from "svelte-preprocess";

const debug = process.env.DEBUG ? process.env.DEBUG : false;
const println = (...v) => {
  debug && console.log(...v);
};

const extractCss = () => {
  const styles = {};
  let order = [];
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

      code = code.replace(/\.svelte\-[A-Z0-9]+/gi, "");

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
      // No stylesheet needed, only emit single css file
      // console.log(opts.format);
      if (opts.format !== "iife") {
        return;
      }

      // if (!changes || options.output === false) {
      //   return
      // }
      // changes = 0
      // // Combine all stylesheets, respecting import order
      let css = "";
      for (let x = 0; x < order.length; x++) {
        const id = order[x];
        css += styles[id] || "";
        styles[id] = ""; // reset style on every cycle
      }

      order = [];

      // Don't create unwanted empty stylesheets
      if (css.length == 0) {
        return;
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

      // Emit styles to file
      this.emitFile({ type: "asset", fileName: "index.css", source: css });
    },
  };
};

const production = !process.env.ROLLUP_WATCH;
const rollupPlugins = [
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
];

/**
 *
 * @param {string} filepath - Relative path
 * @param {{name: string, main: string, module: string, browser: string, svelte: string}} pkg - package.json
 */
const analyzePackageJson = async (filepath, pkg) => {
  let bundle = await rollup({
    input: path.resolve(`${filepath}/${pkg.svelte}`),
    plugins: rollupPlugins,
  });

  const name = camelCase(pkg.name.replace("@responsive-ui/", ""), {
    pascalCase: true,
  });

  const files = [pkg.main, pkg.module, pkg.browser];
  /** @type {Map<String, boolean>} */
  const map = new Map();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file) continue;

    const filename = path.basename(file);
    map.set(filename, true);
    if (map.has(file)) continue;

    let result = {
      file: filename,
    };

    switch (true) {
      case /(mjs|esm)/i.test(file):
        result = Object.assign(result, { format: "es" });
        break;

      case /(cjs)/i.test(file):
        result = Object.assign(result, { format: "cjs", exports: "auto" });
        break;

      default:
        result = Object.assign(result, { format: "iife", name });
        break;
    }

    const { output } = await bundle.generate(result);
    for (const chunk of output) {
      const { fileName } = chunk;
      const outputPath = `${filepath}/${path.dirname(file)}/${fileName}`;
      println(chalk.green(outputPath));

      fs.mkdirSync(`${filepath}/${path.dirname(file)}`, { recursive: true });

      if (chunk.type === "asset") {
        fs.writeFileSync(outputPath, chunk.source);
      } else {
        fs.writeFileSync(outputPath, chunk.code);
      }
    }
  }

  // generate
  bundle = await rollup({
    input: path.resolve(`${filepath}/${pkg.svelte}`),
    plugins: [
      ...rollupPlugins,
      babel({
        extensions: [".js", ".mjs", ".ts", ".html", ".svelte"],
        babelHelpers: "runtime",
        exclude: ["node_modules/@babel/**"],
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead",
            },
          ],
        ],
        plugins: [
          "@babel/plugin-syntax-dynamic-import",
          // "@babel/plugin-syntax-import-meta",
          [
            "@babel/plugin-transform-runtime",
            {
              useESModules: true,
            },
          ],
        ],
      }),
      terser({
        module: true,
      }),
    ],
  });

  println("Generating minify version of js.");
  const fileName = "index.min.js";
  const { output } = await bundle.generate({
    format: "iife",
    name,
    file: fileName,
  });

  const chunk = output.shift();
  const outputPath = `${filepath}/lib/${fileName}`;
  fs.outputFileSync(outputPath, chunk.code);
  println("Generated successful!", chalk.green(outputPath));
};

(async function buildScript() {
  const lernaPath = path.resolve("./lerna.json");
  /** @type {{packages: string[]}} */
  const lerna = JSON.parse(fs.readFileSync(lernaPath).toString());

  const pkgs = lerna.packages || [];
  const queue = asyncJs.queue(async (task, callback) => {
    const { basePath, pkgPath, file } = task;
    println(`Bundling for component ${chalk.green(file)}`);
    const pkg = JSON.parse(
      fs.readFileSync(path.resolve(`${basePath}/package.json`), "utf8")
    );
    const baseFolder = `${pkgPath}/${file}/lib`;
    if (fs.existsSync(baseFolder)) {
      fs.rmSync(baseFolder, { recursive: true, force: true });
    }

    // fs.mkdirSync(baseFolder, { recursive: true });

    await analyzePackageJson(basePath, pkg);
    callback && callback();
  }, 2);

  // const excFolders = `/^(${excludedFolders.join("|")})$/`
  for (let i = 0; i < pkgs.length; i++) {
    const pkgPath = path.resolve(pkgs[i].replace("/*", ""));
    const folders = fs.readdirSync(pkgPath);

    for (let j = 0; j < folders.length; j++) {
      const file = folders[j];

      // skip .DS_STORE file in mac
      if (/^(.ds_store|lib)$/i.test(file)) continue;
      // skip file with extension
      const ext = path.extname(file).toLowerCase();
      if (ext) continue;
      // if (file === "responsive-ui") {
      //   // push to end
      //   continue;
      // }

      const basePath = `${pkgPath}/${file}`;

      queue.push({ file, pkgPath, basePath });
    }
  }

  await queue.drain();

  console.log(chalk.green("Generation of bundle files completed"));
})();
