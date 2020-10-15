import faker from "faker";

import Component from "~/components/input/Select.svelte";

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
    multiple: { control: "boolean" },
    returnObject: { control: "boolean" },
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
  label: "Selection",
};
