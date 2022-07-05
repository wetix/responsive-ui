<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import DatePicker from "@responsive-ui/date-picker";
</script>

<Meta
  title="Components/Date Picker"
  component={DatePicker}
  argTypes={{
    name: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    bordered: { control: "boolean" },
    useNative: { control: "boolean" },
    onChange: { action: "onChange" },
    onDateChange: { action: "onChange" },
    spanWidth: { control: "boolean" }
  }}
/>

<Template let:args>
  <DatePicker
    {...args}
    on:change={args.onChange}
    on:error={(e) => console.log(e.detail)}
    on:datechange={args.onDateChange}
  />
</Template>

<Story name="Default" />

<Story
  name="With Default Value"
  args={{
    value: "2018-02-24",
    placeholder: "Select Date"
  }}
/>
