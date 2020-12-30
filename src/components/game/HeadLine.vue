<template>
  Round: {{ round }} - Current Player:<span
    :style="'white-space: pre-wrap; color: ' + color"
  >
    {{ name }}</span
  ><br />
  <div v-if="win" class="d-flex justify-content-center">
    <h5>Game finished!</h5>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeadLine",
    props: {
        round: Number,
        color: String,
        name: String,
        win: Boolean
    }
});
</script>