import { ExerciseApi } from "../../api/exercise";
import { UserApi } from "../../api/user";

export default {
  namespaced: true,
  state: {
    repeatedName: false,
    items: []
  },
  getters: {
    findIndex(id) {
      return this.state.items.findIndex(item => item.id === id)
    },
  },
  mutations: {
    addItem(state, exercise) {
      console.log(state)
      console.log(exercise)
      state.items.push(exercise)
      console.log(state.items)
    },
    replace(state, index, exercise) {
      state.items[index] = exercise
    },
    splice(state, index) {
      state.items.splice(index, 1)
    },
    push(state, exercise) {
      state.items.push(exercise)
    },
    replaceAll(state, exercises) {
      state.items = exercises
    }
  },
  actions: {
    async create({ commit }, exercise) {
      console.log(exercise)
      let response
      try {
        response = await ExerciseApi.add(exercise);
      } catch (err) {
        // Data constraint: name already exists
        if (err.code === 2) {
          this.repeatedName = true;
        }
      }
      commit('addItem', response)
    },

    async edit({ getters, commit }, id) {
      const response = await ExerciseApi.edit(id);
      const index = getters.findIndex(id);
      if (index >= 0)
        commit('replace', index, response)
      return response
    },

    async get({ state, getters, commit }, id) {
      const index = getters.findIndex(id)
      if (index >= 0)
        return state.items[index]
      const response = await ExerciseApi.get(id);
      commit('push', response)
      return response
    },

    async delete({ actions, state }, id) {
      // Este codigo es solamente para evitar el error de compilacion por no usar las actions & state
      if (actions === state) {
        id * 4
      }

      const userMetadata = (await UserApi.get()).metadata
      const exerciseUserIndex = userMetadata.exercises_ids.indexOf(id)
      console.log(exerciseUserIndex)

      if (exerciseUserIndex !== -1) {
        userMetadata.exercises_ids.splice(exerciseUserIndex, 1)
      } else {
        return
      }

      await UserApi.modify({metadata: userMetadata})

      return await ExerciseApi.delete(id);
      // actions.getAllCreatedByCurrentUser({page: state.items.page, size: state.items.size})
      // const index = getters.findIndex(id);
      // if (index >= 0)
      //   commit('splice', index)
    },

    async getAll({commit}, {page, size}) {
      const response = await ExerciseApi.getAll(page, size);
      commit('replaceAll', response)
      console.log(response)
      return response
    },

    async getAllCreatedByCurrentUser({commit}, {page, size}) {
      const userExercisesIds = (await UserApi.get()).metadata.exercises_ids
      const res = {content: [], page: page, size: size, isLastPage: ((page + 1) * size) >= userExercisesIds.length}
      
      for (var i = page * size; i < (page + 1) * size; i++) {
        if (i === userExercisesIds.length)
          break
        
        res.content.push(await ExerciseApi.get(userExercisesIds[i]))
      }

      commit('replaceAll', res)
      return res
    },
  },
}