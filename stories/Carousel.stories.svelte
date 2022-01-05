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
    items: [
      {
        src: "https://www.themoviedb.org/t/p/w1000_and_h563_face/qw3J9cNeLioOLoR68WX7z79aCdK.jpg",
      },
      {
        src: "https://www.themoviedb.org/t/p/w1000_and_h563_face/2kzwrXJ7LUtVLohiw4xZDcB8eWz.jpg",
      },
      {
        src: "https://www.themoviedb.org/t/p/w1000_and_h563_face/4y6kEEfdrNIUnWnmELkoc3EmgG7.jpg",
      },
    ],
  }}
/>
