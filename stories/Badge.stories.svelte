<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Badge from "@responsive-ui/badge";
</script>

<Meta
  title="Components/Badge"
  component={Badge}
  argTypes={{
    onClick: { action: "onClick" }
  }}
/>

<Template let:args>
  <Badge {...args} on:click={args.onClick}>Hello world</Badge>
</Template>

<Story
  name="Default"
  args={{
    label: "Button"
  }}
/>
