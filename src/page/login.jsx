import React, { Component } from 'react';
import * as authActions from '../store/action/auth'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { renderField } from '../utils/reduxField'
import { validateLoginForm } from 'src/utils/formValidation'
import SpinLoader from 'src/utils/spinners'
import { toast } from 'react-toastify'
import CookiesService from '../services/CookiesService';
import { CONSTS } from '../config/Constant';
import _ from 'lodash'
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
const REACT_APP_GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;

const validate = values => {
  return validateLoginForm(values, false);
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isLoggedIn: false,
      loading: true,
      error: '',
    };


  }

  componentDidMount() {
    let accesstoken = CookiesService.get(CONSTS.STORE_KEYS.USER.TOKEN);
    let user = CookiesService.get(CONSTS.STORE_KEYS.USER.PROFILE, true);
    if(accesstoken && user) {
      window.location.href = '/';
    }
    else{
      this.setState({ loading: false });
    }

  }



  UNSAFE_componentWillReceiveProps(nextProps) {

    const { statusLogin, error } = nextProps.login;
    const { login } = this.props;

    if (login.statusLogin != statusLogin && statusLogin === 2) {
      this.props.history.push('/');
    }

    if (login.statusLogin != statusLogin && statusLogin === 3) {
      this.setState({ error, loading: false });
      if (!toast.isActive("loginpage")) {
        toast.error(error, {
          toastId: "loginpage"
        })
      }
    }

  }

  handleSubmit() {
    const { userEmail, userPassword } = this.props;
    this.setState({
      loading: true
    })
    const data = {
      identifier: userEmail,
      password: userPassword
    };
    this.props.loginAction(data);
  }

  verifyCallback = (recaptchaToken) => {
    this.setState({ captcha: recaptchaToken });
  }
  render() {
    let disableButtonSaveStyle = { cursor: 'pointer' };
    const { captcha, loading } = this.state;

    const { valid, pristine, userEmail, userPassword } = this.props;

    if (!valid || pristine || !userEmail || !userPassword || !captcha || loading) {
      disableButtonSaveStyle.opacity = 0.5;
      disableButtonSaveStyle.pointerEvents = 'none';
    }

    return (
      <div className="d-flex flex-column flex-root">
        <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
          <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
            {/* <a href="../../demo2/dist/index.html" className="mb-12">
              <img alt="Logo" src="assets/media/logos/logo-2.svg" className="h-40px" />
            </a> */}
            <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
              <form className="form w-100" noValidate="novalidate" id="kt_sign_in_form">
                <div className="text-center mb-10">
                  <h1 className="text-dark mb-3">Sign In to {process.env.REACT_APP_TITLE}</h1>
                </div>
               
                <Field classgroup="fv-row mb-10"
                classlable="form-label fs-6 fw-bolder text-dark"
                classinput="form-control form-control-lg form-control-solid" 
                id="email" name="email" type="text" component={renderField} label="Email" />
                
                <Field classgroup="fv-row mb-10"
                classlable="form-label fw-bolder text-dark fs-6 mb-0"
                classinput="form-control form-control-lg form-control-solid" 
                id="password" name="password" type="password" component={renderField} label="Password" />

                <GoogleReCaptchaProvider reCaptchaKey={REACT_APP_GOOGLE_KEY}>
                  {!captcha &&  <GoogleReCaptcha onVerify={token => this.verifyCallback(token)} />}
                </GoogleReCaptchaProvider>

                <SpinLoader loading={loading} color='#36D7B7' ></SpinLoader>

                <div className="text-center">
                  <button style={disableButtonSaveStyle} type="button" id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5" onClick={() => this.handleSubmit()}>
                    <span className="indicator-label">Continue</span>
                    <span className="indicator-progress">Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                  </button>
                  <div className="text-center text-muted text-uppercase fw-bolder mb-5">or</div>
                  <a href="#" className="btn btn-flex flex-center btn-light btn-lg w-100 mb-5">
                  <img alt="Logo" src="assets/media/svg/brand-logos/facebook-4.svg" className="h-20px me-3" />Continue with Facebook</a>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex flex-center flex-column-auto p-10">
            <div className="d-flex align-items-center fw-bold fs-6">
            </div>
          </div>
        </div>
		  </div>
    );
  }
}
const selector = formValueSelector('formLogin');
Login = reduxForm({
  form: 'formLogin',
  validate
})(Login)


export default connect(store => {
  return {
    login: store.loginInfo,
    form: store.formLogin,
    userEmail: selector(store, 'email'),
    userPassword: selector(store, 'password'),
  };
}, dispatch => {
  return {
    loginAction: (value) => { dispatch(authActions.loginToBackEnd(value)) },
    setUserInfo: (value) => { dispatch(authActions.setUserInfo(value))},
  }
})(Login)
