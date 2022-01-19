import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../../store/action/post'
import * as configActions from '../../../../store/action/config'
import Select from 'react-select'
import * as _ from 'lodash'
import localStorage from '../../../../utils/local-storage'
import AddContentCreator from '../../add-content-creator'
import { renderFormField, renderTextAreaField } from '../../../../utils/reduxField'
import { DraggableAreasGroup } from 'react-draggable-tags'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import { validateCreatePostForm } from '../../../../utils/formValidation'
import slug from 'slug'
import AsyncCreatableSelect from 'react-select/async-creatable';
import CreatableSelect from 'react-select/creatable';
import ApiService from "../../../../services/ApiService";
import { filtersToQueryString } from "../../../../utils/post-filter";
class CreatorItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      selectedValue: props.selectedValue,
      options: props.options || [],
      isClearable: props.isClearable,
      placeholder: props.placeholder,
      label: props.label,
      posttype: props.posttype,
      valueinstore: props.valueinstore,
      isMulti: props.ismulti || false,
      isLoading: false,
      newapi: props.newapi || "",
      inputValue: '',
      filters: {
        page: {
          fieldName: "_start",
          value: "1"
        },
        limit: {
          fieldName: "_limit",
          value: "50"
        },
        search: {
          fieldName: "slug_contains",
          value: ""
        },
      },
      listType: {
        penname: { tabName: 'penname', placeholder: "Chọn bút danh", label: "Bút danh", classname: ['nav-link', ''] },
        photo: { tabName: 'photo', placeholder: "Chọn photo", label: "Photo", classname: ['nav-link', ''] },
        video: { tabName: 'video', placeholder: "Chọn video", label: "Video", classname: ['nav-link', ''] },
        designer: { tabName: 'designer', placeholder: "Chọn designer", label: "Designer", classname: ['nav-link', ''] },
        source: { tabName: 'source', placeholder: "Chọn nguồn", tlabel: "Nguồn", classname: ['nav-link', ''] },
        source: { tabName: 'royaltieseditor', placeholder: "Chọn tên biên tập viên", tlabel: "Editor", classname: ['nav-link', ''] },
        source: { tabName: 'royaltiesphoto', placeholder: "Chọn tên nhiếp ảnh", tlabel: "Photo", classname: ['nav-link', ''] },


      }
    }
  }
  componentDidMount() {
    this.addFilter('search', '', true);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    const { post: nextPost, config: nextConfig } = nextProps;
    const { post, config } = this.props;
    let { options, posttype, valueinstore, isMulti, selectedValue } = this.state
    const _user = localStorage.get('_user');

    if (nextConfig[valueinstore] && nextConfig[valueinstore].length > 0) {
      let listData = nextConfig[valueinstore];
      // default data
      if(posttype == 'contentpenname' && _user.contentpennames && _user.contentpennames.length > 0){
        listData = _user.contentpennames.concat(listData);
      }
      if(posttype == 'royalties_editor' && _user.royalties_editors && _user.royalties_editors.length > 0){
        listData = _user.royalties_editors.concat(listData);
      }

      listData = listData.map(element => {
        element.value = element.id;
        return element
      });

      listData = _.unionBy(listData, 'id');
      // default data
      options = listData
      let created = _.find(listData, { 'created': true });

      if (created && created.type == this.state.type) {

        if (isMulti) {
          nextPost.currentPost[posttype].push(created)
        } else {
          nextPost.currentPost[posttype] = created._id
        }

        this.setState({ selectedValue: created }, () => {
          toast.success("Đã thêm mới")
          this.addFilter('search', '', true);
          this.props.setCurrentPost(nextPost.currentPost)
        });

      }

      if (posttype == "tags") {
        options = _.orderBy(options, ['user', function (o) {
          return o.label.length;
        }], ["asc", "asc"])
      }
      this.setState({ options, isLoading: false });

    } else {
      this.setState({ isLoading: false });
    }

    if (nextPost.currentPost.tags != selectedValue && posttype == "tags") {
      this.setState({ selectedValue: nextPost.currentPost.tags })
    }

  }

  addFilter(filter, value, execute = true) {
    let filters = this.resetFilters(filter);
    filters[filter].value = value;
    filters.limit.value = 50;
    this.setState({ filters: filters }, () => {
      if (execute) {
        this.props[this.props.functioncall](this.state.filters); 
        // if (this.props.type != ['royalties-editor']) {
                
        // } else {
        //   this.props.get(this.props.type, this.state.filters);
        // }
      }
    }
    );
  }

  resetFilters(filter) {
    let { filters } = this.state;
    if (filter == "search") {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          filters[key].value = "";
        }
      }
    } else {
      filters.page.value = 1;
      filters.limit.value = 50;
      filters.search.value = "";
    }

    return filters;
  }

  promiseOptions = inputValue => new Promise(resolve => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.addFilter('search', slug(inputValue), true);
      this.setState({ isLoading: true });
      resolve(this.filterOptions(inputValue, this.state.type));
    }, 1000);
  });


  filterOptions = (inputValue, type) => {
    return this.state.options.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  handleCreate = (inputValue) => {
    const { post } = this.props;
    let { options, posttype, valueinstore, isMulti } = this.state

    if (!this.props.creatable) {
      return
    } else {
      this.setState({ isLoading: true });

      setTimeout(() => {
        let data = {
          label: inputValue,
          active: true,
          status: true,
          slug: slug(inputValue),
          increment_id: Math.floor(Math.random() * (10000))
        }

        if (this.state.newapi) {
          ApiService.post(`${this.state.newapi}`, data).then(result => {
            result.value = result.id;
            let newData = post.currentPost[posttype];
            if (isMulti) {
              newData.push(result)
              this.setState({ selectedValue: newData }, () => {
                toast.success("Đã thêm mới")
                this.addFilter('search', '', true);
                post.currentPost[posttype] = newData;
                this.props.setCurrentPost(post.currentPost)
              });
            } else {
              newData = result
              this.setState({ selectedValue: newData }, () => {
                toast.success("Đã thêm mới")
                this.addFilter('search', '', true);
                post.currentPost[posttype] = newData.id;
                this.props.setCurrentPost(post.currentPost)
              });
            }
            

          });
        } else {
          this.props[this.props.functioncreate](data)
        }

      }, 500);
    }


  };

  handleOnChange = (value, { action, removedValue }) => {
    const { post: { currentPost } } = this.props;
    let { posttype, isMulti, selectedValue } = this.state
    if (action == 'clear') {
      currentPost[posttype] = null;
       // neu xoa phong vien anh thi xoa luon nhuan but :-s
        
       if(posttype == 'royalties_photographer'){
         currentPost['royalties_photo_value'] = null;
       }
       
      selectedValue = null;
    } else if (action == 'remove-value') {
      if (isMulti) {
        let valueData = _.filter(currentPost[posttype], (item) => {
          return item._id != removedValue._id
        });
        currentPost[posttype] = valueData;
        selectedValue = valueData;
      } else {
        currentPost[posttype] = null;
        selectedValue = null;
      }
    } else if (action == 'select-option') {
      if (isMulti) {
        let objects = value.map(obj => obj);
        currentPost[posttype] = objects;
        selectedValue = value;
      } else {
        currentPost[posttype] = value._id
        selectedValue = value
      }
    }

    this.setState({ selectedValue: selectedValue }, () => { this.props.setCurrentPost(currentPost) });
  };



  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
    if (inputValue && inputValue.length >= 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {

        if(inputValue.includes(',')){
          
          let dataSearch = inputValue.substring(0, inputValue.length - 1);
          this.setState({ inputValue : "" });
          this.handleCreate(dataSearch);
        }else{
          this.addFilter('search', slug(inputValue), true);
          this.setState({ isLoading: true });
        }
       
        
      }, 1000);
    }

  };




  render() {
    const { listType, type, selectedValue, options, isClearable, placeholder, label, isLoading, isMulti, inputValue } = this.state

    return (
      <div className="form-group row">
        <div className="col-12">
          <label>{label}</label>
          <CreatableSelect isLoading={isLoading} value={selectedValue}
            isClearable={isClearable} closeMenuOnSelect={!isMulti} isMulti={isMulti} onChange={this.handleOnChange}
            onInputChange={this.handleInputChange}
            options={options} onCreateOption={this.handleCreate} placeholder={placeholder} createOptionPosition="first"
            inputValue={inputValue} />
        </div>
      </div>

    )
  }

};


