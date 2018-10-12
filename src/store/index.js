import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import hourse from './modules/hourse'
import lease from './modules/lease'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    hourse,
    lease
  },
  getters
})

export default store
