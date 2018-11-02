const getters = {
  token: state => state.user.token,
  phone: state => state.user.phone,
  userData: state => state.user.userData,
  history: state => state.hourse.history,
  collect: state => state.hourse.collect,
  houselease: state => state.lease.houselease,
  card: state => state.wallet.card,
  qiniuToken: state => state.user.qiniuToken,
  message: state => state.message.message,
  allowBack: state => state.message.allowBack,
  details: state => state.hourse.details,
  condition: state => state.hourse.condition,
  loginedPath: state => state.user.loginedPath,
  pacturl: state => state.lease.pacturl,
  leaseId: state => state.lease.leaseId,
  pay: state => state.wallet.pay,
  licence: state => state.lease.licence,
  billdetail: state => state.wallet.billdetail,
  isfirst: state => state.user.isfirst
}
export default getters
