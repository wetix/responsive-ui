<script lang="ts">
  export let checked = false;
  export let disabled = false;
</script>

<style lang="scss">
  // https://codepen.io/daneden/pen/JFxAw

  .responsive-ui-switch {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 20px;
    background-color: #ddd;
    overflow: hidden;
    box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.05);

    .check {
      cursor: pointer;
      position: absolute;
      display: block;
      padding: 0;
      margin: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 6;
    }

    b {
      display: block;
    }
  }

  .disabled {
    opacity: 0.65;
    .check {
      cursor: not-allowed;
    }
  }

  .check:checked ~ .track {
    box-shadow: inset 0 0 0 20px var(--primary-color, #fc4451);
  }

  .check:checked ~ .switch {
    right: 2px;
    left: 22px;
    transition: 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transition-property: left, right;
    transition-delay: 0.05s, 0s;
  }

  &__switch {
    position: absolute;
    left: 2px;
    top: 2px;
    bottom: 2px;
    right: 22px;
    background-color: #fff;
    border-radius: 50%;
    z-index: 1;
    transition: 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transition-property: left, right;
    transition-delay: 0s, 0.05s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  &__track {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transition: 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.05);
    border-radius: 40px;
  }
</style>

<span class="responsive-ui-switch" class:disabled>
  <input type="checkbox" class="check" {disabled} bind:checked on:change />
  <b class="responsive-ui-switch__switch" />
  <b class="responsive-ui-switch__track" />
</span>
