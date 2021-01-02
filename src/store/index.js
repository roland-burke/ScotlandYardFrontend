import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameRunning: false,
    currentTicketType: "t",
    lobby: {
      maxPlayers: 7,
      registered: false,
      clientId: 0,
      player: [
        {
          id: 0,
          name: "MrX",
          color: "#000000",
          ready: false
        }
      ]
    }
  },
  mutations: {
    SET_GAME_RUNNING(state, value) {
      state.gameRunning = value;
    },
    SET_PLAYER_READY(state, value) {
      state.lobby.player[state.lobby.clientId].ready = value;
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
    setGameRunningTrue(state) {
      state.gameRunning = true;
    },
    setGameRunningFalse(state) {
      state.gameRunning = false;
    },
    UPDATE_CLIENT_PLAYER_NAME(state, newName) {
      state.lobby.player[state.lobby.clientId].name = newName;
    }
  },
  actions: {
    setGameRunningTrue(context) {
      context.commit("SET_GAME_RUNNING", true);
    },
    setGameRunningFalse(context) {
      context.commit("SET_GAME_RUNNING", false);
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
    getGameRunning: state => {
      return state.gameRunning;
    }
  }
});
