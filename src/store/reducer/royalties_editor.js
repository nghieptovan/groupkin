import { GET_ROYALTIES_EDITOR, GET_ROYALTIES_SUCCESS, GET_ROYALTIES_ERROR } from "../constants/RoyaltiesEditor";

const initialState = {
  error: '',
  status: 0,
  royaltiesEditors: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ROYALTIES_EDITOR:
      return {
        ...state,
        fileUpload: null,
        status: 1
    }

    case GET_ROYALTIES_SUCCESS:
      return {
        ...state,
        royaltiesEditors: action.result,
        status: 2
    }

    case GET_ROYALTIES_ERROR:
      return {
        ...state,
        error: action.error,
        status: 3
    }

    default:
      return state
  }
}

