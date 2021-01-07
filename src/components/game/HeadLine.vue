<template>
  <div class="game-round justify-content-center">
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

<style scoped>
.game-round {
  background-color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  -webkit-box-shadow: 5px 5px 13px 0px #000000;
  -moz-box-shadow: 5px 5px 13px 0px #000000;
  box-shadow: 5px 5px 13px 0px #000000;
  padding: 5px;
  margin-top: 50px;
  border: 2px solid #000000;
  border-radius: 6px;
  pointer-events: all;
}

.game-round:hover {
  opacity: 0.3;
}
</style>
