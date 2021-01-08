<script lang="ts">
  export let name = "";
  export let options = [];
</script>

<style lang="scss">
</style>

<select {name}>
  {#each options as option}
    <option>test</option>
  {/each}
</select>
