import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../store/action/post";
import * as configActions from "../../store/action/config";

import Link from "src/components/link";
import Select from "react-select";
import * as _ from "lodash";
import ApiService from "../../services/ApiService";
import localStorage from "../../utils/local-storage";
import Input from "../../components/input/Input";
import { filtersToUlr, buildCategoryDropDown } from "../../utils/post-filter";
import "../posts/post.scss";
import Pagination from "react-js-pagination";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import RoyaltiesReportItem from "../../components/royalties-report/royalties-report-item";
import HeaderMobileComponent from "src/components/layout/header-mobile";
import Spinner from "react-bootstrap/Spinner";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScreenSize from "../../services/screenSize";
import slug from 'slug';
import ReactToPdf from "react-to-pdf";
import DateRangePickerCustom from "../../utils/date-range-picker";
import Export from './export';

const SI_SYMBOL = ["", "k", "tr", "tỉ", "T", "P", "E"];
const ref = React.createRef();
const options = {
  orientation: 'landscape',
  unit: 'px'
};
class RoyaltiesList extends Component {
  isMobile = false;
  constructor(props) {
    super(props);
    const dateinit = this.dateInitFunction();

    this.state = {
      activePage: 1,
      filters: {
        category: {
          fieldName: "categories",
          value: ""
        },
        editor: {
          fieldName: "royalties_editor",
          value: ""
        },
        status: {
          fieldName: "type",
          value: "da-dang"
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
          value: "50"
        },
        start_date: {
          fieldName: "publishedAt_gte",
          value: dateinit[0]
        },
        end_date: {
          fieldName: "publishedAt_lte",
          value: dateinit[1]
        },
        editor_type: {
          fieldName: "editor_type",
          value: ""
        },
        pay_money: {
          fieldName: "pay_money",
          value: 'yes'
        }
        // ,royalties_editor: {
        //   fieldName: "royalties_editor",
        //   value: _.get(props, "match.params.royaltiesEditor", "")
        // }
      },
      categories: [],
      penNames: [],
      statuses: [],
      posts: [],
      totalItemCount: 0,
      date: null,
      dot_nay: null,
      dot_truoc: null,
      post_types: [],
      listRoyaltiesEditor: [],
      listRoyaltiesPhoto: [],
      moneyArr: [],
      money: {
        money_editor: 0,
        money_photo: 0,
        total: 0
      },
      canAccess: false,
      isLoadingE: false
    };

    this.isMobile = ScreenSize.isMobile;
  }

  componentDidMount() {
    const { user, router, config } = this.props;
    // this.getConfigs();
    let filters = this.getFiltersFromQuery(router.location.query);
    // console.log('filters', filters);
    this.props.getListPost(filters);

    if (!config.listRoyaltiesEditor) {
      this.props.getRoyaltiesEditor();
    }
    if (!config.listRoyaltiesPhoto) {
      this.props.getRoyaltiesPhoto();
    }

    const _user = localStorage.get("_user");
    if (_user.can_view_royalties || _user.can_set_royalties) {
      this.setState({ canAccess: true });
    } else {
      this.confirmAction();
    }

    this.initMonthFilter();
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getConfigs(nextProps);
    if (JSON.stringify(this.state.posts) != JSON.stringify(nextProps.posts)) {
      this.setState({
        posts: nextProps.posts,
        totalItemCount: nextProps.totalPosts
      }, () => {
        this.getViewPublicPosts(this.state.posts);
      });
    }
  }

