<script lang="ts">
  export let type = "text",
    label = "",
    value = "",
    readonly = false,
    placeholder = "";
</script>

<style lang="scss">
  label {
    display: block;
    color: #06002b;
    font-size: 16px;
    margin-bottom: 7px;
  }
  input {
    cursor: default;
    position: relative;
    max-width: 480px;
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    padding: 14px 40px 14px 16px;
    appearance: none;
    outline: none;
    text-align: left;
    overflow: visible;
    text-transform: none;
    margin: 0;
    border: solid 0.5px var(--form_smallwords, #e1e1e1);
    font-size: 16px;
    box-sizing: border-box;
    display: block;
  }
</style>

<div>
    <label>
        {label}
    </label>
    <input {readonly} {type} {value}/>
</div>
<!-- markup (zero or more items) goes here -->
