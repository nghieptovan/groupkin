import React, { Component } from 'react';

export default class Boxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: 0,
      pageviews: 0,
      avgSessionDuration: 0,
      boundRate: 0
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { report: nextReport } = nextProps;
    if (nextReport) {
      let report = nextReport;
      this.setState({
        sessions: parseInt(report.data.totals[0].values[0]),
        pageviews: parseInt(report.data.totals[0].values[1]),
        avgSessionDuration: parseFloat(report.data.totals[0].values[2]).toFixed(2),
        boundRate: parseFloat(report.data.totals[0].values[3]).toFixed(2)
      })
    }
  }
  formatNumber(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
  }
  timeFormat(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + " giờ " + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + " phút " + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }


  render() {
    return (
      <div className="row">
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner text-center">
              <h3>{this.formatNumber(this.state.sessions)}</h3>
              <p>Sessions</p>
            </div>
            {/* <a className="small-box-footer">
              <span >
                <i className="fas fa-arrow-up"></i> 12.5% <span> </span>
              </span>
              <span >
                vs. Previous 30 Days
                            </span>
            </a> */}
          </div>
        </div>

        <div className="col-lg-3 col-6">
          <div className="small-box bg-success">
            <div className="inner text-center">
              <h3>{this.formatNumber(this.state.pageviews)}</h3>
              <p>Pageviews</p>
            </div>
            {/* <a className="small-box-footer">
              <span >
                <i className="fas fa-arrow-right"></i> 12.5% <span> </span>
              </span>
              <span >
                vs. Previous 30 Days
                            </span>
            </a> */}
          </div>
        </div>

        <div className="col-lg-3 col-6">
          <div className="small-box bg-primary">
            <div className="inner text-center">
              <h3>{this.timeFormat(this.state.avgSessionDuration)}</h3>
              <p>Avg. Session Duration</p>
            </div>
            {/* <a className="small-box-footer">
              <span>
                <i className="fas fa-arrow-up"></i> 2.4% <span> </span>
              </span>
              <span >
                vs. Previous 30 Days
                            </span>
            </a> */}
          </div>
        </div>

        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner text-center">
              <h3>{this.state.boundRate}%</h3>
              <p>Bounce Rate</p>
            </div>
            {/* <a className="small-box-footer">
              <span>
                <i className="fas fa-arrow-down"></i> -33% <span> </span>
              </span>
              <span >
                vs. Previous 30 Days
                            </span>
            </a> */}
          </div>
        </div>
      </div>


    );
  }
}