import { Api } from "./api.js";

export { RoutineApi }

class RoutineApi {
    static url() {
        return `${Api.baseUrl}/routines`;
    }

    static async getRoutine(id, controller) {
        return (await  Api.get(`${RoutineApi.url}/${id}`,true, controller));
    }

    static async createRoutine(routine, controller) {
        return await Api.post(`${RoutineApi.url}/${id}`, true, routine, controller);
    }

    static async deleteRoutine(id, controller) {
        return await Api.delete(`${RoutineApi.url}`, true, controller);
    }

    static async editRoutine(id, routine, controller) {
        return await Api.put(`${RoutineApi.url}`, true, routine, controller);
    }

    static async createCycle(id, controller) {
        return await Api.post(`${RoutineApi.url}/${id}/cycles`, true, cycle, controller);
    }

    static async getCycles(id, controller) {
        return await Api.get(`${RoutineApi.url}/{${id}/cycles`, true, controller);
    }
}