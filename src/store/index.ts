import { createStore } from "vuex";

export default createStore({
  state: {
    gameRunning: false
  },
  mutations: {
    setGameRunningTrue(state) {
      state.gameRunning = true;
    },
    setGameRunningFalse(state) {
      state.gameRunning = false;
    },
  },
  getters: {
    getGameRunning: state => {
      return state.gameRunning;
    }
  }
});
