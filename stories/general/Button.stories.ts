import Component from "~/components/button/Button.svelte";

export default {
  title: "Example/General",
  component: Component,
  argTypes: {
    title: { control: "text" },
    name: { control: "text" },
    secondary: { control: "boolean" },
    disabled: { control: "boolean" },
    type: {
      control: { type: "select", options: ["button", "submit", "reset"] },
    },
    onClick: { action: "onClick" },
  },
};

export const Button = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});
Button.args = {
  title: "Button",
  type: "button",
};
