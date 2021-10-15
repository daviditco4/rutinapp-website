import { Api } from "./api.js";

export { RoutineApi, Routine, Cycle }

class RoutineApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/routines${slug ? `/${slug}` : ''}`
  }

  static async get(id, controller) {
    return await Api.get(RoutineApi.getUrl(id), true, controller);
  }

  static async add(routine, controller) {
    return await Api.post(RoutineApi.getUrl(), true, routine, controller);
  }

  static async modify(id, routine, controller) {
    return await Api.put(RoutineApi.getUrl(id), true, routine, controller);
  }

  static async delete(id, controller) {
    return await Api.delete(RoutineApi.getUrl(id), true, controller);
  }

  static async getAll(page, size, controller) {
    return await Api.get(RoutineApi.getUrl() + `?page=${page}&size=${size}`, true, controller)
  }

  static async addCycle(routineId, cycle, controller) {
    return await Api.post(`${RoutineApi.getUrl(routineId)}/cycles`, true, cycle, controller);
  }

  static async getCycles(routineId, controller) {
    return await Api.get(`${RoutineApi.getUrl(routineId)}/cycles`, true, controller);
  }
}

class Routine {
  constructor(name, detail, isPublic, difficulty, metadata) {
    this.name = name;
    this.detail = detail;
    this.isPublic = isPublic;
    this.difficulty = difficulty;
    this.metadata = metadata;
  }
}

class Cycle {
  constructor(id, type, repetitions, metadata) {
    if (id) {
      this.id = id;
    }
    this.type = type;
    this.repetitions = repetitions;
    this.metadata = metadata;
  }
}
