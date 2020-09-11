import { fetchFavoriteItemListApi, addFavoriteApi, deleteFavoriteItemApi } from '@/modules/api/favorite'
import { fetchItemApi } from '@/modules/api/item'

// state
export const state = {
  items: [],
  ids: []
}

// getters
export const getters = {
  items(state) {
    return state.items
  },
}

// actions
export const actions = {
  async fetchItems({ commit, rootState }) {
    try {
      const ids = await fetchFavoriteItemListApi(rootState.user.user.id)
      const items = []
      for(const i in ids) {
        const res = await fetchItemApi(ids[i].itemId)
        items.push(res)
      }
      commit('newItems', items)
    } catch (err) {
      console.error(err)
    }
  },
  async addItemToFavorite({ commit, rootState }, { id }) {
    const payload = {
      input: {
        userId: rootState.user.user.id,
        itemId: id,
      },
    }
    try {
      await addFavoriteApi(payload)
      const res = await fetchItemApi(id)
      commit('items', res)
    } catch (err) {
      console.error(err)
    }
  },
  async deleteItem({ commit }, { favoriteId }) {
    const payload = {
      input: {
        id: favoriteId,
      },
    }
    try {
      await deleteFavoriteItemApi(payload)
      commit('delItem', favoriteId)
    } catch (err) {
      console.error(err)
    }
  }
}

// mutations
export const mutations = {
  items(state, payload) {
    state.items.push(payload)
  },
  ids(state, payload) {
    state.ids.push(payload)
  },
  newItems(state, payload) {
    state.items = payload
  },
  delItem(state, payload) {
    state.items = state.items.filter(item => item.id !== payload)
  }
}

const favorite = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default favorite
