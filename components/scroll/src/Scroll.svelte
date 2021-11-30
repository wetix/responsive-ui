<script lang="ts">
  import { onMount, tick } from "svelte";

  let el: HTMLDivElement;
  let maxWidth: number;
  let scrollToWidth: number;
  let scrollDistance = 0;

  const scrollEvt = (e: Event) => {
    scrollDistance = (e.currentTarget as HTMLDivElement).scrollLeft;
  };

  onMount(async () => {
    await tick();
    const { clientWidth, scrollWidth } = el;
    scrollToWidth = clientWidth / 2;
    maxWidth = clientWidth + scrollWidth;
    // el.setAttribute("style", "overflow: hidden");

    console.log(clientWidth, scrollWidth, maxWidth);
    console.log(maxWidth / clientWidth);

    el.addEventListener("scroll", scrollEvt);

    return () => {
      el.removeEventListener("scroll", scrollEvt);
    };
  });

  const handlePrev = () => {
    const { scrollLeft } = el;
    let pos = Math.round(scrollLeft - scrollToWidth);
    if (pos <= 0) pos = 0;
    scrollDistance = pos;
    el.scrollLeft = pos;

    const difference = maxWidth / scrollDistance;
    console.log(scrollDistance, difference);
  };

  const handleNext = () => {
    const { scrollLeft } = el;
    let pos = scrollLeft + scrollToWidth;
    const difference = maxWidth / pos;
    scrollDistance = pos;
    el.scrollLeft = pos;

    console.log(scrollDistance, difference);
  };
</script>

<div class="resp-scroll">
  <span
    class="resp-scroll__prev-icon"
    class:resp-scroll__icon--visible={scrollDistance > 0}
    on:click={handlePrev}>LEFT</span
  >
  <div class="resp-scroll__container" bind:this={el}>
    <slot /><!--
    -->
  </div>
  <span
    class="resp-scroll__next-icon"
    class:resp-scroll__icon--visible={true}
    on:click={handleNext}>RIGHT</span
  >
</div>

<style lang="scss">
  .resp-scroll {
    display: flex;
    position: relative;
    white-space: nowrap;
    overflow: hidden;

    &__container {
      flex-grow: 1;
      scroll-behavior: smooth;
      transition: all 0.5s;
      overflow-x: auto;

      &::-webkit-scrollbar {
        width: 0px;
      }
    }

    &__prev-icon,
    &__next-icon {
      display: none;
      cursor: pointer;
    }

    &__icon--visible {
      display: block;
    }

    &__prev-icon {
      left: 0;
    }

    &__next-icon {
      right: 0;
    }

    &__next-icon::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 100%;
      left: -16px;
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(hsla(0, 0%, 100%, 0)),
        to(#fff)
      );
      background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff);
    }
  }
</style>
