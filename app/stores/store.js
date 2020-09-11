import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import item from './item'
import favorite from './favorite'
import cart from './cart'
import history from './history'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    item,
    favorite,
    cart,
    history,
  }
})
