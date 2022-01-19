import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActions from "../../store/action/auth";
import Link from "src/components/link";
import "./layout.css";
import CookiesService from '../../services/CookiesService';
import { CONSTS } from '../../config/Constant';
import ScreenSize from "../../services/screenSize";
import ReactDOM from "react-dom";
import UserAvatar from "react-user-avatar";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

const IMG_SERVER = process.env.REACT_APP_IMG;

class HeaderComponent extends Component {
  isMobile = false;
  constructor() {
    super();
    this.state = {
      clickLoggout: false,
      // user: CookiesService.get(CONSTS.STORE_KEYS.USER.PROFILE, true),
      scrollHeader: false,
      onHover: false
    };
    this.isMobile = ScreenSize.isMobile;
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
    window.addEventListener("beforeunload", this.onUnload);
  }

  signOut = () => {
    this.setState({ clickLoggout: true });
    this.props.logoutPage();
  };



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

  handleScroll() {
    let scroll = window.scrollY;
    if (scroll >= 10) {
      this.setState({ scrollHeader: true });
    } else {
      this.setState({ scrollHeader: false });
    }
  }

  hover(status) {
    // this.setState({ onHover: status });
  }
  changePostPage = () => {
    alert("hello");
  };
  uppercaseName(phrase) {
    phrase = phrase || "N";
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  render() {
    let {user} = this.state;
    const userAvatar =
      this.state.user && this.state.user.avatar
        ? IMG_SERVER + "w60" + '/uploads/' + this.state.user.avatar.hash + this.state.user.avatar.ext
        : "";

    return (
      <>
        {this.isMobile ? (
          <></>
        ) : (
            <div className="header-cms">
              <div
                className={
                  "navigation-wrap bg-light start-header " +
                  (this.state.scrollHeader ? "scroll-on" : "start-style")
                }
              >
                <div className="row">
                  <div className="col-12">
                    <nav className="navbar navbar-expand-md navbar-light">
                      <a className="navbar-brand" href="https://lottecinemavn.com">
                        <img src="https://nhanlucnganhluat.vn/uploads/images/D69545BE/logo/2019-04/pictures_library_6235_20180102135750_4563.jpg" alt="" />
                      </a>

                      <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>

                      <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                      >
                        <ul className="navbar-nav mr-auto pt-4 py-md-0">
                          <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                            <Link
                              to={"/payment"}
                              className="nav-link"
                            >
                              Payment API
                          </Link>
                          </li>

                          {/* <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                              <Link to={"/account"} className="nav-link">
                              Account
                            </Link>
                          </li> */}

                          <li
                              key={"header-noi-dungsss"}
                              className={
                                "nav-item pl-4 pl-md-0 ml-0 ml-md-4 " +
                                (this.state.onHover ? "show" : "")
                              }
                              onMouseEnter={() => this.hover(true)}
                              onMouseLeave={() => this.hover(false)}
                            >
                              <a
                                className="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                                href="#"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Cinema coin<i className="fas fa-angle-down ml5"></i>
                              </a>
                            <div className="dropdown-menu">
                                <Link to={"/coin/topup"} className="dropdown-item">
                                  Topup Coin
                                </Link>
                                <Link to={"/coin/list"} className="dropdown-item"                                >
                                  Coin List
                                </Link>
                                <Link to={"/coin/promotion"} className="dropdown-item"                                >
                                  Coin Promotion
                                </Link>
                               
                              </div>
                          </li>
                          
                        </ul>
                        
                        <ul className="navbar-nav ml-auto py-md-0">
                          <li
                            key={"header-user"}
                            className={
                              "nav-item pl-4 pl-md-0 ml-0 ml-md-4 " +
                              (this.state.onHover ? "show" : "")
                            }
                            onMouseEnter={() => this.hover(true)}
                            onMouseLeave={() => this.hover(false)}
                          >
                            <a
                              className="nav-link dropdown-toggle user-panel image d-inline"
                              data-toggle="dropdown"
                              href="#"
                              role="button"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {
                                <>
                                  <UserAvatar
                                    size="33"
                                    name={this.uppercaseName(
                                      (this.state.user &&
                                        this.state.user.fullname) ||
                                      "NN"
                                    )}
                                    className="d-inline-block"
                                    src={userAvatar}
                                    colors={[
                                      "#ff6188",
                                      "#fc9867",
                                      "#ffd866",
                                      "#a9dc76",
                                      "#78dce8",
                                      "#ab9df2"
                                    ]}
                                  />
                                  <i
                                    className="fas fa-angle-down ml5"
                                    style={
                                      userAvatar === ""
                                        ? { lineHeight: "33px" }
                                        : {
                                          lineHeight: "33px",
                                          verticalAlign: "text-bottom"
                                        }
                                    }
                                  ></i>
                                </>
                              }
                            </a>
                            <div className="dropdown-menu right">
                              {this.state.user && (
                                <a className="name">{this.state.user.fullname}</a>
                              )}
            
                              {(user && user.role && user.role.name == "SuperAdmin") && (
                                <Link to={"/config"} className="dropdown-item">
                                  <i className="fas fa-cog"></i> Profile
                                </Link>
                              )}
                              
                              {(user && user.role && user.role.name == "SuperAdmin") && (
                                <Link to={"/config"} className="dropdown-item">
                                  <i className="fas fa-cog"></i> Config
                                </Link>
                              )}

                              <a onClick={this.signOut} href="/login" className="dropdown-item" >
                                <i className="fas fa-th-large"></i> Logout
                            </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
      </>
    );
  }
}
export default connect(
  store => {
    return {
      login: store.loginInfo,
      router: store.router
    };
  },
  dispatch => {
    return {
      logoutPage: value => {
        dispatch(authActions.logout(value));
      }
    };
  }
)(HeaderComponent);
