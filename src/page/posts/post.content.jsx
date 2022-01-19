import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../store/action/post'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import * as fileActions from '../../store/action/file'
import { validateCreatePostForm } from '../../utils/formValidation'
import * as _ from 'lodash'
import TitleTab from 'src/components/posts/tab/title-tab'
import DescriptionTab from 'src/components/posts/tab/description-tab'
import ContentTab from 'src/components/posts/tab/content-tab'
import ThumbnailTab from 'src/components/posts/tab/thumbnail-tab'
import CoverTab from 'src/components/posts/tab/cover-tab'
import OptionsTab from 'src/components/posts/tab/options-tab'
import CategoryTab from 'src/components/posts/tab/category-tab'
import TagTab from 'src/components/posts/tab/tag'
import ContentCreatorTab from 'src/components/posts/tab/content-creator-tab'
import GioXuatBanTab from 'src/components/posts/tab/gio-xuat-ban-tab'
import ActionsPost from '../../components/posts/actions-post'
import localStorage from '../../utils/local-storage'
import checkCondition from '../../utils/check-condition'
import "./content.css";
import ReactDOM from "react-dom";
import RoyaltiesTab from '../../components/posts/tab/royalties-tab'

import ScreenSize from 'src/services/screenSize';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ApiService from "../../services/ApiService";

import decodeUriComponent from 'decode-uri-component';
import { removeUselessChar, udpateLogPost } from "../../utils/common"
import slug from 'slug'

const validate = values => {
  return validateCreatePostForm(values, false);
};

const _user = localStorage.get("_user");
class PostContent extends Component {
  intervalID = 0;
  layoutPC3 = false;
  constructor(props) {
    super(props);
    this.state = {
      idleTime: 0,
      idleTimeMax: 30,
      pass: false,
      createdPost: false,
      selectedFile: {},
      willChangePage: false,
      isLocking: false,
      currentPost: null,
      listPosttype: null, currentTab: 1, currentStatus: 'drafting', getEditorData: false,
      typepage: props.typepage, clickingTab: true,
      listTab: {
        title: { tabName: 'title', error: true, tagNumber: 1, classname: ['nav-link', ''], requireText: 'Tiêu đề bài viết' },
        description: { tabName: 'description', error: true, tagNumber: 2, classname: ['nav-link', ''], requireText: 'Tóm tắt nội dung' },
        content: { tabName: 'content', error: true, tagNumber: 3, classname: ['nav-link', ''], requireText: 'Nội dung' },
        contentlink: { tabName: 'contentlink', error: false, tagNumber: 10, classname: ['nav-link', ''], requireText: 'Nội dung External link' },
        nhaycam: { tabName: 'nhaycam', error: false, tagNumber: 11, classname: ['nav-link', ''], requireText: 'Từ nhạy cảm' },
        thumbnail: { tabName: 'thumbnail', error: true, tagNumber: 4, classname: ['nav-link', ''], requireText: 'Thumbnail' },
        category: { tabName: 'category', error: true, tagNumber: 5, classname: ['nav-link', ''], requireText: 'Chuyên mục' },
        tag: { tabName: 'tag', error: true, tagNumber: 6, classname: ['nav-link', ''], requireText: 'Tag' },
        penname: { tabName: 'penname', error: true, tagNumber: 7, classname: ['nav-link', ''], requireText: 'Bút danh' },
        money: { tabName: 'money', error: false, tagNumber: 8, classname: ['nav-link', 'tab-require-status-success'], requireText: 'Chấm nhuận' },
        log: { tabName: 'log', error: false, tagNumber: 9, classname: ['nav-link', 'tab-require-status-success'], requireText: 'Nhật ký' },
        // cover: { tabName: 'cover', error: false, tagNumber: 10, classname: ['nav-link', 'tab-require-status-success'], requireText: 'Ảnh Cover' },
      },
      categoryHeight: 0,
      canAccess: false,
      currentId: "",
      isPr: false,
      scheduleDate: null
    };
    this.layoutPC3 = ScreenSize.isBiggerThan1366;
  }

