<template>
  <Header></Header>
  <router-view :lobby="lobby" :model="model"></router-view>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue"; // @ is an alias to /src
import Footer from "@/components/Footer.vue";
import $ from "jquery";

export default {
  name: "App",
  data: function () {
    return {
      websocket: new WebSocket("ws://localhost:9000/ws"),
      interval: null,
      model: null,
    };
  },
  mounted: function () {
    const that = this;

    this.websocket.onmessage = function (rawMessage) {
      const message = $.parseJSON(rawMessage.data);
      console.log(message);
      if (message.event === "ModelChanged") {
        that.model = message;
      } else if (message.event === "register") {
        that.handleRegister(message.id);
      } else if (message.event === "lobby-change") {
        console.log(
          "player: " + JSON.stringify(that.$store.getters.lobby.player)
        );
        //v.lobby.player = message.player;
        that.$store.dispatch("updateLobby", message.player);
        console.log(
          "player_after_update: " +
            JSON.stringify(that.$store.getters.lobby.player)
        );
      } else if (message.event === "StartGame") {
        console.log(that.$store.getters.getGameRunning);
        that.$store.commit("setGameRunningTrue");
        console.log(that.$store.getters.getGameRunning);
        that.$router.push("/game");
      } else if (message.event === "GameFinished") {
        that.$store.commit("setGameRunningFalse");
      }
    };

    this.websocket.onopen = function () {
      setInterval(function () {
        that.sendMessageOverWebsocket("ping");
      }, 10000);
    };
    this.websocket.onclose = function () {
      //clearInterval(v.interval);
      that.sendMessageOverWebsocket("deregister");
    };
  },
  methods: {
    handleRegister: function (messageId: number) {
      this.$store.getters.lobby.registered;
      if (!this.$store.getters.lobby.registered) {
        if (this.$store.getters.lobby.clientId !== -1) {
          // Lobby not full
          this.$store.commit("lobbySetRegistered", true);
          this.$store.commit("lobbySetClientId", messageId);
          //this.lobby.registered = true;
          //this.lobby.clientId = messageId;
          //this.$emit("update:lobby", this.lobby);
        } else {
          // Already 7 Player
          // TODO
        }
      }
    },
    sendObjectOverWebsocket: function (json: any, msg: any) {
      const obj = {
        event: msg,
        data: json,
      };
      if (this.websocket.readyState === WebSocket.OPEN) {
        console.log("send: " + JSON.stringify(obj));
        this.websocket.send(JSON.stringify(obj));
      } else {
        console.log("Could not send data. Websocket is not open.");
      }
    },
    sendMessageOverWebsocket: function (msg: any) {
      const obj = {
        event: msg,
      };
      if (this.websocket.readyState === WebSocket.OPEN) {
        this.websocket.send(JSON.stringify(obj));
      } else {
        console.log("Could not send data. Websocket is not open.");
      }
    },
  },
  computed: {
    extractCurrentPlayer: function () {
      for (const player of this.model.player.players) {
        if (player.current === true) {
          return player;
        }
      }
      return null;
    },
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Michroma");

/* === General === */

body {
  margin: 0px 0px 0px 0px !important;
  height: 100%;
  font-family: Michroma;
  background-image: url("/assets/images/map_large_small_opacity.png");
}

.main {
  display: flex;
  margin: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#about {
  display: inline-block;
  text-align: left;
  max-width: 60%;
  margin-top: 8vh;
  margin-bottom: 40px;
}

/* === Buttons === */

.standard-button {
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, #93b2e0 5%, #93bfe0 100%);
  background-color: #599bb3;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Michroma;
  font-size: 16px;
  font-weight: bold;
  padding: 13px 32px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #3d768a;
  margin: 5px;
}
.standard-button:hover {
  background: linear-gradient(to bottom, #2e5d80 5%, #2e5d80 100%);
  background-color: #2e5d80;
  text-decoration: none;
  color: #ffffff;
}
.standard-button:active {
  position: relative;
  top: 1px;
  text-decoration: none;
}

.standard-button:disabled {
  color: #d2d2d2;
}

.standard-button-small {
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, #93b2e0 5%, #93bfe0 100%);
  background-color: #599bb3;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Michroma;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 18px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #3d768a;
  margin: 5px;
}
.standard-button-small:hover {
  background: linear-gradient(to bottom, #2e5d80 5%, #2e5d80 100%);
  background-color: #2e5d80;
  text-decoration: none;
  color: #ffffff;
}
.standard-button-small:active {
  position: relative;
  top: 1px;
  text-decoration: none;
}

.standard-button-small:disabled {
  color: #d2d2d2;
}
</style>
