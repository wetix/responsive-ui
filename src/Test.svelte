<script>
  import Date from "@responsive-ui/date-picker/src/DatePicker.svelte";
</script>

<div style="padding: 1rem">
  <Date />
</div>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

  :root {
    --padding-sm: 0.7rem;
    --padding: 1rem;
    --font-size-lg: 20px;
  }
  :global(body) {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    background: #fff;
    font-size: 14px;
    padding: 0;
  }
</style>
