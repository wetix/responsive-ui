<script lang="ts">
  import type { SvelteComponentDev } from "svelte/internal";

  import type { TableColumn, TableItem } from "../types";

  let className = "";
  export { className as class };
  export let key = "id";
  export let columns: Array<Partial<TableColumn>> = [];
  export let items: Array<TableItem> = [];
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
  class="responsive-ui-table {className}"
  class:responsive-ui-table__bordered={bordered}
>
  <table class:responsive-ui-table__striped={striped} {style}>
    <thead>
      <tr>
        {#each columns as column}
          <th
            class="responsive-ui-table__column--align-{column.align || 'left'}"
            style={column.width && `width:${column.width}`}>
            {column.title || ""}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each items as item, i (item[key] || i)}
        <slot name="row" index={i} {item}>
          <tr>
            {#each columns as column}
              <td
                class="responsive-ui-table__column--align-{column.align ||
                  'left'}">
                {#if column.component}
                  <svelte:component this={getComponent(column, item)} />
                {:else}
                  <div>{getValue(column, item)}</div>
                {/if}
              </td>
            {/each}
          </tr>
        </slot>
      {/each}
    </tbody>
  </table>
  <!-- {#if loading}
    <div class="loading" />
  {/if} -->
</div>

<style lang="scss">
  .responsive-ui-table {
    position: relative;
    border: 1px solid transparent;
    overflow-y: auto;
    font-size: 14px;
    font-weight: normal;
    border-radius: 5px;

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
        white-space: nowrap;
        vertical-align: middle;
      }

      td {
        padding: 6px 10px;
      }

      .responsive-ui-table__column--align-left {
        text-align: left;
      }

      .responsive-ui-table__column--align-center {
        text-align: center;
      }

      .responsive-ui-table__column--align-right {
        text-align: right;
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
