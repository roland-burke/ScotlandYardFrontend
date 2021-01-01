<template>
  <nav class="navbar navbar-expand-md navbar-light fixed-top" id="header">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Main Menu <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active float-left">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                    <li v-if="$store.getters.getGameRunning" class="nav-item active">
                        <router-link class="nav-link" to="/game">Save Game</router-link>
                    </li>
                    <li v-if="$store.getters.getGameRunning" class="nav-item active">
                        <a id="undo" class="nav-link" v-on:click="callUndo" href="javascript:void(0)">Undo</a>
                    </li>
                    <li v-if="$store.getters.getGameRunning" class="nav-item active">
                        <a id="redo" class="nav-link" v-on:click="callRedo" href="javascript:void(0)">Redo</a>
                    </li>
                </ul>
                <div class="d-flex justify-content-center" style="width: 100%; position: fixed; pointer-events: none">
                    <label class="title">ScotlandYard</label>
                </div>
            </div>
        </nav>
</template>

<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  methods: {
    callUndo: function () {
      this.$root.sendMessageOverWebsocket("undo")
    },
    callRedo: function () {
      this.$root.sendMessageOverWebsocket("redo")
    },
  },
});
</script>

<style scoped>

header {
  background-color: #93b2e0;
  box-shadow: 0 0 25px 0 black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.title {
  color: #ffffff;
  text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
  color: #ffffff;
  font-size: 2em;
  margin-right: 2vw;
}

.navbar-button {
  box-shadow: inset 0px 9px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ffffff 10%, #f6f6f6 100%);
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #666666;
  font-family: Michroma;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 14px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
}
.navbar-button:hover {
  background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
  background-color: #f6f6f6;
}
.navbar-button:active {
  position: relative;
  top: 1px;
}

.navbar {
  background-color: #7cb7eb;
  color: #ffffff;
}
</style>
