<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let id = "";
  export let ref: null | HTMLInputElement;
  export let name = "file";
  export let url = "";
  export let headers = {};
  export let accept = "image/*";
  export let withCredentials = true;
  export let directory = false;
  export let multiple = false;
  export let value = "";

  let loading = false;
  onMount(() => {
    if (ref && directory) {
      ref.setAttribute("webkitdirectory", "true");
      ref.setAttribute("mozdirectory", "true");
    }
  });

  const handleChange = (e: Event) => {
    const { files } = <HTMLInputElement>e.target;

    loading = true;
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
        let response = xhr.responseXML;
        const contentType = xhr.getResponseHeader("Content-Type") || "";
        try {
          if (xhr.status != 204 && /json/i.test(contentType))
            response = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status <= 299) {
            dispatch("success", {
              response,
              xhr,
            });
          } else if (xhr.status >= 400) {
            dispatch("error", xhr);
          }
        } catch (e) {
          dispatch("error", xhr);
        } finally {
          loading = false;
        }
      }
    });

    if (files) {
      if (multiple) {
        for (let i = 0; i < files.length; i++) {
          formData.append(`${name}[]`, files[i]);
        }
      } else {
        formData.append(name, files[0]);
      }
    }

    xhr.send(formData);
  };
</script>

<label class="resp-upload {className}" {...$$restProps}>
  <input
    {id}
    bind:this={ref}
    type="file"
    {name}
    bind:value
    {multiple}
    {accept}
    on:change={handleChange}
    on:change
    tabindex="-1"
  />
</label>

<style lang="scss" global>
  .resp-upload {
    cursor: pointer;
    display: inline-flex;
  }
</style>
