import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../store/action/post'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import * as _ from 'lodash'
import localStorage from '../../utils/local-storage'
import PostContent from './post.content'
import ScreenSize from '../../services/screenSize';
import StorageService from '../../services/StorageService';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import HeaderMobileComponent from "src/components/layout/header-mobile";
import ApiService from "../../services/ApiService";
const _user = localStorage.get('_user');

class PostEdit extends Component {
  isMobile = false;
  newLayout = false;
  constructor() {
    super();
    this.state = {
      currentPost: {},
      titlePost: '',
      newLayout: false,
      canAccess: false,
      isLock: false,
      currentId: ""
    }

    this.isMobile = ScreenSize.isMobile;
    if (this.isMobile) {
      this.state.newLayout = true;
    } else {
      this.state.newLayout = StorageService.get('newLayoutPC');
    }
  }
  componentDidMount() {
    let postId = this.props.match.params.id;
    this.props.getPostById(postId);
    this.setState({ currentId: postId })
    window.addEventListener('resize', () => { this.isMobile = ScreenSize.isMobile });
  }

  componentWillUnmount() {
    let { currentId, canAccess } = this.state;
    if (canAccess) {
      localStorage.remove('_current_id');
      setTimeout(() => {
        
      }, 500);


    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { post: nextPost } = nextProps;
    const { post } = this.props;
    let { canAccess, isLock, currentId } = this.state;
    if (post.getPostStatus !== nextPost.getPostStatus && nextPost.getPostStatus === 2) {
      let currentPost = nextPost.currentPost;
      // canAccess = currentPost.permission.can_edit || false;
      // isLock = currentPost.permission.is_locking || false;
      // console.log('canAccess:',canAccess);

      // check lock  show alert
      // if not set to localstorage , update lock _current_id
      //

      let idPostInStorage = localStorage.get('_current_id');
      if (!currentPost.permission.can_edit && currentId != idPostInStorage) {
        canAccess = false;
        if(!currentPost.permission.is_locking){
          this.confirmAction(`Bạn không xem được bài viết này.`);
        }else{
          const name = currentPost.editing.fullname ? currentPost.editing.fullname : currentPost.editing.username;
          const message = `${name} đang chỉnh sửa. Bạn không xem được bài viết này.`;
          this.confirmAction(message);
        }
        
      } else {
        localStorage.set('_current_id', currentPost.id);
        canAccess = true;
      }

      this.setState({ currentPost, canAccess, currentId: this.props.match.params.id });
    }

    if (post.getPostStatus !== nextPost.getPostStatus && nextPost.getPostStatus === 3) {
      toast.error('Không tìm thấy bài viết.');
      this.props.history.push('/posts');
    }
  }


  confirmAction(message) {
    const options = {
      title: 'Title',
      message: 'Message',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => <div className='custom-ui-alert'>
        <h1>{message}</h1>
        <div className="bg-c7c6c5 bg-c7c6c5 txt-center pt-3 pb-3"
          onClick={() => {
            this.goPostList();
            onClose();
          }}
        >Trở lại</div>
      </div>,
      closeOnEscape: false,
      closeOnClickOutside: false
    };

    confirmAlert(options);

  }

  goPostList() {
    this.props.history.push("/posts")
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
    const { canAccess } = this.state;
    return (
      canAccess &&

      <div className="content-wrapper scrollbar-none">
        <HeaderMobileComponent />
        <section className="content mt-4">
          <div className="container-fluid">
            {(this.state.currentPost && !this.state.editingPost) && <PostContent content={this.state.currentPost} newLayout={this.state.newLayout} isMobile={this.isMobile} typepage="edit" />}
          </div>
        </section>
      </div>

    );
  }

};


export default connect(store => {
  return {
    login: store.loginInfo,
    config: store.config,
    post: store.post,
  };
}, dispatch => {
  return {
    createPost: (value) => { dispatch(postActions.createPost(value)) },
    getPostById: (value) => { dispatch(postActions.getPostById(value)) },
    updatePost: (value) => { dispatch(postActions.updatePost(value)) },
    setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
  }
})(PostEdit)
