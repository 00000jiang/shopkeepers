import env from '@/utils/env'
import axios from 'axios'

const instance = axios.create({
  baseURL: env.location,
  timeout: 5000
})

// Add a request interceptor
instance.interceptors.request.use(config => {
  // const isToken = (config.headers || {}).isToken === false
  if ((config.method === 'get' || config.method === 'delete') && config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  } else if (config.method === 'post' || config.method === 'put') {
    console.log('222')
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(res => {
  // const code = res.data.code || 200
  // console.log(code)
  return res.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

/**
* 参数处理
* @param {*} params  参数
*/
function tansParams (params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof (value) !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof (value[key]) !== 'undefined') {
            const params = propName + '[' + key + ']'
            const subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

export default instance
