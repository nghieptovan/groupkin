import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class GioXuatBanTab extends Component {
  constructor() {
    super();
    this.state = {
      scheduleDate: null,
      minTime: null,
      maxTime: null,
    }
  }

  componentDidMount() {

    const { currentPost } = this.props;

    if (currentPost && currentPost.scheduleAt) {
      this.setState({
        scheduleDate: new Date(currentPost.scheduleAt),
        minTime: this.calculateMinTime(new Date(currentPost.scheduleAt)),
      });
    } else {
      this.setState({
        minTime: this.calculateMinTime(new Date()),
      });
    }
  }

  setStartDate(date) {
    console.log(date, this.state.minTime)
    const { post: { currentPost }, fields } = this.props;
    this.setState({
      scheduleDate: date,
      minTime: this.calculateMinTime(date)
    }, () => {
      currentPost.scheduleAt = date
      this.props.setCurrentPost(currentPost);
      this.props.setScheduleDate(date);
    });
  }

  calculateMinTime = date => {
    let isToday = moment(date).isSame(moment(), 'day');
    if (isToday) {
      let nowAddOneHour = moment(new Date()).toDate();
      return nowAddOneHour;
    }
    return moment().startOf('day').toDate(); // set to 12:00 am today
  }

  render() {

    let { currentPost, _user } = this.props;
    let { scheduleDate } = this.state;

    return (
      <>
        {currentPost && _user &&
          ((currentPost.posttype.type_code === 'schedule' || currentPost.posttype.type_code === 'waiting') ||
            (currentPost.posttype.type_code === 'draft' && _user.can_publish)
          ) &&

          <div className="card">

            <div className="card-header">
              <h4 className="card-title">Giờ xuất bản</h4>
              <div className="card-tools">
                <ul className="nav nav-pills ml-auto">
                  <li className="nav-item" onClick={() => this.setStartDate(null)}>
                    <a className={"nav-link " + (currentPost.posttype.type_code === 'waiting' ? 'active' : '')} href="#scheduleNow" data-toggle="tab" >Bây giờ</a>
                  </li>
                  <li className="nav-item">
                    <a className={"nav-link " + (currentPost.posttype.type_code === 'schedule' ? 'active' : '')} href="#scheduleTime" data-toggle="tab">Chọn thời gian</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body">

              <div className="tab-content p-0">
                <div className={"tab-pane " + (currentPost.posttype.type_code === 'waiting' ? 'active' : '')} id="scheduleNow">
                  Bài viết sẽ được xuất bản ngay lập tức
                              </div>
                <div className={"tab-pane text-center" + (currentPost.posttype.type_code === 'schedule' ? ' active' : '')} id="scheduleTime" style={{ height: "300px" }}>

                  <DatePicker
                    selected={scheduleDate}
                    onChange={date => this.setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    maxDate={new Date((new Date).setDate((new Date).getDate() + 30))}
                    excludeOutOfBoundsTimes
                    minTime={this.state.minTime}
                    maxTime={moment().endOf('day').toDate()}
                    inline
                  />
                </div>
              </div>
            </div>
          </div>
        }
      </>
    )
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
})(GioXuatBanTab)
