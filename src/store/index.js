import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import hourse from './modules/hourse'
import lease from './modules/lease'
import wallet from './modules/wallet'
import message from './modules/message'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    hourse,
    lease,
    wallet,
    message
  },
  getters
})

export default store
