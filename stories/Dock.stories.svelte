<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Dock from "../components/docker/src/Docker.svelte";
</script>

<Meta
  title="Components/Dock"
  component={Dock}
  argTypes={{
    content: { control: "text" },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
    closable: { control: "boolean" },
  }}
/>

<Template let:args>
  <Dock {...args} on:click={args.onClick}>
    {args.content}
  </Dock>
</Template>

<Story
  name="Default"
  args={{
    content: "Hello World",
    open: true,
  }}
/>
