import { RoutineApi } from "../../api/routine";
import { UserApi } from "../../api/user";

export default {
    namespaced: true,
    state: {
        items: [],
        cycles: []
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
        async create({ commit }, routine) {
            console.log(routine)
            let response
            try {
                response = await RoutineApi.add(routine);
            } catch (err) {
                // Data constraint: name already exists
                if (err.code === 2) {
                    this.repeatedName = true;
                }
            }
            commit('addItem', response)
        },

        async edit({ getters, commit }, id) {
            const response = await RoutineApi.edit(id);
            const index = getters.findIndex(id);
            if (index >= 0)
                commit('replace', index, response)
            return response
        },

        async get({ state, getters, commit }, id) {
            const index = getters.findIndex(id)
            if (index >= 0)
                return state.items[index]
            const response = await RoutineApi.get(id);
            commit('push', response)
            return response
        },

        async delete({ actions, state }, id) {
            // Este codigo es solamente para evitar el error de compilacion por no usar las actions & state
            if (actions === state) {
                id * 4
            }

            return await RoutineApi.delete(id)
            // actions.getAllCreatedByCurrentUser({page: state.items.page, size: state.items.size})
            // const index = getters.findIndex(id);
            // if (index >= 0)
            //   commit('splice', index)
        },

        async getAll({commit}, {page, size}) {
            const response = await RoutineApi.getAll(page, size);
            commit('replaceAll', response)
            return response
        },

        async addCycle(routineId, cycle, controller) {
            return await RoutineApi.addCycle(`${RoutineApi.getUrl(routineId)}/cycles`, true, cycle, controller);
        },

        async getCycles(routineId, controller) {
            return await RoutineApi.getCycles(`${RoutineApi.getUrl(routineId)}/cycles`, true, controller);
        },

        async getAllCreatedByCurrentUser({commit}, {page, size}) {
            const response = await UserApi.getAllRoutinesCreatedByCurrentUser(page, size)
            commit('replaceAll', response)
            return response
        },
    },
}