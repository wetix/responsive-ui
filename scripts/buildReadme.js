import fs from "fs";
import path from "path";
import chalk from "chalk";

/**
 *
 * @param {string} relPath - Relative path for the component
 * @param {string} pkgName - Package name
 * @param {string} pkgDesc - Package description
 * @return {string} - README string
 */
const toTemplateString = (relPath, pkgName, pkgDesc) => {
  return `
# ${pkgName}

> ${pkgDesc}

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/${pkgName}.svg)](https://www.npmjs.com/package/${pkgName})
[![Bundle Size](https://badgen.net/bundlephobia/minzip/${encodeURIComponent(
    pkgName
  )})](https://bundlephobia.com/result?p=${encodeURIComponent(pkgName)})
[![download](https://img.shields.io/npm/dw/${pkgName}.svg)](https://www.npmjs.com/package/${pkgName})
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/main/LICENSE)

</p>

## 🔨 Install

\`\`\`console
npm install ${pkgName}
\`\`\`

or

\`\`\`console
yarn add ${pkgName}
\`\`\`

## 🔋 Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="200px">

## 📄 License

[${pkgName}](https://github.com/wetix/responsive-ui/tree/main/${relPath}) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/main/LICENSE).

## 🎉 Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
`;
};

(async function createREADME() {
  const root = "./components";
  const folderPath = path.resolve(root);
  const folders = fs.readdirSync(folderPath);

  for (let i = 0; i < folders.length; i++) {
    const file = folders[i];

    // skip .DS_STORE file in mac
    if (/^(.ds_store|lib)$/i.test(file)) continue;
    // skip file with extension
    const ext = path.extname(file).toLowerCase();
    if (ext) continue;

    // read `package.json`
    const basePath = `${folderPath}/${file}`;
    /** @type {{name: string, description: string}} */
    const pkg = JSON.parse(
      fs.readFileSync(path.resolve(`${basePath}/package.json`), "utf8")
    );

    const content = toTemplateString(
      path.relative(process.cwd(), basePath),
      pkg.name,
      pkg.description
    );

    fs.writeFileSync(path.resolve(`${basePath}/README.md`), content);

    console.log(`Generated ${chalk.blue("README")} for ${chalk.green(file)}`);
  }

  console.log(chalk.green("Successfully generated README files."));
})();
