<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Checkbox from "@responsive-ui/checkbox";
</script>

<Meta
  title="Components/Checkbox"
  component={Checkbox}
  argTypes={{
    content: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  }}
/>

<Template let:args>
  <Checkbox {...args} on:click={args.onClick}>
    {args.content}
  </Checkbox>
</Template>

<Story
  name="Default"
  args={{
    disabled: false,
    content: "Apple",
  }}
/>

<Story
  name="Text Overflow"
  args={{
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }}
/>
