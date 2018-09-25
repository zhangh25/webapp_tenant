const getters = {
  token: state => state.user.token,
  phone: state => state.user.phone,
  userData: state => state.user.userData,
  history: state => state.hourse.history
}
export default getters
