const wallet = {
  state: {
    card: null
  },
  mutations: {
    SET_CARD: (state, card) => {
      state.card = card
    }
  },
  actions: {
    setCard ({commit}, card) {
      commit('SET_CARD', card)
    }
  }
}
export default wallet
