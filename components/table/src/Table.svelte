<script lang="ts">
  import type { SvelteComponentDev } from "svelte/internal";
  import type { TableColumn, TableItem } from "../types";

  let className = "";
  export { className as class };
  export let ref: null | HTMLDivElement = null;
  export let key = "id";
  export let columns: Partial<TableColumn>[] = [];
  export let items: null | TableItem[] = null;
  export let striped = false;
  export let bordered = true;
  export let style = "";

  const getValue = (column: Partial<TableColumn>, item: TableItem) => {
    const { key, value = (v: any) => v } = column;

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

  const getComponent = (
    column: Partial<TableColumn>,
    item: TableItem
  ): SvelteComponentDev => {
    const { component } = column;
    if (typeof component === "function") return component(item);
    return component;
  };
</script>

<div
  class="resp-table {className}"
  class:resp-table__bordered={bordered}
  bind:this={ref}
>
  <table class:resp-table__striped={striped} {style}>
    <thead>
      <tr>
        {#each columns as column}
          <th
            class="resp-table__col--align-{column.align || 'left'}"
            class:resp-table__col--nowrap={column.nowrap === true}
            style="width:{column.width || 'auto'}"
          >
            {column.label || ""}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if items}
        {#if items.length > 0}
          {#each items as item, i (item[key] || i)}
            <slot name="row" index={i} {item}>
              <tr>
                {#each columns as column}
                  <td
                    class="resp-table__col--align-{column.align || 'left'}"
                    style="width:{column.width || 'auto'}"
                  >
                    {#if column.component}
                      <svelte:component this={getComponent(column, item)} />
                    {:else}
                      <div class="resp-table__cell">
                        {getValue(column, item)}
                      </div>
                    {/if}
                  </td>
                {/each}
              </tr>
            </slot>
          {/each}
        {:else}
          <slot name="empty">
            <tr>
              <td
                colspan={columns.length}
                class="resp-table__col--empty resp-table__col--align-center"
              >
                <p>NO RECORD.</p>
              </td>
            </tr>
          </slot>
        {/if}
      {/if}
    </tbody>
  </table>
  <!-- {#if loading}
    <div class="loading" />
  {/if} -->
</div>

<style lang="scss">
  .resp-table {
    position: relative;
    width: 100%;
    border: 1px solid transparent;
    overflow-y: auto;
    font-size: var(--font-size, 14px);
    font-family: var(--font-family, inherit);
    border-radius: var(--border-radius, 5px);

    table {
      width: 100%;
      table-layout: auto;
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

        tr {
          cursor: pointer;
          &:not(:last-child) {
            border-bottom: 1px solid #e1e1e1;
          }

          &:hover {
            background: #f5f5f5;
          }
        }
      }

      th,
      td {
        padding: 10px;
        font-weight: normal;
        vertical-align: middle;
      }

      th {
        overflow-wrap: break-word;
      }

      td {
        padding: 6px 10px;
        word-break: break-all;
      }

      .resp-table__col--nowrap {
        word-break: unset;
        word-wrap: unset;
        overflow-wrap: unset;
        white-space: nowrap;
      }

      .resp-table__col--align-left {
        text-align: left;
      }

      .resp-table__col--align-center {
        text-align: center;
      }

      .resp-table__col--align-right {
        text-align: right;
      }

      .resp-table__col--empty {
        padding: var(--padding, 15px);
      }
    }

    &__bordered {
      border-color: #e1e1e1;
    }

    &__striped {
      tr:nth-child(odd) td {
        background: #f5f5f5;
      }
    }
  }
</style>
