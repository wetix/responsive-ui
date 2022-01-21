<script lang="ts">
  import Quantity from "@responsive-ui/quantity";
  import Modal from "@responsive-ui/modal";
  import RangeSlider from "../components/range/src/Range.svelte";

  let lowSlideValue: string;
  let upSlideValue: string;

  let openModal = true;

  const onChange = (e: Event | undefined) => {
    console.log((e!.currentTarget as HTMLInputElement).value);
  };
</script>

<!-- <AppBar {centerItems} {tabItems} {dropdownItems} /> -->

<Quantity min={2} max={100} on:change={onChange} />
<Modal bind:open={openModal} on:cancel={() => (openModal = false)}>Testing</Modal>
<div style="padding: 2rem">
  <RangeSlider
    min="100"
    max="1000"
    bind:lowerVal={lowSlideValue}
    bind:upperVal={upSlideValue}
  />
  <p>Low: {lowSlideValue}</p>
  <p>Up: {upSlideValue}</p>

  {#each new Array(10) as _}
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s, when an
      unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the 1960s with
      the release of Letraset sheets containing Lorem Ipsum passages, and more recently
      with desktop publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  {/each}

  <button on:click={() => (openModal = true)}>Open Modal</button>
</div>
