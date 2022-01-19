import * as type from '../constants/UserActionTypes';
import { filtersToQueryString } from "../../utils/post-filter";

export const getListUser = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [
      type.GET_LIST_USER,
      type.GET_LIST_USER_SUCCESS,
      type.GET_LIST_USER_FAIL
    ],
    promise: client => client.get(`/users?_sort=createdAt:DESC&_limit=-1${queryString}`)
  };
};

export const getUserById = (value) => (
  {
    types: [type.GET_USER, type.GET_USER_SUCCESS, type.GET_USER_FAIL],
    promise: (client) => client.get(`/users/${value}`)
  }
)


export const updateUser = (value) => (
  {
    types: [type.UPDATE_USER, type.UPDATE_USER_SUCCESS, type.UPDATE_USER_FAIL],
    promise: (client) => client.put(`/users/${value._id}`, value)
  }
)

export const createUser = (value) => (
  {
    types: [type.CREATE_USER, type.CREATE_USER_SUCCESS, type.CREATE_USER_FAIL],
    promise: (client) => client.post(`/auth/local/register`, value)
  }
)

export const getMyProfile = (value) => (
  {
    types: [type.GET_PROFILE, type.GET_PROFILE_SUCCESS, type.GET_PROFILE_FAIL],
    promise: (client) => client.get(`no-action-url`)
  }
)

export const updateMyProfile = (value) => (
  {
    type: type.UPDATE_MY_PROFILE,
    value
  }
)

export const setCurrentUser = (value) => (
  {
    type: type.SET_CURRENT_USER,
    value
  }
)
