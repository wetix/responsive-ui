<script lang="ts">
  export let label = "text",
    name = "",
    value = "",
    group = undefined;
</script>

<style lang="scss">
  label {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;

      &:checked ~ .checkmark:after {
        display: block;
      }
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 16px;
      width: 16px;
      background-color: #fff;
      border-radius: 50%;
      border: 2px solid #fc4451;
      box-sizing: border-box;

      &::after {
        content: "";
        position: absolute;
        display: none;
      }

      &::after {
        top: 2px;
        left: 2px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fc4451;
      }
    }

    &:hover input ~ .checkmark {
      background-color: #e1e1e1;
    }
  }
</style>

<label>
  {label}
  <input bind:group type="radio" {value}/>
  <span class="checkmark"></span>
</label>
<!-- markup (zero or more items) goes here -->
