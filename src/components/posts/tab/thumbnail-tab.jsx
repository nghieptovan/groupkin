import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'
import * as fileActions from '../../../store/action/file'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Uploader from '../../util/uploader';
import ScreenSize from '../../../services/screenSize';

import slug from 'slug';

class ThumbnailTab extends Component {
  isMobile = false;
  constructor(props) {
    super(props);

    this.state = {
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

  handleImageCrop = data => {
    const { post: { currentPost } } = this.props

    const tmp_id = currentPost.tmp_id || currentPost.id;
    const editor_type = currentPost.editor_type || 'normal';
    let type = data.type;
    
    let { file } = this.state
    const blob = data.blob;
    if(blob == ""){
      if(type == 'vertical'){
        currentPost.img_ver = "";
      }else{
        currentPost.img_hor = "";
      }
      this.props.setCurrentPost(currentPost);
    }else{
      fetch(blob).then(res => res.blob()).then(blob => {

      })
    }
  }


  render() {
    const { currentPost, crop, croppedImageUrl, src } = this.state;
    const { layoutName, checkClass } = this.props;

    return (

      <div className={(layoutName !== 'layout-pc' ? 'row card' : '')}>
        {
          layoutName !== 'layout-pc' &&
          <div className={"card-header col-12 " + (checkClass)}>
            <h4 className="card-title">Thumbnail</h4>
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
                <li className="nav-item active">
                  <a className="nav-link" id="custom-content-below-profile-tab" data-toggle="pill"
                    href="#custom-content-below-profile" role="tab" aria-controls="custom-content-below-profile" aria-selected="false">Thumbnail Ngang</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="custom-content-below-home-tab" data-toggle="pill"
                    href="#custom-content-below-home" role="tab" aria-controls="custom-content-below-home" aria-selected="true">Thumbnail Dọc</a>
                </li>

              </ul>
            }
            <div className="tab-content col-12 thumbnail" id="custom-content-below-tabContent">
              {(layoutName !== 'layout-pc') && <label>Thumbnail Ngang</label>}

              <div style={{ width: layoutName === 'layout-pc' ? "50%" : "100%", margin: "0 auto" }} className="tab-pane fade show active" id="custom-content-below-profile" role="tabpanel" aria-labelledby="custom-content-below-profile-tab">
                {currentPost && <Uploader dragagain={true} tmp_id={currentPost.tmp_id || currentPost.id} url={currentPost.img_hor} crop={this.state.crop_hor} type="horizontal" handleImageCrop={this.handleImageCrop} />}
              </div>
              {(layoutName !== 'layout-pc') && <label style={{ marginTop: "20px" }}>Thumbnail Dọc</label>}

              <div style={{ width: layoutName === 'layout-pc' ? "30%" : "100%", }} className={"tab-pane fade" + (layoutName === 'layout-pc' ? '' : ' show active')} id="custom-content-below-home" role="tabpanel" aria-labelledby="custom-content-below-home-tab">
                {currentPost && <Uploader dragagain={true} tmp_id={currentPost.tmp_id || currentPost.id} url={currentPost.img_ver} crop={this.state.crop_ver} type="vertical" handleImageCrop={this.handleImageCrop} />}
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
})(ThumbnailTab)
