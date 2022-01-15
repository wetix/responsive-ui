<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Header from "@responsive-ui/header";
</script>

<Meta
  title="Components/Header"
  component={Header}
  argTypes={{
    label: { control: "text" }
  }}
/>

<Template let:args>
  <Header {...args} on:click={args.onClick}>
    <a href="/" on:click|preventDefault>view more</a>
  </Header>
</Template>

<Story
  name="Default"
  args={{
    label: "Component Title"
  }}
/>
