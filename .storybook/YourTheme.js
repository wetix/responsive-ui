import { create } from "@storybook/theming";

const primary = "#fc4451";

export default create({
  base: "light",
  brandTitle: "WeTix responsive-ui",
  brandUrl: "https://wetix.my",
  brandImage: "/wetix.svg",
  colorPrimary: primary,
  appBorderColor: primary,
  appBorderRadius: 12,
  barSelectedColor: primary,
  inputBorder: primary
});