import * as type from '../constants/AuthActionTypes';

export const loginToBackEnd = (value) => (
  {
    types: [type.LOGIN, type.LOGIN_SUCCESS, type.LOGIN_FAIL],
    promise: (client) => client.post(`/auth/local`, value)
  }
)

export const getUserInfo = (value) => (
  {
    types: [type.CHECK_ACCESSTOKEN, type.CHECK_ACCESSTOKEN_SUCCESS, type.CHECK_ACCESSTOKEN_FAIL],
    promise: (client) => client.get(`/users/${value}`)
  }
)

export const setUserInfo = (value) => ({
  type: type.SET_USER_INFO,
  value
})

export const initAccessTokenFromLocal = (value) => (
  {
    types: [type.SET_ACCESSTOKEN_COOKIE, type.SET_ACCESSTOKEN_COOKIE_SUCCESS, type.SET_ACCESSTOKEN_COOKIE_FAIL],
    value
  }
)

export const logout = (value) => ({
  type: type.SIGN_OUT,
  value
})

export const getListRoleRule = (value) => (
  {
    types: [type.GET_LIST_ROLERULE, type.GET_LIST_ROLERULE_SUCCESS, type.GET_LIST_ROLERULE_FAIL],
    promise: (client) => client.get(`/role-rules`)
  }
)

export const checkedit = (value) => (
  {
    types: [type.CHECKPOST, type.CHECKPOST_SUCCESS, type.CHECKPOST_FAIL],
    promise: (client) => client.get(`/posts/checkedit`)
  }
)



