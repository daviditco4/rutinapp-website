import {UserApi} from "../../../api/user";
import {Api} from "../../../api/api";

const SECURITY_TOKEN_KEY = 'security-token'

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        tempUser: null,
        emailVerified: false,
    },
    getters: {
        isLoggedIn(state) {
            return state.token != null
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        },
        setTempUser(state, user){
            state.tempUser = user
        },
        changeEmailStatus(state, value) {
            state.emailVerified = value
        }
    },
    actions: {
        initialize({commit}) {
            const token = localStorage.getItem(SECURITY_TOKEN_KEY)
            if (token) {
                commit('setToken', token)
                Api.token = token
            }
        },
        updateToken({commit}, {token, rememberMe}) {
            if (rememberMe)
                localStorage.setItem(SECURITY_TOKEN_KEY, token)
            commit('setToken', token)
            Api.token = token
        },
        removeToken({commit}) {
            localStorage.removeItem(SECURITY_TOKEN_KEY)
            commit('setToken', null)
            Api.token = null
        },
        async create({commit}, user) {
            commit('changeEmailStatus', false)
            const result = await UserApi.add(user)
            commit('setUser', result)
            commit('setTempUser', user)
        },
        async login({commit, dispatch}, {credentials, rememberMe}) {
            commit('changeEmailStatus', false)
            const result1 = await UserApi.login(credentials)
            await dispatch('updateToken', { token: result1.token, rememberMe })
            const result2 = await UserApi.get()
            commit('setUser', result2)
        },
        async logout({commit, dispatch}) {
            commit('changeEmailStatus', false)
            await UserApi.logout()
            dispatch('removeToken')
            commit('setUser', null)
        },
        async getCurrentUser({state, commit}) {
            // Si ya está cacheado, no lo busca en la base
            if (state.user)
                return state.user
            const result = await UserApi.get()
            commit('setUser', result)
        },
        async modifyCurrentUser({commit}, userChanges) {
            const userMetadata = (await UserApi.get()).metadata
            const result = await UserApi.modify({...userChanges, metadata: userMetadata})
            commit('setUser', result)
        },
        async emailVerified({commit}, value) {
            commit('changeEmailStatus', value)
        }
    },
}