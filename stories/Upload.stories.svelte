<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Upload from "../components/upload/src/Upload.svelte";
</script>

<Meta
  title="Components/Upload"
  component={Upload}
  argTypes={{
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    bordered: { control: "boolean" },
    readonly: { control: "boolean" },
  }}
/>

<Template let:args>
  <Upload {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    placeholder: "Input your text...",
  }}
/>

<Story
  name="Dropzone"
  args={{
    placeholder: "Input your text...",
  }}
/>
