let history = JSON.parse(localStorage.getItem('history'))
if (!history) history = []
let collect = JSON.parse(localStorage.getItem('collect'))
if (!collect) collect = []
const hourse = {
  state: {
    history,
    collect // 收藏
  },
  mutations: {
    SET_HISTORY: (state, history) => {
      state.history = history
    },
    SET_COLLECT: (state, collect) => {
      state.collect = collect
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
    },
    addCollect ({state, commit}, coll) {
      let idx = state.collect.indexOf(coll)
      if (idx === -1) {
        state.collect.push(coll)
        localStorage.setItem('collect', JSON.stringify(state.collect))
        commit('SET_COLLECT', state.collect)
      }
    },
    delCollect ({state, commit}, coll) {
      let idx = state.collect.indexOf(coll)
      state.collect.splice(idx, 1)
      commit('SET_COLLECT', state.collect)
    }
  }
}
export default hourse
