<script lang="ts">
  import type { SvelteComponentDev } from "svelte/internal";

  import type { TableColumn, TableItem } from "../types";

  let className = "";
  export { className as class };
  export let key = "id";
  export let columns: TableColumn[] = [];
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
      {#if items}
        {#if items.length > 0}
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
        {:else}
          <slot name="empty">
            <tr>
              <td
                colspan={columns.length}
                class="responsive-ui-table__column--empty responsive-ui-table__column--align-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="65px"
                  height="85px"
                  viewBox="0 0 168 182">
                  <defs>
                    <linearGradient
                      id="a"
                      x1="50%"
                      x2="40.143%"
                      y1="13.071%"
                      y2="67.741%">
                      <stop offset="0%" stop-color="#95ABC2" />
                      <stop offset="100%" stop-color="#FFF" />
                    </linearGradient>
                    <path
                      id="b"
                      d="M8.1 0h3.545v3.507a8.1 8.1 0 01-8.1 8.1H0V8.1A8.1 8.1 0 018.1 0z"
                    />
                  </defs>
                  <g fill="none" fill-rule="evenodd">
                    <path
                      fill="#8E99A3"
                      d="M76.255 67l69 18.893V152l-69-29.62z"
                    />
                    <path
                      fill="#A0AAB5"
                      d="M75.255 67l-56 15.663V152l56-30.011z"
                    />
                    <path
                      stroke="url(#a)"
                      stroke-dasharray="6 7"
                      stroke-width="3"
                      d="M55.208 150.381c-15.635-4.569-43.091-4.16-53.403-30.863-9.45-24.473
        25.41-48.026 35.164-37.714 6.911 7.307-1.947 17.845-14.24 16.66C8.893
        97.133.714 84.78 3.442 71.493c5.412-26.358 47.019-43.796 48.773-45.01"
                      transform="translate(57.255 -3)"
                    />
                    <g transform="translate(96.417 -3)">
                      <path
                        fill="#CED8E5"
                        d="M17.325
          17.953c-.262-6.607-1.269-10.785-3.021-12.535-2.629-2.624-6.894-2.62-9.527.008a6.717
          6.717 0 00-.007 9.511c1.752 1.75 5.937 2.755 12.555 3.016zm4.613
          3.967c.262 6.608 1.269 10.786 3.021 12.535 2.629 2.625 6.894 2.621
          9.527-.007a6.717 6.717 0
          00.007-9.511c-1.752-1.75-5.937-2.755-12.555-3.017z"
                        opacity=".4"
                      />
                      <g transform="translate(14.096 13.503)">
                        <mask id="c" fill="#fff">
                          <use xlink:href="#b" />
                        </mask>
                        <use fill="#A8B7C5" xlink:href="#b" />
                        <path
                          fill="#DDE5F2"
                          d="M2.447.605l1.837.001.011 13.451-1.837-.001z"
                          mask="url(#c)"
                          transform="rotate(-45 3.37 7.33)"
                        />
                        <path
                          fill="#DDE5F2"
                          d="M1.639.174l1.3-1.298 9.519 9.503-1.3 1.298z"
                          mask="url(#c)"
                        />
                      </g>
                      <path
                        stroke="#8696C5"
                        stroke-width=".9"
                        d="M31.994 10.595l4.473-1.063m-6.312-.77l1.721-4.42"
                      />
                      <ellipse
                        cx="27.58"
                        cy="12.281"
                        fill="#8B9AA8"
                        rx="4.903"
                        ry="4.887"
                      />
                    </g>
                    <path
                      fill="#DAE2EC"
                      d="M19.255 83l69 21.848V182l-69-29.661z"
                    />
                    <path
                      fill="#C5D0D9"
                      d="M145.255 86l-58 18.905V182l58-29.64z"
                    />
                    <path
                      fill="#DAE2EC"
                      d="M144.849 85l22.406 29.751L107.792 138l-20.537-34.173z"
                    />
                    <path
                      fill="#C5D0D9"
                      d="M19.578 82L.255 112.013 68.357 138l19.898-34.185z"
                    />
                  </g>
                </svg>
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
  .responsive-ui-table {
    position: relative;
    border: 1px solid transparent;
    overflow-y: auto;
    font-size: var(--font-size, 14px);
    font-family: var(--font-family, inherit);
    border-radius: var(--border-radius, 5px);

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

      .responsive-ui-table__column--empty {
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
