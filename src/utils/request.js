import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import {Toast} from 'mint-ui'
// import { getToken } from '@/utils/auth'
const debug = process.env.NODE_ENV !== 'production'
// create an axios instance

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 15000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = store.getters.token
    }
    // console.log(config.path)
    if (debug) {
      config.url = `/api${config.url}`
    }

    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.code !== 1) {
      if (response.data.msg) {
        Toast(response.data.msg)
      }
      if (response.data.code === 2) {
        store.dispatch('setToken', '')
      }
    }
    // response -1--系统异常, 0--处理失败,1--处理成功,2--未登陆, 3--参数错误
    // console.log(response)
    return response.data
  },
  error => {
    // Toast('网络超时')
    console.log(error) // for debug
    if ((error + '').indexOf('timeout') > 0) {
      Toast('网络超时')
    } else {
      Toast('网络错误')
    }
    // Message({
    //   message: error.msg,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
