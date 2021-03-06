import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    automatedPIN: false,
    savedPIN: '',
    counter: 0,
    timeToRemember: 600000,
  },
  getters: {
    returnPINState: (state) => state.automatedPIN,
    returnSavedPIN: (state) => state.savedPIN,
    returnTimeToRemember: (state) => state.timeToRemember,
  },
  mutations: {
    deadline: (state) => {
      state.automatedPIN = false;
      state.savedPIN = '';
      alert('Your automated Passcode entry service has ended.');
    },
    startTiming: (state, payload) => {
      state.automatedPIN = true;
      state.savedPIN = payload;
      alert(
        `Your Passcode is has been saved for the next ${state.timeToRemember / 60000} minutes`,
      );
    },
    rememberTime: (state, payload) => {
      state.timeToRemember = payload;
    },
  },
  actions: {
    // the payload is passed to the mutation
    startTiming: ({ commit }, payload) => {
      commit('startTiming', payload);
    },
    deadline: ({ commit, state }) => {
      setTimeout(() => {
        commit('deadline');
      }, state.timeToRemember);
    },
  },
});

export default store;
