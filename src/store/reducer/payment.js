import * as type from '../constants/PaymentActionTypes';

const initialState = {
  error: '',
  getListPaymentStatus: 0,
  listPayemnt: [],
  totalPayment: 0,
  typePayment: "",
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case type.GET_LIST_PAYMENT_ITEM:
      return {
        ...state,
        getListPaymentStatus: 1,
        listPayemnt: []
    }

    case type.GET_LIST_PAYMENT_ITEM_SUCCESS:
      return {
        ...state,
        listPayemnt: action.result.payments,
        totalPayment: action.result.total,
        getListPaymentStatus: 2
      }

    case type.GET_LIST_PAYMENT_ITEM_FAIL:
      return {
        ...state,
        error: action.error,
        getListPaymentStatus: 3
    }
    default:
      return state
  }
}
