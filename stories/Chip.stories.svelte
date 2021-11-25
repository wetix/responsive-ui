<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Chip from "../components/chip/src/Chip.svelte";
</script>

<Meta
  title="Components/Chip"
  component={Chip}
  argTypes={{
    content: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Chip {...args} on:click={args.onClick}>
    {args.content}
  </Chip>
</Template>

<Story
  name="Default"
  args={{
    content: "Hello world!",
  }}
/>
