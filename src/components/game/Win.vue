<template>
  <div
    id="winning-dialog"
    class="winning-dialog col d-flex flex-column justify-content-between"
    v-if="$store.getters.getWinningDialog"
  >
    <div id="close-button" class="d-flex justify-content-end">
      <v-btn elevation="9" fab color="red" small v-on:click="manageWinningDialog">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col">
        <div class="row d-flex justify-content-center" id="winning-row">
          <h1 v-if="model.winningPlayer === 'MrX'" id="winning-title">
            MrX Won!!!
          </h1>
          <h1 v-else id="winning-title">Detectives Won!!!</h1>
        </div>
        <v-divider></v-divider>
        <div id="winning-subtitle" class="row d-flex justify-content-center">
          <div v-if="model.winningPlayer === 'MrX'">
            MrX escaped successfully
          </div>
          <div v-else>
            MrX was caught at Station:
            {{ extractCurrentPlayer.station }}
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center" id="win-image" style="padding-top: 2.5em;">
      <img
        v-if="model.winningPlayer === 'MrX'"
        :width="250"
        :height="250"
        :src="require('../../assets/mrx-win.png')"
        :alt="MrX"
      />
      <img
        v-else
        :width="250"
        :height="250"
        :src="require('../../assets/detective-win.png')"
        :alt="Detective"
      />
    </div>
    <div
      id="win-button"
      class="row d-flex justify-content-center align-items-center align-self-center"
      style="padding-top: 2em;"
    >
      <a href="/">
        <button class="standard-button">Main Menu</button>
      </a>
    </div>
  </div>
</template>

<script lang="js">
export default {
    name: "Win",
    props: {
        model: Object
    },
    watch: {
      model: function() {
        if(this.model.win) {
          console.log("WIIIIIIN");
          this.$store.dispatch('setWinningDialog', true)
        }
      }
    },
    computed: {
        extractCurrentPlayer: function() {
            for (const player of this.model.player.players) {
                if (player.current === true) {
                  return player;
                }
            }
            return null;
        }
    },
    methods: {
      manageWinningDialog: function() {
         this.$store.dispatch('setWinningDialog', false)
      }
    }
};
</script>

<style scoped>
.winning-dialog {
  background-color: #fdad58;
  border: 2px solid #000000;
  border-radius: 6px;
  -webkit-box-shadow: 5px 5px 13px 0px #000000;
  -moz-box-shadow: 5px 5px 13px 0px #000000;
  box-shadow: 5px 5px 13px 0px #000000;
  min-height: 40vh;
  min-width: 40vw;
  max-width: 30vw;
  margin: 10vh 5vh 10vh 5vh;
  pointer-events: all;
  padding: 20px;
  visibility: visible;
  overflow: hidden;
}

.winning-background {
  background-color: #000000;
  z-index: 2;
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
  position: fixed;
  pointer-events: none;
  visibility: visible;
  overflow: hidden;
}

.not-active {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: #4d4d4d;
  opacity: 0.3;
}

.close-button {
  background-color: red;
}
</style>
