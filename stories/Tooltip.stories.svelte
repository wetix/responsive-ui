<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Tooltip from "@responsive-ui/tooltip";
</script>

<Meta title="Components/Tooltip" component={Tooltip} argTypes={{}} />

<!-- <Template let:args>
  <Tooltip
    text="Hello world!"
    {...args}
    on:confirm={args.onConfirm}
    on:cancel={args.onCancel}
  >
    <svelte:fragment>
      <p title="A here">A</p>
      <p title="B Here">B</p>
      <p>C</p>
      <p>D</p>
      <p>E</p>
    </svelte:fragment>
  </Tooltip>
</Template>

<Story
  name="Default"
  args={{
    title: "Responsive UI Modal",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }}
/> -->

<Template let:args id="withParent">
  <Tooltip
    text="Hello world!"
    {...args}
    on:confirm={args.onConfirm}
    on:cancel={args.onCancel}
  >
    <div class="container">
      <div title="A here">
        <div>Root A</div>
        <div>Nested.A</div>
      </div>
      <p title="B Here">B</p>
      <p>C</p>
      <p
        title="Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <p>E</p>
      <button>Hover me</button>
    </div>
  </Tooltip>
</Template>

<Story template="withParent" name="Tooltip on Container" />
