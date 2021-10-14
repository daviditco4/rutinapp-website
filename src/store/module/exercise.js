import {ExerciseApi} from "../../../api/exercise";
import {UserApi} from "../../../api/user";

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
            state.items.push(exercise)
        },
        replace(state, index, exercise) {
            state.items[index] = exercise
        },
        splice(state, index) {
            state.items.splice(index, 1)
        },
        replaceAll(state, exercises) {
            state.items = exercises
        }
    },
    actions: {
        async create({commit}, exercise) {
            let response
            try {
                response = await ExerciseApi.add(exercise);
                commit('addItem', response)
            } catch(err) {
                // Data constraint: name already exists
                if(err.code === 2) {
                    this.repeatedName = true;
                }
            }
            //get current user
            response = await UserApi.get();
            // save exercise id in creator's user metadata
            if(response.metadata['exercises'] == undefined){
                response.metadata['exercises'] = []
            }
            response.metadata['exercises'].push(exercise.id)
            await UserApi.modify(response)
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