import * as type from "../constants/PostActionTypes";
import { filtersToQueryString } from "../../utils/post-filter";

export const getListPost = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [
      type.GET_LIST_POST,
      type.GET_LIST_POST_SUCCESS,
      type.GET_LIST_POST_FAIL
    ],
    promise: client => client.get(`/posts?_sort=modifiedAt:DESC${queryString}`)
  };
};
export const getListRoyalties = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [
      type.GET_LIST_ROYALTIES,
      type.GET_LIST_ROYALTIES_SUCCESS,
      type.GET_LIST_ROYALTIES_FAIL
    ],
    promise: client => client.get(`/posts/rolyalties?_sort=publishedAt:DESC${queryString}`)
  };
};

export const countListPost = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [
      type.COUNT_LIST_POST,
      type.COUNT_LIST_POST_SUCCESS,
      type.COUNT_LIST_POST_FAIL
    ],
    promise: client => client.get(`/posts/count?_sort=_id:DESC${queryString}`)
  };
};

export const getPostById = value => ({
  types: [type.GET_POST, type.GET_POST_SUCCESS, type.GET_POST_FAIL],
  promise: client => client.get(`/posts/get-detail/` + value)
});

export const createPost = value => ({
  types: [type.ADD_NEW_POST, type.ADD_NEW_POST_SUCCESS, type.ADD_NEW_POST_FAIL],
  promise: client => client.post(`/posts`, value)
});

export const updatePost = value => ({
  types: [type.UPDATE_POST, type.UPDATE_POST_SUCCESS, type.UPDATE_POST_FAIL],
  promise: client => client.put(`/posts/${value._id}`, value)
});

export const deletePost = value => ({
  types: [type.DELETE_POST, type.DELETE_POST_SUCCESS, type.DELETE_POST_FAIL],
  promise: client => client.delete(`/posts/${value._id}`)
});

export const setCurrentPost = value => ({
  type: type.SET_CURRENT_POST,
  value
});


export const changeTab = value => ({
  type: type.CHANGE_TAB_POST,
  value
});

export const updatePostFromSocket = value => ({
  type: type.UPDATE_POST_FOROM_SOCKET,
  value
});
export const updateListPost = value => ({
  type: type.UPDATE_LIST_POST,
  value
});




