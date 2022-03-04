<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Modal from "@responsive-ui/modal";
</script>

<Meta
  title="Components/Modal"
  component={Modal}
  argTypes={{
    caption: { control: "text" },
    width: { control: { type: "range", min: 300, max: 1200, step: 10 } },
    content: { control: "text" },
    open: { control: "boolean" },
    hasMask: { control: "boolean" },
    outlined: { control: "boolean" },
    closable: { control: "boolean" },
    maskClosable: { control: "boolean" },
    onCancel: { action: "onCancel" },
    onConfirm: { action: "onClick" }
  }}
/>

<Template let:args>
  <Modal {...args} on:ok={args.onConfirm} on:cancel={args.onCancel}>{args.content}</Modal>
</Template>

<Story
  name="Default"
  args={{
    caption: "Responsive UI Modal",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }}
/>

<Story
  name="Outlined"
  args={{
    caption: "Outlined Modal",
    outlined: true,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }}
/>

<Story
  name="Title Overflow"
  args={{
    caption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }}
/>

<Template id="docBodyOverflow" let:args>
  <div id="appBar">Position fixed</div>
  <div>
    {#each new Array(10) as _}
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
    {/each}
    <Modal {...args} on:ok={args.onConfirm} on:cancel={args.onCancel}
      >{args.content}</Modal
    >
  </div>
</Template>

<Story
  template="docBodyOverflow"
  name="Document Body Overflow"
  args={{
    caption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }}
/>

<Template id="modalBodyOverflow" let:args>
  <Modal {...args} on:ok={args.onConfirm} on:cancel={args.onCancel}>
    {#each new Array(10) as _}
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
    {/each}</Modal
  >
</Template>

<Story
  template="modalBodyOverflow"
  name="Content Overflow"
  args={{
    caption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  }}
/>

<Story template="modalBodyOverflow" name="Content Overflow without Title" />

<style>
  #appBar {
    position: fixed;
    background: #000;
    color: #fff;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px;
    z-index: 10;
  }
</style>
