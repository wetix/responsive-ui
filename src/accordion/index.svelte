<script lang="ts">
  export let items = [];
  export let selected = [];

  let indexs = {};

  const handleClick = (i: number) => {
    let temp = Object.assign({}, indexs);
    if (i in temp) delete temp[i];
    else temp[i] = true;
    indexs = temp;
  };
</script>

<style lang="scss">
  .ditto-accordion {
    display: block;
    text-align: left;
    overflow: hidden;
    border-radius: 3px;
    // box-shadow: 0 7px 11px -7px rgba(0, 0, 0, 0.2);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);

    .tab {
      width: 100%;
      overflow: hidden;

      header {
        padding: 10px;
        cursor: pointer;
        border-bottom: 1px solid #dcdcdc;
      }
    }

    .content {
      background: #f5f5f5;
      max-height: 0;
      //   padding: var(--padding, 15px);
      box-sizing: border-box;
      transition: all 0.35s;

      &.open {
        max-height: 100vh;
      }
    }
  }
</style>

<div class="ditto-accordion">
  {#each items as item, i}
    <div class="tab">
      <div>
        <header on:click={() => handleClick(i)}>{item.title}</header>
        <div class="content" class:open={i in indexs}>
          <div style="padding: 10px" />
        </div>
      </div>
    </div>
  {/each}
</div>
