import Component from "~/components/input/TextArea.svelte";

export default {
  title: "Example/Data Input",
  component: Component,
  argTypes: {
    label: { control: "text" },
    resize: { control: "boolean" },
    rows: { control: "number" }
  },
};

const Template = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});

export const TextArea = Template.bind({});
TextArea.args = {
  label: "Textarea",
  resize: true,
};
