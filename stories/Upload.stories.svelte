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
  <Upload
    {ref}
    {...args}
    url="https://api.imgur.com/3/upload"
    headers={{ Authorization: "Client-ID a70383e65634c6d" }}
    let:uploading
    let:dragover
  >
    <div>BOX {uploading} {dragover}</div>
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
