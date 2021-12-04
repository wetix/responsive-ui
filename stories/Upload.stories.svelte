<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Upload from "../components/upload/src/Upload.svelte";
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
  <Upload {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    label: "Hello World",
    placeholder: "Input your text...",
    value: "test",
  }}
/>
