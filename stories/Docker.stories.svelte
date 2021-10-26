<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Docker from "../components/docker/src/Docker.svelte";
</script>

<Meta
  title="Components/Docker"
  component={Docker}
  argTypes={{
    content: { control: "text" },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
    closable: { control: "boolean" },
  }}
/>

<Template let:args>
  <Docker {...args} on:click={args.onClick}>
    {args.content}
  </Docker>
</Template>

<Story
  name="Default"
  args={{
    content: "Hello World",
    open: true,
  }}
/>
