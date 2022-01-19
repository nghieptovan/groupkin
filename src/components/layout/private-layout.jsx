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
    }
    
    // static getDerivedStateFromProps (props, state) {
    //     // const {loginInfo} = prevProps;
    //     console.log(props);
    //     console.log(state);
    // }


    render() {
        const { checked } = this.state;
        return (
        
        <div className="wrapper">
            {
                !checked && 
                <ToastContainer autoClose={2000} position="bottom-left" closeOnClick />
            }    
            {
                checked && <>
                 <HeaderComponent />
            <ToastContainer autoClose={2000} position="bottom-left" closeOnClick />
                {this.props.children}
            <FooterComponent />    
                </>
            }
               
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
  
