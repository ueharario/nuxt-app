import IssueId from '@/utils/IssueId.js'

export const UserApi = {
    namespaced: true,
    state: {
        users: []
    },
    mutations: {
        SET_USER: (state, users) => {
            state.users = users
        },
        CREATE_USER: (state, user) => {
            user.id = IssueId(state.users, user)
            state.users.push(user)
        },
        UPDATE_USER: (state, user) => {
            state.users = state.users.filter((v) => v.id !== user.id)
            state.users.push(user)
        },
        DELETE_USER: (state, id) => {
            state.users = state.users.filter((v) => v.id !== id)
        }
    },
    actions: {
        async fetchUser({ commit }) {
            const response = await new Promise((resolve) => {
                fetch('/data/user.json')
                .then(_response => resolve(_response.json()))
            })
            commit('SET_USER', response)
        },
        async createUser({ commit }, user) {
            commit('CREATE_USER', user)
        },
        async updateUser({ commit }, user) {
            commit('UPDATE_USER', user)
        },
        async deleteUser({ commit }, id) {
            commit('DELETE_USER', id)
        }
    },
    getters: {
        _users: (state) => {
            return state.users
        }
    }
}