<template>
  <div id="game-wrapper-total" style="position: relative; overflow-x: hidden">
    <Map v-if="model !== null" v-bind:playersdata="model.player" ref="Map">
    </Map>
    <div
      class="container-fluid"
      style="overflow: hidden; position: absolute; top: 0; pointer-events: none"
    >
      <div class="row">
        <div class="col d-flex justify-content-center">
          <div style="padding-top: 40px">
            <div v-if="$store.getters.getShowUi" class="justify-content-center">
              <div v-if="model !== null">
                <HeadLine
                  v-bind:round="model.round"
                  v-bind:color="extractCurrentPlayer.color"
                  v-bind:name="extractCurrentPlayer.name"
                  v-bind:win="model.win"
                ></HeadLine>
              </div>
              <div v-else>
                <v-progress-circular
                  :width="3"
                  indeterminate
                ></v-progress-circular>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2">
          <div
            v-if="$store.getters.getShowUi"
            class="history-wrapper"
            id="history-wrapper"
          >
            <div v-if="model !== null">
              <History
                v-bind:historyobject="model.history"
                ref="History"
              ></History>
            </div>
            <div v-else>
              <v-progress-circular
                :width="3"
                indeterminate
              ></v-progress-circular>
            </div>
          </div>
        </div>
        <div
          id="win"
          class="col-lg-8 d-flex justify-content-center"
          style="z-index: 5"
        >
          <Win v-bind:model="model" />
        </div>
        <div class="col-lg-2 d-flex justify-content-end">
          <div
            v-if="$store.getters.getShowUi"
            class="stats-wrapper"
            id="stats-wrapper"
          >
            <div v-if="model !== null">
              <Stats v-bind:playersdata="model.player" ref="Stats"></Stats>
            </div>
            <div v-else>
              <v-progress-circular
                :width="3"
                indeterminate
              ></v-progress-circular>
            </div>
          </div>
        </div>
      </div>
      <div class="row fixed-bottom" style="z-index: 1">
        <div
          v-if="$store.getters.getShowUi"
          class="col d-flex justify-content-center w-25"
        >
          <div>
            <div v-if="model !== null">
              <Controls
                v-bind:name="extractCurrentPlayer.name"
                ref="Controls"
              ></Controls>
            </div>
            <div v-else>
              <v-progress-circular
                :width="3"
                indeterminate
              ></v-progress-circular>
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
import Win from "@/components/game/Win.vue";

export default {
  name: "Game",
  props: {
        model: Object,
    },
    data: function() {
        return {
            audio: null,
        }
    },
    watch: {
      model: function() {
        console.log(JSON.stringify(this.model, null, 2)); // spacing level = 2
      }
    },
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
      Win
    }
};
</script>

<style>
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