  confirmAction() {
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
          <h1>Bạn không có quyền truy cập mục này.</h1>
          <div
            className="bg-c7c6c5 bg-c7c6c5 txt-center pt-3 pb-3"
            onClick={() => {
              onClose();
              this.props.history.push("/");
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

  dateInitFunction() {
    const currentDate = moment().date();

    if (currentDate > 25) {
      const dot_nay_b = moment().format("YYYYMM") + currentDate;
      const dot_nay_a = moment().format("YYYYMM") + "22";

      return [moment(dot_nay_a).format(), moment(dot_nay_b).format()];
    } else {
      let formatedCurrentDate;
      if (currentDate > 21) {
        formatedCurrentDate = 21
      } else {
        formatedCurrentDate = currentDate < 10 ? '0' + currentDate : currentDate;
      }

      const dot_nay_b = moment().format("YYYYMM") + formatedCurrentDate;
      const dot_nay_a =
        moment()
          .subtract(1, "months")
          .format("YYYYMM") + "22";

      return [moment(dot_nay_a).format(), moment(dot_nay_b).format()];
    }
  }

  initMonthFilter() {
    const currentDate = moment().date();

    if (currentDate > 25) {
      const dot_nay_b = moment().format("YYYYMM") + currentDate;
      const dot_nay_a = moment().format("YYYYMM") + "22";
      const dot_truoc_b = moment().format("YYYYMM") + "21";
      const dot_truoc_a =
        moment()
          .subtract(1, "months")
          .format("YYYYMM") + "22";

      this.setState({
        date: [moment(dot_nay_a).format(), moment(dot_nay_b).format()],
        dot_nay: [moment(dot_nay_a).format(), moment(dot_nay_b).format()],
        dot_truoc: [moment(dot_truoc_a).format(), moment(dot_truoc_b).format()]
      });
    } else {
      let formatedCurrentDate;
      if (currentDate > 21) {
        formatedCurrentDate = 21
      } else {
        formatedCurrentDate = currentDate < 10 ? '0' + currentDate : currentDate;
      }
      const dot_nay_b = moment().format("YYYYMM") + formatedCurrentDate;
      const dot_nay_a =
        moment()
          .subtract(1, "months")
          .format("YYYYMM") + "22";
      const dot_truoc_b =
        moment()
          .subtract(1, "months")
          .format("YYYYMM") + "21";
      const dot_truoc_a =
        moment()
          .subtract(2, "months")
          .format("YYYYMM") + "22";

      this.setState({
        date: [moment(dot_nay_a).format(), moment(dot_nay_b).format()],
        dot_nay: [moment(dot_nay_a).format(), moment(dot_nay_b).format()],
        dot_truoc: [moment(dot_truoc_a).format(), moment(dot_truoc_b).format()]
      });
    }
  }

  selectDot = value => {
    if (value === 1) {
      this.setState({ date: this.state.dot_nay });
      this.addFilter("start_date", this.state.dot_nay[0], false);
      this.addFilter("end_date", this.state.dot_nay[1], true);
    } else if (value === 0) {
      this.setState({ date: this.state.dot_truoc });
      this.addFilter("start_date", this.state.dot_truoc[0], false);
      this.addFilter("end_date", this.state.dot_truoc[1], true);
    } else if (value === -1) {
      this.addFilter("pay_money", 'no', true);
    }
  };

  selectedFilterDate = value => {
    this.setState({ filterDate: value });
  };

  selectedFilterCategory = selected => {
    let v = selected.value.url;
    this.addFilter("category", v);
  };

  selectedFilterEditor = selected => {
    let v = selected.value.slug;
    this.addFilter("editor", v);
  };
  selectedFilterPostType = selected => {
    console.log(selected);
    let v = selected.code;
    this.addFilter("editor_type", v);
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
            // window.location.href = `/nhuan?${queryString}`
            this.props.history.push(`/nhuan?${queryString}`);
          } else {
            // window.location.href = `/nhuan`
            this.props.history.push(`/nhuan`);
          }
          this.setState({ posts: [] });

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

    if (filter != 'page') {
      filters.pay_money.value = "yes";
    }


    return filters;
  }

  searchPosts(keyword) {
    this.setState({ posts: [] });
    this.addFilter("search", keyword);
  }
  onChange = date => {
    this.setState({ date });
    let start_date = "";
    let end_date = "";
    if (date) {
      start_date = moment(date[0]).format();
      end_date = moment(date[1]).format();
    }
    this.addFilter("start_date", start_date, false);
    this.addFilter("end_date", end_date, true);
  };

  handlePageChange = pageNumber => {
    this.addFilter("page", pageNumber);
  };

  getConfigs(props) {
    // console.log("get config");
    const {
      config = {},
      profile = {},
      posts,
      totalMoneyEditor,
      totalMoney,
      totalMoneyPhoto
    } = props || this.props;
    const { statuses = [] } = profile;
    const {
      listContentCreator = [],
      listCategory = [],
      listRoyaltiesEditor = [],
      listRoyaltiesPhoto = []
    } = config;
    const { post_types = [] } = config;

    const { penname = [] } = listRoyaltiesEditor || [];

    let buildCate = buildCategoryDropDown(listCategory);
    let fCategories = [{ label: "Tất cả chuyên mục", value: { url: "" } }];
    fCategories = fCategories.concat(buildCate);


    let fEditor = [{ label: "Tất cả biên tập", value: { slug: "" } }];

    if (listRoyaltiesEditor && listRoyaltiesEditor.length > 0) {
      _.map(listRoyaltiesEditor, item => {
        return (item.value = item);
      });
    }

    fEditor = fEditor.concat(listRoyaltiesEditor);

    let fPhoto = [];

    if (listRoyaltiesPhoto && listRoyaltiesPhoto.length > 0) {
      _.map(listRoyaltiesPhoto, item => {
        return (item.value = item);
      });
    }

    fPhoto = fPhoto.concat(listRoyaltiesPhoto);

    const fPennames = penname.map(item => {
      return {
        label: item.name,
        value: item
      };
    });
    let fPens = [{ label: "Tất cả biên tập", value: { _id: "" } }];
    fPens = fPens.concat(fPennames);

    const postStatus = [
      { value: "", label: "Tất cả bài viết" },
      { value: "bai-cua-toi", label: "Bài viết của tôi" },
      { value: "da-dang", label: "Đã đăng" },
      { value: "da-len-lich", label: "Đã lên lịch" },
      { value: "cho-duyet", label: "Chờ duyệt" },
      { value: "nhap", label: "Nháp" },
      { value: "thung-rac", label: "Thùng rác" }
    ];

    const postTypes = [
      { value: "", label: "Tất cả loại bài", code: "" },
      { value: "normal", label: "Bài thường", code: "normal" },
      { value: "mini", label: "Bài mini", code: "mini" },
      { value: "special", label: "Bài Special", code: "special" },
      { value: "video", label: "Bài Video", code: "video" }
    ];

    let money = {
      money_editor: totalMoneyEditor || 0,
      money_photo: totalMoneyPhoto || 0,
      total: totalMoney || 0
    };

    this.setState({
      categories: fCategories,
      penNames: fEditor,
      statuses: postStatus,
      post_types: postTypes,
      editor_type: postTypes,
      posts: posts,
      listRoyaltiesEditor: fEditor,
      listRoyaltiesPhoto: fPhoto,
      money: money
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
    this.setState({ filters: filters });
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
  getSelectedItemOfEditor() {
    if (this.state.filters.editor.value == "" || this.state.penNames.length == 2) {
      return this.state.penNames.length > 0 && this.state.penNames[0];
    }

    return this.state.penNames.find(
      item => item.value.slug == this.state.filters.editor.value
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
    let { date } = this.state;
    if (
      this.state.filters.start_date.value !== "" &&
      this.state.filters.end_date.value !== ""
    ) {
      date = [
        moment(this.state.filters.start_date.value).format(),
        moment(this.state.filters.end_date.value).format()
      ];
    }
    return date;
  }
  formatNumber(number) {
    var tier = (Math.log10(number) / 3) | 0;
    if (tier == 0) return number;
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;

    return parseFloat(scaled.toFixed(2)) + suffix;
  }

  handleUpdateTotal = (value, field) => {
    const total = this.state.money.total + value;

    this.setState(
      {
        money: {
          ...this.state.money,
          total,
          ...(field === "editor" && {
            money_editor: this.state.money.money_editor + value
          }),
          ...(field === "photo" && {
            money_photo: this.state.money.money_photo + value
          })
        }
      },
      () => console.log(this.state.money)
    );
    toast.success("Cập nhật thành công");
  };

  handleOnChangeDateRange = dateRange => {
    const start_date = moment(dateRange.startDate).format();
    const end_date = moment(dateRange.endDate).format();
    this.addFilter("start_date", start_date, false);
    this.addFilter("end_date", end_date, true);
    this.setState({ date: [start_date, end_date] })
  };


  handleInputChangeEditor = (inputValue) => {

    if (inputValue && inputValue.length >= 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        const slugValue = slug(inputValue);
        this.setState({ isLoadingE: true })
      }, 1000);
    }

  };

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
      }
    });
  }

