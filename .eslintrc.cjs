module.exports = {
  globals: {
    "NodeJS": true
  },
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    extraFileExtensions: [".svelte"]
  },
  env: {
    es6: true,
    browser: true
  },
  overrides: [{
    files: ["*.svelte"],
    processor: "svelte3/svelte3",
    rules: {
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-floating-promises": ["error", {
        ignoreVoid: true
      }]
    }
  }],
  settings: {
    "svelte3/typescript": require("typescript") // ignore style tags in Svelte because of Tailwind CSS
    // See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
    // "svelte3/ignore-styles": () => true,

  },
  plugins: ["svelte3", "@typescript-eslint"],
  ignorePatterns: ["node_modules"]
};