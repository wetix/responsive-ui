<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import InputNumber from "@responsive-ui/input-number";
</script>

<Meta
  title="Components/Input Number"
  component={InputNumber}
  argTypes={{
    content: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    bordered: { control: "boolean" },
    direction: {
      control: { type: "select", options: ["ltr", "rtl"] },
    },
    // readonly: { control: "boolean" },
  }}
/>

<Template let:args>
  <InputNumber {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    placeholder: "0.00",
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
    placeholder: "0.00",
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
    direction: "rtl",
    placeholder: "0.00",
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
    direction: "rtl",
    placeholder: "0.00",
  }}
/>
