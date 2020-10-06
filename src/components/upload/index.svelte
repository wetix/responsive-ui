<script lang="ts">
  import Button from "../button/index.svelte";
  import Progress from "../progress/index.svelte";

  export let name = "file",
    disabled = false,
    method = "post",
    url = "",
    headers = {},
    accept = ".jpg, .jpeg, .png",
    timeout = 10000,
    withCredentials = false,
    multiple = false,
    onBeforeUpload = () => {};

  let file;
  let fileList = [];

  class CustomFile {
    public name: string;
    public image: HTMLImageElement;
  }

  const onFileChange = ({ target }) => {
    const { files } = target;
    console.log(files);
    const file = files[0];

    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file);

      const f = new CustomFile();
      f.name = file.name;
      f.image = new Image();
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        f.image.src = e.target.result.toString();
      });
      reader.readAsDataURL(file);

      fileList.push(f);

      promises.push(
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append(name, files[i]);
          const xhr = new XMLHttpRequest();
          // xhr.responseType = "json";

          console.log(formData);
          xhr.onload = function () {
            console.log(`Loaded: ${xhr.status} ${xhr.response}`);
          };
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 3) {
              // loading
            }
            if (xhr.readyState == 4) {
              // request finished
            }
          };
          xhr.onerror = function () {
            // only triggers if the request couldn't be made at all
            console.log(`Network Error`);
          };

          xhr.onprogress = function (event) {
            // triggers periodically
            // event.loaded - how many bytes downloaded
            // event.lengthComputable = true if the server sent Content-Length header
            // event.total - total number of bytes (if lengthComputable)
            console.log(`Received ${event.loaded} of ${event.total}`);
          };

          xhr.open(method.toUpperCase(), url, true);
          xhr.withCredentials = withCredentials;
          xhr.timeout = timeout;
          Object.entries<string>(headers).forEach(([k, v]) => {
            xhr.setRequestHeader(k, v);
          });
          xhr.upload.onprogress = (event) => {
            fileList[i].progress = Math.round(
              (event.loaded / event.total) * 100
            );
            console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
          };
          // xhr.setRequestHeader(
          //   "Content-Type",
          //   "application/x-www-form-urlencoded"
          // );
          xhr.send(formData);
        })
      );
    }

    Promise.all(promises);
    // console.log(fileList);
  };

  const onRemoveFile = (file) => {
    console.log(file);
  };
</script>

<style lang="scss">
  .ditto-upload {
    display: inline-block;
    // border: 1px solid red;

    input[type="file"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      visibility: hidden;
    }
  }

  .files {
    .file {
      display: flex;
      align-items: center;
      border: 1px solid red;

      img {
        display: block;
        width: 50px;
        height: 50px;
      }
    }
  }
</style>

<label class="ditto-upload">
  <input
    {name}
    bind:this={file}
    type="file"
    {accept}
    {multiple}
    on:change={onFileChange} />
  <slot>
    <Button on:click={() => file.click()}>Upload</Button>
  </slot>
</label>
<div class="files">
  {#each fileList as item}
    <div class="file">
      <img src={item.image.src} alt={item.name} />
      <span>{item.name}</span>
      <Progress value={item.progress} />
      <span on:click={() => onRemoveFile(item)}>x</span>
    </div>
  {/each}
</div>
