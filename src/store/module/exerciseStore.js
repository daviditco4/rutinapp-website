import {ExerciseApi} from "../../../api/exercise";

const ExerciseStore = {
    repeatedName: false,

    async addExercise(name, detail, type, difficulty, series, duration, id) {
        this.repeatedName = false;
        let exer = {
            name: name,
            detail: detail,
            type: type, //Esto es la categoria
            metadata: {
                difficulty: difficulty,
                series: series,
                duration: duration,
            }
        }
        try {
            await ExerciseApi.createExercise(exer, id);
        } catch(err) {
            //Data constrain: name already exists
            if(err.code === 2) {
                this.repeatedName = true;
            }
        }
    },

    async getExercise(id) {
        return await ExerciseApi.getExercise(id);
    },

    async deleteExercise(id) {
        await ExerciseApi.deleteExercise(id);
    },

    async getAllExercises() {
        return await ExerciseApi.getExercises(null);
    }
}