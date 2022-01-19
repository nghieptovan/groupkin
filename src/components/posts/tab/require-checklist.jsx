import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'

class RequireChecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutName: '',
      listTab: {}
    };
  }

  componentDidMount() {
    const { listTab, layoutName } = this.props;
    this.setState({ listTab, layoutName });
  }

  componentWillUnmount() {
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      listTab: nextProps.listTab,
      layoutName: nextProps.layoutName
    });
  }

  render() {
    let { listTab, layoutName } = this.state;
    let arrayListTab = Object.values(listTab);
    // console.log(arrayListTab)

    return (
      <div className="card" style={{ backgroundColor: "rgb(255, 255, 230)", width: "230px" }}>
        <div className="card-header col-12 py-2">
          <h4 className="card-title">Yêu cầu khi soạn bài</h4>
          {layoutName === 'layout-pc-2' &&
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus"></i>
              </button>
            </div>
          }
        </div>
        <div className="card-body col-12 py-2">
          <ul className="todo-list ui-sortable" data-widget="todo-list">
            {arrayListTab && arrayListTab.map((tab, idx) => {
              return (
                <li key={idx} className={(tab.error ? "" : "checked")} style={{ backgroundColor: "unset", border: "unset", padding: "0" }}>
                  <div className="icheck-primary d-inline no-background">
                    <input type="checkbox" checked={tab.error ? '' : 'checked'} name="todo1" id={"todoCheck" + idx} disabled="disabled" />
                    <label htmlFor={"todoCheck" + idx}></label>
                  </div>
                  <span className="text">{tab.requireText}</span>
                </li>
              );
            })}


          </ul>
        </div>
      </div>
    )
  }

};


export default connect(store => {
  return {
    post: store.post,
    config: store.config
  };
}, dispatch => {
  return {

  }
})(RequireChecklist)