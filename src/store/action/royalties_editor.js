import {
  GET_ROYALTIES_EDITOR,
  GET_ROYALTIES_SUCCESS,
  GET_ROYALTIES_ERROR
} from "../constants/RoyaltiesEditor";

export const getRoyaltiesEditors = filters => ({
  types: [GET_ROYALTIES_EDITOR, GET_ROYALTIES_SUCCESS, GET_ROYALTIES_ERROR],
  promise: client => client.get(`/royalties-editor`, filters)
});
