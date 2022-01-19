import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'
import * as configActions from '../../../store/action/config'
import Select from 'react-select'
import * as _ from 'lodash'
import localStorage from '../../../utils/local-storage'
import AddContentCreator from '../../../components/posts/add-content-creator'
import { renderFormField, renderTextAreaField } from '../../../utils/reduxField'
import { DraggableAreasGroup } from 'react-draggable-tags'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import { validateCreatePostForm } from '../../../utils/formValidation'
import CreatorItem from './creator-item/creator-item'

const validate = values => {
  return validateCreatePostForm(values, false);
};
class ContentCreatorTab extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    const { post: nextPost, fileUpload: nextUpload, config: nextConfig, fields: nextFields } = nextProps;
    const { post: { currentPost }, fileUpload, fields, config } = this.props;

    if (fields.sourcename !== nextFields.sourcename && nextFields.sourcename) {
      currentPost.sourcename = nextFields.sourcename;
      this.props.setCurrentPost(currentPost);
    }

  }

  render() {
    const { layoutName, checkClass, post: { currentPost }, isPr } = this.props;
    const _user = localStorage.get('_user');
    let valuePenname = currentPost.contentpenname;
    if(!valuePenname){
      valuePenname = _user.contentpennames ? _user.contentpennames[0] : null
      if(valuePenname){
        currentPost.contentpenname = valuePenname;
        this.props.setCurrentPost(currentPost);
      }
      
    }

    
    return (
      <div className={(layoutName !== 'layout-pc' ? 'row card' : '')}>
        {
          layoutName !== 'layout-pc' &&
          <div className={"card-header col-12 " + (checkClass)}>
            <h4 className="card-title">Bút danh</h4>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
        }
        <div className="card-body col-12">
          <div className="row">
            {!isPr &&
              <div className="col-12 col-md-6 col-xl-12 mb-3">

                <CreatorItem creatable={true} functioncreate="createPennames" functioncall="getPennames" newapi="/contentpennames" valueinstore="listPenname" posttype="contentpenname"
                  type="penname" selectedValue={valuePenname} isClearable={true} label="Bút danh" placeholder="Chọn bút danh" />

              </div>
            }
            <div className="col-12 col-md-6 col-xl-12 mb-3">

              <CreatorItem creatable={true} functioncreate="createPhotographers" functioncall="getPhotographers" newapi="/contentphotos" valueinstore="listPhoto" posttype="contentphoto"
                type="photo" selectedValue={currentPost.contentphoto} isClearable={true} label="Photo" placeholder="Chọn photo" />
            </div>

            <div className="col-12 col-md-6 col-xl-12 mb-3">

              <CreatorItem creatable={true} functioncreate="createVideos" functioncall="getVideos" newapi="/contentvideos" valueinstore="listVideo" posttype="contentvideo"
                type="video" selectedValue={currentPost.contentvideo} isClearable={true} label="Video" placeholder="Chọn video" />
            </div>
            <div className="col-12 col-md-6 col-xl-12 mb-3">

              <CreatorItem creatable={true} functioncreate="createDesigners" functioncall="getDesigners" newapi="/contentdesigners" valueinstore="listDesigner" posttype="contentdesigner"
                type="designer" selectedValue={currentPost.contentdesigner} isClearable={true} label="Designer" placeholder="Chọn designer" />
            </div>
            <div className="col-12 col-md-6 col-xl-12 mb-3">
              <CreatorItem creatable={true} functioncreate="createSources" functioncall="getSources" newapi="/contentsources" valueinstore="listSource" posttype="contentsource"
                type="source" selectedValue={currentPost.contentsource} isClearable={true} label="Nguồn" placeholder="Chọn nguồn" />

            </div>

            <div className="col-12 col-md-6 col-xl-12 mb-3">
              <div className="row">
                <Field classinput="form-control" classgroup="form-group col-12" id="sourceInput" name="sourcename" type="text" component={renderFormField} label="Link gốc" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

};


const selector = formValueSelector('formPostEdit');

ContentCreatorTab = reduxForm({
  form: 'formPostEdit',
  validate
})(ContentCreatorTab)

export default connect(store => {
  return {
    login: store.loginInfo,
    post: store.post,
    config: store.config,
    fileUpload: store.fileUpload,
    form: store.formPostEdit,
    fields: selector(store, 'title', 'title_google', 'url', 'keyword', 'sourcename', 'description_google', 'description')
  };
}, dispatch => {
  return {
    createPost: (value) => { dispatch(postActions.createPost(value)) },
    setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    changeFieldValue: (field, value) => { dispatch(change('formPostCreate', field, value)) },
  }
})(ContentCreatorTab)
