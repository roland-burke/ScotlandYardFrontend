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
/* If the screen size is 601px wide or more */
@media screen and (min-width: 751px) {
  .game-round {
    background-color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    -webkit-box-shadow: 5px 5px 13px 0px #000000;
    -moz-box-shadow: 5px 5px 13px 0px #000000;
    box-shadow: 5px 5px 13px 0px #000000;
    padding: 5px;
    margin-top: 40px;
    border: 2px solid #000000;
    border-radius: 6px;
    pointer-events: all;
  }
}

/* If the screen size is 600px wide or less */
@media screen and (max-width: 750px) {
  .game-round {
    background-color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    -webkit-box-shadow: 5px 5px 13px 0px #000000;
    -moz-box-shadow: 5px 5px 13px 0px #000000;
    box-shadow: 5px 5px 13px 0px #000000;
    padding: 5px;
    margin-top: 40px;
    border: 2px solid #000000;
    border-radius: 6px;
    pointer-events: all;
    font-size: 95%;
  }
}

.game-round:hover {
  opacity: 0.3;
}
</style>
