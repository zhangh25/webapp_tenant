import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import hourse from './modules/hourse'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    hourse
  },
  getters
})

export default store
