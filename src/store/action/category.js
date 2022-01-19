import * as type from '../constants/CategoryActionTypes';

export const getListCategory = (value) => (
  {
    types: [type.GET_LIST_CATEGORY, type.GET_LIST_CATEGORY_SUCCESS, type.GET_LIST_CATEGORY_FAIL],
    promise: (client) => client.get(`/categories`)
  }
)
