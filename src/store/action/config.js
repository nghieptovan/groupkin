import * as type from '../constants/ConfigActionTypes';
import {
  filtersToQueryString
} from "../../utils/post-filter";


export const getConfig = (value) => ({
  types: [type.GET_CONFIG, type.GET_CONFIG_SUCCESS, type.GET_CONFIG_FAIL],
  promise: (client) => client.get(`/configs`)
})


export const getListRoleRule = (value) => ({
  types: [type.GET_LIST_ROLERULE, type.GET_LIST_ROLERULE_SUCCESS, type.GET_LIST_ROLERULE_FAIL],
  promise: (client) => client.get(`/role-rules`)
})
export const getListCate = (value) => ({
  types: [type.GET_LIST_CATE, type.GET_LIST_CATE_SUCCESS, type.GET_LIST_CATE_FAIL],
  promise: (client) => client.get(`/categories`)
})

export const getListTag = (filters) => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [type.GET_LIST_TAG, type.GET_LIST_TAG_SUCCESS, type.GET_LIST_TAG_FAIL],
    promise: client => client.get(`/tags?_sort=_id:DESC${queryString}`)
  };
};
export const getListTagManager = (filters) => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [type.GET_LIST_TAG_MANAGE, type.GET_LIST_TAG_MANAGE_SUCCESS, type.GET_LIST_TAG_MANAGE_FAIL],
    promise: client => client.get(`/tags/getList?_sort=_id:DESC${queryString}`)
  };
};

export const getCountTag = (filters) => {
  return {
    types: [type.GET_COUNT_TAG, type.GET_COUNT_TAG_SUCCESS, type.GET_COUNT_TAG_FAIL],
    promise: client => client.get(`/tags/count`)
  };
};

export const getListPenname = (value) => ({
  types: [type.GET_LIST_PENNAME, type.GET_LIST_PENNAME_SUCCESS, type.GET_LIST_PENNAME_FAIL],
  promise: (client) => client.get(`/pennames`)
})

export const getListPosttype = (value) => ({
  types: [type.GET_LIST_POSTYPE, type.GET_LIST_POSTYPE_SUCCESS, type.GET_LIST_POSTYPE_FAIL],
  promise: (client) => client.get(`/posttypes`)
})

export const getListRole = (value) => ({
  types: [type.GET_LIST_ROLE, type.GET_LIST_ROLE_SUCCESS, type.GET_LIST_ROLE_FAIL],
  promise: (client) => client.get(`/users-permissions/roles`)
})

export const getRoyaltiesEditor = (value) => {
  let queryString = filtersToQueryString(value);
  return {
    types: [type.GET_ROYALTIES_EDITOR, type.GET_ROYALTIES_EDITOR_SUCCESS, type.GET_ROYALTIES_EDITOR_FAIL],
    promise: client => client.get(`/royalties-editors?_sort=_id:DESC${queryString}`)
  }
}

export const getRoyaltiesPhoto = (value) => {
  let queryString = filtersToQueryString(value);
  return {
    types: [type.GET_ROYALTIES_PHOTO, type.GET_ROYALTIES_PHOTO_SUCCESS, type.GET_ROYALTIES_PHOTO_FAIL],
    promise: client => client.get(`/royalties-photographers?_sort=_id:DESC${queryString}`)
  }
}
export const getRoyaltiesList = (value) => ({
  types: [type.GET_ROYALTIES_LIST, type.GET_ROYALTIES_LIST_SUCCESS, type.GET_ROYALTIES_LIST_FAIL],
  promise: (client) => client.get(`/royalties-lists`)
})

export const getContentCreator = (value) => ({
  types: [type.GET_CONTENT_CREATOR, type.GET_CONTENT_CREATOR_SUCCESS, type.GET_CONTENT_CREATOR_FAIL],
  promise: (client) => client.get(`/content-creators/getList`)
})

