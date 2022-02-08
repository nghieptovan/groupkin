import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../../store/action/auth'
import localStorage from "../../utils/local-storage";
import ScreenSize from 'src/services/screenSize';

class FooterComponent extends Component {
  isMobile = false;
  constructor(props) {
    super(props);
    this.state = {
      closeGopY: false
    };
    this.isMobile = ScreenSize.isMobile;
  }

  componentDidMount  () {
    const _closeGopY = localStorage.get("_closeGopY");
    this.setState({ closeGopY: _closeGopY });
  }

  closeGopY = () => {
    localStorage.set('_closeGopY', true);
    this.setState({ closeGopY: true });
  }
  render() {
    const { closeGopY } = this.state;

    return (
      <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
						<div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
							<div className="text-dark order-2 order-md-1">
								<span className="text-muted fw-bold me-1">2022©</span>
								<a href="" target="_blank" rel="noopener noreferrer" className="text-gray-800 text-hover-primary">Keenthemes</a>
							</div>
						</div>
					</div>
    );
  }
}
export default connect(store => {
  return {
    login: store.loginInfo
  };
}, dispatch => {
  return {
    logoutPage: (value) => { dispatch(authActions.logout(value)) }
  }
})(FooterComponent)
