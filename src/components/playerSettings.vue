<template>
  <div
    class="row player-item d-flex justify-content-between align-items-center"
  >
    <div class="player-item-content">
      <label style="margin-right: 10px">Name:</label>
      <input
        v-if="changeName"
        @keyup.enter="switchView"
        style="width: 15em"
        type="text"
        minlength="3"
        max="30"
        value="Dt1"
      />
      <label v-if="!changeName" style="width: 15em">{{
        playerNameComputed
      }}</label>
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
      <label style="margin-right: 10px">Player Color:</label>
      <select
        v-if="componentid != 0 && enabled"
        id="name-select"
        name="playerIndex"
      >
        <!-- The $ symbol is escaped with '' because of jQuerry -->
        <option
          v-for="color in colors" :key="color.name"
          name="player"
          v-bind:style="{ color: color.value }"
          value="color-'$'{index}"
        >
          {{ color.name }}
        </option>
      </select>
      <label v-else>black</label>
      <div
        class="color-preview"
        v-bind:style="{ 'background-color': player[componentid].color }"
      ></div>
    </div>
    <div class="player-item-content justify-content-end">
      <label style="margin-right: 10px">Ready:</label>
      <div v-if="this.getClientPlayer().ready" class="ready-field-green"></div>
      <div v-else class="ready-field-red"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayerSettings",
  props: {
    componentid: Number,
    player: Array,
    enabled: Boolean,
  },
  data: function () {
    return {
      changeName: false,
      colors: [
        {
          name: "blue",
          value: "#0000ff",
        },
        {
          name: "green",
          value: "#1c8c1c",
        },
        {
          name: "orange",
          value: "#de991b",
        },
        {
          name: "pink",
          value: "#ff00ff",
        },
        {
          name: "red",
          value: "#ff0000",
        },
        {
          name: "light-blue",
          value: "#b2dbff",
        },
      ],
    };
  },
  methods: {
    switchView: function () {
      this.changeName = !this.changeName;
      if (this.changeName === false) {
        // second button press
        const p = this.player;
        this.$emit("update:lobby.player", p);
        this.updatePlayer();
      }
    },
    getClientPlayer: function (): any {

      //return this.player[this.componentid];
    },
    updatePlayer: function () {
      //this.$parent.sendPlayerData();
    },
  },
  computed: {
    playerNameComputed: {
      get(): any {
        //this function will determine what is displayed in the input
        return this.getClientPlayer().name;
      },
      set(name: string) {
        //this function will run whenever the input changes
        const p = this.getClientPlayer();
        p.name = name;
        this.$emit("update:lobby.player", p);
      },
    },
    readyComputed: {
      get(): boolean {
        //this function will determine what is displayed in the input
        return this.getClientPlayer().ready;
      },
      set(rdy: boolean) {
        //this function will run whenever the input changes
        const p = this.getClientPlayer();
        p.ready = rdy;
        this.$emit("update:lobby.player", p);
      },
    },
  },
});
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
