<template>
  <div id="app">
    <Header></Header>
    <router-view :model="model"></router-view>
    <Footer></Footer>
  </div>
</template>

<script lang="js">
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
    this.websocket.onmessage = (rawMessage) => {
      const message = $.parseJSON(rawMessage.data);
      console.log(message);
      if (message.event === "ModelChanged") {
        this.model = message;
      } else if (message.event === "register") {
        this.handleRegister(message.id);
      } else if (message.event === "lobby-change") {
        console.log(
          "player: " + JSON.stringify(this.$store.getters.lobby.player)
        );
        this.$store.dispatch("updateLobbyPlayer", message.player);
        console.log(
          "player_after_update: " +
            JSON.stringify(this.$store.getters.lobby.player)
        );
      } else if (message.event === "StartGame") {
        console.log(this.$store.getters.getGameRunning);
        this.$store.commit("setGameRunningTrue");
        console.log(this.$store.getters.getGameRunning);
        this.$router.push("/game");
      } else if (message.event === "GameFinished") {
        this.$store.commit("setGameRunningFalse");
      }
    };

    this.websocket.onopen = () => {
      setInterval(() => {
        this.sendMessageOverWebsocket("ping");
      }, 10000);
    };
    this.websocket.onclose = () => {
      clearInterval(this.interval);
      this.sendMessageOverWebsocket("deregister");
    };
  },
  methods: {
    handleRegister: function (messageId) {
      this.$store.getters.lobby.registered;
      if (!this.$store.getters.lobby.registered) {
        if (this.$store.getters.lobby.clientId !== -1) {
          // Lobby not full
          this.$store.dispatch("lobbySetRegistered", true);
          this.$store.dispatch("lobbySetClientId", messageId);
        } else {
          // Already 7 Player
          // TODO
        }
      }
    },
    sendObjectOverWebsocket: function(json, msg) {
      const obj = {
        event: msg,
        data: json
      };
      if (this.websocket.readyState === WebSocket.OPEN) {
        console.log("send: " + JSON.stringify(obj));
        this.websocket.send(JSON.stringify(obj));
      } else {
        console.log("Could not send data. Websocket is not open.");
      }
    },
    sendPlayerOverWebsocket: function(msg) {
      const obj = {
        event: msg,
        data: {player: this.$store.getters.lobby.player}
      };
      if (this.websocket.readyState === WebSocket.OPEN) {
        console.log("send: " + JSON.stringify(obj));
        this.websocket.send(JSON.stringify(obj));
      } else {
        console.log("Could not send data. Websocket is not open.");
      }
    },
    sendMessageOverWebsocket: function(msg) {
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
    extractCurrentPlayer: function() {
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

#app {
  font-family: Michroma;
}

.main {
  display: flex;
  margin: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

body {
  margin: 0px 0px 0px 0px !important;
  height: 100%;
  font-family: Michroma;
  background-image: url("~@/assets/map_large_small_opacity.png");
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

/* The container */
.radio-button-label {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.radio-button-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.radio-button {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.radio-button-label:hover input ~ .radio-button {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.radio-button-label input:checked ~ .radio-button {
  background-color: #2196f3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.radio-button:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.radio-button-label input:checked ~ .radio-button:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.radio-button-label .radio-button:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
