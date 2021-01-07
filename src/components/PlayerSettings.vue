<template>
  <div
    class="row player-item d-flex justify-content-between align-items-center"
  >
    <div class="player-item-content">
      <label v-if="!changeName" style="margin-right: 10px">Name:</label>
      <v-text-field
        v-if="changeName"
        v-model="playerName"
        @keyup.enter="switchView"
        type="text"
        minlength="3"
        max="30" label="Name">
        </v-text-field>
      <label v-if="!changeName" style="min-width: 9em">{{ getPlayerName }}</label>
      <div v-if="componentid != 0" class="d-flex justify-content-end">
        <button
          v-if="enabled"
          @click="switchView"
          class="standard-button-small"
        >
          Change Name
        </button>
      </div>
    </div>
    <div class="player-item-content">
      <v-col v-if="componentid != 0 && enabled" cols="11">
      <v-select
        v-model="selected"
        id="name-select"
        :items="colors.slice(1)"
        item-text="name"
        item-value="value"
        label="Player Color"
        return-object
        outlined
        @change="onChange($event)">
      </v-select>
      </v-col>
      <label v-else>{{ playerColor.name }}</label>
      <div
        class="color-preview"
        v-bind:style="{ 'background-color': playerColor.value }"
      ></div>
    </div>
    <div class="player-item-content justify-content-end">
      <label style="margin-right: 10px">Ready:</label>
      <div v-if="playerReady" class="ready-field-green"></div>
      <div v-else class="ready-field-red"></div>
    </div>
  </div>
</template>

<script lang="js">
import { WebsocketMixin } from "@/mixins/websocketMixin.js"

export default {
  name: "PlayerSettings",
  mixins: [WebsocketMixin],
  props: {
    componentid: Number,
    enabled: Boolean,
  },
  data: function() {
    return {
      changeName: false,
      playerName: "empty",
      selected: this.playerColor,
      colors: [
        {
          name: "black",
          value: "#000000"
        },
        {
          name: "blue",
          value: "#0000ff"
        },
        {
          name: "green",
          value: "#1c8c1c"
        },
        {
          name: "orange",
          value: "#de991b"
        },
        {
          name: "pink",
          value: "#ff00ff"
        },
        {
          name: "red",
          value: "#ff0000"
        },
        {
          name: "light-blue",
          value: "#0ddeff"
        }
      ]
    };
  },
  mounted: function () {
    this.enabled = this.$store.getters.lobby.player[this.componentid].id === Number(window.$cookies.get('id'))
    // initialize Player Name from store
    this.playerName = this.getPlayerName;

  },
  methods: {
    switchView: function () {
      this.changeName = !this.changeName;
      if (this.changeName === false) {
        // second button press
        this.$store.dispatch("updateClientPlayerName", this.playerName)
        this.sendObjectOverWebsocket( {player: this.$store.getters.lobby.player }, "lobby-change");
      }
    },
    onChange: function () {
      console.log('OnChange');
      this.$store.dispatch("setPlayerColor", this.selected.value);
      this.sendObjectOverWebsocket( {player: this.$store.getters.lobby.player }, "lobby-change");
    },
    getClientPlayer: function() {
      return this.$store.getters.lobby.player[this.componentid];
    },
    getColorObject: function(color) {
      const result = this.colors.find(col => col.value === color)
      if(result === undefined) {
        var obj = {
          name: "black",
          value: "#000000"
        };
        return obj;
      } else {
        return result;
      }
    }
  },
  computed: {
    getPlayerName: function () {
      return this.$store.getters.lobby.player[this.componentid].name;
    },
    playerReady: function () {
      return this.$store.getters.lobby.player[this.componentid].ready;
    },
    playerColor: function() {
      if(this.$store.getters.lobby.player[this.componentid].id === Number(window.$cookies.get('id'))) {
        const color = this.$store.getters.clientPlayer.color;
        return this.getColorObject(color)
      } else {
        const color = this.$store.getters.lobby.player[this.componentid].color;
        return this.getColorObject(color)
      }
    },
  }
};
</script>

<style scoped>
.color-preview {
  border-radius: 50px;
  border: 2px solid black;
  width: 2em;
  min-width: 2em;
  min-height: 2em;
  height: 2em;
  margin-left: 1em;
}

.player-item {
  background-color: #b2dbff;
  border: 2px solid #25313e;
  border-radius: 10px;
  margin: 1.5em;
  padding: 0.3em;
  min-width: 10em;
}

.ready-field-red {
  width: 2em;
  height: 2em;
  background-color: red;
  border-radius: 3px;
  border: 2px solid black;
}

.ready-field-green {
  width: 2em;
  height: 2em;
  background-color: green;
  border-radius: 3px;
  border: 2px solid black;
}

.player-item-content {
  min-width: 8em;
  max-height: 6em;
  margin: 0 0.5em 0 0.5em;
  display: flex;
  align-items: center;
}
</style>
