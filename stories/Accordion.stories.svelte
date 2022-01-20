<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Accordion from "@responsive-ui/accordion";
  import Quantity from "@responsive-ui//quantity";
</script>

<Meta
  title="Components/Accordion"
  component={Accordion}
  argTypes={{
    disabled: { control: "boolean" },
    collapsed: { control: "boolean" }
  }}
/>

<Template let:args>
  <Accordion {...args} on:click={args.onClick}>
    <div>Quantity is <Quantity /></div>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
    has been the industry's standard dummy text ever since the 1500s, when an unknown printer
    took a galley of type and scrambled it to make a type specimen book. It has survived not
    only five centuries, but also the leap into electronic typesetting, remaining essentially
    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
    including versions of Lorem Ipsum.
  </Accordion>
</Template>

<Story
  name="Default"
  args={{
    caption: "Click to toggle"
  }}
/>

<Template id="titleOverlow" let:args>
  <Accordion {...args} on:click={args.onClick}>
    <svelte:fragment slot="label">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s, when an
      unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the 1960s with
      the release of Letraset sheets containing Lorem Ipsum passages, and more recently
      with desktop publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </svelte:fragment>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
    has been the industry's standard dummy text ever since the 1500s, when an unknown printer
    took a galley of type and scrambled it to make a type specimen book. It has survived not
    only five centuries, but also the leap into electronic typesetting, remaining essentially
    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
    including versions of Lorem Ipsum.
  </Accordion>
</Template>

<Story
  template="titleOverlow"
  name="Title overflow"
  args={{
    variant: "primary"
  }}
/>
