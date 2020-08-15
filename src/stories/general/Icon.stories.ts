import Component from "~/components/icon/Icon.svelte";

export default {
  title: "Example/General",
  component: Component,
  argTypes: {
    type: {
      control: { type: "select", options: ["close", "submit", "reset"] },
    },
  },
};

export const Icon = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});
