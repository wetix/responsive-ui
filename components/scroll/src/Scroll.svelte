<script lang="ts">
  import { onMount, tick } from "svelte";

  let className = "";
  export { className as class };
  export let scrollable = true;

  let el: HTMLDivElement;
  let maxWidth = 0;
  let maxOffsetWidth = 0;
  let clientWidth = 0;
  let scrollToWidth = 0;
  let scrollDistance = 0;

  const handleScroll = (e: Event) => {
    scrollDistance = (e.currentTarget as HTMLDivElement).scrollLeft;
  };

  onMount(async () => {
    await tick();

    const scrollWidth = el.scrollWidth;
    clientWidth = el.clientWidth;
    scrollToWidth = clientWidth / 2;
    maxWidth = clientWidth + scrollWidth;
    maxOffsetWidth = maxWidth - clientWidth * 2;

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  });

  const handlePrev = () => {
    const { scrollLeft } = el;
    let pos = scrollLeft - scrollToWidth;
    if (pos > 0) {
      const ratio = Math.round(pos / scrollToWidth);
      scrollDistance = ratio * scrollToWidth;
    } else {
      scrollDistance = 0;
    }
    el.scrollLeft = scrollDistance;
  };

  const handleNext = () => {
    const { scrollLeft } = el;
    let pos = scrollLeft + scrollToWidth;
    const ratio = Math.round(pos / scrollToWidth);
    scrollDistance = ratio * scrollToWidth;
    el.scrollLeft = scrollDistance;
  };
</script>

<div class="resp-scroll {className}" {...$$restProps}>
  <span
    class="resp-scroll__prev-icon"
    class:resp-scroll__icon--visible={scrollDistance > 0}
    on:click={handlePrev}
  >
    <div class="resp-scroll__icon">
      {@html `<svg viewBox="0 0 16 16" width="24px" height="24px"><path d="M10.15,13.35L4.79,8l5.35-5.35l0.71,0.71L6.21,8l4.65,4.65L10.15,13.35z" /></svg>`}
    </div>
  </span>
  <div
    class="resp-scroll__container"
    class:resp-scroll__container--scrollable={scrollable}
    bind:this={el}
    on:scroll
  >
    <slot />
  </div>
  <div
    class="resp-scroll__next-icon"
    class:resp-scroll__icon--visible={scrollDistance < maxOffsetWidth}
    on:click={handleNext}
  >
    <div class="resp-scroll__icon">
      {@html `<svg viewBox="0 0 16 16" width="24px" height="24px"><path d="M4.97,12.65L9.62,8L4.97,3.35l0.71-0.71L11.03,8l-5.35,5.35L4.97,12.65z" /></svg>`}
    </div>
  </div>
</div>

<style lang="scss">
  .resp-scroll {
    display: flex;
    align-items: center;
    position: relative;
    white-space: nowrap;
    overflow: hidden;

    &__container {
      flex-grow: 1;
      scroll-behavior: smooth;
      transition: all 0.5s;
      overflow-x: hidden;
      scrollbar-width: none; /* for Firefox */

      &--scrollable {
        overflow-x: auto;
      }

      & > * {
        font-size: initial;
      }

      &::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
        width: 0px;
      }
    }

    &__icon {
      display: flex;
      align-items: center;
      background: #fff;
      height: 100%;
    }

    &__prev-icon,
    &__next-icon {
      position: absolute;
      display: none;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      height: 100%;
      z-index: 100;
    }

    &__prev-icon {
      left: 0;
      flex-direction: row-reverse;
    }

    &__next-icon {
      right: 0;
      flex-direction: row;
    }

    &__icon--visible {
      display: flex;
    }

    &__prev-icon:before,
    &__next-icon:before {
      content: "";
      height: 100%;
      width: 50px;
      pointer-events: none;
      z-index: 150;
    }

    &__prev-icon:before {
      background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
    }
    &__next-icon:before {
      background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff);
    }
  }
</style>
