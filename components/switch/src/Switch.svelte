<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: HTMLInputElement;
  export let checked = false;
  export let disabled = false;
</script>

<span class="resp-switch {className}" class:resp-switch--disabled={disabled}>
  <input
    {...$$restProps}
    bind:this={ref}
    type="checkbox"
    bind:checked
    on:change
    {disabled}
  />
  <b class="resp-switch__toggle" />
  <b class="resp-switch__track" />
</span>

<style lang="scss" global>
  .resp-switch {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 20px;
    background-color: #ddd;
    overflow: hidden;
    box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.05);

    &__toggle {
      position: absolute;
      left: 2px;
      top: 2px;
      bottom: 2px;
      right: 22px;
      background-color: #fff;
      border-radius: 50%;
      transition: 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
      transition-property: left, right;
      transition-delay: 0s, 0.05s;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      z-index: 1;
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

    input[type="checkbox"] {
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

    &--disabled {
      opacity: 0.65;
      input[type="checkbox"] {
        cursor: not-allowed;
      }
    }
  }

  input[type="checkbox"]:checked ~ .resp-switch__track {
    box-shadow: inset 0 0 0 20px var(--primary-color, #fc4451);
  }

  input[type="checkbox"]:checked ~ .resp-switch__toggle {
    right: 2px;
    left: 22px;
    transition: 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transition-property: left, right;
    transition-delay: 0.05s, 0s;
  }
</style>
