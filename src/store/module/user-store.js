import { setUserInfo, getUserInfo } from '@/utils/cache/local-cache'
import { setToken } from '@/utils/cache/cookies'
export default {
  namespaced: true,
  state: {
    userInfo: getUserInfo()
  },
  getters: {
  },
  mutations: {
    updUserInfor (context, obj) {
      context.userInfo = obj
      setUserInfo(obj)
      setToken(obj.token)
    }
  },
  actions: {
  }
}
