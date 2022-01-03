<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import ActionSheet from "@responsive-ui/action-sheet";
</script>

<Meta
  title="Components/Action Sheet"
  component={ActionSheet}
  argTypes={{
    open: { control: "boolean" },
    onTabChange: { action: "onTabChange" },
    onValueChange: { action: "onValueChange" },
    onReset: { action: "onReset" },
    onOk: { action: "onOk" },
  }}
/>

<Template let:args>
  <ActionSheet
    {...args}
    on:tabchange={args.onTabChange}
    on:valuechange={args.onValueChange}
    on:reset={args.onReset}
    on:ok={args.onOk}
  >
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book. It has survived not only five centuries, but also
    the leap into electronic typesetting, remaining essentially unchanged. It
    was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum.
  </ActionSheet>
</Template>

<Story
  name="Default"
  args={{
    open: true,
    caption: "Mobile App",
    items: [
      {
        key: "a",
        label: "Section A",
        options: new Array(20).fill("").map((_, idx) => ({
          label: `Option ${idx + 1}`,
          disabled: [0, 5, 8].includes(idx) ? true : false,
          selected: [2, 3].includes(idx) ? true : false,
          value: `option_${idx + 1}`,
        })),
      },
      {
        key: "b",
        label: "Section B",
      },
      {
        key: "c",
        label: "Section C",
      },
      {
        key: "d",
        label: "Section D",
      },
      {
        key: "z",
        label: "Section Z (Lorem Ipsum)",
      },
    ],
    label: "Button",
  }}
/>
