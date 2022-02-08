import * as type from '../constants/TransactionActionTypes';
import * as _ from "lodash";
const initialState = {
  error: '',
  listTransactionStatus: 0,
  listTransaction: [],
  totalTransaction: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case type.GET_LIST_TRANSACTION:
      return {
        ...state,
        listTransactionStatus: 1
    }

    case type.GET_LIST_TRANSACTION_SUCCESS:
      return {
        ...state,
        listTransaction: action.result.data,
        totalTransaction: action.result.total,
        listTransactionStatus: 2
      }

    case type.GET_LIST_TRANSACTION_FAIL:
      return {
        ...state,
        error: _.get(error, "response.data.message[0][messages][0]message", "Lỗi"),
        listTransactionStatus: 3
    }
    default:
      return state
  }
}
