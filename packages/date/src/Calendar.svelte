<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  // import { getNodeAttribute } from "@wetix/utils";

  const dispatch = createEventDispatcher();

  export let style = "";
  export let value = "";
  export let visible = false;
  export let availableDays = [];
  export let hoveredDate = "";

  let today = value ? new Date(value) : new Date();
  let month = today.getMonth();
  let year = today.getFullYear();

  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

  const nextMonth = (): void => {
    if (++month > 11) {
      year++;
      month = 0;
    }
    getNoOfDays();
  };

  const prevMonth = (): void => {
    if (--month < 0) {
      year--;
      month = 11;
    }
    getNoOfDays();
  };

  const getNoOfDays = (): void => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // find where to start calendar day of week
    const dayOfWeek = new Date(year, month).getDay();
    const blankDaysArray = [];
    for (let i = 1; i <= dayOfWeek - 1; i++) {
      // blankDaysArray.push(i);
      blankDaysArray.push("");
    }

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    // blankDays = blankDaysArray;
    // availableDays = daysArray;
    const days = [...blankDaysArray, ...daysArray];
    availableDays = days.reduce((arr, item, idx) => {
      const cIdx = Math.floor(idx / 7);

      if (!arr[cIdx]) {
        arr[cIdx] = [];
      }

      arr[cIdx].push(item);
      return arr;
    }, []);
  };

  $: isSelectedDay = (date: string, type?: "end" | "start"): boolean => {
    if (type === "end") {
      return value[1] === date;
    }
    if (type === "start") {
      return value[0] === date;
    }
    return false;
  };

  const onSelectDate = (e: Event) => {
    // const date = getNodeAttribute(e, "data-date");
    // console.log(date);
    // if (date) {
    //   value = date;
    //   dispatch("change", value);
    // }
  };

  getNoOfDays();
</script>

<style lang="scss">
  .responsive-ui-date-picker__container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background: #fff;
    max-height: 360px;
    border-radius: 10px;
    box-shadow: 0 0 13px -4px rgba(0, 0, 0, 0.2);

    .responsive-ui-date-picker__panels {
      display: inline-flex;
      max-width: 650px;
      width: 100%;
    }

    .responsive-ui-date-picker__panel {
      padding: 10px;
      max-width: 300px;
    }

    .responsive-ui-date-picker__header {
      display: block;
      position: relative;
      margin-bottom: 16px;

      .responsive-ui-date-picker__buttons {
        position: absolute;
        top: 0;
        bottom: 0;

        &-prev {
          left: 0;
        }

        &-next {
          right: 0;
        }

        button {
          display: inline-flex;
          padding: 4px;
          background-color: transparent;
          border: none;
          border-radius: 50%;
          cursor: pointer;

          &:hover {
            background-color: #dbdbdb;
          }
        }

        svg {
          height: 20px;
          width: 20px;
          display: inline-flex;
          color: #fc4451;
        }
      }

      .responsive-ui-date-picker__month-year {
        font-size: 16px;
        text-align: center;
        padding-top: 4px;
        user-select: none;
      }
    }

    .responsive-ui-date-picker__body {
      .responsive-ui-date-picker__day,
      .responsive-ui-date-picker__date {
        width: 34px;
        height: 34px;
        text-align: center;
        color: #3d3d3d;
        border-radius: 9999px;
      }

      .responsive-ui-date-picker__date {
        position: relative;
        cursor: pointer;
        &:hover {
          background-color: #dbdbdb;
        }

        span {
          user-select: none;
        }
      }
    }
  }
</style>

<svelte:options accessors />

{#if visible}
  <div
    class="responsive-ui-date-picker__container"
    transition:fade={{ duration: 150 }}
    {style}>
    <div class="responsive-ui-date-picker__panels">
      <div class="responsive-ui-date-picker__panel">
        <div class="responsive-ui-date-picker__header">
          <div
            class="responsive-ui-date-picker__buttons responsive-ui-date-picker__buttons-prev">
            <button type="button" on:click|stopPropagation={prevMonth}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div class="responsive-ui-date-picker__month-year">
            {MONTH_NAMES[month]}
            {year}
          </div>
          <div
            class="responsive-ui-date-picker__buttons responsive-ui-date-picker__buttons-next">
            <button type="button" on:click|stopPropagation={nextMonth}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div class="responsive-ui-date-picker__body">
          <table>
            <thead>
              <tr>
                {#each DAYS as day}
                  <th class="responsive-ui-date-picker__day">{day}</th>
                {/each}
              </tr>
            </thead>
            <tbody on:click|stopPropagation={onSelectDate}>
              {#each availableDays as dateRow}
                <tr style="margin-bottom: 6px">
                  {#each dateRow as date}
                    <td
                      class="responsive-ui-date-picker__date"
                      class:responsive-ui-date-picker__date-selected={isSelectedDay(`${year}-${month + 1}-${date}`)}
                      on:mouseenter={() => {
                        hoveredDate = `${year}-${month + 1}-${date}`;
                      }}
                      on:mouseleave={() => {
                        hoveredDate = '';
                      }}
                      data-date={`${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`}>
                      <span>{date}</span>
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
{/if}
