<template>
  <v-app class="main">
    <v-alert
      class="alert"
      v-if="websocketError"
      border="bottom"
      dense
      elevation="16"
      outlined
      prominent
      text
      type="error"
      >Connecting to Websocket failed</v-alert
    >
    <Header></Header>
    <router-view :model="model"></router-view>
    <Footer></Footer>
  </v-app>
</template>

<script lang="js">
import Header from "@/components/Header.vue"; // @ is an alias to /src
import Footer from "@/components/Footer.vue";
import { WebsocketMixin } from "@/mixins/websocketMixin.js"
import $ from "jquery";

export default {
  name: "App",
  data: function () {
    return {
      interval: null,
      model: null,
      websocketError: false
    };
  },
  beforeDestroyed: function () {
    this.sendObjectOverWebsocket({id: Number(window.$cookies.get('id'))}, "deregister");
  },
  mounted: function () {
    console.log("MOUNTED")
      const websocket = new WebSocket("ws://localhost:9000/ws")
      this.$store.dispatch("setWebsocket", websocket)

      websocket.onerror = () => {
        this.websocketError = true
      };
      websocket.onmessage = (rawMessage) => {
          this.websocketError = false
          const message = $.parseJSON(rawMessage.data);
          console.log(message);
          if (message.event === "ModelChanged") {
              this.model = message;
              this.$store.dispatch("setGameRunning", this.model.gameRunning);
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
              this.$store.dispatch("setGameRunning", true);
              this.$router.push("/game");
          } else if (message.event === "GameFinished") {
              window.$cookies.set('id', -1, '3h');
              window.$cookies.set('registered', false, '3h');
              this.$store.dispatch("setGameRunning", false);
          }
      };
      websocket.onopen = () => {
          this.websocketError = false
          setInterval(() => {
              this.sendMessageOverWebsocket("ping");
          }, 10000);
      };
      websocket.onclose = () => {
          clearInterval(this.interval);
          this.websocketError = true
          this.sendObjectOverWebsocket({id: Number(window.$cookies.get('id'))}, "deregister");
      };
  },
  methods: {
    handleRegister: function (messageId) {
      if(window.$cookies.isKey('id')) {
        return; // do not register again
      }

      window.$cookies.set('id', messageId, '3h');

      /*
      if(window.$cookies.isKey('id') && window.$cookies.isKey('registered')) { // if the cookies exist...
        if(Number(window.$cookies.get('id')) != -1 || window.$cookies.get('registered') === 'true') { // ...and indicate that the client is already registered
          return; // do not register again
        }
      }
      if (!this.$store.getters.lobby.registered) {
        if (this.$store.getters.lobby.clientId !== -1) {
          // Lobby not full
          window.$cookies.set('id', messageId, '3h');
          window.$cookies.set('registered', true, '3h');
          this.$store.dispatch("lobbySetRegistered", true);
          this.$store.dispatch("lobbySetClientId", messageId);
        } else {
          // Already 7 Player
          // TODO
        }
      }
      */
    },
    removeCookies: function () {
      window.$cookies.remove('id')
    }
  },
  mixins: [WebsocketMixin],
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Michroma");
/* === General === */

.v-select__selections input { display: none}

#app {
  font-family: Michroma;
  background: url("~@/assets/map_large_small_opacity.png") no-repeat center
    center;
  background-size: cover;
}

.alert {
  margin-top: 60px;
  position: relative;
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
  border: solid 2px black;
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
  border: solid 2px black;
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
