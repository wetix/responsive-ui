<script lang="ts">
  import Button from "../button/index.svelte";

  export let name = "file",
    disabled = false,
    method = "post",
    headers = {},
    withCredentials = false,
    multiple = false,
    url = "";

  const onFileChange = ({ target }) => {
    const { files } = target;
    const file = files[0];
    const formData = new FormData();
    formData.append(name, files[0]);

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", function (event) {
      alert("Yeah! Data sent and response loaded.");
    });
    xhr.addEventListener("error", function (event) {
      alert("Oops! Something went wrong.");
    });

    xhr.open(method.toUpperCase(), url, true);
    xhr.withCredentials = withCredentials;
    Object.entries<string>(headers).forEach(([k, v]) => {
      xhr.setRequestHeader(k, v);
    });
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(formData);
    console.log(files);
  };
</script>

<style lang="scss">
  .ditto-upload {
    display: inline-block;
    // border: 1px solid red;

    input {
      position: absolute;
    }
  }
</style>

<label class="ditto-upload">
  <input type="file" {multiple} on:change={onFileChange} />
  <slot>
    <Button>Upload</Button>
  </slot>
</label>
