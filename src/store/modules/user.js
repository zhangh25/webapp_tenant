import {Logout, getQiniuToken} from '@/api/user'
const user = {
  state: {
    token: localStorage.getItem('token'),
    user: '',
    phone: '13688886666',
    userData: JSON.parse(localStorage.getItem('user')),
    qiniuToken: '',
    loginedPath: '',
    isfirst: localStorage.getItem('first'),
    version: '',
    wxAppid: '',
    wxCode: '',
    isApp: false
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.userData = user
    },
    SET_QINIUTOKEN (state, token) {
      state.qiniuToken = token
    },
    SET_LOGINEDPATH (state, path) {
      state.loginedPath = path
    },
    SET_FIRST (state, first) {
      state.isfirst = first
    },
    SET_VERSION (state, v) {
      state.version = v
    },
    SET_WXAPPID (state, appid) {
      state.wxAppid = appid
    },
    SET_WXCODE (state, code) {
      state.wxCode = code
    },
    SET_ISAPP (state, isApp) {
      state.isApp = isApp
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
    },
    getQiniuToken ({state, commit}) {
      let token = state.qiniuToken
      // console.log('store', token)
      return new Promise((resolve, reject) => {
        if (token) {
          resolve(token)
        } else {
          getQiniuToken().then(res => {
            if (res.code === 1) {
              commit('SET_QINIUTOKEN', res.data)
              resolve(res.data)
            } else {
              reject(res.msg)
            }
          })
        }
      })
    },
    setPath ({commit}, path) {
      commit('SET_LOGINEDPATH', path)
    },
    setFirst ({commit}) {
      // console.log('set first')
      commit('SET_FIRST', 'first')
      localStorage.setItem('first', 'first')
    },
    setVersion ({commit}, v) {
      commit('SET_VERSION', v)
    },
    setAppid ({commit}, appid) {
      commit('SET_WXAPPID', appid)
    },
    setWxCode ({commit}, code) {
      commit('SET_WXCODE', code)
    },
    setIsapp ({commit}, isApp) {
      commit('SET_ISAPP', isApp)
    }
  }
}

export default user
