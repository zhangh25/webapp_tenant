const wallet = {
  state: {
    card: null,
    pay: {},
    billdetail: {}
  },
  mutations: {
    SET_CARD: (state, card) => {
      state.card = card
    },
    SET_PAY: (state, pay) => {
      state.pay = pay
    },
    SET_BILL: (state, bill) => {
      state.billdetail = bill
    }
  },
  actions: {
    setCard ({commit}, card) {
      commit('SET_CARD', card)
    },
    setPay ({commit}, pay) {
      // console.log(pay)
      commit('SET_PAY', pay)
    },
    setBill ({commit}, bill) {
      commit('SET_BILL', bill)
    }
  }
}
export default wallet
