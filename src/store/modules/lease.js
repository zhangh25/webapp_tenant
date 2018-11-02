const lease = {
  state: {
    houselease: null,
    pacturl: null,
    leaseId: null,
    licence: []
  },
  mutations: {
    SET_HOUSE: (state, house) => {
      state.houselease = house
    },
    SET_URL: (state, url) => {
      state.pacturl = url
    },
    SET_ID: (state, id) => {
      state.leaseId = id
    },
    SET_LICENCE: (state, licence) => {
      state.licence = licence
    }
  },
  actions: {
    leaseHouse ({state, commit}, houselease) {
      commit('SET_HOUSE', houselease)
    },
    setPacturl ({commit}, url) {
      commit('SET_URL', url)
    },
    setLeaseId ({commit}, id) {
      commit('SET_ID', id)
    },
    setlicence ({commit}, licence) {
      commit('SET_LICENCE', licence)
    }
  }
}
export default lease
