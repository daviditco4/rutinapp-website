import {ExerciseApi} from "../../../api/exercise";

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
        async create({commit}, exercise) {
            console.log(exercise)
            let response
            try {
                response = await ExerciseApi.add(exercise);
            } catch(err) {
                // Data constraint: name already exists
                if(err.code === 2) {
                    this.repeatedName = true;
                }
            }
            commit('addItem', response)
        },

        async edit({getters, commit}, id) {
            const response = await ExerciseApi.edit(id);
            const index = getters.findIndex(id);
            if(index>=0)
                commit('replace', index, response)
            return response
        },

        async get({state, getters, commit}, id) {
            const index = getters.findIndex(id)
            if (index >= 0)
                return state.items[index]
            const response = await ExerciseApi.get(id);
            commit('push', response)
            return response
        },

        async delete({getters, commit}, id) {
            await ExerciseApi.delete(id);
            const index = getters.findIndex(id);
            if(index>=0)
                commit('splice', index)
        },

        async getAll({commit}) {
            const response = await ExerciseApi.getAll(null);
            commit('replaceAll', response)
            return response
        }
    },
}