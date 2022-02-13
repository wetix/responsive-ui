<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Quantity from "@responsive-ui/quantity";
</script>

<Meta
  title="Components/Quantity"
  component={Quantity}
  argTypes={{
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    min: { control: { type: "range", min: 0, max: 100, step: 1 } },
    max: { control: { type: "range", min: 1, max: 100, step: 1 } },
    step: { control: { type: "range", min: 1, max: 10, step: 1 } },
    onClick: { action: "onClick" },
    onChange: { action: "onChange" }
  }}
/>

<Template let:args>
  <Quantity
    {...args}
    on:click={args.onClick}
    on:input={args.onChange}
    on:change={args.onChange}
    on:mouseup={args.onChange}
    on:keyup={args.onChange}
  />
</Template>

<Story
  name="Default"
  args={{
    disabled: false,
    min: 5,
    max: 99,
    value: 0
  }}
/>

<Template id="eventBubbling" let:args>
  <div on:change={args.onChange}>
    <div>
      <Quantity
        {...args}
        on:click={args.onClick}
        on:input={args.onChange}
        on:mouseup={args.onChange}
        on:keyup={args.onChange}
      />
    </div>
    <div>
      <Quantity
        {...args}
        on:click={args.onClick}
        on:input={args.onChange}
        on:mouseup={args.onChange}
        on:keyup={args.onChange}
      />
    </div>
    <Quantity
      {...args}
      on:click={args.onClick}
      on:input={args.onChange}
      on:mouseup={args.onChange}
      on:keyup={args.onChange}
    />
  </div>
</Template>

<Story
  name="Event Bubbling on onchange"
  template="eventBubbling"
  args={{
    disabled: false,
    min: 5,
    max: 99,
    value: 0
  }}
/>
