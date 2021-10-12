import Vue from 'vue'
import Vuex from 'vuex'

import { UserApi } from '../api/user'
import { RoutineApi } from '../api/routine'
import { ExerciseApi } from '../api/exercise'
import { GET_USER, UPDATE_USER, GET_ROUTINES, GET_EXERCISES } from './actions'
import { SET_USER, SET_CURRENT_ROUTINES_OR_EXERCISES } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    [SET_USER] (state, user) {
      state.user = user
    },
    [SET_CURRENT_ROUTINES_OR_EXERCISES] (state, routinesOrExercises) {
      state.routinesOrExercises = routinesOrExercises
    },
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
    },
    async [GET_ROUTINES] ({commit}, page, size) {
      const result = await RoutineApi.getAll(page, size)
      commit(SET_CURRENT_ROUTINES_OR_EXERCISES, result)
    },
    async [GET_EXERCISES] ({commit}, page, size) {
      const result = await ExerciseApi.getAll(page, size)
      commit(SET_CURRENT_ROUTINES_OR_EXERCISES, result)
    },
  },
  getters: {
  },
  modules: {
  }
})
