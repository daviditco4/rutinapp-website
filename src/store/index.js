import Vue from 'vue'
import Vuex from 'vuex'
import security from '@/store/module/security';
import sport from '@/store/module/sport';
import exerciseStore from '@/store/module/exerciseStore';

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
    sport,
    exerciseStore
  }
})
