<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Table from "../components/table/src/Table.svelte";
</script>

<Meta
  title="Components/Table"
  component={Table}
  argTypes={{
    label: { control: "text" },
    // size: {
    //   control: { type: "select", options: ["small", "default", "large"] },
    // },
    // type: { control: "text" },
    disabled: { control: "boolean" },
    // backgroundColor: { control: "color" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Table {...args} on:click={args.onClick}>
    {args.label}
  </Table>
</Template>

<Story
  name="Default"
  args={{
    label: "Button",
  }}
/>
