import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../store/action/post'
import _ from 'lodash'
import Link from 'src/components/link'
import Status from '../../components/util/status'
import Date from 'src/components/util/date'
import localStore from 'src/utils/local-storage'
import ImageLoader from '../../components/image-loader/ImageLoader';
import UserAvatar from 'react-user-avatar';
import CacheService from "../../services/CacheService";
import { ToastContainer, toast } from "react-toastify";
// import { addNPlayer, emitLockToAllUsers } from '../../Api'
const IMG_SERVER = process.env.REACT_APP_IMG;
class PostItem extends Component {
  isMobile = false;

  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      onHover: false,
      isLocking: false,
      postItem: props.postItem,
      contentcreatortype: []
    };
    this.chooseLayout = this.chooseLayout.bind(this);
    this.copyBtnTextRef = React.createRef();
  }
  componentDidMount() {
    const { login, contentcreatortype } = this.props;
    const { postItem } = this.state;
    let user = localStore.get('_user');
    //get from BE
    // const showEdit = this.showEditButton(postItem, user) || false;
    const showEdit = postItem.permission.can_edit || false;
    const isLocking = this.checkIsLocking(postItem);
    this.setState({ showEdit, contentcreatortype, isLocking });
    window.addEventListener('resize', this.chooseLayout);
    emitLockToAllUsers((err, update) => this.actionLockSocket(update));
    this.chooseLayout();
  }

  actionLockSocket(post) {
    let { postItem } = this.state
    if (postItem.id == post.id) {
      this.setState({ postItem: post }, () => this.forceUpdate());
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const showEdit = nextProps.postItem.permission.can_edit || false;
    this.setState({ postItem: nextProps.postItem, showEdit })
  }

  showEditButton(post, user) {
    const isYourContent = this.isYourContent(post.user, user);
    const isOtherEdit = this.canEditOtherPost(post) || false;
    if (post.editing_status && post.editing) {
      return false;
    }
    if (isYourContent) {
      if ((post.posttype && post.posttype.type_code === 'draft') || isOtherEdit) {
        return true;
      } else {
        return false;
      }
    }
    if (isOtherEdit) {
      if ((post.posttype && post.posttype.type_code === 'draft') || isOtherEdit) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  isYourContent(userPost, user) {
    return userPost._id === user._id || false;
  }

  canEditOtherPost(post) {
    if (post.posttype.type_code == 'ready') {
      return localStore.get('_user').can_edit_publish || false;
    } else {
      return localStore.get('_user').can_edit_other || false;
    }

  }

  checkIsLocking(post) {
    if (post.editing_status && post.editing) {
      return true;
    } else {
      return false
    }

  }



  editPost(post) {
    this.props.setCurrentPost(post);
  }

  hoverRow(status) {
    this.setState({ onHover: status });
  }
  // not delete post
  // deletePost(post) {
  //     this.props.deletePost(post);
  // }
  generatePenname = (penname) => {
    let person = _.find(penname, this.state.contentcreatortype.penname);
    return (person && person.name) || '-';
  }
  generateCategory = (idx, category) => {
    category = _.unionBy(category, '_id');
    let stringBuilder = [];
    let _user = localStore.get('_user');
    let findCat = _.intersectionBy(_user.categories, category, '_id');


    findCat.forEach((cat, index) => {
      let name = '';
      if (!this.isMobile) {
        const a = (index === 0) ? '' : '- ';
        name = a + cat.name;
      } else {
        name = cat.name;
      }
      let stringBuilder1 = <a key={`item-category${cat._id}${idx}${index}`} className="mr-1" href={`/posts?category=${cat.url}&page=1&limit=20`}>{name}</a>;
      stringBuilder.push(stringBuilder1);

    });
    return stringBuilder;
  }
  chooseLayout() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  uppercaseName(phrase) {
    phrase = phrase || "N";
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };




  clearCache(url) {
    const { config: { configuration } } = this.props;
    if (url) {
      let _frontendurl = _.find(configuration, (conf) => conf.label == "frontendurl");
      let _frontendurlM = _.find(configuration, (conf) => conf.label == "frontendurlm");
      // Khi save Call Get tới URL: https://graph.facebook.com?id=[link cần xóa]&scrape=true
      let urlClear = `?id=${_frontendurl.value + url}&scrape=true`;
      let urlClearM = `?id=${_frontendurlM.value + url}&scrape=true`;

      CacheService.clear(urlClear).then(result =>
        toast.success(`Đã xóa cache cho link: ${result.data.id}`)
      );
      CacheService.clear(urlClearM).then(result =>
        toast.success(`Đã xóa cache cho link: ${result.data.id}`)
      );
    } else {
      toast.error(`Không tìm thấy post_url`)
    }
  }

  actionLive(postItem) {
    let params = {
      id: postItem.id,
      _id: postItem._id,
      is_live: !postItem.is_live
    }
  }

  copyLink = (e, postID) => {
    e.target.innerHTML = 'Copied!'
    var textField = document.createElement('textarea')
    textField.innerText = 'https:' + process.env.REACT_APP_HOMEPAGE + '/posts/edit/' + postID
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

    setTimeout(() => {
      this.copyBtnTextRef.current.innerHTML = '<i className="far fa-copy"></i> Copy'
    }, 4000);
  }

  deleteItem(postId) {
  }
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  }

  render() {
    const { idx, config } = this.props;
    const { postItem } = this.state;
    let user = localStore.get('_user');
    let bgColor = postItem.posttype && postItem.posttype.color || '#ffffff';
    const srcAvatarUser = postItem.user && postItem.user.avatar ? (IMG_SERVER + "w60" + '/uploads/' + postItem.user.avatar.hash + postItem.user.avatar.ext) : "";
    const srcAvatarPublisher = (postItem.publisher && postItem.publisher.avatar) ? (IMG_SERVER + "w60" + '/uploads/' + postItem.publisher.avatar.hash + postItem.publisher.avatar.ext) : "";

    if (this.isMobile) {
      return (
        <tr key={`post-${idx}`} onMouseEnter={() => this.hoverRow(true)} onMouseLeave={() => this.hoverRow(false)} className={postItem.posttype.type_code}>
          <td style={{ width: '100%' }} >
            <Link to={`/posts/edit/${postItem._id}`} >
              <div className="d-flex">
                <div className="avatar">
                  {(postItem.img_ver &&
                    <ImageLoader className="lazyload" src={postItem.img_ver} width="100" />) || <img src={process.env.PUBLIC_URL + "/assets/images/100x160.png"} />}
                </div>
                <div className="right">
                  <h5 className="title">
                    {postItem.title || 'Chưa đặt tên'}
                    {(postItem.editing_status) && <i className="ml-2 fas fa-lock"></i>}
                  </h5>
                  {
                    postItem.posttype.type_code === 'ready' &&
                    <div className="text-secondary" style={{ fontWeight: 'normal', fontSize: '12px' }}>
                      {
                        postItem.pageviews
                          ? <span>View: {this.formatNumber(postItem.pageviews)}</span>
                          : <span>View: Đang cập nhật</span>
                      }
                    </div>
                  }
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <div>
                      <span className="" style={{ fontSize: "0.8em" }}>
                        {(postItem.contentpenname && postItem.contentpenname.label) || '-'}
                      </span>
                    </div>
                    <span className="time text-dark">
                      {postItem.posttype && <Date updated_at={postItem.modifiedAt || postItem.updatedAt} published_at={postItem.publishedAt} typecode={postItem.posttype.type_code} scheduled={postItem.scheduleAt} />}
                    </span>
                  </div>

                  <div className="py-1 cate-name">
                    <span className="mr-1">
                      {postItem.posttype && <Status posttype={postItem.posttype} scheduled={postItem.scheduleAt} />}
                    </span>
                    {postItem.editor_type
                      // && (postItem.editor_type === 'normal' && <button type="button" className="btn btn-sm btn-outline-primary ml-2">Bài thường</button>)
                      && (postItem.editor_type === 'mini' && <button type="button" className="badge badge-danger badge-outlined mr-2">Bài Mini</button>)
                      || (postItem.editor_type === 'special' && <button type="button" className="badge badge-warning badge-outlined mr-2">Bài Special</button>)
                      || (postItem.editor_type === 'video' && <button type="button" className="badge badge-dark badge-outlined mr-2">Bài Video</button>)
                    }

                    {this.generateCategory(idx, postItem.categories)}
                  </div>
                </div>
              </div>
            </Link>
          </td>
        </tr >
      );
    }

    return (
      <tr key={`post-${idx}`} onMouseEnter={() => this.hoverRow(true)} onMouseLeave={() => this.hoverRow(false)} className={(postItem.posttype.type_code) + ' h90'}>

        <td className="thumbnail" style={{ width: '135px' }}>
          {(postItem.img_hor &&
            <ImageLoader className="lazyload" src={postItem.img_hor} />) || <img src={process.env.PUBLIC_URL + "assets/images/160x100.png"} />}
        </td>
        <td className="title" >
          {postItem.title || 'Chưa đặt tên'}
          {(postItem.editing_status) && <i className="fas fa-lock"></i>}
          {postItem.editor_type
            // && (postItem.editor_type === 'normal' && <button type="button" className="btn btn-sm btn-outline-primary ml-2">Bài thường</button>)
            && (postItem.editor_type === 'mini' && <button type="button" className="btn btn-sm btn-outline-danger ml-2">Bài Mini</button>)
            || (postItem.editor_type === 'special' && <button type="button" className="btn btn-sm btn-outline-warning ml-2">Bài Special</button>)
            || (postItem.editor_type === 'video' && <button type="button" className="btn btn-sm btn-outline-dark ml-2">Bài Video</button>)
          }
          {postItem.is_pr && <button type="button" className="btn btn-sm btn-outline-info ml-2">PR</button>}
          {postItem.is_live && <button type="button" className="btn btn-sm btn-outline-success ml-2">Bài Live</button>}

          {
            postItem.posttype.type_code === 'ready' &&
            <div className="text-secondary mt-1" style={{ fontWeight: 'normal', fontSize: '12px' }}>
              {
                postItem.pageviews
                  ? <span>View: {this.formatNumber(postItem.pageviews)}</span>
                  : <span>View: Đang cập nhật</span>
              }
            </div>
          }

          <div className={"tools tools-posts" + (this.state.onHover ? ' active' : '')}>
            {
              (postItem.editing_status) &&
              <Link to={`/posts/edit/${postItem._id}`}>
                <span className="btn btn-warning btn-sm mr-2" style={{ opacity: "1", pointerEvents: "initial" }}>
                  <i className="fas fa-lock"></i> {postItem.editing && (postItem.editing.fullname || postItem.editing.email)}
                </span>
              </Link>
            }
            {
              // (this.state.showEdit) &&
              <>
                <a target="_blank" href={`/preview/${postItem._id}`} className="btn btn-info btn-sm mr-2" rel="noopener noreferrer">
                  <i className="fas fa-eye"></i> Preview
                </a>

                <button className="btn btn-secondary btn-sm mr-2" onClick={(e) => this.copyLink(e, postItem._id)} ref={this.copyBtnTextRef}>
                  <i className="far fa-copy"></i> Copy
                </button>
                {
                  postItem.posttype.type_code == 'ready' &&
                  <button className="btn btn-warning btn-sm mr-2" onClick={(e) => this.clearCache(postItem.post_url)} ref={this.copyBtnTextRef}>
                    <i className="far fa-trash-alt"></i> Cache
                </button>
                }
                {/* // bai viet da ready thi co the bat live */}
                {
                  (postItem.posttype.type_code == 'ready' && localStore.get('_user').can_live) &&
                  <button className="btn btn-success btn-sm mr-2" onClick={(e) => this.actionLive(postItem)} ref={this.copyBtnTextRef}>
                    <i className="fas fa-wifi"></i> {postItem.is_live ? 'Tắt Live' : 'Bật Live'}
                  </button>
                }

                {(!postItem.editing_status) &&
                  <Link to={`/posts/edit/${postItem._id}`}>
                    <span className="btn btn-danger btn-sm mr-2" >
                      <i className="fas fa-pencil-alt"></i> Edit
                  </span>
                  </Link>
                }
                {/* && user.id == postItem.user.id  */}
                {/* {
                (user.role.name == 'SuperAdmin' && postItem.posttype.type_code == 'draft') &&
                  <span className="btn btn-danger btn-sm mr-2" onClick={() => this.deleteItem(postItem.id)} >
                    <i className="fas fa-times"></i> Delete
                </span>
                } */}
              </>
            }

          </div>
        </td>

        <td style={{ width: '210px' }}>
          {postItem.posttype &&
            <>
              <Status posttype={postItem.posttype} scheduled={postItem.scheduleAt} />
              <Date updated_at={postItem.modifiedAt || postItem.updatedAt} typecode={postItem.posttype.type_code} published_at={postItem.publishedAt} scheduled={postItem.scheduleAt} />
            </>
          }
        </td>

        <td style={{ width: '150px' }}>
          <span className="tag tag-success">{this.generateCategory(idx, postItem.categories)}</span>
        </td>

        <td className=" ipad-dis-none" style={{ width: '150px' }}>
          <p>
            {postItem.is_pr ?
              (
                'T.H'
              ) : (
                (postItem.contentpenname && postItem.contentpenname.label) || '-'
              )
            }
          </p>
        </td>

        <td style={{ width: '60px', textAlign: 'center' }} className="user ipad-dis-none" >
          {
            <div className="hover-opacity-1" style={{ width: "33px", margin: "0 auto", opacity: "0.7" }} data-toggle="tooltip" title={'Viết bởi ' + postItem.user.fullname}>
              <UserAvatar size="33" name={this.uppercaseName(postItem.user ? postItem.user.fullname : "NN")}
                src={srcAvatarUser} colors={['#ff6188', '#fc9867', '#ffd866', '#a9dc76', '#78dce8', '#ab9df2']} />
            </div>
          }

          {
            postItem.publisher ?
              <div className="mt-2 hover-opacity-1" style={{ width: "33px", margin: "0 auto", opacity: "0.7" }} data-toggle="tooltip" title={'Đăng bởi ' + postItem.publisher.fullname}>
                <UserAvatar style={{ margin: "0 auto" }} size="33" name={this.uppercaseName(postItem.publisher.fullname)}
                  src={srcAvatarPublisher} colors={['#ff6188', '#fc9867', '#ffd866', '#a9dc76', '#78dce8', '#ab9df2']} />
              </div>
              : '-'
          }
        </td>
      </tr >
    )
  }

};
export default connect(store => {
  return {
    login: store.loginInfo,
    config: store.config
  };
}, dispatch => {
  return {
    setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    deletePost: (value) => { dispatch(postActions.deletePost(value)) },
  }
})(PostItem)
