import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'
import localStorage from '../../../utils/local-storage'
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import * as _ from 'lodash';
class OptionsTab extends Component {
  constructor() {
    super();
    this.state = {
      post_ads: true,
      post_ia: true
    }
  }

  changeStatusPostOptions(check, field) {
    const {
      post: { currentPost }
    } = this.props;
    if (field === 'post_ads') {
      this.setState({ post_ads: check }, () => {
        currentPost.post_ads = check;
        this.props.setCurrentPost(currentPost);
      });
    }
  }


  render() {

    let { layoutName, role, post: { currentPost } } = this.props;
    let logAction = currentPost.log_action;
    if (logAction) {logAction = logAction.split(',');}
    if (role === 'superadmin') {
      return (
        <>
        <div className={(layoutName !== 'layout-pc' ? 'row card' : '')}>
          {
            layoutName !== 'layout-pc' &&
            <div className={"card-header col-12 "}>
              <h4 className="card-title">Tuỳ chỉnh</h4>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            </div>

          }

          <div className="card-body col-12">
            <div className="d-flex justify-content-between">
              <span className="mr-2">Quảng cáo</span>

              <BootstrapSwitchButton
                checked={this.state.post_ads}
                onChange={check => {
                  this.changeStatusPostOptions(check, 'post_ads');
                }}
                onstyle="danger"
                onlabel="Bật"
                offlabel="Tắt"
                offstyle="light"
                size=""
                width="80"
              />
            </div>
            <div className="mt-3 d-flex justify-content-between">
              <span className="mr-2">Facebook IA</span>

              <BootstrapSwitchButton
                checked={this.state.post_ia}
                onChange={check => {
                  this.changeStatusPostOptions(check, 'post_ia');
                }}
                onstyle="danger"
                onlabel="Bật"
                offlabel="Tắt"
                offstyle="light"
                size=""
                width="80"
              />
            </div>

          </div>
        </div>
        <div className={(layoutName !== 'layout-pc' ? 'row card' : '')}>
          {
            layoutName !== 'layout-pc' &&
            <div className={"card-header col-12 "}>
              <h4 className="card-title">Nhật ký</h4>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            </div>
          }

          <div className="card-body col-12">
            <div>
              {
                logAction &&
                _.reverse(logAction).map((lAct, idx) => {
                  return (
                    <p key={idx}>{lAct}</p>
                  );
                })
              }
              
            </div>
          </div>
        </div>
        </>
      )
    }

    return (<></>)

  }

};

export default connect(store => {
  return {
    post: store.post,

  };
}, dispatch => {
  return {
    setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
  }
})(OptionsTab)
