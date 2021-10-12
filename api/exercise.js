import {Api} from "./api";

export {ExerciseApi}

class ExerciseApi {
    static url() {
        return `${Api.baseUrl}/exercises`;
    }

    static async getExercise(id) {
        return await Api.get(`${ExerciseApi.url}/${id}`, true, null);
    }

    static async createExercise(exercise, controller) {
        return await Api.post(`${ExerciseApi.url}`, true, exercise, controller);
    }

    static async editExercise(id, exercise, controller) {
        return await Api.put(`${ExerciseApi.url}/${id}`, true, controller);
    }

    static async deleteExercise(id, controller) {
        return await Api.delete(`${ExerciseApi.url}/${id}`, true, controller);
    }
}