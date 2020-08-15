import Component from "~/components/modal/Modal.svelte";

export default {
  title: "Example/General",
  component: Component,
  argTypes: {
    open: { control: "boolean" },
    closable: { control: "boolean" },
    onClick: { action: "onClick" },
    onOk: { action: "onOk" },
    onClose: { action: "onClick" },
  },
};

export const Modal = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});
Modal.args = {
  open: true,
};
