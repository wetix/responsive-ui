<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import InputNumber from "@responsive-ui/input-number";
</script>

<Meta
  title="Components/Input Number"
  component={InputNumber}
  argTypes={{
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    bordered: { control: "boolean" },
    textDirection: {
      control: { type: "select", options: ["ltr", "rtl"] }
    },
    min: { control: { type: "range", min: 0, max: 100, step: 1 } },
    max: { control: { type: "range", min: 1, max: 100, step: 1 } },
    precision: { control: { type: "range", min: 0, max: 10, step: 1 } }
    // readonly: { control: "boolean" },
  }}
/>

<Template let:args>
  <InputNumber {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    placeholder: "0.00"
  }}
/>

<Template id="withPrefix" let:args>
  <InputNumber {...args} on:click={args.onClick}>
    <svelte:fragment slot="prefix">MYR</svelte:fragment>
  </InputNumber>
</Template>

<Story
  template="withPrefix"
  name="With Prefix"
  args={{
    placeholder: "0.00"
  }}
/>

<Template id="withSuffix" let:args>
  <InputNumber {...args} on:click={args.onClick}>
    <svelte:fragment slot="suffix">$</svelte:fragment>
  </InputNumber>
</Template>

<Story
  template="withSuffix"
  name="With Suffix"
  args={{
    textDirection: "rtl",
    placeholder: "0.00"
  }}
/>

<Template id="withPrefixNSuffix" let:args>
  <InputNumber {...args} on:click={args.onClick}>
    <svelte:fragment slot="prefix">Currency</svelte:fragment>
    <svelte:fragment slot="suffix">$</svelte:fragment>
  </InputNumber>
</Template>

<Story
  template="withPrefixNSuffix"
  name="With Prefix and Suffix"
  args={{
    textDirection: "rtl",
    placeholder: "0.00"
  }}
/>
