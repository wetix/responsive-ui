<script lang="ts">
  export let min: string = "1";
  export let max: string = "100";
  export let lowerVal: string = min;
  export let upperVal: string = max;

  let lowerSlider: HTMLInputElement;
  let upperSlider: HTMLInputElement;
  let inkBar: HTMLElement;

  const onLowerSlide = () => {
    let low = parseInt(lowerSlider.value);
    let up = parseInt(upperSlider.value);
    lowerVal = lowerSlider.value;
    if (low >= up - 1) {
      lowerSlider.value = `${up - 1}`;
      lowerVal = `${up - 1}`;
    }
    updateInkBar();
  };

  const onUpperSlide = (e: Event) => {
    let low = parseInt(lowerSlider.value);
    let up = parseInt(upperSlider.value);
    upperVal = upperSlider.value;
    if (up <= low + 1) {
      upperSlider.value = `${low + 1}`;
      upperVal = `${low + 1}`;
    }
    updateInkBar();
  };

  const updateInkBar = () => {
    let pxPerSlide =
      lowerSlider.getBoundingClientRect().width /
      (parseInt(max) - parseInt(min));

    inkBar.style.left = `${
      (parseInt(lowerSlider.value) - parseInt(min)) * pxPerSlide
    }px`;

    inkBar.style.width = `${
      (parseInt(upperSlider.value) - parseInt(lowerSlider.value)) * pxPerSlide
    }px`;
  };
</script>

<div class="multi-range">
  <input
    id="lower"
    type="range"
    {min}
    {max}
    value={min}
    bind:this={lowerSlider}
    on:input={onLowerSlide}
  />
  <input
    id="upper"
    type="range"
    {min}
    {max}
    value={max}
    bind:this={upperSlider}
    on:input={onUpperSlide}
  />
  <div class="ink-bar" style="position:absolute" bind:this={inkBar} />
</div>

<style lang="scss">
  .multi-range {
    position: relative;
    width: 100%;

    input[type="range"] {
      position: absolute;
      appearance: none;
      width: 100%;
      height: 1px;
      padding: 0 5px;
      background: rgba($color: #444444, $alpha: 0.5);
      pointer-events: none;

      &::-webkit-slider-thumb {
        height: 15px;
        width: 15px;
        border-radius: 100%;
        background-color: #fc4451;
        position: relative;
        margin: 5px 0;
        cursor: pointer;
        appearance: none;
        pointer-events: all;
      }
      &:nth-child(2) {
        background: none;
      }
    }

    .ink-bar {
      width: 100%;
      height: 3px;
      background-color: #fc4451;
    }
  }
</style>
