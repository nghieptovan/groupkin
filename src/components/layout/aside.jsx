import React, { Component } from "react"
import { connect } from "react-redux"
import * as authActions from "../../store/action/auth"
import Link from "src/components/link"

const CONTENT_URL = process.env.REACT_APP_CONTENT;
class AsideComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="kt_aside" className="aside aside-dark aside-hoverable" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle">
            <div className="aside-logo flex-column-auto" id="kt_aside_logo">
                <a href="../../demo13/dist/index.html">
                    <img alt="Logo" src="assets/logo.png" className="h-60px logo" />
                </a>
                <div id="kt_aside_toggle" className="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle" data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body" data-kt-toggle-name="aside-minimize">
                    <span className="svg-icon svg-icon-1 rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11.2657 11.4343L15.45 7.25C15.8642 6.83579 15.8642 6.16421 15.45 5.75C15.0358 5.33579 14.3642 5.33579 13.95 5.75L8.40712 11.2929C8.01659 11.6834 8.01659 12.3166 8.40712 12.7071L13.95 18.25C14.3642 18.6642 15.0358 18.6642 15.45 18.25C15.8642 17.8358 15.8642 17.1642 15.45 16.75L11.2657 12.5657C10.9533 12.2533 10.9533 11.7467 11.2657 11.4343Z" fill="black" />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="aside-menu flex-column-fluid">
                <div className="hover-scroll-overlay-y my-2 py-5 py-lg-8" id="kt_aside_menu_wrapper" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer" data-kt-scroll-wrappers="#kt_aside_menu" data-kt-scroll-offset="0">
                    <div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" id="#kt_aside_menu" data-kt-menu="true">
                      <div className="menu-item">

                        <Link to="/dashboard">
                          <span className="menu-icon">
                            <i className="bi bi-bar-chart fs-3"></i>
                          </span>
                          <span className="menu-title">Thống kê</span>
                        </Link>

								      </div>
                      <div className="menu-item">

                        <Link to="/investors">
                          <span className="menu-icon">
                            <i className="bi bi-people fs-3"></i>
                          </span>
                          <span className="menu-title">Đầu tư</span>
                        </Link>
								      </div>
                      <div className="menu-item">

                        <Link to="/transactions">
                          <span className="menu-icon">
                            <i className="bi bi-wallet2 fs-3"></i>
                          </span>
                          <span className="menu-title">Giao dịch</span>
                        </Link>
								      </div>                       
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect(
  store => {
    return {
      login: store.loginInfo
    };
  },
  dispatch => {
    return {
      logoutPage: value => {
        dispatch(authActions.logout(value));
      }
    };
  }
)(AsideComponent);
