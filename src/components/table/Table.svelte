<script lang="ts">
  // import InfiniteScroll from "~/components/infinite-scroll/InfiniteScroll.svelte";

  export let columns = [],
    items = [],
    // loading = false,
    striped = false,
    bordered = true,
    style = "";

  const getValue = (i, data = {}, path = "") => {
    const { value = (v) => v } = columns[i];
    return value(
      path.split(".").reduce((acc, cur) => (cur in acc ? acc[cur] : ""), data),
      data
    );
  };
</script>

<style lang="scss">
  .table {
    position: relative;
    // box-shadow: 0 7px 11px -7px #00000033;
    // box-shadow: 0 0 11px #00000033;
    box-shadow: 0 7px 11px -7px rgba(0, 0, 0, 0.2);
    border-radius: 11.3px;
    border: 1px solid transparent;
    overflow-y: auto;
    font-size: 16px;
    font-family: Poppins,serif;
    font-weight: normal;

    table {
      min-width: 100%;
      border-collapse: collapse;
      table-layout: auto;
      overflow: visible;


      thead {
        text-align: left;

        tr {
          color: #9e9e9e;
          border-bottom: 1px solid #e1e1e1;
        }

        td {
          &.center {
            text-align: center;
          }

          &.right {
            text-align: right;
          }
        }
      }

      tbody {
        overflow: auto;
        height: 200px;
        width: 100%;
        color: #000;
      }

      th,
      td {
        padding: 16px 30px;
      }
    }

    &.bordered {
      border-color: #dcdcdc;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);

      td {
        // border: 1px solid #dcdcdc;
        color: #3b3b3b;
        text-align: left;
        // padding: $cell-padding;
        // border-bottom: 1px solid #bebebe;

        &.center {
          text-align: center;
        }

        &.right {
          text-align: right;
        }
      }
    }

    table.striped {
        tbody tr {
          border-bottom: 1px solid #e1e1e1;
        }
    }

    .loading {
      position: absolute;
      top: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.8);
      left: 0;
      bottom: 0;
    }
  }
</style>

<div class="table" class:bordered>
  <table class:striped {style}>
    <thead>
      <tr>
        {#each columns as column}
          <th
            class:align={column.align || ''}
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
            <td class={column.class || ''} class:align={column.align || ''}>
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
  <!-- {#if loading}
    <div class="loading" />
  {/if} -->
</div>
