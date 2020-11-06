import faker from "faker";
import Component from "~/components/table/Table.svelte";

export default {
  title: "Example/Data Display",
  component: Component,
  argTypes: {
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
  striped: true,
  items,
};
