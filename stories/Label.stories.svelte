<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Input from "@responsive-ui/input";
  import Label from "@responsive-ui/label";
</script>

<Meta
  title="Components/Label"
  component={Label}
  argTypes={{
    label: { control: "text" }
  }}
/>

<Template let:args>
  <Label {...args} on:click={args.onClick}>
    <Input type="text" name="name" />
  </Label>
</Template>

<Story
  name="Default"
  args={{
    label: "Email Address"
  }}
/>
