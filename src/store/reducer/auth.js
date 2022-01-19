import Cookies from 'js-cookie'
import localStore from 'src/utils/local-storage'
import * as type from '../constants/AuthActionTypes'
import StorageService from '../../services/StorageService';
import CookiesService from '../../services/CookiesService';
import {
  CONSTS
} from '../../config/Constant';
import * as _ from "lodash";

const initialState = {
  error: '',
  userInfo: null,
  accesstoken: '',
  loaded: false,
  statusLogin: 0,
  loggedOut: false
};

export default function reducer(state = initialState, action = {}) {
  let { value } = action
  switch (action.type) {

    case type.LOGIN:
      return {
        ...state,
        statusLogin: 1
      }

    case type.LOGIN_SUCCESS:
      setToken(action.result);      
      return {
        ...state,
        userInfo: action.result.user,
        statusLogin: 2,
        accesstoken: action.result.jwt
      }

    case type.LOGIN_FAIL:
      const error = action.error;
      return {
        ...state,
        error: _.get(error, "response.data.message[0][messages][0]message", "Lỗi"),
        statusLogin: 3
      }

    case type.SIGN_OUT:
      unSetToken();
      return {
        ...state,
        userInfo: null,
        statusLogin: 0,
        accesstoken: '',
        loggedOut: true
      }

    case type.SET_USER_INFO:
      return {
        ...state,
        userInfo: value,
        statusLogin: 2,
        accesstoken: CookiesService.get(CONSTS.STORE_KEYS.USER.TOKEN, false)
      }

    case type.CHECK_ACCESSTOKEN:
      return {
        ...state,
      }
    case type.CHECK_ACCESSTOKEN_SUCCESS:
      localStore.set('_user', action.result);
      return {
        ...state,
        userInfo: action.result
      }
    case type.CHECK_ACCESSTOKEN_FAIL:
      localStore.remove('_user');
      return {
        ...state,
        error: action.error,
      }
    case type.LOADING:
      value = typeof value === 'undefined' ? false : value
      return {
        ...state,
        loaded: (value ? true : false)
      }
    default:
      return state
  }
}

export const setToken = token => {
  if (!process.browser) {
    return;
  }
  const user = token.user;
  CookiesService.set(CONSTS.STORE_KEYS.USER.TOKEN, token.jwt)
  CookiesService.set(CONSTS.STORE_KEYS.USER.ID, user.id)
  CookiesService.set(CONSTS.STORE_KEYS.USER.PROFILE, user, true)
};


export const unSetToken = () => {
  if (!process.browser) {
    return;
  }

  CookiesService.delete(CONSTS.STORE_KEYS.USER.TOKEN);
  CookiesService.delete(CONSTS.STORE_KEYS.USER.ID);
  CookiesService.delete(CONSTS.STORE_KEYS.USER.PROFILE);
  window.location.href = '/login';
};
