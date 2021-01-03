<template>
  <div id="header">
    <v-toolbar>
      <v-toolbar-title>ScotlandYard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn href="/" text>Home</v-btn>
        <v-btn href="/about" text>About</v-btn>
        <v-btn v-if="$store.getters.getGameRunning" v-on:click="callUndo" text>Undo</v-btn>
        <v-btn v-if="$store.getters.getGameRunning" v-on:click="callRedo" text>Redo</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
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