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
        <PlayerSettings
          v-for="(n, i) in $store.getters.lobby.player.length"
          :key="i"
          :componentid="i"
          :enabled="checkEnabled(i)"
        >
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
        <div class="d-flex justify-content-center">
          <button class="standard-button" v-on:click="setPlayerReady">
            Ready
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import PlayerSettings from "@/components/PlayerSettings.vue";
import { WebsocketMixin } from "@/mixins/websocketMixin.js"

export default {
  name: "lobby",
  mixins: [WebsocketMixin],
  methods: {
    setPlayerReady: function() {
      this.$store.dispatch("setClientPlayerReady");
      this.sendPlayerData();
    },
    sendPlayerData: function(){
      if (this.$parent != null) {
        this.sendObjectOverWebsocket( {player: this.$store.getters.lobby.player }, "lobby-change");
      }
    },
    checkEnabled: function(n) {
      console.log('n' + n + ' === cookies.get(id)' + window.$cookies.get('id') + ': ' + n === Number(window.$cookies.get('id')));
      return n === Number(window.$cookies.get('id'))
    }
  },
  mounted: function() {
    console.log("lobby: " + JSON.stringify(this.$store.getters.lobby));
    if(!window.$cookies.isKey('registered') || window.$cookies.get('registered') === 'false') {
      this.sendMessageOverWebsocket("register");
    }
  },
  computed: {
    isEnabled: function(n) {
      return n === this.$store.getters.lobby.clientId
    }
  },
  components: {
    PlayerSettings,
  },
};
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
