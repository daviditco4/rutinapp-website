import { Api } from "./api.js";

export { RoutineApi, Routine, Cycle }

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ''}`
    }

    static async get(id) {
        return await Api.get(RoutineApi.getUrl(id), true, null);
    }

    static async add(routine, controller) {
        return await Api.post(RoutineApi.getUrl(), false, routine, controller);
    }

    static async edit(id, routine, controller) {
        return await Api.put(RoutineApi.getUrl(id), true, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(RoutineApi.getUrl(id), true, controller);
    }

    static async getAll(controller) {
        return await Api.get(RoutineApi.getUrl(), true, controller).content;
    }

    static async addCycle(routineId, cycle, controller) {
        return await Api.post(`${RoutineApi.getUrl(routineId)}/cycles`, true, cycle, controller);
    }

    static async getCycles(routineId, controller) {
        return await Api.get(`${RoutineApi.getUrl(routineId)}/cycles`, true, controller);
    }
}

class Routine {
    constructor(id, name, detail, difficulty, isPublic, metadata) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
        this.difficulty = difficulty;
        this.isPublic = isPublic;
        this.metadata = metadata;
    }
}

class Cycle {
    constructor(id, name, detail, type, order, repetitions, metadata) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
        this.metadata = metadata;
    }
}