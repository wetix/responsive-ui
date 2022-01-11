<!-- <svelte:options accessors /> -->
<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let ref: HTMLInputElement;
  export let name = "file";
  export let method = "POST";
  export let action = "";
  export let headers: Record<string, string> = {};
  export let accept = "image/*";
  export let withCredentials = true;
  export let directory = false;
  export let multiple = false;
  export let value = "";

  let noOfFiles: number;
  let uploading = false;
  let dragover = false;
  const queue: File[] = [];

  onMount(() => {
    if (directory) {
      ref.setAttribute("directory", "true");
      ref.setAttribute("webkitdirectory", "true");
      ref.setAttribute("mozdirectory", "true");
    }
  });

  const uploadFiles = (file: File) => {
    let reader = new FileReader();
    console.log("File =>", file);
    reader.readAsDataURL(file);
    reader.onloadend = (e: Event) => {
      console.log(e);
      console.log(reader.result);
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", action, true);
    xhr.withCredentials = withCredentials;
    Object.entries(headers).forEach(([k, v]) => {
      xhr.setRequestHeader(k, v);
    });
    xhr.addEventListener("loadstart", (e) => {
      dispatch("uploadprogress", e);
    });
    xhr.upload.addEventListener("progress", function (e) {
      console.log((e.loaded * 100.0) / e.total || 100);
    });
    xhr.addEventListener("error", (e) => {
      dispatch("error", e);
    });
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        let response: unknown = xhr.responseXML;
        const contentType = xhr.getResponseHeader("Content-Type") || "";

        try {
          if (xhr.status != 204 && /json/i.test(contentType))
            response = JSON.parse(xhr.responseText) as Record<string, unknown>;
          if (xhr.status >= 200 && xhr.status <= 299) {
            dispatch("success", {
              response,
              xhr
            });
          } else if (xhr.status >= 400) {
            dispatch("error", xhr);
          }
        } catch (e) {
          dispatch("error", xhr);
        } finally {
          // uploading = false;
        }
      }
    });

    const formData = new FormData();
    // if (files) {
    //   if (multiple) {
    //     for (let i = 0; i < files.length; i++) {
    //       formData.append(`${name}[]`, files[i]);
    //     }
    //   } else {
    //   }
    // }

    formData.append(name, file);
    xhr.send(formData);
  };

  const handleSubmit = (e: Event) => {
    const { files } = <HTMLInputElement>e.target;

    uploading = true;
  };

  const dragUpload = (node: Node) => {
    console.log(node);
    return { destroy() {} };
  };

  const preventDefault = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragEnter = (e: Event) => {
    preventDefault(e);
    dragover = true;
  };

  const handleDragLeave = (e: Event) => {
    preventDefault(e);
    dragover = false;
  };

  const handleDrop = (e: DragEvent) => {
    preventDefault(e);
    const { files } = e.dataTransfer!;
    queue.push(...files);
    [...files].forEach(uploadFiles);
    // uploadFiles(files);
  };
</script>

<form {method} {action} on:submit|preventDefault|stopPropagation={handleSubmit}>
  <label
    class="resp-upload {className}"
    on:dragover={handleDragEnter}
    on:dragenter={handleDragEnter}
    on:dragleave={handleDragLeave}
    on:drop={handleDragLeave}
    on:drop={handleDrop}
    {...$$restProps}>
    <input
      bind:this={ref}
      use:dragUpload
      type="file"
      {name}
      bind:value
      {multiple}
      {accept}
      on:change
      tabindex="-1" />
    <slot {uploading} {dragover} file="" />
  </label>
</form>

<style lang="scss" global>
  .resp-upload {
    cursor: pointer;
    display: inline-flex;

    input[type="file"] {
      display: none;
    }
  }
</style>
