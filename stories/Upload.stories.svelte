<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Upload from "@responsive-ui/upload";

  let ref = null;
</script>

<Meta
  title="Components/Upload"
  component={Upload}
  argTypes={{
    label: { control: "text" },
    value: { control: "text" },
    outline: { control: "boolean" },
  }}
/>

<Template let:args>
  <Upload {ref} {...args}>
    <div let:uploading let:dragover>BOX {uploading} {dragover}</div>
  </Upload>
</Template>

<Story
  name="Default"
  args={{
    label: "Hello World",
    placeholder: "Input your text...",
    value: "test",
  }}
/>
