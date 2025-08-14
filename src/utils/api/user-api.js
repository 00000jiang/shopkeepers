import request from '@/utils/request'

export function getGraphicVerification () {
  return request({
    url: '/user/getGraphicVerification',
    method: 'get'
  })
}

export function sendSmsCode (params) {
  return request({
    url: '/user/sendSmsCode',
    method: 'get',
    params
  })
}

export function login (params) {
  return request({
    url: '/user/login',
    method: 'get',
    params
  })
}
