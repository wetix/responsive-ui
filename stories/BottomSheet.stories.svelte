<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import BottomSheet from "@responsive-ui/bottom-sheet";
</script>

<Meta
  title="Components/Bottom Sheet"
  component={BottomSheet}
  argTypes={{
    open: { control: "boolean" },
    outline: { control: "boolean" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <BottomSheet {...args} on:click={args.onClick}>
    <div style="padding: 1rem;">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </div>
  </BottomSheet>
</Template>

<Story
  name="Default"
  args={{
    open: true,
    label: "Button",
  }}
/>
