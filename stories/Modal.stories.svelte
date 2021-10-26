<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Modal from "../components/modal/src/Modal.svelte";
</script>

<Meta
  title="Components/Modal"
  component={Modal}
  argTypes={{
    title: { control: "text" },
    content: { control: "text" },
    open: { control: "boolean" },
    closable: { control: "boolean" },
    maskClosable: { control: "boolean" },
    onCancel: { action: "onCancel" },
    onConfirm: { action: "onClick" },
  }}
/>

<Template let:args>
  <Modal {...args} on:confirm={args.onConfirm} on:cancel={args.onCancel}
    >{args.content}</Modal
  >
</Template>

<Story
  name="Default"
  args={{
    title: "Responsive UI Modal",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }}
/>
