import Component from "~/components/image/Image.svelte";

export default {
  title: "Example/General",
  component: Component,
  argTypes: {
    type: {
      src: { control: "text" },
      width: { control: "text" },
      height: { control: "text" },
      aspectRatio: { control: "text" },
    },
  },
};

const Template = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});

export const ResponsiveImage = Template.bind({});
ResponsiveImage.args = {
  label: "Radio button",
  src: "https://source.unsplash.com/random"
};
