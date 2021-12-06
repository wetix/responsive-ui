<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Carousel from "@responsive-ui/carousel";
</script>

<Meta
  title="Components/Carousel"
  component={Carousel}
  argTypes={{
    content: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  }}
/>

<Template let:args>
  <Carousel {...args} on:click={args.onClick}>
    {args.content}
  </Carousel>
</Template>

<Story
  name="Default"
  args={{
    disabled: false,
    content: "Apple",
  }}
/>
