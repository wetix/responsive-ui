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
      clsList.push("resp-calendar__date--not-in-view");
    } else {
      if (
        isValid &&
        v.getDate() == day &&
        v.getMonth() == month &&
        v.getFullYear() == year
      )
        clsList.push("resp-calendar__date--selected");
    }
    if (disabledDate(v)) clsList.push("resp-calendar__date--disabled");
    return clsList.join(" ");
  };
  $: data = get2DimensionDate(selectedMonth, selectedYear);
</script>

<div class="resp-calendar" on:click|stopPropagation in:fade out:fade>
  <div class="resp-calendar-header">
    <button class="resp-calendar-button" on:click={handlePrevYear}>
      <span class="resp-calendar-most-prev-icon" />
    </button>
    <button class="resp-calendar-button" on:click={handlePrevMonth}>
      <span class="resp-calendar-prev-icon" />
    </button>
    <div class="resp-calendar-header-caption">
      <button class="resp-calendar-button"
        >{monthNames[selectedMonth].substr(0, 3)}
      </button>
      <button class="resp-calendar-button">{selectedYear}</button>
    </div>
    <button class="resp-calendar-button" on:click={handleNextMonth}>
      <span class="resp-calendar-next-icon" />
    </button>
    <button class="resp-calendar-button" on:click={handleNextYear}>
      <span class="resp-calendar-most-next-icon" />
    </button>
  </div>
  <div class="resp-calendar-body">
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
                <div
                  class="resp-calendar__date {getClassList(data[i * 7 + j])}"
                >
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
    <div class="resp-calendar-footer">
      <button
        class="resp-calendar-button"
        on:click={handleSelectDate(new Date())}>Today</button
      >
    </div>
  </slot>
</div>

<style lang="scss">
  .resp-calendar {
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

    .resp-calendar-button {
      cursor: pointer;
      font-family: inherit;
      // padding: 0 3px;
      // -webkit-appearance: button;
      background: transparent;
      border: none;
    }

    .resp-calendar-header,
    .resp-calendar-footer {
      display: flex;
      justify-content: center;
      height: 36px;
      padding: 0 8px;
      align-items: center;
    }

    .resp-calendar-header {
      border-bottom: 1px solid #f5f5f5;

      .resp-calendar-prev-icon,
      .resp-calendar-most-prev-icon,
      .resp-calendar-next-icon,
      .resp-calendar-most-next-icon {
        position: relative;
        display: inline-block;
        width: 7px;
        height: 7px;
      }
      .resp-calendar-prev-icon,
      .resp-calendar-most-prev-icon {
        transform: rotate(-45deg);
      }
      .resp-calendar-next-icon,
      .resp-calendar-most-next-icon {
        transform: rotate(135deg);
      }
      .resp-calendar-prev-icon::before,
      .resp-calendar-most-prev-icon::before,
      .resp-calendar-next-icon::before,
      .resp-calendar-most-next-icon::before {
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
      .resp-calendar-most-prev-icon::after,
      .resp-calendar-most-next-icon::after {
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

    .resp-calendar-body {
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

    .resp-calendar__date {
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

    .resp-calendar-footer {
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
