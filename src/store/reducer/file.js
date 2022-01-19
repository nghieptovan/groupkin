import * as type from '../constants/FileActionTypes';

const initialState = {
  error: '',
  fileUpload: null,
  uploadStatus: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case type.UPLOAD_FILE:
      return {
        ...state,
        fileUpload: null,
        uploadStatus: 1
    }

    case type.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        fileUpload: action.result,
        uploadStatus: 2
    }

    case type.UPLOAD_FILE_FAIL:
      return {
        ...state,
        error: action.error,
        uploadStatus: 3
    }

   
    default:
      return state
  }
}

