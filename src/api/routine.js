import { Api } from './api.js'

export { RoutineApi }

class RoutineApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ''}`
  }

  static async add(routine, controller) {
   return await Api.post(RoutineApi.getUrl(), true, routine, controller)
  }

  static async modify(routine, controller) {
    return await Api.put(RoutineApi.getUrl(routine.id), true, routine, controller)
  }

  static async delete(id, controller) {
    return await Api.delete(RoutineApi.getUrl(id), true, controller)
  }

  static async get(id, controller) {
    return await Api.get(RoutineApi.getUrl(id), true, controller)
  }

  static async getAll(page, size, controller) {
    return await Api.get(RoutineApi.getUrl() + `?page=${page}&size=${size}`, true, controller)
  }
}
