<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "../components/button/src/Button.svelte";
</script>

<Meta
  title="Components/Button"
  component={Button}
  argTypes={{
    label: { control: "text" },
    // size: {
    //   control: { type: "select", options: ["small", "default", "large"] },
    // },
    // type: { control: "text" },
    disabled: { control: "boolean" },
    // backgroundColor: { control: "color" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Button {...args} on:click={args.onClick}>
    {args.label}
  </Button>
</Template>

<Story
  name="Default"
  args={{
    label: "Button",
  }}
/>
