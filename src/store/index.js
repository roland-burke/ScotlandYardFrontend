import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameRunning: false,
    currentTicketType: "t",
    websocket: Object,
    showUi: true,
    showWinningDialog: false,
    lobby: {
      maxPlayers: 7,
      clientId: 0,
      player: []
    }
  },
  mutations: {
    SET_GAME_RUNNING(state, value) {
      state.gameRunning = value;
    },
    SET_PLAYER_READY(state, value) {
      let id = Number(window.$cookies.get("id"));
      if (id != -1) {
        let player = state.lobby.player.find(p => p.id === id);
        player.ready = value;
      } else {
        console.warn("Player id = -1! in setReady");
      }
    },
    UPDATE_LOBBY(state, lobby) {
      state.lobby = lobby;
    },
    UPDATE_LOBBY_PLAYER(state, player) {
      state.lobby.player = player;
    },
    UPDATE_LOBBY_CLIENTID(state, value) {
      state.lobby.clientId = value;
    },
    SET_CURRENT_TICKET_TYPE(state, value) {
      state.currentTicketType = value;
    },
    SET_PLAYER_COLOR(state, color) {
      let id = Number(window.$cookies.get("id"));
      if (id != -1) {
        let player = state.lobby.player.find(p => p.id === id);
        player.color = color;
      } else {
        console.warn("Player id = -1! in setColor");
      }
    },
    UPDATE_CLIENT_PLAYER_NAME(state, newName) {
      let id = Number(window.$cookies.get("id"));
      if (id != -1) {
        let player = state.lobby.player.find(p => p.id === id);
        player.name = newName;
      } else {
        console.warn("Player id = -1! in updateName");
      }
    },
    SET_WEBSOCKET(state, value) {
      state.websocket = value;
    },
    SET_SHOW_UI(state, value) {
      state.showUi = value;
    },
    SET_SHOW_WINNING_DIALOG(state, value) {
      state.showWinningDialog = value;
    }
  },
  actions: {
    setGameRunning(context, value) {
      context.commit("SET_GAME_RUNNING", value);
    },
    setClientPlayerReady(context) {
      context.commit("SET_PLAYER_READY", true);
    },
    setClientPlayerUnReady(context) {
      context.commit("SET_PLAYER_READY", false);
    },
    updateLobby(context, lobby) {
      context.commit("UPDATE_LOBBY", lobby);
    },
    updateLobbyPlayer(context, player) {
      context.commit("UPDATE_LOBBY_PLAYER", player);
    },
    updateClientPlayerName(context, newName) {
      context.commit("UPDATE_CLIENT_PLAYER_NAME", newName);
    },
    lobbySetClientId(context, value) {
      context.commit("UPDATE_LOBBY_CLIENTID", value);
    },
    setPlayerColor(context, color) {
      context.commit("SET_PLAYER_COLOR", color);
    },
    setCurrentTicketType(context, value) {
      context.commit("SET_CURRENT_TICKET_TYPE", value);
    },
    setWebsocket(context, value) {
      context.commit("SET_WEBSOCKET", value);
    },
    setShowUi(context, value) {
      context.commit("SET_SHOW_UI", value);
    },
    setWinningDialog(context, value) {
      context.commit("SET_SHOW_WINNING_DIALOG", value);
    }
  },
  getters: {
    gameRunning(state) {
      return state.gameRunning;
    },
    lobby(state) {
      return state.lobby;
    },
    clientPlayer(state) {
      let id = Number(window.$cookies.get("id"));
      if (id != -1) {
        let player = state.lobby.player.find(p => p.id === id);
        return player;
      } else {
        console.warn("Player id = -1! in clientPlayer");
        return null;
      }
    },
    clientReady(state) {
      let id = Number(window.$cookies.get("id"));
      if (id != -1) {
        let player = state.lobby.player.find(p => p.id === id);
        return player.ready;
      } else {
        console.warn("Player id = -1! in setReady");
        return -1;
      }
    },
    getCurrentTicketType(state) {
      return state.currentTicketType;
    },
    getWebsocket: state => {
      return state.websocket;
    },
    getShowUi: state => {
      return state.showUi;
    },
    getWinningDialog: state => {
      return state.showWinningDialog;
    }
  }
});