export const createContentCreator = (value) => ({
  types: [type.CREATE_CONTENT_CREATOR, type.CREATE_CONTENT_CREATOR_SUCCESS, type.CREATE_CONTENT_CREATOR_FAIL],
  promise: (client) => client.post(`/content-creators`, value)
})

export const createNewTag = (value) => ({
  types: [type.CREATE_NEW_TAG, type.CREATE_NEW_TAG_SUCCESS, type.CREATE_NEW_TAG_FAIL],
  promise: (client) => client.post(`/tags`, value)
})
export const createNewSeries = (value) => ({
  types: [type.CREATE_NEW_SERIES, type.CREATE_NEW_SERIES_SUCCESS, type.CREATE_NEW_SERIES_FAIL],
  promise: (client) => client.post(`/tags`, value)
})

export const getPennames = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [type.GET_PENNAMES, type.GET_PENNAMES_SUCCESS, type.GET_PENNAMES_FAIL],
    promise: client => client.get(`/contentpennames?_sort=_id:DESC${queryString}`)
  };
};

export const createPennames = value => {
  return {
    types: [type.CREATE_PENNAMES, type.CREATE_PENNAMES_SUCCESS, type.CREATE_PENNAMES_FAIL],
    promise: client => client.post(`/contentpennames`, value)
  };
};


export const getPhotographers = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [type.GET_PHOTO, type.GET_PHOTO_SUCCESS, type.GET_PHOTO_FAIL],
    promise: client => client.get(`/contentphotos?_sort=_id:DESC${queryString}`)
  };
};

export const createPhotographers = value => {
  return {
    types: [type.CREATE_PHOTO, type.CREATE_PHOTO_SUCCESS, type.CREATE_PHOTO_FAIL],
    promise: client => client.post(`/contentphotos`, value)
  };
};

export const getVideos = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [type.GET_VIDEO, type.GET_VIDEO_SUCCESS, type.GET_VIDEO_FAIL],
    promise: client => client.get(`/contentvideos?_sort=_id:DESC${queryString}`)
  };
};

export const createVideos = value => {
  return {
    types: [type.CREATE_VIDEO, type.CREATE_VIDEO_SUCCESS, type.CREATE_VIDEO_FAIL],
    promise: client => client.post(`/contentvideos`, value)
  };
};

export const getDesigners = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [type.GET_DESIGNER, type.GET_DESIGNER_SUCCESS, type.GET_DESIGNER_FAIL],
    promise: client => client.get(`/contentdesigners?_sort=_id:DESC${queryString}`)
  };
};
export const createDesigners = value => {
  return {
    types: [type.CREATE_DESIGNER, type.CREATE_DESIGNER_SUCCESS, type.CREATE_DESIGNER_FAIL],
    promise: client => client.post(`/contentdesigners`, value)
  };
};

export const getSources = filters => {
  let queryString = filtersToQueryString(filters);
  return {
    types: [type.GET_SOURCE, type.GET_SOURCE_SUCCESS, type.GET_SOURCE_FAIL],
    promise: client => client.get(`/contentsources?_sort=_id:DESC${queryString}`)
  };
};

export const createSources = value => {
  return {
    types: [type.CREATE_SOURCE, type.CREATE_SOURCE_SUCCESS, type.CREATE_SOURCE_FAIL],
    promise: client => client.post(`/contentsources`, value)
  };
};



export const createEditorV = value => {
  return {
    types: [type.CREATE_NEW_EDITOR, type.CREATE_NEW_EDITOR_SUCCESS, type.CREATE_NEW_EDITOR_FAIL],
    promise: client => client.post(`/royalties-editors`, value)
  };
};
export const createPhotoV = value => {
  return {
    types: [type.CREATE_NEW_PHOTO, type.CREATE_NEW_PHOTO_SUCCESS, type.CREATE_NEW_PHOTO_FAIL],
    promise: client => client.post(`/royalties-photographers`, value)
  };
};

