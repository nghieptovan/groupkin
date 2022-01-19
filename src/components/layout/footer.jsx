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
      <>
        <footer className="main-footer">
          <strong>Copyright &copy; 2021 <a href="https://facebook.com/tovannghiep">NT</a>.</strong>
        </footer>

        {
          !closeGopY &&
          <div
            className="fixed-bottom"
            style={
              this.isMobile ?
                {
                  bottom: 'unset',
                  top: '50%',
                  transform: 'rotate(-90deg) translateY(-50%)',
                  right: '-120px',
                  left: "unset"
                }
                : {
                  left: "unset"
                }
            }
          >
            <div className="position-relative">

              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfRXPYYdsN3eJppeUE2jtlbKAuaa1YNGoPuLrMDJLkmUlOz_w/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className="btn bg-gradient-primary btn-app btn-flat"
                  style={{
                    height: "unset",
                    marginBottom: "0",
                    marginRight: "20px",
                    padding: '10px'
                  }}
                >
                  SAOStar: Góp ý - Báo lỗi CMS 2020
              </button>
              </a>
              <span className="badge bg-warning position-absolute"
                style={{
                  fontSize: "15px",
                  top: "-10px",
                  right: "11px",
                  cursor: "pointer",
                  borderRadius: "999px",
                  zIndex: '2'
                }}
                onClick={this.closeGopY}
              >
                <i className="fas fa-times"></i>
              </span>
            </div>
          </div >
        }

      </>
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
