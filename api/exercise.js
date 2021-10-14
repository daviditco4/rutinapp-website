import { Api } from "./api.js";

export { ExerciseApi, Exercise }

class ExerciseApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/exercises${slug ? `/${slug}` : ''}`
  }

  static async get(id) {
    return await Api.get(ExerciseApi.getUrl(id), true, null);
  }

  static async add(exercise, controller) {
    return await Api.post(ExerciseApi.getUrl(), true, exercise, controller);
  }

  static async modify(id, exercise, controller) {
    return await Api.put(ExerciseApi.getUrl(id), true, exercise, controller);
  }

  static async delete(id, controller) {
    return await Api.delete(ExerciseApi.getUrl(id), true, controller);
  }

  static async getAll(page, size, controller) {
    return await Api.get(ExerciseApi.getUrl() + `?page=${page}&size=${size}`, true, controller)
  }
}

class Exercise {
  constructor(id, name, detail, type, metadata) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.detail = detail;
    this.type = type;
    this.metadata = metadata;
  }
}