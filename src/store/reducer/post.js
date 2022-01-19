import * as type from '../constants/PostActionTypes';
import * as _ from 'lodash';
const initialState = {
  error: '',
  listPost: [],
  listRoyalties: [],
  currentPost: null,
  getPostStatus: 0,
  createdPost: null,
  createPostStatus: 0,
  updatePostStatus: 0,
  deletePostStatus: 0,
  totalPosts: 0,
  currentTabPost: 1,
  totalRoyalties: 0,
  totalMoney: 0,
  totalMoneyEditor: 0,
  totalMoneyPhoto: 0
};

export default function reducer(state = initialState, action = {}) {
  let { value } = action
  switch (action.type) {

    case type.GET_LIST_POST:
      return {
        ...state,
        listPost: []
    }

    case type.GET_LIST_POST_SUCCESS:
      let { posts, totals } = action.result
      return {
        ...state,
        listPost: posts,
        totalPosts: totals
      }

    case type.GET_LIST_POST_FAIL:
      return {
        ...state,
        error: action.error,
      }

    case type.UPDATE_LIST_POST:
      return {
        ...state,
        listPost: value
    }

      
    case type.GET_LIST_ROYALTIES:
      return {
        ...state
    }

    case type.GET_LIST_ROYALTIES_SUCCESS:

      return {
        ...state,
        listRoyalties: action.result.posts,
        totalRoyalties: action.result.totals,
        totalMoney: action.result.totalMoney,
        totalMoneyEditor: action.result.totalMoneyEditor,
        totalMoneyPhoto: action.result.totalMoneyPhoto
    }

    case type.GET_LIST_ROYALTIES_FAIL:
      return {
        ...state,
        error: action.error,
    }

    case type.UPDATE_POST_FOROM_SOCKET:

      const listPost1 = state.listPost
      const findIndex = _.findIndex(listPost1, (post) => post._id == value._id)
      if(findIndex >= 0){
        listPost1[findIndex] =  value
      }
      return {
        ...state,
        listPost: listPost1
    }

    case type.GET_POST:
      return {
        ...state,
        getPostStatus: 1,
    }

    case type.GET_POST_SUCCESS:
      return {
        ...state,
        getPostStatus: 2,
        currentPost: action.result
      }

    case type.GET_POST_FAIL:
      return {
        ...state,
        getPostStatus: 3,
        error: action.error,
      }

    case type.ADD_NEW_POST:
      return {
        ...state,
        createPostStatus: 1,
        updatePostStatus: 0
    }

    case type.ADD_NEW_POST_SUCCESS:
      return {
        ...state,
        createPostStatus: 2,
        currentPost: action.result
      }

    case type.ADD_NEW_POST_FAIL:
      return {
        ...state,
        createPostStatus: 3,
        error: action.error,
      }
    case type.UPDATE_POST:
      return {
        ...state,
        updatePostStatus: 1,
        createPostStatus: 0
    }

    case type.UPDATE_POST_SUCCESS:
      let currentPost = state.currentPost
      delete currentPost.clickButton
      return {
        ...state,
        updatePostStatus: 2,
        currentPost: currentPost
      }

    case type.UPDATE_POST_FAIL:
      return {
        ...state,
        updatePostStatus: 3,
        error: action.error,
    }

    case type.SET_CURRENT_POST: 
      return {
      ...state,
      currentPost: value
    }

    case type.DELETE_POST:
      return {
        ...state,
        deletePostStatus: 1
    }

    case type.DELETE_POST_SUCCESS:
      let { listPost } = state;
      listPost = listPost.filter((value, index, arr) =>{
        return value._id !== action.result._id;
      });
      return {
        ...state,
        listPost: listPost,
        deletePostStatus: 2,
      }

    case type.DELETE_POST_FAIL:
      return {
        ...state,
        deletePostStatus: 3,
        error: action.error,
    }

    case type.CHANGE_TAB_POST:
      return {
        ...state,
        currentTabPost: value
    }

    default:
      return state
  }
}
