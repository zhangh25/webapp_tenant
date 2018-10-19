const message = {
  state: {
    message: {},
    allowBack: true
  },
  mutations: {
    SET_MSG: (state, msg) => {
      state.message = msg
    },
    SET_BACK: (state, back) => {
      state.allowBack = back
    }
  },
  actions: {
    setMsg ({commit}, msg) {
      commit('SET_MSG', msg)
    },
    updateBack ({commit}, back) {
      commit('SET_BACK', back)
    }
  }
}
export default message
