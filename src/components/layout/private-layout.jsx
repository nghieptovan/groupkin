import React, { Component } from 'react';
import HeaderComponent from 'src/components/layout/header'
import FooterComponent from 'src/components/layout/footer'
import { connect } from 'react-redux'
import * as authActions from '../../store/action/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CookiesService from '../../services/CookiesService';
import { CONSTS } from '../../config/Constant';

class PrivateLayout extends Component{
    constructor() {
        super();     
        window.addEventListener('popstate', e => {    
            window.location.href = document.location.href;
        });
        this.state = {
            checked: false
        };

    }

    componentDidMount () {     
        let accesstoken = CookiesService.get(CONSTS.STORE_KEYS.USER.TOKEN);
        let user = CookiesService.get(CONSTS.STORE_KEYS.USER.PROFILE, true);
        if(!accesstoken || accesstoken === '' || !user){
            this.props.logoutPage();
        }
        else{
            this.setState({ checked: true});
            // set user info from cookies
            this.props.setUserInfo(user);
            // handle access page or not

        }
        const cls = ["header-fixed", "header-tablet-and-mobile-fixed", "toolbar-enabled", "toolbar-fixed", "toolbar-tablet-and-mobile-fixed", "aside-enabled", "aside-fixed"];
              
        document.body.classList.add(...cls);
    }
    
