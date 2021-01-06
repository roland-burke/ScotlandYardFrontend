<template>
  <div
    id="winning-dialog"
    class="winning-dialog col d-flex flex-column justify-content-between"
    v-if="showWinningDialog"
  >
    <div id="close-button" class="d-flex justify-content-end">
      <v-btn elevation="9" fab color="red" v-on:click="manageWinningDialog">
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
    <div class="row d-flex justify-content-center" id="win-image">
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
    data: function() {
        return {
            showWinningDialog: false
        }
    },
    props: {
        model: Object
    },
    watch: {
      model: function() {
        if(this.model.win) {
          this.showWinningDialog = true
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
        this.showWinningDialog = false
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
