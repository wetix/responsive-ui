<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "@responsive-ui/button";
</script>

<Meta
  title="Components/Button"
  component={Button}
  argTypes={{
    label: { control: "text" },
    variant: {
      control: { type: "select", options: ["default", "primary"] },
    },
    disabled: { control: "boolean" },
    outline: { control: "boolean" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Button {...args} on:click={args.onClick}>
    {args.label}
  </Button>
</Template>

<Story
  name="Primary"
  args={{
    variant: "primary",
    label: "Button",
  }}
/>

<Story
  name="Default"
  args={{
    label: "Button",
  }}
/>
