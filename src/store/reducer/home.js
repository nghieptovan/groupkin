import * as type from '../constants/HomeActionTypes'
import * as _ from 'lodash';

const initialState = {
  listItem: {
    status: 0,
    value: null,
    message: ''
  },
  createItem: {
    status: 0,
    value: null,
    message: ''
  },
  updateItem: {
    status: 0,
    value: null,
    message: ''
  },
  deleteItem: {
    status: 0,
    value: null,
    message: ''
  },
  updateHomePost: {},
  updateHomePostList: []
};

export default function reducer(state = initialState, action = {}) {
  let { value } = action
  let listItem = state.listItem;
  switch (action.type) {

    case type.UPDATE_HOME_POST:
      return {
        ...state,
        updateHomePost: value
    }
    case type.UPDATE_HOME_POSTLIST:
      return {
        ...state,
        updateHomePostList: value
    }
    case type.HOME_LIST:
      return {
        ...state,
        listItem: {
          status: 1,
          value: null,
          message: ''
        }
    }

    case type.HOME_LIST_SUCCESS:
      return {
        ...state,
        listItem: {
          status: 2,
          value: action.result,
          message: ''
        }
      }

    case type.HOME_LIST_FAIL:
      return {
        ...state,
        listItem: {
          status: 3,
          value: [],
          message: action.error
        }
    }

    case type.CREATE_HOME_ITEM:
      return {
        ...state,
        createItem: {
          status: 1,
          value: null,
          message: ''
        }
    }

    case type.CREATE_HOME_ITEM_SUCCESS:
      listItem.value.push(action.result)
      return {
        ...state,
        createItem: {
          status: 2,
          value: action.result,
          listItem: listItem,
          message: ''
        }
      }

    case type.CREATE_HOME_ITEM_FAIL:
      return {
        ...state,
        createItem: {
          status: 3,
          value: [],
          message: action.error
        }
    }

    case type.UPDATE_HOME_ITEM:
      return {
        ...state,
        updateItem: {
          status: 1,
          value: null,
          message: ''
        }
    }
    case type.UPDATE_HOME_ITEM_SUCCESS:
      let findIndex= _.findIndex(listItem, { '_id': action.result._id });
      console.log(findIndex);
      console.log(action.result._id);
      
      // _.map(listItem, (item) => { return item.post._id == 
      //   action.result.post._id ? action.result : item; });
      // listItem.value.push(action.result)
      return {
        ...state,
        updateItem: {
          status: 2,
          value: action.result,
          listItem: listItem,
          message: ''
        }
      }
    case type.UPDATE_HOME_ITEM_FAIL:
      return {
        ...state,
        updateItem: {
          status: 3,
          value: [],
          message: action.error
        }
    }
    default:
      return state
  }
}

