import faker from "faker";

import Component from "~/components/select/Select.svelte";

export default {
  title: "Example/Data Input",
  component: Component,
  argTypes: {
    name: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    backgroundColor: { control: "color" },
    onClick: { action: "onClick" },
  },
};

const options = Array.from(new Array(10)).map(() => ({
  title: faker.name.jobTitle(),
  value: faker.random.uuid(),
}));

export const Select = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});
Select.args = {
  options,
};
