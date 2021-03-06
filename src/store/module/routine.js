import {RoutineApi} from "../../../api/routine";
import {UserApi} from "../../../api/user";

export default {
    namespaced: true,
    state: {
        items: [],
        cycles: [],
        edit: false,
        routine: null,
        countRoutine: 0
    },
    getters: {
        findIndex(id) {
            return this.state.items.findIndex(item => item.id === id)
        },
    },
    mutations: {
        push(state, exercise) {
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
        },
        changeEdit(state, value) {
            state.edit = value
        },
        addRoutineToEdit(state, editRoutine) {
            state.routine = editRoutine
        },
        updateRoutineCount(state, count) {
            state.countRoutine = count
        }
    },
    actions: {
        async create({ commit }, routine) {
            let response
            try {
                response = await RoutineApi.add(routine);
                console.log(response);
            } catch (err) {
                // Data constraint: name already exists
                if (err.code === 2) {
                    this.repeatedName = true;
                }
            }
            commit('push', response)
        },

        async edit({ getters, commit },{id, routine}) {
            const response = await RoutineApi.modify(id, routine);
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
        },

        async getAll({commit}, {page, size}) {
            const response = await RoutineApi.getAll(page, size);
            commit('replaceAll', response)
            commit('updateRoutineCount', response.totalCount)
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
        changeEditValue( {commit}, value) {
            commit('changeEdit', value)
        },
        routineToEdit({commit}, editRoutine) {
            commit('addRoutineToEdit', editRoutine)
        }
    },
}