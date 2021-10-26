<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: null | HTMLTextAreaElement = null;
  export let cols = 80;
  export let rows = 4;
  export let maxlength = 100;
  export let value = "";
  export let bordered = true;
  export let autoResize = true;

  const handleChange = (e: Event) => {
    value = (e.target as HTMLTextAreaElement).value;
    if (autoResize && ref) {
      ref.style.height = "auto";
      ref.style.height = ref.scrollHeight + "px";
    }
  };
</script>

<div class="resp-textarea-box">
  <textarea
    {...$$restProps}
    class="resp-textarea {className}"
    class:resp-textarea--bordered={bordered}
    bind:this={ref}
    {rows}
    {cols}
    {value}
    on:blur
    on:change
    on:input={handleChange}
    on:input
  />
  {#if maxlength > 0}
    <slot>
      <div class="resp-textarea__text-len">
        {value.length}/{maxlength} characters
      </div>
    </slot>
  {/if}
</div>

<style lang="scss">
  .resp-textarea-box {
    display: inline-flex;
    flex-direction: column;
  }

  .resp-textarea {
    font-size: inherit;
    font-family: inherit;
    color: #1a1b1c;
    background: #fff;
    border: none;
    outline: 0;
    resize: none;
    padding: 8px;
    margin: 0;
    border-radius: 3px;
    transition: all 0.5s;

    &--bordered {
      border: 1px solid #f1f1f1;
    }

    &:focus,
    &:hover {
      border-color: #fc4451;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      background: #dcdcdc;
      cursor: not-allowed;
    }

    &__text-len {
      margin-top: 8px;
      display: block;
      text-align: right;
      font-size: var(--font-size-xs, 11px);
    }
  }
</style>
