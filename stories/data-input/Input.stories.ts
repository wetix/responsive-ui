import Component from "~/components/input/Input.svelte";

// export default {
//   title: "Example/General",
//   component: Component,
//   argTypes: {
//     label: { control: "text" },
//     primary: { control: "boolean" },
//     backgroundColor: { control: "color" },
//     size: {
//       control: { type: "select", options: ["small", "medium", "large"] },
//     },
//     onClick: { action: "onClick" },
//   },
// };

const Template = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});

export const Input = Template.bind({});
Input.args = {
  title: "Submit Button",
  type: "submit",
  columns: [
    { title: "Column A", key: "a" },
    { title: "Column B", key: "b" },
    { title: "Column C", key: "c" },
  ],
  bordered: true,
};
