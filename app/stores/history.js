import { addHistoryApi, fetchHisotryListApi } from '@/modules/api/history.js'
import { fetchItemApi } from '@/modules/api/item'

// state
export const state = {
  histories: [],
}

// getters
export const getters = {
  histories(state) {
    return state.histories
  },
}

// actions
export const actions = {
  async fetchItemList({ commit, rootState }) {
    try {
      const ids = await fetchHisotryListApi(rootState.user.user.id)
      const items = []
      for(const i in ids.items) {
        const res = await fetchItemApi(ids.items[i].itemId)
        const payload = {...ids.items[i], ...res, id: ids.items[i].id}
        items.push(payload)
      }
      commit('histories', items)
    } catch (err) {
      console.error(err)
    }
  },
  async addHistoryItem({ rootState, dispatch }, { item }) {
    const payload = {
      input: {
        userId: rootState.user.user.id,
        itemId: item.itemId,
        itemTitle: item.title,
        itemPrice: item.price,
        itemCount: item.count,
      },
    }
    try {
      await addHistoryApi(payload)
      await dispatch('fetchItemList')
    } catch (err) {
      console.error(err)
    }
  }
}

// mutations
export const mutations = {
  histories(state, payload) {
    state.histories = payload
  },
}

const history = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default history
