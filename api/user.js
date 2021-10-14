import { Api } from './api.js'

export { UserApi, Credentials, User, EmailVerifier }

class UserApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/users${slug ? `/${slug}` : ''}`
  }

  static async add(user, controller) {
    user['username'] = user.credentials['username']
    user['password'] = user.credentials['password']
    user['credentials'] = null
    const response = await Api.post(UserApi.getUrl(), false, user, controller)
    await localStorage.setItem("security-token", response.token);
    Api.token = response.token;
  }

  static async login(credentials, controller) {
    return await Api.post(UserApi.getUrl('login'), false, credentials, controller)
  }

  static async logout(controller) {
    await Api.post(UserApi.getUrl('logout'), true, controller)
  }

  static async modify(userChanges, controller) {
    return await Api.put(UserApi.getUrl('current'), true, userChanges, controller)
  }

  static async get(controller) {
    return await Api.get(UserApi.getUrl('current'), true, controller)
  }

  static async getAllRoutinesCreatedByCurrentUser(page, size, controller) {
    return await Api.get(UserApi.getUrl("current/routines") + `?page=${page}&size=${size}`, true, controller)
  }
    static async verifyEmail(emailVerifier,controller) {
        await  Api.post(UserApi.getUrl('verify_email'),false, emailVerifier, controller)
    }

    static async resendEmail(email, controller) {
        await Api.post(UserApi.getUrl('resend_verification'), false, (JSON).parse(email), controller)
    }
}

class Credentials {
  constructor(username, password) {
    this.username = username
    this.password = password
  }
}

class User {
  constructor(credentials, id, email) {
    this.id = id
    this.credentials = credentials
    this.email = email
  }
}

class EmailVerifier {
    constructor(email, code) {
        this.email = email;
        this.code = code;
    }
}