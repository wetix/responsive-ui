<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Tag from "../components/tag/src/Tag.svelte";
</script>

<Meta
  title="Components/Tag"
  component={Tag}
  argTypes={{
    label: { control: "text" },
    value: { control: "text" },
    outline: { control: "boolean" },
  }}
/>

<Template let:args>
  <Tag {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    label: "Hello World",
    placeholder: "Input your text...",
    value: "test",
  }}
/>
