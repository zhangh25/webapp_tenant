let payData = sessionStorage.getItem('paydata')
payData = payData ? JSON.parse(payData) : payData
const wallet = {
  state: {
    card: null,
    pay: payData,
    billdetail: {},
    alipayurl: '',
    alipayed: false
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
    },
    SET_ALIPAY: (state, alipay) => {
      state.alipayurl = alipay
    },
    SET_ALIPAYED: (state, alipayed) => {
      state.alipayed = alipayed
    }
  },
  actions: {
    setCard ({commit}, card) {
      commit('SET_CARD', card)
    },
    setPay ({commit}, pay) {
      // console.log(pay)
      commit('SET_PAY', pay)
      sessionStorage.setItem('paydata', JSON.stringify(pay))
    },
    setBill ({commit}, bill) {
      commit('SET_BILL', bill)
    },
    setAlipayUrl ({commit}, alipay) {
      commit('SET_ALIPAY', alipay)
    },
    setAlipayState ({commit}, status) {
      commit('SET_ALIPAYED', status)
    }
  }
}
export default wallet
