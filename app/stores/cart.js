import { fetchCartApi, addCartApi, deleteCartItemApi } from '@/modules/api/cart.js'
import { fetchItemApi } from '@/modules/api/item'

// state
const state = {
  items: [],
}

// getters
const getters = {
  items(state) {
    return state.items
  },
}

// actions
const actions = {
  async fetchCartItem({ commit, rootState }) {
    try {
      const ids = await fetchCartApi(rootState.user.user.id)
      const items = []
      for(const i in ids.items) {
        const res = await fetchItemApi(ids.items[i].itemId)
        items.push({...ids.items[i], ...res, id: ids.items[i].id})
      }
      console.log('fetchCartItem', items)
      commit('items', items)
    } catch (err) {
      console.error(err)
    }
  },
  updateCartItem({ commit, state }, payload) {
    const res = state.items.filter(item => item.id !== payload.id)
    const mergedItemList = [...res, ...[payload]]
    commit('items', mergedItemList)
  },
  async addItem({ commit, rootState }, { id, count }) {
    const payload = {
      input: {
        userId: rootState.user.user.id,
        itemId: id,
        count,
      },
    }
    try {
      await addCartApi(payload)
      const res = await fetchItemApi(id)
      commit('itemPush', { ...res, count })
    } catch (err) {
      console.error(err)
    }
  },
  async delCartItem({ commit, state }, { cartId }) {
    try {
      const payload = {
        input: {
          id: cartId
        },
      }
      await deleteCartItemApi(payload)
      const res = state.items.filter(item => item.id !== cartId)
      commit('items', res)
    } catch (err) {
      console.error(err)
    }
  }
}

// mutations
const mutations = {
  items(state, payload) {
    state.items = payload
  },
  itemPush(state, payload) {
    state.items.push(payload)
  }
}

const cart = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default cart
