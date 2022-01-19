import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../../store/action/post";
import IframeComm from "react-iframe-comm";
import Select from "react-select";
import * as _ from "lodash";
import Editor from "../../editor/editor";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ChromePicker } from 'react-color'
import localStore from 'src/utils/local-storage'
import Uploader from '../../util/uploader';

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'

class ContentTab extends Component {
  constructor() {
    super();
    this.state = {
      currentPost: null,
      error: true,
      editorType: [
        { type: "normal", label: "Bài viết thường", value: "normal" },
        { type: "special", label: "Bài đặc biệt", value: "special" },
        { type: "mini", label: "Bài viết mini", value: "mini" },
        { type: "video", label: "Bài viết video", value: "video" }
      ],
      editorTypeSelected: {
        type: "normal",
        label: "Bài viết thường",
        value: "normal"
      },
      prType: [],
      prSelected: { type: "0", label: "Không phải PR", value: "0" },
      isPr: false,
      styleColorBackGround: '#fff',
      styleImageBackGround: '',
      crop_ver: {
        unit: 'px',
        width: 660,
        aspect: 1,
        x: 0,
        y: 0,
      },
    };

    this.colorPickerRef = React.createRef()
  }

  componentWillUnmount() {
    // important
    document.removeEventListener('click', this.handleClick)
  }

  handleClick = (event) => {
    const { target } = event
    if (!this.colorPickerRef.current.contains(target)) {
      // let { stylePicker } = this.state;
      this.setState({ stylePicker: false });
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
    const {
      post: { currentPost }
    } = this.props;
    let { editorType, editorTypeSelected, isPr, prType, prSelected } = this.state;
    const _user = localStore.get('_user');
    const isAdmin = _user.role.name == 'SuperAdmin';
    const disablePR = currentPost.publisher ? (isAdmin ? false : true) : false;

    prType = [
      { type: "0", label: "Không phải PR", value: "0", isDisabled: disablePR },
      { type: "1", label: "PR loại 1", value: "1" },
      { type: "2", label: "PR loại 2", value: "2" },
      { type: "3", label: "PR loại 3", value: "3" },
      { type: "4", label: "PR loại 4", value: "4" },
      { type: "5", label: "PR vàng", value: "5" },
      { type: "6", label: "PR bạc", value: "6" },
    ];

    if (currentPost.editor_type) {
      editorTypeSelected = _.find(editorType, type => {
        return type.type == currentPost.editor_type;
      });
    } else {
      currentPost.editor_type = "normal";
      this.props.setCurrentPost(currentPost);
    }

    if (currentPost.pr_type) {
      prSelected = _.find(prType, type => {
        return type.value == currentPost.pr_type;
      });
    }

    this.setState({
      currentPost, editorTypeSelected, pr_type: currentPost.pr_type, prSelected, prType, styleColorBackGround: currentPost.content_background
      , styleImageBackGround: currentPost.content_image
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      post: nextPost,
      fields: nextFields,
      currenttab: nextTab
    } = nextProps;
    const { fields, post, typepage, currenttab: currentTab } = this.props;
    if (post.currentTabPost === 3 && nextPost.currentTabPost !== 3) {
      const { currentPost } = nextPost;
      this.props.setCurrentPost(currentPost);
    }
  }

  getValueEditorType = value => {
    if (value.type !== this.state.editorTypeSelected.type) {
      this.confirmAction(value);
    }
  };

  getValuePRType = value => {
    let { prType, prSelected } = this.state;
    if (value) {
      prSelected = _.find(prType, type => {
        return type.value == value.value;
      });
      const { post: { currentPost } } = this.props;
      currentPost.pr_type = prSelected.value;

      this.props.setCurrentPost(currentPost);

      this.setState({ prSelected });
    }

  };

  handleCreatePost(data) {
    // console.log(data);
    const {
      post: { currentPost }
    } = this.props;
    currentPost.content = data;
    this.props.setCurrentPost(currentPost);
  }

  changeStatusPR(check) {
    const {
      post: { currentPost }
    } = this.props;
    this.setState({ isPr: check }, () => {
      currentPost.is_pr = check;
      this.props.setCurrentPost(currentPost);
    });
    this.props.isPr(check);
  }

  confirmAction(value) {
    const options = {
      title: "Title",
      message: "Message",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        },
        {
          label: "No",
          onClick: () => alert("Click No")
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => (
        <div className="custom-ui-alert">
          <h1>Bạn sắp chuyển qua layout soạn bài khác.</h1>
          <div className="box">
            <div className="bg-d9534f" onClick={onClose}>
              Không, cần xem lại
            </div>
            <div
              className="bg-c7c6c5"
              onClick={() => {
                this.updateEditorType(value);
                onClose();
              }}
            >
              Có, tiếp tục
            </div>
          </div>
        </div>
      ),
      closeOnEscape: true,
      closeOnClickOutside: true,
      willUnmount: () => { },
      onClickOutside: () => { },
      onKeypressEscape: () => { }
    };

    confirmAlert(options);
  }

  updateEditorType = value => {
    let { editorType, editorTypeSelected } = this.state;
    if (value) {
      editorTypeSelected = _.find(editorType, type => {
        return type.type == value.value;
      });
      const {
        post: { currentPost }
      } = this.props;
      currentPost.editor_type = editorTypeSelected.value;
      if(currentPost.editor_type == 'mini' || currentPost.editor_type == 'special'){
        this.setDefaultTag(currentPost.editor_type);
      }
      
      this.props.setCurrentPost(currentPost);
      this.setState({ editorTypeSelected });
      this.props.onSelectEditorType(editorTypeSelected);
    }
  };

  //ticket 140:Tự động gắn tag cho bài special và mini special
  setDefaultTag(type){
    const { post: { currentPost }, config: { configuration } } = this.props;

    let tag_id = _.find(configuration, (conf) => conf.label == `${type}_tag_id`);  

    let filterTag = _.find(currentPost.tags, (tag) => {
      return tag.id == tag_id.value;
    });
    if(!filterTag){
      currentPost.tags = [...currentPost.tags, {_id: tag_id.value, value: tag_id.value, label: tag_id.label}];
      this.props.setCurrentPost(currentPost);
    }
    
  }

  changeBackground = value => {
    const { post: { currentPost } } = this.props;
    currentPost.content_background = value;
    this.props.setCurrentPost(currentPost);
  }
  changeImageBackground = value => {
    const { post: { currentPost } } = this.props;
    currentPost.content_image = value;
    this.setState({ styleImageBackGround: value }, () => {
      this.props.setCurrentPost(currentPost);
    })
  }


  handleColorChange = ({ hex }) => {
    this.setState({ styleColorBackGround: hex })
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.changeBackground(hex);
    }, 1000);

  }

