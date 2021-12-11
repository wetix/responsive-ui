<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import DatePicker from "@responsive-ui/date-picker";
</script>

<Meta
  title="Components/Date Picker"
  component={DatePicker}
  argTypes={{
    placeholder: { control: "text" },
    name: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    bordered: { control: "boolean" },
    // backgroundColor: { control: "color" },
    onChange: { action: "onChange" },
    onDateChange: { action: "onChange" },
  }}
/>

<Template let:args>
  <DatePicker
    {...args}
    on:change={args.onChange}
    on:datechange={args.onDateChange}
  />
</Template>

<Story
  name="Default"
  args={{
    size: "middle",
    placeholder: "Select Date",
  }}
/>
