import { fetchItemListApi } from '@/modules/api/item.js'

// state
const state = {
  item: {},
  itemList: []
}

// getters
const getters = {
  item (state) {
    return state.item
  },
  itemList (state) {
    return state.itemList
  }
}

// actions
const actions = {
  async fetchItemListApi({ commit }) {
    try {
      const res = await fetchItemListApi()
      commit('itemList', res)
    } catch (err) {
      console.error(err)
    }
  }
}

// mutations
const mutations = {
  item(state, payload) {
    state.item = payload
  },
  itemList(state, payload) {
    state.itemList = payload
  }
}

const item = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default item
