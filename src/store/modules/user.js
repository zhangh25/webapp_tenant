import {Logout} from '@/api/user'
const user = {
  state: {
    token: localStorage.getItem('token'),
    user: '',
    phone: '13688886666',
    userData: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.userData = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      localStorage.setItem('token', token)
      commit('SET_TOKEN', token)
    },
    setUser ({commit}, user) {
      let userData = JSON.stringify(user)
      localStorage.setItem('user', userData)
      commit('SET_USER', user)
    },
    logout ({state, commit}) {
      return new Promise((resolve, reject) => {
        Logout(state.token).then(res => {
          console.log(res)
          if (res.code === 1) {
            localStorage.removeItem('token')
            commit('SET_TOKEN', '')
            commit('SET_USER', {})
            resolve(res)
          } else {
            reject(res)
          }
          // reject
        })
      })
    }
  }
}

export default user
