let history = JSON.parse(localStorage.getItem('history'))
if (!history) history = []
const hourse = {
  state: {
    history
  },
  mutations: {
    SET_HISTORY: (state, history) => {
      state.history = history
    }
  },
  actions: {
    addHistory ({state, commit}, history) {
      let idx = state.history.indexOf(history)
      console.log(idx, '3233')
      if (idx > -1) {
        console.log(idx, '3231123')
        state.history.splice(idx, 1)
      }
      state.history.push(history)
      localStorage.setItem('history', JSON.stringify(state.history))
      commit('SET_HISTORY', state.history)
    },
    clearHistory ({commit}) {
      localStorage.removeItem('history')
      commit('SET_HISTORY', [])
    }
  }
}
export default hourse
