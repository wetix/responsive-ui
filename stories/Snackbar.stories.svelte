<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Snackbar from "@responsive-ui/snackbar";
</script>

<Meta
  title="Components/Snackbar"
  component={Snackbar}
  argTypes={{
    show: { control: "boolean" },
    message: { control: "text" },
    duration: { control: { type: "range", min: 100, max: 500, step: 10 } },
  }}
/>

<Template let:args>
  <Snackbar {...args} on:click={args.onClick} />
</Template>

<Story name="Default" args={{ message: "Hello world! 🎉" }} />
