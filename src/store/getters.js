const getters = {
  token: state => state.user.token,
  phone: state => state.user.phone,
  userData: state => state.user.userData,
  history: state => state.hourse.history,
  collect: state => state.hourse.collect,
  houselease: state => state.lease.houselease
}
export default getters
