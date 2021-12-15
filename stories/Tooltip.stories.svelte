<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Tooltip from "@responsive-ui/tooltip";
  import Button from "@responsive-ui/button";
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
      <div title="Container" class="box">
        <div title="A here">Root A</div>
        <div>Nested.A</div>
        <span title="Second level nested A.">Second level nested A</span>
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
      <div style="padding: 0.5rem">
        <Button title="I'm a standard button!!! 🥸">Hover me</Button>
      </div>

      <div class="sticky" title="I'm Sticky">Sticky</div>

      <div style="display: flex; justify-content: space-between">
        <div title="Section A" class="green">A</div>
        <div title="Section B" class="green">B</div>
        <div title="Section C" class="green">C</div>
      </div>
    </div>
  </Tooltip>
</Template>

<Story template="withParent" name="Tooltip on Container" />

<style>
  .container {
    background: #f5f5f5;
  }

  .box {
    display: inline-flex;
    flex-direction: column;
    border: 1px solid green;
  }

  p,
  .green {
    border: 1px solid green;
  }

  .sticky {
    position: fixed;
    border: 1px solid green;
    top: 30px;
    right: 30px;
  }
</style>
