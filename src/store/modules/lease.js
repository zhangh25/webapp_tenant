const lease = {
  state: {
    houselease: null
  },
  mutations: {
    SET_HOUSE: (state, house) => {
      state.houselease = house
    }
  },
  actions: {
    leaseHouse ({state, commit}, houselease) {
      commit('SET_HOUSE', houselease)
    }
  }
}
export default lease
