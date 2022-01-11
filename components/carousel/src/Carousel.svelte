<script lang="ts">
  // import { getNodeAttribute } from "@wetix/utils";
  // import { onDestroy } from "svelte";
  import type { CarouselItem } from "../types/index";

  let className = "";
  export { className as class };
  export let items: CarouselItem[] = [];
  export let heightRatio = 0.56; // slideHeight / slideWidth
  export let gap = 10; // gap between the slides
  export let perPage = 1; // slides per page
  export let leftAndRight = 30; // left and right slide peek
  export let style = "";
  export let autoPlay = false;
</script>

<div
  {...$$restProps}
  class="resp-carousel {className}"
  on:mousedown|preventDefault
  on:touchmove|preventDefault>
  <div class="resp-carousel__viewport">
    {#each items as { src }}
      <div class="resp-carousel__slide">
        <slot name="slide"><img {src} alt="" /></slot>
      </div>
    {/each}
  </div>
</div>

<style lang="scss" global>
  .resp-carousel {
    position: relative;
    padding-top: 75%;
    filter: drop-shadow(0 0 10px #0003);
    perspective: 100px;

    &__viewport {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      overflow-x: scroll;
      counter-reset: item;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
    }

    &__slide {
      position: relative;
      flex: 0 0 100%;
      width: 100%;
      background-color: #f99;
      counter-increment: item;
      scroll-snap-align: center;

      img {
        object-fit: cover;
        max-width: 100%;
      }
    }
  }

  // @media (hover: hover) {
  //   .carousel__snapper {
  //     animation-name: tonext, snap;
  //     animation-timing-function: ease;
  //     animation-duration: 4s;
  //     animation-iteration-count: infinite;
  //   }
  // }

  @keyframes nextSlide {
    75% {
      left: 0;
    }
    95% {
      left: 100%;
    }
    98% {
      left: 100%;
    }
    99% {
      left: 0;
    }
  }
  // .resp-carousel__box {
  //   box-sizing: border-box;
  //   position: relative;
  //   width: 100%;
  //   display: inline-flex;
  //   overflow-x: scroll;
  //   scroll-behavior: smooth;
  //   -ms-overflow-style: none; /* IE and Edge */
  //   scrollbar-width: none; /* Firefox */

  //   .resp-carousel__slide {
  //     cursor: pointer;
  //     border-radius: 10px;
  //     overflow: hidden;
  //     box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  //     background-color: lightgray;
  //     min-width: var(--slideWidth);
  //     max-width: var(--slideWidth);
  //     min-height: var(--slideHeight);
  //     max-height: var(--slideHeight);
  //     margin-right: var(--slideMarginRight);
  //     transform: translateX(var(--tx));

  //     img {
  //       width: 100%;
  //       height: 100%;
  //       object-fit: cover;
  //     }
  //   }
  // }

  // /* Hide scrollbar for Chrome, Safari and Opera */
  // .resp-carousel__box::-webkit-scrollbar {
  //   display: none;
  // }

  // .right-btn,
  // .left-btn {
  //   position: absolute;
  //   width: 25px;
  //   height: 30px;
  //   right: 0;
  //   top: 50%;
  //   cursor: pointer;
  //   z-index: 1;
  //   background-color: rgba(0, 0, 0, 0.3);
  //   color: white;
  //   text-align: center;
  //   font-size: 20px;
  //   font-weight: bold;
  // }
</style>
