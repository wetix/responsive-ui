<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Docker from "@responsive-ui/docker";
</script>

<Meta
  title="Components/Docker"
  component={Docker}
  argTypes={{
    caption: { control: "text" },
    width: { control: { type: "range", min: 280, max: 600, step: 10 } },
    placement: {
      control: { type: "select", options: ["left", "right"] }
    },
    open: { control: "boolean" },
    maskClosable: { control: "boolean" }
  }}
/>

<Template let:args>
  <Docker {...args} width={`${args.width}px`} on:click={args.onClick}>
    <div style="padding: 1rem">
      {#each new Array(10) as _}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </p>
      {/each}
    </div>
  </Docker>
</Template>

<Story
  name="Default"
  args={{
    caption: "Such as Long Docker Title",
    open: true,
    width: 280
  }}
/>

<Story
  name="Placement Right"
  args={{
    caption: "Such as Long Docker Title",
    open: true,
    placement: "right",
    width: 280
  }}
/>
