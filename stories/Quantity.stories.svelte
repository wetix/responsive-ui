<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Quantity from "@responsive-ui/quantity";
</script>

<Meta
  title="Components/Quantity"
  component={Quantity}
  argTypes={{
    label: { control: "text" },
    value: { control: "text" },
    outline: { control: "boolean" },
  }}
/>

<Template let:args>
  <Quantity {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    label: "Hello World",
    placeholder: "Input your text...",
    value: "test",
  }}
/>
