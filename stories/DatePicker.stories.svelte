<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import DatePicker from "../components/date-picker/src/DatePicker.svelte";
</script>

<Meta
  title="Components/Date Picker"
  component={DatePicker}
  argTypes={{
    size: {
      control: { type: "select", options: ["small", "middle", "large"] },
    },
    placeholder: { control: "text" },
    name: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    bordered: { control: "boolean" },
    // backgroundColor: { control: "color" },
    onChange: { action: "onChange" },
  }}
/>

<Template let:args>
  <DatePicker {...args} on:change={args.onChange} />
</Template>

<Story
  name="Default"
  args={{
    size: "middle",
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
