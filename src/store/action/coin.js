import * as type from "../constants/CoinActionTypes";
import { filtersToQueryString } from "../../utils/post-filter";

export const getListCoin = values => {
  values.url = `/payment/coin/coin-list.aspx`;
  return {
    types: [
      type.GET_LIST_COIN_ITEM,
      type.GET_LIST_COIN_ITEM_SUCCESS,
      type.GET_LIST_COIN_ITEM_FAIL
    ],
    promise: (client) => client.post(`/cinemas/postData`, values)
  };
};
export const getListPromotion = values => {
  values.url = `/payment/coin/promotion-list.aspx`;
  return {
    types: [
      type.GET_LIST_COIN_PROMOTINO_ITEM,
      type.GET_LIST_COIN_PROMOTINO_ITEM_SUCCESS,
      type.GET_LIST_COIN_PROMOTINO_ITEM_FAIL
    ],
    promise: (client) => client.post(`/cinemas/postData`, values)
  };
};
export const changePromotion = values => {
  delete values.ModifyDts;
  values.url = `/payment/coin/change-promotion.aspx`;
  return {
    types: [
      type.CHANGE_PROMOTINO_ITEM,
      type.CHANGE_PROMOTINO_ITEM_SUCCESS,
      type.CHANGE_PROMOTINO_ITEM_FAIL
    ],
    promise: (client) => client.post(`/cinemas/postData`, values)
  };
};

export const getListTopup = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [
      type.GET_LIST_TOPUP_ITEM,
      type.GET_LIST_TOPUP_ITEM_SUCCESS,
      type.GET_LIST_TOPUP_ITEM_FAIL
    ],
    promise: client => client.get(`/cinemas/getcoin?_sort=modifiedAt:DESC${queryString}`)
  };
};
