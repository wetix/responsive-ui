<script>
  export let src = "",
    gradient = "",
    cover = false,
    aspectRatio = 16/9,
    height = "",
    width = "";


  $: imageStyle =
    src
      ? `background-image: ${gradient
          ? `linear - gradient(${gradient}), url('${src}')`
          : `url('${src}')`};background-position: center center;background-size: ${cover ? "cover" : "contain"};background-repeat: no-repeat;`
      : `background: #a0a0a0`;

  $: computedAspectRatio = () =>
     aspectRatio
      ? `${(1 / Number(aspectRatio)) * 100}%`
      : undefined;


  $: computedAspectStyle = () => {
    if (height && !width) {
      return `height: ${height}px;`;
    }

    if (!height && width) {
      return `width: ${width}px;`;
    }

    if (height && width) {
      return `height: ${height}px;width: ${width}px;`;
    }

    return "";
  }

</script>

<style lang="scss">
  .image-responsive {
    position: relative;
    overflow: hidden;
    max-width: 100%;
    display: flex;
    flex: 1 0 auto;
  }

  .image-slot {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

<div class="image-responsive" style="{computedAspectStyle()}">
  <div style="flex: 1 1 0;padding-bottom: {computedAspectRatio()}"></div>
  <div style="{imageStyle}" class="image-slot">
    <slot />
  </div>
  <div style="margin-left: -100%; flex: 1 1 0; max-width: 100%;"></div>
</div>