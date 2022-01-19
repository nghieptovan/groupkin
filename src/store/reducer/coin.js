import * as type from '../constants/CoinActionTypes';

const initialState = {
  error: '',
  getListTopupStatus: 0,
  listTopup: [],
  totalTopup: 0,
  totalCoin: 0,
  coinList: [],
  getListCoinStatus: 0,
  totalPromotion: 0,
  promotions: [],
  getListPromotionStatus: 0,
  changePromotionStatus: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case type.GET_LIST_COIN_ITEM:
      return {
        ...state,
        getListCoinStatus: 1,
        listTopup: []
    }

    case type.GET_LIST_COIN_ITEM_SUCCESS:
      return {
        ...state,
        coinList: action.result.Items,
        totalCoin: action.result.ItemCount,
        getListCoinStatus: 2
      }

    case type.GET_LIST_COIN_ITEM_FAIL:
      return {
        ...state,
        error: action.error,
        getListCoinStatus: 3
    }

    case type.GET_LIST_COIN_PROMOTINO_ITEM:
      return {
        ...state,
        getListPromotionStatus: 1,
        promotions: []
    }

    case type.GET_LIST_COIN_PROMOTINO_ITEM_SUCCESS:
      return {
        ...state,
        promotions: action.result.Items,
        totalPromotion: action.result.ItemCount,
        getListPromotionStatus: 2
      }

    case type.GET_LIST_COIN_PROMOTINO_ITEM_FAIL:
      return {
        ...state,
        error: action.error,
        getListPromotionStatus: 3,
        promotions: []
    }
    case type.CHANGE_PROMOTINO_ITEM:
      return {
        ...state,
        changePromotionStatus: 1,
    }

    case type.CHANGE_PROMOTINO_ITEM_SUCCESS:
      return {
        ...state,
        changePromotionStatus: 2
      }

    case type.CHANGE_PROMOTINO_ITEM_FAIL:
      return {
        ...state,
        error: action.error,
        changePromotionStatus: 3,
    }

    case type.GET_LIST_TOPUP_ITEM:
      return {
        ...state,
        getListTopupStatus: 1,
        listTopup: []
    }

    case type.GET_LIST_TOPUP_ITEM_SUCCESS:
      return {
        ...state,
        listTopup: action.result.payments,
        totalTopup: action.result.total,
        getListTopupStatus: 2
      }

    case type.GET_LIST_TOPUP_ITEM_FAIL:
      return {
        ...state,
        error: action.error,
        getListTopupStatus: 3
    }
    default:
      return state
  }
}
