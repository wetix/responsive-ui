<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import ShowMore from "@responsive-ui/show-more";
</script>

<Meta title="Components/Show More" component={ShowMore} />

<Template let:args>
  <ShowMore {...args} on:confirm={args.onConfirm} on:cancel={args.onCancel}
    >{args.content}</ShowMore
  >
</Template>

<Story
  name="Default"
  args={{
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  }}
/>

<Template let:args id="overflowY">
  <ShowMore {...args} on:confirm={args.onConfirm} on:cancel={args.onCancel}>
    {#each new Array(10) as _}
      <p>
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
    {/each}</ShowMore
  >
</Template>

<Story template="overflowY" name="Content Overflow" />
