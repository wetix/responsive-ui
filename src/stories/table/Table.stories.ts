import faker from "faker";
import Component from "~/components/table/Table.svelte";

export default {
  title: "Example/Data Display",
  component: Component,
  argTypes: {
    label: { control: "text" },
    primary: { control: "boolean" },
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
    },
    onClick: { action: "onClick" },
  },
};

const Template = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});

const items = Array.from(new Array(4)).map(() => ({
  a: faker.lorem.word(),
  b: faker.lorem.word(),
  c: faker.lorem.word(),
}));

export const Table = Template.bind({});
Table.args = {
  columns: [
    { title: "Column A", key: "a" },
    { title: "Column B", key: "b" },
    { title: "Column C", key: "c" },
  ],
  bordered: true,
  items,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
