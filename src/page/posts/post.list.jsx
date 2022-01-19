import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../store/action/post";
import * as configActions from "../../store/action/config";
import Link from "src/components/link";
import PostItem from "../../components/posts/item";
import Select from "react-select";
import * as _ from "lodash";
import ApiService from "../../services/ApiService";
import localStorage from "../../utils/local-storage";
import Input from "../../components/input/Input";
import { filtersToUlr, buildCategoryDropDown } from "../../utils/post-filter";
import './post.scss';
import Pagination from "react-js-pagination"
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import moment from 'moment'
import slug from 'slug'
// import { addNPlayer, emitLockToAllUsers } from '../../Api'
import { toast } from 'react-toastify'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import HeaderMobileComponent from "src/components/layout/header-mobile";
import axios from "axios";
class PostList extends Component {
  isMobile = false;
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      filters: {
        category: {
          fieldName: "categories",
          value: ""
        },
        penname: {
          fieldName: "contentpenname_in",
          value: ""
        },
        status: {
          fieldName: "type",
          value: ""
        },
        search: {
          fieldName: "title_search_contains",
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
        start_date: {
          fieldName: "createdAt_gte",
          value: ""
        },
        end_date: {
          fieldName: "createdAt_lte",
          value: ""
        },
        editor_type: {
          fieldName: "editor_type",
          value: ""
        },
      },
      categories: [],
      penNames: [],
      statuses: [],
      posts: [],
      totalItemCount: 0,
      date: [null, null],
      post_types: [],
      update: 'no',
      showSuggestTagsOnMobile: false
    };

