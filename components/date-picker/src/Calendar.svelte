<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import {
    get2DimensionDate,
    monthNames,
    toDateString,
    weekdays,
  } from "./datetime";

  const dispatch = createEventDispatcher();

  export let year = 0;
  export let month = 0;
  export let day = 0;
  export let disabledDate = (v: Date) => false;

  let selectedMonth = month;
  let selectedYear = year;

  $: selectedMonth = month;
  $: selectedYear = year;

  const handlePrevYear = () => {
    if (selectedYear - 1 > 1970) selectedYear--;
  };

  const handleNextYear = () => {
    if (selectedYear + 1 < 9999) selectedYear++;
  };

  const handlePrevMonth = () => {
    if (selectedMonth - 1 < 0) {
      selectedYear--;
      selectedMonth = 11;
    } else {
      selectedMonth--;
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth + 1 > 11) {
      selectedYear++;
      selectedMonth = 0;
    } else {
      selectedMonth++;
    }
  };

  const handleSelectDate = (date: Date) => (e: Event) => {
    dispatch("change", date);
  };

  $: isValid = year > 0 && month >= 0 && day > 0;
  $: getClassList = (v: Date) => {
    const clsList: Array<string> = [];

    if (v.getMonth() != selectedMonth) {
      clsList.push("calendar__date--not-in-view");
    } else {
      if (
        isValid &&
        v.getDate() == day &&
        v.getMonth() == month &&
        v.getFullYear() == year
      )
        clsList.push("calendar__date--selected");
    }
    if (disabledDate(v)) clsList.push("calendar__date--disabled");
    return clsList.join(" ");
  };
  $: data = get2DimensionDate(selectedMonth, selectedYear);
</script>

<div class="calendar" on:click|stopPropagation in:fade out:fade>
  <div class="calendar-header">
    <button class="calendar-button" on:click={handlePrevYear}>
      <span class="calendar-most-prev-icon" />
    </button>
    <button class="calendar-button" on:click={handlePrevMonth}>
      <span class="calendar-prev-icon" />
    </button>
    <div class="calendar-header-caption">
      <button class="calendar-button"
        >{monthNames[selectedMonth].substr(0, 3)}
      </button>
      <button class="calendar-button">{selectedYear}</button>
    </div>
    <button class="calendar-button" on:click={handleNextMonth}>
      <span class="calendar-next-icon" />
    </button>
    <button class="calendar-button" on:click={handleNextYear}>
      <span class="calendar-most-next-icon" />
    </button>
  </div>
  <div class="calendar-body">
    <table>
      <thead>
        <tr>
          {#each weekdays as v}
            <td>{v.substr(0, 2)}</td>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each Array.from({ length: 6 }) as _, i}
          <tr>
            {#each Array.from({ length: 7 }) as _, j}
              <td
                data-date={toDateString(data[i * 7 + j])}
                on:click={handleSelectDate(data[i * 7 + j])}
              >
                <div class="calendar__date {getClassList(data[i * 7 + j])}">
                  {data[i * 7 + j].getDate()}
                </div>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <slot name="footer">
    <div class="calendar-footer">
      <button class="calendar-button" on:click={handleSelectDate(new Date())}
        >Today</button
      >
    </div>
  </slot>
</div>

<style lang="scss">
  .calendar {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    // padding: var(--padding, 15px);
    width: 260px;

    &-header-caption {
      flex-grow: 1;
      text-align: center;
    }

    .calendar-button {
      cursor: pointer;
      font-family: inherit;
      // padding: 0 3px;
      // -webkit-appearance: button;
      background: transparent;
      border: none;
    }

    .calendar-header,
    .calendar-footer {
      display: flex;
      justify-content: center;
      height: 36px;
      padding: 0 8px;
      align-items: center;
    }

    .calendar-header {
      border-bottom: 1px solid #f5f5f5;

      .calendar-prev-icon,
      .calendar-most-prev-icon,
      .calendar-next-icon,
      .calendar-most-next-icon {
        position: relative;
        display: inline-block;
        width: 7px;
        height: 7px;
      }
      .calendar-prev-icon,
      .calendar-most-prev-icon {
        transform: rotate(-45deg);
      }
      .calendar-next-icon,
      .calendar-most-next-icon {
        transform: rotate(135deg);
      }
      .calendar-prev-icon::before,
      .calendar-most-prev-icon::before,
      .calendar-next-icon::before,
      .calendar-most-next-icon::before {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 7px;
        height: 7px;
        border: 0 solid currentColor;
        border-width: 1.5px 0 0 1.5px;
        content: "";
      }
      .calendar-most-prev-icon::after,
      .calendar-most-next-icon::after {
        position: absolute;
        top: 4px;
        left: 4px;
        display: inline-block;
        width: 7px;
        height: 7px;
        border: 0 solid currentColor;
        border-width: 1.5px 0 0 1.5px;
        content: "";
      }
    }

    .calendar-body {
      padding: 8px;
    }

    table {
      table-layout: fixed;
      border-collapse: collapse;
      width: 100%;

      th,
      td {
        text-align: center;
        vertical-align: middle;
        padding: 2px 0;
      }
    }

    th {
      font-weight: 650;
    }

    .calendar__date {
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      height: 25px;
      line-height: 25px;
      width: 25px;
      // border: 1px solid red;
      // border-radius: 50%;
      transition: all 0.3s;

      &--selected {
        background: #fc4451;
        color: #fff;
      }

      &--disabled:before {
        background: #bebebe !important;
      }

      &--not-in-view {
        color: #bebebe;
      }

      &:hover {
        background: #fc4451;
        color: #fff;
      }
    }

    .calendar-footer {
      border-top: 1px solid #f5f5f5;
      justify-content: center;
    }

    // &:before {
    //   content: "";
    //   position: fixed;
    //   display: block;
    //   top: 0;
    //   bottom: 0;
    //   right: 0;
    //   background: red;
    //   height: 100%;
    //   z-index: 100;
    // }
    @media screen and (max-width: 640px) {
      position: fixed;
      bottom: 10px;
      left: 10px;
      right: 10px;
      width: auto;
      // box-shadow: none;
    }
  }
</style>
