import React, { Component } from "react";
import { connect } from "react-redux";
import * as homeActions from "../../store/action/home";
import * as postActions from "../../store/action/post";
import * as _ from "lodash";
import "../posts/post.scss";
import moment from "moment";
import Modal from 'react-bootstrap/Modal'
import HomepageList from './homepage.list';
import Select from "react-select";
import HeaderMobileComponent from "src/components/layout/header-mobile";
import localStorage from '../../utils/local-storage'
import ApiService from "../../services/ApiService";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class Homepage extends Component {
  isMobile = false;
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      // items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
      postLists: null,
      isLoading: false,
      show: false,
      inputValue: '',
      filters: {
        search: {
          fieldName: "_q",
          value: ""
        },
        page: {
          fieldName: "_start",
          value: "1"
        },
        limit: {
          fieldName: "_limit",
          value: "20"
        },
        status: {
          fieldName: "type",
          value: "da-dang"
        }
      },
      editId: '',
      homepageConfig: null
    };
  }
  componentDidMount() {
    console.log('hello');

    this.props.getListHomepage();
    const _user = localStorage.get('_user');
    ApiService.get(`configurations?label_eq=homepage`).then(result => {
      if (result && result[0]) {
        // console.log(result);
        // console.log(_user);

        let valueHomepage = result[0];
        if (valueHomepage.value != "") {
          if (valueHomepage.value != _user.email) {
            this.confirmAction(valueHomepage.value);
          } else {
            this.canEditHomepage(valueHomepage, _user)
            this.setState({ homepageConfig: valueHomepage });
          }
        } else {
          this.canEditHomepage(valueHomepage, _user)
          this.setState({ homepageConfig: valueHomepage });
        }

      }
    });
  }

  componentWillUnmount() {
    this.updateHomepage(this.state.homepageConfig, "");
  }

  canEditHomepage(valueHomepage, _user) {
    this.updateHomepage(valueHomepage, _user.email)
  }

  updateHomepage(valueHomepage, value) {
    if (value) {
      localStorage.set('editingHomepage', value);
      valueHomepage.value = value;
    } else {
      localStorage.remove('editingHomepage');
    }

    ApiService.put(`configurations/${valueHomepage.id}`, valueHomepage).then(result => { });

  }


  confirmAction(value) {
    const options = {
      title: "Title",
      message: "Message",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => (
        <div className="custom-ui-alert">
          <h1>Trang chủ đang được cài đặt bởi {value}</h1>
          <div
            className="bg-c7c6c5 bg-c7c6c5 txt-center pt-3 pb-3"
            onClick={() => {
              onClose();
              window.location.href = "/";
            }}
          >
            Trở lại
          </div>
        </div>
      ),
      closeOnEscape: false,
      closeOnClickOutside: false
    };

    confirmAlert(options);
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    const { homepage: { listItem }, posts } = this.props
    const { homepage: { listItem: nextListItem }, posts: nextPosts } = nextProps
    if (listItem.value != nextListItem.value && nextListItem.value) {
      this.setState({ items: nextListItem.value })
    }
    if (posts.length !== nextPosts.length && nextPosts) {
      let data = _.filter(nextPosts, (pst) => {
        // pst.posttype.type_code == 'ready' && 
        return !this.checkInList(pst._id)
      });
      this.setState({ postLists: data, isLoading: false })
    }
  }

  handleInputChange = (e) => {
    this.setState({ fisLoading: true })
    const inputData = e.target.value
    if (inputData.length >= 3) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.addFilter('search', inputData, true);
      }, 1000);
    }

  };
  chosePost = (item) => {
    console.log(item);
    console.log(this.state.editId);
    if (this.state.editId != "") {
      const dataInput = {
        "_id": this.state.editId,
        "active": true,
        "post": item._id
      }
      this.props.updateHomepageItem(dataInput);
    } else {
      const dataInput = {
        "active": true,
        "post": item._id
      }
      this.props.createHomepageItem(dataInput);
    }
    this.setState({ show: false })
  }

  checkInList(postId) {
    if (_.findIndex(this.state.items, (itm) => {
      return itm.post._id == postId
    }) > -1) {
      return true
    }
    return false
  }

  addFilter(filter, value, execute = true) {
    let filters = this.state.filters;
    filters[filter].value = value;
    this.setState({ filters: filters, isLoading: true },
      () => {
        // update filter and execute immediately
        if (execute) {
          this.props.getListPost(this.state.filters);
        }
      }
    );
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
    postLists = _.filter(postLists, (pst) => {
      // pst.posttype.type_code == 'ready' && 
      return !this.checkInList(pst._id)
    });
    // console.log(status);
    // console.log(postLists);
    this.setState({ show: status, editId: editId, postLists })
  }

  render() {
    const _user = localStorage.get('_user');

    const { items, postLists } = this.state;

    return (
      _user.can_homepage ?
        <div className="content-wrapper">
          <HeaderMobileComponent />
          <section className="content">
            <div className="card mt-3">
              <div className="card-header">
                <h3 className="card-title">Bài viết trang chủ </h3>
                {/* <div className="card-tools" style={{ display: 'flex'}}>    
            <button className="btn btn-success btn-sm mr10" onClick={this.openModalCreate}><i className="fas fa-plus"></i> Thêm mới</button>
            </div> */}
              </div>
              <div className="card-body py-3 px-1">
                {/* <Select
                // value={() => this.findSelected(item.post)}
                options={this.state.items}
                // onChange={(value)=>this.onPhotographerRoyaltiesSelected(value)}
                isSearchable={true}
                placeholder="Thêm bài viết mới"
              /> */}
                {
                  (items && items.length > 0) ?
                    <HomepageList items={this.state.items} />
                    : ""
                }

              </div>
            </div>
          </section>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <input type="text" className="form-control" id="exampleInputEmail1" onChange={this.handleInputChange} placeholder="Tìm kiếm" />
              {this.state.isLoading && <i className="fas fa-2x fa-sync fa-spin"></i>}
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th style={{ width: "10px" }}>#</th>
                    <th>Tiêu đề</th>
                    <th style={{ width: "100px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>

                  {(postLists && postLists.length) > 0 && (
                    postLists.map((post, idx) => {
                      return (
                        <tr key={`itemsearch-${idx}`}>
                          <td>{idx + 1}.</td>
                          <td>{post.title || ""}</td>
                          <td><span className="badge bg-danger" onClick={() => this.chosePost(post)}>Chọn</span></td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </Modal.Body>
          </Modal>
        </div>
        : ''
    );
  }

}

export default connect(
  store => {
    return {
      homepage: store.homepage,
      router: store.router,
      posts: store.post.listPost,
      config: store.config
    };
  },
  dispatch => {
    return {
      getListHomepage: value => { dispatch(homeActions.getListHomepage(value)) },
      createHomepageItem: value => { dispatch(homeActions.createHomepageItem(value)) },
      updateHomepageItem: value => { dispatch(homeActions.updateHomepageItem(value)) },
      deleteHomepageItem: value => { dispatch(homeActions.deleteHomepageItem(value)) },
      getListPost: (value) => { dispatch(postActions.getListPost(value)) },
    };
  }
)(Homepage);
