<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let name = "file";
  export let url = "";
  export let headers = {};
  export let accept = "image/*";
  export let withCredentials = true;
  export let directory = false;
  export let multiple = false;
  export let value = "";
  export let style = "";
  //   export let files = [];

  let file: null | HTMLInputElement;
  onMount(() => {
    if (file && directory) {
      file.setAttribute("webkitdirectory", "true");
      file.setAttribute("mozdirectory", "true");
    }
  });

  const onChange = (e: Event) => {
    const { files } = <HTMLInputElement>e.target;

    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.withCredentials = withCredentials;
    Object.entries<string>(headers).forEach(([k, v]) => {
      xhr.setRequestHeader(k, v);
    });
    xhr.addEventListener("loadstart", (e) => {
      dispatch("progress", e);
    });
    xhr.addEventListener("error", (e) => {
      dispatch("error", e);
    });
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 299) {
          dispatch("success", xhr);
        } else if (xhr.status >= 400) {
          dispatch("error", xhr);
        }
      }
    });

    if (multiple) {
      for (let i = 0; i < files.length; i++) {
        formData.append(`${name}[]`, files[i]);
      }
    } else {
      formData.append(name, files[0]);
    }

    xhr.send(formData);
  };
</script>

<style lang="scss">
  .responsive-ui-upload {
    display: inline-block;
  }
</style>

<span
  class="responsive-ui-upload {className}"
  {style}
  on:change
  on:click={() => file && file.click()}>
  <slot />
  <input
    bind:this={file}
    type="file"
    {name}
    bind:value
    {multiple}
    {accept}
    on:change={onChange}
    style="display:none;"
    tabindex="-1" />
</span>
