import * as type from '../constants/CategoryActionTypes';

const initialState = {
  error: '',
  listCategory: null,
  getCategoryStatus: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case type.GET_LIST_CATEGORY:
      return {
        ...state,
        getCategoryStatus: 1
    }

    case type.GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        listCategory: action.result,
        getCategoryStatus: 2
      }

    case type.GET_LIST_CATEGORY_FAIL:
      return {
        ...state,
        error: action.error,
        getCategoryStatus: 3
    }
    default:
      return state
  }
}
