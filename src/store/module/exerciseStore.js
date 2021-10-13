import {ExerciseApi} from "../../../api/exercise";

export default {
    namespaced: true,
    state: {
        repeatedName: false,
        items: []
    },
    getters: {
        findIndex(state) {
            return (sport) => {
                return state.items.findIndex(item => item.id === sport.id)
            }
        },
    },
    mutations: {
        addItem(state, exercise) {
            state.items.push(exercise)
        },
/*        replace(state, index, sport) {
            state.items[index] = sport
        },
        splice(state, index) {
            state.items.splice(index, 1)
        },
        replaceAll(state, sports) {
            state.items = sports
        }*/
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

        async get(id) {
            return await ExerciseApi.getExercise(id);
        },

        async delete(id) {
            await ExerciseApi.deleteExercise(id);
        },

        async getAll() {
            return await ExerciseApi.getExercises(null);
        }
    },
}