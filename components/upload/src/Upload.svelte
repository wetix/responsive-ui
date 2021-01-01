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

  let loading = false;
  let file: null | HTMLInputElement;
  onMount(() => {
    if (file && directory) {
      file.setAttribute("webkitdirectory", "true");
      file.setAttribute("mozdirectory", "true");
    }
  });

  const onChange = (e: Event) => {
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
        const contentType = xhr.getResponseHeader("Content-Type");
        if (/json/i.test(contentType)) response = JSON.parse(xhr.responseText);
        loading = false;
        if (xhr.status >= 200 && xhr.status <= 299) {
          dispatch("success", {
            response,
            xhr,
          });
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
    cursor: pointer;
    display: inline-flex;
  }
</style>

<span
  class="responsive-ui-upload {className}"
  {style}
  on:change
  on:click={() => file && file.click()}>
  <slot {loading}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="24px"
      height="24px"
      viewBox="0 0 512.056 512.056"
      style="enable-background:new 0 0 512.056 512.056;"
      xml:space="preserve">
      <g>
        <g>
          <g>
            <path
              d="M426.635,188.224C402.969,93.946,307.358,36.704,213.08,60.37C139.404,78.865,85.907,142.542,80.395,218.303
				C28.082,226.93-7.333,276.331,1.294,328.644c7.669,46.507,47.967,80.566,95.101,80.379h80v-32h-80c-35.346,0-64-28.654-64-64
				c0-35.346,28.654-64,64-64c8.837,0,16-7.163,16-16c-0.08-79.529,64.327-144.065,143.856-144.144
				c68.844-0.069,128.107,48.601,141.424,116.144c1.315,6.744,6.788,11.896,13.6,12.8c43.742,6.229,74.151,46.738,67.923,90.479
				c-5.593,39.278-39.129,68.523-78.803,68.721h-64v32h64c61.856-0.187,111.848-50.483,111.66-112.339
				C511.899,245.194,476.655,200.443,426.635,188.224z" />
            <path
              d="M245.035,253.664l-64,64l22.56,22.56l36.8-36.64v153.44h32v-153.44l36.64,36.64l22.56-22.56l-64-64
				C261.354,247.46,251.276,247.46,245.035,253.664z" />
          </g>
        </g>
      </g>
    </svg>
  </slot>
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
