import React, { Component } from 'react'
import moment from 'moment'

import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import 'moment/locale/vi';
export const cms = (number, index, totalSec) => {
  // number: the time ago / time in number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;

  if (index === 5) {
    // console.log(totalSec, number)
  }

  return [
    ['vừa xong', 'một lúc'],
    ['%s giây trước', 'trong %s giây'],
    ['1 phút trước', 'trong 1 phút'],
    ['%s phút trước', 'trong %s phút'],
    ['1 giờ trước', 'trong 1 giờ'],
    ['%s giờ trước', 'trong %s giờ'],
    ['1 ngày trước', 'trong 1 ngày'],
    ['%s ngày trước', 'trong %s ngày'],
    ['1 tuần trước', 'trong 1 tuần'],
    ['%s tuần trước', 'trong %s tuần'],
    ['1 tháng trước', 'trong 1 tháng'],
    ['%s tháng trước', 'trong %s tháng'],
    ['1 năm trước', 'trong 1 năm'],
    ['%s năm trước', 'trong %s năm'],
  ][index];
}


class Date extends Component {
  render() {
    let { ...props } = this.props;
    let txtDate = '';
    let type_code = props.typecode;
    moment.locale('vi');
    timeago.register('cms', cms);


    switch (type_code) {
      case 'draft':
        // txtDate = 'Sửa đổi lần cuối ' + moment(props.updated_at).format('hh:mm DD/MM/YYYY');
        txtDate = moment(props.updated_at).format('DD/MM/YYYY hh:mm');
        break;
      case 'waiting':
        // txtDate = 'Sửa đổi lần cuối ' + moment(props.updated_at).format('hh:mm DD/MM/YYYY');
        txtDate = moment(props.updated_at).format('DD/MM/YYYY hh:mm');
        break;
      case 'schedule':
        // txtDate = 'Đã lên lịch ' +( props.scheduled ? moment(props.scheduled).format('hh:mm DD/MM/YYYY') : 'cần update');
        txtDate = (props.scheduled ? moment(props.scheduled).format('DD/MM hh:mm') : 'cần update');
        break;
      case 'ready':
        // txtDate = 'Đã đăng ' + moment(props.updated_at).format('hh:mm DD/MM/YYYY');
        txtDate = moment(props.published_at).format('DD/MM/YYYY hh:mm');
        break;
      case 'trash':
        // txtDate = 'Sửa đổi lần cuối ' + moment(props.updated_at).format('hh:mm DD/MM/YYYY');
        txtDate = moment(props.updated_at).format('DD/MM/YYYY hh:mm');
        break;
      default:
        txtDate = '';
        break;
    }


    let dateNow = moment();
    let dateShow = moment(props.published_at ? props.published_at : props.updated_at);
    let dateDiffHour = dateNow.diff(dateShow, 'hours');
    let dateDiffDay = dateNow.diff(dateShow, 'days');
   



    return (
      <>
        <div className={this.props.className}>
          {type_code != 'ready' ?
            <span>Cập nhật </span> :
            <span>Đã đăng </span>
          }
   
          { dateDiffHour < 1 && <TimeAgo
            datetime={props.published_at ? props.published_at : props.updated_at}
            locale='cms'
            style={{ marginBottom: 0 }}
          />}

          {
            (dateDiffHour >= 1 && dateDiffHour < 24) && moment(dateShow).format('LT')
          }
          {
            (dateDiffDay >= 1 && dateDiffDay < 7) && moment(dateShow).format('dddd')
          }
          {
            (dateDiffDay >= 7) && moment(dateShow).format('LL').split('năm')[0]
          }
          

        </div>
        <div>

          {type_code === 'schedule' &&
            <>
              <span>Lên lịch </span>
              {txtDate}
            </>
          }
        </div>
      </>
    )
  }
}

export default Date
