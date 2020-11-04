import Component from "~/components/input/Radio.svelte";

export default {
  title: "Example/Data Input",
  component: Component,
  argTypes: {
    label: { control: "text" },
  },
};

const Template = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});

export const Radio = Template.bind({});
Radio.args = {
  label: "Radio button"
};
