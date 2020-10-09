import Component from "~/components/checkbox/Checkbox.svelte";

export default {
  title: "Example/Data Input",
  component: Component,
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "onChange" },
  },
};

export const Checkbox = ({ onChange, ...args }) => ({
  Component,
  props: args,
  on: {
    change: onChange,
  },
});
