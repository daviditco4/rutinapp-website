import {ExerciseApi} from "../../../api/exercise";
import {UserApi} from "../../../api/user";

export default {
    namespaced: true,
    state: {
        repeatedName: false,
        items: [],
        edit: false,
        exercise: null,
        exerciseCount: 0
    },
    getters: {
        findIndex(id) {
            return this.state.items.findIndex(item => item.id === id)
        },
        getExerciseId() {
            return this.state.exerciseIdToEdit
        }
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
        addExerciseToEdit(state, editExercise) {
            state.exercise = editExercise
        },
        updateExerciseCount(state, count) {
            state.exerciseCount = count
        }
    },
    actions: {
        async create({commit}, exercise) {
            let response
            try {
                response = await ExerciseApi.add(exercise);
                commit('push', response)
            } catch(err) {
                // Data constraint: name already exists
                if(err.code === 2) {
                    this.repeatedName = true;
                }
            }
            const exerciseId = response.id
            //get current user
            response = await UserApi.get();
            // save exercise id in creator's user metadata
            if(response.metadata == null){
                response.metadata = {};
                response.metadata['exercises'] = []
            }
            response.metadata['exercises'].push(exerciseId)
            const data = {
                metadata: response.metadata
            }
            await UserApi.modify(data)
        },

        async edit({getters, commit}, {id, exercise}) {
            const response = await ExerciseApi.modify(id, exercise);
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

        async delete({ actions, state }, id) {
          // Este codigo es solamente para evitar el error de compilacion por no usar las actions & state
          if (actions === state) {
            id * 4
          }
          const userMetadata = (await UserApi.get()).metadata
          const exerciseUserIndex = userMetadata.exercises.indexOf(id)

          if (exerciseUserIndex !== -1) {
            userMetadata.exercises.splice(exerciseUserIndex, 1)
            await UserApi.modify({metadata: userMetadata})
            await ExerciseApi.delete(id);
          }
        },
    
        async getAll({commit}, {page, size}) {
          const response = await ExerciseApi.getAll(page, size);
          commit('replaceAll', response)
          return response
        },
    
        async getAllCreatedByCurrentUser({commit}, {page, size}) {
          const metadata = (await UserApi.get()).metadata
          const res = {content: [], page: page, size: size, isLastPage: true}

          if (metadata) {
            const userExercisesIds = metadata.exercises
            res.isLastPage = ((page + 1) * size) >= userExercisesIds.length
            
            for (var i = page * size; i < (page + 1) * size; i++) {
              if (i === userExercisesIds.length)
                break
              
              res.content.push(await ExerciseApi.get(userExercisesIds[i]))
            }
          }

          commit('replaceAll', res)
          return res
        },

        changeEditValue( {commit}, value) {
            commit('changeEdit', value)
        },

        exerciseToEdit({commit}, editExercise) {
            commit('addExerciseToEdit', editExercise)
        }
      },
}