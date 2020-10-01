<script lang="ts">
  export let title = "",
    href = "",
    color = "",
    style = "";
</script>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 15px;

    .title {
      text-transform: capitalize;
      font-size: 20px;
      font-weight: 600;
      color: #3b3b3b;
    }
  }
</style>

<header class="header" {style}>
  <span class="title" style={`color:${color}`}>{title}</span>
</header>
