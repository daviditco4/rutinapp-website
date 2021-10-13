import { Api } from './api.js'

export { UserApi, Credentials }

class UserApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/users${slug ? `/${slug}` : ''}`
  }

  static async login(credentials, controller) {
    return await Api.post(UserApi.getUrl('login'), false, credentials, controller)
  }

  static async modify(userChanges, controller) {
    return await Api.put(UserApi.getUrl('current'), true, userChanges, controller)
  }

  static async logout(controller) {
    await Api.post(UserApi.getUrl('logout'), true, controller)
  }

  static async get(controller) {
    return await Api.get(UserApi.getUrl('current'), true, controller)
  }

  static async getAllRoutinesCreatedByCurrentUser(page, size, controller) {
    return await Api.get(UserApi.getUrl("current/routines") + `?page=${page}&size=${size}`, true, controller)
  }
}

class Credentials {
  constructor(username, password) {
    this.username = username
    this.password = password
  }
}