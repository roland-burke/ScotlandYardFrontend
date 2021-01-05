import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameRunning: false,
    currentTicketType: "t",
    websocket: Object,
    lobby: {
      maxPlayers: 7,
      registered: false,
      clientId: 0,
      player: []
    }
  },
  mutations: {
    SET_GAME_RUNNING(state, value) {
      state.gameRunning = value;
    },
    SET_PLAYER_READY(state, value) {
      if(Number(window.$cookies.get('id')) != -1) {
        state.lobby.player[Number(window.$cookies.get('id'))].ready = value;
      } else {
        console.warn('Player id = -1!')
      }
    },
    UPDATE_LOBBY(state, lobby) {
      state.lobby = lobby;
    },
    UPDATE_LOBBY_PLAYER(state, player) {
      state.lobby.player = player;
    },
    UPDATE_LOBBY_REGISTERED(state, value) {
      state.lobby.registered = value;
    },
    UPDATE_LOBBY_CLIENTID(state, value) {
      state.lobby.clientId = value;
    },
    SET_CURRENT_TICKET_TYPE(state, value) {
      state.currentTicketType = value;
    },
    SET_PLAYER_COLOR(state, color) {
      state.lobby.player[state.lobby.clientId].color = color;
    },
    UPDATE_CLIENT_PLAYER_NAME(state, newName) {
      if(Number(window.$cookies.get('id')) != -1) {
        state.lobby.player[Number(window.$cookies.get('id'))].name = newName;
      } else {
        console.warn('Player id = -1!')
      }
    },
    SET_WEBSOCKET(state, value) {
      state.websocket = value;
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
    lobbySetRegistered(context, value) {
      context.commit("UPDATE_LOBBY_REGISTERED", value);
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
      return state.lobby.player[state.lobby.clientId].ready;
    },
    getCurrentTicketType(state) {
      return state.currentTicketType;
    },
    getWebsocket: state => {
      return state.websocket;
    }
  }
});
