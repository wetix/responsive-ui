const sass = require("sass");
const custom = require("../webpack.config.js");

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
  ],
  webpackFinal: (config) => {
    // Find svelteloader from the webpack config
    const i = config.module.rules.findIndex((r, i) => {
      return r.loader && r.loader.includes("svelte-loader");
    });

    // safely inject preprocess into the config
    config.module.rules[i] = {
      ...config.module.rules[i],
      options: {
        ...config.module.rules[i].options,
        style: async ({ content, attributes }) => {
          if (attributes.type !== "text/scss" && attributes.lang !== "scss") {
            return;
          }

          const result = await sass.renderSync({
            data: content,
            sourceMap: "style.css.map",
            omitSourceMapUrl: true,
          });

          return {
            code: result.css.toString("utf8"),
            map: result.map.toString("utf8"),
          };
        },
      },
    };

    return {
      ...config,
      resolve: {
        ...custom.resolve,
      },
    };
  },
};
