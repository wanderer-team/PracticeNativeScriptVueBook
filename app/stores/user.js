import { fetchUserApi, createUserApi, updateUserApi } from '@/modules/api/user'

// state
const state = {
  user: {
    id: ''
  },
  auth: {
    email: '',
    password: ''
  }
}

// getters
const getters = {
  user(state) {
    return state.user
  },
  auth(state) {
    return state.auth
  }
}

// actions
const actions = {
  async createUser({ commit, state }, { name, birthday }) {
    const payload = {
      input: {
        // 本来はidは、自動で設定する
        id: state.user.id,
        name,
        birthday,
      },
    }
    await createUserApi(payload)
    commit('user', { id: state.user.id, name, birthday })
  },
  async fetchUser({ commit }) {
    try {
      const res = await fetchUserApi(state.user.id)
      const payload = await { ...res, userId: state.user.id }
      commit('user', payload)
    } catch (error) {
      console.error('error', error)
    }
  },
  async updateUser({ commit }) {
    try {
      const res = await updateUserApi(state.user)
      const payload = await { ...res, userId: state.user.id }
      commit('user', payload)
    } catch (error) {
      console.error('error', error)
    }
  },
  setUserId({ commit }, payload) {
    commit('userId', payload)
  },
  setUserAuth({ commit }, payload) {
    commit('auth', payload)
  },
  setUserInfo({ commit }, payload) {
    // payloadは{ key: 'value' }
    commit('userInfo', payload)
  }
}

// mutations
const mutations = {
  user(state, payload) {
    state.user = payload
  },
  userId(state, payload) {
    state.user.id = payload
  },
  auth(state, payload) {
    state.auth = payload
  },
  userInfo(state, payload) {
    // 名前や誕生日の更新
    state.user = { ...state.user, ...payload }
  }
}

const user = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default user
