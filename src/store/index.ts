import { createStore } from "vuex";


/*

player {
  id: 0,
  name: 'MrX',
  color: '#0000ff',
  ready: false
}

*/

export type State = {
  gameRunning: false,
  lobby: {
    maxPlayers: 7,
    registered: false,
    clientId: 0,
    player: [
      {
        id: 0,
        name: 'MrX',
        color: '#000000',
        ready: false
      }
    ]
  }
}

export const store = createStore({
  state: {
    gameRunning: false,
    currentTicketType: 0,
    lobby: {
      maxPlayers: 7,
      registered: false,
      clientId: 0,
      player: [
        {
          id: 0,
          name: 'MrX',
          color: '#000000',
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
    UPDATE_LOBBY_REGISTERED(state, value) {
      state.lobby.registered = value;
    },
    UPDATE_LOBBY_CLIENTID(state, value) {
      state.lobby.clientId = value;
    },
    ŜET_CURRENT_TICKET_TYPE(state, value) {
      state.currentTicketType = value;
    },
    setGameRunningTrue(state) {
      state.gameRunning = true;
    },
    setGameRunningFalse(state) {
      state.gameRunning = false;
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
    lobbySetRegistered(context, value) {
      context.commit("UPDATE_LOBBY_REGISTERED", value);
    },
    lobbySetClientId(context, value) {
      context.commit("UPDATE_LOBBY_CLIENTID", value);
    },
    setCurrentTicketType(context, value) {
      context.commit("ŜET_CURRENT_TICKET_TYPE", value);
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
      return state.lobby.player[state.lobby.clientId];
    },
    getCurrentTicketType(state) {
      return state.currentTicketType;
    },
    getGameRunning: state => {
      return state.gameRunning;
    }
  }
});
