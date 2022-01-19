import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../store/action/user'
import * as configActions from '../../store/action/config'
import * as _ from 'lodash'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { change } from 'redux-form'
import slug from 'slug'
import CreatableSelect from 'react-select/creatable';
import ApiService from "../../services/ApiService";
class CreatorItem2 extends Component {
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


    if (nextConfig[valueinstore] && nextConfig[valueinstore].length > 0) {
      let listData = nextConfig[valueinstore].map(element => {
        element.value = element.id;
        return element
      });
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



      this.setState({ options, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }



  }

  addFilter(filter, value, execute = true) {
    let filters = this.resetFilters(filter);
    filters[filter].value = value;
    filters.limit.value = 50;
    this.setState({ filters: filters }, () => {
      if (execute) {
        this.props[this.props.functioncall](this.state.filters); 
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
    const { user } = this.props;
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
            let newData = user.myProfile[posttype];

            
            if (isMulti) {
              newData.push(result)
              this.setState({ selectedValue: newData }, () => {
                toast.success("Đã thêm mới")
                this.addFilter('search', '', true);
                user.myProfile[posttype] = newData;
                this.props.setCurrentUser(user.myProfile)
              });
            } else {
              newData = result
              this.setState({ selectedValue: newData }, () => {
                toast.success("Đã thêm mới")
                this.addFilter('search', '', true);
                user.myProfile[posttype] = newData.id;
                this.props.setCurrentUser(user.myProfile)
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
    const { user: { myProfile } } = this.props;
    let { posttype, isMulti, selectedValue } = this.state
    // console.log(removedValue);
    // console.log(action);
    if (action == 'clear') {
      myProfile[posttype] = null;
      selectedValue = null;
    } else if (action == 'remove-value') {
      if (isMulti) {
        let valueData = _.filter(myProfile[posttype], (item) => {
          return item._id != removedValue._id
        });
        myProfile[posttype] = valueData;
        selectedValue = valueData;
      } else {
        myProfile[posttype] = null;
        selectedValue = null;
      }
    } else if (action == 'select-option') {
      if (isMulti) {
        let objects = value.map(obj => obj);
        myProfile[posttype] = objects;
        selectedValue = value;
        // console.log(value);
        
      } else {
        myProfile[posttype] = value._id
        selectedValue = value
      }
    }

    this.setState({ selectedValue: selectedValue }, () => { this.props.setCurrentUser(myProfile) });
  };



  handleInputChange = (inputValue) => {
    if (inputValue && inputValue.length >= 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // console.log(inputValue);
        
        if(inputValue.includes(',')){
          let dataSearch = inputValue.substring(0, inputValue.length - 1);
          // console.log(dataSearch);
          // await keyEvent(’.my-input’, ‘keyup’, 13);
          this.handleCreate(dataSearch);
        }else{
          this.addFilter('search', slug(inputValue), true);
          this.setState({ isLoading: true });
        }
       
        
      }, 1000);
    }

  };




  render() {
    const { listType, type, selectedValue, options, isClearable, placeholder, label, isLoading, isMulti } = this.state
    console.log(options);
    console.log('selectedValue', selectedValue);
    
    return (

      <div className="form-group row">
        <div className="col-12">
          <label>{label}</label>
          <CreatableSelect isLoading={isLoading} value={selectedValue}
            isClearable={isClearable} closeMenuOnSelect={!isMulti} isMulti={isMulti} onChange={this.handleOnChange}
            onInputChange={this.handleInputChange}
            options={options} onCreateOption={this.handleCreate} placeholder={placeholder} />
        </div>
      </div>

    )
  }

};


export default connect(store => {
  return {
    post: store.post,
    config: store.config,
    user: store.user,
  };
}, dispatch => {
  return {
    setCurrentUser: (value) => { dispatch(userActions.updateMyProfile(value))},   
    changeFieldValue: (field, value) => { dispatch(change('formPostCreate', field, value)) },
    getPennames: (value) => { dispatch(configActions.getPennames(value)) },
    getRoyaltiesEditor: (value) => { dispatch(configActions.getRoyaltiesEditor(value)) },
    createPennames: (value) => { dispatch(configActions.createPennames(value)) },
    createEditorV: (value) => { dispatch(configActions.createEditorV(value)) },

  }
})(CreatorItem2)


