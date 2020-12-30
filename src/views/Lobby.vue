<template>
  <div id="lobby" class="container-fluid lobby-wrapper">
    <div class="row d-flex justify-content-center">
      <h1>Lobby</h1>
    </div>
    <div class="row">
      <div class="col-lg-8 lobby-panel">
        <div class="d-flex justify-content-center" style="margin-top: 1em">
          <h3>Player</h3>
        </div>
        <PlayerSettings v-for="n in 6" :key="n" :componentId="n">
        </PlayerSettings>
      </div>
      <div class="col-lg-3 lobby-panel d-flex flex-column">
        <div class="d-flex justify-content-center" style="margin-top: 1em">
          <h3>Settings</h3>
        </div>
        <div class="player-item">
          <label>Rounds: 24</label>
          <br />
          <label>Max Player: 7</label>
          <h6>Detective Tickets:</h6>
          <ul>
            <li>11 Taxi</li>
            <li>&nbsp;8 Bus</li>
            <li>&nbsp;4 Underground</li>
          </ul>
          <h6>Mr.X Tickets:</h6>
          <ul>
            <li>99 Taxi</li>
            <li>99 Bus</li>
            <li>99 Underground</li>
            <li>&nbsp;2 Black</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center lobby-bottom-panel">
        <div class="d-flex justify-content-center" style="margin: 15px">
          <button class="standard-button" v-on:click="startGame">Start</button>
        </div>
        <div class="d-flex justify-content-center" style="margin: 15px">
          <button class="standard-button" v-on:click="getReady">Ready</button>
        </div>
      </div>
    </div>
    <link rel="stylesheet" href="/assets/stylesheets/lobby.css" />
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue"; // @ is an alias to /src
import PlayerSettings from "@/components/PlayerSettings.vue";

export default defineComponent({
  name: "lobby",
  props: {
    lobby: {
      type: Object,
      default: null,
    },
  },
  methods: {
    startGame: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.lobby.player),
      };
      fetch("/init", requestOptions);
    },
    getReady: function () {
      const clientPlayer = this.lobby.player[this.lobby.clientId];
      clientPlayer.ready = true;
      this.sendPlayerData();
    },
    sendPlayerData: function () {
      const jsPlayer = {
        player: this.lobby.player,
      };
      if (this.$root != null) {
        this.$root.sendObjectOverWebsocket(jsPlayer, "lobby-change");
      }
    },
  },
  mounted: function () {
    console.log("lobby: " + JSON.stringify(this.lobby));
    this.$root.sendMessageOverWebsocket("register");
  },
  components: {
    PlayerSettings,
  },
});
</script>

<style scoped>
.lobby-wrapper {
  margin-top: 5em;
}

.lobby-panel {
  background-color: #abcdef;
  border-radius: 10px;
  border: 2px solid #000000;
  margin: 1.5em;
}

.lobby-bottom-panel {
  background-color: #abcdef;
  border-radius: 10px;
  border: 2px solid #000000;
  margin: 1.5em 1.5em 3.5em 1.5em;
}
</style>