  render() {
    const {
      categories = [],
      penNames = [],
      posts = [],
      statuses = [],
      post_types = [],
      totalItemCount = 0,
      listRoyaltiesEditor = [],
      listRoyaltiesPhoto = [],
      money = {},
      canAccess,
      isLoadingE
    } = this.state;

    return (
      <div className="content-wrapper post-list-container">
        <HeaderMobileComponent />

        {/* Post List */}
        {canAccess && (
          <section
            className={
              "content " + (this.isMobile ? "list-mobile list-royalties" : "")
            }
          >
            <div className="container-fluid">
              <div className="row mt-3">
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1">
                      <i className="fas fa-clipboard-list"></i>
                    </span>

                    <div className="info-box-content d-flex justify-content-between">
                      <div>
                        <span className="info-box-text">Tổng Bài Viết</span>
                        <span className="info-box-number">
                          {this.formatNumber(posts.length)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="info-box-text">Tổng View</span>
                        <span className="info-box-number">
                          {this.formatNumber(8333233)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-danger elevation-1">
                      <i className="fas fa-highlighter"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">Tổng Nhuận Bút</span>
                      <span className="info-box-number">
                        {this.formatNumber(money.money_editor * 1000)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="clearfix hidden-md-up"></div>

                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-success elevation-1">
                      <i className="fas fa-images"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">Tổng Nhuận Ảnh</span>
                      <span className="info-box-number">
                        {this.formatNumber(money.money_photo * 1000)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-warning elevation-1">
                      <i className="fas fa-coins"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">Tổng Nhuận</span>
                      <span className="info-box-number">
                        {this.formatNumber(money.total * 1000)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 p-0 p-md-2">
                  <div className="card card-default color-palette-box">
                    {/* Filter By Category and Pen Name */}
                    <div className="card-header">
                      <div className="row">
                        <div className="col-12 col-md-2 my-1 my-md-0 px-3 px-md-2">
                          <Select
                            value={this.getSelectedItemOfPostType()}
                            options={post_types}
                            placeholder="Chọn loại bài viết"
                            onChange={this.selectedFilterPostType}
                          />
                        </div>

                        <div className="col-12 col-md-2 my-1 my-md-0 px-3 px-md-2">
                          <Select
                            value={this.getSelectedItemOfCategory()}
                            options={categories}
                            placeholder="Chọn danh mục"
                            onChange={this.selectedFilterCategory}
                          />
                        </div>
                        <div className="col-12 col-md-2 my-1 my-md-0 px-3 px-md-2">
                          <Select
                            value={this.getSelectedItemOfEditor()}
                            options={listRoyaltiesEditor}
                            onChange={this.selectedFilterEditor}
                            onInputChange={this.handleInputChangeEditor}
                            isLoading={isLoadingE}
                          />
                        </div>
                        <div className="col-12 col-md-2 my-1 my-md-0 px-3 px-md-2">
                          <div className="form-group">
                            <div className="input-group">
                              {this.state.dot_nay && (
                                <DateRangePickerCustom
                                  startDate={new Date(this.state.date[0])}
                                  endDate={new Date(this.state.date[1])}
                                  onChange={this.handleOnChangeDateRange}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 my-1 my-md-0 ml-auto px-3 px-md-2">
                          <Input
                            icon="search"
                            placeholder="Tìm kiếm"
                            value={this.state.filters.search.value}
                            onSubmit={value => {
                              this.searchPosts(value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="row my-2">
                        <div className="col-12 col-lg-2 my-1 ml-auto">
                          <button
                            className="btn btn-primary btn-block"
                            onClick={e => this.selectDot(-1)}
                          >
                            <i className="fas fa-pause mr-2"></i>
                            Chưa chấm
                          </button>
                        </div>
                        <div className="col-12 col-lg-2 my-1">
                          <button
                            className="btn btn-primary btn-block"
                            onClick={e => this.selectDot(0)}
                          >
                            <i className="fas fa-backward mr-2"></i>
                            Đợt trước
                          </button>
                        </div>
                        <div className="col-12 col-lg-2 my-1">
                          <button
                            className="btn btn-primary btn-block"
                            onClick={e => this.selectDot(1)}
                          >
                            <i className="fas fa-forward mr-2"></i>
                            Đợt này
                          </button>
                        </div>

                        <div className="col-12 col-lg-2 my-1">
                          <Export filters={this.state.filters} />
                        </div>
                      </div>
                    </div>

                    {/* Post List */}
                    <div className="card-body table-responsive p-0">
                      <table className="table table-striped table-valign-middle" ref={ref}>
                        {!this.isMobile ? (
                          <thead>
                            <tr>
                              <th>Tiêu đề bài viết</th>
                              <th>Ngày xuất bản</th>
                              <th>Chuyên Mục</th>
                              <th>Biên tập</th>
                              <th>Phóng viên ảnh</th>
                              <th className="text-right">Nhuận bút</th>
                              <th className="text-right">Nhuận ảnh</th>
                              <th className="text-right">Tổng</th>
                              <th className="text-right">Lượt xem</th>
                            </tr>
                          </thead>
                        ) : (
                            <thead></thead>
                          )}
                        <tbody>
                          {posts.length > 0 ? (
                            posts.map((post, idx) => {
                              return (
                                <RoyaltiesReportItem
                                  postItem={post}
                                  contentcreatortype={this.state.penNames}
                                  key={`post-${idx}`}
                                  idx={`post-${idx}`}
                                  updateTotal={this.handleUpdateTotal}
                                  isMobile={this.isMobile}
                                  listRoyaltiesEditor={listRoyaltiesEditor}
                                  listRoyaltiesPhoto={listRoyaltiesPhoto}
                                />
                              );
                            })
                          ) : (
                              <tr
                                className=""
                                style={{
                                  height: "500px",
                                  position: "relative",
                                  backgroundColor: "unset"
                                }}
                              >
                                <td
                                  valign="top"
                                  colSpan="8"
                                  className="dataTables_empty text-center"
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    width: "100%",
                                    borderTop: "0"
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
              {this.state.totalItemCount > 0 && (
                <div className="row">
                  <div className="col-sm-12 col-md-7">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="example1_paginate"
                    >
                      <Pagination
                        activePage={parseInt(this.state.filters.page.value)}
                        itemsCountPerPage={parseInt(
                          this.state.filters.limit.value
                        )}
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
              )}
            </div>
          </section>
        )}
        {/* <button type="button" className="btn btn-sm bg-green" onClick={this.loadList}><i className="fas fa-plus"></i> Viết bài mới</button> */}

        <a href="/posts/new" className="dis-none mobi-dis-block">
          <button
            type="button"
            className="btn btn-lg rounded-circle bg-saostar fixed-bottom-right"
          >
            <i className="fas fa-plus"></i>
          </button>
        </a>
      </div>
    );
  }
}

export default connect(
  store => {
    return {
      profile: store.loginInfo.userInfo,
      router: store.router,
      posts: store.post.listRoyalties,
      totalPosts: store.post.totalRoyalties,
      totalMoneyEditor: store.post.totalMoneyEditor,
      totalMoney: store.post.totalMoney,
      totalMoneyPhoto: store.post.totalMoneyPhoto,
      config: store.config
    };
  },
  dispatch => {
    return {
      getListPost: value => {
        dispatch(postActions.getListRoyalties(value));
      },
      countListPost: value => {
        dispatch(postActions.countListPost(value));
      },
      updatePost: value => {
        dispatch(postActions.updatePost(value));
      },
      getRoyaltiesEditor: value => {
        dispatch(configActions.getRoyaltiesEditor(value));
      },
      getRoyaltiesPhoto: value => {
        dispatch(configActions.getRoyaltiesPhoto(value));
      }
    };
  }
)(RoyaltiesList);
