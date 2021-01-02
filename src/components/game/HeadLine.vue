<template>
  <div>
    Round: {{ round }} - Current Player:<span
      :style="'white-space: pre-wrap; color: ' + color"
    >
      {{ name }}</span
    ><br />
    <div v-if="win" class="d-flex justify-content-center">
      <h5>Game finished!</h5>
    </div>
  </div>
</template>

<script lang="js">

export default{
  name: "HeadLine",
    props: {
        round: Number,
        color: String,
        name: String,
        win: Boolean
    }
};
</script>
