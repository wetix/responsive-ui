<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Select from "@responsive-ui/select";
</script>

<Meta
  title="Components/Select"
  component={Select}
  argTypes={{
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  }}
/>

<Template let:args>
  <Select
    {...args}
    on:click={args.onClick}
    name="select"
    placeholder="Select your fruit"
    options={[
      { label: "Unknown", value: "a" },
      { label: "Apple", value: "b" },
      { label: "Orange", value: "c", disabled: true },
      { label: "Pineapple", value: "d" },
      { label: "Coconut", value: "e" },
      { label: "Durian", value: "f" },
    ]}
  />
</Template>

<Story name="Default" args={{ value: "f" }} />

<Story name="Multiple" args={{ value: ["a", "c", "f"], multiple: true }} />
