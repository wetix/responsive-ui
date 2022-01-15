<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Upload from "@responsive-ui/upload";
  // import { createApi } from "unsplash-js";

  // const unsplash = createApi({
  //   accessKey: "WP8jQGd-JRYdd6eRqSEC4h490qo4ftV8uQzYqUXsNcA",
  //   fetch,
  // });

  // let photos = [];
  // unsplash.photos.list({}).then(({ response }) => {
  //   const { results } = response;
  //   console.log(results);
  // });
</script>

<Meta
  title="Components/Upload"
  component={Upload}
  argTypes={{
    label: { control: "text" },
    value: { control: "text" },
    outline: { control: "boolean" }
  }}
/>

<Template let:args>
  <Upload
    {...args}
    url="https://api.imgur.com/3/upload"
    headers={{ Authorization: "Client-ID a70383e65634c6d" }}
    let:dragover
  >
    <div class="drop-area" class:drop-area--dragover={dragover}>BOX</div>
  </Upload>
</Template>

<Story name="Default" />

<Story name="Upload directory" args={{ directory: true }} />

<style>
  .drop-area {
    border: 1px solid #dcdcdc;
    background: #f5f5f5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 360px;
    max-width: 100%;
    height: 150px;
  }

  .drop-area--dragover {
    border-color: red;
    border-style: dashed;
  }
</style>
