import React, { Component } from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { connect } from "react-redux";
import * as postActions from "../../../store/action/post";
import * as royaltiesActions from "../../../store/action/royalties_editor";
import CreatorItem from './creator-item/creator-item'
import localStorage from '../../../utils/local-storage'
class RoyaltiesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEditor: [],
      editor: props.currentPost.royalties_editor,
      editorRoyalties: props.currentPost.royalties_editor_value,
      photographer: props.currentPost.royalties_photographer,
      photographerRoyalties: props.currentPost.royalties_photographer_value,
      checkClass: '',
      layoutName: '',
      currentPost: {
        royalties_editor: {}
      }
    };
    this.timeoutToGetEditor = null;
    this.timeoutToGetPhotographer = null;
  }

  render() {
    const { checkClass, layoutName, post: { currentPost } } = this.props;
    const _user = localStorage.get('_user');
    let valueRoyaltiesEditor = currentPost.royalties_editor;
    if(!valueRoyaltiesEditor){
      valueRoyaltiesEditor = _user.royalties_editors ? _user.royalties_editors[0] : null
      if(valueRoyaltiesEditor){
        currentPost.royalties_editor = valueRoyaltiesEditor;
        this.props.setCurrentPost(currentPost);
      }
    }

    return (
      <div className={(layoutName !== 'layout-pc' ? 'row card' : '')}>
        {
          layoutName !== 'layout-pc' &&
          <div className={"card-header col-12 " + (checkClass)}>
            <h4 className="card-title">Chấm nhuận</h4>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
        }
        <div className="card-body col-12">
          <div className="row">
            <div className="editor-name col mb-3">
              <CreatorItem creatable={true} functioncreate="createEditorV" functioncall="getRoyaltiesEditor" newapi="/royalties-editors" valueinstore="listRoyaltiesEditor" posttype="royalties_editor"
                type="royalties_editor" selectedValue={valueRoyaltiesEditor}
                label="Biên tập viên" placeholder="Biên tập viên" />
            </div>
            {this.props.userInfo &&
              this.props.userInfo.role &&
              (this.props.userInfo.role.name.toLowerCase() == "tbt" || this.props.userInfo.role.name.toLowerCase() == "superadmin") && (
                <div className="editor-royalties col-12 col-md-4 mb-3">

                  <CreatorItem creatable={false} functioncall="getRoyaltiesList" valueinstore="listRoyalties" posttype="royalties_editor_value"
                    type="royalties_editor_value" selectedValue={currentPost.royalties_editor_value}
                    label="Nhuận" placeholder="" />
                </div>
              )}
          </div>
          <div className="row">
            <div className="photographer-name col mb-3">
              <CreatorItem creatable={true} isClearable={true} functioncreate="createPhotoV" functioncall="getRoyaltiesPhoto" newapi="/royalties-photographers" valueinstore="listRoyaltiesPhoto" posttype="royalties_photographer"
                type="royalties_photographer" selectedValue={currentPost.royalties_photographer}
                label="Photographer" placeholder="Photographer" />
            </div>
            {this.props.userInfo &&
              this.props.userInfo.role &&
              (this.props.userInfo.role.name.toLowerCase() == "tbt" || this.props.userInfo.role.name.toLowerCase() == "superadmin") && (
                <div className="photographer-royalties col-12 col-md-4  mb-3">
                  <CreatorItem creatable={false} functioncall="getRoyaltiesList" valueinstore="listRoyalties" posttype="royalties_photo_value"
                    type="royalties_photo_value" selectedValue={currentPost.royalties_photo_value}
                    label="Nhuận" placeholder="" />
                </div>
              )}
          </div>

        </div>
      </div>


    );
  }
  // Load Photographer list
  loadPhotographerList = (input, callback) => {
    clearInterval(this.timeoutToGetPhotographer);

  };

  // Load editor list
  loadEditorList = (input, callback) => {
    clearInterval(this.timeoutToGetEditor);

    this.timeoutToGetEditor = setTimeout(() => {
    }, 2000);
  };

  onEditorSelected = value => {
    const data = {
      ...this.props.currentPost,
      royalties_editor: value.id
    };
    // console.log("onEditorSelected: ", value);
    this.props.setCurrentPost(data);
    this.setState({
      editor: value
    });
  };

  onEditorRoyaltiesSelected = value => {
    // console.log("onEditorRoyaltiesSelected: ", value);
    const data = {
      ...this.props.currentPost,
      royalties_editor_value: value.value
    };
    this.props.setCurrentPost(data);
    this.setState({
      editorRoyalties: value
    });
  };

  onPhotographerSelected = value => {
    // console.log("onPhotographerSelected: ", value);
    const data = {
      ...this.props.currentPost,
      royalties_photographer: value.id
    };
    this.props.setCurrentPost(data);
    this.setState({
      photographer: value
    });
  };

  onPhotographerRoyaltiesSelected = value => {
    // console.log("onPhotographerRoyaltiesSelected: ", value);
    const data = {
      ...this.props.currentPost,
      royalties_photographer_value: value.value
    };
    this.props.setCurrentPost(data);
    this.setState({
      photographerRoyalties: value
    });
  };
}

RoyaltiesTab.propTypes = {};

const mapStateToProps = state => ({
  post: state.post,
  userInfo: state.loginInfo && state.loginInfo.userInfo,
  royalties_list: state.config.royalties_list || [],
  currentPost: state.post.currentPost
});

const mapDispatchToProps = dispatch => ({
  setCurrentPost: post => {
    dispatch(postActions.setCurrentPost(post));
  },
  getRoyaltiesEditors: value => {
    dispatch(royaltiesActions.getRoyaltiesEditors(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoyaltiesTab);
