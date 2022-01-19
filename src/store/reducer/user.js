import * as type from '../constants/UserActionTypes';
import * as typeRoleRule from '../constants/ConfigActionTypes';
import localStore from 'src/utils/local-storage'

const initialState = {
  error: '',
  listUser: null,
  loadUserStatus: 0,
  loaded: false,
  listRoleRule: null,
  currentUser: null,
  createUserStatus: 0,
  getUserStatus: 0,
  updateUserStatus: 0,
  myProfile: null,
  getProfileStatus: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case type.GET_LIST_USER:
      return {
        ...state,
        loadUserStatus: 1
    }

    case type.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        listUser: action.result,
        loadUserStatus: 2
      }

    case type.GET_LIST_USER_FAIL:
      return {
        ...state,
        loadUserStatus: 3,
        error: action.error
      }

    case type.CREATE_USER:
      return {
        ...state,
        createUserStatus: 1
    }

    case type.CREATE_USER_SUCCESS:
      return {
        ...state,
        createUserStatus: 2
    }

    case type.CREATE_USER_FAIL:
      return {
        ...state,
        createUserStatus: 3,
        error: action.error
    }

    case type.GET_USER:
      return {
        ...state,
        getUserStatus: 1
    }

    case type.GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.result,
        getUserStatus: 2
    }

    case type.GET_USER_FAIL:
      return {
        ...state,
        getUserStatus: 3,
        error: action.error
    }

    case type.UPDATE_USER:
      return {
        ...state,
        updateUserStatus: 1
    }

    case type.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserStatus: 2
    }

    case type.UPDATE_USER_FAIL:
      return {
        ...state,
        updateUserStatus: 3,
        error: action.error
    }

    case type.GET_PROFILE:
      return {
        ...state,
        myProfile:{},
        getProfileStatus: 1
    }

    case type.GET_PROFILE_SUCCESS:
      return {
        ...state,
        myProfile: localStore.get('_user'),
        getProfileStatus: 2
    }

    case type.GET_PROFILE_FAIL:
      return {
        ...state,
        error: action.error,
        getProfileStatus: 3
    }

    case type.SET_CURRENT_USER: 
      return {
      ...state,
      currentUser: action.value
    }

    case type.UPDATE_MY_PROFILE: 
      localStore.set('_user', action.value);
      return {
      ...state,
      myProfile: action.value
    }

    default:
      return state
  }
}