    render() {
        const { checked } = this.state;
        return (

           
<div className="d-flex flex-column flex-root">
            {/* {
                checked && <>
            <HeaderComponent />
            <ToastContainer autoClose={2000} position="bottom-left" closeOnClick />
                {this.props.children}
            <FooterComponent />    
                </>
            } */}
    <div className="page d-flex flex-row flex-column-fluid">
        <div id="kt_aside" className="aside aside-dark aside-hoverable" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle">
            <div className="aside-logo flex-column-auto" id="kt_aside_logo">
                <a href="../../demo13/dist/index.html">
                    <img alt="Logo" src="assets/media/logos/logo-demo13.svg" className="h-15px logo" />
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
                            <div className="menu-content pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Dashboard</span>
                            </div>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link active" href="../../demo13/dist/index.html">
                                <span className="menu-icon">
                                    <i className="bi bi-grid fs-3"></i>
                                </span>
                                <span className="menu-title">Default</span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link" href="../../demo13/dist/dashboards/only-header.html">
                                <span className="menu-icon">
                                    <i className="bi bi-window fs-3"></i>
                                </span>
                                <span className="menu-title">Only Header</span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link" href="../../demo13/dist/landing.html">
                                <span className="menu-icon">
                                    <i className="bi bi-app-indicator fs-3"></i>
                                </span>
                                <span className="menu-title">Landing Page</span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <div className="menu-content pt-8 pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Crafted</span>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-archive fs-3"></i>
                                </span>
                                <span className="menu-title">Pages</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion menu-active-bg">
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Profile</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/profile/overview.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Overview</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/profile/projects.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Projects</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/profile/campaigns.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Campaigns</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/profile/documents.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Documents</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/profile/connections.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Connections</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/profile/activity.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Activity</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Projects</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/projects/list.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">My Projects</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/projects/project.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">View Project</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/projects/targets.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Targets</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/projects/budget.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Budget</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/projects/users.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Users</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/projects/files.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Files</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/projects/activity.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Activity</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/projects/settings.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Settings</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Wizards</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/wizards/horizontal.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Horizontal</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/wizards/vertical.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Vertical</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Search</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/search/horizontal.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Horizontal</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/search/vertical.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Vertical</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Blog</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/blog/home.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Blog Home</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/blog/post.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Blog Post</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Company</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/company/about.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">About Us</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/company/pricing.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Pricing</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/company/contact.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Contact Us</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/company/team.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Our Team</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/company/licenses.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Licenses</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/company/sitemap.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Sitemap</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Careers</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/careers/list.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Careers List</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/careers/apply.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Careers Apply</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">FAQ</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/faq/classic.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Classic</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/pages/faq/extended.html">
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
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-person fs-2"></i>
                                </span>
                                <span className="menu-title">Account</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion menu-active-bg">
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/account/overview.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Overview</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/account/settings.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Settings</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/account/security.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Security</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/account/billing.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Billing</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/account/statements.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Statements</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/account/referrals.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Referrals</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/account/api-keys.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">API Keys</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-sticky fs-3"></i>
                                </span>
                                <span className="menu-title">Authentication</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion menu-active-bg">
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Basic Flow</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/basic/sign-in.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Sign-in</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/basic/sign-up.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Sign-up</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/basic/two-steps.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Two-steps</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/basic/password-reset.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Password Reset</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/basic/new-password.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">New Password</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Aside Flow</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/aside/sign-in.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Sign-in</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/aside/sign-up.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Sign-up</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/aside/two-steps.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Two-steps</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/aside/password-reset.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Password Reset</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/aside/new-password.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">New Password</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Dark Flow</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/dark/sign-in.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Sign-in</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/dark/sign-up.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Sign-up</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/dark/two-steps.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Two-steps</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/dark/password-reset.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Password Reset</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/flows/dark/new-password.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">New Password</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/authentication/extended/multi-steps-sign-up.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Multi-steps Sign-up</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/authentication/extended/free-trial-sign-up.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Free Trial Sign-up</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/authentication/extended/coming-soon.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Coming Soon</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/authentication/general/welcome.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Welcome Message</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/authentication/general/verify-email.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Verify Email</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/authentication/general/password-confirmation.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Password Confirmation</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/authentication/general/deactivation.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Account Deactivation</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/authentication/general/error-404.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Error 404</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/authentication/general/error-500.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Error 500</span>
                                    </a>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Email Templates</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/email/verify-email.html" target="blank">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Verify Email</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/email/invitation.html" target="blank">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Account Invitation</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/email/password-reset.html" target="blank">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Password Reset</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/authentication/email/password-change.html" target="blank">
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
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-shield-check fs-3"></i>
                                </span>
                                <span className="menu-title">Modals</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion menu-active-bg">
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">General</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/general/invite-friends.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Invite Friends</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/general/view-users.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">View Users</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/general/select-users.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Select Users</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/general/upgrade-plan.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Upgrade Plan</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/general/share-earn.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Share &amp; Earn</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Forms</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/forms/new-target.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">New Target</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/forms/new-card.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">New Card</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/forms/new-address.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">New Address</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/forms/create-api-key.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Create API Key</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Wizards</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/wizards/two-factor-authentication.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Two Factor Auth</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/wizards/create-app.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Create App</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/wizards/create-account.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Create Account</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/wizards/create-project.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Create Project</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/wizards/offer-a-deal.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Offer a Deal</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Search</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/search/users.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Users</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/modals/search/select-location.html">
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
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-layers fs-3"></i>
                                </span>
                                <span className="menu-title">Widgets</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion menu-active-bg">
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/widgets/lists.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Lists</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/widgets/statistics.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Statistics</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/widgets/charts.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Charts</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/widgets/mixed.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Mixed</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/widgets/tables.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Tables</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/widgets/feeds.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Feeds</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="menu-item">
                            <div className="menu-content pt-8 pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Apps</span>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-printer fs-3"></i>
                                </span>
                                <span className="menu-title">Customers</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion">
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/customers/getting-started.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Getting Started</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/customers/list.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Customer Listing</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/customers/view.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Customer Details</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-cart fs-3"></i>
                                </span>
                                <span className="menu-title">Subscriptions</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion">
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/subscriptions/getting-started.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Getting Started</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/subscriptions/list.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Subscription List</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/subscriptions/add.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Add Subscription</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/subscriptions/view.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">View Subscription</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-hr fs-3"></i>
                                </span>
                                <span className="menu-title">Invoice Manager</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion">
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">View Invoices</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion menu-active-bg">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/invoices/view/invoice-1.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Invoice 1</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/invoices/view/invoice-2.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Invoice 2</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/invoices/create.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Create Invoice</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion mb-1">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-people fs-3"></i>
                                </span>
                                <span className="menu-title">User Management</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion">
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion mb-1">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Users</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/user-management/users/list.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Users List</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/user-management/users/view.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">View User</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Roles</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/user-management/roles/list.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Roles List</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/user-management/roles/view.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">View Role</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/user-management/permissions.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Permissions</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion mb-1">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-people fs-3"></i>
                                </span>
                                <span className="menu-title">Support Center</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion">
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/support-center/overview.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Overview</span>
                                    </a>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion mb-1">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Tickets</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/support-center/tickets/list.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Tickets List</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/support-center/tickets/view.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">View Ticket</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion mb-1">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Tutorials</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/support-center/tutorials/list.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Tutorials List</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="../../demo13/dist/apps/support-center/tutorials/post.html">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Tutorial Post</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/support-center/faq.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">FAQ</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/support-center/licenses.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Licenses</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/support-center/contact.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Contact Us</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link" href="../../demo13/dist/apps/calendar.html">
                                <span className="menu-icon">
                                    <i className="bi bi-calendar3-event fs-3"></i>
                                </span>
                                <span className="menu-title">Calendar</span>
                            </a>
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi-chat-left fs-3"></i>
                                </span>
                                <span className="menu-title">Chat</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion">
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/chat/private.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Private Chat</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/chat/group.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Group Chat</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/apps/chat/drawer.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Drawer Chat</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="menu-item">
                            <div className="menu-content pt-8 pb-0">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">Layout</span>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                            <span className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-layout-sidebar fs-3"></i>
                                </span>
                                <span className="menu-title">Aside</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div className="menu-sub menu-sub-accordion menu-active-bg">
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/layouts/aside/light.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Light Skin</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/layouts/aside/font-icons.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Font Icons</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="../../demo13/dist/layouts/aside/minimized.html">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">Minimized</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link" href="https://preview.keenthemes.com/metronic8/demo13/layout-builder.html" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right">
                                <span className="menu-icon">
                                    <i className="bi bi-layers fs-3"></i>
                                </span>
                                <span className="menu-title">Layout Builder</span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <div className="menu-content">
                                <div className="separator mx-1 my-4"></div>
                            </div>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link" href="../../demo13/dist/documentation/getting-started/changelog.html">
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M16.95 18.9688C16.75 18.9688 16.55 18.8688 16.35 18.7688C15.85 18.4688 15.75 17.8688 16.05 17.3688L19.65 11.9688L16.05 6.56876C15.75 6.06876 15.85 5.46873 16.35 5.16873C16.85 4.86873 17.45 4.96878 17.75 5.46878L21.75 11.4688C21.95 11.7688 21.95 12.2688 21.75 12.5688L17.75 18.5688C17.55 18.7688 17.25 18.9688 16.95 18.9688ZM7.55001 18.7688C8.05001 18.4688 8.15 17.8688 7.85 17.3688L4.25001 11.9688L7.85 6.56876C8.15 6.06876 8.05001 5.46873 7.55001 5.16873C7.05001 4.86873 6.45 4.96878 6.15 5.46878L2.15 11.4688C1.95 11.7688 1.95 12.2688 2.15 12.5688L6.15 18.5688C6.35 18.8688 6.65 18.9688 6.95 18.9688C7.15 18.9688 7.35001 18.8688 7.55001 18.7688Z" fill="black" />
                                            <path opacity="0.3" d="M10.45 18.9687C10.35 18.9687 10.25 18.9687 10.25 18.9687C9.75 18.8687 9.35 18.2688 9.55 17.7688L12.55 5.76878C12.65 5.26878 13.25 4.8687 13.75 5.0687C14.25 5.1687 14.65 5.76878 14.45 6.26878L11.45 18.2688C11.35 18.6688 10.85 18.9687 10.45 18.9687Z" fill="black" />
                                        </svg>
                                    </span>
                                </span>
                                <span className="menu-title">Changelog v8.0.25</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="aside-footer flex-column-auto pt-5 pb-7 px-5" id="kt_aside_footer">
                <a href="../../demo13/dist/documentation/getting-started.html" className="btn btn-custom btn-primary w-100" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss-="click" title="200+ in-house components and 3rd-party plugins">
                    <span className="btn-label">Docs &amp; Components</span>
                    <span className="svg-icon btn-icon svg-icon-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM15 17C15 16.4 14.6 16 14 16H8C7.4 16 7 16.4 7 17C7 17.6 7.4 18 8 18H14C14.6 18 15 17.6 15 17ZM17 12C17 11.4 16.6 11 16 11H8C7.4 11 7 11.4 7 12C7 12.6 7.4 13 8 13H16C16.6 13 17 12.6 17 12ZM17 7C17 6.4 16.6 6 16 6H8C7.4 6 7 6.4 7 7C7 7.6 7.4 8 8 8H16C16.6 8 17 7.6 17 7Z" fill="black" />
                            <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="black" />
                        </svg>
                    </span>
                </a>
            </div>
        </div>
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
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
                                    <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item menu-lg-down-accordion me-lg-1">
                                        <span className="menu-link py-3">
                                            <span className="menu-title">Layouts</span>
                                            <span className="menu-arrow d-lg-none"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-dropdown">
                                                <span className="menu-link py-3">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-layout-sidebar fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Aside</span>
                                                    <span className="menu-arrow"></span>
                                                </span>
                                                <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                                    <div className="menu-item">
                                                        <a className="menu-link py-3" href="../../demo13/dist/layouts/aside/minimized.html">
                                                            <span className="menu-bullet">
                                                                <span className="bullet bullet-dot"></span>
                                                            </span>
                                                            <span className="menu-title">Minimized</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item menu-lg-down-accordion me-lg-1">
                                        <span className="menu-link py-3">
                                            <span className="menu-title">Resources</span>
                                            <span className="menu-arrow d-lg-none"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                                            <div className="menu-item">
                                                <a className="menu-link py-3" href="../../demo13/dist/documentation/base/utilities.html" title="Check out over 200 in-house components, plugins and ready for use solutions" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right">
                                                    <span className="menu-icon">
                                                        <span className="svg-icon svg-icon-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path opacity="0.3" d="M4.05424 15.1982C8.34524 7.76818 13.5782 3.26318 20.9282 2.01418C21.0729 1.98837 21.2216 1.99789 21.3618 2.04193C21.502 2.08597 21.6294 2.16323 21.7333 2.26712C21.8372 2.37101 21.9144 2.49846 21.9585 2.63863C22.0025 2.7788 22.012 2.92754 21.9862 3.07218C20.7372 10.4222 16.2322 15.6552 8.80224 19.9462L4.05424 15.1982ZM3.81924 17.3372L2.63324 20.4482C2.58427 20.5765 2.5735 20.7163 2.6022 20.8507C2.63091 20.9851 2.69788 21.1082 2.79503 21.2054C2.89218 21.3025 3.01536 21.3695 3.14972 21.3982C3.28408 21.4269 3.42387 21.4161 3.55224 21.3672L6.66524 20.1802L3.81924 17.3372ZM16.5002 5.99818C16.2036 5.99818 15.9136 6.08615 15.6669 6.25097C15.4202 6.41579 15.228 6.65006 15.1144 6.92415C15.0009 7.19824 14.9712 7.49984 15.0291 7.79081C15.0869 8.08178 15.2298 8.34906 15.4396 8.55884C15.6494 8.76862 15.9166 8.91148 16.2076 8.96935C16.4986 9.02723 16.8002 8.99753 17.0743 8.884C17.3484 8.77046 17.5826 8.5782 17.7474 8.33153C17.9123 8.08486 18.0002 7.79485 18.0002 7.49818C18.0002 7.10035 17.8422 6.71882 17.5609 6.43752C17.2796 6.15621 16.8981 5.99818 16.5002 5.99818Z" fill="black" />
                                                                <path d="M4.05423 15.1982L2.24723 13.3912C2.15505 13.299 2.08547 13.1867 2.04395 13.0632C2.00243 12.9396 1.9901 12.8081 2.00793 12.679C2.02575 12.5498 2.07325 12.4266 2.14669 12.3189C2.22013 12.2112 2.31752 12.1219 2.43123 12.0582L9.15323 8.28918C7.17353 10.3717 5.4607 12.6926 4.05423 15.1982ZM8.80023 19.9442L10.6072 21.7512C10.6994 21.8434 10.8117 21.9129 10.9352 21.9545C11.0588 21.996 11.1903 22.0083 11.3195 21.9905C11.4486 21.9727 11.5718 21.9252 11.6795 21.8517C11.7872 21.7783 11.8765 21.6809 11.9402 21.5672L15.7092 14.8442C13.6269 16.8245 11.3061 18.5377 8.80023 19.9442ZM7.04023 18.1832L12.5832 12.6402C12.7381 12.4759 12.8228 12.2577 12.8195 12.032C12.8161 11.8063 12.725 11.5907 12.5653 11.4311C12.4057 11.2714 12.1901 11.1803 11.9644 11.1769C11.7387 11.1736 11.5205 11.2583 11.3562 11.4132L5.81323 16.9562L7.04023 18.1832Z" fill="black" />
                                                            </svg>
                                                        </span>
                                                    </span>
                                                    <span className="menu-title">Components</span>
                                                </a>
                                            </div>
                                            <div className="menu-item">
                                                <a className="menu-link py-3" href="../../demo13/dist/documentation/getting-started.html" title="Check out the complete documentation" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-box fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Documentation</span>
                                                </a>
                                            </div>
                                            <div className="menu-item">
                                                <a className="menu-link py-3" href="https://preview.keenthemes.com/metronic8/demo13/layout-builder.html" title="Build your layout, preview and export HTML for server side integration" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right">
                                                    <span className="menu-icon">
                                                        <i className="bi bi-layers fs-3"></i>
                                                    </span>
                                                    <span className="menu-title">Layout Builder</span>
                                                </a>
                                            </div>
                                            <div className="menu-item">
                                                <a className="menu-link py-3" href="../../demo13/dist/documentation/getting-started/changelog.html">
                                                    <span className="menu-icon">
                                                        <span className="svg-icon svg-icon-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M16.95 18.9688C16.75 18.9688 16.55 18.8688 16.35 18.7688C15.85 18.4688 15.75 17.8688 16.05 17.3688L19.65 11.9688L16.05 6.56876C15.75 6.06876 15.85 5.46873 16.35 5.16873C16.85 4.86873 17.45 4.96878 17.75 5.46878L21.75 11.4688C21.95 11.7688 21.95 12.2688 21.75 12.5688L17.75 18.5688C17.55 18.7688 17.25 18.9688 16.95 18.9688ZM7.55001 18.7688C8.05001 18.4688 8.15 17.8688 7.85 17.3688L4.25001 11.9688L7.85 6.56876C8.15 6.06876 8.05001 5.46873 7.55001 5.16873C7.05001 4.86873 6.45 4.96878 6.15 5.46878L2.15 11.4688C1.95 11.7688 1.95 12.2688 2.15 12.5688L6.15 18.5688C6.35 18.8688 6.65 18.9688 6.95 18.9688C7.15 18.9688 7.35001 18.8688 7.55001 18.7688Z" fill="black" />
                                                                <path opacity="0.3" d="M10.45 18.9687C10.35 18.9687 10.25 18.9687 10.25 18.9687C9.75 18.8687 9.35 18.2688 9.55 17.7688L12.55 5.76878C12.65 5.26878 13.25 4.8687 13.75 5.0687C14.25 5.1687 14.65 5.76878 14.45 6.26878L11.45 18.2688C11.35 18.6688 10.85 18.9687 10.45 18.9687Z" fill="black" />
                                                            </svg>
                                                        </span>
                                                    </span>
                                                    <span className="menu-title">Changelog v8.0.25</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" className="menu-item menu-lg-down-accordion me-lg-1">
                                        <span className="menu-link py-3">
                                            <span className="menu-title">Mega Menu</span>
                                            <span className="menu-arrow d-lg-none"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown w-100 w-lg-600px p-5 p-lg-5">
                                            <div className="row" data-kt-menu-dismiss="true">
                                                <div className="col-lg-4 border-left-lg-1">
                                                    <div className="menu-inline menu-column menu-active-bg">
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 border-left-lg-1">
                                                    <div className="menu-inline menu-column menu-active-bg">
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 border-left-lg-1">
                                                    <div className="menu-inline menu-column menu-active-bg">
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-bullet">
                                                                    <span className="bullet bullet-dot"></span>
                                                                </span>
                                                                <span className="menu-title">Example link</span>
                                                            </a>
                                                        </div>
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
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/electronics/elc004.svg-->  */}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M2 16C2 16.6 2.4 17 3 17H21C21.6 17 22 16.6 22 16V15H2V16Z" fill="black" />
                                                                            <path opacity="0.3" d="M21 3H3C2.4 3 2 3.4 2 4V15H22V4C22 3.4 21.6 3 21 3Z" fill="black" />
                                                                            <path opacity="0.3" d="M15 17H9V20H15V17Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon-->  */}
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">BoomApp by Keenthemes</a>
                                                                <span className="fs-7 text-muted fw-bold">#45789</span>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Item--> */}
                                                        {/* <!--begin::Item-->  */}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/* <!--begin::Symbol-->  */}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/graphs/gra001.svg-->  */}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M14 3V21H10V3C10 2.4 10.4 2 11 2H13C13.6 2 14 2.4 14 3ZM7 14H5C4.4 14 4 14.4 4 15V21H8V15C8 14.4 7.6 14 7 14Z" fill="black" />
                                                                            <path d="M21 20H20V8C20 7.4 19.6 7 19 7H17C16.4 7 16 7.4 16 8V20H3C2.4 20 2 20.4 2 21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21C22 20.4 21.6 20 21 20Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon-->  */}
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">"Kept API Project Meeting</a>
                                                                <span className="fs-7 text-muted fw-bold">#84050</span>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Item--> */}
                                                        {/* <!--begin::Item-->  */}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/* <!--begin::Symbol-->  */}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/graphs/gra006.svg-->  */}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="black" />
                                                                            <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon-->  */}
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">"KPI Monitoring App Launch</a>
                                                                <span className="fs-7 text-muted fw-bold">#84250</span>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Item--> */}
                                                        {/* <!--begin::Item-->  */}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/* <!--begin::Symbol-->  */}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/graphs/gra002.svg-->  */}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M20 8L12.5 5L5 14V19H20V8Z" fill="black" />
                                                                            <path d="M21 18H6V3C6 2.4 5.6 2 5 2C4.4 2 4 2.4 4 3V18H3C2.4 18 2 18.4 2 19C2 19.6 2.4 20 3 20H4V21C4 21.6 4.4 22 5 22C5.6 22 6 21.6 6 21V20H21C21.6 20 22 19.6 22 19C22 18.4 21.6 18 21 18Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon-->  */}
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Project Reference FAQ</a>
                                                                <span className="fs-7 text-muted fw-bold">#67945</span>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Item--> */}
                                                        {/* <!--begin::Item-->  */}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/* <!--begin::Symbol-->  */}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com010.svg-->  */}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M6 8.725C6 8.125 6.4 7.725 7 7.725H14L18 11.725V12.925L22 9.725L12.6 2.225C12.2 1.925 11.7 1.925 11.4 2.225L2 9.725L6 12.925V8.725Z" fill="black" />
                                                                            <path opacity="0.3" d="M22 9.72498V20.725C22 21.325 21.6 21.725 21 21.725H3C2.4 21.725 2 21.325 2 20.725V9.72498L11.4 17.225C11.8 17.525 12.3 17.525 12.6 17.225L22 9.72498ZM15 11.725H18L14 7.72498V10.725C14 11.325 14.4 11.725 15 11.725Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon-->  */}
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">"FitPro App Development</a>
                                                                <span className="fs-7 text-muted fw-bold">#84250</span>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Item--> */}
                                                        {/* <!--begin::Item-->  */}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/* <!--begin::Symbol-->  */}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin001.svg-->  */}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="black" />
                                                                            <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon-->  */}
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Shopix Mobile App</a>
                                                                <span className="fs-7 text-muted fw-bold">#45690</span>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Item--> */}
                                                        {/* <!--begin::Item-->  */}
                                                        <div className="d-flex align-items-center mb-5">
                                                            {/* <!--begin::Symbol-->  */}
                                                            <div className="symbol symbol-40px me-4">
                                                                <span className="symbol-label bg-light">
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="d-flex flex-column">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">"Landing UI Design" Launch</a>
                                                                <span className="fs-7 text-muted fw-bold">#24005</span>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Item-->  */}
                                                    </div>
                                                    {/* <!--end::Items-->  */}
                                                </div>
                                                {/* <!--end::Recently viewed--> */}
                                                {/* <!--begin::Empty-->  */}
                                                <div data-kt-search-element="empty" className="text-center d-none">
                                                    {/* <!--begin::Icon-->  */}
                                                    <div className="pt-10 pb-10">
                                                        {/* <!--begin::Svg Icon | path: icons/duotune/files/fil024.svg-->  */}
                                                        <span className="svg-icon svg-icon-4x opacity-50">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path opacity="0.3" d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="black" />
                                                                <path d="M20 8L14 2V6C14 7.10457 14.8954 8 16 8H20Z" fill="black" />
                                                                <rect x="13.6993" y="13.6656" width="4.42828" height="1.73089" rx="0.865447" transform="rotate(45 13.6993 13.6656)" fill="black" />
                                                                <path d="M15 12C15 14.2 13.2 16 11 16C8.8 16 7 14.2 7 12C7 9.8 8.8 8 11 8C13.2 8 15 9.8 15 12ZM11 9.6C9.68 9.6 8.6 10.68 8.6 12C8.6 13.32 9.68 14.4 11 14.4C12.32 14.4 13.4 13.32 13.4 12C13.4 10.68 12.32 9.6 11 9.6Z" fill="black" />
                                                            </svg>
                                                        </span>
                                                        {/* <!--end::Svg Icon-->  */}
                                                    </div>
                                                    {/* <!--end::Icon--> */}
                                                    {/* <!--begin::Message-->  */}
                                                    <div className="pb-15 fw-bold">
                                                        <h3 className="text-gray-600 fs-5 mb-2">No result found</h3>
                                                        <div className="text-muted fs-7">Please try again with a different query</div>
                                                    </div>
                                                    {/* <!--end::Message-->  */}
                                                </div>
                                                {/* <!--end::Empty-->  */}
                                            </div>
                                            {/* <!--end::Wrapper--> */}
                                            {/* <!--begin::Preferences-->  */}
                                            <form data-kt-search-element="advanced-options-form" className="pt-1 d-none">
                                                {/* <!--begin::Heading-->  */}
                                                <h3 className="fw-bold text-dark mb-7">Advanced Search</h3>
                                                {/* <!--end::Heading--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="mb-5">
                                                    <input type="text" className="form-control form-control-sm form-control-solid" placeholder="Contains the word" name="query" />
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="mb-5">
                                                    {/* <!--begin::Radio group-->  */}
                                                    <div className="nav-group nav-group-fluid">
                                                        {/* <!--begin::Option-->  */}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="type" defaultValue="has" defaultChecked="checked" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">All</span>
                                                        </label>
                                                        {/* <!--end::Option--> */}
                                                        {/* <!--begin::Option-->  */}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="type" defaultValue="users" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Users</span>
                                                        </label>
                                                        {/* <!--end::Option--> */}
                                                        {/* <!--begin::Option-->  */}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="type" defaultValue="orders" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Orders</span>
                                                        </label>
                                                        {/* <!--end::Option--> */}
                                                        {/* <!--begin::Option-->  */}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="type" defaultValue="projects" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Projects</span>
                                                        </label>
                                                        {/* <!--end::Option-->  */}
                                                    </div>
                                                    {/* <!--end::Radio group-->  */}
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="mb-5">
                                                    <input type="text" name="assignedto" className="form-control form-control-sm form-control-solid" placeholder="Assigned to" defaultValue="" />
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="mb-5">
                                                    <input type="text" name="collaborators" className="form-control form-control-sm form-control-solid" placeholder="Collaborators" defaultValue="" />
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="mb-5">
                                                    {/* <!--begin::Radio group-->  */}
                                                    <div className="nav-group nav-group-fluid">
                                                        {/* <!--begin::Option-->  */}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="attachment" defaultValue="has" defaultChecked="checked" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">Has attachment</span>
                                                        </label>
                                                        {/* <!--end::Option--> */}
                                                        {/* <!--begin::Option-->  */}
                                                        <label>
                                                            <input type="radio" className="btn-check" name="attachment" defaultValue="any" />
                                                            <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Any</span>
                                                        </label>
                                                        {/* <!--end::Option-->  */}
                                                    </div>
                                                    {/* <!--end::Radio group-->  */}
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="mb-5">
                                                    <select name="timezone" aria-label="Select a Timezone" data-control="select2" data-placeholder="date_period" className="form-select form-select-sm form-select-solid">
                                                        <option defaultValue="next">Within the next</option>
                                                        <option defaultValue="last">Within the last</option>
                                                        <option defaultValue="between">Between</option>
                                                        <option defaultValue="on">On</option>
                                                    </select>
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="row mb-8">
                                                    {/* <!--begin::Col-->  */}
                                                    <div className="col-6">
                                                        <input type="number" name="date_number" className="form-control form-control-sm form-control-solid" placeholder="Lenght" defaultValue="" />
                                                    </div>
                                                    {/* <!--end::Col--> */}
                                                    {/* <!--begin::Col-->  */}
                                                    <div className="col-6">
                                                        <select name="date_typer" aria-label="Select a Timezone" data-control="select2" data-placeholder="Period" className="form-select form-select-sm form-select-solid">
                                                            <option defaultValue="days">Days</option>
                                                            <option defaultValue="weeks">Weeks</option>
                                                            <option defaultValue="months">Months</option>
                                                            <option defaultValue="years">Years</option>
                                                        </select>
                                                    </div>
                                                    {/* <!--end::Col-->  */}
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Actions-->  */}
                                                <div className="d-flex justify-content-end">
                                                    <button type="reset" className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2" data-kt-search-element="advanced-options-form-cancel">Cancel</button>
                                                    <a href="../../demo13/dist/pages/search/horizontal.html" className="btn btn-sm fw-bolder btn-primary" data-kt-search-element="advanced-options-form-search">Search</a>
                                                </div>
                                                {/* <!--end::Actions-->  */}
                                            </form>
                                            {/* <!--end::Preferences--> */}
                                            {/* <!--begin::Preferences-->  */}
                                            <form data-kt-search-element="preferences" className="pt-1 d-none">
                                                {/* <!--begin::Heading-->  */}
                                                <h3 className="fw-bold text-dark mb-7">Search Preferences</h3>
                                                {/* <!--end::Heading--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="pb-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Projects</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" defaultChecked="checked" />
                                                    </label>
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="py-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Targets</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" defaultChecked="checked" />
                                                    </label>
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="py-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Affiliate Programs</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" />
                                                    </label>
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="py-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Referrals</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" defaultChecked="checked" />
                                                    </label>
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Input group-->  */}
                                                <div className="py-4 border-bottom">
                                                    <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                                                        <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Users</span>
                                                        <input className="form-check-input" type="checkbox" defaultValue="1" />
                                                    </label>
                                                </div>
                                                {/* <!--end::Input group--> */}
                                                {/* <!--begin::Actions-->  */}
                                                <div className="d-flex justify-content-end pt-7">
                                                    <button type="reset" className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2" data-kt-search-element="preferences-dismiss">Cancel</button>
                                                    <button type="submit" className="btn btn-sm fw-bolder btn-primary">Save Changes</button>
                                                </div>
                                                {/* <!--end::Actions-->  */}
                                            </form>
                                            {/* <!--end::Preferences-->  */}
                                        </div>
                                        {/* <!--end::Menu-->  */}
                                    </div>
                                    {/* <!--end::Search-->  */}
                                </div>
                                {/* <!--end::Search--> */}
                                {/* <!--begin::Activities-->  */}
                                <div className="d-flex align-items-stretch">
                                    {/* <!--begin::drawer toggle-->  */}
                                    <div className="topbar-item px-3 px-lg-5" id="kt_activities_toggle">
                                        <i className="bi bi-box-seam fs-3"></i>
                                    </div>
                                    {/* <!--end::drawer toggle-->  */}
                                </div>
                                {/* <!--end::Activities--> */}
                                {/* <!--begin::Quick links-->  */}
                                <div className="d-flex align-items-stretch">
                                    {/* <!--begin::Menu wrapper-->  */}
                                    <div className="topbar-item px-3 px-lg-5" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                        <i className="bi bi-bar-chart fs-3"></i>
                                    </div>
                                    {/* <!--begin::Menu-->  */}
                                    <div className="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px" data-kt-menu="true">
                                        {/* <!--begin::Heading-->  */}
                                        <div className="d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-10">
                                            {/* <!--begin::Title-->  */}
                                            <h3 className="text-white fw-bold mb-3">Quick Links</h3>
                                            {/* <!--end::Title--> */}
                                            {/* <!--begin::Status-->  */}
                                            <span className="badge bg-primary py-2 px-3">25 pending tasks</span>
                                            {/* <!--end::Status-->  */}
                                        </div>
                                        {/* <!--end::Heading--> */}
                                        {/* <!--begin:Nav-->  */}
                                        <div className="row g-0">
                                            {/* <!--begin:Item-->  */}
                                            <div className="col-6">
                                                <a href="../../demo13/dist/pages/projects/budget.html" className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin009.svg-->  */}
                                                    <span className="svg-icon svg-icon-3x svg-icon-primary mb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path opacity="0.3" d="M15.8 11.4H6C5.4 11.4 5 11 5 10.4C5 9.80002 5.4 9.40002 6 9.40002H15.8C16.4 9.40002 16.8 9.80002 16.8 10.4C16.8 11 16.3 11.4 15.8 11.4ZM15.7 13.7999C15.7 13.1999 15.3 12.7999 14.7 12.7999H6C5.4 12.7999 5 13.1999 5 13.7999C5 14.3999 5.4 14.7999 6 14.7999H14.8C15.3 14.7999 15.7 14.2999 15.7 13.7999Z" fill="black" />
                                                            <path d="M18.8 15.5C18.9 15.7 19 15.9 19.1 16.1C19.2 16.7 18.7 17.2 18.4 17.6C17.9 18.1 17.3 18.4999 16.6 18.7999C15.9 19.0999 15 19.2999 14.1 19.2999C13.4 19.2999 12.7 19.2 12.1 19.1C11.5 19 11 18.7 10.5 18.5C10 18.2 9.60001 17.7999 9.20001 17.2999C8.80001 16.8999 8.49999 16.3999 8.29999 15.7999C8.09999 15.1999 7.80001 14.7 7.70001 14.1C7.60001 13.5 7.5 12.8 7.5 12.2C7.5 11.1 7.7 10.1 8 9.19995C8.3 8.29995 8.79999 7.60002 9.39999 6.90002C9.99999 6.30002 10.7 5.8 11.5 5.5C12.3 5.2 13.2 5 14.1 5C15.2 5 16.2 5.19995 17.1 5.69995C17.8 6.09995 18.7 6.6 18.8 7.5C18.8 7.9 18.6 8.29998 18.3 8.59998C18.2 8.69998 18.1 8.69993 18 8.79993C17.7 8.89993 17.4 8.79995 17.2 8.69995C16.7 8.49995 16.5 7.99995 16 7.69995C15.5 7.39995 14.9 7.19995 14.2 7.19995C13.1 7.19995 12.1 7.6 11.5 8.5C10.9 9.4 10.5 10.6 10.5 12.2C10.5 13.3 10.7 14.2 11 14.9C11.3 15.6 11.7 16.1 12.3 16.5C12.9 16.9 13.5 17 14.2 17C15 17 15.7 16.8 16.2 16.4C16.8 16 17.2 15.2 17.9 15.1C18 15 18.5 15.2 18.8 15.5Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                    {/* <!--end::Svg Icon-->  */}
                                                    <span className="fs-5 fw-bold text-gray-800 mb-0">Accounting</span>
                                                    <span className="fs-7 text-gray-400">eCommerce</span>
                                                </a>
                                            </div>
                                            {/* <!--end:Item-->  */}
                                        
                                        </div>
                                        {/* <!--end:Nav-->  */}
                                        {/* <!--begin::View more-->  */}
                                        <div className="py-2 text-center border-top">
                                            <a href="../../demo13/dist/pages/profile/activity.html" className="btn btn-color-gray-600 btn-active-color-primary">View All
                                            {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->  */}
                                            <span className="svg-icon svg-icon-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                </svg>
                                            </span>
                                            {/* <!--end::Svg Icon-->  */}
                                            </a>
                                        </div>
                                        {/* <!--end::View more-->  */}
                                    </div>
                                    {/* <!--end::Menu-->  */}
                                    {/* <!--end::Menu wrapper-->  */}
                                </div>
                                {/* <!--end::Quick links-->  */}
                                {/* <!--begin::Chat-->  */}
                                <div className="d-flex align-items-stretch">
                                    {/* <!--begin::Menu wrapper-->  */}
                                    <div className="topbar-item position-relative px-3 px-lg-5" id="kt_drawer_chat_toggle">
                                        <i className="bi bi-chat-left-text fs-3"></i>
                                        <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 mt-4 start-50 animation-blink"></span>
                                    </div>
                                    {/* <!--end::Menu wrapper-->  */}
                                </div>
                                {/* <!--end::Chat--> */}
                                {/* <!--begin::Notifications-->  */}
                                <div className="d-flex align-items-stretch">
                                    {/* <!--begin::Menu wrapper-->  */}
                                    <div className="topbar-item position-relative px-3 px-lg-5" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                        <i className="bi bi-app-indicator fs-3"></i>
                                    </div>
                                    {/* <!--begin::Menu-->  */}
                                    <div className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px" data-kt-menu="true">
                                        {/* <!--begin::Heading-->  */}
                                        <div className="d-flex flex-column bgi-no-repeat rounded-top" >
                                            {/* <!--begin::Title-->  */}
                                            <h3 className="text-white fw-bold px-9 mt-10 mb-6">Notifications
                                            <span className="fs-8 opacity-75 ps-3">24 reports</span></h3>
                                            {/* <!--end::Title--> */}
                                            {/* <!--begin::Tabs-->  */}
                                            <ul className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9">
                                                <li className="nav-item">
                                                    <a className="nav-link text-white opacity-75 opacity-state-100 pb-4" data-bs-toggle="tab" href="#kt_topbar_notifications_1">Alerts</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link text-white opacity-75 opacity-state-100 pb-4 active" data-bs-toggle="tab" href="#kt_topbar_notifications_2">Updates</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link text-white opacity-75 opacity-state-100 pb-4" data-bs-toggle="tab" href="#kt_topbar_notifications_3">Logs</a>
                                                </li>
                                            </ul>
                                            {/* <!--end::Tabs-->  */}
                                        </div>
                                        {/* <!--end::Heading--> */}
                                        {/* <!--begin::Tab content-->  */}
                                        <div className="tab-content">
                                            {/* <!--begin::Tab panel-->  */}
                                            <div className="tab-pane fade" id="kt_topbar_notifications_1" role="tabpanel">
                                                {/* <!--begin::Items-->  */}
                                                <div className="scroll-y mh-325px my-5 px-8">
                                                    {/* <!--begin::Item-->  */}
                                                    <div className="d-flex flex-stack py-4">
                                                        {/* <!--begin::Section-->  */}
                                                        <div className="d-flex align-items-center">
                                                            {/* <!--begin::Symbol-->  */}
                                                            <div className="symbol symbol-35px me-4">
                                                                <span className="symbol-label bg-light-primary">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/technology/teh008.svg-->  */}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M11 6.5C11 9 9 11 6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5ZM17.5 2C15 2 13 4 13 6.5C13 9 15 11 17.5 11C20 11 22 9 22 6.5C22 4 20 2 17.5 2ZM6.5 13C4 13 2 15 2 17.5C2 20 4 22 6.5 22C9 22 11 20 11 17.5C11 15 9 13 6.5 13ZM17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13Z" fill="black" />
                                                                            <path d="M17.5 16C17.5 16 17.4 16 17.5 16L16.7 15.3C16.1 14.7 15.7 13.9 15.6 13.1C15.5 12.4 15.5 11.6 15.6 10.8C15.7 9.99999 16.1 9.19998 16.7 8.59998L17.4 7.90002H17.5C18.3 7.90002 19 7.20002 19 6.40002C19 5.60002 18.3 4.90002 17.5 4.90002C16.7 4.90002 16 5.60002 16 6.40002V6.5L15.3 7.20001C14.7 7.80001 13.9 8.19999 13.1 8.29999C12.4 8.39999 11.6 8.39999 10.8 8.29999C9.99999 8.19999 9.20001 7.80001 8.60001 7.20001L7.89999 6.5V6.40002C7.89999 5.60002 7.19999 4.90002 6.39999 4.90002C5.59999 4.90002 4.89999 5.60002 4.89999 6.40002C4.89999 7.20002 5.59999 7.90002 6.39999 7.90002H6.5L7.20001 8.59998C7.80001 9.19998 8.19999 9.99999 8.29999 10.8C8.39999 11.5 8.39999 12.3 8.29999 13.1C8.19999 13.9 7.80001 14.7 7.20001 15.3L6.5 16H6.39999C5.59999 16 4.89999 16.7 4.89999 17.5C4.89999 18.3 5.59999 19 6.39999 19C7.19999 19 7.89999 18.3 7.89999 17.5V17.4L8.60001 16.7C9.20001 16.1 9.99999 15.7 10.8 15.6C11.5 15.5 12.3 15.5 13.1 15.6C13.9 15.7 14.7 16.1 15.3 16.7L16 17.4V17.5C16 18.3 16.7 19 17.5 19C18.3 19 19 18.3 19 17.5C19 16.7 18.3 16 17.5 16Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon-->  */}
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="mb-0 me-2">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bolder">Project Alice</a>
                                                                <div className="text-gray-400 fs-7">Phase 1 development</div>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Section--> */}
                                                        {/* <!--begin::Label-->  */}
                                                        <span className="badge badge-light fs-8">1 hr</span>
                                                        {/* <!--end::Label-->  */}
                                                    </div>
                                                    {/* <!--end::Item--> */}
                                                    {/* <!--begin::Item-->  */}
                                                    <div className="d-flex flex-stack py-4">
                                                        {/* <!--begin::Section-->  */}
                                                        <div className="d-flex align-items-center">
                                                            {/* <!--begin::Symbol-->  */}
                                                            <div className="symbol symbol-35px me-4">
                                                                <span className="symbol-label bg-light-danger">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen044.svg-->  */}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-danger">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                                                                            <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="black" />
                                                                            <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon-->  */}
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="mb-0 me-2">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bolder">HR Confidential</a>
                                                                <div className="text-gray-400 fs-7">Confidential staff documents</div>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Section-->  */}
                                                        {/* <!--begin::Label-->  */}
                                                        <span className="badge badge-light fs-8">2 hrs</span>
                                                        {/* <!--end::Label-->  */}
                                                    </div>
                                                    {/* <!--end::Item--> */}
                                                    {/* <!--begin::Item-->  */}
                                                    <div className="d-flex flex-stack py-4">
                                                        {/* <!--begin::Section-->  */}
                                                        <div className="d-flex align-items-center">
                                                            {/* <!--begin::Symbol-->  */}
                                                            <div className="symbol symbol-35px me-4">
                                                                <span className="symbol-label bg-light-warning">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin006.svg-->  */}
                                                                    <span className="svg-icon svg-icon-2 svg-icon-warning">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="black" />
                                                                            <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon-->  */}
                                                                </span>
                                                            </div>
                                                            {/* <!--end::Symbol--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <div className="mb-0 me-2">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bolder">Company HR</a>
                                                                <div className="text-gray-400 fs-7">Corporeate staff profiles</div>
                                                            </div>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Section-->  */}
                                                        {/* <!--begin::Label-->  */}
                                                        <span className="badge badge-light fs-8">5 hrs</span>
                                                        {/* <!--end::Label-->  */}
                                                    </div>
                                                    {/* <!--end::Item-->  */}
                                    
                                                </div>
                                                {/* <!--end::Items--> */}
                                                {/* <!--begin::View more-->  */}
                                                <div className="py-3 text-center border-top">
                                                    <a href="../../demo13/dist/pages/profile/activity.html" className="btn btn-color-gray-600 btn-active-color-primary">View All
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->  */}
                                                    <span className="svg-icon svg-icon-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                            <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                    {/* <!--end::Svg Icon-->  */}
                                                    </a>
                                                </div>
                                                {/* <!--end::View more-->  */}
                                            </div>
                                            {/* <!--end::Tab panel-->  */}
                                            {/* <!--begin::Tab panel-->  */}
                                            <div className="tab-pane fade show active" id="kt_topbar_notifications_2" role="tabpanel">
                                                {/* <!--begin::Wrapper-->  */}
                                                <div className="d-flex flex-column px-9">
                                                    {/* <!--begin::Section-->  */}
                                                    <div className="pt-10 pb-0">
                                                        {/* <!--begin::Title-->  */}
                                                        <h3 className="text-dark text-center fw-bolder">Get Pro Access</h3>
                                                        {/* <!--end::Title--> */}
                                                        {/* <!--begin::Text-->  */}
                                                        <div className="text-center text-gray-600 fw-bold pt-1">Outlines keep you honest. They stoping you from amazing poorly about drive</div>
                                                        {/* <!--end::Text--> */}
                                                        {/* <!--begin::Action-->  */}
                                                        <div className="text-center mt-5 mb-9">
                                                            <a href="#" className="btn btn-sm btn-primary px-6" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">Upgrade</a>
                                                        </div>
                                                        {/* <!--end::Action-->  */}
                                                    </div>
                                                    {/* <!--end::Section--> */}
                                                    {/* <!--begin::Illustration-->  */}
                                                    <div className="text-center px-4">
                                                        <img className="mw-100 mh-200px" alt="image" src="assets/media/illustrations/unitedpalms-1/1.png" />
                                                    </div>
                                                    {/* <!--end::Illustration-->  */}
                                                </div>
                                                {/* <!--end::Wrapper-->  */}
                                            </div>
                                            {/* <!--end::Tab panel--> */}
                                            {/* <!--begin::Tab panel-->  */}
                                            <div className="tab-pane fade" id="kt_topbar_notifications_3" role="tabpanel">
                                                {/* <!--begin::Items-->  */}
                                                <div className="scroll-y mh-325px my-5 px-8">
                                                    {/* <!--begin::Item-->  */}
                                                    <div className="d-flex flex-stack py-4">
                                                        {/* <!--begin::Section-->  */}
                                                        <div className="d-flex align-items-center me-2">
                                                            {/* <!--begin::Code-->  */}
                                                            <span className="w-70px badge badge-light-success me-4">200 OK</span>
                                                            {/* <!--end::Code--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <a href="#" className="text-gray-800 text-hover-primary fw-bold">New order</a>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Section--> */}
                                                        {/* <!--begin::Label-->  */}
                                                        <span className="badge badge-light fs-8">Just now</span>
                                                        {/* <!--end::Label-->  */}
                                                    </div>
                                                    {/* <!--end::Item--> */}
                                                    {/* <!--begin::Item-->  */}
                                                    <div className="d-flex flex-stack py-4">
                                                        {/* <!--begin::Section-->  */}
                                                        <div className="d-flex align-items-center me-2">
                                                            {/* <!--begin::Code-->  */}
                                                            <span className="w-70px badge badge-light-danger me-4">500 ERR</span>
                                                            {/* <!--end::Code-->  */}
                                                            {/* <!--begin::Title-->  */}
                                                            <a href="#" className="text-gray-800 text-hover-primary fw-bold">New customer</a>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Section--> */}
                                                        {/* <!--begin::Label-->  */}
                                                        <span className="badge badge-light fs-8">2 hrs</span>
                                                        {/* <!--end::Label-->  */}
                                                    </div>
                                                    {/* <!--end::Item-->  */}
                                                    {/* <!--begin::Item-->  */}
                                                    <div className="d-flex flex-stack py-4">
                                                        {/* <!--begin::Section-->  */}
                                                        <div className="d-flex align-items-center me-2">
                                                            {/* <!--begin::Code-->  */}
                                                            <span className="w-70px badge badge-light-success me-4">200 OK</span>
                                                            {/* <!--end::Code--> */}
                                                            {/* <!--begin::Title-->  */}
                                                            <a href="#" className="text-gray-800 text-hover-primary fw-bold">Payment process</a>
                                                            {/* <!--end::Title-->  */}
                                                        </div>
                                                        {/* <!--end::Section--> */}
                                                        {/* <!--begin::Label-->  */}
                                                        <span className="badge badge-light fs-8">5 hrs</span>
                                                        {/* <!--end::Label-->  */}
                                                    </div>
                                                    {/* <!--end::Item-->  */}
                                                
                                                </div>
                                                {/* <!--end::Items-->  */}
                                                {/* <!--begin::View more-->  */}
                                                <div className="py-3 text-center border-top">
                                                    <a href="../../demo13/dist/pages/profile/activity.html" className="btn btn-color-gray-600 btn-active-color-primary">View All
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->  */}
                                                    <span className="svg-icon svg-icon-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                            <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                    {/* <!--end::Svg Icon-->  */}
                                                    </a>
                                                </div>
                                                {/* <!--end::View more-->  */}
                                            </div>
                                            {/* <!--end::Tab panel-->  */}
                                        </div>
                                        {/* <!--end::Tab content-->  */}
                                    </div>
                                    {/* <!--end::Menu--> */}
                                    {/* <!--end::Menu wrapper-->  */}
                                </div>
                                {/* <!--end::Notifications--> */}
                                {/* <!--begin::User-->  */}
                                <div className="d-flex align-items-stretch" id="kt_header_user_menu_toggle">
                                    {/* <!--begin::Menu wrapper-->  */}
                                    <div className="topbar-item cursor-pointer symbol px-3 px-lg-5 me-n3 me-lg-n5 symbol-30px symbol-md-35px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                        <img src="assets/media/avatars/150-2.jpg" alt="metronic" />
                                    </div>
                                    {/* <!--begin::Menu-->  */}
                                    <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px" data-kt-menu="true">
                                        {/* <!--begin::Menu item-->  */}
                                        <div className="menu-item px-3">
                                            <div className="menu-content d-flex align-items-center px-3">
                                                {/* <!--begin::Avatar-->  */}
                                                <div className="symbol symbol-50px me-5">
                                                    <img alt="Logo" src="assets/media/avatars/150-26.jpg" />
                                                </div>
                                                {/* <!--end::Avatar--> */}
                                                {/* <!--begin::Username-->  */}
                                                <div className="d-flex flex-column">
                                                    <div className="fw-bolder d-flex align-items-center fs-5">Max Smith
                                                    <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span></div>
                                                    <a href="#" className="fw-bold text-muted text-hover-primary fs-7">max@kt.com</a>
                                                </div>
                                                {/* <!--end::Username-->  */}
                                            </div>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu separator-->  */}
                                        <div className="separator my-2"></div>
                                        {/* <!--end::Menu separator--> */}
                                        {/* <!--begin::Menu item-->  */}
                                        <div className="menu-item px-5">
                                            <a href="../../demo13/dist/account/overview.html" className="menu-link px-5">My Profile</a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item-->  */}
                                        <div className="menu-item px-5">
                                            <a href="../../demo13/dist/pages/projects/list.html" className="menu-link px-5">
                                                <span className="menu-text">My Projects</span>
                                                <span className="menu-badge">
                                                    <span className="badge badge-light-danger badge-circle fw-bolder fs-7">3</span>
                                                </span>
                                            </a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item-->  */}
                                        <div className="menu-item px-5" data-kt-menu-trigger="hover" data-kt-menu-placement="left-start">
                                            <a href="#" className="menu-link px-5">
                                                <span className="menu-title">My Subscription</span>
                                                <span className="menu-arrow"></span>
                                            </a>
                                            {/* <!--begin::Menu sub-->  */}
                                            <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                {/* <!--begin::Menu item-->  */}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/referrals.html" className="menu-link px-5">Referrals</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item-->  */}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/billing.html" className="menu-link px-5">Billing</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item-->  */}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/statements.html" className="menu-link px-5">Payments</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item-->  */}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/statements.html" className="menu-link d-flex flex-stack px-5">Statements
                                                    <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="View your statements"></i></a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu separator-->  */}
                                                <div className="separator my-2"></div>
                                                {/* <!--end::Menu separator--> */}
                                                {/* <!--begin::Menu item-->  */}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content px-3">
                                                        <label className="form-check form-switch form-check-custom form-check-solid">
                                                            <input className="form-check-input w-30px h-20px" type="checkbox" defaultValue="1" defaultChecked="checked" name="notifications" />
                                                            <span className="form-check-label text-muted fs-7">Notifications</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                {/* <!--end::Menu item-->  */}
                                            </div>
                                            {/* <!--end::Menu sub-->  */}
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item-->  */}
                                        <div className="menu-item px-5">
                                            <a href="../../demo13/dist/account/statements.html" className="menu-link px-5">My Statements</a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu separator-->  */}
                                        <div className="separator my-2"></div>
                                        {/* <!--end::Menu separator--> */}
                                        {/* <!--begin::Menu item-->  */}
                                        <div className="menu-item px-5" data-kt-menu-trigger="hover" data-kt-menu-placement="left-start">
                                            <a href="#" className="menu-link px-5">
                                                <span className="menu-title position-relative">Language
                                                <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">English
                                                <img className="w-15px h-15px rounded-1 ms-2" src="assets/media/flags/united-states.svg" alt="" /></span></span>
                                            </a>
                                            {/* <!--begin::Menu sub-->  */}
                                            <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                {/* <!--begin::Menu item-->  */}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/settings.html" className="menu-link d-flex px-5 active">
                                                    <span className="symbol symbol-20px me-4">
                                                        <img className="rounded-1" src="assets/media/flags/united-states.svg" alt="" />
                                                    </span>English</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item-->  */}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/settings.html" className="menu-link d-flex px-5">
                                                    <span className="symbol symbol-20px me-4">
                                                        <img className="rounded-1" src="assets/media/flags/spain.svg" alt="" />
                                                    </span>Spanish</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item-->  */}
                                                <div className="menu-item px-3">
                                                    <a href="../../demo13/dist/account/settings.html" className="menu-link d-flex px-5">
                                                    <span className="symbol symbol-20px me-4">
                                                        <img className="rounded-1" src="assets/media/flags/germany.svg" alt="" />
                                                    </span>German</a>
                                                </div>
                                                {/* <!--end::Menu item-->  */}
                                            
                                            </div>
                                            {/* <!--end::Menu sub-->  */}
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item-->  */}
                                        <div className="menu-item px-5 my-1">
                                            <a href="../../demo13/dist/account/settings.html" className="menu-link px-5">Account Settings</a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu item-->  */}
                                        <div className="menu-item px-5">
                                            <a href="../../demo13/dist/authentication/flows/basic/sign-in.html" className="menu-link px-5">Sign Out</a>
                                        </div>
                                        {/* <!--end::Menu item--> */}
                                        {/* <!--begin::Menu separator-->  */}
                                        <div className="separator my-2"></div>
                                        {/* <!--end::Menu separator--> */}
                                        {/* <!--begin::Menu item-->  */}
                                        <div className="menu-item px-5">
                                            <div className="menu-content px-5">
                                                <label className="form-check form-switch form-check-custom form-check-solid pulse pulse-success" htmlFor="kt_user_menu_dark_mode_toggle">
                                                    <input className="form-check-input w-30px h-20px" type="checkbox" defaultValue="1" name="mode" id="kt_user_menu_dark_mode_toggle" data-kt-url="../../demo13/dist/index.html" />
                                                    <span className="pulse-ring ms-n1"></span>
                                                    <span className="form-check-label text-gray-600 fs-7">Dark Mode</span>
                                                </label>
                                            </div>
                                        </div>
                                        {/* <!--end::Menu item-->  */}
                                    </div>
                                    {/* <!--end::Menu--> */}
                                    {/* <!--end::Menu wrapper-->  */}
                                </div>
                                {/* <!--end::User --> */}
                                {/* <!--begin::Heaeder menu toggle-->  */}
                                <div className="d-flex align-items-stretch d-lg-none px-3 me-n3" title="Show header menu">
                                    <div className="topbar-item" id="kt_header_menu_mobile_toggle">
                                        <i className="bi bi-text-left fs-1"></i>
                                    </div>
                                </div>
                                {/* <!--end::Heaeder menu toggle-->  */}
                            </div>
                            {/* <!--end::Toolbar wrapper-->  */}
                        </div>
                        {/* <!--end::Topbar-->  */}
                    </div>
                    {/* <!--end::Wrapper-->  */}
                </div>
                {/* <!--end::Container-->  */}
            </div>
            {/* <!--end::Header-->  */}
            {/* <!--begin::Content-->  */}
            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                {/* <!--begin::Toolbar-->  */}
                <div className="toolbar" id="kt_toolbar">
                    {/* <!--begin::Container-->  */}
                    <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
                        {/* <!--begin::Page title-->  */}
                        <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                            {/* <!--begin::Title-->  */}
                            <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Dashboard
                            {/* <!--begin::Separator-->  */}
                            <span className="h-20px border-gray-200 border-start ms-3 mx-2"></span>
                            {/* <!--end::Separator--> */}
                            {/* <!--begin::Description-->  */}
                            <small className="text-muted fs-7 fw-bold my-1 ms-1">#XRS-45670</small>
                            {/* <!--end::Description-->  */}
                            </h1>
                            {/* <!--end::Title-->  */}
                        </div>
                        {/* <!--end::Page title--> */}
                        {/* <!--begin::Actions-->  */}
                        <div className="d-flex align-items-center py-1">
                            {/* <!--begin::Wrapper-->  */}
                            <div className="me-4">
                                {/* <!--begin::Menu-->  */}
                                <a href="#" className="btn btn-sm btn-flex btn-light btn-active-primary fw-bolder" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen031.svg-->  */}
                                <span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="black" />
                                    </svg>
                                </span>
                                {/* <!--end::Svg Icon--> Filter */}
                                </a>
                                {/* <!--begin::Menu 1-->  */}
                                <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" id="kt_menu_61484e382cca3">
                                    {/* <!--begin::Header-->  */}
                                    <div className="px-7 py-5">
                                        <div className="fs-5 text-dark fw-bolder">Filter Options</div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Menu separator-->  */}
                                    <div className="separator border-gray-200"></div>
                                    {/* <!--end::Menu separator-->  */}
                                    {/* <!--begin::Form-->  */}
                                    <div className="px-7 py-5">
                                        {/* <!--begin::Input group-->  */}
                                        <div className="mb-10">
                                            {/* <!--begin::Label-->  */}
                                            <label className="form-label fw-bold">Status:</label>
                                            {/* <!--end::Label--> */}
                                            {/* <!--begin::Input-->  */}
                                            <div>
                                                <select className="form-select form-select-solid" data-kt-select2="true" data-placeholder="Select option" data-dropdown-parent="#kt_menu_61484e382cca3" data-allow-clear="true">
                                                    <option></option>
                                                    <option defaultValue="1">Approved</option>
                                                    <option defaultValue="2">Pending</option>
                                                    <option defaultValue="2">In Process</option>
                                                    <option defaultValue="2">Rejected</option>
                                                </select>
                                            </div>
                                            {/* <!--end::Input-->  */}
                                        </div>
                                        {/* <!--end::Input group--> */}
                                        {/* <!--begin::Input group-->  */}
                                        <div className="mb-10">
                                            {/* <!--begin::Label-->  */}
                                            <label className="form-label fw-bold">Member Type:</label>
                                            {/* <!--end::Label--> */}
                                            {/* <!--begin::Options-->  */}
                                            <div className="d-flex">
                                                {/* <!--begin::Options-->  */}
                                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                                    <input className="form-check-input" type="checkbox" defaultValue="1" />
                                                    <span className="form-check-label">Author</span>
                                                </label>
                                                {/* <!--end::Options--> */}
                                                {/* <!--begin::Options-->  */}
                                                <label className="form-check form-check-sm form-check-custom form-check-solid">
                                                    <input className="form-check-input" type="checkbox" defaultValue="2" defaultChecked="checked" />
                                                    <span className="form-check-label">Customer</span>
                                                </label>
                                                {/* <!--end::Options-->  */}
                                            </div>
                                            {/* <!--end::Options-->  */}
                                        </div>
                                        {/* <!--end::Input group--> */}
                                        {/* <!--begin::Input group-->  */}
                                        <div className="mb-10">
                                            {/* <!--begin::Label-->  */}
                                            <label className="form-label fw-bold">Notifications:</label>
                                            {/* <!--end::Label--> */}
                                            {/* <!--begin::Switch-->  */}
                                            <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                                <input className="form-check-input" type="checkbox" defaultValue="" name="notifications" defaultChecked="checked" />
                                                <label className="form-check-label">Enabled</label>
                                            </div>
                                            {/* <!--end::Switch-->  */}
                                        </div>
                                        {/* <!--end::Input group--> */}
                                        {/* <!--begin::Actions-->  */}
                                        <div className="d-flex justify-content-end">
                                            <button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">Reset</button>
                                            <button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">Apply</button>
                                        </div>
                                        {/* <!--end::Actions-->  */}
                                    </div>
                                    {/* <!--end::Form-->  */}
                                </div>
                                {/* <!--end::Menu 1--> */}
                                {/* <!--end::Menu-->  */}
                            </div>
                            {/* <!--end::Wrapper--> */}
                            {/* <!--begin::Button-->  */}
                            <a href="#" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_create_app" id="kt_toolbar_primary_button">Create</a>
                            {/* <!--end::Button-->  */}
                        </div>
                        {/* <!--end::Actions-->  */}
                    </div>
                    {/* <!--end::Container-->  */}
                </div>
                {/* <!--end::Toolbar--> */}
                {/* <!--begin::Post-->  */}
                <div className="post d-flex flex-column-fluid" id="kt_post">
                    {/* <!--begin::Container-->  */}
                    <div id="kt_content_container" className="container-xxl">
                        {/* <!--begin::Row-->  */}
                        <div className="row gy-5 g-xl-8">
                            {/* <!--begin::Col--> */}
                            <div className="col-xxl-4">
                                {/* <!--begin::Mixed Widget 2--> */}
                                <div className="card card-xxl-stretch">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0 bg-danger py-5">
                                        <h3 className="card-title fw-bolder text-white">Sales Statistics</h3>
                                        <div className="card-toolbar">
                                            {/* <!--begin::Menu--> */}
                                            <button type="button" className="btn btn-sm btn-icon btn-color-white btn-active-white btn-active-color- border-0 me-n3" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg--> */}
                                                <span className="svg-icon svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
                                                            <rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                        </g>
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </button>
                                            {/* <!--begin::Menu 3--> */}
                                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3" data-kt-menu="true">
                                                {/* <!--begin::Heading--> */}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Payments</div>
                                                </div>
                                                {/* <!--end::Heading--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Create Invoice</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link flex-stack px-3">Create Payment
                                                    <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify a target name for future usage and reference"></i></a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Generate Bill</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-end">
                                                    <a href="#" className="menu-link px-3">
                                                        <span className="menu-title">Subscription</span>
                                                        <span className="menu-arrow"></span>
                                                    </a>
                                                    {/* <!--begin::Menu sub--> */}
                                                    <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Plans</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Billing</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Statements</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu separator--> */}
                                                        <div className="separator my-2"></div>
                                                        {/* <!--end::Menu separator--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <div className="menu-content px-3">
                                                                {/* <!--begin::Switch--> */}
                                                                <label className="form-check form-switch form-check-custom form-check-solid">
                                                                    {/* <!--begin::Input--> */}
                                                                    <input className="form-check-input w-30px h-20px" type="checkbox" defaultValue="1" defaultChecked="checked" name="notifications" />
                                                                    {/* <!--end::Input--> */}
                                                                    {/* <!--end::Label--> */}
                                                                    <span className="form-check-label text-muted fs-6">Recuring</span>
                                                                    {/* <!--end::Label--> */}
                                                                </label>
                                                                {/* <!--end::Switch--> */}
                                                            </div>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                    </div>
                                                    {/* <!--end::Menu sub--> */}
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3 my-1">
                                                    <a href="#" className="menu-link px-3">Settings</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                            </div>
                                            {/* <!--end::Menu 3--> */}
                                            {/* <!--end::Menu--> */}
                                        </div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body p-0">
                                        {/* <!--begin::Chart--> */}
                                        <div className="mixed-widget-2-chart card-rounded-bottom bg-danger" data-kt-color="danger" style={{height: "200px"}}></div>
                                        {/* <!--end::Chart--> */}
                                        {/* <!--begin::Stats--> */}
                                        <div className="card-p mt-n20 position-relative">
                                            {/* <!--begin::Row--> */}
                                            <div className="row g-0">
                                                {/* <!--begin::Col--> */}
                                                <div className="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen032.svg--> */}
                                                    <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect x="8" y="9" width="3" height="10" rx="1.5" fill="black" />
                                                            <rect opacity="0.5" x="13" y="5" width="3" height="14" rx="1.5" fill="black" />
                                                            <rect x="18" y="11" width="3" height="8" rx="1.5" fill="black" />
                                                            <rect x="3" y="13" width="3" height="6" rx="1.5" fill="black" />
                                                        </svg>
                                                    </span>
                                                    {/* <!--end::Svg Icon--> */}
                                                    <a href="#" className="text-warning fw-bold fs-6">Weekly Sales</a>
                                                </div>
                                                {/* <!--end::Col--> */}
                                                {/* <!--begin::Col--> */}
                                                <div className="col bg-light-primary px-6 py-8 rounded-2 mb-7">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin006.svg--> */}
                                                    <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="black" />
                                                            <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                    {/* <!--end::Svg Icon--> */}
                                                    <a href="#" className="text-primary fw-bold fs-6">New Projects</a>
                                                </div>
                                                {/* <!--end::Col--> */}
                                            </div>
                                            {/* <!--end::Row--> */}
                                            {/* <!--begin::Row--> */}
                                            <div className="row g-0">
                                                {/* <!--begin::Col--> */}
                                                <div className="col bg-light-danger px-6 py-8 rounded-2 me-7">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg--> */}
                                                    <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="black" />
                                                            <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                    {/* <!--end::Svg Icon--> */}
                                                    <a href="#" className="text-danger fw-bold fs-6 mt-2">Item Orders</a>
                                                </div>
                                                {/* <!--end::Col--> */}
                                                {/* <!--begin::Col--> */}
                                                <div className="col bg-light-success px-6 py-8 rounded-2">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com010.svg--> */}
                                                    <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M6 8.725C6 8.125 6.4 7.725 7 7.725H14L18 11.725V12.925L22 9.725L12.6 2.225C12.2 1.925 11.7 1.925 11.4 2.225L2 9.725L6 12.925V8.725Z" fill="black" />
                                                            <path opacity="0.3" d="M22 9.72498V20.725C22 21.325 21.6 21.725 21 21.725H3C2.4 21.725 2 21.325 2 20.725V9.72498L11.4 17.225C11.8 17.525 12.3 17.525 12.6 17.225L22 9.72498ZM15 11.725H18L14 7.72498V10.725C14 11.325 14.4 11.725 15 11.725Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                    {/* <!--end::Svg Icon--> */}
                                                    <a href="#" className="text-success fw-bold fs-6 mt-2">Bug Reports</a>
                                                </div>
                                                {/* <!--end::Col--> */}
                                            </div>
                                            {/* <!--end::Row--> */}
                                        </div>
                                        {/* <!--end::Stats--> */}
                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                                {/* <!--end::Mixed Widget 2--> */}
                            </div>
                            {/* <!--end::Col--> */}
                            {/* <!--begin::Col--> */}
                            <div className="col-xxl-4">
                                {/* <!--begin::List Widget 5--> */}
                                <div className="card card-xxl-stretch">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header align-items-center border-0 mt-4">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="fw-bolder mb-2 text-dark">Activities</span>
                                            <span className="text-muted fw-bold fs-7">890,344 Sales</span>
                                        </h3>
                                        <div className="card-toolbar">
                                            {/* <!--begin::Menu--> */}
                                            <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg--> */}
                                                <span className="svg-icon svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
                                                            <rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                        </g>
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </button>
                                            {/* <!--begin::Menu 1--> */}
                                            <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true" id="kt_menu_61484e382de6d">
                                                {/* <!--begin::Header--> */}
                                                <div className="px-7 py-5">
                                                    <div className="fs-5 text-dark fw-bolder">Filter Options</div>
                                                </div>
                                                {/* <!--end::Header--> */}
                                                {/* <!--begin::Menu separator--> */}
                                                <div className="separator border-gray-200"></div>
                                                {/* <!--end::Menu separator--> */}
                                                {/* <!--begin::Form--> */}
                                                <div className="px-7 py-5">
                                                    {/* <!--begin::Input group--> */}
                                                    <div className="mb-10">
                                                        {/* <!--begin::Label--> */}
                                                        <label className="form-label fw-bold">Status:</label>
                                                        {/* <!--end::Label--> */}
                                                        {/* <!--begin::Input--> */}
                                                        <div>
                                                            <select className="form-select form-select-solid" data-kt-select2="true" data-placeholder="Select option" data-dropdown-parent="#kt_menu_61484e382de6d" data-allow-clear="true">
                                                                <option></option>
                                                                <option defaultValue="1">Approved</option>
                                                                <option defaultValue="2">Pending</option>
                                                                <option defaultValue="2">In Process</option>
                                                                <option defaultValue="2">Rejected</option>
                                                            </select>
                                                        </div>
                                                        {/* <!--end::Input--> */}
                                                    </div>
                                                    {/* <!--end::Input group--> */}
                                                    {/* <!--begin::Input group--> */}
                                                    <div className="mb-10">
                                                        {/* <!--begin::Label--> */}
                                                        <label className="form-label fw-bold">Member Type:</label>
                                                        {/* <!--end::Label--> */}
                                                        {/* <!--begin::Options--> */}
                                                        <div className="d-flex">
                                                            {/* <!--begin::Options--> */}
                                                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                                                <input className="form-check-input" type="checkbox" defaultValue="1" />
                                                                <span className="form-check-label">Author</span>
                                                            </label>
                                                            {/* <!--end::Options--> */}
                                                            {/* <!--begin::Options--> */}
                                                            <label className="form-check form-check-sm form-check-custom form-check-solid">
                                                                <input className="form-check-input" type="checkbox" defaultValue="2" defaultChecked="checked" />
                                                                <span className="form-check-label">Customer</span>
                                                            </label>
                                                            {/* <!--end::Options--> */}
                                                        </div>
                                                        {/* <!--end::Options--> */}
                                                    </div>
                                                    {/* <!--end::Input group--> */}
                                                    {/* <!--begin::Input group--> */}
                                                    <div className="mb-10">
                                                        {/* <!--begin::Label--> */}
                                                        <label className="form-label fw-bold">Notifications:</label>
                                                        {/* <!--end::Label--> */}
                                                        {/* <!--begin::Switch--> */}
                                                        <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                                            <input className="form-check-input" type="checkbox" defaultValue="" name="notifications" defaultChecked="checked" />
                                                            <label className="form-check-label">Enabled</label>
                                                        </div>
                                                        {/* <!--end::Switch--> */}
                                                    </div>
                                                    {/* <!--end::Input group--> */}
                                                    {/* <!--begin::Actions--> */}
                                                    <div className="d-flex justify-content-end">
                                                        <button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">Reset</button>
                                                        <button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">Apply</button>
                                                    </div>
                                                    {/* <!--end::Actions--> */}
                                                </div>
                                                {/* <!--end::Form--> */}
                                            </div>
                                            {/* <!--end::Menu 1--> */}
                                            {/* <!--end::Menu--> */}
                                        </div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body pt-5">
                                        {/* <!--begin::Timeline--> */}
                                        <div className="timeline-label">
                                            {/* <!--begin::Item--> */}
                                            <div className="timeline-item">
                                                {/* <!--begin::Label--> */}
                                                <div className="timeline-label fw-bolder text-gray-800 fs-6">08:42</div>
                                                {/* <!--end::Label--> */}
                                                {/* <!--begin::Badge--> */}
                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-warning fs-1"></i>
                                                </div>
                                                {/* <!--end::Badge--> */}
                                                {/* <!--begin::Text--> */}
                                                <div className="fw-mormal timeline-content text-muted ps-3">Outlines keep you honest. And keep structure</div>
                                                {/* <!--end::Text--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                            {/* <!--begin::Item--> */}
                                            <div className="timeline-item">
                                                {/* <!--begin::Label--> */}
                                                <div className="timeline-label fw-bolder text-gray-800 fs-6">10:00</div>
                                                {/* <!--end::Label--> */}
                                                {/* <!--begin::Badge--> */}
                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-success fs-1"></i>
                                                </div>
                                                {/* <!--end::Badge--> */}
                                                {/* <!--begin::Content--> */}
                                                <div className="timeline-content d-flex">
                                                    <span className="fw-bolder text-gray-800 ps-3">AEOL meeting</span>
                                                </div>
                                                {/* <!--end::Content--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                            {/* <!--begin::Item--> */}
                                            <div className="timeline-item">
                                                {/* <!--begin::Label--> */}
                                                <div className="timeline-label fw-bolder text-gray-800 fs-6">14:37</div>
                                                {/* <!--end::Label--> */}
                                                {/* <!--begin::Badge--> */}
                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-danger fs-1"></i>
                                                </div>
                                                {/* <!--end::Badge--> */}
                                                {/* <!--begin::Desc--> */}
                                                <div className="timeline-content fw-bolder text-gray-800 ps-3">Make deposit
                                                <a href="#" className="text-primary">USD 700</a>. to ESL</div>
                                                {/* <!--end::Desc--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                            {/* <!--begin::Item--> */}
                                            <div className="timeline-item">
                                                {/* <!--begin::Label--> */}
                                                <div className="timeline-label fw-bolder text-gray-800 fs-6">16:50</div>
                                                {/* <!--end::Label--> */}
                                                {/* <!--begin::Badge--> */}
                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-primary fs-1"></i>
                                                </div>
                                                {/* <!--end::Badge--> */}
                                                {/* <!--begin::Text--> */}
                                                <div className="timeline-content fw-mormal text-muted ps-3">Indulging in poorly driving and keep structure keep great</div>
                                                {/* <!--end::Text--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                            {/* <!--begin::Item--> */}
                                            <div className="timeline-item">
                                                {/* <!--begin::Label--> */}
                                                <div className="timeline-label fw-bolder text-gray-800 fs-6">21:03</div>
                                                {/* <!--end::Label--> */}
                                                {/* <!--begin::Badge--> */}
                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-danger fs-1"></i>
                                                </div>
                                                {/* <!--end::Badge--> */}
                                                {/* <!--begin::Desc--> */}
                                                <div className="timeline-content fw-bold text-gray-800 ps-3">New order placed
                                                <a href="#" className="text-primary">#XF-2356</a>.</div>
                                                {/* <!--end::Desc--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                            {/* <!--begin::Item--> */}
                                            <div className="timeline-item">
                                                {/* <!--begin::Label--> */}
                                                <div className="timeline-label fw-bolder text-gray-800 fs-6">16:50</div>
                                                {/* <!--end::Label--> */}
                                                {/* <!--begin::Badge--> */}
                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-primary fs-1"></i>
                                                </div>
                                                {/* <!--end::Badge--> */}
                                                {/* <!--begin::Text--> */}
                                                <div className="timeline-content fw-mormal text-muted ps-3">Indulging in poorly driving and keep structure keep great</div>
                                                {/* <!--end::Text--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                            {/* <!--begin::Item--> */}
                                            <div className="timeline-item">
                                                {/* <!--begin::Label--> */}
                                                <div className="timeline-label fw-bolder text-gray-800 fs-6">21:03</div>
                                                {/* <!--end::Label--> */}
                                                {/* <!--begin::Badge--> */}
                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-danger fs-1"></i>
                                                </div>
                                                {/* <!--end::Badge--> */}
                                                {/* <!--begin::Desc--> */}
                                                <div className="timeline-content fw-bold text-gray-800 ps-3">New order placed
                                                <a href="#" className="text-primary">#XF-2356</a>.</div>
                                                {/* <!--end::Desc--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                            {/* <!--begin::Item--> */}
                                            <div className="timeline-item">
                                                {/* <!--begin::Label--> */}
                                                <div className="timeline-label fw-bolder text-gray-800 fs-6">10:30</div>
                                                {/* <!--end::Label--> */}
                                                {/* <!--begin::Badge--> */}
                                                <div className="timeline-badge">
                                                    <i className="fa fa-genderless text-success fs-1"></i>
                                                </div>
                                                {/* <!--end::Badge--> */}
                                                {/* <!--begin::Text--> */}
                                                <div className="timeline-content fw-mormal text-muted ps-3">Finance KPI Mobile app launch preparion meeting</div>
                                                {/* <!--end::Text--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                        </div>
                                        {/* <!--end::Timeline--> */}
                                    </div>
                                    {/* <!--end: Card Body--> */}
                                </div>
                                {/* <!--end: List Widget 5--> */}
                            </div>
                            {/* <!--end::Col--> */}
                            {/* <!--begin::Col--> */}
                            <div className="col-xxl-4">
                                {/* <!--begin::Mixed Widget 7--> */}
                                <div className="card card-xxl-stretch-50 mb-5 mb-xl-8">
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body d-flex flex-column p-0">
                                        {/* <!--begin::Stats--> */}
                                        <div className="flex-grow-1 card-p pb-0">
                                            <div className="d-flex flex-stack flex-wrap">
                                                <div className="me-2">
                                                    <a href="#" className="text-dark text-hover-primary fw-bolder fs-3">Generate Reports</a>
                                                    <div className="text-muted fs-7 fw-bold">Finance and accounting reports</div>
                                                </div>
                                                <div className="fw-bolder fs-3 text-primary">$24,500</div>
                                            </div>
                                        </div>
                                        {/* <!--end::Stats--> */}
                                        {/* <!--begin::Chart--> */}
                                        <div className="mixed-widget-7-chart card-rounded-bottom" data-kt-chart-color="primary" style={{height: "150px"}}></div>
                                        {/* <!--end::Chart--> */}
                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                                {/* <!--end::Mixed Widget 7--> */}
                                {/* <!--begin::Mixed Widget 10--> */}
                                <div className="card card-xxl-stretch-50 mb-5 mb-xl-8">
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body p-0 d-flex justify-content-between flex-column overflow-hidden">
                                        {/* <!--begin::Hidden--> */}
                                        <div className="d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3">
                                            <div className="me-2">
                                                <span className="fw-bolder text-gray-800 d-block fs-3">Sales</span>
                                                <span className="text-gray-400 fw-bold">Oct 8 - Oct 26 21</span>
                                            </div>
                                            <div className="fw-bolder fs-3 text-primary">$15,300</div>
                                        </div>
                                        {/* <!--end::Hidden--> */}
                                        {/* <!--begin::Chart--> */}
                                        <div className="mixed-widget-10-chart" data-kt-color="primary" style={{height: "175px"}}></div>
                                        {/* <!--end::Chart--> */}
                                    </div>
                                </div>
                                {/* <!--end::Mixed Widget 10--> */}
                            </div>
                            {/* <!--end::Col--> */}
                        </div>
                        {/* <!--end::Row--> */}
                        {/* <!--begin::Row--> */}
                        <div className="row gy-5 g-xl-8">
                            {/* <!--begin::Col--> */}
                            <div className="col-xl-4">
                                {/* <!--begin::List Widget 3--> */}
                                <div className="card card-xl-stretch mb-xl-8">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0">
                                        <h3 className="card-title fw-bolder text-dark">Todo</h3>
                                        <div className="card-toolbar">
                                            {/* <!--begin::Menu--> */}
                                            <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg--> */}
                                                <span className="svg-icon svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
                                                            <rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                        </g>
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </button>
                                            {/* <!--begin::Menu 3--> */}
                                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3" data-kt-menu="true">
                                                {/* <!--begin::Heading--> */}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Payments</div>
                                                </div>
                                                {/* <!--end::Heading--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Create Invoice</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link flex-stack px-3">Create Payment
                                                    <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify a target name for future usage and reference"></i></a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Generate Bill</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-end">
                                                    <a href="#" className="menu-link px-3">
                                                        <span className="menu-title">Subscription</span>
                                                        <span className="menu-arrow"></span>
                                                    </a>
                                                    {/* <!--begin::Menu sub--> */}
                                                    <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Plans</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Billing</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Statements</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu separator--> */}
                                                        <div className="separator my-2"></div>
                                                        {/* <!--end::Menu separator--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <div className="menu-content px-3">
                                                                {/* <!--begin::Switch--> */}
                                                                <label className="form-check form-switch form-check-custom form-check-solid">
                                                                    {/* <!--begin::Input--> */}
                                                                    <input className="form-check-input w-30px h-20px" type="checkbox" defaultValue="1" defaultChecked="checked" name="notifications" />
                                                                    {/* <!--end::Input--> */}
                                                                    {/* <!--end::Label--> */}
                                                                    <span className="form-check-label text-muted fs-6">Recuring</span>
                                                                    {/* <!--end::Label--> */}
                                                                </label>
                                                                {/* <!--end::Switch--> */}
                                                            </div>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                    </div>
                                                    {/* <!--end::Menu sub--> */}
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3 my-1">
                                                    <a href="#" className="menu-link px-3">Settings</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                            </div>
                                            {/* <!--end::Menu 3--> */}
                                            {/* <!--end::Menu--> */}
                                        </div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body pt-2">
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center mb-8">
                                            {/* <!--begin::Bullet--> */}
                                            <span className="bullet bullet-vertical h-40px bg-success"></span>
                                            {/* <!--end::Bullet--> */}
                                            {/* <!--begin::Checkbox--> */}
                                            <div className="form-check form-check-custom form-check-solid mx-5">
                                                <input className="form-check-input" type="checkbox" defaultValue="" />
                                            </div>
                                            {/* <!--end::Checkbox--> */}
                                            {/* <!--begin::Description--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-gray-800 text-hover-primary fw-bolder fs-6">Create FireStone Logo</a>
                                                <span className="text-muted fw-bold d-block">Due in 2 Days</span>
                                            </div>
                                            {/* <!--end::Description--> */}
                                            <span className="badge badge-light-success fs-8 fw-bolder">New</span>
                                        </div>
                                        {/* <!--end:Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center mb-8">
                                            {/* <!--begin::Bullet--> */}
                                            <span className="bullet bullet-vertical h-40px bg-primary"></span>
                                            {/* <!--end::Bullet--> */}
                                            {/* <!--begin::Checkbox--> */}
                                            <div className="form-check form-check-custom form-check-solid mx-5">
                                                <input className="form-check-input" type="checkbox" defaultValue="" />
                                            </div>
                                            {/* <!--end::Checkbox--> */}
                                            {/* <!--begin::Description--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-gray-800 text-hover-primary fw-bolder fs-6">Stakeholder Meeting</a>
                                                <span className="text-muted fw-bold d-block">Due in 3 Days</span>
                                            </div>
                                            {/* <!--end::Description--> */}
                                            <span className="badge badge-light-primary fs-8 fw-bolder">New</span>
                                        </div>
                                        {/* <!--end:Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center mb-8">
                                            {/* <!--begin::Bullet--> */}
                                            <span className="bullet bullet-vertical h-40px bg-warning"></span>
                                            {/* <!--end::Bullet--> */}
                                            {/* <!--begin::Checkbox--> */}
                                            <div className="form-check form-check-custom form-check-solid mx-5">
                                                <input className="form-check-input" type="checkbox" defaultValue="" />
                                            </div>
                                            {/* <!--end::Checkbox--> */}
                                            {/* <!--begin::Description--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-gray-800 text-hover-primary fw-bolder fs-6">Scoping &amp; Estimations</a>
                                                <span className="text-muted fw-bold d-block">Due in 5 Days</span>
                                            </div>
                                            {/* <!--end::Description--> */}
                                            <span className="badge badge-light-warning fs-8 fw-bolder">New</span>
                                        </div>
                                        {/* <!--end:Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center mb-8">
                                            {/* <!--begin::Bullet--> */}
                                            <span className="bullet bullet-vertical h-40px bg-primary"></span>
                                            {/* <!--end::Bullet--> */}
                                            {/* <!--begin::Checkbox--> */}
                                            <div className="form-check form-check-custom form-check-solid mx-5">
                                                <input className="form-check-input" type="checkbox" defaultValue="" />
                                            </div>
                                            {/* <!--end::Checkbox--> */}
                                            {/* <!--begin::Description--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-gray-800 text-hover-primary fw-bolder fs-6">KPI App Showcase</a>
                                                <span className="text-muted fw-bold d-block">Due in 2 Days</span>
                                            </div>
                                            {/* <!--end::Description--> */}
                                            <span className="badge badge-light-primary fs-8 fw-bolder">New</span>
                                        </div>
                                        {/* <!--end:Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center mb-8">
                                            {/* <!--begin::Bullet--> */}
                                            <span className="bullet bullet-vertical h-40px bg-danger"></span>
                                            {/* <!--end::Bullet--> */}
                                            {/* <!--begin::Checkbox--> */}
                                            <div className="form-check form-check-custom form-check-solid mx-5">
                                                <input className="form-check-input" type="checkbox" defaultValue="" />
                                            </div>
                                            {/* <!--end::Checkbox--> */}
                                            {/* <!--begin::Description--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-gray-800 text-hover-primary fw-bolder fs-6">Project Meeting</a>
                                                <span className="text-muted fw-bold d-block">Due in 12 Days</span>
                                            </div>
                                            {/* <!--end::Description--> */}
                                            <span className="badge badge-light-danger fs-8 fw-bolder">New</span>
                                        </div>
                                        {/* <!--end:Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center">
                                            {/* <!--begin::Bullet--> */}
                                            <span className="bullet bullet-vertical h-40px bg-success"></span>
                                            {/* <!--end::Bullet--> */}
                                            {/* <!--begin::Checkbox--> */}
                                            <div className="form-check form-check-custom form-check-solid mx-5">
                                                <input className="form-check-input" type="checkbox" defaultValue="" />
                                            </div>
                                            {/* <!--end::Checkbox--> */}
                                            {/* <!--begin::Description--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-gray-800 text-hover-primary fw-bolder fs-6">Customers Update</a>
                                                <span className="text-muted fw-bold d-block">Due in 1 week</span>
                                            </div>
                                            {/* <!--end::Description--> */}
                                            <span className="badge badge-light-success fs-8 fw-bolder">New</span>
                                        </div>
                                        {/* <!--end:Item--> */}
                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                                {/* <!--end:List Widget 3--> */}
                            </div>
                            {/* <!--end::Col--> */}
                            {/* <!--begin::Col--> */}
                            <div className="col-xl-8">
                                {/* <!--begin::Tables Widget 9--> */}
                                <div className="card card-xl-stretch mb-5 mb-xl-8">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bolder fs-3 mb-1">Members Statistics</span>
                                            <span className="text-muted mt-1 fw-bold fs-7">Over 500 members</span>
                                        </h3>
                                        <div className="card-toolbar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
                                            <a href="#" className="btn btn-sm btn-light btn-active-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_invite_friends">
                                            {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg--> */}
                                            <span className="svg-icon svg-icon-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="black" />
                                                    <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="black" />
                                                </svg>
                                            </span>
                                            {/* <!--end::Svg Icon--> */}New Member</a>
                                        </div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body py-3">
                                        {/* <!--begin::Table container--> */}
                                        <div className="table-responsive">
                                            {/* <!--begin::Table--> */}
                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                                {/* <!--begin::Table head--> */}
                                                <thead>
                                                    <tr className="fw-bolder text-muted">
                                                        <th className="w-25px">
                                                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                                <input className="form-check-input" type="checkbox" defaultValue="1" data-kt-check="true" data-kt-check-target=".widget-9-check" />
                                                            </div>
                                                        </th>
                                                        <th className="min-w-150px">Authors</th>
                                                        <th className="min-w-140px">Company</th>
                                                        <th className="min-w-120px">Progress</th>
                                                        <th className="min-w-100px text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                {/* <!--end::Table head--> */}
                                                {/* <!--begin::Table body--> */}
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                                <input className="form-check-input widget-9-check" type="checkbox" defaultValue="1" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="symbol symbol-45px me-5">
                                                                    <img src="assets/media/avatars/150-11.jpg" alt="" />
                                                                </div>
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Ana Simmons</a>
                                                                    <span className="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="#" className="text-dark fw-bolder text-hover-primary d-block fs-6">Intertico</a>
                                                            <span className="text-muted fw-bold text-muted d-block fs-7">Web, UI/UX Design</span>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="d-flex flex-column w-100 me-2">
                                                                <div className="d-flex flex-stack mb-2">
                                                                    <span className="text-muted me-2 fs-7 fw-bold">50%</span>
                                                                </div>
                                                                <div className="progress h-6px w-100">
                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen019.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="black" />
                                                                            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/art/art005.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black" />
                                                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black" />
                                                                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black" />
                                                                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                                <input className="form-check-input widget-9-check" type="checkbox" defaultValue="1" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="symbol symbol-45px me-5">
                                                                    <img src="assets/media/avatars/150-3.jpg" alt="" />
                                                                </div>
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Jessie Clarcson</a>
                                                                    <span className="text-muted fw-bold text-muted d-block fs-7">C#, ASP.NET, MS SQL</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="#" className="text-dark fw-bolder text-hover-primary d-block fs-6">Agoda</a>
                                                            <span className="text-muted fw-bold text-muted d-block fs-7">Houses &amp; Hotels</span>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="d-flex flex-column w-100 me-2">
                                                                <div className="d-flex flex-stack mb-2">
                                                                    <span className="text-muted me-2 fs-7 fw-bold">70%</span>
                                                                </div>
                                                                <div className="progress h-6px w-100">
                                                                    <div className="progress-bar bg-danger" role="progressbar" style={{width: "50%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen019.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="black" />
                                                                            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/art/art005.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black" />
                                                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black" />
                                                                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black" />
                                                                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                                <input className="form-check-input widget-9-check" type="checkbox" defaultValue="1" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="symbol symbol-45px me-5">
                                                                    <img src="assets/media/avatars/150-4.jpg" alt="" />
                                                                </div>
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Lebron Wayde</a>
                                                                    <span className="text-muted fw-bold text-muted d-block fs-7">PHP, Laravel, VueJS</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="#" className="text-dark fw-bolder text-hover-primary d-block fs-6">RoadGee</a>
                                                            <span className="text-muted fw-bold text-muted d-block fs-7">Transportation</span>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="d-flex flex-column w-100 me-2">
                                                                <div className="d-flex flex-stack mb-2">
                                                                    <span className="text-muted me-2 fs-7 fw-bold">60%</span>
                                                                </div>
                                                                <div className="progress h-6px w-100">
                                                                    <div className="progress-bar bg-success" role="progressbar" style={{width: "60%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen019.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="black" />
                                                                            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/art/art005.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black" />
                                                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black" />
                                                                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black" />
                                                                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                                <input className="form-check-input widget-9-check" type="checkbox" defaultValue="1" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="symbol symbol-45px me-5">
                                                                    <img src="assets/media/avatars/150-5.jpg" alt="" />
                                                                </div>
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Natali Goodwin</a>
                                                                    <span className="text-muted fw-bold text-muted d-block fs-7">Python, PostgreSQL, ReactJS</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="#" className="text-dark fw-bolder text-hover-primary d-block fs-6">The Hill</a>
                                                            <span className="text-muted fw-bold text-muted d-block fs-7">Insurance</span>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="d-flex flex-column w-100 me-2">
                                                                <div className="d-flex flex-stack mb-2">
                                                                    <span className="text-muted me-2 fs-7 fw-bold">50%</span>
                                                                </div>
                                                                <div className="progress h-6px w-100">
                                                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen019.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="black" />
                                                                            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/art/art005.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black" />
                                                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black" />
                                                                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black" />
                                                                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                                <input className="form-check-input widget-9-check" type="checkbox" defaultValue="1" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="symbol symbol-45px me-5">
                                                                    <img src="assets/media/avatars/150-6.jpg" alt="" />
                                                                </div>
                                                                <div className="d-flex justify-content-start flex-column">
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Kevin Leonard</a>
                                                                    <span className="text-muted fw-bold text-muted d-block fs-7">HTML, JS, ReactJS</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="#" className="text-dark fw-bolder text-hover-primary d-block fs-6">RoadGee</a>
                                                            <span className="text-muted fw-bold text-muted d-block fs-7">Art Director</span>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="d-flex flex-column w-100 me-2">
                                                                <div className="d-flex flex-stack mb-2">
                                                                    <span className="text-muted me-2 fs-7 fw-bold">90%</span>
                                                                </div>
                                                                <div className="progress h-6px w-100">
                                                                    <div className="progress-bar bg-info" role="progressbar" style={{width: "9%0"}} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen019.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="black" />
                                                                            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/art/art005.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="black" />
                                                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                                <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg--> */}
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black" />
                                                                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black" />
                                                                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black" />
                                                                        </svg>
                                                                    </span>
                                                                    {/* <!--end::Svg Icon--> */}
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                {/* <!--end::Table body--> */}
                                            </table>
                                            {/* <!--end::Table--> */}
                                        </div>
                                        {/* <!--end::Table container--> */}
                                    </div>
                                    {/* <!--begin::Body--> */}
                                </div>
                                {/* <!--end::Tables Widget 9--> */}
                            </div>
                            {/* <!--end::Col--> */}
                        </div>
                        {/* <!--end::Row--> */}
                        {/* <!--begin::Row--> */}
                        <div className="row gy-5 g-xl-8">
                            {/* <!--begin::Col--> */}
                            <div className="col-xl-4">
                                {/* <!--begin::List Widget 2--> */}
                                <div className="card card-xl-stretch mb-xl-8">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0">
                                        <h3 className="card-title fw-bolder text-dark">Authors</h3>
                                        <div className="card-toolbar">
                                            {/* <!--begin::Menu--> */}
                                            <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg--> */}
                                                <span className="svg-icon svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
                                                            <rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                        </g>
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </button>
                                            {/* <!--begin::Menu 2--> */}
                                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px" data-kt-menu="true">
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content fs-6 text-dark fw-bolder px-3 py-4">Quick Actions</div>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu separator--> */}
                                                <div className="separator mb-3 opacity-75"></div>
                                                {/* <!--end::Menu separator--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">New Ticket</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">New Customer</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-start">
                                                    {/* <!--begin::Menu item--> */}
                                                    <a href="#" className="menu-link px-3">
                                                        <span className="menu-title">New Group</span>
                                                        <span className="menu-arrow"></span>
                                                    </a>
                                                    {/* <!--end::Menu item--> */}
                                                    {/* <!--begin::Menu sub--> */}
                                                    <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Admin Group</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Staff Group</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Member Group</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                    </div>
                                                    {/* <!--end::Menu sub--> */}
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">New Contact</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu separator--> */}
                                                <div className="separator mt-3 opacity-75"></div>
                                                {/* <!--end::Menu separator--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content px-3 py-3">
                                                        <a className="btn btn-primary btn-sm px-4" href="#">Generate Reports</a>
                                                    </div>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                            </div>
                                            {/* <!--end::Menu 2--> */}
                                            {/* <!--end::Menu--> */}
                                        </div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body pt-2">
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center mb-7">
                                            {/* <!--begin::Avatar--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <img src="assets/media/avatars/150-1.jpg" className="" alt="" />
                                            </div>
                                            {/* <!--end::Avatar--> */}
                                            {/* <!--begin::Text--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Emma Smith</a>
                                                <span className="text-muted d-block fw-bold">Project Manager</span>
                                            </div>
                                            {/* <!--end::Text--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center mb-7">
                                            {/* <!--begin::Avatar--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <img src="assets/media/avatars/150-4.jpg" className="" alt="" />
                                            </div>
                                            {/* <!--end::Avatar--> */}
                                            {/* <!--begin::Text--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Sean Bean</a>
                                                <span className="text-muted d-block fw-bold">PHP, SQLite, Artisan CLI</span>
                                            </div>
                                            {/* <!--end::Text--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center mb-7">
                                            {/* <!--begin::Avatar--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <img src="assets/media/avatars/150-12.jpg" className="" alt="" />
                                            </div>
                                            {/* <!--end::Avatar--> */}
                                            {/* <!--begin::Text--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Brian Cox</a>
                                                <span className="text-muted d-block fw-bold">PHP, SQLite, Artisan CLI</span>
                                            </div>
                                            {/* <!--end::Text--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center mb-7">
                                            {/* <!--begin::Avatar--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <img src="assets/media/avatars/150-8.jpg" className="" alt="" />
                                            </div>
                                            {/* <!--end::Avatar--> */}
                                            {/* <!--begin::Text--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Francis Mitcham</a>
                                                <span className="text-muted d-block fw-bold">PHP, SQLite, Artisan CLI</span>
                                            </div>
                                            {/* <!--end::Text--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center">
                                            {/* <!--begin::Avatar--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <img src="assets/media/avatars/150-6.jpg" className="" alt="" />
                                            </div>
                                            {/* <!--end::Avatar--> */}
                                            {/* <!--begin::Text--> */}
                                            <div className="flex-grow-1">
                                                <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">Dan Wilson</a>
                                                <span className="text-muted d-block fw-bold">PHP, SQLite, Artisan CLI</span>
                                            </div>
                                            {/* <!--end::Text--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                                {/* <!--end::List Widget 2--> */}
                            </div>
                            {/* <!--end::Col--> */}
                            {/* <!--begin::Col--> */}
                            <div className="col-xl-4">
                                {/* <!--begin::List Widget 6--> */}
                                <div className="card card-xl-stretch mb-xl-8">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0">
                                        <h3 className="card-title fw-bolder text-dark">Notifications</h3>
                                        <div className="card-toolbar">
                                            {/* <!--begin::Menu--> */}
                                            <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg--> */}
                                                <span className="svg-icon svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
                                                            <rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                        </g>
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </button>
                                            {/* <!--begin::Menu 3--> */}
                                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3" data-kt-menu="true">
                                                {/* <!--begin::Heading--> */}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Payments</div>
                                                </div>
                                                {/* <!--end::Heading--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Create Invoice</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link flex-stack px-3">Create Payment
                                                    <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify a target name for future usage and reference"></i></a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Generate Bill</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-end">
                                                    <a href="#" className="menu-link px-3">
                                                        <span className="menu-title">Subscription</span>
                                                        <span className="menu-arrow"></span>
                                                    </a>
                                                    {/* <!--begin::Menu sub--> */}
                                                    <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Plans</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Billing</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Statements</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu separator--> */}
                                                        <div className="separator my-2"></div>
                                                        {/* <!--end::Menu separator--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <div className="menu-content px-3">
                                                                {/* <!--begin::Switch--> */}
                                                                <label className="form-check form-switch form-check-custom form-check-solid">
                                                                    {/* <!--begin::Input--> */}
                                                                    <input className="form-check-input w-30px h-20px" type="checkbox" defaultValue="1" defaultChecked="checked" name="notifications" />
                                                                    {/* <!--end::Input--> */}
                                                                    {/* <!--end::Label--> */}
                                                                    <span className="form-check-label text-muted fs-6">Recuring</span>
                                                                    {/* <!--end::Label--> */}
                                                                </label>
                                                                {/* <!--end::Switch--> */}
                                                            </div>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                    </div>
                                                    {/* <!--end::Menu sub--> */}
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3 my-1">
                                                    <a href="#" className="menu-link px-3">Settings</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                            </div>
                                            {/* <!--end::Menu 3--> */}
                                            {/* <!--end::Menu--> */}
                                        </div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body pt-0">
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center bg-light-warning rounded p-5 mb-7">
                                            {/* <!--begin::Icon--> */}
                                            <span className="svg-icon svg-icon-warning me-5">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg--> */}
                                                <span className="svg-icon svg-icon-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="black" />
                                                        <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="black" />
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </span>
                                            {/* <!--end::Icon--> */}
                                            {/* <!--begin::Title--> */}
                                            <div className="flex-grow-1 me-2">
                                                <a href="#" className="fw-bolder text-gray-800 text-hover-primary fs-6">Group lunch celebration</a>
                                                <span className="text-muted fw-bold d-block">Due in 2 Days</span>
                                            </div>
                                            {/* <!--end::Title--> */}
                                            {/* <!--begin::Lable--> */}
                                            <span className="fw-bolder text-warning py-1">+28%</span>
                                            {/* <!--end::Lable--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center bg-light-success rounded p-5 mb-7">
                                            {/* <!--begin::Icon--> */}
                                            <span className="svg-icon svg-icon-success me-5">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg--> */}
                                                <span className="svg-icon svg-icon-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="black" />
                                                        <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="black" />
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </span>
                                            {/* <!--end::Icon--> */}
                                            {/* <!--begin::Title--> */}
                                            <div className="flex-grow-1 me-2">
                                                <a href="#" className="fw-bolder text-gray-800 text-hover-primary fs-6">Navigation optimization</a>
                                                <span className="text-muted fw-bold d-block">Due in 2 Days</span>
                                            </div>
                                            {/* <!--end::Title--> */}
                                            {/* <!--begin::Lable--> */}
                                            <span className="fw-bolder text-success py-1">+50%</span>
                                            {/* <!--end::Lable--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center bg-light-danger rounded p-5 mb-7">
                                            {/* <!--begin::Icon--> */}
                                            <span className="svg-icon svg-icon-danger me-5">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg--> */}
                                                <span className="svg-icon svg-icon-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="black" />
                                                        <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="black" />
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </span>
                                            {/* <!--end::Icon--> */}
                                            {/* <!--begin::Title--> */}
                                            <div className="flex-grow-1 me-2">
                                                <a href="#" className="fw-bolder text-gray-800 text-hover-primary fs-6">Rebrand strategy planning</a>
                                                <span className="text-muted fw-bold d-block">Due in 5 Days</span>
                                            </div>
                                            {/* <!--end::Title--> */}
                                            {/* <!--begin::Lable--> */}
                                            <span className="fw-bolder text-danger py-1">-27%</span>
                                            {/* <!--end::Lable--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-center bg-light-info rounded p-5">
                                            {/* <!--begin::Icon--> */}
                                            <span className="svg-icon svg-icon-info me-5">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg--> */}
                                                <span className="svg-icon svg-icon-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="black" />
                                                        <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="black" />
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </span>
                                            {/* <!--end::Icon--> */}
                                            {/* <!--begin::Title--> */}
                                            <div className="flex-grow-1 me-2">
                                                <a href="#" className="fw-bolder text-gray-800 text-hover-primary fs-6">Product goals strategy</a>
                                                <span className="text-muted fw-bold d-block">Due in 7 Days</span>
                                            </div>
                                            {/* <!--end::Title--> */}
                                            {/* <!--begin::Lable--> */}
                                            <span className="fw-bolder text-info py-1">+8%</span>
                                            {/* <!--end::Lable--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                                {/* <!--end::List Widget 6--> */}
                            </div>
                            {/* <!--end::Col--> */}
                            {/* <!--begin::Col--> */}
                            <div className="col-xl-4">
                                {/* <!--begin::List Widget 4--> */}
                                <div className="card card-xl-stretch mb-5 mb-xl-8">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bolder text-dark">Trends</span>
                                            <span className="text-muted mt-1 fw-bold fs-7">Latest tech trends</span>
                                        </h3>
                                        <div className="card-toolbar">
                                            {/* <!--begin::Menu--> */}
                                            <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg--> */}
                                                <span className="svg-icon svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
                                                            <rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                        </g>
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </button>
                                            {/* <!--begin::Menu 3--> */}
                                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3" data-kt-menu="true">
                                                {/* <!--begin::Heading--> */}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Payments</div>
                                                </div>
                                                {/* <!--end::Heading--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Create Invoice</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link flex-stack px-3">Create Payment
                                                    <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify a target name for future usage and reference"></i></a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Generate Bill</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-end">
                                                    <a href="#" className="menu-link px-3">
                                                        <span className="menu-title">Subscription</span>
                                                        <span className="menu-arrow"></span>
                                                    </a>
                                                    {/* <!--begin::Menu sub--> */}
                                                    <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Plans</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Billing</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Statements</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu separator--> */}
                                                        <div className="separator my-2"></div>
                                                        {/* <!--end::Menu separator--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <div className="menu-content px-3">
                                                                {/* <!--begin::Switch--> */}
                                                                <label className="form-check form-switch form-check-custom form-check-solid">
                                                                    {/* <!--begin::Input--> */}
                                                                    <input className="form-check-input w-30px h-20px" type="checkbox" defaultValue="1" defaultChecked="checked" name="notifications" />
                                                                    {/* <!--end::Input--> */}
                                                                    {/* <!--end::Label--> */}
                                                                    <span className="form-check-label text-muted fs-6">Recuring</span>
                                                                    {/* <!--end::Label--> */}
                                                                </label>
                                                                {/* <!--end::Switch--> */}
                                                            </div>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                    </div>
                                                    {/* <!--end::Menu sub--> */}
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3 my-1">
                                                    <a href="#" className="menu-link px-3">Settings</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                            </div>
                                            {/* <!--end::Menu 3--> */}
                                            {/* <!--end::Menu--> */}
                                        </div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body pt-5">
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-sm-center mb-7">
                                            {/* <!--begin::Symbol--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <span className="symbol-label">
                                                    <img src="assets/media/svg/brand-logos/plurk.svg" className="h-50 align-self-center" alt="" />
                                                </span>
                                            </div>
                                            {/* <!--end::Symbol--> */}
                                            {/* <!--begin::Section--> */}
                                            <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                                                <div className="flex-grow-1 me-2">
                                                    <a href="#" className="text-gray-800 text-hover-primary fs-6 fw-bolder">Top Authors</a>
                                                    <span className="text-muted fw-bold d-block fs-7">Mark, Rowling, Esther</span>
                                                </div>
                                                <span className="badge badge-light fw-bolder my-2">+82$</span>
                                            </div>
                                            {/* <!--end::Section--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-sm-center mb-7">
                                            {/* <!--begin::Symbol--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <span className="symbol-label">
                                                    <img src="assets/media/svg/brand-logos/telegram.svg" className="h-50 align-self-center" alt="" />
                                                </span>
                                            </div>
                                            {/* <!--end::Symbol--> */}
                                            {/* <!--begin::Section--> */}
                                            <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                                                <div className="flex-grow-1 me-2">
                                                    <a href="#" className="text-gray-800 text-hover-primary fs-6 fw-bolder">Popular Authors</a>
                                                    <span className="text-muted fw-bold d-block fs-7">Randy, Steve, Mike</span>
                                                </div>
                                                <span className="badge badge-light fw-bolder my-2">+280$</span>
                                            </div>
                                            {/* <!--end::Section--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-sm-center mb-7">
                                            {/* <!--begin::Symbol--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <span className="symbol-label">
                                                    <img src="assets/media/svg/brand-logos/vimeo.svg" className="h-50 align-self-center" alt="" />
                                                </span>
                                            </div>
                                            {/* <!--end::Symbol--> */}
                                            {/* <!--begin::Section--> */}
                                            <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                                                <div className="flex-grow-1 me-2">
                                                    <a href="#" className="text-gray-800 text-hover-primary fs-6 fw-bolder">New Users</a>
                                                    <span className="text-muted fw-bold d-block fs-7">John, Pat, Jimmy</span>
                                                </div>
                                                <span className="badge badge-light fw-bolder my-2">+4500$</span>
                                            </div>
                                            {/* <!--end::Section--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-sm-center mb-7">
                                            {/* <!--begin::Symbol--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <span className="symbol-label">
                                                    <img src="assets/media/svg/brand-logos/bebo.svg" className="h-50 align-self-center" alt="" />
                                                </span>
                                            </div>
                                            {/* <!--end::Symbol--> */}
                                            {/* <!--begin::Section--> */}
                                            <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                                                <div className="flex-grow-1 me-2">
                                                    <a href="#" className="text-gray-800 text-hover-primary fs-6 fw-bolder">Active Customers</a>
                                                    <span className="text-muted fw-bold d-block fs-7">Mark, Rowling, Esther</span>
                                                </div>
                                                <span className="badge badge-light fw-bolder my-2">+686$</span>
                                            </div>
                                            {/* <!--end::Section--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                        {/* <!--begin::Item--> */}
                                        <div className="d-flex align-items-sm-center mb-7">
                                            {/* <!--begin::Symbol--> */}
                                            <div className="symbol symbol-50px me-5">
                                                <span className="symbol-label">
                                                    <img src="assets/media/svg/brand-logos/kickstarter.svg" className="h-50 align-self-center" alt="" />
                                                </span>
                                            </div>
                                            {/* <!--end::Symbol--> */}
                                            {/* <!--begin::Section--> */}
                                            <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                                                <div className="flex-grow-1 me-2">
                                                    <a href="#" className="text-gray-800 text-hover-primary fs-6 fw-bolder">Bestseller Theme</a>
                                                    <span className="text-muted fw-bold d-block fs-7">Disco, Retro, Sports</span>
                                                </div>
                                                <span className="badge badge-light fw-bolder my-2">+726$</span>
                                            </div>
                                            {/* <!--end::Section--> */}
                                        </div>
                                        {/* <!--end::Item--> */}
                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                                {/* <!--end::List Widget 4--> */}
                            </div>
                            {/* <!--end::Col--> */}
                        </div>
                        {/* <!--end::Row--> */}
                        {/* <!--begin::Row--> */}
                        <div className="row g-5 g-xxl-8">
                            {/* <!--begin::Col--> */}
                            <div className="col-xxl-4">
                                {/* <!--begin::Mixed Widget 5--> */}
                                <div className="card card-xxl-stretch mb-xl-8">
                                    {/* <!--begin::Beader--> */}
                                    <div className="card-header border-0 py-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bolder fs-3 mb-1">Trends</span>
                                            <span className="text-muted fw-bold fs-7">Latest trends</span>
                                        </h3>
                                        <div className="card-toolbar">
                                            {/* <!--begin::Menu--> */}
                                            <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg--> */}
                                                <span className="svg-icon svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
                                                            <rect x="14" y="5" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="5" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                            <rect x="14" y="14" width="5" height="5" rx="1" fill="#000000" opacity="0.3" />
                                                        </g>
                                                    </svg>
                                                </span>
                                                {/* <!--end::Svg Icon--> */}
                                            </button>
                                            {/* <!--begin::Menu 3--> */}
                                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3" data-kt-menu="true">
                                                {/* <!--begin::Heading--> */}
                                                <div className="menu-item px-3">
                                                    <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Payments</div>
                                                </div>
                                                {/* <!--end::Heading--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Create Invoice</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link flex-stack px-3">Create Payment
                                                    <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify a target name for future usage and reference"></i></a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3">
                                                    <a href="#" className="menu-link px-3">Generate Bill</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-end">
                                                    <a href="#" className="menu-link px-3">
                                                        <span className="menu-title">Subscription</span>
                                                        <span className="menu-arrow"></span>
                                                    </a>
                                                    {/* <!--begin::Menu sub--> */}
                                                    <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Plans</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Billing</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <a href="#" className="menu-link px-3">Statements</a>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                        {/* <!--begin::Menu separator--> */}
                                                        <div className="separator my-2"></div>
                                                        {/* <!--end::Menu separator--> */}
                                                        {/* <!--begin::Menu item--> */}
                                                        <div className="menu-item px-3">
                                                            <div className="menu-content px-3">
                                                                {/* <!--begin::Switch--> */}
                                                                <label className="form-check form-switch form-check-custom form-check-solid">
                                                                    {/* <!--begin::Input--> */}
                                                                    <input className="form-check-input w-30px h-20px" type="checkbox" defaultValue="1" defaultChecked="checked" name="notifications" />
                                                                    {/* <!--end::Input--> */}
                                                                    {/* <!--end::Label--> */}
                                                                    <span className="form-check-label text-muted fs-6">Recuring</span>
                                                                    {/* <!--end::Label--> */}
                                                                </label>
                                                                {/* <!--end::Switch--> */}
                                                            </div>
                                                        </div>
                                                        {/* <!--end::Menu item--> */}
                                                    </div>
                                                    {/* <!--end::Menu sub--> */}
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                                {/* <!--begin::Menu item--> */}
                                                <div className="menu-item px-3 my-1">
                                                    <a href="#" className="menu-link px-3">Settings</a>
                                                </div>
                                                {/* <!--end::Menu item--> */}
                                            </div>
                                            {/* <!--end::Menu 3--> */}
                                            {/* <!--end::Menu--> */}
                                        </div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body d-flex flex-column">
                                        {/* <!--begin::Chart--> */}
                                        <div className="mixed-widget-5-chart card-rounded-top" data-kt-chart-color="success" style={{height: "150px"}}></div>
                                        {/* <!--end::Chart--> */}
                                        {/* <!--begin::Items--> */}
                                        <div className="mt-5">
                                            {/* <!--begin::Item--> */}
                                            <div className="d-flex flex-stack mb-5">
                                                {/* <!--begin::Section--> */}
                                                <div className="d-flex align-items-center me-2">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-50px me-3">
                                                        <div className="symbol-label bg-light">
                                                            <img src="assets/media/svg/brand-logos/plurk.svg" className="h-50" alt="" />
                                                        </div>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Title--> */}
                                                    <div>
                                                        <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bolder">Top Authors</a>
                                                        <div className="fs-7 text-muted fw-bold mt-1">Ricky Hunt, Sandra Trepp</div>
                                                    </div>
                                                    {/* <!--end::Title--> */}
                                                </div>
                                                {/* <!--end::Section--> */}
                                                {/* <!--begin::Label--> */}
                                                <div className="badge badge-light fw-bold py-4 px-3">+82$</div>
                                                {/* <!--end::Label--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                            {/* <!--begin::Item--> */}
                                            <div className="d-flex flex-stack mb-5">
                                                {/* <!--begin::Section--> */}
                                                <div className="d-flex align-items-center me-2">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-50px me-3">
                                                        <div className="symbol-label bg-light">
                                                            <img src="assets/media/svg/brand-logos/figma-1.svg" className="h-50" alt="" />
                                                        </div>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Title--> */}
                                                    <div>
                                                        <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bolder">Top Sales</a>
                                                        <div className="fs-7 text-muted fw-bold mt-1">PitStop Emails</div>
                                                    </div>
                                                    {/* <!--end::Title--> */}
                                                </div>
                                                {/* <!--end::Section--> */}
                                                {/* <!--begin::Label--> */}
                                                <div className="badge badge-light fw-bold py-4 px-3">+82$</div>
                                                {/* <!--end::Label--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                            {/* <!--begin::Item--> */}
                                            <div className="d-flex flex-stack">
                                                {/* <!--begin::Section--> */}
                                                <div className="d-flex align-items-center me-2">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-50px me-3">
                                                        <div className="symbol-label bg-light">
                                                            <img src="assets/media/svg/brand-logos/vimeo.svg" className="h-50" alt="" />
                                                        </div>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Title--> */}
                                                    <div className="py-1">
                                                        <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bolder">Top Engagement</a>
                                                        <div className="fs-7 text-muted fw-bold mt-1">KT.com</div>
                                                    </div>
                                                    {/* <!--end::Title--> */}
                                                </div>
                                                {/* <!--end::Section--> */}
                                                {/* <!--begin::Label--> */}
                                                <div className="badge badge-light fw-bold py-4 px-3">+82$</div>
                                                {/* <!--end::Label--> */}
                                            </div>
                                            {/* <!--end::Item--> */}
                                        </div>
                                        {/* <!--end::Items--> */}
                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                                {/* <!--end::Mixed Widget 5--> */}
                            </div>
                            {/* <!--end::Col--> */}
                            {/* <!--begin::Col--> */}
                            <div className="col-xxl-8">
                                {/* <!--begin::Tables Widget 5--> */}
                                <div className="card card-xxl-stretch mb-5 mb-xl-8">
                                    {/* <!--begin::Header--> */}
                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bolder fs-3 mb-1">Latest Products</span>
                                            <span className="text-muted mt-1 fw-bold fs-7">More than 400 new products</span>
                                        </h3>
                                        <div className="card-toolbar">
                                            <ul className="nav">
                                                <li className="nav-item">
                                                    <a className="nav-link btn btn-sm btn-color-muted btn-active btn-active-dark active fw-bolder px-4 me-1" data-bs-toggle="tab" href="#kt_table_widget_5_tab_1">Month</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link btn btn-sm btn-color-muted btn-active btn-active-dark fw-bolder px-4 me-1" data-bs-toggle="tab" href="#kt_table_widget_5_tab_2">Week</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link btn btn-sm btn-color-muted btn-active btn-active-dark fw-bolder px-4" data-bs-toggle="tab" href="#kt_table_widget_5_tab_3">Day</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <!--end::Header--> */}
                                    {/* <!--begin::Body--> */}
                                    <div className="card-body py-3">
                                        <div className="tab-content">
                                            {/* <!--begin::Tap pane--> */}
                                            <div className="tab-pane fade show active" id="kt_table_widget_5_tab_1">
                                                {/* <!--begin::Table container--> */}
                                                <div className="table-responsive">
                                                    {/* <!--begin::Table--> */}
                                                    <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                                                        {/* <!--begin::Table head--> */}
                                                        <thead>
                                                            <tr className="border-0">
                                                                <th className="p-0 w-50px"></th>
                                                                <th className="p-0 min-w-150px"></th>
                                                                <th className="p-0 min-w-140px"></th>
                                                                <th className="p-0 min-w-110px"></th>
                                                                <th className="p-0 min-w-50px"></th>
                                                            </tr>
                                                        </thead>
                                                        {/* <!--end::Table head--> */}
                                                        {/* <!--begin::Table body--> */}
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/plurk.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Brad Simmons</a>
                                                                    <span className="text-muted fw-bold d-block">Movie Creator</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">React, HTML</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-success">Approved</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/telegram.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Popular Authors</a>
                                                                    <span className="text-muted fw-bold d-block">Most Successful</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">Python, MySQL</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-warning">In Progress</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/vimeo.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">New Users</a>
                                                                    <span className="text-muted fw-bold d-block">Awesome Users</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">Laravel,Metronic</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-primary">Success</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/bebo.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Active Customers</a>
                                                                    <span className="text-muted fw-bold d-block">Movie Creator</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">AngularJS, C#</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-danger">Rejected</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/kickstarter.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Bestseller Theme</a>
                                                                    <span className="text-muted fw-bold d-block">Best Customers</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">ReactJS, Ruby</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-warning">In Progress</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        {/* <!--end::Table body--> */}
                                                    </table>
                                                </div>
                                                {/* <!--end::Table--> */}
                                            </div>
                                            {/* <!--end::Tap pane--> */}
                                            {/* <!--begin::Tap pane--> */}
                                            <div className="tab-pane fade" id="kt_table_widget_5_tab_2">
                                                {/* <!--begin::Table container--> */}
                                                <div className="table-responsive">
                                                    {/* <!--begin::Table--> */}
                                                    <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                                                        {/* <!--begin::Table head--> */}
                                                        <thead>
                                                            <tr className="border-0">
                                                                <th className="p-0 w-50px"></th>
                                                                <th className="p-0 min-w-150px"></th>
                                                                <th className="p-0 min-w-140px"></th>
                                                                <th className="p-0 min-w-110px"></th>
                                                                <th className="p-0 min-w-50px"></th>
                                                            </tr>
                                                        </thead>
                                                        {/* <!--end::Table head--> */}
                                                        {/* <!--begin::Table body--> */}
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/plurk.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Brad Simmons</a>
                                                                    <span className="text-muted fw-bold d-block">Movie Creator</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">React, HTML</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-success">Approved</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/telegram.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Popular Authors</a>
                                                                    <span className="text-muted fw-bold d-block">Most Successful</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">Python, MySQL</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-warning">In Progress</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/bebo.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Active Customers</a>
                                                                    <span className="text-muted fw-bold d-block">Movie Creator</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">AngularJS, C#</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-danger">Rejected</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        {/* <!--end::Table body--> */}
                                                    </table>
                                                </div>
                                                {/* <!--end::Table--> */}
                                            </div>
                                            {/* <!--end::Tap pane--> */}
                                            {/* <!--begin::Tap pane--> */}
                                            <div className="tab-pane fade" id="kt_table_widget_5_tab_3">
                                                {/* <!--begin::Table container--> */}
                                                <div className="table-responsive">
                                                    {/* <!--begin::Table--> */}
                                                    <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                                                        {/* <!--begin::Table head--> */}
                                                        <thead>
                                                            <tr className="border-0">
                                                                <th className="p-0 w-50px"></th>
                                                                <th className="p-0 min-w-150px"></th>
                                                                <th className="p-0 min-w-140px"></th>
                                                                <th className="p-0 min-w-110px"></th>
                                                                <th className="p-0 min-w-50px"></th>
                                                            </tr>
                                                        </thead>
                                                        {/* <!--end::Table head--> */}
                                                        {/* <!--begin::Table body--> */}
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/kickstarter.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Bestseller Theme</a>
                                                                    <span className="text-muted fw-bold d-block">Best Customers</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">ReactJS, Ruby</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-warning">In Progress</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/bebo.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Active Customers</a>
                                                                    <span className="text-muted fw-bold d-block">Movie Creator</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">AngularJS, C#</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-danger">Rejected</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/vimeo.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">New Users</a>
                                                                    <span className="text-muted fw-bold d-block">Awesome Users</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">Laravel,Metronic</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-primary">Success</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="symbol symbol-45px me-2">
                                                                        <span className="symbol-label">
                                                                            <img src="assets/media/svg/brand-logos/telegram.svg" className="h-50 align-self-center" alt="" />
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">Popular Authors</a>
                                                                    <span className="text-muted fw-bold d-block">Most Successful</span>
                                                                </td>
                                                                <td className="text-end text-muted fw-bold">Python, MySQL</td>
                                                                <td className="text-end">
                                                                    <span className="badge badge-light-warning">In Progress</span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <a href="#" className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                        {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                            </svg>
                                                                        </span>
                                                                        {/* <!--end::Svg Icon--> */}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        {/* <!--end::Table body--> */}
                                                    </table>
                                                </div>
                                                {/* <!--end::Table--> */}
                                            </div>
                                            {/* <!--end::Tap pane--> */}
                                        </div>
                                    </div>
                                    {/* <!--end::Body--> */}
                                </div>
                                {/* <!--end::Tables Widget 5--> */}
                            </div>
                            {/* <!--end::Col--> */}
                        </div>
                        {/* <!--end::Row--> */}
                    
                    </div>
                    {/* <!--end::Container--> */}
                </div>
                {/* <!--end::Post--> */}
            </div>
            {/* <!--end::Content-->  */}
            {/* <!--begin::Footer-->  */}
            <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
                {/* <!--begin::Container-->  */}
                <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
                    {/* <!--begin::Copyright-->  */}
                    <div className="text-dark order-2 order-md-1">
                        <span className="text-muted fw-bold me-1">2021©</span>
                        <a className="text-gray-800 text-hover-primary">Keenthemes</a>
                    </div>
                    {/* <!--end::Copyright--> */}
                    {/* <!--begin::Menu-->  */}
                    <ul className="menu menu-gray-600 menu-hover-primary fw-bold order-1">
                        <li className="menu-item">
                            <a className="menu-link px-2">About</a>
                        </li>
                        <li className="menu-item">
                            <a className="menu-link px-2">Support</a>
                        </li>
                        <li className="menu-item">
                            <a className="menu-link px-2">Purchase</a>
                        </li>
                    </ul>
                    {/* <!--end::Menu-->  */}
                </div>
                {/* <!--end::Container-->  */}
            </div>
        </div>
    </div>
</div>
        );
    }
}
export default connect( store => {
    return {
        router: store.router,
        user: store.loginInfo,
      };
    } , dispatch => {
    return {
        logoutPage: (value) => { dispatch(authActions.logout(value))},
        setUserInfo: (value) => { dispatch(authActions.setUserInfo(value))},
    }
})(PrivateLayout)
  
