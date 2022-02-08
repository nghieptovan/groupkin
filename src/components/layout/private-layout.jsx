import React, { Component } from 'react';
import HeaderComponent from 'src/components/layout/header'
import FooterComponent from 'src/components/layout/footer'
import AsideComponent from 'src/components/layout/aside'
import { connect } from 'react-redux'
import * as authActions from '../../store/action/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CookiesService from '../../services/CookiesService';
import { CONSTS } from '../../config/Constant';
import '../../index.css';
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
        const cls = ["header-fixed", "header-tablet-and-mobile-fixed", "toolbar-tablet-and-mobile-fixed", "aside-enabled", "aside-fixed", "dashboard-page"];
        document.body.classList.add(...cls);
        document.body.classList.remove("bg-dark");
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
                    <ToastContainer autoClose={2000} position="bottom-left" closeOnClick />
                    <AsideComponent />
                    <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                        <HeaderComponent />
                        {this.props.children}
                        <FooterComponent /> 
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
  
