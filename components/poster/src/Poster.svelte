<script lang="ts">
  let className = "";
  export { className as class };
  export let src = "";
  export let alt = "";
  export let type = "portrait";
  export let responsive = true;
  export let shadowed = true;
  export let rounded = true;

  let opacity = 0;

  if (Image) {
    opacity = 1;
    const img = new Image();
    img.onload = () => {
      opacity = 0;
    };
    img.alt = alt;
    img.src = src;
  }
</script>

<div
  {...$$restProps}
  class="resp-poster resp-poster--{type} {className}"
  class:resp-poster--responsive={responsive}
  class:resp-poster--shadowed={shadowed}
  class:resp-poster--rounded={rounded}
  style={`background-image: url(${src})`}
  on:click
>
  <!-- <picture>
    <source srcset="logo-768.png 768w, logo-768-1.5x.png 1.5x" />
    <source srcset="logo-480.png, logo-480-2x.png 2x" />
    <img {src} {alt} />
  </picture> -->
  <div class="resp-poster__overlay" style={`opacity: ${opacity}`} />
</div>

<style lang="scss">
  .resp-poster {
    display: block;
    position: relative;
    background-size: cover;
    background-position: center;
    background-color: #f5f5f5;
    overflow: hidden;
    width: 120px;
    height: 170px;

    &--landscape {
      width: 250px;
      height: 135px;
    }

    &--rounded {
      border-radius: var(--border-radius-sm, 3px);
    }

    &--shadowed {
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }

    .resp-poster__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #f5f5f5;
      zoom: 1;
      transition: opacity 0.5s ease;
      border-radius: var(--border-radius-sm, 3px);
      z-index: 1;
    }

    &--responsive {
      @media screen and (min-width: 640px) {
        width: 147px;
        height: 210px;
      }

      @media screen and (min-width: 1024px) {
        width: 165px; // 300px
        height: 225px; // 450px
      }
    }
  }
</style>
