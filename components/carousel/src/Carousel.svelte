<script lang="ts">
  import { onMount } from "svelte";

  // import type { CarouselItem } from "../types/index";

  let className = "";
  export { className as class };
  export let infinite = false;
  export let padding = 10;
  export let duration = 500;
  export let perPage = 1;
  export let style = "";

  let el: HTMLDivElement;
  let width = 0;

  const addClones = () => {
    const first = el.children[0];
    const last = el.children[el.children.length - 1];
    el.prepend(last.cloneNode(true));
    el.append(first.cloneNode(true));
  };

  function applyPageSizes() {
    const children = el.children as HTMLCollectionOf<HTMLElement>;
    const slideWidth = window.innerWidth - padding * 2;
    // pageWidth = pageWindowElement.clientWidth;
    width = slideWidth * children.length + 2;
    for (let i = 0; i < children.length; i++) {
      children[i].className = "responsive-ui-carousel__slide";
      children[i].style.width = `${slideWidth}px`;
      // children[i].style.maxWidth = `${slideWidth}px`;
    }
    // store.init(initialPageIndex + Number(infinite));
    // offsetPage(false);
  }

  const getTouches = (e: any) => {
    if (e.changedTouches != undefined) {
      e = e.changedTouches[0];
    }
    const { clientX, clientY } = e;
    return { x: clientX, y: clientY };
  };

  let offset = 0;

  onMount(() => {
    addClones();
    applyPageSizes();
    // const childNodes = Array.from(el.childNodes);
    // const slideWidth = (window.innerWidth * 1) / 1;
    // const fragment = document.createDocumentFragment();
    // childNodes.forEach((v) => {
    //   const clone = v.cloneNode(true);
    //   fragment.appendChild(clone);
    // });
    // el.replaceWith(fragment);
    // console.log(childNodes);
    let x = 0;
    let y = 0;

    el.addEventListener("touchstart", (e) => {
      const evt = getTouches(e);
      x = evt.x;
      y = evt.y;
    });
    el.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const evt = getTouches(e);
      console.log(evt);
    });
    el.addEventListener("touchend", console.log);
  });

</script>

<div
  bind:this={el}
  draggable="true"
  class="{className} responsive-ui-carousel"
  style={`width: ${width}px; transform: translateX(${offset}px); transition: transform ${duration}ms;${style}`}
>
  <slot />
  <!-- {#each items as item, i}
    <div class="responsive-ui-carousel__slide" style="width:{width}px">
      {item}
    </div>
  {/each} -->
  <!-- <div class="slide-content">Slide 1</div>
  <div class="slide-content">Slide 2</div>
  <div class="slide-content">Slide 3</div>
  <div class="slide-content">Slide 4</div> -->
</div>

<style lang="scss">
  .responsive-ui-carousel {
    width: 100%;
    // display: flex; /* to put child elements in one row */
    transition-property: transform;
    overflow: scroll;
    white-space: nowrap;
    // flex-wrap: nowrap;
  }

  :global(.responsive-ui-carousel__slide) {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
    border-radius: 5px;
    border: 1px solid red;
  }

</style>
