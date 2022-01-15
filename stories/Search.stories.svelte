<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Search from "@responsive-ui/search";
</script>

<Meta
  title="Components/Search"
  component={Search}
  argTypes={{
    label: { control: "text" },
    value: { control: "text" },
    outline: { control: "boolean" }
  }}
/>

<Template let:args>
  <Search {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    label: "Hello World",
    placeholder: "Input your text...",
    value: "test"
  }}
/>