    this.handleOnFocus = this.handleOnFocus.bind(this)
  }

  componentDidMount() {
    const { user, router } = this.props;
    this.getConfigs();
    this.props.getPennames();
    let filters = this.getFiltersFromQuery(router.location.query);
    this.props.getListPost(filters);
    window.addEventListener('resize', this.chooseLayout);
    // addNPlayer((err, update) => this.actionSocket(update));
    this.chooseLayout();
  }

  actionSocket(post) {
    let { posts } = this.state

    if (this.youCanListen(post)) {

      if (!toast.isActive(post.id)) {
        toast.success(post.userAction.email + " vừa cập nhật bài viết " + post.title, {
          toastId: post.id
        })
      }

      if (_.some(posts, ['id', post.id])) {
        _.remove(posts, ['id', post.id]);
      }
      posts.splice(0, 0, post);
      this.props.updateListPost(posts);
    }

  }

  youCanListen(postFromSocket) {
    const _user = localStorage.get("_user");

    let findCat = [];

    if (window.location.pathname === '/posts' || window.location.pathname === '/') {
      let slugCat = this.state.filters.category.value;
      let currentUserCate = _user.categories;
      if (slugCat != "") {
        currentUserCate = _.filter(currentUserCate, (cat) => {
          return cat.url == slugCat
        })
      }

      findCat = _.intersectionBy(currentUserCate, postFromSocket.categories, '_id');
    } else {
      return false;
    }

    if (postFromSocket.user.id == _user.id) {
      return true
    }
    if (postFromSocket.posttype.type_code == 'ready') {
      // bai cua no thi listen
      if (postFromSocket.user.id == _user._id) {
        return true
      } else {
        // ai co quyen publish va edit publish thi listen
        return ((_user.can_edit_publish || _user.can_publish) && findCat.length > 0) || false;
      }
    } else {
      return ((_user.can_edit_publish || _user.can_read_other) && findCat.length > 0) || false;
    }

  }

  compare2Object(postFromSocket, objpost2) {
    const obj1 = postFromSocket
    const obj2 = objpost2
    if (!obj1) return false;
    delete obj1.updatedAt
    delete obj1.editing_status
    delete obj1.start_editing
    delete obj1.editing
    delete obj2.updatedAt
    delete obj2.editing_status
    delete obj2.start_editing
    delete obj2.editing
    return _.isEqual(obj1, obj2)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getConfigs(nextProps);

    if (!_.isEqual(this.props.posts.sort(), nextProps.posts.sort())) {
      // if (JSON.stringify(this.state.posts) != JSON.stringify(nextProps.posts)) {
      let postSet = _.sortBy(nextProps.posts, [(o) => { return !o.is_live; }]);
      this.setState({
        posts: postSet,
        totalItemCount: nextProps.totalPosts
      }, () => {
        this.getViewPublicPosts(this.state.posts);
      });
    }
  }


  componentWillUnmount() {
    this.setState({ posts: [] })
  }

  getViewPublicPosts = async (posts) => {

    // console.log(posts);
    const publishPosts = posts.filter(post => post.posttype.type_code === 'ready');
    const ids = [];
    const validData = [];
    publishPosts.map(post => {
      const regexPattern = /-(\d+)\.html$/;
      const idMatch = post.post_url.match(regexPattern);
      if (idMatch) {
        ids.push(idMatch[1]);
        validData.push({
          post_id: post.id,
          id: idMatch[1],
          view: 0
        })

      }
    });
    const stringIds = ids.toString();

    ApiService.get(`/view-by-id?ids=${stringIds}`).then(result => {
      if (result && result.reports[0]) {
        const rows = result.reports[0].data.rows;

        const updatedViewValidData = validData.map(item => {
          rows.map(row => {
            if (row.dimensions[0].includes(item.id)) {
              item.view += parseInt(row.metrics[0].values, 10);
            }
          })

          return item;
        })

        posts.map(post => {
          const viewData = updatedViewValidData.filter(row => row.post_id === post.id)[0];
          post.view = viewData ? viewData.view : null;
        })
        // this.props.updateListPost(posts);
      }
    });
  }

  addNewPost() {
    this.props.history.push("/posts/new");
  }

  selectedFilterDate = value => {
    this.setState({ filterDate: value });
  };

  selectedFilterCategory = selected => {
    let v = selected.value.url;
    this.addFilter("category", v);
  };

  selectedFilterPenname = selected => {
    let v = selected.value._id;
    this.addFilter("penname", v);
  };
  selectedFilterPostType = selected => {
    let v = selected.code;
    this.addFilter("editor_type", v);
  };

  selectedFilterStatus = selected => {
    let v = selected.value;
    this.addFilter("status", v);
  };

  addFilter(filter, value, execute = true) {
    let filters = this.resetFilters(filter);
    filters[filter].value = value;
    this.setState(
      {
        filters: filters,
        posts: []
      },
      () => {
        // update filter and execute immediately
        if (execute) {
          let queryString = filtersToUlr(this.state.filters);

          if (queryString != "") {
            queryString = queryString.substr(1, queryString.length - 1);
            this.props.history.push(`/posts?${queryString}`);
          } else {
            this.props.history.push(`/posts`);
          }
          this.props.getListPost(this.state.filters);
        }

      }
    );
  }

  resetFilters(filter) {
    let { filters } = this.state;
    if (filter == "search") {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          filters[key].value = "";
        }
      }
    } else {
      filters.page.value = 1;
      filters.search.value = "";
    }

    return filters;
  }

  addTextSearchPost(keyword) {
    if (keyword == "") {
      this.searchPosts("")
    }
  }

  searchPosts(keyword) {
    this.addFilter("search", slug(keyword, { replacement: ' ' }));
  }
  onChange = date => {
    this.setState({ date })
    let start_date = "";
    let end_date = "";
    if (date) {
      start_date = moment(date[0]).format();
      end_date = moment(date[1]).format();
    }
    this.addFilter("start_date", start_date, false);
    this.addFilter("end_date", end_date, true);
  }
  chooseLayout() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
  handleOnFocus(value) {
    if (this.isMobile) {
      this.setState({ showSuggestTagsOnMobile: value });
    }
  }

  handleShowList = value => {
    this.setState({ showSuggestTagsOnMobile: value });
  }

  handleInputChange = (inputValue) => {
    if (inputValue && inputValue.length >= 3) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let filters = {
          label: {
            fieldName: "label_contains",
            value: inputValue
          },
        }
        this.props.getPennames(filters);
      }, 1000);
    }

  };

  render() {
    const _user = localStorage.get("_user");
    const { categories = [], penNames = [], posts = [], statuses = [], post_types = [], totalItemCount = 0 } = this.state;

    return (
      <div className={"content-wrapper post-list-container" + (this.isMobile ? ' mobile' : '')}>
        <section className="content-header">
          <div className="container-fluid">

            <HeaderMobileComponent showList={this.handleShowList} />

            <div className="row mx-2 mb-2">
              <div className="col-6 col-lg-2 my-2">
                <Select
                  value={this.getSelectedItemOfPostType()}
                  options={post_types}
                  placeholder="Chọn loại bài viết"
                  onChange={this.selectedFilterPostType}
                />
              </div>
              {/* <div className="col-6 col-lg-2 my-2">
                <Select
                  value={this.getSelectedItemOfPostStatus()}
                  options={statuses}
                  onChange={this.selectedFilterStatus}
                />
              </div>

              <div className="col-6 col-lg-2 my-2">
                <Select
                  value={this.getSelectedItemOfCategory()}
                  options={categories}
                  onChange={this.selectedFilterCategory}
                />
              </div>
              <div className="col-6 col-lg-2 my-2">
                <Select
                  value={this.getSelectedItemOfPenName()}
                  options={penNames}
                  placeholder="Chọn bút danh"
                  onInputChange={this.handleInputChange}
                  onChange={this.selectedFilterPenname}
                />
              </div> */}
              <div className="col-12 col-lg-2 my-2">
                <DateRangePicker
                  onChange={this.onChange}
                  value={this.getSelectedItemOfDate()}
                  calendarIcon={<i className="far fa-calendar-alt"></i>}
                  maxDate={new Date()}
                  className="bg-white"
                />
              </div>
              <div className="col-12 col-lg-2 my-2">
                <Input
                  icon="search"
                  placeholder="Tìm kiếm"
                  value={this.state.filters.search.value}
                  onChange={value => {
                    this.addTextSearchPost(value);
                  }}
                  onSubmit={value => {
                    this.searchPosts(value);
                  }}
                />
              </div>


            </div>


          </div>
        </section>

        {/* Post List */}
        <section className={"content" + (this.isMobile ? ' list-mobile' : '')}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-default color-palette-box">

                  {/* Post List */}
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover">
                      {!this.isMobile ? (
                        <thead >
                          <tr>
                            <th></th>
                            <th>Tiêu đề bài viết</th>
                            <th>Trạng thái</th>
                            <th>Chuyên Mục</th>
                            <th className="ipad-dis-none">Bút danh</th>
                            <th className="user text-center ipad-dis-none">User</th>
                            {/* <th className="text-center ipad-dis-none">Đăng</th> */}
                          </tr>
                        </thead>
                      ) : (<thead></thead>)}
                      <tbody>
                        {posts.length > 0 ? (
                          posts.map((post, idx) => {
                            return (
                              <PostItem
                                postItem={post}
                                contentcreatortype={this.state.penNames}
                                key={`post-${idx}`}
                                idx={`post-${idx}`}
                              />
                            );
                          })
                        ) : (
                            <tr className="odd" style={{ height: "500px", position: 'relative', backgroundColor: "unset" }}>
                              <td
                                valign="top"
                                colSpan="8"
                                className="dataTables_empty text-center"
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  width: '100%',
                                  borderTop: '0'
                                }}
                              >
                                <Spinner animation="grow" variant="primary" />
                                <Spinner animation="grow" variant="secondary" />
                                <Spinner animation="grow" variant="success" />
                                <Spinner animation="grow" variant="danger" />
                                <Spinner animation="grow" variant="warning" />
                                <Spinner animation="grow" variant="info" />
                                <Spinner animation="grow" variant="light" />
                                <Spinner animation="grow" variant="dark" />
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {this.state.totalItemCount > 0 &&
              <div className="row">
                <div className="col-sm-12 col-md-7">
                  <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                    <Pagination
                      activePage={parseInt(this.state.filters.page.value)}
                      itemsCountPerPage={parseInt(this.state.filters.limit.value)}
                      totalItemsCount={parseInt(this.state.totalItemCount)}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                      itemClass="paginate_button page-item"
                      activeClass="active"
                      disabledClass="disabled"
                      itemClassPrev="previous"
                      itemClassNext="next"
                      linkClass="page-link"
                      hideFirstLastPages={true}
                      prevPageText="Previous"
                      nextPageText="Next"
                    />
                  </div>
                </div>
              </div>
            }

          </div>
        </section>

        <a href="/posts/new" className="dis-none mobi-dis-block">
          <button type="button" className="btn btn-lg rounded-circle bg-saostar fixed-bottom-right"><i className="fas fa-plus"></i></button>
        </a>
      </div >
    );
  }

  handlePageChange = (pageNumber) => {
    this.addFilter('page', pageNumber);
  }

  getConfigs(props) {
    const { config = {}, profile = {} } = props || this.props;
    const { categories = [] } = profile;
    const { statuses = [] } = profile;
    const { listContentCreator = {}, listCategory = [], listPenname = [] } = config;
    const { post_types = [] } = config;

    // const { penname = [] } = listPenname || {};
    let fCategories = [{ label: "Tất cả chuyên mục", value: { url: "" } }];
    let buildCate = buildCategoryDropDown(listCategory);
    fCategories = fCategories.concat(buildCate);

    let fPens = [{ label: "Tất cả bút danh", value: { _id: "" } }];

    if (listPenname && listPenname.length > 0) {
      const fPennames = listPenname.map(item => {
        return {
          label: item.label,
          value: item
        };
      });
      fPens = fPens.concat(fPennames);
    }


    const postStatus = [
      { value: '', label: 'Tất cả bài viết' },
      { value: 'bai-cua-toi', label: 'Bài viết của tôi' },
      { value: 'da-dang', label: 'Đã đăng' },
      { value: 'da-len-lich', label: 'Đã lên lịch' },
      { value: 'cho-duyet', label: 'Chờ duyệt' },
      { value: 'nhap', label: 'Nháp' },
      { value: 'thung-rac', label: "Thùng rác" }
    ];

    const postTypes = [
      { value: '', label: 'Tất cả loại bài', code: '' },
      { value: 'bai-thuong', label: 'Bài thường', code: 'normal' },
      { value: 'bai-mini', label: 'Bài mini', code: 'mini' },
      { value: 'bai-special', label: 'Bài Special', code: 'special' },
      { value: 'bai-video', label: 'Bài Video', code: 'video' },
      { value: 'pr', label: 'Bài PR', code: 'pr' },
    ];

    this.setState({
      categories: fCategories,
      penNames: fPens,
      statuses: postStatus,
      post_types: postTypes,
      editor_type: postTypes
    });
  }

  getFiltersFromQuery(query) {
    let filtersQuery = {};
    let { filters } = this.state;

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
        if (value && value != "") {
          filtersQuery[key] = {
            ...this.state.filters[key],
            value: value
          };
        }
      }
    }
    filters = _.merge(filters, filtersQuery);
    this.setState({ filters });
    return filters;
  }

  getSelectedItemOfCategory() {
    if (this.state.filters.category.value == "") {
      return this.state.categories.length > 0 && this.state.categories[0];
    }
    return this.state.categories.find(
      item => item.value.url == this.state.filters.category.value
    );
  }

  getSelectedItemOfPenName() {
    if (this.state.filters.penname.value == "") {
      return this.state.penNames.length > 0 && this.state.penNames[0];
    }
    return this.state.penNames.find(
      item => item.value._id == this.state.filters.penname.value
    );
  }
  getSelectedItemOfPostStatus() {
    if (this.state.filters.status.value == "") {
      return this.state.statuses.length > 0 && this.state.statuses[0];
    }

    return this.state.statuses.find(
      item => item.value == this.state.filters.status.value
    );
  }
  getSelectedItemOfPostType() {
    if (this.state.filters.editor_type.value == "") {
      return this.state.post_types.length > 0 && this.state.post_types[0];
    }

    return this.state.post_types.find(
      item => item.value == this.state.filters.editor_type.value
    );
  }

  getSelectedItemOfDate() {
    let { date } = this.state
    if (this.state.filters.start_date.value !== "" && this.state.filters.end_date.value !== "") {
      date = [moment(this.state.filters.start_date.value).format(), moment(this.state.filters.end_date.value).format()]
    }
    return date;
  }

}

export default connect(store => {
  return {
    profile: store.loginInfo.userInfo,
    router: store.router,
    posts: store.post.listPost,
    totalPosts: store.post.totalPosts,
    config: store.config
  };
}, dispatch => {
  return {
    getListPost: (value) => { dispatch(postActions.getListPost(value)) },
    countListPost: (value) => { dispatch(postActions.countListPost(value)) },
    updateListPost: (value) => { dispatch(postActions.updateListPost(value)) },
    updatePost: (value) => { dispatch(postActions.updatePost(value)) },
    getPennames: (value) => { dispatch(configActions.getPennames(value)) },
  }
})(PostList)

