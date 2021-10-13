import Vue from 'vue'
import Vuex from 'vuex'
import security from '@/store/module/security';
import exercise from '@/store/module/exercise';

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
    exercise
  }
})
