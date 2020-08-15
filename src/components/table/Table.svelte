<script lang="ts">
  import InfiniteScroll from "~/components/infinite-scroll/InfiniteScroll.svelte";

  export let columns = [],
    items = [],
    loading = false,
    striped = false,
    bordered = true,
    style = "";

  const getValue = (i, data = {}, path = "") => {
    const { value = v => v } = columns[i];
    return value(
      path.split(".").reduce((acc, cur) => (cur in acc ? acc[cur] : ""), data),
      data
    );
  };
</script>

<style lang="scss">
  .table {
    border-radius: 3px;
    box-shadow: 0 7px 11px -7px #00000033;
    box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);

    &.bordered {
      border-bottom-color: rgb(238, 237, 237);
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);

      th,
      td {
        // background: #f5f5f5;
        border: 1px solid red;
        color: #3b3b3b;
        // padding: $cell-padding;
        // border-bottom: 1px solid #bebebe;
      }
    }
  }
</style>

<div>
  <table
    class="table"
    class:striped
    class:bordered
    cellspacing="0"
    width="100%"
    {style}>
    <thead>
      <tr>
        {#each columns as column}
          <th
            class={column.class || ''}
            style="width:{column.width ? column.width : 'none'}">
            {column.title || ''}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each items as item, i}
        <tr>
          {#each columns as column, j}
            <td class={column.class || ''}>
              {#if column.component != null}
                <svelte:component this={column.component} />
              {:else}
                <div>{getValue(j, item, column.key)}</div>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  {#if loading}
    <div>testing</div>
  {/if}
</div>
