import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'
import * as fileActions from '../../../store/action/file'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Uploader from '../../util/uploader';
import ScreenSize from '../../../services/screenSize';

class CoverTab extends Component {
  isMobile = false;

  constructor() {
    super();

    this.state = {
      no_crop: true,
      currentPost: null,
      imageUrl: true,
      styleThumb: 'ver',
      selectedFile: {
        name: ''
      },
      src: null,
      crop_ver: {
        unit: 'px',
        width: 414,
        aspect: 10 / 16,
        x: 0,
        y: 0,
      },
      crop_hor: {
        unit: 'px',
        width: 660,
        aspect: 16 / 10,
        x: 0,
        y: 0,
      },
      file: {
        ver: {},
        hor: {}
      }
    }

    this.isMobile = ScreenSize.isMobile;
  }

  componentDidMount() {
    const { content } = this.props
    this.setState({ currentPost: content })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { fileUpload: nextUpload, post: nextPost } = nextProps;
    const { fileUpload, post } = this.props;

    if (fileUpload.uploadStatus !== nextUpload.uploadStatus && nextUpload.uploadStatus === 2) {
      let currentPost = nextPost.currentPost;
      const fileUpload = nextUpload.fileUpload[0];

      if (fileUpload.name == 'horizontal-cover.jpeg') {
        toast.success("Upload successfully");
        currentPost.cover_pc = `${fileUpload.hash}${fileUpload.ext}`;
      }

      if (fileUpload.name == 'vertical-cover.jpeg') {
        toast.success("Upload successfully");
        currentPost.cover_m = `${fileUpload.hash}${fileUpload.ext}`;
      }

      this.setState({ currentPost }, () => {
        this.props.setCurrentPost(currentPost);
      })

    }

    if (fileUpload.uploadStatus !== nextUpload.uploadStatus && nextUpload.uploadStatus === 3) {
      toast.error("Upload failed!");
    }

  }


  handleImageCrop = data => {
    const { post: { currentPost } } = this.props

    const tmp_id = currentPost.tmp_id || currentPost.id;
    const editor_type = currentPost.editor_type || 'normal';
    let type = data.type;
    const blob = data.blob;
    
    fetch(blob).then(res => res.blob()).then(blob => {
    })

  }

  noneedcrop = data => {
    console.log(data);
    let { type, url } = data;
    const { post: { currentPost } } = this.props

    if(type == 'vertical'){
      currentPost.cover_m = url;
      toast.success("Đã chọn ảnh nền mobile");
    }else{
      currentPost.cover_pc = url;
      toast.success("Đã chọn ảnh nền pc");
    }
    this.setState({
      currentPost
    }, () => {
      this.props.setCurrentPost(currentPost);
    })
    
  }

  render() {
    const { currentPost, crop, croppedImageUrl, src } = this.state;
    const { layoutName, checkClass } = this.props;

    return (

      <div className={(layoutName !== 'layout-pc' ? 'row card' : '')}>
        {
          layoutName !== 'layout-pc' &&
          <div className={"card-header col-12 tab-require-status-success"}>
            <h4 className="card-title">Ảnh Cover</h4>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>

        }

        <div className="card-body col-12">
          <div className="row">
            {(layoutName === 'layout-pc') &&
              <ul className="nav nav-tabs" id="custom-content-below-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="custom-content-below-profile-tab" data-toggle="pill"
                    href="#cover-pc" role="tab" aria-controls="cover-pc" aria-selected="false">Cover PC</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="custom-content-below-home-tab" data-toggle="pill"
                    href="#cover-mobile" role="tab" aria-controls="cover-mobile" aria-selected="true">Cover Mobile</a>
                </li>

              </ul>
            }
            <div className="tab-content col-12 thumbnail" id="custom-content-below-tabContent">
              {(layoutName !== 'layout-pc') && <label>Cover PC</label>}
              <div style={{ width: layoutName === 'layout-pc' ? "50%" : "100%", margin: "0 auto" }} className="tab-pane fade show active" id="cover-pc" role="tabpanel" aria-labelledby="cover-pc">
                {currentPost && <Uploader noneedcrop={this.noneedcrop} no_crop={true} tmp_id={currentPost.tmp_id || currentPost.id} url={currentPost.cover_pc} crop={this.state.crop_hor} type="horizontal" handleImageCrop={this.handleImageCrop} />}
              </div>
              {(layoutName !== 'layout-pc') && <label style={{ marginTop: "20px" }}>Cover Mobile</label>}
              <div style={{ width: layoutName === 'layout-pc' ? "30%" : "100%", margin: "0 auto" }} className={"tab-pane fade" + (layoutName === 'layout-pc' ? '' : ' show active')} id="cover-mobile" role="tabpanel" aria-labelledby="cover-mobile">
                {currentPost && <Uploader noneedcrop={this.noneedcrop} no_crop={true} tmp_id={currentPost.tmp_id || currentPost.id} url={currentPost.cover_m} crop={this.state.crop_ver} type="vertical" handleImageCrop={this.handleImageCrop} />}
              </div>

            </div>


          </div>
        </div>

      </div>
    );
  }

};




export default connect(store => {
  return {
    post: store.post,
    fileUpload: store.fileUpload
  };
}, dispatch => {
  return {
    setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    uploadFile: (value) => { dispatch(fileActions.uploadFile(value)) },
  }
})(CoverTab)
