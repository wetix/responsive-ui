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
  }}
/>

<Template id="docBodyOverflow" let:args>
  <div>
    {#each new Array(10) as _}
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    {/each}
    <BottomSheet {...args} on:ok={args.onConfirm} on:cancel={args.onCancel}>
      <div style="padding: 1rem">{args.content}</div></BottomSheet
    >
  </div>
</Template>

<Story
  template="docBodyOverflow"
  name="Document Body Overflow"
  args={{
    caption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }}
/>
