<script>
  import { fade } from "svelte/transition";
  export let online = false;
  console.log("Props =>", $$props);
</script>

<span class="circle" class:online />

<style lang="scss">
  .circle {
    text-align: center;
    display: inline-block;
    background: red;
    border-radius: 50%;
    width: 8px;
    height: 8px;

    &.online {
      background: green;
    }
  }
</style>
