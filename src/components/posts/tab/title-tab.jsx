import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'
import 'react-toastify/dist/ReactToastify.css';
import { renderFormField, renderTextAreaField } from '../../../utils/reduxField'
import { DraggableAreasGroup } from 'react-draggable-tags'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import { validateCreatePostForm } from './../../../utils/formValidation'
import slug from 'slug'
import localStorage from '../../../utils/local-storage'
import moment from 'moment'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
const validate = values => {
  return validateCreatePostForm(values, false);
};

const AI_URL = process.env.REACT_APP_URL_AI;
class TitleTab extends Component {
  constructor() {
    super();
    this.state = {
      canChangeUrl: true,
      error: true,
      editableUrl: true,
      listPostSame: []
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { post: nextPost, fields: nextFields, currenttab: nextTab } = nextProps;
    const { fields, post, typepage, currenttab: currentTab } = this.props;

    if (fields.title !== nextFields.title) {
      const nextTitle = nextFields.title ? nextFields.title : "";
      nextPost.currentPost.title = nextTitle
      nextPost.currentPost.title_search = slug(nextTitle, { lower: true });
      this.props.setCurrentPost(nextPost.currentPost);
    }
    
    if (fields.url !== nextFields.url && nextFields.url) {
      nextPost.currentPost.url = slug(nextFields.url, { lower: true });
      this.props.setCurrentPost(nextPost.currentPost);
    }

    if (fields.keyword !== nextFields.keyword) {
      nextPost.currentPost.keyword = nextFields.keyword ? nextFields.keyword : "";
      this.props.setCurrentPost(nextPost.currentPost);
    }

    if (fields.title_google !== nextFields.title_google) {
      nextPost.currentPost.title_google = nextFields.title_google ? nextFields.title_google : "";
      this.props.setCurrentPost(nextPost.currentPost);
      nextPost.currentPost.url = slug(nextPost.currentPost.title_google);
      this.props.changeFieldValue('url', slug(nextPost.currentPost.title_google, { lower: true }));
    }

  }

  genePostUrl() {

    const { post: { currentPost } } = this.props
    // console.log(currentPost.categories);
    const _user = localStorage.get('_user')

    let url = "/";
    if (currentPost.primary_category) {
      url += currentPost.primary_category.url + '/';
    }
    if (currentPost.url) {
      url += currentPost.url + '-';
    }
    url += moment().format('YYYYMMDDhmmss');
    // url += _user.increment_id || _user._id;
    // console.log(url);

    return url;
  }

  changeEditableState = (value) => {
    this.setState({ editableUrl: !value });
  }

  handleClose = () => {
    this.actionForModal(false, "");
  }
  openModalEdit = (data) => {
    this.actionForModal(true, data);
  }
  openModalCreate = (data) => {
    this.actionForModal(true, "");
  }

  actionForModal = (status, editId) => {
    let { postLists } = this.state
    // postLists = _.filter(postLists, (pst) => {
    //   // pst.posttype.type_code == 'ready' && 
    //   return !this.checkInList(pst._id)
    // });
    // console.log(status);
    // console.log(postLists);
    this.setState({ show: status, editId: editId, postLists })
  }

  strip_tags(input, allowed) {
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
    return input.replace(tags, ($0, $1) => (allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''))
  }


  checkTitle = () => {
    const { post: {currentPost} } = this.props;
    this.setState({listPostSame: []});
    const requestOptions = {
      method: 'POST',
      url: AI_URL + '/v1/postCrawlerRecommendation',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsImlhdCI6MTU4NjY2MjQyNSwiZXhwIjoxNTg2NjY2MDI1fQ.eyJ1c2VybmFtZSI6ImNtc2FpIn0.C2vhB4rDc-YjrjtKbr4sR0v4MhUEmSvF27vvruWjUP2oGNVCErTnLk2laqAQgL3hycCJfM7OarSk_8MVTtshCw'
      },
      data: {
        "data": {
          "title": currentPost.title,
          "content": this.strip_tags(currentPost.content),
          "topN": 10,
          "threshold": 0.3
        }
      }
    }
    axios(requestOptions)
      .then(response => {
        console.log(response);
        if(response.data && response.data.response && response.data.response.listPostUrl ){
          
            this.setState({listPostSame: response.data.response.listPostUrl[0]})
        }

      })
      .catch(function (error) {
        console.log(error);
      });



    this.setState({show: true});
  }

  render() {
    let { listPostSame }= this.state;
    let { layoutName, checkClass } = this.props;

    return (
      <div className={(layoutName !== 'layout-pc' ? 'row card' : '')}>
        {
          layoutName !== 'layout-pc' &&
          <div className={"card-header col-12 " + (checkClass)}>
            <h4 className="card-title">Tiêu đề bài viết</h4>
            <div className="card-tools">
                <span onClick={this.checkTitle}>Kiểm tra tiêu đề</span>
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>

        }
        <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Bài viết tương tự</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                      {this.state.isLoading && <i className="fas fa-2x fa-sync fa-spin"></i>}
                      <table className="table table-bordered mt-3">
                        <thead>
                          <tr>
                            <th style={{ width: "10px" }}>#</th>
                            <th>Tiêu đề</th>
                            <th>Nguồn</th>
                          </tr>
                        </thead>
                        <tbody>

                          {(listPostSame && listPostSame.length) > 0 && (
                            listPostSame.map((post, idx) => {
                              return (
                                <tr key={`itemsearch-${idx}`}>
                                  <td>{idx + 1}.</td>
                                  <td><a href={post.url} target="_blank" rel="noopener noreferrer">{post.title || ""}</a></td>
                                  <td>{post.source || ""}</td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </Modal.Body>
                  </Modal>
        <div className="card-body col-12">
          <Field classinput="form-control" classgroup="form-group" id="titleInput" style={{ resize: "none" }}
            name="title" type="text" component={renderTextAreaField} label="Tiêu đề bài viết" readonly={this.props.readonly} />
          <Field classinput="form-control" classgroup="form-group" id="titlegoogleInput"
            name="title_google" type="text" component={renderTextAreaField} label="Tiêu đề bài viết hiển thị trên google (độ dài tối đa 70 ký tự)" readonly={this.props.readonly} maxLength="70" />

          <div className="position-relative">
            <span
              onClick={e => this.changeEditableState(this.state.editableUrl)}
              style={{
                color: '#007bff',
                cursor: 'pointer',
                position: 'absolute',
                right: '0',
                top: '0'
              }}
              className={this.state.editableUrl ? 'active' : ''}
            >
              {this.state.editableUrl ? 'Sửa' : 'OK'}
            </span>
            <Field classinput="form-control" classgroup="form-group" id="urlInput"
              name="url" type="text" component={renderFormField} label="Url" readonly={this.state.editableUrl} />
          </div>
          <Field classinput="form-control" classgroup="form-group" id="keywordInput"
            name="keyword" type="text" component={renderFormField} label="Keyword (Tối đa 20 ký tự)" readonly={this.props.readonly} maxLength="20" />
        </div>
      </div>
    )
  }

};
const selector = formValueSelector('formPostEdit');

TitleTab = reduxForm({
  form: 'formPostEdit',
  validate
})(TitleTab)

export default connect(store => {
  return {
    post: store.post,
    form: store.formPostEdit,
    fields: selector(store, 'title', 'title_google', 'url', 'keyword')
  };
}, dispatch => {
  return {
    setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    changeFieldValue: (field, value) => { dispatch(change('formPostEdit', field, value)) },
  }
})(TitleTab)
