import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as authActions from '../../store/action/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
class PublicLayout extends Component{

  constructor() {
    super();
  }
 



  render() {
      return (
      <>
        <ToastContainer autoClose={2000} position="bottom-left" closeOnClick />
         {this.props.children}  
      </>
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
})(PublicLayout)
