<template>
    <v-app-bar id="header" color="#93b2e0" dense fixed>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn href="/" text>Home</v-btn>
        <v-btn href="/about" text>About</v-btn>
        <v-btn v-if="$store.getters.gameRunning" v-on:click="callUndo" text>Undo</v-btn>
        <v-btn v-if="$store.getters.gameRunning" v-on:click="callRedo" text>Redo</v-btn>
      </v-toolbar-items>
      <v-row justify="center">
        <v-toolbar-title class="title">ScotlandYard</v-toolbar-title>
      </v-row>
    </v-app-bar>
</template>

<script lang="js">
import { WebsocketMixin } from "@/mixins/websocketMixin.js"

export default{
  name: "Header",
  mixins: [WebsocketMixin],
  methods: {
    callUndo: function () {
      this.sendMessageOverWebsocket("undo")
    },
    callRedo: function () {
      this.sendMessageOverWebsocket("redo")
    },
    menuItems: function() {
      return this.menu
    }
  },
};
</script>

<style scoped>
#header {
  background-color: #93b2e0;
  box-shadow: 0 0 25px 0 black;
  position: absolute;
}
.title {
  color: #ffffff;
  text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
  font-size: 2em;
}
</style>