<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Textarea from "../components/textarea/src/Textarea.svelte";
</script>

<Meta
  title="Components/Textarea"
  component={Textarea}
  argTypes={{
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    bordered: { control: "boolean" },
    readonly: { control: "boolean" },
  }}
/>

<Template let:args>
  <Textarea {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    placeholder: "Input your text...",
  }}
/>
