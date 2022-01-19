import * as type from '../constants/PromotionActionTypes';

const initialState = {
  error: '',
  getCoinPromotionStatus: 0,
  coinPromotion: [],
  totalCoinPromotion: 0,
  typePromotion: "",
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case type.GET_LIST_COIN_PROMOTINO_ITEM:
      return {
        ...state,
        getCoinPromotionStatus: 1,
        coinPromotion: []
    }

    case type.GET_LIST_COIN_PROMOTINO_ITEM_SUCCESS:
      return {
        ...state,
        coinPromotion: action.result.Items,
        totalCoinPromotion: action.result.ItemCount,
        getCoinPromotionStatus: 2
      }

    case type.GET_LIST_COIN_PROMOTINO_ITEM_FAIL:
      return {
        ...state,
        error: action.error,
        getCoinPromotionStatus: 3
    }
    default:
      return state
  }
}
