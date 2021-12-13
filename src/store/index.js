import Vue from 'vue'
import Vuex from 'vuex'
import security from './module/security';
import exercise from './module/exercise';
import routine from "./module/routine";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    security,
    exercise,
    routine
  }
})
