<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Input from "@responsive-ui/input";
</script>

<Meta
  title="Components/Input"
  component={Input}
  argTypes={{
    content: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    bordered: { control: "boolean" },
    // readonly: { control: "boolean" },
  }}
/>

<Template let:args>
  <Input {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    variant: "medium",
    placeholder: "Input your text...",
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
