import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../store/action/post'
import * as fileActions from '../../store/action/file'
import * as categoryActions from '../../store/action/category'
import IframeComm from "react-iframe-comm"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DraggableAreasGroup } from 'react-draggable-tags'
import * as _ from 'lodash'
import { renderFormField, renderTextAreaField } from '../../utils/reduxField'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import { validateCreatePostForm } from './../../utils/formValidation'
import Select from 'react-select'
import slug from 'slug'
import ImageUpload from '../../components/util/rotateimage'
import AddContentCreator from 'src/components/posts/add-content-creator'
import AddNewTag from 'src/components/posts/add-new-tag'
import localStorage from '../../utils/local-storage'
import CheckboxGroup from 'react-checkbox-group'
import PostContent from './post.content'
import HeaderMobileComponent from "src/components/layout/header-mobile";
import moment from 'moment';
import ScreenSize from '../../services/screenSize';
import StorageService from '../../services/StorageService';
import { udpateLogPost } from "../../utils/common"

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();


const validate = values => {
  return validateCreatePostForm(values, false);
};

class PostCreate extends Component {
  isMobile = false;
  newLayout = false;
  constructor() {
    super();
    this.state = {
      user: null, config: null,
      createdPost: false, currentTab: 1, previousTab: 1,
      selectedFile: { hor: {}, ver: {} },
      imageUrlHor: null, imageUrlVer: null,
      contentPost: null,
      listCategory: null,
      selectedCategory: null,
      colorBg: ['bg-success', 'bg-warning', 'bg-danger', 'bg-info', 'bg-gradient-secondary', 'bg-gradient-warning'],
      selectedTags: [], listTags: [],
      penname: [], photo: [], video: [], designer: [], source: [],
      selectedPenname: null, selectedPhoto: null, selectedVideo: null, selectedDesigner: null, selectedSource: null,
      listPosttype: null, currentPost: null,
      newLayout: false
    };
    this.isMobile = ScreenSize.isMobile;
    if (this.isMobile) {
      this.state.newLayout = true;
    } else {
      this.state.newLayout = StorageService.get('newLayoutPC');
    }

  }

  componentDidMount() {
    const { config, user } = this.props;
    if (user._id && config.loadConfigStatus == 2) {
      // console.log('run this function componentDidMount');
      this.setState({ user: user, config: config }, () => {
        this.setData(user, config);
      })
    }


    window.addEventListener('resize', () => { this.isMobile = ScreenSize.isMobile });
  }



  UNSAFE_componentWillReceiveProps(nextProps) {
    const { post: nextPost, fileUpload: nextUpload, config: nextConfig, fields: nextFields, user: nextUser } = nextProps;

    const { post } = this.props;
    if (nextUser._id && nextConfig.loadConfigStatus == 2 && !this.state.user && !this.state.config) {
      // console.log('run this function UNSAFE_componentWillReceiveProps');
      this.setState({ user: nextUser, config: nextConfig }, () => {
        this.setData(nextUser, nextConfig);
      })
    }

    // this.getConfigs(nextProps);

    // if(nextLogin.userInfo){
    //   this.setState({user: nextLogin.userInfo})
    //   this.setData(nextLogin.userInfo, nextConfig);
    // }

    // if(nextConfig.loadConfigStatus === 2){     
    //   this.setData(nextLogin.userInfo, nextConfig);
    // } 

    // if(post.createPostStatus !== nextPost.createPostStatus && nextPost.createPostStatus === 2){
    //   let currentPost = nextPost.currentPost;
    //   localStorage.set('_newPost', currentPost); 
    //   this.setState({currentPost});
    // }

    // if(post.updatePostStatus !== nextPost.updatePostStatus && nextPost.updatePostStatus === 2){
    //   let currentPost = nextPost.currentPost;
    //   localStorage.set('_newPost', currentPost); 
    //   this.setState({currentPost});
    // }

  }


  setData(user, config) {
    if (user._id && config.loadConfigStatus == 2) {
      // if (user && user.categories) {
      //   _.map(user.categories, (cat, index) => {
      //     cat.selected = index == 0 ? true : false;
      //   })
      // }
      if (config.listTags) {
        config.listTags.map(tag => {
          tag.color = this.state.colorBg[Math.floor(Math.random() * this.state.colorBg.length)]
        });
      }

      this.setState({
        listTags: config.listTags,
        colorBg: config.colorBg,
        listPosttype: config.listPosttyle,
        listCategory: user.categories
      });

      const _newPost = this.setTempNewPost(user, config)
      if (_newPost) {
        this.setState({ currentPost: _newPost });
        this.props.setCurrentPost(_newPost);
      }

    }

  }



  setTempNewPost(user, config) {
    const _newPost = localStorage.get('_newPost');
    if (false) {
      return _newPost;
    } else {
      let primary_category = user.primary_category;
      if (user && user.categories) {
        _.map(user.categories, (cat, index) => {
          cat.selected = primary_category && primary_category.id == cat.id ? true : false;
        })
      }
      let category = _.filter(user.categories, { 'selected': true });
      let posttype = _.find(config.listPosttyle, { 'type_code': 'draft' });
      const log_action = udpateLogPost('tạo bài viết');
      const data = {
        tmp_id: moment().format('x'),
        title: '',
        content: '',
        editor_type: 'normal',
        keyword: '',
        sourcename: '',
        url: '',
        img_ver: '',
        img_hor: '',
        title_google: '',
        categories: category,
        primary_category: primary_category,
        increment_id: 0,
        description: '',
        description_google: '',
        user: user,
        posttype: posttype,
        tags: [],
        content_creators: [],
        scheduleAt: null,
        log_action: log_action
      };
      localStorage.set('_newPost', data);
      return data;
    }
  }

  switchLayout() {
    const newLayoutPC = StorageService.get('newLayoutPC');
    if (newLayoutPC) {
      this.setState({ newLayout: false });
      StorageService.set('newLayoutPC', false);
    } else {
      this.setState({ newLayout: true });
      StorageService.set('newLayoutPC', true);
    }
  }

  render() {
    return (
      <div className="content-wrapper scrollbar-none">
        <HeaderMobileComponent />

        <section className="content create-content mt-4">
          <div className="container-fluid">
            {this.state.currentPost && <PostContent content={this.state.currentPost} newLayout={this.state.newLayout} isMobile={this.isMobile} typepage="new" />}
          </div>
        </section>
      </div>


    );
  }

};

const selector = formValueSelector('formPostCreate');

PostCreate = reduxForm({
  form: 'formPostCreate',
  validate
})(PostCreate)

export default connect(store => {
  return {
    user: store.loginInfo.userInfo,
    post: store.post,
    config: store.config,
    fileUpload: store.fileUpload,
    form: store.formPostCreate,
    fields: selector(store, 'title', 'title_google', 'url', 'keyword', 'sourcename', 'description_google', 'description')
  };
}, dispatch => {
  return {
    createPost: (value) => { dispatch(postActions.createPost(value)) },
    setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    uploadFile: (value) => { dispatch(fileActions.uploadFile(value)) },
    changeFieldValue: (field, value) => { dispatch(change('formPostCreate', field, value)) },
  }
})(PostCreate)

