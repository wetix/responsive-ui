import Component from "~/components/input/TextField.svelte";

export default {
  title: "Example/Data Input",
  component: Component,
  argTypes: {
    label: { control: "text" },
    type: {
      control: { type: "select", options: ["text", "password", "email", "number"] },
    },
  },
};

const Template = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});

export const TextField = Template.bind({});
TextField.args = {
  label: "Text Field",
  type: "text",
};