  handleBackground = () => {
    let { stylePicker } = this.state
    this.setState({ stylePicker: !stylePicker });
  }

  handleImageCrop = data => {
    console.log(data);

    // no upload

  }
  noneedcrop = data => {
    const { post: { currentPost } } = this.props
    currentPost.content_image = data.url;
    this.setState({ styleImageBackGround: data.url }, () => {
      this.props.setCurrentPost(currentPost);
      toast.success("Đã chọn ảnh nền");
    })

  }


  render() {
    const currentPost = this.props.content;

    let { layoutName, checkClass } = this.props;
    const type = currentPost.editor_type;
    let typeEditor = this.state.currentPost.editor_type;
    return (
      <div className={layoutName !== "layout-pc" ? "row card" : ""}>
        {layoutName !== "layout-pc" && (
          <div className={"card-header col-12 " + checkClass}>
            <h4 className="card-title">Nội dung bài viết</h4>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
              >
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
        )}

        <div className="card-body col-12">
          <div className="row mb-3">
            {currentPost.posttype.type_code !== "ready" && (
              <div className="col-xl col-lg-6 col-6 col-sm-4 mb-3 align-self-center">
                <Select
                  defaultValue={this.state.editorTypeSelected}
                  options={this.state.editorType}
                  onChange={this.getValueEditorType}
                  placeholder="Chọn loại bài viết"
                />
              </div>
            )}
            <div className="col-xl col-lg-6 col-6 col-sm-4 mb-3 align-self-center">
              <Select
                defaultValue={this.state.prSelected}
                options={this.state.prType}
                onChange={this.getValuePRType}
                placeholder="Chọn bài PR"
              />
            </div>
             
            <div ref={this.colorPickerRef} className={`col-xl-2 col-lg-6 col-6 col-sm-4 mb-3 align-self-center ml-auto justify-content-between ${( typeEditor == 'normal' || typeEditor == 'video' ) ? 'd-none' : 'd-flex' }`}>
              <button
                onClick={this.handleBackground}
                className={"btn bg-maroon btn-block " + (this.state.styleColorBackGround !== '#fff' ? 'mr-2' : '')}
              >Chọn màu nền</button>

              {
                this.state.styleColorBackGround !== '#fff' &&
                <button
                  onClick={() => this.handleColorChange({ hex: '#fff' })}
                  className="btn btn-inline-block"
                  style={{ backgroundColor: `${this.state.styleColorBackGround}` }}
                ><i className="fas fa-times"></i></button>
              }

              <div className={"position-absolute " + (this.state.stylePicker ? '' : 'd-none')}
                style={{ zIndex: 9999, left: '0px' }}>

                <ChromePicker onChangeComplete={this.handleColorChange} color={this.state.styleColorBackGround} />
              </div>

            </div>

            <div className={`col-xl-2 col-lg-6 col-6 col-sm-4 mb-3 align-self-center ml-auto justify-content-between ${( typeEditor == 'normal' || typeEditor == 'video' ) ? 'd-none' : 'd-flex' }`}>
              <Uploader noneedcrop={this.noneedcrop} no_crop={true} tmp_id={currentPost.tmp_id || currentPost.id} url={currentPost.content_image} crop={this.state.crop_ver} type="content_image" handleImageCrop={this.handleImageCrop} styleImageBackGround={this.state.styleImageBackGround} />

              {
                this.state.styleImageBackGround !== '' &&
                <button
                  onClick={(e) => {
                    // this.setState({ styleImageBackGround: '' })

                    this.changeImageBackground('')

                  }}
                  className="btn btn-inline-block"
                  style={{ backgroundImage: `url('${this.state.styleImageBackGround}')` }}
                ><i className="fas fa-times"></i></button>
              }

            </div>
          </div>

          <div className="row">
            <div
              className={"col-12 overflow-hidden " + currentPost.editor_type + " editor-" + currentPost.editor_type}
            >
              <Editor
                post={currentPost}
                editorTypeSelected={this.state.editorTypeSelected}
                styleColorBackGround={this.state.styleColorBackGround}
                styleImageBackGround={this.state.styleImageBackGround}
                onChange={content => {
                  this.onContentChange(content);
                }}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }

  onContentChange(content) {
    let currentPost = this.props.content;
    currentPost.content = content;
    this.props.setCurrentPost(currentPost);
  }
}

export default connect(
  store => {
    return {
      post: store.post,
      config: store.config
    };
  },
  dispatch => {
    return {
      setCurrentPost: value => {
        dispatch(postActions.setCurrentPost(value));
      }
    };
  }
)(ContentTab);
