import * as type from "../constants/TransactionActionTypes";
import { filtersToQueryString } from "../../utils/post-filter";
export const getTransaction = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [
      type.GET_LIST_TRANSACTION,
      type.GET_LIST_TRANSACTION_SUCCESS,
      type.GET_LIST_TRANSACTION_FAIL
    ],
    promise: (client) => client.get(`/transactions?_sort=updated_at:DESC${queryString}`)
  };
};
