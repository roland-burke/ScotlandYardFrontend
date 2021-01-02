<template>
  <div id="game-wrapper-total" style="position: relative; overflow-x: hidden">
    <div
      v-if="model !== null && model.win && showWinningDialog"
      id="winning-background"
      class="winning-background"
    ></div>

    <Map v-if="model !== null" v-bind:playersdata="model.player" ref="Map">
    </Map>

    <div
      class="container-fluid"
      style="overflow: hidden; position: absolute; top: 0; pointer-events: none"
    >
      <div class="row">
        <div class="col d-flex justify-content-center">
          <div style="padding-top: 40px">
            <div class="game-round justify-content-center">
              <div v-if="model !== null">
                <HeadLine
                  v-bind:round="model.round"
                  v-bind:color="extractCurrentPlayer.color"
                  v-bind:name="extractCurrentPlayer.name"
                  v-bind:win="model.win"
                ></HeadLine>
              </div>
              <div v-else>
                <h2>Loading..</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2">
          <div class="history-wrapper" id="history-wrapper">
            <div v-if="model !== null">
              <History
                v-bind:historyobject="model.history"
                ref="History"
              ></History>
            </div>
            <div v-else>
              <h2>Loading..</h2>
            </div>
          </div>
        </div>
        <div
          id="win"
          class="col-lg-8 d-flex justify-content-center"
          style="z-index: 5"
        >
          <div v-if="model !== null && model.win && showWinningDialog">
            <div
              id="winning-dialog"
              class="winning-dialog col d-flex flex-column justify-content-between"
            >
              <div id="close-button" class="d-flex justify-content-end">
                <button
                  v-on:click="showWinningDialog = false"
                  class="close-button"
                >
                  X
                </button>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="col">
                  <div
                    class="row d-flex justify-content-center"
                    id="winning-row"
                  >
                    <h1 v-if="model.winningPlayer === 'MrX'" id="winning-title">
                      MrX Won!!!
                    </h1>
                    <h1 v-else id="winning-title">Detectives Won!!!</h1>
                  </div>
                  <div
                    id="winning-subtitle"
                    class="row d-flex justify-content-center"
                  >
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
                  :src="require('../assets/mrx-win.png')"
                  :alt="MrX"
                />
                <img
                  v-else
                  :width="250"
                  :height="250"
                  :src="require('../assets/detective-win.png')"
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
          </div>
        </div>
        <div class="col-lg-2 d-flex justify-content-end">
          <div class="stats-wrapper" id="stats-wrapper">
            <div v-if="model !== null">
              <Stats v-bind:playersdata="model.player" ref="Stats"></Stats>
            </div>
            <div v-else>
              <h2>Loading..</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="row fixed-bottom" style="z-index: 1">
        <div class="col d-flex justify-content-center w-25">
          <div
            class="game-controls"
            id="game-controls"
            style="pointer-events: all"
          >
            <div v-if="model !== null">
              <Controls
                v-bind:name="extractCurrentPlayer.name"
                ref="Controls"
              ></Controls>
            </div>
            <div v-else>
              <h2>Loading..</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import HeadLine from "@/components/game/HeadLine.vue";
import Stats from "@/components/game/Stats.vue";
import History from "@/components/game/History.vue";
import Map from "@/components/game/Map.vue";
import Controls from "@/components/game/Controls.vue";

export default {
  name: "Game",
  props: {
        model: Object,
    },
    data: function() {
        return {
            audio: null,
            showWinningDialog: true,
        }
    },
    /*watch: {
        model: function() {
            if (this.model.win) {
                if (this.audio === null) {
                    const track = Math.floor(Math.random() * Math.floor(3));
                    const trackString = "../../assets/audio/" + track + ".mp3"
                    this.audio = new Audio(require(trackString));
                    this.audio.play();
                }
            } else {
                if (this.audio !== null) {
                    this.audio.pause();
                    this.audio = null;
                }
            }
        }
    },*/
    computed: {
        extractCurrentPlayer: function() {
            for (const player of this.model.player.players) {
                if (player.current === true) {
                    return player
                }
            }
            return undefined
        }
    },
    components: {
      Map,
      Stats,
      History,
      HeadLine,
      Controls,
    }
};
</script>

<style>
/*
Theme Name: Scotty Custom
Description: ScotlandYard online Game
Author: Roland Burke, Tim Koehler
Tags: Scala, Play, ScotlandYard
*/

/* ==== Game ==== */

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

#close-button {
  position: relative;
}

.game-controls {
  background-color: #ffe8b1;
  border: 2px solid #000000;
  border-radius: 6px;
  -webkit-box-shadow: 5px 5px 13px 0px #000000;
  -moz-box-shadow: 5px 5px 13px 0px #000000;
  box-shadow: 5px 5px 13px 0px #000000;
  padding: 4px;
  margin: 10px 10px 4em 10px;
}

.game-controls * {
  display: inline;
}

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

.stats-wrapper {
  background-color: #96b9ec;
  border: 2px solid #000000;
  border-radius: 6px;
  -webkit-box-shadow: 5px 5px 13px 0px #000000;
  -moz-box-shadow: 5px 5px 13px 0px #000000;
  box-shadow: 5px 5px 13px 0px #000000;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  max-height: 69vh;
  max-width: 19em;
  min-width: 10em;
  margin-bottom: 20px; /* prevent the shadow from being cut off */
  pointer-events: all;
}

.stats-wrapper:hover {
  opacity: 0.3;
}

.stats-item {
  background-color: #b2dbff;
  border: 2px solid #25313e;
  border-radius: 10px;
  margin: 4px;
  padding: 4px;
  min-width: 7em;
}

.stats-ticket {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.history-wrapper {
  background-color: #96b9ec;
  border: 2px solid #000000;
  border-radius: 6px;
  -webkit-box-shadow: 5px 5px 13px 0px #000000;
  -moz-box-shadow: 5px 5px 13px 0px #000000;
  box-shadow: 5px 5px 13px 0px #000000;
  overflow-y: auto;
  max-height: 69vh;
  max-width: 10em;
  min-width: 9em;
  display: flex;
  align-items: center;
  flex-direction: column;
  pointer-events: all;
  margin-bottom: 20px; /* prevent the shadow from being cut off */
}

.history-wrapper:hover {
  opacity: 0.3;
}

.history-item {
  background-color: #b2dbff;
  border: 2px solid #25313e;
  border-radius: 8px;
  margin: 4px;
  padding: 4px;
  max-width: 110px;
}

.ticket-icon {
  width: 90px;
  margin: 5px;
}

.ticket-icon-stats {
  width: 30px;
}

/* HIDE RADIO */
.ticket-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type="radio"] + img {
  cursor: pointer;
}

/* CHECKED STYLES */
[type="radio"]:checked + img {
  border: 4px solid #c30202;
  border-radius: 10px;
}
</style>
