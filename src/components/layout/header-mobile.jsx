import React, { Component } from "react"
import Input from "../../components/input/Input";
import { connect } from "react-redux"
import * as authActions from "../../store/action/auth"
import localStore from "src/utils/local-storage";
import UserAvatar from 'react-user-avatar';
import Link from "src/components/link"

const CONTENT_URL = process.env.REACT_APP_CONTENT;
class HeaderMobileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        search: {
          fieldName: "_q",
          value: ""
        }
      },

      user: null,
      clickLoggout: false

    };
  }

  componentDidMount() {
    const user = localStore.get("_user");
    this.setState({ user });
  }


  searchPosts(keyword) {
    window.location.href = "/posts?search=" + keyword;
  }

  uppercaseName(phrase) {
    phrase = phrase || "N";
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  signOut = () => {
    this.setState({ clickLoggout: true });
    // this.props.logoutPage();
  };

  showList = () => {
    this.props.showList(true)
  }

  render() {
    let user = localStore.get("_user");
    const userAvatar = (this.state.user && this.state.user.avatar) ? (CONTENT_URL + this.state.user.avatar.hash + this.state.user.avatar.ext) : '';

    return (
      <div className="card position-relative collapsed-card d-lg-none">

        <div className="header-cms-mobile row justify-content-between align-items-center py-2">

          {/* <Link to="/" className="col btn btn-app">
            <i className="fas fa-home" ></i>
          </Link> */}
          <Link to="/posts" className="col btn btn-app">
            <i className="fas fa-clipboard-list" ></i>
          </Link>
          {user && user.can_view_royalties && (
            <Link to="/nhuan" className="col btn btn-app">
              <i className="fas fa-coins" ></i>
            </Link>
          )}

          {user && user.role && user.role.name == "SuperAdmin" && (
            <Link to={"/homepage"} className="col btn btn-app">
              <i className="fas fa-home" ></i>
            </Link>
          )}

          {user && user.can_view_ga && (
            <Link to={"/ga"} className="col btn btn-app">
              <i className="fab fa-google"></i>
            </Link>
          )}

          <a type="button" className="col btn btn-app" data-card-widget="collapse" onClick={this.showList}>
            <i className="fas fa-search"></i>
          </a>

          <a className="col" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <UserAvatar size="30" name={this.uppercaseName(this.state.user && this.state.user.fullname || 'NN')} className=""
              src={userAvatar} colors={['#ff6188', '#fc9867', '#ffd866', '#a9dc76', '#78dce8', '#ab9df2']} />
          </a>

          <div className="dropdown-menu right">
            <Link to={"/profile"} className="dropdown-item"><i className="fas fa-user"></i> Profile</Link>
            <div className="dropdown-divider"></div>
            <a onClick={this.signOut} href="#" className="dropdown-item"><i className="fas fa-th-large"></i> Logout</a>
          </div>

        </div>

        <div className="card-body bg-white" style={{ display: "none" }}>
          <Input
            icon="search"
            placeholder="Tìm kiếm"
            value={this.state.filters.search.value}
            onSubmit={value => {
              this.searchPosts(value);
            }}
          />
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
)(HeaderMobileComponent);