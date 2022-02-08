import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActions from "../../store/action/auth";
import Link from "src/components/link";
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
      <div id="kt_header"  className="header align-items-stretch">
                <div className="container-fluid d-flex align-items-stretch justify-content-between">
                    <div className="d-flex align-items-center d-lg-none ms-n3 me-1" title="Show aside menu">
                        <div className="btn btn-icon btn-active-color-white" id="kt_aside_mobile_toggle">
                            <i className="bi bi-list fs-1"></i>
                        </div>
                    </div>
                    <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                        <a href="../../demo13/dist/index.html" className="d-lg-none">
                            <img alt="Logo" src="assets/media/logos/logo-demo13-compact.svg" className="h-25px" />
                        </a>
                    </div>
                    <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                        <div className="d-flex align-items-stretch" id="kt_header_nav">
                            <div className="header-menu align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_header_menu_mobile_toggle" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}">
                                <div className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch" id="#kt_header_menu" data-kt-menu="true">
                                    <div className="menu-item me-lg-1">
                                        <a className="menu-link active py-3" href="../../demo13/dist/index.html">
                                            <span className="menu-title">Dashboard</span>
                                        </a>
                                    </div>
                                    <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item menu-lg-down-accordion me-lg-1">
                                        <span className="menu-link py-3">
                                            <span className="menu-title">Crafted</span>
                                            <span className="menu-arrow d-lg-none"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-archive fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Pages</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Profile</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/profile/overview.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Overview</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/profile/projects.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Projects</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/profile/campaigns.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Campaigns</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/profile/documents.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Documents</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/profile/connections.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Connections</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/profile/activity.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Activity</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Projects</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/projects/list.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">My Projects</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/projects/project.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">View Project</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/projects/targets.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Targets</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/projects/budget.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Budget</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/projects/users.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Users</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/projects/files.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Files</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/projects/activity.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Activity</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/projects/settings.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Settings</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Wizards</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/wizards/horizontal.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Horizontal</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/wizards/vertical.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Vertical</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Search</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/search/horizontal.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Horizontal</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/search/vertical.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Vertical</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Blog</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/blog/home.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Blog Home</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/blog/post.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Blog Post</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Company</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/company/about.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">About Us</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/company/pricing.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Pricing</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/company/contact.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Contact Us</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/company/team.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Our Team</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/company/licenses.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Licenses</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/company/sitemap.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Sitemap</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Careers</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/careers/list.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Careers List</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/careers/apply.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Careers Apply</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">FAQ</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/faq/classic.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Classic</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/pages/faq/extended.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Extended</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-person fs-2"></i>
                                                    </span>
                                                    <span className="menu-title">Account</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/account/overview.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Overview</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/account/settings.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Settings</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/account/security.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Security</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/account/billing.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Billing</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/account/statements.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Statements</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/account/referrals.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Referrals</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/account/api-keys.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">API Keys</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-sticky fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Authentication</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Basic Flow</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/basic/sign-in.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Sign-in</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/basic/sign-up.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Sign-up</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/basic/two-steps.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Two-steps</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/basic/password-reset.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Password Reset</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/basic/new-password.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">New Password</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Aside Flow</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/aside/sign-in.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Sign-in</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/aside/sign-up.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Sign-up</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/aside/two-steps.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Two-steps</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/aside/password-reset.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Password Reset</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/aside/new-password.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">New Password</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Dark Flow</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/dark/sign-in.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Sign-in</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/dark/sign-up.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Sign-up</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/dark/two-steps.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Two-steps</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/dark/password-reset.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Password Reset</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/flows/dark/new-password.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">New Password</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Extended</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/extended/multi-steps-sign-up.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Multi-steps Sign-up</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/extended/free-trial-sign-up.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Free Trial Sign-up</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/extended/coming-soon.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Coming Soon</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/general/welcome.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Welcome Message</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/general/verify-email.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Verify Email</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/general/password-confirmation.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Password Confirmation</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/general/deactivation.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Account Deactivation</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/general/error-404.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Error 404</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/general/error-500.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Error 500</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Email Templates</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/email/verify-email.html" target="blank">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Verify Email</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/email/invitation.html" target="blank">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Account Invitation</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/email/password-reset.html" target="blank">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Password Reset</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/authentication/email/password-change.html" target="blank">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Password Changed</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-shield-check fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Modals</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">General</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/general/invite-friends.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Invite Friends</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/general/view-users.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">View Users</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/general/upgrade-plan.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Upgrade Plan</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/general/share-earn.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Share &amp; Earn</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Forms</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/forms/new-target.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">New Target</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/forms/new-card.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">New Card</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/forms/new-address.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">New Address</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/forms/create-api-key.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Create API Key</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Wizards</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/wizards/two-factor-authentication.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Two Factor Auth</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/wizards/create-app.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Create App</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/wizards/create-account.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Create Account</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/wizards/create-project.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Create Project</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/wizards/offer-a-deal.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Offer a Deal</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Search</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/search/users.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Users</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/modals/search/select-location.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Select Location</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-layers fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Widgets</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/widgets/lists.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Lists</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/widgets/statistics.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Statistics</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/widgets/charts.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Charts</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/widgets/mixed.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Mixed</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/widgets/tables.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Tables</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/widgets/feeds.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Feeds</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item menu-lg-down-accordion me-lg-1">
                                        <span className="menu-link py-3">
                                            <span className="menu-title">Apps</span>
                                            <span className="menu-arrow d-lg-none"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-people fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">User Management</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Users</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/user-management/users/list.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Users List</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/user-management/users/view.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">View User</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Roles</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/user-management/roles/list.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Roles List</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/user-management/roles/view.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">View Roles</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/user-management/permissions.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Permissions</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-hr fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Invoice Management</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Profile</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/invoices/view/invoice-1.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Invoice 1</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/invoices/view/invoice-2.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Invoice 2</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/invoices/create.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Create Invoice</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-hr fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Support Center</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/support-center/overview.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Overview</span>
                                                        </a>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Tickets</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/support-center/tickets/list.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Ticket List</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/support-center/tickets/view.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Ticket View</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                        <span className="menu-link py-3">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Tutorials</span>
                                                            <span className="menu-arrow"></span>
                                                        </span>
                                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/support-center/tutorials/list.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Tutorials List</span>
                                                                </a>
                                                            </div>
                                                            <div className="menu-item">
                                                                <a className="menu-link py-3" href="../../demo13/dist/apps/support-center/tutorials/post.html">
                                                                    <span className="menu-bullet">
                                                                        <span className="bullet bullet-dot"></span>
                                                                    </span>
                                                                    <span className="menu-title">Tutorials Post</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/support-center/faq.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">FAQ</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/support-center/licenses.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Licenses</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/support-center/contact.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Contact Us</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-printer fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Customers</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/customers/getting-started.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Getting Started</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/customers/list.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Customer Listing</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/customers/view.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Customer Details</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-cart2 fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Devs Forum</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/devs/ask.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Ask a Question</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/devs/tag.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Question Tags</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/devs/question.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">View Question</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/devs/search.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Search Questions</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-cart2 fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Subscriptions</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/subscriptions/getting-started.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Getting Started</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/subscriptions/list.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Subscription List</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/subscriptions/add.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Add Subscription</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/subscriptions/view.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">View Subscription</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi-chat-left fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Chat</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/chat/private.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Private Chat</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/chat/group.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Group Chat</span>
                                                        </a>
                                                    </div>
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/apps/chat/drawer.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Drawer Chat</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-stretch flex-shrink-0">
                            <div className="topbar d-flex align-items-stretch flex-shrink-0">
                                <div className="d-flex align-items-stretch">
                                    <div id="kt_header_search" className="d-flex align-items-stretch" data-kt-search-keypress="true" data-kt-search-min-length="2" data-kt-search-enter="enter" data-kt-search-layout="menu" data-kt-menu-trigger="auto" data-kt-menu-overflow="false" data-kt-menu-permanent="true" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                        <div className="d-flex align-items-stretch" data-kt-search-element="toggle" id="kt_header_search_toggle">
                                            <div className="topbar-item px-3 px-lg-5">
                                                <i className="bi bi-search fs-3"></i>
                                            </div>
                                        </div>
                                        <div data-kt-search-element="content" className="menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px">
                                            <div data-kt-search-element="wrapper">
                                                <form data-kt-search-element="form" className="w-100 position-relative mb-3" autoComplete="off">
                                                    <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                                                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                    <input type="text" className="form-control form-control-flush ps-10" name="search" defaultValue="" placeholder="Search..." data-kt-search-element="input" />
                                                    <span className="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1" data-kt-search-element="spinner">
                                                        <span className="spinner-border h-15px w-15px align-middle text-gray-400"></span>
                                                    </span>
                                                    <span className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none" data-kt-search-element="clear">
                                                        <span className="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                                                                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                                                            </svg>
                                                        </span>
                                                    </span>
                                                    
                                                    <div className="position-absolute top-50 end-0 translate-middle-y" data-kt-search-element="toolbar">
                                                    
                                                        <div data-kt-search-element="preferences-show" className="btn btn-icon w-20px btn-sm btn-active-color-primary me-1" data-bs-toggle="tooltip" title="Show search preferences">
                                                        
                                                            <span className="svg-icon svg-icon-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path opacity="0.3" d="M22.1 11.5V12.6C22.1 13.2 21.7 13.6 21.2 13.7L19.9 13.9C19.7 14.7 19.4 15.5 18.9 16.2L19.7 17.2999C20 17.6999 20 18.3999 19.6 18.7999L18.8 19.6C18.4 20 17.8 20 17.3 19.7L16.2 18.9C15.5 19.3 14.7 19.7 13.9 19.9L13.7 21.2C13.6 21.7 13.1 22.1 12.6 22.1H11.5C10.9 22.1 10.5 21.7 10.4 21.2L10.2 19.9C9.4 19.7 8.6 19.4 7.9 18.9L6.8 19.7C6.4 20 5.7 20 5.3 19.6L4.5 18.7999C4.1 18.3999 4.1 17.7999 4.4 17.2999L5.2 16.2C4.8 15.5 4.4 14.7 4.2 13.9L2.9 13.7C2.4 13.6 2 13.1 2 12.6V11.5C2 10.9 2.4 10.5 2.9 10.4L4.2 10.2C4.4 9.39995 4.7 8.60002 5.2 7.90002L4.4 6.79993C4.1 6.39993 4.1 5.69993 4.5 5.29993L5.3 4.5C5.7 4.1 6.3 4.10002 6.8 4.40002L7.9 5.19995C8.6 4.79995 9.4 4.39995 10.2 4.19995L10.4 2.90002C10.5 2.40002 11 2 11.5 2H12.6C13.2 2 13.6 2.40002 13.7 2.90002L13.9 4.19995C14.7 4.39995 15.5 4.69995 16.2 5.19995L17.3 4.40002C17.7 4.10002 18.4 4.1 18.8 4.5L19.6 5.29993C20 5.69993 20 6.29993 19.7 6.79993L18.9 7.90002C19.3 8.60002 19.7 9.39995 19.9 10.2L21.2 10.4C21.7 10.5 22.1 11 22.1 11.5ZM12.1 8.59998C10.2 8.59998 8.6 10.2 8.6 12.1C8.6 14 10.2 15.6 12.1 15.6C14 15.6 15.6 14 15.6 12.1C15.6 10.2 14 8.59998 12.1 8.59998Z" fill="black" />
                                                                    <path d="M17.1 12.1C17.1 14.9 14.9 17.1 12.1 17.1C9.30001 17.1 7.10001 14.9 7.10001 12.1C7.10001 9.29998 9.30001 7.09998 12.1 7.09998C14.9 7.09998 17.1 9.29998 17.1 12.1ZM12.1 10.1C11 10.1 10.1 11 10.1 12.1C10.1 13.2 11 14.1 12.1 14.1C13.2 14.1 14.1 13.2 14.1 12.1C14.1 11 13.2 10.1 12.1 10.1Z" fill="black" />
                                                                </svg>
                                                            </span>
                                                        
                                                        </div>
                                                    
                                                        <div data-kt-search-element="advanced-options-form-show" className="btn btn-icon w-20px btn-sm btn-active-color-primary" data-bs-toggle="tooltip" title="Show more search options">
                                                        
                                                            <span className="svg-icon svg-icon-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black" />
                                                                </svg>
                                                            </span>
                                                        
                                                        </div>
                                                
                                                    </div>
                                                
                                                </form>
                                            
                                                <div className="separator border-gray-200 mb-6"></div>
                                            
                                                <div data-kt-search-element="results" className="d-none">
                                                
                                                    <div className="scroll-y mh-200px mh-lg-350px">
                                                    
                                                        <h3 className="fs-5 text-muted m-0 pb-5" data-kt-search-element="category-title">Users</h3>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                        
                                                            <div className="symbol symbol-40px me-4">
                                                                <img src="assets/media/avatars/150-1.jpg" alt="" />
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">Karina Clark</span>
                                                                <span className="fs-7 fw-bold text-muted">Marketing Manager</span>
                                                            </div>
                                                        
                                                        </a>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                            <div className="symbol symbol-40px me-4">
                                                                <img src="assets/media/avatars/150-3.jpg" alt="" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">Olivia Bold</span>
                                                                <span className="fs-7 fw-bold text-muted">Software Engineer</span>
                                                            </div>
                                                        </a>
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                            <div className="symbol symbol-40px me-4">
                                                                <img src="assets/media/avatars/150-8.jpg" alt="" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">Ana Clark</span>
                                                                <span className="fs-7 fw-bold text-muted">UI/UX Designer</span>
                                                            </div>
                                                        </a>
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                            <div className="symbol symbol-40px me-4">
                                                                <img src="assets/media/avatars/150-11.jpg" alt="" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">Nick Pitola</span>
                                                                <span className="fs-7 fw-bold text-muted">Art Director</span>
                                                            </div>
                                                        
                                                        </a>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                        
                                                            <div className="symbol symbol-40px me-4">
                                                                <img src="assets/media/avatars/150-12.jpg" alt="" />
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">Edward Kulnic</span>
                                                                <span className="fs-7 fw-bold text-muted">System Administrator</span>
                                                            </div>
                                                        
                                                        </a>
                                                    
                                                        <h3 className="fs-5 text-muted m-0 pt-5 pb-5" data-kt-search-element="category-title">Customers</h3>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                        
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    <img className="w-20px h-20px" src="assets/media/svg/brand-logos/volicity-9.svg" alt="" />
                                                                </span>
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">Company Rbranding</span>
                                                                <span className="fs-7 fw-bold text-muted">UI Design</span>
                                                            </div>
                                                        
                                                        </a>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                        
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    <img className="w-20px h-20px" src="assets/media/svg/brand-logos/tvit.svg" alt="" />
                                                                </span>
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">Company Re-branding</span>
                                                                <span className="fs-7 fw-bold text-muted">Web Development</span>
                                                            </div>
                                                        
                                                        </a>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                        
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    <img className="w-20px h-20px" src="assets/media/svg/misc/infography.svg" alt="" />
                                                                </span>
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">Business Analytics App</span>
                                                                <span className="fs-7 fw-bold text-muted">Administration</span>
                                                            </div>
                                                            
                                                        </a>
                                                
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                        
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    <img className="w-20px h-20px" src="assets/media/svg/brand-logos/leaf.svg" alt="" />
                                                                </span>
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">EcoLeaf App Launch</span>
                                                                <span className="fs-7 fw-bold text-muted">Marketing</span>
                                                            </div>
                                                        
                                                        </a>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                            
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    <img className="w-20px h-20px" src="assets/media/svg/brand-logos/tower.svg" alt="" />
                                                                </span>
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column justify-content-start fw-bold">
                                                                <span className="fs-6 fw-bold">Tower Group Website</span>
                                                                <span className="fs-7 fw-bold text-muted">Google Adwords</span>
                                                            </div>
                                                        
                                                        </a>
                                                    
                                                        <h3 className="fs-5 text-muted m-0 pt-5 pb-5" data-kt-search-element="category-title">Projects</h3>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                            
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM15 17C15 16.4 14.6 16 14 16H8C7.4 16 7 16.4 7 17C7 17.6 7.4 18 8 18H14C14.6 18 15 17.6 15 17ZM17 12C17 11.4 16.6 11 16 11H8C7.4 11 7 11.4 7 12C7 12.6 7.4 13 8 13H16C16.6 13 17 12.6 17 12ZM17 7C17 6.4 16.6 6 16 6H8C7.4 6 7 6.4 7 7C7 7.6 7.4 8 8 8H16C16.6 8 17 7.6 17 7Z" fill="black" />
                                                                            <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                
                                                                </span>
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column">
                                                                <span className="fs-6 fw-bold">Si-Fi Project by AU Themes</span>
                                                                <span className="fs-7 fw-bold text-muted">#45670</span>
                                                            </div>
                                                            
                                                        </a>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                            
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <rect x="8" y="9" width="3" height="10" rx="1.5" fill="black" />
                                                                            <rect opacity="0.5" x="13" y="5" width="3" height="14" rx="1.5" fill="black" />
                                                                            <rect x="18" y="11" width="3" height="8" rx="1.5" fill="black" />
                                                                            <rect x="3" y="13" width="3" height="6" rx="1.5" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                
                                                                </span>
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column">
                                                                <span className="fs-6 fw-bold">Shopix Mobile App Planning</span>
                                                                <span className="fs-7 fw-bold text-muted">#45690</span>
                                                            </div>
                                                        
                                                        </a>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                        
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="black" />
                                                                            <rect x="6" y="12" width="7" height="2" rx="1" fill="black" />
                                                                            <rect x="6" y="7" width="12" height="2" rx="1" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="d-flex flex-column">
                                                                <span className="fs-6 fw-bold">Finance Monitoring SAAS Discussion</span>
                                                                <span className="fs-7 fw-bold text-muted">#21090</span>
                                                            </div>
                                                            
                                                        </a>
                                                    
                                                        <a href="#" className="d-flex text-dark text-hover-primary align-items-center mb-5">
                                                        
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="black" />
                                                                            <path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                
                                                                </span>
                                                            </div>
                                                        
                                                            <div className="d-flex flex-column">
                                                                <span className="fs-6 fw-bold">Dashboard Analitics Launch</span>
                                                                <span className="fs-7 fw-bold text-muted">#34560</span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="mb-4" data-kt-search-element="main">
                                                    <div className="d-flex flex-stack fw-bold mb-4">
                                                        <span className="text-muted fs-6 me-2">Recently Searched:</span>
                                                    </div>
                                                    <div className="scroll-y mh-200px mh-lg-325px">
                                                        <div className="d-flex align-items-center mb-5">
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/*<!--begin::Svg Icon | path: icons/duotune/electronics/elc004.svg-->*/}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M2 16C2 16.6 2.4 17 3 17H21C21.6 17 22 16.6 22 16V15H2V16Z" fill="black" />
                                                                            <path opacity="0.3" d="M21 3H3C2.4 3 2 3.4 2 4V15H22V4C22 3.4 21.6 3 21 3Z" fill="black" />
                                                                            <path opacity="0.3" d="M15 17H9V20H15V17Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/*<!--end::Svg Icon-->*/}
                                                                </span>
                                                            </div>
                                                            {/*<!--end::Symbol-->*/}
                                                            {/*<!--begin::Title-->*/}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">BoomApp by Keenthemes</a>
                                                                <span className="fs-7 text-muted fw-bold">#45789</span>
                                                            </div>
                                                            {/*<!--end::Title-->*/}
                                                        </div>
                                                        {/*<!--end::Item-->*/}
                                                        {/*<!--begin::Item-->*/}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/*<!--begin::Symbol-->*/}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/*<!--begin::Svg Icon | path: icons/duotune/graphs/gra001.svg-->*/}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M14 3V21H10V3C10 2.4 10.4 2 11 2H13C13.6 2 14 2.4 14 3ZM7 14H5C4.4 14 4 14.4 4 15V21H8V15C8 14.4 7.6 14 7 14Z" fill="black" />
                                                                            <path d="M21 20H20V8C20 7.4 19.6 7 19 7H17C16.4 7 16 7.4 16 8V20H3C2.4 20 2 20.4 2 21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21C22 20.4 21.6 20 21 20Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/*<!--end::Svg Icon-->*/}
                                                                </span>
                                                            </div>
                                                            {/*<!--end::Symbol-->*/}
                                                            {/*<!--begin::Title-->*/}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">"Kept API Project Meeting</a>
                                                                <span className="fs-7 text-muted fw-bold">#84050</span>
                                                            </div>
                                                            {/*<!--end::Title-->*/}
                                                        </div>
                                                        {/*<!--end::Item-->*/}
                                                        {/*<!--begin::Item-->*/}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/*<!--begin::Symbol-->*/}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/*<!--begin::Svg Icon | path: icons/duotune/graphs/gra006.svg-->*/}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="black" />
                                                                            <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/*<!--end::Svg Icon-->*/}
                                                                </span>
                                                            </div>
                                                            {/*<!--end::Symbol-->*/}
                                                            {/*<!--begin::Title-->*/}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">"KPI Monitoring App Launch</a>
                                                                <span className="fs-7 text-muted fw-bold">#84250</span>
                                                            </div>
                                                            {/*<!--end::Title-->*/}
                                                        </div>
                                                        {/*<!--end::Item-->*/}
                                                        {/*<!--begin::Item-->*/}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/*<!--begin::Symbol-->*/}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/*<!--begin::Svg Icon | path: icons/duotune/graphs/gra002.svg-->*/}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M20 8L12.5 5L5 14V19H20V8Z" fill="black" />
                                                                            <path d="M21 18H6V3C6 2.4 5.6 2 5 2C4.4 2 4 2.4 4 3V18H3C2.4 18 2 18.4 2 19C2 19.6 2.4 20 3 20H4V21C4 21.6 4.4 22 5 22C5.6 22 6 21.6 6 21V20H21C21.6 20 22 19.6 22 19C22 18.4 21.6 18 21 18Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/*<!--end::Svg Icon-->*/}
                                                                </span>
                                                            </div>
                                                            {/*<!--end::Symbol-->*/}
                                                            {/*<!--begin::Title-->*/}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Project Reference FAQ</a>
                                                                <span className="fs-7 text-muted fw-bold">#67945</span>
                                                            </div>
                                                            {/*<!--end::Title-->*/}
                                                        </div>
                                                        {/*<!--end::Item-->*/}
                                                        {/*<!--begin::Item-->*/}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/*<!--begin::Symbol-->*/}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/*<!--begin::Svg Icon | path: icons/duotune/communication/com010.svg-->*/}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M6 8.725C6 8.125 6.4 7.725 7 7.725H14L18 11.725V12.925L22 9.725L12.6 2.225C12.2 1.925 11.7 1.925 11.4 2.225L2 9.725L6 12.925V8.725Z" fill="black" />
                                                                            <path opacity="0.3" d="M22 9.72498V20.725C22 21.325 21.6 21.725 21 21.725H3C2.4 21.725 2 21.325 2 20.725V9.72498L11.4 17.225C11.8 17.525 12.3 17.525 12.6 17.225L22 9.72498ZM15 11.725H18L14 7.72498V10.725C14 11.325 14.4 11.725 15 11.725Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/*<!--end::Svg Icon-->*/}
                                                                </span>
                                                            </div>
                                                            {/*<!--end::Symbol-->*/}
                                                            {/*<!--begin::Title-->*/}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">"FitPro App Development</a>
                                                                <span className="fs-7 text-muted fw-bold">#84250</span>
                                                            </div>
                                                            {/*<!--end::Title-->*/}
                                                        </div>
                                                        {/*<!--end::Item-->*/}
                                                        {/*<!--begin::Item-->*/}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/*<!--begin::Symbol-->*/}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/*<!--begin::Svg Icon | path: icons/duotune/finance/fin001.svg-->*/}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="black" />
                                                                            <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/*<!--end::Svg Icon-->*/}
                                                                </span>
                                                            </div>
                                                            {/*<!--end::Symbol-->*/}
                                                            {/*<!--begin::Title-->*/}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Shopix Mobile App</a>
                                                                <span className="fs-7 text-muted fw-bold">#45690</span>
                                                            </div>
                                                            {/*<!--end::Title-->*/}
                                                        </div>
                                                        {/*<!--end::Item-->*/}
                                                        {/*<!--begin::Item-->*/}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/*<!--begin::Symbol-->*/}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                </span>
                                                            </div>
                                                            {/*<!--end::Symbol-->*/}
                                                            {/*<!--begin::Title-->*/}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">"Landing UI Design" Launch</a>
                                                                <span className="fs-7 text-muted fw-bold">#24005</span>
                                                            </div>
                                                            {/*<!--end::Title-->*/}
                                                        </div>
                                                        {/*<!--end::Item-->*/}
                                                    </div>
                                                    {/*<!--end::Items-->*/}
                                                </div>
                                                {/*<!--end::Recently viewed-->*/}
                                                {/*<!--begin::Empty-->*/}
                                                <div data-kt-search-element="empty" className="text-center d-none">
                                                    {/*<!--begin::Icon-->*/}
                                                    <div className="pt-10 pb-10">
                                                        {/*<!--begin::Svg Icon | path: icons/duotune/files/fil024.svg-->*/}
                                                        <span className="svg-icon svg-icon-4x opacity-50">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path opacity="0.3" d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="black" />
                                                                <path d="M20 8L14 2V6C14 7.10457 14.8954 8 16 8H20Z" fill="black" />
                                                                <rect x="13.6993" y="13.6656" width="4.42828" height="1.73089" rx="0.865447" transform="rotate(45 13.6993 13.6656)" fill="black" />
                                                                <path d="M15 12C15 14.2 13.2 16 11 16C8.8 16 7 14.2 7 12C7 9.8 8.8 8 11 8C13.2 8 15 9.8 15 12ZM11 9.6C9.68 9.6 8.6 10.68 8.6 12C8.6 13.32 9.68 14.4 11 14.4C12.32 14.4 13.4 13.32 13.4 12C13.4 10.68 12.32 9.6 11 9.6Z" fill="black" />
                                                            </svg>
                                                        </span>
                                                        {/*<!--end::Svg Icon-->*/}
                                                    </div>
                                                    {/*<!--end::Icon-->*/}
                                                    {/*<!--begin::Message-->*/}
                                                    <div className="pb-15 fw-bold">
                                                        <h3 className="text-gray-600 fs-5 mb-2">No result found</h3>
                                                        <div className="text-muted fs-7">Please try again with a different query</div>
                                                    </div>
                                                    {/*<!--end::Message-->*/}
                                                </div>
                                                {/*<!--end::Empty-->*/}
                                            </div>
                                            {/*<!--end::Wrapper-->*/}
                                            {/*<!--begin::Preferences-->*/}
                                            <form data-kt-search-element="advanced-options-form" className="pt-1 d-none">
                                                {/*<!--begin::Heading-->*/}
                                                <h3 className="fw-bold text-dark mb-7">Advanced Search</h3>
                                                {/*<!--end::Heading-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="mb-5">
                                                    <input type="text" className="form-control form-control-sm form-control-solid" placeholder="Contains the word" name="query" />
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="mb-5">
                                                    {/*<!--begin::Radio group-->*/}
                                                    <div className="nav-group nav-group-fluid">
                                                        {/*<!--begin::Option-->*/}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="type" defaultValue="has" defaultChecked="checked" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">All</span>
                                                        </label>
                                                        {/*<!--end::Option-->*/}
                                                        {/*<!--begin::Option-->*/}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="type" defaultValue="users" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Users</span>
                                                        </label>
                                                        {/*<!--end::Option-->*/}
                                                        {/*<!--begin::Option-->*/}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="type" defaultValue="orders" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Orders</span>
                                                        </label>
                                                        {/*<!--end::Option-->*/}
                                                        {/*<!--begin::Option-->*/}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="type" defaultValue="projects" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Projects</span>
                                                        </label>
                                                        {/*<!--end::Option-->*/}
                                                    </div>
                                                    {/*<!--end::Radio group-->*/}
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="mb-5">
                                                    <input type="text" name="assignedto" className="form-control form-control-sm form-control-solid" placeholder="Assigned to" defaultValue="" />
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="mb-5">
                                                    <input type="text" name="collaborators" className="form-control form-control-sm form-control-solid" placeholder="Collaborators" defaultValue="" />
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="mb-5">
                                                    {/*<!--begin::Radio group-->*/}
                                                    <div className="nav-group nav-group-fluid">
                                                        {/*<!--begin::Option-->*/}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="attachment" defaultValue="has" defaultChecked="checked" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">Has attachment</span>
                                                        </label>
                                                        {/*<!--end::Option-->*/}
                                                        {/*<!--begin::Option-->*/}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="attachment" defaultValue="any" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Any</span>
                                                        </label>
                                                        {/*<!--end::Option-->*/}
                                                    </div>
                                                    {/*<!--end::Radio group-->*/}
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="mb-5">
                                                    <select name="timezone" aria-label="Select a Timezone" data-control="select2" data-placeholder="date_period" className="form-select form-select-sm form-select-solid">
                                                        <option defaultValue="next">Within the next</option>
                                                        <option defaultValue="last">Within the last</option>
                                                        <option defaultValue="between">Between</option>
                                                        <option defaultValue="on">On</option>
                                                    </select>
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="row mb-8">
                                                    {/*<!--begin::Col-->*/}
                                                    <div className="col-6">
                                                        <input type="number" name="date_number" className="form-control form-control-sm form-control-solid" placeholder="Lenght" defaultValue="" />
                                                    </div>
                                                    {/*<!--end::Col-->*/}
                                                    {/*<!--begin::Col-->*/}
                                                    <div className="col-6">
                                                        <select name="date_typer" aria-label="Select a Timezone" data-control="select2" data-placeholder="Period" className="form-select form-select-sm form-select-solid">
                                                            <option defaultValue="days">Days</option>
                                                            <option defaultValue="weeks">Weeks</option>
                                                            <option defaultValue="months">Months</option>
                                                            <option defaultValue="years">Years</option>
                                                        </select>
                                                    </div>
                                                    {/*<!--end::Col-->*/}
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Actions-->*/}
                                                <div className="d-flex justify-content-end">
                                                    <button type="reset" className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2" data-kt-search-element="advanced-options-form-cancel">Cancel</button>
                                                    <a href="../../demo13/dist/pages/search/horizontal.html" className="btn btn-sm fw-bolder btn-primary" data-kt-search-element="advanced-options-form-search">Search</a>
                                                </div>
                                                {/*<!--end::Actions-->*/}
                                            </form>
                                            {/*<!--end::Preferences-->*/}
                                            {/*<!--begin::Preferences-->*/}
                                            <form data-kt-search-element="preferences" className="pt-1 d-none">
                                                {/*<!--begin::Heading-->*/}
                                                <h3 className="fw-bold text-dark mb-7">Search Preferences</h3>
                                                {/*<!--end::Heading-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="pb-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Projects</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" defaultChecked="checked" />
                                                    </label>
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="py-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Targets</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" defaultChecked="checked" />
                                                    </label>
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="py-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Affiliate Programs</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" />
                                                    </label>
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="py-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Referrals</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" defaultChecked="checked" />
                                                    </label>
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Input group-->*/}
                                                <div className="py-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Users</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" />
                                                    </label>
                                                </div>
                                                {/*<!--end::Input group-->*/}
                                                {/*<!--begin::Actions-->*/}
                                                <div className="d-flex justify-content-end pt-7">
                                                    <button type="reset" className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2" data-kt-search-element="preferences-dismiss">Cancel</button>
                                                    <button type="submit" className="btn btn-sm fw-bolder btn-primary">Save Changes</button>
                                                </div>
                                                {/*<!--end::Actions-->*/}
                                            </form>
                                            {/*<!--end::Preferences-->*/}
                                        </div>
                                        {/*<!--end::Menu-->*/}
                                    </div>
                                    {/*<!--end::Search-->*/}
                                </div>
                                {/*<!--end::Search-->*/}
                                {/*<!--begin::User-->*/}
                                <div className="d-flex align-items-stretch" id="kt_header_user_menu_toggle">
                                    {/*<!--begin::Menu wrapper-->*/}
                                    <div className="topbar-item cursor-pointer symbol px-3 px-lg-5 me-n3 me-lg-n5 symbol-30px symbol-md-35px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                        <img src="assets/media/avatars/150-2.jpg" alt="metronic" />
                                    </div>
                                    {/*<!--begin::Menu-->*/}
                                    <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px" data-kt-menu="true">
                                        {/*<!--begin::Menu item-->*/}
                                        <div className="menu-item px-3">
                                            <div className="menu-content d-flex align-items-center px-3">
                                                {/*<!--begin::Avatar-->*/}
                                                <div className="symbol symbol-50px me-5">
                                                    <img alt="Logo" src="assets/media/avatars/150-26.jpg" />
                                                </div>
                                                {/*<!--end::Avatar-->*/}
                                                {/*<!--begin::Username-->*/}
                                                <div className="d-flex flex-column">
                                                    <div className="fw-bolder d-flex align-items-center fs-5">Max Smith
                                                    <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span></div>
                                                    <a href="#" className="fw-bold text-muted text-hover-primary fs-7">max@kt.com</a>
                                                </div>
                                                {/*<!--end::Username-->*/}
                                            </div>
                                        </div>
                                        {/*<!--end::Menu item-->*/}
                                        {/*<!--begin::Menu separator-->*/}
                                        <div className="separator my-2"></div>
                                        {/*<!--end::Menu separator-->*/}
                                        {/*<!--begin::Menu item-->*/}
                                        <div className="menu-item px-5">
                                            <a href="../../demo13/dist/account/overview.html" className="menu-link px-5">My Profile</a>
                                        </div>
                                        {/*<!--end::Menu item-->*/}
                                        {/*<!--begin::Menu item-->*/}
                                        <div className="menu-item px-5">
                                            <a href="../../demo13/dist/pages/projects/list.html" className="menu-link px-5">
                                                <span className="menu-text">My Projects</span>
                                                <span className="menu-badge">
                                                    <span className="badge badge-light-danger badge-circle fw-bolder fs-7">3</span>
                                                </span>
                                            </a>
                                        </div>
                                        {/*<!--end::Menu item-->*/}
                                        {/*<!--begin::Menu item-->*/}
                                        <div className="menu-item px-5" data-kt-menu-trigger="hover" data-kt-menu-placement="left-start">
                                            <a href="#" className="menu-link px-5">
                                                <span className="menu-title">My Subscription</span>
                                                <span className="menu-arrow"></span>
                                            </a>
                                            {/*<!--begin::Menu sub-->*/}
                                            <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                {/*<!--begin::Menu item-->*/}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/referrals.html" className="menu-link px-5">Referrals</a>
                                                </div>
                                                {/*<!--end::Menu item-->*/}
                                                {/*<!--begin::Menu item-->*/}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/billing.html" className="menu-link px-5">Billing</a>
                                                </div>
                                                {/*<!--end::Menu item-->*/}
                                                {/*<!--begin::Menu item-->*/}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/statements.html" className="menu-link px-5">Payments</a>
                                                </div>
                                                {/*<!--end::Menu item-->*/}
                                                {/*<!--begin::Menu item-->*/}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/statements.html" className="menu-link d-flex flex-stack px-5">Statements
                                                    <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="View your statements"></i></a>
                                                </div>
                                                {/*<!--end::Menu item-->*/}
                                                {/*<!--begin::Menu separator-->*/}
                                                <div className="separator my-2"></div>
                                                {/*<!--end::Menu separator-->*/}
                                                {/*<!--begin::Menu item-->*/}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content px-3">
                                                        <label className="form-check form-switch form-check-custom form-check-solid">
                                                            <input className="form-check-input w-30px h-20px" type="checkbox" defaultValue="1" defaultChecked="checked" name="notifications" />
                                                            <span className="form-check-label text-muted fs-7">Notifications</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                {/*<!--end::Menu item-->*/}
                                            </div>
                                            {/*<!--end::Menu sub-->*/}
                                        </div>
                                        {/*<!--end::Menu item-->*/}
                                        {/*<!--begin::Menu item-->*/}
                                        <div className="menu-item px-5">
                                            <a href="../../demo13/dist/account/statements.html" className="menu-link px-5">My Statements</a>
                                        </div>
                                        {/*<!--end::Menu item-->*/}
                                        {/*<!--begin::Menu separator-->*/}
                                        <div className="separator my-2"></div>
                                        {/*<!--end::Menu separator-->*/}
                                        {/*<!--begin::Menu item-->*/}
                                        <div className="menu-item px-5" data-kt-menu-trigger="hover" data-kt-menu-placement="left-start">
                                            <a href="#" className="menu-link px-5">
                                                <span className="menu-title position-relative">Language
                                                <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">English
                                                <img className="w-15px h-15px rounded-1 ms-2" src="assets/media/flags/united-states.svg" alt="" /></span></span>
                                            </a>
                                            {/*<!--begin::Menu sub-->*/}
                                            <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                {/*<!--begin::Menu item-->*/}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/settings.html" className="menu-link d-flex px-5 active">
                                                    <span className="symbol symbol-20px me-4">
                                                        <img className="rounded-1" src="assets/media/flags/united-states.svg" alt="" />
                                                    </span>English</a>
                                                </div>
                                                {/*<!--end::Menu item-->*/}
                                                {/*<!--begin::Menu item-->*/}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/settings.html" className="menu-link d-flex px-5">
                                                    <span className="symbol symbol-20px me-4">
                                                        <img className="rounded-1" src="assets/media/flags/spain.svg" alt="" />
                                                    </span>Spanish</a>
                                                </div>
                                                {/*<!--end::Menu item-->*/}
                                                {/*<!--begin::Menu item-->*/}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/settings.html" className="menu-link d-flex px-5">
                                                    <span className="symbol symbol-20px me-4">
                                                        <img className="rounded-1" src="assets/media/flags/germany.svg" alt="" />
                                                    </span>German</a>
                                                </div>
                                                {/*<!--end::Menu item-->*/}
                                            
                                            </div>
                                            {/*<!--end::Menu sub-->*/}
                                        </div>
                                        {/*<!--end::Menu item-->*/}
                                        {/*<!--begin::Menu item-->*/}
                                        <div className="menu-item px-5 my-1">
                                            <a href="../../demo13/dist/account/settings.html" className="menu-link px-5">Account Settings</a>
                                        </div>
                                        {/*<!--end::Menu item-->*/}
                                        {/*<!--begin::Menu item-->*/}
                                        <div className="menu-item px-5">
                                            <a href="../../demo13/dist/authentication/flows/basic/sign-in.html" className="menu-link px-5">Sign Out</a>
                                        </div>
                                        {/*<!--end::Menu item-->*/}
                                        {/*<!--begin::Menu separator-->*/}
                                        <div className="separator my-2"></div>
                                        {/*<!--end::Menu separator-->*/}
                                        {/*<!--begin::Menu item-->*/}
                                        <div className="menu-item px-5">
                                            <div className="menu-content px-5">
                                                <label className="form-check form-switch form-check-custom form-check-solid pulse pulse-success" htmlFor="kt_user_menu_dark_mode_toggle">
                                                    <input className="form-check-input w-30px h-20px" type="checkbox" defaultValue="1" name="mode" id="kt_user_menu_dark_mode_toggle" data-kt-url="../../demo13/dist/index.html" />
                                                    <span className="pulse-ring ms-n1"></span>
                                                    <span className="form-check-label text-gray-600 fs-7">Dark Mode</span>
                                                </label>
                                            </div>
                                        </div>
                                        {/*<!--end::Menu item-->*/}
                                    </div>
                                    {/*<!--end::Menu-->*/}
                                    {/*<!--end::Menu wrapper-->*/}
                                </div>
                                {/*<!--end::User -->*/}
                                {/*<!--begin::Heaeder menu toggle-->*/}
                                <div className="d-flex align-items-stretch d-lg-none px-3 me-n3" title="Show header menu">
                                    <div className="topbar-item" id="kt_header_menu_mobile_toggle">
                                        <i className="bi bi-text-left fs-1"></i>
                                    </div>
                                </div>
                                {/*<!--end::Heaeder menu toggle-->*/}
                            </div>
                            {/*<!--end::Toolbar wrapper-->*/}
                        </div>
                        {/*<!--end::Topbar-->*/}
                    </div>
                    {/*<!--end::Wrapper-->*/}
                </div>
            </div>
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
