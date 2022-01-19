import * as type from '../constants/ConfigActionTypes';
import localStore from 'src/utils/local-storage'
import _ from 'lodash'
const initialState = {
  error: '',
  loadConfigStatus: 0,
  listPenname: null,
  listPhoto: null,
  listVideo: null,
  listDesigner: null,
  listSource: null,
  listCategory: null,
  listTags: [],
  listTagsCount: 0,
  countData: null,
  listPosttyle: null,
  listContentCreator: null,
  listRoyaltiesEditor: null,
  listRoyaltiesPhoto: null,
  listRoyalties: null,
  listRole: null,
  addedContentCreator: null,
  addContentCreattorStatus: 0,
  addedTag: null,
  addedSeries: null,
  contentCreatorType: null,
  configuration: null,
  colorBg: ['bg-success', 'bg-warning', 'bg-danger', 'bg-info','bg-gradient-secondary','bg-gradient-warning']
};

function buildCategory(category){
  let { parent_category, children_category } = category;
  _.forEach(parent_category, (parent_cat) => {
    if(parent_cat.categories[0]){
      _.forEach(parent_cat.categories, (sub_cat, idx) => {
        if(sub_cat){
          parent_cat.categories[idx] = _.find(children_category, (cat) => { return sub_cat.id == cat.id});
        }
      });
    }
  });
  return parent_category
}

