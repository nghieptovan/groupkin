import * as type from '../constants/HomeActionTypes';

export const getListHomepage = (value) => (
  {
    types: [type.HOME_LIST, type.HOME_LIST_SUCCESS, type.HOME_LIST_FAIL],
    promise: (client) => client.get(`/homepages?_sort=order:ASC`)
  }
)

export const createHomepageItem = (value) => (
  {
    types: [type.CREATE_HOME_ITEM, type.CREATE_HOME_ITEM_SUCCESS, type.CREATE_HOME_ITEM_FAIL],
    promise: (client) => client.post(`/homepages`, value)
  }
)

export const updateHomepageItem = value => ({
  types: [type.UPDATE_HOME_ITEM, type.UPDATE_HOME_ITEM_SUCCESS, type.UPDATE_HOME_ITEM_FAIL],
  promise: client => client.put(`/homepages/${value._id}`, value)
});

export const deleteHomepageItem = value => ({
  types: [type.DELETE_HOME_ITEM, type.DELETE_HOME_ITEM_SUCCESS, type.DELETE_HOME_ITEM_FAIL],
  promise: client => client.delete(`/homepages/${value}`)
});

export const updateHomeItem = value => ({
  type: type.UPDATE_HOME_POST,
  value
});
export const updateHomePostList = value => ({
  type: type.UPDATE_HOME_POSTLIST,
  value
});


