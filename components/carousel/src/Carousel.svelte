<script lang="ts">
  import { getNodeAttribute } from "@wetix/utils";
  import { onDestroy } from "svelte";

  import type { CarouselItem } from "../types/index";

  export let heightRatio = 0.56; // slideHeight/ slideWidth
  export let gap = 10; // gap between the slides
  export let perPage = 1; // slides per page
  export let leftAndRight = 30; // left and right slide peek
  export let style = "";
  export let items: CarouselItem[] = [];
  export let autoPlay = false;

  let el: HTMLDivElement;
  let width = 0;
  let slideWidth = 0;
  let slideHeight = 0;
  let slideStyle = "";
  let translateX = 0;

  // add clone to front and back
  if (items.length > 0) {
    items.push(items[0]);
    items.unshift(items[items.length - 1]);
  }

  const onRight = () => {
    const right = Math.floor(slideWidth + gap);
    el.scrollBy(right, 0);

    const rightScrolled = el.scrollLeft;
    const carouselTotalWidth =
      slideWidth * items.length + gap * (items.length - 1) - translateX;

    if (rightScrolled >= carouselTotalWidth - width - translateX) {
      el.scrollBy(-el.scrollLeft, 0);
    }
  };

  const onLeft = () => {
    if (el.scrollLeft === 0) {
      const carouselTotalWidth =
        slideWidth * items.length + gap * (items.length - 1) - translateX;
      el.scrollBy(carouselTotalWidth - width - translateX, 0);
    }
    const left = Math.floor(slideWidth + gap);
    el.scrollBy(-left, 0);
  };

  if (autoPlay) {
    const interval = setInterval(onRight, 3000);
    onDestroy(() => {
      clearInterval(interval);
    });
  }

  const handleClick = (e: Event) => {
    const data = getNodeAttribute(e, "data-value");
    if (data) {
      window.location.href = data;
    }
  };

  $: {
    if (el) {
      slideWidth = (width - ((perPage + 1) * gap + 2 * leftAndRight)) / perPage;
      slideHeight = heightRatio * slideWidth;
      translateX = slideWidth - leftAndRight;

      slideStyle = `--slideWidth:${slideWidth}px;--slideHeight:${slideHeight}px;--slideMarginRight:${gap}px;--tx:-${translateX}px;}`;
    }
  }
</script>

<div
  style={`${style}`}
  bind:offsetWidth={width}
  class="responsive-ui-carousel"
  on:mousedown|preventDefault
  on:touchmove|preventDefault
  on:mousewheel|preventDefault
  on:click={handleClick}
>
  <div class="left-btn" style={`left:0;`} on:click|stopPropagation={onLeft}>
    &lt
  </div>
  <div class="right-btn" style={`right:0;`} on:click|stopPropagation={onRight}>
    &gt
  </div>

  <div class="responsive-ui-carousel__container" bind:this={el}>
    {#each items as item}
      <div
        class="responsive-ui-carousel__slide"
        data-value={item.url}
        style={slideStyle}
      >
        <img src={item.src} alt="" />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .responsive-ui-carousel__container {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    display: inline-flex;
    overflow-x: scroll;
    scroll-behavior: smooth;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    .responsive-ui-carousel__slide {
      cursor: pointer;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
      background-color: lightgray;
      min-width: var(--slideWidth);
      max-width: var(--slideWidth);
      min-height: var(--slideHeight);
      max-height: var(--slideHeight);
      margin-right: var(--slideMarginRight);
      transform: translateX(var(--tx));

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .responsive-ui-carousel__container::-webkit-scrollbar {
    display: none;
  }

  .right-btn,
  .left-btn {
    position: absolute;
    width: 25px;
    height: 30px;
    right: 0;
    top: 50%;
    cursor: pointer;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
</style>
