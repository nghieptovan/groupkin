import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import localStore from "src/utils/local-storage";
import HeaderMobileComponent from "src/components/layout/header-mobile";
import Boxes from "./boxes";
import ChartLine from "src/page/dashboard/charts/chart-line";
import RecordRow from "src/page/dashboard/record-row";
import TableCategory from "./table-category";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class Dashboard extends Component {
  categoryOptions = [
    { value: "", label: "Tất cả chuyên mục" },
    { value: "giai-tri", label: "Giải trí" },
    { value: "dien-anh", label: "Điện ảnh" },
    { value: "am-nhac", label: "Âm nhạc" },
    { value: "xa-hoi", label: "Xã hội" },
    { value: "doi-song", label: "Đời sống" },
    { value: "the-gioi", label: "Thế giới" },
    { value: "thoi-trang", label: "Thời trang" },
    { value: "dep-360", label: "Đẹp 360" },
    { value: "the-thao", label: "On Sports" },
    { value: "cong-nghe", label: "Công nghệ - Xe" }
  ];

  oneDayRange = [
    new Date(new Date().setDate(new Date().getDate() - 1)),
    new Date(new Date().setDate(new Date().getDate() - 1))
  ];
  threeDaysRange = [
    new Date(new Date().setDate(new Date().getDate() - 3)),
    new Date(new Date().setDate(new Date().getDate() - 1))
  ];
  aWeekAgoRange = [
    new Date(new Date().setDate(new Date().getDate() - 7)),
    new Date(new Date().setDate(new Date().getDate() - 1))
  ];

  aMonthAgoRange = [
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date(new Date().setDate(new Date().getDate() - 1))
  ];

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
          <h1>Bạn không có quền truy cập.</h1>
          <div
            className="bg-c7c6c5 bg-c7c6c5 txt-center pt-3 pb-3"
            onClick={() => {
              onClose();
              window.location.href = "/posts?page=1&limit=20";
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

  constructor(props) {
    super(props);

    let startDate = new Date();
    let endDate = new Date();
    startDate = new Date(startDate.setDate(startDate.getDate() - 7));
    endDate = new Date(endDate.setDate(endDate.getDate() - 1));

    this.state = {
      date: [startDate, endDate],
      reports: [],
      canAccess: false
    };

    this.getMetrics = this.getMetrics.bind(this);
  }

  componentDidMount() {
    // this.getMetrics(this.state.date);
    // const _user = localStore.get("_user");
    // if (_user) {
    //   this.setState({ canAccess: _user.can_view_ga }, () => {
    //     if (!_user.can_view_ga) {
    //       this.confirmAction();
    //     }
    //   });
    // }
  }

  onChange = date => {
    if (date) {
      this.setState({ date });
      this.getMetrics(date);
    }
  };

  onChangeCategory = selected => {
    console.log(selected);
    if (selected) {
      const category = selected.value;
      this.getMetrics(this.state.date, category);
    }
  };

  async getMetrics(daterange, category) {
    console.log(daterange);
    const range = daterange.map(date => date.toISOString().split("T")[0]);
    const startDate = range[0];
    const endDate = range[1];
    if (!category) {
      category = "";
    }

    const url = process.env.REACT_APP_API + "/ga1";

    try {
      const response = await axios.get(
        url,
        {
          params: {
            startDate,
            endDate,
            category
          }
        },
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }
      );
      const reports = response.data.reports;
      this.setState({ reports });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { reports, canAccess } = this.state;
    return (
      canAccess && (
        <div className="content-wrapper dashboard">
          <HeaderMobileComponent />
          <div className="content-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6 align-self-center">
                  <button
                    className="btn btn-sm btn-primary mr10"
                    onClick={e => this.getMetrics(this.oneDayRange)}
                  >
                    Hôm qua
                  </button>
                  <button
                    className="btn btn-sm btn-primary mr10"
                    onClick={e => this.getMetrics(this.threeDaysRange)}
                  >
                    3 ngày trước
                  </button>
                  <button
                    className="btn btn-sm btn-primary mr10 my-1"
                    onClick={e => this.getMetrics(this.aWeekAgoRange)}
                  >
                    1 tuần trước
                  </button>
                  <button
                    className="btn btn-sm btn-primary mr10 my-1"
                    onClick={e => this.getMetrics(this.aMonthAgoRange)}
                  >
                    1 tháng trước
                  </button>
                  {/* <button className="btn btn-sm btn-primary mr10 my-1">Giải trí</button>
                <button className="btn btn-sm btn-primary mr10 my-1">Phim ảnh</button> */}
                </div>
                <div className="col-sm-6 text-right mt-2 mt-lg-0">
                  <div className="row flex-row-reverse">
                    <div className="col-12 col-lg-3">
                      <Select
                        options={this.categoryOptions}
                        defaultValue={this.categoryOptions[0]}
                        onChange={this.onChangeCategory}
                      />
                    </div>
                    <div className="col mt-2 mt-lg-0">
                      <DateRangePicker
                        onChange={this.onChange}
                        value={this.state.date}
                        calendarIcon={<i className="far fa-calendar-alt"></i>}
                        maxDate={new Date()}
                        clearIcon=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="container-fluid">
            fsdfdsfdsf

            </div>
          </section>

          <a href="/posts/new" className="dis-none mobi-dis-block">
            <button
              type="button"
              className="btn btn-lg rounded-circle bg-saostar fixed-bottom-right"
            >
              <i className="fas fa-plus"></i>
            </button>
          </a>
        </div>
      )
    );
  }
}
export default connect(store => {
  return {
    loginInfo: store.loginInfo
  };
})(Dashboard);
