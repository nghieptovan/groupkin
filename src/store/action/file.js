import * as type from '../constants/FileActionTypes';

export const uploadFile = (value) => (
  {
    types: [type.UPLOAD_FILE, type.UPLOAD_FILE_SUCCESS, type.UPLOAD_FILE_FAIL],
    promise: (client) => client.post(`/upload`, value)
  }
)