  componentDidMount() {
    const { content, post, router } = this.props;
    this.setState({ currentPost: content, canAccess: true, isPr: content.is_pr }, () => {

      this.setDataForm(content);
      this.intervalID = setInterval(() => {
        this.checkRequireData(content, 0);
      }, 1500);

      //auto save 60s
      this.intervalID2 = setInterval(() => {
        if (post.currentPost.posttype.type_code == 'draft') {
          let passCondition = this.checkRequireData(post.currentPost, post.currentTabPost);
          //comment de test socket 
          this.actionForPost(passCondition, false);
        }
      }, 60000);
    });

  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    clearInterval(this.intervalID2);
    if (this.state.canAccess) {
      // this.handleLockPost(false)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { post: nextPost } = nextProps;
    const { post } = this.props;

    if (post.updatePostStatus !== nextPost.updatePostStatus && nextPost.updatePostStatus === 2) {
      if (!this.state.clickingTab) {
        if ((post.currentPost.editor_type === 'special' || post.currentPost.editor_type === 'mini') && post.currentPost.posttype.type_code === 'draft') {
        } else {
          if(!post.currentPost.is_live){
            this.goOutThispage('', '/posts');
          }else{
            toast.success('Đã thêm nội dung');
          }
            
        }
      } else {
        // this.handleLockPost(true)
      }
    }

    if (post.currentTabPost !== nextPost.currentTabPost) {
      this.setState({ currentPost: nextPost.currentPost, currentTab: nextPost.currentTabPost }, () => {
        let passCondition = this.checkRequireData(nextPost.currentPost, post.currentTabPost);
        this.actionForPost(passCondition, false);
      })
    }

    if (post.createPostStatus !== nextPost.createPostStatus && nextPost.createPostStatus === 2) {
      let currentPost = nextPost.currentPost;
      localStorage.set('_newPost', currentPost);
      this.setState({ currentPost });
    }
  }

  goOutThispage(message, page) {
    if (this.state.canAccess) {
      // 
    }
    // this.props.router.push(page);
    this.handleLockPost(false)
    window.location.href = page;
  }

  handleLockPost(isLock) {
    let data = !isLock ? {
      'editing': null,
      'editing_status': false,
      'start_editing': null
    } : {
        'editing': localStorage.get("_user"),
        'editing_status': true,
        'start_editing': new Date()
      }
    if (this.state.currentPost) {
      ApiService.put(`/posts/${this.state.currentPost.id}`, data);
    }

  }
  setDataForm(content) {
    this.props.dispatch(change('formPostEdit', 'title', content.title));
    this.props.dispatch(change('formPostEdit', 'url', content.url));
    this.props.dispatch(change('formPostEdit', 'keyword', content.keyword));
    this.props.dispatch(change('formPostEdit', 'sourcename', content.sourcename));
    this.props.dispatch(change('formPostEdit', 'title_google', content.title_google));
    this.props.dispatch(change('formPostEdit', 'description_google', content.description_google));
    this.props.dispatch(change('formPostEdit', 'description', content.description));


  }

  checkRequireData(contentPost, tab = 0) {
    let { listTab } = this.state
    let classError = 'tab-require-status-error';
    let classSuccess = 'tab-require-status-success';

    for (const key in listTab) {

      if (listTab.hasOwnProperty(key) && (listTab[key].tagNumber == tab || tab == 0)) {
        if (checkCondition({
          type: listTab[key].tabName,
          content: this.state.currentPost,
          ignoreList: [
            ...(this.state.isPr ? ['penname'] : []),
          ]
        })) {
          listTab[key].error = true;
          listTab[key].classname[1] = classError;
        } else {
          listTab[key].error = false;
          listTab[key].classname[1] = classSuccess;
        }
      }
    }

    this.setState({ listTab })
    let passCondition = _.filter(listTab, { 'error': false });

    if (passCondition.length === 11) {
      // console.log(passCondition)
      this.state.pass = true;
    }

    return passCondition;
  }

  goTab(tab) {
    const { post: { currentPost } } = this.props;
    if (tab !== this.state.currentTab) {
      this.setState({ clickingTab: true });
      this.props.changeTab(tab);
    }
  }

  updatePost() {
    const { post: { currentPost } } = this.props;
    this.actionBeforeUpdatePost(currentPost);
  }

  savePost(status) {
    console.log('savePost')
    const { post: { currentPost }, config: { listPosttyle } } = this.props;
    const posttype = _.find(listPosttyle, { 'type_code': status });

    let { currentStatus } = this.state;
    currentStatus = posttype.type_code;
    this.setState({ currentStatus });
    currentPost.posttype = posttype._id;
    this.actionBeforeUpdatePost(currentPost);
  }

  updateStatusFromClickButton = (data) => {
    this.setState({ clickingTab: false });
    const { posttype, time, should_check_condition, new_action } = data
    let { post: { currentPost }, fields } = this.props;

    const { title, url, title_google, keyword, description, description_google, sourcename } = fields;
    currentPost.keyword = keyword ? keyword : ''
    currentPost.title_google = title_google ? removeUselessChar(title_google) : ''
    currentPost.url = url ? url : ''
    currentPost.title = title ? removeUselessChar(title) : ''
    currentPost.description = description ? removeUselessChar(description) : ''
    currentPost.description_google = description_google ? removeUselessChar(description_google) : ''
    currentPost.sourcename = sourcename ? sourcename : ''
    currentPost.clickButton = true;
    currentPost.log_action = `${currentPost.log_action}${new_action}`;
    let passCondition = this.checkRequireData(currentPost, 0);

    let content = currentPost.content;

    let pattern = content.match(/<img([^>]*?)src\s*=\s*(['"])([^\2]*?)\2\1*>/g);

    let imageInExternal = this.imageInExternal(pattern);

    if(imageInExternal.exImg.length > 0){
      this.actionForExternalImg(currentPost, imageInExternal.exImg);
    }
    if(imageInExternal.inImg.length > 0 && currentPost.posttype.type_code == 'ready'){
      this.actionForInternalImg(currentPost, imageInExternal.inImg);
    }

    setTimeout(() => {
      if (currentPost.posttype.type_code !== 'draft') {
        if (should_check_condition == "yes") {
          if (passCondition.length < 11) {
            toast.error('Vui lòng kiểm tra lại điều kiện')
          } else {
            currentPost.posttype = posttype;
            if (time)
              currentPost.scheduleAt = time;
              console.log(currentPost);
              
            this.actionBeforeUpdatePost(currentPost);
          }
        } else {
          currentPost.posttype = posttype;
          if (time)
            currentPost.scheduleAt = time;
          this.actionBeforeUpdatePost(currentPost);
        }
      }
  
      if (currentPost.posttype.type_code === 'draft') {
        if (posttype.type_code !== 'draft') {
          if (passCondition.length === 11) {
            currentPost.posttype = posttype;
            this.actionBeforeUpdatePost(currentPost);
          } else {
            toast.error('Vui lòng kiểm tra lại điều kiện')
          }
        } else {
          if (localStorage.get('_newPost')) {
            localStorage.set('_newPost', currentPost);
          }
          this.actionForPost(passCondition, true);
        }
  
      }
    }, (imageInExternal.exImg.length)*1000 );
  }

  imageInExternal(pattern){
    let inImg = [];
    let exImg = [];
    if(pattern && pattern.length > 0){
      pattern.forEach((pat, index) => {
        if (pat.includes('saostar.vn') || pat.includes('catscdn.vn')) {
          inImg.push(pat);
        }else{
          exImg.push(pat);
        }
      })
    }
    
    return {
      'inImg': inImg,
      'exImg': exImg
    }
  }

  actionForExternalImg = (currentPost, pattern) => {
    let contentWillUpdate = currentPost.content;
    let tmp_id = currentPost.tmp_id;
    let type = currentPost.editor_type;

    pattern.forEach((pat, index) => {

      let srcWithQuotes = pat.match(/src\=([^\s]*)\s/)[1];
      let imageUrl = srcWithQuotes.substring(1, srcWithQuotes.length - 1);
      let decodeImg = imageUrl.replace(/&amp;/g, "&");
      decodeImg = decodeUriComponent(decodeImg);

      let fileName = slug(currentPost.title + ' ' + index) + this.checkExtensions(decodeImg);
      this.toDataUrl(decodeImg, (myBase64) => {

      });
    });

    if(contentWillUpdate != currentPost.content ){
      currentPost.content = contentWillUpdate;
      ApiService.put(`posts/${currentPost.id}`, currentPost);
    }

  }

  actionForInternalImg  = (currentPost, pattern) => {
    let contentWillUpdate = currentPost.content;
    pattern.forEach((pat, index) => {

      let imageUrl = pat.split('src="').pop().split('"')[0];
      let decodeImg = imageUrl.replace(/&amp;/g, "&");
      decodeImg = decodeUriComponent(decodeImg);

      // handle for alt
      if(!pat.includes(`alt="`)){
        let newImg = `<img alt="${currentPost.title} Ảnh ${index + 1}" src="${decodeImg}">`;
        contentWillUpdate = contentWillUpdate.replace(pat, newImg);
      }
    });

    if(contentWillUpdate != currentPost.content ){
      currentPost.content = contentWillUpdate;
      ApiService.put(`posts/${currentPost.id}`, currentPost);
    }

  }

  checkExtensions(url){
    if(url.includes('.jpg')){
      return '.jpg'
    }else if(url.includes('jpeg')){
      return '.jpeg'
    }else if(url.includes('.png')){
      return '.png'
    }else{
      return '.jpg'
    }
  }


  b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    b64Data = _.split(b64Data, ';base64,');
    const byteCharacters = atob(b64Data[1]);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  toDataUrl(url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function() {
          let reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
  }

  genePostUrl(currentPost) {
    let url = "/";
    if (currentPost.primary_category) {
      url += currentPost.primary_category.url + '/';
    }
    if (currentPost.url) {
      url += currentPost.url;
    }
    return {
      'url': url,
      'increment_id': moment().format('YYYYMMDDhmmss')
    }
    // url += moment().format('YYYYMMDDhmmss');
    // // url += _user.increment_id || _user._id;
    // // console.log(url);

    // return url;
  }


  actionBeforeUpdatePost(currentPost) {


    // neu bai post sap dang,  set current user vao publisher chi lan dau lan sau ko update
    if (currentPost.posttype.type_code == "ready") {
      if (!currentPost.publisher) {
        currentPost.publisher = localStorage.get("_user");
      }
    }
    // neu bai post len lich,  update current user vao 
    if (currentPost.posttype.type_code == "schedule") {
      currentPost.publisher = localStorage.get("_user");
    }

    let datagenePostUrl = this.genePostUrl(currentPost);
    if(currentPost.increment_id && currentPost.increment_id != 0){
      currentPost.post_url = datagenePostUrl.url + '-' + currentPost.increment_id + '.html';
    }else{
      currentPost.post_url = datagenePostUrl.url + '-' + datagenePostUrl.increment_id + '.html';
      currentPost.increment_id = datagenePostUrl.increment_id;
    }
    
    currentPost.modifiedAt = new Date();
    // console.log(currentPost);
    delete currentPost.editing;
    delete currentPost.editing_status;
    delete currentPost.start_editing;
    this.props.updatePost(currentPost);
  }



  // neu co post id:
  // nếu chuyển tab: update post
  // nếu bấm nút: 

  // draft => (draft, waiting)
  // waiting => (schedule, ready, draft)
  // ready => (trash, draft)
  // schedule => (ready, draft)
  // trash => (no action)

  // => draft => update post  (ready, schedule)
  // => !ready => check đủ điều kiên => update post
  //           => nếu không đủ đk =>

  // neu ko co post id:
  // -> chuyen tab => update currentpost
  // -> phu hop 4 dieu kien => tạo post
  // -> phu hợp dưới 4 đk => lưu storage => reload lại lấy từ storage

  actionForPost(passCondition, fromClickButton = false) {
    const { post: { currentPost }, fields } = this.props;

    if (!fromClickButton) {
      currentPost.editing_status = true;
      currentPost.editing = localStorage.get("_user");
      currentPost.start_editing = new Date();
      if (!currentPost.id) {

        if (passCondition.length >= 3) {
          this.props.createPost(currentPost);
        }

      } else {
        localStorage.set('_current_id', currentPost.id);
        this.actionBeforeUpdatePost(currentPost);
      }

    } else {
      currentPost.editing_status = false;
      currentPost.editing = null;
      currentPost.start_editing = null;
      if (!currentPost.id) {

        if (passCondition.length >= 3) {
          this.props.createPost(currentPost);
        }

      } else {
        this.actionBeforeUpdatePost(currentPost);
      }

    }
    if (localStorage.get('_newPost')) {
      localStorage.set('_newPost', currentPost);
    }

  }

  

  handleSelectEditorType(type) {
    // savePost('draft');
    // console.log('change type', type)
  }

  handlePr = value => {
    this.setState({ isPr: value });
  }

  callSuggestAI = data => {
    console.log(data);

  }

  handleSetScheduleDate = date => {
    this.setState({ scheduleDate: date });
  }

  render() {

    let { currentPost, scheduleDate } = this.state;
    let readOnly = false;

    let layoutName = '';
    let editor_type = currentPost ? currentPost.editor_type : '';
    if (this.props.isMobile) {
      layoutName = 'layout-mobile';
    } else {
      if (currentPost && editor_type === 'normal') {
        if (this.layoutPC3) {
          layoutName = 'layout-pc-3';
        } else {
          layoutName = 'layout-pc-2';
        }
      } else {
        layoutName = 'layout-pc';
      }
    }

    return (
      <>

        <div className={"card card-primary card-outline post-create " + (layoutName)}>
          <div className="card-header">
            <h3 className="card-title">
              <i className="fas fa-edit"></i>&nbsp; Bài viết {(this.state.currentPost && this.state.currentPost.posttype.title) ? `(${this.state.currentPost.posttype.title})` : ''}
            </h3>
            {this.state.currentPost && <ActionsPost listTab={this.state.listTab} layoutName={layoutName} condition={this.state.pass} handleUpdateStatus={this.updateStatusFromClickButton} postdata={this.state.currentPost} scheduleDate={this.state.scheduleDate} />}
          </div>
          <div className="card-body">
            <div className="row">
              {(layoutName === 'layout-pc') &&
                <div className={"col-12 " + (editor_type === 'special' || editor_type === 'mini' ? 'col-md-12 mb-4' : 'col-md-1')}>
                  <div className={"nav nav-tabs h-100 " + (editor_type === 'special' || editor_type === 'mini' ? 'flex-row' : 'flex-column')} id="vert-tabs-tab" role="tablist" aria-orientation="vertical">
                    <a className={`${_.join(this.state.listTab.title.classname, ' active ')}`} id="vert-tabs-1-tab" onClick={() => this.goTab(1)} data-toggle="pill" href="#vert-tabs-1" role="tab" aria-controls="vert-tabs-1" aria-selected="false">Tiêu đề bài viết</a>

                    <a className={`${_.join(this.state.listTab.description.classname, ' ')}`} id="vert-tabs-2-tab" onClick={() => this.goTab(2)} data-toggle="pill" href="#vert-tabs-2" role="tab" aria-controls="vert-tabs-2" aria-selected="false">Tóm tắt nội dung</a>

                    <a className={`${_.join(this.state.listTab.content.classname, ' ')}`} id="vert-tabs-3-tab" onClick={() => this.goTab(3)} data-toggle="pill" href="#vert-tabs-3" role="tab" aria-controls="vert-tabs-3" aria-selected="false">Nội dung bài viết</a>

                    {currentPost &&
                      ((currentPost.posttype.type_code === 'schedule' || currentPost.posttype.type_code === 'waiting') ||
                        (currentPost.posttype.type_code === 'draft' && _user.canPublish)
                      ) &&
                      <a className="nav-link tab-require-status-success" id="vert-tabs-10-tab" onClick={() => this.goTab(10)} data-toggle="pill" href="#vert-tabs-10" role="tab" aria-controls="vert-tabs-10" aria-selected="false">Giờ xuất bản</a>
                    }

                    <a className={`${_.join(this.state.listTab.category.classname, ' ')}`} id="vert-tabs-5-tab" onClick={() => this.goTab(5)} data-toggle="pill" href="#vert-tabs-5" role="tab" aria-controls="vert-tabs-5" aria-selected="false">Chuyên mục</a>

                    <a className={`${_.join(this.state.listTab.tag.classname, ' ')}`} id="vert-tabs-6-tab" onClick={() => this.goTab(6)} data-toggle="pill" href="#vert-tabs-6" role="tab" aria-controls="vert-tabs-6" aria-selected="false">Tag</a>

                    <a className={`${_.join(this.state.listTab.thumbnail.classname, ' ')}`} id="vert-tabs-4-tab" onClick={() => this.goTab(4)} data-toggle="pill" href="#vert-tabs-4" role="tab" aria-controls="vert-tabs-4" aria-selected="false">Thumbnail</a>

                    {
                      editor_type === 'mini' &&
                      <a className="nav-link tab-require-status-success" id="vert-tabs-12-tab" onClick={() => this.goTab(12)} data-toggle="pill" href="#vert-tabs-12" role="tab" aria-controls="vert-tabs-12" aria-selected="false">Ảnh Cover</a>
                    }

                    <a className={`${_.join(this.state.listTab.penname.classname, ' ')}`} id="vert-tabs-7-tab" onClick={() => this.goTab(7)} data-toggle="pill" href="#vert-tabs-7" role="tab" aria-controls="vert-tabs-7" aria-selected="false">Bút danh</a>

                    <a className={`${_.join(this.state.listTab.money.classname, ' ')}`} id="vert-tabs-8-tab" data-toggle="pill" href="#vert-tabs-8" role="tab" aria-controls="vert-tabs-8" aria-selected="false">Nhuận bút</a>

                    {/* <a className={`${_.join(this.state.listTab.log.classname, ' ')}`} id="vert-tabs-9-tab" data-toggle="pill" href="#vert-tabs-9" role="tab" aria-controls="vert-tabs-9" aria-selected="false">Nhật ký</a> */}


                    <a className="nav-link tab-require-status-success" id="vert-tabs-11-tab" data-toggle="pill" href="#vert-tabs-11" role="tab" aria-controls="vert-tabs-11" aria-selected="false">Tuỳ chỉnh</a>
                  </div>
                </div>
              }
              <div className={"col-12 " + (editor_type === 'special' || editor_type === 'mini' ? ' col-md-12' : '') + (editor_type === 'mini' ? ' col-md-11' : '')}>
                <div className={`tab-content ${readOnly ? 'disable-tab' : ''}`} id="vert-tabs-tabContent">


                  <div className={"tab-pane text-left fade show active " + (layoutName === 'layout-pc-2' ? 'col-8' : '') + (layoutName === 'layout-pc-3' ? 'col-3' : '')} id="vert-tabs-1" role="tabpanel" aria-labelledby="vert-tabs-1-tab">
                    <TitleTab typepage={this.props.typepage} layoutName={layoutName} checkClass={`${_.join(this.state.listTab.title.classname, ' ')}`} callsuggestai={() => this.callSuggestAI} />
                  </div>
                  <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active ') + (layoutName === 'layout-pc-2' ? ' col-8' : '') + (layoutName === 'layout-pc-3' ? 'col-3' : '')} id="vert-tabs-2" role="tabpanel" aria-labelledby="vert-tabs-2-tab">
                    <DescriptionTab layoutName={layoutName} checkClass={`${_.join(this.state.listTab.description.classname, ' ')}`} />
                  </div>
                  <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active ') + (layoutName === 'layout-pc-2' ? ' col-8' : '') + (layoutName === 'layout-pc-3' ? 'col-6 col-center' : '')} id="vert-tabs-3" role="tabpanel" aria-labelledby="vert-tabs-3-tab">
                    {currentPost && <ContentTab onSelectEditorType={this.handleSelectEditorType} content={currentPost} layoutName={layoutName} checkClass={`${_.join(this.state.listTab.content.classname, ' ')}`} isPr={this.handlePr} />}
                  </div>

                  {(layoutName === 'layout-pc-2' || layoutName === 'layout-pc-3') &&
                    <div className="col-right col-3">

                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')}
                        id="vert-tabs-10" role="tabpanel" aria-labelledby="vert-tabs-10-tab"
                      >
                        <GioXuatBanTab currentPost={currentPost} setScheduleDate={this.handleSetScheduleDate} _user={_user} />
                      </div>

                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')}
                        id="vert-tabs-5" role="tabpanel" aria-labelledby="vert-tabs-5-tab"
                      >
                        <CategoryTab layoutName={layoutName} checkClass={`${_.join(this.state.listTab.category.classname, ' ')}`} />
                      </div>

                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')}
                        id="vert-tabs-6" role="tabpanel" aria-labelledby="vert-tabs-6-tab"
                      >
                        <TagTab layoutName={layoutName} checkClass={`${_.join(this.state.listTab.tag.classname, ' ')}`} />
                      </div>
                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')} id="vert-tabs-4" role="tabpanel" aria-labelledby="vert-tabs-4-tab">
                        {this.state.currentPost && <ThumbnailTab content={this.state.currentPost} layoutName={layoutName} checkClass={`${_.join(this.state.listTab.thumbnail.classname, ' ')}`} />}
                      </div>


                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')} id="vert-tabs-11" role="tabpanel" aria-labelledby="vert-tabs-11-tab">
                        {this.state.currentPost && <OptionsTab content={this.state.currentPost} layoutName={layoutName} role={_user.role.type} />}
                      </div>
                    </div>

                  }

                  {(layoutName === 'layout-pc' || layoutName === 'layout-mobile') &&
                    <>
                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')}
                        id="vert-tabs-10" role="tabpanel" aria-labelledby="vert-tabs-10-tab"
                      >
                        <GioXuatBanTab currentPost={currentPost} setScheduleDate={this.handleSetScheduleDate} _user={_user} />

                      </div>

                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')}
                        id="vert-tabs-5" role="tabpanel" aria-labelledby="vert-tabs-5-tab"
                      >
                        <CategoryTab layoutName={layoutName} checkClass={`${_.join(this.state.listTab.category.classname, ' ')}`} />
                      </div>

                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')}
                        id="vert-tabs-6" role="tabpanel" aria-labelledby="vert-tabs-6-tab"
                      >
                        <TagTab layoutName={layoutName} checkClass={`${_.join(this.state.listTab.tag.classname, ' ')}`} />
                      </div>
                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')} id="vert-tabs-4" role="tabpanel" aria-labelledby="vert-tabs-4-tab">
                        {this.state.currentPost && <ThumbnailTab content={this.state.currentPost} layoutName={layoutName} checkClass={`${_.join(this.state.listTab.thumbnail.classname, ' ')}`} />}
                      </div>

                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')} id="vert-tabs-12" role="tabpanel" aria-labelledby="vert-tabs-12-tab">
                        {this.state.currentPost && <CoverTab content={this.state.currentPost} layoutName={layoutName} />}
                      </div>

                      <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active') + (layoutName === 'layout-pc-2' ? ' col-12' : '')} id="vert-tabs-11" role="tabpanel" aria-labelledby="vert-tabs-11-tab">
                        {this.state.currentPost && <OptionsTab content={this.state.currentPost} layoutName={layoutName} role={_user.role.type} />}
                      </div>
                    </>
                  }

                  <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active ') + (layoutName === 'layout-pc-2' ? ' col-8' : '') + (layoutName === 'layout-pc-3' ? 'col-3' : '')} id="vert-tabs-7" role="tabpanel" aria-labelledby="vert-tabs-7-tab">
                    <ContentCreatorTab isPr={this.state.isPr} layoutName={layoutName} checkClass={`${_.join(this.state.listTab.penname.classname, ' ')}`} />
                  </div>
                  <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active ') + (layoutName === 'layout-pc-2' ? ' col-8' : '') + (layoutName === 'layout-pc-3' ? 'col-3' : '')}
                    id="vert-tabs-8" role="tabpanel" aria-labelledby="vert-tabs-8-tab">
                    <RoyaltiesTab post={this.state.currentPost} layoutName={layoutName} checkClass={`${_.join(this.state.listTab.penname.classname, ' ')}`} />
                  </div>
                  {/* <div className={"tab-pane fade " + (layoutName === 'layout-pc' ? '' : ' show active ') + (layoutName === 'layout-pc-2' ? ' col-8' : '') + (layoutName === 'layout-pc-3' ? 'col-3' : '')} id="vert-tabs-9" role="tabpanel" aria-labelledby="vert-tabs-9-tab">
                    <div className={(layoutName !== 'layout-pc' ? 'row card' : '')}>
                      {
                        layoutName !== 'layout-pc' &&
                        <div className={"card-header col-12 tab-require-status-success"}>
                          <h4 className="card-title">Nhật ký</h4>
                          <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                              <i className="fas fa-minus"></i>
                            </button>
                          </div>
                        </div>
                      }
                      <div className="card-body col-12">
                        Nhật ký: not ready
                    </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  }
};


const selector = formValueSelector('formPostEdit');
PostContent = reduxForm({
  form: 'formPostEdit'
})(PostContent)

export default connect(store => {
  return {
    login: store.loginInfo,
    config: store.config,
    post: store.post,
    fileUpload: store.fileUpload,
    form: store.formPostEdit,
    router: store.router,
    fields: selector(store, 'title', 'title_google', 'url', 'keyword', 'sourcename', 'description_google', 'description')
  };
}, dispatch => {
  return {
    setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    uploadFile: (value) => { dispatch(fileActions.uploadFile(value)) },
    createPost: (value) => { dispatch(postActions.createPost(value)) },
    updatePost: (value) => { dispatch(postActions.updatePost(value)) },
    changeTab: (value) => { dispatch(postActions.changeTab(value)) },
    changeFieldValue: (field, value) => { dispatch(change('formPostEdit', field, value)) },
  }
})(PostContent)
