<script lang="ts">
  let className = "";
  export { className as class };
  export let title = "";
  export let hasBg = false;
  export let style = "";

  let height = 200;
  let y = height;
  let clientHeight: number = 0;
  let innerWidth: number = 0;

  const handleScroll = () => {
    let offsetY = height - window.scrollY * 0.5;
    if (offsetY <= clientHeight) offsetY = 0;
    y = offsetY;
  };

</script>

<svelte:window on:scroll={handleScroll} bind:innerWidth />

<header
  class="responsive-ui-app-bar {className}"
  class:responsive-ui-app-bar--fixed={y === 0}
  class:responsive-ui-app-bar--with-bg={hasBg}
  bind:clientHeight
>
  <div class="responsive-ui-app-bar__header">
    <slot name="left">{title}</slot>
    <slot name="right" />
  </div>
  <slot />
</header>
<div style="height:{clientHeight}px" />
{#if hasBg}
  <div class="responsive-ui-app-bar__semi-circ" {style}>
    <svg {height} width="100%">
      <ellipse
        cx={innerWidth / 2}
        cy="0"
        rx={innerWidth * 0.65}
        ry={y}
        style="fill:#fc4451;"
      />
    </svg>
  </div>
{/if}

<style lang="scss">
  .responsive-ui-app-bar {
    position: fixed;
    box-sizing: border-box;
    padding: var(--padding);
    background: #fff;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;

    &--with-bg {
      background: #fc4451;
      color: #fff;
    }

    &--fixed {
      color: #000;
      background: #fff;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.5s;
      text-transform: capitalize;
      font-size: var(--font-size-lg);
      font-weight: 600;
    }

    &__semi-circ {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: -1;
      height: 210px;

      @media screen and (min-width: 640px) {
        display: none;
      }
    }

    @media screen and (min-width: 640px) {
      color: #000;
      background: #fff;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    }
  }

</style>
