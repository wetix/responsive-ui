<script>
  export let online = false;
  console.log("Props =>", $$props);
</script>

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

<span class="circle" class:online />
