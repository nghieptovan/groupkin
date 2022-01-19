import * as type from "../constants/PaymentActionTypes";
import { filtersToQueryString } from "../../utils/post-filter";

export const getListPayment = values => {
  values.url = `/payment/data/selectlist.aspx`;
  // values.is_post = true;
  return {
    types: [
      type.GET_LIST_PAYMENT_ITEM,
      type.GET_LIST_PAYMENT_ITEM_SUCCESS,
      type.GET_LIST_PAYMENT_ITEM_FAIL
    ],
    promise: (client) => client.post(`/cinemas/postData`, values)
  };
};
