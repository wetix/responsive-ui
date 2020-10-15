import Component from "~/components/switch/Switch.svelte";

export default {
  title: "Example/Data Input",
  component: Component,
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "onChange" },
  },
};

export const Switch = ({ onChange, ...args }) => ({
  Component,
  props: args,
  on: {
    change: onChange,
  },
});
