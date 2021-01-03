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
        style="width: 15em"
        type="text"
        minlength="3"
        max="30" label="Name">
        </v-text-field>
      <label v-if="!changeName" style="width: 15em">{{ getPlayerName }}</label>
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
      <v-col v-if="componentid != 0 && enabled" cols="9">
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
      <label v-else>{{ playerColorName }}</label>
      <div
        v-if="enabled"
        class="color-preview"
        v-bind:style="{ 'background-color': selected.value }"
      ></div>
      <div
        v-else
        class="color-preview"
        v-bind:style="{ 'background-color': playerColor }"
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

export default {
  name: "PlayerSettings",
  props: {
    componentid: Number,
    enabled: Boolean,
  },
  data: function() {
    return {
      changeName: false,
      playerName: "empty",
      selected: {name: 'black', value: '#000000'},
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
    this.clientPlayer = this.$store.getters.clientPlayer;
    console.log(this.componentid)
    console.log(this.$store.getters.lobby.player[0])
    this.selected = this.colors[this.componentid];
    this.playerName = this.$store.getters.lobby.player[this.componentid].name;
  },
  methods: {
    switchView: function () {
      this.changeName = !this.changeName;
      if (this.changeName === false) {
        // second button press
        this.$store.dispatch("updateClientPlayerName", this.playerName)
        this.$parent.sendPlayerData();
      }
    },
    onChange: function () {
      console.log('OnChange');
      this.$store.dispatch("setPlayerColor", this.selected.value);
      this.$parent.sendPlayerData();
    },
    getClientPlayer: function() {
      return this.$store.getters.lobby.player[this.componentid];
    },
  },
  computed: {
    playerColor: function() {
      return this.$store.getters.lobby.player[this.componentid].color;
    },
    playerColorName: function() {
      const color = this.$store.getters.lobby.player[this.componentid].color;
      console.log(this.componentid)
      console.log(color);
      const result = this.colors.find(col => col.value === color)
      console.log('result: ' + JSON.stringify(result))
      if(result === undefined) {
        return 'black'
      } else {
        return result.name;
      }
    },
    getPlayerName: function () {
      return this.$store.getters.lobby.player[this.componentid].name;
    },
    playerReady: function () {
      return this.$store.getters.lobby.player[this.componentid].ready;
    },
  }
};
</script>

<style scoped>
.color-preview {
  border-radius: 50px;
  border: 2px solid black;
  width: 2em;
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
  min-width: 16em;
  margin: 0 0.5em 0 0.5em;
  display: flex;
  align-items: center;
}
</style>
