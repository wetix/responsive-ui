import Component from "~/components/button/index.svelte";
import { success } from "~/components/notification/index.ts";

export default {
  title: "Example/General",
  component: Component,
  argTypes: {
    title: { control: "text" },
    name: { control: "text" },
    secondary: { control: "boolean" },
    disabled: { control: "boolean" },
    type: {
      control: { type: "select", options: ["button", "submit", "reset"] },
    },
  },
};

export const Notification = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click() {
      success({
        title: "Notification Title",
        description: `
        This is the content of the notification.
        This is the content of the notification.
        This is the content of the notification.`,
      });
    },
  },
});
