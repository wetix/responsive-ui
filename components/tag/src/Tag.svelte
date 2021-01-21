<script lang="ts">
  let className = "";
  export { className as class };
  export let color = "blue";
  export let value = "";
</script>

<span class="responsive-ui-tag responsive-ui-tag--{color} {className}">
  <slot>{value}</slot>
</span>

<style lang="scss">
  .responsive-ui-tag {
    display: inline-block;
    vertical-align: middle;
    font-size: var(--font-size-sm, 10px);
    border-radius: var(--border-radius, 5px);
    padding: 3px 8px;
    overflow: hidden;

    &--blue {
      color: rgba(49, 130, 206, 1);
      background: rgba(190, 227, 248, 1);
    }

    &--red {
      color: rgba(185, 28, 28, 1);
      background: rgba(254, 202, 202, 1);
    }

    &--green {
      color: rgba(4, 120, 87, 1);
      background: rgba(167, 243, 208, 1);
    }

    &--teal {
      color: rgba(49, 151, 149, 1);
      background: rgba(178, 245, 234, 1);
    }

    &--orange {
      color: rgba(221, 107, 32, 1);
      background: rgba(254, 235, 200, 1);
    }

    &--yellow {
      color: rgba(180, 83, 9, 1);
      background: rgba(253, 230, 138, 1);
    }

    &--purple {
      color: rgba(128, 90, 213, 1);
      background: rgba(233, 216, 253, 1);
    }

    &--pink {
      color: rgba(213, 63, 140, 1);
      background: rgba(254, 215, 226, 1);
    }

    &--grey {
      color: rgba(113, 128, 150, 1);
      background: rgba(237, 242, 247, 1);
    }
  }
</style>
