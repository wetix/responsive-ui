<script lang="ts">
  export let title = "";
  export let value = "";
  export let checked = false;

  const onClick = () => {
    checked = !checked;
  };
</script>

<style lang="scss">
  .responsive-ui-option {
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    position: relative;
    align-items: center;
    padding: 6px 0 7px;
    text-transform: capitalize;
    color: #505050;
    &:last-child {
      border: 0;
    }

    &--checked:after {
      position: absolute;
      right: 9px;
      top: -2px;
      font-size: 20px;
      content: "\02143";
      transform: rotate(40deg);
    }
  }
</style>

<div
  class="responsive-ui-option"
  class:responsive-ui-option--checked={checked}
  on:click={onClick}>
  {title}
</div>
