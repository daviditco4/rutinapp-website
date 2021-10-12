import { Api } from './api.js'

export { UserApi, Credentials, User }

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/users${ slug ? `/${slug}` : ''}`
    }

    static async add(user, controller) {
        user['username'] = user.credentials['username']
        user['password'] = user.credentials['password']
        user['credentials'] = null
        return await Api.post(UserApi.getUrl(), false, user, controller)
    }

    static async login(credentials, controller) {
        return await Api.post(UserApi.getUrl('login'), false, credentials, controller)
    }

    static async logout(controller) {
        await Api.post(UserApi.getUrl('logout'), true, controller)
    }

    static async get(controller) {
        return Api.get(UserApi.getUrl('current'), true, controller)
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