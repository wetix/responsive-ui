<script lang="ts">
  export let src = "";
  export let width = "110px";
  export let height = "150px";
  export let hasShadow = true;
  export let hasBorderRadius = true;
  export let size = "middle";
  export let style = "";

  let opacity = 1;
  const img = new Image();
  img.onload = () => {
    opacity = 0;
  };
  $: img.src = src;

  if (size === "small") {
    width = "80px";
    height = "115px";
  } else if (size === "extra-small") {
    width = "70px";
    height = "100px";
  }
</script>

<style lang="scss">
  .responsive-ui-poster {
    display: block;
    position: relative;
    background-size: cover;
    background-position: center;
    background-color: #f5f5f5;
    overflow: hidden;

    &--rounded {
      border-radius: 3px;
    }

    &--shadow {
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }

    .responsive-ui-poster__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #f5f5f5;
      zoom: 1;
      transition: opacity 0.5s ease;
      border-radius: 3px;
      z-index: 1;
    }
  }
</style>

<div
  class="responsive-ui-poster"
  class:responsive-ui-poster--shadow={hasShadow}
  class:responsive-ui-poster--rounded={hasBorderRadius}
  style={`background-image:url(${src});width:${width};height:${height};${style}`}
  on:click>
  <div class="responsive-ui-poster__overlay" style={`opacity:${opacity};`} />
</div>
