import Component from "~/components/date-picker/DatePicker.svelte";

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

export const DatePicker = Template.bind({});
DatePicker.args = {
  label: "Date Picker",
  range: false,
};