export default connect(store => {
  return {
    post: store.post,
    config: store.config,
  };
}, dispatch => {
  return {
    createPost: (value) => { dispatch(postActions.createPost(value)) },
    setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    changeFieldValue: (field, value) => { dispatch(change('formPostCreate', field, value)) },
    getDesigners: (value) => { dispatch(configActions.getDesigners(value)) },
    getPhotographers: (value) => { dispatch(configActions.getPhotographers(value)) },
    getListTag: (value) => { dispatch(configActions.getListTag(value)) },
    getPennames: (value) => { dispatch(configActions.getPennames(value)) },
    getSources: (value) => { dispatch(configActions.getSources(value)) },
    getVideos: (value) => { dispatch(configActions.getVideos(value)) },
    getRoyaltiesEditor: (value) => { dispatch(configActions.getRoyaltiesEditor(value)) },
    getRoyaltiesPhoto: (value) => { dispatch(configActions.getRoyaltiesPhoto(value)) },
    getRoyaltiesList: (value) => { dispatch(configActions.getRoyaltiesList(value)) },
    createPennames: (value) => { dispatch(configActions.createPennames(value)) },
    createDesigners: (value) => { dispatch(configActions.createDesigners(value)) },
    createVideos: (value) => { dispatch(configActions.createVideos(value)) },
    createPhotographers: (value) => { dispatch(configActions.createPhotographers(value)) },
    createSources: (value) => { dispatch(configActions.createSources(value)) },
    createNewTag: (value) => { dispatch(configActions.createNewTag(value)) },
    createNewSeries: (value) => { dispatch(configActions.createNewSeries(value)) },
    createEditorV: (value) => { dispatch(configActions.createEditorV(value)) },
    createPhotoV: (value) => { dispatch(configActions.createPhotoV(value)) },
    create: (type, value) => { dispatch(configActions.create(type, value)) },
    get: (type, value) => { dispatch(configActions.get(type, value)) }
  }
})(CreatorItem)
