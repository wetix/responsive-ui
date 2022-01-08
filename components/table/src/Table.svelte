<script lang="ts">
  import type { TableColumn, TableItem } from "../types";

  let className = "";
  export { className as class };
  export let ref: HTMLDivElement;
  export let rowKey: keyof TableItem = "id";
  export let loading = false;
  export let tableLayout = "fixed";
  export let showHeader = true;
  export let columns: Partial<TableColumn>[] = [];
  export let items: TableItem[] = [];
  export let striped = false;
  export let bordered = true;

  // const hasCellSlot = $$slots["table-cell"];

  const handleSorting = (e: Event) => {
    const el = e
      .composedPath()
      .find((v) => v instanceof HTMLElement && v.dataset.sort) as HTMLElement;
    if (!el) return;
    const [idx, orderBy] = JSON.parse(el.dataset.sort as string) as [number, number];
    const { sorter = (_a, _b) => 1 } = columns[idx];
    if (orderBy > 0) {
      items = items.sort(sorter);
    } else {
      items = items.sort(sorter).reverse();
    }
  };

  const getValue = (column: Partial<TableColumn>, item: TableItem) => {
    const { key, value = (v: unknown) => v } = column;

    if (key) {
      return value(
        key
          .split(".")
          .reduce(
            (acc: Record<string, any>, cur: string) => (cur in acc ? acc[cur] : ""),
            item
          ),
        item
      );
    }

    return (value as (v: unknown) => unknown)(item);
  };

  const getRowKey = (item: TableItem, idx: number) =>
    rowKey in item ? (item[rowKey] as string) : idx.toString();
</script>

<div
  bind:this={ref}
  class="resp-table {className}"
  class:resp-table--bordered={bordered}
  class:resp-table--striped={striped}
  {...$$restProps}
>
  <table style="table-layout: {tableLayout}">
    {#if showHeader}
      <thead>
        <tr on:click={handleSorting}>
          {#each columns as column, idx}
            <th
              class="resp-table__col--align-{column.align || 'left'}"
              class:resp-table__col--nowrap={!!column.nowrap}
              style="width: {column.width || 'auto'}"
            >
              <div class="resp-table__col">
                <span>{column.label || ""}</span>
                {#if column.sorter}
                  <span class="resp-table__col-sorter">
                    <i data-sort={`[${idx},1]`}
                      >{@html `<svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg>`}</i
                    ><i data-sort={`[${idx},-1]`}
                      >{@html `<svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>`}</i
                    >
                  </span>
                {/if}
              </div>
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
                    class:resp-table__col--nowrap={!!column.nowrap}
                    colspan={column.colspan || undefined}
                  >
                    <slot name="table-cell" rowIndex={i} columnIndex={j} {column} {item}>
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
    text-align: left;
    font-size: var(--font-size);
    font-family: var(--font-family, inherit);
    border-color: transparent;

    table {
      width: 100%;
      margin: 0 auto;
      border-spacing: 0;
      border-collapse: collapse;
      overflow: visible;

      th {
        font-weight: 500;
        border-bottom: 2px solid $borderColor;
      }

      th,
      td {
        position: relative;
        overflow-wrap: break-word;
        padding: 10px;
        vertical-align: middle;
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

    &__col {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-sorter {
        display: inline-flex;
        flex-direction: column;

        i {
          display: inline-flex;
          cursor: pointer;
        }
      }

      &--nowrap {
        white-space: nowrap;
        overflow: hidden;
        word-break: keep-all;
        text-overflow: ellipsis;
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
