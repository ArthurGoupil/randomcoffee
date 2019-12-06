import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    memberList: [],
    datePicked: null,
    isReadyToDisplay: false
  },
  mutations: {
    setDate(state, payload) {
      state.datePicked = payload.datePicked;
      state.isReadyToDisplay = false;
    },
    addMember(state, payload) {
      state.memberList.push(payload.member);
      state.isReadyToDisplay = false;
    },
    deleteMember(state, payload) {
      state.memberList.splice(payload.index, 1);
      state.isReadyToDisplay = false;
    },
    setIsReadyToDisplay(state, isReadyToDisplay) {
      state.isReadyToDisplay = isReadyToDisplay;
    }
  }
});

export default store;