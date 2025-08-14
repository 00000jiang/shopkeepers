const USER_INFO = 'USER_INFO'

// 缓存添加 用户信息
export function setUserInfo (userInfo) {
  if (userInfo != null) {
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
  }
}

// 获取缓存 用户信息
export function getUserInfo () {
  const userInfo = localStorage.getItem(USER_INFO)
  return userInfo ? JSON.parse(userInfo) : null
}

// 删除缓存 用户信息
export function removeUserInfo () {
  localStorage.removeItem(USER_INFO)
}
