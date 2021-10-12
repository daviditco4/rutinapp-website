import Vue from 'vue'
import Vuex from 'vuex'

import { UserApi } from '../api/user'
import { GET_USER, UPDATE_USER } from './actions'
import { SET_USER } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    [SET_USER] (state, user) {
      state.user = user
    }
  },
  actions: {
    async [GET_USER] ({state, commit}) {
      if (state.user)
        return state.user
      
      const result = await UserApi.get()
      commit(SET_USER, result)
    },
    async [UPDATE_USER] ({commit}) {
      const result = await UserApi.get()
      commit(SET_USER, result)
    }
  },
  getters: {
  },
  modules: {
  }
})