export default function reducer(state = initialState, action = {}) {
  let {listTags} = state;
  switch (action.type) {
    
    case type.GET_CONFIG:
      return {
      ...state,
      loadConfigStatus: 1
    }  

    case type.GET_CONFIG_SUCCESS:
      const { category, count_data, role, post_status, content_creator_type, royalties_list, banword, frontendurl, configuration } = action.result;

      let contentCreatorType = _.keyBy(content_creator_type, 'code');
      const listCategory = buildCategory(category);
      localStore.set('_content_creator_type', contentCreatorType);
      localStore.setE('_banword', banword);
      localStore.setE('_frontendurl', frontendurl);
      return {
      ...state,
      contentCreatorType: contentCreatorType,
      loadConfigStatus: 2,
      listRole: role,
      countData: count_data,
      listCategory: listCategory,
      // listContentCreator: content_creator,      
      listPosttyle: post_status,
      configuration: configuration,
      royalties_list: royalties_list
    } 

    case type.GET_CONFIG_FAIL:
      return {
      ...state,
      loadConfigStatus: 3
    }     

    case type.GET_LIST_ROLE:
      return {
      ...state,
      listRole: []
    }  
    case type.GET_LIST_ROLE_SUCCESS:
      const roles = action.result.roles.map(role => {
        role.value = role._id;
        role.label = role.name;
        return role
      });
      return {
      ...state,
      listRole: roles
    } 
    case type.GET_LIST_ROLE_FAIL:
      return {
      ...state
    }     

    case type.GET_LIST_ROLERULE:
      return {
        ...state,
    }

    case type.GET_LIST_ROLERULE_SUCCESS:
      return {
        ...state
        // listRoleRule: action.result
    }

    case type.GET_LIST_ROLERULE_FAIL:
      return {
        ...state,
        error: action.error
    }

    case type.GET_LIST_CATE:
      return {
        ...state,
    }

    case type.GET_LIST_CATE_SUCCESS:
      return {
        ...state,
        listCategory: action.result
    }

    case type.GET_LIST_CATE_FAIL:
      return {
        ...state,
        error: action.error
    }  

    case type.GET_LIST_TAG:
      return {
        ...state,
    }

    case type.GET_LIST_TAG_SUCCESS:
      return {
        ...state,
        listTags: action.result
    }

    case type.GET_LIST_TAG_FAIL:
      return {
        ...state,
        error: action.error
    }  
    case type.GET_LIST_TAG_MANAGE:
      return {
        ...state,
    }

    case type.GET_LIST_TAG_MANAGE_SUCCESS:
      return {
        ...state,
        listTags: action.result.list,
        listTagsCount: action.result.totals
    }

    case type.GET_LIST_TAG_MANAGE_FAIL:
      return {
        ...state,
        error: action.error
    }  

    case type.GET_COUNT_TAG:
      return {
        ...state,
    }

    case type.GET_COUNT_TAG_SUCCESS:
      return {
        ...state,
        listTagsCount: action.result
    }

    case type.GET_COUNT_TAG_FAIL:
      return {
        ...state,
        error: action.error
    }  
          
    case type.CREATE_NEW_TAG:
      return {
        ...state,
        addedTag: null
    }

    case type.CREATE_NEW_TAG_SUCCESS:
      let newTag = {...action.result, created: true, type: 'tags'};
      console.log(newTag);
      console.log(listTags);
      
      return {
        ...state,
        // addedTag: action.result,
        listTags: listTags.push(newTag) 
    }

    case type.CREATE_NEW_TAG_FAIL:
      return {
        ...state,
        error: action.error
    }  
    case type.CREATE_NEW_SERIES:
      return {
        ...state,
        // addedSeries: null
    }
    case type.CREATE_NEW_SERIES_SUCCESS:
      let newSeries = {...action.result, created: true, type: 'series'};
      return {
        ...state,
        // addedSeries: action.result,
        listTags: listTags.push(newSeries())
    }
    case type.CREATE_NEW_SERIES_FAIL:
      return {
        ...state,
        error: action.error
    }  

    case type.GET_LIST_PENNAME:
      return {
        ...state,
    }

    case type.GET_LIST_PENNAME_SUCCESS:
      return {
        ...state
        // listPenname: action.result
    }

    case type.GET_LIST_PENNAME_FAIL:
      return {
        ...state,
        error: action.error
    }    
    case type.GET_LIST_POSTYPE:
      return {
        ...state,
    }

    case type.GET_LIST_POSTYPE_SUCCESS:
      return {
        ...state,
        listPosttyle: action.result
    }

    case type.GET_LIST_POSTYPE_FAIL:
      return {
        ...state,
        error: action.error
    }    

    case type.GET_CONTENT_CREATOR:
      return {
        ...state,
    }

    case type.GET_CONTENT_CREATOR_SUCCESS:
      return {
        ...state,
        listContentCreator: action.result
    }

    case type.GET_CONTENT_CREATOR_FAIL:
      return {
        ...state,
        error: action.error
    }    

    case type.CREATE_CONTENT_CREATOR:
      return {
        ...state,
        addedContentCreator: {},
        addContentCreattorStatus: 1
    }

    case type.CREATE_CONTENT_CREATOR_SUCCESS:
      return {
        ...state,
        addedContentCreator: action.result,
        addContentCreattorStatus: 2
    }

    case type.CREATE_CONTENT_CREATOR_FAIL:
      return {
        ...state,
        addContentCreattorStatus: 3,
        error: action.error
    }   

    case type.GET_PENNAMES:
      return {
        ...state,
    }

    case type.GET_PENNAMES_SUCCESS:
      return {
        ...state,
        listPenname: action.result
    }
    case type.GET_PENNAMES_FAIL:
      return {
        ...state,
        error: action.error
    }  
    case type.CREATE_PENNAMES_SUCCESS:
      let { listPenname } = state
      return {
        ...state,
        listPenname: [...listPenname, {...action.result, created: true, type : 'penname'}] 
    }
    case type.GET_PENNAMES_FAIL:
      return {
        ...state,
        error: action.error
    }  

    case type.GET_PHOTO:
      return {
        ...state,
    }

    case type.GET_PHOTO_SUCCESS:
      return {
        ...state,
        listPhoto: action.result
    }
    case type.GET_PHOTO_FAIL:
      return {
        ...state,
        error: action.error
    } 
    case type.GET_ROYALTIES_EDITOR:
      return {
        ...state,
    }
    case type.GET_ROYALTIES_EDITOR_SUCCESS:
      return {
        ...state,
        listRoyaltiesEditor: action.result
    }
    case type.GET_ROYALTIES_EDITOR_FAIL:
      return {
        ...state,
        error: action.error
    }
    case type.GET_ROYALTIES_PHOTO:
      return {
        ...state,
    }
    case type.GET_ROYALTIES_PHOTO_SUCCESS:
      return {
        ...state,
        listRoyaltiesPhoto: action.result
    }
    case type.GET_ROYALTIES_PHOTO_FAIL:
      return {
        ...state,
        error: action.error
    }
    case type.GET_ROYALTIES_LIST:
      return {
        ...state,
    }
    case type.GET_ROYALTIES_LIST_SUCCESS:
      return {
        ...state,
        listRoyalties: action.result
    }
    case type.GET_ROYALTIES_LIST_FAIL:
      return {
        ...state,
        error: action.error
    }
    case type.CREATE_PHOTO_SUCCESS:
      let { listPhoto } = state
      return {
        ...state,
        listPhoto: [...listPhoto, {...action.result, created: true, type : 'photo'}] 
    }
    case type.CREATE_PHOTO_FAIL:
      return {
        ...state,
        error: action.error
    }     

    case type.GET_VIDEO:
      return {
        ...state,
    }

    case type.GET_VIDEO_SUCCESS:
      return {
        ...state,
        listVideo: action.result
    }
    case type.GET_VIDEO_FAIL:
      return {
        ...state,
        error: action.error
    } 
    case type.CREATE_VIDEO_SUCCESS:
      let { listVideo } = state
      return {
        ...state,
        listVideo: [...listVideo, {...action.result, created: true, type : 'video'}] 
    }
    case type.CREATE_VIDEO_FAIL:
      return {
        ...state,
        error: action.error
    } 

    case type.GET_DESIGNER:
      return {
        ...state,
    }
    case type.GET_DESIGNER_SUCCESS:
      return {
        ...state,
        listDesigner: action.result
    }
    case type.GET_DESIGNER_FAIL:
      return {
        ...state,
        error: action.error
    } 
    case type.CREATE_DESIGNER_SUCCESS:
      let { listDesigner } = state
      return {
        ...state,
        listDesigner: [...listDesigner, {...action.result, created: true, type : 'designer'}] 
    }
    case type.CREATE_DESIGNER_FAIL:
      return {
        ...state,
        error: action.error
    }

    case type.GET_SOURCE:
      return {
        ...state,
    }
    case type.GET_SOURCE_SUCCESS:
      return {
        ...state,
        listSource: action.result
    }
    case type.GET_SOURCE_FAIL:
      return {
        ...state,
        error: action.error
    } 
    case type.CREATE_SOURCE_SUCCESS:
      let { listSource } = state
      return {
        ...state,
        listSource: [...listSource, {...action.result, created: true, type : 'source'}] 
    }
    case type.CREATE_SOURCE_FAIL:
      return {
        ...state,
        error: action.error
    }

    case type.CREATE_NEW_EDITOR:
      return {
        ...state,
        error: action.error
    } 
    case type.CREATE_NEW_EDITOR_SUCCESS:
      let { listRoyaltiesEditor } = state
      return {
        ...state,
        listRoyaltiesEditor: [...listRoyaltiesEditor, {...action.result, created: true, type : 'royalties_editor'}] 
    }
    case type.CREATE_NEW_EDITOR_FAIL:
      return {
        ...state,
        error: action.error
    }
    
    case type.CREATE_NEW_PHOTO:
      return {
        ...state,
        error: action.error
    } 
    case type.CREATE_NEW_PHOTO_SUCCESS:
      let { listRoyaltiesPhoto } = state
      return {
        ...state,
        listRoyaltiesPhoto: [...listRoyaltiesPhoto, {...action.result, created: true, type : 'royalties_photographer'}] 
    }
    case type.CREATE_NEW_PHOTO_FAIL:
      return {
        ...state,
        error: action.error
    }
    

    default:
      return state
  }
}
