import Vue from 'vue'
import Vuex from 'vuex'

import security from './modules/security'
import routines from './modules/routines'
import exercises from './modules/exercises'
// import { UserApi } from '../api/user'
// import { RoutineApi } from '../api/routine'
// import { ExerciseApi } from '../api/exercise'
// import { GET_USER, GET_ROUTINES, GET_EXERCISES } from './actions'
// import { SET_USER, SET_CURRENT_ROUTINES_OR_EXERCISES } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    // [SET_USER] (state, user) {
    //   state.user = user
    // },
    // [SET_CURRENT_ROUTINES_OR_EXERCISES] (state, routinesOrExercises) {
    //   state.routinesOrExercises = routinesOrExercises
    // },
  },
  actions: {
    // async [GET_USER] ({state, commit}) {
    //   if (state.user)
    //     return state.user
      
    //   const result = await UserApi.get()
    //   commit(SET_USER, result)
    // },
    // async [GET_ROUTINES] ({commit}, page, size) {
    //   size / 3
    //   const result = await RoutineApi.getAll(page - 1, 8)
    //   commit(SET_CURRENT_ROUTINES_OR_EXERCISES, result)
    // },
    // async [GET_EXERCISES] ({commit}, {page, size}) {
    //   const result = await ExerciseApi.getAll(page - 1, size)
    //   commit(SET_CURRENT_ROUTINES_OR_EXERCISES, result)
    // },
  },
  getters: {
  },
  modules: {
    security,
    routines,
    exercises
  }
})
