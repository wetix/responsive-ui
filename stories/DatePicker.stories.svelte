<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import DatePicker from "../components/date-picker/src/DatePicker.svelte";
</script>

<Meta
  title="Example/DatePicker"
  component={DatePicker}
  argTypes={{
    size: {
      control: { type: "select", options: ["small", "default", "large"] },
    },
    placeholder: { control: "text" },
    name: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    bordered: { control: "boolean" },
    // backgroundColor: { control: "color" },
    // onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <DatePicker {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    size: "default",
    placeholder: "Select Date",
  }}
/>

<Story
  name="Small"
  args={{
    size: "small",
    placeholder: "Select Date",
  }}
/>
