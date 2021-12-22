<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import InputNumber from "@responsive-ui/input-number";
</script>

<Meta
  title="Components/Input Number"
  component={InputNumber}
  argTypes={{
    content: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    bordered: { control: "boolean" },
    // readonly: { control: "boolean" },
  }}
/>

<Template let:args>
  <InputNumber {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    variant: "medium",
    placeholder: "0",
  }}
/>

<Story
  name="Small"
  args={{
    variant: "small",
    placeholder: "Input your text...",
  }}
/>

<Story
  name="Large"
  args={{
    variant: "large",
    placeholder: "Input your text...",
  }}
/>
