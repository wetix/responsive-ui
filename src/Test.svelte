<script>
  import Date from "@responsive-ui/date-picker/src/DatePicker.svelte";
  import Button from "@responsive-ui/button/src/Button.svelte";
  import Modal from "@responsive-ui/modal/src/Modal.svelte";
  import DateRangePicker from "@responsive-ui/date-picker/src/DateRangePicker.svelte";
  import Docker from "../components/docker/src/Docker.svelte";

  let showModal = true;
  let showDocker = false;
</script>

<Modal
  bind:open={showModal}
  on:confirm={() => (showModal = false)}
  on:cancel={() => (showModal = false)}
>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type
  specimen book. It has survived not only five centuries, but also the leap into
  electronic typesetting, remaining essentially unchanged. It was popularised in
  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker
  including versions of Lorem Ipsum.
</Modal>
<div style="padding: 1rem">
  <Date />
  <div>
    <Button size="small">Test 1</Button>
    <Button variant="primary">Test 1</Button>
    <Button on:click={() => (showDocker = true)}>Test 2</Button>
  </div>
  <div>
    <DateRangePicker />
  </div>
</div>

<Docker bind:open={showDocker} />

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

  :global(:root) {
    --padding-sm: 0.7rem;
    --padding: 1rem;
    --font-size-lg: 20px;
  }

  :global(::selection) {
    color: #fff;
    background: #fc4451;
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
