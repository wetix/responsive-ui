<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Input from "@responsive-ui/input";
</script>

<Meta
  title="Components/Input"
  component={Input}
  argTypes={{
    content: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    bordered: { control: "boolean" }
  }}
/>

<Template let:args>
  <Input {...args} on:click={args.onClick} />
</Template>

<Story
  name="Default"
  args={{
    variant: "medium",
    placeholder: "Input your text..."
  }}
/>

<Template let:args id="prefixInput">
  <Input {...args} on:click={args.onClick}>
    <svg slot="prefix" viewBox="0 0 44 44" width="24px" height="24px">
      <g fill="none" fill-rule="evenodd">
        <g fill="#FC4451" fill-rule="nonzero">
          <path
            d="M19.576 10.75a8.806 8.806 0 0 0-6.624 2.993 8.826 8.826 0 1 0 6.624-2.993zm0 2.5a6.325 6.325 0 1 1 0 12.651 6.326 6.326 0 1 1 0-12.65z"
          />
          <path
            d="M25.605 25.625a1.25 1.25 0 0 1 1.666-.092l.101.092 5.492 5.491a1.25 1.25 0 0 1-1.666 1.86l-.102-.092-5.491-5.492a1.25 1.25 0 0 1 0-1.767z"
          />
        </g>
        <path d="M0 0h44v44H0z" />
      </g>
    </svg>
  </Input>
</Template>

<Story
  name="Input with prefix"
  template="prefixInput"
  args={{
    placeholder: "Input your text..."
  }}
/>

<Template let:args id="suffixInput">
  <Input {...args}>
    <svg slot="suffix" viewBox="0 0 44 44" width="24px" height="24px">
      <g fill="none" fill-rule="evenodd">
        <g fill="#FC4451" fill-rule="nonzero">
          <path
            d="M19.576 10.75a8.806 8.806 0 0 0-6.624 2.993 8.826 8.826 0 1 0 6.624-2.993zm0 2.5a6.325 6.325 0 1 1 0 12.651 6.326 6.326 0 1 1 0-12.65z"
          />
          <path
            d="M25.605 25.625a1.25 1.25 0 0 1 1.666-.092l.101.092 5.492 5.491a1.25 1.25 0 0 1-1.666 1.86l-.102-.092-5.491-5.492a1.25 1.25 0 0 1 0-1.767z"
          />
        </g>
        <path d="M0 0h44v44H0z" />
      </g>
    </svg>
  </Input>
</Template>

<Story
  name="Input with suffix"
  template="suffixInput"
  args={{
    placeholder: "Input your text..."
  }}
/>
