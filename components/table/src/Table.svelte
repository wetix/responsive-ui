<script lang="ts">
  import type { TableColumn, TableItem } from "../types";
  import { fade } from "svelte/transition";

  let className = "";
  export { className as class };
  export let ref: HTMLDivElement;
  export let rowKey: keyof TableItem = "id";
  export let loading = false;
  export let tableLayout = "fixed";
  export let size = "small";
  export let showHeader = true;
  export let columns: Partial<TableColumn>[] = [];
  export let items: TableItem[] = [];
  export let striped = false;
  export let bordered = true;

  const hasCellSlot = $$slots["table-cell"];

  const getValue = (column: Partial<TableColumn>, item: TableItem) => {
    const { key, value = (v: unknown) => v } = column;

    if (key) {
      return value(
        key
          .split(".")
          .reduce(
            (acc: Record<string, any>, cur: string) =>
              cur in acc ? acc[cur] : "",
            item
          ),
        item
      );
    }

    return value(item);
  };

  const getRowKey = (item: TableItem, idx: number) =>
    rowKey in item ? (item[rowKey] as string) : idx.toString();
</script>

<div
  class="resp-table resp-table--{size} {className}"
  class:resp-table--bordered={bordered}
  class:resp-table--striped={striped}
  bind:this={ref}
  {...$$restProps}
>
  <table style="table-layout: {tableLayout}">
    {#if showHeader}
      <thead>
        <tr>
          {#each columns as column}
            <th
              class="resp-table__col--align-{column.align || 'left'}"
              class:resp-table__col--nowrap={!!column.nowrap}
              style="width: {column.width || 'auto'}"
            >
              <slot name="table-head">{column.label || ""}</slot>
            </th>
          {/each}
        </tr>
      </thead>
    {/if}
    <tbody>
      {#if !loading}
        {#if items.length > 0}
          {#each items as item, i (getRowKey(item, i))}
            <slot name="table-row" index={i} {item}>
              <tr>
                {#each columns as column, j}
                  <td
                    class="resp-table__col--align-{column.align || 'left'}"
                    class:resp-table__col--ellipsis={!hasCellSlot &&
                      !!column.ellipsis}
                  >
                    <slot
                      name="table-cell"
                      rowIndex={i}
                      columnIndex={j}
                      {column}
                      {item}
                    >
                      {getValue(column, item)}
                    </slot>
                  </td>
                {/each}
              </tr>
            </slot>
          {/each}
        {:else}
          <tr>
            <td class="resp-table--empty" colspan={columns.length}>
              <slot name="empty">
                <p>No data.</p>
              </slot>
            </td>
          </tr>
        {/if}
      {:else}
        {#each new Array(3) as _}
          <tr
            >{#each columns as column}
              <td class="resp-table__col--align-{column.align || 'left'}"
                ><i class="resp-table__placeholder" /></td
              >
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style lang="scss" global>
  $borderColor: #e1e1e1;

  .resp-table {
    cursor: default;
    position: relative;
    width: 100%;
    border: 1px solid transparent;
    overflow-y: auto;
    font-size: var(--font-size);
    font-family: var(--font-family, inherit);
    border-color: transparent;

    table {
      width: 100%;
      margin: 0 auto;
      border-spacing: 0;
      border-collapse: collapse;
      overflow: visible;

      thead {
        text-align: left;

        tr {
          background: #f5f5f5;
          // border-width: 1px;
          // border-style: solid;
          // border-color: inherit;
        }
      }

      th {
        font-weight: 600;
        border-bottom: 2px solid $borderColor;
      }

      th,
      td {
        position: relative;
        overflow-wrap: break-word;
        padding: 10px;
        vertical-align: middle;
        // border-width: 1px;
        // border-style: solid;
        // border-color: inherit;
      }

      tbody {
        overflow: auto;
        width: 100%;
        color: #171717;

        tr {
          &:hover {
            background: #f5f5f5;
          }
        }

        tr > td {
          border-bottom: 1px solid $borderColor;
          word-break: break-all;
        }

        tr:last-child > td {
          border-bottom: none;
        }
      }
    }

    &--small table tr {
      td,
      th {
        padding: 6px 10px;
      }
    }

    &--large table tr {
      td,
      th {
        padding: 15px;
      }
    }

    &__col {
      &--ellipsis {
        white-space: nowrap;
        overflow: hidden;
        word-break: keep-all;
        text-overflow: ellipsis;
      }

      &--nowrap {
        word-break: unset;
        word-wrap: unset;
        overflow-wrap: unset;
        white-space: nowrap;
      }
    }

    &--bordered {
      border-color: $borderColor;
    }
    &__col--align {
      &-left {
        text-align: left;
      }
      &-center {
        text-align: center;
      }
      &-right {
        text-align: right;
      }
    }

    &__placeholder {
      display: inline-block;
      vertical-align: middle;
      background-color: #444;
      width: 90%;
      height: 12px;
      border-radius: 100px;
      opacity: 0.1;
      animation: fading 1.5s infinite;
    }

    &--striped {
      tr:nth-child(odd) td {
        background: #f5f5f5;
      }
    }

    &--empty {
      padding: 1rem;
      text-align: center;
    }
  }

  @keyframes fading {
    0% {
      opacity: 0.1;
    }

    50% {
      opacity: 0.2;
    }

    100% {
      opacity: 0.1;
    }
  }
</style>
